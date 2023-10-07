import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants';

export default function ChartColors({ categoryNames }) {
  categoryNames = categoryNames?.length > 1 ? categoryNames : [];
  return (
    <div className='my-2 mx-3 text-start'>
      {categoryNames.map((value, index) => {
        return (
          <div
            key={'colors-' + index}
            className='inline-flex justify-center items-center'
          >
            <div
              className={'h-1.5 w-5 mx-2'}
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
