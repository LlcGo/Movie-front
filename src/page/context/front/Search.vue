
<template>
<div class="content">
  <div class="topSearch">
    <div class="warp">
      <div class="title">
        分类
      </div>
      <ul>
        <input type="radio"  name="tab" id="qb">
        <input type="radio" name="tab" id="zzp">
        <input type="radio" name="tab" id="qhp">
        <input type="radio" name="tab" id="khp">
        <input type="radio" name="tab" id="jqp">
        <input type="radio" name="tab" id="kbp">
        <input type="radio" name="tab" id="aqp">
        <input type="radio" name="tab" id="dzp">
        <input type="radio" name="tab" id="xjp">
        <input type="radio" name="tab" id="dhp">
        <input type="radio" name="tab" id="xyp">
        <input type="radio" name="tab" id="jlp">
        <div class="tab"></div>
        <label for="qb" @click="setMoveType(11)"><li style="margin-left: 4.5%">全部</li></label>
        <label for="zzp" @click="setMoveType(0)"><li>战争片</li></label>
        <label for="qhp" @click="setMoveType(1)"><li>奇幻片</li></label>
        <label for="khp" @click="setMoveType(2)"><li>科幻片</li></label>
        <label for="jqp" @click="setMoveType(3)"><li>剧情片</li></label>
        <label for="kbp" @click="setMoveType(4)"><li>恐怖片</li></label>
        <label for="aqp" @click="setMoveType(5)"><li>爱情片</li></label>
        <label for="dzp" @click="setMoveType(6)"><li>动作片</li></label>
        <label for="xjp" @click="setMoveType(7)"><li>喜剧片</li></label>
        <label for="dhp" @click="setMoveType(8)"><li>动画片</li></label>
        <label for="xyp" @click="setMoveType(9)"><li>悬疑片</li></label>
       <label for="jlp" @click="setMoveType(10)"><li>纪录片</li></label>
      </ul>
    </div>

    <div class="warp">
      <div class="title">
        地区
      </div>
      <ul>
        <input type="radio" name="tab1" id="all">
        <input type="radio" name="tab1" id="zg">
        <input type="radio" name="tab1" id="mg">
        <input type="radio" name="tab1" id="zgxg">
        <input type="radio" name="tab1" id="hg">
        <input type="radio" name="tab1" id="rb">
        <input type="radio" name="tab1" id="fg">
        <input type="radio" name="tab1" id="yg">
        <input type="radio" name="tab1" id="dg">
        <input type="radio" name="tab1" id="tg">
        <input type="radio" name="tab1" id="yd">
        <div class="tab"></div>
        <label for="all" @click="setMoveNation(10)"><li style="margin-left: 4.5%" >全部</li></label>
        <label for="zg" @click="setMoveNation(0)"><li >中国</li></label>
        <label for="mg" @click="setMoveNation(1)"><li >美国</li></label>
        <label for="zgxg" @click="setMoveNation(2)"><li >中国香港</li></label>
        <label for="hg" @click="setMoveNation(3)"><li >韩国</li></label>
        <label for="rb" @click="setMoveNation(4)"><li >日本</li></label>
        <label for="fg" @click="setMoveNation(5)"><li >法国</li></label>
        <label for="yg" @click="setMoveNation(6)"><li >英国</li></label>
        <label for="dg" @click="setMoveNation(7)"><li >德国</li></label>
        <label for="tg" @click="setMoveNation(8)"><li >泰国</li></label>
        <label for="yd" @click="setMoveNation(9)"><li >印度</li></label>
      </ul>
    </div>

    <div class="warp">
      <div class="title">
      年份
      </div>
      <ul>
        <input type="radio" name="tab2" id="all2">
        <input type="radio" name="tab2" id="n23">
        <input type="radio" name="tab2" id="n22">
        <input type="radio" name="tab2" id="n21">
        <input type="radio" name="tab2" id="n20">
        <input type="radio" name="tab2" id="n19">
        <input type="radio" name="tab2" id="n18">
        <input type="radio" name="tab2" id="n17">
        <input type="radio" name="tab2" id="n16">
        <input type="radio" name="tab2" id="n15">
        <input type="radio" name="tab2" id="n14">
        <input type="radio" name="tab2" id="n13">
        <input type="radio" name="tab2" id="n12">
        <input type="radio" name="tab2" id="n11">
        <input type="radio" name="tab2" id="n10">
        <input type="radio" name="tab2" id="n00">
        <input type="radio" name="tab2" id="n90">
        <input type="radio" name="tab2" id="n80">
        <div class="tab1"></div>
        <label for="all2" @click="setMoveYear('17')" ><li style="margin-left: 4.5%">全部</li></label>
        <label for="n23" @click="setMoveYear('0')"><li>2023</li></label>
        <label for="n22" @click="setMoveYear('1')"><li>2022</li></label>
        <label for="n21" @click="setMoveYear('2')"><li>2021</li></label>
        <label for="n20" @click="setMoveYear('3')"><li>2020</li></label>
        <label for="n19" @click="setMoveYear('4')"><li>2019</li></label>
        <label for="n18" @click="setMoveYear('5')"><li>2018</li></label>
        <label for="n17" @click="setMoveYear('6')"><li>2017</li></label>
        <label for="n16" @click="setMoveYear('7')"><li>2016</li></label>
        <label for="n15" @click="setMoveYear('8')"><li>2015</li></label>
        <label for="n14" @click="setMoveYear('9')"><li>2014</li></label>
        <label for="n13" @click="setMoveYear('10')"><li>2013</li></label>
        <label for="n12" @click="setMoveYear('11')"><li>2012</li></label>
        <label for="n11" @click="setMoveYear('12')"><li>2011</li></label>
        <label for="n10" @click="setMoveYear('13')"><li>2010</li></label>
        <label for="n00" @click="setMoveYear('14')"><li>00年代</li></label>
        <label for="n90" @click="setMoveYear('15')"><li>90年代</li></label>
        <label for="n80" @click="setMoveYear('16')"><li>更早</li></label>
      </ul>
    </div>
  </div>

