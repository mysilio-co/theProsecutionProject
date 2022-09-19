import Fuse from "fuse.js";

export default function fuzzySearch(data, search) {
    const options = {
    isCaseSensitive: false,
    threshold: 0.2,
    keys: [
      "Group affiliation",
    ]
  };
  if(!!data) {
    if (!!search) {
      const cleanedData = Array.from(new Fuse(data, options).search(search), row=>row.item);
      cleanedData.columns = data.columns;
      data = cleanedData;
    }
  }
  return data;
}