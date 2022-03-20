import React, { useEffect, useState } from 'react'
import { Radio ,Input, Button} from 'antd';
import Modal from "react-modal";
import "./CreateCoupon.css"

function CreateCoupon() {
    const [value1, setvalue1] = useState("")
    const [value2, setvalue2] = useState("")
    const [value3, setvalue3] = useState("")
    const [value1_1, setvalue1_1] = useState("")
    const [value1_2, setvalue1_2] = useState("")
    const [value2_1, setvalue2_1] = useState("")
    const [value2_2, setvalue2_2] = useState("")
    const [value3_1, setvalue3_1] = useState("")
    const [value3_2, setvalue3_2] = useState("")
    const [ModalFreeShipping, setModalFreeShipping] = useState(false)
    const [ModalPersent, setModalPersent] = useState(false)
    const [ModalDiscount, setModalDiscount] = useState(false)


    const  onChange1 = (e) => {
        console.log('radio1 checked', e.target.value);
        setvalue1("1check")
        console.log("ddd",value1);
        // setvalue2(false)
        // setvalue3(false)
    };
    const onChange1_1 = (e) => {
      setvalue1_1("1check_noShipping")
      console.log(value1_1);
      document.getElementById("1_2").style.display = "none";
    };
    const onChange1_2 = (e) => {
      console.log("radio1๘2 checked", e.target.value);
      document.getElementById("1_2").style.display = "block";
    };

    const  onChange2 = (e) => {
      console.log('radio1 checked', e.target.value);
      
  };
  
    const onChange2_1 = (e) => {
      console.log("radio2 checked", e.target.value);
      document.getElementById('2_2').style.display = 'none';
    
    };
    const onChange2_2 = (e) => {
      console.log("radio2 checked", e.target.value);
      document.getElementById('2_2').style.display = 'block';

    };
    const  onChange3 = (e) => {
      console.log('radio1 checked', e.target.value);
  };
    
    const onChange3_1 = (e) => {
      document.getElementById('3_2').style.display = 'none';

    };
    const onChange3_2 = (e) => {
      document.getElementById('3_2').style.display = 'block';
    };

    const ModalFreeShippingOpen = () => {
      setModalFreeShipping(true);  
    };
    const ModalPercentOpen = () => {
      setModalPersent(true);  
    };
    const ModalDiscountOpen = () => {
      setModalDiscount(true);  
    };
    

      
    
  return (
    <div style={{ display: "block", backgroundColor: "green" }}>

      <Button onClick={ModalFreeShippingOpen}> ส่งฟรี</Button>
      <Button onClick={ModalPercentOpen}>ส่วนลดแบบเปอร์เซ็น</Button>
      <Button onClick={ModalDiscountOpen}>ส่วนลดแบบจำนวนเงิน</Button>
      <Modal className="modal-ShowAllProduct" isOpen={ModalFreeShipping}>
          <button onClick={()=>setModalFreeShipping(false)}>x</button>
          <ul>
           
          </ul>
      </Modal>
      <Modal className="modal-ShowAllProduct" isOpen={ModalPersent}>
          <button onClick={()=>setModalPersent(false)}>x</button>
          <ul>
           
          </ul>
      </Modal>
      <Modal className="modal-ShowAllProduct" isOpen={ModalDiscount}>
          <button onClick={()=>setModalDiscount(false)}>x</button>
          <ul>
           
          </ul>
      </Modal>
      <Radio.Group>
      <div
        className="coupon"
        style={{ backgroundColor: "red", margin: "10px" }}
      > 
        <Radio onChange={onChange1} value={1}>
          ส่งฟรี
        </Radio>
        <div>
          <Radio.Group>
            <Radio onChange={onChange1_1} value={1}>
              ไม่มียอดซื้อขั้นต่ำ
            </Radio>
            <Radio onChange={onChange1_2} value={2}>
              มียอดซื้อขั้นต่ำ
            </Radio>
          </Radio.Group>
          <div id="1_2" style={{ display: "none" }}>
            <label style={{ marginRight: "20px" }}>{"\n"}ยอดซื้อขั้นต่ำ</label>
            <Input style={{ width: "100px" }} type="number"></Input>
          </div>
        </div>
      </div>
      <div
        className="coupon"
        style={{ backgroundColor: "red", margin: "10px" }}
      >
        <Radio onChange={onChange2} value={2}>
          ส่วนลดแบบเปอร์เซ็น
        </Radio>
        <div>
          <label style={{ marginRight: "20px" }}>{"\n"}ยอดซื้อขั้นต่ำ</label>
          <Input style={{ width: "100px" }} type="number"></Input>
        </div>
        <div>
          <Radio.Group>
            <Radio onChange={onChange2_1} value={1}>
              ไม่มียอดซื้อขั้นต่ำ
            </Radio>
            <Radio onChange={onChange2_2} value={2}>
              มียอดซื้อขั้นต่ำ
            </Radio>
          </Radio.Group>
          <div id="2_2" style={{ display: "none" }}>
            <label style={{ marginRight: "20px" }}>{"\n"}ยอดซื้อขั้นต่ำ</label>
            <Input style={{ width: "100px" }} type="number"></Input>
          </div>
        </div>
      </div>
      <div className="coupon" style={{ backgroundColor: "red", margin: "10px" }}>
        <Radio onChange={onChange3}  value={3}>
          ส่วนลดแบบจำนวนเงิน
        </Radio>
        <div>
          <label style={{ marginRight: "20px" }}>{"\n"}ยอดซื้อขั้นต่ำ</label>
          <Input style={{ width: "100px" }} type="number"></Input>
        </div>
        <div>
          <Radio.Group>
            <Radio onChange={onChange3_1} value={1} >
              ไม่มียอดซื้อขั้นต่ำ
            </Radio>
            <Radio onChange={onChange3_2} value={2}>
              มียอดซื้อขั้นต่ำ
            </Radio>
          </Radio.Group>
          <div id="3_2" style={{ display: "none" }}>
            <label style={{ marginRight: "20px" }}>{"\n"}ยอดซื้อขั้นต่ำ</label>
            <Input style={{ width: "100px" }} type="number"></Input>
          </div>
        </div>
      </div>
      </Radio.Group>
    </div>
  );
}

export default CreateCoupon