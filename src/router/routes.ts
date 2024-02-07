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
import MovieDetail from "../page/context/admin/movieManger/MovieDetail.vue";
import MovieType from "../page/context/admin/movieManger/MovieType.vue";
import MovieNation from "../page/context/admin/movieManger/MovieNation.vue";
import MovieYear from "../page/context/admin/movieManger/MovieYear.vue";
import Leaderboard from "../page/context/admin/Leaderboard/Leaderboard.vue";
import Recommend from "../page/context/admin/Leaderboard/Recommend.vue";
import MovieRemark from "../page/context/admin/movieRemark/MovieRemark.vue";
import MovieBarrage from "../page/context/admin/movieRemark/MovieBarrage.vue";
import OrderDetial from "../page/context/admin/orderManger/OrderDetial.vue";
import OrderSetDDL from "../page/context/admin/orderManger/OrderSetDDL.vue";
import VipPrice from "../page/context/admin/orderManger/VipPrice.vue";
import Visualization from "../page/context/admin/adminVisualization/Visualization.vue";
import UserVisualization from "../page/context/admin/adminVisualization/UserVisualization.vue";


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
            {
                path: '/adminMovie/movieDetail',
                component: MovieDetail,
                name: 'movieDetail',
                meta: { title: '影片详情',icon:'permission'},
                hidden: true,//true不显示在侧边栏
            },
            {
                path: '/adminMovie/typeManger',
                component: MovieType,
                name: 'typeManger',
                meta: { title: '类型管理',icon:'permission'},
            },
            {
                path: '/adminMovie/nationManger',
                component: MovieNation,
                name: 'nationManger',
                meta: { title: '地区管理',icon:'permission'},
            },
            {
                path: '/adminMovie/yearManger',
                component: MovieYear,
                name: 'yearManger',
                meta: { title: '年份管理',icon:'permission'},
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
                component: Leaderboard,
                name: 'setMovie',
                meta: { title: '排名设置',icon:'permission'}
            },
            {
                path: '/adminLeaderboard/popMovie',
                component: Recommend,
                name: 'popMovie',
                meta: { title: '首页推荐设置',icon:'permission'}
            },

        ]
    },

    // 评论管理
    {
        path: '/adminRemark',
        component: LayoutAdmin,
        redirect: '/adminRemark/movieRemark',
        alwaysShow: true, // will always show the root menu
        name: 'adminRemark',
        meta: {
            title: '评论管理',
            icon: 'permission'
        },
        children: [
            {
                path: '/adminRemark/movieRemark',
                component: MovieRemark,
                name: 'movieRemark',
                meta: { title: '影片评论',icon:'permission'}
            },
            {
                path: '/adminRemark/movieBarrageRemark',
                component: MovieBarrage,
                name: 'movieBarrageRemark',
                meta: { title: '弹幕评论',icon:'permission'}
            },

        ]
    },

    //订单管理
    {
        path: '/adminOrder',
        component: LayoutAdmin,
        redirect: '/adminOrder/order',
        alwaysShow: true, // will always show the root menu
        name: 'adminOrder',
        meta: {
            title: '订单管理',
            icon: 'permission'
        },
        children: [
            {
                path: '/adminOrder/order',
                component: OrderDetial,
                name: 'order',
                meta: { title: '订单查询',icon:'permission'}
            },
            {
                path: '/adminOrder/orderSetDDL',
                component: OrderSetDDL,
                name: 'orderSetDDL',
                meta: { title: '自动取消时间设置',icon:'permission'}
            },
            {
                path: '/adminOrder/vipSet',
                component: VipPrice,
                name: 'vipSet',
                meta: { title: '会员价格管理',icon:'permission'}
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
                component: Visualization,
                name: 'visualization',
                meta: { title: '影视分析',icon:'permission'}
            },
            {
                path: '/adminVisualization/UserVisualization',
                component: UserVisualization,
                name: 'UserVisualization',
                meta: { title: '订单数据可视化',icon:'permission'}
            },
        ]
    }

]
export default routes