import React from 'react';
import {FaMouse} from 'react-icons/fa';
import './Home.css';
import Product from './Product.jsx';

const product = {
    name:"Laptop",
    images:[{url:"https://picsum.photos/200/300"}],
    price:"₹40,000",
    _id:"lappy"
};
const Home = () => {
  return (
    <React.Fragment>
        <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing products below</h1>
            <a href="#container">
                <button>
                    Scroll  <FaMouse/>
                </button>
            </a>
        </div>
        <h2 className="homeHeading">Featured Products</h2>
        <div id="container" className="container">
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>

            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>    
        </div>
    </React.Fragment>
  );
}

export default Home