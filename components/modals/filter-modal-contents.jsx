import { useEffect, useRef, useState, useMemo } from 'react'
import { Dialog } from '@headlessui/react'
import DateFilter from '../filters/date-filter';
import FilterRanges from '../filters/filter-ranges';
import { generateListDropdowns, generateNumericRanges } from '../../scripts/filter';
import FilterDropdowns from '../filters/filter-dropdowns';
import { useRouter } from 'next/router';

export default function FilterModalContents ({dropdownValues, rangeValues, isLoading, hasError, setShowModal}) {

    const contentRef = useRef();
    const titleRef = useRef();
    const closeButtonRef = useRef();
    const isVisible = useOnScreen(contentRef);
    const router = useRouter();

    useEffect(() => {
        titleRef.current.scrollIntoView(false);
        closeButtonRef.current.focus();
    }, [isVisible]);
        
    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

    return (
        <Dialog.Panel ref={contentRef} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:m-auto md:h-5/6 max-w-11/12">
            <div className="bg-white pt-0 pb-4 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-0 text-center sm:text-left">
                        <Dialog.Title ref={titleRef} as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                            Filter Data
                        </Dialog.Title>
                        <div className="mt-2 p-4">
                            <div>
                            <DateFilter
                                router={router} 
                                isLoading={isLoading}
                                hasError={hasError}/>
                            </div>
                            <div>
                            <FilterDropdowns 
                                values={dropdownValues} 
                                router={router} 
                                isLoading={isLoading}
                                hasError={hasError}
                                /> 
                            </div>
                            <div>
                            <FilterRanges
                                values={rangeValues}
                                router={router}
                                isLoading={isLoading}
                                hasError={hasError}
                            />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    ref={closeButtonRef}
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModalVisibility(false)}
                >
                    Close
                </button>
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