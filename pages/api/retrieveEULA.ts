import { getEULAFile} from '../../scripts/drive';

export const config = {
  runtime: 'nodejs'
}

export default async function handler(req, res) {
    await getEULAFile().then(file=>{
      res.setHeader('Content-Type', 'text/html')
      res.status(200).send({file:file.data});
    }).catch(err=>{
      res.status(500);
    })
}