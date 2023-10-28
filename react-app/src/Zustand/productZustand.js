import { create } from "zustand";

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
  allProducts: {},
  ownedProducts: {},
  singleProduct: {},
  getallProducts: async () => {
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      set({ allProducts: normalizingAllProducts(data) });
    }
  },
  getProduct: async (product_id) => {
    const res = await fetch(`/api/products/${product_id}`);
    if (res.ok) {
      const data = await res.json();
      set({ singleProduct: data });
    } else {
      console.log("Error in singlespot thunk!");
    }
  },
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
  deleteOwnedProduct: async (product_id) => {
    console.log("delete ID", product_id);
    const res = await fetch(`/api/products/${product_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      set((state) => {
        delete state.allProducts[product_id];
      });
    }
  },
  getOwnedProducts: async () => {
    const res = await fetch("/api/products/current");
    if (res.ok) {
      const data = await res.json();
      set({ ownedProducts: normalizingUserProducts(data) });
    }
  },
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
      const data = await response.json();
      set((state) => {
        state.allProducts[data.id] = data;
      });
    }
  },
}));

export default useProductStore;
