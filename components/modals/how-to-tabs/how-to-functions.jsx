import ContentDisclosure from "./content-disclosure";

export default function HowToFunctions() {

    return (
        <div>
            <p className="mt-4 mx-6 text-start">All the capabilities currently possible on the site are listed here.</p>
            <ContentDisclosure 
                name={"Searching"} 
                content={
                    <div className="text-start">
                        {/* <h4 className="text-gray-700 mb-2">Searching</h4> */}
                        <p>Data can be searched for a keyword using the search bar at the top of the screen. All variables will be searched on if "Any" is selected in the "Search By" box. Select a variable in the "Search By" box to limit your search to only that variable. Only open-ended variables are options to select here, all other variables can be found in the "Filter" section of this guide.</p>
                    </div>
            }/>
            <ContentDisclosure 
                name={"Sorting"} 
                content={
                    <div className="text-start">
                        {/* <h4 className="text-gray-700 mb-2">Sorting</h4> */}
                        <p>Data is initally sorted by Date but can be sorted by any variable. Click the variable name in the table header once to sort in ascending order, twice for descending, and a third time to return to default.</p>
                    </div>
            }/>
            <ContentDisclosure 
                name={"Filtering"} 
                content={
                    <div className="text-start">
                        {/* <h4 className="text-gray-700 mb-2">Sorting</h4> */}
                        <p>Data can be filtered by date, categorical variable, or quantitative variable by clicking the "Filter Data" button above the table. Instructions for how to filter each type of variable can be viewed when that modal is opened. A "Filter Active" message will appear if any filter is currently selected.</p>
                    </div>
            }/>
            <ContentDisclosure 
                name={"Selecting Dataset"} 
                content={
                    <div className="text-start">
                        {/* <h4 className="text-gray-700 mb-2">Selecting Dataset</h4> */}
                        <p>Data are currently displayed across three tabs: </p>
                        <ol className="list-decimal ml-6 text-gray-500">
                            <li><span className="font-bold">General</span>, which includes completed cases as well as those still proceeding through the courts.</li>
                            <li><span className="font-bold">Summer-Fall 2020 Protests</span>, which covers cases occurring during that time period in response to the death of George Floyd.</li>
                            <li><span className="font-bold">Capitol Raid</span>, which displays federal and non-federal charges levied against protesters active in and around the US Capitol building on January 6, 2021.</li>
                        </ol>
                    </div>
            }/>
            <ContentDisclosure 
                name={"Downloading Data"} 
                content={
                    <div className="text-start">
                        {/* <h4 className="text-gray-700 mb-2">Downloading Data</h4> */}
                        <p>Data can be downloaded in .csv format by clicking the "Download Data" button at the bottom of the page after accepting the terms and conditions.</p>
                    </div>
            }/>
            <ContentDisclosure 
                name={"Saving Query"} 
                content={
                    <div className="text-start">
                        {/* <h4 className="text-gray-700 mb-2">Saving Query</h4> */}
                        <p>A specific search can be revisited by copying the URL and pasting it into the browser's address bar.</p>
                    </div>
            }/>
        </div>
    );
  }