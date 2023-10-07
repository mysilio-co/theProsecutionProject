import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import LineChart from './line-chart';
import BarChart from './bar-chart';
import PieChart from './pie-chart';
import ChartDataTable from './chart-data-table';
import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants';
import DataVisualizerDropdowns from './data-visualizer-dropdowns';
import ChartColors from './chart-colors';
import { classNames } from '../../../scripts/common.js';
import { cloneDeep } from 'lodash';
import { DATA_VISUALIZER_TABS } from '../../../scripts/constants';
import ChoroplethChart from './choropleth-chart';
import ActiveFilters from './active-filters';

export default function ExploreTab({ data, queryParams }) {
  const svgRef = useRef();
  const modalRef = useRef();
  const [selectedTab, setSelectedTab] = useState(
    DataVisualizerConstants.CHART_TYPES[0],
  );
  const [timeRange, setTimeRange] = useState(
    DataVisualizerConstants.DATE_OPTIONS[0],
  );
  const [variable, setVariable] = useState('All');
  const [chartData, setChartData] = useState([]);
  const [chartColors, setChartColors] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  function setModalVisibility(showModalValue) {
    setShowModal(showModalValue);
  }

  return (
    <div>
      <div className='bg-gray-800 border-t border-gray-700' ref={modalRef}>
        <nav className='px-2 md:py-2 md:flex md:space-x-8' aria-label='Global'>
          {DataVisualizerConstants.CHART_TYPES.map(tab => (
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
                  'whitespace-nowrap rounded-md py-2 px-5 inline-flex items-center text-sm font-medium hover:no-underline',
                )}
                aria-current={tab === selectedTab ? 'page' : undefined}
              >
                {tab}
              </a>
            </button>
          ))}
        </nav>
      </div>
      <div>
        <DataVisualizerDropdowns
          chartType={selectedTab}
          setTimeRange={setTimeRange}
          setVariable={setVariable}
        ></DataVisualizerDropdowns>
      </div>
      {selectedTab === DataVisualizerConstants.LINE ? (
        <div className='overflow-x-scroll'>
          <LineChart
            svgRef={svgRef}
            data={data}
            chartType={selectedTab}
            timeRange={timeRange}
            variable={variable}
            width={
              modalRef.current && modalRef.current.offsetWidth > 900
                ? modalRef.current.offsetWidth
                : 900
            }
            setCategoryNames={setCategoryNames}
            setChartData={setChartData}
          />
        </div>
      ) : (
        ''
      )}
      {selectedTab === DataVisualizerConstants.BAR ? (
        <div className='overflow-x-scroll'>
          <BarChart
            svgRef={svgRef}
            data={data}
            chartType={selectedTab}
            variable={variable}
            width={
              modalRef.current && modalRef.current.offsetWidth > 600
                ? modalRef.current.offsetWidth
                : 600
            }
            setCategoryNames={setCategoryNames}
            setChartData={setChartData}
          />
        </div>
      ) : (
        ''
      )}
      {selectedTab === DataVisualizerConstants.PIE ? (
        <div className='overflow-x-scroll'>
          <PieChart
            svgRef={svgRef}
            data={data}
            chartType={selectedTab}
            variable={variable}
            width={
              modalRef.current && modalRef.current.offsetWidth < 400
                ? modalRef.current.offsetWidth
                : 400
            }
            height={
              modalRef.current && modalRef.current.offsetWidth < 400
                ? modalRef.current.offsetWidth
                : 400
            }
            setCategoryNames={setCategoryNames}
            setChartData={setChartData}
          />
        </div>
      ) : (
        ''
      )}
      {selectedTab === DataVisualizerConstants.CHOROPLETH ? (
        <div className='overflow-x-scroll'>
          <ChoroplethChart
            svgRef={svgRef}
            data={data}
            chartType={selectedTab}
            setCategoryNames={setCategoryNames}
            setChartData={setChartData}
          />
        </div>
      ) : (
        ''
      )}
      <ChartColors categoryNames={categoryNames} />
      <ActiveFilters queryParams={queryParams}></ActiveFilters>
      <ChartDataTable
        data={chartData}
        category={
          selectedTab === DataVisualizerConstants.CHOROPLETH
            ? 'Location: state'
            : variable
        }
      />
    </div>
  );
}
