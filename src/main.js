import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap";
import "@/directives/scroll";
import store from "@/store/store";
import { i18n } from "./i18n";
import { Trans } from "./plugins/Translation";

Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuex);
Vue.config.productionTip = false;

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB6232TowaSTKYWVUuSOvwaeBr06iltIz0",
  },

  installComponents: true,
});

new Vue({
  router: router,
  store: store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
