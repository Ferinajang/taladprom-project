import React ,{useEffect,useState} from 'react'
import Axios from 'axios';
import { Typography,Button,Form,message,Input,Icon } from 'antd';

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
        <button onClick={() => (window.location.href = "/Landing")} >จัดการสินค้าในร้านค้า</button>
        <button onClick={() => (window.location.href = "/orderManagement")} >จัดการรายการสั่งซื้อ</button>
        <button >จัดการโปรโมชัน</button>
    </div>
    
  )
}

export default HomeShopManage