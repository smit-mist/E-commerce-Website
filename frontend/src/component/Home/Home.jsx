import React, { useEffect } from "react";
import { FaMouse } from "react-icons/fa";
import "./Home.css";
import Product from "./Product.jsx";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";


const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, product, productCount} = useSelector(
      (state)=>state.products
  );
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);


  return (
    <React.Fragment>
      <MetaData title={"Ecommerce"} />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing products below</h1>
        <a href="#container">
          <button>
            Scroll <FaMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div id="container" className="container">
            {product && product.map(item=>(
                <Product product={item}/>
            ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
