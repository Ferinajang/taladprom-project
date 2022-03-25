import React ,{useEffect,useState} from 'react'
import Axios from 'axios';
import { Typography,Button,Form,message,Input,Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function HomeShopManage(props) {
    const shopId = props.match.params.shopId
    const [PropsData, setPropsData] = useState("")
    useEffect(()=>{
        Axios.get(`/api/shop/shop_by_id?id=${shopId}&type=single`)
        .then(response=>{
        })
       
    })
  return (
    <div style={{display:'flex'}} >
       <FontAwesomeIcon icon="fa-solid fa-badge-percent" />
        <button onClick={() => (window.location.href = "/Landing")} >จัดการสินค้าในร้านค้า</button>
        <button onClick={() => (window.location.href = "/orderManagement")} >จัดการรายการสั่งซื้อ</button>
        <button onClick={() => (window.location.href = "/create-coupon")}>จัดการโปรโมชัน</button>
    </div>
    
  )
}

export default HomeShopManage