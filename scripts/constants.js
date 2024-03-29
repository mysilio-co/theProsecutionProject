export const TAB_NAMES = {
  General: 'General',
  'Summer-Fall 2020 Protests': 'Summer-Fall 2020 protest cases',
  'Capitol Protest': 'Capitol protest cases',
  'In Progress': 'Completed Case starters',
};

export const TAB_DESCRIPTIONS = {
  General: 'This tab covers completed cases.',
  'Summer-Fall 2020 Protests':
    'This tab covers protest-related cases occurring during the Summer and Fall of 2020 in response to the death of George Floyd.',
  'Capitol Protest':
    'This tab covers federal and non-federal cases against protesters active in and around the US Capitol building on January 6, 2021.',
  'In Progress':
    'This tab includes cases currently being investigated and coded by researchers as well as those still proceeding through the courts. These cases have not been completed, will change over time, and have not been audited. These cases are provided as a resource, but should be independently investigated and verified before being included in research products.',
};

export const TAB_DOWNLOAD = {
  General: 'general',
  'Summer-Fall 2020 Protests': 'summer-fall-2020',
  'Capitol Protest': 'capitol-protest',
  'In Progress': 'in-progress',
};

export const SHEET_NAMES = [
  'U//FOUO',
  'Summer-Fall 2020 protest cases',
  'Capitol protest cases',
  'Completed Case starters',
  'Case starters',
  'J20 cases',
  'Pending cases',
];

export const HOW_TO_TABS = ['Site Guide', 'Codebook'];

export const DATA_VISUALIZER_TABS = ['Explore', 'Premade Charts'];

export const IDEOLOGICAL_GROUPING = 'Ideological grouping';
export const IDEOLOGICAL_AFFILIATION = 'Ideological affiliation';

export const CATEGORICAL_KEYS = [
  'Date descriptor',
  'Co-offender',
  'Reason for inclusion',
  'Jurisdiction',
  'Location: state',
  'People vs. property',
  'Physical target',
  'Ideological target',
  IDEOLOGICAL_GROUPING,
  'Ideological affiliation',
  'Affiliation with FTO',
  'Hate crime',
  'LEO informant',
  'Previous similar method',
  'Criminal method',
  'Additional criminal method',
  'Completion of crime',
  'Plea',
  'Verdict',
  'Gender',
  'Other status',
  'Racial/ethnic group',
  'Religion',
  'Veteran status',
  'Combat veteran',
  'Citizenship status',
];

export const SEARCH_BY_KEYS_EXPRESS = [
  'Any',
  'Date',
  'Full legal name',
  'Ideological affiliation',
  'Group affiliation',
  'Criminal method',
  'Length of prison sentence (months)',
  'Short narrative',
];

export const SEARCH_BY_KEYS = [
  'Any',
  'Group affiliation',
  'Charges',
  'Additional details',
  'Short narrative',
  'Location: country',
  'Location: city',
  'Full legal name',
  'Other names/aliases',
  'Service classification',
  'Name of case',
  'Tags',
];

export const SEARCH_BY_KEYS_MOBILE = [
  'Any',
  'Date',
  'Full legal name',
  'Group affiliation',
  'Ideological affiliation',
  'Length of prison sentence (months)',
];

export const RESULTS_PER_PAGE_KEYS = ['10', '25', '50', '100'];

export const ORDER_BY_KEYS = ['asc', 'desc'];

export const SCROLL_BAR_COLUMN_KEYS = [
  'Charges',
  'Additional details',
  'Case ID',
  'Group identifier',
  'Source description',
];

export const IDEOLOGICAL_GROUPING_DROPDOWN_VALUES = [
  'Leftist',
  'Rightist',
  'Nationalist Separatist',
  'Salafi-Jihadist',
  'Other',
];

export const LEFTIST_AFFILIATIONS = [
  'Leftist: eco-animal focused',
  'Leftist: government-focused',
  'Leftist: identity-focused',
  'Leftist: unspecified',
];

export const RIGHTIST_AFFILIATIONS = [
  'Rightist: government-focused',
  'Rightist: identity-focused',
  'Rightist: abortion-focused',
  'Rightist: identity focused',
  'Rightist: unspecified',
];

export const NATIONALIST_SEPARATIST_AFFILIATIONS = ['Nationalist-separatist'];

export const SALAFI_JIHADIST_AFFILIATIONS = ['Salafi/Jihadist/Islamist'];

export const OTHER_AFFILIATIONS = [
  'Other',
  'Unclear',
  'No affiliation/not a factor',
];

export const IDEOLOGICAL_GROUPING_FILTER_VALUES = {
  Leftist: LEFTIST_AFFILIATIONS,
  Rightist: RIGHTIST_AFFILIATIONS,
  'Nationalist Separatist': NATIONALIST_SEPARATIST_AFFILIATIONS,
  'Salafi-Jihadist': SALAFI_JIHADIST_AFFILIATIONS,
  Other: OTHER_AFFILIATIONS,
};

export function generateIdeologicalGroupingCategories() {
  const ideologicalGroupingObject = {};
  LEFTIST_AFFILIATIONS.forEach(value => {
    ideologicalGroupingObject[value] = 'Leftist';
  });
  RIGHTIST_AFFILIATIONS.forEach(value => {
    ideologicalGroupingObject[value] = 'Rightist';
  });
  NATIONALIST_SEPARATIST_AFFILIATIONS.forEach(value => {
    ideologicalGroupingObject[value] = 'Nationalist Separatist';
  });
  SALAFI_JIHADIST_AFFILIATIONS.forEach(value => {
    ideologicalGroupingObject[value] = 'Salafi-Jihadist';
  });
  OTHER_AFFILIATIONS.forEach(value => {
    ideologicalGroupingObject[value] = 'Other';
  });
  return ideologicalGroupingObject;
}

