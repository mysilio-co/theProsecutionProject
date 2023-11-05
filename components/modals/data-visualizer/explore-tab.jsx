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
import ActiveFilters from '../active-filters';
import useSWR from 'swr';
import CitationButton from './citation-button';
import DownloadButton from './download-button';
import CitationContents from './citation-contents';
import DownloadContents from './download-contents';
import ShowTitleCheckbox from './show-title-checkbox';
import ShowActiveFilterCheckbox from './show-filter-checkbox';

export default function ExploreTab({ data, queryParams }) {
  const fetcher = async url =>
    await fetch(url).then(res => {
      if (!res.ok) {
        const error = new Error(
          'An error occurred while fetching census data.',
        );
        error.status = res.status;
        throw error;
      }
      return res.json();
    });

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
  const [isCensus, setIsCensus] = useState(true);
  const [citationDisplay, setCitationDisplay] = useState(false);
  const [downloadDisplay, setDownloadDisplay] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [showActiveFilter, setShowActiveFilter] = useState(true);
  const ALL_VISUALS_ID = 'all-visuals';
  const VISUAL_ELEMENTS_ID = 'visual-elements';
  const TABLE_ELEMENTS_ID = 'table-elements';

  function setModalVisibility(showModalValue) {
    setShowModal(showModalValue);
  }

  const { data: censusData, error: censusError } = useSWR(
    selectedTab === DataVisualizerConstants.CHOROPLETH
      ? '/api/getCensusData'
      : null,
    fetcher,
  );

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
      <div className='block lg:flex justify-between'>
        <DataVisualizerDropdowns
          chartType={selectedTab}
          setTimeRange={setTimeRange}
          setVariable={setVariable}
          setIsCensus={setIsCensus}
        ></DataVisualizerDropdowns>
        <div className='block lg:flex justify-between'>
          <div className='flex'>
            <ShowTitleCheckbox
              showTitle={showTitle}
              setShowTitle={setShowTitle}
            />
            <ShowActiveFilterCheckbox
              showActiveFilter={showActiveFilter}
              setShowActiveFilter={setShowActiveFilter}
            />
          </div>

          <DownloadButton
            display={downloadDisplay}
            setDisplay={setDownloadDisplay}
          />
        </div>
      </div>
      <div>
        <DownloadContents
          display={downloadDisplay}
          allVisualsId={ALL_VISUALS_ID}
          visualElementsId={VISUAL_ELEMENTS_ID}
          tableElementsId={TABLE_ELEMENTS_ID}
        />
      </div>

      <div id={ALL_VISUALS_ID}>
        <div id={VISUAL_ELEMENTS_ID} className='py-2'>
          {showTitle ? (
            <p className='pl-5 mb-3 font-bold text-xl'>
              Case Count by "
              {variable === 'All' ? `${variable} cases` : variable}"
            </p>
          ) : (
            ''
          )}

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
            <div className='overflow-x-scroll flex justify-center'>
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
                censusData={censusData}
                isCensus={isCensus}
              />
              {!!censusData ? (
                ''
              ) : (
                <div className='container mx-auto  p-6 my-6 bg-gray-800 rounded-lg'>
                  <p className='text-center text-lg text-white'>
                    {DataVisualizerConstants.CENSUS_DATA_ERROR_MESSAGE}
                  </p>
                </div>
              )}
            </div>
          ) : (
            ''
          )}
          <ChartColors categoryNames={categoryNames} />
          {showActiveFilter ? (
            <ActiveFilters queryParams={queryParams}></ActiveFilters>
          ) : (
            ''
          )}
        </div>
        <div id={TABLE_ELEMENTS_ID} className='py-2'>
          <ChartDataTable
            data={chartData}
            category={
              selectedTab === DataVisualizerConstants.CHOROPLETH
                ? 'Location: state'
                : variable
            }
          />
        </div>
      </div>
    </div>
  );
}
