
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
        <img class="messageImg" :src="emessage">
        <div class="scFont">信息</div>
      </div>
      <div>
        <img class="favImg" :src="fav">
        <div class="scFont">收藏</div>
      </div>
      <div>
        <img class="homeImg" @click="toHome" :src="home">
        <div class="scFont" @click="toHome">主页</div>
      </div>
      <div>
        <img class="homeImg" :src="vip">
        <div class="scFont">vip充值</div>
      </div>
    </div>
<!--用户头像以及下拉框-->
    <div class="userContent" v-if="currentUser">
      <div class="userName">
        {{currentUser.username}}
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
              <a href="javascript:;">个人中心</a>
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
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import home from '../assets/home.png'
import {MenuProps, message} from "ant-design-vue";
import ava from '../assets/empty.png'
import {UserControllerService, Users} from "../../generated";
import login from '../assets/qLogin.png'
import vip from '../assets/vip.png'

const currentUser = ref<Users>();
const router = useRouter();
const value = ref();

onMounted(()=>{
  getUser();
})


const getUser = async () => {
  const res = await UserControllerService.getLoginUserUsingGet()
  if(!res.data){
    currentUser.value = null;
    console.log(currentUser.value)
    return;
  }
  currentUser.value = res.data;
  console.log(currentUser.value)
}

//退出
const loginOut = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  console.log(res)
}
const toHome = () => {
  router.push({
    path:'/layout'
  })
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
  color: #111111;
  width: 30%;
  text-overflow: ellipsis;
  overflow:hidden;
}
.userContent{
  color: #111111;
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: #80b9f2;
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
  background: rebeccapurple;
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
