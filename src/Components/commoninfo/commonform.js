import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import {
  Container,
  Header,
  Segment,
  Message,
  Button,
  Grid,
  Icon
} from "semantic-ui-react";

import ProductUtil from "utils/product"

import "stylesheets/home.css"

import {FormBox} from "./formbox"

class CommonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProductUtil.getProdutStructure().common;
    this.handler = this.handler.bind(this)
  }

  handler(target,value) {
    console.log(target,value)
  }

  render() {
    let product_state_options = [
      {key: '신상품', name: 'product_status', value:'신상품', text: '신상품'},
      {key: '중고상품', name: 'product_status', value:'중고상품', text: '중고상품'}
    ]
    return (
      <Container>
        < FormBox name = 'product_status'
        title = "상품상태"
        helpText = "신상품/중고상품 으로 입력 하시면 됩니다."
        handler={this.handler}
        inputType = "select"
        placeHolder = "상품 상태를 골라주세요."
        options={product_state_options}
        value={this.state.product_state}
        />
        < FormBox name = 'product_categoryId'
        title = "카테고리"
        helpText = "카테고리 코드를 입력해주세요"
        handler={this.handler}
        inputType = "select"
        placeHolder = "상품 상태를 골라주세요."
        options={product_state_options}
        value={this.state.product_state}
        />
      </Container>
    )
  }
}

export {
  CommonForm
}