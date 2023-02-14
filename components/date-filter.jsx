import DatePicker from 'react-datepicker'
import { forwardRef, useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'


export default function DateFilter() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (startDate > endDate) setStartDate(endDate)
    }, [endDate])

    useEffect(() => {
        if (startDate > endDate) setEndDate(startDate)
    }, [startDate])
    return (
        // <div>
        //     <label className="block text-sm pr-2 font-medium text-gray-400">From</label>
        //     <DatePicker 
        //         selected={startDate} 
        //         isClearable 
        //         placeholderText="Start date"
        //         onChange={(date) => setStartDate(date)} />
        //     <label className="block text-sm pr-2 font-medium text-gray-400">To</label>
        //     <DatePicker 
        //         selected={endDate} 
        //         isClearable 
        //         placeholderText="End date"
        //         onChange={(date) => setEndDate(date)} />
        // </div> );

        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex items-center justify-center max-w-2xl py-20 mx-20 space-x-4">
                <span className="font-medium text-gray-900">Custom Components:</span>
                <div className="relative w-40">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        nextMonthButtonLabel=">"
                        previousMonthButtonLabel="<"
                        popperClassName="react-datepicker-left"
                        customInput={<ButtonInput />}
                        isClearable
                        renderCustomHeader={({
                            date,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                        }) => (
                            <div className="flex items-center justify-between px-2 py-2">
                                <span className="text-lg text-gray-700">
                                    {format(date, 'MMMM yyyy')}
                                </span>

                                <div className="space-x-2">
                                    <button
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                        type="button"
                                        className={`
                                            ${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                                    >
                                        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                                    </button>

                                    <button
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
                                        type="button"
                                        className={`
                                            ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                                    >
                                        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div className="relative w-40">
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        nextMonthButtonLabel=">"
                        previousMonthButtonLabel="<"
                        popperClassName="react-datepicker-right"
                        customInput={<ButtonInput />}
                        renderCustomHeader={({
                            date,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                        }) => (
                            <div className="flex items-center justify-between px-2 py-2">
                                <span className="text-lg text-gray-700">
                                    {format(date, 'MMMM yyyy')}
                                </span>

                                <div className="space-x-2">
                                    <button
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                        type="button"
                                        className={`
                                            ${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                                    >
                                        <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                                    </button>

                                    <button
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
                                        type="button"
                                        className={`
                                            ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                                    >
                                        <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

const ButtonInput = forwardRef(({ value, onClick }, ref) => (
    <button
        onClick={onClick}
        ref={ref}
        type="button"
        className='inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500'
    >
        {value ? format(new Date(value), 'dd MMMM yyyy') : 'Start Date'}
    </button>
))