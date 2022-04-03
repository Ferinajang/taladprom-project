
import Axios from 'axios'
import { Row, Col,Table,Select ,Button,Input,Tooltip ,Modal,Steps,message,notification,Popconfirm} from 'antd';
import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { addToCart } from '../../../_actions/user_actions';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import HeaderHomeSeller from '../SlideMenuHomeSeller/HeaderHomeSeller';

import 'antd/dist/antd.css';
import { Image } from 'antd';


const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

function DetailOrderSellerPage(props) {
    const dispatch = useDispatch();
    const orderId = props.match.params.orderId
    const [Order, setOrder] = useState([])
    const [modalCheckPaymentIsOpen, setmodalCheckPaymentIsOpen] = useState(false)
    const [trackingNumber, settrackingNumber] = useState("")
    const [Product, setProduct] = useState([])
    const [addess, setaddess] = useState("")
    const [color, setcolor] = useState("red")
    const [imagePayment, setimagePayment] = useState("")
    const [deliveryCompany, setdeliveryCompany] = useState("")
    const [rejectText, setrejectText] = useState("")
    const [ModaCancelOrder, setModaCancelOrder] = useState(false)
    const [addessSeller, setaddessSeller] = useState("")

    console.log(imagePayment);


    useEffect(()=>{
        //console.log(props.match.params.productId);
        document.getElementById("HeaderHome").style.display = "none";
        document.getElementById("Footer").style.display = "none";
        Axios.get(`/api/order/order_by_id?id=${orderId}&type=single`)
        .then(response=>{
            setOrder(response.data[0])
            setimagePayment(response.data[0].imagesPayment)
            console.log(response.data[0]);
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
    const handleChange =(value)=>{
      if(value == "1"){
        setdeliveryCompany("ไปรษณีย์ไทย")
      }else if(value == "2"){
        setdeliveryCompany("J&T EXPRESS")
      }else if(value == "3"){
        setdeliveryCompany("BEST EXPRES")
      }else if(value == "4"){
        setdeliveryCompany("Kerry Express")
      }else if(value == "5"){
        setdeliveryCompany("FLASH EXPRESS")
      }else if(value == "6"){
        setdeliveryCompany("Ninja Van")
      }else if(value == "7"){
        setdeliveryCompany("DHL Express")
      }else if(value == "8"){
        setdeliveryCompany("SAlpha Fast")
      }else if(value == "9"){
        setdeliveryCompany("SCG EXPRESS")
      }else if(value == "10"){
        setdeliveryCompany("Nim Express")
      }
    }
    console.log(deliveryCompany);

    const confirmOrder=() =>{  
        const variables ={
            id:Order._id,
            status:"pending",
           
        }
        Axios.put('/api/order/editConfirmOrder',variables)
              .then(response =>{
                  if(response.data.success){
                    let placement ="top";
                    notification.success({
                      message: 'ยืนยันคำสั่งซื้อเสร็จสิ้น',
                      description:
                        'ยืนยันคำสั่งซื้อเสร็จสิ้น อย่าลืมส่งเลขพัสดุนะ!!',
                        placement
                    });
                  }else{
                      alert(response)
                  }
              })

    }
    const openNotificationWithIcon = () => {
      let placement ="top";
      notification.success({
        message: 'ส่งเลขพัสดุเสร็จสิ้น',
        description:
          'ส่งชื่อบริษัทขนส่งสินค้าและเลขพัสดุสำเร็จ',
          placement
      });
    };

    const sendTrackingNumber = () => {
      if(trackingNumber ==""){
        message.error('กรุณากรอกเลขพัสดุ');
      }
      else if(deliveryCompany =="" ){
        message.error('กรุณาเลือกบริษัทขนส่งสินค้า');

      }else{
        const variables = {
          id: Order._id,
          status: "success",
          trackingNumber: trackingNumber,
          deliveryCompany:deliveryCompany
        };
  
        Axios.put("/api/order/editConfirmOrder", variables).then((response) => {
          if (response.data.success) {
            openNotificationWithIcon()
          } else {
            alert(response);
          }
        });
      }
     
    };

    const onTrackingChange =(event)=>{
      settrackingNumber(event.currentTarget.value)
  }

  const onChangeTextReject =(event)=>{
    console.log(event.currentTarget.value);
    setrejectText(event.currentTarget.value)

  }
  
  const onChangeaddressSeller =(event)=>{
    console.log(event.currentTarget.value);
    setaddessSeller(event.currentTarget.value)

  }

  const cancelOrder=()=>{
    setModaCancelOrder(false)
    const variables = {
      id: Order._id,
      status: "reject",
      rejectText:rejectText,
      addessSeller:addessSeller
    };
    Axios.put("/api/order/rejectOrder", variables).then((response) => {
      if (response.data.success) {
        let placement ="top";
        notification.success({
          message: 'ยกเลิกรายการสั่งซื้อ',
          description:
            'ยกเลิกรายการสั่งซื้อสำเร็จ',
            placement
        });
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

  return (
    <div className="postPage" style={{ width: "90%", padding: "2rem 4rem" ,marginLeft:'90px'}}>
      <div style={{ display: "block", justifyContent: "center" }}>

      {Order.status == "Not Confirmed" ?
      <div style={{marginBottom:'15px'  }}>
          <Steps current={0}>
            <Step status="process" title="รอการยืนยันออเดอร์" icon={<UserOutlined />} />
            <Step status="wait" title="รอการส่งเลขพัสดุ" icon={<SolutionOutlined />}/>
            <Step status="wait" title="เสร็จสิ้น" icon={<SmileOutlined />} />
          </Steps>
        </div>:
        Order.status == "pending" ?
        <div style={{marginBottom:'15px'  }}>
        <Steps current={0}>
          <Step status="finish" title="รอการยืนยันคำสั่งซื้อ" icon={<UserOutlined />} />
          <Step status="process" title="รอการส่งเลขพัสดุ" icon={<SolutionOutlined />}/>
          <Step status="wait" title="เสร็จสิ้น" icon={<SmileOutlined />} />
        </Steps>
      </div>:  Order.status == "success" ?
      <div style={{marginBottom:'15px'  }}>
      <Steps current={0}>
        <Step status="finish" title="รอการยืนยันคำสั่งซื้อ" icon={<UserOutlined />} />
        <Step status="finish" title="รอการส่งเลขพัสดุ" icon={<SolutionOutlined />}/>
        <Step status="process" title="เสร็จสิ้น" icon={<SmileOutlined />} />
      </Steps>
    </div>:
      <div style={{marginBottom:'15px'  }}>
      <Steps current={0}>
        <Step status="finish" title="รอการยืนยันคำสั่งซื้อ" icon={<UserOutlined />} />
        <Step status="finish" title="รอการส่งเลขพัสดุ" icon={<SolutionOutlined />}/>
        <Step status="process" title="ยกเลิกคำสั่งซื้อ" icon={<SmileOutlined />} />
      </Steps>
    </div>
    
     }
    
     <h1>Order NO : {Order._id}</h1>
     <div  style={{display:'flex'}} >
        <h2 style={{fontWeight:'bold' }}>สถานะคำสั่งซื้อ :</h2>
        {Order.status == "Not Confirmed" ? <h2 style={{fontWeight:'bold',paddingLeft:'7px' ,marginBottom:'5px' , color:'red'}} >รอการยืนยันคำสั่งซื้อ</h2>:
        Order.status == "pending" ? <h2 style={{fontWeight:'bold',paddingLeft:'7px' ,marginBottom:'5px' , color:'#ffc53d'}}>รอการส่งเลขพัสดุ</h2>:
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
        {Order.status == "success" || Order.status =="pending" ?
        <div style={{ display: "grid" }}>
          
          </div> :
          <div style={{ display: "grid" }}>
            <Tooltip
              title="ตรวจสอบความถูกต้องก่อนยืนยัน "
              color={color}
              key={color}
            >
              <Button size='large' type="primary" style={{ marginBottom: "20px", background: "#7cb305", borderColor: '#7cb305' }} onClick={confirmOrder}>
                ยืนยันออเดอร์
              </Button>
            </Tooltip>
            <Button size='large' style={{ marginBottom: "20px" }} type="primary" danger={true} onClick={()=>setModaCancelOrder(true)}>
              ยกเลิกออเดอร์
            </Button>
          </div>}
        
      </div>
      <div style={{ marginTop: "30px" }}>
        <h3>ที่อยู่ที่ต้องจัดส่ง</h3>
        <h4>{Order.addressOrder}</h4>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>ตรวจสอบหลักฐานการชำระเงิน</h3>
        <Button style={{ marginBottom: "20px" }} onClick={checkImagePayment}>
          หลักฐานการชำระเงิน
        </Button>
      </div>
      <br />
      {Order.status == "pending" ? (
        <div style={{ width: 400, padding: "15px", border: '3px solid #1890ff',borderRadius:'15px' }}>
          <h3 style={{ marginBottom: "5px", fontWeight: "500" }}>
            เลือกบริษัทขนส่ง
          </h3>
          <Select
            style={{ width: 200, marginBottom: "10px" }}
            placeholder="เลือกบริษัทขนส่งพัสดุ"
            onChange={handleChange}
          >
            <Option value="1">ไปรษณีย์ไทย</Option>
            <Option value="2">J&T EXPRESS </Option>
            <Option value="3">BEST EXPRES</Option>
            <Option value="4">Kerry Express</Option>
            <Option value="5">FLASH EXPRESS</Option>
            <Option value="6">Ninja Van</Option>
            <Option value="7">DHL Express</Option>
            <Option value="8">SAlpha Fast</Option>
            <Option value="9">SCG EXPRESS</Option>
            <Option value="10">Nim Express</Option>
          </Select>
          <br />
          <h3>กรอกหมายเลขพัสดุ</h3>
          <Input
            type="text"
            onChange={onTrackingChange}
            placeholder="หมายเลขเลขพัสดุ"
            allowClear
          ></Input>
          <Button style={{ marginTop: "20px" }} onClick={sendTrackingNumber}>
            ส่งหมายเลขพัสดุ
          </Button>
        </div>
      ) : (
        <div></div>
      )}

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
        title="แจ้งลูกค้าของคุณ"
        visible={ModaCancelOrder}
        footer={[
          <Popconfirm
            title="คุณต้องการปฏิเสธคำสั่งซื้อนี้?"
            onConfirm={cancelOrder}
            onCancel={() => setModaCancelOrder(false)}
            okText="ใช่"
            cancelText="ยกเลิก"
          >
            <Button key="back" danger >
              ยืนยัน
            </Button>
          </Popconfirm>,
          
          <Button key="back" onClick={() => setModaCancelOrder(false)}>
          ยกเลิก
        </Button>,
        ]}
      >
        <h3>ส่งข้อความถึงลูกค้าเพื่อบอกสาเหตุการยกเลิกรายการคำสั่งซื้อ</h3>
        
        <TextArea showCount maxLength={100} onChange={onChangeTextReject} />
        <h2>ข้อมูลการติดต่อ</h2>
        <TextArea showCount maxLength={100} onChange={onChangeaddressSeller} />
      </Modal>
    </div>
  );
}

export default DetailOrderSellerPage