import { addQueryParam, removeQueryParam } from "../scripts/router-handling";
import {
    SearchIcon
  } from "@heroicons/react/solid";

export default function BasicSearch({router, search}) {
    return (
        <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:inset-0">
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
                    search ? addQueryParam("search", search, router) : removeQueryParam("search", router);
                    }}
                    onSubmit={(e) => {}}
                />
                </div>
            </div>
        </div>
            
    );
  }



