import * as d3 from 'd3';
import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants.js';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';

export default function PieChart({
  svgRef,
  data,
  variable,
  setCategoryNames,
  setChartData,
  width = 400,
  height = 400,
  margin = 20,
}) {
  const [instanceData, setInstanceData] = useState([]);

  useEffect(() => {
    setChartData(instanceData);
  }, [instanceData]);

  useEffect(() => {
    setCategoryNames(instanceData.map(category => category.key));
  }, [instanceData]);

  useEffect(() => {
    const categories = groupByCategory(data, variable);
    setInstanceData(mapData(categories));
  }, [variable]);

  if (!!data && data.length > 0) {
    d3.selectAll('path').remove();
    const svg = d3.select(svgRef.current);
    var radius = Math.min(width, height) / 2 - margin;

    var pie = d3.pie().value(function (d) {
      return d['value'];
    });
    var pieData = pie(instanceData);
    svg
      .selectAll('pie')
      .data(pieData)
      .enter()
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
      .attr('fill', function (d, i) {
        return DataVisualizerConstants.CHART_COLORS[i];
      })
      .attr('stroke', 'black')
      .style('stroke-width', '1px')
      .style('opacity', 0.7);
    return <svg width={width} height={height} ref={svgRef}></svg>;
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
