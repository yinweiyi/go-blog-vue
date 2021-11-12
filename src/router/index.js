import { createRouter, createWebHistory } from 'vue-router'

import Articles from '../views/home/Articles'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Articles,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/categories/:slug',
    name: 'Categories',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "categories" */ '../views/home/Articles.vue')
  },
  {
    path: '/tags/:slug',
    name: 'Tags',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tags" */ '../views/home/Articles.vue')
  },
  {
    path: '/articles/:article',
    name: 'Articles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "articles" */ '../views/articles/ArticleDetail.vue')
  }
  ,
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue')
  },
  {
    path: '/guestbook',
    name: 'Guestbook',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "guestbook" */ '../views/guestbook/Guestbook.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
