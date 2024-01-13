
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
      <a-button  style="margin-top: 10%" type="primary">立即播放</a-button>
    </div>
  </div>
<div class="content">
  <div class="left">
    <div class="font" @click="chooseState(0)">
      剧情介绍
    </div>
    <div class="font" @click="chooseState(1)">
      我要评分
    </div>
    <div v-if="choose == 0" class="xx3">
      {{currentMovie?.movieProfile}}
    </div>
    <div v-if="choose == 1" class="pf">
      <div class="movie">给【致命魔术】打分</div>
      <a-rate v-model:value="score" :tooltips="desc" @click="toScore"/>
      <span class="ant-rate-text">{{ desc[value - 1] }}</span>
    </div>

    <div class="comment">
      <div class="commentTitle">
        评论
      </div>
      <div class="commentSize">
         {{count}}
      </div>
    </div>

    <div class="commentTextContext">
      <div class="commentUserImg">
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </div>
      <div class="commentInput">
        <a-input v-model:value="content" size="large" placeholder="large size" />
      </div>
      <div class="commentButton">
        <a-button type="primary" @click="pushComment">发布</a-button>
      </div>
    </div>

    <div v-for="comment in currentComment">
      <a-comment class="commentO">
        <template #actions>
      <span key="comment-basic-like">
        <a-tooltip title="喜欢">
          <template v-if="comment.like">
            <LikeFilled @click="like(comment?.id)" />
          </template>
          <template v-else>
            <LikeOutlined @click="like(comment?.id)" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ comment?.liked }}
        </span>
      </span>
          <span key="comment-basic-dislike">
        <a-tooltip title="不喜欢">
          <template v-if="comment.hate">
            <DislikeFilled @click="dislike(comment?.id)" />
          </template>
          <template v-else>
            <DislikeOutlined @click="dislike(comment?.id)" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ comment?.disLiked }}
        </span>
      </span>
        </template>
        <template #author><a>{{comment?.user?.username}}</a></template>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random"  />
        </template>
        <template #content>
          <p>
           {{comment?.content}}
          </p>
        </template>
        <template #datetime>
          <a-tooltip >
            <span>{{dayjs(comment?.createTime).format('YYYY-MM-DD')}}</span>
          </a-tooltip>
        </template>
      </a-comment>
    </div>


  </div>
  <div class="right">
    <div class="rightTitleTop">悬疑片周排行榜</div>
    <div class="rightMoreTop">更多</div>

    <div class="rightContext">
      <div class="rightContext2">
        <img class="rightImg" :src="img"/>
        <div class="rightFont">
          <div>电影名字</div>
          <div class="hotContext">
            <img class="hotImg" :src="hot"/>
            <div class="hotSize">666</div>
          </div>
          <div class="xx5">时间/国家/电影类型</div>
          <div class="xx6">状态：正片</div>
        </div>
      </div>
    </div>

    <div class="rightContext">
      <div class="rightContext2">
        <img class="rightImg" :src="img"/>
        <div class="rightFont">
          <div>电影名字</div>
          <div class="hotContext">
            <img class="hotImg" :src="hot"/>
            <div class="hotSize">666</div>
          </div>
          <div class="xx5">时间/国家/电影类型</div>
          <div class="xx6">状态：正片</div>
        </div>
      </div>
    </div>

    <div class="rightContext">
      <div class="rightContext2">
        <img class="rightImg" :src="img"/>
        <div class="rightFont">
          <div>电影名字</div>
          <div class="hotContext">
            <img class="hotImg" :src="hot"/>
            <div class="hotSize">666</div>
          </div>
          <div class="xx5">时间/国家/电影类型</div>
          <div class="xx6">状态：正片</div>
        </div>
      </div>
    </div>

    <div class="rightContext">
      <div class="rightContext2">
        <img class="rightImg" :src="img"/>
        <div class="rightFont">
          <div>电影名字</div>
          <div class="hotContext">
            <img class="hotImg" :src="hot"/>
            <div class="hotSize">666</div>
          </div>
          <div class="xx5">时间/国家/电影类型</div>
          <div class="xx6">状态：正片</div>
        </div>
      </div>
    </div>

    <div class="rightContext">
      <div class="rightContext2">
        <img class="rightImg" :src="img"/>
        <div class="rightFont">
          <div>电影名字</div>
          <div class="hotContext">
            <img class="hotImg" :src="hot"/>
            <div class="hotSize">666</div>
          </div>
          <div class="xx5">时间/国家/电影类型</div>
          <div class="xx6">状态：正片</div>
        </div>
      </div>
    </div>

    <div class="rightContext">
      <div class="rightContext2">
        <img class="rightImg" :src="img"/>
        <div class="rightFont">
          <div>电影名字</div>
          <div class="hotContext">
            <img class="hotImg" :src="hot"/>
            <div class="hotSize">666</div>
          </div>
          <div class="xx5">时间/国家/电影类型</div>
          <div class="xx6">状态：正片</div>
        </div>
      </div>
    </div>

  </div>
