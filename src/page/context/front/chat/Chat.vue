<template>
  <div class="bg">
    <div class="boxWarp">
      <div class="boxLeft">

        <div class="titleWarp">
<!--          聊天中心 左上半部分-->
          <div class="ltzx">
            <div class="ltContent">
              <div class="fj">
                <img :src="fj">
              </div>
              <div class="titleFont">
                聊天中心
              </div>
            </div>
          </div>

          <div class="select">


            <div v-if="unreadStore.unReadSize > 0" class="icon-car-count2">
              {{unreadStore.unReadSize}}
            </div>

            <div v-if="unreadStore.unRequest > 0" class="icon-car-count">
                 {{unreadStore.unRequest}}
            </div>
            <ul class="list" v-for="item in items" >
              <li class="item"
                  :class="{bgc : item.id == currentItem.id}"
                  @click="getCurrentId(item)"
              ><a>{{ item.itemName }}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="boxRight">
          <div class="rightTop">
            <div class="fontClass">
              {{route.name}}
            </div>

          </div>
          <div class="rightContent">
            <!--改为路由-->
           <router-view/>
          </div>
      </div>
    </div>

  </div>


</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import fj from '../../../../assets/chatfj.png'
import {onMounted, ref} from "vue";
import {unReadStore} from "../../../../store/unRead.ts";
import {FriendsControllerService} from "../../../../../generated";
const route = useRoute();
const router = useRouter();
const items = [{id:1,itemName:'我的好友'},{id:3,itemName: '在线寻友'},{id:2,itemName:'聊天'},{id:4,itemName: '信息'}]
const currentItem = ref({
  id:1,itemName:'我的好友'
})

onMounted(()=>{
  getCurrentId(currentItem.value)
})
const unreadStore = unReadStore()

const getCurrentId = (item:any) => {
    currentItem.value = item
  switch (item.id){
    case 1:
      FriendsControllerService.removeCurrentUsingPost();
      router.push({
        path: '/layout/chat/myFriends'
      })
      return;
    case 2:

      router.push({
        path: '/layout/chat'
      })
      return;
    case 3:
      FriendsControllerService.removeCurrentUsingPost();
      router.push({
        path: '/layout/chat/searchFriends'
      })
      return;
    case 4:
      router.push({
        path: '/layout/chat/message'
      })
      return;
  }
}


</script>

<style scoped>
.fontClass{
  margin-left: 2%;
  color:#666;
  font-size: 15px;
}
.rightContent{
  position: relative;
  height: 92%;
  width: 100%;
  background: #f4f5f7;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
}
.rightTop{
  line-height: 35px;
  width: 100%;
  height: 5%;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
}

.bg{
  position: absolute;
  height: 104vh;
  width: 100vw;
  background-image: url("../../../../assets/chatBg.png");
}

.boxWarp {
  position: absolute;
  left: 15%;
  height: 100vh;
  width: 70vw;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
}
.boxLeft{
  color: #666;
  float: left;
  height: 104%;
  border-radius: 4px;
  width: 140px;
  min-width: 140px;
  background-color: rgba(255,255,255,0.8);
}
.boxRight{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
 /* background:rebeccapurple;*/
  float: right;
  position: absolute;
  top: 8%;
  left: 13%;
  width: 85%;
  height: 92%;
  border-radius: 4px;
}
.titleWarp{
  /*background: #80b9f2;*/
  height: 50%;
}
.ltzx{
 /* background: #7f7f8b;*/
  height: 35%;
}
.ltContent{
  color: #333;
  font-weight: 600;
  /*background-color: #1677ff;*/
  top: 10%;
  left: 1%;
  position: absolute;
  width: 13%;
 display: flex;
}
img{
  width: 100%;
  height: 100%;
}
.fj{
  height: 25px;
  width: 25px;
}
.titleFont{
  font-size: 18px;
  margin-left: 10%;
}
.list{

}

.item{
  height: 40px;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  color: #6b757b;
}



li {
  cursor: pointer;
  list-style-type: disc;
  font-size: 18px;
}
li:hover{
  color: #2faee3;
}

.bgc{
  color: #2faee3;
}












.box {
  position: relative;
  height: 80vh;
  width: 80vw;
  border-radius: 4px;
  margin: 50px auto;
  background: #f4f5f7;
  box-shadow: 0 2px 4px 0 rgba(121,146,185,0.54);
}


.lt {
  position: absolute;
  width: 80%;
  bottom: 0;
}

.chatButton {
  position: absolute;
  bottom: 6px;
  right: 7px;
}


.scroll{
  overflow-y: scroll;
  position: relative;
  height: 63vh;
}

.left{
  float: left;
  background: red;
  width: 20%;
  height: 100%;
  border-radius: 4px;
}

.right{
  float: right;
  width: 80%;
  border-radius: 4px;
}

.icon-car-count {
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  left: 6.5%;
  top: 37.7%;
  background: red;
  color: #fff;
  padding: 0 .5em;
  min-width: 15px;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  border-radius: 50%;
  transform: scale(.7);
  font-family: tahoma!important;
}
.icon-car-count2{
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  left: 6.5%;
  top: 30.7%;
  background: red;
  color: #fff;
  padding: 0 .5em;
  min-width: 15px;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  border-radius: 50%;
  transform: scale(.7);
  font-family: tahoma!important;
}

</style>
