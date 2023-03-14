export const TAB_NAMES = {
    "General": "General",
    "Summer-Fall 2020 Protests":"Summer-Fall 2020 protest cases",
    "Capitol Raid":"Capitol raid cases"
  };

  export const SHEET_NAMES = [
    "U//FOUO",
    "Summer-Fall 2020 protest cases",
    "Capitol raid cases",
    "Case starters",
    "J20 cases", 
    "Pending cases"
]

export const HOW_TO_TABS = [
    "Functions",
    "Quickstart",
    "In Depth",
    "Codebook"
]

export const IDEOLOGICAL_GROUPING = "Ideological Grouping"

export const DROPDOWN_KEYS = [
    "Date descriptor",
    "Co-offender",
    "Reason for inclusion",
    "Jurisdiction",
    "Location: state",
    "People vs. property",
    "Physical target",
    "Ideological target",
    IDEOLOGICAL_GROUPING,
    "Ideological affiliation",
    "Affiliation with FTO",
    "Hate crime",
    "LEO informant",
    "Previous similar method",
    "Criminal method",
    "Additional criminal method",
    "Completion of crime",
    "Plea",
    "Verdict",
    "Gender",
    "Other status",
    "Racial/ethnic group",
    "Religion",
    "Veteran status",
    "Combat veteran",
    "Citizenship status",
]

export const SEARCH_BY_KEYS_EXPRESS = [
    "Any",
    "Date",
    "Full legal name", 
    "Ideological affiliation",
    "Group affiliation",
    "Criminal method",
    "Length of prison sentence",
    "Short narrative"
]

export const SEARCH_BY_KEYS = [
    "Any",
    "Group affiliation",
    "Charges",
    "Additional details",
    "Short narrative",
    "Location: country",
    "Location: city",
    "Full legal name",
    "Other names/aliases",
    "Service classification",
    "Name of case"
]

export const SEARCH_BY_KEYS_MOBILE = [
    "Any",
    "Date",
    "Full legal name", 
    "Group affiliation",
    "Ideological affiliation",
    "Length of prison sentence"
]

export const RESULTS_PER_PAGE_KEYS = [
    "10",
    "25", 
    "50",
    "100"
]

export const ORDER_BY_KEYS = [
    "asc",
    "desc"
]

export const SCROLL_BAR_COLUMN_KEYS = [
    "Charges",
    "Additional details",
    "Case ID",
    "Group identifier",
    "Source description"
]

export const IDEOLOGICAL_GROUPING_DROPDOWN_VALUES = [
    "Leftist",
    "Rightist",
    "Nationalist Separatist",
    "Salafi-Jihadist",
    "Other"
]

export const LEFTIST_AFFILIATIONS = [
    "Leftist: eco-animal focused",
    "Leftist: government-focused",
    "Leftist: identity-focused",
    "Leftist: unspecified"
]

export const RIGHTIST_AFFILIATIONS = [
    "Rightist: government-focused",
    "Rightist: identity-focused",
    "Rightist: abortion-focused",
    "Rightist: identity focused",
    "Rightist: unspecified"
]

export const NATIONALIST_SEPARATIST_AFFILIATIONS = [
    "Nationalist-separatist"
]

export const SALAFI_JIHADIST_AFFILIATIONS = [
    "Salafi/Jihadist/Islamist"
]

export const OTHER_AFFILIATIONS = [
    "Other",
    "Unclear",
    "No affiliation/not a factor"
]

export const IDEOLOGICAL_GROUPING_FILTER_VALUES = {
    "Leftist" : LEFTIST_AFFILIATIONS,
    "Rightist" : RIGHTIST_AFFILIATIONS,
    "Nationalist Separatist" : NATIONALIST_SEPARATIST_AFFILIATIONS,
    "Salafi-Jihadist" : SALAFI_JIHADIST_AFFILIATIONS,
    "Other" : OTHER_AFFILIATIONS
}

