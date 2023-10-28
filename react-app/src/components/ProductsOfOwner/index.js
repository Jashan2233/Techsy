import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import * as productActions from "../../store/products";
import DeleteProductModal from "../DeleteProductModal";
import DeleteProduct from "../DeleteProductModal";
import useProductStore from "../../Zustand/productZustand";
import OpenModalButton from "../OpenModalButton";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./productsofowner.css";

const ProductsOfOwner = () => {
  // Zustand State
  const { allProducts, ownedProducts, getOwnedProducts, getallProducts } =
    useProductStore();

  const productsArr = Object.values(ownedProducts);

  const ownedProductsArray = productsArr[0];

  useEffect(() => {
    getOwnedProducts();
  });

  return (
    <div className="store-product-container">
      {ownedProductsArray &&
        ownedProductsArray.map((product) => {
          return (
            <div className="store-product-card" key={product.id}>
              <NavLink
                to={`/products/${product.id}`}
                className="store-product-link"
              >
                <img
                  src={product.preview_image}
                  className="store-product-image"
                  alt={`Product: ${product.name}`}
                />
                <h2 className="store-product-name">{product.name}</h2>
                <h4 className="store-product-price">
                  {" "}
                  Actual Price: ${product.price}
                </h4>
              </NavLink>
              <Link to={`/products/${product.id}`}>
                <div className="product-edit-delete">
                  <OpenModalButton
                    buttonText="Delete"
                    className="store-delete-button"
                    modalComponent={<DeleteProduct product_id={product.id} />}
                  />
                  <NavLink to={`/products/${product.id}/edit`}>
                    <i className="fa-solid fa-pen"></i>
                    <button className="store-edit-button">Edit Product</button>
                  </NavLink>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default ProductsOfOwner;
