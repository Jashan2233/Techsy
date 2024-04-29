import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as cartstore from "../../store/shopping_carts";
import * as productStore from "../../store/products";
import Counter from "./QuantityTracker";
import "./UserCart.css";

const UserCart = ({ quantity, item }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const products = Object.values(
    useSelector((state) => state.products.allProducts)
  );

  const [quantity2, setQuantity] = useState(quantity);
  const userCart = Object.values(
    useSelector((state) => state.userCart.userCart)
  );
  const userCartObj = useSelector((state) => state.userCart.userCart);
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

  // Handle update Quantity:
  const updateQuantity = async (e) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    setQuantity(value);
  };
  const submitQuantityChange = async () => {
    const currentItem = userCartObj.product_id;

    // if (!item) {
    //   console.error("Current item not found");
    //   return;
    // }

    // const product = products.find((p) => p.id === currentItem.product_id);

    // if (!product) {
    //   console.error("Product not found");
    //   return;
    // }

    await dispatch(cartstore.thunkUpdateCart(quantity2, item));

    await dispatch(cartstore.getCartThunk());
  };

  const options = [];
  for (let i = 1; i <= 50; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  // Handle Empty Cart
  const emptyCart = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: user.id,
    };

    await dispatch(cartstore.thunkDeleteItems(payload));
  };

  return (
    <>
      <div className="shopping-cart-container">
        <h1 className="shopping-cart-header">Shopping Cart</h1>
        <div className="delete-button-container">
          <button id="delete-items" onClick={emptyCart}>
            Clear Cart
          </button>
        </div>
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
                      <div>
                        <div className="update-quantity-container">
                          <Counter quantity={item.quantity} item={product} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <div className="empty-cart-message">
            <p>You don't have anything in your cart yet!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCart;
