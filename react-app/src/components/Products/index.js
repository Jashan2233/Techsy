import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import React from "react";
import { getAllProductsThunk, thunkGetAllProducts } from "../../store/products";
import { NavLink } from "react-router-dom";
import "./products.css";

const GetAllProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.allProducts);
  const products = Object.values(allProducts);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllProductsThunk());
  }, [dispatch]);

  const welcomeText = () => {
    if (sessionUser) {
      return `Welcome back, ${sessionUser.username}!`;
    } else {
      return "Welcome to Techsy!";
    }
  };

  return (
    <>
      <h1>LOGO PLACEHOLDER</h1>
      <div className="welcome-back">{welcomeText()}</div>
      <div className="all-products-container">
        {products.map((product) => {
          return (
            <div key={product.id} className="all-products-card">
              <div>
                <img
                  src={product.preview_image}
                  alt={`${product.name}'s unavaiable`}
                  className="all-products-image"
                ></img>
                <div class="all-products-price-container">
                  <div className="all-products-price">
                    ${`${product.price.toFixed(2)}`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default GetAllProducts;
