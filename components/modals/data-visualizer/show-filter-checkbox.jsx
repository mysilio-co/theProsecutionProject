import { classNames } from '../../../scripts/common';

export default function ShowActiveFilterCheckbox({
  showActiveFilter,
  setShowActiveFilter,
  isActiveFilters,
}) {
  return (
    <div className='flex ml-6 mb-1 items-center'>
      <label
        className={classNames(
          !isActiveFilters
            ? 'opacity-50 cursor-not-allowed'
            : 'opacity-100 cursor-pointer ',
          'inline-flex relative items-center disabled:text-slate-100',
        )}
      >
        <input
          type='checkbox'
          value=''
          checked={showActiveFilter}
          className='sr-only peer'
          onChange={e => {
            e.target.checked
              ? setShowActiveFilter(true)
              : setShowActiveFilter(false);
          }}
          disabled={!isActiveFilters}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className='ml-3 text-sm font-sm text-gray-600 whitespace-nowrap'>
          Display Filters
        </span>
      </label>
    </div>
  );
}
