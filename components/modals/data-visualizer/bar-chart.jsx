import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants.js';
import { cloneDeep } from 'lodash';

export default function BarChart({
  svgRef,
  data,
  variable,
  setCategoryNames,
  setChartData,
  width = 900,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}) {
  const [instanceData, setInstanceData] = useState([]);

  useEffect(() => {
    setChartData(instanceData);
    setCategoryNames(instanceData.map(category => category.key));
  }, [instanceData]);

  useEffect(() => {
    const categories = groupByCategory(data, variable);
    setInstanceData(mapData(categories));
  }, [variable]);

  if (!!data && data.length > 0) {
    d3.selectAll('rect').remove();
    const gx = useRef();
    const gy = useRef();
    const svg = d3.select(svgRef.current);
    const categoryNames = instanceData.map(category => category.key);
    const categoryValues = instanceData.map(category => category.value);
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(categoryNames)
      .padding(0.2);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(categoryValues)])
      .range([height - marginBottom, marginTop]);

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
      .selectAll('mybar')
      .data(instanceData)
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d.key);
      })
      .attr('y', function (d) {
        return y(d.value);
      })
      .attr('fill', function (d, i) {
        return DataVisualizerConstants.CHART_COLORS[i];
      })
      .attr('width', x.bandwidth())
      .attr('height', function (d) {
        return height - y(d.value) - marginBottom;
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

function groupByCategory(data, category) {
  return d3.group(data, d => d[category]);
}

function mapData(dataRollup) {
  let ret = [];
  dataRollup.forEach((value, key) => {
    ret.push({ key: key, value: value.length });
  });
  ret.sort(function compare(a, b) {
    return b.value - a.value;
  });
  return ret;
}
