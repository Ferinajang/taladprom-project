/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Menu, Badge, Form, Input, Button, Card, Col, Row, Steps,Avatar,Image } from "antd";
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
  LogoutOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import Loading from "../../../Loading";


const { SubMenu } = Menu;


const {Meta} =Card;
const { Step } = Steps;

function AvatarUser(props) {
  const user = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ModalOrderIsOpen, setModalOrderIsOpen] = useState(false)
  const [Data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  const { TextArea } = Input;
  const [current, setcurrent] = useState("")
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

const loadingData = () => {
  if (!user.userData) {
    
  } else {
    setData(user.userData)
    setloading(false) 
  }
};

const handleClick = (e) => {
  setcurrent( e.key)
};



/////////////////////////edit//////////////////////

  if (user.userData && !user.userData.isAuth) {
    return (
      <div style={{backgroundColor:'red' }}>
          <Avatar size={50} icon={<UserOutlined />} />
          <div> 
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
    if (loading) {
      return (
        <div>
         {loadingData()}
        </div>
      );
    } else {
    return (
      <div style={{ display: "flex", width: "100%" }}>
        <h3 style={{ marginTop: "10px" }}>
          คุณ {user.userData.name} {user.userData.lastname}
        </h3>
        <Avatar
          style={{ marginLeft: "30px" }}
          size={45}
          src={
            <Image
              src="https://joeschmoe.io/api/v1/random"
              style={{ width: 40 }}
            />
          }
        />
         <Menu onClick={()=>handleClick()} selectedKeys={[current]} mode="horizontal">
        <SubMenu key="SubMenu" icon={<SettingOutlined style={{fontSize:'20px',marginTop:'10px'}}/>} >
          <Menu.ItemGroup title="สำหรับผู้ขาย">
            <Menu.Item key="setting:1">ร้านค้าของคุณ</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="ตั้งค่า">
            <Menu.Item key="setting:3">รายละเอียดส่วนตัว</Menu.Item>
            <Menu.Item key="setting:4">ออกจากระบบ</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>

      </Menu>
      </div>
    );
  }
}
}
export default withRouter(AvatarUser);