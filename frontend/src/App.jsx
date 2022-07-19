import "./App.css";
import Header from "./component/layout/Header/Header.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.jsx";
import Home from "./component/Home/Home.jsx";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails.jsx";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";
import SignInUp from "./component/User/SignInUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.jsx";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.jsx";
import ProtectedRoutes from "./component/Route/ProtectedRoutes";
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPassword from "./component/User/ForgotPassword.jsx";
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import Payment from "./component/Cart/Payment.jsx";
import { useEffect, useState } from "react";
import axiosInstance from "./service/AxiosInstance";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx"
import MyOrders from "./component/Order/MyOrder.jsx";
import axios from "axios";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    console.log("API KEY", data);
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions currentUser={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/test" element={<Loader />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route
          path="/account"
          element={<ProtectedRoutes Component={Profile} />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoutes Component={UpdateProfile} />}
        />

        <Route
          path="/password/update"
          element={<ProtectedRoutes Component={UpdatePassword} />}
        />

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<SignInUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={<ProtectedRoutes Component={Shipping} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoutes Component={ConfirmOrder} />}
        />
        <Route
          path="/process/payment"
          element={
            stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoutes Component={Payment} />
              </Elements>
            )
          }
        />
        <Route
          path="/success"
          element={<ProtectedRoutes Component={OrderSuccess} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoutes Component={MyOrders} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