export const TABLE_WIDTH_MAP = {
  "Date": "mobile-w-28 w-28",
  "Date descriptor": "w-40",
  "Case ID": "w-64",
  "Group identifier": "w-40",
  "Full legal name": "mobile-w-40 w-52",
  "First name": "w-40",
  "Family name": "w-40",
  "Other names/aliases": "w-64",
  "Co-offender": "w-40",
  "Reason for inclusion": "w-96",
  "Name of case": "w-96",
  "Jurisdiction": "w-36",
  "Location: country": "w-52",
  "Location: state": "w-52",
  "Location: city": "w-52",
  "People vs. property": "w-52",
  "Physical target": "w-64",
  "Ideological target": "w-52",
  "Ideological affiliation": "mobile-w-48 w-72",
  "Affiliation with FTO": "w-36",
  "Group affiliation": "mobile-w-52 w-72",
  "Hate crime": "w-36",
  "LEO informant": "w-36",
  "Previous similar method": "w-36",
  "Criminal method": "w-72",
  "Additional criminal method": "w-72",
  "Completion of crime": "w-64",
  "# killed": "w-32",
  "# injured": "w-32",
  "Charges": "w-96",
  "Plea": "w-64",
  "Verdict": "w-40",
  "Length of prison sentence": "mobile-w-40 w-52",
  "Life sentence": "w-40",
  "Death sentence": "w-40",
  "Additional details": "w-72",
  "Age": "w-32",
  "Gender": "w-32",
  "Other status": "w-36",
  "Racial/ethnic group": "w-64",
  "Religion": "w-36",
  "Veteran status": "w-44",
  "Combat veteran": "w-36",
  "Service classification": "w-44",
  "Citizenship status": "w-52",
  "Short narrative": "mobile-w-screen w-120",
  "Name of coder(s)": "w-64",
  "Source description": "w-96",
  "Audited": "w-52",
  "Date of last review": "w-52",
  "Ready": "w-52",
  "Claimed": "w-52",
  "Complete": "w-52",
  "Questionable Inclusion": "w-52",
  "Tags": "w-64"
}

export const TABLE_WIDTH_MAP_MOBILE = {
    "Date": "w-20",
    "Full legal name": "w-20",
    "Ideological affiliation": "w-20",
    "Group affiliation": "w-20",
    "Length of prison sentence": "w-20"
  }

  export const MOBILE_COLUMN_KEYS = [
    "Date",
    "Full legal name", 
    "Ideological affiliation",
    "Group affiliation",
    "Length of prison sentence"
]

export const MOBILE_COLUMN_IDS = [
    "A", "E", "S", "U", "AG", "AT"
]

export const DESKTOP_EXPRESS_COLUMN_KEYS = [
    "Date",
    "Full legal name", 
    "Ideological affiliation",
    "Group affiliation",
    "Criminal method",
    "Length of prison sentence",
    "Short narrative"
]

export const DESKTOP_EXPRESS_COLUMN_IDS = [
    "A", "E", "S", "U", "Y", "AG", "AT"
]

export const NUMERIC_COLUMNS = [
    "Length of prison sentence",
    "# killed",
    "# injured",
    "Life sentence",
    "Death sentence",
    "Age"
]

export const DESKTOP_COLUMN_KEYS = [
    "Date",
    "Date descriptor",
    "Case ID",
    "Group identifier",
    "Full legal name",
    "First name",
    "Family name",
    "Other names/aliases",
    "Co-offender",
    "Reason for inclusion",
    "Name of case",
    "Jurisdiction",
    "Location: country",
    "Location: state",
    "Location: city",
    "People vs. property",
    "Physical target",
    "Ideological target",
    "Ideological affiliation",
    "Affiliation with FTO",
    "Group affiliation",
    "Hate crime",
    "LEO informant",
    "Previous similar method",
    "Criminal method",
    "Additional criminal method",
    "Completion of crime",
    "# killed",
    "# injured",
    "Charges",
    "Plea",
    "Verdict",
    "Length of prison sentence",
    "Life sentence",
    "Death sentence",
    "Additional details",
    "Age",
    "Gender",
    "Other status",
    "Racial/ethnic group",
    "Religion",
    "Veteran status",
    "Combat veteran",
    "Service classification",
    "Citizenship status",
    "Short narrative",
    "Source description",
]

export const DESKTOP_EXPRESS_KEYS_TO_BE_OMITTED = [
    "Date descriptor",
    "Case ID",
    "Group identifier",
    "First name",
    "Family name",
    "Other names/aliases",
    "Co-offender",
    "Reason for inclusion",
    "Name of case",
    "Jurisdiction",
    "Location: country",
    "Location: state",
    "Location: city",
    "People vs. property",
    "Physical target",
    "Ideological target",
    "Affiliation with FTO",
    "Hate crime",
    "LEO informant",
    "Previous similar method",
    "Additional criminal method",
    "Completion of crime",
    "# killed",
    "# injured",
    "Charges",
    "Plea",
    "Verdict",
    "Life sentence",
    "Death sentence",
    "Additional details",
    "Age",
    "Gender",
    "Other status",
    "Racial/ethnic group",
    "Religion",
    "Veteran status",
    "Combat veteran",
    "Service classification",
    "Citizenship status",
    "Source description",
]

export const RANGE_MAP = {
    "mobile" : MOBILE_COLUMN_IDS,
    "express" : DESKTOP_EXPRESS_COLUMN_IDS,
    "desktop" : []
}