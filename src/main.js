import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store/index';
import mixins from './mixins/index';
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  mixins:[mixins],
  render: h => h(App)
}).$mount('#app')
