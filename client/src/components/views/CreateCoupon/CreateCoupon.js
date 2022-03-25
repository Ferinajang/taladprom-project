import React, { useEffect, useState } from 'react'
import { Radio ,Input, Button,DatePicker,Col,Card,Row} from 'antd';
import Modal from "react-modal";
import "./CreateCoupon.css"
import { MdClear } from "react-icons/md";
import Axios from 'axios'
import moment from "moment";
import {useDispatch} from 'react-redux'
import CountDownTimeOut from './Section/CountDownTimeOut';

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
  const dateFormat = 'MMMM, D ,YYYY';
  

  console.log(CouponShop);


  
  useEffect(( ) => {
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

const renderCardsCouponShop=
CouponShop.map((coupon, index) => {
  if(!props.user.userData){
    //console.log("fffff");
}else{
  if(coupon.shopID == props.user.userData.shopID){
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
              <div style={{ display: "block", marginLeft: "20px" }}>
               <p>จะหมดอายุในอีก <CountDownTimeOut deadline={coupon.dateTimeOut}/></p>
              </div>
              <div style={{float:'right'}}>
              {/* <Button>รับคูปอง</Button> */}
            </div>
            </div>
          </Card>
        </a>
      </Col>
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
    console.log(value1_1);
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
    setModalFreeShipping(true);
  };
  const ModalPercentOpen = () => {
    setModalChooseTypeCoupon(false)
    setModalPersent(true);

  };
  const ModalDiscountOpen = () => {
    setModalChooseTypeCoupon(false)
    setModalDiscount(true);
  };
  const onChangeFreeShip=(event)=>{
    settypeCoupon("FreeShipping")
    setNameCoupon("คูปองส่งฟรี")
  }
  const onChangePercent=(event)=>{
    settypeCoupon("DiscountPercent")
    setNameCoupon("คูปองส่วนลดแบบเปอร์เซ็น")
    // alert(event.currentTarget.value)
    if(event.currentTarget.value > 100 ){
      alert("ส่วนลดคูปองไม่สามารถเกิน 100% ได้ กรุณากรอกใหม่อีกครั้ง")

    }
    setdiscount(event.currentTarget.value)
  }
  const onChangeDiscount=(event)=>{
    settypeCoupon("DiscountMoney")
    setNameCoupon("คูปองส่วนลดแบบจำนวนเงิน")
    setdiscount(event.currentTarget.value)
  }
  const onChangeMiniumCost =(event)=>{
    setminimumCost(event.currentTarget.value)

  }
  const createCoupon =()=>{
    console.log(discount);
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

    Axios.post('/api/coupon/createCoupon',variables)
    .then(response =>{
        if(response.data.success){
          console.log(response.data.coupon);
          // setdateCoupon("")
          // setminimumCost(0)
          // setdiscount(0)
          // settypeCoupon("")
        }else{
            alert('failed to upload')
        }
    })

}

const chooseTypeCoupon =()=>{
  setModalChooseTypeCoupon(true)
}


  return (
    
    <div style={{ display: "block", backgroundColor: "green" ,width:'100%',height:'80vh'}}>
      <h1 style={{marginLeft:'30px' }} >คูปองภายในร้านของคุณ</h1>
      <CountDownTimeOut deadline={"January, 10, 2022"} checktime={timeOut}/>
      <div style={{ display: "block", backgroundColor: "pink" }}>
        <Button onClick={chooseTypeCoupon}>สร้างคูปอง</Button>
        <div style={{ display: "block", backgroundColor: "red" }}>
        <Row gutter={[16, 16]}>{renderCardsCouponShop}</Row>
        

        </div>

        <div>

    </div>
        </div>
        
        
      
      <Modal className="modal-create-coupon" isOpen={ModalFreeShipping}>
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
          <h1>คูปองส่งฟรี</h1>
          <div style={{ marginTop: "20px" }}>
            <Radio.Group>
              <Radio onChange={onChange1_1} value={1}>
                ไม่มียอดซื้อขั้นต่ำ
              </Radio>
              <Radio onChange={onChange1_2} value={2}>
                มียอดซื้อขั้นต่ำ
              </Radio>
            </Radio.Group>
            <div style={{ width: "100px", float: "right", marginTop: "43px" }}>
              <Button onClick={createCoupon}>Submit</Button>
            </div>
            <div id="1_2" style={{ display: "none", marginTop: "20px" }}>
              <label style={{ marginRight: "20px" }}>
                {"\n"}ยอดซื้อขั้นต่ำ
              </label>
              <Input
                style={{ width: "100px" }}
                type="number"
                onChange={onChangeFreeShip}
              ></Input>
            </div>
            <DatePicker onChange={onChangeDate} format={dateFormat} />
          </div>
        </ul>
      </Modal>

      <Modal className="modal-create-coupon" isOpen={ModalPersent}>
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
          <h1>คูปองส่วนลดแบบเปอร์เซ็น</h1>
          <div style={{ marginRight: "20px" }}>
            <label style={{ marginRight: "20px" }}>{"\n"}ยอดซื้อขั้นต่ำ</label>
            <Input
              style={{ width: "100px" }}
              type="number"
              onChange={onChangePercent}
            ></Input>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Radio.Group>
              <Radio onChange={onChange2_1} value={1}>
                ไม่มียอดซื้อขั้นต่ำ
              </Radio>
              <Radio onChange={onChange2_2} value={2}>
                มียอดซื้อขั้นต่ำ
              </Radio>
            </Radio.Group>
            <div style={{ width: "100px", float: "right", marginTop: "43px" }}>
              <Button onClick={createCoupon}>Submit</Button>
            </div>
            <div id="2_2" style={{ display: "none", marginTop: "20px" }}>
              <label style={{ marginRight: "15px" }}>
                {"\n"}ยอดซื้อขั้นต่ำ
              </label>
              <Input
                style={{ width: "100px" }}
                type="number"
                onChange={onChangeMiniumCost}
              ></Input>
            </div>
            <DatePicker onChange={onChangeDate}  format={dateFormat} />
          </div>
        </ul>
      </Modal>

      <Modal className="modal-create-coupon" isOpen={ModalDiscount}>
        <div
          style={{
            height: "15px",
            fontSize: "25px",
            textAlign: "right",
            marginRight: "20px",
            marginTop: "10px",
          }}
          onClick={() => setModalDiscount(false)}
        >
          <MdClear style={{ cursor: "pointer" }} />
        </div>
        <div style={{ textAlign: "Left", marginTop: "5px" }}>
          <ul>
            <h1>คูปองส่วนลดแบบจำนวนเงิน</h1>
            <div style={{ marginRight: "20px" }}>
              <label style={{ marginRight: "20px" }}>{"\n"}ส่วนลด</label>
              <Input
                style={{ width: "100px" }}
                type="number"
                onChange={onChangeDiscount}
              ></Input>
              <label> %</label>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Radio.Group>
                <Radio onChange={onChange3_1} value={1}>
                  ไม่มียอดซื้อขั้นต่ำ
                </Radio>
                <Radio onChange={onChange3_2} value={2}>
                  มียอดซื้อขั้นต่ำ
                </Radio>
              </Radio.Group>
              <div
                style={{ width: "100px", float: "right", marginTop: "43px" }}
              >
                <Button onClick={createCoupon}>Submit</Button>
              </div>
              <div id="3_2" style={{ display: "none", marginTop: "20px" }}>
                <label style={{ marginRight: "15px" }}>
                  {"\n"}ยอดซื้อขั้นต่ำ
                </label>
                <Input
                  style={{ width: "100px" }}
                  type="number"
                  onChange={onChangeMiniumCost}
                ></Input>
              </div>
              <DatePicker onChange={onChangeDate}  format={dateFormat} />
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
        <div style={{ textAlign: "Left", marginTop: "5px"}}>
            <h1 style={{marginLeft:'30px' }}>เลือกชนิดของคูปอง</h1>
            <div style={{ textAlign:'center',alignItems:'center',width:'456px',height:'10vh'}}>
            <Button style={{margin:'5px'}} onClick={ModalFreeShippingOpen}> ส่งฟรี</Button>
            <br></br>
            <Button style={{margin:'5px'}} onClick={ModalPercentOpen}>ส่วนลดแบบเปอร์เซ็น</Button>
            <br></br>
            <Button style={{margin:'5px'}} onClick={ModalDiscountOpen}>ส่วนลดแบบจำนวนเงิน</Button>
            </div>
        </div>
      </Modal>

    </div>
  );
}

export default CreateCoupon;