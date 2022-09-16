import { LIST_KEYS } from "./constants";

export function generateListDropdowns(data) {
    for(let key of LIST_KEYS) {
        console.log(getListOptionsByKey(data, key));
    }
}

function getListOptionsByKey(data, key) {
    return [... new Set(data.map(function(d) { return d[key]; }))];
}