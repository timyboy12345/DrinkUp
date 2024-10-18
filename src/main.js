import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import './index.css'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import {createPinia} from "pinia";

const app = createApp(App)

app.use(router)

app.use(createPinia());

// https://unhead.unjs.io/setup/vue/installation
import {createHead, VueHeadMixin} from '@unhead/vue';
const head = createHead()
app.use(head)
app.mixin(VueHeadMixin)

// TODO: Remove Axios
app.use(VueAxios, axios)
axios.defaults.baseURL = 'https://parkscape-api.arendz.workers.dev';

app.mount('#app')
