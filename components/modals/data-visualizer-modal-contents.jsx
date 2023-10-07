import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { classNames } from '../../scripts/common.js';
import { cloneDeep } from 'lodash';
import { DATA_VISUALIZER_TABS } from '../../scripts/constants';
import ExploreTab from './data-visualizer/explore-tab';

export default function DataVisualizerModalContents({
  data,
  setShowModal,
  queryParams,
}) {
  const [selectedTab, setSelectedTab] = useState(DATA_VISUALIZER_TABS[0]);
  function setModalVisibility(showModalValue) {
    setShowModal(showModalValue);
  }

  return (
    <Dialog.Panel className='relative transform rounded-lg overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:m-auto md:h-5/6'>
      <div className='bg-white pt-0 pb-4 sm:pb-4'>
        <div className='sm:flex sm:items-start'>
          <div className='mt-0 text-center sm:text-left w-full'>
            <Dialog.Title
              as='h3'
              className='p-4 bg-gray-800 text-lg font-medium leading-6 text-white'
            >
              Data Visualizer
            </Dialog.Title>
            <div className='bg-gray-800 border-t border-gray-700'>
              <nav
                className='px-2 md:py-2 md:flex md:space-x-8'
                aria-label='Global'
              >
                {DATA_VISUALIZER_TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedTab(tab);
                    }}
                  >
                    <a
                      key={tab}
                      className={classNames(
                        tab === selectedTab
                          ? 'bg-gray-900 text-white hover:text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'whitespace-nowrap rounded-md py-2 px-3 inline-flex items-center text-sm font-medium hover:no-underline',
                      )}
                      aria-current={tab === selectedTab ? 'page' : undefined}
                    >
                      {tab}
                    </a>
                  </button>
                ))}
              </nav>
            </div>
            {selectedTab === 'Explore' ? (
              <ExploreTab data={data} queryParams={queryParams} />
            ) : (
              ''
            )}
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
