import { DictionarySheet } from '../../../models/DictionarySheet.model';
import { SHEET_ID_DICTIONARY } from '../../../scripts/constants';
import {
  generateSheetsDictionaryQuery,
  getSheetsData,
  parseDictionaryResponse,
} from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  try {
    const file: any = await getSheetsData(
      SHEET_ID_DICTIONARY,
      generateSheetsDictionaryQuery(),
    );
    const sheetData: DictionarySheet = parseDictionaryResponse(file);
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(sheetData);
  } catch (err) {
    res.status(500).json({ error: err.errors });
  }
}
