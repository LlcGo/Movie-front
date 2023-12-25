import {RouteRecordRaw} from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Demo from "../page/demo/demo.vue";

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
    }
]
export default routes