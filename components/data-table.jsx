import {
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronUpDownIcon,
    ArrowLeftCircleIcon,
    ArrowRightCircleIcon,
  } from "@heroicons/react/20/solid";

  import {
    QuestionMarkCircleIcon
  } from "@heroicons/react/24/outline";

  import { setSortingParams } from "../scripts/router-handling";
  import Spinner from "../components/spinner.jsx";
  import ShowAllCheckbox from "./filters/show-all-checkbox";
  import { TABLE_WIDTH_MAP, TAB_NAMES, RESULTS_PER_PAGE_KEYS, TAB_DESCRIPTIONS } from "../scripts/constants.js";
  import ErrorMessage from "./error-message";
  import { classNames } from "../scripts/common.js";
  import { useRef, useState } from "react";
  import { CODEBOOK } from "../scripts/codebook";
  import DataRow from "./data-row";
import ActiveFilterMessage from "./active-filter-message";

export default function DataTable({ title, data, length, router, isLoading, isInitiallyLoaded, isMobile, hasError, showFilterButton, filterActive }) {
    const headers = data && data[0] && Object.keys(data[0]);
    const currentIndex = ((Number(router.query.currentPage)-1)*Number(router.query.numShown))+1;
    const isDisabled = isLoading && !hasError;
    const [showColumnDescription, setShowColumnDescription] = useState(false);
    const [columnDescription, setColumnDescription] = useState("");
    const [showViewDescription, setShowViewDescription] = useState(false);
    const scrollContainer = useRef();
    const leftArrow = useRef();
    const rightArrow = useRef();
    const [scrollbarLeft, setScrollbarLeft] = useState(true);
    const [scrollbarRight, setScrollbarRight] = useState(false);
    
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
              {TAB_DESCRIPTIONS[router.query.tab]}
            </p>
            <div className="md:flex md:justify-between items-center mt-6">
              <div className="flex items-center">
                <p className={classNames((showViewDescription ? 'opacity-100' : 'opacity-0 invisible'), "absolute -translate-y-20 left-8 right-8 bg-white text-sm text-gray-700 border border-gray-800 rounded p-5 z-50 transition-opacity ease-in-out duration-300")}>
                  Only 7 primary variables are shown initially to make viewing easier. Activate the “Show all columns” toggle to show all 46 variables.
                </p>
                <p className={classNames((showColumnDescription ? 'opacity-100' : 'opacity-0 invisible'), "absolute -translate-y-10 left-8 right-8 bg-white text-sm text-gray-700 border border-gray-800 rounded p-5 z-50 transition-opacity ease-in-out duration-300")}>
                  <span className="font-semibold">{columnDescription}</span>{": " + CODEBOOK[columnDescription]}<br/>Learn more by visiting the Codebook tab in the User Manual modal at the bottom of the page
                </p>
                <p className="text-lg m-0 font-semibold text-gray-700">
                  Search Results: {length + (length==1 ? " Case" : " Cases")}
                </p>
                {!isMobile || !isInitiallyLoaded ? 
                <div className="flex items-center">
                  {showFilterButton()}
                  <ShowAllCheckbox router={router} isLoading={isLoading} hasError={hasError} setShowViewDescription={setShowViewDescription} />
                  {filterActive ? <ActiveFilterMessage/> : ""}
                </div> : ""}
              </div>
              {isMobile || !isInitiallyLoaded ? 
              <div>
                {filterActive ? <ActiveFilterMessage/> : ""}
                {showFilterButton()}
              </div> : ""}
              <button onClick={resetUrl} disabled={isDisabled} className="mt-4 md:mt-0 w-full whitespace-nowrap md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded">
                Reset Search
              </button>
            </div>
          </div>
        </div>
        {hasError ? 
        <ErrorMessage/>
        : 
        <div className="relative mt-3 flex flex-col">
          <ArrowLeftCircleIcon ref={leftArrow} className={classNames((scrollbarLeft || isDisabled ? 'opacity-0 cursor-default invisible' : 'opacity-90 cursor-pointer'), "absolute md:fixed w-10 z-10 top-1/2 -left-3 md:left-0 transition-opacity ease-in-out duration-300")} onClick={()=>{
            scrollContainer.current.scrollLeft = 0;
          }}/>
          <ArrowRightCircleIcon ref={rightArrow} className={classNames((scrollbarRight || isDisabled  ? 'opacity-0 cursor-default invisible' : 'opacity-90 cursor-pointer'), "absolute md:fixed w-10 z-10 top-1/2 -right-3 md:right-0 transition-opacity ease-in-out duration-300")} onClick={()=>{
            scrollContainer.current.scrollLeft = scrollContainer.current.scrollWidth;
          }}/>
          <div ref={scrollContainer} className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8" onScroll={() => {
            if(scrollContainer.current.scrollLeft <= 0) {
              setScrollbarLeft(true);
              setScrollbarRight(false);
            }
            else if(scrollContainer.current.scrollWidth <= scrollContainer.current.scrollLeft + scrollContainer.current.offsetWidth) {
              setScrollbarRight(true);
              setScrollbarLeft(false);
            }
            else {
              setScrollbarLeft(false);
              setScrollbarRight(false);
            }
          }}>
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50 flex">
                    <tr>
                      <th
                        scope="col"
                        className="w-10 md:py-2 text-xs md:text-sm text-gray-500"
                        key="index"
                      >
                      </th>
                      {headers &&
                        headers.map((h) => (
                          
                          <th
                            scope="col"
                            className={classNames(TABLE_WIDTH_MAP[h], (router.query.sortBy===h ? 'bg-slate-200' : ''), "py-3.5 pl-3 pr-2 text-left text-xs md:text-sm font-semibold text-gray-900")}
                            key={h}
                          >
                            <a onClick={() => {setSortingParams(h, router);}} className="group cursor-pointer inline-flex items-center text-gray-800 hover:text-gray-800 hover:no-underline">
                              <span className="flex items-center rounded text-gray-400 group-hover:visible group-focus:visible"
                                onMouseOver={()=>{ setColumnDescription(h); setShowColumnDescription(true); }}
                                onMouseLeave={()=>{ setShowColumnDescription(false); }}>
                                <QuestionMarkCircleIcon
                                  className={classNames(isMobile ? "hidden" : "block", "h-5 w-5")}
                                  aria-hidden="true"
                                />
                              </span>
                              <p className={"px-1 rounded"}>{h}</p>
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
                        <DataRow key={idx} row={row} headers={headers} router={router} currentIndex={currentIndex} idx={idx}/>
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