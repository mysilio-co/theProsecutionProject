import { Disclosure, Listbox, Transition } from "@headlessui/react";
import { useState, Fragment, useEffect } from "react";
import { SEARCH_BY_KEYS } from "../scripts/constants";
import { fuzzySearch, sort } from "../scripts/data-handling.js";
import {
    SearchIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon
  } from "@heroicons/react/solid";

export default function BasicSearch({data, search, cleanedData, router, selected}) {
    
    const [selectedKey, setSelectedKey] = useState(SEARCH_BY_KEYS[0]);
    cleanedData = fuzzySearch(data, search, selectedKey);
    console.log(cleanedData);
    return (
        <div>
            <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:inset-0">
                <div className="w-full sm:max-w-xs">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    </div>
                    <input
                    id="search"
                    name="search"
                    value={search}
                    className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    onChange={(e) => {
                        const search = e.target.value;
                        router.replace({
                        pathname: "/",
                        query: search
                            ? { tab: selected, search }
                            : { tab: selected },
                        });
                    }}
                    onSubmit={(e) => {}}
                    />
                </div>
                </div>
            </div>  
            <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:inset-0">
                <div className="w-full sm:max-w-md inline-flex items-center">
                <Listbox value={selectedKey} onChange={setSelectedKey}>
                    {({ open }) => (
                        <>
                        <Listbox.Label className="block text-sm pl-4 pr-2 font-medium text-gray-400">Search By:</Listbox.Label>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-1 pr-40 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">{selectedKey}</span>
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
                                {SEARCH_BY_KEYS.map((key, idx) => (
                                <Listbox.Option
                                    key={idx}
                                    className={({ active }) =>
                                    classNames(
                                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
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
        </div>   
    );
  }



