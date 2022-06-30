import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/views/Home"
import FullScreen from "@/views/FullScreen"

Vue.use(Router)

export default new Router({
  base: '/hsmf',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/full',
      name: 'FullScreen',
      component: FullScreen
    },
  ]
})
