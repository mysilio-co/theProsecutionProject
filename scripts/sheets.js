const { google } = require('googleapis');
const path = require('path');
const {GoogleAuth} = require('google-auth-library');

export async function getSheetsData() {
  const KEYFILEPATH = path.join('./service-account-key.json');
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  
  const auth = new GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: SCOPES,
  });
  const sheets = google.sheets({version: 'v4', auth});
  
  let ret = [];
  await sheets.spreadsheets.values.get({
      spreadsheetId: '19n55x92uJQBbRmIa_8bR-SP8phiZ-NQC4oW86sbGNm4',
      range: 'J20 cases!A:AT'
    }).then(function(result) {
      ret = parseSheetsResponse(result.data.values);
    })  
  return ret;
}




function parseSheetsResponse(response) {
  const keys = response[0];
  const ret = [];
  for(let i = 1; i<response.length; i++) {
    const obj = {};
    keys.forEach((element, index) => {
      obj[element] = response[i][index];
    });
    ret.push(obj);
  }
  return ret
}