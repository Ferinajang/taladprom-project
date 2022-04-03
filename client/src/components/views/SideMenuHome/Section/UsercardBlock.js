import React ,{useEffect,useState}from 'react'
import { Radio ,Checkbox,Button,Card,Col} from "antd";

function UserCardBlock(props) {
    let count =0
    const [CheckToggle, setCheckToggle] = useState(false)

const renderCards = () =>
  props.products &&
  props.products.map((product) => (
    <Col lg={20} style={{ marginLeft: "100px" }}>
      <Card>
        <div style={{ display: "flex" }}>
          <img
            style={{ width: "150px" }}
            alt="product"
            src={product.imagesPD1}
          />
          <div style={{display:'block' ,margin:'20px'}}>
            <h2>ชื่อสินค้า {product.namePD}</h2>
            <h3>จำนวน {product.quantity} ชิ้น</h3>
            <h3>ราคา {product.pricePD} บาท</h3>
          </div>
        </div>
        <div style={{display:'flex' ,marginLeft:'80px',float:'right'}}>
          <Button 
           style={{float:'right',margin:'5px'}} danger type="primary"
           onClick={() => props.removeItem(product._id)}>
            นำออกจาตระกร้า
          </Button>
          <Button
          
            onClick={() => props.createOrder(product)} 
            style={{ width: "auto" , float:'right',margin:'5px'}}
          >
            สรุปรายการสินค้า
          </Button>
        </div>
      </Card>
      <br/>
      <br/>
    </Col>
    
  ));
     
    
              

  // const renderItems = () =>
  //   props.products &&
  //   props.products.map((product) => (
  //       <tr key={product._id}>
  //         <td>
  //           <img
  //             style={{ width: "70px" }}
  //             alt="product"
  //             src={product.imagesPD1}
  //           />
  //         </td>
  //         <td>{product.quantity} EA</td>
  //         <td>${product.pricePD} </td>
  //         <td>
  //           <button onClick={() => props.removeItem(product._id)}>
  //             Remove
  //           </button>
  //           <button 
  //           onClick={() => props.createOrder(product)} 
  //           style={{width:'auto'}} >order it</button>
  //         </td>
  //       </tr>
  //   ));
  return (
    <div>
      {/* <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table> */}
      {renderCards()}
      
    </div>
  );
}
export default UserCardBlock;
