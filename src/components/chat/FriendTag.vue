<template>
  <div class="friendBox" @click="getFriendId">
    <div v-if="unReadSize">
      <div class="icon-car-count" >{{unReadSize}}</div>
    </div>
    <div class="img">
      <a-avatar  :size="50">
        <template #icon>
          <UserOutlined/>
        </template>
      </a-avatar>
      <div class="nameClass">
        {{props.friend.username}}
      </div>
    </div>
    <div class="newMessage">最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息最近的消息</div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref,watch} from "vue";



const props = defineProps(["friend","unRead","currentSendMessage"])
const unReadSize = ref(0);

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
  //最初的时候显示有多少聊天记录
  if(value.unRead){
    getUnReadSize()
  }
  // alert(1)
  // console.log('watch------->',value.unRead,oldValue)
  // getUnReadSize();
},{immediate : true,deep : true})

const getUnReadSize = () => {
  let size = 0;
  props.unRead.forEach(item=>{
    console.log('接收方---》',item.acceptUserId )
    console.log('聊天对象的id---》',props.friend.id )
     if(item.sendUserId == props.friend.id){
       size++
     }
  })
  unReadSize.value = size;
}


const emits = defineEmits(["getFriendId"]);
const getFriendId = () => {
  emits('getFriendId', props.friend.id,unReadSize.value)
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
  border-radius: 4px;
}

.friendBox:hover {
  background: #C0C0C0;
}
.img{
  position: absolute;
  top: 20%;
  left: 6%;
}
.nameClass{
  position: absolute;
  top: 7%;
  left: 128%;
  color: #333;
  font-size: 17px;
  min-height: 16px;
  line-height: 1;
}
.newMessage{
  position: absolute;
  font-size: 12px;
  top: 52%;
  left: 36%;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-car-count {
  box-sizing: border-box;
  text-align: center;
  position: absolute;
  left: 49px;
  top: -1px;
  background: red;
  color: #fff;
  border-radius: 999px;
  padding: 0 .5em;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  transform: scale(.7);
  font-family: tahoma!important;
}

</style>
