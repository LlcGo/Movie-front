import {RouteRecordRaw} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Demo from "../page/demo/demo.vue";
import Vedio from "../page/demo/vedio.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "666",
        component: HelloWorld,
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