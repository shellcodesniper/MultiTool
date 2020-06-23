const fs = require('fs').promises;
const path = require('path');
const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require('electron')

var Crawler = null;


ipcMain.on('request_crawler_register', async (event, data) => {
  if(!Crawler) {
    Crawler = require("./storefarm");

    Crawler.start(event.sender);
  }
  
})

ipcMain.on("request_crawler_login", async (event, data) => {
  let username,password;
  username = data.username;
  password = data.password;

  await Crawler.Login(username,password)
});



ipcMain.on("request_main_info", async (event, data) => {
  await Crawler.GetmainInfo();
})



















// ! 공통 모듈
ipcMain.on('request_show_message_box', (event, data) => {
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
  ipcMain.send('response_show_message_box', response)
})