import Axios from 'axios';
import React ,{useEffect ,useState} from 'react'
import {Card, Icon,Col,Row} from 'antd';

const {Meta} =Card;



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


    const renderCards = Order.map((order, index) => {
        if(!props.user.userData){
        }else{
         // console.log("eeee", product.namePD);
         // console.log(props.user.userData.name);
          if(order.shopID == props.user.userData.shopID){
          return (
            <Col lg={1000} md={100} xs={100}>
               <a href={`/order/${order._id}`}> 
                <Card hoverable={true} >
                  <Meta
                    title={order.namePD}
                  ></Meta>
                   <a1>ผู้สั่งสินค้า {order.customerName}</a1>
                  <a2>  ราคารวม {order.totalPrice}</a2>
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
        <div style={{width :'75%' , margin:"3rem auto"}}>
            <div style={{textAlign:'center'}}>
            <a class="homeHeader"></a>
                <h2>รายการคำสั่งซื้อ <Icon type="rocket"></Icon> </h2>
                {/* <Row gutter={[16,16]}>
                    <Col lg={12} xs={24}>
                        <CheckBox list={continentsPD} handleFilters={filters => handleFilters(filters,"continentsPD")}></CheckBox>
                    </Col>
                    <Col lg={12} xs={24}>
                        
                        <RadioBox  list ={price} handleFilters={filters => handleFilters(filters,"pricePD")}></RadioBox>
                    </Col>
                </Row> */}
                {/* <div style={{display:'flex',justifyContent:'flex-end',margin:'1rem auto'}}>
                <SearchFeature
                   refreshFunction={updateSearchTerms}
                />
                </div> */}
                {/* {Products.length === 0 ?
                <div style={{display:'flex' , height:'300px' , justifyContent:'center' , alignItems:'center'}}>
                    <h2>No post yet</h2>
                </div>: */}
                <div>
                    <Row gutter ={[30,30]}>
                        {renderCards} 
                    </Row>

                </div>

                <br></br>
                {/* {postSize >= Limit && 
                 <div style={{display:'flex' , justifyContent:'center'}}>
                 <button onClick={onLoadMore}>Load more</button>
                 </div>
                } */}
               
            </div>
        </div>
       
    )
}


export default LandingPage
