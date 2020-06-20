import React from 'react'
import {
  Container,
  Divider,
  Header,
  Icon,
  Table
} from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import Layout from 'components/Layout/Layout';

import { Content } from "./children"

const { ipcRenderer } = window;

class Home extends React.Component {
  constructor(props) {
    super(props);

    ipcRenderer.send("request_main_info")
  }

  render() { 
    return (
      <Layout currentName="home">
        <Container>
          <Content/>
        </Container>
      </Layout>
      )
  }
}


export default Home;