import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";

import useSWR from "swr";
import FilterDropdowns from '../components/filter.jsx';
import DataTable from "../components/data-table.jsx";
import { Disclosure } from "@headlessui/react";

import { fuzzySearch, sort, findFirstOccurenceOfYear, filterByDropdown } from "../scripts/data-handling.js";
// import { getChunksOfSheet } from "../scripts/sheets.js";
import SearchBy from "../components/search-by";
import { addQueryParam, retrieveDropdownParams } from "../scripts/router-handling";
import { generateListDropdowns } from '../scripts/filter';
import BasicSearch from "../components/basic-search";
import ResultsPerPage from "../components/results-per-page.jsx";
import ShowDropdownCheckbox from "../components/show-dropdown-checkbox";
import { RESULTS_PER_PAGE_KEYS, TAB_NAMES, SEARCH_BY_KEYS_MOBILE, ORDER_BY_KEYS, DESKTOP_COLUMN_KEYS, SEARCH_BY_KEYS_EXPRESS } from "../scripts/constants.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  let dropdownValues = [];
  let hasError = false;
  let data = null;
  let filteredData = null;
  let isLoading = true;
  const [isMobile, setIsMobile] = useState(false);

  function updateMobileState() {
    setIsMobile(window.innerWidth<768 ? true : false);
  }

  function updateHasError(errorFormula) {
    hasError = hasError || errorFormula;
  }

  function createExportUrl(data) {
    return !!data ? URL.createObjectURL(new Blob([d3.csvFormat(data)], { type: "text/csv" })) : "#";
  }

  function getSheetData(tab, viewType) {
    const isGeneral = tab==="General" ? true : false;
    const fouo = getChunksOfSheet('U//FOUO', viewType, '2010', tab);
    const { data: pending, error: pendingError } = useSWR(isGeneral ? '/api/sheets/getSheets?sheet=Pending cases&range='+viewType : null, fetcher);
    const { data: nonGeneral, error:nonGeneralError } = useSWR(!isGeneral ? '/api/sheets/getSheets?sheet='+TAB_NAMES[tab]+'&range='+viewType : null, fetcher);
    updateHasError(pendingError|| nonGeneralError);
    return isGeneral ? (fouo && pending && !hasError ? fouo.concat(pending) : null) : (nonGeneral && !hasError ? nonGeneral : null);
  }

  function getChunksOfSheet(sheet, viewType, year, tab) {
    //shouldCall is used to determine if the call should be made using nextJS conditional fetching
    //if false, cascades down and prevents the sheets calls from being made
    const shouldCall = tab==="General" ? true : false;
    const { data:dateColumn, error:dateColumnError } = useSWR(shouldCall ? '/api/sheets/getSheetDateColumn?sheet='+sheet : null, fetcher);
    updateHasError(dateColumnError);
    const locationOfYear = dateColumn && !hasError ? findFirstOccurenceOfYear(dateColumn, year) : null;
    const lengthOfSheet = dateColumn ? dateColumn.length : null;
    const { data: firstHalf, error: firstHalfError } = useSWR(locationOfYear && !hasError ? '/api/sheets/getSheets?sheet='+sheet+'&range='+viewType+'&start='+1+'&end='+(locationOfYear-1) : null, fetcher);
    const { data: secondHalf, error: secondHalfError } = useSWR(locationOfYear && lengthOfSheet && !hasError ? '/api/sheets/getSheets?sheet='+sheet+'&range='+viewType+'&start='+(locationOfYear-1)+'&end='+lengthOfSheet : null, fetcher);
    updateHasError(firstHalfError || secondHalfError);
    return firstHalf && secondHalf && !hasError ? firstHalf.concat(secondHalf) : null;
  }
  
  useEffect(() => {
    updateMobileState();
  }, []);

  useEffect(()=>{
    if(router.isReady) {
      const tab = router.query.tab in TAB_NAMES ? router.query.tab : Object.keys(TAB_NAMES)[0];
      const numShown = RESULTS_PER_PAGE_KEYS.includes(router.query.numShown) ? router.query.numShown : RESULTS_PER_PAGE_KEYS[0];
      const sortBy = DESKTOP_COLUMN_KEYS.includes(router.query.sortBy) ? router.query.sortBy : null;
      const order = ORDER_BY_KEYS.includes(router.query.order) ? router.query.order : null;
      const search = router.query.search ? router.query.search : null;
      const searchByKeys = isMobile ? SEARCH_BY_KEYS_MOBILE : SEARCH_BY_KEYS_EXPRESS;
      const searchBy = searchByKeys.includes(router.query.searchBy) ? router.query.searchBy : null;
      const showAll = router.query.showAll=="true" ? "true" : null;
      const showDropdown = router.query.showDropdown=="true" ? "true" : null;
      const dropdownValues = retrieveDropdownParams(router.query);
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
      if(showDropdown) {
        query.showDropdown = showDropdown;
      }
      query = { ...query, ...dropdownValues};
      router.replace(
        { pathname: '', query: query }, 
        undefined, 
        { shallow: true }
      );
    }
  }, [router.isReady]);


  const search = query.search || "";
  const viewType = isMobile ? "mobile" : query.showAll ? "desktop" : "express";
  data = getSheetData(selectedTab, viewType);

  if(data) {
    isLoading = false;
    dropdownValues = generateListDropdowns(data);
    data = fuzzySearch(data, query.search, query.searchBy, isMobile);
    data = filterByDropdown(data, query);
    if(!!query.sortBy && !!query.order) {
      sort(data, query.sortBy, query.order);
    } if(!!query.currentPage && !!query.numShown) {
      filteredData = data.slice((parseInt(query.currentPage)-1)*parseInt(query.numShown),((parseInt(query.currentPage))*parseInt(query.numShown)));
    } else {
      filteredData = data;
    }
  }

  return (
    <>
      <Disclosure as="header" className="bg-gray-800">
        {({ open }) => (
          <>
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
                <div className="flex py-2 md:py-0 items-center md:mr-20 lg:mr-30">
                  <BasicSearch router={router} search={search}/>
                </div>
                <div className="flex py-2 pb-5 md:py-0 items-center">
                  <SearchBy router={router} isMobile={isMobile} isAllColumns={query.showAll} isLoading={isLoading} hasError={hasError}/>
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
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
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
      { query.showDropdown ? <FilterDropdowns 
        values={dropdownValues} 
        router={router} 
        isLoading={isLoading}
        hasError={hasError}
      /> : "" }
      <DataTable
        title={selectedTab}
        data={filteredData}
        length={!!data ? data.length : 0}
        router={router}
        isLoading={isLoading}
        isMobile={isMobile}
        hasError={hasError}
      />
      <div className="relative z-2 flex-1 px-2 pt-6 pb-6 flex items-center justify-center sm:inset-0 bg-gray-800">
        <div className="w-full flex-col md:flex-row md:inline-flex items-center justify-center">
          <ResultsPerPage router={router} length={!!data ? data.length : 0} isLoading={isLoading} hasError={hasError}/>
          <a href={createExportUrl(data)} download="tpp-data.csv">
            <button className="mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-3/4 bg-[#FC8F4D] hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-black py-2 px-4 rounded">
              Export Data
            </button>
          </a>
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
      <div className="flex-1 px-2 pt-3 pb-6 flex items-center justify-center sm:inset-0 bg-gray-800">
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