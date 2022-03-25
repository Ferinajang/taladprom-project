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
        <button onClick={() => (window.location.href = "/Landing")} >Product Management</button>
        <button onClick={() => (window.location.href = "/orderManagement")} >Order Management</button>
        <button onClick={() => (window.location.href = "/create-coupon")}>Coupon Management</button>
    </div>
    
  )
}

export default HomeShopManage