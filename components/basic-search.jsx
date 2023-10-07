import { addQueryParam, removeQueryParam } from '../scripts/router-handling';
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function BasicSearch({ router, search, isLoading }) {
  const [query, setQuery] = useState(search);

  useEffect(() => {
    if (!isLoading) {
      const timeOutId = setTimeout(() => updateSearchQueryParam(), 500);
      return () => clearTimeout(timeOutId);
    }
  }, [query]);

  useEffect(() => {
    setQuery(search);
  }, [search]);

  function updateSearchQueryParam() {
    query
      ? addQueryParam('search', query, router)
      : removeQueryParam('search', router);
  }

  return (
    <div className='relative z-0 flex-1 px-2 flex items-center justify-center lg:justify-start sm:inset-0'>
      <div className='w-full md:w-48 lg:w-72 xl:w-96'>
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center'>
            <MagnifyingGlassIcon
              className='h-5 w-5 text-gray-400'
              aria-hidden='true'
            />
          </div>
          <input
            id='search'
            name='search'
            value={query}
            className='block w-full text-gray-400 bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm'
            placeholder='Search Data'
            type='search'
            onChange={e => setQuery(e.target.value)}
            onSubmit={e => {}}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
