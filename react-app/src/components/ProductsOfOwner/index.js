import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as productActions from "../../store/products";
import DeleteProductModal from "../DeleteProductModal";
import OpenModalButton from "../OpenModalButton";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./productsofowner.css";
import OpenModalButton from "../OpenModalButton";

const ProductsOfOwner = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.ownedProducts);

  const allProducts = useSelector((state) => state.products.allProducts);

  const productsArr = Object.values(products);

  useEffect(() => {
    dispatch(productActions.getOwnedProductsThunk());
  }, [dispatch, allProducts]);

  return (
    <div className="store-product-container">
      {productsArr.map((product) => {
        return (
          <div className="store-product-card">
            <NavLink
              to={`/products/${product.id}`}
              className="store-product-link"
            >
              <img
                src={product.preview_img}
                alt="this is of a drink!!"
                className="store-product-image"
              />
              <h2 className="store-product-name">{product.name}</h2>
            </NavLink>
            <div className="product-edit-delete">
              <OpenModalButton
                buttonText="Delete"
                className="store-delete-button"
                modalComponent={<DeleteProductModal />}
              />
              <NavLink to={`/products/${product.id}/edit`}>
                <i class="fa-solid fa-pen"></i>
                <button className="store-edit-button">Edit Product</button>
              </NavLink>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsOfOwner;
