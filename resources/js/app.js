require('./bootstrap');
import Vue from "vue";
import VueI18n from 'vue-i18n';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import App from './App.vue';
import axios from 'axios';
import router from './routes';
import { store } from "./store";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Ready translated locale messages
Vue.use(VueI18n);
const messages = {
  en: {
    currency: "$"
  },
  nl: {
    currency: '€'
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

axios.defaults.baseURL = "/api";
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      router.replace("/logout");
    }
    return Promise.reject(err);
  }
);

const app = new Vue({
  el: '#app',
  template: "<App/>",
  components: {
    App,
  },
  router,
  store,
  i18n
});
