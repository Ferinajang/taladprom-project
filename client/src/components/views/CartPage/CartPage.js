import React ,{useEffect,useState}from 'react'
import {useDispatch} from 'react-redux'
import {getCartItem,
        removeCartItem,
        addOrderToUser} from '../../../_actions/user_actions'
import UsercardBlock from './Section/UsercardBlock';
import {Result,Empty, Button,Col,Card,Row} from 'antd'
import Modal from 'react-modal'
import AnimeList from './Section/Anime';
import Axios from 'axios'
import './CartPage.css'
import moment from "moment";
import { MdClear } from "react-icons/md";
import { storage } from "../../firebaseConfig"


function CartPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [showSuccess, setshowSuccess] = useState(false)
    const [showTotal, setshowTotal] = useState(false)
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [modalCheckPaymentIsOpen, setmodalCheckPaymentIsOpen] = useState(false)
    const [productData, setproductData] = useState([])
    const [statusOrder, setstatusOrder] = useState("Not Confirmed")
    const [Date, setDate] = useState("")
    const [ImagePayment, setImagePayment] = useState("")
    const [Image, setImage] = useState("")
    const [progress, setProgress] = useState(0)
    const [quantity, setquantity] = useState(0)
    const [modalUseCoupon, setmodalUseCoupon] = useState(false)
    const [CouponToUse, setCouponToUse] = useState([])
    const [totalProduct, settotalProduct] = useState(0)
    const [disCost, setdisCost] = useState(0)
    const [couponUsedID, setcouponUsedID] = useState("")

    

    //fecth data
    useEffect(( ) => {
        let cartItem = [];
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length >0){
                props.user.userData.cart.forEach(item => {
                    cartItem.push(item.id)
                });
                dispatch(getCartItem(cartItem,props.user.userData.cart))
            }
        }
        setDate(moment().format("DD-MM-YYYY hh:mm:ss"))
      
    }, [props.user.userData])

    //cal

    // useEffect(() => {
    //     if(props.user.cartDetail && props.user.cartDetail.length > 0){
    //         calculateTotal(props.user.cartDetail)
    //     }
     
    // }, [props.user.cartDetail])

    const RemoveFromCart =(productId)=> {
        dispatch(removeCartItem(productId))
        .then(()=>{
            Axios.get('/api/users/userCartInfo')
            .then(response => {
                if(response.data.success){
                   alert("success")
                }else{
                    alert('fail to get cart info')
                }
            })
        })
    }

    const createOrder =()=>{
      const variables ={
          customerName: props.user.userData.name,
          customerID : props.user.userData._id,
          shopID:productData.shopID,
          shopName:props.user.userData.shopName,
          namePD: productData.namePD,
          pricePD : productData.pricePD,
          quantityPD : productData.quantity,
          shippingCostPD : productData.shippingCostPD,
          imagesPayment : ImagePayment,
          dateOrder:Date,
          totalPrice : Total,
          status: statusOrder,
          imagesPD1:productData.imagesPD1 ,
          productID:productData._id
      }

      Axios.post('/api/order/createOrder',variables)
      .then(response =>{
          if(response.data.success){
            console.log("ffgfG",response.data.order);
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
                      if(couponUsedID!=""){
                        adduUsedCoupon()

                      }else{
                        console.log("no coupon");
                      }
                      
                    } else {
                      alert("fail to get cart info");
                    }
                  });
                });
              }
            )
          }else{
              alert('failed to upload')
          }
      })


  }

  const adduUsedCoupon=()=>{
    const variables ={
      id:couponUsedID,
      status:"used",
  }
  Axios.put('/api/coupon/updateCouponUsed',variables)
        .then(response =>{
            if(response.data.success){
                alert('คูปองได้ถูกใช้แล้ว')
            }else{
                alert(response)
            }
        })

  }
  
  const CreateOrderModal = (productId) => {
    console.log(productId);
    if (productId.quantityPD == 0) {
      alert("สินค้าหมด");
    } else {
      if (productId.quantity > productId.quantityPD) {
        alert("สินค้าในสต๊อกไม่เพียงพอต่อคำสั่งซื้อของคุณ");
      } else {
        setModalIsOpenToTrue();
        setproductData(productId);
        let total = 0;
        total =
          productId.pricePD * productId.quantity + productId.shippingCostPD;
        setTotal(total);
        settotalProduct(productId.pricePD * productId.quantity)

      }
    }
  };
    const setModalIsOpenToTrue = () => {
      setModalIsOpen(true);
    };

    const setModalCheckPpaymentIsOpenToTrue = () => {
      setmodalCheckPaymentIsOpen(true);
    };

    const setModalCheckPpaymentIsOpenTofalse = () => {
      setmodalCheckPaymentIsOpen(false);
    };

    const setModalIsOpenToFalse = () => {
      setModalIsOpen(false);
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

    //////////////////////////use coupon ////////////////////////////////
    const useCoupon =()=>{
      console.log("gg");
      const variables ={
        OwnerID:props.user.userData._id,
    }
      Axios.post("/api/coupon/getCouponUser",variables).then((response) => {
        if (response.data.success) {
          setCouponToUse(response.data.coupon);
          setmodalUseCoupon(true)

        } else {
          alert("Fialed to fecth data from mongodb");
        }
      });
    }

    const CalCouponDiscount =(coupon)=>{
      let totalCost =productData.pricePD * productData.quantity;
      if(coupon.typeCoupon == "FreeShipping"){
        if(totalCost < coupon.minimumCost){
          alert("ยอดสั่งซื้อไม่ถึงยอดสั่งซื้อขั้นต่ำ")
        }else{
          setcouponUsedID(coupon._id)
          let priceCost = Total - productData.shippingCostPD
          setTotal(priceCost)
        }

      }else if(coupon.typeCoupon=="DiscountPercent"){
        console.log("percent");
        if(totalCost < coupon.minimumCost){
          alert("ยอดสั่งซื้อไม่ถึงยอดสั่งซื้อขั้นต่ำ")
        }else{
          setcouponUsedID(coupon._id)
          let priceCost = Math.ceil(((100-coupon.discount)*totalCost)/100)
          setTotal(priceCost + productData.shippingCostPD)
          settotalProduct(priceCost)
          setdisCost(((productData.pricePD * productData.quantity) + productData.shippingCostPD )- priceCost)
        }

      }else if(coupon.typeCoupon=="DiscountMoney"){
        console.log("money");
        if(totalCost < coupon.minimumCost){
          alert("ยอดสั่งซื้อไม่ถึงยอดสั่งซื้อขั้นต่ำ")
        }else{
          setcouponUsedID(coupon._id)
          let priceCost = Math.ceil((productData.pricePD*productData.quantity)-coupon.discount)
          if(priceCost < 0 ){
            console.log("555");
            let priceCost = 0
            setTotal(priceCost + productData.shippingCostPD)
            setdisCost(((productData.pricePD * productData.quantity) + productData.shippingCostPD )- priceCost)
          }else{
            setTotal(priceCost + productData.shippingCostPD)
            settotalProduct(priceCost)
            setdisCost(((productData.pricePD * productData.quantity) + productData.shippingCostPD )- priceCost)

          }
          
        }
      }
    }

    const renderCardsUseCoupon = CouponToUse.map((coupon, index) => {

      if(coupon.shopID == productData.shopID){
        return (
          <Col lg={12}>
            <a onClick={()=>CalCouponDiscount(coupon)}>
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
  
    

    


  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UsercardBlock
          products={props.user.cartDetail}
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
      {/* //////////////////////////////modal/////////////////////////////////// */}
      <Modal className="modal-order" isOpen={modalIsOpen}>
        <button style={{float:'right'}} onClick={()=>setModalIsOpen(false)}>ปิด</button>
        <ul>
          <h1>{productData.shopName}</h1>
          <div style={{height:'70vh',width:'95%' ,backgroundColor:'green', flexDirection:'row'}}>
          <div style={{width:'95%',backgroundColor:'pink', flexDirection:'row'}}>
          <div style={{backgroundColor:'white',width:'400px',height:'20vh',float:'right',flexDirection:'row'}}>
              <p>ยอดสินค้า {totalProduct}</p>
              <p>ค่าจัดส่ง {productData.shippingCostPD}</p>
              <p>ส่วนลด {disCost}</p>
            <p>รวม {Total}</p>
            <br/>
            <div style={{float:'right',backgroundColor:'white'}}>
              <p>ชำระเงิน</p>
              <input type="file" onChange={onDropImagePayment}/>
              <button onClick={handleUploadImage}>Upload</button>
              <a onClick={checkImagePayment}>
              <img 
                style={{ width: "70px" }}
                src={ImagePayment}
              />
              </a>
            </div>
            <Button onClick={useCoupon}>กดใช้คูปอง</Button>
          </div>
              <div style={{backgroundColor:'red',width:'200px'}}>
                <img
                style={{ width: "200px" }}
                alt="product"
                src={productData.imagesPD1}
                    />
              </div>
              <div style={{backgroundColor:'blue',width:'200px'}}>
                  <p>ชื่อสินค้า</p>
                  <a1>{productData.namePD}</a1>
              </div>
            <p>ราคา</p>
            <a1>{productData.pricePD}</a1>
            <p>จำนวน</p>
            <a1>{productData.quantity}</a1>
            <p>ค่าจัดส่ง</p>
            <a1>{productData.shippingCostPD}</a1>
            <br/>
            
          </div>
          </div>
          <Button onClick={createOrder}>สั่งซื้อสินค้า</Button>
        </ul>
      </Modal>
      
      <Modal className="modal-checkpayment" isOpen={modalCheckPaymentIsOpen}>
        <button onClick={setModalCheckPpaymentIsOpenTofalse}>x</button>
        <img 
             style={{ width: "100%" }}
                src={ImagePayment}
              />
        
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
                <h1  style={{ alignItem:'center' }}>เลือกคูปองส่วนลดของคุณ</h1>
              <div style={{ margin: "50px", marginRight: "70px" }}>
                <ul>
                  <Row gutter={[12, 12]}>{renderCardsUseCoupon
                  }</Row>
                </ul>
              </div>
            </div>
          </div>
        </Modal>



      


    </div>
  );
}

export default CartPage