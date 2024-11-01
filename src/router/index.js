import { createRouter, createWebHistory } from 'vue-router'; 
import ProductList from '../components/ProductList.vue';
import ProductForm from '../components/ProductForm.vue';
import ProductDetails from '../components/ProductDetails.vue';
import NotFound from '../components/NotFound.vue';

// Routes configuration
const routes = [
    { path: '/', name: 'ProductList', component: ProductList },
    { path: '/product/add', name: 'ProductForm', component: ProductForm },
    { path: '/product/:id/edit', name: 'ProductEdit', component: ProductForm },
    { path: '/product/:id', name: 'ProductDetails', component: ProductDetails },
    { path: '/:catchAll(.*)', name: 'NotFound', component: NotFound },
];

// Create a Vue Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
