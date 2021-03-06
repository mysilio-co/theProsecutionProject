import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as d3 from "d3";
import useSWR from "swr";
import { Disclosure } from "@headlessui/react";
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";

const DataUrls = {
  Pending:
    "https://tpp.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20Pending%20cases.csv",
  FOUO: "https://tpp.mysilio.me/public/data/Team%20Spreadsheet%202.0%20-%20U__FOUO.csv",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DataTable({ title, data }) {
  const headers = data && data[0] && Object.keys(data[0]);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            Some information about the Prosectution Project...
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {headers &&
                      headers.map((h) => (
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          <a href="#" className="group inline-flex">
                            {h}
                            <span className="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                              <ChevronDownIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                              {
                                // TODO: sort
                              }
                            </span>
                          </a>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data &&
                    data.map((row, idx) => (
                      <tr
                        key={row["Case ID"]}
                        className={idx % 2 === 0 ? undefined : "bg-gray-50"}
                      >
                        {headers.map((h) => (
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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

function DataDisplay({ search, title, dataUrl }) {
  const { data, isLoerror } = useSWR(dataUrl, csvFetcher);

  // TODO filter data based on search value using Fuse

  return <DataTable title={title} data={data} />;
}

export default function DataExplorer() {
  const tabs = Object.keys(DataUrls);
  const router = useRouter();
  const query = router.query;
  const selected = query.tab || tabs[0];
  const search = query.search || "";

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
                <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        value={search}
                        className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                        onChange={(e) => {
                          const search = e.target.value;
                          router.replace({
                            pathname: "/",
                            query: search
                              ? { tab: selected, search }
                              : { tab: selected },
                          });
                        }}
                        onSubmit={(e) => {}}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <nav
                className="hidden lg:py-2 lg:flex lg:space-x-8"
                aria-label="Global"
              >
                {tabs.map((tab) => (
                  <Link
                    href={{
                      pathname: "/",
                      query: search ? { tab, search } : { tab },
                    }}
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
                  </Link>
                ))}
              </nav>
            </div>
          </>
        )}
      </Disclosure>
      <DataDisplay
        search={search}
        title={selected}
        dataUrl={DataUrls[selected]}
      />
    </>
  );
}
