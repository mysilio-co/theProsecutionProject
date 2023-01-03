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
    threshold: 0.1,
    keys: key
  };
  if(!!data) {
    data = data.filter(row => row.Date.length!=0);
    if (!!search) {
      const cleanedData = Array.from(new Fuse(data, options).search(search), row=>row.item);
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