import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/reset.css";
import NPlayer from "@nplayer/vue";
import { createPinia } from 'pinia'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(Antd)
    .use(NPlayer)
    .mount('#app')