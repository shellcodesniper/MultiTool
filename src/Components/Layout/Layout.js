import React from 'react'
import {
  Container, Divider
} from "semantic-ui-react";
import "stylesheets/global.css"
import SplitPane, { Pane } from "react-split-pane";
import {Leftsidebar} from "./sidebar.js";
import {
  Redirect
} from "react-router-dom";


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.currentName,
      redirect: ''
    };
    console.log("CURRENT : ", this.state.activeItem)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.state.activeItem !== prevState.activeItem && this.state.activeItem !== this.props.currentName) {
      var redirectUrl = '../' + this.state.activeItem
      console.log(redirectUrl)

      this.setState({
        redirect: redirectUrl
      })
    }
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {
    if(this.state.redirect) return <Redirect to={this.state.redirect} />
    return (
      <div>
        <SplitPane split="vertical" className="makeScrollable" minSize={100} defaultSize={212}>
          <div className="dividerLeft">
            <Leftsidebar
              activeItem={this.state.activeItem}
              handleItemClick={this.handleItemClick}
            />
          </div>
          <div className="dividerRight">
            {this.props.children}
          </div>
        </SplitPane>
      </div>
    )
  }
}

export default Layout;