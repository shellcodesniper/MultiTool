import React from 'react';
import {
  Button,
  Grid,
  Segment,
  Icon,
  Form
} from "semantic-ui-react";
import {
  Redirect
} from "react-router-dom";
import Layout from 'components/Layout/Layout';

import "stylesheets/main.css";


const {
  ipcRenderer
} = window;


class SMS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUrl: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const pn = event.target.pn.value;
    const content = event.target.content.value;

    const data = { pn, content};
    ipcRenderer.send('');
  }

  render() {
    if(this.state.redirectUrl !== ""){
      console.log("redirect to ", this.state.redirectUrl)
      return (<Redirect to={this.state.redirectUrl}/>)
    }
    return (
      <Layout currentName="sms">
        <Segment inverted>
          <Form onSubmit={this.handleSubmit} inverted>
            <Form.Input fluid name='pn' label='메세지 전송할 번호' placeholder='010~~~~~~~~' />
            <Form.TextArea fluid name='content' label='메세지 내용' placeholder='메세지 전송용내용' />
            <Form.Checkbox label='메세지 내용이 정확한가요?' />
            <Button type='submit' color='facebook'>메세지 전송</Button>
          </Form>
        </Segment>
      </Layout>
    )
  }
}

export default SMS;