import Axios from 'axios';
import React ,{useEffect ,useState} from 'react'
import {Card, Icon,Col,Row,Button,Tooltip} from 'antd';
import CheckBox from './Section/CheckBox';
import RadioBox from './Section/RadioBox';
import { continentsPD,price } from './Section/Data';
import SearchFeature from './Section/SearchFeature';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { MdClear } from "react-icons/md";
import Modal from "react-modal";
import Loading from '../../Loading';
import './LandingPage.css'
const {Meta} =Card;


function LandingPage(props) {
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(9)
    const [postSize, setpostSize] = useState(0)
    const [SearchTerms, setSearchTerms] = useState("")
    const [ModalRecomendedProduct, setModalRecomendedProduct] = useState(false)
    const [Filters, setFilters] = useState({
        continentsPD:[], 
        price:[]
    })
    const [recomend, setrecomend] = useState(0)
    const [disableAddRecomedButton, setdisableAddRecomedButton] = useState(false)
    const [count, setcount] = useState(0)
    const [arrayPD, setarrayPD] = useState([])
    const [loading, setloading] = useState(true);
    const [UserData, setUserData] = useState([])


    const loadingData = () => {
      if (!props.user.userData) {
        
      } else {
        setUserData(props.user.userData)
        setloading(false)
      }
    };
  
    
    

    // console.log(props);
    console.log(count);

    useEffect(() =>{
        const variables={
            skip : Skip,
            limit : Limit,
        }

        getProduct(variables);
    },[])

    const getProduct =(variables)=>{
        // console.log("useeffct",props.user.userData);
        Axios.post('/api/product/getProducts',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.products);
                    setProducts(response.data.products)         
            }else{
                alert("Fialed to fecth data from mongodb")

            }
        }
    )
    }

    const onLoadMore=()=>{
        let skip = Skip+Limit;
        const variables={
            skip:skip,
            limit : Limit,
            loadMore:true 

        }

       getProduct(variables);
       setSkip(skip)
        

    }

    const showFilteredResults =(filters)=>{
        const variables={
            skip:0,
            limit : Limit,
            filters: filters

        }
        getProduct(variables)
        setSkip(0)

    }
    const handlePrice=(value)=>{
        const data = price;
        let array = [];

        for(let key in data){
            console.log("key", key);
            console.log("value", value);
            
            if(data[key]._id === parseInt(value,10)){
                array = data[key].array;
            }
        }
        console.log('array',array);
        return array
    }

    const handleFilters =(filters,category)=>{
        const newFilters ={...Filters}
        newFilters[category]= filters
        console.log(newFilters);
        if(category === "pricePD"){
            let priceValues = handlePrice(filters)
            console.log(priceValues);
            newFilters[category] = priceValues;
        }
        console.log(newFilters);
        showFilteredResults(newFilters)
        setFilters(newFilters)

    }

    const addRecommendedProduct = (product) => {
        if(props.user.userData.recomendedItem == 10){
            alert("ไม่สามารถเพิ่มสินค้าแนะนำได้มากกว่า 10 ชิ้น")

        }else{
            const variables = {
                id: product,
                recommended: "recommended",
              };
              Axios.put("/api/product/addRecommendedProduct", variables).then(
                (response) => {
                  if (response.data.success) {
                        const variables ={
                          id:props.user.userData._id,
                          recomendedItem:props.user.userData.recomendedItem +1
                      }
                      Axios.put('/api/users/editProfile',variables)
                            .then(response =>{
                                if(response.data.success){
                                    window.location.reload();
                                }else{
                                    alert(response)
                                }
                            })
                      
                
                  }
                   else {
                    alert("failed to upload");
                  }
                }
              );

        }
         
        // }
      }

    const UnRecommendedProduct = (product) => {
      if (product.recommended == "recommended") {
        const variables = {
          id: product,
          recommended: "no recommend",
        };
        Axios.put("/api/product/addRecommendedProduct", variables).then(
          (response) => {
            if (response.data.success) {
              const variables = {
                id: props.user.userData._id,
                recomendedItem: props.user.userData.recomendedItem - 1,
              };
              Axios.put("/api/users/editProfile", variables).then(
                (response) => {
                  if (response.data.success) {
                    window.location.reload();
                  } else {
                    alert(response);
                  }
                }
              );
            } else {
              alert("failed to upload");
            }
          }
        );
      }
    };

    const renderCards = Products.map((product, index) => {
        if(!props.user.userData){
            //console.log("fffff");
        }else{
          if(product.writerName == props.user.userData.name){
          return (
            <Col lg={4} md={8} xs={24}> 
            {product.recommended == "recommended" ?  
            <div><Tooltip title="นำออกจากสินค้าเเนะนำ"><Button  type="text" style={{ width: "220px",height:"50px",fontSize:'18px',fontWeight:'normal'}} onClick={()=>UnRecommendedProduct(product)} >สินค้าแนะนำ <StarFilled style={{color:'yellow'}}/></Button></Tooltip></div> :
            <div><Tooltip title="เพิ่มเป็นสินค้าเเนะนำ"><Button type="text" style={{ width: "220px",height:"50px",fontSize:'18px',fontWeight:'normal'}} onClick={()=>addRecommendedProduct(product)} >สินค้าแนะนำ <StarOutlined /></Button></Tooltip></div>  
            } 
              <a href={`/productSeller/${product._id}`}>
                <Card hoverable={true} cover={<img src={product.imagesPD1}></img>}>
                  <Meta
                    title={product.namePD}
                    description={`${product.pricePD}฿`}
                  ></Meta>
                </Card>
              </a>
            </Col>
          );
          
        }
       }
    });
    
    const renderCardsRecomended= Products.map((product, index) => {
        if(!props.user.userData){
            //console.log("fffff");
        }else{
          if(product.writerName == props.user.userData.name && product.recommended == "recommended"){
          return (
            <Col lg={4} md={8} xs={24}> 
            {product.recommended == "recommended" ?  <div><Button style={{ width: "160px" ,margin:'10px'}} onClick={()=>UnRecommendedProduct(product)} >สินค้าแนะนำ <StarFilled style={{color:'yellow'}}/></Button></div> :
            <div><Button style={{ width: "160px"}}  onClick={()=>addRecommendedProduct(product)} >สินค้าแนะนำ <StarOutlined /></Button></div>  
            } 
              <a href={`/productSeller/${product._id}`}>
                <Card hoverable={true} cover={<img src={product.imagesPD1}></img>}>
                  <Meta
                    title={product.namePD}
                    description={`${product.pricePD}฿`}
                  ></Meta>
                </Card>
              </a>
            </Col>
          );
          
        }
       }
    });

    const manageRecomendedProduct =()=>{
        setModalRecomendedProduct(true)
        
    }

   


    
    const updateSearchTerms=(newSearchTerm)=>{
        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)
        getProduct(variables)   
    }

    const goToShop =()=>{
        window.location.href = "/product/upload"
    }


    if (loading) {
      return (
        <div>
          <Loading />;{loadingData()}
        </div>
      )
    }else{

    return (
      <div style={{ width: "95%", margin: "1rem auto" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
        <div style={{paddingLeft:'20px' ,width:'50%'}}>
        <h2 style={{fontWeight:'bolder' ,fontSize:'30px'}}>ยินดีต้อนรับ คุณ {UserData.name}</h2>
        <h2 style={{fontWeight:'bolder' ,fontSize:'20px'}}>ร้าน {UserData.shopName}</h2>
      
        </div>
        <div style={{
            display: "block",
            width: "100%",
            backgroundColor: "white",
            textAlign:'end'
          }}>
          <Button
            style={{ width: "150px" ,margin:'10px'}}
            size="large"
            shape="round"
            type="danger"
            onClick={goToShop}
          >
            เพิ่มสินค้า
          </Button>
          <Button
            style={{ width: "160px" ,margin:'10px'}}
            size="large"
            shape="round"
            type="danger"
            onClick={manageRecomendedProduct}
          >
            จัดการสินค้าแนะนำ
          </Button>
        </div>
        


          {/* <Col style={{ margin: "2" }} lg={30} xs={24}>
            <CheckBox
              list={continentsPD}
              handleFilters={(filters) =>
                handleFilters(filters, "continentsPD")
              }
            ></CheckBox>
          </Col>
          <Col style={{ margin: "2" }} lg={30} xs={24}>
            <RadioBox
              list={price}
              handleFilters={(filters) => handleFilters(filters, "pricePD")}
            ></RadioBox>
          </Col> */}
        </div>

        

        <div
          style={{
            textAlign: "center",
            backgroundColor: "white",
            marginTop: "50px",
          }}
        >
          {Products.length === 0 ? (
            <div
              style={{
                display: "flex",
                height: "300px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>No post yet</h2>
            </div>
          ) : (
            <div>
              <Row gutter={[16, 16]}>{renderCards}</Row>
            </div>
          )}
          <br></br>
          {postSize >= Limit && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={onLoadMore}>Load more</button>
            </div>
          )}

          <Modal
            className="modal-recomendedProcuct"
            isOpen={ModalRecomendedProduct}
          >
            <div
              style={{
                height: "15px",
                fontSize: "25px",
                textAlign: "right",
                marginRight: "20px",
                marginTop: "10px",
              }}
              onClick={() => setModalRecomendedProduct(false)}
            >
              <MdClear style={{ cursor: "pointer" }} />
            </div>
            <div
              style={{
                height: "15px",
                fontSize: "25px",
                textAlign: "center",
                margin: "50px",
                marginTop: "10px",
              }}
            >
              <h1>สินค้าแนะนำในร้านของคุณ</h1>
              <Row gutter={[16, 16]}>{renderCardsRecomended}</Row>
            </div>
          </Modal>
        </div>
      </div>
    );

  }
}


export default LandingPage
