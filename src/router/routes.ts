import {RouteRecordRaw} from "vue-router";
import Demo from "../page/demo/CountDown.vue";
import Vedio from "../page/context/front/Video.vue";
import Chat from "../page/context/front/chat/Chat.vue";
import Login from "../page/user/login.vue";
import Chat2 from "../page/demo/Chat2.vue";
import Layout from "../components/Layout.vue";
import TestHeader from "../components/TestHeader.vue";
import Index from "../page/context/front/Index.vue";
import MovieDetails from "../page/context/front/MovieDetails.vue";
import Details from "../page/context/front/Details.vue";
import Search from "../page/context/front/Search.vue";
import TopSearch from "../page/context/front/TopSearch.vue";
import UserIndex from "../page/context/front/userCenter/UserIndex.vue";
import MyDetail from "../page/context/front/userCenter/MyDetail.vue";
import UpdatePassword from "../page/context/front/userCenter/UpdatePassword.vue";
import MyFavour from "../page/context/front/userCenter/MyFavour.vue";
import MyMovie from "../page/context/front/userCenter/MyMovie.vue";
import MyOrder from "../page/context/front/userCenter/MyOrder.vue";
import MyFriends from "../page/context/front/chat/MyFriends.vue";
import GoChat from "../page/context/front/chat/GoChat.vue";
import SearchFriend from "../page/context/front/chat/SearchFriend.vue";
import Message from "../page/context/front/chat/Message.vue";

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
        },{
            path:'detail',
            name:'xq',
            component:MovieDetails,
            children:[{
                path: "watch",
                name: "影视",
                component: Vedio,
            },{
                path: '',
                name: '详情',
                component : Details
            }]
        },{
            path:'search',
            name:'sc',
            component:Search,
        },{
            path:'tSearch',
            name:"tos",
            component: TopSearch
        },{
            path:'account',
            name:"ac",
            component: UserIndex,
            children:[{
                path: "",
                name: "我的信息",
                component: MyDetail,
            },{
                path: 'favour',
                name: '我的收藏',
                component : MyFavour
            },{
                path: 'upPass',
                name: '修改密码',
                component : UpdatePassword
            },{
                path: 'myOrder',
                name: '我的订单',
                component : MyOrder
            },{
                path: 'movie',
                name: '我的影视',
                component : MyMovie
            }]
        },{
            path: "chat",
            name: "聊天",
            component: Chat,
            children:[{
                path: 'myFriends',
                name: '我的好友',
                component: MyFriends
            },{
                path: '',
                name: '我的消息',
                component: GoChat
            },{
                path: 'searchFriends',
                name: '在线寻友',
                component: SearchFriend
            },{
                path: 'message',
                name: '消息',
                component: Message
            },]
        },]
    },
    {
        path: "/test",
        name: "头部",
        component: TestHeader,
    },
    {
        path: "/v",
        name: "用户",
        component: Demo,
    },
    {
        path: "/chat2",
        name: "聊天2",
        component: Chat2,
    },

]
export default routes