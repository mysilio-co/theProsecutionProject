import { Disclosure, Listbox, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import { RESULTS_PER_PAGE_KEYS } from '../scripts/constants';
import {
  MagnifyingGlassIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid';
import {
  addMultipleQueryParams,
  addQueryParam,
  removeQueryParam,
} from '../scripts/router-handling';
import { classNames } from '../scripts/common';

export default function ResultsPerPage({
  router,
  length,
  isLoading,
  hasError,
}) {
  const [resultsPerPage, setResultsPerPage] = useState(
    RESULTS_PER_PAGE_KEYS[0],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const maxPages = Math.ceil(length / parseInt(resultsPerPage));
  const isDisabled = isLoading && !hasError;

  useEffect(() => {
    if (!isDisabled && router.query.numShown) {
      setResultsPerPage(router.query.numShown);
    }
  }, [isDisabled]);

  useEffect(() => {
    if (!isDisabled) {
      setCurrentPage(1);
    }
  }, [resultsPerPage]);

  useEffect(() => {
    if (!isDisabled) {
      addMultipleQueryParams(
        new Map([
          ['currentPage', currentPage],
          ['numShown', resultsPerPage],
        ]),
        router,
      );
    }
  }, [currentPage, resultsPerPage]);

  useEffect(() => {
    if (!isDisabled) {
      setCurrentPage(1);
    }
  }, [router.query.search, router.query.searchBy, router.query.tab]);

  useEffect(() => {
    if (!isDisabled && router.query.numShown) {
      setResultsPerPage(router.query.numShown);
    }
  }, [router.query.numShown]);

  useEffect(() => {
    if (!isDisabled && router.query.currentPage) {
      setCurrentPage(router.query.currentPage);
    }
  }, [router.query.currentPage]);

  return (
    <div className='md:flex items-center'>
      <Listbox
        value={currentPage}
        onChange={setCurrentPage}
        disabled={isDisabled}
      >
        {({ open }) => (
          <>
            <Listbox.Label className='block text-sm pl-1 md:pl-4 pr-2 font-medium text-gray-400'>
              Page{' '}
            </Listbox.Label>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-1 pr-20 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
                <span className='flex items-center'>
                  <span className='ml-3 block truncate'>{currentPage}</span>
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <ChevronDownIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {Array.from({ length: maxPages }, (_, i) => i + 1).map(
                    (key, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-gray-800' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9 text-sm',
                          )
                        }
                        value={key}
                      >
                        {({ selectedKey, active }) => (
                          <>
                            <div className='flex items-center'>
                              <span
                                className={classNames(
                                  selectedKey ? 'font-semibold' : 'font-normal',
                                  'ml-3 block truncate',
                                )}
                              >
                                {key}
                              </span>
                            </div>

                            {selectedKey ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-2',
                                )}
                              >
                                <CheckIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ),
                  )}
                </Listbox.Options>
              </Transition>
            </div>
            <Listbox.Label className='block text-sm pl-1 md:pl-3 pr-2 lg:pr-12 xl:pr-16 font-medium text-gray-400'>
              {' '}
              of {maxPages == 0 ? 1 : maxPages}
            </Listbox.Label>
          </>
        )}
      </Listbox>
      <Listbox
        value={resultsPerPage}
        onChange={setResultsPerPage}
        disabled={isDisabled}
      >
        {({ open }) => (
          <>
            <Listbox.Label className='block text-sm pl-1 md:pl-3 pr-2 font-medium text-gray-400 pt-5 md:pt-0'>
              Showing{' '}
            </Listbox.Label>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-1 pr-20 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
                <span className='flex items-center'>
                  <span className='ml-3 block truncate'>{resultsPerPage}</span>
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <ChevronDownIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {RESULTS_PER_PAGE_KEYS.map((key, idx) => (
                    <Listbox.Option
                      key={idx}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-gray-800' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9 text-sm',
                        )
                      }
                      value={key}
                    >
                      {({ selectedKey, active }) => (
                        <>
                          <div className='flex items-center'>
                            <span
                              className={classNames(
                                selectedKey ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate',
                              )}
                            >
                              {key}
                            </span>
                          </div>

                          {selectedKey ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
            <Listbox.Label className='block text-sm pl-1 md:pl-3 pr-2 font-medium text-gray-400'>
              {' '}
              Results Per Page
            </Listbox.Label>
          </>
        )}
      </Listbox>
    </div>
  );
}
