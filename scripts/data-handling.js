import Fuse from "fuse.js";
import * as d3 from "d3";
import { DESKTOP_COLUMN_KEYS, DROPDOWN_KEYS, NUMERIC_COLUMNS, SEARCH_BY_KEYS_MOBILE } from "./constants";
import { removeMultipleQueryParams } from "./router-handling";

export function fuzzySearch(data, search, key, isMobile) {
  if(isMobile) {
    key = !!key ? [key] : SEARCH_BY_KEYS_MOBILE;
  } else {
    key = !!key ? [key] : DESKTOP_COLUMN_KEYS;
  }
  const options = (key[0] === "Date" && key.length ===1) ? {
    isCaseSensitive: false,
    ignoreLocation: true,
    threshold: 0,
    keys: key
  } : {
    isCaseSensitive: false,
    ignoreLocation: true,
    threshold: 0.1,
    keys: key
  };
  if(!!data) {
    if (!!search) {
      const fuse = new Fuse(data, options).search(search);
      const cleanedData = Array.from(fuse, row => row.item);
      cleanedData.columns = data.columns;
      data = cleanedData;
    }
  }
  return data;
}

export function sort(data, column, order) {
  if(order=="asc" || order=="desc") {
    if(column=="Date") {
      data = data.sort((a, b)=> { 
        return sortByDate(a[column], b[column], order);
      });
    }
    else if(NUMERIC_COLUMNS.includes(column)) {
      data = data.sort((a, b)=> { 
        return sortByNumber(a[column], b[column], order);
      });
    }
    else {
      data = data.sort((a, b)=> { 
        return sortByText(a[column], b[column], order);
      });
    }
  }
  else {
    return data;
  }
}

export function filterByDropdown(data, queryParams) {
  if(queryParams) {
    let filteredData = [];
    let filterParams = {};
    // Extract filter values from query params
    DROPDOWN_KEYS.forEach(key => {
      if(queryParams[key]) {
        filterParams[key] = queryParams[key].split(', ');
      }
    })    
    // Filter data by checking if a row contains at least one match in all dropdowns selected
    filteredData = data.filter(row => {
      let matchCount = 0;
      Object.keys(filterParams).forEach(key=> {
        if(filterParams[key].includes(row[key])) {
          matchCount++;
        }
      })
      return matchCount == Object.keys(filterParams).length;
    });
    data = filteredData;
  }
  return data;
}

export function filterByRange(data, queryParams) {
  if(queryParams) {
    let filteredData = [];
    let filterParams = {};
    // Extract filter values from query params
    NUMERIC_COLUMNS.forEach(key => {
      if(queryParams[key]) {
        filterParams[key] = queryParams[key].split(',');
      }
    })    
    filteredData = data.filter(row => {
      let matchCount = 0;
      Object.keys(filterParams).forEach(key=> {
        const rowValue = Number(row[key]?.replaceAll(',',''));
        if((rowValue || rowValue==0) && rowValue>=filterParams[key][0] && rowValue<=filterParams[key][1]) {
          matchCount++;
        }
      })
      return matchCount == Object.keys(filterParams).length;
    });
    data = filteredData;
  }
  return data;
}

export function filterByDate(data, fromQuery, toQuery) {
  if(!fromQuery && !toQuery) {
    return data;
  }
  else {
    const from = fromQuery ? new Date(fromQuery) : new Date("01/01/0001");
    const to = toQuery ? new Date(toQuery) : new Date("01/01/3000");
    return data.filter(row=> {
      const date = new Date(row["Date"]);
      return date>=from && date<=to ? true : false;
    })
  }
}

export function removeMismatchedDropdown(router, dropdownValues) {
  let columnsToBeUpdated = new Map();
  if(router.query && dropdownValues.length!=0) {
    // Extract filter values from query params
    DROPDOWN_KEYS.forEach(key => {
      if(router.query[key]) {
        const routerValue = router.query[key].split(', ');
        const dropdownValue = Object.values(dropdownValues.find(dropdownValue=>Object.keys(dropdownValue)==key))[0];
        const intersection = dropdownValue.filter(value => routerValue.includes(value));
        if(intersection.length != routerValue.length) {
          columnsToBeUpdated.set(key, intersection.join(', '));
        }
      }
    })
  }
  return columnsToBeUpdated;
}

export function removeMismatchedRange(router, rangeValues) {
  let columnsToBeUpdated = new Map();
  if(router.query) {
    // Extract filter values from query params
    NUMERIC_COLUMNS.forEach(key => {
      if(router.query[key]) {
        const routerValue = router.query[key].split(',').map(Number);
        const rangeValue = rangeValues.find(rangeValue=>rangeValue.key==key).value;
        // if min from router is smaller than min from rangeValue or if max is greater than max
        if(rangeValue[0]==rangeValue[1]) {
          columnsToBeUpdated.set(key, null);
        }
        else if(routerValue[0]<rangeValue[0] || routerValue[1]>rangeValue[1] ||
          routerValue[0]>rangeValue[1] || routerValue[1]<rangeValue[0]) {
          const newValue = [];
          newValue.push(routerValue[0]<rangeValue[0] || routerValue[0]>rangeValue[1] ? rangeValue[0] : routerValue[0]);
          newValue.push(routerValue[1]>rangeValue[1] || routerValue[1]<rangeValue[0] ? rangeValue[1] : routerValue[1]);
          columnsToBeUpdated.set(key, newValue);
        }
      }
    })
  }
  return columnsToBeUpdated;
}

function sortByDate(columnA, columnB, order) {
  return order=="asc" ? new Date(columnA) - new Date(columnB) : new Date(columnB) - new Date(columnA);
}

function sortByNumber(columnA, columnB, order) {
  columnA = Number(columnA.replaceAll(',', ''));
  columnB = Number(columnB.replaceAll(',', ''));
  if(!columnA) {
    columnA = -1;
  }
  if(!columnB) {
    columnB = -1;
  }
  return order=="asc" ? d3.descending(columnA, columnB) : d3.ascending(columnA, columnB);
}

function sortByText(columnA, columnB, order) {
  return order=="asc" ? d3.ascending(columnA, columnB) : d3.descending(columnA, columnB);
}

export function parseSheetsResponse(response) {
  const keys = response[0];
  const ret = [];
  for(let i = 1; i<response.length; i++) {
    const obj = {};
    keys.forEach((element, index) => {
      obj[element] = response[i][index];
    });
    ret.push(obj);
  }
  return ret
}

export function findFirstOccurenceOfYear(dateColumn, year) {
  let yearFound = false;
  let index = 0;
  let dates = dateColumn.slice(1,);
  while(index<dates.length && !yearFound) {
    let yearData = dates[index][0].substring(dates[index][0].length-4);
    if(yearData>=year) {
      // adding 2 because the first row is skipped in this loop (variable name row)
      // and index is base 0 while sheets is base 1
      return index+2;
    }
    index++;
  };
  if(!yearFound) {
    return null;
  }
 }