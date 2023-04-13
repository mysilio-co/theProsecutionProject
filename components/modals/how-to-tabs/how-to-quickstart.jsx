import { RESULTS_PER_PAGE_KEYS, TAB_NAMES } from "../../../scripts/constants";
import ContentDisclosure from "./content-disclosure";

export default function HowToQuickstart({router}) {

    function goToExample(exampleQuery) {
        let baseQuery = { 
            currentPage: 1, 
            numShown: RESULTS_PER_PAGE_KEYS[0], 
        };
        router.replace(
            { pathname: '', query: {...baseQuery, ...exampleQuery} }, 
            undefined, 
            { shallow: true }
          );
    }

    return (
        <div>
            <p className="mt-4 mx-6 text-start">Here are some possible jumping off points to get you started or show what the site is capable of. Examples will show you how to use the site to recreate it for yourself or immediately jump into viewing it with the push of a button.</p>
            <ContentDisclosure
                name={"Non-Muslim Individuals Charged with Foreign Terrorist Organization Affiliation after September 11, 2001"} 
                content={
                    <div className="text-start">
                        <h4 className="text-gray-700 mb-2">Date Filters</h4>
                        <p className="mt-0">From - 9/11/2001</p>
                        <h4 className="text-gray-700 mb-2">Categorical Filters</h4>
                        <p className="mt-0">Affiliation with FTO: Yes</p>
                        <p className="mt-0">Religion - Christian, Jewish, Other</p>
                        <button onClick={()=>{
                            goToExample(
                                {
                                    "tab": "General",
                                    "Affiliation with FTO": "Yes",
                                    "Religion":"Christian, Jewish, Other",
                                    "from":"09/11/2001"
                                }
                            )
                        }} className="mt-3 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded">
                            Try for yourself
                        </button>
                    </div>
            }/>
        </div>
    );
  }
