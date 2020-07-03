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
  Api.post('/user/', data, function(err, httpResponse, body) {
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

ipcMain.on("request_user_register", async (event, data) => {
  const {name, email, username, password, isBot} = data;
  console.log(data);
  Api.post('/user/register', {name, email, username, password, isBot}, function (err, httpResponse, body) {
    let options = {};
    if (body.status === 200) {
      options = {
        type: "question",
        buttons: ["확인"],
        title: "완료",
        message: "회원 등록 완료",
        detail: body.msg,
      };  
    } else {
      options = {
        type: "question",
        buttons: ["확인"],
        title: "에러!",
        message: "회원등록중 에러",
        detail: body.msg
      }
    }
    event.sender.send('response_user_register', {
      status: body.status,
    })
    openAlert(options);
  })
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