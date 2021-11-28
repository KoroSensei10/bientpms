import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import VueBottomNavigation from "bottom-navigation-vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App).use(store).use(router).use(VueBottomNavigation)
.use('font-awesome-icon', FontAwesomeIcon).mount('#app')