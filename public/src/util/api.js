const request = require('request');
const Store = require('electron-store');

const baseurl = 'https://multitool.kuuwang.com';
const store = new Store();

module.exports = {
  post: (url, data, callback) => {
    const options = {
      uri: `${baseurl}${url}`,
      method: 'POST',
      headers: {
        'token': store.get('token'),
      },
      body: data,
      json: true,
    };
    request.post(options, callback);
  },
  getToken: () => store.get('token'),
  setToken: (token) => store.set('token', token),
};