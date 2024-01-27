
<template>
  <div class="top">
  </div>
  <div class="topDetail">
    <div class="title">
      <div class="title1">{{ currentMovie?.movieName }}</div>
      <div class="title2">
        {{currentMovie?.score > 0 ? Math.floor(currentMovie?.score /2) + ".0" : 0}}
        <a-rate class="rate" :value="currentMovie?.score > 0 ? Math.floor(currentMovie?.score /2 ) : 0" disabled />
      </div>

    </div>
    <img class="img" :src="img"/>
    <div class="xx">
      <a-space>
        <template #split>
          <a-divider type="vertical" />
        </template>
        <div style="font-size: 16px">年份:<p style="display: inline" >
          {{getYear(currentMovie?.year) }}
        </p></div>
        <div style="font-size: 16px">地区:<p style="display: inline" >
          {{ getMovieNation(currentMovie?.nation) }}
        </p></div>
        <div style="font-size: 16px">类型:<p style="display: inline" >
          {{ currentMovie?.movieType?.typeName }}
        </p></div>
      </a-space>
      <div class="state">
        状态:
        <div class="xsjl">
          {{getMovieState(currentMovie?.state)}}
        </div>

      </div>
      <div class="actor" v-html=" '主演：'+ currentMovie?.actorsName"></div>
      <div class="dy">
        导演:
        <div class="xsjl">
          {{ currentMovie?.directorName }}
        </div>

      </div>
<!--            <div class="jj">简介:{{ currentMovie?.movieProfile }}</div>-->
     <div class="warp2">
       <a-button   type="primary" @click="toWatch">立即播放</a-button>

       <a-button   type="primary" v-if="!isSc" @click="toFavour">我要收藏</a-button>
       <a-button   type="primary"  v-if="isSc" @click="toFavour">已收藏</a-button>
       <a-button  type="primary" v-if="currentMovie?.state===3 && !currentMovie?.buy"  @click="showModal">购买正片</a-button>
       <a-button  type="primary" v-if="currentMovie?.state===3 && currentMovie?.buy"  @click="showModal" disabled>已购买</a-button>
     </div>

    </div>
  </div>
  <div>
    <a-modal v-model:open="open"
             @ok="nowBuy"
             width="400px"
             cancelText="取消"
             okText="购买">
<div class="fontWarp">
  <div class="nameClass">
    {{currentMovie.movieName}}
  </div>
  <div class="priceClass">
    价格：${{currentMovie.price}}
  </div>
</div>
      <div class="orderButton">
        <a-button @click="addOrder">提交订单稍后购买</a-button>
      </div>
      <div class="ewm">
        <img :src="m"/>
      </div>
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move" >购买</div>
      </template>
    </a-modal>
  </div>
</template>


<script setup lang="ts">
import wsc from '../../../assets/sc.png'
import img from "../../../assets/xtf.jpg";
import getYear from "../../typeEnum/Year.ts";
import getMovieNation from "../../typeEnum/MovieNation.ts";
import getMoveType from "../../typeEnum/MovieType.ts";
import getMovieState from "../../typeEnum/MovieState.ts";
import {useRoute, useRouter} from "vue-router";
import {
  FavoritesAddRequest,
  FavoritesControllerService,
  Movie,
  MovieControllerService,
  OrderAddRequest, OrderByRequest, OrderControllerService
} from "../../../../generated";
import {onMounted, ref, watch} from "vue";
import {message} from "ant-design-vue";
import m from '../../../assets/erweima.png'

const currentUser = ref(JSON.parse(sessionStorage.getItem("user")))
const router = useRouter();
const isSc = ref(false)
const currentMovie = ref<Movie>();
const route = useRoute();
const {query} = useRoute();


const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};

//提交订单
const addOrder = async () => {
  if(currentUser.value == null){
    message.warn('请先登录');
    return
  }
  //电影下单 1
   let data:OrderAddRequest = {
     movieId:currentMovie.value.id,
     state: 1,
   }
   console.log(data);
   const res = await OrderControllerService.addOrderUsingPost(data)
   console.log(res);
   if(res.data){
     message.success('订单已提交成功,15分钟后未下单自动取消')
   }else {
     message.warn('订单已经存在,跳转至订单页面')
     router.push({
       path:'/layout/account/myOrder'
     })
   }
}

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

//现在购买
const nowBuy = async () => {
  if(currentUser.value == null){
    message.warn('请先登录');
    return
  }
  // alert(1)
  let data : OrderByRequest = {
    movieId: currentMovie.value.id,
    state : 1,
  }
  const res = await OrderControllerService.toBuyUsingPost(data);
  if(res.data){
    message.success('购买成功,可在我个人中心查看')
    open.value=false;
  }
}
//收藏
const toFavour = async () => {
  console.log(currentUser.value)
  if(currentUser.value == null){
    message.warn('请先登录');
    return
  }
  let data :FavoritesAddRequest = {
    movieId: Number(query.currentMovieId)
  }
  const res = await FavoritesControllerService.addFavoritesUsingPost(data)
  if(res.data === -1){
    message.success('已经取消收藏')
    isSc.value = false;
  }else {
    message.success('收藏成功')
    isSc.value = true;
  }
}

const toWatch =  () => {
  MovieControllerService.addHotUsingPost(currentMovie.value.id);
  router.push({
    path: '/layout/detail/watch',
    query:{
      currentMovieId: currentMovie.value.id
    }
  })
}

watch(route,()=>{
  getMovieDetail(route.query.currentMovieId)
},{deep:true})

onMounted(()=>{
  console.log('当前的----------------->',query.currentMovieId)
  getMovieDetail(query.currentMovieId)
})


const getMovieDetail = async (id:any) => {
     const res = await MovieControllerService.getMovieByIdUsingGet(id)
     currentMovie.value = res.data;
     console.log('返回信息',res)
     isSc.value = res.data.favorite;
     console.log(currentMovie.value)
}


</script>

<style scoped>
.warp2{
  position: relative;
  top: 20px;
  display: flex;
  width: 350px;
  left: -7%;
  justify-content: space-evenly;
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
  width: 40%;
  left: 60%;
  top: 35%;
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
  top: 84%;
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

img{
  width: 100%;
  height: 100%;
}
.xsjl{
  display: inline;
  margin-left: 1%;
}
.rate{
  position: relative;
  left: 15%;
}
.title1{
  font-size: 20px;
  font-weight: 600;
}
.title2{
  margin-top: 10%;
}
.title{
  position: absolute;
  left: 25.5%;
  top: -40%;
}


.top{
  width: 100%;
  height: 220px;
  background-image: url("../../../assets/deimg.png");
}
.topDetail{
  height: 220px;
  width: 100%;
  position: relative;
  background: #f8f8f8;
}
.img{
  position: absolute;
  height: 319px;
  width: 220px;
  top: -50%;
  left: 11%;
  border-radius: 6px
}
.xx{
  font-size: 16px;
  position: absolute;
  left: 25.5%;
  top: 6%;
}
.state{
  margin-top: 5%;
}
.actor{
  margin-top: 5%;
}
.dy{
  margin-top: 5%;
}

:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-modal .ant-modal-content) {
  position: relative;
  background-color: #ffffff;
  background-clip: padding-box;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  pointer-events: auto;
  padding: 20px 24px;
  height: 500px !important;
}

:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-modal .ant-modal-body) {
  font-size: 14px;
  line-height: 1.5714285714285714;
  word-wrap: break-word;
  height: 500px !important;
}
:deep(.ant-modal-content){
  height: 500px !important;
}
</style>