
<template>
  <div class="left">
    <div class="leftTop">
       <div class="topTitle">
         最近消息
       </div>
    </div>
    <div class="leftContent">
      <div v-for="friend in myFriends">
<!--        根据id设置背景色-->
        <FriendTag :class="{bc : friend.id == currentOtherUserId}"
                   :friend="friend"
                   :unRead="unRead"
                   :currentSendMessage="currentSendMessage"
                   @getFriendId="currentAccptUserId"
        />
      </div>
    </div>
  </div>
  <div class="right">
   <div class="rightTop">
      <div>人名</div>
   </div>
    <div class="rightContent">
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
import {onMounted, ref} from "vue";
import {ChatMsg} from "../../../../../generated/models/ChatMsg.ts";
import MyChat from "../../../../components/chat/MyChat.vue";
import OtherChat from "../../../../components/chat/OtherChat.vue";
import {ChatControllerService, FriendsControllerService, UserControllerService} from "../../../../../generated";
import FriendTag from "../../../../components/chat/FriendTag.vue";
import {message} from "ant-design-vue";
import socket from "../../../../utils/websocket.ts";
import ACTION from "../../../typeEnum/chatType/SednActionEnum.ts";
import {SendChat} from "../../../typeEnum/chatType/SendChat.ts";
import {chatMsg} from "../../../typeEnum/chatType/chatMsg.ts";


const currentChatMsg = ref();
//聊天信息
const chats = ref<Array<ChatMsg>>([]);
//与谁聊天
const currentOtherUserId = ref();
//我所有的朋友
const myFriends = ref();
//当前用户
const currentUser = ref()
//未读的信息
const unRead = ref();
//页面显示发送的消息
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



const scrollRef = ref();
onMounted( async () => {
  await getCurrentUser()
  // window.addEventListener('scroll', handleScroll, true);  // 监听（绑定）滚轮滚动事件
  await getFriends()
  await init();
  await initConnect();
  refreshScroll()
})


//获取当前用户 可以删除
const getCurrentUser = async () => {
  const res =await UserControllerService.getLoginUserUsingGet()
  currentUser.value = res.data;
}


const refreshScroll = () => {
  setTimeout(() => {
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight
  })
}

//获取朋友信息
const getFriends = async () =>{
  // console.log('user--->',currentUser)
  // console.log('聊天对象的id--->',currentOtherUserId.value)
  // alert(currentUser.value)
  myFriends.value =[];
  const res = await FriendsControllerService.getMyFriendsUsingGet(currentUser.value.id);
  if(res.code == 0){
    myFriends.value = res.data
  }else {
    message.warn(res.message);
  }
  // console.log('伙伴----》',myFriends.value)
  currentOtherUserId.value = myFriends.value[0].id;
}



//初始化聊天信息
const init = async () => {
  const res = await ChatControllerService.getChatUsingGet(currentOtherUserId.value,currentUser.value.id);
  // chats.value = res.data.
  if(res.data){
    chats.value = [];
    let msg : Array<ChatMsg> = res.data;
    // console.log('现在的数据--->',msg.length)
    msg.forEach((item)=> {
      chats.value.unshift(item)
    })
    // console.log('存入的数据----->',chats.value)
  }
  // console.log('返回的数据----->',res.data)
  refreshScroll()
}

//获得当前聊天对象id 并且清空 所有未读消息
const currentAccptUserId = async (id:any,unReadSize:any) => {
  // console.log('当前用户id',currentUser.value.id)
  currentOtherUserId.value = id
  // console.log('对方用户id',currentOtherUserId.value)
  // alert(unReadSize)
  if(unReadSize > 0){
    //设置消息已读
    //otherUserId: string,userId: string,
    const res = await ChatControllerService.readMessageUsingGet(currentOtherUserId.value,currentUser.value.id)
    // console.log('清除聊天记录---》',res)
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
  socket.send(sendChat)
}



const setCurrent = () => {
  let msg : chatMsg= {
    sendUserId: currentUser.value.id,
    acceptUserId: currentOtherUserId.value,
    msg: '',
    signFlag : 0,
  }
  let sendChat : SendChat = {
    action: ACTION.SET_CURRENT_CHAT,
    chatMsg: msg,
    extand: currentUser.value.id + ":" + currentOtherUserId.value,
  }
  socket.send(sendChat)
}


const write =(sendMsg:any)=>{
  chats.value.push(sendMsg);
  console.log('push--->',chats.value)
}


//发送聊天信息 封装
const getSendMessgae = () => {
  let sendMsg = {
    sendUserId: currentUser.value.id,
    acceptUserId: currentOtherUserId.value,
    msg: currentChatMsg.value,
    signFlag : 0,
  }
  return {
    action: ACTION.CHAT,
    chatMsg: sendMsg,
    extand: '',
  };
}

//发送消息


const sendMessage =() => {
  // console.log('输入的消息---->',currentChatMsg.value)
  // console.log('当前用户id---->',currentUser.value.id)
  // console.log('对方用户id---->',currentOtherUserId.value)
  const sendChat = getSendMessgae();
  // 向服务器发送消息
  socket.send(sendChat);
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
socket.websocket.onmessage = function(event:any) {
  const message = event.data;
  let rMsg = JSON.parse(message);
  console.log('接收到服务器消息:', rMsg);
  console.log('当前用户id:', currentUser.value.id);
  // console.log('标记消息为',rMsg.action)
  //如果是未读消息 直接设置唯独属性
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
  //如果是对面的
  if(rMsg.chatMsg.sendUserId == currentOtherUserId.value){
    write(send)
    refreshScroll()
  }else {
    //如果不是当前界面就给相对的用户id对于的框子+1聊天信息
    currentSendMessage.value = send
  }
};



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

</script>


<style scoped>
.bc{
  background:#e4e5e6;
}

.leftContent{
  width: 100%;
  height: 100%;
}
.friendLeftScroll{
  overflow-y: scroll;
  position: relative;
  height: 95%;
}
.topTitle{
  position: absolute;
  line-height: 36px;
  left: 2%;
  font-size: 10px;
  color: #666;
}
.leftTop{
  border-top-left-radius: 6px;
  /*background: #80b9f2;*/
  height: 36px;
  width: 100%;
  border-bottom: 1px solid #e9eaec;
  border-right: 1px solid #e9eaec;
  background: white;
}
.rightTop{
  border-top-right-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  /*background: skyblue;*/
  height: 36px;
  width: 100%;
  color: #333;
  background: white;
  border-bottom: 1px solid #e9eaec;
}
.left{
  float: left;
  width: 20%;
  height: 100%;
  background: #9499a0;
}
.right{
 /* background: #80b9f2;*/
  float: left;
  width: 80%;
  height: 100%;
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

</style>