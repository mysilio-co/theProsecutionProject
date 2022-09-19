import { LIST_KEYS } from "./constants";

export function generateListDropdowns(data) {
    let dropdowns = [];
    for(let col of LIST_KEYS) {
        dropdowns.push({[col]: getListOptionsByKey(data, col)});
    }
    return dropdowns;
}

function getListOptionsByKey(data, key) {
    if(!!data) {
        return [... new Set(data.map(function(d) { return d[key]; }).filter(n => n).sort())];
    }
    else {
        return [];
    }
}