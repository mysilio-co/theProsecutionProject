import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import * as d3 from "d3";
import { useEffect, useRef, useState } from 'react';
import { classNames } from '../../scripts/common';

export default function DownloadModalContents({data, setShowModal, query}) {
    const formsUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdKYszFyZrY3M2b9w9Vgit2KS44u3Dli9I7r81PXASGT65U9g/formResponse?&submit=Submit?usp=pp_url&entry.1564785546=*PURPOSE*&entry.82466501=*NAME*&entry.1299586216=*EMAIL*&entry.945781104=*ORG*&entry.2138348062=*URL*"
    const formsForm = useRef();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [orgInput, setOrgInput] = useState('');
    const [purposeInput, setPurposeInput] = useState('');

    useEffect(() => {
        setFormSubmitted(localStorage.getItem('formSubmitted'));
      }, []);

    function setModalVisibility(showModalValue) {
        setShowModal(showModalValue);
    }

    function handleSubmit(e) {
        window.open(
            createFormsUrl(),
            '_blank'
        );
        localStorage.setItem('formSubmitted', 'true');
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

    function createExportUrl() {
        return !!data ? URL.createObjectURL(new Blob([d3.csvFormat(data)], { type: "text/csv" })) : "#";
    }

    function createFileName() {
        return "tpp-" + new Date().toISOString().split('T')[0] + ".csv";
    }

  return (
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all m-auto sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white pt-0 pb-4 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-0 text-center sm:text-left">
                    <Dialog.Title as="h3" className="p-4 bg-gray-800 text-lg font-medium leading-6 text-white">
                        Citation Acknowledgement
                    </Dialog.Title>
                    <div className="mt-2 p-4">
                        <p className="text-sm text-gray-500">
                            Some text here about the correct way to cite us, I'm not at all sure what the copy should look like so I'll leave that up to that professionals. 
                            Can also include that it's downloaded in CSV format with a quick description of what that means.
                        </p>
                        <p className="my-3 text-sm text-gray-500 italic">
                            This is the, correct citation, format
                        </p>
                        <p className="my-3 text-sm text-gray-500">
                            Clicking "I Accept" means you acknowledge this or something like that
                        </p>
                        { formSubmitted ?
                            <div className='my-3 flex items-center'>
                                <CheckCircleIcon className="w-6 stroke-gray-800 mr-2"/>
                                <p className="text-sm text-gray-500">
                                    Data questionnaire has been submitted.
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
                <a href={createExportUrl()} download={createFileName()} className='ml-0 sm:ml-3 no-underline hover:no-underline focus:no-underline'>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto sm:text-sm"
                        onClick={() => setModalVisibility(false)}
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