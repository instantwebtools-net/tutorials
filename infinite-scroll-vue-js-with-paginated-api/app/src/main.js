import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)

new Vue({
  render: h => h(App),
}).$mount('#app')
