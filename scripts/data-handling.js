import Fuse from "fuse.js";
import * as d3 from "d3";
import { DESKTOP_COLUMN_KEYS, DROPDOWN_KEYS, NUMERIC_COLUMNS, SEARCH_BY_KEYS_MOBILE } from "./constants";

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
    // data = data.filter(row => row.Date.length!=0);
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

function sortByDate(columnA, columnB, order) {
  return order=="asc" ? new Date(columnA) - new Date(columnB) : new Date(columnB) - new Date(columnA);
}

function sortByNumber(columnA, columnB, order) {
  columnA = !!Number(columnA) ? Number(columnA) : -1;
  columnB = !!Number(columnB) ? Number(columnB) : -1;
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