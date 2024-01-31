import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/reset.css";
import NPlayer from "@nplayer/vue";
import { createPinia } from 'pinia'
const app =  createApp(App)




// import installFilter from './filters/index.js';
// installFilter(app)
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 分页组件
import Pagination from '@/components/Pagination'
// svg组件
import svgIcon from "@/components/SvgIcon/index";
// 全局组件挂载
app.component('RightToolbar', RightToolbar)
app.component('Pagination', Pagination)
app.component('svg-icon', svgIcon)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 注册全部的svg图标
import 'virtual:svg-icons-register'
//element 图片

import elementIcons from './plugins/svgicon.js'
app.use(ElementPlus).use(elementIcons) //全局注册element svg图标

// 全局组件挂载
app.use(createPinia())
    .use(router)
    .use(Antd)
    .use(NPlayer)
    .mount('#app')

