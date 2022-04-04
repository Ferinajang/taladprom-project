import React from "react";
import { Spin, Space } from "antd";

// .example {
//   margin: 20px 0;
//   margin-bottom: 20px;
//   padding: 30px 50px;
//   text-align: center;
//   background: rgba(0, 0, 0, 0.05);
//   border-radius: 4px;
// }

function Loading(props) {
  
    
  return (
    <div>
       <div style={{margin:'auto' ,marginBottom:'20px',padding:'30px 50px',textAlign:'center',marginTop:'250px'}}>
      <Space size="large">
        <Spin size="large"/>
      </Space>
      <div
        style={{
          fontFamily: "Prompt",
          fontWeight: "500",
          color: "#680C07",
          fontSize: "20px",
          alignItems: "center",
        }}
      >
        กำลังโหลด...
      </div>
    </div>

    </div>
   
  );
}

export default Loading;
