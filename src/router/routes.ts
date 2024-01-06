import {RouteRecordRaw} from "vue-router";
import Demo from "../page/demo/demo.vue";
import Vedio from "../page/demo/vedio.vue";
import Chat from "../page/demo/Chat.vue";
import Login from "../page/user/login.vue";
import Chat2 from "../page/demo/Chat2.vue";
import Layout from "../components/Layout.vue";
import TestHeader from "../components/TestHeader.vue";
import Index from "../page/context/front/index.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "登录",
        component: Login,
    },
    {
        path: "/layout",
        name: "布局",
        component: Layout,
        children:[{
            path:'',
            name:'主页',
            component:Index
        }]
    },
    {
        path: "/test",
        name: "头部",
        component: TestHeader,
    },
    {
        path: "/user",
        name: "用户",
        component: Demo,
    },
    {
        path: "/v",
        name: "用户",
        component: Vedio,
    },
    {
        path: "/chat",
        name: "聊天",
        component: Chat,
    },
    {
        path: "/chat2",
        name: "聊天2",
        component: Chat2,
    },

]
export default routes