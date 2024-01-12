
<template>
  <div class="content">
    <div class="context">
      <div class="top">
        <div class="topFont">{{ title }}</div>
        <div class="more">更多</div>
      </div>

      <div class="warp">

          <div v-for="movieItem in props.movie" class="movieWarp">
            <div class="imgClass">
              <img :src="movieItem.img">
            </div>
            <div class="fontBox">

              <div class="imgName">
                {{movieItem.movieName}}
              </div>
              <div v-html="movieItem.actorsName" class="imgAc">
              </div>
            </div>
          </div>
        </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import xtf from "../../assets/xtf.jpg";
import {onMounted, ref} from "vue";
import {Movie} from "../../../generated";

const title = ref();

const props = defineProps({
  //子组件接收父组件传递过来的值
  movie: [] as Movie,
})

onMounted(()=>{
  getType();
})


const getType = () => {
  console.log('每一个系列里',props.movie)
  if (props.movie.length > 0){
    props.movie.forEach(item =>{
       item.actorsName = item.actorsName.replace(",",'&nbsp;')
    })
    title.value = movieType(props.movie[0].type);
    return;
  }
  title.value = '暂无';
}
// * 0 战争片
// 1 奇幻片
// 2 科幻片
// 3 剧情片
// 4 恐怖片
// 5 爱情片
// 6 动作片
// 7 喜剧片
// 8 动画片
// 9 悬疑片
// 10 纪录片
const movieType = (type) => {
  switch (type){
    case 0:
      return "战争片"
    case 1:
      return "奇幻片"
    case 2:
      return "科幻片"
    case 3:
      return "剧情片"
    case 4:
      return "恐怖片"
    case 5:
      return "爱情片"
    case 6:
      return "动作片"
    case 7:
      return "喜剧片"
    case 8:
      return "动画片"
    case 9:
      return "悬疑片"
    case 10:
      return "纪录片"
  }
}



</script>

<style scoped >

.content{
  margin-top: 3.5%;
  height: 45vh;
  margin-left: 11%;
  width: 78vw;
}
.context{
  position: relative;
  margin-top: 40px;
  height: 46vh;
}
.top{
  position: relative;
  top: -5px;
}
.topFont{
  position: absolute;
  left: 9px;
  top: 12px;
  font-size: 22px;
}
.more{
  position: absolute;
  top: 18px;
  left: 8%;
}

.warp{
  display: flex;
  flex-wrap: wrap;
  flex-grow: 0;
  position: relative;
  top: 10%;
  height: 100%;
  width: 100%;
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
  margin-top: -1%;
  margin-left: 2.5%;
  font-size: 1.2em;
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




</style>
