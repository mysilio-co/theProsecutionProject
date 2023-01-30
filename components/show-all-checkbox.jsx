import { Disclosure, Listbox, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { SEARCH_BY_KEYS, SEARCH_BY_KEYS_EXPRESS, SEARCH_BY_KEYS_MOBILE } from "../scripts/constants";
import {
    MagnifyingGlassIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon
  } from "@heroicons/react/20/solid";
import { addQueryParam, removeQueryParam } from "../scripts/router-handling";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ShowAllCheckbox({router, isLoading}) {
    const [showAll, setShowAll] = useState(false);
    useEffect(()=>{
        if(!isLoading && router.query.showAll) {
            setShowAll(true);
        }
    },[isLoading])

    useEffect(()=>{
        if(!isLoading) {
            showAll ? addQueryParam("showAll", showAll, router) : removeQueryParam("showAll", router);
        }
    },[showAll])

    useEffect(()=>{
        if(!isLoading && !router.query.showAll) {
            setShowAll(false);
        }
    },[router.query.showAll])

    return (
    <div className="flex ml-6 items-center">
        <label className="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" value="" checked={showAll} className="sr-only peer" disabled = {isLoading}
            onChange={(e) => {e.target.checked ? setShowAll(true) : setShowAll(false)}} />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-sm text-gray-900">Show all columns</span>
        </label>
    </div>
    );
}