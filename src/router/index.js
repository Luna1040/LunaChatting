import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: () => import('../views/mainView/Chatting.vue')
  },
  {
    path: '/Chatting',
    name: 'Chatting',
    component: () => import('../views/mainView/Chatting.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/user/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/user/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
