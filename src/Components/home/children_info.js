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
  Segment,
  Dimmer,
  Loader,
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


class Content_Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
    this.setState({
      loading: true
    })
    ipcRenderer.on("response_main_info", function (event, data) {
      this.setState(data)
      this.setState({loading: false})
    }.bind(this))
  }

  render () {
    let order_desc = 
      <Statistic.Group widths='four' size="mini">
        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.waitPurchase > 0 ? 'blue' : 'black'
            } name='plane' /> {this.state.waitPurchase}
          </Statistic.Value>
          <Statistic.Label>결제대기</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.departtoday > 0 ? 'blue' : 'black'
            } name='shopping cart' /> {this.state.newPurchase}
          </Statistic.Value>
          <Statistic.Label>신규주문</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.departtoday > 0 ? 'blue' : 'black'
            } name='rocket' /> {this.state.departtoday}
          </Statistic.Value>
          <Statistic.Label>오늘출발</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.bookedOrder > 0 ? 'blue' : 'black'
            } name='bookmark' /> {this.state.bookedOrder}
          </Statistic.Value>
          <Statistic.Label>예약구매</Statistic.Label>
        </Statistic>
      </Statistic.Group>

    let delivery_desc =
      <Statistic.Group widths='three' size="mini">
        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.waitDelivery > 0 ? 'blue' : 'black'
            } name='wait' /> {this.state.waitDelivery}
          </Statistic.Value>
          <Statistic.Label>배송준비</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.onDelivery > 0 ? 'blue' : 'black'
            } name='spy' /> {this.state.onDelivery}
          </Statistic.Value>
          <Statistic.Label>배송중</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.finishDelivery > 0 ? 'blue' : 'black'
            } name='signing' /> {this.state.finishDelivery}
          </Statistic.Value>
          <Statistic.Label>배송완료</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    
    let claim_desc =
      <Statistic.Group widths='three' size="mini">
        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.requestCancle > 0 ? 'blue' : 'black'
            } name='cancel' /> {this.state.requestCancle}
          </Statistic.Value>
          <Statistic.Label>취소요청</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.requestReturn > 0 ? 'blue' : 'black'
            } name='reply' /> {this.state.requestReturn}
          </Statistic.Value>
          <Statistic.Label>반품요청</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.requestExchange > 0 ? 'blue' : 'black'
            } name='exchange' /> {this.state.requestExchange}
          </Statistic.Value>
          <Statistic.Label>교환요청</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    
    let calculate_desc = 
      <Statistic.Group widths='four' size="mini">
        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.waitPurchase > 0 ? 'blue' : 'black'
            } name='check' /> {this.state.waitPurchase}
          </Statistic.Value>
          <Statistic.Label>구매확정</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            < Icon name = 'calendar check'
            color = {
              this.state.newPurchase > 0 ? 'blue' : 'black'
            }
            /> {this.state.newPurchase}
          </Statistic.Value>
          <Statistic.Label>오늘정산</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.departtoday > 0 ? 'blue' : 'black'
            } name='calendar outline' /> {this.state.departtoday}
          </Statistic.Value>
          <Statistic.Label>정산예정</Statistic.Label>
        </Statistic>

        <Statistic size="mini">
          <Statistic.Value>
            <Icon color = {
              this.state.bookedOrder > 0 ? 'blue' : 'black'
            } name='money bill alternate' /> {this.state.bookedOrder}
          </Statistic.Value>
          <Statistic.Label>충전금</Statistic.Label>
        </Statistic>
      </Statistic.Group>

    return (
      <Container>
        <Segment>
          {this.state.loading &&
          <Dimmer active className="dimmerColoring">
            <Loader size='massive'>정보 받아오는 중</Loader>
          </Dimmer>
          }
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
        </Segment>
      </Container>
    )
  }

}
export {Content_Info}