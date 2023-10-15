import * as d3 from 'd3';
import { Legend } from '../../../scripts/color-legend.js';
import * as DataVisualizerConstants from '../../../scripts/data-visualizer-constants.js';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import * as topojson from 'topojson';
import { STATES_ALBERS_10M } from '../../../scripts/states-albers-10m.js';
import * as DataVisualizerScripts from '../../../scripts/data-visualizer.js';

export default function ChoroplethChart({
  svgRef,
  data,
  setCategoryNames,
  setChartData,
  width = 975,
  height = 610,
  margin = 20,
}) {
  let instanceData = [];
  let categories = [];

  useEffect(() => {
    setCategoryNames([]);
    setChartData(instanceData);
  }, [data]);

  if (!!data && data.length > 0) {
    categories = DataVisualizerScripts.groupByCategory(data, 'Location: state');
    instanceData = DataVisualizerScripts.mapData(categories, '');
    d3.selectAll('path').remove();
    d3.selectAll('text').remove();
    const svg = d3.select(svgRef.current);
    const us = STATES_ALBERS_10M;
    const chartData = _.cloneDeep(instanceData).filter(data => {
      return (
        data.key != 'District of Columbia' &&
        data.key != 'Outside U.S.' &&
        data.key != 'Multiple states' &&
        data.key != 'Unknown' &&
        data.key != 'Puerto Rico' &&
        data.key != 'Virgin Islands'
      );
    });
    // chartData.map(data => {
    //   data['key'] = DataVisualizerConstants.US_HASH[data['key']];
    // });

    const path = d3.geoPath();
    const format = d => `${d}%`;
    const valuemap = new Map(chartData.map(d => [d.key, d.value]));
    const color = d3.scaleQuantize(
      [0, d3.max(chartData.map(category => category.value))],
      d3.schemeBlues[9],
    );

    svg
      .append('g')
      .attr('transform', 'translate(610,20)')
      .append(() =>
        Legend(color, { title: '# of Cases by State', width: 260 }),
      );
    svg
      .append('g')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.states).features)
      .join('path')
      .attr('fill', d => {
        return color(
          !!valuemap.get(d.properties.name)
            ? valuemap.get(d.properties.name)
            : 0,
        );
      })
      .attr('d', path)
      .append('title')
      .text(
        d =>
          `${d.properties.name}, ${
            !!valuemap.get(d.properties.name)
              ? valuemap.get(d.properties.name)
              : 0
          }`,
      );

    svg
      .append('path')
      .datum(topojson.mesh(us, us.objects.states))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-linejoin', 'round')
      .attr('d', path);
    svg
      .append('g')
      .append('path')
      .datum(topojson.feature(us, us.objects.nation))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-linejoin', 'round')
      .attr('d', d3.geoPath());
    return (
      <svg width={width} height={height} ref={svgRef} className='m-auto'></svg>
    );
  } else {
    return <div></div>;
  }
}
