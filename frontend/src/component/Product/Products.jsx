import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";
const Products = () => {
  const dispatch = useDispatch();
  const keyword = useParams().keyword;
  const { product, loading, error, productsCounts } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {product &&
              product.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