</div>
</template>

<script setup lang="ts">
import img from '../../../assets/xtf.jpg'
import hot from '../../../assets/hot.png'
import {onMounted, ref} from 'vue';
const value = ref<number>(3);
//内容
const content = ref();
const desc = ref<string[]>(['很差', '较差', '一般', '很好', '力推']);
const choose = ref(0);
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useRoute} from "vue-router";
import {
  Movie,
  Remark,
  RemarkAddRequest,
  RemarkAndUserControllerService,
  RemarkControllerService, RemarkUserAddQuery
} from "../../../../generated";
import getYear from "../../typeEnum/Year.ts";
import getMoveType from "../../typeEnum/MovieType.ts";
import getMovieNation from "../../typeEnum/MovieNation.ts";
import getMovieState from "../../typeEnum/MovieState.ts";
import {message} from "ant-design-vue";
dayjs.extend(relativeTime);

const {query} = useRoute();

const action = ref<string>();
//当前的电影
const currentMovie = ref<Movie>();
//存储当前的评论
const currentComment = ref<Array<Remark>>();
//总共评论多少条
const count = ref();
//评分
const score = ref();

onMounted(()=>{
  currentMovie.value = JSON.parse(query.currentMovie)
  console.log(currentMovie.value)
  getComment();
  getCount();
})

const toScore = async () => {
  let data : RemarkAddRequest = {
    score: score.value * 2,
    movieId: currentMovie.value.id,
  }
  const res = await  RemarkControllerService.addRemarkUsingPost(data);
  console.log(res)
  if(res.message == 'ok'){
    message.success("评分成功")
  }
}

const getComment = async () => {
  const res =await RemarkControllerService.listRemarkByPageUsingGet(currentMovie.value.id);
  currentComment.value = res.data.records
  console.log(currentComment.value)
}

const getCount = async () => {
  const res = await RemarkControllerService.listCountUsingGet(currentMovie.value.id)
  count.value = res.data;
}

/**
 * 发布评论 不带分数
 */
const pushComment = async () => {
  let data : RemarkAddRequest = {
    content : content.value,
    movieId: currentMovie.value.id,
  }
  const res = await RemarkControllerService.addRemarkUsingPost(data);
  if(res.code == 0){
    getComment();
    getCount();
  }
}

const like = async (id:number) => {
  currentComment.value?.forEach(item =>{
    if (item.id == id){
      console.log('点之前的 hate',item.hate)
      console.log('点之前的 like',item.like)
      // 如果此时 hate 还是为 true
      if(item.hate){
        item.hate = false;
        item.disLiked = item.disLiked - 1;
      }
      //如果是true 改为 false
      if(item.like){

        item.like = false;
        item.liked = item.liked - 1;
      }else {

        item.like = true;
        item.liked = item.liked + 1;
      }
    }
  })
  //喜欢 2
  let data : RemarkUserAddQuery = {
      remarkId: id,
      support: 2
  }
  console.log(data);
  const res = await RemarkAndUserControllerService.likeUsingPost(data)
  console.log(res);
  if(res.data){
    getComment();
    getCount();
  }
};

