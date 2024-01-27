<template>
  <a-table :dataSource="PurchasedVOList" :columns="columns"
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
                演员:{{record.movie.actorsName}}
              </div>
              <div class="font">
                导演:{{record.movie.directorName}}
              </div>
            </div>
            </div>
          </div>
      </template>
      <template v-if="column.key === 'action'">
        <div class="button">
          <a-button @click="toWatch(record.movie)">立即播放</a-button>
          <a-button @click="toDetail(record.movie)">查看详情</a-button>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {Movie, MovieControllerService, Purchased, PurchasedControllerService} from "../../../../../generated";
import {useRouter} from "vue-router";
const router = useRouter();
const PurchasedVOList = ref<Array<Purchased>>();
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
onMounted(()=>{
  getMyMovie();
})
const getMyMovie = async () => {
   const res = await PurchasedControllerService.getMyPurchasedUsingPost()
   PurchasedVOList.value = res.data;
   console.log(PurchasedVOList.value)
}

const toDetail = (movieItem:Movie) => {
  // alert(movieItem.id)
  router.push({
    path:'/layout/detail',
    query: {
      currentMovieId:movieItem.id
    }
  })
}

const toWatch = (movie:any) => {
  MovieControllerService.addHotUsingPost(movie.id);
  router.push({
    path: '/layout/detail/watch',
    query:{
      currentMovieId: movie.id
    }
  })
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