
<template>
  <div id="header" class="shrink">
    <h1 id="logo">
      <img :src="logo">
      罗罗影视
    </h1>

    <a-input-search
        class="topInput"
        v-model:value="value"
        placeholder="根据影片名搜索影片"
        enter-button
        @search="onSearch"
    />

    <img class="messageImg" :src="message">
    <div class="xxFont">信息</div>
    <img class="favImg" :src="fav">
    <div class="scFont">收藏</div>
  </div>
  <div class="content">
  </div>
</template>

<script setup lang="ts">
import logo from "../assets/logo.png";
import message from '../assets/message.png'
import fav from '../assets/favour.png'
import {ref} from "vue";

const value = ref();

function resizeHeaderOnScroll() {
  const scroll = getCurrentScroll(),
      shrinkOn = 200,
      headerEl = document.getElementById('header');
  if (scroll > shrinkOn) {
    headerEl.classList.add('shrink');
  } else {
    headerEl.classList.remove('shrink');
  }
}
function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

window.addEventListener('scroll', resizeHeaderOnScroll);

</script>

<style scoped >
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
  color:black;
  z-index: 1000;
  height: 100px;
  //overflow: hidden;
  -webkit-transition: height 0.3s;
  -moz-transition: height 0.3s;
  transition: height 0.3s;
  text-align:center;
  line-height:100px;
}

#header h1#logo{
  top: -14px;
  position: absolute;
  left: 31px;
  font-size:30px;
  font-weight:normal;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}
#header  h1#logo img{
  width: 100px;
  height: 100px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

.topInput{
  top: 13%;
  max-width: 60%;
  position: absolute;
  left: 19%;
  height: 55px;
  transition: all 0.3s;
}






.shrink .topInput{
  top: 13%;
  max-width: 50%;
  position: absolute;
  left: 13%;
  height: 35px;
}

#header.shrink h1#logo img{
  width: 50px;
  height: 50px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}

#header.shrink h1#logo {
  top: -22px;
  position: absolute;
  left: 31px;
  font-size: 24px;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}


.content {
  height:2000px;
  /*just to get the page to scroll*/
}

.messageImg{
  width: 31px;
  position: absolute;
  height: 31px;
  left: 82%;
  top: 15.5%;
}

.favImg{
  width: 38px;
  position: absolute;
  height: 38px;
  left: 87%;
  top: 10%;
}

.xxFont{
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  left: 82.1%;
  top: 11%;
}
.scFont{
  position: absolute;
  font-weight: 700;
  font-size: 14px;
  left: 87.3%;
  top: 10%;
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
</style>
