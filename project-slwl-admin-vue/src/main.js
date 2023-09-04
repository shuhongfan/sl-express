import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import i18n from './lang' // internationalization
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import App from './App'

import store from './store'
import router from './router'
import BaiduMap from 'vue-baidu-map'

import Empty from '@/components/common/empty'

Vue.use(BaiduMap, {
  ak: 'PYGGt7wfgyorRicuGvuHybVdQmGbPIq5'
})
// import i18n from './lang'
import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.component('Empty', Empty)

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value)
// })
Vue.config.productionTip = false
window.$ = require('jquery')

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

