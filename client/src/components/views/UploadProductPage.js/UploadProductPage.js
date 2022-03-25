import React ,{useState} from 'react'
import { Typography,Button,Form,message,Input,Icon,Modal} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { render } from "react-dom";
import { storage } from "../../firebaseConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import ImageGallery from 'react-image-gallery';
import { CloudUploadOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';

const {Title} = Typography;
const {TextArea} = Input ;

const Continents =[
    {key : 1, value:"เสื้อผ้า"},
    {key : 2, value:"อาหาร"},
    {key : 3, value:"เครื่องใช้ไฟฟ้า"},
    {key : 4, value:"ของใช้ภายในครัวเรือน"},
    {key : 5, value:"ผลิตภัณฑ์เสริมความงาม"},
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0) 
    const [ContinentsValue, setContinentsValue] = useState(1)
    const [Images, setImages] = useState([])
    const [QuantityValue, setQuantityValue] = useState(0)
    const [ShippingCostValue, setShippingCostValue] = useState(0)
    const [Image1, setImage1] = useState("")
    const [Image2, setImage2] = useState("")
    const [Image3, setImage3] = useState("")
    const [Image4, setImage4] = useState("")
    const [Image5, setImage5] = useState("")
    const [Image6, setImage6] = useState("")
    const [Image7, setImage7] = useState("")
    const [Image8, setImage8] = useState("")
    const [Image9, setImage9] = useState("")
    const [Image10, setImage10] = useState("")
    const [urlList, seturlList] = useState([])
    const [URL1, setURL1] = useState("")
    const [URL2, setURL2] = useState("")
    const [URL3, setURL3] = useState("")
    const [URL4, setURL4] = useState("")
    const [URL5, setURL5] = useState("")
    const [URL6, setURL6] = useState("")
    const [URL7, setURL7] = useState("")
    const [URL8, setURL8] = useState("")
    const [URL9, setURL9] = useState("")
    const [URL10, setURL10] = useState("")
    const [progress, setProgress] = useState(0)
    const [ModalImage, setModalImage] = useState(false)
    const [ModalImage2, setModalImage2] = useState(false)
    const [ModalImage3, setModalImage3] = useState(false)
    const [ModalImage4, setModalImage4] = useState(false)
    const [ModalImage5, setModalImage5] = useState(false)
    const [ModalImage6, setModalImage6] = useState(false)
    const [ModalImage7, setModalImage7] = useState(false)
    const [ModalImage8, setModalImage8] = useState(false)
    const [ModalImage9, setModalImage9] = useState(false)
    const [ModalImage10, setModalImage10] = useState(false)


    console.log(urlList);
    const onTitleChange =(event)=>{
        setTitleValue(event.currentTarget.value)
    }

    const onDesciptionChange =(event)=>{
        setDescriptionValue(event.currentTarget.value)
    }
    const onPriceChange =(event)=>{
        setPriceValue(event.currentTarget.value)
    }
    const onQuanityChange =(event)=>{
        setQuantityValue(event.currentTarget.value)
    }
    const onShippingCostChange =(event)=>{
        setShippingCostValue(event.currentTarget.value)
    }
    const onContinentsSelectChange =(event)=>{
        setContinentsValue(event.currentTarget.value)

        
    }

    

    const onDropImage1 = (event) => {
        console.log(event.currentTarget.files[0]);
        if(event.currentTarget.files[0]){
            setImage1(event.currentTarget.files[0])
        } 
        
    };
//     const onDropImage2 = (event) => {
//         console.log(event.currentTarget.files[0]);
//         if(event.currentTarget.files[0]){
//             setImage2(event.currentTarget.files[0])
//         } 
//     };
 
//     const onDropImage3 = (event) => {
//         console.log(event.currentTarget.files[0]);
//         if(event.currentTarget.files[0]){
//             setImage3(event.currentTarget.files[0])
//         } 
//     };
//     const onDropImage4 = (event) => {
//       console.log(event.currentTarget.files[0]);
//       if(event.currentTarget.files[0]){
//           setImage4(event.currentTarget.files[0])
//       } 
//   };
//   const onDropImage5 = (event) => {
//     console.log(event.currentTarget.files[0]);
//     if(event.currentTarget.files[0]){
//         setImage5(event.currentTarget.files[0])
//     } 
// };
// const onDropImage6 = (event) => {
//   console.log(event.currentTarget.files[0]);
//   if(event.currentTarget.files[0]){
//       setImage6(event.currentTarget.files[0])
//   } 
// };
// const onDropImage7 = (event) => {
//   console.log(event.currentTarget.files[0]);
//   if(event.currentTarget.files[0]){
//       setImage7(event.currentTarget.files[0])
//   } 
// };
// const onDropImage8 = (event) => {
//   console.log(event.currentTarget.files[0]);
//   if(event.currentTarget.files[0]){
//       setImage8(event.currentTarget.files[0])
//   } 
// };
// const onDropImage9 = (event) => {
//   console.log(event.currentTarget.files[0]);
//   if(event.currentTarget.files[0]){
//       setImage9(event.currentTarget.files[0])
//   } 
// };
// const onDropImage10 = (event) => {
//   console.log(event.currentTarget.files[0]);
//   if(event.currentTarget.files[0]){
//       setImage10(event.currentTarget.files[0])
//   } 
// };


 
    const handleUploadImage1 = () => {
        console.log("data imagetest:"+Image1);
        const uploadTask = storage.ref(`images/${Image1.name}`).put(Image1);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            console.log("fern4");
            storage
              .ref("images")
              .child(Image1.name)
              .getDownloadURL()
              .then(url => {
                urlList.push(url)
                setURL1(url);
              });
          }
        );

      };


      // const handleUploadImage2 = () => {
      //   console.log("data imagetest:"+Image2);
      //   const uploadTask = storage.ref(`images/${Image2.name}`).put(Image2);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image2.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL2(url);
      //         });
      //         console.log(URL2);
      //     }
      //   );
      // };
      // const handleUploadImage3 = () => {
      //   console.log("data imagetest:"+Image3);
      //   const uploadTask = storage.ref(`images/${Image3.name}`).put(Image3);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image3.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL3(url);
      //         });
      //         console.log(URL3);
      //     }
      //   );
      // };
      // const handleUploadImage4 = () => {
      //   console.log("data imagetest:"+Image4);
      //   const uploadTask = storage.ref(`images/${Image4.name}`).put(Image4);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image4.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL1(url);
      //         });
      //         console.log(URL4);
      //     }
      //   );
      // };

      // const handleUploadImage5 = () => {
      //   console.log("data imagetest:"+Image5);
      //   const uploadTask = storage.ref(`images/${Image5.name}`).put(Image5);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image5.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL2(url);
      //         });
      //         console.log(URL5);
      //     }
      //   );
      // };
      // const handleUploadImage6 = () => {
      //   console.log("data imagetest:"+Image6);
      //   const uploadTask = storage.ref(`images/${Image6.name}`).put(Image6);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image6.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL3(url);
      //         });
      //         console.log(URL6);
      //     }
      //   );
      // };
      // const handleUploadImage7 = () => {
      //   console.log("data imagetest:"+Image7);
      //   const uploadTask = storage.ref(`images/${Image7.name}`).put(Image7);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image7.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL1(url);
      //         });
      //         console.log(URL7);
      //     }
      //   );
      // };
      // const handleUploadImage8 = () => {
      //   console.log("data imagetest:"+Image8);
      //   const uploadTask = storage.ref(`images/${Image8.name}`).put(Image8);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image8.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL2(url);
      //         });
      //         console.log(URL8);
      //     }
      //   );
      // };
      // const handleUploadImage9 = () => {
      //   console.log("data imagetest:"+Image9);
      //   const uploadTask = storage.ref(`images/${Image9.name}`).put(Image9);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image9.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL3(url);
      //         });
      //         console.log(URL9);
      //     }
      //   );
      // };
      // const handleUploadImage10 = () => {
      //   console.log("data imagetest:"+Image10);
      //   const uploadTask = storage.ref(`images/${Image10.name}`).put(Image10);
      //   uploadTask.on(
      //     "state_changed",
      //     snapshot => {
      //       const progress = Math.round(
      //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //       );
      //       setProgress(progress);
      //     },
      //     error => {
      //       console.log(error);
      //     },
      //     () => {
      //       console.log("fern4");
      //       storage
      //         .ref("images")
      //         .child(Image10.name)
      //         .getDownloadURL()
      //         .then(url => {
      //           setURL2(url);
      //         });
      //         console.log(URL10);
      //     }
      //   );
      // };
      



      const images = [
        {
          original: "https://firebasestorage.googleapis.com/v0/b/ferina-436c2.appspot.com/o/images%2Fforest_tree_nature_garden_wood_spring_icon_191925.png?alt=media&token=7d819df5-5f09-4f38-8a7c-91c5353d99da",
          thumbnail: urlList[0],
        },
        {
          original: urlList[1],
          thumbnail: urlList[1],
        },
        {
          original:urlList[2],
          thumbnail: urlList[2],
        },
        {
          original: urlList[3],
          thumbnail: urlList[3],
        },
        {
          original: urlList[4],
          thumbnail: urlList[4],
        },
        {
          original:urlList[5],
          thumbnail: urlList[5],
        },
        {
          original: urlList[6],
          thumbnail: urlList[6],
        },
        {
          original: urlList[7],
          thumbnail: urlList[7],
        },
        {
          original: urlList[8],
          thumbnail: urlList[8],
        },
        {
          original: urlList[9],
          thumbnail: urlList[9],
        },
      ];




    const onSubmit = (event) =>{
        event.preventDefault();
        console.log(props.user.userData.positionShop);

        const variables ={
            writer:props.user.userData._id,
            writerName:props.user.userData.name,
            namePD: TitleValue,
            DescriptionPD:DescriptionValue,
            pricePD : PriceValue,
            shopID:props.user.userData.shopID,
            shopName:props.user.userData.shopName,
            quantityPD : QuantityValue,
            shippingCostPD : ShippingCostValue,
            continentsPD : ContinentsValue,
            positionShop: props.user.userData.positionShop,
            recommended:'no recommend',
            imagesPD1 : urlList[0],
            imagesPD2 :urlList[1],
            imagesPD2 :urlList[2],
            imagesPD4 : urlList[3],
            imagesPD5 : urlList[4],
            imagesPD6 : urlList[5],
            imagesPD7 : urlList[6],
            imagesPD8 : urlList[7],
            imagesPD9 : urlList[8],
            imagesPD10 : urlList[9],

            
        }
        if(!TitleValue || !DescriptionValue || !PriceValue || !QuantityValue || !ShippingCostValue ||!ContinentsValue ){
            return alert("fill all field")
        }


        Axios.post('/api/product/uploadProduct',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
                props.history.push("/Landing")
            }else{
                alert('failed to upload')
            }
        })

    }
    const showModal = () => {
      console.log(urlList.length);
      if(urlList.length >9 ){
        alert("สามารถเพิ่มรูปภาพสินค้าได้ 10 รูปเท่านั้น")
      }else{
        setModalImage(true)
      }
     
    }
    // const showModa2 = () => {
    //   console.log("2")
    //   setModalImage(true)
    //  }
    //  const showModal3 = () => {
    //   console.log("3")
    //   setModalImage(true)
    //  }
    //  const showModal4 = () => {
    //   console.log("4")
    //   setModalImage(true)
    //  }
    //  const showModal5 = () => {
    //   console.log("5")
    //   setModalImage(true)
    //  }
    //  const showModal6 = () => {
    //   console.log("6")
    //   setModalImage(true)
    //  }
    //  const showModal7 = () => {
    //   console.log("7")
    //   setModalImage(true)
    //  }
    //  const showModal8 = () => {
    //   console.log("8")
    //   setModalImage(true)
    //  }
    //  const showModal9 = () => {
    //   console.log("9")
    //   setModalImage(true)
    //  }
    //  const showModal10 = () => {
    //   console.log("10")
    //   setModalImage(true)
    //  }
   
  
    const hideModal = () => {
       setModalImage(false)
    }
    //  const hideModal2 = () => {
    //     setModalImage(false)
    //  }
    //  const hideModal3 = () => {
    //     setModalImage(false)
    //  }
    //  const hideModal4 = () => {
    //     setModalImage(false)
    //  }
    //  const hideModal5 = () => {
    //     setModalImage(false)
    //  }
    //  const hideModal6 = () => {
    //     setModalImage(false)
    //  }
    //  const hideModal7 = () => {
    //     setModalImage(false)
    //  }
    //  const hideModal8= () => {
    //     setModalImage(false)
    //  }
    //  const hideModal9 = () => {
    //     setModalImage(false)
    //  }
    //  const hideModal10 = () => {
    //     setModalImage(false)
    //  }

    //  const checkImge=()=>{
    //    if(URL1 == "https://ssr-releases-cdn.paperlesspost.com/_next/static/images/MobileMediaPoster-553a691ac40df070a04c82b601a117ec.jpg"){
    //      showModal()
    //    }else if(URL1 !== "https://ssr-releases-cdn.paperlesspost.com/_next/static/images/MobileMediaPoster-553a691ac40df070a04c82b601a117ec.jpg" && URL2 == ""){
    //     showModa2()
    //    }else if (URL2 != "" && URL3==''){
    //      showModal3()
    //    }else if (URL3 != "" && URL4==''){
    //     showModal4()
    //   }else if (URL4 != "" && URL5==''){
    //     showModal5()
    //   }else if (URL5 != "" && URL6==''){
    //     showModal6()
    //   }else if (URL6 != "" && URL7==''){
    //     showModal7()
    //   }else if (URL7 != "" && URL8==''){
    //     showModal8()
    //   }else if (URL8 != "" && URL9==''){
    //     showModal9()
    //   }else if (URL9 != "" && URL10==''){
    //     showModal10()
    //   }else{
    //     console.log("error");
    //   }

      
    //  }
 
 

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "red",
        }}
      >
        <Title level={2}>เพิ่มสินค้าในร้านค้า</Title>
      </div>

      <div style={{display: "flex",alignItem:'center'}}>
        <div
          style={{
            width: "60%",
            margin:'20px',
            marginTop:'50px',
            alignItem:'center',
            display:'grid'
          }}
        >
          <div style={{width:'500px',marginLeft:'100px'}}>
          <ImageGallery  items={images} />

          </div>
          <Button  shape="round" icon={<DownloadOutlined/>} size="large" onClick={showModal}>เพิ่มรูปภาพสินค้า</Button>
        </div>
        <div
          style={{
            backgroundColor: "pink",
            height: "auto",
            width: "60%",
            margin:'50px',
            alignItem:'center'
          }}
        >
          {" "}
          <Form onSubmit={onSubmit}>
            <br></br>
            <label>ชื่อสินค้า</label>
            <Input onChange={onTitleChange} value={TitleValue}></Input>
            <br></br>
            <br></br>
            <label>รายละเอียดสินค้า</label>
            <TextArea
              onChange={onDesciptionChange}
              value={DescriptionValue}
            ></TextArea>
            <br></br>
            <br></br>
            <label>ราคา</label>
            <Input
              onChange={onPriceChange}
              value={PriceValue}
              type="number"
            ></Input>
            <br></br>
            <br></br>
            <label>จำนวนที่มีในสต็อก</label>
            <Input
              onChange={onQuanityChange}
              value={QuantityValue}
              type="number"
            ></Input>
            <br></br>
            <br></br>
            <label>ราคาค่าส่ง</label>
            <Input
              onChange={onShippingCostChange}
              value={ShippingCostValue}
              type="number"
            ></Input>
            <br></br>
            <br></br>
            <label>เลือกหมวดหมูสินค้า</label>
            <br></br>
            <select
              onChange={onContinentsSelectChange}
              style={{ marginTop: "10px" }}
            >
              {Continents.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            <br></br>
            <br></br>
            <Button onClick={onSubmit}>เพิ่มสินค้าลงในสต็อก</Button>
          </Form>
        </div>


        <Modal
          title="เพิ่มรูปภาพสินค้าของคุณ"
          visible={ModalImage}
          onCancel={hideModal}
        >
          <div>
            <img src={URL1} style={{width:'500px'}}></img>
          <div class="wrapper">
            <div class="file-upload">เลือกรูปภาพของคุณที่นี่
              <input
                type="file"
                onChange={onDropImage1}
                style={{
                  height: "200px",
                  width: "250px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  opacity: "0",
                  cursor: "pointer",
                }}
              />
              <h1>  </h1>
        
            </div>
            {handleUploadImage1}
            <a>{URL}</a>
          </div>
          <Button onClick={handleUploadImage1}>Upload</Button>
          </div>
        </Modal>

      


        
        {/* <a>image2</a>
      <div class="wrapper">
        <div class="file-upload">
          <input
            type="file"
            onChange={onDropImage2}
            style={{
              height: "200px",
              width: "200px",
              position: "absolute",
              top: "0",
              left: "0",
              opacity: "0",
              cursor: "pointer",
            }}
          />
          <h1></h1>
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
        <button onClick={handleUploadImage2}>Upload</button>
        <a>{URL}</a>
      </div>
      <a>image3</a>
      <div class="wrapper">
        <div class="file-upload">
          <input
            type="file"
            onChange={onDropImage3}
            style={{
              height: "200px",
              width: "200px",
              position: "absolute",
              top: "0",
              left: "0",
              opacity: "0",
              cursor: "pointer",
            }}
          />
          <h1></h1>
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
        <button onClick={handleUploadImage3}>Upload</button>
        <a>{URL}</a>
      </div> */}
      </div>
    </div>
  );
}


export default UploadProductPage;

