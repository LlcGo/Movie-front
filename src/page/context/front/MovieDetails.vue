<template>
  <RouterView :currentMovie="currentMovie"/>
  <div class="content">
    <div class="left">
      <div class="font" @click="chooseState(0)">
        剧情介绍
      </div>
      <div class="font" @click="chooseState(1)">
        我要评分
      </div>
      <div v-if="choose == 0" class="xx3">
        {{ currentMovie?.movieProfile }}
      </div>
      <div v-if="choose == 1" class="pf">
        <div class="movie">给【{{currentMovie?.movieName}}】打分</div>
        <a-rate v-model:value="score" :tooltips="desc" @click="toScore"/>
<!--        <span class="ant-rate-text">{{ desc[value - 1] }}</span>-->
      </div>

      <div class="comment">
        <div class="commentTitle">
          评论
        </div>
        <div class="commentSize">
          {{ total }}
        </div>
      </div>

      <div class="commentTextContext">
        <div class="commentUserImg" v-if="currentUser">
          <a-avatar :src="currentUser?.faceImage" alt="Han Solo"/>
        </div>
        <div class="commentInput">
          <a-input v-model:value="content" size="large" placeholder="电影评论"/>
        </div>
        <div class="commentButton">
          <a-button type="primary" @click="pushComment">发布</a-button>
        </div>
      </div>


<!--      喜欢与不喜欢-->

      <div v-for="comment in currentComment">
        <a-comment class="commentO">
          <template #actions>
      <span key="comment-basic-like">
        <a-tooltip title="喜欢">
          <template v-if="comment.like">
            <LikeFilled @click="like(comment?.id)"/>
          </template>
          <template v-else>
            <LikeOutlined @click="like(comment?.id)"/>
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ comment?.liked }}
        </span>
      </span>
            <span key="comment-basic-dislike">
        <a-tooltip title="不喜欢">
          <template v-if="comment?.hate">
            <DislikeFilled @click="dislike(comment?.id)"/>
          </template>
          <template v-else>
            <DislikeOutlined @click="dislike(comment?.id)"/>
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ comment?.disLiked }}
        </span>
               <a-button v-if="comment?.user.id == currentUser?.id" type="ghost" size="small" style="position: relative;left: 6px" @click="toDeleteComment(comment)">删除</a-button>
      </span>
          </template>

<!--          评论内容-->
          <template #author><a>{{ comment?.user?.username }}</a></template>
          <template #avatar>
            <a-avatar :src="comment?.user?.faceImage"/>
          </template>
          <template #content>
            <p>
              {{ comment?.content }}
            </p>
          </template>
          <template #datetime>
            <a-tooltip>
              <span>{{ dayjs(comment?.createTime).format('YYYY-MM-DD') }}</span>
            </a-tooltip>
          </template>
        </a-comment>
      </div>

      <div v-if="currentComment.length == 0" class="noClass">
        <a-empty
            :image="noMessage"
        >
          <template #description>
      <span>
        暂无评论
      </span>
          </template>
        </a-empty>
      </div>

      <a-pagination v-if="total > 0"
                    v-model:current="current"
                    v-model:pageSize="pageSize"
                    @change="getComment"
                    :total="total"
                    show-less-items
                    style="margin-bottom: 20%;margin-top: 5%"/>
    </div>


    <div class="right">
      <div class="rightTitleTop">{{hotMovies[0]?.movieType.typeName}}排行榜</div>
      <div class="rightMoreTop" @click="moreMovie">更多</div>
      <div class="rightContext" v-for="hotMovie in hotMovies">
        <div class="rightContext2">
          <img class="rightImg" :src="hotMovie.img"/>
           <div class="rightFont" @click="toDetail(hotMovie)">
            <div >{{hotMovie.movieName}}</div>
            <div class="hotContext">
              <template v-if="re == '1'">
                <img class="hotImg" :src="hot"/>
                <div class="hotSize">{{hotMovie.hot}}</div>
              </template>
              <template v-else>
                <img class="hotImg" :src="pf"/>
                <div class="hotSize">{{hotMovie.score}}</div>
              </template>
            </div>
            <div class="xx5">{{hotMovie?.movieNation?.nationName }}/{{hotMovie.movieType.typeName}}</div>
            <div class="xx6">状态：{{getMovieState(hotMovie.state)}}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import img from '../../../assets/xtf.jpg'
