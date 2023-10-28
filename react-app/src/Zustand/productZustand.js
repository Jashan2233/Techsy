import { create } from "zustand";

// Initial state structure matching your Redux state
const initialState = {
  allProducts: {},
  ownedProducts: {},
  singleProduct: {},
};

// Normalization functions
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

const useProductStore = create((set) => ({
  ...initialState, // Initialize state

  // Action to get all products
  getallProducts: async () => {
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      set((state) => ({
        ...state,
        allProducts: normalizingAllProducts(data),
      }));
    }
  },

  getProduct: async (product_id) => {
    // Check if the data is available in localStorage
    const storedSingleProduct = JSON.parse(
      localStorage.getItem("singleProduct")
    );
    if (storedSingleProduct) {
      set((state) => ({
        ...state,
        singleProduct: storedSingleProduct,
      }));
    } else {
      // If not in localStorage, fetch the data from the API
      const res = await fetch(`/api/products/${product_id}`);
      if (res.ok) {
        const data = await res.json();
        set((state) => ({
          ...state,
          singleProduct: data,
        }));
      } else {
        console.log("Error in singlespot thunk!");
      }
    }
  },

  // Action to create a new product
  createNewProduct: async (product) => {
    const res = await fetch("/api/products/create", {
      method: "POST",
      body: product,
    });
    if (res.ok) {
      const data = await res.json();
      set((state) => {
        state.allProducts[data.id] = data;
      });
    }
  },

  // Action to delete an owned product
  // Action to delete an owned product
  // Action to delete an owned product
  deleteOwnedProduct: async (product_id) => {
    const res = await fetch(`/api/products/${product_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      set((state) => {
        // Remove the product from allProducts
        const updatedAllProducts = { ...state.allProducts };
        delete updatedAllProducts[product_id];

        return {
          allProducts: updatedAllProducts,
          ownedProducts: Array.isArray(state.ownedProducts)
            ? state.ownedProducts.filter((product) => product.id !== product_id)
            : [],
        };
      });
    }
  },

  // Action to get owned products
  getOwnedProducts: async () => {
    const res = await fetch("/api/products/current");
    if (res.ok) {
      const data = await res.json();
      set((state) => ({
        ...state,
        ownedProducts: normalizingUserProducts(data),
      }));
    }
  },

  // Action to edit an owned product
  editOwnedProduct: async (product, product_id) => {
    const { name, description, price } = product;
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
      const updatedProduct = await response.json();
      set((state) => ({
        ...state, // Spread the current state
        allProducts: {
          ...state.allProducts, // Spread the current products
          [product_id]: updatedProduct, // Update the specific product
        },
      }));

      // Return the updated product so you can use it in your component
      return updatedProduct;
    } else {
      console.log("Error editing the product");
    }
  },
}));

export default useProductStore;
