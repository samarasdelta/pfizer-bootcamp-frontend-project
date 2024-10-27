<template>
  <div id="app">
    <!-- Header with custom navbar and logo -->
    <header>
      <nav class="navbar-custom d-flex align-items-center justify-content-between p-3">
        <div class="logo">
          <img
            src="https://www.pfizer.at/images/custom/Pfizer_Logo_Color_RGB.png"
            alt="Pfizer logo"
            class="logo-image"
          />
        </div>
        <h2 class="navbar-title">Research Products Dashboard</h2>
      </nav>
    </header>

    <!-- Main Content Section -->
    <div class="container mt-4" style="max-width: 100%;">
      <h2 class="text-start mb-4">Research Products</h2>

      <!-- Check if there are products to display -->
      <template v-if="products.length > 0">
        <!-- Products Table with Action Buttons -->
        <b-table striped hover :items="products" :fields="tableFields" responsive>
          <template #cell(actions)="data">
            <div class="btn-group" role="group" aria-label="Product Actions">
              <button @click="viewProduct(data.item.id)" class="btn btn-outline-primary btn-sm">View</button>
              <button @click="editProduct(data.item.id)" class="btn btn-outline-success btn-sm">Edit</button>
              <button @click="deleteProduct(data.item.id)" class="btn btn-outline-danger btn-sm">Delete</button>
            </div>
          </template>
        </b-table>
      </template>

      <template v-else>
        <p class="text-center">No Products Available</p>
      </template>

      <!-- Add Product Button -->
      <div class="d-flex justify-content-end mt-3">
        <button @click="goToAddProduct" class="btn btn-primary">Add Product</button>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/api';

export default {
  data() {
    return {
      products: [],
      tableFields: [
        { key: 'name', label: 'Name' },
        { key: 'category', label: 'Category' },
        { key: 'active_ingredients', label: 'Active Ingredients' },
        { key: 'research_status', label: 'Research Status' },
        { key: 'batch_number', label: 'Batch Number' },
        { key: 'manufacturing_date', label: 'Manufacturing Date' },
        { key: 'expiration_date', label: 'Expiration Date' },
        { key: 'actions', label: 'Actions' },
      ],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.products = await ApiService.getProducts();
    },
    async deleteProduct(id) {
      await ApiService.deleteProduct(id);
      this.fetchProducts();
    },
    editProduct(id) {
      if (id) {
        this.$router.push({ name: 'ProductEdit', params: { id } });
      } else {
        console.error("Missing product ID");
      }
    },
    viewProduct(id) {
      if (id) {
        this.$router.push({ name: 'ProductDetails', params: { id } });
      }
    },
    goToAddProduct() {
      this.$router.push({ name: 'ProductForm' });
    },
  },
};
</script>

<style scoped>

</style>
