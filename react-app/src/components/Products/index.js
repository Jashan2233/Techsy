import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import { getAllProductsThunk } from "../../store/products";
import { NavLink } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const sessionUser = useSelector((state) => state.session.user);
  const products = Object.values(allProducts);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, []);

  return (
    <>
      <div className="welcome-container">
        Welcome Back!, {sessionUser.username}
      </div>
      <div className="products-container">
        {products.map((product) => (
          <div className="products-cards" key={product.id}>
            <img className="product-images" src={product.preview_image} />
            <div className="all-products-price-container">
              <div className="all-products-price">
                ${`${product.price.toFixed(2)}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
