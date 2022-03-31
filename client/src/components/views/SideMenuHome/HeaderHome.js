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
import { Icon, Badge, Form, Input, Button, Card, Col, Row, Steps, Avatar, Table, Tabs } from "antd";
import { useDispatch } from 'react-redux'
import axios from "axios";
import { USER_SERVER } from "../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Axios from 'axios';
import { getOrderList } from '../../../_actions/user_actions'
import { FaList, FaRegHeart, FaClipboardList, FaCloudUploadAlt ,FaUserEdit} from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiShoppingCart } from "react-icons/fi";
import { RiPencilLine, RiCoupon3Fill } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { ImSearch, ImLocation } from "react-icons/im";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import { IoIosList } from "react-icons/io";
import { IoArrowBackCircleSharp,IoArrowForwardCircle} from "react-icons/io5";


import { MdClear } from "react-icons/md";
//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./SideMenuHome.css";
import "./HeaderHome.css"

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
import Loading from '../../Loading';


// import {useFonts,Prompt_100Thin,Prompt_400Regular,} from '@expo-google-fonts/prompt';
const { Meta } = Card;
const { Step } = Steps;
const { TabPane } = Tabs;

const Header = (props) => {
    const [modalCart, setModalCart] = useState(false);
    const [modalOrder, setModalOrder] = useState(false);
    const [order, setorder] = useState([]);
    const [modalNoOrder, setmodalNoOrder] = useState(false)
    const [modalCoupon, setmodalCoupon] = useState(false);
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)
    const user = useSelector((state) => state.user);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ModalOrderIsOpen, setModalOrderIsOpen] = useState(false)
    const [Data, setData] = useState([]);
    const [modalOrdering, setModalOrdering] = useState(false);

    const [changeName, setchangeName] = useState("")
    const [changeLastName, setchangeLastName] = useState("")
    const [changePhoneNumber, setchangePhoneNumber] = useState("")
    const [changeAddress, setchangeAddress] = useState("")
    const [stateCheck, setstateCheck] = useState(true)
    const [DataUser, setDataUser] = useState([])
    const [modalPreIsOpen, setmodalPreIsOpen] = useState(false)


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
    const [loading, setloading] = useState(true);

    //coupon
    const [modalUseCoupon, setmodalUseCoupon] = useState(false)
    const [CouponToUse, setCouponToUse] = useState([])
    const [totalProduct, settotalProduct] = useState(0)
    const [disCost, setdisCost] = useState(0)
    const [couponUsedID, setcouponUsedID] = useState("")

    //random
    const [modalCouponRandom, setmodalCouponRandom] = useState(false)
    const [Coupon, setCoupon] = useState([])
    const [CouponRandom, setCouponRandom] = useState([])
    const [CouponLength, setCouponLength] = useState(0)



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
                dispatch(getCartItem(cartItem, user.userData.cart))
            }
        }
        setDate(moment().format("DD-MM-YYYY hh:mm:ss"))
        setDataUser(user.userData)

    }, [user.userData])

    ///edit/////
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
    const onChangeLastName = (event) => {
        setchangeLastName(event.currentTarget.value)
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
        setchangeLastName(user.userData.lastname)
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
        console.log(order);
        return (

            <Col >
                <a href={`/order/${order._id}`}>
                    <Card>

                        <div style={{ float: 'right' }}>
                            {(order.status === "Not Confirmed" ? <h2 style={{ fontWeight: 'bold', paddingLeft: '7px', color: 'red' }}>รอการยืนยัน</h2> : order.status === "pending" ? <h2 style={{ fontWeight: 'bold', paddingLeft: '7px', marginBottom: '5px', color: 'ffc53d' }}>รอการจัดส่ง</h2> : order.status === "success" ?
                                <h2 style={{ fontWeight: 'bold', paddingLeft: '7px', marginBottom: '5px', color: 'green' }}>เสร็จสิ้น</h2> : <h2></h2>)

                            }
                        </div>
                        <div style={{ display: 'flex' }}>
                            <img width={100} height={100} src={order.imagesPD1} />
                            <div style={{ display: 'block', marginLeft: '100px' }}>
                                <h2 style={{ fontFamily: 'Prompt', fontWeight: 'bold' }}>{order.namePD}</h2>
                                <h4 style={{ fontFamily: 'Prompt', fontWeight: 'thin' }}>จำนวน {order.quantityPD} ชิ้น</h4>
                                <h4>ราคารวม {order.totalPrice} บาท</h4>
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
            imagesPD1: productData.imagesPD1,
            productID: productData._id,
            addressOrder: user.userData.address,
            phoneNumberOrder: user.userData.phoneNumber
        }

        Axios.post('/api/order/createOrder', variables)
            .then(response => {
                if (response.data.success) {
                    console.log("ffgfG", response.data.order);
                    setImagePayment("")
                    dispatch(addOrderToUser(response.data.order))
                    const variables = {
                        id: productData._id,
                        quantityPD: productData.quantityPD - productData.quantity,
                    };
                    Axios.put("/api/product/addRecommendedProduct", variables).then(
                        (response) => {
                            console.log();
                            dispatch(removeCartItem(productData._id)).then(() => {
                                Axios.get("/api/users/userCartInfo").then((response) => {
                                    if (response.data.success) {
                                        alert("success");
                                        if (couponUsedID != "") {
                                            adduUsedCoupon()

                                        } else {
                                            console.log("no coupon");
                                        }

                                    } else {
                                        alert("fail to get cart info");
                                    }
                                });
                            });
                        }
                    )
                } else {
                    alert('failed to upload')
                }
            })


    }

    const adduUsedCoupon = () => {
        const variables = {
            id: couponUsedID,
            status: "used",
        }
        Axios.put('/api/coupon/updateCouponUsed', variables)
            .then(response => {
                if (response.data.success) {
                    alert('คูปองได้ถูกใช้แล้ว')
                } else {
                    alert(response)
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







    const orderList = () => {
        setModalOrderIsOpenToTrue()
    }

    const goToUpload = () => {

    }

    //////////////////////conpon/////////////////////////

    const couponList = () => {
        Axios.post('/api/coupon/getCoupon')
            .then(response => {
                if (response.data.success) {
                    setCoupon(response.data.coupon)
                    console.log("5555", response.data.coupon);
                    setmodalCoupon(true)
                } else {
                    alert("Fialed to fecth data from mongodb")
                }
            }
            )
    }


    const renderCardsCoupon = Coupon.map((coupon, index) => {
        if (!user.userData) {
            //console.log("fffff");
        } else {
            if (coupon.OwnerID == user.userData._id) {
                return (
                    <Col lg={16}>
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
                                </div>
                            </Card>
                        </a>
                    </Col>
                );
            }
        }
    });


    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then((response) => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert("Log Out Failed");
            }
        });
    };
    
    const callback =(key)=>{
        console.log(key);
    }


    const loadingData = () => {
        if (!user.userData) {

        } else {
            setDataUser(user.userData)
            setloading(false);

        }
    };

    const columns = [
        {
            title: "รายการสินค้า",
            dataIndex: "namePD",
            key: "namePD",
        },
        {
            title: "ราคาต่อหน่วย",
            dataIndex: "pricePD",
            key: "pricePD",
        },
        {
            title: "จำนวน",
            dataIndex: "quantityPD",
            key: "quantityPD",
        },

        {
            title: "ราคารวม",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },

    ];

    const data = [
        {
            namePD: productData.namePD,
            quantityPD: productData.quantityPD,
            pricePD: productData.pricePD,
            totalPrice: productData.pricePD * productData.quantity
        },
    ];

    /////////////////////////////////////////////////
    const useCoupon = () => {
        console.log("gg");
        const variables = {
            OwnerID: user.userData._id,
        }
        Axios.post("/api/coupon/getCouponUser", variables).then((response) => {
            if (response.data.success) {
                setCouponToUse(response.data.coupon);
                setmodalUseCoupon(true)

            } else {
                alert("Fialed to fecth data from mongodb");
            }
        });
    }

    const CalCouponDiscount = (coupon) => {
        let totalCost = productData.pricePD * productData.quantity;
        if (coupon.typeCoupon == "FreeShipping") {
            if (totalCost < coupon.minimumCost) {
                alert("ยอดสั่งซื้อไม่ถึงยอดสั่งซื้อขั้นต่ำ")
            } else {
                setcouponUsedID(coupon._id)
                let priceCost = Total - productData.shippingCostPD
                setTotal(priceCost)
            }

        } else if (coupon.typeCoupon == "DiscountPercent") {
            console.log("percent");
            if (totalCost < coupon.minimumCost) {
                alert("ยอดสั่งซื้อไม่ถึงยอดสั่งซื้อขั้นต่ำ")
            } else {
                setcouponUsedID(coupon._id)
                let priceCost = Math.ceil(((100 - coupon.discount) * totalCost) / 100)
                setTotal(priceCost + productData.shippingCostPD)
                settotalProduct(priceCost)
                setdisCost(((productData.pricePD * productData.quantity) + productData.shippingCostPD) - priceCost)
            }

        } else if (coupon.typeCoupon == "DiscountMoney") {
            console.log("money");
            if (totalCost < coupon.minimumCost) {
                alert("ยอดสั่งซื้อไม่ถึงยอดสั่งซื้อขั้นต่ำ")
            } else {
                setcouponUsedID(coupon._id)
                let priceCost = Math.ceil((productData.pricePD * productData.quantity) - coupon.discount)
                if (priceCost < 0) {
                    console.log("555");
                    let priceCost = 0
                    setTotal(priceCost + productData.shippingCostPD)
                    setdisCost(((productData.pricePD * productData.quantity) + productData.shippingCostPD) - priceCost)
                } else {
                    setTotal(priceCost + productData.shippingCostPD)
                    settotalProduct(priceCost)
                    setdisCost(((productData.pricePD * productData.quantity) + productData.shippingCostPD) - priceCost)

                }

            }
        }
    }

    const renderCardsUseCoupon = CouponToUse.map((coupon, index) => {

        if (coupon.shopID == productData.shopID) {
            return (
                <Col lg={12}>
                    <a onClick={() => CalCouponDiscount(coupon)}>
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

                            </div>
                        </Card>
                    </a>
                </Col>
            );
        }

    });


    if (loading) {
        return (
            <div>
                <Loading />
                {loadingData()}
            </div>
        );
    } else {
        return (
          <div id="header">
            {/* collapsed props to change menu size using menucollapse state */}
            <ProSidebar collapsed={menuCollapse}>
              <SidebarHeader>
                <div className="logotext" style={{marginTop:"7.5px"}}>
                  {/* small and big change using menucollapse state */}
                  <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
                </div>
                <div className="closemenu" onClick={menuIconClick}>
                  {/* changing menu collapse icon on click */}
                  {menuCollapse ? (
                    <FiArrowRightCircle
                      style={{
                        color: "#2F2851",
                        marginTop: "6px",
                        marginRight: "22px",
                      }}
                    />
                  ) : (
                    <FiArrowLeftCircle
                      style={{
                        color: "#2F2851",
                        marginTop: "6px",
                        marginRight: "100px",
                      }}
                    />
                  )}
                </div>
              </SidebarHeader>
              <SidebarContent style={{ marginTop: "50px" }}>
                <Menu iconShape="square">
                  <MenuItem
                    active={false}
                    icon={<ImSearch />}
                    onClick={() => (window.location.href = "/taladprom-shop")}
                  >
                    SEARCH
                  </MenuItem>
                  <MenuItem
                    active={false}
                    icon={<FiShoppingCart />}
                    onClick={() => setModalCart(true)}
                  >
                    CART
                  </MenuItem>
                  <MenuItem
                    active={false}
                    icon={<FaClipboardList />}
                    onClick={orderList}
                  >
                    MY ORDER
                  </MenuItem>
                  <MenuItem
                    active={false}
                    icon={<RiCoupon3Fill />}
                    onClick={() => couponList()}
                  >
                    COUPON
                  </MenuItem>
                  <MenuItem
                    active={false}
                    icon={<FaUserEdit />}
                    onClick={() => setmodalPreIsOpen(true)}
                  >
                    HOME
                  </MenuItem>
                  <MenuItem
                    active={false}
                    icon={<FiHome />}
                    onClick={() => (window.location.href = "/")}
                  >
                    HOME
                  </MenuItem>
                </Menu>
              </SidebarContent>
              <SidebarFooter>
                <Menu iconShape="square">
                  <MenuItem
                    active={false}
                    icon={<FiLogOut />}
                    onClick={() => logoutHandler()}
                  >
                    LOG OUT
                  </MenuItem>
                </Menu>
              </SidebarFooter>
            </ProSidebar>

            <Modal
              className="modal-ModalCart"
              isOpen={modalCart}
              contentLabel="cart"
            >
              <div
                style={{
                  height: "20px",
                  fontSize: "36px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
                onClick={() => setModalCart(false)}
              >
                <MdClear style={{ cursor: "pointer" }} />
              </div>
              <p
                style={{
                  fontSize: "36px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                รถเข็นของฉัน
              </p>
              <div style={{ width: "85%", margin: "3rem auto" }}>
                <div>
                  <UsercardBlock
                    products={user.cartDetail}
                    removeItem={RemoveFromCart}
                    createOrder={CreateOrderModal}
                  />
                </div>

                <Modal className="modal-Modal-Order" isOpen={modalOrdering}>
                  <div
                    style={{
                      height: "20px",
                      fontSize: "36px",
                      textAlign: "right",
                      marginRight: "10px",
                    }}
                    onClick={() => setModalOrdering(false)}
                  >
                    <MdClear style={{ cursor: "pointer" }} />
                  </div>
                  <ul>
                    <div
                      style={{
                        width: "95%",
                        height: "10vh",
                        display: "inline-table",
                      }}
                    >
                      <div>
                        <h2>
                          <HiLocationMarker
                            style={{ fontSize: "30px", marginRight: "10px" }}
                          />
                          ที่อยู่ในการจัดส่ง
                        </h2>
                        <h3 style={{ textAalign: "flex-end", float: "right" }}>
                          ที่อยู่ : {DataUser.address}
                        </h3>
                        <div
                          style={{
                            width: "80%",
                            display: "block",
                            height: "-9vh",
                            marginTop: "-5px",
                          }}
                        >
                          <h3>
                            คุณ {DataUser.name} {DataUser.lastname}
                            {"\n"}
                          </h3>
                          <p style={{ marginTop: "-10px" }}>
                            เบอร์โทร {"099163596"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="style13"></hr>
                    <div>
                      <h2>
                        <IoIosList
                          style={{
                            fontSize: "30px",
                            marginRight: "10px",
                            paddingTop: "10px",
                          }}
                        />
                        รายการคำสั่งซื้อ
                      </h2>
                      <div
                        style={{
                          height: "70vh",
                          width: "95%",
                          flexDirection: "row",
                        }}
                      >
                        <div style={{ flexDirection: "row", display: "flex" }}>
                          <img
                            style={{ width: "100px" }}
                            alt="product"
                            src={productData.imagesPD1}
                          />
                          <div
                            style={{ textAlign: "center", marginLeft: "50px" }}
                          >
                            <h3>ชื่อสินค้า</h3>
                            <h4>{productData.namePD}</h4>
                          </div>

                          <div
                            style={{ display: "flex", paddingLeft: "520px" }}
                          >
                            <div
                              style={{
                                flexDirection: "row",
                                width: "100px",
                                textAlign: "center",
                              }}
                            >
                              <h3>ราคาต่อชิ้น</h3>
                              <h4>{productData.pricePD}</h4>
                            </div>
                            <div
                              style={{
                                flexDirection: "row",
                                width: "100px",
                                textAlign: "center",
                              }}
                            >
                              <h3>จำนวน</h3>
                              <h4>{productData.quantity}</h4>
                            </div>
                            <div
                              style={{
                                flexDirection: "row",
                                width: "100px",
                                textAlign: "center",
                              }}
                            >
                              <h3>ราคารวม</h3>
                              <h4>
                                {productData.pricePD * productData.quantity}
                              </h4>
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <hr className="style13"></hr>
                        <div style={{ flexDirection: "row", display: "flex" }}>
                          <div
                            style={{ display: "flex", paddingLeft: "700px" }}
                          >
                            <div style={{ textAlign: "start" }}>
                              <h4 style={{ paddingTop: "4px" }}>
                                คูปองส่วนลดของร้านค้า
                              </h4>
                            </div>
                            <div
                              style={{
                                textAlign: "center",
                                marginLeft: "70px",
                              }}
                            >
                              <Button type="dashed" danger onClick={useCoupon}>
                                เลือกใช้คูปอง
                              </Button>
                            </div>
                          </div>
                        </div>
                        <hr className="style13"></hr>
                        <div style={{ flexDirection: "row", display: "flex" }}>
                          <div style={{ display: "flex", paddingLeft: "20px" }}>
                            <div style={{ textAlign: "start" }}>
                              <h2 style={{ paddingTop: "5px" }}>การชำระเงิน</h2>
                              <p style={{ color: "red" }}>
                                *ลูกค้าจะต้องชำระเงินตามยอดรวมทั้งหมดและแนบหลักฐานการโอนเงินได้ที่นี่่
                              </p>

                              <div style={{ margin: "-10px" }}>
                                <div class="file-upload-cart">
                                  <input
                                    type="file"
                                    onChange={onDropImagePayment}
                                    style={{
                                      height: "200px",
                                      width: "250px",
                                      position: "absolute",
                                      top: "0",
                                      left: "0",
                                      opacity: "0",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <FaCloudUploadAlt
                                    style={{ marginRight: "5px" }}
                                  />{" "}
                                  อัพโหลดหลักฐานยืนยันการชำระเงิน
                                  <Button
                                    style={{ marginLeft: "13px" }}
                                    onClick={handleUploadImage}
                                  >
                                    Upload
                                  </Button>
                                </div>
                                <Button
                                  style={{
                                    marginLeft: "900px",
                                    backgroundColor: "#2F2851",
                                  }}
                                  shape="round"
                                  type="primary"
                                  size="large"
                                  onClick={() => {
                                    createOrder();
                                    setModalOrdering(false);
                                  }}
                                >
                                  สั่งซื้อสินค้า
                                </Button>

                                <a onClick={checkImagePayment}>
                                  <img
                                    style={{ width: "70px" }}
                                    src={ImagePayment}
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>
                </Modal>

                <Modal
                  className="modal-checkpayment"
                  isOpen={modalCheckPaymentIsOpen}
                >
                  <button onClick={setModalCheckPpaymentIsOpenTofalse}>
                    x
                  </button>
                  <img style={{ width: "100%" }} src={ImagePayment} />
                </Modal>
              </div>
            </Modal>

            <Modal
              className="modal-ModalOrder"
              isOpen={ModalOrderIsOpen}
              contentLabel="order"
            >
              <div
                style={{
                  height: "20px",
                  fontSize: "36px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
                onClick={() => setModalOrderIsOpen(false)}
              >
                <MdClear style={{ cursor: "pointer" }} />
              </div>
              <p
                style={{
                  fontSize: "36px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontFamily: "Prompt",
                }}
              >
                คำสั่งซื้อของฉัน
              </p>

              <Row style={{ padding: "15px" }}>{renderCards}</Row>
            </Modal>

            <Modal
              className="modal-ModalNoOrder"
              isOpen={modalNoOrder}
              contentLabel="noorder"
            >
              <div
                style={{
                  height: "20px",
                  fontSize: "36px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
                onClick={() => setmodalNoOrder(false)}
              >
                <MdClear style={{ cursor: "pointer" }} />
              </div>
              <p
                style={{
                  fontSize: "36px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                ยังไม่มีคำสั่งซื้อ
              </p>
            </Modal>

            <Modal
              className="modal-ModalCoupon"
              isOpen={modalCoupon}
              contentLabel="coupon"
            >
              <div
                style={{
                  height: "20px",
                  fontSize: "36px",
                  textAlign: "right",
                  marginRight: "10px",
                }}
                onClick={() => setmodalCoupon(false)}
              >
                <MdClear style={{ cursor: "pointer" }} />
              </div>
              <p
                style={{
                  fontSize: "36px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                คูปองส่วนลด
              </p>
              <Tabs onChange={callback} centered>
                <TabPane tab="คูปองสามารถใช้ได้" key="1">
                  {renderCardsCoupon}
                </TabPane>
                <TabPane tab="คูปองที่ใช้เเล้ว/หมดเวลา" key="2">
                  <div style={{ margin: "40px" }}>{renderCardsCoupon}</div>
                </TabPane>
              </Tabs>
            </Modal>

            <Modal className="modal-coupon-use" isOpen={modalUseCoupon}>
              <div class="scrollbar" id="style-15">
                <div class="force-overflow">
                  <div
                    style={{
                      height: "15px",
                      fontSize: "25px",
                      textAlign: "right",
                      margin: "10px",
                    }}
                    onClick={() => setmodalUseCoupon(false)}
                  >
                    <MdClear style={{ cursor: "pointer" }} />
                  </div>
                  <h1 style={{ alignItem: "center" }}>
                    เลือกคูปองส่วนลดของคุณ
                  </h1>
                  <div style={{ margin: "50px", marginRight: "70px" }}>
                    <ul>
                      <Row gutter={[12, 12]}>{renderCardsUseCoupon}</Row>
                    </ul>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal className="modal-Modal-edit" isOpen={modalIsOpen}>
              <div class="scrollbar" id="style-15">
                <div class="force-overflow">
                  <div
                    style={{
                      height: "15px",
                      fontSize: "25px",
                      textAlign: "right",
                      margin: "10px",
                    }}
                    onClick={() => setModalIsOpenToFalse}
                  >
                    <MdClear style={{ cursor: "pointer" }} />
                  </div>
                  <div style={{ marginLeft: "100px", alignItem: "center" }}>
                    <h1 style={{ fontWeight: "bolder" }}>รายละเอียดส่วนตัว</h1>
                    <h2>
                      คุณ {Data.name} {"  "} {Data.lastname}
                    </h2>
                    <Form
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 14 }}
                      layout="horizontal"
                    >
                      <Form.Item label="ชื่อ">
                        <Input
                          placeholder={Data.name}
                          onChange={onChangeName}
                          disabled={stateCheck}
                        />
                      </Form.Item>
                      <Form.Item label="นามสกุล">
                        <Input
                          placeholder={Data.lastname}
                          onChange={onChangeLastName}
                          disabled={stateCheck}
                        />
                      </Form.Item>
                      <Form.Item label="เบอร์โทรศัพท์">
                        <Input
                          placeholder={Data.phoneNumber}
                          onChange={onChangePhoneNumber}
                          disabled={stateCheck}
                        />
                      </Form.Item>
                      <Form.Item label="ที่อยู่">
                        <TextArea
                          rows={4}
                          placeholder={Data.address}
                          onChange={onChangeAddress}
                          disabled={stateCheck}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{ float: "right", backgroundColor: "skyblue" }}
                          type="primary"
                          onClick={editName}
                        >
                          แก้ไขรายละเอียดส่วนตัว
                        </Button>
                      </Form.Item>
                      {!stateCheck ? (
                        <Form.Item>
                          <Button
                            style={{ float: "right" }}
                            type="primary"
                            danger
                            onClick={OnSubmitEdit}
                          >
                            กดยืนยันเพื่อแก้ไขรายละเอียดส่วนตัว
                          </Button>
                        </Form.Item>
                      ) : (
                        <div></div>
                      )}
                    </Form>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal className="modal-Modal-edit-pre" isOpen={modalPreIsOpen}>
              <div class="scrollbar" id="style-15">
                <div class="force-overflow">
                  <div
                    style={{
                      height: "15px",
                      fontSize: "25px",
                      textAlign: "right",
                      margin: "10px",
                    }}
                    onClick={() => setmodalPreIsOpen(false)}
                  >
                    <MdClear style={{ cursor: "pointer" }} />
                  </div>
                  <div style={{ marginLeft: "100px", alignItem: "center" }}>
                    <div style={{ alignItem: "right" }}>
                      <h1 style={{ fontWeight: "bolder" }}>
                        รายละเอียดส่วนตัว
                      </h1>
                      <h2>
                        คุณ {DataUser.name} {"  "} {Data.lastname}
                      </h2>
                      <h2>อีเมล์ {DataUser.email}</h2>
                      <h2>เบอร์โทรศัพท์ {DataUser.phoneNumber}</h2>
                      <h2>ที่อยู่ {DataUser.address}</h2>
                      <Button
                          style={{ backgroundColor: "#2F2851" ,marginTop:'20px'}}
                          shape="round"
                          type="primary"
                          size="large"
                        >
                          แก้ไขรายละเอียดส่วนตัว
                        </Button>
                    </div>
                    <div
                      style={{
                        float: "right",
                        marginRight: "100px",
                        marginTop: "-260px",
                      }}
                    >
                      <img
                        style={{ width: "200px" }}
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/taladprom-b8753.appspot.com/o/275551533_705736683893380_26019719860945254_n.png?alt=media&token=da500820-50f3-450b-98ba-a9b881822dbc"
                        }
                      />
                      <br></br>
                      <br></br>
                      <div style={{display:'flex'}}>
                        <IoArrowBackCircleSharp
                          style={{
                            fontSize: "40px",
                    
                            color: "#2F2851",
                          }}
                        />
                        <Button
                          style={{ backgroundColor: "#2F2851" }}
                          shape="round"
                          type="primary"
                          size="large"
                        >
                          ตัวละครที่ 1
                        </Button>
                        <IoArrowForwardCircle
                          style={{
                            fontSize: "40px",
                      
                            color: "#2F2851",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        );
    }
};

export default Header;