import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Web3 from 'web3'
import 'animate.css'
import 'normalize.css'
import global from '../public/global.vue'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.prototype.Web3 = Web3
Vue.prototype.GLOBAL = global
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
