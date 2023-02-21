import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronUpDownIcon
  } from "@heroicons/react/20/solid";

  import FilterDropdowns from './filters/filter-dropdowns.jsx';
  import { addQueryParam, removeQueryParam, setSortingParams } from "../scripts/router-handling";
  import Spinner from "../components/spinner.jsx";
  import ShowAllCheckbox from "./filters/show-all-checkbox";
  import ShowFilterCheckbox from "./filters/show-filter-checkbox";
  import { TABLE_WIDTH_MAP, SCROLL_BAR_COLUMN_KEYS, TAB_NAMES, RESULTS_PER_PAGE_KEYS } from "../scripts/constants.js";
  import ErrorMessage from "./error-message";

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export default function DataTable({ title, data, length, router, isLoading, isMobile, hasError, showFilter, dropdownValues }) {
    const headers = data && data[0] && Object.keys(data[0]);
    const currentIndex = ((Number(router.query.currentPage)-1)*Number(router.query.numShown))+1;
    const isDisabled = isLoading && !hasError;
    
    function resetUrl() {
      const tab = router.query.tab ? router.query.tab : Object.keys(TAB_NAMES)[0];
      let query = { 
        tab: tab, 
        currentPage: 1, 
        numShown: RESULTS_PER_PAGE_KEYS[0], 
      };
      if(router.query.showAll) {
        query.showAll = true;
      } 
      if(router.query.showFilter) {
        query.showFilter = true;
      }
      router.push({ 
        pathname: '/',
        query: query }, 
        undefined, 
        {}
      );
    }
    
    return (
      <div className="py-3 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <p className="mt-2 text-sm text-gray-700">
              Below you may access portions of the data collected as part of the Prosecution Project. Data is currently displayed on two tabs--Pending which features cases still proceeding through the courts, and Completed which features cases in which defendants have been sentenced.
            </p>
            <div className="md:flex md:justify-between items-center mt-6">
              <div className="flex">
                <p className="text-lg font-semibold text-gray-700">
                  Search Results: {length + (length==1 ? " Case" : " Cases")}
                </p>
                {!isMobile ? <ShowAllCheckbox router={router} isLoading={isLoading} hasError={hasError}/>: ""}
                <ShowFilterCheckbox router={router} isLoading={isLoading} hasError={hasError}/>
              </div>
              <button onClick={resetUrl} disabled={isDisabled} className="mt-4 md:mt-0 md:ml-8 lg:ml-16 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded">
                Reset Search
              </button>
            </div>
          </div>
        </div>
        { showFilter ? <FilterDropdowns 
          values={dropdownValues} 
          router={router} 
          isLoading={isLoading}
          hasError={hasError}
        /> : "" }
        {hasError ? 
        <ErrorMessage/>
        : 
        <div className="mt-3 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50 flex">
                    <tr>
                      <th
                        scope="col"
                        className="w-14 md:py-2 text-xs md:text-sm text-gray-500"
                        key="index"
                      >
                      </th>
                      {headers &&
                        headers.map((h) => (
                          <th
                            scope="col"
                            className={classNames(TABLE_WIDTH_MAP[h], "py-3.5 pl-3 pr-2 text-left text-xs md:text-sm font-semibold text-gray-900")}
                            key={h}
                          >
                            <a onClick={() => {setSortingParams(h, router);}} className="group cursor-pointer inline-flex text-gray-800 hover:text-gray-800 hover:no-underline">
                              <p className={(router.query.sortBy===h ? 'bg-slate-400' : '') + " px-1 rounded"}>{h}</p>
                              {router.query.sortBy!=h ? (
                                <span className="ml-2 flex items-center rounded text-gray-400 group-hover:visible group-focus:visible">
                                  <ChevronUpDownIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : router.query.order==="desc" ? (
                                <span className="ml-2 flex items-center rounded text-gray-400 group-hover:visible group-focus:visible">
                                  <ChevronUpIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : (
                                <span className="ml-2 flex items-center rounded text-gray-400 group-hover:visible group-focus:visible">
                                  <ChevronDownIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )
                              }
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
                          className={classNames(idx % 2 === 0 ? undefined : "bg-gray-200", "flex hover:bg-stone-100 items-center")}
                        >
                          <td className="w-14 pl-4 py-3 md:py-2 text-xs md:text-sm text-gray-600">{currentIndex+idx}</td>
                          {headers.map((h) => (
                            <td className={classNames(TABLE_WIDTH_MAP[h], SCROLL_BAR_COLUMN_KEYS.includes(h) ? "whitespace-nowrap overflow-x-auto " : undefined, "pl-4 pr-6 py-3 md:py-2 text-xs md:text-sm text-gray-600")} 
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
        </div>}
      </div>
    );
  }