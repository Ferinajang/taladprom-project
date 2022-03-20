import Axios from 'axios'
import { Row, Col,Table } from 'antd';
import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal'


function DetailOrderPage(props) {
    const dispatch = useDispatch();
    const orderId = props.match.params.orderId
    const [Order, setOrder] = useState([])
    const [modalCheckPaymentIsOpen, setmodalCheckPaymentIsOpen] = useState(false)
    const [trackingNumber, settrackingNumber] = useState("")

    useEffect(()=>{
        //console.log(props.match.params.productId);
        Axios.get(`/api/order/order_by_id?id=${orderId}&type=single`)
        .then(response=>{
            setOrder(response.data[0])
            
        })
       
    })

    

    const checkImagePayment =()=>{
        console.log("fff");
        setmodalCheckPaymentIsOpen(true)
      }

    const setModalCheckPaymentIsOpenTofalse = () => {
      setmodalCheckPaymentIsOpen(false);
    };

    const columns = [
      {
        title: "Name",
        dataIndex: "namePD",
        key: "namePD",
      },
      {
        title: "Quatity",
        dataIndex: "quantityPD",
        key: "quantityPD",
      },
      {
        title: "Price",
        dataIndex: "pricePD",
        key: "pricePD",
      },
      {
        title: "Shippng Cost",
        dataIndex: "shippingCostPD",
        key: "shippingCostPD",
      },
      {
        title: "Total",
        dataIndex: "totalPrice",
        key: "totalPrice",
      },
    ];
      
      const data = [
        {
          namePD: Order.namePD ,
          quantityPD: Order.quantityPD,
          pricePD: Order.pricePD,
          shippingCostPD: Order.shippingCostPD,
          totalPrice:Order.totalPrice
        },
      ];
    
    // const addToCartHandler = (productId) => {
    //     dispatch(addToCart(productId))
    // }

    // const images = [
    //     {
    //       original: Product.imagesPD1,
    //       thumbnail: Product.imagesPD1,
    //     },
    //     {
    //         original: Product.imagesPD2,
    //         thumbnail: Product.imagesPD2,
    //       },
    //       {
    //         original: Product.imagesPD3,
    //         thumbnail: Product.imagesPD3,
    //       },
    //   ];

    const confirmOrder=() =>{  
        const variables ={
            id:Order._id,
            status:"pending"
        }
        Axios.put('/api/order/editConfirmOrder',variables)
              .then(response =>{
                  if(response.data.success){
                      alert('product success to upload')
                  }else{
                      alert(response)
                  }
              })

    }

    const sendTrackingNumber = () => {
      const variables = {
        id: Order._id,
        status: "success",
        trackingNumber: trackingNumber,
      };

      Axios.put("/api/order/editConfirmOrder", variables).then((response) => {
        if (response.data.success) {
          alert("product success to upload");
        } else {
          alert(response);
        }
      });
    };

    const onTrackingChange =(event)=>{
      settrackingNumber(event.currentTarget.value)
  }


      

  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "block", justifyContent: "center" }}>
        <h1>Order NO : {Order._id}</h1>
        <h2 style={{ color: "red" }}>Status : {Order.status}</h2>
      </div>
      <br />
      <Table columns={columns} dataSource={data} />
      <br />
      <br />
      <div
        style={{ display: "block", justifyContent: "center", float: "right" }}
      >
        <h1>Total Price : {Order.totalPrice * Order.quantityPD}</h1>
        <button style={{ marginBottom: "20px" }} onClick={confirmOrder}>Confirm Order</button>
        <br></br>
        <button style={{ marginBottom: "20px" }}>Cancle Order</button>
      </div>
      <button style={{ marginBottom: "20px" }} onClick={checkImagePayment}>Proof payment</button>
      <br />
      <h3>Enter Tracking Number</h3>
      <input type="text" onChange={onTrackingChange}></input>
      <button style={{ marginBottom: "20px" }} onClick={sendTrackingNumber}>send tracking</button>

      <Modal className="modal-checkpayment" isOpen={modalCheckPaymentIsOpen}>
        <button button onClick={setModalCheckPaymentIsOpenTofalse}>
          x
        </button>
         <img style={{ width: "100%" }} src={Order.imagesPayment} /> 
      </Modal>
    </div>
  );
}

export default DetailOrderPage