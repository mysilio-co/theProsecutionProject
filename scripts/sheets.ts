import {
  DICTIONARY_GROUP_TAB,
  DICTIONARY_TAG_TAB,
  GROUP_AFFILIATION,
  RANGE_MAP,
  TAG,
} from './constants';

import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import {
  DictionarySheet,
  GroupAffiliation,
  TagName,
} from '../models/DictionarySheet.model';

export async function getSheetsData(sheetId, query) {
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  const creds = {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY,
  };
  const auth = new GoogleAuth({
    credentials: creds,
    scopes: SCOPES,
  });
  const sheets = google.sheets({ version: 'v4', auth });

  let ret = null;
  await sheets.spreadsheets.values
    .batchGet({
      spreadsheetId: sheetId,
      ranges: query,
    })
    .then(function (result) {
      ret = result;
    });
  return ret;
}

export async function getSingleSheetData(sheetId, query) {
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  const creds = {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY,
  };
  const auth = new GoogleAuth({
    credentials: creds,
    scopes: SCOPES,
  });
  const sheets = google.sheets({ version: 'v4', auth });

  let ret = null;
  await sheets.spreadsheets.values
    .get({
      spreadsheetId: sheetId,
      range: query,
    })
    .then(function (result) {
      ret = result;
    });
  return ret;
}

export function generateSheetsQuery(tabs, start, end) {
  let query = [];
  const startsAwayFromTop = !!start && start != '1';
  tabs.forEach(tab => {
    if (startsAwayFromTop) {
      query.push(tab + '!A1:AU1');
    }
    query.push(tab + '!A' + start + ':AU' + end);
  });
  return query;
}

export function generateSheetsDateQuery(tab) {
  let query = [];
  query.push(tab + '!A:A');
  return query;
}

export function generateSheetsDictionaryQuery() {
  let query = [];
  query.push(DICTIONARY_TAG_TAB + '!A:B');
  query.push(DICTIONARY_GROUP_TAB + '!A:B');
  return query;
}

export function concatAllColumns(file) {
  let sheetData = [];
  if (!!file) {
    file.data.valueRanges.forEach(function (sheet, index) {
      if (index != 0) {
        sheetData = sheetData.concat(
          sheet.values.slice(1, sheet.values.length),
        );
      } else {
        sheetData = sheetData.concat(sheet.values);
      }
    });
  }
  return sheetData;
}

export function parseDictionaryResponse(file): DictionarySheet {
  const dictionary: DictionarySheet = new DictionarySheet();
  const tags: TagName[] = [];
  const groups: GroupAffiliation[] = [];
  if (!!file) {
    file.data.valueRanges.forEach(function (sheet, index) {
      if (index == 0) {
        sheet.values.map((value, i) => {
          tags.push(createTagNameFromRow(value));
        });
        tags.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sheet.values.map((value, i) => {
          groups.push(createGroupAffiliationFromRow(value));
        });
        groups.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }
  dictionary[TAG] = tags;
  dictionary[GROUP_AFFILIATION] = groups;
  return dictionary;
}

function createTagNameFromRow(row): TagName {
  const tag = new TagName();
  tag.name = row[0];
  tag.description = row[1];
  return tag;
}

function createGroupAffiliationFromRow(row): GroupAffiliation {
  const group = new GroupAffiliation();
  group.name = row[0];
  group.description = row[1];
  return group;
}

export function concatSpecificColumns(file, range) {
  let sheetData = [];
  let rowData = [];
  let combinedData = [];
  let numberOfColumns = RANGE_MAP[range].length;
  if (!!file) {
    // looping through all columns for all sheets to put them into one array of arrays
    // flat() removes empty arrays so extra step is needed to convert an empty array to an empty string
    file.data.valueRanges.forEach(sheet => {
      sheetData.push(
        sheet.values.map(value => (value.length == 0 ? [''] : value)).flat(1),
      );
    });

    let currentIndex = 0;
    // grouping columns from the same sheets together and then turning them into array of objects
    while (currentIndex < sheetData.length) {
      let currentSheet = sheetData.slice(
        currentIndex,
        currentIndex + numberOfColumns,
      );
      rowData.push(
        currentSheet[0].map((col, i) => currentSheet.map(row => row[i])),
      );
      currentIndex += numberOfColumns;
    }
    // combining the data from all sheets into one array
    combinedData.push(rowData[0][0]);
    rowData.forEach(row => {
      combinedData = combinedData.concat(row.slice(1, row.length));
    });
  }

  return combinedData;
}
