import React from 'react';
import {
  Button,
  Grid,
  Segment,
  Icon
} from "semantic-ui-react";
import {
  Redirect
} from "react-router-dom";
import "stylesheets/main.css";
import Layout from 'components/Layout/Layout';


const {
  ipcRenderer
} = window;


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUrl: '',
    }
  }

  render() {
    if(this.state.redirectUrl !== ""){
      console.log("redirect to ", this.state.redirectUrl)
      return (<Redirect to={this.state.redirectUrl}/>)
    }
    return (
      <Layout currentName="home">
        <Segment inverted>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Button onClick={() => {this.setState({redirectUrl: '/sms'})}} size='massive' color='red'>
                  SMS 전송 관리
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button onClick={() => {this.setState({redirectUrl: '/'})}} size='massive' color='orange'>
                  텔레그램 봇 관리
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Layout>
    )
  }
}

export default Home;