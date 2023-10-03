import * as d3 from 'd3';

export function gridX(x, ticks) {
  return d3.axisBottom(x).ticks(ticks);
}

export function gridY(y, ticks) {
  return d3.axisLeft(y).ticks(ticks);
}
