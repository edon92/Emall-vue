// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/border.css'
import 'common/iconfont/iconfont.css'
import 'common/reset.css'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

Vue.use(VueLazyLoad, {
  loading: require('common/image/lazyload.gif')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
