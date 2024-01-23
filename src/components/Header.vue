
<template>
  <div id="header" class="shrink" >
    <h1 id="logo">
      <img :src="logo">
      罗罗影视
    </h1>

    <a-input-search
        class="topInput"
        v-model:value="value"
        placeholder="根据影片名搜索影片"
        enter-button
        @search="search"
    />

<!--    主页 收藏 信息-->
    <div class="imgContent">
      <div>
        <div v-if="unreadStore.unReadTotal > 0">
          <div class="icon-car-count" >{{unreadStore.unReadTotal}}</div>
        </div>
        <img class="messageImg" @click="toChat" :src="emessage">
        <div class="scFont">信息</div>
      </div>
      <div >
        <img class="favImg" @click="toFavour" :src="fav">
        <div class="scFont">收藏</div>
      </div>
      <div>
        <img class="homeImg" @click="toHome" :src="home">
        <div class="scFont" @click="toHome">主页</div>
      </div>
      <div @click="()=>{open = true}">
        <img class="homeImg" :src="vip">
        <div class="scFont">vip充值</div>
      </div>
    </div>

<!--    会员充值弹框-->
    <a-modal v-model:open="open"
             @ok="nowBuy"
             width="400px"
             cancelText="取消"
             style="position: relative"
             okText="购买">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1"  tab="月卡">
          <div class="fontWarp">
            <div class="nameClass">
             会员充值:一个月
            </div>
            <div class="priceClass">
              价格:${{price}}
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="季卡" force-render>
          <div class="fontWarp">
            <div class="nameClass">
              会员充值:一季度
            </div>
            <div class="priceClass">
              价格:${{price}}
            </div>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="年卡">
          <div class="fontWarp">
            <div class="nameClass">
              会员充值：一年
            </div>
            <div class="priceClass">
              价格: ${{price}}
            </div>
          </div>
        </a-tab-pane>
      </a-tabs>
      <div class="orderButton">
        <a-button @click="toOrder">提交订单稍后购买</a-button>
      </div>
      <div class="ewm">
        <img :src="m"/>
      </div>
    </a-modal>

<!--用户头像以及下拉框-->
    <div class="userContent" v-if="currentUser">
      <div class="userName">
        {{currentUser.nickname}}
      </div>
      <div>(用户)</div>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar size="large">
            <template #icon>
              <img :src="ava">
            </template>
          </a-avatar>
        </a>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1">
              <a  @click="toAccount">个人中心</a>
            </a-menu-item>
            <a-menu-item key="2">
              <a href="javascript:;">好友</a>
            </a-menu-item>
            <a-menu-item key="3">
              <a href="javascript:;" @click="loginOut">退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="userContent" v-if="!currentUser">
      <div class="noLogin">
        <img :src="login">
      </div>
      <div class="noLoginFont" @click="toLogin">
        登录
      </div>
    </div>
  </div>
  <div class="content">
  </div>
</template>

<script setup lang="ts">
import logo from "../assets/logo.png";
import emessage from '../assets/message.png'
import fav from '../assets/favour.png'
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import home from '../assets/home.png'
import {MenuProps, message} from "ant-design-vue";
import ava from '../assets/empty.png'
import {
  FriendsControllerService,
  OrderAddRequest,
  OrderByRequest,
  OrderControllerService,
  UserControllerService,
  Users
} from "../../generated";
import login from '../assets/qLogin.png'
import vip from '../assets/vip.png'
import m from "../assets/erweima.png";
import socket, {getMessage} from "../utils/websocket.ts";
import {unReadStore} from "../store/unRead.ts";

const currentUser = ref<Users>();
const router = useRouter();
const value = ref();
const open = ref<boolean>(false)
const price = ref(15)
const date = ref('月');

const unreadStore =  unReadStore();
//未读消息数量
const unReadTotal = ref();
onMounted(()=>{
  getUser();
})

const toChat = () => {
  router.push({
    path:'/layout/chat'
  })
}

const activeKey = ref('1');

//用户中心
const toAccount = () => {
  FriendsControllerService.removeCurrentUsingPost();
  router.push({
    path:'/layout/account'
  })
}

//去我的收藏
const toFavour = () => {
  FriendsControllerService.removeCurrentUsingPost();
  router.push({
    path:"/layout/account/favour"
  })
}

watch(activeKey,()=>{
  if (activeKey.value == '1'){
    price.value = 15
    date.value ='月'
    return;
  }
  if(activeKey.value == '2'){
    price.value = 50
    date.value = '季度'
    return;
  }
  if(activeKey.value == '3'){
    price.value = 148
    date.value = '年'
    return;
  }
})

const getUser = async () => {
  const res = await UserControllerService.getLoginUserUsingGet()
  if(!res.data){
    currentUser.value = null;
    console.log(currentUser.value)
    return;
  }
  currentUser.value = res.data;
  // console.log(currentUser.value)
  initConnect();
}
//初次连接如果用户登录就返回消息
const initConnect = () => {
  let sendMsg = {
    sendUserId: currentUser.value.id,
    msg: '',
    signFlag : 0,
  }
  let sendChat = {
    action: 1,
    chatMsg: sendMsg,
  }
  socket.send(sendChat)
}

