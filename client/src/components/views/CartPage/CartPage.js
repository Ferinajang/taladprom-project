import React ,{useEffect,useState}from 'react'
import {useDispatch} from 'react-redux'
import {getCartItem,
        removeCartItem} from '../../../_actions/user_actions'
import UsercardBlock from './Section/UsercardBlock';
import {Result,Empty, Button} from 'antd'
import Modal from 'react-modal'
import AnimeList from './Section/Anime';
import Axios from 'axios'
import './CartPage.css'
import moment from "moment";



function CartPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [showSuccess, setshowSuccess] = useState(false)
    const [showTotal, setshowTotal] = useState(false)
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [productData, setproductData] = useState([])
    const [statusOrder, setstatusOrder] = useState("Not Confirmed")
    const [Date, setDate] = useState("")
    console.log("data",productData);
    

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

    

    const calculateTotal =()=>{
        console.log("555");
        console.log(productData);
        console.log(productData.quantity);
        console.log(productData.shippingCostPD);
       
    }    

    const RemoveFromCart =(productId)=> {
        dispatch(removeCartItem(productId))
        .then(()=>{
            Axios.get('/api/users/userCartInfo')
            .then(response => {
                if(response.data.success){
                    if(response.data.cartDetail.length <= 0){
                        setshowTotal(false)
                    }else{
                        calculateTotal(response.data.cartDetail)
                    }
                }else{
                    alert('fail to get cart info')
                }
            })
        })
    }
    const setModalIsOpenToTrue =()=>{
        setModalIsOpen(true)  
        
    }
  
    const setModalIsOpenToFalse =()=>{
        setModalIsOpen(false)
        
    }

    const CreateOrderModal =(productId)=>{
        console.log("fff",productId);
        setModalIsOpenToTrue();
        setproductData(productId)
        let total = 0 ;
        total = (productId.pricePD * productId.quantity)+productId.shippingCostPD
        setTotal(total)
        console.log(Total);
        setTotal(total)
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
            imagesPayment : "",
            dateOrder:Date,
            totalPrice : Total,
            status: statusOrder,
            
        }

        Axios.post('/api/order/createOrder',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
                props.history.push("/Landing")
            }else{
                alert('failed to upload')
            }
        })


    }
    


  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <Modal className="modal-order" isOpen={modalIsOpen}>
        <button onClick={setModalIsOpenToFalse}>x</button>
        <ul>
          <h1>{productData.shopName}</h1>
          <div style={{height:'70vh',width:'95%' ,backgroundColor:'green', flexDirection:'row'}}>
          <div style={{width:'95%',backgroundColor:'pink', flexDirection:'row'}}>
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
            <div style={{backgroundColor:'white',width:'400px',height:'20vh',float:'right',flexDirection:'row'}}>
              <p>ยอดสินค้า {productData.pricePD * productData.quantity}</p>
              <p>ค่าจัดส่ง {productData.shippingCostPD}</p>
              <p>ส่วนลด - </p>
            <p>รวม {Total}</p>
          </div>
          </div>
          </div>
          <Button onClick={createOrder}>สั่งซื้อสินค้า</Button>
         
        </ul>
      </Modal>
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
    </div>
  );
}

export default CartPage