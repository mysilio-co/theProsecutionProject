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

export default function ExploreTab({ data }) {
  const svgRef = useRef();
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
      <div className='bg-gray-800 border-t border-gray-700'>
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
      <div>
        <DataVisualizerDropdowns
          chartType={selectedTab}
          setTimeRange={setTimeRange}
          setVariable={setVariable}
        ></DataVisualizerDropdowns>
      </div>
      {selectedTab === DataVisualizerConstants.LINE ? (
        <LineChart
          svgRef={svgRef}
          data={data}
          chartType={selectedTab}
          timeRange={timeRange}
          variable={variable}
          setCategoryNames={setCategoryNames}
          setChartData={setChartData}
        />
      ) : (
        ''
      )}
      {selectedTab === DataVisualizerConstants.BAR ? (
        <BarChart
          svgRef={svgRef}
          data={data}
          chartType={selectedTab}
          variable={variable}
          setCategoryNames={setCategoryNames}
          setChartData={setChartData}
        />
      ) : (
        ''
      )}
      {selectedTab === DataVisualizerConstants.PIE ? (
        <PieChart
          svgRef={svgRef}
          data={data}
          chartType={selectedTab}
          variable={variable}
          setCategoryNames={setCategoryNames}
          setChartData={setChartData}
        />
      ) : (
        ''
      )}
      {selectedTab === DataVisualizerConstants.CHOROPLETH ? (
        <ChoroplethChart
          svgRef={svgRef}
          data={data}
          chartType={selectedTab}
          setCategoryNames={setCategoryNames}
          setChartData={setChartData}
        />
      ) : (
        ''
      )}
      <ChartColors categoryNames={categoryNames} />
      <ChartDataTable data={chartData} category={variable} />
    </div>
  );
}
