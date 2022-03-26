import React ,{useEffect,useState} from 'react'
import Axios from 'axios';
import { Typography,Button,Form,message,Input,Icon } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loading from '../../Loading';

function HomeShopManage(props) {
  const [ShopData, setShopData] = useState([]);
  const [loading, setloading] = useState(true);

  // useEffect(() => {
  // setTimeout(function () {
  //   loadingData()
  // }, 500);
  
  // }, []);


  const loadingData = () => {
    if (!props.user.userData) {
      
    } else {
      const variables1 = {
        id: props.user.userData._id,
      }
      Axios.post("/api/shop/getShopsById",variables1).then((response) => {
        if (response.data.success) {
          console.log(response.data.shops);
          setShopData(response.data.shops)
          setloading(false);
        } else {
          alert("Fialed to fecth data from mongodb");
        }
      });
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />;{loadingData()}
      </div>
    );
  } else {
    return (
      <div style={{ display: "block",padding:'20px' }}>
        <div style={{paddingLeft:'20px' }}>
        <h2 style={{fontWeight:'bolder' ,}}>ยินดีต้อนรับ คุณ {ShopData.ownerName}</h2>
          <h1 style={{fontWeight:'bolder' ,}}>{ShopData.nameShop}</h1>
        </div>

        <div style={{ display: "flex" ,alignItems:'center',paddingLeft:'100px'}}>
        <div  style={{ padding:'60px',textAlign:'center',cursor:'pointer'}} onClick={() => (window.location.href = "/Landing")}>
          <h1>จัดการสินค้าในร้านค้า</h1>
          <img
            src={"https://www.img.in.th/images/17f1b83b19aa13d01fe17fe3d3f83ac3.png"
            }
            style={{ width: "40vh", height: "40vh" }}
          ></img>
        </div>
        <div style={{ padding:'60px',textAlign:'center',cursor:'pointer'}}>
        <h1>จัดการรายการสั่งซื้อ</h1>
          <img
          onClick={() => (window.location.href = "/orderManagement")}
            src={
              "https://www.img.in.th/images/e6caed22f934e94f2631a89d3c404693.png"
            }
            style={{ width: "40vh", height: "40vh" }}
          ></img>
        </div>
        <div style={{ padding:'60px',textAlign:'center',cursor:'pointer'}}> 
        <h1>จัดการโปรโมชัน</h1>
          <img
           onClick={() => (window.location.href = "/create-coupon")}
            src={
              "https://www.img.in.th/images/3347aca7a38685a121581c574ad85eea.png"
            }
            style={{ width: "40vh", height: "40vh" }}
          ></img>
        </div>
        </div>
      </div>
    );
  }
}

export default HomeShopManage;