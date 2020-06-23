import React from 'react'
import {
  Container,
  Divider,
  Header,
  Icon,
  Table
} from "semantic-ui-react";
import {
  Redirect
} from "react-router-dom";
import Layout from 'components/Layout/Layout';

import {
  RegisterForm
} from "./register/registerform"

const {
  ipcRenderer
} = window;

class Product_Register extends React.Component {
  
  render() {
    return (
      <Layout currentName="product_register">
        <Container>
          <RegisterForm/>
        </Container>
      </Layout>
    )
  }
}

export default Product_Register