import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'
import {gsap} from "gsap";

Vue.use(Vue2TouchEvents, { swipeTolerance: 80 });
Vue.use(gsap);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
