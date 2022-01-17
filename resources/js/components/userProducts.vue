<template>
  <div class="container">
    <user-header></user-header>
    <b-card
      v-for="product in products"
      :key="product.id"
      :img-src="getImage(product.image)"
      img-alt="Card image"
      img-left
      img-width="20%"
      class="mb-3"
    >
      <b-card-text>
        <h3>{{ product.product_name }}</h3>
      </b-card-text>
      <b-card-text>
        <span>{{ product.description }}</span>
      </b-card-text>
      <b-card-text>
        <span>{{ $t("currency") }}{{ product.price }}</span>
      </b-card-text>

      <b-button variant="primary" class="mb-2" @click="addToCart(product)">
        <b-icon icon="cart" aria-hidden="true"></b-icon> Add to cart
      </b-button>
      <b-button variant="outline-info" class="mb-2">
        <b-icon icon="heart" aria-hidden="true"></b-icon> Add to Wishlist
      </b-button>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import userHeader from "./userHeader.vue";
export default {
  components: { userHeader },
  data() {
    return {
      products: [],
      userData: [],
    };
  },
  computed: {
    ...mapGetters({
      cartItems: "getCart",
    }),
  },
  created() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    axios.get("/products").then((response) => {
      this.products = response.data;
    });
    this.$i18n.locale = this.userData.user.language;
  },
  methods: {
    getImage(item) {
      return item.replace("public/", "/storage/");
    },
    addToCart(product) {
      let amount = 0;
      product.quantity = 1;
      this.$store.dispatch("addToCart", product);
      this.cartItems.items.forEach((a) => {
        amount = amount + a.price * a.quantity;
      });
      this.$store.dispatch("updateAmount", {
        amount: parseInt(amount),
        shipping: 15,
      });
    },
  },
};
</script>