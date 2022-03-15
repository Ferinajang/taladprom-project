/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Menu, Icon, Badge, Form, Input, Button } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import Axios from 'axios';


function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Data, setData] = useState([]);
  const [changeName, setchangeName] = useState("")
  const [changePhoneNumber, setchangePhoneNumber] = useState("")
  const [changeAddress, setchangeAddress] = useState("")
  const [stateCheck, setstateCheck] = useState(true)
  

  console.log(user.userData);
  console.log("ff",changeName);
  console.log("ff",changeAddress)
  console.log("ff",changePhoneNumber);

  const { TextArea } = Input;

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  const onChangeName = (event) => {
    setchangeName(event.currentTarget.value)
    console.log(changeName);
  };
  const onChangeAddress = (event) => {
    setchangeAddress(event.currentTarget.value)
    console.log(changeAddress);
  };

  const onChangePhoneNumber = (event) => {
    setchangePhoneNumber(event.currentTarget.value)
    console.log(changePhoneNumber);
  };


  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
    setData(user.userData);
    setchangeName(user.userData.name)
    setchangeAddress(user.userData.address)
    setchangePhoneNumber(user.userData.phoneNumber)
    
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const editName =()=>{
    setstateCheck(false)
  }

  const OnSubmitEdit =(data)=>{
    const variables ={
      id:Data._id,
      name:changeName,
      phoneNumber:changePhoneNumber,
      address : changeAddress
  }
  Axios.put('/api/users/editProfile',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
    
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/product/upload">upload</a>
        </Menu.Item>

        <Menu.Item key="cart">
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ marginRight: -22, color: "#667777" }}>
              <Icon
                type="shopping-cart"
                style={{ fontSize: 30, marginBottom: 4 }}
              ></Icon>
            </a>
          </Badge>
        </Menu.Item>

        <Menu.Item key="editProfile">
          <a onClick={setModalIsOpenToTrue}>
            <Icon type="edit" style={{ fontSize: 30 }}></Icon>
          </a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
        <Modal isOpen={modalIsOpen}>
          <button onClick={setModalIsOpenToFalse}>x</button>
          <ul>
            <h1>{Data.name}</h1>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
            >
              <Form.Item label="Name">
                <Input placeholder={Data.name} onChange={onChangeName} disabled={stateCheck}/>
              </Form.Item>
              <Form.Item label="Phone Number">
                <Input placeholder={Data.phoneNumber} onChange={onChangePhoneNumber} disabled={stateCheck}/>
              </Form.Item>
              <Form.Item label="Address">
                <TextArea rows={4} placeholder={Data.address} onChange={onChangeAddress} disabled={stateCheck}/>
              </Form.Item>
              <Form.Item label="Button">
              <Button style={{float:'right'}} onClick={editName}>edit</Button>
              </Form.Item>
              <Form.Item label="Button">
              <Button style={{float:'right'}} onClick={OnSubmitEdit}>summit</Button>
              </Form.Item>
            </Form>
            
          </ul>
        </Modal>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
