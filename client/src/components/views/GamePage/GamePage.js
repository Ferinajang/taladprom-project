import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Unity, { UnityContext } from "react-unity-webgl";
import Modal from 'react-modal';
import './GamePage.css';
// import Axios from "axios";
// import { Card, Icon, Col, Row } from "antd";
// import Modal from 'react-modal'
import { MdClear } from "react-icons/md";
import { Card, Icon, Col, Row, Button,message } from 'antd';

//Game
import Header from '../SideMenu/Header'
import AgoraRTC from "agora-rtc-sdk-ng"
import Loading from "../../Loading";
import ProductInfo from "../DetailProductPage/Section/ProductInfo";
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import ImageGallery from 'react-image-gallery';





const { Meta } = Card;

const unityContext = new UnityContext({
    loaderUrl: "Game/build30.loader.js",
    dataUrl: "Game/build30.data",
    frameworkUrl: "Game/build30.framework.js",
    codeUrl: "Game/build30.wasm",
});


function GamePage(props) {
    const dispatch = useDispatch();
    const [modalCounter, setModalCounter] = useState(false);
    const [modalMiniShelf, setModalMiniShelf] = useState(false);
    const [modalSeller, setModalSeller] = useState(false);
    const [modalCouponRendom, setModalCouponRendom] = useState(false);
    const [modalShopSign, setModalShopSign] = useState(false);
    const [modalCouponRandom, setmodalCouponRandom] = useState(false)
    const [modalMiniShelf1, setModalMiniShelf1] = useState(true);
    const [arrayRecommend, setarrayRecommend] = useState([])
    
    const [countProMiniShelf, setCountProMiniShelf1] = useState(0);

    const [modalCoupon, setModalCoupon] = useState(false);
    const [shopNum, SetShopNum] = useState("");
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
    //Voice
    const [joinRoom, setJoinRoom] = useState(false)
    const [leaveRoom, setLeaveRoom] = useState(false)
    //cart
    const [loading, setloading] = useState(true);
    const [uData, setuData] = useState([]);


    const [Coupon, setCoupon] = useState([])
    const [CouponRandom, setCouponRandom] = useState([])
    const [CouponLength, setCouponLength] = useState(0)

    const [modalProductDetail, setmodalProductDetail] = useState(false)
    const [ProductDetail, setProductDetail] = useState([])


    ///////////////////////mini
    const [randomNum1, setrandomNum1] = useState(0)
    const [randomNum2, setrandomNum2] = useState(0)
    const [randomNum3, setrandomNum3] = useState(0)
    const [ProductMiniShelf1, setProductMiniShelf1] = useState([])
    const [ProductMiniShelf2, setProductMiniShelf2] = useState([])
    const [ProductMiniShelf3, setProductMiniShelf3] = useState([])
    const [ModalminiShelf1, setModalminiShelf1] = useState(false)
    const [ModalminiShelf2, setModalminiShelf2] = useState(false)
    const [ModalminiShelf3, setModalminiShelf3] = useState(false)

    console.log("1",ProductMiniShelf1)
    console.log("2",ProductMiniShelf2)
    console.log("3",ProductMiniShelf3);

    const loadingData = () => {
        if (!props.user.userData) {

        } else {
            setuData(props.user.userData)
            setloading(false)
        }
    };


    // function closeModal() {
    //     setModalCounter(false);
    // }



    useEffect(function () {
        document.getElementById("NavBar").style.display = "none";
        document.getElementById("Footer").style.display = "none";

        unityContext.on("sendShelfShop", function (isTrigger1, counterNumber) {
            setModalCounter(isTrigger1);
            setCounterNumberFromUnity(counterNumber.toString());
        });

        unityContext.on("ClickOnConfirm", function (isTriggerClick) {
            setModalSeller(isTriggerClick);

        });

        unityContext.on("sendTrigCoupon", function (isTriggerCoupon) {
            setModalCouponRendom(isTriggerCoupon);
            if (isTriggerCoupon) {
                randomCoupon()
            }

        });

        unityContext.on("sendShopSign", function (isTriggerSignShop, shopnum) {
            setModalShopSign(isTriggerSignShop);
            SetShopNum(shopnum.toString());
        });



        unityContext.on("sendInShop", async function (isTrigger2, ShopNumber) {
            setModalMiniShelf(isTrigger2);
            if(isTrigger2){
            randomMini(ShopNumber)
            }
            setShopNumberFromUnity(ShopNumber.toString());
            let options;
            console.log(ShopNumberFromUnity);
            if (ShopNumber == null) {
                console.log("nulllll");
            }
            if (ShopNumber == "0") {
                setModalMiniShelf(false);
                // rtc.localAudioTrack.close();

                //   // Leave the channel.
                // await rtc.client.leave();
            }
            else {
                startBasicCall()
                const moonLanding = new Date();
                if (ShopNumber == "1") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop1",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IACam63+Qi0b4ZK4yh9kXELvpwdNk4fkwY+aMmOBq69LFT9HqLsAAAAAEABg4SwUqSZJYgEAAQCnJkli",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "2") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IABouzFlcNjyGP2smSTWMA3OwRXEkOw5DyyscVIO208WiYUWoSIAAAAAEADR1hyrmFNGYgEAAQCWU0Zi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "3") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop3",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IAAb5A6c4HOLkeiBrbTMrjFDV3npIqUswYWNRmtNRsYk5hMmplUAAAAAEADR1hyryVNGYgEAAQDIU0Zi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "4") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop4",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADQM5A85TlUQWGlDztt1BVULTbKj+B8TYF+3N8p7l496rCzwssAAAAAEADR1hyrAFRGYgEAAQD/U0Zi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "5") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop5",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IAAnxAzGe3dCBlYObca1nmWwCf1vKWmvoH2kyA8jMdeJ1yaDxbwAAAAAEADR1hyrEVRGYgEAAQAQVEZi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "6") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop6",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADUzPe9G9uKVZ0aZaXuSQZF0TVVQHnHd/dPKvJyQYMp8JzSzCUAAAAAEADR1hyr4lRGYgEAAQDhVEZi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "7") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop7",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IAD1KzPombJhd3GWST+C9ZItXw2vdKoIpR89yTwrGFEj+Ariy1IAAAAAEADR1hyrGVVGYgEAAQAYVUZi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "8") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop8",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IABrvrmmq73aC6d2Y4cZe9rRFYWgrhcA3xFB3U+Se6NdyZv/dMIAAAAAEADR1hyrJlVGYgEAAQAmVUZi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "9") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop9",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IABly7kvSI2lWfKMxoTI8mzD2OQIcZIan0HymEPaVnwdDQ3Pc7UAAAAAEADR1hyrmGJGYgEAAQCYYkZi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "10") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop10",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IABgoGPDBVWjMtU3caTIf7O2NdJ4zXVOsRKm6s6ztAfI0ltaBkIAAAAAEADR1hyrtWJGYgEAAQC0YkZi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "11") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop11",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IAC7/Ccrgc/O9CyZduJKtO/eUbAMpCa24peSpt3uy2eqF81qATUAAAAAEADR1hyrzmJGYgEAAQDNYkZi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "12") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop12",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IAByJWIp5gZIRcrdRglCjelyDWYEG7KLsUNBuycZUojsO3c7CKwAAAAAEADR1hyr6GJGYgEAAQDnYkZi",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }

                // await rtc.client.join(options.appId, options.channel, options.token, options.uid);
                // // Create a local audio track from the audio sampled by a microphone.
                // rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                // // Publish the local audio tracks to the RTC channel.
                // await rtc.client.publish([rtc.localAudioTrack]);

                // console.log("publish success!");

            }
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

    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId));
      };
    
      const images = [
        {
          original: ProductDetail.imagesPD1,
          thumbnail: ProductDetail.imagesPD1,
        },
        {
          original: ProductDetail.imagesPD2,
          thumbnail: ProductDetail.imagesPD2,
        },
        {
          original: ProductDetail.imagesPD3,
          thumbnail: ProductDetail.imagesPD3,
        },
      ];
    const openProductDetail=(product)=>{
        console.log(product);
        setProductDetail(product)
        setmodalProductDetail(true)
        // const variables = {
        //     id: product._id,
        //   };
        //   Axios.post("/api/product/getProductByIDGamePDDetail", variables).then(
        //     (response) => {
        //       if (response.data.success) {
        //           console.log(response.data.product);
        //         setProductDetail(response.data.product[0])
        //       } else {
        //         alert("Fialed to fecth data from mongodb");
        //       }
        //     }
        //   );
        

    }




    const renderCards = Product.map((product, index) => {
        // console.log("getsuccess");
        // console.log(ShopNumberFromUnity);
        // console.log(product.positionShop)
        // setShopName('product.shopName')

        if (ShopNumberFromUnity == product.positionShop) {
            // console.log("getsuccess")
            return (
                <Col lg={4} style={{ padding: '5px' }}>
                    <a onClick={()=>openProductDetail(product)} >
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

    //     const renderCardsMiniShelf1 = arrayRecommend.map((product, index) => {
    //             return (
    //                 <Col lg={4} style={{ padding: '5px' }}>
    //                     <a href={`/product/${product._id}`}>
    //                         <Card hoverable={true} cover={<img src={product.imagesPD1}></img>}>
    //                             <Meta
    //                                 title={product.namePD}
    //                                 description={`${product.pricePD}฿`}
    //                             ></Meta>
    //                         </Card>
    //                     </a>
    //                 </Col>
    //             );
    //     });
    //     const renderCardsMiniShelf2 = arrayRecommend.map((product, index) => {
    //         return (
    //             <Col lg={4} style={{ padding: '5px' }}>
    //                 <a href={`/product/${product._id}`}>
    //                     <Card hoverable={true} cover={<img src={product.imagesPD1}></img>}>
    //                         <Meta
    //                             title={product.namePD}
    //                             description={`${product.pricePD}฿`}
    //                         ></Meta>
    //                     </Card>
    //                 </a>
    //             </Col>
    //         );
    // });

    // const renderCardsMiniShelf3 = arrayRecommend.map((product, index) => {
    //     return (
    //         <Col lg={4} style={{ padding: '5px' }}>
    //             <a href={`/product/${product._id}`}>
    //                 <Card hoverable={true} cover={<img src={product.imagesPD1}></img>}>
    //                     <Meta
    //                         title={product.namePD}
    //                         description={`${product.pricePD}฿`}
    //                     ></Meta>
    //                 </Card>
    //             </a>
    //         </Col>
    //     );
    // });

        const randomMini = (ShopNumber) => {
        Axios.post("/api/product/getProductToGame").then((response) => {
            if (response.data.success) {
                console.log(response.data.product);
                response.data.product.forEach((item) => {
                    if (ShopNumber == item.positionShop && item.recommended
                        == "recommended") {
                        console.log(item);
                        arrayRecommend.push(item);
                    } 
                });
                console.log(arrayRecommend);
                if(arrayRecommend.length == 0){
                    console.log("No Product Reccommend");

                }else if(arrayRecommend.length == 1){
                    console.log("ff");
                    setProductMiniShelf1(arrayRecommend[0])
                }else if(arrayRecommend.length == 2){
                    console.log("ffff");
                    setProductMiniShelf1(arrayRecommend[0])
                    setProductMiniShelf2(arrayRecommend[1])
                }else if(arrayRecommend.length == 3){
                    console.log("ffffff");
                    setProductMiniShelf1(arrayRecommend[0])
                    setProductMiniShelf2(arrayRecommend[1])
                    setProductMiniShelf3(arrayRecommend[2])
                }else{
                    let random1 = Math.floor(Math.random() * arrayRecommend.length)
                    console.log(random1);
                    setProductMiniShelf1(arrayRecommend[random1])
                    let i = 0;
                    while(i< arrayRecommend.length){
                        let random2 = Math.floor(Math.random() * arrayRecommend.length)
                        console.log("444",i);
                        console.log(random2);
                        if(random2 != random1){
                            setProductMiniShelf2(arrayRecommend[random2])
                        break;
                        }else{
                            i++
                        }
                    }
                    while(i< arrayRecommend.length){
                        let random3 = Math.floor(Math.random() * arrayRecommend.length)
                        console.log(random3);
                        console.log(randomNum1);
                        console.log(randomNum2);
                        if(random3 != randomNum1 && random3!=randomNum2){
                            console.log("555",i);
                            setProductMiniShelf3(arrayRecommend[random3])
                            break;
                        }else{
                            i++
                        }
                    }
                    setModalminiShelf1(true)
                    setModalminiShelf2(true)
                    setModalminiShelf3(true)

                }
                
            } else {
                alert("Fialed to fecth data from mongodb");
            }
        });
    };

    const randomCoupon = () => {
        Axios.post("/api/coupon/getCoupon").then((response) => {
            if (response.data.success) {
                let noOwnerCouponList = [];
                response.data.coupon.forEach((item) => {
                    if (item.status == "no owner") {
                        console.log(item);
                        noOwnerCouponList.push(item);
                    }
                    // console.log(noOwnerCouponList);
                });
                if(noOwnerCouponList.length == 0){

                }else{
                    setCouponLength(Math.floor(Math.random() * noOwnerCouponList.length));
                    setCouponRandom(noOwnerCouponList[CouponLength]);
                    setmodalCouponRandom(true);
                }

                
            } else {
                alert("Fialed to fecth data from mongodb");
            }
        });
       
    };

    const gotCoupon = () => {
        const variables = {
            id: CouponRandom._id,
            status: "have owner",
            OwnerName: props.user.userData.name,
            OwnerID: props.user.userData._id
        }
        Axios.put('/api/coupon/addOwnerCoupon', variables)
            .then(response => {
                if (response.data.success) {
                    message.success('คูปองได้จัดเก็บดข้าคลังของคุณแล้ว');
                } else {
                    alert(response)
                }
            })
    }

    // const GetName = AllNameShop.map((shop, index) => {

    //     console.log(shop.nameShop)

    //           if(shop.positionShop == "3"){
    //             // console.log(response.data.shops.nameShop)
    //             setShopName3(shop.nameShop)

    //     }

    // });

    document.body.style.overflow = 'hidden';

    //Voice Chat
    let rtc = {
        localAudioTrack: null,
        client: null
    };



    async function startBasicCall() {
        // Create an AgoraRTCClient object.
        rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

        // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
        rtc.client.on("user-published", async (user, mediaType) => {
            // Subscribe to the remote user when the SDK triggers the "user-published" event
            await rtc.client.subscribe(user, mediaType);
            console.log("subscribe success");

            // If the remote user publishes an audio track.
            if (mediaType === "audio") {
                // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
                const remoteAudioTrack = user.audioTrack;
                // Play the remote audio track.
                remoteAudioTrack.play();
            }

            // Listen for the "user-unpublished" event
            rtc.client.on("user-unpublished", async user => {
                // Unsubscribe from the tracks of the remote user.
                await rtc.client.unsubscribe(user);
            });

        });

        //   window.onload = function () {

        //   document.getElementById("join").onclick = async function () {
        //       // Join an RTC channel.
        //       await rtc.client.join(options.appId, options.channel, options.token, options.uid);
        //       // Create a local audio track from the audio sampled by a microphone.
        //       rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        //       // Publish the local audio tracks to the RTC channel.
        //       await rtc.client.publish([rtc.localAudioTrack]);

        //       console.log("publish success!");
        //   }

        //   document.getElementById("leave").onclick = async function () {
        //       // Destroy the local audio track.

        //   }
        //   }
    }

    const onclickbuttonBeSeller = () => {
        unityContext.send("ConnectToserver", "ClickOKOnReact2",props.user.userData.playerCharacter);
        setModalSeller(false)
    }

    const onclickbuttonBeBuyer = () => {
        if (!props.user.userData.positionShop) {
            unityContext.send("ConnectToserver", "ClickOKOnReact1", 0);
        }
        else{
            if (props.user.userData.positionShop == "1") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 1);
            }
            else if (props.user.userData.positionShop == "2") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 2);
            }
            else if (props.user.userData.positionShop == "3") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 3);
            }
            else if (props.user.userData.positionShop == "4") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 4);
            }
            else if (props.user.userData.positionShop == "5") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 5);
            }
            else if (props.user.userData.positionShop == "6") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 6);
            }
            else if (props.user.userData.positionShop == "7") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 7);
            }
            else if (props.user.userData.positionShop == "8") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 8);
            }
            else if (props.user.userData.positionShop == "9") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 9);
            }
            else if (props.user.userData.positionShop == "10") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 10);
            }
            else if (props.user.userData.positionShop == "11") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 11);
            }
    
            else if (props.user.userData.positionShop == "12") {
                unityContext.send("ConnectToserver", "ClickOKOnReact1", 12);
            }
        }
        unityContext.send("ConnectToserver", "ClickOKOnReact2", props.user.userData.playerCharacter);
        setModalSeller(false)
        console.log("getINTHAISCLICK")
        unityContext.send("ConnectToserver", "ClickOKOnReact3", props.user.userData.name);
    }

    if (loading) {
        return (
            <div>
                <Loading />;{loadingData()}
            </div>
        );
    } else {
        return (
            <div style={{}}>
                <Header />
                
                <div style={{ marginTop: "-69px" }}>
                    <Unity unityContext={unityContext} style={{ width: "100%", height: "100vh", background: "grey" }} />
                </div>
                <Modal className="modal-ShowAllProduct"
                    isOpen={modalCounter}
                    contentLabel="Example Modal"
                >

                    <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setModalCounter(false)}>
                        <MdClear style={{ cursor: 'pointer' }} /></div>
                    <p style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold' }}>{window["SHOPNAME_" + ShopNumberFromUnity]}</p>
                    <Row style={{ padding: '15px' }}>
                        {renderCards}
                    </Row>
                </Modal>

                <Modal className="modal-BeforeGame"
                    isOpen={modalSeller}
                    contentLabel="Example Modal"
                >
                    <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setModalSeller(false)}>
                        <MdClear style={{ cursor: 'pointer' }} /></div>
                    {!props.user.userData.positionShop ?
                        <div style={{ textAlign: 'center', justifyItems: 'center', marginTop: '100px' }}>
                            <Button style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold', width: '420px', height: '60px', borderRadius: '10px' }} onClick={onclickbuttonBeBuyer}>ยืนยันเข้าสู่ตลาด</Button>

                        </div>
                        :
                        <div style={{ textAlign: 'center', justifyItems: 'center', marginTop: '40px', display: 'block' }}>
                            <Button style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold', width: '300px', height: '60px', marginTop: '20px', borderRadius: '10px' }} onClick={onclickbuttonBeBuyer}>ยืนยันเข้าสู่ตลาด</Button>
                            
                        </div>
                    }
                </Modal>

                <Modal className="modal-coupon-random-head" isOpen={modalCouponRandom}>
                    <div
                        style={{
                            height: "15px",
                            fontSize: "25px",
                            textAlign: "right",
                            margin: "10px",
                        }}
                        onClick={() => setmodalCouponRandom(false)}
                    >
                        <MdClear style={{ cursor: "pointer" }} />
                    </div>
                    <div style={{ height: '50vh' }}>
                        <div style={{ textAlign: "center" }}>
                            <h1>ยินดีด้วย!!</h1>
                            <h2>คุณได้รับคูปองส่วนลด</h2>
                        </div>
                        <div style={{ alignItems: "center", margin: '20px', marginLeft: '50px' }}>
                            <Card style={{ width: '500px' }}>
                                <div style={{ display: "flex" }}>
                                    {CouponRandom.typeCoupon == "DiscountPercent" ? (
                                        <img
                                            width={150}
                                            src={
                                                "https://www.img.in.th/images/fd1e9e737f10d57e83de226ae2596cd7.png"
                                            }
                                        />
                                    ) : CouponRandom.typeCoupon == "DiscountMoney" ? (
                                        <img
                                            width={150}
                                            src={
                                                "https://www.img.in.th/images/a44a84ab639f73bbf1dd7c1a4a7bea44.png"
                                            }
                                        />
                                    ) : (
                                        <img
                                            width={150}
                                            src={
                                                "https://www.img.in.th/images/77f1a34f63a45579a90d641902a26dfa.png"
                                            }
                                        />
                                    )}
                                    <div style={{ display: "block", marginLeft: "20px" }}>
                                        <h1>{CouponRandom.nameCoupon}</h1>
                                        <a>ร้าน {CouponRandom.shopName}</a>
                                        <p>ส่วนลด {CouponRandom.discount} บาท</p>
                                    </div>
                                    <div style={{ float: 'right' }}>
                                    </div>
                                </div>
                            </Card>

                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={() => {
                                gotCoupon();
                                setmodalCouponRandom(false);
                            }}>รับคูปอง</Button>

                        </div>

                    </div>
                </Modal>
                
                {/* {modalMiniShelf &&  */}

                <Modal className="modal-ProductDetail" isOpen={modalProductDetail}>
              <div
                style={{
                  height: "15px",
                  fontSize: "25px",
                  textAlign: "right",
                  margin: "10px",
                }}
                onClick={() => setmodalProductDetail(false)}
                    >
                        <MdClear style={{ cursor: "pointer" }} />
                    </div>
                    <div
                        style={{
                            width: "40%",
                            height: '70vh',
                            float: "right",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <div style={{
                            width: "80%",
                            padding: '10px',
                            backgroundColor: "#f5f5f5",
                        }}>
                            <h1>{ProductDetail.namePD}</h1>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-start", marginLeft: '20px', marginTop: '20px' }}>
                            <ProductInfo addToCart={addToCartHandler} detail={ProductDetail} />
                        </div>
                        <div style={{ float: 'right' }}>
                            <Button
                                style={{ marginTop: '180px', marginRight: '15px', backgroundColor: '#2F2851' }}
                                size="large"
                                shape="round"
                                type="primary"
                                onClick={() =>
                                    addToCartHandler(ProductDetail._id)
                                }
                            >
                                เพิ่มสินค้าลงในตระกร้า
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Col lg={8} xs={24}>
                            <ImageGallery items={images} />;
                        </Col>
                    </div>

                </Modal>



                {/* {modalMiniShelf && 
                <div>
                    <div className="modal-ShowProductOnShelf">
                        
                    </div>
                    <div className="modal-ShowProductOnShelf" style={{marginTop:'280px',marginRight:'280px'}}></div>
                    <div className="modal-ShowProductOnShelf" style={{marginTop:'450px',marginRight:'250px'}}></div>
                </div>
                
                } */}

        <Modal className="modal-ProductDetail" isOpen={ModalminiShelf1}>
              <div
                style={{
                  height: "15px",
                  fontSize: "25px",
                  textAlign: "right",
                  margin: "10px",
                }}
                onClick={() => setModalminiShelf1(false)}
                    >
                        <MdClear style={{ cursor: "pointer" }} />
                    </div>
                    <img src={ProductMiniShelf1.imagesPD1} ></img>
                    {ProductMiniShelf1.namePD}
                    {ProductMiniShelf1.pricePD}
                </Modal>

                <Modal className="modal-ProductDetail" isOpen={ModalminiShelf2}>
              <div
                style={{
                  height: "15px",
                  fontSize: "25px",
                  textAlign: "right",
                  margin: "10px",
                }}
                onClick={() => setModalminiShelf2(false)}
                    >
                        <MdClear style={{ cursor: "pointer" }} />
                    </div>
                    <img src={ProductMiniShelf2.imagesPD1} ></img>
                    
                    {ProductMiniShelf2.namePD}
                    {ProductMiniShelf2.pricePD}
                </Modal>

                <Modal className="modal-ProductDetail" isOpen={ModalminiShelf3}>
              <div
                style={{
                  height: "15px",
                  fontSize: "25px",
                  textAlign: "right",
                  margin: "10px",
                }}
                onClick={() => setModalminiShelf3(false)}
                    >
                        <MdClear style={{ cursor: "pointer" }} />
                    </div>
                    <img src={ProductMiniShelf3.imagesPD1} ></img>
                    {ProductMiniShelf3.namePD}
                    {ProductMiniShelf3.pricePD}
                </Modal>
    
            
            </div>
        );
    }
}
export default GamePage;
