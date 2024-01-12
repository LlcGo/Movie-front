
<template>
 <div class="top">
 </div>
  <div class="topDetail">
    <div class="title">
      <div class="title1">致命魔术</div>
      <div class="title2">
        10.0
        <a-rate class="rate" :value="5" disabled />
      </div>

    </div>
    <img class="img" :src="img"/>
    <div class="xx">
      <a-space>
        <template #split>
          <a-divider type="vertical" />
        </template>
          <div style="font-size: 16px">年份:<p style="display: inline">2006</p></div>
          <div style="font-size: 16px">地区:<p style="display: inline">英国</p></div>
          <div style="font-size: 16px">类型:<p style="display: inline">悬疑</p></div>
      </a-space>
      <div class="state">状态</div>
      <div class="actor">主演：lc</div>
      <div class="dy">导演:lc</div>
      <div class="jj">简介:asdasd</div>
      <a-button  style="margin-top: 8%" type="primary">立即播放</a-button>
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
      19世纪末，人们对科学文明还不是认识得太过清楚，于是，安吉尔（休•杰克曼HughJackman饰）和伯登（克里斯蒂安•贝尔ChristianBale饰）的魔术，成为了伦敦城内的神奇人物。安吉尔出身贵族，魔术手段华丽丰富，是富人圈子里的表演常客。而伯登即使出身平平，争强好胜的心智和充满创造力的魔术技巧，却也令他有了名气。两人自小本是要好的伙伴，然而，现在魔术界二人各有领地，并且都有野心想成为音乐大厅里的顶级魔术师，一番明争暗斗如箭在弦上。伯登掌握了精彩的分身术，叫座又叫好。而安吉尔见情势不妙，搬来科学家助阵——他发明的交流电有无穷魔力，保证让观众目瞪口呆。二人出招接招，一来一往，争斗在剧烈升级，友谊和道德都被抛诸脑后，一场血案在悄悄酝酿
    </div>
    <div v-if="choose == 1" class="pf">
      <div class="movie">给【致命魔术】打分</div>
      <a-rate v-model:value="value" :tooltips="desc" @click="test"/>
      <span class="ant-rate-text">{{ desc[value - 1] }}</span>
    </div>

    <div class="comment">
      <div class="commentTitle">
        评论
      </div>
      <div class="commentSize">
          312
      </div>
    </div>

    <div class="commentTextContext">
      <div class="commentUserImg">
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </div>
      <div class="commentInput">
        <a-input v-model:value="value" size="large" placeholder="large size" />
      </div>
      <div class="commentButton">
        <a-button type="primary">发布</a-button>
      </div>
    </div>

    <a-comment class="commentO">
      <template #actions>
      <span key="comment-basic-like">
        <a-tooltip title="Like">
          <template v-if="action === 'liked'">
            <LikeFilled @click="like" />
          </template>
          <template v-else>
            <LikeOutlined @click="like" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ likes }}
        </span>
      </span>
        <span key="comment-basic-dislike">
        <a-tooltip title="Dislike">
          <template v-if="action === 'disliked'">
            <DislikeFilled @click="dislike" />
          </template>
          <template v-else>
            <DislikeOutlined @click="dislike" />
          </template>
        </a-tooltip>
        <span style="padding-left: 8px; cursor: auto">
          {{ dislikes }}
        </span>
      </span>
        <span key="comment-basic-reply-to">Reply to</span>
      </template>
      <template #author><a>Han Solo</a></template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ dayjs().fromNow() }}</span>
        </a-tooltip>
      </template>
    </a-comment>

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
import { ref } from 'vue';
const value = ref<number>(3);
const desc = ref<string[]>(['很差', '较差', '一般', '很好', '力推']);
const choose = ref(0);
import dayjs from 'dayjs';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const likes = ref<number>(0);
const dislikes = ref<number>(0);
const action = ref<string>();

const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = 'liked';
};

const dislike = () => {
  likes.value = 0;
  dislikes.value = 1;
  action.value = 'disliked';
};
const chooseState = (state) => {
  choose.value = state;
}

const test = () => {
  alert(value.value)
}
</script>

<style scoped>
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
  margin-top:3%;
}
.actor{
  margin-top: 3%;
}
.dy{
  margin-top: 3%;
}
.jj{
  margin-top: 3%;
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