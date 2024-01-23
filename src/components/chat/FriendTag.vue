<template>
  <div  ref="friendCs" class="friendBox" >
    <div v-if="unReadSize">
      <div class="icon-car-count" >{{unReadSize}}</div>
    </div>
    <div class="img">
      <a-popconfirm
          title="确认删除该聊天框?"
          ok-text="是"
          cancel-text="否"
          @confirm="toDelete">
        <a-avatar :size="40">
          <template #icon>

          </template>
        </a-avatar>
      </a-popconfirm>

      <div class="nameClass" @click="getFriendId">
        {{props.friend.nickname}}
      </div>
    </div >
    <div @click="getFriendId" class="newMessage">最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息</div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref,watch} from "vue";
import {RecentChatControllerService} from "../../../generated";
import {unReadStore} from "../../store/unRead.ts";

const props = defineProps(["friend","unRead","currentSendMessage"])
const unReadSize = ref(0);
const friendCs = ref();
const unread = unReadStore()
onMounted(()=>{
  console.log('左侧好友框子--->',props.unRead)
  // getUnReadSize()
})


watch(props,(value, oldValue, onCleanup) => {
  //监听消息，如果当前的聊天框不是现在的聊天框那么+1
  if(props.currentSendMessage){
    console.log('接收到的消息----》',props.currentSendMessage.sendUserId)
    console.log('当前的接收方用户id',props.friend.id)
    if(props.currentSendMessage.sendUserId == props.friend.id){
      // alert('接受到对方消息'+ JSON.stringify(unReadSize.value) )
      unReadSize.value++
      // alert('修改之后'+ JSON.stringify(unReadSize.value) )
    }
    return;
  }
  console.log('watch--->',props)
  //最初的时候显示有多少聊天记录
  if(value.unRead){
    getUnReadSize()
  }
  // alert(1)
  // console.log('watch------->',value.unRead,oldValue)
  // getUnReadSize();
},)

const getUnReadSize = () => {
  let size = 0;
  props.unRead.forEach( item=>{
    console.log('接收方---》',item.acceptUserId )
    console.log('聊天对象的id---》',props.friend.id )
     if(item.sendUserId == props.friend.id){
       size++
     }
  })
  unReadSize.value = size;
}

//删除该聊天框
const toDelete = async () => {
  const res = await RecentChatControllerService.deleteRecentChatUsingGet(props.friend.id)
  if(res.data){
    emits('getFriendId', props.friend.id,unReadSize.value,true)
  }
}

const emits = defineEmits(["getFriendId"]);
const getFriendId = () => {
  emits('getFriendId', props.friend.id,unReadSize.value,false)
  unread.redSize(unReadSize.value)
  unread.setTotal()
  unReadSize.value = 0;
  // alert('点击之后'+ JSON.stringify(unReadSize.value) )
};



</script>

<style scoped>


.friendBox{
  cursor:pointer;
  position: relative;
  background: white;
  height: 78px;
  border-right: 1px solid #e9eaec;
}

.friendBox:hover {
  background: #e4e5e6;
}

.img{
  position: absolute;
  top: 20%;
  left: 10%;
}
.nameClass{
  position: absolute;
  top: 7%;
  left: 128%;
  color: #333;
  font-size: 14px;
  min-height: 16px;
  width: 100px;
  line-height: 1;
}
.newMessage{
  position: absolute;
  font-size: 12px;
  color: #999;
  top: 52%;
  left: 35%;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-car-count {
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  left: 46px;
  top: 2px;
  background: red;
  color: #fff;
  padding: 0 .5em;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  border-radius: 50%;
  transform: scale(.7);
  font-family: tahoma!important;
}

</style>
