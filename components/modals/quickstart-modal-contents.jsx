import { Dialog } from '@headlessui/react';
import { RESULTS_PER_PAGE_KEYS, TAB_NAMES } from '../../scripts/constants';
import ContentDisclosure from './how-to-tabs/content-disclosure';

export default function QuickstartModalContents({ setShowModal, router }) {
  function setModalVisibility(showModalValue) {
    setShowModal(showModalValue);
  }

  function goToExample(exampleQuery) {
    let baseQuery = {
      currentPage: 1,
      numShown: RESULTS_PER_PAGE_KEYS[0],
    };
    router.replace(
      { pathname: '', query: { ...baseQuery, ...exampleQuery } },
      undefined,
      { shallow: true },
    );
  }

  return (
    <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl m-auto transition-all sm:my-8 sm:w-full sm:max-w-xl'>
      <div className='bg-white pt-0 pb-4 sm:pb-4'>
        <div className='sm:flex sm:items-start'>
          <div className='mt-0 text-center sm:text-left'>
            <Dialog.Title
              as='h3'
              className='p-4 bg-gray-800 text-lg font-medium leading-6 text-white'
            >
              Quickstart
            </Dialog.Title>
            <div>
              <p className='mt-4 mx-6 text-start'>
                Here are some possible jumping off points to get you started or
                show what the site is capable of. Examples will show you how to
                use the site to recreate it for yourself or immediately jump
                into viewing it with the push of a button.
              </p>
              <ContentDisclosure
                name={
                  'Non-Muslim individuals charged with Foreign Terrorist Organization affiliation after September 11, 2001'
                }
                content={
                  <div className='text-start'>
                    <h4 className='text-gray-700 mb-2'>Date Filters</h4>
                    <p className='mt-0'>From - 9/11/2001</p>
                    <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
                    <p className='mt-0'>Affiliation with FTO - Yes</p>
                    <p className='mt-0'>Religion - Exclude(Muslim)</p>
                    <button
                      onClick={() => {
                        goToExample({
                          tab: 'General',
                          'Affiliation with FTO': 'Yes',
                          Religion: '!Muslim',
                          from: '09/11/2001',
                        });
                      }}
                      className='mt-3 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded'
                    >
                      Try for yourself
                    </button>
                  </div>
                }
              />
              <ContentDisclosure
                name={
                  'Females between 18-50 who commit hate crimes against people, motivated by a right-wing discrimination based on identity'
                }
                content={
                  <div className='text-start'>
                    <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
                    <p className='mt-0'>Gender - Female</p>
                    <p className='mt-0'>People vs. property - People</p>
                    <p className='mt-0'>
                      Ideological affiliation - Rightist: identity-focused
                    </p>
                    <p className='mt-0'>Hate crime - Yes</p>
                    <h4 className='text-gray-700 mb-2'>Numeric Filters</h4>
                    <p className='mt-0'>Age - 18,50</p>
                    <button
                      onClick={() => {
                        goToExample({
                          tab: 'General',
                          Gender: 'Female',
                          'People vs. property': 'People',
                          Age: '18,50',
                          'Ideological affiliation':
                            'Rightist: identity-focused',
                          'Hate crime': 'Yes',
                        });
                      }}
                      className='mt-3 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded'
                    >
                      Try for yourself
                    </button>
                  </div>
                }
              />
              <ContentDisclosure
                name={
                  'Males with military backgrounds who commit firearms crimes'
                }
                content={
                  <div className='text-start'>
                    <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
                    <p className='mt-0'>
                      Criminal Method - Firearms: civilian, Firearms: military
                    </p>
                    <p className='mt-0'>
                      Veteran Status - Active duty, Dishonorably discharged,
                      Former Active duty, Former active duty and current reserve
                      components, Former active duty and reserve components,
                      Former reserve components, Former/current member of
                      non-U.S. military, Hardship discharge, Honorably
                      discharged, Other than honorable discharge,
                      Reserve/national guard (reserve components)
                    </p>
                    <p className='mt-0'>Gender - Male</p>
                    <button
                      onClick={() => {
                        goToExample({
                          tab: 'General',
                          'Veteran status':
                            'Active duty, Dishonorably discharged, Former Active duty, Former active duty and current reserve components, Former active duty and reserve components, Former reserve components, Former/current member of non-U.S. military, Hardship discharge, Honorably discharged, Other than honorable discharge, Reserve/national guard (reserve components)',
                          'Criminal method':
                            'Firearms: civilian, Firearms: military',
                          Gender: 'Male',
                        });
                      }}
                      className='mt-3 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded'
                    >
                      Try for yourself
                    </button>
                  </div>
                }
              />
              <ContentDisclosure
                name={'ISIS-affiliated individuals convicted in court'}
                content={
                  <div className='text-start'>
                    <h4 className='text-gray-700 mb-2'>Search Filters</h4>
                    <p className='mt-0'>Search - Islamic State</p>
                    <p className='mt-0'>Search By - Group affiliation</p>
                    <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
                    <p className='mt-0'>
                      Verdict - Guilty, Guilty on some charges/not guilty on
                      others
                    </p>
                    <button
                      onClick={() => {
                        goToExample({
                          tab: 'General',
                          search: 'Islamic State',
                          searchBy: 'Group affiliation',
                          Verdict:
                            'Guilty, Guilty on some charges/not guilty on others',
                        });
                      }}
                      className='mt-3 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded'
                    >
                      Try for yourself
                    </button>
                  </div>
                }
              />
              <ContentDisclosure
                name={
                  'HAMAS-affiliated individuals that were not tried for providing material support'
                }
                content={
                  <div className='text-start'>
                    <h4 className='text-gray-700 mb-2'>Search Filters</h4>
                    <p className='mt-0'>Search - HAMAS</p>
                    <p className='mt-0'>Search By - Group affiliation</p>
                    <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
                    <p className='mt-0'>
                      Criminal method - Exclude(Providing material support)
                    </p>
                    <button
                      onClick={() => {
                        goToExample({
                          tab: 'General',
                          search: 'HAMAS',
                          searchBy: 'Group affiliation',
                          'Criminal method': '!Providing material support',
                        });
                      }}
                      className='mt-3 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded'
                    >
                      Try for yourself
                    </button>
                  </div>
                }
              />
              <ContentDisclosure
                name={
                  'Individuals with a military background who were defendents in the January 6 Capitol raid'
                }
                content={
                  <div className='text-start'>
                    <h4 className='text-gray-700 mb-2'>Tab</h4>
                    <p className='mt-0'>Capitol Raid</p>
                    <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
                    <p className='mt-0'>
                      Veteran Status - Active duty, Dishonorably discharged,
                      Former Active duty, Former active duty and current reserve
                      components, Former active duty and reserve components,
                      Former reserve components, Former/current member of
                      non-U.S. military, Hardship discharge, Honorably
                      discharged, Other than honorable discharge,
                      Reserve/national guard (reserve components)
                    </p>
                    <button
                      onClick={() => {
                        goToExample({
                          tab: 'Capitol Raid',
                          'Veteran status':
                            'Active duty, Dishonorably discharged, Former Active duty, Former active duty and current reserve components, Former active duty and reserve components, Former reserve components, Former/current member of non-U.S. military, Hardship discharge, Honorably discharged, Other than honorable discharge, Reserve/national guard (reserve components)',
                        });
                      }}
                      className='mt-3 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded'
                    >
                      Try for yourself
                    </button>
                  </div>
                }
              />
              <ContentDisclosure
                name={
                  'Leftist affiliated individuals tried under federal jurisdiction during the George Floyd protests of 2020'
                }
                content={
                  <div className='text-start'>
                    <h4 className='text-gray-700 mb-2'>Tab</h4>
                    <p className='mt-0'>Summer-Fall 2020 Protests</p>
                    <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
                    <p className='mt-0'>Ideological grouping - Leftist</p>
                    <p className='mt-0'>Jurisdiction - Federal</p>
                    <button
                      onClick={() => {
                        goToExample({
                          tab: 'Summer-Fall 2020 Protests',
                          'Ideological grouping': 'Leftist',
                          Jurisdiction: 'Federal',
                        });
                      }}
                      className='mt-3 w-full md:w-32 bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white py-2 px-4 rounded'
                    >
                      Try for yourself
                    </button>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
        <button
          type='button'
          className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
          onClick={() => setModalVisibility(false)}
          autoFocus
        >
          Close
        </button>
      </div>
    </Dialog.Panel>
  );
}
