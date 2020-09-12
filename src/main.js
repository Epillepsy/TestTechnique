import Vue from 'vue';
import VueCookie from 'vue-cookie';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import VueInfiniteScroll from '@grafikri/vue-infinite-scroll';
import App from './App.vue';
import router from './router';
import store from './store';


import './scss/element-variables.scss';

import api from './plugins/api';

Vue.config.productionTip = false;


Vue.use(ElementUI, {
  locale,
});
Vue.use(VueInfiniteScroll);
Vue.use(api);
Vue.use(VueCookie);

Vue.mixin({
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
