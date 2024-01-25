
<template>
<div class="searchBox">
 <div class="topSearch">
    <div class="searchWarp">
        <div class="sc">
          <a-textarea
              style="width: 100%"
              v-model:value="searchContent"
              placeholder="根据用户名查找"
              auto-size
          />
          <div style="margin-top: 2%; margin-left: 80%">
            <a-radio-group v-model:value="sex" name="radioGroup">
              <a-radio value="0">男</a-radio>
              <a-radio value="1">女</a-radio>
            </a-radio-group>
          </div>

        </div>
        <div class="an">
          <div class="searchButton">
            <a-button type="primary" style="width: 50%" @click="search">查找</a-button>
            <a-button type="primary" style="width: 50%;position: relative; left: 3%" @click="matchSearch">匹配</a-button>
          </div>
        </div>
    </div>
 </div>
  <div class="searchContent searchFriendScroll" v-if="searchFriend?.length > 0">
       <div class="showF" v-for="friend in searchFriend">
          <div class="friendWarp">
              <a-avatar :size="55">
                <template #icon>
                <img :src="friend?.faceImage">
                </template>
              </a-avatar>
            <div class="titleContent">
               <div class="titleName">
                 {{friend.nickname}}
               </div>
              <div class="titleSex">
                 性别 : {{getSex(friend.sex)}}
              </div>
              <div>
                <a-button type="primary" style="margin-top: 3%" size="small" @click="toRequestFriend(friend.id)">添加好友</a-button>
              </div>
            </div>
          </div>
       </div>
  </div>

  <div v-if="searchFriend.length == 0">
    <a-empty
        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
        :image-style="{
      height: '60px',
    }"
    >
      <template #description>
      <span>
        暂无相关信息,请查询
      </span>
      </template>
    </a-empty>
  </div>

</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {
  FriendsRequestControllerService,
  UserControllerService,
  UserQueryRequest,
  Users
} from "../../../../../generated";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
const router = useRouter();
const searchContent = ref();
const sex = ref();
const searchFriend = ref<Array<Users>>([]);

const getSex = (sex:string) =>{
   switch (sex){
     case '0' : return '男'
     case '1' : return '女'
   }
}
const search = async () => {
  let data : UserQueryRequest = {
    nickname :searchContent.value,
    sex :sex.value
  }
  const res = await UserControllerService.searchFriendsUsingPost(data)
  searchFriend.value = res.data;
}

const toRequestFriend = async (friendId:string) =>{
   const res = await FriendsRequestControllerService.requestFriendsUsingGet(friendId);
   if(res.code === 50001){
     message.success(res.message)
   }
   if (res.data){
     message.success('已发送请求,请等待对方同意')
   }
}

const matchSearch = async () => {
 const res0 = await UserControllerService.getLoginUserUsingGet();
 if(res0.data.likeType == null || res0.data?.likeType == ''){
   message.warn('请设置您的兴趣爱好')
   router.push('/layout/account')
   return;
 }
 const res = await UserControllerService.matchFriendUsingGet(10);
 searchFriend.value = res.data;
}
</script>


<style scoped>
.titleName{
  text-overflow: ellipsis;
  overflow:hidden;
}
.titleSex{
  margin-top: 2%;
  font-size: 14px;
}
.titleContent{
  position: relative;
  top: -5%;
  margin-left: 3%;
  /*background: rebeccapurple;*/
  height: 60px;
  width: 100px;
}
.showF{
  display: flex;
  justify-content: center;
  align-items: center;
  /*background: #1677ff;*/
  height: 80px;
  width: 20%;
}
.friendWarp{
  position: relative;
  display: flex;
  margin-top: 6%;
  /*background: #9499a0;*/
  width: 80%;
  height: 80%;
}





.searchContent{

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /*background: rosybrown;*/
  height: 580px;
  width: 100%;
  border-top: 1px solid #e5e9ef;
}
.searchButton{
  margin-left: 10%;
  margin-top: 0;
}
.sc{
 /* background: skyblue;*/
  height: 80%;
  width: 70%;
}
.an{
  height: 80%;
  width: 20%;
}
.searchWarp{
  display: flex;
  position: relative;
  top: 10%;
  left: 3%;
 /* background: #80b9f2;*/
  height: 80px;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.searchBox{
}
.topSearch{
  /*background: rebeccapurple;*/
  height: 100px;
  width: 100%;
}

.searchFriendScroll{
  overflow-y: scroll;
  position: relative;
  height: 580px;
}
</style>