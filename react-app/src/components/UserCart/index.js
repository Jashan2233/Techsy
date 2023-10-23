import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cartstore from "../../store/shopping_carts";
import * as productStore from "../../store/products";
import "./UserCart.css";
const UserCart = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const products = Object.values(
    useSelector((state) => state.products.allProducts)
  );

  const userCart = Object.values(
    useSelector((state) => state.userCart.userCart)
  );
  console.log(userCart);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(cartstore.getCartThunk());
      await dispatch(productStore.getAllProductsThunk());
    };
    fetchData();
  }, [dispatch]);

  if (!products || !userCart) return null;

  const noUser = () => {
    if (!user) {
      return (
        <>
          <h3>Please Log In</h3>
        </>
      );
    }
  };

  return (
    <>
      <div className="shopping-cart-container">
        <h1 className="shopping-cart-header">Shopping Cart</h1>
        {user && userCart.length ? (
          <div>
            {userCart.map((item, idx) => {
              const product = products.find(
                (product) => item.product_id === product.id
              );
              return product ? (
                <div className="cart-card" key={`Cart-${idx}`}>
                  <div className="individual-item-card">
                    <div className="cart-item-image-container">
                      <img
                        src={product.preview_image}
                        alt={`${product.name}'s unavaiable`}
                        className="cart-product-image"
                      />
                    </div>
                    <div className="cart-item-info-container">
                      <div>
                        <span
                          style={{
                            textDecoration: "underline",
                            fontFamily: "system-ui",
                            color: "black",
                          }}
                        >
                          ITEM
                        </span>
                        <span style={{ color: "black" }}> : </span>
                        {product.name}
                      </div>
                      <div>
                        <span
                          style={{
                            textDecoration: "underline",
                            fontFamily: "system-ui",
                            color: "black",
                          }}
                        >
                          PRICE
                        </span>
                        <span style={{ color: "black" }}> : </span>$
                        {product.price}
                      </div>
                      <div>
                        <span
                          style={{
                            textDecoration: "underline",
                            fontFamily: "system-ui",
                            color: "black",
                          }}
                        >
                          Quantity
                        </span>
                        <span style={{ color: "black" }}> : </span>
                        {item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default UserCart;
