import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    size: "small",
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src="https://picsum.photos/200/300" alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} value={product.rating} />
        <span>{`${product.numOfReviews} Reviews`}</span>
      </div>
      <span>{`₹ ${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
