import { createStore } from "vuex";
import { products } from "@/api/products";

export interface State {
  products: ProductModel[];
  cart: CartModel[];
  total: ProductPriceModel[];
}

export interface ProductModel {
  id: string;
  name: string;
}

export interface CartModel extends ProductModel {
  count: number;
}

export interface ProductPriceModel {
  id: string;
  price: number;
  count: number;
}

const state: State = {
  products: [],
  cart: [],
  total: [],
};

export default createStore({
  state,
  getters: {
    totalPrice(state) {
      return state.total.reduce((acc, { count, price }) => {
        acc += count * price;
        return acc;
      }, 0);
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    pushProductToCart(state, product) {
      const foundProduct = !!state.cart.find((c) => c.id === product.id);
      if (!foundProduct) {
        state.cart.push({ ...product, count: 1 });
        state.total.push({ id: product.id, count: 1, price: product.price });
      }
    },
    updatePrice(state, { id, count }: { id: string; count: number }) {
      state.total.forEach((product) => {
        if (product.id === id) {
          product.count = count;
        }
      });
    },

    updateCartAfterAdding(
      state,
      {
        id,
        field,
        value,
      }: { id: string; field: string; value: string | number }
    ) {
      // eslint-disable-next-line
      state.cart.forEach((c: any) => {
        if (c.id === id) {
          c[field] = value;
        }
      });
    },
  },
  actions: {
    fetchProducts({ commit }) {
      return new Promise((resolve) => {
        commit("setProducts", products);
        resolve("");
      });
    },
    fetchCart() {
      // TODO Need api
    },
    addToCart() {
      // TODO Need api
    },
  },
});
