import Fuse from "fuse.js";
import * as d3 from "d3";
import { SEARCH_BY_KEYS } from "./constants";

export function fuzzySearch(data, search, key) {
  key = !!key ? [key] : SEARCH_BY_KEYS;
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
      return d3.ascending(a[column], b[column]);
    });
  }
  else if(order=="desc") {
    data = data.sort((a, b)=> {
      return d3.descending(a[column], b[column]);
    });
  }
  else {
    return data;
  }
}