export const TABLE_WIDTH_MAP = {
  Date: 'mobile-w-28 w-28 whitespace-nowrap',
  'Date descriptor': 'w-40',
  'Case ID': 'w-64',
  'Group identifier': 'w-40',
  'Full legal name': 'mobile-w-40 w-52',
  'First name': 'w-40',
  'Family name': 'w-40',
  'Other names/aliases': 'w-64',
  'Co-offender': 'w-40',
  'Reason for inclusion': 'w-96',
  'Name of case': 'w-96',
  Jurisdiction: 'w-40',
  'Location: country': 'w-52',
  'Location: state': 'w-52',
  'Location: city': 'w-52',
  'People vs. property': 'w-52',
  'Physical target': 'w-64',
  'Ideological target': 'w-52',
  'Ideological affiliation': 'mobile-w-48 w-72',
  'Affiliation with FTO': 'w-36',
  'Group affiliation': 'mobile-w-52 w-72',
  'Hate crime': 'w-36',
  'LEO informant': 'w-36',
  'Previous similar method': 'w-36',
  'Criminal method': 'w-48',
  'Additional criminal method': 'w-48',
  'Completion of crime': 'w-64',
  '# killed': 'w-36',
  '# injured': 'w-36',
  Charges: 'w-96',
  Plea: 'w-64',
  Verdict: 'w-40',
  'Length of prison sentence (months)': 'mobile-w-40 w-52',
  'Life sentence': 'w-40',
  'Death sentence': 'w-40',
  'Additional details': 'w-72',
  Age: 'w-32',
  Gender: 'w-32',
  'Other status': 'w-36',
  'Racial/ethnic group': 'w-64',
  Religion: 'w-36',
  'Veteran status': 'w-44',
  'Combat veteran': 'w-36',
  'Service classification': 'w-44',
  'Citizenship status': 'w-52',
  'Short narrative': 'mobile-w-screen w-120',
  'Name of coder(s)': 'w-64',
  'Source description': 'w-96',
  Audited: 'w-52',
  'Date of last review': 'w-52',
  Ready: 'w-52',
  Claimed: 'w-52',
  Complete: 'w-52',
  'Questionable Inclusion': 'w-52',
  Tags: 'w-64',
};

export const TABLE_WIDTH_MAP_MOBILE = {
  Date: 'w-20',
  'Full legal name': 'w-20',
  'Ideological affiliation': 'w-20',
  'Group affiliation': 'w-20',
  'Length of prison sentence (months)': 'w-20',
};

export const MOBILE_COLUMN_KEYS = [
  'Date',
  'Full legal name',
  'Ideological affiliation',
  'Group affiliation',
  'Length of prison sentence (months)',
];

export const MOBILE_COLUMN_IDS = ['A', 'E', 'S', 'U', 'AG', 'AT'];

export const DESKTOP_EXPRESS_COLUMN_KEYS = [
  'Date',
  'Full legal name',
  'Ideological affiliation',
  'Group affiliation',
  'Criminal method',
  'Length of prison sentence (months)',
  'Short narrative',
];

export const DESKTOP_EXPRESS_COLUMN_IDS = ['A', 'E', 'S', 'U', 'Y', 'AG', 'AT'];

export const NUMERIC_COLUMNS = [
  'Length of prison sentence (months)',
  '# killed',
  '# injured',
  'Life sentence',
  'Death sentence',
  'Age',
];

export const ALL_COLUMN_KEYS = [
  'Date',
  'Date descriptor',
  'Case ID',
  'Group identifier',
  'Full legal name',
  'First name',
  'Family name',
  'Other names/aliases',
  'Co-offender',
  'Reason for inclusion',
  'Name of case',
  'Jurisdiction',
  'Location: country',
  'Location: state',
  'Location: city',
  'People vs. property',
  'Physical target',
  'Ideological target',
  'Ideological affiliation',
  'Affiliation with FTO',
  'Group affiliation',
  'Hate crime',
  'LEO informant',
  'Previous similar method',
  'Criminal method',
  'Additional criminal method',
  'Completion of crime',
  '# killed',
  '# injured',
  'Charges',
  'Plea',
  'Verdict',
  'Length of prison sentence (months)',
  'Life sentence',
  'Death sentence',
  'Additional details',
  'Age',
  'Gender',
  'Other status',
  'Racial/ethnic group',
  'Religion',
  'Veteran status',
  'Combat veteran',
  'Service classification',
  'Citizenship status',
  'Short narrative',
  'Tags',
  'Source description',
];

export const DESKTOP_EXPRESS_KEYS_TO_BE_OMITTED = [
  'Date descriptor',
  'Case ID',
  'Group identifier',
  'First name',
  'Family name',
  'Other names/aliases',
  'Co-offender',
  'Reason for inclusion',
  'Name of case',
  'Jurisdiction',
  'Location: country',
  'Location: state',
  'Location: city',
  'People vs. property',
  'Physical target',
  'Ideological target',
  'Affiliation with FTO',
  'Hate crime',
  'LEO informant',
  'Previous similar method',
  'Additional criminal method',
  'Completion of crime',
  '# killed',
  '# injured',
  'Charges',
  'Plea',
  'Verdict',
  'Life sentence',
  'Death sentence',
  'Additional details',
  'Age',
  'Gender',
  'Other status',
  'Racial/ethnic group',
  'Religion',
  'Veteran status',
  'Combat veteran',
  'Service classification',
  'Citizenship status',
  'Tags',
  'Source description',
];

export const RANGE_MAP = {
  mobile: MOBILE_COLUMN_IDS,
  express: DESKTOP_EXPRESS_COLUMN_IDS,
  desktop: [],
};
