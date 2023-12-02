import * as d3 from 'd3';
import { cloneDeep } from 'lodash';
import {
  IDEOLOGICAL_AFFILIATION,
  IDEOLOGICAL_GROUPING,
  generateIdeologicalGroupingCategories,
} from './constants';

import { BAR, CENSUS_RATIO_KEY, CHOROPLETH } from './data-visualizer-constants';

export function groupByCategory(data, category) {
  const chartData = _.cloneDeep(data);
  if (category === IDEOLOGICAL_GROUPING) {
    const IDEOLOGICAL_GROUPING_VALUES = generateIdeologicalGroupingCategories();
    chartData.map(datum => {
      return (datum[IDEOLOGICAL_GROUPING] =
        IDEOLOGICAL_GROUPING_VALUES[datum[IDEOLOGICAL_AFFILIATION]]);
    });
  }
  chartData.forEach(d => {
    if (!d[category]) {
      d[category] = '';
    }
  });
  return d3.group(chartData, d => d[category]);
}

export function gridX(x, ticks) {
  return d3.axisBottom(x).ticks(ticks);
}

export function gridY(y, ticks) {
  return d3.axisLeft(y).ticks(ticks);
}

export function mapData(dataRollup, variableName) {
  let ret = [];
  dataRollup.forEach((value, key) => {
    ret.push({
      key: !!key
        ? key
        : variableName === 'All'
        ? 'All Data'
        : '(Missing/invalid value)',
      value: value.length,
    });
  });
  ret.sort(function compare(a, b) {
    return b.value - a.value;
  });
  ret.forEach((d, i) => {
    d.length = ret.length;
    d.index = i;
  });
  return ret;
}

export function sortCensusData(data) {
  data.sort(function compare(a, b) {
    if (a[CENSUS_RATIO_KEY] && b[CENSUS_RATIO_KEY]) {
      return b[CENSUS_RATIO_KEY] - a[CENSUS_RATIO_KEY];
    } else if (!a[CENSUS_RATIO_KEY] && !b[CENSUS_RATIO_KEY]) {
      return 0;
    } else if (!b[CENSUS_RATIO_KEY]) {
      return -1;
    } else if (!a[CENSUS_RATIO_KEY]) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function appendTooltipToSvg(svg) {
  svg
    .append('g')
    .attr('class', 'tooltip')
    .attr('fill', '#575757')
    .style('pointer-events', 'none')
    .style('opacity', '0');
  svg
    .select('.tooltip')
    .append('rect')
    .attr('class', 'tooltip-bg')
    .attr('fill', 'white')
    .attr('stroke', '#575757')
    .attr('width', '150px')
    .attr('height', '50px')
    .attr('y', '-1rem');
  svg
    .select('.tooltip')
    .append('text')
    .attr('class', 'tooltip-key')
    .attr('x', '0.5rem')
    .attr('y', '0.2rem');
  svg
    .select('.tooltip')
    .append('text')
    .attr('class', 'tooltip-value')
    .attr('x', '0.5rem')
    .attr('y', '1.2rem');
}

export function tooltipMouseOver(
  svg,
  e,
  d,
  chartObject,
  chartType,
  offsetWidth,
) {
  if (offsetWidth > 768) {
    const tooltip = svg.select('.tooltip');
    const tooltipWidth = d.key.length > 10 ? d.key.length * 8 : 100;
    const tooltipX =
      chartType !== BAR || (0.5 > d.index / d.length && d.length > 1)
        ? e.offsetX
        : e.offsetX - tooltipWidth;
    const tooltipValue = `${d.value} ${
      chartType !== CHOROPLETH ? 'cases' : ''
    }`;
    chartObject.transition().duration('150').attr('opacity', '.7');
    d3.select('.tooltip-key').html(`${d.key}`);
    d3.select('.tooltip-value').html(tooltipValue);
    d3.select('.tooltip-bg').style('width', `${tooltipWidth}px`);
    tooltip.transition().duration(150).style('opacity', 1);
    tooltip.style('transform', `translate(${tooltipX}px, ${e.offsetY}px)`);
  }
}

export function tooltipMouseOut(chartObject, offsetWidth) {
  if (offsetWidth > 768) {
    const tooltip = d3.select('.tooltip');
    chartObject.transition().duration('150').attr('opacity', '1');
    tooltip.transition().duration('150').style('opacity', 0);
  }
}
