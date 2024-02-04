
<template>
  <div class="big">
<!--    轮播图-->
    <div id="slideshow">
      <!-- 插入轮播的图片们 -->
        <img @click="toDetail" class="active" :src="movie1?.bigImg" />
        <img @click="toDetail" :src="movie2?.bigImg" />
        <img @click="toDetail" :src="movie3?.bigImg" />

      <!-- 插入轮播的页码们 -->
      <div>
        <span class="active">1</span>
        <span>2</span>
        <span>3</span>
      </div>
      <!-- 插入图片的描述们 -->
      <p class="active">
        {{movie1?.movieName}}
      </p>
      <p>{{movie2?.movieName}}</p>
      <p>{{movie3?.movieName}}</p>
    </div>
<!--    内容-->
    <div v-for="movie in movieList" >
      <div v-if="movie.length > 0">
        <SeriesList :movie="movie"/>
      </div>

    </div>


  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import SeriesList from "../../../components/movieList/SeriesList.vue";
import {Movie, MovieControllerService} from "../../../../generated";
import {useRouter} from "vue-router";
defineProps<{ msg: string }>()
const router = useRouter();
const movieList = ref<Map<number, Array<Movie>>>([]);
const currentId = ref();
const movie1 = ref()
const movie2 = ref()
const movie3 = ref()
onMounted(()=>{
  slideshow();
  init();
  getRe();
})

const toDetail = () => {
  switch (currentId.value){
    case 0 :
      router.push({
        path:'/layout/detail',
        query: {
          currentMovieId:movie1.value.id
        }
      })
          break;
    case 1 :
      router.push({
        path:'/layout/detail',
        query: {
          currentMovieId:movie2.value.id
        }
      })
          break;
    case 2 :
      router.push({
        path:'/layout/detail',
        query: {
          currentMovieId:movie3.value.id
        }
      })
          break;
  }

}
const init = async () => {
  const res = await MovieControllerService.listIndexMovieByPageUsingGet()
  movieList.value = res.data
  // console.log(res.data)
}
const reMovie = ref();
const getRe = async () => {
  const res = await MovieControllerService.getSyReUsingPost();
  reMovie.value = new Map(Object.entries(res.data))
  console.log(reMovie.value.get('1'))
  const index1Img = reMovie.value.get('1').bigImg;
  const index2Img = reMovie.value.get('2').bigImg;
  const index3Img = reMovie.value.get('3').bigImg;
  const res1 = await MovieControllerService.getSyReMovieByIdUsingPost(reMovie.value.get('3').id,reMovie.value.get('2').id,reMovie.value.get('1').id)
  res1.data.forEach(item=>{
    console.log(item,index1Img)
    if(item.bigImg == index1Img){
      movie1.value = item
    }
    if(item.bigImg == index2Img){
      movie2.value = item
    }
    if(item.bigImg == index3Img){
      movie3.value = item
    }
  })
}

//1:3 2:1 3:2


//轮播图函数
function slideshow() {
  var slideshow=document.getElementById("slideshow"),
      imgs=slideshow.getElementsByTagName("img"), //得到图片们
      pages=slideshow.getElementsByTagName("span"), //得到页码们
      descrips=slideshow.getElementsByTagName("p"), //得到描述们
      current=0; //current为当前活跃的图片编号

  function slideOff() {
    imgs[current].className=""; //图片淡出
    pages[current].className="";
    descrips[current].className="";
  }
  function slideOn() {
    currentId.value = current;
    console.log(currentId.value)
    imgs[current].className="active"; //图片淡入
    pages[current].className="active";
    descrips[current].className="active";
  }

  function changeSlide() { //切换图片的函数
    slideOff();
    current ++; //自增1
    if(current>=3) current=0;
    slideOn();
  }

  //每2s调用changeSlide函数进行图片轮播
  var slideon=setInterval(changeSlide,2000);

  slideshow.onmouseover=function () {
    clearInterval(slideon); //当鼠标移入时清除轮播事件
  }
  slideshow.onmouseout=function () {
    slideon=setInterval(changeSlide,3000); //当鼠标移出时重新开始轮播事件
  }

  for(var i=0; i<pages.length; i++) { //定义鼠标移入和移出页码事件
    pages[i].onmouseover=function(){
      slideOff(); //图片淡出
      current=this.innerHTML-1; //得到鼠标停留的页码对应的current
      slideOn(); //图片淡出
    }
  }

}





</script>

<style scoped>

.big{
  margin: 0 auto;
  position: absolute;
  top: 0;
  width: 100%;
}




img{
  width: 100%;
  height: 100%;
  background-size: cover;
  cursor: pointer;
}






*{
  padding: 0;
  margin: 0;
}
#slideshow{
  width: 100%;
  height: 500px;
  margin: 0 auto; /*设置在页面水平居中*/
  overflow: hidden;
  position: relative;
}
#slideshow img{
  width: 100%;
  height: 100%;
  position: absolute; /*图片采取绝对定位，均位于左上角，重叠在一起*/
  top: 0;
  left: 0;
  opacity: 0; /*初始不透明度为0，图片都看不见*/
  transition: opacity 1s linear; /*--重点--定义一个关于透明度的transition*/
}
#slideshow img.active{
  opacity: 1; /*有active类的图片不透明度为1，即显示图片*/
}
/*-- 设置页码的样式 --*/
#slideshow div{
  width: 100%;
  position: absolute;
  bottom: 10px;
  text-align: center;
}
#slideshow span{
  display: inline-block;
  width: 10px;
  line-height: 10px; /*当只有一行文本时height等于line-height*/
  border-radius: 25px; /*设置页码为圆形*/
  margin: 0 15px;
  color: transparent;
  background: #fff;
  font-size: 16px;
}
#slideshow span.active{
  color: transparent;
  background: skyblue;
}
/*-- 设置图片描述文本的样式 --*/
#slideshow p{
  position: absolute;
  top: 90%;
  left: -400px; /*相对于轮播图左侧左移400px*/
  line-height: 30px;
  padding: 5px 30px;
  font-size: 20px;
  color: white;
  background-image: linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,.1) 77%,hsla(0,0%,100%,0));
  opacity: 0;
  transition: all 1s;
}
#slideshow p.active{
  left: 0;
  opacity: 1;
}
</style>
