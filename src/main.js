import Vue from 'vue'
import 'reset-css' // 清除样式
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/assets/icons/index'
import '@/utils/filter'
import dataV from '@jiaminghi/data-view'
import VCharts from 'v-charts'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(dataV)
Vue.use(VCharts)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
