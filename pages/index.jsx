import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";

import useSWR from "swr";
import FilterDropdowns from '../components/filter.jsx';
import DataTable from "../components/data-table.jsx";
import { Disclosure } from "@headlessui/react";

import { fuzzySearch, sort } from "../scripts/data-handling.js";
import SearchBy from "../components/search-by";
import { addQueryParam } from "../scripts/router-handling";
import BasicSearch from "../components/basic-search";
import ResultsPerPage from "../components/results-per-page.jsx";
import { RESULTS_PER_PAGE_KEYS, MOBILE_COLUMN_KEYS, DESKTOP_COLUMN_KEYS, DESKTOP_EXPRESS_COLUMN_KEYS, SHEET_NAMES } from "../scripts/constants.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fetcher = async (url) => await fetch(url).then((res) => {return res.json()});

export default function DataExplorer() {
  const tabs = Object.keys(SHEET_NAMES);
  const router = useRouter();
  const query = router.query;
  const [isMobile, setIsMobile] = useState(false);

  function updateMobileState() {
    setIsMobile(window.innerWidth<768 ? true : false);
  }

  function createExportUrl(data) {
    return !!data ? URL.createObjectURL(new Blob([d3.csvFormat(data)], { type: "text/csv" })) : "#";
  }
  
  useEffect(() => {
    router.push({ 
      pathname: '/',
      query: { ...router.query, tab: tabs[0], currentPage: 1, numShown: RESULTS_PER_PAGE_KEYS[0] } }, 
      undefined, 
      {}
    );
    updateMobileState();
  }, []);
  const selected = query.tab || tabs[0];
  const search = query.search || "";
  let filteredData = null;
  let displayData = [];
  let isLoading = true;
  const viewType = isMobile ? "mobile" : query.showAll ? "desktop" : "express";

  let { data, error } = useSWR('/api/sheets/getSheets?tab='+selected+'&range='+viewType, fetcher);

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
                  <SearchBy router={router} isMobile={isMobile} isAllColumns={query.showAll}/>
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
                        tab === selected
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                      )}
                      aria-current={tab === selected ? "page" : undefined}
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
      <DataTable
        title={selected}
        data={filteredData}
        length={!!data ? data.length : 0}
        router={router}
        isLoading={isLoading}
        isMobile={isMobile}
      />
      <div className="relative z-2 flex-1 px-2 pt-6 pb-6 flex items-center justify-center sm:inset-0 bg-gray-800">
        <div className="w-full flex-col md:flex-row md:inline-flex items-center justify-center">
          <ResultsPerPage router={router} length={!!data ? data.length : 0}/>
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
