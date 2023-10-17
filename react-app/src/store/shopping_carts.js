const ADD_TO_CART = "cart/ADD_TO_CART";
const GET_USER_CART = "cart/GET_USER_CART";

//Actions
export const actionGetUserCart = (userId) => ({
  type: GET_USER_CART,
  userId,
});

export const actionAddToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

// Function to fetch ID correctly!
const normalizeCarts = (carts) => {
  let normalizeCarts = {};
  carts.carts.forEach((cart) => {
    normalizeCarts[cart.id] = cart;
  });

  return normalizeCarts;
};

//Get User Cart

export const getCartThunk = () => async (dispatch) => {
  const res = await fetch(`/api/cart/`);

  if (res.ok) {
    const data = await res.json();
    const normalizedCart = normalizeCarts(data);
    await dispatch(actionGetUserCart(normalizedCart));

    return normalizedCart;
  }
};

//Add Product to Cart

export const thunkAddToCart = (product) => async (dispatch) => {
  // console.log("PRODUCT WENT THROUGH HERE!!:",product)
  const response = await fetch(`/api/cart/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (response.ok) {
    const cartProduct = await response.json();
    // const normalizedCartProduct = normalizeCarts(cartProduct)
    await dispatch(actionAddToCart(cartProduct));
    await dispatch(getCartThunk());
    return cartProduct;
  }
};
