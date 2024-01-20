import { ALL_COLUMN_KEYS, IDEOLOGICAL_GROUPING } from '../../scripts/constants';
import { FROM, SEARCH, SEARCH_BY, TO } from '../../scripts/query-constants';

export default function ActiveFilters({ queryParams }) {
  const activeFilters = [];

  function updateExcludeLabel(label) {
    const isExclude = _.includes(label, '!');
    return isExclude ? `Exclude (${_.replace(label, '!', '')})` : label;
  }

  Object.keys(queryParams).forEach(param => {
    if (
      ALL_COLUMN_KEYS.includes(param) ||
      param === FROM ||
      param === TO ||
      param === IDEOLOGICAL_GROUPING
    ) {
      activeFilters.push({ [param]: queryParams[param] });
    }
    if (param === SEARCH) {
      const searchKey = queryParams[SEARCH_BY]
        ? `${queryParams[SEARCH_BY]} containing`
        : `Any column containing`;
      activeFilters.push({ [searchKey]: queryParams[SEARCH] });
    }
  });
  return (
    <div>
      {activeFilters.length > 0 ? (
        <div className='text-start md:text-end text-gray-900'>
          <p className='font-bold text-xl mb-1'>Active Filters</p>
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
