import Vue from 'vue'
import VueRouter from 'vue-router'
import guardMyroute from './guards'

Vue.use(VueRouter)

const routes = [
  {
    path:'/blog',
    name:'BlogFeed',
    component: () => import('../views/BlogFeed.vue'),
    meta:{
      title:'Blog'
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta:{
      title:'Login'
    }
  },
  {
    path:'/author',
    name:'Author',
    component: () => import('../views/Author.vue'),
    beforeEnter: guardMyroute,
    meta:{
      title:'Author'
    }
  },
  {
    path: '/:slug',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue'),
    meta:{
      title:'Blog Post'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta:{
      title:'Home'
    }
  }

]

const DEFAULT_TITLE = 'jakesteele.net';

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
      document.title = to.meta.title || DEFAULT_TITLE;
  });
});

export default router
