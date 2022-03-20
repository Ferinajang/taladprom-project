import Axios from 'axios';
import React ,{useEffect ,useState} from 'react'
import {Card, Icon,Col,Row,Button} from 'antd';
import CheckBox from './Section/CheckBox';
import RadioBox from './Section/RadioBox';
import { continentsPD,price } from './Section/Data';
import SearchFeature from './Section/SearchFeature';
const {Meta} =Card;


function LandingPage(props) {
    const [Products, setProducts] = useState([])
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

        getProduct(variables);
    },[])

    const getProduct =(variables)=>{
        // console.log("useeffct",props.user.userData);
        Axios.post('/api/product/getProducts',variables)
        .then(response => {
            if(response.data.success){
                console.log(response.data.products);
                if (variables.loadMore) {
                    setProducts([...Products,...response.data.products])
                }else{
                    setProducts(response.data.products)

                }
                setpostSize(response.data.postSize)
                
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


    const renderCards = Products.map((product, index) => {
        if(!props.user.userData){
            //console.log("fffff");
        }else{
         // console.log("eeee", product.namePD);
         // console.log(props.user.userData.name);
          if(product.writerName == props.user.userData.name){
          return (
            <Col lg={6} md={8} xs={24}>
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

    return (
        <div style={{width :'95%' , margin:"1rem auto"}}>
            <div style={{display:'flex',justifyContent:'flex-start' , width:'100%',backgroundColor:'white'}}>
                
                <Row gutter={[16,16]}>
                    <Col style={{margin:"2"}} lg={30} xs={24}>
                        <CheckBox list={continentsPD} handleFilters={filters => handleFilters(filters,"continentsPD")}></CheckBox>
                    </Col>
                    <Col style={{margin:"2"}} lg={30} xs={24}>
                        <RadioBox  list ={price} handleFilters={filters => handleFilters(filters,"pricePD")}></RadioBox>
                    </Col>
                </Row>
            </div>
                <Button style={{width:'150px'}} size="large" shape='round' type='danger'
                onClick={goToShop}
                >เพิ่มสินค้า</Button>

            <div style={{textAlign:'center',backgroundColor:'white'}}>
                {Products.length === 0 ?
                <div style={{display:'flex' , height:'300px' , justifyContent:'center' , alignItems:'center'}}>
                    <h2>No post yet</h2>
                </div>:
                <div>
                    <Row gutter ={[16,16]}>
                        {renderCards}
                    </Row>
                </div>
}
                <br></br>
                {postSize >= Limit && 
                 <div style={{display:'flex' , justifyContent:'center'}}>
                 <button onClick={onLoadMore}>Load more</button>
                 </div>
                }
            </div>
        </div>
       
    )
}


export default LandingPage
