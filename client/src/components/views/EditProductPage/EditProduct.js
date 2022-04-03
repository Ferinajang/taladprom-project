import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input, Icon, Upload } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import { render } from "react-dom";
import { storage } from "../../firebaseConfig"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import ImgCrop from 'antd-img-crop';
import Loading from '../../Loading';
import { continentsPD } from '../LandingPage/Section/Data';


const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "เสื้อผ้า" },
  { key: 2, value: "Shoe2" },
  { key: 3, value: "Shoe3" },
  { key: 4, value: "Shoe4" },
  { key: 5, value: "Shoe5" },
]



function EditProduct(props) {
  const productId = props.match.params.productId
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
  const [Product, setProduct] = useState([])
  const [imageArray, setimageArray] = useState([])
  const [previewVisible, setpreviewVisible] = useState(false)
  const [previewImage, setpreviewImage] = useState("")
  const [previewTitle, setpreviewTitle] = useState("")
  const [urlList, seturlList] = useState([])
  const [fileList, setFileList] = useState([])
  const [loading, setloading] = useState(true);
  const [arrayImage, setarrayImage] = useState([])

  console.log("out loop", urlList);



  useEffect(() => {
    const variables = {
      id: productId
    };
    Axios.post("/api/product/getProductByIDEdit", variables).then(
      (response) => {
        if (response.data.success) {
          setProduct(response.data.product[0])
          setTitleValue(Product.namePD)
          setDescriptionValue(Product.DescriptionPD)
          setPriceValue(Product.pricePD)
          setShippingCostValue(Product.shippingCostPD)
          setContinentsValue(Product.continentsPD)
          imageRender(response.data.product[0])

        } else {
          alert("Fialed to fecth data from mongodb");
        }
      }
    );


  }, [])

  const imageRender = (product) => {
    arrayImage.push(product.imagesPD1)
    arrayImage.push(product.imagesPD2)
    arrayImage.push(product.imagesPD3)
    arrayImage.push(product.imagesPD5)
    arrayImage.push(product.imagesPD6)
    arrayImage.push(product.imagesPD7)
    arrayImage.push(product.imagesPD8)
    arrayImage.push(product.imagesPD9)
    arrayImage.push(product.imagesPD10)
    setloading(false)
  }

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value)
  }

  const onDesciptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value)
  }
  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value)
  }
  const onShippingCostChange = (event) => {
    setShippingCostValue(event.currentTarget.value)
  }
  const onContinentsSelectChange = (event) => {
    setContinentsValue(event.currentTarget.value)
  }


  const pushImageToarray = () => {
    console.log("d");
    for (let i = 0; i < fileList.length; i++) {
      console.log("inloop", urlList[0]);
      setImage1(urlList[0])
      handleUploadImage1(fileList[i])
    }
    // console.log(urlList);
    // const variables = {
    //   namePD: TitleValue,
    //   DescriptionPD: DescriptionValue,
    //   pricePD: PriceValue,
    //   quantityPD: QuantityValue,
    //   shippingCostPD: ShippingCostValue,
    //   continentsPD: ContinentsValue,
    //   imagesPD1: Image1,
    //   imagesPD2: urlList[1],
    //   imagesPD3: urlList[2],
    // }
    // console.log("eiei",variables);

    // if(!TitleValue || !DescriptionValue || !PriceValue || !QuantityValue || !ShippingCostValue ||!ContinentsValue ){
    //     return alert("fill all field")
    // }
    // console.log(productId);
    // Axios.put("/api/product/update/" + productId, variables)
    //   .then(response => {
    //     console.log("yesss");
    //     console.log(urlList);
    //   })

  }



  const onSubmit = () => {
    // setTimeout(() => {
    pushImageToarray()
    // }, 10000); 

    // console.log(urlList);
    setTimeout(() => {
      console.log("final", urlList);
      const variables = {
        namePD: TitleValue,
        DescriptionPD: DescriptionValue,
        pricePD: PriceValue,
        quantityPD: QuantityValue,
        shippingCostPD: ShippingCostValue,
        continentsPD: ContinentsValue,
        imagesPD1: urlList[0],
        imagesPD2: urlList[1],
        imagesPD3: urlList[2],
      }
      console.log("eiei", variables);

      // if(!TitleValue || !DescriptionValue || !PriceValue || !QuantityValue || !ShippingCostValue ||!ContinentsValue ){
      //     return alert("fill all field")
      // }
      console.log(productId);
      Axios.put("/api/product/update/" + productId, variables)
        .then(response => {
          console.log("yesss");
          console.log(urlList);
        })

    }, 10000);
  }

  const DeleteImage = (image, index) => {
    console.log(";;;", image, index);
    arrayImage.splice(index, 1)
    console.log(arrayImage);
    return (
      <div>
        <p>ern</p>{renderCardsImage}</div>
    )
  }

  const renderCardsImage = arrayImage.map((image, index) => {
    return (
      <div style={{ width: '100%' }}>
        <a onClick={() => DeleteImage(image, index)}>
          <img src={image} style={{ width: '100px' }}></img>
        </a>

      </div>
    )
  });


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

  ////////////////////////////////////////////////////////

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
  const loadingData = () => {


  }

  if (loading) {
    return (
      <div>
        <Loading />;
      </div>
    );
  } else {
    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem auto" }}>
          <Title level={2}>แก้ไขสินค้าในร้านค้าของคุณ</Title>
        </div>
        <div>
          <ImgCrop rotate >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 5 && '+ Upload'}
            </Upload>
          </ImgCrop>

        </div>
        {renderCardsImage}
        <Form onSubmit={onSubmit}>
          <br></br>
          <label>ชื่อสินค้า</label>
          <Input
            onChange={onTitleChange}
            value={TitleValue}
            placeholder={Product.namePD}
          ></Input>
          <br></br>
          <br></br>
          <label>รายละเอียดสินค้า</label>
          <TextArea
            onChange={onDesciptionChange}
            value={DescriptionValue}
            placeholder={Product.DescriptionPD}
          ></TextArea>
          <br></br>
          <br></br>
          <label>ราคา</label>
          <Input
            onChange={onPriceChange}
            value={PriceValue}
            type="number"
            placeholder={Product.pricePD}
          ></Input>
          <br></br>
          <br></br>
          <label>ค่าส่ง</label>
          <Input
            onChange={onShippingCostChange}
            value={ShippingCostValue}
            type="number"
            placeholder={Product.shippingCostPD}
          ></Input>
          <br></br>
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
          <Button onClick={onSubmit}>ยืนยัน</Button>
        </Form>


      </div>
    );
  }
};

export default EditProduct;

