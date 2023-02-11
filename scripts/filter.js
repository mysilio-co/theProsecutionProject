import { DROPDOWN_KEYS } from "./constants";

export function generateListDropdowns(data) {
    let dropdowns = [];
    for(let col of DROPDOWN_KEYS) {
        const listOptions = getListOptionsByKey(data, col);
        if(listOptions.length>0) {
            dropdowns.push({[col]:listOptions});
        }
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