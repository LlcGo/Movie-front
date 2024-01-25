<template>
  <div class="content">
    <div class="topSearch">
      <div class="warp1">
        <div class="title">
          分类
        </div>
        <ul>
          <!--        <input type="radio"  name="tab" id="qb">-->
          <!--        <input type="radio" name="tab" id="zzp">-->
          <!--        <input type="radio" name="tab" id="qhp">-->
          <!--        <input type="radio" name="tab" id="khp">-->
          <!--        <input type="radio" name="tab" id="jqp">-->
          <!--        <input type="radio" name="tab" id="kbp">-->
          <!--        <input type="radio" name="tab" id="aqp">-->
          <!--        <input type="radio" name="tab" id="dzp">-->
          <!--        <input type="radio" name="tab" id="xjp">-->
          <!--        <input type="radio" name="tab" id="dhp">-->
          <!--        <input type="radio" name="tab" id="xyp">-->
          <!--        <input type="radio" name="tab" id="jlp">-->

<!--          <label @click="setMoveType(11)">-->
<!--            <li style="margin-left: 4.5%">全部</li>-->
<!--          </label>-->
          <li v-for="item in moveTypes"
              @click="setMoveType(item.id)"
              :class="{bg1 : item.id == moveType}"
          >{{ item.typeName }}
          </li>
        </ul>
      </div>

      <div class="warp">
        <div class="title">
          地区
        </div>
        <ul>
          <li v-for="item in moveNations"
              @click="setMoveNation(item.id)"
              :class="{bg1 : item.id == moveNation}"
          >{{ item.nationName }}
          </li>
        </ul>
      </div>

      <div class="warp">
        <div class="title">
          年份
        </div>
        <ul>
          <li v-for="item in movieYears"
              @click="setMoveYear(item.id)"
              :class="{bg1 : item.id == moveYear}"
          >{{ item.yearName }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 查询到的电影 -->
    <div class="warp2">
      <div v-for="movieItem in movieList" class="movieWarp">
        <div class="imgClass">
          <img :src="movieItem.img" @click="toDetail(movieItem)">
        </div>
        <div class="fontBox">
          <div class="imgName" @click="toDetail(movieItem)">
            {{ movieItem.movieName }}
          </div>
          <div v-html="movieItem.actorsName" class="imgAc">
          </div>
        </div>
      </div>
      <div ref="pageClass" class="leftPage">
        <a-pagination v-if="total > 36"
                      v-model:current="current"
                      v-model:pageSize="pageSize"
                      :total="total"
                      @change="search"
                      show-less-items/>
      </div>
      <div style="height: 100px;position: relative"></div>
    </div>

    <a-empty
        v-if="movieList.length == 0"
        style="position: relative;top: -80%"
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
      height: '300px',
    }"
    >
      <template #description>
      <span>
        暂无相关影片
      </span>
      </template>
    </a-empty>


  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {
  Movie,
  MovieControllerService, MovieNation, MovieNationControllerService,
  MovieQueryRequest,
  MovieTyepControllerService,
  MovieType, MovieYear, MovieYearControllerService
} from "../../../../generated";
import {useRoute, useRouter} from "vue-router";

const moveType = ref(0)
const moveNation = ref(0)
const moveYear = ref(0)
const {query} = useRoute();
//当前查到的所有影视
const movieList = ref<Movie>([]);
//page dom元素
const pageClass = ref();
const current = ref(1);
const total = ref();
const pageSize = ref(36)
const router = useRouter();
const moveTypes = ref<Array<MovieType>>()
const moveNations = ref<Array<MovieNation>>()
const movieYears = ref<Array<MovieYear>>()
onMounted(() => {
  getCurrentType();
  getCurrentNation();
  initMovieType();
  initMovieNation();
  initMovieYear();
  console.log('接收到的type', query.type);
  if (query.type != null) {
    search()
    return;
  }
  // setCheck('jlp')
  search()
})

