import React ,{useEffect,useState} from 'react'
import { Typography,Button,Form,message,Input,Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { render } from "react-dom";
import { storage } from "../../firebaseConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'



const {Title} = Typography;
const {TextArea} = Input ;



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
    const [modalIsOpen,setModalIsOpen] = useState(false);
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


    useEffect(( ) => {
      Axios.post('/api/position/getposition')
        .then(response => {
            if(response.data.success){
                setAllPosition(response.data.position)
                // setPSTS1(response.data.position.shop1)
                // setPSTS1(response.data.position.shop1)
                // setPSTS1(response.data.position.shop1)
                // setPSTS1(response.data.position.shop1)
            }else{
                alert("Fialed to fecth data from mongodb")
            }
        }
    )
      
  }, [])
  
  const checkAllPosition=()=>{
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


    const onTitleShopChange =(event)=>{
        setTitleShop(event.currentTarget.value)
    }

    const onEmailShopChange =(event)=>{
        setEmailShop(event.currentTarget.value)
        
    }
    const onPhoneNumberShopChange =(event)=>{
        setPhoneNumberShop(event.currentTarget.value)
    }
    

    const onDesciptionShopChange =(event)=>{
        setDescriptionShop(event.currentTarget.value)
    }

    const onDropImageShop = (event) => {
        console.log(event.currentTarget.files[0]);
        if(event.currentTarget.files[0]){
            setImageShop(event.currentTarget.files[0])
        } 
    };
    
  const setModalIsOpenToFalse =()=>{
      setModalIsOpen(false)
      
  }
  const selectPositionShop =()=> {
    checkAllPosition()
    setModalIsOpen(true)
  }
  
    const handleUploadImageShop = () => {
        console.log("data imagetest:"+ImageShop);
        const uploadTask = storage.ref(`images/${ImageShop.name}`).put(ImageShop);
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
              .child(ImageShop.name)
              .getDownloadURL()
              .then(url => {
                setURLShop(url);
              });
              console.log(URLShop);
          }
        );
      };
    
      const onSubmit = (event) =>{
        event.preventDefault();
        const variables ={
            ownerID:props.user.userData._id,
            ownerName:props.user.userData.name,
            nameShop: TitleShop,
            descripstionShop:DescriptionShop,
            emailShop : EmailShop,
            phoneNumberShop : PhoneNumberShop,
            imagesShopp : URLShop,
            positionShop : positionShop
        }
        const DataShopToUser ={
            ownerName:props.user.userData.name,
            nameShop: TitleShop,
        }
       /* if(!TitleShop || !DescriptionShop || !EmailShop || !PhoneNumberShop ){
            return alert("fill all field")
        }*/
        Axios.post('/api/shop/uploadShop',variables)
        .then(response =>{
            if(response.data.success){
                console.log("ggg",response.data);
                alert('product success to upload')
                sendShopInfoToUser()
                // props.history.push("/HomeShop")
            }else{
                alert('failed to upload')
            }
        })      
        // Axios.post('/api/shop/uploadShop',variables)
        // .then(response =>{
        //     if(response.data.success){
        //         alert('product success to upload')
        //         props.history.push("/Landing")
        //     }else{
        //         alert('failed to upload')
        //     }
        // })
    }
    
    const sendShopInfoToUser =()=>{
    const variables1 ={   
      id : props.user.userData._id
    }
    Axios.post('/api/shop/getShopsById',variables1)
          .then(response =>{
              if(response.data.success){
                console.log(response.data.shops.ownerID);
                if(response.data.shops.ownerID ==  props.user.userData._id){
                  if(response.data.shops.ownerID ==  props.user.userData._id){
                    console.log(response.data.shops);
                    const variables2 ={
                      id:props.user.userData._id,
                      shopID:response.data.shops._id,
                      shopName:response.data.shops.nameShop,
                      positionShop:response.data.shops.positionShop
                  }
                  Axios.put('/api/users/editProfile',variables2)
                        .then(response =>{
                            if(response.data.success){
                                alert('product success to upload')
                                props.history.push("/HomeShop")
                            }else{
                                alert(response)
                            }
                        })
                    
                  } 
                }
              }else{
                  alert(response)
              }
          })
    }
    const checkPosition1 =()=>{
      setPSTS1(true)
      setpositionShop("1")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop1:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
    }

    const checkPosition2 =()=>{
      setPSTS2(true)
      setpositionShop("2")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop2:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition3 =()=>{
      setPSTS3(true)
      setpositionShop("3")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop3:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition4 =()=>{
      setPSTS4(true)
      setpositionShop("4")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop4:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition5 =()=>{
      setPSTS5(true)
      setpositionShop("5")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop5:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition6 =()=>{
      setPSTS6(true)
      setpositionShop("6")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop6:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition7 =()=>{
      setPSTS7(true)
      setpositionShop("7")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop7:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition8 =()=>{
      setPSTS8(true)
      setpositionShop("8")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop8:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition9 =()=>{
      setPSTS9(true)
      setpositionShop("9")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop9:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition10 =()=>{
      setPSTS10(true)
      setpositionShop("10")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop10:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition11 =()=>{
      setPSTS11(true)
      setpositionShop("11")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop11:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
    const checkPosition12 =()=>{
      setPSTS12(true)
      setpositionShop("12")
      const variables ={
        id:"622fa7e4374d6e188407dc0f",
        shop12:true
      }
      Axios.put('/api/position/editPosition',variables)
        .then(response =>{
            if(response.data.success){
                alert('product success to upload')
            }else{
                alert(response)
            }
        })
      
    }
  return ( 
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{textAlign:'center' , marginBottom:'2rem auto'}}>
            <Title level={2} >Upload shop</Title>
        </div>
        <a>image1</a>
        <div class="wrapper">
        <div class="file-upload">
            <input type="file" 
            onChange={onDropImageShop}
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
        </div>
        <Modal className="modal-position" isOpen={modalIsOpen}>
        <button onClick={setModalIsOpenToFalse}>x</button>
        <ul>
          <div style={{float:'left' }}>
          <div>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS7} onClick={checkPosition7}>7</Button>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS8} onClick={checkPosition8}>8</Button>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS9} onClick={checkPosition9}>9</Button>
          </div>
          <div>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS1} onClick={checkPosition1}>1</Button>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS2} onClick={checkPosition2}>2</Button>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS3} onClick={checkPosition3}>3</Button>
          </div>
          </div>
          <div style={{float:'right',marginRight:'100px'}}>
          <div>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS10} onClick={checkPosition10}>10</Button>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS11} onClick={checkPosition11}>11</Button>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS12} onClick={checkPosition12}>12</Button>
          
          </div>
          <div>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS4} onClick={checkPosition4}>4</Button>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS5} onClick={checkPosition5}>5</Button>
          <Button style={{width:'100px', height:'100px'}} disabled={PSTS6} onClick={checkPosition6}>6</Button>
          </div>

          </div>
        </ul>
      </Modal>
      
        <Form onSubmit={onSubmit}>
            <br></br>
            <label>Name</label>
            <Input onChange={onTitleShopChange} value={TitleShop}></Input>
            <br></br>
            <br></br>
            <label>Email</label>
            <TextArea onChange={onEmailShopChange} value={EmailShop}></TextArea>
            <br></br>
            <br></br>
            <label>Phone Number</label>
            <Input onChange={onPhoneNumberShopChange} value={PhoneNumberShop} type='text'></Input>
            <br></br>
            <br></br>
            <label>Description</label>
            <Input onChange={onDesciptionShopChange} value={DescriptionShop} type='text'></Input>
            <br></br>
            <br></br>
            <Button onClick={selectPositionShop}> select positionShop</Button>
  
            <Button onClick={onSubmit}> Submit</Button>

            {/* <Button onClick={sendShopInfoToUser}> test</Button> */}
            
        </Form>

    </div>
  )
}
export default CreateShop;

