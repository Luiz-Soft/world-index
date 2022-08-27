import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap";
import '@/directives/scroll'
import store from '@/store/store'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.config.productionTip = false

import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB6232TowaSTKYWVUuSOvwaeBr06iltIz0',
  },


  installComponents: true
})


new Vue({
  router:router,
  store: store,
  render: h => h(App),
}).$mount('#app')

