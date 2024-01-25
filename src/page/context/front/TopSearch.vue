
<template>
<div class="content">
   <div class="left">
     <div class="top">
       <div class="topContent">
         <div class="title">搜索到与"</div>
         <div class="title1">{{moveName}}</div>
         <div class="title">"相关的</div>
         <div class="title1">{{total}}</div>
         <div class="title">条结果</div>
       </div>

     </div>
     <div style="height: 50px"></div>
     <div class="movieContext" v-for="movie in moveList">
       <div class="movieWarp">
          <div class="imgDetail">
             <img :src="movie.img">
          </div>
          <div class="titleDetail">
            <div class="movieName" @click="toDetail(movie)">{{movie.movieName}}</div>
            <div class="ct">主演: {{movie.actorsName}}</div>
            <div class="ct">导演: {{movie.directorName}}</div>
            <div class="ct">简介: {{movie.movieProfile}}</div>
            <div class="cb" @click="toDetail(movie)">查看详情</div>
          </div>
       </div>
     </div>
     <div style="height: 100px;
               margin-top: 2%;">
       <a-pagination v-if="total > 6"
                     v-model:current="current"
                     v-model:pageSize="pageSize"
                     :total="total"
                     @change="search"
                     show-less-items />
     </div>

     <a-empty
         v-if="moveList.length == 0"
         :image="zw"
         :image-style="{
      height: '100px',
    }"
     >
       <template #description>
      <span>
        暂无相关影视
      </span>
       </template>
     </a-empty>


   </div>
   <div class="right">
     <div class="topHot">
        热播电影
     </div>
     <div style="height: 50px; border-bottom: 1px solid #f8f8f8;"></div>

     <div class="hotContext" >
       <div class="mt"> </div>
       <div class="t part_num1 ">1</div>
       <div class="hotTitle" @click="toDetail(hotMovies[0])">
         {{ hotMovies[0]?.movieName }}
       </div>
       <div class="info_right" @click="toSearchByNation(hotMovies[0]?.movieNation?.id)" >{{ hotMovies[0]?.movieNation.nationName }}</div>
     </div>


     <div class="hotContext">
       <div class="mt"> </div>
       <div class="t part_num2 ">2</div>
       <div class="hotTitle" @click="toDetail(hotMovies[1])">
         {{ hotMovies[1]?.movieName }}
       </div>
       <div class="info_right" @click="toSearchByNation(hotMovies[1]?.movieNation?.id)" >{{ hotMovies[1]?.movieNation.nationName }}</div>
     </div>

     <div class="hotContext">
       <div class="mt"> </div>
       <div class="t part_num3 ">3</div>
       <div class="hotTitle" @click="toDetail(hotMovies[2])">
         {{ hotMovies[2]?.movieName }}
       </div>
       <div class="info_right" @click="toSearchByNation(hotMovies[2]?.movieNation?.id)">
         {{ hotMovies[2]?.movieNation.nationName }}
       </div>
     </div>

     <div class="hotContext" v-for="(hotMovie,index) in afterMovie"  >
       <div >
         <div class="mt">
         </div>
         <div class="t part_num" >{{ index + 4 }}</div>
         <div class="hotTitle" @click="toDetail(hotMovie)">
           {{ hotMovie?.movieName }}
         </div>
         <div class="info_right" @click="toSearchByNation(hotMovie?.movieNation?.id)">{{hotMovie?.movieNation.nationName}}</div>
       </div>
     </div>

   </div>
</div>
</template>

<script setup lang="ts">
import xtf from '../../../assets/xtf.jpg'
import zw from '../../../assets/zw.png'
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {Movie, MovieControllerService, MovieQueryRequest} from "../../../../generated";

const moveList = ref<Array<Movie>>([]);
const total = ref();
const current = ref(1);
const pageSize = ref(6);
const moveName = ref<string>()
const route = useRoute();
const router = useRouter();
const hotMovies = ref<Array<Movie>>([])
const afterMovie = ref<Array<Movie>>([])

onMounted(()=>{
  moveName.value = route.query.moveName
  search();
  getHot();
})

const getHot = async () => {
  const res = await MovieControllerService.getHotMovieUsingGet()
  afterMovie.value = [];
  hotMovies.value = res.data;
  hotMovies.value.forEach((item,index) => {
     if(index > 2){
       afterMovie.value.push(item);
     }
  })
}

const toSearchByNation = (nationId:number) => {
  router.push({
    path:'/layout/search',
    query:{
      nation: nationId
    }
  })
}

watch(route,()=>{
  moveName.value = route.query.moveName
  search()
},{deep:true})

const toDetail = (movieItem:Movie) => {
  // alert(movieItem.id)
  router.push({
    path:'/layout/detail',
    query: {
      currentMovieId:movieItem.id
    }
  })
}

const search = async () => {
  let data : MovieQueryRequest = {
    movieName:moveName.value,
    current:current.value,
    pageSize:pageSize.value
  }
    const res = await MovieControllerService.listMovieByPageUsingPost(data);

    total.value = res.data.total
    moveList.value = res.data.records
  console.log('获得的数据',moveList.value)
}

</script>

<style scoped>
.content{
  position: relative;
  top: 130px;
  height: 45vh;
  margin-left: 11%;
  width: 78vw;
}

.part_num1 {
  background-color: #ff0d29!important;
}

.part_num2 {
  background-color: #ff920b!important;
}

.part_num3 {
  background-color: #ffc600!important;
}

.hotTitle{
  cursor: pointer;
  position: absolute;
  left: 8%;
}
.hotTitle:hover{
  color: skyblue;
}
.mt{
  height: 10px;
}
.topHot{
  position: absolute;
  top: 3%;
  font-size: 18px;

}
.cb{
  cursor: pointer;
  margin-top: 3.5%;
}
.cb:hover{
  color: skyblue;
}
.ct{
  margin-top: 1%;
  color: #666;
  overflow: hidden;
  pointer-events: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.movieName{
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 1%;
}
.movieName:hover{
  color: skyblue;
}
.titleDetail{
  position: absolute;
  width: 80%;
  left: 18%;
  top: 15%;
}
.imgDetail{
  position: absolute;
  top: 3%;
  height: 200px;
  width: 143px;
}
img{
  border-radius: 5px;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.movieWarp{
  position: relative;
  height: 216px;
}
.movieContext{
  border-top: 1px solid #f8f8f8;
  width: 95%;
}
.info_right {
  position: absolute;
  top: 25%;
  right: 0;
  font-size: 1rem;
  color: #999;
  cursor: pointer;
}

.info_right:hover{
  color: skyblue;
}
.topContent{
  position: absolute;
  top: 3%;
  font-size: 18px;
}
.title{
  display: inline;
}
.title1{
  display: inline;
  color: skyblue;
}
.hotContext{
  position: relative;
  height: 40px;
  color: #111;
  font-size: 18px;
}

.t{
  position: relative;
  float: left;
  top: 2px;
  font-size: 0.5rem;
  border-radius: 4px 0 4px 4px;
  line-height: 1rem;
  margin-right: 0.25rem;
  color: #fff;
  text-align: center;
  background-color: #999;
  width: 1.2rem;
  height: 1.2rem;
}

.left{
  float: left;
  height: 50px;
  width: 70%;
}
.right{
  float: left;

  width: 30%;
  height: 50px;
}
</style>