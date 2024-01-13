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
  offsetWidth,
  margin = 20,
  censusData,
  isCensus,
}) {
  let instanceData = [];
  let categories = [];

  useEffect(() => {
    setCategoryNames([]);
    setChartData(instanceData);
  }, [data, isCensus, censusData]);

  if (!!data && data.length > 0) {
    categories = DataVisualizerScripts.groupByCategory(data, 'Location: state');
    instanceData = DataVisualizerScripts.mapData(categories, '');
    if (!!censusData && isCensus) {
      instanceData.map(data => {
        data[DataVisualizerConstants.CENSUS_KEY] = censusData[data['key']];
        data[DataVisualizerConstants.CENSUS_RATIO_KEY] =
          (data['value'] / data[DataVisualizerConstants.CENSUS_KEY]) * 100000;
      });
    }
    if (isCensus) {
      DataVisualizerScripts.sortCensusData(instanceData);
    }
    d3.selectAll('.full-map').remove();
    d3.selectAll('.state').remove();
    d3.selectAll('.state-text').remove();
    d3.selectAll('.state-line').remove();
    d3.selectAll('.us-line').remove();
    d3.selectAll('.title-text').remove();
    d3.selectAll('.tooltip').remove();
    const svg = d3.select(svgRef.current);
    const us = STATES_ALBERS_10M;
    const chartData = _.cloneDeep(instanceData).filter(data => {
      return (
        data.key != 'Outside U.S.' &&
        data.key != 'Multiple states' &&
        data.key != 'Unknown' &&
        data.key != 'Puerto Rico' &&
        data.key != 'Virgin Islands'
      );
    });

    const path = d3.geoPath();
    const format = d => `${d}`;
    const valuemap = new Map(
      chartData.map(d =>
        isCensus ? [d.key, d.censusRatio] : [d.key, d.value],
      ),
    );
    const color = d3.scaleQuantize(
      [
        0,
        d3.max(
          chartData.map(category =>
            isCensus ? category.censusRatio : category.value,
          ),
        ),
      ],
      isCensus ? d3.schemeBlues[5] : d3.schemeBlues[8],
    );

    svg
      .append('g')
      .attr('transform', 'translate(610,20)')
      .attr('class', 'title-text')
      .append(() =>
        Legend(color, {
          title: isCensus
            ? '# of Cases per 100,000 People (Census 2021)'
            : '# of Cases by State',
          width: 260,
          isCensus: isCensus,
        }),
      );
    svg
      .append('g')
      .attr('class', 'full-map')
      .selectAll('path')
      .attr('class', 'state')
      .data(topojson.feature(us, us.objects.states).features)
      .join('path')
      .attr('fill', d => {
        return color(
          !!valuemap.get(d.properties.name)
            ? valuemap.get(d.properties.name)
            : 0,
        );
      })
      .attr('d', path);
    svg
      .append('g')
      .attr('class', 'state-line')
      .append('path')
      .datum(topojson.mesh(us, us.objects.states))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-linejoin', 'round')
      .attr('d', path);
    svg
      .append('g')
      .attr('class', 'us-line')
      .append('path')
      .datum(topojson.feature(us, us.objects.nation))
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-linejoin', 'round')
      .attr('d', d3.geoPath());
    d3.select('.full-map')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.states).features)
      .on('mouseover', function (e, d) {
        const data = {
          key: d.properties.name,
          value: !!valuemap.get(d.properties.name)
            ? isCensus
              ? valuemap.get(d.properties.name).toFixed(4)
              : valuemap.get(d.properties.name) + ' cases'
            : 0,
        };
        DataVisualizerScripts.tooltipMouseOver(
          svg,
          e,
          data,
          d3.select(this),
          DataVisualizerConstants.CHOROPLETH,
          offsetWidth,
        );
      })
      .on('mouseout', function () {
        DataVisualizerScripts.tooltipMouseOut(d3.select(this), offsetWidth);
      });
    DataVisualizerScripts.appendTooltipToSvg(svg);
    return (
      <svg
        width={width}
        height={height}
        ref={svgRef}
        className='m-auto bg-white'
      ></svg>
    );
  } else {
    return <div></div>;
  }
}
