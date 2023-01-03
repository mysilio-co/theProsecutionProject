import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronUpDownIcon
  } from "@heroicons/react/20/solid";

  import { addQueryParam, removeQueryParam, setSortingParams } from "../scripts/router-handling";
  import Spinner from "../components/spinner.jsx";
  import { TABLE_WIDTH_MAP, SCROLL_BAR_COLUMN_KEYS } from "../scripts/constants.js";

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export default function DataTable({ title, data, length, router, isLoading, isMobile }) {
    const headers = data && data[0] && Object.keys(data[0]);
    const currentIndex = ((Number(router.query.currentPage)-1)*Number(router.query.numShown))+1;
  
    
    return (
      <div className="py-3 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <p className="mt-2 text-sm text-gray-700">
              Below you may access portions of the data collected as part of the Prosecution Project. Data is currently displayed on two tabs--Pending which features cases still proceeding through the courts, and Completed which features cases in which defendants have been sentenced.
            </p>
            <div className="flex justify-start items-center mt-6">
              <p className="text-lg font-semibold text-gray-700">
                Search Results: {length + (length==1 ? " Case" : " Cases")}
              </p>
              {!isMobile ? 
                <div className="flex ml-6 items-center">
                <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer"
                  onChange={(e) => {e.target.checked ? addQueryParam('showAll', 'true', router) : removeQueryParam('showAll', router)}} />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-sm text-gray-900">Show all columns</span>
                </label>
              </div> : ""}
            </div>
  
          </div>
        </div>
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
                            <a onClick={() => {setSortingParams(h, router);}} className="group cursor-pointer inline-flex">
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
                          <td className="w-14 pl-4 py-3 md:py-2 text-xs md:text-sm text-gray-500">{currentIndex+idx}</td>
                          {headers.map((h) => (
                            <td className={classNames(TABLE_WIDTH_MAP[h], SCROLL_BAR_COLUMN_KEYS.includes(h) ? "whitespace-nowrap overflow-x-auto " : undefined, "pl-4 pr-6 py-3 md:py-2 text-xs md:text-sm text-gray-500")} 
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