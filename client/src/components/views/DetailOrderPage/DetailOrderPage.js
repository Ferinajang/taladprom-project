
import Axios from 'axios'
import { Row, Col,Table,Select ,Button,Input,Tooltip ,Modal,Steps,message} from 'antd';
import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { addToCart } from '../../../_actions/user_actions';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import { Image } from 'antd';


const { Step } = Steps;
const { Option } = Select;

function DetailOrderPage(props) {
    const dispatch = useDispatch();
    const orderId = props.match.params.orderId
    const [Order, setOrder] = useState([])
    const [modalCheckPaymentIsOpen, setmodalCheckPaymentIsOpen] = useState(false)
    const [trackingNumber, settrackingNumber] = useState("")
    const [Product, setProduct] = useState([])
    const [addess, setaddess] = useState("")
    const [color, setcolor] = useState("red")
    const [imageArray, setimageArray] = useState([])
    const [modalTextReject, setmodalTextReject] = useState(false)


    useEffect(()=>{
        //console.log(props.match.params.productId);
        Axios.get(`/api/order/order_by_id?id=${orderId}&type=single`)
        .then(response=>{
            setOrder(response.data[0])
            console.log(response.data[0]);
            if(response.data[0].status =="reject"){
              setmodalTextReject(true)
            }
           
            const variables = {
              namePD: response.data[0].namePD,
            };
            Axios.post("/api/product/getProductByID", variables).then(
              (response) => {
                if (response.data.success) {
                  setProduct(response.data.productOrder[0])
                } else {
                  alert("Fialed to fecth data from mongodb");
                }
              }
            );
          
        })  
        
       
    },[])
   

    

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

  const cancelOrder=()=>{
    alert("คุณต้องการปฏิเสธออเดอร์นี้?")
    const variables = {
      id: Order._id,
      status: "reject",
      // quantityPD: productData.quantityPD + Order.quantity,
    };
    Axios.put("/api/order/rejectOrder", variables).then((response) => {
      if (response.data.success) {
        alert("product success to upload");
        const variables = {
          id: Order._id,
          status: "reject",
        }
      } else {
        alert(response);
      }
    });

    const variablesProduct = {
      id: Product._id,
      quantityPD: Product.quantityPD + Order.quantityPD,
    };
    Axios.put("/api/product/updateQuantityCancelOrder", variablesProduct).then(
      (response) => {
        if (response.data.success) {
          console.log("เพิ่มแล้ว");
        } else {
          alert("Fialed to fecth data from mongodb");
        }
      }
    );
  }
  const GoToLinkDelivery =()=>{
    navigator.clipboard.writeText(Order.trackingNumber)
    message.success('คัดลอกเลขพัสดุสำเร็จ!!');
    if(Order.deliveryCompany == "ไปรษณีย์ไทย"){
      window.location.href = "https://track.thailandpost.co.th/"
    }else if(Order.deliveryCompany == "J&T EXPRESS"){
      window.location.href = "https://www.jtexpress.co.th/index/query/gzquery.html"
    }else if(Order.deliveryCompany == "BEST EXPRES"){
      window.location.href = "https://www.best-inc.co.th/track"
    }else if(Order.deliveryCompany == "Kerry Express"){
      window.location.href = "https://th.kerryexpress.com/th/track/"
    }else if(Order.deliveryCompany == "FLASH EXPRESS"){
      window.location.href = "https://www.flashexpress.co.th/tracking/"
    }else if(Order.deliveryCompany == "Ninja Van"){
      window.location.href = "https://www.ninjavan.co/th-th/tracking  "
    }else if(Order.deliveryCompany == "DHL Express"){
      window.location.href = "https://www.dhl.com/th-th/home/tracking.html"
    }else if(Order.deliveryCompany == "SAlpha Fast"){
      window.location.href = "http://www.alphafast.com/"
    }else if(Order.deliveryCompany == "SCG EXPRESS"){
      window.location.href = "https://www.scgexpress.co.th/tracking/"
    }else if(Order.deliveryCompany == "Nim Express"){
      window.location.href = "https://www.nimexpress.com/web/p/home"
    }
  }

  return (
    <div className="postPage" style={{ width: "90%", padding: "2rem 4rem" ,marginLeft:'90px'}}>
      <div style={{ display: "block", justifyContent: "center" }}>

      {Order.status == "Not Confirmed" ?
      <div style={{marginBottom:'15px'  }}>
          <Steps current={0}>
            <Step status="process" title="รอการยืนยันออเดอร์" icon={<UserOutlined />} />
            <Step status="wait" title="รอการส่งเลขพัศดุ" icon={<SolutionOutlined />}/>
            <Step status="wait" title="เสร็จสิ้น" icon={<SmileOutlined />} />
          </Steps>
        </div>:
        Order.status == "pending" ?
        <div style={{marginBottom:'15px'  }}>
        <Steps current={0}>
          <Step status="finish" title="รอการยืนยันคำสั่งซื้อ" icon={<UserOutlined />} />
          <Step status="process" title="รอการส่งเลขพัศดุ" icon={<SolutionOutlined />}/>
          <Step status="wait" title="เสร็จสิ้น" icon={<SmileOutlined />} />
        </Steps>
      </div>:  Order.status == "success" ?
      <div style={{marginBottom:'15px'  }}>
      <Steps current={0}>
        <Step status="finish" title="รอการยืนยันคำสั่งซื้อ" icon={<UserOutlined />} />
        <Step status="finish" title="รอการส่งเลขพัศดุ" icon={<SolutionOutlined />}/>
        <Step status="process" title="เสร็จสิ้น" icon={<SmileOutlined />} />
      </Steps>
    </div>:
      <div style={{marginBottom:'15px'  }}>
      <Steps current={0}>
        <Step status="finish" title="รอการยืนยันคำสั่งซื้อ" icon={<UserOutlined />} />
        <Step status="finish" title="รอการส่งเลขพัศดุ" icon={<SolutionOutlined />}/>
        <Step status="process" title="ยกเลิกคำสั่งซื้อ" icon={<SmileOutlined />} />
      </Steps>
    </div>
    
     }
    
     <h1>Order NO : {Order._id}</h1>
     <div  style={{display:'flex'}} >
        <h2 style={{fontWeight:'bold' }}>สถานะคำสั่งซื้อ :</h2>
        {Order.status == "Not Confirmed" ? <h2 style={{fontWeight:'bold',paddingLeft:'7px' ,marginBottom:'5px' , color:'red'}} >รอการยืนยันคำสั่งซื้อ</h2>:
        Order.status == "pending" ? <h2 style={{fontWeight:'bold',paddingLeft:'7px' ,marginBottom:'5px' , color:'#ffc53d'}}>รอการส่งเลขพัlดุ</h2>:
        Order.status == "success" ? <h2 style={{fontWeight:'bold',paddingLeft:'7px' ,marginBottom:'5px' , color:'green'}}>เสร็จสิ้น</h2>:
        <h2 style={{fontWeight:'bold',paddingLeft:'7px' ,marginBottom:'5px' , color:'#cf1322'}}>ยกเลิกคำสั่งซื้อ</h2>
        }
     </div>
      </div>
      <h3 style={{ marginTop: "20px", fontWeight: "" }}>รายการสินค้า :</h3>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ position: ["none"] }}
      />

      <div
        style={{
          display: "block",
          float: "right",
          marginTop: "30px",
          textAlign: "start",
          marginLeft: "500px",
          width:'200px'
        }}
      >
        <h3>ราคาสินค้า : {Order.pricePD * Order.quantityPD}</h3>
        <h3>ค่าจัดส่ง : {Order.shippingCostPD}</h3>
        <h3>ส่วนลด : {Order.totalPrice}</h3>
        <h1>รวม : {Order.totalPrice}</h1>
      </div>
      <div style={{ marginTop: "30px"}}>
        <h3>ที่อยู่: {" "} {Order.addressOrder}</h3>
        
      </div>
      {Order.status == "success" &&
      <div style={{ marginTop: "30px" }}>
      <h2>หมายเลขพัสดุ: {" "} </h2>
      <h3>บริษัทขนส่งสินค้า : {" "} {Order.deliveryCompany}</h3>
      <h3>รหัสพัสดุ : {" "} {Order.trackingNumber}</h3>
      <Button onClick={()=>GoToLinkDelivery()}>ตรวจสอบเลขพัสดุ</Button>
    </div>}
    {Order.status == "reject" &&
      <div style={{ marginTop: "30px" }}>
      <h2>หมายเหตุจากผู้ขาย {" "} {Order.rejectText} </h2>
      <h3>สามารถติดต่อได้ที่ : {" "} {Order.addressSeller}</h3>
    </div>}
      
      
      

    
      <Modal
        title="หลักฐานการชำระเงิน"
        visible={modalCheckPaymentIsOpen}
        onOk={() => setmodalCheckPaymentIsOpen(false)}
        onCancel={() => setmodalCheckPaymentIsOpen(true)}
        footer={[
          <Button key="back" onClick={() => setmodalCheckPaymentIsOpen(false)}>
            ยืนยัน
          </Button>,
        ]}
      >
        <img style={{ width: "100%" }} src={Order.imagesPayment} />
      </Modal>

      <Modal
        title="คำสั่งซื้อของคุณถูกปฏิเสธ"
        visible={modalTextReject}
        footer={[
          <Button key="back" onClick={() => setmodalTextReject(false)}>
            ยืนยัน
          </Button>,
        ]}
      >
        <h2>เหตุผล :</h2>
        <h3>{Order.rejectText}</h3>
      </Modal>
    </div>
  );
}

export default DetailOrderPage