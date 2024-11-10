import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Modal({ innerComponent, showModal, setShowModal }) {
  function setModalVisibility(showModalValue) {
    setShowModal(showModalValue);
  }

  return (
    <div>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setModalVisibility(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <div className='fixed inset-0 z-10 overflow-y-auto my-10'>
            <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-0 mx-0 sm:mx-5 md:mx-10 xl:mx-30 2xl:mx-40'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                className='w-full'
              >
                <div>{innerComponent}</div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
