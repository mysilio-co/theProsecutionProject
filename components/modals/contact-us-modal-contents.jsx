import { Dialog } from '@headlessui/react'

export default function ContactUsModalContents ({setShowModal}) {

    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

  return (
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl m-auto transition-all sm:my-8 sm:w-full sm:max-w-lg">
         <div className="bg-white pt-0 pb-4 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mt-0 text-center sm:text-left">
                    <Dialog.Title as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                        Request Data
                    </Dialog.Title>
                    <div className="mt-2 p-4">
                        <h3>Want to get in touch?</h3>
                        <p className="my-2 text-sm text-gray-500">
                            If you are interested in acquiring tPP's data, please visit our <a href="https://theprosecutionproject.org/data-requests/" target="_blank">Data Requests</a> page for more information.
                        </p>
                        <p className="my-2 text-sm text-gray-500">
                            Documents, media requests and other inquiries should be sent to us via the project Director, <a href="mailto:michael@theprosecutionproject.org">Dr. Michael Loadenthal (michael@theprosecutionproject.org)</a>
                        </p>
                        <p className="my-2 text-sm text-gray-500">
                            If you are interested in joining the tPP team, please visit our <a href="https://theprosecutionproject.org/want-to-join-our-team/" target="_blank">Join Our Team</a> page and fill out the application!
                        </p>
                    </div>
                </div>
            </div>
            </div>
            <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModalVisibility(false)}
                    autoFocus
                >
                    Close
                </button>
            </div>
        </Dialog.Panel>
        )
}