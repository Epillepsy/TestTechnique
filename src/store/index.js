import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import vuexCache from 'vuex-cache';

import store from './modules/store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    store,
  },
  plugins: [
    createPersistedState(),
    vuexCache({ timeout: 20000 }),
  ],

  strict: false,
});
