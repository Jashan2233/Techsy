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
    console.log("response in post cart", cartProduct);
    // const normalizedCartProduct = normalizeCarts(cartProduct)
    await dispatch(actionAddToCart(cartProduct));
    await dispatch(getCartThunk());
    return cartProduct;
  } else {
    console.log("error in cart post!!", product);
  }
};

//Edit Item Quantity in Cart
export const thunkUpdateCart = (quantity, item) => async (dispatch) => {
  const res = await fetch(`api/cart/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: quantity, item: item }),
  });
  if (res.ok) {
    const data = await res.json();
    await dispatch(actionAddToCart(data));
    await dispatch(getCartThunk());
    return data;
  } else {
    console.log("error in updatethunk!");
  }
};

export const thunkDeleteItems = (userId) => async (dispatch) => {
  const res = await fetch(`/api/cart/delete_all_items_from_cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
  });

  if (res.ok) {
    await dispatch(getCartThunk());
  } else {
    console.log("error in res delete cart");
  }
};

const initialState = { userCart: {} };

export default function cartReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_USER_CART:
      return { ...state, userCart: { ...action.userId } };
    case ADD_TO_CART:
      // console.log("ADD TO CART ACTION: ", action)
      newState = { ...state };
      newState.userCart[action.product.id] = action.product;
      return newState;
    default:
      return state;
  }
}
