import React ,{useState} from 'react'
import { Typography,Button,Form,message,Input,Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { render } from "react-dom";
import { storage } from "../../firebaseConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

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

  console.log("upload",props.user.userData);
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
    const [URL1, setURL1] = useState("")
    const [URL2, setURL2] = useState("")
    const [URL3, setURL3] = useState("")
    const [progress, setProgress] = useState(0)

    
 

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
    const updateImages = (newImage)=>{
        console.log(newImage)
        setImages(newImage)
    }

    

    const onDropImage1 = (event) => {
        console.log(event.currentTarget.files[0]);
        if(event.currentTarget.files[0]){
            setImage1(event.currentTarget.files[0])
        } 
    };
    const onDropImage2 = (event) => {
        console.log(event.currentTarget.files[0]);
        if(event.currentTarget.files[0]){
            setImage2(event.currentTarget.files[0])
        } 
    };
 
    const onDropImage3 = (event) => {
        console.log(event.currentTarget.files[0]);
        if(event.currentTarget.files[0]){
            setImage3(event.currentTarget.files[0])
        } 
    };
 
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
                setURL1(url);
              });
              console.log(URL1);
          }
        );
      };
      const handleUploadImage2 = () => {
        console.log("data imagetest:"+Image2);
        const uploadTask = storage.ref(`images/${Image2.name}`).put(Image2);
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
              .child(Image2.name)
              .getDownloadURL()
              .then(url => {
                setURL2(url);
              });
              console.log(URL2);
          }
        );
      };
      const handleUploadImage3 = () => {
        console.log("data imagetest:"+Image3);
        const uploadTask = storage.ref(`images/${Image3.name}`).put(Image3);
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
              .child(Image3.name)
              .getDownloadURL()
              .then(url => {
                setURL3(url);
              });
              console.log(URL3);
          }
        );
      };


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
            imagesPD1 : URL1,
            imagesPD2 : URL2,
            imagesPD3 : URL3,
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
  return (
      
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{textAlign:'center' , marginBottom:'2rem auto'}}>
            <Title level={2} >เพิ่มสินค้าในร้านของคุณ</Title>
        </div>
        <a>เลือกรูปที่ 1</a>
        <div class="wrapper">
        <div class="file-upload">
            <input type="file" 
            onChange={onDropImage1}
            style={{ 
                height:'200px' ,
                width:'200px', 
                position:'absolute',
                top:'0',
                left:'0',
                opacity:'0',
                cursor:'pointer'}}/>
                <h1></h1>
           <FontAwesomeIcon icon={faArrowUp} />
        </div>
        <button onClick={handleUploadImage1}>อัปโหลด</button>
        <a>{URL}</a>
        </div>
        <a>เลือกรูปที่ 2</a>
        <div class="wrapper">
        <div class="file-upload">
            <input type="file" 
            onChange={onDropImage2}
            style={{ 
                height:'200px' ,
                width:'200px', 
                position:'absolute',
                top:'0',
                left:'0',
                opacity:'0',
                cursor:'pointer'}}/>
                <h1></h1>
           <FontAwesomeIcon icon={faArrowUp} />
        </div>
        <button onClick={handleUploadImage2}>อัปโหลด</button>
        <a>{URL}</a>
        </div>
        <a>เลือกรูปที่ 3</a>
        <div class="wrapper">
        <div class="file-upload">
            <input type="file" 
            onChange={onDropImage3}
            style={{ 
                height:'200px' ,
                width:'200px', 
                position:'absolute',
                top:'0',
                left:'0',
                opacity:'0',
                cursor:'pointer'}}/>
                <h1></h1>
           <FontAwesomeIcon icon={faArrowUp} />
        </div>
        <button onClick={handleUploadImage3}>อัปโหลด</button>
        <a>{URL}</a>
        </div>

        <Form onSubmit={onSubmit}>
            <br></br>
            <label>ชื่อสินค้า</label>
            <Input onChange={onTitleChange} value={TitleValue}></Input>
            <br></br>
            <br></br>
            <label>รายละเอียดสินค้า</label>
            <TextArea onChange={onDesciptionChange} value={DescriptionValue}></TextArea>
            <br></br>
            <br></br>
            <label>ราคา</label>
            <Input onChange={onPriceChange} value={PriceValue} type='number'></Input>
            <br></br>
            <br></br>
            <label>จำนวน</label>
            <Input onChange={onQuanityChange} value={QuantityValue} type='number'></Input>
            <br></br>
            <br></br>
            <label>Shipping Cost</label>
            <Input onChange={onShippingCostChange} value={ShippingCostValue} type='number'></Input>
            <br></br>
            <br></br>
            <select onChange={onContinentsSelectChange} style={{marginTop:'10px'}}>
                {Continents.map(item =>(
                    <option key={item.key} value={item.key}>{item.value}</option>

                ))}    
            </select>
            <br></br>
            <br></br>
            <Button onClick={onSubmit}>ยืนยัน</Button>
            
        </Form>

    </div>
  )
}


export default UploadProductPage;

