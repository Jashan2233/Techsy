import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useProductStore from "../../Zustand/productZustand"; // Import your Zustand store
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

import { NavLink } from "react-router-dom";
import "./products.css";

const GetAllProducts = () => {
  const { allProducts, getallProducts } = useProductStore();
  const user = useSelector((state) => state.session.user); // Use the Zustand store

  const products = Object.values(allProducts);

  useEffect(() => {
    getallProducts(); // Call the getallProducts function from your Zustand store
  }, []); // Empty dependency array to run the effect only once

  const welcomeText = () => {
    // Your welcomeText function remains the same
    if (user) {
      return `Welcome back to Tech, ${user.username}!`;
    } else {
      return "Welcome to Techsy!";
    }
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
      <div className="landing-footer">
        <h2 className="dev-text">About</h2>
        <div className="socials">
          <div>
            <div className="techsy-info">
              What is Techsy all about?
              <p className="techsy-text">
                Techsy is a Full-Stack Etsy clone, in the Tech version, using
                technologies like Flask, Python, JavaScript, React.js, Node.js,
                PostgreSQL. Techsy offers full functionality, users can buy
                products, create listings, update their listings and even delete
                their listings whenever they like to! This offers best user
                experience.
              </p>
            </div>

            <h3 className="social-names">
              Jashan Singh - Full Stack Web Developer
            </h3>
            <div className="landing-icons">
              <a
                href="https://github.com/Jashan2233"
                target="_blank"
                className="github-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faGithub} />
                  <p className="inner-icon-text">GitHub</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/jashan-singh-616856225/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                className="linkedin-icon"
              >
                <div className="inner-icon-div">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                  <p className="inner-icon-text">LinkedIn</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetAllProducts;
