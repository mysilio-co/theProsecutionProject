import CodebookDisclosure from "./codebook-disclosure";
import { CODEBOOK, CODEBOOK_SORTING } from "../../../scripts/codebook";
import { ascending } from "d3";
import { Listbox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function HowToCodebook() {
    const disclosures = [];
    const [selected, setSelected] = useState(CODEBOOK_SORTING[0])
    let keys = Object.keys(CODEBOOK)
    if(selected==="Alphabetical") {
        keys = keys.sort((a, b)=> { 
            return ascending(a, b);
        });
    }
    keys.forEach((variable, index)=> {
        disclosures.push(<CodebookDisclosure name={variable} description={CODEBOOK[variable]} key={index}/>);
    })
    return (
        <div>
            <Listbox value={selected} onChange={setSelected}>
                <div className="mt-4 w-40 mx-6 text-start">
                    <div className="w-40">
                        <Listbox.Label className="">Sort by:</Listbox.Label>
                        <Listbox.Button className="relative w-full mb-2 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 sm:text-sm">
                            <span className="block truncate">{selected}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 w-40 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {CODEBOOK_SORTING.map((option, index) => (
                            <Listbox.Option
                            key={index}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ${
                                active ? 'bg-gray-200' : ''
                                }`
                            }
                            value={option}
                            >
                            {({ selected }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {option}
                                </span>
                                {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-800">
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
            </Listbox>
            {disclosures}
        </div>
    );
  }