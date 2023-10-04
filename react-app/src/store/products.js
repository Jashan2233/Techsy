const GET_ALL_PRODUCTS = "products/GET_ALL_PRODUCTS";
const GET_OWNED_PRODUCTS = "products/GET_USER_PRODUCTS";
const EDIT_OWNED_PRODUCTS = "products/EDIT_USER_PRODUCTS";
const GET_PRODUCT = "product/GET_PRODUCT";
const CREATE_NEW_PRODUCT = "products/CREATE_A_PRODUCT";
const DELETE_OWNED_PRODUCT = "products/DELETE_A_PRODUCT";

// Action

export const getallProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  products,
});

export const getProduct = (productId) => ({
  type: GET_PRODUCT,
  productId,
});

export const createNewProduct = (product) => ({
  type: CREATE_NEW_PRODUCT,
  product,
});

export const deleteOwnedProduct = (productId) => ({
  type: DELETE_OWNED_PRODUCT,
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

//Get all Products
export const getAllProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products");
  if (res.ok) {
    const data = await res.json();
    dispatch(getallProducts(data));
    return data;
  }
};

//Get Single Product
export const getSingleProductThunk = (product_id) => async (dispatch) => {
  const res = await fetch(`/api/products/${product_id}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getProduct(data));
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
    console.log("data is here", data);
    dispatch(createNewProduct(data));
    return data;
  } else {
    console.log("FAT error!!");
  }
};

//Get Owned Products by User
export const getOwnedProductsThunk = () => async (dispatch) => {
  const res = await fetch("/api/products/current");
  if (res.ok) {
    const data = await res.json();
    dispatch(getOwnedProducts(data));
  }
};

// Edit a product owned by User
export const editOwnedProductThunk = (product) => async (dispatch) => {
  const { name, description, price, product_id } = product;
  console.log("productid", product_id);
  const response = await fetch(`/api/products/${product_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      description,
      price,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data, "Data here!!");
    dispatch(editOwnedProduct(data));
    return data;
  } else {
    console.log("Errors!!!!!!!");
  }
};

// Delete own Product
export const deleteOwnedProductThunk = (product_id) => async (dispatch) => {
  const res = await fetch(`/api/products/${product_id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteOwnedProduct(data));
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
    case EDIT_OWNED_PRODUCTS: {
      const newState = { ...state };
      newState.allProducts[action.products.id] = action.products;
      return newState;
    }
    default:
      return state;
  }
};

export default allProductsReducer;
