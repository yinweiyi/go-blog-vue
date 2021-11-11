import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCodeHighlight from 'vue-code-highlight'
import 'vue-code-highlight/themes/prism-okaidia.css'
import './style/base.scss'
import 'normalize.css'

createApp(App).use(store).use(VueCodeHighlight).use(router).mount('#app')
