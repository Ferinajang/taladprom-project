import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Unity, { UnityContext } from "react-unity-webgl";
import Modal from 'react-modal';
import './GamePage.css';
// import Axios from "axios";
// import { Card, Icon, Col, Row } from "antd";
// import Modal from 'react-modal'
import { MdClear } from "react-icons/md";
import { Card, Icon, Col, Row } from 'antd';

//Game
import Header from '../SideMenu/Header'
const { Meta } = Card;

const unityContext = new UnityContext({
    loaderUrl: "Game/build16.loader.js",
    dataUrl: "Game/build16.data",
    frameworkUrl: "Game/build16.framework.js",
    codeUrl: "Game/build16.wasm",
});


function GamePage(props) {
    const [modalCounter, setModalCounter] = useState(false);
    const [modalMiniShelf, setModalMiniShelf] = useState(false);
    const [ShopNumberFromUnity, setShopNumberFromUnity] = useState("");
    const [CounterNumberFromUnity, setCounterNumberFromUnity] = useState("");
    const [Product, setProduct] = useState([]);
    const [ShopName, setShopName] = useState("");
    const [AllNameShop, setAllNameShop] = useState([]);
    const [ShopName1, setShopName1] = useState("")
    const [ShopName2, setShopName2] = useState("")
    const [ShopName3, setShopName3] = useState("")
    const [ShopName4, setShopName4] = useState("")
    const [ShopName5, setShopName5] = useState("")
    const [ShopName6, setShopName6] = useState("")
    const [ShopName7, setShopName7] = useState("")
    const [ShopName8, setShopName8] = useState("")
    const [ShopName9, setShopName9] = useState("")
    const [ShopName10, setShopName10] = useState("")
    const [ShopName11, setShopName11] = useState("")
    const [ShopName12, setShopName12] = useState("")






    // function closeModal() {
    //     setModalCounter(false);
    // }

    

    useEffect(function () {
        unityContext.on("sendShelfShop", function (isTrigger1, counterNumber) {
            setModalCounter(isTrigger1);
            setCounterNumberFromUnity(counterNumber.toString());
        });

        unityContext.on("sendInShop", function (isTrigger2, ShopNumber) {
            setModalMiniShelf(isTrigger2);
            setShopNumberFromUnity(ShopNumber.toString());
        });

        Axios.post('/api/product/getProductToGame')
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    setProduct(response.data.product)
                    Axios.post('/api/shop/getShops')
                        .then(response => {
                            if (response.data.success) {
                                // console.log(response.data);
                                // setAllNameShop(response.data.shops)
                                response.data.shops.map((shop, index) => {
                                    // console.log(shop.nameShop)
                                    if (shop.positionShop == "1" && ShopName1 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName1(shop.nameShop)
                                        window["SHOPNAME_1"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "2" && ShopName2 == "") {
                                        // console.log(response.data.aaa.nameShop)
                                        setShopName2(shop.nameShop)
                                        window["SHOPNAME_2"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "3" && ShopName3 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName3(shop.nameShop)
                                        window["SHOPNAME_3"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "4" && ShopName4 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName4(shop.nameShop)
                                        window["SHOPNAME_4"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "5" && ShopName5 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName5(shop.nameShop)
                                        window["SHOPNAME_5"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "6" && ShopName6 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName6(shop.nameShop)
                                        window["SHOPNAME_6"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "7" && ShopName7 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName7(shop.nameShop)
                                        window["SHOPNAME_7"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "8" && ShopName8 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName8(shop.nameShop)
                                        window["SHOPNAME_8"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "9" && ShopName9 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName9(shop.nameShop)
                                        window["SHOPNAME_9"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "10" && ShopName10 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName10(shop.nameShop)
                                        window["SHOPNAME_10"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "11" && ShopName11 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName11(shop.nameShop)
                                        window["SHOPNAME_11"] = shop.nameShop

                                    }
                                    if (shop.positionShop == "12" && ShopName12 == "") {
                                        // console.log(response.data.shops.nameShop)
                                        setShopName12(shop.nameShop)
                                        window["SHOPNAME_12"] = shop.nameShop

                                    }
                                });

                            }
                        })
                }
            })

        // Axios.post('/api/shop/getShops')
        // .then(response => {
        //     if (response.data.success) {
        //         // console.log(response.data);
        //         setAllNameShop(response.data.shops)

        //     }
        // })

    }, []);

    const renderCards = Product.map((product, index) => {
        // console.log("getsuccess");
        // console.log(ShopNumberFromUnity);
        // console.log(product.positionShop)
        // setShopName('product.shopName')
        
        if (ShopNumberFromUnity == product.positionShop) {
            // console.log("getsuccess")
            return (

                <Col lg={4} style={{padding:'5px'}}>
                    <a href={`/product/${product._id}`}>
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

    });

    // const GetName = AllNameShop.map((shop, index) => {

    //     console.log(shop.nameShop)

    //           if(shop.positionShop == "3"){
    //             // console.log(response.data.shops.nameShop)
    //             setShopName3(shop.nameShop)

    //     }

    // });


    return (
        <div>
            <Header />
            <div style={{ marginTop: "-69px" }}>
                <Unity unityContext={unityContext} style={{ width: "100%", height: "100%",border: "2px solid black",background: "grey" }} />
            </div>
            <Modal className="modal-ShowAllProduct"
                isOpen={modalCounter}
                contentLabel="Example Modal"
            >
                <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setModalCounter(false)}>
                    <MdClear style={{ cursor: 'pointer' }} /></div>
                <p style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold' }}>{window["SHOPNAME_" + ShopNumberFromUnity]}</p>
                <Row style={{padding:'15px'}}>
                    {renderCards}
                </Row>
                



            </Modal>
        </div>
    );
}
export default GamePage;
