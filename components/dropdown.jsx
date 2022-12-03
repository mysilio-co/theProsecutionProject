import {React, useState, Fragment} from 'react';
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({label, options}) {
  const [selectedKey, setSelectedKey] = useState(options[0])
  return (
    <Listbox value={selectedKey} onChange={setSelectedKey}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm pl-4 pr-2 font-medium text-gray-400">{label}</Listbox.Label>
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
                {options.map((key, idx) => (
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
  );
}