import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    PRODUCTS_SOLD(state, data) {
      // update the product quantity
      const productIndex = this.getters.getProductIndex(data.product.id);
      state.products[productIndex].quantity -= data.quantity;

      // the line above is the same as writing this
      //state.products
      // Make API call to update the DB
    },
    PRODUCT_QUANTITY(state, data) {
      // get the index of the product grom the array of products
      const productIndex = this.getters.getProductIndex(data.product.id);
      // update the quantity of the product at the found index
      state.products[productIndex].quantity = data.quantity;
      // Make API call to update the DB
      axios
      .put(
        "https://vary0005-week-10.firebaseio.com/products.json",
        state.products
      )
      .then(response => {
        console.log("your data was updated " + response.status);
      })
      .catch(error => {
        console.log("there was an issue saving your data" + error.response);
      });
    }
  },
  actions: {
    fetchData({ commit }) {
      axios
        .get("https://vary0005-week-10.firebaseio.com/products.json")
        .then(response => {
          commit("SET_PRODUCTS", response.data);
        });
    },
    buyProducts({ commit }, { quantity, product }) {
      commit("PRODUCTS_SOLD", {
        quantity,
        product
      });
    },
    updateQuantity({ commit }, {quantity, product}) {
      // commit a mutation to update the state, sending the payload as { quantity, product }
commit("PRODUCT_QUANTITY", {quantity, product });
    }
  },
  getters: {
    getProductById: state => id => {
      return state.products.find(product => product.id === id);
    },
    getProductIndex: state => id => {
      return state.products.findIndex(product => product.id === id);
    }
  }
});

// https://vary0005-week-10.firebaseio.com/
