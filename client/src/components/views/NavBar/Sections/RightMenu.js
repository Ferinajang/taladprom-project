/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Menu, Icon, Badge, Form, Input, Button, Card, Col, Row, Steps, Avatar } from "antd";
import { useDispatch } from 'react-redux'
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import Axios from 'axios';
import { getOrderList } from '../../../../_actions/user_actions'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Step } = Steps;






function RightMenu(props) {
  const user = useSelector((state) => state.user);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ModalOrderIsOpen, setModalOrderIsOpen] = useState(false)
  const [Data, setData] = useState([]);
  const [order, setorder] = useState([]);
  const [changeName, setchangeName] = useState("")
  const [changePhoneNumber, setchangePhoneNumber] = useState("")
  const [changeAddress, setchangeAddress] = useState("")
  const [stateCheck, setstateCheck] = useState(true)
  const [modalNoOrder, setmodalNoOrder] = useState(false)
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
    let orderList = [];
    if (user.userData && user.userData.orderUser) {
      if (user.userData.orderUser.length > 0) {
        user.userData.orderUser.forEach(item => {
          orderList.push(item.id)
        });
        dispatch(getOrderList(orderList, user.userData.orderUser))
      }
    }
  }, [user.userData])

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
  const setModalOrderIsOpenToFalse = () => {
    setModalOrderIsOpen(false);
  };

  const setModalNoOrderIsOpenToFalse = () => {
    setmodalNoOrder(false);
  };
  const setModalNoOrderIsOpenToTrue = () => {
    setmodalNoOrder(true);
  };

  const setModalOrderIsOpenToTrue = () => {
    if (user.orderDetail !== undefined) {
      setorder(user.orderDetail)
    }
    
    console.log("fffgfg", user.userData.orderUser.length);
    if (user.userData.orderUser.length > 0) {
      setModalOrderIsOpen(true);
      console.log("order");
    } else {
      setmodalNoOrder(true);
    }
    // setorder(props.user.userData.orderUser)
  };
  // console.log(order)
  // var renderCards;
  // if (order.length !== 0) {
    const renderCards =
      order.map((order, index) => {
        return (
          <Col lg={1000} md={100} xs={100}>
            <a href={`/order/${order._id}`}>
              <Card>
                <div style={{ float: 'right', backgroundColor: (order.status === "Not Confirmed" ? 'red' : order.status === "pending" ? 'yellow' : order.status === "success" ? 'green' : 'black') }}>
                  <h1>{order.status}</h1>
                </div>
                <div style={{ display: 'flex' }}>
                  <img width={100} src={order.imagesPD1} />
                  <div style={{ display: 'block', marginLeft: '100px' }}>
                    <h1>{order.namePD}</h1>
                    <a>จำนวน {order.quantityPD} ชิ้น</a>
                    <p>ราคารวม {order.totalPrice} บาท</p>
                  </div>
                </div>
              </Card>
            </a>
          </Col>
        );
      });
  // }






  const editName = () => {
    setstateCheck(false)
  }

  const OnSubmitEdit = (data) => {
    const variables = {
      id: Data._id,
      name: changeName,
      phoneNumber: changePhoneNumber,
      address: changeAddress
    }
    Axios.put('/api/users/editProfile', variables)
      .then(response => {
        if (response.data.success) {
          alert('product success to upload')
        } else {
          alert(response)
        }
      })
  }


  const orderList = () => {
    setModalOrderIsOpenToTrue()
  }
  const goToUpload = () => {

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

        <Menu.Item key="order">
          <Badge count={user.userData && user.userData.orderUser.length}>
            <a onClick={orderList}>
              <Icon
                type="unordered-list"
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
                <Input
                  placeholder={Data.name}
                  onChange={onChangeName}
                  disabled={stateCheck}
                />
              </Form.Item>
              <Form.Item label="Phone Number">
                <Input
                  placeholder={Data.phoneNumber}
                  onChange={onChangePhoneNumber}
                  disabled={stateCheck}
                />
              </Form.Item>
              <Form.Item label="Address">
                <TextArea
                  rows={4}
                  placeholder={Data.address}
                  onChange={onChangeAddress}
                  disabled={stateCheck}
                />
              </Form.Item>
              <Form.Item label="Button">
                <Button style={{ float: "right" }} onClick={editName}>
                  edit
                </Button>
              </Form.Item>
              <Form.Item label="Button">
                <Button style={{ float: "right" }} onClick={OnSubmitEdit}>
                  summit
                </Button>
              </Form.Item>
            </Form>
          </ul>
        </Modal>

        <Modal isOpen={ModalOrderIsOpen}>
          <button onClick={setModalOrderIsOpenToFalse}>x</button>
          <ul>
            <div>
              <Row gutter={[30, 30]}>
                {renderCards}
              </Row>
            </div>
          </ul>
        </Modal>

        <Modal isOpen={modalNoOrder}>
          <button onClick={setModalNoOrderIsOpenToFalse}>x</button>
          <ul>
            <div>
              No Order
            </div>
          </ul>
        </Modal>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
