
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
import {message} from "ant-design-vue";
const router = useRouter();
const value = ref();

onMounted(()=>{
})

const toHome = () => {
  router.push({
    path:'/layout'
  })
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
.imgContent{
  display: flex;
  position: absolute;
  right: 8%;
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
