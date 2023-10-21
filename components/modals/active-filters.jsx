import { ALL_COLUMN_KEYS } from '../../scripts/constants';

export default function ActiveFilters({ queryParams }) {
  const activeFilters = [];

  function updateExcludeLabel(label) {
    const isExclude = _.includes(label, '!');
    return isExclude ? 'Exclude (' + _.replace(label, '!', '') + ')' : label;
  }

  Object.keys(queryParams).forEach(param => {
    if (ALL_COLUMN_KEYS.includes(param) || param === 'from' || param === 'to') {
      activeFilters.push({ [param]: queryParams[param] });
    }
  });
  return (
    <div>
      {activeFilters.length > 0 ? (
        <div className='text-start pl-5 my-3'>
          <p className='font-bold text-xl'>Active Filters</p>
          {activeFilters.map((value, index) => {
            return (
              <div key={index}>
                <p>
                  <span className='font-semibold'>{Object.keys(value)[0]}</span>
                  : {updateExcludeLabel(Object.values(value)[0])}
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
