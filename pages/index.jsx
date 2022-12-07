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
import { RESULTS_PER_PAGE_KEYS, TABLE_WIDTH_MAP, MOBILE_COLUMN_KEYS, DESKTOP_COLUMN_KEYS } from "../scripts/constants.js";
import Spinner from "../components/spinner.jsx";
import DownloadModal from "../components/download-modal.jsx";
import {getSheetsData} from "../scripts/sheets.js";

const DataUrls = {
  Pending:
    "https://tpp.v0.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20Pending%20cases.csv",
  Completed: "https://tpp.v0.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20U__FOUO.csv",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps() {
  const file = await getSheetsData();
  const fileJSON = JSON.stringify(file);
  return { props: { fileJSON } }
}

function DataTable({ title, data, length, router, isLoading }) {
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
                          className={classNames(TABLE_WIDTH_MAP[h], "py-3.5 pl-4 pr-3 text-left text-xs md:text-sm font-semibold text-gray-900")}
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
                          <td className={classNames(TABLE_WIDTH_MAP[h], "whitespace-nowrap overflow-x-auto pl-4 pr-6 py-4 text-xs md:text-sm text-gray-500")} 
                              key={h}>
                            {row[h]}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
              <Spinner display={isLoading}></Spinner>
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

function DataDisplay({ title, data, length, router, isLoading }) {
  return <DataTable title={title} data={ data } length={length} router={router} isLoading={isLoading}/>;
}

export default function DataExplorer(props) {
  const tabs = Object.keys(DataUrls);
  const router = useRouter();
  const query = router.query;
  const [isMobile, setIsMobile] = useState(false);

  console.log(JSON.parse(props.fileJSON));

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

  let data = JSON.parse(props.fileJSON);
  // let { data, isLoerror } = useSWR(DataUrls[selected], csvFetcher);

  if(!!data) {
    console.log(data);
    isLoading = false;
    data = fuzzySearch(data, query.search, query.searchBy, isMobile);
    if(!!query.sortBy && !!query.order) {
      sort(data, query.sortBy, query.order);
    } if(!!query.currentPage && !!query.numShown) {
      filteredData = data.slice((parseInt(query.currentPage)-1)*parseInt(query.numShown),((parseInt(query.currentPage))*parseInt(query.numShown)));
    } else {
      filteredData = data;
    }
    if(isMobile) {
      filteredData.forEach(function(row) {
        displayData.push(Object.fromEntries(Object.entries(row)
        .filter(([key, value]) => MOBILE_COLUMN_KEYS.includes(key))));
      })
    } else {
      filteredData.forEach(function(row) {
        displayData.push(Object.fromEntries(Object.entries(row)
        .filter(([key, value]) => DESKTOP_COLUMN_KEYS.includes(key))));
      })
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
                  <SearchBy router={router} isMobile={isMobile}/>
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
        data={displayData}
        length={!!data ? data.length : 0}
        router={router}
        isLoading={isLoading}
      />
      <div className="relative z-0 flex-1 px-2 pt-6 pb-6 flex items-center justify-center sm:inset-0 bg-gray-800">
        <div className="w-full flex-col md:flex-row md:inline-flex items-center justify-center">
          <ResultsPerPage router={router} length={!!data ? data.length : 0}/>
          <a href={createExportUrl(data)} download="tpp-data.csv">
            <button className="mt-8 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-3/4 bg-[#FC8F4D] hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-black py-2 px-4 rounded">
              Export Data
            </button>
          </a>
          <DownloadModal></DownloadModal>
        </div>
      </div>

    </>
  );
}