socket.websocket.onmessage = (e:any) => {
  // alert('header')
  let data = JSON.parse(e.data);
  console.log(data.extand)
  //我们在线有好友请求
  if(data?.extand?.startsWith('对方的好友请求')){
    let a = data.extand.split(":");
    unreadStore.addRequestSize(Number(a[1]))
    unreadStore.setTotal();
    return;
  }
  // 查看离线时候发送过来的好友请求
  if (data?.extand?.startsWith('messageRequest')){
    let a = data.extand.split(":");
    unreadStore.addRequestSize(Number(a[1]))
    unreadStore.setTotal();
  }
  //查看离线时候发送过来的未读消息
  if(data?.chatMsgList?.length > 0){
    // console.log(data)
    unReadTotal.value = data.chatMsgList.length;
    console.log('未读消息',unReadTotal.value,'条')
    unreadStore.addSize(data.chatMsgList.length)
    unreadStore.setTotal();
    return;
  }
  //在线的时候对方发送过来了消息
  if(data?.chatMsg){
    unreadStore.addSize(1)
    unreadStore.setTotal();
    return;
  }
  // console.log(unreadStore.unReadSize)
}



//退出
const loginOut = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  sessionStorage.removeItem('user');
  getUser()
}
const toHome = () => {
  FriendsControllerService.removeCurrentUsingPost();
  router.push({
    path:'/layout'
  })
}

const toOrder = async () => {
  let data : OrderAddRequest = {
    vipType: date.value,
    state : 0
  }
  const res = await OrderControllerService.addOrderUsingPost(data);
  if(res.data){
    message.success('已成功下单,15分钟后自动取消,可在个人中心查看')
    open.value = false;
  }
}

//登录
const toLogin = () => {
  router.push({
    path: '/'
  })
}
const handleMenuClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};

//现在买
const nowBuy = async () => {
  let data = {
    date: date.value,
    state: 0,
  }
  const res = await OrderControllerService.toBuyUsingPost(data);
  console.log(res)
  if(res.data){
    open.value = false;
    message.success('恭喜您已经成为本站会员')
  }
}
const search = () => {
  if(value.value === undefined){
    message.warn('请输入搜索内容')
    return;
  }
  router.push({
    path:'/layout/tSearch',
    query:{
      moveName:value.value
    }
  })
  value.value = null
}
function resizeHeaderOnScroll() {
  const scroll = getCurrentScroll(),
      shrinkOn = 200,
      headerEl = document.getElementById('header');
  if (scroll > shrinkOn) {
    headerEl?.classList.remove('shrink');
  } else {
    headerEl?.classList.add('shrink');
  }
}
function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

window.addEventListener('scroll', resizeHeaderOnScroll);

</script>

<style scoped >
.noLoginFont{
  cursor: pointer;
  position: absolute;
  left: 25%;
}
.noLoginFont:hover{
  color: skyblue;
}
.noLogin{
  width: 25px;
  height: 25px;
  margin-right: 30%;
}

.userName{
  white-space:nowrap;
  color: #111111;
  width: 40%;;
  text-overflow: ellipsis;
  overflow:hidden;
}
.userContent{
  color: #111111;
  display: flex;
  justify-content: end;
  align-items: center;
  position: absolute;
  right: 1%;
  top: 16%;
  height: 50px;
  width: 145px;
}

.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}

.imgContent{
  display: flex;
  position: absolute;
  right: 10%;
  top: 16%;
  height: 50px;
  width: 150px;
  flex-direction: row-reverse;
  justify-content: space-around;
  align-items: center;
}

#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  color:skyblue;
  z-index: 1000;
  height: 100px;
  -webkit-transition: height 0.5s;
  -moz-transition: height 0.5s;
  transition: height 0.5s;
  text-align:center;
}

#header h1#logo{
  top: -22px;
  position: absolute;
  left: 31px;
  font-size: 24px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
#header  h1#logo img{
  width: 50px;
  height: 50px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
.topInput{
  color: #111111;
  top: 13%;
  max-width: 50%;
  position: absolute;
  left: 13%;
  height: 35px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}




#header.shrink h1#logo {
  top: -14px;
  position: absolute;
  left: 31px;
  font-size:30px;
  font-weight:normal;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
#header.shrink h1#logo img{
  width: 100px;
  height: 100px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
.shrink .topInput{
  color: #111111;
  top: 13%;
  max-width: 60%;
  position: absolute;
  left: 19%;
  height: 55px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}

:deep(.anticon svg) {
  color: blue;
  display: inline-block;
}

img{
  background-size: cover;
  height: 100%;
  width: 100%;
}


.content {
  /*just to get the page to scroll*/
}

.messageImg{
  width: 20px;
  height: 20px;
  cursor:pointer;
}

.favImg{
  width: 23px;
  height: 23px;
  cursor:pointer;
}

.homeImg{
  width: 20px;
  height: 20px;
  cursor:pointer;
}


.scFont{
  font-size: 10px;
}

.nameClass{
  margin-bottom: 5%;
  font-size: 20px;
}
.priceClass{
  font-size: 18px;
}
.fontWarp{
  position: absolute;
  width: 50%;
  left: 50%;
  top: 50px;
}
.ewm{
  margin-left: 2%;
  width: 200px;
  height: 200px;
}
img{
  width: 80%;
  height: 80%;
}
.orderButton{
  position: absolute;
  top: 85%;
  left: 23%;
}
.ff{
  position: absolute;
  top: 82%;
  left: 85%;
}
.sc{
  cursor: pointer;
  position: absolute;
  top: 82%;
  left: 50%;
  width: 25px;
  height: 25px;
  z-index: 100;
}

.icon-car-count {
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  left: 88%;
  top: 2px;
  background: red;
  color: #fff;
  padding: 0 .5em;
  min-width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  border-radius: 50%;
  transform: scale(.7);
  font-family: tahoma!important;
}


:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-input-group .ant-input){
  height: 100%;
}

:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-input-group){
  height: 100%;
}
:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-input-search .ant-input-search-button){
  height: 100%;
}
:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-input){
  background:transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: black;
}
:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-btn-primary){
  background-color: transparent;
}
</style>
