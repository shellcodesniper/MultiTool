import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import {
  Accordion,
  Statistic,
  Container,
  Card,
  Divider,
  Header,
  Icon,
  Item,
  Image,
  Responsive,
  Grid
} from "semantic-ui-react";

import ApiUtil from "utils/api"

import "stylesheets/home.css"

const {
  ipcRenderer
} = window;

class Infocard extends React.Component {
  render () {
    return (
      <Grid.Column>
        <Card fluid>
          <Card.Content header={this.props.header} />
          <Card.Content description={this.props.description} />
        </Card>
      </Grid.Column>
    )
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitPurchase: '', // 결제대기
      newPurchase: '', // 신규주문
      departtoday: '', // 오늘출발
      bookedOrder: '', // 예약구매

      waitDelivery: '', // 배송준비
      onDelivery: '', // 배송중
      finishDelivery: '', // 배송완료
      
      requestCancle: '', // 취소요청
      requestReturn: '', // 반품요청
      requestExchange: '', // 교환요청

      confirmPurchase: '', // 구매확정
      calculateToday: '', // 오늘정산
      calculateExpect: '', // 정산예정
      chargedMoney: '' // 충전금
    }
  }
  componentDidMount() {
    ipcRenderer.on("response_main_info", function (event, data) {
      this.setState(data)
    }.bind(this))
  }

  render () {
    let order_desc = 
      <Statistic.Group widths='four' size="mini">
        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='plane' /> {this.state.waitPurchase}
          </Statistic.Value>
          <Statistic.Label>결제대기</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='shopping cart' /> {this.state.newPurchase}
          </Statistic.Value>
          <Statistic.Label>신규주문</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='rocket' /> {this.state.departtoday}
          </Statistic.Value>
          <Statistic.Label>오늘출발</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='bookmark' /> {this.state.bookedOrder}
          </Statistic.Value>
          <Statistic.Label>예약구매</Statistic.Label>
        </Statistic>
      </Statistic.Group>

    let delivery_desc =
      <Statistic.Group widths='three' size="mini">
        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='wait' /> {this.state.waitDelivery}
          </Statistic.Value>
          <Statistic.Label>배송준비</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='spy' /> {this.state.onDelivery}
          </Statistic.Value>
          <Statistic.Label>배송중</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='signing' /> {this.state.finishDelivery}
          </Statistic.Value>
          <Statistic.Label>배송완료</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    
    let claim_desc =
      <Statistic.Group widths='three' size="mini">
        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='cancel' /> {this.state.requestCancle}
          </Statistic.Value>
          <Statistic.Label>취소요청</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='reply' /> {this.state.requestReturn}
          </Statistic.Value>
          <Statistic.Label>반품요청</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='exchange' /> {this.state.requestExchange}
          </Statistic.Value>
          <Statistic.Label>교환요청</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    
    let calculate_desc = 
      <Statistic.Group widths='four' size="mini">
        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='check' /> {this.state.waitPurchase}
          </Statistic.Value>
          <Statistic.Label>구매확정</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='calendar check' /> {this.state.newPurchase}
          </Statistic.Value>
          <Statistic.Label>오늘정산</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='calendar outline' /> {this.state.departtoday}
          </Statistic.Value>
          <Statistic.Label>정산예정</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon name='money bill alternate' /> {this.state.bookedOrder}
          </Statistic.Value>
          <Statistic.Label>충전금</Statistic.Label>
        </Statistic>
      </Statistic.Group>

    return (
      <Container>
        <Grid columns={2}>
          <Grid.Row>
              <Infocard header="주문현황" description={order_desc}/>
              <Infocard header="클레임" description={claim_desc}/>
          </Grid.Row>
          <Grid.Row>
              <Infocard header="배송현황" description={delivery_desc}/>
              <Infocard header="정산현황" description={calculate_desc}/>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}
export {Content}