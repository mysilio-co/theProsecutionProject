import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { classNames } from "../scripts/common";
import { SCROLL_BAR_COLUMN_KEYS, TABLE_WIDTH_MAP } from "../scripts/constants";

export default function DataRow({row, headers, currentIndex, idx}) {
    const [collapseNarrative, setCollapseNarrative] = useState(true);
    return (
        <tr
            key={currentIndex+idx}
            className={classNames(idx % 2 === 0 ? undefined : "bg-gray-200", "flex hover:bg-stone-100 items-start")}
            >
            <td className="w-14 pl-4 py-3 md:py-2 text-xs md:text-sm text-gray-600">{currentIndex+idx}</td>
            
            {headers && headers.map((h) => 
                { return h==="Short narrative" ?
                    <td className={classNames(TABLE_WIDTH_MAP[h], collapseNarrative ? "truncate" : "overflow-visible", "pl-4 pr-6 py-3 md:py-2 text-xs md:text-sm text-gray-600")} 
                        key={h}>
                    {row[h]}
                    </td> : 
                    <td className={classNames(TABLE_WIDTH_MAP[h], SCROLL_BAR_COLUMN_KEYS.includes(h) ? "whitespace-nowrap overflow-x-auto " : undefined, "pl-4 pr-6 py-3 md:py-2 text-xs md:text-sm text-gray-600")} 
                        key={h}>
                    {row[h]}
                    </td>
                }

            )}
            <td className="w-8 pl-1 py-3 md:py-2 text-xs md:text-sm text-gray-600">
                {collapseNarrative ? 
                <PlusCircleIcon 
                onClick={()=>setCollapseNarrative(false)}
                className="block h-6 w-6 text-gray-400 mr-2 cursor-pointer"
                aria-hidden="true"
                /> : 
                <MinusCircleIcon  
                onClick={()=>setCollapseNarrative(true)}
                className="block h-6 w-6 text-gray-400 mr-2 cursor-pointer"
                aria-hidden="true"
                />}
            </td>
        </tr>
    );
  }
