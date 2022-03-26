
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
            <div><h1>{Product.pricePD}</h1></div>

        </div>
        <Descriptions>
            <Descriptions.Item label ="Price">{Product.pricePD}</Descriptions.Item>
            <Descriptions.Item label ="Sold"> {Product.sold}</Descriptions.Item>
            <Descriptions.Item label ="Name">{Product.namePD} </Descriptions.Item>
            <Descriptions.Item label ="Shop">{Product.writerName}</Descriptions.Item>
            <div style={{display: 'flex' , justifyContent:'center'}}>
                <Button size="large" shape='round' type='danger'
                onClick ={addToCarthandler}
                >Add to Cart</Button>
            </div>


        </Descriptions>

    </div>
  )
}

export default ProductInfo