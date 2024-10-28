<template>
  <div id="app">
    <!-- Header Section with Custom Navbar and Logo -->
    <header>
      <nav class="navbar-custom d-flex align-items-center justify-content-between p-3">
        <!-- Logo linking to the homepage -->
        <div class="logo">
          <router-link to="/">
            <img
              src="https://www.pfizer.at/images/custom/Pfizer_Logo_Color_RGB.png"
              alt="Pfizer logo"
              class="logo-image"
            />
          </router-link>
        </div>
        <h2 class="navbar-title text-center">Research Products Dashboard</h2>
      </nav>
    </header>

    <!-- Main Section -->
    <div class="container mt-4">
      <h2 class="text-start mb-4">Product Details</h2>

      <!-- Product Details Table -->
      <div class="card p-4">
        <table responsive class="table table-bordered table-striped">
          <tbody>
            <tr>
              <th scope="row">Name</th>
              <td>{{ product.name }}</td>
            </tr>
            <tr>
              <th scope="row">Category</th>
              <td>{{ product.category }}</td>
            </tr>
            <tr>
              <th scope="row">Active Ingredients</th>
              <td>{{ product.active_ingredients }}</td>
            </tr>
            <tr>
              <th scope="row">Research Status</th>
              <td>{{ product.research_status }}</td>
            </tr>
            <tr>
              <th scope="row">Batch Number</th>
              <td>{{ product.batch_number }}</td>
            </tr>
            <tr>
              <th scope="row">Manufacturing Date</th>
              <td>{{ product.manufacturing_date }}</td>
            </tr>
            <tr>
              <th scope="row">Expiration Date</th>
              <td>{{ product.expiration_date }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Action Buttons -->
        <div class="gap-2 d-flex justify-content-sm-end">
          <button 
            @click="$router.push({ name: 'ProductEdit', params: { id: product.id } })" 
            class="btn btn-primary">
            Edit
          </button>
          <button @click="deleteProduct(product.id)" class="btn btn-outline-danger btn-sm">Delete</button>
          <button 
            @click="$router.push({ name: 'ProductList' })" 
            class="btn btn-outline-secondary">
            Back to List
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/api';
import { toast } from 'vue3-toastify';

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
    // Get Product by id to be displayed
    async fetchProduct(id) {
      this.product = await ApiService.getProduct(id);
    },
    async deleteProduct(id) {
      try {
        await ApiService.deleteProduct(id);
        toast.success("Product deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          if (this.$route.name === 'ProductDetails') {
            this.$router.push('/');
          }
        }, 3000);
      } catch (error) {
        toast.error("Failed to delete the product.");
        console.error("Error deleting product:", error);
      }
    }
  },
};
</script>

<style scoped>

</style>
