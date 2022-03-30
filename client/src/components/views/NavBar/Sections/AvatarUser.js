/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Menu, Badge, Form, Input, Button, Card, Col, Row, Steps,Avatar } from "antd";
import { useDispatch } from 'react-redux'
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import Axios from 'axios';
import {getOrderList} from '../../../../_actions/user_actions'
import { FaMoneyBillWave } from 'react-icons/fa';
import { RiPencilLine, RiCoupon3Fill } from "react-icons/ri";
import { MdClear } from "react-icons/md";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ShoppingCartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  UnorderedListOutlined,
  LogoutOutlined,UserOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;


const {Meta} =Card;
const { Step } = Steps;

function AvatarUser(props) {
  const user = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ModalOrderIsOpen, setModalOrderIsOpen] = useState(false)
  const [Data, setData] = useState([]);
  const { TextArea } = Input;
  const dispatch = useDispatch();

 
  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  useEffect(() => {
  setData(user.userData)
}, [user.userData])



/////////////////////////edit//////////////////////

  if (user.userData && !user.userData.isAuth) {
    return (

      <div style={{backgroundColor:'red' }}>
          <Avatar size={50} icon={<UserOutlined />} />
          <div> 
            <h2>{user.userData.name}</h2>
          </div>
      </div>
     
      // <Menu  mode="horizontal">
      //   <Menu.Item key="mail">
      //     <a href="/login">Signin</a>
      //   </Menu.Item>
      //   <Menu.Item key="app">
      //     <a href="/register">Signup</a>
      //   </Menu.Item>
      // </Menu>
    );
  } else {
    return (
      <div style={{display:'flex'}}>
      <Avatar size={50} icon={<UserOutlined />} />
      </div>
 

    );
  }
}
export default withRouter(AvatarUser);
