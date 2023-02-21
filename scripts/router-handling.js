import { DROPDOWN_KEYS, NUMERIC_COLUMNS } from "./constants";

export function removeQueryParam(param, router) {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    params.delete(param);
    router.replace(
        { pathname, query: params.toString() },
        undefined, 
        { shallow: true }
    );
};

export function addQueryParam(name, value, router) {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    params.set(name, value);
    router.replace(
        { pathname, query: params.toString() },
        undefined, 
        { shallow: true }
    );
}

export function removeMultipleQueryParams(queryList, router) {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    queryList.forEach((param)=> {
        params.delete(param);
    })
    router.replace(
        { pathname, query: params.toString() },
        undefined, 
        { shallow: true }
    );
}

export function addMultipleQueryParams(queryMap, router) {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    queryMap.forEach((value, key)=> {
        params.set(key, value);
    })
    router.replace(
        { pathname, query: params.toString() },
        undefined, 
        { shallow: true }
    );
}

export function addAndRemoveMultipleQueryParams(addMap, removeList, router) {
    const { pathname, query } = router;
    const params = new URLSearchParams(query);
    addMap.forEach((value, key)=> {
        params.set(key, value);
    })
    removeList.forEach((param)=> {
        params.delete(param);
    })
    router.replace(
        { pathname, query: params.toString() },
        undefined, 
        { shallow: true }
    );
}

export function setSortingParams(clickedColumn, router) {
    const currentOrder = router.query.order;
    const currentColumn = router.query.sortBy;
    let newOrder = "";
    if(clickedColumn!=currentColumn) {
        newOrder = "asc";
    } 
    else {
        newOrder = currentOrder=="asc" ? "desc" : currentOrder=="desc" ? "" : "asc";
    }
    newOrder == "" ? (removeMultipleQueryParams(["sortBy", "order"], router)) : 
        addMultipleQueryParams(new Map([["sortBy", clickedColumn], ["order", newOrder]]), router);   
}

export function retrieveDropdownParams(query) {
    let paramObject = {};
    DROPDOWN_KEYS.forEach(key => {
        if(key in query) {
            paramObject[key] = query[key];
        }
    })
    return paramObject;
}

export function retrieveNumericParams(query) {
    let paramObject = {};
    NUMERIC_COLUMNS.forEach(key => {
        if(key in query) {
            paramObject[key] = query[key];
        }
    })
    return paramObject;
}