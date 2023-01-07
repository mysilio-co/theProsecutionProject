import { SHEET_NAMES } from './constants';

const { google } = require('googleapis');
const {GoogleAuth} = require('google-auth-library');

export async function getSheetsData(tab, query) {
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  const creds = {
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

export function generateSheetsQuery(tabs, columnKeys) {
  let query = [];
  if(!columnKeys || columnKeys.length===0) {
    tabs.forEach(tab=> {
      query.push(tab+'!A:AT');
    })
  }
  else {
    tabs.forEach(tab => {
      columnKeys.forEach(key => {
        query.push(tab+'!'+key+':'+key);
      })
    })
  }
  return query;
}

export function concatAllColumns(file) {
  let sheetData = [];
  if(!!file) {
    file.data.valueRanges.forEach(sheet=>{
      sheetData = sheetData.concat(sheet.values);
    })
  }
  return sheetData;
}

export function concatSpecificColumns(file) {
  let sheetData = [];
  if(!!file) {
    file.data.valueRanges.forEach(sheet=>{
      sheetData.push(sheet.values.flat(1));
    })
  }
  return sheetData[0].map((col, i) => sheetData.map(row => row[i]));
}