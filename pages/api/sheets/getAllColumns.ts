import { SHEET_NAMES } from '../../../scripts/constants';
import { parseSheetsResponse } from '../../../scripts/data-handling';
import { getSheetsData } from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {
  const query = req.query.tab === 'General' ? ['U//FOUO!A:AT', 'Pending cases!A:AT'] : [SHEET_NAMES[req.query.tab]+'!A:AT']; 
  const file:any = await getSheetsData("General", query);
  let sheetData = [];
  if(!!file) {
    file.data.valueRanges.forEach(sheet=>{
      sheetData = sheetData.concat(sheet.values);
    })
  }
  const fileJSON = parseSheetsResponse(sheetData);
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  res.status(200).json(fileJSON)
}