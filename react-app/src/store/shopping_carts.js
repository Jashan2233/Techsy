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
