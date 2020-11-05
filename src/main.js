import { createApp } from 'vue'
import App from './App.vue'
import './bootstrap'
import router from './router'
import { VuelidatePlugin } from '@vuelidate/core'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
.use(router)
.use(VuelidatePlugin)
.use(VueAxios,axios)
.mount('#app')
