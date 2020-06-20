import React from 'react'
import {
  Container,
  Divider,
  Form,
  Icon,
  Input,
  Segment
} from "semantic-ui-react";
import {
  Redirect
} from "react-router-dom";
import Layout from 'components/Layout/Layout';

import {
  DragAndDrop
} from './dragndrop'


const {
  ipcRenderer
} = window;


class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: []
    }
  }
  handleDrop = (files) => {
    let fileList = this.state.files
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return
      fileList.push(files[i].name)
    }
    this.setState({files: fileList})
  }

  render(){
    return(
      <Container>
        <Form>
          <Segment.Group>
            <Segment>상품 등록</Segment>

            <Segment.Group>
              <Segment>
                <Form.Field>
                  <label>상품명</label>
                  <input placeholder='First Name' />
                </Form.Field>
              </Segment>
            </Segment.Group>

            <Segment.Group>
              <Segment>대표 이미지</Segment>

              <Segment>
                <DragAndDrop handleDrop={this.handleDrop}>
                  <div style={{height: 300, width: 250}}>
                    {this.state.files.map((file) =>
                      <div key={file.index}>{file}</div>
                    )}
                  </div>
                </DragAndDrop>
              </Segment>
            </Segment.Group>

            <Segment.Group>
              <Segment>삳세 이미지</Segment>

              <Segment>
                <DragAndDrop handleDrop={this.handleDrop}>
                  <div style={{height: 300, width: 250}}>
                    {this.state.files.map((file) =>
                      <div key={file.index}>{file}</div>
                    )}
                  </div>
                </DragAndDrop>
              </Segment>
            </Segment.Group>
            

            <Segment.Group>
              <Segment>상세설명 이미지</Segment>

              <Segment>
                <DragAndDrop handleDrop={this.handleDrop}>
                  <div style={{height: 300, width: 250}}>
                    {this.state.files.map((file) =>
                      <div key={file.index}>{file}</div>
                    )}
                  </div>
                </DragAndDrop>
              </Segment>
            </Segment.Group>
            
          </Segment.Group>
        </Form>
      </Container>
    )
  }
}

export {RegisterForm};