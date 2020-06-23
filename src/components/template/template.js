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
    this.state = {};
  }

  render() { 
    return (
      <Layout currentName="template">
        <Container>
          <Content/>
        </Container>
      </Layout>
      )
  }
}


export default Home;