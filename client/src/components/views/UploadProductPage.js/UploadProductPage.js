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
    const [urlList, seturlList] = useState([])
    const [URL1, setURL1] = useState("")
    const [progress, setProgress] = useState(0)
    const [ModalImage, setModalImage] = useState(false)



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
 
  
    const hideModal = () => {
       setModalImage(false)
    }
      



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
      </div>
    </div>
  );
}



export default UploadProductPage;