const getCurrentType = () => {
   if(query.type != null){
     moveType.value = Number(query.type)
   }
}

const getCurrentNation = () => {
  if(query.nation != null){
    moveNation.value = Number(query.nation)
  }
}

const initMovieType = async () => {
  const res = await MovieTyepControllerService.getMovieNationUsingGet();
  res.data?.unshift({
    createTime: "2024-01-24 22:09:47",
    id: 0,
    isDelete: 0,
    typeName: "全部",
    updateTime: "2024-01-24 22:09:47"
})
  moveTypes.value = res.data;
  console.log(moveTypes.value)
}

const initMovieNation = async () => {
  const res = await MovieNationControllerService.getMovieTypeUsingGet();

  res.data?.unshift({
    createTime: "2024-01-24 22:09:47",
    id: 0,
    isDelete: 0,
    nationName: "全部",
    updateTime: "2024-01-24 22:09:47"
  })
  moveNations.value = res.data;
  console.log('地区',moveNations.value)
}

const initMovieYear = async () => {
  const res = await MovieYearControllerService.getMovieTypeUsingGet1();
  res.data?.unshift({
    createTime: "2024-01-24 22:09:47",
    id: 0,
    isDelete: 0,
    yearName: "全部",
    updateTime: "2024-01-24 22:09:47"
  })
  movieYears.value = res.data;
  console.log('年',movieYears.value)
}


const toDetail = (movieItem: Movie) => {
  // alert(JSON.stringify(movieItem))
  router.push({
    path: '/layout/detail',
    query: {
      currentMovieId: movieItem.id
    }
  })
}


const setCheck = (type: string) => {
  var seasonNodes = document.getElementById(type);
  console.log(seasonNodes)
  seasonNodes.setAttribute("checked", true)
}
const setMoveType = (type: number) => {
  moveType.value = type;
}

const setMoveNation = (nation: number) => {
  moveNation.value = nation;
}

const setMoveYear = (year: number) => {
  moveYear.value = year;
}

const search = async () => {
  let data: MovieQueryRequest = {
    type: moveType.value,
    nation: moveNation.value,
    year: moveYear.value,
    pageSize: pageSize.value,
    current: current.value
  }
  console.log(data)
  // return;
  const res = await MovieControllerService.listMovieByPageUsingPost(data)
  movieList.value = res.data.records
  if (res.data.records.length < 6) {
    pageClass.value.classList.remove('leftPage')
    pageClass.value.classList.add('page')
  } else {
    pageClass.value.classList.remove('page')
    pageClass.value.classList.add('leftPage')
  }
  total.value = Number(res.data.total)
  console.log(total.value)
}

watch([moveType, moveNation, moveYear], () => {
  search(moveType.value, moveNation.value, moveYear.value)
}, {deep: true})


</script>

<style scoped>
.title {
  top: 10px;
  left: 5px;
  line-height: 40px;
  width: 60px;
  text-align: center;
  position: absolute;
  background: #7f7f8b;
  border-radius: 16px 0 16px 16px;
}

ul li:nth-child(1){margin-left: 4.5%}

ul li {
  position: relative;
  float: left;
  list-style-type: none;
  color: #999;
  line-height: 60px;
  margin-left: 3.5%;
  cursor: pointer;
}

input[type="radio"] {
  -webkit-appearance: none;
}

.warp {
  position: relative;
  height: auto;
  overflow: hidden;
  border-top: 1px solid #f1f1f1;
}

.warp1 {
  position: relative;
  height: auto;
  overflow: hidden;
  border-top: 1px solid #f1f1f1;

}


.content {
  margin-top: 3.5%;
  height: 45vh;
  margin-left: 11%;
  width: 78vw;
}

.topSearch {
  margin-top: 10%;
  background: #f8f8f8
}

