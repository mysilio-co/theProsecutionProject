import { useEffect, useRef, useState, useMemo } from 'react'
import { Dialog } from '@headlessui/react'

export default function FAQModalContents ({setShowModal}) {

    const contentRef = useRef();
    const titleRef = useRef();
    const isVisible = useOnScreen(contentRef);

    useEffect(() => {
        titleRef.current.scrollIntoView(false);
      }, [isVisible]);

    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

    return (
        <Dialog.Panel ref={contentRef} className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:m-auto md:h-5/6 md:w-5/6">
            <div className="bg-white pt-0 pb-4 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mt-0 text-center sm:text-left">
                <Dialog.Title ref={titleRef} as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                    Frequently Asked Questions
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
                <button
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