import { DESKTOP_EXPRESS_COLUMN_IDS, MOBILE_COLUMN_IDS, SHEET_NAMES } from '../../../scripts/constants';
import { parseSheetsResponse } from '../../../scripts/data-handling';
import { concatAllColumns, concatSpecificColumns, generateSheetsQuery, getSheetsData } from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {
  const RANGE_MAP = {
    "mobile" : MOBILE_COLUMN_IDS,
    "express" : DESKTOP_EXPRESS_COLUMN_IDS,
    "desktop" : []
  }
  // Validate Request
  if((!(req.query.tab in SHEET_NAMES) && req.query.tab!="General")) {
    res.status(500).send({ error: 'tab param is missing or invalid, must be one of: ' + Object.keys(SHEET_NAMES) })
  }
  else if(!(req.query.range in RANGE_MAP)) {
    res.status(500).send({ error: 'range param is missing or invalid, must be one of: ' + Object.keys(RANGE_MAP) })
  }
  const range = req.query.range;
  const tab = req.query.tab === 'General' ? ['U//FOUO', 'Pending cases'] : [SHEET_NAMES[req.query.tab]]; 
  const file:any = await getSheetsData(generateSheetsQuery(tab, RANGE_MAP[range]));
  let sheetData:any = [];
  
  // Used when getting all the columns on a table
  if(range==="desktop") {
    sheetData = concatAllColumns(file);
  }
  // Used when getting specific columns, need an extra step to combine the columns into one object
  else {
    sheetData = concatSpecificColumns(file);
  }
  const fileJSON = parseSheetsResponse(sheetData);
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json(fileJSON);
}