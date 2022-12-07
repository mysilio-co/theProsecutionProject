'use strict';

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const {GoogleAuth} = require('google-auth-library');

module.exports = {
//   listFiles: async function (authToken, query) {
//     const drive = google.drive({version: 'v3', authToken});
//     const files = await drive.files.list({
//       q: "name contains '" + query + "' and mimeType != 'application/vnd.google-apps.folder' and trashed = false",
//       supportsAllDrives: 'true',
//       includeItemsFromAllDrives: 'true',
//       corpora: 'allDrives',
//       fields: 'nextPageToken, files(id, name, webContentLink)',
//     });
//     files.data.files.sort((a, b) => a.name.localeCompare(b.name));
//     return files.data.files;
//   },
//   getFolderContents: async function (authToken, query) {
//     const parentFolderId = await getFolderId(authToken, query);
//     const folderList = await getSubFolders(authToken, parentFolderId);
//     folderList.unshift(parentFolderId);
    
//     let files = [];
//     const drive = google.drive({version: 'v3', authToken});
//     for(const folder of folderList) {
//       let res = await drive.files.list({
//         q: "parents in '" + folder + "' and mimeType != 'application/vnd.google-apps.folder' and trashed = false",
//         supportsAllDrives: 'true',
//         includeItemsFromAllDrives: 'true',
//         corpora: 'allDrives',
//         fields: 'nextPageToken, files(id, name, webContentLink)',
//       });
//       files = files.concat(res.data.files);
//     }
//     files.sort((a, b) => a.name.localeCompare(b.name));
//     // console.log(files);
//     return files;
//   }
// }

// async function getFolderId(authToken, query) {
//   const drive = google.drive({version: 'v3', authToken});
//   const folder = await drive.files.list({
//     q: "name = '" + query + "' and trashed = false",
//     supportsAllDrives: 'true',
//     includeItemsFromAllDrives: 'true',
//     corpora: 'allDrives',
//     pageSize: 1,
//     fields: 'files(id)',
//   });
//   return folder.data.files[0].id
// }

// async function getSubFolders(authToken, folderId) {
//   const drive = google.drive({version: 'v3', authToken});
//   const folders = await drive.files.list({
//     q: "parents in '" + folderId + "' and mimeType = 'application/vnd.google-apps.folder' and trashed = false",
//     supportsAllDrives: 'true',
//     includeItemsFromAllDrives: 'true',
//     corpora: 'allDrives',
//     fields: 'files(id)',
//   });

//   return folders.data.files.map(folder => folder.id);
}