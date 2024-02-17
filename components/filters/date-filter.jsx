import DatePicker from 'react-datepicker';
import { forwardRef, useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { addAndRemoveMultipleQueryParams } from '../../scripts/router-handling';

export default function DateFilter({ router }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [initialLoad, setInitialLoad] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (router.query.from) {
      setStartDate(new Date(router.query.from));
    }
    if (router.query.to) {
      setEndDate(new Date(router.query.to));
    }
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    const isFullLength = startDate?.length === 10;
    if (endDate && startDate && !isFullLength && startDate > endDate) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [startDate]);

  useEffect(() => {
    const isFullLength = endDate?.length === 10;
    if (startDate && endDate && !isFullLength && startDate > endDate) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [endDate]);

  useEffect(() => {
    if (!initialLoad) {
      let addQueryMap = new Map([]);
      let removeQueryList = [];
      startDate
        ? addQueryMap.set('from', startDate.toLocaleDateString())
        : removeQueryList.push('from');
      endDate
        ? addQueryMap.set('to', endDate.toLocaleDateString())
        : removeQueryList.push('to');
      addAndRemoveMultipleQueryParams(addQueryMap, removeQueryList, router);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (router.query && !router.query.from) {
      setStartDate('');
    }
  }, [router.query.from]);

  useEffect(() => {
    if (router.query && !router.query.to) {
      setEndDate('');
    }
  }, [router.query.to]);

  return (
    <div>
      <div className='py-5 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        <div className='relative pb-4 md:pb-0 px-4'>
          <div className='flex items-end'>
            <div className='basis-2/3 lg:basis-1/2'>
              <label className='block text-start text-sm pr-2 font-medium text-gray-400'>
                From
              </label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                nextMonthButtonLabel='>'
                previousMonthButtonLabel='<'
                popperClassName='react-datepicker-left'
                placeholderText='Start Date'
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className='flex items-center justify-between px-2 py-2 border-red-500'>
                    <span className='text-lg text-gray-700'>
                      {format(date, 'MMMM yyyy')}
                    </span>
                    <div className='space-x-2'>
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        type='button'
                        className={`
                            ${
                              prevMonthButtonDisabled &&
                              'cursor-not-allowed opacity-50'
                            } 
                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                        `}
                      >
                        <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
                      </button>

                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        type='button'
                        className={`
                            ${
                              nextMonthButtonDisabled &&
                              'cursor-not-allowed opacity-50'
                            }
                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                        `}
                      >
                        <ChevronRightIcon className='w-5 h-5 text-gray-600' />
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>
            <button
              onClick={() => setStartDate('')}
              className='mt-4 md:mt-0 h-42px bg-gray-800 basis-1/3 w-full hover:bg-gray-500 active:bg-gray-700 text-white text-base py-2 px-4 ml-2 rounded'
            >
              Clear
            </button>
          </div>
        </div>
        <div className='relative px-4'>
          <div className='flex items-end'>
            <div className='basis-2/3 lg:basis-1/2'>
              <label className='block text-start text-sm pr-2 font-medium text-gray-400'>
                To
              </label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                nextMonthButtonLabel='>'
                previousMonthButtonLabel='<'
                popperClassName='react-datepicker-right'
                placeholderText='End Date'
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className='flex items-center justify-between px-2 py-2'>
                    <span className='text-lg text-gray-700'>
                      {format(date, 'MMMM yyyy')}
                    </span>

                    <div className='space-x-2'>
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        type='button'
                        className={`
                                                ${
                                                  prevMonthButtonDisabled &&
                                                  'cursor-not-allowed opacity-50'
                                                }
                                                inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                            `}
                      >
                        <ChevronLeftIcon className='w-5 h-5 text-gray-600' />
                      </button>

                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        type='button'
                        className={`
                                                ${
                                                  nextMonthButtonDisabled &&
                                                  'cursor-not-allowed opacity-50'
                                                }
                                                inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                            `}
                      >
                        <ChevronRightIcon className='w-5 h-5 text-gray-600' />
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>
            <button
              onClick={() => setEndDate()}
              className='mt-4 md:mt-0 basis-1/3 w-full h-42px bg-gray-800 hover:bg-gray-500 active:bg-gray-700 text-white text-base py-2 px-4 ml-2 rounded'
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {showError && (
        <p className='px-4 font-bold text-red-500'>Date range is not valid</p>
      )}
    </div>
  );
}

const ButtonInput = forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type='button'
    className='inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500'
  >
    {value ? new Date(value).toLocaleDateString() : 'Select Date'}
  </button>
));
