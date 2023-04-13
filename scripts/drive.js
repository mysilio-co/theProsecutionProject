const { google } = require('googleapis');
const {GoogleAuth} = require('google-auth-library');

export async function getEULAFile() {
  const SCOPES = ['https://www.googleapis.com/auth/drive'];
  const creds = {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY
  };
  const auth = new GoogleAuth({
      credentials: creds,
      scopes: SCOPES,
  });
  const drive = google.drive({version: 'v3', auth});
  
  let ret = null;
  await drive.files.export({
    fileId: "1D8hS897rwMZ_tNwRxiMEbt2FG44UZi31HliqGJcH22A",
    mimeType: 'text/html'
  }).then(result=>{
    ret = result;
  }).catch(err=>{
    ret = err;
  })
  return ret;
}
