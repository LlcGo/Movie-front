
<template>
  <div class="content">
    <div class="context">
      <div class="top">
        <div class="topFont">悬疑电影</div>
        <div class="more">更多</div>
      </div>

      <div class="warp">

        <div class="movieWarp">
          <div class="imgClass">
            <img :src="xtf">
          </div>
          <div class="fontBox">
            <div class="imgName">
              惊天破
            </div>
            <div class="imgAc">
              666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            </div>
          </div>

        </div>
        <div class="movieWarp">
          <div class="imgClass">
            <img :src="xtf">
          </div>
          <div class="fontBox">
            <div class="imgName">
              惊天破
            </div>
            <div class="imgAc">
              666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            </div>
          </div>

        </div>
        <div class="movieWarp">
          <div class="imgClass">
            <img :src="xtf">
          </div>
          <div class="fontBox">
            <div class="imgName">
              惊天破
            </div>
            <div class="imgAc">
              666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            </div>
          </div>

        </div>
        <div class="movieWarp">
          <div class="imgClass">
            <img :src="xtf">
          </div>
          <div class="fontBox">
            <div class="imgName">
              惊天破
            </div>
            <div class="imgAc">
              666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            </div>
          </div>

        </div>
        <div class="movieWarp">
          <div class="imgClass">
            <img :src="xtf">
          </div>
          <div class="fontBox">
            <div class="imgName">
              惊天破
            </div>
            <div class="imgAc">
              666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            </div>
          </div>

        </div>
        <div class="movieWarp">
          <div class="imgClass">
            <img :src="xtf">
          </div>
          <div class="fontBox">
            <div class="imgName">
              惊天破
            </div>
            <div class="imgAc">
              666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666
            </div>
          </div>

        </div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import xtf from "../../assets/xtf.jpg";






</script>

<style scoped >

.content{
  height: 45vh;
  margin-left: 4.5%;
  width: 90vw;
}
.context{
  position: relative;
  margin-top: 40px;

  height: 50vh;
}
.top{
  position: relative;
}
.topFont{
  position: absolute;
  left: 18px;
  top: 12px;
  font-size: 22px;
}
.more{
  position: absolute;
  top: 18px;
  left: 13%;
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
  padding: 23px;
  width: 100%;
  height: 300px;
}

.fontBox{
  width: 93%;
  padding: 5px;
}
.imgName{
  margin-top: -7%;
  margin-left: 8%;
  font-size: 1.2em;
}
.imgAc{
  margin-left: 8%;
  margin-top: 3%;
  font-size: 1em;
  text-overflow: ellipsis;
  overflow:hidden;
  color: #999;
}

img{
  width: 100%;
  height: 100%;
  background-size: cover;
}




</style>
