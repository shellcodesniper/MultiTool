import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// BrowserRouter 사용시에 패키징 후 빈화면만 나오는 이슈 확인하여 변경함
import Main from "components/main/main";
import Updater from "components/updater/updater.js";
import Home from "components/home/home.js";
import SMS from "components/sms/sms.js"
import UserManager from "components/user/user.js";

function NoMatch () {
  return (
    <div>
    <Redirect to='/'/>
    </div>
  )
}


class DebugRouter extends Router {
  constructor(props) {
    super(props);
    console.log('initial history is: ', JSON.stringify(this.history, null, 2))
    this.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      )
      console.log(`The last navigation action was ${action}`, JSON.stringify(this.history, null, 2));
    });
  }
}

export default function Routes () {
  return (
    <DebugRouter>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/update">
          <Updater />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/sms">
          <SMS />
        </Route>
        <Route path='/user'>
          <UserManager />
        </Route>
        <Route>
          <NoMatch />
        </Route>

        
      </Switch>
    </DebugRouter>
  )
};