import React, { useState } from "react";
import * as cartStore from "../../store/shopping_carts";
import { useDispatch } from "react-redux";
import "./UserCart.css";

function Counter({ quantity, item }) {
  const [count, setCount] = useState(quantity);
  // const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();

  const handleCountChange = async (e) => {
    e.preventDefault();
    const value = parseInt(e.target.value);
    // console.log("///////////////")
    setCount(value);
    await dispatch(cartStore.thunkUpdateCart(value, item));
    await dispatch(cartStore.getCartThunk());
  };

  // useEffect(async () => {
  //     await dispatch(thunkUpdateCartItemQuantityInDb(count, item))
  // }, [dispatch, count]);

  const options = [];
  for (let i = 1; i <= 50; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div>
      <span
        style={{
          textDecoration: "underline",
          fontFamily: "system-ui",
          fontSize: "1rem",
          color: "black",
        }}
      >
        Update Quantity
      </span>
      <span style={{ color: "black" }}> : </span>
      <select
        className="cart-item-counter"
        value={count}
        onChange={(e) => handleCountChange(e)}
      >
        {options}
      </select>
    </div>
  );
}

export default Counter;
