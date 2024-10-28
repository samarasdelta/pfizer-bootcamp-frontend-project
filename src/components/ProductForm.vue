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
        <h2 class="navbar-title text-center">Research Products Dashboard</h2>
      </nav>
    </header>

    <!-- Main Form Section -->
    <div class="form-container container mt-4">
      <h2 class="text-start mb-4">{{ isEditMode ? 'Edit Product' : 'Add New Product' }}</h2>
      <form @submit.prevent="submitForm" class="product-form">
        <!-- Name input -->
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="product.name" 
            :class="{ 'is-invalid': v$.product.name.$error, 'form-control': true }" 
            @input="v$.product.name.$touch()" 
            placeholder="Enter Product Name"
            maxlength="50"
          >
          <div v-if="v$.product.name.$error" class="invalid-feedback">Product Name is required.</div>
        </div>

        <!-- Category input -->
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select 
            v-model="product.category" 
            id="category" 
            :class="{ 'is-invalid': v$.product.category.$error, 'form-select': true }" 
            @change="v$.product.category.$touch()"
          >
            <option value="" disabled selected>Select a category</option>
            <option value="Painkillers">Painkillers</option>
            <option value="Opioids">Opioids</option>
            <option value="NSAIDs">NSAIDs</option>
            <option value="Immunosuppressants">Immunosuppressants</option>
            <option value="Steroids">Steroids</option>
          </select>
          <div v-if="v$.product.category.$error" class="invalid-feedback">Category is required.</div>
        </div>

        <!-- Active Ingredients input -->
        <div class="mb-3">
          <label for="active_ingredients" class="form-label">Active Ingredients</label>
          <input 
            type="text" 
            id="active_ingredients" 
            v-model="product.active_ingredients" 
            :class="{ 'is-invalid': v$.product.active_ingredients.$error, 'form-control': true }" 
            @input="v$.product.active_ingredients.$touch()"
            placeholder="e.g., Acetaminophen, Ibuprofen"
          >
          <div v-if="v$.product.active_ingredients.$error" class="invalid-feedback">Active ingredients are required.</div>
          <small class="form-text text-muted">Enter the active ingredients of the product, separated by commas.</small>
        </div>

        <!-- Research Status input -->
        <div class="mb-3">
          <label for="research_status" class="form-label">Research Status</label>
          <select 
            v-model="product.research_status" 
            id="research_status" 
            :class="{ 'is-invalid': v$.product.research_status.$error, 'form-select': true }" 
            @change="v$.product.research_status.$touch()"
          >
            <option value="" disabled>Select Research Status</option>
            <option value="Approved">Approved</option>
            <option value="In Development">In Development</option>
            <option value="Experimental">Experimental</option>
          </select>
          <div v-if="v$.product.research_status.$error" class="invalid-feedback">Research status is required.</div>
        </div>

        <!-- Batch Number input -->
        <div class="mb-3">
          <label for="batch_number" class="form-label">Batch Number</label>
          <input 
            type="text" 
            id="batch_number" 
            v-model="product.batch_number" 
            :class="{ 'is-invalid': v$.product.batch_number.$error, 'form-control': true }" 
            @input="v$.product.batch_number.$touch()"
          />
          <div v-if="v$.product.batch_number.$error" class="invalid-feedback">Batch number is required and must be in the correct format.</div>
          <small class="form-text text-muted">Enter the batch number in the format: <strong>ed-203-24-8</strong>.</small>
        </div>

        <!-- Manufacturing Date input -->
        <div class="mb-3">
          <label for="manufacturing_date" class="form-label">Manufacturing Date</label>
          <input 
            type="date" 
            id="manufacturing_date" 
            v-model="product.manufacturing_date" 
            :class="{ 'is-invalid': v$.product.manufacturing_date.$error, 'form-control': true }" 
            @input="v$.product.manufacturing_date.$touch()"
          />      
          <div v-if="v$.product.manufacturing_date.$error" class="invalid-feedback">Manufacturing date is required and must be today or in the past.</div>
        </div>

        <!-- Expiration Date input -->
        <div class="mb-3">
          <label for="expiration_date" class="form-label">Expiration Date</label>
          <input 
            type="date" 
            id="expiration_date" 
            v-model="product.expiration_date" 
            :class="{ 'is-invalid': v$.product.expiration_date.$error, 'form-control': true }" 
            @input="v$.product.expiration_date.$touch()"
          />
          <div v-if="v$.product.expiration_date.$error" class="invalid-feedback">Expiration date is required and must be after the Manufacturing Date.</div>
        </div>

        <div class="d-flex justify-content-end mt-3">
          <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Update Product' : 'Add Product' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ApiService from '../services/api';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { toast } from 'vue3-toastify';

