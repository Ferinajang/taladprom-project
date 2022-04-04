import React, { useEffect, useState } from 'react'
import { Typography, Button, Form, message, Input, Icon, Alert, notification } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { render } from "react-dom";
import { storage } from "../../firebaseConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import { MdClear } from "react-icons/md";
import './CreateShop.css'

const { Title } = Typography;
const { TextArea } = Input;



function CreateShop(props) {
  const [TitleShop, setTitleShop] = useState("")
  const [EmailShop, setEmailShop] = useState('')
  const [PhoneNumberShop, setPhoneNumberShop] = useState("")
  const [DescriptionShop, setDescriptionShop] = useState("")
  const [ImageShop, setImageShop] = useState("")
  const [URLShop, setURLShop] = useState("")
  const [progress, setProgress] = useState(0)
  const [Shop, setShop] = useState([])
  const [positionShop, setpositionShop] = useState("")
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [PSTS1, setPSTS1] = useState(false)
  const [PSTS2, setPSTS2] = useState(false)
  const [PSTS3, setPSTS3] = useState(false)
  const [PSTS4, setPSTS4] = useState(false)
  const [PSTS5, setPSTS5] = useState(false)
  const [PSTS6, setPSTS6] = useState(false)
  const [PSTS7, setPSTS7] = useState(false)
  const [PSTS8, setPSTS8] = useState(false)
  const [PSTS9, setPSTS9] = useState(false)
  const [PSTS10, setPSTS10] = useState(false)
  const [PSTS11, setPSTS11] = useState(false)
  const [PSTS12, setPSTS12] = useState(false)

  const [AllPosition, setAllPosition] = useState([])


  useEffect(() => {
    Axios.post('/api/position/getposition')
      .then(response => {
        if (response.data.success) {
          setAllPosition(response.data.position)
          // setPSTS1(response.data.position.shop1)
          // setPSTS1(response.data.position.shop1)
          // setPSTS1(response.data.position.shop1)
          // setPSTS1(response.data.position.shop1)
        } else {
          alert("Fialed to fecth data from mongodb")
        }
      }
      )

  }, [])
  console.log(positionShop);

  const checkAllPosition = () => {
    console.log("ggggggg");
    setPSTS1(AllPosition[0].shop1)
    setPSTS2(AllPosition[0].shop2)
    setPSTS3(AllPosition[0].shop3)
    setPSTS4(AllPosition[0].shop4)
    setPSTS5(AllPosition[0].shop5)
    setPSTS6(AllPosition[0].shop6)
    setPSTS7(AllPosition[0].shop7)
    setPSTS9(AllPosition[0].shop9)
    setPSTS8(AllPosition[0].shop8)
    setPSTS10(AllPosition[0].shop10)
    setPSTS11(AllPosition[0].shop11)
    setPSTS12(AllPosition[0].shop12)
  }


  const onTitleShopChange = (event) => {
    setTitleShop(event.currentTarget.value)
  }

  const onEmailShopChange = (event) => {
    setEmailShop(event.currentTarget.value)

  }
  const onPhoneNumberShopChange = (event) => {
    setPhoneNumberShop(event.currentTarget.value)
  }


  const onDesciptionShopChange = (event) => {
    setDescriptionShop(event.currentTarget.value)
  }

  const onDropImageShop = (event) => {
    console.log(event.currentTarget.files[0]);
    if (event.currentTarget.files[0]) {
      setImageShop(event.currentTarget.files[0])
    }
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false)

  }
  const selectPositionShop = () => {
    checkAllPosition()
    setModalIsOpen(true)
  }


  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      ownerID: props.user.userData._id,
      ownerName: props.user.userData.name,
      nameShop: TitleShop,
      descripstionShop: DescriptionShop,
      phoneNumberShop: PhoneNumberShop,
      imagesShop: URLShop,
      positionShop: positionShop,

    }

    if (!TitleShop || !DescriptionShop  || !PhoneNumberShop || !positionShop) {
      let placement = "top"
      notification.error({
        message: "คุณกรอกข้อมูลไม่ครบ",
        description:
          'กรุณากรอกข้อมูลและเลือกตำแหน่งของร้านให้ครบถ้วน',
        placement,
      });
    } else {
      Axios.post("/api/shop/uploadShop", variables).then((response) => {
        if (response.data.success) {
          console.log("ggg", response.data);
          if (positionShop == "1") {
            setPSTS1(true);
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop1: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "2") {
            setPSTS2(true);
            setpositionShop("2");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop2: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                  
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "3") {
            setPSTS3(true);
            setpositionShop("3");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop3: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                 
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "4") {
            setPSTS4(true);
            setpositionShop("4");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop4: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                  
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "5") {
            setPSTS5(true);
            setpositionShop("5");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop5: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                  
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "6") {
            setPSTS6(true);
            setpositionShop("6");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop6: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                 
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "7") {
            const checkPosition7 = () => {
              setPSTS7(true);
              setpositionShop("7");
              const variables = {
                id: "622fa7e4374d6e188407dc0f",
                shop7: true,
              };
              Axios.put("/api/position/editPosition", variables).then(
                (response) => {
                  if (response.data.success) {
                    
                  } else {
                    alert(response);
                  }
                }
              );
            };
          } else if (positionShop == "8") {
            setPSTS8(true);
            setpositionShop("8");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop8: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                  
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "9") {
            setPSTS9(true);
            setpositionShop("9");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop9: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                  
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "10") {
            setPSTS10(true);
            setpositionShop("10");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop10: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                  
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "11") {
            setPSTS11(true);
            setpositionShop("11");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop11: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                  
                } else {
                  alert(response);
                }
              }
            );
          } else if (positionShop == "12") {
            setPSTS12(true);
            setpositionShop("12");
            const variables = {
              id: "622fa7e4374d6e188407dc0f",
              shop12: true,
            };
            Axios.put("/api/position/editPosition", variables).then(
              (response) => {
                if (response.data.success) {
                 
                } else {
                  alert(response);
                }
              }
            );
          }
          sendShopInfoToUser();
          // props.history.push("/HomeShop")
        } else {
          alert("failed to upload");
        }
      });

    }


  }




  const sendShopInfoToUser = () => {
    console.log("ddd");
    const variables1 = {
      id: props.user.userData._id,
    }
    Axios.post('/api/shop/getShopsById', variables1)
      .then(response => {
        if (response.data.success) {
          console.log("getsho0p", response.data.shops.ownerID);
          if (response.data.shops.ownerID == props.user.userData._id) {
            if (response.data.shops.ownerID == props.user.userData._id) {
              console.log("getsho0ffdddp", response.data.shops);
              const variables2 = {
                id: props.user.userData._id,
                shopID: response.data.shops._id,
                shopName: response.data.shops.nameShop,
                positionShop: response.data.shops.positionShop,
                recomendedItem: 0
              }
              Axios.put('/api/users/editProfile', variables2)
                .then(response => {
                  if (response.data.success) {
                    let placement = "top"
                    notification.success({
                      message: "สร้างร้านค้าสำเร็จ",
                      description:
                        'คุณสามารถจัดการกับร้านค้าของคุณได้เลยตอนนี้!!',
                      placement,
                    });
                    props.history.push("/HomeShop")
                  } else {
                    alert(response)
                  }
                })

            }
          }
        } else {
          alert(response)
        }
      })
  }


  // Axios.post('/api/shop/getShopsById', variables1)
  //   .then(response => {
  //     if (response.data.success) {
  //       console.log(response.data.shops.ownerID);
  //       if (response.data.shops.ownerID == props.user.userData._id) {
  //         if (response.data.shops.ownerID == props.user.userData._id) {
  //           console.log(response.data.shops);
  //           const variables2 = {
  //             id: props.user.userData._id,
  //             shopID: response.data.shops._id,
  //             shopName: response.data.shops.nameShop,
  //             positionShop: response.data.shops.positionShop
  //           }
  //           Axios.put('/api/users/editProfile', variables2)
  //             .then(response => {
  //               if (response.data.success) {
  //                 alert('product success to upload')
  //                 props.history.push("/HomeShop")
  //               } else {
  //                 alert(response)
  //               }
  //             })

  //         }
  //       }
  //     } else {
  //       alert(response)
  //     }
  //   })



  const checkPosition1 = () => {
    setpositionShop("1")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 1');

  }


  const checkPosition2 = () => {
    setpositionShop("2")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 2');
  }
  const checkPosition3 = () => {
    setpositionShop("3")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 3');
  }
  const checkPosition4 = () => {
    setpositionShop("4")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 4');
  }
  const checkPosition5 = () => {
    setpositionShop("5")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 5');
  }
  const checkPosition6 = () => {
    setpositionShop("6")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 6');
  }
  const checkPosition7 = () => {
    setpositionShop("7")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 7');
  }
  const checkPosition8 = () => {
    setpositionShop("8")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 8');
    notification['warning']({
      message: 'คุณสามารถเลือกตำแหน่งร้านได้เพียงครั้งเดียว!!!',
      description:
        'คุณไม่สามารถเปลี่ยนตำแหน่งของร้านค้าได้ในภายหลัง เพราะฉะนั้น เลือกดีๆนะ',
    });

  }
  const checkPosition9 = () => {
    setpositionShop("9")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 9');
  }
  const checkPosition10 = () => {
    setpositionShop("10")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 10');
  }
  const checkPosition11 = () => {
    setpositionShop("11")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 11');
  }
  const checkPosition12 = () => {
    setpositionShop("12")
    message.success('คุณได้เลือกร้านในตำแหน่งที่ 12');
  }

  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem auto" }}>
        <Title level={2}>สร้างร้านค้าของคุณ</Title>
      </div>
      <Modal className="modalChoosePosition" isOpen={modalIsOpen}>
        <div
          style={{
            height: "20px",
            fontSize: "36px",
            textAlign: "right",
            marginRight: "10px",
            paddingTop: "5px",
          }}
          onClick={setModalIsOpenToFalse}
        >
          <MdClear style={{ cursor: "pointer" }} />
        </div>

        <p style={{ color: "red", fontSie: "30px",marginLeft:'20px' }}>
          *โปรดเลือกตำแหน่งร้านภายในเกมของคุณ*
        </p>
        <ul>
          <div style={{}}>

            <div style={{marginTop:'70px'}}>

              <Button
                style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px', marginLeft: '35px' }}
                disabled={PSTS7}
                onClick={checkPosition7}
              >
                7
              </Button>

              <Button
                style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' }}
                disabled={PSTS8}
                onClick={checkPosition8}
              >
                8
              </Button>

              <Button
                style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' }}
                disabled={PSTS9}
                onClick={checkPosition9}
              >
                9
              </Button>

              <Button
                style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px', marginLeft: '150px' }}
                disabled={PSTS10}
                onClick={checkPosition10}
              >
                10
              </Button>

              <Button
                style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' }}
                disabled={PSTS11}
                onClick={checkPosition11}
              >
                11
              </Button>

              <Button
                style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' }}
                disabled={PSTS12}
                onClick={checkPosition12}
              >
                12
              </Button>
            </div>

            <div style={{marginTop:'50px'}}>
              <div>
                <Button
                  style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px', marginLeft: '35px' }}
                  disabled={PSTS1}
                  onClick={checkPosition1}
                >
                  1
                </Button>

                <Button
                  style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' }}
                  disabled={PSTS2}
                  onClick={checkPosition2}
                >
                  2
                </Button>

                <Button
                  style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' }}
                  disabled={PSTS3}
                  onClick={checkPosition3}
                >
                  3
                </Button>

                <Button
                  style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' , marginLeft: '150px'}}
                  disabled={PSTS4}
                  onClick={checkPosition4}
                >
                  4
                </Button>

                <Button
                  style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' }}
                  disabled={PSTS5}
                  onClick={checkPosition5}
                >
                  5
                </Button>

                <Button
                  style={{ width: "100px", height: "100px", borderRadius: '10px', fontSize: '30px' }}
                  disabled={PSTS6}
                  onClick={checkPosition6}
                >
                  6
                </Button>
              </div>
            </div>
            <div style={{ float: 'right', marginRight: '50px',marginTop:'60px' }}>
              <Button style={{ textAlign: 'end', float: 'right',borderRadius:'5px' }} onClick={() => setModalIsOpen(false)}>ยืนยัน</Button>
            </div>


          </div>
        </ul>
      </Modal>

      <Form onSubmit={onSubmit}>
        <br></br>
        <label>ชื่อร้าน</label>
        <Input onChange={onTitleShopChange} value={TitleShop}></Input>
        <br></br>
        <br></br>
        <label>หมายเลขโทรศัพท์</label>
        <Input
          onChange={onPhoneNumberShopChange}
          value={PhoneNumberShop}
          type="text"
        ></Input>
        <br></br>
        <br></br>
        <label>รายละเอียดร้านค้า</label>
        <TextArea
          onChange={onDesciptionShopChange}
          value={DescriptionShop}
          type="text"
        ></TextArea>
        <br></br>
        <br></br>
       
        <div  >
          <Button style={{borderRadius:'5px'}} onClick={selectPositionShop}>เลือกตำแหน่งร้านของคุณ</Button>
          <Button style={{ textAlign: 'end', float: 'right',borderRadius:'5px' }} onClick={onSubmit}>ยืนยัน</Button>
        </div>

        {positionShop != "" &&
          (<div style={{margin:'5px'}}>
            <a1 style={{color:'red'}}> *ตำแหน่งร้านค้าที่เลือก : {positionShop}</a1>
          </div>)
        }
        {/* <Button onClick={sendShopInfoToUser}> test</Button> */}
      </Form>
    </div>
  );
}
export default CreateShop;

