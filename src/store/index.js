import { createStore } from "vuex";
import axios from "axios";
//https://fakestoreapi.com/products
export default createStore({
  state: {
    products: [],
    cart: [],
  },
  mutations: {
    loadingProducts(state, data) {
      state.products = data;
    },
    addProductInCart(state, product) {
      state.cart.push(product);
      localStorage.setItem("productsInBag", JSON.stringify(state.cart));
    },
    removeToBag(state, id) {
      const updatedBag = state.cart.filter((item) => id !== item.id);
      state.cart = updatedBag;
    },
    loadBag(state, itens) {
      state.cart = itens;
    },
  },
  actions: {
    loadingProducts({ commit }) {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => commit("loadingProducts", response.data));
    },
    loadBag({ commit }) {
      if (localStorage.getItem("productsInBag")) {
        commit("loadBag", JSON.parse(localStorage.getItem("productsInBag")));
      }
    },
    addProductInCart({ commit }, product) {
      commit("addProductInCart", product);
    },
    removeToBag({ commit }, id) {
      if (confirm("Are you sure want to remove the item from bag?"))
        commit("removeToBag", id);
    },
  },
  modules: {},
});
