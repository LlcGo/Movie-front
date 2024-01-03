<template>
  <div class="box">

  <div class="left">
    <div v-for="friend in myFriends">
      <FriendTag :friend="friend" :unRead="unRead" :currentSendMessage="currentSendMessage"  @getFriendId="currentAccptUserId"  />
    </div>

  </div>
  <div class="right">

      <div class="lt">
        <a-textarea
            :auto-size="{ minRows: 5, maxRows: 10 }"
            v-model:value="currentChatMsg"/>
      </div>
    <!--        占位-->
    <div style="top: 0;position: relative; height: 2%"></div>
      <div class="scroll" ref="scrollRef">

        <!--      <div v-if="flag">-->
        <div v-for="item in chats">
          <!--      如果当前的id是自己的id就再右边-->
          <div v-if="item.sendUserId == currentUser.id">
            <MyChat :msg="item.msg"/>
          </div>
          <!--      如果当前的id是不是自己的id就再右边-->
          <div v-if="item.sendUserId !== currentUser.id">
            <OtherChat :msg="item.msg"/>
          </div>
        </div>

      </div>


      <a-button class="chatButton" type="primary" @click="sendMessage()">发送</a-button>

    </div>
  </div>

</template>

<script setup lang="ts">
import {inject, nextTick, onMounted, reactive, ref, watchEffect} from "vue";
import {useUserStore} from "../../store/user.ts";
import {storeToRefs} from "pinia";

import {ChatMsg} from "../../../generated/models/ChatMsg.ts";
import MyChat from "../../components/chat/MyChat.vue";
import OtherChat from "../../components/chat/OtherChat.vue";
import {ChatControllerService, FriendsControllerService} from "../../../generated";
import {DataContent} from "../../service/DataContent.ts";
import FriendTag from "../../components/chat/FriendTag.vue";
import {message} from "ant-design-vue";
import {watch} from "fs";
import {state} from "vue-tsc/out/shared";

//store
// const useStore = useUserStore()
// const { currentUser } = storeToRefs(useStore)
//当前发送的信息
const currentChatMsg = ref();
//聊天信息
const chats = ref<Array<ChatMsg>>([]);
//与谁聊天
const currentOtherUserId = ref();
//我所有的朋友
const myFriends = ref();
//当前用户
const currentUser = ref(JSON.parse(sessionStorage.getItem('user')))
//未读的信息
const unRead = ref();
let currentSendMessage = ref();
//封装的websocket信息
//CONNECT(1, "第一次(或重连)初始化连接"),
//CHAT(2, "聊天消息"),
//SIGNED(3, "消息签收"),
//KEEPALIVE(4, "客户端保持心跳"),
//PULL_FRIEND(5, "拉取好友");
// const chat = reactive<DataContent>({
//   action: 1,
//   chatMsg: undefined,
//   extand: '',
// })
// //unsign(0, "未签收"),
// //signed(1, "已签收");
// const chatMsg = reactive<ChatMsg>({
//   sendUserId: '',
//   acceptUserId: '',
//   msg: '',
//   signFlag : 0,
// })


// 创建WebSocket连接
const socket = new WebSocket('ws://localhost:7530/chat');
const user = inject('currentUser')
const scrollRef = ref();
onMounted( async () => {
  // window.addEventListener('scroll', handleScroll, true);  // 监听（绑定）滚轮滚动事件
  await getFriends()
  await init();
  await initConnect();
  refreshScroll()

})



// const handleScroll = () => {
//   // console.log(scrollRef.value.scrollTop, '到头部的距离-------------------')
//   // console.log(scrollRef.value.scrollHeight, '滚动条的总高度-------------------')
// }

// watch(chats.value, () => {
//   refresh()
// }, {immediate: true, deep: true})

// watch(() => chats.value,() => {
//   refresh()
//   console.log('监听的obj.brand.name改变了')
// },{
//   deep:true,
//   immediate:true,
// })
const refreshScroll = () => {
  setTimeout(() => {
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight
  })
}

//获取朋友信息
const getFriends = async () =>{
  console.log('user--->',currentUser)
  console.log('mount',user)
  console.log('聊天对象的id--->',currentOtherUserId.value)
  // alert(currentUser.value)
  myFriends.value =[];
  const res = await FriendsControllerService.getMyFriendsUsingGet(currentUser.value.id);
  if(res.code == 0){
    myFriends.value = res.data
  }else {
    message.warn(res.message);
  }
  console.log('伙伴----》',myFriends.value)
  currentOtherUserId.value = myFriends.value[0].id;
}



