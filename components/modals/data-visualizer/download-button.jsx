import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
export default function DownloadButton({ display, setDisplay }) {
  const [downloadDisplay, setDownloadaDisply] = useState(display);
  useEffect(() => {
    setDisplay(downloadDisplay);
  }, [downloadDisplay]);
  return (
    <div className='mx-4 mt-4 mb-5 md:mt-3 md:mr-4'>
      <button
        onClick={function () {
          setDownloadaDisply(!downloadDisplay);
        }}
        className='relative h-38px w-full xl:w-28 whitespace-nowrap bg-gray-800 hover:bg-gray-500 active:bg-gray-700 focus:bg-gray-500 text-white rounded'
      >
        <span className='flex items-center'>
          <span className='ml-3 block truncate'>Download</span>
        </span>
        <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
          {display ? (
            <ChevronUpIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          ) : (
            <ChevronDownIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          )}
        </span>
      </button>
    </div>
  );
}
