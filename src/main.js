import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.css'
import HttpTool from '@/plugins/http.js'
import App from './App'
import router from './router'
import moment from 'moment'

Vue.use(HttpTool)
Vue.use(ElementUI)

// 过滤器
Vue.filter('fmtData',function(v){
  return moment(v).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})