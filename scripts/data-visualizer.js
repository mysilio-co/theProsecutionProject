import * as d3 from 'd3';
import { cloneDeep } from 'lodash';
import {
  IDEOLOGICAL_AFFILIATION,
  IDEOLOGICAL_GROUPING,
  generateIdeologicalGroupingCategories,
} from './constants';

import { CENSUS_RATIO_KEY } from './data-visualizer-constants';

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
