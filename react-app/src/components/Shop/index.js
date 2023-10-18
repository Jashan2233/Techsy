import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import * as shopActions from "../../store/shop";
import ProductsOfOwner from "../ProductsOfOwner";
import "./shop.css";

const Shop = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("post");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  //Fetch Current User Shops
  useEffect(() => {
    dispatch(shopActions.fetchCurrUserShops());
  }, [dispatch]);

  const createNewProductButton = () => {
    history.push("/products/create");
  };

  return (
    <div className="manage-shop-container">
      <div className="menu-panel">
        <h2 className="your-account-text">Your Store</h2>
        <h3 className="shop-title" onClick={() => handleMenuItemClick("post")}>
          <i class="fa-solid fa-shop"></i>
          Store
        </h3>
      </div>
      <div className="content-panel">
        {selectedMenuItem === "post" && (
          <>
            <div className="content-panel-header">
              <h1>Products</h1>
              <button
                className="create-new-product-button"
                onClick={createNewProductButton}
              >
                Create New Product
              </button>
            </div>
            <ProductsOfOwner />
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
