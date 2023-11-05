export const LINE = 'Line Chart';
export const BAR = 'Bar Chart';
export const PIE = 'Pie Chart';
export const CHOROPLETH = 'U.S. Map';

export const COUNT = 'Count';
export const AVERAGE = 'Average';

export const STATE_COUNT = 'Number of Cases';
export const STATE_RATIO = 'Case Count vs. Population';

export const DAY = 'Day';
export const MONTH = 'Month';
export const YEAR = 'Year';

export const CENSUS_KEY = 'census';
export const CENSUS_RATIO_KEY = 'censusRatio';

export const CHART_ONLY = 'Chart Only';
export const TABLE_ONLY = 'Table Only';
export const ALL_CONTENTS = 'All Contents';

export const CHART_TYPES = [LINE, BAR, PIE, CHOROPLETH];

export const AGGREGATE_OPTIONS = [COUNT, AVERAGE];

export const STATE_OPTIONS = [STATE_COUNT, STATE_RATIO];

export const DATE_OPTIONS = [YEAR, MONTH, DAY];

export const DOWNLOAD_OPTIONS = [
  {
    name: CHART_ONLY,
    description: 'Download only the visualization, colors, and filter options',
  },
  {
    name: TABLE_ONLY,
    description: 'Download only the table containing the data',
  },
  { name: ALL_CONTENTS, description: 'Download all contents' },
];

export const CENSUS_DATA_ERROR_MESSAGE =
  'There was a problem loading census data, population statistics are not available.';

export const CHART_COLORS = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#7fc97f',
  '#beaed4',
  '#fdc086',
  '#ffff99',
  '#f0027f',
  '#bf5b17',
  '#666666',
  '#50e991',
  '#e6d800',
  '#9b19f5',
  '#0bb4ff',
  '#dc0ab4',
  '#b3d4ff',
  '#00bfa0',
  '#000000',
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#7fc97f',
  '#beaed4',
  '#fdc086',
  '#ffff99',
  '#f0027f',
  '#bf5b17',
  '#666666',
  '#50e991',
  '#e6d800',
  '#9b19f5',
  '#0bb4ff',
  '#dc0ab4',
  '#b3d4ff',
  '#00bfa0',
  '#000000',
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#7fc97f',
  '#beaed4',
  '#fdc086',
  '#ffff99',
  '#f0027f',
  '#bf5b17',
  '#666666',
  '#50e991',
  '#e6d800',
  '#9b19f5',
  '#0bb4ff',
  '#dc0ab4',
  '#b3d4ff',
  '#00bfa0',
];

export const US_HASH = {
  Alabama: 'AL',
  Alaska: 'AK',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District of Columbia': 'DC',
  Florida: 'FL',
  Georgia: 'GA',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Pennsylvania: 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  'Virgin Islands': 'VI',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY',
};
