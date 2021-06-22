import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuescroll from "vuescroll/dist/vuescroll-native";
import "vuescroll/dist/vuescroll.css";

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

Vue.config.productionTip = false
Vue.use(vuescroll);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')