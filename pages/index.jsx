import { useMemo, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { getItemAll, useGarden } from "garden-kit";
import { getStringNoLocale, getThingAll } from "@inrupt/solid-client";
import { TPP } from "../vocab.mjs";

const DataUrls = {
  Pending: "https://tpp.mysilio.me/public/data/Pending.ttl",
  FOUO: "https://tpp.mysilio.me/public/data/FOUO.ttl",
};
const tabs = ["Pending", "FOUO"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Datum({ item }) {
  const caseID = getStringNoLocale(item, TPP.caseID);
  return <></>;
  //return <li key={caseID}>{caseID}</li>;
}

export function FilteredDataList({ items, search }) {
  return (
    <ul>
      nope
    </ul>
  )
}

export function DataDisplay({ tab, search }) {
  const { garden } = useGarden(DataUrls[tab]);
  return (
    <ul>
      nope
    </ul>
  )
}

export default function DataExplorer() {
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
      <DataDisplay search={search} tab={selected} />
    </>
  );
}
