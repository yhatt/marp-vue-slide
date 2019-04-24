import Vue from 'vue'
import Presenter from './Presenter.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Presenter),
}).$mount('#presenter')
