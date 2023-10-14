import { Disclosure, Listbox, Transition } from '@headlessui/react';
import { useState, Fragment, useEffect } from 'react';
import {
  AGGREGATE_OPTIONS,
  CHOROPLETH,
  DATE_OPTIONS,
  LINE,
} from '../../../scripts/data-visualizer-constants';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../../scripts/common';
import { CATEGORICAL_KEYS } from '../../../scripts/constants';

export default function DataVisualizerDropdowns({
  chartType,
  setTimeRange,
  setVariable,
}) {
  const CATEGORICAL_OPTIONS = ['All'].concat(CATEGORICAL_KEYS.sort());
  const [aggregateOptions, setAggregateOptions] = useState(
    AGGREGATE_OPTIONS[0],
  );
  const [dateOptions, setDateOptions] = useState(DATE_OPTIONS[0]);
  const [categoricalOption, setCategoricalOption] = useState(
    CATEGORICAL_OPTIONS[0],
  );

  useEffect(() => {
    setTimeRange(dateOptions);
  }, [dateOptions]);

  useEffect(() => {
    setVariable(categoricalOption);
  }, [categoricalOption]);

  return (
    <div className='md:flex items-center md:mt-2 mb-5'>
      {chartType === CHOROPLETH ? (
        <p className='p-3'>
          All variables are grouped together in map view. Use the Filter modal
          to view only specified variables.
        </p>
      ) : (
        ''
      )}
      {/* <Listbox value={aggregateOptions} onChange={setAggregateOptions}>
        {({ open }) => (
          <>
            <Listbox.Label className='block text-sm pl-1 md:pl-4 pr-2 font-medium text-gray-400'>
              Statistic
            </Listbox.Label>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-1 pr-20 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
                <span className='flex items-center'>
                  <span className='ml-3 block truncate'>
                    {aggregateOptions}
                  </span>
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
                  {AGGREGATE_OPTIONS.map((key, idx) => (
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
          </>
        )}
      </Listbox> */}

      {chartType != CHOROPLETH ? (
        <Listbox value={categoricalOption} onChange={setCategoricalOption}>
          {({ open }) => (
            <>
              <Listbox.Label className='block text-sm pl-1 md:pl-4 pr-2 font-medium text-gray-400 pt-5 md:pt-0'>
                Variable
              </Listbox.Label>
              <div className='relative mt-1 mx-4 md:mx-0'>
                <Listbox.Button className='relative min-w-full text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-1 pr-20 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
                  <span className='flex items-center'>
                    <span className='ml-3 block truncate'>
                      {categoricalOption}
                    </span>
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
                  <Listbox.Options className='absolute z-10 mt-1 max-h-64 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {CATEGORICAL_OPTIONS.map((key, idx) => (
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
            </>
          )}
        </Listbox>
      ) : (
        <div />
      )}
      {chartType === LINE ? (
        <Listbox value={dateOptions} onChange={setDateOptions}>
          {({ open }) => (
            <>
              <Listbox.Label className='block text-sm pl-1 md:pl-4 pr-2 font-medium text-gray-400 pt-5 md:pt-0'>
                Date grouping
              </Listbox.Label>
              <div className='relative mt-1 mx-4 md:mx-0'>
                <Listbox.Button className='relative w-full text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-1 pr-20 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
                  <span className='flex items-center'>
                    <span className='ml-3 block truncate'>{dateOptions}</span>
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
                    {DATE_OPTIONS.map((key, idx) => (
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
            </>
          )}
        </Listbox>
      ) : (
        <div />
      )}
    </div>
  );
}
