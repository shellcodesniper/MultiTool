const fs = require('fs').promises;
const path = require('path');
const {
  app,
  BrowserWindow,
  dialog,
  ipcMain
} = require('electron')

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
