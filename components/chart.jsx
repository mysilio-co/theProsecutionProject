import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import * as DataVisualizerConstants from '../scripts/data-visualizer-constants.js';
import { cloneDeep } from 'lodash';

export default function Chart({
  data,
  timeRange,
  aggregate,
  width = 900,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}) {
  if (!!data && data.length > 0) {
    const gx = useRef();
    const gy = useRef();

    const chartData = timeRollup(_.cloneDeep(data), timeRange, aggregate);
    const x = d3.scaleTime(
      [
        d3.min(chartData, function (d) {
          return d.key;
        }),
        d3.max(chartData, function (d) {
          return d.key;
        }),
      ],
      [marginLeft, width - marginRight],
    );
    const y = d3.scaleLinear(
      [
        d3.min(chartData, function (d) {
          return d.value;
        }),
        d3.max(chartData, function (d) {
          return d.value;
        }),
      ],
      [height - marginBottom, marginTop],
    );
    const line = d3
      .line()
      .x(function (d) {
        return x(d['key']);
      })
      .y(function (d) {
        return y(d['value']);
      });

    useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
    useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
    return (
      <svg width={width} height={height} data={data}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
        <path
          fill='none'
          stroke='steelblue'
          strokeWidth='1.5'
          d={line(chartData)}
        />
      </svg>
    );
  } else {
    return <div></div>;
  }
}

function mapRollup(dataRollup) {
  let ret = [];
  dataRollup.forEach((value, key) => {
    ret.push({ key: key, value: value });
  });
  return ret;
}

function timeRollup(data, timeRange, aggregate) {
  if (timeRange === DataVisualizerConstants.YEAR) {
    data.map(function (item) {
      item['Date'] = new Date(item['Date']).getFullYear().toString();
    });
  } else if (timeRange === DataVisualizerConstants.MONTH) {
    data.map(function (item) {
      item['Date'] = roundToNearestMonth(item['Date']);
    });
  } else if (timeRange === DataVisualizerConstants.DAY) {
    data.map(function (item) {
      item['Date'] = new Date(item['Date']);
    });
  }

  const chartData = mapRollup(
    d3.rollup(
      data,
      v => (aggregate === DataVisualizerConstants.COUNT ? v.length : v.length),
      d => d.Date,
    ),
  );

  chartData.sort(function compare(a, b) {
    var dateA = new Date(a.key);
    var dateB = new Date(b.key);
    return dateA - dateB;
  });
  chartData.map(function (item) {
    item['key'] = new Date(item['key']);
  });
  return chartData;
}

function roundToNearestMonth(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month =
    date.getMonth().toString().length == 1
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  return year + '-' + month + '-01';
}
