
<template>
  <div class="top">
  </div>
  <div class="topDetail">
    <div class="title">
      <div class="title1">致命魔术</div>
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
          {{ getMoveType(currentMovie?.type) }}
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
      <!--      <div class="jj">简介:{{ currentMovie?.movieProfile }}</div>-->
      <a-button  style="margin-top: 10%" type="primary" @click="toWatch">立即播放</a-button>
    </div>
  </div>
</template>


<script setup lang="ts">

import img from "../../../assets/xtf.jpg";
import getYear from "../../typeEnum/Year.ts";
import getMovieNation from "../../typeEnum/MovieNation.ts";
import getMoveType from "../../typeEnum/MovieType.ts";
import getMovieState from "../../typeEnum/MovieState.ts";
import {useRouter} from "vue-router";
import {Movie} from "../../../../generated";
import {onMounted, ref} from "vue";
const router = useRouter();

const toWatch = () => {
  router.push({
    path: '/layout/detail/watch',
    query:{
      currentMovie: JSON.stringify(props.currentMovie)
    }
  })
}

const props = defineProps({
  //子组件接收父组件传递过来的值
  currentMovie: null as Movie,
})

onMounted(()=>{
  console.log('当前的----------------->',props.currentMovie)
})


</script>

<style scoped>
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

</style>