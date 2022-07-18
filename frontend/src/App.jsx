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

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
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
          element={
            <ProtectedRoutes Component={Profile} />
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoutes Component={UpdateProfile} />
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<SignInUp />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
