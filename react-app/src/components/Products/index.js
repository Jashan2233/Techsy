import React, { useEffect } from "react";
import useProductStore from "../../Zustand/productZustand"; // Import your Zustand store

import { NavLink } from "react-router-dom";
import "./products.css";

const GetAllProducts = () => {
  const { allProducts, getallProducts } = useProductStore(); // Use the Zustand store

  const products = Object.values(allProducts);

  useEffect(() => {
    getallProducts();
  }, []);

  const welcomeText = () => {
    // Your welcomeText function remains the same
  };

  return (
    <>
      <div className="welcome-back">{welcomeText()}</div>
      <div className="all-products-container">
        {products.map((product) => {
          return (
            <div key={product.id} className="all-products-card">
              <NavLink to={`/products/${product.id}`}>
                <img
                  src={product.preview_image}
                  alt={`${product.name}'s unavailable`}
                  className="all-products-image"
                ></img>
              </NavLink>
              <div className="all-products-price-container">
                <div className="all-products-price">${`${product.price}`}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GetAllProducts;
