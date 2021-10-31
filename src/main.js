import Vue from 'vue';
import App from './App.vue';
import VueRouter from "vue-router";
import router from './routes';
import store from "./store";

Vue.use(VueRouter);

Vue.config.productionTip = false

Vue.directive("scroll", {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f);
      }
    }
    window.addEventListener('scroll', f);
  }
});

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});

new Vue({
  router,
  store,

  render: h => h(App),
}).$mount('#app')
