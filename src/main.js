import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'
import {gsap} from "gsap";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.use(Vue2TouchEvents, { swipeTolerance: 200 });
Vue.use(gsap);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
