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
import Ffempgsc from "../components/ffempgsc.vue";
import Test2 from "../components/test2.vue";
import AdminLogin from "../page/context/admin/AdminLogin.vue";
import LayoutAdmin from "../layout/LayoutAdmin.vue";
import UserList from "../page/context/admin/userManger/UserList.vue";
import UserDetail from "../page/context/admin/userManger/UserDetail.vue";
import AdminIndex from "../page/context/admin/home/AdminIndex.vue";
import MovieList from "../page/context/admin/movieManger/MovieList.vue";


const routes: Array<RouteRecordRaw> = [
    //用户路由
    {
        path: "/",
        name: "登录",
        component: Login,
    },

    // {
    //     path: "/testV",
    //     name: "p",
    //     component: Ffempgsc,
    // },
    // {
    //     path: "/test2",
    //     name: "p2",
    //     component: Test2,
    // },
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
    // {
    //     path: "/test",
    //     name: "头部",
    //     component: TestHeader,
    // },
    // {
    //     path: "/v",
    //     name: "用户",
    //     component: Demo,
    // },
    // {
    //     path: "/chat2",
    //     name: "聊天2",
    //     component: Chat2,
    // },

    // 管理员路由
    {
        path: "/isAdmin/Login",
        name: "管理员登录",
        component: AdminLogin,
    },

    // 首页
    {
        path: '/admin',
        // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
        redirect: '/admin/home',
        name:'admin',
        component: LayoutAdmin,
        children: [
            {
                path: '/admin/home',
                name:'home',
                component: AdminIndex,
                meta: { title: '首页',icon:'permission',affix: true},
                hidden: true,//true不显示在侧边栏
            },
        ]

    },


//用户管理
    {
        path: '/adminAuth',
        component: LayoutAdmin,
        redirect: '/adminAuth/userList',
        alwaysShow: true, // will always show the root menu
        name: 'adminAuth',
        meta: {
            title: '用户管理',
            icon: 'permission'
        },
        children: [
            {
                path: '/adminAuth/userList',
                component: UserList,
                name: 'userList',
                meta: { title: '用户列表',icon:'permission'}
            },
            {
                path: '/adminAuth/detail',
                name: 'detail',
                component: UserDetail,
                meta: { title: '用户详情',icon:'permission'},
                hidden: true,//true不显示在侧边栏
            }
        ]
    },


    //影片管理
    {
        path: '/adminMovie',
        component: LayoutAdmin,
        redirect: '/adminMovie/movieList',
        alwaysShow: true, // will always show the root menu
        name: 'adminMovie',
        meta: {
            title: '影片管理',
            icon: 'permission'
        },
        children: [
            {
                path: '/adminMovie/movieList',
                component: MovieList,
                name: 'movieList',
                meta: { title: '影片列表',icon:'permission'}
            },
        ]
    },

    // 榜单管理
    {
        path: '/adminLeaderboard',
        component: LayoutAdmin,
        redirect: '/adminLeaderboard/setMovie',
        alwaysShow: true, // will always show the root menu
        name: 'adminLeaderboard',
        meta: {
            title: '榜单管理',
            icon: 'permission'
        },
        children: [
            {
                path: '/adminLeaderboard/setMovie',
                component: UserList,
                name: 'setMovie',
                meta: { title: '排名设置',icon:'permission'}
            },
        ]
    },

    //网站数据可视化
    {
        path: '/adminVisualization',
        component: LayoutAdmin,
        redirect: '/adminVisualization/visualization',
        alwaysShow: true, // will always show the root menu
        name: 'adminVisualization',
        meta: {
            title: '数据可视化',
            icon: 'permission'
        },
        children: [
            {
                path: '/adminVisualization/visualization',
                component: UserList,
                name: 'visualization',
                meta: { title: '网站流量',icon:'permission'}
            },
        ]
    }

]
export default routes