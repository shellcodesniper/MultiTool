import React from 'react';
import {
  Button,
  Grid,
  Segment,
  Icon,
  Form,
  Input
} from "semantic-ui-react";
import {
  Redirect
} from "react-router-dom";
import Layout from 'components/Layout/Layout';

import "stylesheets/main.css";


const {
  ipcRenderer
} = window;


class UserManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUrl: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.realname.value;
    const email = event.target.email.value;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const isBot = event.target.isBot.checked;

    const data = { name, email, username, password, isBot};
    console.log(data);
    ipcRenderer.send('request_user_register', data);
  }

  render() {
    if(this.state.redirectUrl !== ""){
      console.log("redirect to ", this.state.redirectUrl)
      return (<Redirect to={this.state.redirectUrl}/>)
    }
    return (
      <Layout currentName="user">
        <Segment inverted>
          <Form onSubmit={this.handleSubmit} inverted>
            <Form.Input fluid name='realname' label='이름' placeholder='관리자' />
            <Form.Field fluid type='email' name='email' label='이메일' placeholder='admin@kuuwang.com' control={Input} />
            <Form.Input fluid name='username' label='아이디' placeholder='username' />
            <Form.Input fluid name='password' label='비밀번호' placeholder='password' />
            <Form.Checkbox name='isBot' label='봇?' />
            <Button type='submit' inverted color='facebook'>메세지 전송</Button>
          </Form>
        </Segment>
      </Layout>
    )
  }
}

export default UserManager;