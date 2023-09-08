import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants.js';
import { cloneDeep } from 'lodash';

export default function LineChart({
  svgRef,
  data,
  timeRange,
  variable,
  categoryNames,
  width = 900,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}) {
  if (!!data && data.length > 0) {
    d3.selectAll('path').remove();
    const gx = useRef();
    const gy = useRef();
    const svg = d3.select(svgRef.current);
    const lineData = [];
    let lines = [];
    const categories = groupByCategory(data, variable);
    categories.forEach(categoryData => {
      const category = categoryData[0][variable];
      const chartData = timeRollup(_.cloneDeep(categoryData), timeRange);
      const obj = {};
      obj[category] = chartData;
      categoryNames.push(category);
      lineData.push(obj);
    });
    lines = generateLines(
      lineData,
      width,
      height,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
    );
    const x = scaleX(
      Object.values(lineData[0])[0],
      width,
      marginLeft,
      marginRight,
    );
    const y = scaleY(
      Object.values(lineData[0])[0],
      height,
      marginTop,
      marginBottom,
    );

    useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
    useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
    svg
      .select('.x-axis')
      .style('transform', 'translateY(100px)')
      .call(d3.axisBottom(x));
    svg
      .select('.y-axis')
      .style('transform', 'translateX(0px)')
      .call(d3.axisLeft(y));
    svg
      .selectAll('.line')
      .data(lines)
      .enter()
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', (d, i) => DataVisualizerConstants.CHART_COLORS[i])
      .attr('stroke-width', '1.5')
      .attr('d', d => {
        return d;
      });
    return (
      <svg width={width} height={height} ref={svgRef}>
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft},0)`} />
      </svg>
    );
  } else {
    return <div></div>;
  }
}

function scaleX(data, width, marginLeft, marginRight) {
  return d3.scaleTime(
    [
      d3.min(data, function (d) {
        return d.key;
      }),
      d3.max(data, function (d) {
        return d.key;
      }),
    ],
    [marginLeft, width - marginRight],
  );
}

function scaleY(data, height, marginTop, marginBottom) {
  return d3.scaleLinear(
    [
      d3.min(data, function (d) {
        return d.value;
      }),
      d3.max(data, function (d) {
        return d.value;
      }),
    ],
    [height - marginBottom, marginTop],
  );
}

function generateLines(
  lineData,
  width,
  height,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
) {
  const lines = [];
  lineData.forEach(line => {
    const lineArray = Object.values(line)[0];
    const x = scaleX(lineArray, width, marginLeft, marginRight);
    const y = scaleY(lineArray, height, marginTop, marginBottom);
    const linePoints = d3
      .line()
      .x(d => x(d['key']))
      .y(d => y(d['value']));
    lines.push(linePoints(lineArray));
  });
  return lines;
}

function groupByCategory(data, category) {
  return d3.group(data, d => d[category]);
}

function mapRollup(dataRollup) {
  let ret = [];
  dataRollup.forEach((value, key) => {
    ret.push({ key: key, value: value });
  });
  return ret;
}

function timeRollup(data, timeRange) {
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
      v => v.length,
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