<!-- 查询到的电影 -->
  <div class="warp2">
    <div v-for="movieItem in movieList" class="movieWarp">
      <div class="imgClass" >
        <img :src="movieItem.img" @click="toDetail(movieItem)">
      </div>
      <div class="fontBox">
        <div class="imgName" @click="toDetail(movieItem)">
          {{movieItem.movieName}}
        </div>
        <div v-html="movieItem.actorsName" class="imgAc">
        </div>
      </div>
    </div>
    <div ref="pageClass" class="leftPage" >
      <a-pagination v-if="total > 36"
                    v-model:current="current"
                    v-model:pageSize="pageSize"
                    :total="total"
                    @change="search"
                    show-less-items />
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
import {Movie, MovieControllerService, MovieQueryRequest} from "../../../../generated";
import {useRoute, useRouter} from "vue-router";
const moveType = ref(11)
const moveNation = ref(10)
const moveYear = ref('17')
const {query} = useRoute();
//当前查到的所有影视
const movieList = ref<Movie>([]);
//page dom元素
const pageClass = ref();
const current = ref(1);
const total = ref();
const pageSize = ref(36)
const router = useRouter();

onMounted(()=>{
  console.log('接收到的type',query.type);
  if(query.type!=null){
    search()
    return;
  }
  // setCheck('jlp')
  search()
})


const toDetail = (movieItem:Movie) => {
  // alert(JSON.stringify(movieItem))
  router.push({
    path:'/layout/detail',
    query: {
      currentMovieId: movieItem.id
    }
  })
}


const setCheck = (type:string) => {
  var seasonNodes = document.getElementById(type);
  console.log(seasonNodes)
  seasonNodes.setAttribute("checked",true)
}
const setMoveType = (type:number) => {
   moveType.value = type;
}

const setMoveNation = (nation:number) => {
  moveNation.value = nation;
}

const setMoveYear = (year:string) => {
  moveYear.value = year;
}

const search = async () => {
   let data : MovieQueryRequest= {
     type:moveType.value,
     nation:moveNation.value,
     year:moveYear.value,
     pageSize : pageSize.value,
     current:current.value
   }
   console.log(data)
  // return;
   const res = await MovieControllerService.listMovieByPageUsingPost(data)
   movieList.value = res.data.records
  if(res.data.records.length < 6){
    pageClass.value.classList.remove('leftPage')
    pageClass.value.classList.add('page')
  }else {
    pageClass.value.classList.remove('page')
    pageClass.value.classList.add('leftPage')
  }
  total.value = Number(res.data.total)
  console.log(total.value)
}

