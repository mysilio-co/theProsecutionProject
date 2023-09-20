import { classNames } from '../../../scripts/common';
export default function ChartDataTable({ data, category }) {
  return (
    <div>
      <div className='shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mx-5'>
        <table className='min-w-full divide-y divide-gray-300'>
          <thead className='bg-gray-50 flex'>
            <tr className='w-full flex items-center text-start'>
              <th className='w-12 py-3.5 text-left text-xs md:text-sm font-semibold text-gray-900'></th>
              <th className='w-1/2 py-3.5 text-left text-xs md:text-sm font-semibold text-gray-900'>
                {category}
              </th>
              <th className='w-1/6 py-3.5 text-left text-xs md:text-sm font-semibold text-gray-900'>
                # of cases
              </th>
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
                  <td className='w-12 pl-3 py-3 md:py-2 text-xs md:text-sm text-gray-600 break-words'>
                    {idx + 1}
                  </td>
                  <td className='w-1/2 py-3 md:py-2 text-xs md:text-sm text-gray-600 break-words'>
                    {object.key}
                  </td>
                  <td className='w-1/6 py-3 md:py-2 text-xs md:text-sm text-gray-600 break-words'>
                    {object.value}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
