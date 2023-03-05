import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";

import DataTable from "../components/data-table.jsx";
import { Disclosure } from "@headlessui/react";

import { fuzzySearch, sort, findFirstOccurenceOfYear, filterByDropdown, filterByDate, filterByRange, removeMismatchedDropdown, removeMismatchedRange, filterByColumn, runAllFilters } from "../scripts/data-handling.js";
import SearchBy from "../components/search-by";
import { addMultipleQueryParams, addQueryParam, retrieveDropdownParams, retrieveNumericParams } from "../scripts/router-handling";
import BasicSearch from "../components/basic-search";
import ResultsPerPage from "../components/results-per-page.jsx";
import { RESULTS_PER_PAGE_KEYS, TAB_NAMES, SEARCH_BY_KEYS_MOBILE, ORDER_BY_KEYS, DESKTOP_COLUMN_KEYS, SEARCH_BY_KEYS_EXPRESS, SEARCH_BY_KEYS, DROPDOWN_KEYS } from "../scripts/constants.js";
import Modal from "../components/modals/modal.jsx";
import DownloadModalContents from "../components/modals/download-modal-contents.jsx";
import FAQModalContents from "../components/modals/faq-modal-contents.jsx";
import ContactUsModalContents from "../components/modals/contact-us-modal-contents.jsx";
import FilterModalContents from "../components/modals/filter-modal-contents.jsx";
import { classNames } from "../scripts/common.js";
import { generateListDropdowns, generateNumericRanges } from "../scripts/filter-components.js";

