/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

 window.axios = require('axios');

 window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  window.axios.defaults.withCredentials = true;
  //window.axios.defaults.baseURL = process.env.APP_URL;
  window.axios.defaults.baseURL = 'http://localhost:8000';



 let token = document.head.querySelector('meta[name="csrf-token"]');

 if (token) {
     window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
 } else {
     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
 }

window.Vue = require('vue');

import store from './store'
import router from './router/routes'
Vue.config.productionTip = false
//import axios from 'axios';
 import VueMaterial from 'vue-material';
 import 'vue-material/dist/vue-material.min.css'
 import 'vue-material/dist/theme/default.css'
 //import  *  from 'vue-material/dist/components'
 Vue.use(VueMaterial);


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('tarjetas', require('./components/Tarjetas.vue').default);
//Vue.component('formularios', require('./components/Formularios.vue').default);
//Vue.component('comboseleccionador', require('./components/ComboSeleccionador.vue').default);
Vue.component('App', require('./App.vue').default);
//Vue.component('Outlook', require('./components/Outlook.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
     store,
     router,
});
