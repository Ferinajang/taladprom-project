import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import Modal from 'react-modal';
import React, { useEffect, useState } from "react";
import { Icon, Badge, Form, Input, Button, Card, Col, Row, Steps, Avatar } from "antd";
import { useDispatch } from 'react-redux'
import axios from "axios";
import { USER_SERVER } from "../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from 'axios';
import { getOrderList } from '../../../_actions/user_actions'
import { FaList, FaRegHeart, FaClipboardList } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiShoppingCart } from "react-icons/fi";
import { RiPencilLine, RiCoupon3Fill } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdClear } from "react-icons/md";
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./SideMenu.css";
import "./Header.css"

//font
//cart
import {
    getCartItem,
    removeCartItem,
    addOrderToUser
} from '../../../_actions/user_actions'
import UsercardBlock from './Section/UsercardBlock';
import { Result, Empty } from 'antd'
import moment from "moment";
import { storage } from "../../firebaseConfig"


// import {useFonts,Prompt_100Thin,Prompt_400Regular,} from '@expo-google-fonts/prompt';
const { Meta } = Card;
const { Step } = Steps;

const Header = (props) => {
    const [modalCart, setModalCart] = useState(false);
    const [modalOrder, setModalOrder] = useState(false);
    const [order, setorder] = useState([]);
    const [modalNoOrder, setmodalNoOrder] = useState(false)
    const [modalCoupon, setModalCoupon] = useState(false);
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)
    const user = useSelector((state) => state.user);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ModalOrderIsOpen, setModalOrderIsOpen] = useState(false)
    const [Data, setData] = useState([]);
    const [modalOrdering, setModalOrdering] = useState(false);

    const [changeName, setchangeName] = useState("")
    const [changePhoneNumber, setchangePhoneNumber] = useState("")
    const [changeAddress, setchangeAddress] = useState("")
    const [stateCheck, setstateCheck] = useState(true)

    const { TextArea } = Input;

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    const dispatch = useDispatch();

    //cart
    const [Total, setTotal] = useState(0)
    const [showSuccess, setshowSuccess] = useState(false)
    const [showTotal, setshowTotal] = useState(false)
    const [modalCartIsOpen, setModalCartIsOpen] = useState(false);
    const [modalCheckPaymentIsOpen, setmodalCheckPaymentIsOpen] = useState(false)
    const [productData, setproductData] = useState([])
    const [statusOrder, setstatusOrder] = useState("Not Confirmed")
    const [Date, setDate] = useState("")
    const [ImagePayment, setImagePayment] = useState("")
    const [Image, setImage] = useState("")
    const [progress, setProgress] = useState(0)



    useEffect(() => {
        // window.location = window.location
        let orderList = [];
        if (user.userData && user.userData.orderUser) {
            if (user.userData.orderUser.length > 0) {
                user.userData.orderUser.forEach(item => {
                    orderList.push(item.id)
                });
                dispatch(getOrderList(orderList, user.userData.orderUser))
            }
        }

        let cartItem = [];
        if (user.userData && user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItem.push(item.id)
                });
                dispatch(getCartItem(cartItem,user.userData.cart))
            }
        }
        setDate(moment().format("DD-MM-YYYY hh:mm:ss"))

    }, [user.userData])

    ///edit/////

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
        setModalOrdering(true);

    };

    const setModalIsOpenToFalse = () => {
        setModalIsOpen(false);
    };

    /////order///
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
    const renderCards = order.map((order, index) => {
        console.log("eiei");
        return (

            <Col >
                <a href={`/order/${order._id}`}>
                    <Card>
                        <div style={{ float: 'right', backgroundColor: (order.status === "Not Confirmed" ? 'red' : order.status === "pending" ? 'yellow' : order.status === "success" ? 'green' : 'black') }}>
                            <h1>{order.status}</h1>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <img width={100} height={100} src={order.imagesPD1} />
                            <div style={{ display: 'block', marginLeft: '100px' }}>
                                <h1 style={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>{order.namePD}</h1>
                                <a style={{ fontFamily: 'Prompt', fontWeight: 'thin' }}>จำนวน {order.quantityPD} ชิ้น</a>
                                <p>ราคารวม {order.totalPrice} บาท</p>
                            </div>
                        </div>
                    </Card>
                </a>
            </Col>
        );
    });
    // }

    //cart//
    const RemoveFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(() => {
                Axios.get('/api/users/userCartInfo')
                    .then(response => {
                        if (response.data.success) {
                            alert("success")
                        } else {
                            alert('fail to get cart info')
                        }
                    })
            })
    }

    const createOrder = () => {

        const variables = {
            customerName: user.userData.name,
            customerID: user.userData._id,
            shopID: productData.shopID,
            shopName: user.userData.shopName,
            namePD: productData.namePD,
            pricePD: productData.pricePD,
            quantityPD: productData.quantity,
            shippingCostPD: productData.shippingCostPD,
            imagesPayment: ImagePayment,
            dateOrder: Date,
            totalPrice: Total,
            status: statusOrder,
            imagesPD1: productData.imagesPD1
        }

        Axios.post('/api/order/createOrder', variables)
            .then(response => {
                if (response.data.success) {
                    console.log("ffgfG", response.data.order);
                    setImagePayment("")
                    dispatch(addOrderToUser(response.data.order))

                } else {
                    alert('failed to upload')
                }
            })


    }

    const CreateOrderModal = (productId) => {
        console.log("fff", productId);
        setModalIsOpenToTrue();
        setproductData(productId)
        let total = 0;
        total = (productId.pricePD * productId.quantity) + productId.shippingCostPD
        setTotal(total)
        console.log(Total);
        setTotal(total)
    }

    //cart
    const setModalCartIsOpenToTrue = () => {
        setModalCartIsOpen(true);
    };

    const setModalCheckPpaymentIsOpenToTrue = () => {
        setmodalCheckPaymentIsOpen(true);
    };

    const setModalCheckPpaymentIsOpenTofalse = () => {
        setmodalCheckPaymentIsOpen(false);
    };

    const setModalCartIsOpenToFalse = () => {
        setModalCartIsOpen(false);
    };

    const onDropImagePayment = (event) => {
        console.log(event.currentTarget.files[0]);
        if (event.currentTarget.files[0]) {
            setImage(event.currentTarget.files[0]);
        }
    };
    const checkImagePayment = () => {
        console.log("fff");
        setmodalCheckPaymentIsOpen(true);
    };

    const handleUploadImage = () => {
        console.log("data imagetest:" + Image);
        const uploadTask = storage.ref(`images/${Image.name}`).put(Image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                console.log("fern4");
                storage
                    .ref("images")
                    .child(Image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setImagePayment(url);
                    });
                console.log(ImagePayment);
            }
        );
    };





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
    return (
        
            <div id="header">
                
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            {/* small and big change using menucollapse state */}
                            <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle style={{ color: "#FFC269", marginTop: '6px', marginRight: '22px' }} />
                            ) : (
                                <FiArrowLeftCircle style={{ color: "#FFC269", marginTop: '6px', marginRight: '100px' }} />
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent style={{ marginTop: '50px' }}>
                        <Menu iconShape="square">
                            <MenuItem active={false} icon={<ImSearch />} onClick={() => window.location.href = "/taladprom-shop"}>
                                SEARCH
                            </MenuItem>
                            <MenuItem active={false} icon={<FiShoppingCart />} onClick={() => setModalCart(true)}>CART</MenuItem>
                            <MenuItem active={false} icon={<FaClipboardList />} onClick={orderList}>MY ORDER</MenuItem>
                            <MenuItem active={false} icon={<RiCoupon3Fill />} onClick={() => setModalCoupon(true)}>COUPON</MenuItem>
                            <MenuItem active={false} icon={<FiHome />} onClick={() => window.location.href = "/"}>HOME</MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem active={false} icon={<FiLogOut />}>LOG OUT</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>

                <Modal className="modal-ModalCart"
                    isOpen={modalCart}

                    contentLabel="cart"
                >
                    <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setModalCart(false)}>
                        <MdClear style={{ cursor: 'pointer' }} /></div>
                    <p style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold' }}>รถเข็นของฉัน</p>
                    <div style={{ width: "85%", margin: "3rem auto" }}>
                        <div>
                            <UsercardBlock
                                products={user.cartDetail}
                                removeItem={RemoveFromCart}
                                createOrder={CreateOrderModal}
                            />

                            {showTotal ? (
                                <div style={{ marginTop: "3rem" }}>
                                    <h2>Total : {Total}</h2>
                                </div>
                            ) : showSuccess ? (
                                <Result status="success" title="Successfully Purchased"></Result>
                            ) : (
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifycontent: "center",
                                    }}
                                >
                                    <br></br>
                                    <Empty description={false}></Empty>
                                    <p>No Item In Cart</p>
                                </div>
                            )}
                        </div>

                        <Modal className="modal-order" isOpen={modalOrdering}>
                        <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setModalOrdering(false)}>
                        <MdClear style={{ cursor: 'pointer' }} /></div>
                            {/* <button style={{textAlign: 'right'}} onClick={setModalIsOpenToFalse}>x</button> */}
                            <ul>
                                <h1>{productData.shopName}</h1>
                                <div style={{ height: '70vh', width: '95%', backgroundColor: 'green', flexDirection: 'row' }}>
                                    <div style={{ width: '95%', backgroundColor: 'pink', flexDirection: 'row' }}>
                                        <div style={{ backgroundColor: 'white', width: '400px', height: '20vh', float: 'right', flexDirection: 'row' }}>
                                            <p>ยอดสินค้า {productData.pricePD * productData.quantity}</p>
                                            <p>ค่าจัดส่ง {productData.shippingCostPD}</p>
                                            <p>ส่วนลด - </p>
                                            <p>รวม {Total}</p>
                                            <br />
                                            <div style={{ float: 'right', backgroundColor: 'white' }}>
                                                <p>ชำระเงิน</p>
                                                <input type="file" onChange={onDropImagePayment} />
                                                <button onClick={handleUploadImage}>Upload</button>
                                                <a onClick={checkImagePayment}>
                                                    <img
                                                        style={{ width: "70px" }}
                                                        src={ImagePayment}
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <div style={{ backgroundColor: 'red', width: '200px' }}>
                                            <img
                                                style={{ width: "200px" }}
                                                alt="product"
                                                src={productData.imagesPD1}
                                            />
                                        </div>
                                        <div style={{ backgroundColor: 'blue', width: '200px' }}>
                                            <p>ชื่อสินค้า</p>
                                            <a1>{productData.namePD}</a1>
                                        </div>
                                        <p>ราคา</p>
                                        <a1>{productData.pricePD}</a1>
                                        <p>จำนวน</p>
                                        <a1>{productData.quantity}</a1>
                                        <p>ค่าจัดส่ง</p>
                                        <a1>{productData.shippingCostPD}</a1>
                                        <br />

                                    </div>
                                </div>
                                <Button onClick={() => {
                                    createOrder();
                                    setModalOrdering(false);
                                    }}>สั่งซื้อสินค้า</Button>
                            </ul>
                        </Modal>

                        <Modal className="modal-checkpayment" isOpen={modalCheckPaymentIsOpen}>
                            <button onClick={setModalCheckPpaymentIsOpenTofalse}>x</button>
                            <img
                                style={{ width: "100%" }}
                                src={ImagePayment}
                            />

                        </Modal>


                    </div>
                </Modal>

                <Modal className="modal-ModalOrder"
                    isOpen={ModalOrderIsOpen}
                    contentLabel="order"
                >
                    <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setModalOrderIsOpen(false)}>
                        <MdClear style={{ cursor: 'pointer' }} /></div>
                    <p style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold', fontFamily: 'Prompt' }}>คำสั่งซื้อของฉัน</p>

                    <Row style={{ padding: '15px' }}>
                        {renderCards}
                    </Row>

                </Modal>

                <Modal className="modal-ModalNoOrder"
                    isOpen={modalNoOrder}

                    contentLabel="noorder"
                >
                    <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setmodalNoOrder(false)}>
                        <MdClear style={{ cursor: 'pointer' }} /></div>
                    <p style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold' }}>ยังไม่มีคำสั่งซื้อ</p>


                </Modal>

                <Modal className="modal-ModalCoupon"
                    isOpen={modalCoupon}

                    contentLabel="coupon"
                >
                    <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setModalCoupon(false)}>
                        <MdClear style={{ cursor: 'pointer' }} /></div>
                    <p style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold' }}>คูปองส่วนลด</p>


                </Modal>
            </div>

    );
};

export default Header;