const fetcher = async (url) => await fetch(url).then((res) => {
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.status = res.status
    throw error
  }
  return res.json()}
  );

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
  const [currentModal, setCurrentModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  function showFilterButton() {
    return (
      <button disabled={isLoading && !hasError} onClick={()=>{setShowModal(true); setCurrentModal(
        <FilterModalContents rangeValues={rangeValues} dropdownValues={dropdownValues} setShowModal={setShowModal} isLoading={isLoading} hasError={hasError}/>)
      }} className="mt-4 md:mt-0 md:ml-8 lg:ml-8 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded">
        Filter Data
      </button>
    )
  }

  function updateIsMobileState() {
    if(typeof window !== "undefined") {
      const isMobileWidth = window.innerWidth<768;
      if(isMobileWidth != isMobile) {
        setIsMobile(isMobileWidth);
      }
    }
  }

  function updateIsLoadingState() {
    if(untouchedData && isLoading) {
      setIsLoading(false);
    }
  }

  function updateHasError(errorFormula) {
    hasError = hasError || errorFormula;
  }

  function getSheetData(tab) {
    const isGeneral = tab==="General" ? true : false;
    const fouo = getChunksOfSheet('U//FOUO', '2010', tab);
    const { data: pending, error: pendingError } = useSWR(isGeneral ? '/api/sheets/getSheets?sheet=Pending cases' : null, fetcher);
    const { data: nonGeneral, error:nonGeneralError } = useSWR(!isGeneral ? '/api/sheets/getSheets?sheet='+TAB_NAMES[tab] : null, fetcher);
    updateHasError(pendingError || nonGeneralError);
    return isGeneral ? (fouo && pending && !hasError ? fouo.concat(pending) : null) : (nonGeneral && !hasError ? nonGeneral : null);
  }

  function getChunksOfSheet(sheet, year, tab) {
    //shouldCall is used to determine if the call should be made using nextJS conditional fetching
    //if false, cascades down and prevents the sheets calls from being made
    const shouldCall = tab==="General" ? true : false;
    const { data:dateColumn, error:dateColumnError } = useSWR(shouldCall ? '/api/sheets/getSheetDateColumn?sheet='+sheet : null, fetcher);
    updateHasError(dateColumnError);
    const locationOfYear = dateColumn && !hasError ? findFirstOccurenceOfYear(dateColumn, year) : null;
    const lengthOfSheet = dateColumn ? dateColumn.length : null;
    const { data: firstHalf, error: firstHalfError } = useSWR(locationOfYear && !hasError ? '/api/sheets/getSheets?sheet='+sheet+'&start='+1+'&end='+(locationOfYear-1) : null, fetcher);
    const { data: secondHalf, error: secondHalfError } = useSWR(locationOfYear && lengthOfSheet && !hasError ? '/api/sheets/getSheets?sheet='+sheet+'&start='+(locationOfYear-1)+'&end='+lengthOfSheet : null, fetcher);
    updateHasError(firstHalfError || secondHalfError);
    return firstHalf && secondHalf && !hasError ? firstHalf.concat(secondHalf) : null;
  }

  // filter data when any filter values are updated
  useEffect(() => {
    if(untouchedData) {
      setDropdownValues(generateListDropdowns(untouchedData));
      setRangeValues(generateNumericRanges(untouchedData));
      setFilteredData(runAllFilters(untouchedData, query, isMobile));
    }
  }, [isLoading, query]);

  // filter data when any filter values are updated
  useEffect(() => {
    if(!untouchedData) {
      setIsLoading(true);
      setFilteredData([]);
    }
  }, [selectedTab]);

  // removes any dropdown/numeric range values that aren't applicable to current tab on tab change
  useEffect(() => {
    if(!isLoading) {
      const dropdownValuesToBeUpdated = removeMismatchedDropdown(router, dropdownValues);
      const rangeValuesToBeUpdated = removeMismatchedRange(router, rangeValues);
      addMultipleQueryParams(new Map([...dropdownValuesToBeUpdated, ...rangeValuesToBeUpdated]), router);
    }
  }, [isLoading, selectedTab]);


  useEffect(()=>{
    if(router.isReady) {
      const tab = router.query.tab in TAB_NAMES ? router.query.tab : Object.keys(TAB_NAMES)[0];
      const numShown = RESULTS_PER_PAGE_KEYS.includes(router.query.numShown) ? router.query.numShown : RESULTS_PER_PAGE_KEYS[0];
      const sortBy = DESKTOP_COLUMN_KEYS.includes(router.query.sortBy) ? router.query.sortBy : null;
      const order = ORDER_BY_KEYS.includes(router.query.order) ? router.query.order : null;
      const search = router.query.search ? router.query.search : null;
      const searchByKeys = isMobile ? SEARCH_BY_KEYS_MOBILE : SEARCH_BY_KEYS;
      const searchBy = searchByKeys.includes(router.query.searchBy) ? router.query.searchBy : null;
      const showAll = router.query.showAll=="true" ? "true" : null;
      const showFilter = router.query.showFilter=="true" ? "true" : null;
      const from = Date.parse(router.query.from) ? router.query.from : null;
      const to = Date.parse(router.query.to) ? router.query.to : null;
      const dropdownValues = retrieveDropdownParams(router.query);
      const numericValues = retrieveNumericParams(router.query);
      const ref = React.createRef();
      let query = {tab: tab, currentPage: 1, numShown: numShown};
      if(sortBy && order) { 
        query.sortBy = sortBy; 
        query.order = order;
      }
      if(search) { 
        query.search = search; 
      }
      if(searchBy) { 
        query.searchBy = searchBy;
      }
      if(showAll) {
        query.showAll = showAll;
      }
      if(showFilter) {
        query.showFilter = showFilter;
      }
      if(from) {
        query.from = from;
      }
      if(to) {
        query.to = to;
      }
      query = { ...query, ...dropdownValues};
      query = { ...query, ...numericValues};
      router.replace(
        { pathname: '', query: query }, 
        undefined, 
        { shallow: true }
      );
    }
  }, [router.isReady]);

  const search = query.search || "";
  untouchedData = getSheetData(selectedTab);
  updateIsLoadingState();
  updateIsMobileState();

  if(filteredData && query.currentPage && query.numShown) {
    displayData = filteredData.slice((parseInt(query.currentPage)-1)*parseInt(query.numShown),((parseInt(query.currentPage))*parseInt(query.numShown)));
  } else {
    displayData = filteredData;
  }

  return (
    <>
      <Disclosure as="header" className="bg-gray-800">
        
        {({ open }) => (
          <>
            <Modal showModal={showModal} setShowModal={setShowModal}
              innerComponent={currentModal} 
            />
            <div className="max-w-7xl mx-auto px-2 sm:px-4 md:divide-y md:divide-gray-700 md:px-8">
              <div className="relative md:h-16 flex flex-col md:flex-row">
                <div className="relative z-10 px-2 py-3 md:py-0 flex justify-center md:justify-start lg:px-0 md:mr-20 lg:mr-40">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block h-12 md:h-8 w-auto"
                      src="https://theprosecutionproject.org/wp-content/uploads/2020/08/tPP-4.png"
                      alt="The Prosecution Project"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex py-2 md:py-0 items-center md:mr-20 lg:mr-30">
                    <BasicSearch router={router} search={search}/>
                  </div>
                  <div className="flex py-2 pb-5 md:py-0 items-center">
                    <SearchBy router={router} isMobile={isMobile} isAllColumns={query.showAll} isLoading={isLoading} hasError={hasError}/>
                  </div>
                  <button onClick={()=>{setShowModal(true); setCurrentModal(<FAQModalContents setShowModal={setShowModal}/>)}} className="mt-8 h-10 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-40 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded">
                    FAQ
                  </button>
                  <button onClick={()=>{setShowModal(true); setCurrentModal(<ContactUsModalContents setShowModal={setShowModal}/>)}} className="mt-8 h-10 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-40 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded">
                    Contact Us
                  </button>
                </div>
              </div>
              <nav
                className="md:py-2 md:flex md:space-x-8"
                aria-label="Global"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { addQueryParam("tab", tab, router);}}
                  >
                    <a
                      key={tab}
                      className={classNames(
                        tab === selectedTab
                          ? "bg-gray-900 text-white hover:text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md py-2 px-3 inline-flex items-center text-sm font-medium hover:no-underline"
                      )}
                      aria-current={tab === selectedTab ? "page" : undefined}
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
        isMobile={isMobile}
        showFilter={query.showFilter}
        hasError={hasError}
        showFilterButton={showFilterButton}
      />
      <div className="relative z-2 flex-1 px-2 pt-6 pb-6 flex items-center justify-center sm:inset-0 bg-gray-800">
        <div className="w-full flex-col md:flex-row md:inline-flex items-center justify-center">
          <ResultsPerPage router={router} length={!!filteredData ? filteredData.length : 0} isLoading={isLoading} hasError={hasError}/>
          <button onClick={()=>{setShowModal(true); setCurrentModal(<DownloadModalContents data={filteredData} setShowModal={setShowModal}/>)}} className="mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-40 bg-[#FC8F4D] hover:bg-orange-300 active:bg-[#FC8F4D] hover:bg-orange-300 text-black py-2 px-4 rounded">
            Download Data
          </button>
        </div>
      </div>
      <div className="flex-1 px-2 pt-6 pb-3 flex items-center justify-center sm:inset-0 bg-gray-800">
        <div className="relative">
          <a href="https://theprosecutionproject.org/" target="_blank">
            <img
              className="block h-24"
              src="https://i0.wp.com/theprosecutionproject.org/wp-content/uploads/2020/08/Illustration-Hiking-Website-Email-Header-2.png?w=600&ssl=1"
              alt="The Prosecution Project"
            />
          </a>
        </div>
      </div>
      <div className="flex-1 px-2 pt-12 md:pt-3 pb-12 md:pb-6 flex items-center justify-center sm:inset-0 bg-gray-800">
        <div className="mx-5">
          <a href="mailto:michael@theprosecutionproject.org" target="_blank">
            <img
              className="block h-10"
              src="/mail.png"
              alt="email icon"
            />
          </a>
        </div>
        <div className="mx-5">
          <a href="https://twitter.com/ProsecutionProj" target="_blank">
            <img
              className="block h-10"
              src="/twitter.png"
              alt="twitter logo"
            />
          </a>
        </div>
        <div className="mx-5">
          <a href="https://www.linkedin.com/company/the-prosecution-project/" target="_blank">
            <img
              className="block h-10"
              src="/linkedin.png"
              alt="linkedin logo"
            />
          </a>
        </div>
      </div>
    </>
  );
}