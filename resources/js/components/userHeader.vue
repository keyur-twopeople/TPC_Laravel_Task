<template>
  <div>
    <b-navbar>
      <b-navbar-nav>
        <b-nav-item>
          Welcome <span v-if="user"> {{ user.name }} </span>
        </b-nav-item>
        <b-nav-item to="/products">Products</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/cart">
          <b-icon icon="cart"></b-icon>
          <b-badge
            variant="danger"
            v-if="cartItems && cartItems.items.length > 0"
          >
            {{ cartItems.items.length }}
          </b-badge>
        </b-nav-item>
        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      user: [],
      counter: 0,
    };
  },
  computed: {
    ...mapGetters({
      cartItems: "getCart",
    }),
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user")).user;
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
.ml-auto {
  margin-left: auto;
}
.badge-danger {
  color: #fff;
  background-color: #dc3545;
}
</style>