import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Unity, { UnityContext } from "react-unity-webgl";
import Modal from 'react-modal';
import './GamePage.css';
// import Axios from "axios";
// import { Card, Icon, Col, Row } from "antd";
// import Modal from 'react-modal'
import { MdClear } from "react-icons/md";
import { Card, Icon, Col, Row, Button } from 'antd';

//Game
import Header from '../SideMenu/Header'
import AgoraRTC from "agora-rtc-sdk-ng"
import Loading from "../../Loading";




const { Meta } = Card;

const unityContext = new UnityContext({
    loaderUrl: "Game/build26.loader.js",
    dataUrl: "Game/build26.data",
    frameworkUrl: "Game/build26.framework.js",
    codeUrl: "Game/build26.wasm",
});


function GamePage(props) {
    const [modalCounter, setModalCounter] = useState(false);
    const [modalMiniShelf, setModalMiniShelf] = useState(false);
    const [modalSeller, setModalSeller] = useState(false);
    const [modalCouponRendom, setModalCouponRendom] = useState(false);

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

        });



        unityContext.on("sendInShop", async function (isTrigger2, ShopNumber) {
            setModalMiniShelf(isTrigger2);
            setShopNumberFromUnity(ShopNumber.toString());
            let options;
            console.log(ShopNumberFromUnity);
            if (ShopNumber == null) {
                console.log("nulllll");
            }
            if (ShopNumber == "0") {
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
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADv5YzrDhkcthy/w6k6qrSaesWaQqJ+xJLPl4MuOiL3qj9HqLsAAAAAEAAhqfJE6Ho9YgEAAQDmej1i",
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
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "3") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "4") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "5") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "6") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "7") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "8") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "9") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "10") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "11") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }
                else if (ShopNumber == "12") {
                    options = {
                        // Pass your App ID here.
                        appId: "165d56d0f0c14892810e3a89f2ac1133",
                        // Set the channel name.
                        channel: "shop2",
                        // Pass your temp token here.
                        token: "006165d56d0f0c14892810e3a89f2ac1133IADVkNBWPbKX15CL/Am97aTg2cuUx7pObWv7RpZBZmHTQ4UWoSIAAAAAEAAhqfJENr49YgEAAQA0vj1i",
                        // Set the user ID.
                        uid: Math.ceil(moonLanding.getTime() / 1000000)
                    };
                }

                await rtc.client.join(options.appId, options.channel, options.token, options.uid);
                // Create a local audio track from the audio sampled by a microphone.
                rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
                // Publish the local audio tracks to the RTC channel.
                await rtc.client.publish([rtc.localAudioTrack]);

                console.log("publish success!");

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



    const renderCards = Product.map((product, index) => {
        // console.log("getsuccess");
        // console.log(ShopNumberFromUnity);
        // console.log(product.positionShop)
        // setShopName('product.shopName')

        if (ShopNumberFromUnity == product.positionShop) {
            // console.log("getsuccess")
            return (

                <Col lg={4} style={{ padding: '5px' }}>
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

        unityContext.send("ConnectToserver", "ClickOKOnReact2", "PlayerChar8");
        setModalSeller(false)
        
    }

    const onclickbuttonBeBuyer = () => {
        if (!props.user.userData.positionShop) {
            unityContext.send("ConnectToserver", "ClickOKOnReact1", 0);
        }
        unityContext.send("ConnectToserver", "ClickOKOnReact2", "PlayerChar8");
        setModalSeller(false)
        console.log("getINTHAISCLICK")
    }

    if (loading) {
        return (
          <div>
            <Loading />;{loadingData()}
          </div>
        );
      } else {
    return (
        <div >
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
                <div style={{textAlign:'center',justifyItems:'center',marginTop:'100px'}}>
                <Button style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold',width:'420px',height:'60px',borderRadius:'10px' }} onClick={onclickbuttonBeBuyer}>เตรียมตัวเข้าสู่ตลาดเพื่อชอปปิง</Button>

                </div>
                : 
                <div style={{textAlign:'center',justifyItems:'center',marginTop:'40px',display:'block'}}>
                    <Button style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold',width:'300px',height:'60px',marginTop:'20px',borderRadius:'10px'  }} onClick={onclickbuttonBeBuyer}>เข้าไปชอปปิง</Button>
                    <Button style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold',width:'380px',height:'60px' ,marginTop:'20px',borderRadius:'10px'}} onClick={onclickbuttonBeSeller}>เข้าไปยังร้านของคุณ</Button>
                </div>
                }

               
                

            </Modal>

            <Modal className="modal-ShowAllProduct"
                isOpen={modalCouponRendom}
                contentLabel="Example Modal"
            >

                <div style={{ height: '20px', fontSize: '36px', textAlign: 'right', marginRight: '10px' }} onClick={() => setModalCouponRendom(false)}>
                    <MdClear style={{ cursor: 'pointer' }} /></div>
                <a1 style={{ fontSize: "36px", textAlign: 'center', fontWeight: 'bold' }}>แรนด้อมคูปองจ้า</a1>


            </Modal>

        </div>
    );
}
}
export default GamePage;
