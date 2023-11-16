import { useEffect, useState } from 'react';
import { classNames } from '../../../scripts/common';
import { CENSUS_KEY } from '../../../scripts/data-visualizer-constants';
export default function ChartDataTable({ data, category }) {
  const [containsCensus, setContainsCensus] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    let count = 0;
    if(!!data && data.length > 0) {
      setContainsCensus(Object.keys(data[0]).includes(CENSUS_KEY));
      data.forEach(datum=> count += datum.value);
    }
    else {
      setContainsCensus(false)
    };
    setTotalCount(count);
  }, [data]);

  return (
    <div>
      <div className='shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mx-2'>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead className='bg-gray-50 flex'>
            <tr className='w-full flex items-center text-start'>
              <th className='w-12 py-3.5 text-left text-xs md:text-sm font-semibold text-gray-900'></th>
              <th className='text-start w-1/2 md:w-2/5 pl-2 py-3.5 text-left text-xs md:text-sm font-semibold text-gray-900'>
                {category != 'All' ? category : '(No variable selected)'}
              </th>
              <th className='text-start w-1/6 md:w-1/4 pl-2 py-3.5 text-left text-xs md:text-sm font-semibold text-gray-900'>
                # of cases
              </th>
              {containsCensus ? (
                <th className='text-start w-1/3 md:w-1/4 pl-2 py-3.5 text-left text-xs md:text-sm font-semibold text-gray-900'>
                  % of cases / pop.
                </th>
              ) : (
                <th className='text-start w-1/3 md:w-1/4 pl-2 py-3.5 text-left text-xs md:text-sm font-semibold text-gray-900'>
                  % of total
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((object, idx) => (
                <tr
                  className={classNames(
                    idx % 2 === 0 ? undefined : 'bg-gray-200',
                    'flex hover:bg-stone-100 items-center',
                  )}
                  key={'data-' + idx}
                >
                  <td className='text-start w-12 pl-3 py-3 md:py-2 text-xs md:text-sm text-gray-600 break-words'>
                    {idx + 1}
                  </td>
                  <td className='text-start w-1/2 md:w-2/5 pl-2 py-3 md:py-2 text-xs md:text-sm text-gray-600 break-words'>
                    {object.key}
                  </td>
                  <td className='text-start w-1/6 md:w-1/4 pl-2 py-3 md:py-2 text-xs md:text-sm text-gray-600 break-words'>
                    {object.value}
                  </td>
                  {containsCensus ? (
                    <td className='text-start w-1/3 md:w-1/4 pl-2 py-3 md:py-2 text-xs md:text-sm text-gray-600 break-words'>
                      {!!object.censusRatio
                        ? object.censusRatio.toFixed(6) + '%'
                        : 'Data not available'}
                    </td>
                  ) : (
                    <td className='text-start w-1/3 md:w-1/4 pl-2 py-3 md:py-2 text-xs md:text-sm text-gray-600 break-words'>
                      {!!totalCount && !!object.value
                        ? ((object.value / totalCount) * 100).toFixed(3) + '%'
                        : 'Data not available'}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
