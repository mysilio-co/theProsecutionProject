import { SHEET_NAMES } from '../../../scripts/constants';
import { generateSheetsDateQuery, getSingleSheetData } from '../../../scripts/sheets';

export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {
    const sheet = req.query.sheet;
    const yearParam = req.query.year;
    const yearRegex = new RegExp('^(19|20)[0-9][0-9]');

    if(!(SHEET_NAMES.includes(req.query.sheet))) {
      res.status(500).send({ error: 'sheet param is missing or invalid, must be one of: ' + SHEET_NAMES })
    }
    else if(!yearParam || !yearRegex.test(yearParam)) {
      res.status(500).send({ error: 'year param is missing or invalid, must be a 4 digit year beginning with 19 or 20'})
    }
    else {
      const file:any = await getSingleSheetData(generateSheetsDateQuery(sheet));
      let sheetData:any = file.data.values.slice(1,);
      let yearFound = false;
      let index = 0;
      while(index<sheetData.length && !yearFound) {
        let yearData = sheetData[index][0].substring(sheetData[index][0].length-4);
        if(yearData>=yearParam) {
          // adding 2 because the first row is skipped in this loop (variable name row)
          // and index is base 0 while sheets is base 1
          res.status(200).json({'index': index+2});
          yearFound = true;
        }
        index++;
      };
      if(!yearFound) {
        res.status(200).json({'index': -1});
      }
    }
}