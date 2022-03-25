import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/HomeShop">Home</a>
    </Menu.Item>
    <Menu.Item key="ss">
      <a href="/taladprom-shop">TaladProm</a>
    </Menu.Item>
    <SubMenu title={<span>More</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1" onClick={GotoHomeManagement}>Home Management</Menu.Item>
        <Menu.Item key="setting:2" onClick={GotoProductMangement}>Product Mangement</Menu.Item>
        <Menu.Item key="setting:3" onClick={GotoOrderManagement}>Order Mangement</Menu.Item>
        <Menu.Item key="setting:4" onClick={GotoCouponManagement}>Coupon Mangement</Menu.Item>
      </MenuItemGroup>
      
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu