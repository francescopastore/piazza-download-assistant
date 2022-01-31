import Vue from "vue";
import Vuex from "vuex";
import VuexWebExtensions from "vuex-webextensions";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [VuexWebExtensions()],
  state: {
    error: "TEST",
    data: {},
  },
  mutations: {
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {},
  modules: {},
});