import hot from '../../../assets/hot.png'
import pf from '../../../assets/pff.png'
import {onMounted, ref, watch, watchEffect} from 'vue';
import noMessage from '../../../assets/noMessage.png';

const value = ref<number>(3);
const re = ref('1');
//内容
const content = ref();
const desc = ref<string[]>(['很差', '较差', '一般', '很好', '力推']);
const choose = ref(0);
import dayjs from 'dayjs';
import {LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined} from '@ant-design/icons-vue';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useRoute, useRouter} from "vue-router";
import {
  Movie, MovieControllerService,
  Remark,
  RemarkAddRequest,
  RemarkAndUserControllerService,
  RemarkControllerService, RemarkDeleteRequest, RemarkUserAddQuery, UserControllerService
} from "../../../../generated";
import {message} from "ant-design-vue";
import getMovieNation from "../../typeEnum/MovieNation.ts";
import getMovieState from "../../typeEnum/MovieState.ts";

const getTypeRe = async () => {
  const res = await MovieControllerService.getTypeReUsingPost();
  re.value = res.data;
  console.log(re.value)
}

//当前页码
const current = ref(1);
const total = ref();
const pageSize = ref(6)
//热度电影
const hotMovies = ref<Array<Movie>>([])
const router = useRouter();
dayjs.extend(relativeTime);
const currentUser = ref();
const {query} = useRoute();
const route = useRoute();

//当前的电影
const currentMovie = ref<Movie>();
//存储当前的评论
const currentComment = ref<Array<Remark>>([]);
//评分
const score = ref();

onMounted(() => {
  getUserAndHotAndCurrentMovie();
  getComment();
  getTypeRe();
  document.documentElement.scrollTop = 0
  // getCount();
})
const toDetail = (movieItem:Movie) => {
  // alert(route.path)
  //如果还是当前页面
  // if(route.path == '/layout/detail'){
  //   alert(1)
  // }
  // alert(movieItem.id)
  router.push({
    path:'/layout/detail',
    query: {
      currentMovieId:movieItem.id
    }
  })
}
const moreMovie = () =>{
  router.push({
    path:'/layout/search',
    query:{
      type: hotMovies.value[0]?.movieType.id
    }
  })
}


const toDeleteComment = async (comment:Remark) => {
  let data : RemarkDeleteRequest= {
    id :comment.id,
    userId: currentUser.value.id
  }
  const res = await RemarkControllerService.deleteUserRemarkUsingPost(data);
  if(res.data){
    message.success('删除成功');
    getComment()
  }
}
const getUserAndHotAndCurrentMovie = async () => {
  const res1 = await MovieControllerService.getMovieByIdUsingGet(query.currentMovieId);
  currentMovie.value = res1.data;
  const res3 = await UserControllerService.getLoginUserUsingGet();
  currentUser.value = res3.data;
  //获取排行榜数据
  const reshot = await MovieControllerService.getHotByTypeUsingGet(currentMovie.value.type);
  console.log('hot value--->',reshot.data)
  hotMovies.value = reshot.data;
}



//设置是否观影
const getComment = async () => {
  const res = await RemarkControllerService.listRemarkByPageUsingGet(current.value, Number(query.currentMovieId), pageSize.value);
  // total.value = res.data?[0].total;
  // alert(total.value)
  currentComment.value = res.data;
  console.log('评论',currentComment.value)
  total.value = currentComment.value[0].total

}

// const getCount = async () => {
//   const res = await RemarkControllerService.listCountUsingGet(currentMovie.value.id)
//   count.value = res.data;
// }

/**
 * 发布评论 不带分数
 */
const pushComment = async () => {
  if(currentUser.value == null){
    message.warn('请登陆后发布评论')
    return
  }

  let data: RemarkAddRequest = {
    content: content.value,
    movieId: Number(query.currentMovieId),
  }
  const res = await RemarkControllerService.addRemarkUsingPost(data);
  content.value = '';
  if (res.code == 0) {
    getComment();
  }
}

const like = async (id: number) => {
  if(currentUser.value == null){
    message.warn('请登陆后操作')
    return
  }

  currentComment.value?.forEach(item => {
    if (item.id == id) {
      console.log('点之前的 hate', item.hate)
      console.log('点之前的 like', item.like)
      // 如果此时 hate 还是为 true
      if (item.hate) {
        item.hate = false;
        item.disLiked = item.disLiked - 1;
      }
      //如果是true 改为 false
      if (item.like) {

        item.like = false;
        item.liked = item.liked - 1;
      } else {

        item.like = true;
        item.liked = item.liked + 1;
      }
    }
  })
  //喜欢 2
  let data: RemarkUserAddQuery = {
    remarkId: id,
    support: 2
  }
  console.log(data);
  const res = await RemarkAndUserControllerService.likeUsingPost(data)
  console.log(res);
  if (res.data) {
    getComment();
    // getCount();
  }
};

