<template>
  <div id="app">
    <header>
      <nav class="navbar-custom d-flex align-items-center justify-content-between p-3">
        <div class="logo">
          <router-link to="/">
            <img
              src="https://www.pfizer.at/images/custom/Pfizer_Logo_Color_RGB.png"
              alt="Pfizer logo"
              class="logo-image"
            />
          </router-link>
        </div>
        <h2 class="navbar-title">Research Products Dashboard</h2>
      </nav>
    </header>

    <div class="container mt-4">
      <h2 class="text-start mb-4">Product Details</h2>

      <div class="card p-4">
        <div class="mb-3">
          <p><strong>Name:</strong> {{ product.name }}</p>
        </div>
        <div class="mb-3">
          <p><strong>Category:</strong> {{ product.category }}</p>
        </div>
        <div class="mb-3">
          <p><strong>Active Ingredients:</strong> {{ product.active_ingredients }}</p>
        </div>
        <div class="mb-3">
          <p><strong>Research Status:</strong> {{ product.research_status }}</p>
        </div>
        <div class="mb-3">
          <p><strong>Batch Number:</strong> {{ product.batch_number }}</p>
        </div>
        <div class="mb-3">
          <p><strong>Manufacturing Date:</strong> {{ product.manufacturing_date }}</p>
        </div>
        <div class="mb-3">
          <p><strong>Expiration Date:</strong> {{ product.expiration_date }}</p>
        </div>

        <div class="d-flex justify-content-between">
          <button 
            @click="$router.push({ name: 'ProductEdit', params: { id: product.id } })" 
            class="btn btn-primary">
            Edit
          </button>
          <button 
            @click="$router.push({ name: 'ProductList' })" 
            class="btn btn-secondary">
            Back to List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/api';

export default {
  data() {
    return {
      product: {},
    };
  },
  created() {
    this.fetchProduct(this.$route.params.id);
  },
  methods: {
    async fetchProduct(id) {
      this.product = await ApiService.getProduct(id);
    },
  },
};
</script>

<style scoped>

</style>
