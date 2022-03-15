import Axios from 'axios'
import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react'
import ProductImage from './Section/ProductImage';
import ProductInfo from './Section/ProductInfo';
import ImageGallery from 'react-image-gallery';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';




function DetailProductPage(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])

    useEffect(()=>{
        //console.log(props.match.params.productId);
        Axios.get(`/api/product/product_by_id?id=${productId}&type=single`)
        .then(response=>{
            setProduct(response.data[0])
        })
       
    })
    
    

    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId))
    }

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
    <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.namePD}</h1>
            </div>
            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <ImageGallery items={images} />;
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo  addToCart={addToCartHandler} detail={Product}/>
                      
                </Col>
            </Row>
        </div>
  )
}

export default DetailProductPage