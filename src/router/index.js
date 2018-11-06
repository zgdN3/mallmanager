import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'
import Login from '@/views/login.vue'
import Users from '@/views/users.vue'
Vue.use(Router)
// Vue.use(Home)
export default new Router({
  routes: [{
    name:'home',
    path:'/',
    component: Home,
    children:[{
      name:'users',
      path:'/users',
      component:Users
    }]
  },
  {
    name:'login',
    path:'/login',
    component:Login
  }]
})
