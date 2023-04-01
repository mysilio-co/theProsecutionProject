import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { addQueryParam, removeQueryParam } from "../../scripts/router-handling";

export default function ShowAllCheckbox({router, isLoading, hasError, setShowViewDescription}) {
    const [showAll, setShowAll] = useState(false);
    const isDisabled = isLoading && !hasError;
    useEffect(()=>{
        if(!isDisabled && router.query.showAll) {
            setShowAll(true);
        }
    },[isDisabled])

    useEffect(()=>{
        if(!isDisabled || hasError) {
            showAll ? addQueryParam("showAll", showAll, router) : removeQueryParam("showAll", router);
        }
    },[showAll])

    useEffect(()=>{
        if(!isDisabled && !router.query.showAll) {
            setShowAll(false);
        }
    },[router.query.showAll])

    return (
    <div className="flex ml-6 items-center">
        <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="" checked={showAll} className="sr-only peer" disabled = {isDisabled}
            onChange={(e) => {e.target.checked ? setShowAll(true) : setShowAll(false)}} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-sm text-gray-900 whitespace-nowrap">Show all columns</span>
        <QuestionMarkCircleIcon
            onMouseOver={()=>{ setShowViewDescription(true); }}
            onMouseLeave={()=>{ setShowViewDescription(false); }}
            className="text-gray-400 h-5 w-5 cursor-pointer ml-2"
            aria-hidden="true"
        />
        </label>
    </div>
    );
}