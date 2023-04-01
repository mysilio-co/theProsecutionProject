import { RANGE_MAP, TAB_NAMES } from './constants';

const { google } = require('googleapis');
const {GoogleAuth} = require('google-auth-library');

export async function getSheetsData(query) {
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  const creds = {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY
  };
  const auth = new GoogleAuth({
      credentials: creds,
      scopes: SCOPES,
  });
  const sheets = google.sheets({version: 'v4', auth});
  
  let ret = null;
  await sheets.spreadsheets.values.batchGet({
      spreadsheetId: '19n55x92uJQBbRmIa_8bR-SP8phiZ-NQC4oW86sbGNm4',
      ranges: query
    }).then(function(result) {
      ret = result;
    })  
  return ret;
}

export async function getSingleSheetData(query) {
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  const creds = {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY
  };
  const auth = new GoogleAuth({
      credentials: creds,
      scopes: SCOPES,
  });
  const sheets = google.sheets({version: 'v4', auth});
  
  let ret = null;
  await sheets.spreadsheets.values.get({
      spreadsheetId: '19n55x92uJQBbRmIa_8bR-SP8phiZ-NQC4oW86sbGNm4',
      range: query
    }).then(function(result) {
      ret = result;
    })  
  return ret;
}

export function generateSheetsQuery(tabs, start, end) {
  let query = [];
  const startsAwayFromTop = !!start && start!='1';
  tabs.forEach(tab => {
    if(startsAwayFromTop) {
      query.push(tab+'!A1:AT1');
    }
    query.push(tab+'!A'+start+':AT'+end);
  })
  return query;
}

export function generateSheetsDateQuery(tab) {
  let query = [];
  query.push(tab+'!A:A');
  return query;
}

export function concatAllColumns(file) {
  let sheetData = [];
  if(!!file) {
    file.data.valueRanges.forEach(function(sheet, index){
      if(index!=0) {
        sheetData = sheetData.concat(sheet.values.slice(1, sheet.values.length));
      }
      else {
        sheetData = sheetData.concat(sheet.values);
      }
    })
  }
  return sheetData;
}

export function concatSpecificColumns(file, range) {
  let sheetData = [];
  let rowData = [];
  let combinedData = [];
  let numberOfColumns = RANGE_MAP[range].length;
  if(!!file) {
    // looping through all columns for all sheets to put them into one array of arrays
    // flat() removes empty arrays so extra step is needed to convert an empty array to an empty string
    file.data.valueRanges.forEach(sheet => {
      sheetData.push(sheet.values.map(value => value.length==0 ? [''] : value).flat(1));
    })
    
    let currentIndex = 0;
    // grouping columns from the same sheets together and then turning them into array of objects
    while(currentIndex<sheetData.length) {
      let currentSheet = sheetData.slice(currentIndex, currentIndex+numberOfColumns);
      rowData.push(currentSheet[0].map((col, i) => currentSheet.map(row => row[i])));
      currentIndex+=numberOfColumns;
    }
    // combining the data from all sheets into one array
    combinedData.push(rowData[0][0]);
    rowData.forEach(row => {
      combinedData = combinedData.concat(row.slice(1,row.length));
    })
  }

  return combinedData;
}