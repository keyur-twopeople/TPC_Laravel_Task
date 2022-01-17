<template>
  <div class="container">
    <user-header />
    <b-table :items="cartItems.items" :fields="fields" show-empty>
      <template #cell(image)="row">
        <img width="100px" :src="getImage(row.item.image)" />
      </template>
      <template #cell(actions)="row">
        <b-button size="sm" @click="deleteItem(row.item.id)"> Delete </b-button>
      </template>
      <template #cell(description)="row">
        <h3>{{ row.item.product_name }}</h3>
        <span>{{ row.item.description }}</span
        ><br />
        <span>{{ $t("currency") }}{{ row.item.price }}</span>
      </template>
      <template #cell(price)="row">
        <span>{{ $t("currency") }}{{ row.item.price }}</span>
      </template>
      <template #cell(quantity)="row">
        <b-input-group size="sm">
          <b-input-group-prepend>
            <b-input-group-text
              @click="quantityCallBack(row.item.id, 'remove')"
            >
              <b-icon icon="dash" />
            </b-input-group-text>
          </b-input-group-prepend>

          <b-form-input
            type="number"
            min="0.00"
            :value="row.item.quantity"
						:disabled="true"
          ></b-form-input>

          <b-input-group-append>
            <b-input-group-text @click="quantityCallBack(row.item.id, 'add')">
              <b-icon icon="plus" />
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </template>
    </b-table>
    <b-row>
      <b-col cols="6">
        <b-button size="sm" to="/products" variant="danger"> Continue Shopping </b-button>
      </b-col>
      <b-col cols="6">
        <div class="float-right">
          <p>Subtotal: {{ cartItems.subTotal }}</p>
          <p>Shipping: {{ cartItems.shipping }}</p>
          <p>Total: {{ cartItems.total }}</p>
					<b-button size="sm" to="/checkout" variant="primary"> Checkout </b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import userHeader from "./userHeader.vue";
export default {
  components: { userHeader },
  data() {
    return {
      fields: [
        {
          key: "image",
          label: "Image",
          sortable: false,
        },
        {
          key: "description",
          label: "Description",
          sortable: false,
        },
        {
          key: "quantity",
          label: "QTY",
          sortable: false,
        },
        {
          key: "price",
          label: "Unit Price",
          sortable: false,
        },
        { key: "actions", label: "Actions" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      cartItems: "getCart",
    }),
  },
  methods: {
    getImage(item) {
      return item.replace("public/", "/storage/");
    },
    deleteItem(id) {
      let amount = 0;
      this.$store.dispatch("removeCartItem", id);
      this.cartItems.items.forEach((a) => {
        amount = amount + a.price * a.quantity;
      });
      this.$store.dispatch("updateAmount", {
        amount: parseInt(amount),
        shipping: 15,
      });

      if (this.cartItems.items.length == 0) {
        this.$store.dispatch("clearCartData");
      }
    },
    quantityCallBack(id, action) {
      let amount = 0;
      let ww = {
        id: id,
        action: action,
      };
      this.$store.dispatch("updateCartQuantity", ww);
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

<style scoped>
.float-right {
  float: right;
}
</style>