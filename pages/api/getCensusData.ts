// import http
import { CENSUS_POP_ENDPOINT, CENSUS_KEY } from '../../scripts/resources';

export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  const endpoint =
    CENSUS_POP_ENDPOINT +
    '?get=POP_2021,NAME&for=state:*&key=' +
    Buffer.from(CENSUS_KEY, 'base64');
  await fetch(endpoint)
    .then(response => response.json())
    .then(json => {
      json.shift();
      const resObject = {};
      json.map(x => (resObject[x[1]] = x[0]));
      res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
      res.status(200).send(resObject);
    })
    .catch(err => {
      res.status(500);
    });
}
