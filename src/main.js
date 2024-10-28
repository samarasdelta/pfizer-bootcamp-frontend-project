import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css'
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import BootstrapVue3 from 'bootstrap-vue-3';

const app = createApp(App);

app.use(Vue3Toastify, {
  autoClose: 2000,
  position: 'top-right',
  closeButton: true,
  pauseOnHover: true
});

app.use(BootstrapVue3);
app.use(router);
app.mount('#app');
