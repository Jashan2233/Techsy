const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";
const GET_OWNED_PRODUCTS = "products/GET_USER_PRODUCTS";
const EDIT_OWNED_PRODUCTS = "products/EDIT_USER_PRODUCTS";
const GET_PRODUCT = "product/GET_PRODUCT";
const CREATE_NEW_PRODUCT = "products/CREATE_A_PRODUCT";
const DELETE_PRODUCT = "products/DELETE_A_PRODUCT";

// Action

export const getallProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  products,
});

export const getProduct = (productId) => ({
  type: GET_PRODUCT,
  productId,
});

export const createProduct = (product) => ({
  type: CREATE_NEW_PRODUCT,
  product,
});

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const getOwnedProducts = (products) => ({
  type: GET_OWNED_PRODUCTS,
  products,
});

export const editOwnedProduct = (products) => ({
  type: EDIT_OWNED_PRODUCTS,
  products,
});

// Thunks

export const getAllProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products");
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllProductsThunk(data));
    return data;
  } else {
    console.log("Cant fetch:", data);
  }
};