//初始化聊天信息
const init = async () => {
  const res = await ChatControllerService.getChatUsingGet(currentOtherUserId.value,currentUser.value.id);
  // chats.value = res.data.
  if(res.data){
    chats.value = [];
    let msg : Array<ChatMsg> = res.data;
    console.log('现在的数据--->',msg.length)
    msg.forEach((item)=> {
      chats.value.unshift(item)
    })
    console.log('存入的数据----->',chats.value)
  }
  console.log('返回的数据----->',res.data)
  refreshScroll()
}

//获得当前聊天对象id 并且清空 所有未读消息
const currentAccptUserId = async (id:any,unReadSize:any) => {
  console.log('当前用户id',currentUser.value.id)
  currentOtherUserId.value = id
  console.log('对方用户id',currentOtherUserId.value)
  // alert(unReadSize)
  if(unReadSize > 0){
    //otherUserId: string,userId: string,
    const res =  await ChatControllerService.readMessageUsingGet(currentOtherUserId.value,currentUser.value.id)
    console.log('清除聊天记录---》',res)
  }
  setCurrent()
  init()
}

//连接websocket
const initConnect = () => {
  let sendMsg = {
    sendUserId: currentUser.value.id,
    acceptUserId: currentOtherUserId.value,
    msg: '',
    signFlag : 0,
  }
  let sendChat = {
    action: 1,
    chatMsg: sendMsg,
    extand: currentUser.value.id + ":" + currentOtherUserId.value,
  }
  socket.send(JSON.stringify(sendChat))
}

const setCurrent = () => {
  let sendMsg = {
    sendUserId: currentUser.value.id,
    acceptUserId: currentOtherUserId.value,
    msg: '',
    signFlag : 0,
  }
  let sendChat = {
    action: 3,
    chatMsg: sendMsg,
    extand: currentUser.value.id + ":" + currentOtherUserId.value,
  }
  socket.send(JSON.stringify(sendChat))
}






socket.onopen = function() {
  console.log('WebSocket连接已建立');
};

const write =(sendMsg:any)=>{
  chats.value.push(sendMsg);
  console.log('push--->',chats.value)
}

const getSendMessgae = () => {
  let sendMsg = {
    sendUserId: currentUser.value.id,
    acceptUserId: currentOtherUserId.value,
    msg: currentChatMsg.value,
    signFlag : 0,
  }
  let sendChat = {
    action: 2,
    chatMsg: sendMsg,
    extand: '',
  }
  return sendChat;
}

const sendMessage =() => {
  // console.log('输入的消息---->',currentChatMsg.value)
  // console.log('当前用户id---->',currentUser.value.id)
  // console.log('对方用户id---->',currentOtherUserId.value)
  const sendChat = getSendMessgae();
  // 向服务器发送消息
  console.log('发送的消息---》',sendChat)
  socket.send(JSON.stringify(sendChat));
  let send = {
    acceptUserId: currentOtherUserId.value,
    createTime: new Date(),
    id:"",
    msg:currentChatMsg.value,
    sendUserId:currentUser.value.id,
    signFlag:0
  }
  currentChatMsg.value = '';
  write(send)
  refreshScroll()
}



// 监听接收到服务器消息的事件
socket.onmessage = function(event) {
  const message = event.data;

  let rMsg = JSON.parse(message);
  console.log('接收到服务器消息:', rMsg);
  console.log('当前用户id:', currentUser.value.id);
  console.log('标记消息为',rMsg.action)
  if(rMsg.action == 6){
    unRead.value = rMsg.chatMsgList
    console.log('未读的信息',unRead.value)
    return;
  }
  //如果是当前界面就直接显示
  let send = {
    acceptUserId:rMsg.chatMsg.acceptUserId,
    createTime: new Date(),
    id:"",
    msg:rMsg.chatMsg.msg,
    sendUserId: rMsg.chatMsg.sendUserId,
    signFlag:0
  }
  if(rMsg.chatMsg.sendUserId == currentOtherUserId.value){
    write(send)
    refreshScroll()
  }else {
    //如果不是当前界面就给相对的用户id对于的框子+1聊天信息
    currentSendMessage.value = send
  }
};

// 监听连接关闭事件
socket.onclose = function() {
  console.log('WebSocket连接已关闭');
};

// 监听连接错误事件
socket.onerror = function(error) {
  console.error('WebSocket连接错误:', error);
};

</script>

<style scoped>


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


</style>
