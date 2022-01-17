import Vue from "vue";
import Router from "vue-router";

import ShopProducts from './components/shopProducts.vue';
import UserProducts from './components/userProducts.vue';
import Cart from './components/cart.vue';
import Checkout from './components/checkout.vue';
import Login from './Login.vue';

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login,
    },
    {
      name: 'shop',
      path: '/shop',
      component: ShopProducts,
      meta: {
        requiresAuth: true,
        shop: true
      },
    },
    {
      name: 'products',
      path: '/products',
      component: UserProducts,
      meta: {
        requiresAuth: true,
        shop: false
      },
    },
    {
      name: 'cart',
      path: '/cart',
      component: Cart,
      meta: {
        requiresAuth: true,
        shop: false
      },
    },
    {
      name: 'checkout',
      path: '/checkout',
      component: Checkout,
      meta: {
        requiresAuth: true,
        shop: false
      },
    }
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  let parsedData = {}
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/login");
    return;
  }
  if (to.matched.some((record) => record.meta.shop == true) && loggedIn) {
    parsedData = JSON.parse(loggedIn);
    if (parsedData.user.role == "user") {
      next("/products");
    }
  }
  if (to.matched.some((record) => record.meta.shop == false) && loggedIn) {
    parsedData = JSON.parse(loggedIn);
    if (parsedData.user.role == "shop") {
      next("/shop");
    }
  }
  next();
});

export default router;
