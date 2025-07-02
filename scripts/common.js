import { ALL_COLUMN_KEYS } from './constants';

export const fetcher = async url =>
  await fetch(url).then(res => {
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.');
      error.status = res.status;
      throw error;
    }
    return res.json();
  });

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function isActiveFilters(queryParams) {
  const activeFilters = [];
  Object.keys(queryParams).forEach(param => {
    if (ALL_COLUMN_KEYS.includes(param) || param === 'from' || param === 'to') {
      activeFilters.push({ [param]: queryParams[param] });
    }
  });
  return activeFilters.length > 0;
}
