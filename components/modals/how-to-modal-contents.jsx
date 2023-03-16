import { useEffect, useRef, useState, useMemo } from 'react'
import { Dialog } from '@headlessui/react'
import { HOW_TO_TABS } from '../../scripts/constants';
import { classNames } from '../../scripts/common';
import HowToFunctions from './how-to-tabs/how-to-functions';
import HowToQuickstart from './how-to-tabs/how-to-quickstart';
import HowToDepth from './how-to-tabs/how-to-depth';
import HowToCodebook from './how-to-tabs/how-to-codebook';

export default function HowToModalContents ({setShowModal, router}) {

    const contentRef = useRef();
    const titleRef = useRef();
    const isVisible = useOnScreen(contentRef);
    const [selectedTab, setSelectedTab] = useState(HOW_TO_TABS[0]);

    useEffect(() => {
        titleRef.current.scrollIntoView(false);
      }, [isVisible]);

    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

    return (
        <Dialog.Panel ref={contentRef} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
            <div className="bg-white pt-0">
                <div className="sm:flex sm:items-start">
                    <div className="mt-0 text-center sm:text-left w-full">
                        <Dialog.Title ref={titleRef} as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                            User Manual
                        </Dialog.Title>
                        <div className="bg-gray-800 border-t border-gray-700">
                            <nav
                                className="px-2 md:py-2 md:flex md:space-x-8"
                                aria-label="Global"
                            >
                            {HOW_TO_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => {setSelectedTab(tab)}}
                                >
                                    <a
                                        key={tab}
                                        className={classNames(
                                            tab === selectedTab
                                            ? "bg-gray-900 text-white hover:text-white"
                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "whitespace-nowrap rounded-md py-2 px-3 inline-flex items-center text-sm font-medium hover:no-underline"
                                        )}
                                        aria-current={tab === selectedTab ? "page" : undefined}
                                        >
                                        {tab}
                                    </a>
                                </button>
                            ))}
                            </nav>
                        </div>
                        {selectedTab==="Functions" ? <HowToFunctions/> : ""}
                        {selectedTab==="Quickstart" ? <HowToQuickstart router={router}/> : ""}
                        {/* {selectedTab==="In Depth" ? <HowToDepth/> : ""} */}
                        {selectedTab==="Codebook" ? <HowToCodebook/> : ""}
                        <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setModalVisibility(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog.Panel>
    )
}

// https://stackoverflow.com/questions/45514676/react-check-if-element-is-visible-in-dom
function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = useMemo(() => new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    ), [ref])
  
  
    useEffect(() => {
      observer.observe(ref.current)
      return () => observer.disconnect()
    }, [])
  
    return isIntersecting
  }