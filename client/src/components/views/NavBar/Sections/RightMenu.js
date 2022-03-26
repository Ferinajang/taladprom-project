/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Menu, Badge, Form, Input, Button, Card, Col, Row, Steps } from "antd";
import { useDispatch } from 'react-redux'
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import Axios from 'axios';
import {getOrderList} from '../../../../_actions/user_actions'
import { FaMoneyBillWave } from 'react-icons/fa';
import { MdClear } from "react-icons/md";
import { ShoppingCartOutlined, EditOutlined ,UnorderedListOutlined} from '@ant-design/icons';


const {Meta} =Card;
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
  const [modalCoupon, setmodalCoupon] = useState(false)
  const [modalCouponRandom, setmodalCouponRandom] = useState(false)
  const [Coupon, setCoupon] = useState([])
  const [CouponRandom, setCouponRandom] = useState([])
  const [CouponLength, setCouponLength] = useState(0)
  const { TextArea } = Input;
  const dispatch = useDispatch();

  console.log("------------");
        console.log("random",CouponLength);
        console.log(CouponRandom);

  

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

/////////////////////////edit//////////////////////

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


  //////////////////////order/////////////////////////
  const orderList =()=>{
    setModalOrderIsOpenToTrue()
  }

  const setModalNoOrderIsOpenToFalse = () => {
    setmodalNoOrder(false);
  };
  const setModalNoOrderIsOpenToTrue = () => {
    setmodalNoOrder(true);
  };

  const setModalOrderIsOpenToFalse = () => {
    setModalOrderIsOpen(false);
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



     //////////////////////conpon/////////////////////////

  const couponList =()=>{
    Axios.post('/api/coupon/getCoupon')
    .then(response => {
        if(response.data.success){
            setCoupon(response.data.coupon)
            console.log("5555",response.data.coupon);
            setmodalCoupon(true)
        }else{
            alert("Fialed to fecth data from mongodb")
        }
    }
) }
 

  const renderCardsCoupon = Coupon.map((coupon, index) => {
    if (!user.userData) {
      //console.log("fffff");
    } else {
      if (coupon.OwnerID == user.userData._id) {
        return (
          <Col lg={12}>
            <a>
              <Card>
                <div style={{ display: "flex" }}>
                  {coupon.typeCoupon == "DiscountPercent" ? (
                    <img
                      width={150}
                      src={
                        "https://www.img.in.th/images/fd1e9e737f10d57e83de226ae2596cd7.png"
                      }
                    />
                  ) : coupon.typeCoupon == "DiscountMoney" ? (
                    <img
                      width={150}
                      src={
                        "https://www.img.in.th/images/a44a84ab639f73bbf1dd7c1a4a7bea44.png"
                      }
                    />
                  ) : (
                    <img
                      width={150}
                      src={
                        "https://www.img.in.th/images/77f1a34f63a45579a90d641902a26dfa.png"
                      }
                    />
                  )}
                  <div style={{ display: "block", marginLeft: "20px" }}>
                    <h1>{coupon.nameCoupon}</h1>
                    <a>ร้าน {coupon.shopName}</a>
                    <p>ส่วนลด {coupon.discount} บาท</p>
                  </div>
                  <div style={{ float: "right" }}>
                    <Button>รับคูปอง</Button>
                  </div>
                </div>
              </Card>
            </a>
          </Col>
        );
      }
    }
  });

  /////////////////random//////////////
  const randomCoupon = () => {
    Axios.post("/api/coupon/getCoupon").then((response) => {
      if (response.data.success) {
        let noOwnerCouponList = [];
        response.data.coupon.forEach((item) => {
          if (item.status == "no owner") {
            console.log(item);
            noOwnerCouponList.push(item);
          }
          // console.log(noOwnerCouponList);
        });

        setCouponLength(Math.floor(Math.random() * noOwnerCouponList.length));
        setCouponRandom(noOwnerCouponList[CouponLength]);
      } else {
        alert("Fialed to fecth data from mongodb");
      }
    });
    setmodalCouponRandom(true);
  };

  const gotCoupon=()=>{
    const variables ={
      id:CouponRandom._id,
      status:"have owner",
      OwnerName : user.userData.name,
      OwnerID:user.userData._id
  }
  Axios.put('/api/coupon/addOwnerCoupon',variables)
        .then(response =>{
            if(response.data.success){
                alert('คูปองได้จัดเก็บดข้าคลังของคุณแล้ว')
            }else{
                alert(response)
            }
        })
      }
    
    
  
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu  mode="horizontal">
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

      <Menu mode="horizontal">
        {/* <Menu.Item key="upload">
          <a href="/product/upload">upload</a>
        </Menu.Item> */}
        {/* <Menu.Item key="randon coupon">
          <a  onClick={randomCoupon}>random coupon</a>
        </Menu.Item> */}
        <Menu.Item key="cart" style={{paddingTop: '11px',marginRight:'-30px'}}>
          <Badge count={user.userData && user.userData.cart.length}>
            <a href="/user/cart" style={{ color: "#667777" }}>
              <ShoppingCartOutlined style={{ fontSize: '35px',textAlign:'center'}}/>
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="order" style={{paddingTop: '10px',marginRight:'-20px'}}>
          <Badge count={user.userData && user.userData.orderUser.length}>
            <a onClick={orderList}> 
            <UnorderedListOutlined style={{ fontSize: '26px',textAlign:'center'}}/>
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="coupon" style={{paddingTop: '10px',marginRight:'-10px'}}>
          <Badge>
            <a onClick={couponList}>
              <FaMoneyBillWave size="2em" />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="editProfile" style={{paddingTop: '11px',marginLeft:'-10px'}}>
          <a onClick={setModalIsOpenToTrue}>
          <EditOutlined style={{ fontSize: '30px',textAlign:'center'}}/>
          </a>
        </Menu.Item>
        <Menu.Item key="logout" style={{paddingTop: '11px',marginRight:'-40px'}}>
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
              <Row gutter={[30, 30]}>{renderCards}</Row>
            </div>
          </ul>
        </Modal>

        <Modal isOpen={modalNoOrder}>
          <button onClick={setModalNoOrderIsOpenToFalse}>x</button>
          <ul>
            <div>No Order</div>
          </ul>
        </Modal>

        <Modal className="modal-coupon-list" isOpen={modalCoupon}>
          <div class="scrollbar" id="style-15">
            <div class="force-overflow">
              <div
                style={{
                  height: "15px",
                  fontSize: "25px",
                  textAlign: "right",
                  margin: "10px",
                }}
                onClick={() => setmodalCoupon(false)}
              >
                <MdClear style={{ cursor: "pointer" }} />
              </div>
                <h1  style={{ alignItem:'center' }}>คูปองส่วนลดของคุณ</h1>
              <div style={{ margin: "50px", marginRight: "70px" }}>
                <ul>
                  <Row gutter={[12, 12]}>{renderCardsCoupon}</Row>
                </ul>
              </div>
            </div>
          </div>
        </Modal>

        <Modal className="modal-coupon-random" isOpen={modalCouponRandom}>
              <div
                style={{
                  height: "15px",
                  fontSize: "25px",
                  textAlign: "right",
                  margin: "10px",
                }}
                onClick={() => setmodalCouponRandom(false)}
              >
                <MdClear style={{ cursor: "pointer" }} />
              </div>
              <div style={{height:'50vh'}}>
              <div style={{textAlign: "center" }}>
                <h1>ยินดีด้วย!!</h1>
                <h2>คุณได้รับคูปองส่วนลด</h2>
              </div>
              <div style={{alignItems: "center" ,margin:'20px' ,marginLeft:'50px'}}>
              <Card  style={{width:'500px'}}>
              <div style={{ display: "flex" }}>
                {CouponRandom.typeCoupon == "DiscountPercent" ? (
                  <img
                    width={150}
                    src={
                      "https://www.img.in.th/images/fd1e9e737f10d57e83de226ae2596cd7.png"
                    }
                  />
                ) : CouponRandom.typeCoupon == "DiscountMoney" ? (
                  <img
                    width={150}
                    src={
                      "https://www.img.in.th/images/a44a84ab639f73bbf1dd7c1a4a7bea44.png"
                    }
                  />
                ) : (
                  <img
                    width={150}
                    src={
                      "https://www.img.in.th/images/77f1a34f63a45579a90d641902a26dfa.png"
                    }
                  />
                )}
                <div style={{ display: "block", marginLeft: "20px" }}>
                  <h1>{CouponRandom.nameCoupon}</h1>
                  <a>ร้าน {CouponRandom.shopName}</a>
                  <p>ส่วนลด {CouponRandom.discount} บาท</p>
                </div>
                <div style={{float:'right'}}>
              </div>
              </div>
            </Card>

              </div>
              <div style={{ textAlign:'center'}}>
              <Button onClick={gotCoupon}>รับคูปอง</Button>

              </div>
          
              </div>
              
        </Modal>
        </Menu>


    );
  }
}

export default withRouter(RightMenu);
