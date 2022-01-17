<template>
  <div class="container">
    <user-header />
    Checkout Completed
  </div>
</template>

<script>
import userHeader from "./userHeader.vue";
export default {
  components: { userHeader },
  created() {
    this.$store.dispatch("clearCartData");
  },
};
</script>