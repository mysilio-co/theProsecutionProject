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
import { classNames } from "../scripts/common";

export default function SearchBy({router, isMobile, isAllColumns, isLoading, hasError}) {
    // const searchByKeys = isMobile ? SEARCH_BY_KEYS_MOBILE : !isAllColumns ? SEARCH_BY_KEYS_EXPRESS : SEARCH_BY_KEYS;
    const searchByKeys = isMobile ? SEARCH_BY_KEYS_MOBILE : SEARCH_BY_KEYS;
    const [searchBy, setSearchBy] = useState(searchByKeys[0]);
    const isDisabled = isLoading && !hasError;
    useEffect(()=>{
        if(!isDisabled && router.query.searchBy) {
            setSearchBy(router.query.searchBy);
        }
    },[isDisabled])

    useEffect(()=>{
        if(!isDisabled) {
            searchBy==="Any" ? removeQueryParam("searchBy", router) : addQueryParam("searchBy", searchBy, router);
        }
    },[searchBy])

    useEffect(()=>{
        if(!isDisabled && !router.query.searchBy) {
            setSearchBy("Any");
        }
    },[router.query.searchBy])
    
    return (
        <div className="relative z-10 flex-1 px-2 flex items-center justify-center sm:inset-0">
        <div className="w-full sm:max-w-xs md:inline-flex md:items-center md:justify-center">
        <Listbox value={ searchBy} onChange={setSearchBy} disabled={isDisabled}>
            {({ open }) => (
                <>
                <Listbox.Label className="block text-sm pl-0 md:pl-4 pr-2 font-medium text-gray-400">Search By:</Listbox.Label>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-1 pr-40 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">{searchBy}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                    </Listbox.Button>

                    <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {searchByKeys.map((key, idx) => (
                        <Listbox.Option
                            key={idx}
                            className={({ active }) =>
                            classNames(
                                active ? 'text-white bg-gray-800' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9 text-sm'
                            )
                            }
                            value={key}
                        >
                            {({ selectedKey, active }) => (
                            <>
                                <div className="flex items-center">
                                <span
                                    className={classNames(selectedKey ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                >
                                    {key}
                                </span>
                                </div>

                                {selectedKey ? (
                                <span
                                    className={classNames(
                                    active ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                ) : null}
                            </>
                            )}
                        </Listbox.Option>
                        ))}
                    </Listbox.Options>
                    </Transition>
                </div>
                </>
            )}
            </Listbox>
        </div>
    </div> 
    );
  }



