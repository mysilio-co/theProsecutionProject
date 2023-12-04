import { classNames } from '../../../scripts/common.js';
import {
  BAR,
  CHOROPLETH,
  LINE,
  PIE,
} from '../../../scripts/data-visualizer-constants.js';
export default function HelpMessage({ showHelpMessage, chartType }) {
  return (
    <div
      className={classNames(
        showHelpMessage ? 'opacity-100' : 'opacity-0 invisible',
        'absolute -translate-y-10 left-8 right-8 bg-white text-sm text-gray-700 border border-gray-800 rounded p-5 z-50 transition-opacity ease-in-out duration-300',
      )}
    >
      {chartType === LINE || chartType === PIE || chartType === BAR ? (
        <p>
          <span className='font-bold'>Variable</span>: The categorical variable
          the dataset will be grouped by. Selecting "All" will show only 1
          group.
        </p>
      ) : (
        ''
      )}
      {chartType === LINE ? (
        <p>
          <span className='font-bold'>Date grouping</span>: The length of time
          between each point on a line chart.
        </p>
      ) : (
        ''
      )}
      {chartType === CHOROPLETH ? (
        <p>
          <span className='font-bold'>Statistic</span>: The number that is shown
          for each state in the U.S., either raw number of cases or the
          percentage of cases vs. state population.
        </p>
      ) : (
        ''
      )}
    </div>
  );
}
