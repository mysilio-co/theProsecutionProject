import { Disclosure } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import DataTable from '../components/data-table.jsx';

import BasicSearch from '../components/basic-search';
import Footer from '../components/footer.jsx';
import ContactUsModalContents from '../components/modals/contact-us-modal-contents.jsx';
import DataVisualizerModalContents from '../components/modals/data-visualizer-modal-contents.jsx';
import DownloadModalContents from '../components/modals/download-modal-contents.jsx';
import FilterModalContents from '../components/modals/filter-modal-contents.jsx';
import HowToModalContents from '../components/modals/how-to-modal-contents.jsx';
import InProgressModalContents from '../components/modals/in-progress-modal-contents.jsx';
import Modal from '../components/modals/modal.jsx';
import QuickstartModalContents from '../components/modals/quickstart-modal-contents.jsx';
import WelcomeModalContents from '../components/modals/welcome-modal-contents.jsx';
import ResultsPerPage from '../components/results-per-page.jsx';
import SearchBy from '../components/search-by';
import { classNames } from '../scripts/common.js';
import {
  ALL_COLUMN_KEYS,
  ORDER_BY_KEYS,
  RESULTS_PER_PAGE_KEYS,
  SEARCH_BY_KEYS,
  SEARCH_BY_KEYS_MOBILE,
  TAB_NAMES,
} from '../scripts/constants.js';
import {
  removeMismatchedDropdown,
  removeMismatchedRange,
  runAllFilters,
} from '../scripts/data-handling.js';
import {
  generateListDropdowns,
  generateNumericRanges,
} from '../scripts/filter-components.js';
import { STATIC_QUERIES } from '../scripts/query-constants.js';
import {
  addMultipleQueryParams,
  addQueryParam,
  retrieveDropdownParams,
  retrieveNumericParams,
} from '../scripts/router-handling';

const fetcher = async url =>
  await fetch(url).then(res => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.status = res.status;
      throw error;
    }
    return res.json();
  });

