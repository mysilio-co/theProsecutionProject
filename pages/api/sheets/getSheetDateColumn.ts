import {
  SHEET_ID_TEAM_SPREADSHEET,
  SHEET_NAMES,
} from '../../../scripts/constants';
import {
  generateSheetsDateQuery,
  getSingleSheetData,
} from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  const sheet = req.query.sheet;

  if (!SHEET_NAMES.includes(req.query.sheet)) {
    res.status(500).send({
      error:
        'sheet param is missing or invalid, must be one of: ' + SHEET_NAMES,
    });
  } else {
    try {
      const file: any = await getSingleSheetData(
        SHEET_ID_TEAM_SPREADSHEET,
        generateSheetsDateQuery(req.query.sheet),
      );
      let sheetData: any = file.data.values;
      res.status(200).json(sheetData);
    } catch (err) {
      res.status(500).json({ error: err.errors });
    }
  }
}
