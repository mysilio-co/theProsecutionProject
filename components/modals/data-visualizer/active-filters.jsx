import { ALL_COLUMN_KEYS } from '../../../scripts/constants';

export default function ActiveFilters({ queryParams }) {
  const activeFilters = [];
  Object.keys(queryParams).forEach(param => {
    if (ALL_COLUMN_KEYS.includes(param) || param === 'from' || param === 'to') {
      activeFilters.push({ [param]: queryParams[param] });
    }
  });
  return (
    <div>
      {activeFilters.length > 0 ? (
        <div className='pl-0 md:pl-5 my-3'>
          <p className='font-bold'>Active Filters</p>
          {activeFilters.map((value, index) => {
            return (
              <div key={index}>
                <p>
                  {Object.keys(value)[0]}: {Object.values(value)[0]}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
