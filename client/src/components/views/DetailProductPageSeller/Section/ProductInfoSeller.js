
import {Button , Descriptions} from 'antd'
import React, { useEffect, useState } from 'react'
import {addToCart} from "../../../../_actions/user_actions"

function ProductInfoSeller(props) {
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
        <Descriptions>
            <Descriptions.Item label ="Price">{Product.pricePD}</Descriptions.Item>
            <Descriptions.Item label ="Sold"> {Product.sold}</Descriptions.Item>
            <Descriptions.Item label ="Name">{Product.namePD} </Descriptions.Item>
            <Descriptions.Item label ="Shop">{Product.writerName}</Descriptions.Item>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div style={{display: 'flex' , justifyContent:'center'}}> 
                <Button size="large" shape='round' type='danger'
                onClick={() => window.location.href = `/product/update/${Product._id}`}
                >Edit</Button>
            </div>


        </Descriptions>

    </div>
  )
}

export default ProductInfoSeller