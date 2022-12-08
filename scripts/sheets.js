import { SHEET_NAMES } from './constants';

const { google } = require('googleapis');
const path = require('path');
const {GoogleAuth} = require('google-auth-library');

export async function getSheetsData(tab) {
  const KEYFILEPATH = path.join('./service-account-key.json');
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  
  const auth = new GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
  });
  const sheets = google.sheets({version: 'v4', auth});
  
  let ret = null;
  const query = tab==='General' ? ['U//FOUO!A:AT', 'Pending cases!A:AT'] : [SHEET_NAMES[tab]+'!A:AT']; 
  await sheets.spreadsheets.values.batchGet({
      spreadsheetId: '19n55x92uJQBbRmIa_8bR-SP8phiZ-NQC4oW86sbGNm4',
      ranges: query
    }).then(function(result) {
      ret = result;
    })  
  return ret;
}
