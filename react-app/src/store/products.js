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

// THUNKS

export const getAllProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products");
  if (res.ok) {
    const data = await res.json();
    dispatch(getallProducts(data));
    return data;
  }
};

//Get Single Product

// export const getSingleProductThunk = ()

// Create Product
export const createProductThunk = () => async (dispatch) => {
  const res = await fetch("/api/products/create", {
    method: "POST",
    body: product,
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createProduct(data));
    return data;
  }
};

// Edit a product

// Initial State of all Products, ownedProducts and SingleProducts
const initialState = { allProducts: {}, ownedProducts: {}, singleProduct: {} };

//Reducer

const allProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      const newState = { ...state };
      newState.allProducts = action.products;
      return newState;
    }
    default:
      return state;
  }
};

export default allProductsReducer;