watch([moveType,moveNation,moveYear],()=>{
  search(moveType.value,moveNation.value,moveYear.value)
},{deep : true})



</script>

<style scoped>
.title{
  top: 10px;
  left: 5px;
  line-height: 40px;
  width: 60px;
  text-align: center;
  position: absolute;
  background: #7f7f8b;
  border-radius: 16px 0 16px 16px;
}
ul li{
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

.warp{
  position: relative;
  height: auto;
  overflow: hidden;
  border-top: 1px solid #f1f1f1;
}


.content{
  margin-top: 3.5%;
  height: 45vh;
  margin-left: 11%;
  width: 78vw;
}
.topSearch{
  margin-top: 10%;
  background:  #f8f8f8
}
.tab{
  top: 10px;
  width: 5.5%;
  position: absolute;
  height: 66%;
  background: linear-gradient(45deg,#fc6076 0%,#ff9a44 100%);
  border-radius: 50px;
  transition: .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  left: 6%;
}

.tab1{
  top: 10px;
  width: 5.5%;
  position: absolute;
  height: 33%;
  background: linear-gradient(45deg,#fc6076 0%,#ff9a44 100%);
  border-radius: 50px;
  transition: .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  left: 6%;
}
#zzp:checked ~ .tab{left: 12.5%}
#qhp:checked ~ .tab{left: 19.5%}
#khp:checked ~ .tab{left: 26.5%}
#jqp:checked ~ .tab{left: 33.5%}
#kbp:checked ~ .tab{left: 40.5%}
#aqp:checked ~ .tab{left: 47.8%}
#dzp:checked ~ .tab{left: 54.8%}
#xjp:checked ~ .tab{left: 61.9%}
#dhp:checked ~ .tab{left: 68.9%}
#xyp:checked ~ .tab{left: 76%}
#jlp:checked ~ .tab{left: 83.5%}


#zg:checked ~ .tab{left: 12%}
#mg:checked ~ .tab{left: 17.5%}
#zgxg:checked ~ .tab{left: 25%}
#hg:checked ~ .tab{left: 32%}
#rb:checked ~ .tab{left: 37.8%}
#fg:checked ~ .tab{left: 43.7%}
#yg:checked ~ .tab{left: 49.5%}
#dg:checked ~ .tab{left: 55.4%}
#tg:checked ~ .tab{left: 61%}
#yd:checked ~ .tab{left: 67%}

#n23:checked ~ .tab1{left: 12%}
#n22:checked ~ .tab1{left: 18.4%}
#n21:checked ~ .tab1{left: 24.5%}
#n20:checked ~ .tab1{left: 31%}
#n19:checked ~ .tab1{left: 37%}
#n18:checked ~ .tab1{left: 43.5%}
#n17:checked ~ .tab1{left: 49.5%}
#n16:checked ~ .tab1{left: 56%}
#n15:checked ~ .tab1{left: 62.3%}
#n14:checked ~ .tab1{left: 68.5%}
#n13:checked ~ .tab1{left: 75%}
#n12:checked ~ .tab1{left: 81.3%}
#n11:checked ~ .tab1{left: 87.3%}
#n10:checked ~ .tab1{left: 93.7%}
#n00:checked ~ .tab1{top:58%;left: 5.5%}
#n90:checked ~ .tab1{top:58%;left: 13%}
#n80:checked ~ .tab1{top:58%;left: 19.5%}

.warp2{
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  position: relative;
  top: 10%;
  height: 100%;
  width: 95%;
  left: 3%;
}
.movieWarp{
  position: relative;
  top: 0;
  width: 16.66%;
  height: 360px;
}
.imgClass{
  padding: 10px;
  width: 100%;
  height: 300px;
}

.fontBox{
  width: 97%;
  padding: 5px;
}
.imgName{
  cursor:pointer;
  margin-top: -1%;
  margin-left: 2.5%;
  font-size: 1.2em;
}
.imgName:hover{
  color: skyblue;
}
.imgAc{
  margin-left: 2%;
  margin-top: 3%;
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow:hidden;
  color: #999;
}

img{
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-size: cover;
}

.page{
  position: relative;
  top:100%;
  left: 25%;
}
.leftPage{
  position: relative;
  top: 10%;
  left: 43%;
}
</style>