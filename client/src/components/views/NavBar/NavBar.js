import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import './Sections/Navbar.css';
import { AlignRightOutlined } from '@ant-design/icons';

import { Layout, Menu, Breadcrumb } from 'antd';
function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <div>
       <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%',height:'72px' }}>
      <div className="menu__logo">
        <a href="/">TALADPROM</a>
      </div>
      {/* <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
      </div> */}
    </nav>

    </div>
   
  )
}
export default NavBar