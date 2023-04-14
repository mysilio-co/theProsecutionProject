import { SHEET_NAMES } from '../../../scripts/constants';
import { parseSheetsResponse } from '../../../scripts/data-handling';
import { concatAllColumns, generateSheetsQuery, getSheetsData } from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {

  // Validate Request
  if(!(SHEET_NAMES.includes(req.query.sheet))) {
    res.status(500).send({ error: 'sheet param is missing or invalid, must be one of: ' + SHEET_NAMES })
  }
  try {
    const sheet = [req.query.sheet]; 
    const start = !!req.query.start ? req.query.start : '';
    const end = !!req.query.end ? req.query.end : '';
    const file:any = await getSheetsData(generateSheetsQuery(sheet, start, end));
    let sheetData:any = [];
    // Used when getting all the columns on a table
    sheetData = concatAllColumns(file);
    const fileJSON = parseSheetsResponse(sheetData);
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).json(fileJSON);
  } catch(err) {
    res.status(500).json({'error': err.errors});
  }

}