const isPastOrToday = helpers.withMessage(
  "Manufacturing date must be today or in the past.",
  (value) => !value || new Date(value) <= new Date()
);

export default {
  data() {
    return {
      product: {
        name: '',
        category: '',
        active_ingredients: '',
        research_status: '',
        batch_number: '',
        manufacturing_date: '',
        expiration_date: ''
      },
      apiError: null,
      noChangesMessage: null,
      originalProduct: {}, 
      isEditMode: false
    };
  },
  created() {
    this.isEditMode = Boolean(this.$route.params.id);
    if (this.isEditMode) {
      this.fetchProduct(this.$route.params.id);
    }
  },
  validations() {
    return {
      product: {
        name: { required },
        category: { required },
        active_ingredients: { required },
        research_status: { required },
        batch_number: { required },
        manufacturing_date: { required, isPastOrToday },
        expiration_date: { 
          required, 
          isFutureAndAfterManufacturingDate: helpers.withMessage(
            "Expiration date must be after the manufacturing date and in the future.",
            (value) => {
              const manufacturingDate = this.product.manufacturing_date;
              return (
                !value ||
                (new Date(value) > new Date(manufacturingDate))
              );
            }
          )
        }
      }
    };
  },
  setup() {
    const v$ = useVuelidate();
    return { v$ };
  },
  watch: {
    'product.manufacturing_date'() {
      this.v$.product.expiration_date.$touch();
    }
  },
  methods: {
    async fetchProduct(id) {
      try {
        const productData = await ApiService.getProduct(id);
        
        // Ensure date fields are formatted as YYYY-MM-DD for compatibility with input[type="date"]
        productData.manufacturing_date = this.formatDateForInput(productData.manufacturing_date);
        productData.expiration_date = this.formatDateForInput(productData.expiration_date);

        this.product = productData;
        this.originalProduct = { ...productData };  // For tracking changes
      } catch (error) {
        this.apiError = 'Failed to load product data for editing.';
        toast.error(this.apiError);
      }
    },
    
    // Utility function to convert date to YYYY-MM-DD format
    formatDateForInput(date) {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    async submitForm() {
      try {
        this.v$.$touch();

        if (!this.v$.$invalid) {
          const isUnchanged = JSON.stringify(this.product) === JSON.stringify(this.originalProduct);
          if (this.isEditMode && isUnchanged) {
            this.noChangesMessage = "No changes detected. Please modify the fields to update.";
            toast.warning(this.noChangesMessage);
            return;
          }
          
          if (this.isEditMode) {
            await ApiService.updateProduct(this.$route.params.id, this.product);
            toast.success("Product updated successfully!");
          } else {
            await ApiService.addProduct(this.product);
            toast.success("Product added successfully!");
          }
          
          setTimeout(() => {
            if (this.$route.name === 'ProductEdit' || this.$route.name === 'ProductForm') {
              this.$router.push('/');
            }
          }, 3000);
        }
      } catch (error) {
        this.apiError = error.message;
        toast.error("Failed to submit product data. Please try again.");
      }
    }
  }

};
</script>



<style scoped>

</style>
