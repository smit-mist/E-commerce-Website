// import Header from "./component/layout/Header/Header.jsx";
import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/User/RegisterPage.js";
import LoginPage from "views/User/LoginPage";
import ForgotPassword from "views/User/ForgotPassword";
import ResetPassword from "views/User/ResetPassword";
import ProfilePage from "views/examples/ProfilePage.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import axios from "axios";

import store from "./store";
import { useEffect, useState } from "react";

import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";

// import WebFont from "webfontloader";

// import Profile from "./component/User/Profile.jsx";
// import ProtectedRoutes from "./component/Route/ProtectedRoutes";
// import UpdateProfile from "./component/User/UpdateProfile.jsx";
// import UpdatePassword from "./component/User/UpdatePassword.jsx";
// import ForgotPassword from "./component/User/ForgotPassword.jsx";
// import ResetPassword from "./component/User/ResetPassword.jsx";
// import Cart from "./component/Cart/Cart.jsx";
// import Shipping from "./component/Cart/Shipping.jsx";
// import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
// import Payment from "./component/Cart/Payment.jsx";
// import Footer from "./component/layout/Footer/Footer.jsx";
// import Home from "./component/Home/Home.jsx";
// import Loader from "./component/layout/Loader/Loader";
// import ProductDetails from "./component/Product/ProductDetails.jsx";
// import Products from "./component/Product/Products.jsx";
// import Search from "./component/Product/Search.jsx";
// import SignInUp from "./component/User/SignInUp";
// import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
// import MyOrders from "./component/Order/MyOrder.jsx";
// import OrderDetails from "./component/Order/OrderDetails.jsx";
// import Dashboard from "./component/Admin/Dashboard.jsx";
// import ProductList from "./component/Admin/ProductList.jsx";
// import NewProduct from "./component/Admin/NewProduct.jsx";
// import UpdateProduct from "./component/Admin/UpdateProduct.jsx";
// import OrderList from "./component/Admin/OrderList.jsx";
// import ProcessOrder from "./component/Admin/ProcessOrder.jsx";
// import UserList from "./component/Admin/UserList.jsx";
// import UpdateUser from "./component/Admin/UpdateUser";
// import ProductReviews from "./component/Admin/ProductReviews.jsx";
// import ResponsiveAppBar from "./component/layout/Header/Appbar";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    console.log("API KEY", data);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  console.log("INSIDE");
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/components" render={(props) => <Index {...props} />} />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/login-page"
        render={(props) => <LoginPage {...props} />}
      />
      <Route
        path="/forgot-password"
        render={(props) => <ForgotPassword {...props} />}
      />
      <Route
        path="/reset-password"
        render={(props) => <ResetPassword {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => <ProfilePage {...props} />}
      />
      {/* <Redirect from="/" to="/components" /> */}
    </Switch>
  </BrowserRouter>
  );
}

export default App;
