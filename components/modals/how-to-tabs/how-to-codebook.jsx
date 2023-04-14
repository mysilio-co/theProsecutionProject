import CodebookDisclosure from "./codebook-disclosure";
import { CODEBOOK } from "../../../scripts/codebook";
import { Listbox } from "@headlessui/react";

export default function HowToCodebook() {
    const disclosures = [];
    let keys = Object.keys(CODEBOOK);
    keys.forEach((variable, index)=> {
        disclosures.push(<CodebookDisclosure name={variable} description={CODEBOOK[variable]} key={index}/>);
    })
    return (
        <div>
            <Listbox>
                <p className="mt-4 mb-3 mx-6 text-start">This modal reflects the qualitative coding rules for The Prosecution Project (tPP). The Codebook outlines the variables that constitute tPP and defines the possible values for these variables.The Codebook is maintained by Dr. Michael Loadenthal and members of tPP Leadership Team (tPPLT). More information about the purpose of the project and case inclusion criteria can be found in the tPP Manual.</p>
            </Listbox>
            {disclosures}
        </div>
    );
  }
