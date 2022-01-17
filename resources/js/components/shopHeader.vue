<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <span v-if="user"> {{ user.name }} </span>
        </b-nav-item>
        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: [],
    };
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
</style>