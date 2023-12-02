import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants.js';
import { cloneDeep, spread } from 'lodash';
import * as DataVisualizerScripts from '../../../scripts/data-visualizer.js';

export default function LineChart({
  svgRef,
  data,
  timeRange,
  variable,
  setCategoryNames,
  setChartData,
  width = 900,
  height = 400,
  offsetWidth,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}) {
  let instanceData = [];
  let categories = [];
  let lineData = [];

  useEffect(() => {
    setChartData(instanceData);
    setCategoryNames(instanceData.map(category => category.key));
  }, [, variable]);

  if (!!data && data.length > 0) {
    categories = DataVisualizerScripts.groupByCategory(data, variable);
    instanceData = DataVisualizerScripts.mapData(categories, variable);
    d3.selectAll('.line').remove();
    d3.selectAll('.grid').remove();
    d3.selectAll('rect').remove();
    const gx = useRef();
    const gy = useRef();
    const svg = d3.select(svgRef.current);
    const categoryNames = [];
    let lines = [];
    categories.forEach(categoryData => {
      const category = categoryData[0][variable];
      const chartData = timeRollup(_.cloneDeep(categoryData), timeRange);
      const obj = {};
      obj[category] = chartData;
      obj['length'] = categoryData.length;
      categoryNames.push(category);
      lineData.push(obj);
    });
    lineData.sort(function compare(a, b) {
      return b.length - a.length;
    });
    const allDates = getAllDates(lineData);
    const allValues = getAllValues(lineData);
    const finalChartData = combineChartDataWithAllDates(
      lineData,
      generateAllDatesValues(allDates, timeRange),
    );
    lines = generateLines(
      finalChartData,
      allDates,
      allValues,
      width,
      height,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
    );
    const x = scaleX(allDates, width, marginLeft, marginRight);
    const y = scaleY(allValues, height, marginTop, marginBottom);

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
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', (d, i) => DataVisualizerConstants.CHART_COLORS[i])
      .attr('stroke-width', '1.5')
      .attr('d', d => {
        return d;
      });
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(DataVisualizerScripts.gridX(x, 5).tickSize(-height).tickFormat(''));
    svg
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(DataVisualizerScripts.gridY(y, 5).tickSize(-width).tickFormat(''));
    return (
      <svg width={width} height={height} ref={svgRef} className='bg-white'>
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
    [d3.min(data), d3.max(data)],
    [marginLeft, width - marginRight],
  );
}

function scaleY(data, height, marginTop, marginBottom) {
  return d3.scaleLinear([0, d3.max(data)], [height - marginBottom, marginTop]);
}

function generateLines(
  lineData,
  allDates,
  allValues,
  width,
  height,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
) {
  const lines = [];
  const x = scaleX(allDates, width, marginLeft, marginRight);
  const y = scaleY(allValues, height, marginTop, marginBottom);
  lineData.forEach(line => {
    const lineArray = Object.values(line)[0];
    const linePoints = d3
      .line()
      .x(d => x(new Date(d['key'])))
      .y(d => y(d['value']));
    lines.push(linePoints(lineArray));
  });
  return lines;
}

function mapRollup(dataRollup) {
  let ret = {};
  dataRollup.forEach((value, key) => {
    if (!!key && key != 'NaN' && key != 'Invalid Date') {
      ret[new Date(key)] = value;
    }
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
  return chartData;
}

function roundToNearestMonth(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  if (!year) {
    return undefined;
  }
  const month =
    (date.getMonth() + 1).toString().length == 1
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  return year + '-' + month + '-01 00:00:00';
}

function combineChartDataWithAllDates(data, allDatesValues) {
  const chartData = [];
  data.forEach(line => {
    const lineValues = Object.values(line)[0];
    const mergedValues = { ...allDatesValues, ...lineValues };
    const result = Object.keys(mergedValues).map(key => {
      return {
        key: key,
        value: mergedValues[key],
      };
    });
    chartData.push({ [Object.keys(line)[0]]: result });
  });
  return chartData;
}

function generateAllDatesValues(allDatesList, timeRange) {
  const retValue = {};
  const minDate = new Date(d3.min(allDatesList));
  const maxDate = new Date(d3.max(allDatesList));
  let currentDate = minDate;
  if (timeRange === DataVisualizerConstants.MONTH) {
    minDate.setDate(1);
  }
  while (currentDate <= maxDate) {
    retValue[_.cloneDeep(currentDate)] = 0;
    if (timeRange === DataVisualizerConstants.YEAR) {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    } else if (timeRange === DataVisualizerConstants.MONTH) {
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  return retValue;
}

function getAllDates(data) {
  let allDates = [];
  data.forEach(line => {
    allDates = [...allDates, ...Object.keys(Object.values(line)[0])];
  });
  return allDates.map(date => new Date(date).getTime());
}

function getAllValues(data) {
  let allValues = [];
  data.forEach(line => {
    allValues = [...allValues, ...Object.values(Object.values(line)[0])];
  });
  return allValues;
}
