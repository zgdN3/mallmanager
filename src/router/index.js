import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
Vue.use(Router)
// Vue.use(Home)
export default new Router({
  routes: [{
    name:'home',
    path:'/',
    component: Home
  },
  {
    name:'login',
    path:'/login',
    component:Login
  }]
})
