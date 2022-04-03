import React, { useEffect, useState } from 'react'
import { Radio ,Input, Button,DatePicker,Col,Card,Row,Tabs,Popover,message,InputNumber } from 'antd';
import Modal from "react-modal";
import "./CreateCoupon.css"
import { MdClear } from "react-icons/md";
import Axios from 'axios'
import moment from "moment";
import {useDispatch} from 'react-redux'
import CountDownTimeOut from './Section/CountDownTimeOut';
import HeaderHomeSeller from '../SlideMenuHomeSeller/HeaderHomeSeller';
const { TabPane } = Tabs;

function CreateCoupon(props) {
  const [value1, setvalue1] = useState("");
  const [value2, setvalue2] = useState("");
  const [value3, setvalue3] = useState("");
  const [value1_1, setvalue1_1] = useState("");
  const [value1_2, setvalue1_2] = useState("");
  const [value2_1, setvalue2_1] = useState("");
  const [value2_2, setvalue2_2] = useState("");
  const [value3_1, setvalue3_1] = useState("");
  const [value3_2, setvalue3_2] = useState("");
  const [ModalFreeShipping, setModalFreeShipping] = useState(false);
  const [ModalPersent, setModalPersent] = useState(false);
  const [ModalDiscount, setModalDiscount] = useState(false);
  const [typeCoupon, settypeCoupon] = useState("")
  const [minimumCost, setminimumCost] = useState(0)
  const [dateCoupon, setdateCoupon] = useState("")
  const [dateCouponTimeOut, setdateCouponTimeOut] = useState("")
  const [NameCoupon, setNameCoupon] = useState("")
  const [ModalChooseTypeCoupon, setModalChooseTypeCoupon] = useState(false)
  const [CouponShop, setCouponShop] = useState([])
  const dispatch = useDispatch();
  const [discount, setdiscount] = useState(0)
  const [deadline, setdeadline] = useState("")
  const [QuantityAddCoupon, setQuantityAddCoupon] = useState(0)
  const [ModalQuantityAddCoupon, setModalQuantityAddCoupon] = useState(false)
  const dateFormat = 'MMMM, D ,YYYY';
  

  console.log(CouponShop);


  
  useEffect(( ) => {
    document.getElementById("HeaderHome").style.display = "none";

    Axios.post("/api/coupon/getCoupon").then((response) => {
      if (response.data.success) {
        setCouponShop(response.data.coupon)
      } else {
        alert("Fialed to fecth data from mongodb");
      }
    });
    
}, [])

const timeOut =(time)=>{
  console.log(time);
  let d = time[0].toString()
  let h = time[1].toString()
  let m = time[2].toString()
  console.log(d,h,m);

}
const callback =(key)=>{
  console.log(key);
}

const content =(coupon)=>{
  return(
    <CountDownTimeOut deadline={coupon.dateTimeOut}/>
  )
   
}

const renderCardsCouponShopHaveOwner=
CouponShop.map((coupon, index) => {
  if(!props.user.userData){
    //console.log("fffff");
}else{
  if(coupon.shopID == props.user.userData.shopID && coupon.status == "have owner"){
  return (
      // <Col  lg={10} md={8} xs={24} style={{alignItems:'center'}}>
         <Popover placement="topLeft" title="คูปองจะหมดอายุในอีก" content={content(coupon)}>
          <Card style={{width:'500px' , height:'25vh',margin:'10px'}}>
            <div style={{ display: "flex" }}>
              {coupon.typeCoupon == "DiscountPercent" ? (
                <div style={{width:'100px' , height:'20vh'}}>
                <img
                  width={150}
                  src={
                    "https://www.img.in.th/images/fd1e9e737f10d57e83de226ae2596cd7.png"
                  }
                />
                </div>
              ) : coupon.typeCoupon == "DiscountMoney" ? (
                <div style={{width:'100px' , height:'20vh'}}>
                <img
                  width={150}
                  src={
                    "https://www.img.in.th/images/a44a84ab639f73bbf1dd7c1a4a7bea44.png"
                  }
                />
                </div>
              ) : (
                <div style={{width:'100px' , height:'20vh'}}>
                   <img
                  width={150} 
                  src={
                    "https://www.img.in.th/images/77f1a34f63a45579a90d641902a26dfa.png"
                  }
                />
                </div>
               
              )}
              <div style={{ display: "block", marginLeft: "60px" ,textAlign:'left'}}>
                <h2>{coupon.nameCoupon}</h2>
                <p>ร้าน {coupon.shopName}</p>
                <p>ส่วนลด {coupon.discount} บาท</p>
                <p>ยอดสั่งซื้อขั้นต่ำ {coupon.minimumCost} บาท</p>
              </div>
              <div style={{float:'right'}}>
              {/* <Button>รับคูปอง</Button> */}
            </div>
            </div>
          </Card>
         </Popover>
      // </Col>
    );
                }
              
}});

const renderCardsCouponShopNoOwner=
CouponShop.map((coupon, index) => {
  if(!props.user.userData){
    //console.log("fffff");
}else{
  if(coupon.shopID == props.user.userData.shopID && coupon.status == "no owner"){
  return (
      // <Col  lg={10} md={8} xs={24} style={{alignItems:'center'}}>
         <Popover placement="topLeft" title="คูปองจะหมดอายุในอีก" content={content(coupon)}>
          <Card style={{width:'500px' , height:'25vh',margin:'10px'}}>
            <div style={{ display: "flex" }}>
               {coupon.typeCoupon == "DiscountPercent" ? (
                <div style={{width:'100px' , height:'20vh'}}>
                <img
                  width={150}
                  src={
                    "https://www.img.in.th/images/fd1e9e737f10d57e83de226ae2596cd7.png"
                  }
                />
                </div>
              ) : coupon.typeCoupon == "DiscountMoney" ? (
                <div style={{width:'100px' , height:'20vh'}}>
                <img
                  width={150}
                  src={
                    "https://www.img.in.th/images/a44a84ab639f73bbf1dd7c1a4a7bea44.png"
                  }
                />
                </div>
              ) : (
                <div style={{width:'100px' , height:'20vh'}}>
                   <img
                  width={150} 
                  src={
                    "https://www.img.in.th/images/77f1a34f63a45579a90d641902a26dfa.png"
                  }
                />
                </div>
               
              )}
              <div style={{ display: "block", marginLeft: "70px" ,textAlign:'left',width:'100%'}}>
                <h2>{coupon.nameCoupon}</h2>
                <p>ร้าน {coupon.shopName}</p>
                <p>ส่วนลด {coupon.discount} บาท</p>
                <p>ยอดสั่งซื้อขั้นต่ำ {coupon.minimumCost} บาท</p>
              </div>
              <div style={{float:'right'}}>
              {/* <Button>รับคูปอง</Button> */}
            </div>
            </div>
          </Card>
         </Popover>
      // </Col>
    );
                }
              
}});


const renderCardsCouponShopTimeOut=
CouponShop.map((coupon, index) => {
  if(!props.user.userData){
    //console.log("fffff");
}else{
  if(coupon.shopID == props.user.userData.shopID && coupon.status == "timeOut"){
  return (
    // <Col  lg={10} md={8} xs={24} style={{alignItems:'center'}}>
    <Popover placement="topLeft" title="คูปองจะหมดอายุในอีก" content={content(coupon)}>
     <Card style={{width:'500px' , height:'25vh',margin:'10px'}}>
       <div style={{ display: "flex" }}>
          {coupon.typeCoupon == "DiscountPercent" ? (
           <div style={{width:'100px' , height:'20vh'}}>
           <img
             width={150}
             src={
               "https://www.img.in.th/images/fd1e9e737f10d57e83de226ae2596cd7.png"
             }
           />
           </div>
         ) : coupon.typeCoupon == "DiscountMoney" ? (
           <div style={{width:'100px' , height:'20vh'}}>
           <img
             width={150}
             src={
               "https://www.img.in.th/images/a44a84ab639f73bbf1dd7c1a4a7bea44.png"
             }
           />
           </div>
         ) : (
           <div style={{width:'100px' , height:'20vh'}}>
              <img
             width={150} 
             src={
               "https://www.img.in.th/images/77f1a34f63a45579a90d641902a26dfa.png"
             }
           />
           </div>
          
         )}
         <div style={{ display: "block", marginLeft: "70px" ,textAlign:'left',width:'100%'}}>
           <h2>{coupon.nameCoupon}</h2>
           <p>ร้าน {coupon.shopName}</p>
           <p>ส่วนลด {coupon.discount} บาท</p>
           <p>ยอดสั่งซื้อขั้นต่ำ {coupon.minimumCost} บาท</p>
         </div>
         <div style={{float:'right'}}>
         {/* <Button>รับคูปอง</Button> */}
       </div>
       </div>
     </Card>
    </Popover>
//  </Col>
    );
                }          
}});
//////////////////////////////////////////



 




///////////////////////////////////////////


 
 


  const onChange1 = (e) => {
    console.log("radio1 checked", e.target.value);
    setvalue1("1check");
    console.log("ddd", value1);
    // setvalue2(false)
    // setvalue3(false)
  };
  const onChange1_1 = (e) => {
    setvalue1_1("1check_noShipping");
    document.getElementById("1_2").style.display = "none";
  };
  const onChange1_2 = (e) => {
    console.log("radio1๘2 checked", e.target.value);
    document.getElementById("1_2").style.display = "block";
  };

  const onChange2 = (e) => {
    console.log("radio1 checked", e.target.value);
  };

  const onChange2_1 = (e) => {
    console.log("radio2 checked", e.target.value);
    document.getElementById("2_2").style.display = "none";
  };
  const onChange2_2 = (e) => {
    console.log("radio2 checked", e.target.value);
    document.getElementById("2_2").style.display = "block";
  };
  const onChange3 = (e) => {
    console.log("radio1 checked", e.target.value);
  };

  const onChange3_1 = (e) => {
    document.getElementById("3_2").style.display = "none";
  };
  const onChange3_2 = (e) => {
    document.getElementById("3_2").style.display = "block";
  };
  const onChangeDate =(data,dataString)=>{
    setdateCouponTimeOut(dataString)
    setdateCoupon(moment().format('MMMM, D ,YYYY'))
    
  }
  const ModalFreeShippingOpen = () => {
    setModalChooseTypeCoupon(false)
    settypeCoupon("FreeShipping")
    setdiscount()
    setNameCoupon("คูปองส่งฟรี")
    setModalFreeShipping(true);
  };
  const ModalPercentOpen = () => {
    setModalChooseTypeCoupon(false)
    settypeCoupon("DiscountPercent")
    setNameCoupon("คูปองส่วนลดแบบเปอร์เซ็น")
    setModalPersent(true);
    

  };
  const ModalDiscountOpen = () => {
    setModalChooseTypeCoupon(false)
    settypeCoupon("DiscountMoney")
    setNameCoupon("คูปองส่วนลดแบบจำนวนเงิน")
    setModalDiscount(true);
    
  };
  const onChangeFreeShip=(event)=>{
    setminimumCost(event.currentTarget.value)

  }
  const onChangePercent=(event)=>{
    
    // alert(event.currentTarget.value)
    if(event.currentTarget.value > 100 ){
      alert("ส่วนลดคูปองไม่สามารถเกิน 100% ได้ กรุณากรอกใหม่อีกครั้ง")
    }
    setdiscount(event.currentTarget.value)
  }
  const onChangeDiscount=(event)=>{
    
    setdiscount(event.currentTarget.value)
  }
  const onChangeMiniumCost =(event)=>{
    setminimumCost(event.currentTarget.value)

  }
 
  
  const createCoupon =()=>{
    if(discount<1){
      message.error('กรุณากำหนดส่วนลด');
    }else if(!dateCouponTimeOut){
      message.error('กรุณากำหนดวันหมดอายุของคูปอง');
    }else if(!typeCoupon  || !NameCoupon ){
      message.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง ');
    }else{
      if(typeCoupon == "FreeShipping")
      {
        setdiscount(0)
      }
       const variables ={
        OwnerName : "",
        OwnerID  : "",
        shopID:props.user.userData.shopID,
        shopName:props.user.userData.shopName,
        dateCoupon:dateCoupon,
        dateTimeOut : dateCouponTimeOut,
        typeCoupon: typeCoupon,
        minimumCost:minimumCost ,
        nameCoupon:NameCoupon,
        status:"no owner",
        discount:discount
    }
   
    for(let i=0;i<QuantityAddCoupon;i++){
      Axios.post('/api/coupon/createCoupon',variables)
    .then(response =>{
        if(response.data.success){
          console.log(response.data.coupon);
          setdateCoupon("")
          setminimumCost(0)
          setdiscount(0)
          settypeCoupon("")
          message.success('สร้างคูปองเสร็จสิ้น');
          setModalFreeShipping(false)
          setModalPersent(false)
          setModalDiscount(false)
        }else{
            alert('failed to upload')
        }
    })


    }
    
    }
}

const chooseTypeCoupon =()=>{
  setModalChooseTypeCoupon(true)
}
const onChangeQuantityAddcoupon =(value)=>{
  setQuantityAddCoupon(value)
}


  return (
    <div style={{ marginTop:'-69px'}}>
       <HeaderHomeSeller />
      <div >
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>     
      </div>
    
    <div>
      <Button
        style={{ float: "right", marginRight: "70px" }}
        size="large"
        onClick={chooseTypeCoupon}
      >
        สร้างคูปอง
      </Button>
      <div>
        <h1
          style={{
            textAlign: "center",
            marginLeft: "180px",
            fontWeight: "bolder",
          }}
        >
          คูปองภายในร้านของคุณ
        </h1>
      </div>

      <div style={{ display: "block" }}>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            flexDirection: "row",
            width: "100%",
            height: "70vh",
          }}
        >
          <Tabs
            defaultActiveKey="1"
            onChange={callback}
            style={{
              marginTop: "30px",
              marginRight: "50px",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TabPane tab="คูปองส่วนลดยังไม่ถูกเก็บ" key="1">
              <div style={{ width: "100%", }}>
              <div style={{ width: "100%", alignItems: "center" }}>
              <Row gutter={[12, 12]} style={{ alignItems: "center" ,marginLeft:'250px'}}>
                  {renderCardsCouponShopNoOwner}
                </Row>
                </div>
              </div>
            </TabPane>
            <TabPane tab="คูปองส่วนลดถูกเก็บแล้ว" key="2">
            <div style={{ width: "100%", alignItems: "center" ,margin:'auto'}}>
              <Row gutter={[12, 12]} style={{ alignItems: "center",marginLeft:'250px' }}>
                {renderCardsCouponShopHaveOwner}
              </Row>
              </div>
            </TabPane>
            <TabPane
              tab="คูปองส่วนลดถูกใช้แล้ว/หมดเวลา"
              style={{ alignItems: "center" }}
              key="3"
            >
             <div style={{ width: "100%", alignItems: "center" ,margin:'auto'}}>
              <Row gutter={[12, 12]} style={{ alignItems: "center" ,marginLeft:'250px' }}>
                  {renderCardsCouponShopTimeOut}
                </Row>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>

      <Modal className="modal-create-coupon-shipping" isOpen={ModalFreeShipping}>
        <div
          style={{
            height: "15px",
            fontSize: "25px",
            textAlign: "right",
            marginRight: "20px",
            marginTop: "10px",
          }}
          onClick={() => setModalFreeShipping(false)}
        >
          <MdClear style={{ cursor: "pointer" }} />
        </div>
        <ul>
          <h1 style={{ fontWeight: "bolder" }}>คูปองส่งฟรี</h1>
          <div
            style={{
              marginTop: "10px",
              width: "70%",
              height: "20vh",
            }}
          >
            <h3 style={{ fontWeight: "bolder" }}>
              เลือกรูปแบบยอดสั่งซื้อขั้นต่ำ
            </h3>
            <Radio.Group>
              <Radio
                onChange={onChange1_1}
                value={1}
                style={{ fontSize: "16px" }}
              >
                ไม่มียอดซื้อขั้นต่ำ
              </Radio>
              <Radio
                onChange={onChange1_2}
                value={2}
                style={{ fontSize: "16px" }}
              >
                มียอดซื้อขั้นต่ำ
              </Radio>
            </Radio.Group>
            <div id="1_2" style={{ display: "none", marginTop: "20px" }}>
              <h3 style={{ fontWeight: "bolder" }}>กรุณากรอกยอดซื้อขั้นต่ำ</h3>
              <label style={{ marginRight: "20px" }}>
                {"\n"}ยอดซื้อขั้นต่ำ
              
              <Input
                style={{ width: "100px" }}
                type="number"
                onChange={onChangeFreeShip}
              ></Input>
              บาท
              </label>
            </div>
            <div style={{ marginTop: "8px", fontWeight: "bolder" }}>
              <h3 style={{ fontWeight: "bolder" }}>เลือกวันหมดอายุของคูปอง</h3>
              <DatePicker onChange={onChangeDate} format={dateFormat} />
            </div>
            <div style={{ width: "100px", marginTop: "10px" }}>
              <Button 
              style={{
                width: "180px",
                backgroundColor: "#2F2851",
                color: "white",
                borderColor: "#2F2851",
                borderRadius: "15px",
              }}
              size="large" onClick={() => setModalQuantityAddCoupon(true)}>สร้างคูปอง</Button>
            </div>
        
          </div>
        </ul>
      </Modal>

      <Modal className="modal-create-coupon-percent" isOpen={ModalPersent}>
        <div
          style={{
            height: "15px",
            fontSize: "25px",
            textAlign: "right",
            marginRight: "20px",
            marginTop: "10px",
          }}
          onClick={() => setModalPersent(false)}
        >
          <MdClear style={{ cursor: "pointer" }} />
        </div>
        <ul>
          <h1 style={{ fontWeight: "bolder" }}>คูปองส่วนลดแบบเปอร์เซ็น</h1>
          <h3 style={{ fontWeight: "bolder" }}>
              กรอกส่วนลด
            </h3>
          <div
            style={{
              marginTop: "10px",
              width: "70%",
              display:'flex'
            }}
          >
            <h3 style={{ marginRight:'10px' }} >ส่วนลด</h3>
            <Input
              style={{ width: "150px" }}
              type="number"
              onChange={onChangePercent}
            ></Input>
            <h3 style={{ marginLeft:'10px' }}>{" "}เปอร์เซ็น</h3>
            
          </div>
          <div style={{ marginTop: "10px" }}>
          <h3 style={{ fontWeight: "bolder" }}>
              เลือกรูปแบบยอดสั่งซื้อขั้นต่ำ
            </h3>
            <Radio.Group>
              <Radio onChange={onChange2_1} value={1}>
                ไม่มียอดซื้อขั้นต่ำ
              </Radio>
              <Radio onChange={onChange2_2} value={2}>
                มียอดซื้อขั้นต่ำ
              </Radio>
            </Radio.Group>
            
            <div id="2_2" style={{ display: "none", marginTop: "20px" }}>
            <h3 style={{ fontWeight: "bolder" }}>กรุณากรอกยอดซื้อขั้นต่ำ</h3>
              <label style={{ marginRight: "20px" }}>
                {"\n"}ยอดซื้อขั้นต่ำ
                
              <Input
                style={{ width: "100px" }}
                type="number"
                onChange={onChangeMiniumCost}
              ></Input>
                บาท</label>
            </div>
            <div style={{ marginTop: "8px", fontWeight: "bolder" }}>
              <h3 style={{ fontWeight: "bolder" }}>เลือกวันหมดอายุของคูปอง</h3>
              <DatePicker onChange={onChangeDate} format={dateFormat} />
            </div>
            <div style={{ width: "100px", marginTop: "20px" }}>
              <Button  style={{
                width: "180px",
                backgroundColor: "#2F2851",
                color: "white",
                borderColor: "#2F2851",
                borderRadius: "15px",
              }}
              size="large"
              onClick={() => setModalQuantityAddCoupon(true)}>สร้างคูปอง</Button>
            </div>
          </div>
        </ul>
      </Modal>
      

      <Modal className="modal-create-coupon-money" isOpen={ModalDiscount}>
        <div
          style={{
            height: "15px",
            fontSize: "25px",
            textAlign: "right",
            marginRight: "20px",
            marginTop: "10px",
          }}
          onClick={() => setModalDiscount(false)}>
          <MdClear style={{ cursor: "pointer" }} />
        </div>
        <div style={{ textAlign: "Left", marginTop: "5px" }}>
          <ul>
            <h1 style={{ fontWeight: "bolder" }}>คูปองส่วนลดแบบจำนวนเงิน</h1>
            <h3 style={{ fontWeight: "bolder" }}>
              กรอกส่วนลด
            </h3>
          <div
            style={{
              marginTop: "10px",
              width: "70%",
              display:'flex'
            }}
          >
            <h3 style={{ marginRight:'10px' }} >ส่วนลด</h3>
              <Input
                style={{ width: "100px" }}
                type="number"
                onChange={onChangeDiscount}
              ></Input>
              <h3> บาท</h3>
            </div>
            <div style={{ marginTop: "10px" }}>
            <h3 style={{ fontWeight: "bolder" }}>
              เลือกรูปแบบยอดสั่งซื้อขั้นต่ำ
            </h3>
              <Radio.Group>
                <Radio onChange={onChange3_1} value={1}>
                  ไม่มียอดซื้อขั้นต่ำ
                </Radio>
                <Radio onChange={onChange3_2} value={2}>
                  มียอดซื้อขั้นต่ำ
                </Radio>
              </Radio.Group>
              </div>

             
              <div id="3_2" style={{ display: "none", marginTop: "20px" }}>
            <h3 style={{ fontWeight: "bolder" }}>กรุณากรอกยอดซื้อขั้นต่ำ</h3>
              <label style={{ marginRight: "20px" }}>
                {"\n"}ยอดซื้อขั้นต่ำ
              <Input
                style={{ width: "100px" }}
                type="number"
                onChange={onChangeMiniumCost}
              ></Input>
              บาท</label>
              </div>

            <div style={{ marginTop: "8px", fontWeight: "bolder" }}>
              <h3 style={{ fontWeight: "bolder" }}>เลือกวันหมดอายุของคูปอง</h3>
              <DatePicker onChange={onChangeDate} format={dateFormat} />
            </div>

            <div style={{ width: "100px", marginTop: "20px" }}>
              <Button  style={{
                width: "180px",
                backgroundColor: "#2F2851",
                color: "white",
                borderColor: "#2F2851",
                borderRadius: "15px",
              }}
              size="large"
              onClick={() => setModalQuantityAddCoupon(true)}>สร้างคูปอง</Button>
            </div>
          </ul>
        </div>
      </Modal>

      <Modal className="modal-create-coupon" isOpen={ModalChooseTypeCoupon}>
        <div
          style={{
            height: "15px",
            fontSize: "25px",
            textAlign: "right",
            marginRight: "20px",
            marginTop: "10px",
          }}
          onClick={() => setModalChooseTypeCoupon(false)}
        >
          <MdClear style={{ cursor: "pointer" }} />
        </div>
        <div style={{ textAlign: "Left", marginTop: "5px", display: "block" }}>
          <h1 style={{ textAlign: "center", fontWeight: "bolder" }}>
            เลือกชนิดของคูปอง
          </h1>
          <div
            style={{
              textAlign: "center",
              alignItems: "center",
              width: "456px",
              height: "10vh",
              marginLeft: "20px",
            }}
          >
            <Button
              style={{
                margin: "5px",
                width: "180px",
                textAlign: "center",
                backgroundColor: "#2F2851",
                color: "white",
                borderColor: "#2F2851",
                borderRadius: "15px",
              }}
              size="large"
              onClick={ModalFreeShippingOpen}
            >
              ส่งฟรี
            </Button>
            <br></br>
            <Button
              style={{
                margin: "5px",
                width: "180px",
                backgroundColor: "#2F2851",
                color: "white",
                borderColor: "#2F2851",
                borderRadius: "15px",
              }}
              size="large"
              onClick={ModalPercentOpen}
            >
              ส่วนลดแบบเปอร์เซ็น
            </Button>
            <br></br>
            <Button
              style={{
                margin: "5px",
                width: "180px",
                backgroundColor: "#2F2851",
                color: "white",
                borderColor: "#2F2851",
                borderRadius: "15px",
              }}
              size="large"
              onClick={ModalDiscountOpen}
            >
              ส่วนลดแบบจำนวนเงิน
            </Button>
          </div>
        </div>
      </Modal>

      <Modal className="modal-add-quantity" isOpen={ModalQuantityAddCoupon}>
        <div
          style={{
            height: "15px",
            fontSize: "25px",
            textAlign: "right",
            marginRight: "20px",
            marginTop: "10px",
          }}
          onClick={() => setModalQuantityAddCoupon(false)}
        >
          <MdClear style={{ cursor: "pointer" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: "5px", display: "block" }}>
         <h2 style={{ textAlign: "center",fontWeight:'bold' }}>โปรดระบุจำนวนที่ต้องการสร้างคูปอง</h2>
         <InputNumber style={{ textAlign: "center",marginTop:'5px' }} min={1} max={100} defaultValue={1} onChange={onChangeQuantityAddcoupon} />
         <br/>
         <Button
              style={{
                margin: "5px",
                marginTop:'20px',
                width: "150px",
                backgroundColor: "#2F2851",
                color: "white",
                borderColor: "#2F2851",
                borderRadius: "15px",
              }}
              size="large"
              onClick={createCoupon}
            >
              สร้างคูปอง
            </Button>
        </div>
        
      </Modal>

    </div>
    </div>
  );
}

export default CreateCoupon;