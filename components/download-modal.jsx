import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import * as d3 from "d3";

export default function DownloadModal({data}) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  
  function updateOpen() {
    setOpen(!open);
  }

  function createExportUrl() {
    return !!data ? URL.createObjectURL(new Blob([d3.csvFormat(data)], { type: "text/csv" })) : "#";
  }

  return (
    <div>
      <button onClick={updateOpen} className="mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-40 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded">
        Download Data
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white pt-0 pb-4 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-0 text-center sm:text-left">
                        <Dialog.Title as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                          Citation Acknowledgement
                        </Dialog.Title>
                        <div className="mt-2 p-4">
                          <p className="text-sm text-gray-500">
                            Some text here about the correct way to cite us, I'm not at all sure what the copy should look like so I'll leave that up to that professionals. 
                            Can also include that it's downloaded in CSV format with a quick description of what that means.
                          </p>
                          <p className="my-3 text-sm text-gray-500 italic">
                            This is the, correct citation, format
                          </p>
                          <p className="my-3 text-sm text-gray-500">
                            Clicking "I Accept" means you acknowledge this or something like that
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <a href={createExportUrl()} download="tpp-data.csv">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      I Accept
                    </button>
                  </a>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}