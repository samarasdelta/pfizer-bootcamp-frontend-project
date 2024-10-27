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
        <h2 class="navbar-title text-center">Research Products Dashboard</h2>
      </nav>
    </header>

    <!-- Main Content Section -->
    <div class="container mt-4" style="max-width: 100%;">
      <h2 class="text-start mb-4">Research Products</h2>

      <!-- Desktop: Products Table -->
      <div class="d-none d-md-block">
        <b-table striped hover :items="products" :fields="tableFields" responsive>
          <template #cell(actions)="data">
            <div class="btn-group" role="group" aria-label="Product Actions">
              <button @click="viewProduct(data.item.id)" class="btn btn-outline-primary btn-sm">
                View
              </button>
              <button @click="editProduct(data.item.id)" class="btn btn-outline-success btn-sm">
                Edit
              </button>
              <button @click="deleteProduct(data.item.id)" class="btn btn-outline-danger btn-sm">
                Delete
              </button>
            </div>
          </template>
        </b-table>
      </div>

      <!-- Mobile: Products as Cards -->
      <div class="row d-md-none">
        <div class="col-12 mb-3" v-for="(product, index) in products" :key="index">
          <div class="card h-100">
            <div class="card-header bg-primary text-white">
              {{ product.name }}
            </div>
            <div class="card-body">
              <!-- <p><strong>Name:</strong> {{ product.name }}</p> -->
              <p><strong>Category:</strong> {{ product.category }}</p>
              <p><strong>Active Ingredients:</strong> {{ product.active_ingredients }}</p>
              <p><strong>Research Status:</strong> {{ product.research_status }}</p>
              <p><strong>Batch Number:</strong> {{ product.batch_number }}</p>
              <p><strong>Manufacturing Date:</strong> {{ product.manufacturing_date }}</p>
              <p><strong>Expiration Date:</strong> {{ product.expiration_date }}</p>
              
            </div>
            <div class="card-footer d-flex justify-content-between">
              <button @click="viewProduct(product.id)" class="btn btn-outline-primary btn-sm">View</button>
              <button @click="editProduct(product.id)" class="btn btn-outline-success btn-sm">Edit</button>
              <button @click="deleteProduct(product.id)" class="btn btn-outline-danger btn-sm">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <!-- No Products Available Message -->
      <template v-if="!loading && products.length === 0">
        <p class="text-center">No Products Available</p>
      </template>

      <!-- Loading Message -->
      <p v-if="loading" class="text-center">Products loading...</p>

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
