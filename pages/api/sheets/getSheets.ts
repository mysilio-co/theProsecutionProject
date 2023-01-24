import { DESKTOP_EXPRESS_COLUMN_IDS, MOBILE_COLUMN_IDS, RANGE_MAP, SHEET_NAMES } from '../../../scripts/constants';
import { parseSheetsResponse } from '../../../scripts/data-handling';
import { concatAllColumns, concatSpecificColumns, generateSheetsQuery, getSheetsData, getSingleSheetData } from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {

  // Validate Request
  if(!(SHEET_NAMES.includes(req.query.sheet))) {
    res.status(500).send({ error: 'sheet param is missing or invalid, must be one of: ' + SHEET_NAMES })
  }
  else if(!(req.query.range in RANGE_MAP)) {
    res.status(500).send({ error: 'range param is missing or invalid, must be one of: ' + Object.keys(RANGE_MAP) })
  }
  try {
    const range = req.query.range;
    const sheet = [req.query.sheet]; 
    const start = !!req.query.start ? req.query.start : '';
    const end = !!req.query.end ? req.query.end : '';
    const file:any = await getSheetsData(generateSheetsQuery(sheet, RANGE_MAP[range], start, end));
    let sheetData:any = [];
    // Used when getting all the columns on a table
    if(range==="desktop") {
      sheetData = concatAllColumns(file);
    }
    // Used when getting specific columns, need an extra step to combine the columns into one object
    else {
      sheetData = concatSpecificColumns(file, range);
    }
    const fileJSON = parseSheetsResponse(sheetData);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(fileJSON);
  } catch(err) {
    res.status(500).json({'error': err.errors});
  }

}