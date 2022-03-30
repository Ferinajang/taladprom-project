import Axios from 'axios'
import { Row, Col ,Button} from 'antd';
import React, { useEffect, useState } from 'react'
import ProductImage from './Section/ProductImage';
import ProductInfoSeller from './Section/ProductInfoSeller';
import ImageGallery from 'react-image-gallery';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';




function DetailProductPageSeller(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    //console.log(props.match.params.productId);
    Axios.get(`/api/product/product_by_id?id=${productId}&type=single`).then(
      (response) => {
        setProduct(response.data[0]);
      }
    );
  });

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };

  const images = [
    {
      original: Product.imagesPD1,
      thumbnail: Product.imagesPD1,
    },
    {
      original: Product.imagesPD2,
      thumbnail: Product.imagesPD2,
    },
    {
      original: Product.imagesPD3,
      thumbnail: Product.imagesPD3,
    },
  ];

  return (
    <div >
      <div
        className="postPage"
        style={{
          width: "85%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop:'30px'
        }}
      >
        <div
          style={{
            width: "60%",
            height:'70vh',
            float: "right",
            backgroundColor: "#fafafa",
          }}
        >
          <div style={{
            width: "100%",
            padding:'10px',
            backgroundColor: "#f5f5f5",
          }}>
            <h1>{Product.namePD}</h1>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start" ,marginLeft:'20px',marginTop:'20px'}}>
            <ProductInfoSeller addToCart={addToCartHandler} detail={Product} />
          </div>
          <div style={{float:'right'}}>
          <Button
          style={{marginTop:'180px'}}
            size="large"
            shape="round"
            type="danger"
            onClick={() =>
              (window.location.href = `/product/update/${Product._id}`)
            }
          >
            แก้ไขรายละเอียดสินค้า
          </Button>
        </div>
        </div>
        <div>
          <Col lg={8} xs={24}>
            <ImageGallery items={images} />;
          </Col>
        </div>

      </div>
    </div>
  );
}

export default DetailProductPageSeller;