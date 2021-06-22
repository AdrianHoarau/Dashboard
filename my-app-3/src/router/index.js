import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
      path: '/',
      name: 'home',
      component: () => import('../components/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/users/login',
    name: 'login redirect',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/Dashboard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.replace({ path: '*', redirect: '/' });

export default router