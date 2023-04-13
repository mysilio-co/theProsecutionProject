import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import * as d3 from "d3";
import { useEffect, useRef, useState } from 'react';
import { classNames } from '../../scripts/common';
import { TAB_DOWNLOAD } from '../../scripts/constants';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function DownloadModalContents({data, setShowModal, query, selectedTab}) {
    const formsUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdKYszFyZrY3M2b9w9Vgit2KS44u3Dli9I7r81PXASGT65U9g/formResponse?&submit=Submit?usp=pp_url&entry.1564785546=*PURPOSE*&entry.82466501=*NAME*&entry.1299586216=*EMAIL*&entry.945781104=*ORG*&entry.714111775=Yes&entry.2138348062=*URL*"
    const formsForm = useRef();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [orgInput, setOrgInput] = useState('');
    const [purposeInput, setPurposeInput] = useState('');
    const [formsError, setFormsError] = useState(false);

    useEffect(() => {
        setFormSubmitted(sessionStorage.getItem('formSubmitted'));
      }, []);

    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

    function handleSubmit(e) {
        fetch(createFormsUrl(), {
            method: 'POST', 
            mode: 'cors',
            body: ''
        }).then(res => {
            setFormsError(false);
        }).catch(e => {
            setFormsError(true);
            console.error('There was a problem submitting form');
        })
        sessionStorage.setItem('formSubmitted', 'true');
        setFormSubmitted(true);
        e.preventDefault();
    }

    function createFormsUrl() {
        let formSubmissionUrl = formsUrl.replace('*NAME*', nameInput);
        formSubmissionUrl = formSubmissionUrl.replace('*EMAIL*', emailInput);
        formSubmissionUrl = formSubmissionUrl.replace('*ORG*', orgInput);
        formSubmissionUrl = formSubmissionUrl.replace('*PURPOSE*', purposeInput);
        return formSubmissionUrl.replace('*URL*', query.replaceAll('&', '-'));
    }


    async function downloadFiles() {
        let eulaSuccess = true;
        const eulaBlob = await fetch('https://drive.google.com/uc?export=download&id=1mqGs7sN3mj58Ci4_6RMjzGMyNuUNtctr')
        .then(response => response.blob())
        .catch(e => {
            eulaSuccess = false;
            console.error("There was a problem retrieving EULA.");
        });
        var zip = new JSZip();
        zip.file(createFileName(), createSheetFile());
        if(eulaSuccess) {
            zip.file("External _RDUA_v3.pdf", eulaBlob);
        }
        zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content, "tPP-data.zip");
        });
    }

    function createSheetFile() {
        return !!data ? new Blob([d3.csvFormat(data)], { type: "text/csv" }) : "";
    }

    function createFileName() {
        return "tpp-" + new Date().toISOString().split('T')[0] + "-" + TAB_DOWNLOAD[selectedTab] + ".csv";
    }

  return (
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all m-auto sm:my-8">
            <div className="bg-white pt-0 pb-4 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-0 text-center sm:text-left">
                    <Dialog.Title as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                        Download Data
                    </Dialog.Title>
                    <div className="mt-2 p-4">
                        <p className="text-sm text-gray-500">
                            This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. To view a copy of this license, visit <a href='http://creativecommons.org/licenses/by-nc-sa/4.0/' target='_blank'>http://creativecommons.org/licenses/by-nc-sa/4.0/</a> or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA. 
                        </p>
                        <p className="text-sm text-gray-500 font-bold">
                            When using this dataset, all information sourced must be cited as follows, including any modifications users make to tPP data for published analysis:</p>
                        <p className="my-3 text-sm text-gray-500">
                            Loadenthal, Michael, Lauren Donahoe, Madison Weaver, Sara Godfrey, Kathryn Blowers, et. al. “The Prosecution Project Dataset,” <span className='italic'>the Prosecution Project</span>, 2023 [dataset]. https://theprosecutionproject.org/ 
                        </p>
                        <p className="my-3 text-sm text-gray-500">
                            We ask all users to read the user agreement carefully, as there are specific limitations on the use of tPP. These restrictions apply to both individual researchers and organizational users. The intent of these restrictions is not only to ensure that the intellectual property in tPP is appropriately protected, but also to ensure that the data is only used for the purposes of better understanding the American criminal justice system. 
                        </p>
                        { formSubmitted ?
                            <div className='my-3 flex items-center justify-center sm:justify-start'>
                                <CheckCircleIcon className="w-10 lg:w-6 stroke-gray-800 mr-2"/>
                                <p className="text-sm text-gray-500">
                                    Data questionnaire has been submitted. A copy of the EULA will be downloaded with your data. The questionnaire will need to be re-submitted for every download.
                                </p>
                            </div> 
                            : 
                            <div className="">
                                <form onSubmit={e => handleSubmit(e)}>
                                    <label className="block text-gray-500 text-sm pt-2 text-start">Name:</label>
                                    <input onInput={e => setNameInput(e.target.value)} className="block w-full border rounded-md py-2 pr-3 text-sm placeholder-gray-400 focus:outline-none sm:text-sm" type="text" name="name" required/>
                                    <label className="block text-gray-500 text-sm pt-2 text-start">Email Address:</label>
                                    <input onInput={e => setEmailInput(e.target.value)} className="block w-full border rounded-md py-2 pr-3 text-sm placeholder-gray-400 focus:outline-none sm:text-sm" type="email" name="email" required/>
                                    <label className="block text-gray-500 text-sm pt-2 text-start">Organization Affiliation:</label>
                                    <input onInput={e => setOrgInput(e.target.value)} className="block w-full border rounded-md py-2 pr-3 text-sm placeholder-gray-400 focus:outline-none sm:text-sm" type="text" name="org" required/>
                                    <label className="block text-gray-500 text-sm pt-2 text-start">How are you planning on using tPP data in your work?</label>
                                    <input onInput={e => setPurposeInput(e.target.value)} className="block w-full border rounded-md py-2 pr-3 text-sm placeholder-gray-400 focus:outline-none sm:text-sm" type="text" name="org" required/>
                                    <label className="block text-gray-500 text-sm pt-2 text-start">I agree to the EULA listed above:</label>
                                    <input className="w-4 h-4 block rounded-sm mt-1 mb-4 pr-3 text-sm placeholder-gray-400 focus:outline-none sm:text-sm" type="checkbox" name="agreement" required/>
                                    <input type="submit" value="Submit" 
                                        className="w-full justify-center rounded-md border border-transparent bg-gray-800 mt-2 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm"/>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
            </div>
            <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <a href="#" className='ml-0 sm:ml-3 no-underline hover:no-underline focus:no-underline'>
                    <button
                        type="button"
                        className={classNames(formSubmitted ? "opacity-100" :  "opacity-50", "inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm")}
                        onClick={(e) => {
                            e.preventDefault();
                            setModalVisibility(false);
                            sessionStorage.removeItem('formSubmitted');
                            downloadFiles();
                        }}
                        disabled={!formSubmitted}
                    >
                        Download
                    </button>
                </a>
                <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModalVisibility(false)}
                    autoFocus
                >
                    Cancel
                </button>
            </div>
        </Dialog.Panel>
        )
}