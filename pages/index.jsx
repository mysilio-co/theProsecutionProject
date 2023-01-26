import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";

import useSWR from "swr";
import FilterDropdowns from '../components/filter.jsx';
import DataTable from "../components/data-table.jsx";
import { Disclosure } from "@headlessui/react";

import { fuzzySearch, sort, findFirstOccurenceOfYear } from "../scripts/data-handling.js";
// import { getChunksOfSheet } from "../scripts/sheets.js";
import SearchBy from "../components/search-by";
import { addQueryParam } from "../scripts/router-handling";
import BasicSearch from "../components/basic-search";
import ErrorMessage from "../components/error-message";
import ResultsPerPage from "../components/results-per-page.jsx";
import { RESULTS_PER_PAGE_KEYS, TAB_NAMES, SEARCH_BY_KEYS, ORDER_BY_KEYS, DESKTOP_COLUMN_KEYS, SEARCH_BY_KEYS_EXPRESS } from "../scripts/constants.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fetcher = async (url) => await fetch(url).then((res) => {return res.json()});

export default function DataExplorer() {
  const tabs = Object.keys(TAB_NAMES);
  const router = useRouter();
  const query = router.query;
  let isError = false;
  let data = null;
  let filteredData = null;
  let isLoading = true;
  const [isMobile, setIsMobile] = useState(false);

  function updateMobileState() {
    setIsMobile(window.innerWidth<768 ? true : false);
  }

  function updateIsError(errorFormula) {
    isError = isError || errorFormula;
  }

  function createExportUrl(data) {
    return !!data ? URL.createObjectURL(new Blob([d3.csvFormat(data)], { type: "text/csv" })) : "#";
  }

  function getSheetData(tab, viewType) {
    const isGeneral = tab==="General" ? true : false;
    const fouo = getChunksOfSheet('U//FOUO', viewType, '2010', tab);
    const { data: pending } = useSWR(isGeneral ? '/api/sheets/getSheets?sheet=Pending cases&range='+viewType : null, fetcher);
    const { data: nonGeneral } = useSWR(!isGeneral ? '/api/sheets/getSheets?sheet='+TAB_NAMES[tab]+'&range='+viewType : null, fetcher);
    updateIsError(pending?.error || nonGeneral?.error);
    return isGeneral ? (fouo && pending && !isError ? fouo.concat(pending) : null) : (nonGeneral && !isError ? nonGeneral : null);
  }

  function getChunksOfSheet(sheet, viewType, year, tab) {
    //shouldCall is used to determine if the call should be made using nextJS conditional fetching
    //if false, cascades down and prevents the sheets calls from being made
    const shouldCall = tab==="General" ? true : false;
    const { data:dateColumn } = useSWR(shouldCall ? '/api/sheets/getSheetDateColumn?sheet='+sheet : null, fetcher);
    updateIsError(dateColumn?.error);
    const locationOfYear = dateColumn && !isError ? findFirstOccurenceOfYear(dateColumn, year) : null;
    const lengthOfSheet = dateColumn ? dateColumn.length : null;
    const { data: firstHalf } = useSWR(locationOfYear && !isError ? '/api/sheets/getSheets?sheet='+sheet+'&range='+viewType+'&start='+1+'&end='+(locationOfYear-1) : null, fetcher);
    const { data: secondHalf } = useSWR(locationOfYear && lengthOfSheet && !isError ? '/api/sheets/getSheets?sheet='+sheet+'&range='+viewType+'&start='+(locationOfYear-1)+'&end='+lengthOfSheet : null, fetcher);
    updateIsError(firstHalf?.error || secondHalf?.error);
    return firstHalf && secondHalf && !isError ? firstHalf.concat(secondHalf) : null;
  }
  
  useEffect(() => {
    updateMobileState();
  }, []);

  useEffect(()=>{
    if(router.isReady) {
      console.log(router.query);
      const tab = router.query.tab in TAB_NAMES ? router.query.tab : Object.keys(TAB_NAMES)[0];
      const numShown = RESULTS_PER_PAGE_KEYS.includes(router.query.numShown) ? router.query.numShown : RESULTS_PER_PAGE_KEYS[0];
      const sortBy = DESKTOP_COLUMN_KEYS.includes(router.query.sortBy) ? router.query.sortBy : null;
      const order = ORDER_BY_KEYS.includes(router.query.order) ? router.query.order : null;
      const search = router.query.search ? router.query.search : null;
      const searchBy = SEARCH_BY_KEYS_EXPRESS.includes(router.query.searchBy) ? router.query.searchBy : null;
      const showAll = router.query.showAll=="true" ? "true" : null;
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
      router.replace({ 
        pathname: '',
        query: query }, 
        undefined, 
        {shallow: true}
      );
    }
  }, [router.isReady]);

  const selectedTab = query.tab || tabs[0];
  const search = query.search || "";
  const viewType = isMobile ? "mobile" : query.showAll ? "desktop" : "express";
  data = getSheetData(selectedTab, viewType);

  if(!!data) {
    isLoading = false;
    data = fuzzySearch(data, query.search, query.searchBy, isMobile);
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
                  <SearchBy router={router} isMobile={isMobile} isAllColumns={query.showAll} isLoading={isLoading}/>
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
      {/* Adding filter dropdowns will be next step */}
      {/* <FilterDropdowns
        data={data}
        cleanedData={cleanedData}
        /> */}
      { isError ? 
        <ErrorMessage></ErrorMessage>
      : <DataTable
        title={selectedTab}
        data={filteredData}
        length={!!data ? data.length : 0}
        router={router}
        isLoading={isLoading}
        isMobile={isMobile}
      />}
      <div className="relative z-2 flex-1 px-2 pt-6 pb-6 flex items-center justify-center sm:inset-0 bg-gray-800">
        <div className="w-full flex-col md:flex-row md:inline-flex items-center justify-center">
          <ResultsPerPage router={router} length={!!data ? data.length : 0} isLoading={isLoading}/>
          <a href={createExportUrl(data)} download="tpp-data.csv">
            <button className="mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-3/4 bg-[#FC8F4D] hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-black py-2 px-4 rounded">
              Export Data
            </button>
          </a>
        </div>
      </div>
      <div className="relative z-0 flex-1 px-2 pt-6 pb-6 flex items-center justify-center sm:inset-0 bg-gray-800">
        <img
          className="block h-24"
          src="https://i0.wp.com/theprosecutionproject.org/wp-content/uploads/2020/08/Illustration-Hiking-Website-Email-Header-2.png?w=600&ssl=1"
          alt="The Prosecution Project"
        />
      </div>

    </>
  );
}