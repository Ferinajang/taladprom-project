import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Icon, Col, Row } from "antd";
import Modal from 'react-modal'

const { Meta } = Card;

function HomePage(props) {
  //console.log("out",props);
  var countShop = 0;
  const [Products, setProducts] = useState([]);
  const [Shops, setShops] = useState([]);
  const [count, setcount] = useState(0);
  const [writerID, setwriterID] = useState("");
  const [test, settest] = useState([])
  const [stateShop, setstateShop] = useState("false")
  const [modalIsOpen,setModalIsOpen] = useState(false);
  useEffect(() => {
    //console.log("w");
    Axios.post("/api/product/getProducts").then((response) => {
      if (response.data.success) {    
        setProducts(response.data.products);
        //console.log("product");    
      } else {
        alert("Fialed to fecth data from mongodb")
      }
    });

    Axios.post("/api/shop/getShops").then((response) => {
        if (response.data.success) {
          setShops(response.data.shops);
          //console.log("shop");
        } else {
          alert("Fialed to fecth data from mongodb")
        }
      });
  }, []);

  const checkShop =()=>{
      if(countShop > 0 ){
        window.location.href = "/HomeShop"
      }else{
        window.location.href = "/create-shop"
      }
  }


   const goToShopManage = Shops.map((shop,index) =>{
       //console.log(Shops);
       if(!props.user.userData){
           //console.log("fdddd");
       }else{
            if(shop.ownerID == props.user.userData._id){
                countShop++
                //console.log(countShop);

            }else{
                //console.log("5555");
        }
       }

    })
    

  const renderCards = Products.map((product, index) => {
      if(!props.user.userData){
          //console.log("fffff");
      }else{
       // console.log("eeee", product.namePD);
       // console.log(props.user.userData.name);
        if(product.writerName == props.user.userData.name){
        return (
          <Col lg={6} md={8} xs={24}>
            <a href={`/Home/${product.writer}`}>
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

  const setModalIsOpenToTrue =()=>{
    setModalIsOpen(true)
}

const setModalIsOpenToFalse =()=>{
    setModalIsOpen(false)
}
  
  return (
    <div>
      <a class="homeHeader">Welcome To TALADPROM</a>
      <div class="wrapperImgHome">
        <div>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/ferina-436c2.appspot.com/o/images%2Ffern%2FWavy_Bus-17_Single-04.jpg?alt=media&token=abaaa40e-2de6-40ae-9dd5-2ac1076fc216"
            }
            style={{ width: "60vh", height: "60vh" }}
          ></img>
        </div>
        <div style={{ margin: "100px" }} />
        <div>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/ferina-436c2.appspot.com/o/images%2Ffern%2FWavy_Bus-17_Single-09.jpg?alt=media&token=f5879a39-1307-49f9-a88c-102f776e56d0"
            }
            style={{ width: "60vh", height: "60vh" }}
          ></img>
        </div>
      </div>
      <button
        style={{ marginLeft: "50vh", color: "black" }} 
        onClick={checkShop}
      >
        create your shop
      </button>
      <button
        onClick={() => (window.location.href = "/create-shop")}
        style={{ marginLeft: "78vh", color: "black" }}>
        go to shopping
      </button>
      {/* <button onClick={testApi()} style={{marginLeft:'78vh',color:'black'}}>test</button> */}

      {/* <div style={{ textAlign: "center" }}>
        <h2>
          {" "}
          Prodcut List <Icon type="rocket"></Icon>{" "}
        </h2>
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
        <Row gutter={[16, 16]}>
            {renderCards}
        </Row> 
        {goToShopManage}
          </div>
        )}
        <br></br>
        <br></br>
      </div> */}
      <Modal isOpen={modalIsOpen}>
                <button onClick={setModalIsOpenToFalse}>x</button>
                <ul>
                 <h1>fern</h1>  
                </ul>     
        </Modal>
    </div>
    
  );
}

export default HomePage;
