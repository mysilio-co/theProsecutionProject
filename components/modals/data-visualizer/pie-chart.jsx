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
  offsetWidth,
}) {
  let instanceData = [];
  let categories = [];

  useEffect(() => {
    setChartData(instanceData);
    setCategoryNames(instanceData.map(category => category.key));
  }, [, variable]);

  if (!!data && data.length > 0) {
    console.log(offsetWidth);
    categories = DataVisualizerScripts.groupByCategory(data, variable);
    instanceData = DataVisualizerScripts.mapData(categories, variable);
    d3.selectAll('.pie').remove();
    d3.selectAll('.pie-fill').remove();
    d3.selectAll('.tooltip').remove();
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
      .attr(
        'transform',
        'translate(' + offsetWidth / 2 + ',' + height / 2 + ')',
      )
      .attr('class', 'pie-fill')
      .append('path')
      .attr('d', d3.arc().innerRadius(0).outerRadius(radius))
      .attr('fill', function (d, i) {
        return DataVisualizerConstants.CHART_COLORS[i];
      })
      .attr('stroke', 'black')
      .style('stroke-width', '1px')
      .style('text-align', 'center')
      .on('mouseover', function (e, d) {
        DataVisualizerScripts.tooltipMouseOver(
          svg,
          e,
          d.data,
          d3.select(this),
          DataVisualizerConstants.PIE,
          offsetWidth,
        );
      })
      .on('mouseout', function () {
        DataVisualizerScripts.tooltipMouseOut(d3.select(this), offsetWidth);
      });
    DataVisualizerScripts.appendTooltipToSvg(svg);
    return (
      <svg
        width={offsetWidth}
        height={height}
        ref={svgRef}
        className='bg-white'
      ></svg>
    );
  } else {
    return <div></div>;
  }
}
