import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import DateFilter from '../filters/date-filter';
import FilterDropdowns from '../filters/filter-dropdowns';
import FilterRanges from '../filters/filter-ranges';

export default function FilterModalContents({
  dropdownValues,
  rangeValues,
  isLoading,
  hasError,
  setShowModal,
}) {
  const invisFocusRef = useRef();
  const router = useRouter();
  let groups = [];
  let tags = [];

  function setModalVisibility(showModalValue) {
    setShowModal(showModalValue);
  }

  useEffect(() => {
    invisFocusRef.current.focus();
  }, []);

  return (
    <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:m-auto md:h-5/6'>
      <div className='bg-white pt-0 pb-4 sm:pb-4'>
        <div className='sm:flex sm:items-start'>
          <div className='mt-0 text-center sm:text-left'>
            <Dialog.Title
              as='h3'
              className='p-4 bg-gray-800 text-lg font-medium leading-6 text-white'
            >
              Filter Data
            </Dialog.Title>
            <a
              ref={invisFocusRef}
              href=''
              onClick={event => event.preventDefault()}
            ></a>
            <div className='mt-2 p-4'>
              <div className=''>
                <h4 className='mx-4 text-start pb-2'>Filter By Date</h4>
                <p className='mx-4 text-start'>
                  Filter data by the date in which the incident occurred. The
                  "From" box ensures the incident will have occurred on or after
                  the date specified and the "To" box ensures it will be on or
                  before the date specified. Dates can be selected by clicking
                  the desired date on the calendar popup or typed out in
                  MM/DD/YYYY format and can be removed by clicking the "Clear"
                  button.
                </p>
                <DateFilter router={router} />
              </div>
              <div className='px-4 mt-8'>
                <h4 className='text-start pb-2'>Filter By Dropdown</h4>
                <p className='text-start'>
                  Filter data by the variable specified. Click the variable you
                  would like to filter on and select the values you want to be
                  shown. Multiple values can be selected and values can be
                  deselected by clicking on them a second time. Variables are
                  sorted alphabetically.
                </p>
                <p className='text-start'>
                  Dropdowns can be opened with the ENTER or UP and DOWN arrow
                  keys, options can be navigated using the UP and DOWN arrow
                  keys, options can be selected using the ENTER key, and
                  dropdowns can be closed using the ESC key.
                </p>
                <FilterDropdowns
                  values={dropdownValues}
                  router={router}
                  isLoading={isLoading}
                  hasError={hasError}
                />
              </div>
              <div className='mt-12'>
                <h4 className='mx-4 text-start pb-2'>Filter By Range</h4>
                <p className='mx-4 text-start'>
                  Filter data by the value of a numeric variable. Click the
                  toggle associated with the variable to activate it. Values can
                  be selected by dragging the slider (desktop only), typing the
                  number into the text box, or clicking the arrows next to the
                  text box to increase/decrease.
                </p>
                <p className='mx-4 text-start'>
                  Activating a variable will automatically remove any data where
                  that variable is not available.
                </p>
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
      <div className='bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
        <button
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={() => setModalVisibility(false)}
          autoFocus
        >
          Close
        </button>
      </div>
    </Dialog.Panel>
  );
}