const dislike = async (id: number) => {
  if(currentUser.value == null){
    message.warn('请登陆后操作')
    return
  }
  //不喜欢 1
  currentComment.value?.forEach(item => {
    if (item.id == id) {
      // console.log('点之前的 hate',item.hate)
      // console.log('点之前的 like',item.like)
      //如果此时 like 还是 true
      if (item.like) {
        item.like = false;
        item.liked = item.liked - 1
      }
      //如果是true 改为 false
      if (item.hate) {
        item.hate = false;
        item.disLiked = item.disLiked - 1;
      } else {
        item.hate = true;
        item.disLiked = item.disLiked + 1;
      }
    }
  })
  let data: RemarkUserAddQuery = {
    remarkId: id,
    support: 1
  }
  // console.log(data);
  const res = await RemarkAndUserControllerService.likeUsingPost(data)
  if (res.data) {
    getComment();
    // getCount();
  }
};
const chooseState = (state) => {
  choose.value = state;
}
const toScore = async () => {
  if(currentUser.value == null){
    message.warn('请登陆后操作')
    return
  }
  let data: RemarkAddRequest = {
    score: score.value * 2,
    movieId: currentMovie.value.id,
  }
  const res = await RemarkControllerService.addRemarkUsingPost(data);
  // console.log(res)
  if (res.message == 'ok') {
    message.success("评分成功")
  }
}

</script>

<style scoped>


.left {
  float: left;
  width: 70%;
}

.right {
  float: left;
  width: 30%;
}

.ant-rate-text {
  line-height: 50px;
  display: inline;
}

.commentO {
  margin-top: 3%;
  margin-left: 2%
}

:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-btn-primary) {
  height: 40px;
  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgb(5 145 255 / 10%);
}

.commentTextContext {
  margin-left: 2%;
  margin-top: 5%;
  height: 43px;
}

.commentButton {
  display: inline;
  position: absolute;
  left: 61%;
}

.commentInput {
  margin-left: 0.5%;
  max-width: 260px;
  display: inline;
  position: absolute;
  min-width: 45%;
}

.commentUserImg {
  display: inline;
}

.comment {
  margin-top: 8%;
}

.commentTitle {
  display: inline;
  font-size: 20px;
  font-weight: 550;
}

.commentSize {
  display: inline;
  font-size: 15px;
  color: #9499a0;
}

.rightContext2 {
  position: relative;
  top: 7%;
  left: 4%;
}

.hotContext {
  width: 1px;
  height: 1px;
  display: flex;
  position: relative;
  top: -9px;
  left: 136px;
}

.hotSize {
  font-size: 15px;
  color: #999;
}

.hotImg {
  width: 18px;
  height: 18px;
}

.xx5 {
  margin-top: 6%;
  color: #999;
  font-size: 12px;
}

.xx6 {
  margin-top: 3%;
  color: #999;
  font-size: 12px;
}

.rightFont {
  cursor: pointer;
  position: absolute;
  top: 24px;
  left: 23%;
}
.rightFont:hover {
  color: skyblue;
}

.rightImg {
  border-radius: 6px;
  width: 80px;
  height: 106px;
}

.rightContext {
  height: 125px;
  position: relative;
  border-top: 1px solid #f8f8f8;
}

.rightTitleTop {
  margin-left: 4%;
  display: inline;
  font-weight: 400;
  margin-right: 35%;
  font-size: 20px;
}

.rightMoreTop {
  cursor: pointer;
  display: inline;
  font-weight: 400;
}

.pf {
  margin-top: 1.5%;
  background: #f8f8f8;
  height: 50px;
}

.movie {
  display: inline;
  margin-right: 3%;
}

.xx3 {
  margin-top: 1.5%;
}

.font {
  cursor: pointer;
  margin-right: 3%;
  display: inline;
  font-size: 20px;
  font-weight: 550;
}

.font:hover{
  color: skyblue;
}

.content {
  margin-top: 3.5%;
  height: 45vh;
  margin-left: 11%;
  width: 78vw;
}

.noClass{
  margin-top: 10%;
}

</style>