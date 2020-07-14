const fs = require('fs').promises;
const path = require('path');
const Api = require('../util/api.js');

const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require('electron')

ipcMain.on("request_send_sms", async (event, data) => {
  console.log(data);
  const requestData = { pn: data.pn, message: data.content };
  Api.post('/sms/send', requestData, function (err, httpResponse, body) {
    console.log(body);
  });
  event.sender.send("response_send_sms");
});