.tab {
  top: 10px;
  width: 5.5%;
  position: absolute;
  height: 66%;
  background: linear-gradient(45deg, #fc6076 0%, #ff9a44 100%);
  border-radius: 50px;
  transition: .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  left: 6%;
}

.tab1 {
  top: 10px;
  width: 5.5%;
  position: absolute;
  height: 33%;
  background: linear-gradient(45deg, #fc6076 0%, #ff9a44 100%);
  border-radius: 50px;
  transition: .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  left: 6%;
}

.bg1 {
  transition: .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  text-align: center;
  line-height: 40px;
  height: 40px;
  color: skyblue;
}

#zzp:checked ~ .tab {
  left: 12.5%
}

#qhp:checked ~ .tab {
  left: 19.5%
}

#khp:checked ~ .tab {
  left: 26.5%
}

#jqp:checked ~ .tab {
  left: 33.5%
}

#kbp:checked ~ .tab {
  left: 40.5%
}

#aqp:checked ~ .tab {
  left: 47.8%
}

#dzp:checked ~ .tab {
  left: 54.8%
}

#xjp:checked ~ .tab {
  left: 61.9%
}

#dhp:checked ~ .tab {
  left: 68.9%
}

#xyp:checked ~ .tab {
  left: 76%
}

#jlp:checked ~ .tab {
  left: 83.5%
}


#zg:checked ~ .tab {
  left: 12%
}

#mg:checked ~ .tab {
  left: 17.5%
}

#zgxg:checked ~ .tab {
  left: 25%
}

#hg:checked ~ .tab {
  left: 32%
}

#rb:checked ~ .tab {
  left: 37.8%
}

#fg:checked ~ .tab {
  left: 43.7%
}

#yg:checked ~ .tab {
  left: 49.5%
}

#dg:checked ~ .tab {
  left: 55.4%
}

#tg:checked ~ .tab {
  left: 61%
}

#yd:checked ~ .tab {
  left: 67%
}

#n23:checked ~ .tab1 {
  left: 12%
}

#n22:checked ~ .tab1 {
  left: 18.4%
}

#n21:checked ~ .tab1 {
  left: 24.5%
}

#n20:checked ~ .tab1 {
  left: 31%
}

#n19:checked ~ .tab1 {
  left: 37%
}

#n18:checked ~ .tab1 {
  left: 43.5%
}

#n17:checked ~ .tab1 {
  left: 49.5%
}

#n16:checked ~ .tab1 {
  left: 56%
}

#n15:checked ~ .tab1 {
  left: 62.3%
}

#n14:checked ~ .tab1 {
  left: 68.5%
}

#n13:checked ~ .tab1 {
  left: 75%
}

#n12:checked ~ .tab1 {
  left: 81.3%
}

#n11:checked ~ .tab1 {
  left: 87.3%
}

#n10:checked ~ .tab1 {
  left: 93.7%
}

#n00:checked ~ .tab1 {
  top: 58%;
  left: 5.5%
}

#n90:checked ~ .tab1 {
  top: 58%;
  left: 13%
}

#n80:checked ~ .tab1 {
  top: 58%;
  left: 19.5%
}

.warp2 {
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  position: relative;
  top: 10%;
  height: 100%;
  width: 95%;
  left: 3%;
}

.movieWarp {
  position: relative;
  top: 0;
  width: 16.66%;
  height: 360px;
}

.imgClass {
  padding: 10px;
  width: 100%;
  height: 300px;
}

.fontBox {
  width: 97%;
  padding: 5px;
}

.imgName {
  cursor: pointer;
  margin-top: -1%;
  margin-left: 2.5%;
  font-size: 1.2em;
}

.imgName:hover {
  color: skyblue;
}

.imgAc {
  margin-left: 2%;
  margin-top: 3%;
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #999;
}

img {
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-size: cover;
}

.page {
  position: relative;
  top: 100%;
  left: 25%;
}

.leftPage {
  position: relative;
  top: 10%;
  left: 43%;
}
</style>