import {
  CATEGORICAL_KEYS,
  GROUP_AFFILIATION,
  IDEOLOGICAL_GROUPING,
  IDEOLOGICAL_GROUPING_DROPDOWN_VALUES,
  NUMERIC_COLUMNS,
} from './constants';

export function generateListDropdowns(data) {
  let dropdowns = [];
  for (let col of CATEGORICAL_KEYS) {
    const listOptions = getListOptionsByKey(data, col);
    if (listOptions.length > 0) {
      dropdowns.push({ [col]: listOptions });
    }
  }
  dropdowns.push({
    [IDEOLOGICAL_GROUPING]: IDEOLOGICAL_GROUPING_DROPDOWN_VALUES,
  });
  dropdowns = dropdowns.filter(d => Object.keys(d)[0] != GROUP_AFFILIATION);
  dropdowns.push({
    [GROUP_AFFILIATION]: getGroupAffiliationOptions(data),
  });
  return dropdowns;
}

export function generateNumericRanges(data) {
  let dropdowns = [];
  for (let col of NUMERIC_COLUMNS) {
    const values = getNumericColumnValuesByKey(data, col);
    const min = Math.floor(Math.min(...values));
    const max = Math.ceil(Math.max(...values));
    dropdowns.push({ key: col, value: [min, max] });
  }
  return dropdowns;
}

function getListOptionsByKey(data, key) {
  if (data) {
    return [
      ...new Set(
        data
          .map(function (d) {
            return d[key];
          })
          .filter(n => n)
          .sort(),
      ),
    ];
  } else {
    return [];
  }
}

function getGroupAffiliationOptions(data) {
  const groupSet = new Set();
  getListOptionsByKey(data, GROUP_AFFILIATION).forEach(row => {
    row.split(', ').forEach(group => {
      groupSet.add(group);
    });
  });
  const groupList = Array.from(groupSet).sort((a, b) => {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  });
  return Array.from(groupList);
}

function getNumericColumnValuesByKey(data, key) {
  if (data) {
    return [
      ...new Set(
        data
          .map(function (d) {
            return d[key] ? Number(d[key].replaceAll(',', '')) : null;
          })
          .filter(n => n || n == 0),
      ),
    ];
  } else {
    return [];
  }
}
