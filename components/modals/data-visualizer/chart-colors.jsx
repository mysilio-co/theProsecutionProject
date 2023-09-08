import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants';

export default function ChartColors({ categoryNames }) {
  console.log(categoryNames);
  return (
    <div>
      {categoryNames.map((value, index) => {
        return (
          <div className='inline-flex justify-center items-center'>
            <div
              className={'h-1 w-5 mx-2'}
              style={{
                backgroundColor: DataVisualizerConstants.CHART_COLORS[index],
              }}
            ></div>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );
}
