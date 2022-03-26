import React from 'react';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;



function LeftMenu(props) {

  const GotoHomeManagement =()=>{
    window.location.href = "/HomeShop"
  }
  const GotoProductMangement =()=>{
    window.location.href = "/Landing"
  }
  const GotoOrderManagement =()=>{
    window.location.href = "/orderManagement"
  }
  const GotoCouponManagement =()=>{
    window.location.href = "/create-coupon"
  }
  return (
    <Menu  mode="horizontal" title="ตลาดพร้อม">
    <Menu.Item key="mail">
      <a href="/HomeShop">Home</a>
    </Menu.Item>
    <Menu.Item key="ss">
      <a href="/taladprom-shop">TaladProm</a>
    </Menu.Item>
{/* 
    <SubMenu  title="More">
      <Menu.ItemGroup title="Item 1">
        <Menu.Item key="setting:1" onClick={GotoHomeManagement}>Home Management</Menu.Item>
        <Menu.Item key="setting:2" onClick={GotoProductMangement}>Product Mangement</Menu.Item>
        <Menu.Item key="setting:3" onClick={GotoOrderManagement}>Order Mangement</Menu.Item>
        <Menu.Item key="setting:4" onClick={GotoCouponManagement}>Coupon Mangement</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu> */}
  </Menu>
  )
}

export default LeftMenu