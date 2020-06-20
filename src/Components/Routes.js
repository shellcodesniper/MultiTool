import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// BrowserRouter 사용시에 패키징 후 빈화면만 나오는 이슈 확인하여 변경함
import Main from "components/main/main";
import Home from "components/home/home";
import Updater from "components/updater/updater.js";
import Product_Register from "components/product/register.js"


export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/home" component={Home} />
      <Route paht="/product_register" component={Product_Register} />
      <Route exact path='/' render={({ location }) => <Redirect to={location.hash.replace('#', '')} />} />
    </Switch>
  </Router>
);