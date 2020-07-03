const fs = require('fs').promises;
const path = require('path');
const Api = require('../util/api.js');

const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require('electron')

ipcMain.on("request_user_login", async (event, data) => {
  const {username, password} = data
  Api.post('/user/', { username, password }, function(err, httpResponse, body) {
    if (body.status === 200) {

      Api.setToken(body.token);
    } else {
      const options = {
        type: "question",
        buttons: ["확인"],
        title: "에러!",
        message: "로그인중 문제가 발생하였습니다.",
        detail: body.msg,
      };
      openAlert(options);
    }

    event.sender.send('response_user_login', {
      status: body.status,
    });    
  })

  console.log(data);
})

function openAlert(data) {
  const options = {
    type: "question",
    buttons: ["Cancel", "Yes, please", "No, thanks"],
    defaultId: 2,
    title: "Question",
    message: "Do you want to do this?",
    detail: "It does not really matter",
    checkboxLabel: "Remember my answer",
    checkboxChecked: true,
  };
  // Template

  let response = dialog.showMessageBox(null, data);
}