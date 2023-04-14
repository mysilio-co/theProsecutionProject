import { ExclamationCircleIcon } from "@heroicons/react/20/solid";


export default function ActiveFilterMessage() {

    return (
        <div className="flex text-lg m-0 font-semibold text-gray-700 items-center md:text-sm md:text-gray-900 md:font-normal whitespace-nowrap mr-2 md:ml-4 lg:ml-10 xl:ml-12">
            <div className="text-center items-center">Filter Active</div>
            <ExclamationCircleIcon className="h-5 ml-2 fill-gray-800 glow"/>
        </div>
    );
  }
