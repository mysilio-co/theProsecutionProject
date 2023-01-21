import Fuse from "fuse.js";
import * as d3 from "d3";
import { DESKTOP_COLUMN_KEYS, SEARCH_BY_KEYS_MOBILE } from "./constants";

export function fuzzySearch(data, search, key, isMobile) {
  if(isMobile) {
    key = !!key ? [key] : SEARCH_BY_KEYS_MOBILE;
  } else {
    key = !!key ? [key] : DESKTOP_COLUMN_KEYS;
  }
  const options = {
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
  if(order=="asc") {
    data = data.sort((a, b)=> {
      return column=="Date" ? new Date(a[column]) - new Date(b[column]) : d3.ascending(a[column], b[column]);
    });
  }
  else if(order=="desc") {
    data = data.sort((a, b)=> {
      return column=="Date" ? new Date(b[column]) - new Date(a[column]) : d3.descending(a[column], b[column]);
    });
  }
  else {
    return data;
  }
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