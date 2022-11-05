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