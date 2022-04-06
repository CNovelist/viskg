import Vue from 'vue'
import Router from 'vue-router'

import Home from "@/views/Home"
import FullScreen from "@/views/FullScreen"
import Nodes from "@/views/Nodes"
import Relations from "@/views/Relations"
import Teamwork from "@/views/Teamwork"

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
    {
      path: '/nodes',
      name: 'Nodes',
      component: Nodes
    },
    {
      path: '/relations',
      name: 'Relations',
      component: Relations
    },
    {
      path: '/team',
      name: 'Teamwork',
      component: Teamwork
    }
  ]
})
