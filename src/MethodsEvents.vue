<template>

  <div class="counter-app">
    <h1>Interactive Counter</h1>
    <p>Counter: {{ counter }}</p>
  </div>

  <div class="buttons">
    <button @click="increaseCounter">Increase</button>
    <button @click="decreaseCounter">Decrease</button>
    <button @click="resetCounter">Reset</button>
  </div>

  <!-- Product list section -->
  <div class="product-list">
    <h2>Products</h2>
    
    <!-- Check if the products array is empty -->
    <div v-if="products.length === 0">
      <p>No products available.</p>
    </div>

    <!-- Display products if available -->
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        <h3>Product name: {{ product.name }} | Product category: {{ product.category }}</h3>
        <p><strong>Active Ingredients:</strong> {{ product.active_ingredients }}</p>
        <p><strong>Research Status:</strong> {{ product.research_status }}</p>
        <p><strong>Batch Number:</strong> {{ product.batch_number }}</p>
        <p><strong>Manufacturing Date:</strong> {{ formatDate(product.manufacturing_date) }}</p>
        <p><strong>Expiration Date:</strong> {{ formatDate(product.expiration_date) }}</p>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        counter: 0,
        products: [] // Start with an empty products array
      }
    },

    methods: {
      increaseCounter() {
        this.counter++;
      },
      decreaseCounter() {
        if (this.counter > 0){
          this.counter--;
        }
      },
      resetCounter() {
        this.counter = 0;
      },
      fetchProducts() {
        fetch('http://localhost/api/products')
          .then(response => response.json())
          .then(data => {
            this.products = Array.isArray(data) ? data : [data]; // Store fetched products
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
    },

    mounted() {
      this.fetchProducts(); // Fetch products when component is mounted
    }
  }
</script>

<style scoped>
.counter-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

p {
  font-size: 24px;
}

.buttons {
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: burlywood;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 20px;
}

button:hover {
  background-color: #b0af9f;
}

/* Product list styling */
.product-list {
  margin-top: 30px;
  text-align: left;
}

.product-list ul {
  list-style-type: none;
  padding: 0;
}

.product-list li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.product-list h3 {
  margin: 0;
}

</style>
