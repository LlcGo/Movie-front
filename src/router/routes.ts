import {RouteRecordRaw} from "vue-router";
import Demo from "../page/demo/demo.vue";
import Vedio from "../page/demo/vedio.vue";
import Chat from "../page/demo/Chat.vue";
import Login from "../page/user/login.vue";
import Regist from "../page/user/regist.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "首页",
        component: Login,
    },
    {
        path: "/register",
        name: "注册",
        component: Regist,
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
    }
]
export default routes