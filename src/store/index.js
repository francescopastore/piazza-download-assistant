import Vue from "vue";
import Vuex from "vuex";
import VuexWebExtensions from "vuex-webextensions";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [VuexWebExtensions()],
  state: {
    message: {
      type: "",
      payload: {},
    },
    data: {},
  },
  mutations: {
    setMessage(state, payload) {
      state.message.type = payload.type;
      state.message.payload = payload.payload;
    },
  },
  actions: {},
  modules: {},
});
