import Vue from "vue";
import Vuex from "vuex";
import filters from "./modules/filters";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { filters },
});
export default store;
