import {RouteRecordRaw} from "vue-router";
import Demo from "../page/demo/demo.vue";
import Vedio from "../page/demo/vedio.vue";
import Chat from "../page/demo/Chat.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "666",
        component: Chat,
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
    }
]
export default routes