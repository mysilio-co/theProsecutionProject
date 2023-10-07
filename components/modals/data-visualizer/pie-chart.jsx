import * as d3 from 'd3';
import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants.js';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import * as DataVisualizerScripts from '../../../scripts/data-visualizer.js';

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
  let instanceData = [];
  let categories = [];

  useEffect(() => {
    setChartData(instanceData);
    setCategoryNames(instanceData.map(category => category.key));
  }, [, variable]);

  if (!!data && data.length > 0) {
    categories = DataVisualizerScripts.groupByCategory(data, variable);
    instanceData = DataVisualizerScripts.mapData(categories, variable);
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
    return (
      <svg width={width} height={height} ref={svgRef} className='m-auto'></svg>
    );
  } else {
    return <div></div>;
  }
}
