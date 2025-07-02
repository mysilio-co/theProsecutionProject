import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useEffect, useState } from 'react';
import { classNames } from '../../scripts/common';
import { GROUP_AFFILIATION_REGEX } from '../../scripts/constants';
import { addQueryParam, removeQueryParam } from '../../scripts/router-handling';

export default function Dropdown({
  label,
  options,
  router,
  isLoading,
  hasError,
}) {
  const [selectedKey, setSelectedKey] = useState([]);
  const isDisabled = isLoading && !hasError;
  const [initialLoad, setInitialLoad] = useState(true);
  const [isExclude, setIsExclude] = useState(false);

  useEffect(() => {
    if (!isDisabled && router.query[label]) {
      let param = _.replace(router.query[label], '!', '');
      console.log(router.query);
      setSelectedKey(param?.split(GROUP_AFFILIATION_REGEX));
    }
  }, [isDisabled, router.query[label]]);

  // This is triggered on first load of dropdown when selectedKey is []
  // removing the query param and impacting the filtering
  // initialLoad makes it so this is not an issue
  useEffect(() => {
    if (!isDisabled && !initialLoad) {
      const paramValue = (isExclude ? '!' : '') + selectedKey.join(', ');
      selectedKey.length < 1
        ? removeQueryParam(label, router)
        : addQueryParam(label, paramValue, router);
    }
    setInitialLoad(false);
  }, [selectedKey, isExclude]);

  useEffect(() => {
    if (initialLoad && router.query[label]) {
      setIsExclude(_.includes(router.query[label], '!'));
    }
  }, [initialLoad]);

  function handleCheckChange(e) {
    setIsExclude(e.target.checked);
  }

  return (
    <div className='pt-2 flex'>
      <div className='w-4/5'>
        <Listbox
          value={selectedKey}
          onChange={setSelectedKey}
          multiple
          className='z-0'
        >
          {({ open }) => (
            <>
              <Listbox.Label className='block text-start text-sm pr-2 font-medium text-gray-400'>
                {label}
              </Listbox.Label>
              <div className='relative'>
                <Listbox.Button className='relative w-full text-sm cursor-default rounded-md border border-gray-300 bg-white py-2 pl-1 pr-10 h-9 text-left shadow-sm focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800'>
                  <span className='flex items-center'>
                    <span className='ml-3 block truncate'>
                      {selectedKey.join(', ')}
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
                  <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                    {options.map((key, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          classNames(
                            selectedKey.includes(key)
                              ? 'text-white bg-gray-800'
                              : active
                              ? 'text-white bg-gray-500'
                              : 'text-gray-900',
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
                                  active ? 'text-white' : 'bg-gray-800',
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
      </div>
      <div className='w-1/5 flex flex-wrap justify-center'>
        <label
          className='w-full text-center block text-sm font-medium text-gray-400'
          htmlFor={_.snakeCase(label) + '_exclude'}
        >
          Exclude
        </label>
        <input
          className='rounded-sm border border-gray-300 shadow-sm focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800'
          id={_.snakeCase(label) + '_exclude'}
          type='checkbox'
          onChange={handleCheckChange}
          checked={isExclude}
        />
      </div>
    </div>
  );
}
