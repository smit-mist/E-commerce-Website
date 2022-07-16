import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";


const Product = ({ product }) => {
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:product.rating,
    isHalf:true,
    size:window.innerWidth<600?20:25,
};
console.log(options.value);
  return (
    <Link className="productCard" to={product._id}>
      <img src="https://picsum.photos/200/300" alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>{`${product.numOfReviews} Reviews`}</span>
      </div>
      <span>{`₹ ${product.price}`}</span>
    </Link>
  );
};

export default Product;
