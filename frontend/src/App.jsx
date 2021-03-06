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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrders from "./component/Order/MyOrder.jsx";
import axios from "axios";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import Dashboard from "./component/Admin/Dashboard.jsx";
import ProductList from "./component/Admin/ProductList.jsx";
import NewProduct from "./component/Admin/NewProduct.jsx";
import UpdateProduct from "./component/Admin/UpdateProduct.jsx";
import OrderList from "./component/Admin/OrderList.jsx";
import ProcessOrder from "./component/Admin/ProcessOrder.jsx";
import UserList from "./component/Admin/UserList.jsx";
import UpdateUser from "./component/Admin/UpdateUser"
import ProductReviews from "./component/Admin/ProductReviews.jsx";
import ResponsiveAppBar from "./component/layout/Header/Appbar";



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
      {/* <ResponsiveAppBar/> */}
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
        <Route
          path="/displayOrder/:id"
          element={<ProtectedRoutes Component={OrderDetails} />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoutes isAdmin={true} Component={Dashboard} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoutes isAdmin={true} Component={ProductList} />}
        />
        <Route
          path="/admin/product"
          element={<ProtectedRoutes isAdmin={true} Component={NewProduct} />}
        />
        <Route
          path="/admin/product/:id"
          element={<ProtectedRoutes isAdmin={true} Component={UpdateProduct} />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoutes isAdmin={true} Component={OrderList} />}
        />
        <Route
          path="/admin/order/:id"
          element={<ProtectedRoutes isAdmin={true} Component={ProcessOrder} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoutes isAdmin={true} Component={UserList} />}
        />
        <Route
          path="/admin/user/:id"
          element={<ProtectedRoutes isAdmin={true} Component={UpdateUser} />}
        />
        <Route
          path="/admin/reviews"
          element={<ProtectedRoutes isAdmin={true} Component={ProductReviews} />}
        />
         <Route
          path="/loading"
          element={<Loader/>}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
