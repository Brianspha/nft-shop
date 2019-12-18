import Vue from 'vue'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './store/'
import route from "./routes/"
import ImageUploader from "vue-image-upload-resize";

Vue.use(ImageUploader);
Vue.config.productionTip = false
new Vue({
  router: route,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')