import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// BrowserRouter 사용시에 패키징 후 빈화면만 나오는 이슈 확인하여 변경함
import Main from "components/main/main";
import Home from "components/home/home";
import Updater from "components/updater/updater.js";
import Product_Register from "components/product/register.js"
import CommonInfo from "components/commoninfo/commoninfo.js"

function NoMatch () {
  return (
    <div>
    MOMATCH
    </div>
  )
}
class Routes extends React.Component {
  componentDidUpdate () {
    console.log("UPDATE!!")
  }
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/home" component={Home} />
          <Route path="/commoninfo" component={CommonInfo} />

          <Route paht="/product/register" component={Product_Register} />
          <Route path="/update" component={Updater}/>

          <Route component={NoMatch} />
          
        </Switch>
      </Router>
    )
  }
}

export default Routes;