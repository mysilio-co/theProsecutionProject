import { RESULTS_PER_PAGE_KEYS, TAB_NAMES } from '../../../scripts/constants';
import ContentDisclosure from './content-disclosure';

export default function HowToQuickstart({ router }) {
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
    <div>
      <p className='mt-4 mx-6 text-start'>
        Here are some possible jumping off points to get you started or show
        what the site is capable of. Examples will show you how to use the site
        to recreate it for yourself or immediately jump into viewing it with the
        push of a button.
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
          'Females between 18-50 with any manner of rightest ideology who target people'
        }
        content={
          <div className='text-start'>
            <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
            <p className='mt-0'>Gender - Female</p>
            <p className='mt-0'>People vs. property - People</p>
            <p className='mt-0'>Ideological grouping - Rightist</p>
            <h4 className='text-gray-700 mb-2'>Numeric Filters</h4>
            <p className='mt-0'>Age - 18,50</p>
            <button
              onClick={() => {
                goToExample({
                  tab: 'General',
                  Gender: 'Female',
                  'People vs. property': 'People',
                  Age: '18,50',
                  'Ideological grouping': 'Rightist',
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
        name={'Males with military backgrounds who commit firearms crimes'}
        content={
          <div className='text-start'>
            <h4 className='text-gray-700 mb-2'>Categorical Filters</h4>
            <p className='mt-0'>
              Criminal Method - Firearms: civilian, Firearms: military
            </p>
            <p className='mt-0'>
              Veteran Status - Active duty, Dishonorably discharged, Former
              Active duty, Former active duty and current reserve components,
              Former active duty and reserve components, Former reserve
              components, Former/current member of non-U.S. military, Hardship
              discharge, Honorably discharged, Other than honorable discharge,
              Reserve/national guard (reserve components)
            </p>
            <button
              onClick={() => {
                goToExample({
                  tab: 'General',
                  'Veteran status':
                    'Active duty, Dishonorably discharged, Former Active duty, Former active duty and current reserve components, Former active duty and reserve components, Former reserve components, Former/current member of non-U.S. military, Hardship discharge, Honorably discharged, Other than honorable discharge, Reserve/national guard (reserve components)',
                  'Criminal method': 'Firearms: civilian, Firearms: military',
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
              Verdict - Guilty, Guilty on some charges/not guilty on others
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
          'HAMAS-affilicated individuals that were not tried for providing material support'
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
    </div>
  );
}
