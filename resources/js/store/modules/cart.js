const state = {
  cartItems: {
    items: [],
    subTotal: 0,
    shipping: 0,
    total: 0,
  },
};
const getters = {
  getCart: (state) => state.cartItems,
};
const mutations = {
  addToCart(state, cartData) {
    if (state.cartItems.items.filter((a) => a.id == cartData.id).length > 0) {
      state.cartItems.items
        .filter((a) => a.id == cartData.id)
        .map((b) => (b.quantity += 1));
    } else {
      state.cartItems.items.push(cartData);
    }
  },
  updateCartQuantity(state, cartData) {
    console.log("cart", cartData)
    if (cartData.action == "add") {
      state.cartItems.items
        .filter((a) => a.id == cartData.id)
        .map((b) => (b.quantity = b.quantity + 1));
    } else {
      state.cartItems.items
        .filter((a) => a.id == cartData.id)
        .map(
          (b) => (b.quantity = b.quantity > 1 ? b.quantity - 1 : b.quantity)
        );
    }
  },
  updateAmount(state, amountData) {
    state.cartItems.subTotal = amountData.amount;
    state.cartItems.shipping = amountData.shipping;
    state.cartItems.total = amountData.amount + amountData.shipping;
  },
  removeCartItem(state, id) {
    state.cartItems.items.splice(
      state.cartItems.items.findIndex((a) => a.id == id),
      1
    );
  },

  clearCartData(state) {
    state.cartItems = {
      items: [],
      subTotal: 0,
      shipping: 0,
      total: 0,
    }
  },
};
const actions = {
  addToCart({ commit }, data) {
    commit("addToCart", data);
  },
  updateCartQuantity({ commit }, data) {
    commit("updateCartQuantity", data);
  },
  updateAmount({ commit }, data) {
    commit("updateAmount", data);
  },
  removeCartItem({ commit }, data) {
    commit("removeCartItem", data);
  },
  clearCartData({ commit }) {
    commit("clearCartData");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
