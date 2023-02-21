import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({buttonLabel, innerComponent, showModal, setShowModal}) {

  function setModalVisibility(showModalValue) {
    setShowModal(showModalValue);
  }

  return (
    <div>
      <button onClick={()=>setModalVisibility(true)} className="mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-40 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded">
        {buttonLabel}
      </button>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setModalVisibility(false)}>
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
              <div>
                {innerComponent}
              </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}