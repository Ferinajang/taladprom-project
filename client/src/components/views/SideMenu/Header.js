//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import Modal from 'react-modal';
//import icons from react icons
import { FaList, FaRegHeart, FaClipboardList } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle, FiShoppingCart } from "react-icons/fi";
import { RiPencilLine, RiCoupon3Fill } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdClear } from "react-icons/md";



//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./SideMenu.css";
import "./Header.css"


const Header = () => {
    const [modalCart, setModalCart] = useState(false);
    const [modalOrder, setModalOrder] = useState(false);
    const [modalCoupon, setModalCoupon] = useState(false);
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    return (
        <>
            <div id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                            {/* small and big change using menucollapse state */}
                            <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? (
                                <FiArrowRightCircle style={{ color: "#FFC269", marginTop: '6px', marginRight: '22px' }} />
                            ) : (
                                <FiArrowLeftCircle style={{ color: "#FFC269", marginTop: '6px', marginRight: '100px' }} />
                            )}
                        </div>
                    </SidebarHeader>
                    <SidebarContent style={{ marginTop: '50px' }}>
                        <Menu iconShape="square">
                            <MenuItem active={false} icon={<ImSearch />} onClick={() => window.location.href = "/taladprom-shop"}>
                                SEARCH
                            </MenuItem>
                            <MenuItem active={false} icon={<FiShoppingCart />} onClick={() => setModalCart(true)}>CART</MenuItem>
                            <MenuItem active={false} icon={<FaClipboardList />} onClick={() => setModalOrder(true)}>MY ORDER</MenuItem>
                            <MenuItem active={false} icon={<RiCoupon3Fill />} onClick={() => setModalCoupon(true)}>COUPON</MenuItem>
                            <MenuItem active={false} icon={<FiHome />} onClick={() => window.location.href = "/"}>HOME</MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem active={false} icon={<FiLogOut />}>LOG OUT</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>

                <Modal className="modal-ShowAllProduct"
                    isOpen={modalCart}

                    contentLabel="Example Modal"
                >   
                    <div style={{height:'20px',fontSize:'36px',textAlign:'right',marginRight:'10px'}} onClick={() => setModalCart(false)}>
                        <MdClear style={{cursor:'pointer'}}/></div>
                    <p style={{fontSize:"36px",textAlign:'center',fontWeight:'bold'}}>cart</p>
                    

                </Modal>

                <Modal className="modal-ShowAllProduct"
                    isOpen={modalOrder}

                    contentLabel="Example Modal"
                >
                    <div style={{height:'20px',fontSize:'36px',textAlign:'right',marginRight:'10px'}} onClick={() => setModalOrder(false)}>
                        <MdClear style={{cursor:'pointer'}}/></div>
                    <p style={{fontSize:"36px",textAlign:'center',fontWeight:'bold'}}>Order</p>
                    

                </Modal>

                <Modal className="modal-ShowAllProduct"
                    isOpen={modalCoupon}

                    contentLabel="Example Modal"
                >
                    <div style={{height:'20px',fontSize:'36px',textAlign:'right',marginRight:'10px'}} onClick={() => setModalCoupon(false)}>
                        <MdClear style={{cursor:'pointer'}}/></div>
                    <p style={{fontSize:"36px",textAlign:'center',fontWeight:'bold'}}>Coupon</p>
                    

                </Modal>
            </div>
        </>
    );
};

export default Header;