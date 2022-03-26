import React from "react";
import { Spin, Space } from "antd";

function Loading(props) {
    
  return (
    <div>
      <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </Space>
      <div
        style={{
          fontFamily: "Prompt",
          fontWeight: "500",
          color: "#680C07",
          fontSize: "80%",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    </div>
  );
}

export default Loading;
