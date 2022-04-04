import React ,{useState} from 'react'
import { Typography,Button,Form,message,Input,Icon,Modal,Upload} from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { render } from "react-dom";
import { storage } from "../../firebaseConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import ImageGallery from 'react-image-gallery';
import { CloudUploadOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import './upload.css'

const {Title} = Typography;
const {TextArea} = Input ;

const Continents =[
    {key : 1, value:"เสื้อผ้าแฟชั่นผู้ชาย"},
    {key : 2, value:"เสื้อผ้าแฟชั่นผู้หญิง"},
    {key : 3, value:"ความงามและของใช้ส่วนตัว"},
    {key : 4, value:"อาเสริมและผลิตภัณฑ์เพื่อสุขภาพ"},
    {key : 5, value:"ของเล่นเด็ก สินค้าแม่และเด็ก"},
    {key : 6, value:"นาฬิกาและเเว่นตา"},
    {key : 7, value:"เครื่องใช้ในบ้าน"},
    {key : 8, value:"กระเป๋า"},
    {key : 9, value:"รองเท้าผู้ชาย"},
    {key : 10, value:"รองเท้าผู้หญิง"},
    {key : 11, value:"มือถือและอุปกรณ์เสริม"},
    {key : 12, value:"คอมพิวเตอร์และเเล็ปท็อป"},
    {key : 13, value:"กล้องและอุปกรณ์ถ่ายภาพ"},
    {key : 14, value:"เครื่องประดับ"},
    {key : 15, value:"กีฬาและกิจกรรมกลางเเจ้ง"},
    {key : 16, value:"อาหารและเครื่องดืม"},
    {key : 17, value:"เครื่องใช้ไฟฟ้าภายในบ้าน"},
    {key : 18, value:"สื่อบันเทิงภายในบ้าน"},
    {key : 19, value:"สัตว์เลี้ยง"},
    {key : 20, value:"เครื่องเขียน หนังสือ และเครื่องดนตรี"},
    {key : 21, value:"ยานยนต์"},
    {key : 22, value:"เกมและอุปกรณ์เสริม"},

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
    const [fileList, setFileList] = useState([])



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
            console.log(event.currentTarget.files[0]);
        } 
        
    };



 
    // const handleUploadImage1 = () => {
    //     console.log("data imagetest:"+ Image1);
    //     const uploadTask = storage.ref(`images/${Image1.name}`).put(Image1);
    //     uploadTask.on(
    //       "state_changed",
    //       snapshot => {
    //         const progress = Math.round(
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );
    //         setProgress(progress);
    //       },
    //       error => {
    //         console.log(error);
    //       },
    //       () => {
    //         console.log("fern4");
    //         storage
    //           .ref("images")
    //           .child(Image1.name)
    //           .getDownloadURL()
    //           .then(url => {
    //             urlList.push(url)
    //             setURL1(url);
    //           });
    //       }
    //     );

    //   };

    const handleUploadImage1 = async (image) => {
      console.log("data imagetest:" + image);
      const uploadTask = storage.ref(`images/${image.name}`).put(image.originFileObj);
      await uploadTask.on(
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
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              urlList.push(url)
            });
        }
      );
      // console.log(urlList);
    };





      const images = [
        {
          original: urlList[0],
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

      const pushImageToarray = () => {
        console.log("d");
        for (let i = 0; i < fileList.length; i++) {
          console.log("inloop", urlList[0]);
          setImage1(urlList[0])
          handleUploadImage1(fileList[i])
        }
      }

      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log(newFileList);
      };
    
      const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };
      




    const onSubmit = () =>{
        pushImageToarray()
        openMessage()

        console.log(props.user.userData.positionShop);
        setTimeout(() => {

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
            descripstionPD: DescriptionValue,
            imagesPD1 : urlList[0],
            imagesPD2 :urlList[1],
            imagesPD3 :urlList[2],
            imagesPD4 : urlList[3],
            imagesPD5 : urlList[4],
            imagesPD6 : urlList[5],
            imagesPD7 : urlList[6],
            imagesPD8 : urlList[7],
            imagesPD9 : urlList[8],
            imagesPD10 : urlList[9],
        }
        if(!TitleValue || !DescriptionValue || !PriceValue || !QuantityValue || !ShippingCostValue ||!ContinentsValue ){
          message.error('กรุณากรอกข้อมูลให้ครบ');
        }else{
          Axios.post('/api/product/uploadProduct',variables)
        .then(response =>{
            if(response.data.success){
                props.history.push("/Landing")
            }else{
                alert('failed to upload')
            }
        })
          
        }

        }, 5000);

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
       setURL1("")
    }
    const key = 'updatable';
    const openMessage = () => {
      message.loading({ content: 'กำลังเพิ่มสินค้า...', key });
      setTimeout(() => {
        message.success({ content: 'เพิ่มสินค้าสำเร็จ!', key, duration: 2 });
      }, 5500);
    };
      



  return (
    <div style={{width: "90%", margin: "1rem auto",marginLeft:'95px'}}>
      <div
        style={{
          textAlign: "center",
        }}
      >
        
       
        <Title level={1}>เพิ่มสินค้าในร้านค้า</Title>
        <div>
        <ImgCrop rotate  style={{width:100}} width={100} size="small">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 10 && '+ Upload'}
            </Upload>
          </ImgCrop>
        </div>
        
      </div>
      

      {/* <div style={{display: "flex",alignItem:'center'}}>
        <div
          style={{
            width: "60%",
            margin:'20px',
            alignItem:'center',
            display:'grid'
          }}
        >
          <div style={{width:'500px',marginLeft:'50px'}}>
          <ImageGallery  items={images} />

          </div>
          <Button  shape="round" icon={<DownloadOutlined/>} size="large" onClick={showModal}>เพิ่มรูปภาพสินค้า</Button>
        </div> */}
        <div>
          

        </div>
        <div
          style={{
            height: "auto",
            width: "60%",
            margin:'auto',
            alignItem:'center',
            
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
          onOk={hideModal}
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
    // </div>
  );
}



export default UploadProductPage;

