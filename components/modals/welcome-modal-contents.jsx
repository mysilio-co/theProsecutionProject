import { Dialog } from '@headlessui/react'

export default function WelcomeModalContents ({setShowModal}) {

    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

  return (
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl m-auto transition-all sm:my-8">
         <div className="bg-white pt-0 pb-4 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mt-0 text-center sm:text-left">
                    <Dialog.Title as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                        Welcome!
                    </Dialog.Title>
                    <div className="mt-2 p-4">
                        <h2>The Prosecution Project Data</h2>
                        <p className="mt-6 text-sm text-gray-500">
                            The Prosecution Project (tPP) is a long-term, Open-Source Intelligence research platform tracking and providing an <span className="font-bold">analysis of felony criminal cases involving illegal political violence occurring in the United States since 1990.</span></p>
                        <p className="text-sm text-gray-500">
                            Through identification, analysis, and assessment of thousands of cases, tPP seeks to identify correlations between who a defendant is, how they are charged and prosecuted, and other related factors, such as political ideology, religion, and the crime’s motive, means, target, and impact.
                        </p>
                        <p className="text-sm text-gray-500">
                            You may access portions of the data collected as part of the Prosecution Project on this site. Data are currently displayed across three tabs:
                        </p>
                        <ol className="list-decimal ml-6 text-gray-500">
                            <li>“General,” which includes completed cases as well as those still proceeding through the courts.</li>
                            <li>“Summer-Fall 2020 Protests,” which covers cases occurring during that time period in response to the death of George Floyd.</li>
                            <li>“Capitol Raid,” which displays federal and non-federal charges levied against protesters active in and around the US Capitol building on January 6, 2021.</li>
                        </ol>
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