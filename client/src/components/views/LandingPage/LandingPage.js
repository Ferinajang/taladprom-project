import Axios from 'axios';
import React ,{useEffect ,useState} from 'react'
import {Card, Icon,Col,Row,Button,Tooltip,Menu,Table,Input ,InputNumber} from 'antd';
import CheckBox from './Section/CheckBox';
import RadioBox from './Section/RadioBox';
import { continentsPD,price } from './Section/Data';
import SearchFeature from './Section/SearchFeature';
import { StarOutlined, StarFilled,MailOutlined } from '@ant-design/icons';
import { MdClear } from "react-icons/md";
import Modal from "react-modal";
import Loading from '../../Loading';
import './LandingPage.css'
const {Meta} =Card;
const { SubMenu } = Menu;


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
    const [Current, setCurrent] = useState("")
    const [recomend, setrecomend] = useState(0)
    const [disableAddRecomedButton, setdisableAddRecomedButton] = useState(false)
    const [count, setcount] = useState(0)
    const [arrayPD, setarrayPD] = useState([])
    const [loading, setloading] = useState(true);
    const [UserData, setUserData] = useState([])
    const [ModalUpdateQuantity, setModalUpdateQuantity] = useState(false)
    const [QuantityValue, setQuantityValue] = useState(0)
    const [ModalUpdateQuantityADD, setModalUpdateQuantityADD] = useState(false)
    const [Tmp, setTmp] = useState([])


    const loadingData = () => {
      if (!props.user.userData) {
        
      } else {
        setUserData(props.user.userData)
        setloading(false)
      }
    };
  
    
    

    // console.log(props);

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
          
          if(product.writer._id == props.user.userData._id){    
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
          if(product.writer._id == props.user.userData._id && product.recommended == "recommended"){
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
    console.log(QuantityValue);
    const onQuanityChange =(value)=>{
      setQuantityValue(value)
  }
  const addquantity =(product)=>{
    setTmp(product)
    setModalUpdateQuantityADD(true)
  }

  
  const openModalUpdateStock =()=>{
    Axios.post('/api/product/getProducts')
    .then(response => {
        if(response.data.success){
            console.log(response.data.products);
                setProducts(response.data.products)         
                setModalUpdateQuantity(true)
        }else{
            alert("Fialed to fecth data from mongodb")

        }

  })}

  const confirmAddQuantity =()=>{
    setModalUpdateQuantityADD(false)
    setModalUpdateQuantity(false)

    const variables = {
      id: Tmp._id,
      quantityPD: Tmp.quantityPD + QuantityValue,
  };
  Axios.put("/api/product/updateQuantityAdd", variables).then(
      (response) => {
        Axios.post('/api/product/getProducts')
    .then(response => {
        if(response.data.success){
          console.log(response.data.products);
          setProducts(response.data.products)
          setQuantityValue(0)
          setModalUpdateQuantity(true)
        } else {
          alert("Fialed to fecth data from mongodb")

        }
        
        
      })
  })}
  

    const renderCardsQuantity= Products.map((product, index) => {
      if(!props.user.userData){
          //console.log("fffff");
      }else{
        if(product.writer._id == props.user.userData._id ){
        return (
          
          <tr key={product._id}>
            <td>
              <img
                style={{ width: "70px" }}
                alt="product"
                src={product.imagesPD1}
              />
            </td>
            <td>{product.namePD}</td>
            <td>{product.pricePD}บาท</td>
            <td>{product.quantityPD} ชิ้น</td>
            <td>
              <button onClick={()=>addquantity(product)}>
                Remove
              </button>
            </td>
          </tr>
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

    const handleClick = (e) => {
      console.log(e);
      setCurrent(e.key);
    };
    
  


    if (loading) {
      return (
        <div>
          <Loading />;{loadingData()}
        </div>
      )
    }else{

    return (
      <div style={{ width: "90%", margin: "1rem auto",marginLeft:'95px' }}>
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
            <Menu
              onClick={handleClick}
              style={{ width: 180 ,display: "block",
              textAlign:'end',
            float:'right'}}
              selectedKeys={[Current]}
              mode="inline"
              
              
            >
              <SubMenu key="sub1" icon={<MailOutlined />} title="จัดการสินค้า">
                <Menu.Item key="1" onClick={goToShop}>เพิ่มสินค้า</Menu.Item>
                <Menu.Item key="2" onClick={()=>openModalUpdateStock()}>เพิ่มสต๊อกสินค้า</Menu.Item>
              </SubMenu>
              <Menu.Item key="3"onClick={manageRecomendedProduct}>จัดการสินค้าแนะนำ</Menu.Item>
            </Menu>
         
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
              <h2 style={{fontWeight:'bold' }}>สินค้าแนะนำในร้านของคุณ</h2>
              <Row gutter={[16, 16]}>{renderCardsRecomended}</Row>
            </div>
          </Modal>

          <Modal
            className="modal-update-quantity"
            isOpen={ModalUpdateQuantity}
          >
            <div
              style={{
                height: "15px",
                fontSize: "25px",
                textAlign: "right",
                marginRight: "20px",
                marginTop: "10px",
              }}
              onClick={() => setModalUpdateQuantity(false)}
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
              <h2 style={{fontWeight:'bold' }}>เพิ่มจำนวนสินค้าในสต๊อก</h2>
              <div>
              <table>
                <thead>
                  <tr>
                    <th>รูปภาพ</th>
                    <th>ชื่อสินค้า</th>
                    <th>ราคา</th>
                    <th>จำนวนปัจจุบัน</th>
                    <th>เพิ่มจำนวนสินค้า</th>
                  </tr>
                </thead>
                <tbody>{renderCardsQuantity}</tbody>
              </table>
            </div>
            </div>
          </Modal>

          <Modal
            className="modal-update-quantity-2"
            isOpen={ModalUpdateQuantityADD}
          >
            <div
              style={{
                height: "15px",
                fontSize: "25px",
                textAlign: "right",
                marginRight: "20px",
                marginTop: "10px",
              }}
              onClick={() => setModalUpdateQuantityADD(false)}
            >
              <MdClear style={{ cursor: "pointer" }} />
            </div>
            <h2>ใส่จำนวนที่ต้องการ</h2>
            <InputNumber value={QuantityValue} onChange={onQuanityChange} />
            <button onClick={()=>confirmAddQuantity()}>ยืนยัน</button>
          </Modal>
        </div>
      </div>
    );
  }
}


export default LandingPage
