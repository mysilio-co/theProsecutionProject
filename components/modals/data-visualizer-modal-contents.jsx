import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Chart from '../chart';
import * as DataVisualizerConstants from '../../scripts/data-visualizer-constants';
import DataVisualizerDropdowns from '../data-visualizer-dropdowns';
import { classNames } from '../../scripts/common.js';
import { cloneDeep } from 'lodash';

export default function DataVisualizerModalContents({ data, setShowModal }) {
  const [chartType, setChartType] = useState(DataVisualizerConstants.LINE);
  const [timeRange, setTimeRange] = useState(
    DataVisualizerConstants.DATE_OPTIONS[0],
  );
  const [chartStatistic, setChartStatistic] = useState(
    DataVisualizerConstants.AGGREGATE_OPTIONS[0],
  );
  const [chartData, setChartData] = useState();
  function setModalVisibility(showModalValue) {
    setShowModal(showModalValue);
  }

  return (
    <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full md:m-auto md:h-5/6'>
      <div className='bg-white pt-0 pb-4 sm:pb-4'>
        <div className='sm:flex sm:items-start'>
          <div className='mt-0 text-center sm:text-left'>
            <Dialog.Title
              as='h3'
              className='p-4 bg-gray-800 text-lg font-medium leading-6 text-white'
            >
              Data Visualizer
            </Dialog.Title>
            <div>
              <div>
                <button
                  onClick={() => setChartType(DataVisualizerConstants.LINE)}
                  className={classNames(
                    chartType === DataVisualizerConstants.LINE
                      ? 'bg-gray-500'
                      : 'bg-gray-800',
                    'mt-8 max-h-14 md:mt-0 md:ml-6 lg:ml-12 w-full md:w-40 hover:bg-gray-500 hover:bg-gray-500 text-white py-2 px-4 rounded',
                  )}
                >
                  Line Chart
                </button>
                <button
                  onClick={() => setChartType(DataVisualizerConstants.BAR)}
                  className={classNames(
                    chartType === DataVisualizerConstants.BAR
                      ? 'bg-gray-500'
                      : 'bg-gray-800',
                    'mt-8 max-h-14 md:mt-0 md:ml-6 lg:ml-12 w-full md:w-40 hover:bg-gray-500 hover:bg-gray-500 text-white py-2 px-4 rounded',
                  )}
                >
                  Bar Chart
                </button>
                <button
                  onClick={() => setChartType(DataVisualizerConstants.PIE)}
                  className={classNames(
                    chartType === DataVisualizerConstants.PIE
                      ? 'bg-gray-500'
                      : 'bg-gray-800',
                    'mt-8 max-h-14 md:mt-0 md:ml-6 lg:ml-12 w-full md:w-40 hover:bg-gray-500 hover:bg-gray-500 text-white py-2 px-4 rounded',
                  )}
                >
                  Pie Chart
                </button>
                <DataVisualizerDropdowns
                  setTimeRange={setTimeRange}
                  setChartStatistic={setChartStatistic}
                ></DataVisualizerDropdowns>
              </div>
              <Chart
                data={data}
                chartType={chartType}
                timeRange={timeRange}
                aggregate={chartStatistic}
              ></Chart>
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
