import * as d3 from 'd3';
import { cloneDeep } from 'lodash';
import {
  IDEOLOGICAL_AFFILIATION,
  IDEOLOGICAL_GROUPING,
  generateIdeologicalGroupingCategories,
} from './constants';

export function groupByCategory(data, category) {
  const chartData = _.cloneDeep(data);
  if (category === IDEOLOGICAL_GROUPING) {
    const IDEOLOGICAL_GROUPING_VALUES = generateIdeologicalGroupingCategories();
    chartData.map(datum => {
      return (datum[IDEOLOGICAL_GROUPING] =
        IDEOLOGICAL_GROUPING_VALUES[datum[IDEOLOGICAL_AFFILIATION]]);
    });
  }
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
        : '(Empty/missing value)',
      value: value.length,
    });
  });
  ret.sort(function compare(a, b) {
    return b.value - a.value;
  });
  return ret;
}
