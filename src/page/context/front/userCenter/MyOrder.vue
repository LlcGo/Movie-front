<template>
  <a-table :dataSource="orderList" :columns="columns"
           :pagination="false"
           :scroll="{ x: 100, y: 500 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <div class="content">
          <div class="left">
            <div class="leftWarp" v-if="record.movie.id">
              <img :src="record.movie.img">
            </div>
            <div class="leftWarp2" v-if="!record.movie.id">
              <img :src="orderVip">
            </div>
          </div>
          <div class="right">
            <div class="rightWarp">
              <div class="movieNameFont" v-if="record.movie.id">
                电影：{{record.movie.movieName}}
              </div>
              <div class="font" v-if="record.movie.id">
                价格:${{record.movie.price}}
              </div>
              <div class="movieNameFont" v-if="!record.movie.id">
                会员：{{getVip(record.vipType)}}
              </div>
              <div class="font" v-if="!record.movie.id">
                价格:${{getPrice(record.vipType)}}
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="column.key === 'action'">
        <div class="button" v-if="record.orderState == 0">
<!--          {{record.end}}自动取消订单-->
<!--          {{countdown}}-->
          <count-down class="countClass" :order="record" @setOrderState="setState"/>
          <a-button @click="toBuy(record)">购买</a-button>
          <a-button>取消订单</a-button>
        </div>
        <div  v-if="record.orderState == 1">
          <a-tag  color="blue">已购买</a-tag>
        </div>
        <div  v-if="record.orderState == 2">
          <a-tag  color="orange">已取消</a-tag>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {
  Movie, Order, OrderByRequest,
  OrderControllerService
} from "../../../../../generated";
import xtf from '../../../../assets/xtf.jpg'
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
import orderVip from '../../../../assets/Ordervip.png'
import getPrice from "../../../typeEnum/getPrice.ts";
import getVip from "../../../typeEnum/getVip.ts";
import getVipType from "../../../typeEnum/getVipType.ts";
import dayjs from "dayjs";
import Demo from "../../../demo/CountDown.vue";
import CountDown from "../../../demo/CountDown.vue";
const current = ref(1);
const pageSize = ref(6);
const total = ref();
const orderList = ref<Order>()
const router = useRouter();
const countdown = ref();
const columns = [
  {
    title: '订单信息',
    dataIndex: 'name',
    width: 700,
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    key: 'action',
  },
]
onMounted(() => {
  getMyOrder();
  // resTime()
})

// const resTime = () => {
//   let interval = setInterval(() => {
//     let orderTime = res.createTime
//     let setTime = new Date(orderTime)
//     let nowTime = new Date()
//     let restTime = nowTime.getTime() - setTime.getTime()
//     // let hour =  parseInt(restTime/(60*60*1000) % 60)
//     let minu = parseInt(restTime / (60 * 1000) % 60)
//     let second = parseInt(restTime / 1000 % 60)
//     let realmin = 15 - minu
//     let realsecond = 60 - second
//     let obj = {
//       min: that.timeFormat(realmin),
//       second: that.timeFormat(realsecond),
//     }
//     countdown.value = '00:' + obj.min + ':' + obj.second
//   }, 1000)
//
// }

const setState =(record:Order) =>{
   record.orderState = 2
}

//获取自己的订单信息
const getMyOrder = async () => {
   const res = await OrderControllerService.getOrderByUserIdUsingGet()
   console.log(res);
   res.data?.forEach(item => {
     if(item.orderState == 0) {
       let curTime = dayjs(item.createTime).toDate()
       curTime.setMinutes(curTime.getMinutes() + 15)
       item.end = curTime.valueOf();
       console.log(item.end)
     }
   })
   orderList.value = res.data;
}

//购买电影
const toBuy = async (order:Order) => {
  console.log(order)
  let data :OrderByRequest = null;
  if(order.state == 0){
    data = {
      date: getVipType(order.vipType),
      orderId: order.id,
      state: order.state,
      userId:order.userId
    }
  }else {
     data = {
      movieId: order.movie?.id,
      orderId: order.id,
      state: order.state,
      userId: order.userId,
    }
  }
  console.log(data)
  // return;
  // let data : OrderByRequest = {
  //   date?: string;
  //   movieId?: number;
  //   orderId?: number;
  //   state?: number;
  //   userId?: string;
  // }
  const res = await OrderControllerService.orderBuyUsingPost(data);
  console.log(res);
}


</script>


<style scoped>

.leftWarp{
  width: 130px;
  height: 180px;
}
.leftWarp2{
  position: absolute;
  top: 20%;
  width: 130px;
  height: 130px;
}
img{
  width: 100%;
  height: 100%;
  background-size: cover;
}
.movieNameFont{
  font-size: 18px;
}
.font{
  margin-top: 9%;
}
.rightWarp{
  position: absolute;
  top: 35%;
}
.left{
  padding: 10px 10px 0px 30px;
  position: relative;
  float: left;
  width: 50%;
  height: 100%;
}
.right{
  position: relative;
  float: right;
  width: 50%;
  height: 100%;
}
.content{
  position: relative;

  height: 200px;
  width: 360px;
}
.button {
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-around;
}
.countClass{
  position: absolute;
  left: -140%;
}
</style>