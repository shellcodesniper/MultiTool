import React from 'react';
import 'stylesheets/App.css';
import Routes from "./Routes"
import 'semantic-ui-css/semantic.min.css'

const {
  ipcRenderer
} = window;

class App extends React.Component {
  constructor(props) {
    super(props);

    ipcRenderer.send("request_crawler_register");
  }
  render() {
    // 로그인 여부 확인 후 Home / Login 페이지로 넘겨주기
    return (
      <div className="App">
        <Routes />
      </div>
    );
    
  }

}


export default App;
