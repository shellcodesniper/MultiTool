import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import {
  Container,
} from "semantic-ui-react";

import ApiUtil from "utils/api"

// import {Content_Info} from './children_info'

import {CommonForm} from './commonform'

import "stylesheets/home.css"

const {
  ipcRenderer
} = window;

class Content extends React.Component {
  componentDidMount() {
    ipcRenderer.send("request_main_info")
  }
  render () {
    return (
      <div>
        <CommonForm />
      </div>
    )
  }
}

export {Content}