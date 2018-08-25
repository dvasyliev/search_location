import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/search_location/' : '/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
