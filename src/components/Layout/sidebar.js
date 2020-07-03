import React from 'react'
import {
  Menu,
  Label,
  Input
} from "semantic-ui-react";

function Leftsidebar(props) {
  return (
    <Menu vertical>
      <Menu.Item
        name="home"
        active={props.activeItem === "home"}
        onClick={props.handleItemClick}
      >
        HOME
      </Menu.Item>
      <Menu.Item
        name="sms"
        active={props.activeItem === "sms"}
        onClick={props.handleItemClick}
      >
        SMS 전송관리
      </Menu.Item>

      <Menu.Item
        name="product_register"
        active={props.activeItem === "product_register"}
        onClick={props.handleItemClick}
      >
        상품등록
      </Menu.Item>

      <Menu.Item
        name="commoninfo"
        active={props.activeItem === "commoninfo"}
        onClick={props.handleItemClick}
      >
        공통정보 등록
      </Menu.Item>

      <Menu.Item
        name="updates"
        active={props.activeItem === "updates"}
        onClick={props.handleItemClick}
      >
        잔고현황
      </Menu.Item>
    </Menu>
  );
}

export {
  Leftsidebar
}