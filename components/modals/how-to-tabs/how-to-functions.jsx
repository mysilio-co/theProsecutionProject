import ContentDisclosure from "./content-disclosure";

export default function HowToFunctions() {

    return (
        <div>
            {/* <p className="mt-4 mx-6 text-start">All the capabilities currently possible on the site are listed here.</p> */}
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
                        <p>Data can be filtered by date, categorical variable, or quantitative variable by click the "Filter Data" button above the table. Instructions for how to filter each type of variable can be viewed when that modal is opened.</p>
                    </div>
            }/>
            <ContentDisclosure 
                name={"Selecting Dataset"} 
                content={
                    <div className="text-start">
                        {/* <h4 className="text-gray-700 mb-2">Selecting Dataset</h4> */}
                        <p>There are currently 3 datasets to view: General is *quick description of general*, Summer-Fall 2020 Protests is *description of summer fall*, Capitol Raid is *desc*</p>
                        <p>Note: Switching datasets can affect what filters are selected. If a value from a dropdown is selected on one dataset but doesn't exist on another dataset, it will be removed. If a selected value on a number slider for one dataset is higher than the highest value of a different dataset, it will be reduced.</p>
                    </div>
            }/>
            <ContentDisclosure 
                name={"Downloading Data"} 
                content={
                    <div className="text-start">
                        {/* <h4 className="text-gray-700 mb-2">Downloading Data</h4> */}
                        <p>Data can be downloaded in .csv format by clicking the "Download Data" button at the bottom of the page.</p>
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