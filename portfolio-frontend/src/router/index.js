import Vue from 'vue'
import VueRouter from 'vue-router'
import guardMyroute from './guards'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'BlogFeed',
    component: () => import('../views/BlogFeed.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path:'/author',
    name:'Author',
    component: () => import('../views/Author.vue'),
    beforeEnter: guardMyroute
  },
  {
    path: '/:slug',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