export default function DataExplorer() {
  const tabs = Object.keys(TAB_NAMES);
  const router = useRouter();
  const query = router.query;
  const selectedTab = query.tab || tabs[0];
  let hasError = false;
  let untouchedData = null;
  const [rangeValues, setRangeValues] = useState([]);
  const [dropdownValues, setDropdownValues] = useState([]);
  let displayData = [];
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [inProgressAlertShown, setInProgressAlertShown] = useState(false);
  const [currentModal, setCurrentModal] = useState(
    <WelcomeModalContents
      setShowModal={setShowModal}
      showHowToModal={showHowToModal}
    />,
  );
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );
  let isMobile = width <= 768;
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [newTabSelected, setNewTabSelected] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  function showHowToModal() {
    setShowModal(true);
    setCurrentModal(
      <HowToModalContents
        setShowModal={setShowModal}
        router={router}
        isMobile={isMobile}
      />,
    );
  }

  function showFilterButton() {
    return (
      <button
        disabled={isLoading && !hasError}
        onClick={() => {
          setShowModal(true);
          setCurrentModal(
            <FilterModalContents
              rangeValues={rangeValues}
              dropdownValues={dropdownValues}
              setShowModal={setShowModal}
              isLoading={isLoading}
              hasError={hasError}
            />,
          );
        }}
        className='mt-4 md:mt-0 md:ml-4 lg:ml-8 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded'
      >
        Filter Data
      </button>
    );
  }

  function updateIsLoadingState() {
    if (untouchedData && isLoading) {
      setIsLoading(false);
    }
  }

  function updateHasError(errorFormula) {
    hasError = hasError || errorFormula;
  }

  function getSheetData(tab) {
    const isGeneral = tab === 'General';
    const isInProgress = tab === 'In Progress';
    const fouo = getChunksOfSheet('U//FOUO', tab);
    const { data: pending, error: pendingError } = useSWR(
      isInProgress ? '/api/sheets/getSheets?sheet=Pending cases' : null,
      fetcher,
    );
    const { data: nonGeneral, error: nonGeneralError } = useSWR(
      !isGeneral ? '/api/sheets/getSheets?sheet=' + TAB_NAMES[tab] : null,
      fetcher,
    );
    updateHasError(pendingError || nonGeneralError);
    if (hasError) {
      return null;
    } else {
      if (isInProgress) {
        return nonGeneral && pending ? nonGeneral.concat(pending) : null;
      } else if (isGeneral) {
        return fouo ? fouo : null;
      } else {
        return nonGeneral ? nonGeneral : null;
      }
    }
  }

  function getChunksOfSheet(sheet, tab) {
    //shouldCall is used to determine if the call should be made using nextJS conditional fetching
    //if false, cascades down and prevents the sheets calls from being made
    const shouldCall = tab === 'General';
    const { data: dateColumn, error: dateColumnError } = useSWR(
      shouldCall ? '/api/sheets/getSheetDateColumn?sheet=' + sheet : null,
      fetcher,
    );
    updateHasError(dateColumnError);
    const lengthOfSheet = dateColumn ? dateColumn.length : null;
    const { data: first, error: firstError } = useSWR(
      !hasError
        ? '/api/sheets/getSheets?sheet=' +
            sheet +
            '&start=' +
            1 +
            '&end=' +
            1500
        : null,
      fetcher,
    );
    const { data: second, error: secondError } = useSWR(
      !hasError
        ? '/api/sheets/getSheets?sheet=' +
            sheet +
            '&start=' +
            1500 +
            '&end=' +
            3000
        : null,
      fetcher,
    );
    const { data: third, error: thirdError } = useSWR(
      lengthOfSheet && !hasError
        ? '/api/sheets/getSheets?sheet=' +
            sheet +
            '&start=' +
            3000 +
            '&end=' +
            lengthOfSheet
        : null,
      fetcher,
    );
    updateHasError(firstError || secondError || thirdError);
    return first && second && third && !hasError
      ? first.concat(second).concat(third)
      : null;
  }

  function handleWindowSizeChange() {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
  }

  function handleInProgressAlert(tab) {
    if (tab === 'In Progress') {
      if (!inProgressAlertShown) {
        setCurrentModal(
          <InProgressModalContents setShowModal={setShowModal} />,
        );
        setShowModal(true);
        setInProgressAlertShown(true);
      }
    } else {
      if (inProgressAlertShown) {
        setInProgressAlertShown(false);
      }
    }
  }

  function determineFilterActive() {
    let urlContainsQueryFilter = false;
    Object.keys(query).forEach(queryName => {
      if (!STATIC_QUERIES.includes(queryName)) {
        urlContainsQueryFilter = true;
      }
    });
    setFilterActive(urlContainsQueryFilter);
  }

  // adding event listener for screen resize and setting the initial load to be true
  // we can attach this initial load variable to any formulas that use the width variable to re-render the formula
  // after the window actually has a width
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    setIsInitiallyLoaded(true);
    if (!window.sessionStorage.getItem('welcomeShown')) {
      sessionStorage.setItem('welcomeShown', true);
      setShowModal(true);
    }
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  // filter data when any filter values are updated
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [isLoading]);

  // filter data when any filter values are updated
  useEffect(() => {
    if (untouchedData) {
      setDropdownValues(generateListDropdowns(untouchedData));
      setRangeValues(generateNumericRanges(untouchedData));
      setFilteredData(runAllFilters(untouchedData, query, isMobile));
    }
    determineFilterActive();
  }, [isLoading, query]);

  // set isLoading to true if new tab selected that has yet to be loaded
  useEffect(() => {
    if (!untouchedData) {
      setIsLoading(true);
      setFilteredData([]);
    }
    handleInProgressAlert(selectedTab);
  }, [selectedTab]);

  // set newTabSelected to true if either a new tab is selected or a new tab finishes loading
  useEffect(() => {
    setNewTabSelected(true);
  }, [selectedTab, isLoading]);

  // sets range and dropdown filters to match current tab in case they contain values not currently availale
  // selecting a new tab sets the newTabSelected to true and then this runs after data has been filtered
  // and then sets this to newTabSelected to false
  useEffect(() => {
    if (newTabSelected && untouchedData) {
      const dropdownValuesToBeUpdated = removeMismatchedDropdown(
        router,
        dropdownValues,
      );
      const rangeValuesToBeUpdated = removeMismatchedRange(router, rangeValues);
      addMultipleQueryParams(
        new Map([...dropdownValuesToBeUpdated, ...rangeValuesToBeUpdated]),
        router,
      );
      setNewTabSelected(false);
    }
  }, [filteredData, isLoading]);

  useEffect(() => {
    if (router.isReady) {
      const tab =
        router.query.tab in TAB_NAMES
          ? router.query.tab
          : Object.keys(TAB_NAMES)[0];
      const numShown = RESULTS_PER_PAGE_KEYS.includes(router.query.numShown)
        ? router.query.numShown
        : RESULTS_PER_PAGE_KEYS[0];
      const sortBy = ALL_COLUMN_KEYS.includes(router.query.sortBy)
        ? router.query.sortBy
        : null;
      const order = ORDER_BY_KEYS.includes(router.query.order)
        ? router.query.order
        : null;
      const search = router.query.search ? router.query.search : null;
      const searchByKeys = isMobile ? SEARCH_BY_KEYS_MOBILE : SEARCH_BY_KEYS;
      const searchBy = searchByKeys.includes(router.query.searchBy)
        ? router.query.searchBy
        : null;
      const showAll = router.query.showAll == 'true' ? 'true' : null;
      const from = Date.parse(router.query.from) ? router.query.from : null;
      const to = Date.parse(router.query.to) ? router.query.to : null;
      const dropdownValues = retrieveDropdownParams(router.query);
      const numericValues = retrieveNumericParams(router.query);
      let query = { tab: tab, currentPage: 1, numShown: numShown };
      if (sortBy && order) {
        query.sortBy = sortBy;
        query.order = order;
      }
      if (search) {
        query.search = search;
      }
      if (searchBy) {
        query.searchBy = searchBy;
      }
      if (showAll) {
        query.showAll = showAll;
      }
      if (from) {
        query.from = from;
      }
      if (to) {
        query.to = to;
      }
      query = { ...query, ...dropdownValues };
      query = { ...query, ...numericValues };
      router.replace({ pathname: '', query: query }, undefined, {
        shallow: true,
      });
    }
  }, [router.isReady]);

  const search = query.search || '';
  untouchedData = getSheetData(selectedTab);
  updateIsLoadingState();

  if (filteredData && query.currentPage && query.numShown) {
    displayData = filteredData.slice(
      (parseInt(query.currentPage) - 1) * parseInt(query.numShown),
      parseInt(query.currentPage) * parseInt(query.numShown),
    );
  } else {
    displayData = filteredData;
  }

  return (
    <>
      <Disclosure as='header' className='bg-gray-800'>
        {({ open }) => (
          <>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              innerComponent={currentModal}
            />
            <div className='max-w-7xl flex-row justify-center mx-auto px-2 sm:px-4 md:divide-y md:divide-gray-700 md:px-2 lg:px-4'>
              <div className='relative md:h-16 flex flex-col md:flex-row justify-center'>
                <div className='relative z-10 px-2 py-3 md:py-0 flex justify-center md:justify-start lg:px-0 md:mr-10 lg:mr-12'>
                  <div className='flex-shrink-0 flex items-center'>
                    <a
                      href='https://theprosecutionproject.org/'
                      target='_blank'
                    >
                      <img
                        className='block h-12 md:h-10 w-auto'
                        src='https://theprosecutionproject.org/wp-content/uploads/2020/08/tPP-4.png'
                        alt='The Prosecution Project'
                      />
                    </a>
                  </div>
                </div>
                <div className='flex-row md:flex items-center'>
                  <div className='flex py-2 md:py-0 items-center mr-0'>
                    <BasicSearch
                      router={router}
                      search={search}
                      isLoading={isLoading}
                    />
                  </div>
                  <div className='flex py-2 pb-2 md:py-0 items-center'>
                    <SearchBy
                      router={router}
                      isMobile={isMobile}
                      isAllColumns={query.showAll}
                      isLoading={isLoading}
                      hasError={hasError}
                    />
                  </div>
                  <div className='flex py-2 pb-2 md:py-0 items-center'>
                    <button
                      disabled={isLoading && !hasError}
                      onClick={() => {
                        setShowModal(true);
                        setCurrentModal(
                          <QuickstartModalContents
                            setShowModal={setShowModal}
                            router={router}
                          />,
                        );
                      }}
                      className='h-38px mt-1 mx-2 lg:ml-6 w-full md:w-32 lg:w-36 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-2 rounded'
                    >
                      Sample Queries
                    </button>
                  </div>
                  <div className='flex py-2 pb-5 md:py-0 items-center'>
                    <button
                      disabled={isLoading && !hasError}
                      onClick={() => {
                        setShowModal(true);
                        setCurrentModal(
                          <DataVisualizerModalContents
                            data={filteredData}
                            setShowModal={setShowModal}
                            queryParams={query}
                          />,
                        );
                      }}
                      className='h-38px mt-1 mx-2 lg:ml-6 w-full md:w-28 lg:w-36 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-2 rounded'
                    >
                      Visualize Data
                    </button>
                  </div>
                </div>
              </div>
              <nav
                className='md:py-2 md:flex md:space-x-8 justify-center'
                aria-label='Global'
              >
                {tabs.map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      addQueryParam('tab', tab, router);
                    }}
                  >
                    <a
                      key={tab}
                      className={classNames(
                        tab === selectedTab
                          ? 'bg-gray-900 text-white hover:text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium hover:no-underline',
                      )}
                      aria-current={tab === selectedTab ? 'page' : undefined}
                    >
                      {tab}
                    </a>
                  </button>
                ))}
              </nav>
            </div>
          </>
        )}
      </Disclosure>
      <DataTable
        title={selectedTab}
        data={displayData}
        length={!!filteredData ? filteredData.length : 0}
        router={router}
        isLoading={isLoading}
        isInitiallyLoaded={isInitiallyLoaded}
        isMobile={isMobile}
        showFilter={query.showFilter}
        hasError={hasError}
        showFilterButton={showFilterButton}
        filterActive={filterActive}
      />
      <div className='divide-y divide-gray-700 bg-gray-800'>
        <div className='relative z-2 flex-1 px-2 pt-6 pb-6 flex items-center justify-center sm:inset-0 bg-gray-800'>
          <div className='w-full flex-col md:flex-wrap xl:flex-nowrap xl:flex-row md:inline-flex items-center justify-center'>
            <div className=''>
              <ResultsPerPage
                router={router}
                length={!!filteredData ? filteredData.length : 0}
                isLoading={isLoading}
                hasError={hasError}
              />
            </div>
            <div className='md:mt-6 xl:mt-0'>
              <button
                onClick={() => {
                  setShowModal(true);
                  setCurrentModal(
                    <DownloadModalContents
                      data={filteredData}
                      setShowModal={setShowModal}
                      query={router.asPath}
                      selectedTab={selectedTab}
                    />,
                  );
                }}
                className='mt-5 max-h-14 md:mt-0 md:ml-2 lg:ml-6 w-full md:w-36 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded'
              >
                Download Data
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  setCurrentModal(
                    <HowToModalContents
                      setShowModal={setShowModal}
                      router={router}
                      isMobile={isMobile}
                    />,
                  );
                }}
                className='mt-5 max-h-14 md:mt-0 md:ml-6 lg:ml-6 w-full md:w-36 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded'
              >
                User Manual
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  setCurrentModal(
                    <ContactUsModalContents setShowModal={setShowModal} />,
                  );
                }}
                className='mt-5 max-h-14 md:mt-0 md:ml-6 lg:ml-6 w-full md:w-36 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded'
              >
                Request Data
              </button>
              <a
                target='_blank'
                href='https://docs.google.com/forms/d/e/1FAIpQLSeej1ck7SXGkpvS7A3ekdNSeITU_VS9Xnbz4ekM8zPKOhUpkw/viewform?usp=sf_link'
              >
                <button className='mt-5 max-h-14 md:mt-0 md:ml-6 lg:ml-6 w-full md:w-36 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded'>
                  Give Feedback
                </button>
              </a>
            </div>
          </div>
        </div>
        <Footer isMobile={isMobile} isInitiallyLoaded={isInitiallyLoaded} />
      </div>
    </>
  );
}
