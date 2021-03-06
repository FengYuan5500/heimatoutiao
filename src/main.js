import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/validation'
// REM适配：动态设置html标签字体大小
import 'amfe-flexible'
// 加载注册vant组件
import './utils/register-vant'
// 加载全局样式
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
