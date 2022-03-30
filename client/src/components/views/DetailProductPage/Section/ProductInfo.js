
import {Button , Descriptions} from 'antd'
import React, { useEffect, useState } from 'react'
import {addToCart} from "../../../../_actions/user_actions"

function ProductInfo(props) {
    const [Product, setProduct] = useState({})

    useEffect(() => {
        console.log();

        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }
    
  return (
    <div>
      <div>
        <div style={{textAlign:'left' }}>
          <h1>ราคา {Product.pricePD} บาท</h1>
          <h2>รายละเอียดสินค้า {Product.descripstionPD}</h2>
          <h2>ค่าจัดส่ง {Product.shippingCostPD} บาท</h2>
          <h2>สินค้าในคลัง {Product.quantityPD} ชิ้น</h2>
        </div>
      </div>
      {/* <Descriptions>
        <Descriptions.Item label="Price">{Product.pricePD}</Descriptions.Item>
        <Descriptions.Item label="Sold"> {Product.sold}</Descriptions.Item>
        <Descriptions.Item label="Name">{Product.namePD} </Descriptions.Item>
        <Descriptions.Item label="Shop">{Product.writerName}</Descriptions.Item>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> */}
       
      {/* </Descriptions> */}
    </div>
  );
}

export default ProductInfo