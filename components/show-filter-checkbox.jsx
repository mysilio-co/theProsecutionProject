import { useState, useEffect } from "react";
import { addQueryParam, removeQueryParam } from "../scripts/router-handling";

export default function ShowFilterCheckbox({router, isLoading, hasError}) {
    const [showFilter, setShowFilter] = useState(false);
    const isDisabled = isLoading && !hasError;
    useEffect(()=>{
        if(!isDisabled && router.query.showFilter) {
            setShowFilter(true);
        }
    },[isDisabled])

    useEffect(()=>{
        if(!isDisabled || hasError) {
            showFilter ? addQueryParam("showFilter", showFilter, router) : removeQueryParam("showFilter", router);
        }
    },[showFilter])

    useEffect(()=>{
        if(!isDisabled && !router.query.showFilter) {
            setShowFilter(false);
        }
    },[router.query.showFilter])

    return (
    <div className="flex ml-6 items-center">
        <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="" checked={showFilter} className="sr-only peer" disabled = {isDisabled}
            onChange={(e) => {e.target.checked ? setShowFilter(true) : setShowFilter(false)}} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-sm text-gray-900">Show filter options</span>
        </label>
    </div>
    );
}