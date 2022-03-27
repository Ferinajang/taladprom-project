import React ,{useEffect,useState}from 'react'
import { Radio ,Checkbox,Button} from "antd";

function UserCardBlock(props) {
    let count =0
    const [CheckToggle, setCheckToggle] = useState(false)
  const renderItems = () =>
    props.products &&
    props.products.map((product) => (
        <tr key={product._id}>
          <td>
            <img
              style={{ width: "70px" }}
              alt="product"
              src={product.imagesPD1}
            />
          </td>
          <td>{product.quantity} EA</td>
          <td>${product.pricePD} </td>
          <td>
            <button onClick={() => props.removeItem(product._id)}>
              Remove
            </button>
            <button 
            onClick={() => props.createOrder(product)} 
            style={{width:'auto'}} >order it</button>
          </td>
        </tr>
    ));
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}
export default UserCardBlock;
