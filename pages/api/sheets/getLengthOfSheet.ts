import { SHEET_NAMES } from '../../../scripts/constants';
import { generateSheetsDateQuery, getSingleSheetData } from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {
    const sheet = req.query.sheet;

    if(!(SHEET_NAMES.includes(req.query.sheet))) {
      res.status(500).send({ error: 'sheet param is missing or invalid, must be one of: ' + SHEET_NAMES })
    }
    else {
      const file:any = await getSingleSheetData(generateSheetsDateQuery(sheet));
      let sheetData:any = file.data.values;
      res.status(200).json({length:sheetData.length});
    }
}