const dislike =async (id:number) => {
  //不喜欢 1
  currentComment.value?.forEach(item =>{
     if (item.id == id){
       console.log('点之前的 hate',item.hate)
       console.log('点之前的 like',item.like)
       //如果此时 like 还是 true
       if(item.like){
          item.like = false;
          item.liked = item.liked - 1
       }
       //如果是true 改为 false
       if(item.hate){
         item.hate = false;
         item.disLiked = item.disLiked - 1;
       }else {
         item.hate = true;
         item.disLiked = item.disLiked + 1;
       }
     }
  })
  let data : RemarkUserAddQuery = {
    remarkId: id,
    support: 1
  }
  console.log(data);
  const res = await RemarkAndUserControllerService.likeUsingPost(data)
  if(res.data){
    getComment();
    getCount();
  }
};
const chooseState = (state) => {
  choose.value = state;
}


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
.commentO{
  margin-top: 3%;
  margin-left: 2%
}
:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-btn-primary){
  height: 40px;
  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgb(5 145 255 / 10%);
}
.commentTextContext{
  margin-left: 2%;
  margin-top: 5%;
  height: 43px;
}
.commentButton{
  display: inline;
  position: absolute;
  left: 61%;
}
.commentInput{
  margin-left: 0.5%;
  max-width: 260px;
  display: inline;
  position: absolute;
  min-width: 45%;
}
.commentUserImg{
  display: inline;
}
.comment{
  margin-top: 8%;
}

.commentTitle{
  display: inline;
  font-size: 20px;
  font-weight: 550;
}

.commentSize{
  display: inline;
  font-size: 15px;
  color: #9499a0;
}

.rightContext2{
  position: relative;
  top: 7%;
  left: 4%;
}
.hotContext{
  position: relative;
  top: -9px;
  left: -10px;
}
.hotSize{
  position: absolute;
  left: 169%;
  top: 17%;
  font-size: 15px;
  color: #999;
}
.hotImg{
  position: absolute;
  width: 18px;
  height: 18px;
  left: 150%;
  top: 14%;
}
.xx5{
  margin-top: 6%;
  color: #999;
  font-size: 12px;
}
.xx6{
  margin-top: 3%;
  color: #999;
  font-size: 12px;
}

.rightFont{
  position: absolute;
  top: 24px;
  left: 23%;
}
.rightImg{
  border-radius: 6px;
  width: 80px;
  height: 106px;
}
.rightContext{
  height: 125px;
  position: relative;
  border-top: 1px solid #f8f8f8;
}

.rightTitleTop{
  margin-left: 4%;
  display: inline;
  font-weight: 400;
  margin-right: 35%;
  font-size: 20px;
}
.rightMoreTop{
  display: inline;
  font-weight: 400;
}
.pf{
  margin-top: 1.5%;
  background: #f8f8f8;
  height: 50px;
}

.movie{
  display: inline;
  margin-right: 3%;
}
.xx3{
  margin-top: 1.5%;
}
.font{
  margin-right: 3%;
  display: inline;
  font-size: 20px;
  font-weight: 550;
}

.top{
  width: 100%;
  height: 220px;
  background-image: url("../../../assets/deimg.png");
}
.content{
  margin-top: 3.5%;
  height: 45vh;
  margin-left: 11%;
  width: 78vw;
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


.left{
  float: left;
  width: 70%;
}
.right{
  float: left;
  width: 30%;
}
.ant-rate-text{
  line-height: 50px;
  display: inline;
}
</style>