import Fuse from "fuse.js";
import * as d3 from "d3";

export function fuzzySearch(data, search) {
    const options = {
    isCaseSensitive: false,
    threshold: 0.2,
    keys: [
      "Group affiliation",
    ]
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

export function sort(data, column) {
  data = data.sort((a, b)=> {
    return d3.ascending(a[column], b[column]);
  })
}