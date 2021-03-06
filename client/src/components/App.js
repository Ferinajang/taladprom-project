import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import  HomePage  from './views/Home/HomePage';
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import RightMenu from './views/NavBar/Sections/RightMenu';
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import UploadProductPage from './views/UploadProductPage.js/UploadProductPage';
import CreateShop from './views/CreateShop/CreateShop';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import EditProduct from './views/EditProductPage/EditProduct';
import HomeShopManage from './views/HomeShopManage.js/HomeShopManage';
import CartPage from './views/CartPage/CartPage';
import OrderManage from './views/OrderManage/OrderManage';
import TaladPromShop from './views/TaladPromShop/TaladPromShop';
import GamePage from './views/GamePage/GamePage';
import DetailOrderPage from './views/DetailOrderPage/DetailOrderPage';
import DetailProductPageSeller from './views/DetailProductPageSeller/DetailProductPageSeller';
import CreateCoupon from './views/CreateCoupon/CreateCoupon';
import DetailOrderSellerPage from './views/DetailOrderSellerPage/DetailOrderSellerPage';
import HeaderHome from './views/SideMenuHome/HeaderHome';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div id="NavBar">
      <NavBar />
      
      {/* <RightMenu/> */}
      </div>
      <div id="HeaderHome">
      <HeaderHome/>
      </div>
      
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(HomePage, true)} />
          <Route exact path="/Home" component={Auth(HomePage, true)} />
          <Route exact path="/Landing" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/create-shop" component={Auth(CreateShop, true)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/product/upload" component={Auth(UploadProductPage, true)} />
          <Route exact path="/product/update/:productId" component={Auth(EditProduct, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          <Route exact path="/HomeShop" component={Auth(HomeShopManage, null)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/orderManagement" component={Auth(OrderManage, true)} />
          <Route exact path="/taladprom-shop" component={Auth(TaladPromShop, true)} />
          <Route exact path="/gamepage" component={Auth(GamePage, null)} />
          <Route exact path="/order/:orderId" component={Auth(DetailOrderPage, true)} />
          <Route exact path="/orderSeller/:orderId" component={Auth(DetailOrderSellerPage, true)} />
          <Route exact path="/productSeller/:productId" component={Auth(DetailProductPageSeller, null)} />
          <Route exact path="/create-coupon" component={Auth(CreateCoupon, true)} />
        </Switch>
      </div>
      <div id="Footer">
      <Footer />
      </div>
    </Suspense>
  );
}

export default App;
