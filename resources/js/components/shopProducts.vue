<template>
  <div class="container">
    <shop-header></shop-header>
    <h3 class="text-center">All Products</h3>
    <b-container fluid>
      <b-row>
        <b-col class="my-1">
          <b-button v-b-modal.product-modal class="float-right">
            Add Product
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="my-1">
          <b-form-group class="mb-0 float-right">
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table :items="products" :fields="fields" show-empty :filter="filter">
        <template #cell(image)="row">
          <img width="100px" :src="getImage(row.item.image)" />
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" @click="editProd(row.item)" class="mr-1">
            Edit
          </b-button>
          <b-button size="sm" @click="deleteProduct(row.item.id)">
            Delete
          </b-button>
        </template>
      </b-table>
    </b-container>

    <!-- Modal -->
    <b-modal
      id="product-modal"
      size="lg"
      ref="modal"
      :title="modalTitle"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col cols="6">
            <b-form-group
              label="Name"
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="errors.nameState"
            >
              <b-form-input
                id="name-input"
                v-model="form.product_name"
                :state="errors.nameState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Category"
              label-for="category-select"
              invalid-feedback="Category is required"
              :state="errors.catState"
            >
              <b-form-select
                id="category-select"
                v-model="form.category"
                :options="categories"
                :state="errors.catState"
                style="width: 100%"
                @change="changeCat"
              >
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Sub Category"
              label-for="sub-category-select"
              invalid-feedback="Sub Category is required"
              :state="errors.subCatState"
            >
              <b-form-select
                id="sub-category-select"
                v-model="form.sub_category"
                :options="filteredSubCategories"
                :state="errors.subCatState"
                style="width: 100%"
                :disabled="subDisabled"
              >
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Description"
              label-for="desc-input"
              invalid-feedback="Description is required"
              :state="errors.descState"
            >
              <b-form-textarea
                id="desc-input"
                v-model="form.description"
                :state="errors.descState"
                required
              ></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              label="Price"
              label-for="price-input"
              invalid-feedback="Price is required"
              :state="errors.priceState"
            >
              <b-form-input
                id="price-input"
                v-model="form.price"
                :state="errors.priceState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Image"
              label-for="file-input"
              invalid-feedback="Image is required"
              :state="errors.imageState"
            >
              <b-form-file
                id="file-input"
                v-model="selectedImage"
                :state="errors.imageState"
                required
                accept="image/jpeg, image/png, image/gif"
              ></b-form-file>
            </b-form-group>
            <b-form-group
              label="Status"
              label-for="status-input"
              invalid-feedback="Status is required"
              :state="errors.statusState"
            >
              <b-form-checkbox v-model="form.status" name="check-button" switch>
              </b-form-checkbox>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>
 
<script>
import axios from "axios";
import shopHeader from "./shopHeader.vue";

export default {
  components: { shopHeader },
  data() {
    return {
      filter: null,
      fields: [
        {
          key: "image",
          label: "Thum",
          sortable: false,
        },
        {
          key: "product_name",
          label: "Name",
          sortable: true,
        },
        {
          key: "category",
          label: "Category",
          sortable: true,
        },
        {
          key: "sub_category",
          label: "Sub Category",
          sortable: true,
        },
        { key: "actions", label: "Actions" },
      ],
      products: [],
      categories: [
        { value: "Category 1", text: "Category 1" },
        { value: "Category 2", text: "Category 2" },
      ],
      subCategories: [
        { value: "Category 3", parentId: "Category 1", text: "Sub Category 3" },
        { value: "Category 4", parentId: "Category 1", text: "Sub Category 4" },
        { value: "Category 5", parentId: "Category 2", text: "Sub Category 5" },
        { value: "Category 6", parentId: "Category 2", text: "Sub Category 6" },
      ],
      filteredSubCategories: [],
      showDialog: false,
      modalTitle: "Add product",
      form: {
        product_name: "",
        description: "",
        category: "",
        sub_category: "",
        price: "",
        image: "",
        status: "",
      },
      errors: {
        nameState: null,
        catState: null,
        subCatState: null,
        descState: null,
        priceState: null,
        imageState: null,
      },
      subDisabled: true,
      selectedImage: [],
      isEdit: false,
      editedIndex: 0,
    };
  },
  created() {
    axios.get("/products").then((response) => {
      this.products = response.data;
    });
  },
  methods: {
    editProd(item) {
      this.isEdit = true;
      this.modalTitle = "Edit Product";
      this.$bvModal.show("product-modal");
      this.editedIndex = item.id;
      this.form = Object.assign({}, item);
    },
    deleteProduct(id) {
      axios.delete(`/products/${id}`).then((response) => {
        let i = this.products.map((item) => item.id).indexOf(id); // find index of your object
        this.products.splice(i, 1);
      });
    },
    resetModal() {
      this.form = {};
      this.errors = {};
      this.selectedImage = [];
      this.editedIndex = 0;
      this.$bvModal.hide("product-modal");
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        this.errors.nameState = this.form.product_name ? true : false;
        this.errors.catState = this.form.category ? true : false;
        this.errors.subCatState = this.form.sub_category ? true : false;
        this.errors.priceState = this.form.price ? true : false;
        this.errors.descState = this.form.description ? true : false;
        this.errors.imageState = this.form.image ? true : false;
        return;
      }
      let formData = new FormData();
      formData.append("file", this.selectedImage);
      formData.append("data", JSON.stringify(this.form));
      if (this.isEdit) {
        formData.append("_method", "PUT");
        axios.post(`/products/${this.editedIndex}`, formData).then((res) => {
          let newData = this.products
            .filter((b) => b.id == res.data.id)
            .map((c) => Object.assign(c, res.data));
          console.log(newData);
          this.$nextTick(() => {
            this.resetModal();
          });
        });
      } else {
        axios
          .post(`/products`, formData)
          .then((res) => {
            this.$nextTick(() => {
              this.resetModal();
            });
            this.products.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    changeCat() {
      this.filteredSubCategories = this.subCategories.filter(
        (a) => a.parentId == this.form.category
      );
      this.subDisabled = false;
    },
    getImage(item) {
      return item.replace("public/", "/storage/");
    },
  },
};
</script>

<style scoped>
.float-right {
  float: right;
}
</style>