<template>
  <a-table :dataSource="orderList" :columns="columns"
           :pagination="false"
           :scroll="{ x: 100, y: 500 }">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <div class="content">
          <div class="left">
            <div class="leftWarp">
              <img :src="record.movie.img">
            </div>
          </div>
          <div class="right">
            <div class="rightWarp">
              <div class="movieNameFont">
                电影：{{record.movie.movieName}}
              </div>
              <div class="font">
                价格:${{record.movie.price}}
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="column.key === 'action'">
        <div class="button" v-if="record.orderState !==1">
          <a-button @click="toBuy(record)">购买</a-button>
          <a-button>取消订单</a-button>
        </div>
        <div  v-else>
          <a-tag  color="blue">已购买</a-tag>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {
  Movie, Order, OrderByRequest,
  OrderControllerService, OrderVO
} from "../../../../../generated";
import xtf from '../../../../assets/xtf.jpg'
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
const current = ref(1);
const pageSize = ref(6);
const total = ref();
const orderList = ref<OrderVO>()
const router = useRouter();
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
})

//获取自己的订单信息
const getMyOrder = async () => {
   const res = await OrderControllerService.getOrderByUserIdUsingGet()
   console.log(res);
   orderList.value = res.data;
}

//购买电影
const toBuy = async (order:OrderVO) => {
  console.log(order)
  let data :OrderByRequest = null;
  if(order.state == 0){
    alert(0)
  }else {
     data = {
      movieId: order.movie?.id,
      orderId: order.id,
      state: order.state,
      userId: order.userId,
    }
  }
  console.log(data)
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
</style>