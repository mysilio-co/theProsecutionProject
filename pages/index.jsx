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
import { addQueryParam } from "../scripts/router-handling";
import BasicSearch from "../components/basic-search";
import { TABLE_WIDTH_MAP } from "../scripts/constants.js";

const DataUrls = {
  Pending:
    "https://tpp.v0.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20Pending%20cases.csv",
  Completed: "https://tpp.v0.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20U__FOUO.csv",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DataTable({ title, data }) {
  const headers = data && data[0] && Object.keys(data[0]);
  const [currentColumn, setCurrentColumn] = useState("");
  const [ascending, setAscending] = useState(true);
  useEffect(()=>{
    setCurrentColumn("");
  },[data])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            Below you may access portions of the data collected as part of the Prosecution Project. Data is currently displayed on two tabs--Pending which features cases still proceeding through the courts, and Completed which features cases in which defendants have been sentenced.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
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
                          <a onClick={() => {sort(data, h, currentColumn, ascending); setAscending(ascending => {if(currentColumn===h){return !ascending;} else {return true}}); setCurrentColumn(h); }} className="group cursor-pointer inline-flex">
                            <p className={(currentColumn===h ? 'underline' : '') + ""}>{h}</p>
                            {currentColumn===h && !ascending ? (
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
                          <td className={classNames(TABLE_WIDTH_MAP[h], "whitespace-nowrap overflow-x-scroll pl-4 pr-6 py-4 text-sm text-gray-500")} 
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

function DataDisplay({ title, data }) {
  if(!!data) {
    return <DataTable title={title} data={ data } />;
  }
  return <DataTable title={title} data={ null } />;
}

export default function DataExplorer() {
  const tabs = Object.keys(DataUrls);
  const router = useRouter();
  const query = router.query;
  useEffect(() => {
    addQueryParam("tab", tabs[0], router);
  }, []);
  const selected = query.tab || tabs[0];
  const search = query.search || "";

  let { data, isLoerror } = useSWR(DataUrls[selected], csvFetcher);
  data = fuzzySearch(data, query.search, query.searchBy);

  return (
    <>
      <Disclosure as="header" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
              <div className="relative h-16 flex justify-between">
                <div className="relative z-10 px-2 flex lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block h-8 w-auto"
                      src="https://theprosecutionproject.org/wp-content/uploads/2020/08/tPP-4.png"
                      alt="The Prosecution Project"
                    />
                  </div>
                </div>
                <BasicSearch router={router} search={search}/>
                <SearchBy router={router}/>
              </div>
              <nav
                className="lg:py-2 lg:flex lg:space-x-8"
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
        data={data}
      />
    </>
  );
}
