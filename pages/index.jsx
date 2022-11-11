import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import * as d3 from "d3";

import useSWR from "swr";
import FilterDropdowns from '../components/filter.jsx';
import { Disclosure, Listbox, Transition } from "@headlessui/react";
import {
  SearchIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/solid";
import { fuzzySearch, sort } from "../scripts/data-handling.js";
import SearchBy from "../components/search-by";
import { addQueryParam, setSortingParams } from "../scripts/router-handling";
import BasicSearch from "../components/basic-search";
import ResultsPerPage from "../components/results-per-page.jsx";
import { RESULTS_PER_PAGE_KEYS, TABLE_WIDTH_MAP, MOBILE_COLUMN_KEYS } from "../scripts/constants.js";

const DataUrls = {
  Pending:
    "https://tpp.v0.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20Pending%20cases.csv",
  Completed: "https://tpp.v0.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20U__FOUO.csv",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DataTable({ title, data, length, router }) {
  const headers = data && data[0] && Object.keys(data[0]);
  
  return (
    <div className="py-3 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            Below you may access portions of the data collected as part of the Prosecution Project. Data is currently displayed on two tabs--Pending which features cases still proceeding through the courts, and Completed which features cases in which defendants have been sentenced.
          </p>
          <p className="mt-6 text-lg font-semibold text-gray-700">
            Search Results: {length + (length==1 ? " Case" : " Cases")}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50 flex">
                  <tr>
                    {headers &&
                      headers.map((h) => (
                        <th
                          scope="col"
                          className={classNames(TABLE_WIDTH_MAP[h], "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900")}
                          key={h}
                        >
                          <a onClick={() => {setSortingParams(h, router);}} className="group cursor-pointer inline-flex">
                            <p className={(router.query.sortBy===h ? 'bg-slate-400' : '') + " px-1 rounded"}>{h}</p>
                            {router.query.sortBy===h && router.query.order==="desc" ? (
                              <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                <ChevronUpIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : (
                              <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                                <ChevronDownIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </a>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data &&
                    data.map((row, idx) => (
                      <tr
                        key={idx}
                        className={classNames(idx % 2 === 0 ? undefined : "bg-gray-50", "flex hover:bg-stone-100")}
                      >
                        {headers.map((h) => (
                          <td className={classNames(TABLE_WIDTH_MAP[h], "whitespace-nowrap overflow-x-auto pl-4 pr-6 py-4 text-sm text-gray-500")} 
                              key={h}>
                            {row[h]}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const csvFetcher = (url) =>
  fetch(url)
    .then((r) => r.text())
    .then((t) => d3.csvParse(t));

function DataDisplay({ title, data, length, router }) {
  return <DataTable title={title} data={ data } length={length} router={router} />;
}

export default function DataExplorer() {
  const tabs = Object.keys(DataUrls);
  const router = useRouter();
  const query = router.query;
  const [isMobile, setIsMobile] = useState(false);

  function updateMobileState() {
    setIsMobile(window.innerWidth<768 ? true : false);
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
  let mobileData = [];

  let { data, isLoerror } = useSWR(DataUrls[selected], csvFetcher);

  if(!!data) {
    data = fuzzySearch(data, query.search, query.searchBy);
    if(!!query.sortBy && !!query.order) {
      sort(data, query.sortBy, query.order);
    }
    if(!!query.currentPage && !!query.numShown) {
      filteredData = data.slice((parseInt(query.currentPage)-1)*parseInt(query.numShown),((parseInt(query.currentPage))*parseInt(query.numShown)));
    }
    else {
      filteredData = data;
    }
    filteredData.forEach(function(row) {
      mobileData.push(Object.fromEntries(Object.entries(row)
      .filter(([key, value]) => MOBILE_COLUMN_KEYS.includes(key))));
    })
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
                  <SearchBy router={router}/>
                </div>
              </div>
              <nav
                className="md:py-2 md:flex md:space-x-8"
                aria-label="Global"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { addQueryParam("tab", tab, router)}}
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
      <DataDisplay
        title={selected}
        data={isMobile ? mobileData : filteredData}
        length={!!data ? data.length : 0}
        router={router}
      />
      <ResultsPerPage router={router} length={!!data ? data.length : 0}/>
    </>
  );
}
