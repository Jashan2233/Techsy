const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";
const GET_OWNED_PRODUCTS = "products/GET_USER_PRODUCTS";
const EDIT_OWNED_PRODUCTS = "products/EDIT_USER_PRODUCTS";
const GET_PRODUCT = "product/GET_PRODUCT";
const CREATE_NEW_PRODUCT = "products/CREATE_A_PRODUCT";
const DELETE_OWNED_PRODUCT = "products/DELETE_A_PRODUCT";

// Action

export const getallProducts = (products) => {
  return {
    type: GET_ALL_PRODUCTS,
    products,
  };
};

export const getProduct = (productId) => ({
  type: GET_PRODUCT,
  productId,
});

export const createNewProduct = (product) => ({
  type: CREATE_NEW_PRODUCT,
  product,
});

export const deleteOwnedProduct = (product_id) => ({
  type: DELETE_OWNED_PRODUCT,
  product_id,
});

export const getOwnedProducts = (products) => {
  return {
    type: GET_OWNED_PRODUCTS,
    products,
  };
};

export const editOwnedProduct = (product) => {
  return { type: EDIT_OWNED_PRODUCTS, product };
};

//NORMALIZATION FUNCTIONS
const normalizingAllProducts = (products) => {
  let normalizedProducts = {};
  products.forEach((product) => {
    normalizedProducts[product.id] = product;
  });
  return normalizedProducts;
};

const normalizingUserProducts = (products) => {
  let normalizedProducts = {};
  for (let key in products) {
    if (products.hasOwnProperty(key)) {
      normalizedProducts[key] = products[key];
    }
  }
  return normalizedProducts;
};

// THUNKS

//Get all Products
export const getAllProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products");
  if (res.ok) {
    const data = await res.json();
    const normalizedProducts = normalizingAllProducts(data);
    dispatch(getallProducts(normalizedProducts));
    return data;
  }
};

//Get Single Product
export const getSingleProductThunk = (product_id) => async (dispatch) => {
  const res = await fetch(`/api/products/${product_id}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getProduct(data));
  } else {
    console.log("Error in singlespot thunk!");
  }
};

// Create Product
export const createProductThunk = (product) => async (dispatch) => {
  const res = await fetch("/api/products/create", {
    method: "POST",
    body: product,
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createNewProduct(data));
    return data;
  }
};

//Get Owned Products by User
export const getOwnedProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products/current");
  if (res.ok) {
    const data = await res.json();
    // const normalizedProducts = normalizingUserProducts(data);
    dispatch(getOwnedProducts(data));
  }
};

// Edit a product owned by User
export const editOwnedProductThunk =
  (product, product_id) => async (dispatch) => {
    const response = await fetch(`/api/products/${product_id}`, {
      method: "PUT",
      body: product, // Sending form data directly
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(editOwnedProduct(data));
      return data;
    }
  };

// Delete own Product
export const deleteOwnedProductThunk = (product_id) => async (dispatch) => {
  const res = await fetch(`/api/products/${product_id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteOwnedProduct(product_id));
    return data;
  }
};

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
    case GET_PRODUCT: {
      const newState = { ...state, allProducts: { ...state.allProducts } };
      newState.singleProduct = action.id;
      return newState;
    }
    case CREATE_NEW_PRODUCT: {
      const newState = { ...state, allProducts: { ...state.allProducts } };
      newState.allProducts[action.product.id] = action.product;
      return newState;
    }
    case DELETE_OWNED_PRODUCT: {
      const newState = { ...state, allProducts: { ...state.allProducts } };
      delete newState.allProducts[action.productId];
      return newState;
    }
    case GET_OWNED_PRODUCTS: {
      const newState = { ...state };
      newState.ownedProducts = action.products;
      return newState;
    }
    // Assuming the action payload contains the updated product object
    case EDIT_OWNED_PRODUCTS: {
      const updatedProduct = action.product;

      const newState = {
        ...state,
        allProducts: {
          ...state.allProducts,
          [updatedProduct.id]: updatedProduct,
        },
      };
      return newState;
    }

    default:
      return state;
  }
};

export default allProductsReducer;
