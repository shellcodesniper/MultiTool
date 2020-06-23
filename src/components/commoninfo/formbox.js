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
  Icon,
  Form,
  Select
} from "semantic-ui-react";

import ApiUtil from "utils/api"




class FormBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showInfo: false,
      value: props.value
    }
    this.toggleInfo = this.toggleInfo.bind(this);
    this.textHandler = this.textHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this)
    this.sendData = this.sendData.bind(this);
  }

  toggleInfo(e) {
    this.setState({
      showInfo: !this.state.showInfo
    })

    this.setState()
  }

  textHandler(e) {
    console.log(e.target)
  }

  selectHandler(e, result) {
    console.log(result.name, result.value)
    this.setState(
      { value: result.value }
    )
  }

  sendData(e) {
    this.props.handler(this.props.name, this.state.value)
  }

  render() {
    return(
      <div>
        <Header as='h4' attached block>
          <Grid>
            <Grid.Row>
              <Grid.Column width={1} />
              <Grid.Column width={14}>
                <Container textAlign='center'>{this.props.title}</Container>
              </Grid.Column>
              <Grid.Column width={1}>
                <Icon onClick={this.toggleInfo} name='help circle'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Header>
        { this.state.showInfo &&
          <Message attached content={this.props.helpText} icon='help circle' info />
        }
        <Segment attached>
          {this.props.inputType == "text" && 
          <Form>
            <Form.Field>
              <input name={this.props.name} value={this.state.value}  onChange={this.props.textHandler} />
            </Form.Field>
          </Form>
          }
          {this.props.inputType == "select" &&
            < Select name = {
              this.props.name
            }
            selection fluid value={this.state.value}
            placeholder = {
              this.props.placeHolder
            }
            options = {
              this.props.options
            }
            onChange = {
              this.selectHandler
            }
            />
          }
          <Button className="gab" size='huge' color='black' onClick={this.sendData}>설정 변경</Button>
        </Segment>
      </div>
    )
  }
}

export {FormBox}