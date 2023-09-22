import Fuse from 'fuse.js';
import * as d3 from 'd3';
import {
  DESKTOP_COLUMN_KEYS,
  DESKTOP_EXPRESS_KEYS_TO_BE_OMITTED,
  CATEGORICAL_KEYS,
  IDEOLOGICAL_GROUPING,
  IDEOLOGICAL_GROUPING_FILTER_VALUES,
  NUMERIC_COLUMNS,
  SEARCH_BY_KEYS_MOBILE,
} from './constants';
import { cloneDeep, omit } from 'lodash';

export function runAllFilters(data, query, isMobile) {
  data = fuzzySearch(data, query.search, query.searchBy, isMobile);
  data = filterByDropdown(data, query);
  data = filterByDate(data, query.from, query.to);
  data = filterByRange(data, query);
  if (query.sortBy && query.order) {
    data = sort(data, query.sortBy, query.order);
  }
  return data;
}

export function fuzzySearch(data, search, key, isMobile) {
  if (isMobile) {
    key = !!key ? [key] : SEARCH_BY_KEYS_MOBILE;
  } else {
    key = !!key ? [key] : DESKTOP_COLUMN_KEYS;
  }
  const options =
    key[0] === 'Date' && key.length === 1
      ? {
          isCaseSensitive: false,
          ignoreLocation: true,
          threshold: 0,
          keys: key,
        }
      : {
          isCaseSensitive: false,
          ignoreLocation: true,
          threshold: 0.1,
          keys: key,
        };
  if (!!data) {
    if (!!search) {
      const fuse = new Fuse(data, options).search(search);
      const cleanedData = Array.from(fuse, row => row.item);
      cleanedData.columns = data.columns;
      data = cleanedData;
    }
  }
  return data;
}

// https://stackoverflow.com/a/39072935
export function filterByColumn(data, showAll) {
  if (showAll || !data) {
    return data;
  } else {
    let dataCopy = cloneDeep(data);
    //https://stackoverflow.com/a/12482991
    dataCopy.forEach(function (row, index) {
      dataCopy[index] = omit(row, DESKTOP_EXPRESS_KEYS_TO_BE_OMITTED);
    }, dataCopy);
    return dataCopy;
  }
}

export function sort(data, column, order) {
  if (order == 'asc' || order == 'desc') {
    if (column == 'Date') {
      data = data.sort((a, b) => {
        return sortByDate(a[column], b[column], order);
      });
    } else if (NUMERIC_COLUMNS.includes(column)) {
      data = data.sort((a, b) => {
        return sortByNumber(a[column], b[column], order);
      });
    } else {
      data = data.sort((a, b) => {
        return sortByText(a[column], b[column], order);
      });
    }
    return data;
  } else {
    return data;
  }
}

export function filterByDropdown(data, queryParams) {
  if (data && queryParams) {
    let filteredData = [];
    let filterParams = {};
    // Extract filter values from query params
    CATEGORICAL_KEYS.forEach(key => {
      if (queryParams[key]) {
        filterParams[key] = queryParams[key].split(', ');
      }
    });
    // Filter data by checking if a row contains at least one match in all dropdowns selected
    filteredData = data.filter(row => {
      let matchCount = 0;
      Object.keys(filterParams).forEach(key => {
        if (key != IDEOLOGICAL_GROUPING) {
          if (filterParams[key].includes(row[key])) {
            matchCount++;
          }
        } else {
          if (
            filterByIdeologicalGrouping(
              filterParams[key],
              row['Ideological affiliation'],
            )
          ) {
            matchCount++;
          }
        }
      });
      return matchCount == Object.keys(filterParams).length;
    });
    data = filteredData;
  }
  return data;
}

export function filterByRange(data, queryParams) {
  if (data && queryParams) {
    let filteredData = [];
    let filterParams = {};
    // Extract filter values from query params
    NUMERIC_COLUMNS.forEach(key => {
      if (queryParams[key]) {
        filterParams[key] = queryParams[key].split(',');
      }
    });
    filteredData = data.filter(row => {
      let matchCount = 0;
      Object.keys(filterParams).forEach(key => {
        const rowValue = row[key]
          ? Number(row[key]?.replaceAll(',', ''))
          : undefined;
        if (
          (rowValue || rowValue == 0) &&
          rowValue >= filterParams[key][0] &&
          rowValue <= filterParams[key][1]
        ) {
          matchCount++;
        }
      });
      return matchCount == Object.keys(filterParams).length;
    });
    data = filteredData;
  }
  return data;
}

export function filterByDate(data, fromQuery, toQuery) {
  if (!fromQuery && !toQuery) {
    return data;
  } else {
    const from = fromQuery ? new Date(fromQuery) : new Date('01/01/1900');
    const to = toQuery ? new Date(toQuery) : new Date('01/01/3000');
    return data.filter(row => {
      const date = new Date(row['Date']);
      return date >= from && date <= to;
    });
  }
}

