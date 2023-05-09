import { Dialog } from '@headlessui/react'
import { useEffect, useRef } from 'react';

export default function InProgressModalContents ({setShowModal}) {

    const closeButton = useRef();
    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

    useEffect(() => {
        closeButton.current.focus();
      }, []);

  return (
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl m-auto transition-all sm:my-8 sm:w-full md:m-auto md:w-1/2">
            <div className="bg-white pt-0 pb-4 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-0 text-center sm:text-left w-full">
                        <Dialog.Title as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                            In Progress
                        </Dialog.Title>
                        <div className="mt-2 p-4 pb-0 text-center">
                            <h2>Attention!</h2>
                            <p className="mt-6 text-sm text-gray-500">
                                Message about being in progress
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    ref={closeButton}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModalVisibility(false)}
                >
                    Close
                </button>
            </div>
        </Dialog.Panel>
        )
}