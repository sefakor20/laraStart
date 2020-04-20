/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');


//import vform
import { Form, HasError, AlertError } from 'vform'

// import sweetalert
import swal from 'sweetalert2'
window.swal = swal;

//register toast globally to display the sweetalert
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

//register toast to the window
window.toast = toast;



//import moment js
import moment from 'moment'

window.Form = Form;
//register global components
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

//import vue router
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//import vue progressbar
import VueProgressBar from 'vue-progressbar' 

//progressbar component
Vue.use(VueProgressBar, {
  color: 'rgb(143,, 255, 199)',
  failedColor: 'red',
  height: '3px'
});


//register routes
let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/users', component: require('./components/Users.vue').default},
    { path: '/profile', component: require('./components/Profile.vue').default}
  ]


//create the instance of vue router
const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})


//convert text to uppercase
Vue.filter('upText', function(text){
  return text.charAt(0).toUpperCase() +text.slice(1);
});

//moment filter for date
Vue.filter('myDate', function(created){
  return moment(created).format('MMMM Do YYYY');
});



window.Fire = new Vue();


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
  });