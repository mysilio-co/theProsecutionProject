import { DESKTOP_EXPRESS_COLUMN_IDS, MOBILE_COLUMN_IDS, SHEET_NAMES } from '../../../scripts/constants';
import { parseSheetsResponse } from '../../../scripts/data-handling';
import { concatAllColumns, concatSpecificColumns, generateSheetsQuery, getSheetsData } from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {
  const rangeMap = {
    "mobile" : MOBILE_COLUMN_IDS,
    "express" : DESKTOP_EXPRESS_COLUMN_IDS,
    "desktop" : []
  }
  const tab = req.query.tab === 'General' ? ['U//FOUO', 'Pending cases'] : [SHEET_NAMES[req.query.tab]]; 
  const file:any = await getSheetsData(tab, generateSheetsQuery(tab, rangeMap[req.query.range]));
  let sheetData:any = [];
  if(req.query.range==="desktop") {
    sheetData = concatAllColumns(file);
  }
  else {
    sheetData = concatSpecificColumns(file);
  }
  const fileJSON = parseSheetsResponse(sheetData);
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json(fileJSON);
}