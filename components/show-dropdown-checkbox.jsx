import { useState, useEffect } from "react";
import { addQueryParam, removeQueryParam } from "../scripts/router-handling";

export default function ShowDropdownCheckbox({router, isLoading, hasError}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const isDisabled = isLoading && !hasError;
    useEffect(()=>{
        if(!isDisabled && router.query.showDropdown) {
            setShowDropdown(true);
        }
    },[isDisabled])

    useEffect(()=>{
        if(!isDisabled || hasError) {
            showDropdown ? addQueryParam("showDropdown", showDropdown, router) : removeQueryParam("showDropdown", router);
        }
    },[showDropdown])

    useEffect(()=>{
        if(!isDisabled && !router.query.showDropdown) {
            setShowDropdown(false);
        }
    },[router.query.showDropdown])

    return (
    <div className="flex ml-6 items-center">
        <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="" checked={showDropdown} className="sr-only peer" disabled = {isDisabled}
            onChange={(e) => {e.target.checked ? setShowDropdown(true) : setShowDropdown(false)}} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-Dropdown dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-sm text-gray-900">Show filter dropdowns</span>
        </label>
    </div>
    );
}