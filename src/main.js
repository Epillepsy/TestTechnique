import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import VueInfiniteScroll from '@grafikri/vue-infinite-scroll';
import Moment from 'moment';
import App from './App.vue';
import router from './router';
import store from './store';

import './scss/element-variables.scss';

import api from './plugins/api';

Vue.config.productionTip = false;

// Set locale globally
// easier to format on mail detail
// and avoid side effects from weird locations
Moment.locale('fr');

Vue.use(ElementUI, {
  locale,
});
Vue.use(VueInfiniteScroll);
Vue.use(api);

Vue.mixin({
  // Maybe should use a watcher instead, not sure about perf issues
  computed: {
    isMobile() {
      return window.innerWidth < 768;
    }
  }

});
const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

window.app = app;
