import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import * as d3 from "d3";

export default function DownloadModalContents({data, setShowModal}) {

    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

    function createExportUrl() {
        return !!data ? URL.createObjectURL(new Blob([d3.csvFormat(data)], { type: "text/csv" })) : "#";
    }

    function createFileName() {
        return "tpp-" + new Date().toISOString().split('T')[0] + ".csv";
    }

  return (
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
            <a href={createExportUrl()} download={createFileName()} className='ml-0 sm:ml-3 no-underline hover:no-underline focus:no-underline'>
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm"
                onClick={() => setModalVisibility(false)}
            >
                I Accept
            </button>
            </a>
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setModalVisibility(false)}
                autoFocus
            >
                Cancel
            </button>
            </div>
        </Dialog.Panel>
        )
}