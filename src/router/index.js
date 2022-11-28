import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/home/index.vue'
import Checkout from "../views/checkout/index.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router