function filterByIdeologicalGrouping(filterValues, rowValue) {
  let retValue = false;
  filterValues.forEach(filterValue => {
    if (IDEOLOGICAL_GROUPING_FILTER_VALUES[filterValue].includes(rowValue)) {
      retValue = true;
    }
  });
  return retValue;
}

export function removeMismatchedDropdown(router, dropdownValues) {
  let columnsToBeUpdated = new Map();
  if (router.query && dropdownValues.length != 0) {
    // Extract filter values from query params
    CATEGORICAL_KEYS.forEach(key => {
      if (
        router.query[key] &&
        dropdownValues.find(dropdownValue => Object.keys(dropdownValue) == key)
      ) {
        const routerValue = router.query[key].split(', ');
        const dropdownValue = Object.values(
          dropdownValues.find(
            dropdownValue => Object.keys(dropdownValue) == key,
          ),
        )[0];
        const intersection = dropdownValue.filter(value =>
          routerValue.includes(value),
        );
        if (intersection.length != routerValue.length) {
          columnsToBeUpdated.set(key, intersection.join(', '));
        }
      }
    });
  }
  return columnsToBeUpdated;
}

export function removeMismatchedRange(router, rangeValues) {
  let columnsToBeUpdated = new Map();
  if (router.query && rangeValues.length != 0) {
    // Extract filter values from query params
    NUMERIC_COLUMNS.forEach(key => {
      if (router.query[key]) {
        const routerValue = router.query[key].split(',').map(Number);
        const rangeValue = rangeValues.find(
          rangeValue => rangeValue.key == key,
        ).value;
        // if min from router is smaller than min from rangeValue or if max is greater than max
        if (rangeValue[0] == rangeValue[1]) {
          columnsToBeUpdated.set(key, null);
        } else if (
          routerValue[0] < rangeValue[0] ||
          routerValue[1] > rangeValue[1] ||
          routerValue[0] > rangeValue[1] ||
          routerValue[1] < rangeValue[0]
        ) {
          const newValue = [];
          newValue.push(
            routerValue[0] < rangeValue[0] || routerValue[0] > rangeValue[1]
              ? rangeValue[0]
              : routerValue[0],
          );
          newValue.push(
            routerValue[1] > rangeValue[1] || routerValue[1] < rangeValue[0]
              ? rangeValue[1]
              : routerValue[1],
          );
          columnsToBeUpdated.set(key, newValue);
        }
      }
    });
  }
  return columnsToBeUpdated;
}

function sortByDate(columnA, columnB, order) {
  return order == 'asc'
    ? new Date(columnA) - new Date(columnB)
    : new Date(columnB) - new Date(columnA);
}

function sortByNumber(columnA, columnB, order) {
  let numericColumnA = Number(columnA?.replaceAll(',', ''));
  let numericColumnB = Number(columnB?.replaceAll(',', ''));
  if (!numericColumnA) {
    if (columnA == 'X') {
      numericColumnA = -4;
    } else if (columnA == '#') {
      numericColumnA = -3;
    } else if (columnA?.toLowerCase() === 'data not available') {
      numericColumnA = -2;
    } else {
      numericColumnA = -1;
    }
  }
  if (!numericColumnB) {
    if (columnB == 'X') {
      numericColumnB = -4;
    } else if (columnB == '#') {
      numericColumnB = -3;
    } else if (columnB?.toLowerCase() === 'data not available') {
      numericColumnB = -2;
    } else {
      numericColumnB = -1;
    }
  }
  return order == 'asc'
    ? d3.descending(numericColumnA, numericColumnB)
    : d3.ascending(numericColumnA, numericColumnB);
}

function sortByText(columnA, columnB, order) {
  return order == 'asc'
    ? d3.ascending(columnA?.toUpperCase(), columnB?.toUpperCase())
    : d3.descending(columnA?.toUpperCase(), columnB?.toUpperCase());
}

export function parseSheetsResponse(response) {
  const keys = response[0];
  const ret = [];
  for (let i = 1; i < response.length; i++) {
    const obj = {};
    keys.forEach((element, index) => {
      obj[element] = response[i][index];
    });
    ret.push(obj);
  }
  return ret;
}

export function findFirstOccurenceOfYear(dateColumn, year) {
  let yearFound = false;
  let index = 0;
  let dates = dateColumn.slice(1);
  while (index < dates.length && !yearFound) {
    let yearData = dates[index][0].substring(dates[index][0].length - 4);
    if (yearData >= year) {
      // adding 2 because the first row is skipped in this loop (variable name row)
      // and index is base 0 while sheets is base 1
      return index + 2;
    }
    index++;
  }
  if (!yearFound) {
    return null;
  }
}
