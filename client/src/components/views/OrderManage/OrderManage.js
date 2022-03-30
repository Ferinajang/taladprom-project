import Axios from 'axios';
import React ,{useEffect ,useState} from 'react'
import {Card, Col,Row,Tabs } from 'antd';
import {QuestionCircleTwoTone } from '@ant-design/icons';

const {Meta} =Card;
const { TabPane } = Tabs;
function LandingPage(props) {
    const [Order, setOrder] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(9)
    const [postSize, setpostSize] = useState(0)
    const [SearchTerms, setSearchTerms] = useState("")
    const [Filters, setFilters] = useState({
        continentsPD:[],
        price:[]
    })
    
  
    // console.log(props);

    useEffect(() =>{
        const variables={
            skip : Skip,
            limit : Limit,
        }
        getOrder(variables);
    },[])

    const getOrder =(variables)=>{
        // console.log("useeffct",props.user.userData);
        Axios.post('/api/order/getOrders',variables)
        .then(response => {
            if(response.data.success){
                setOrder(response.data.orders)
                console.log("order",response.data.orders);
            }else{
                alert("Fialed to fecth data from mongodb")

            }
        }
    )

    }
    


    // const onLoadMore=()=>{
    //     let skip = Skip+Limit;
    //     const variables={
    //         skip:skip,
    //         limit : Limit,
    //         loadMore:true 

    //     }

    //    getProduct(variables);
    //    setSkip(skip)
        
    // }

    // const showFilteredResults =(filters)=>{
    //     const variables={
    //         skip:0,
    //         limit : Limit,
    //         filters: filters

    //     }
    //     getProduct(variables)
    //     setSkip(0)

    // }
    // const handlePrice=(value)=>{
    //     const data = price;
    //     let array = [];

    //     for(let key in data){
    //         console.log("key", key);
    //         console.log("value", value);
            
    //         if(data[key]._id === parseInt(value,10)){
    //             array = data[key].array;
    //         }
    //     }
    //     console.log('array',array);
    //     return array
    // }

    // const handleFilters =(filters,category)=>{
    //     const newFilters ={...Filters}
    //     newFilters[category]= filters
    //     console.log(newFilters);
    //     if(category === "pricePD"){
    //         let priceValues = handlePrice(filters)
    //         console.log(priceValues);
    //         newFilters[category] = priceValues;
    //     }
    //     console.log(newFilters);
    //     showFilteredResults(newFilters)
    //     setFilters(newFilters)

    // }

    const callback =(key)=>{
        console.log(key);
    }


    const renderCardsNotConfirm = Order.map((order, index) => {
        if(!props.user.userData){
        }else{
         // console.log("eeee", product.namePD);
         // console.log(props.user.userData.name);
          if(order.shopID == props.user.userData.shopID && order.status == "Not Confirmed"){
          return (
            <Col lg={6}>
               <a href={`/orderSeller/${order._id}`}> 
                <Card hoverable={true}>
                  <Meta
                    title={order.namePD}
                  ></Meta>
                   <div style={{display:'block',marginTop:'10px'}}>
                  <h4>ผู้สั่งสินค้า : {order.customerName}</h4>
                  <h4>  ราคารวม {order.totalPrice}</h4>
                  </div>
                </Card>
              </a> 
            </Col>
          );
        }
       }
    });
    const renderCardsPending = Order.map((order, index) => {
        if(!props.user.userData){
        }else{
         // console.log("eeee", product.namePD);
         // console.log(props.user.userData.name);
          if(order.shopID == props.user.userData.shopID && order.status == "pending"){
          return (
            <Col lg={6}>
               <a href={`/orderSeller/${order._id}`}> 
                <Card hoverable={true} >
                  <Meta
                    title={order.namePD}
                  ></Meta>
                  <div style={{display:'block',marginTop:'10px'}}>
                  <h4>ผู้สั่งสินค้า : {order.customerName}</h4>
                  <h4>  ราคารวม {order.totalPrice}</h4>
                  </div>
                </Card>
              </a> 
            </Col>
          );
        }
       }
    });
    const renderCardsSuccess = Order.map((order, index) => {
        if(!props.user.userData){
        }else{
         // console.log("eeee", product.namePD);
         // console.log(props.user.userData.name);
          if(order.shopID == props.user.userData.shopID && order.status == "success"){
          return (
            <Col lg={6}>
               <a href={`/orderSeller/${order._id}`}> 
                <Card hoverable={true} >
                  <Meta
                    title={order.namePD}
                  ></Meta>
                   <div style={{display:'block',marginTop:'10px'}}>
                  <h4>ผู้สั่งสินค้า : {order.customerName}</h4>
                  <h4>  ราคารวม {order.totalPrice}</h4>
                  </div>
                </Card>
              </a> 
            </Col>
          );
        }
       }
    });
    const renderCardsReject = Order.map((order, index) => {
        if(!props.user.userData){
        }else{
         // console.log("eeee", product.namePD);
         // console.log(props.user.userData.name);
          if(order.shopID == props.user.userData.shopID && order.status == "reject"){
          return (
            <Col lg={6}>
               <a href={`/orderSeller/${order._id}`}> 
                <Card hoverable={true} >
                  <Meta
                    title={order.namePD}
                  ></Meta>
                   <div style={{display:'block',marginTop:'10px'}}>
                  <h4>ผู้สั่งสินค้า : {order.customerName}</h4>
                  <h4>  ราคารวม {order.totalPrice}</h4>
                  </div>
                </Card>
              </a> 
            </Col>
          );
        }
       }
    });

    const renderCards = Order.map((order, index) => {
        if(!props.user.userData){
        }else{
         // console.log("eeee", product.namePD);
         // console.log(props.user.userData.name);
          if(order.shopID == props.user.userData.shopID){
          return (
            <Col lg={6}>
               <a href={`/orderSeller/${order._id}`}> 
                <Card hoverable={true} >
                  <Meta title={order.namePD}></Meta>
                  <div style={{display:'block'}}>
                  <h1>ผู้สั่งสินค้า {order.customerName}</h1>
                  <a2>  ราคารวม {order.totalPrice}</a2>
                  </div>
                   
                </Card>
              </a> 
            </Col>
          );
        }
       }
    });
    
    const updateSearchTerms=(newSearchTerm)=>{
        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)
        getOrder(variables)   
    }

    return (
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <a class="homeHeader"></a>
          <h1  style={{fontWeight:'bold' }}>รายการคำสั่งซื้อ </h1>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="รอการยืนยันคำสั่งซื้อ" key="1">
              <Row gutter={[24, 24]}>
                {renderCardsNotConfirm}
              </Row>
            </TabPane>
            <TabPane tab="รอการยืนยันคำสั่งซื้อ" key="2">
            <Row gutter={[24, 24]}>
              {renderCardsPending}
              </Row>
            </TabPane>
            <TabPane tab="เสร็จสิ้น" key="3">
            <Row gutter={[24, 24]}>
              {renderCardsSuccess}
              </Row>
            </TabPane>
            <TabPane tab="ยกเลิกคำสั่งซื้อ" key="4">
            <Row gutter={[24, 24]}>
              {renderCardsReject}
              </Row>
              

            </TabPane>
          </Tabs>
        </div>
      </div>
    );
}


export default LandingPage
