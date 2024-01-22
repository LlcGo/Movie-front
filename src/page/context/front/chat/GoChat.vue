
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
        <friend-tag :class="{bc : friend.id == currentOtherUserId}"
                   :friend="friend"
                   :unRead="unRead"
                   :currentSendMessage="currentSendMessage"
                   @getFriendId="currentAccptUserId"
        />
      </div>
    </div>
  </div>
  <div class="right">
    <div class="wlClass" v-if="flag">
      <img :src="wl">
      <div class="wlFont">快去找小伙伴聊天吧</div>
    </div>
   <div class="rightTop" v-if="!flag">
      <div>{{currentChatFriend?.nickname}}</div>
   </div>

    <div class="rightContent" v-if="!flag">
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
import {
  ChatControllerService,
  FriendsControllerService,
  RecentChatControllerService,
  UserControllerService, Users
} from "../../../../../generated";
import FriendTag from "../../../../components/chat/FriendTag.vue";
import {message} from "ant-design-vue";
import socket from "../../../../utils/websocket.ts";
import ACTION from "../../../typeEnum/chatType/SednActionEnum.ts";
import {SendChat} from "../../../typeEnum/chatType/SendChat.ts";
import {chatMsg} from "../../../typeEnum/chatType/chatMsg.ts";
import wl from '../../../../assets/wl.png'
import {MessageUtils} from "../../../../utils/websocketUtils.ts";
import {unReadStore} from "../../../../store/unRead.ts";


const flag = ref(false);

const currentChatMsg = ref();
//聊天信息
const chats = ref<Array<ChatMsg>>([]);
//与谁聊天
const currentOtherUserId = ref();
//我所有的朋友的历史聊天记录
const myFriends = ref([]);

const Friends = ref([])
//当前用户
const currentUser = ref()
//未读的信息
const unRead = ref();
//页面显示发送的消息
let currentSendMessage = ref();

//当前在聊天的好友
const currentChatFriend = ref<Users>();
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
const unreadStore =  unReadStore();


const scrollRef = ref();
onMounted( async () => {
 console.log(unreadStore.unReadSize)
  // window.addEventListener('scroll', handleScroll, true);  // 监听（绑定）滚轮滚动事件

  getFriends()
  refreshScroll()
})

//获得当前的朋友
const getCurrentFriend = async () => {
  Friends.value = [];
  const res = await FriendsControllerService.getMyFriendsUsingGet(currentUser.value.id);
  Friends.value = res.data;
  console.log('现在的好友---》',Friends.value)
}
//获取当前用户 可以删除
// const getCurrentUser = async () => {
//   const res =await UserControllerService.getLoginUserUsingGet()
//   currentUser.value = res.data;
// }


const refreshScroll = () => {
  setTimeout(() => {
    scrollRef.value.scrollTop = scrollRef.value.scrollHeight
  })
}



//获取聊天历史的朋友信息 可能有的把你删除了
const getFriends = async () =>{
  const res0 = await UserControllerService.getLoginUserUsingGet();
  currentUser.value = res0.data
  getCurrentFriend();
  // console.log('user--->',currentUser)
  // console.log('聊天对象的id--->',currentOtherUserId.value)
  // alert(currentUser.value)
  myFriends.value =[];
  //获取当前的列表信息
  const res = await RecentChatControllerService.getRecentChatUsingPost()

  if(res.code == 0){
    res.data.forEach(item =>{
      myFriends.value.push(item .recentFriends)
    })
  }else {
    message.warn(res.message);
  }
  // console.log('伙伴----》',myFriends.value)
  if(myFriends.value.length == 0){
    flag.value = true
    return;
  }
  // console.log('现在的好友------------->',myFriends.value)
  currentOtherUserId.value = myFriends.value[0].id;
  console.log( '现在选中的好友------------->',myFriends.value[0])
  currentChatFriend.value = myFriends.value[0];
  if(myFriends.value.length > 0){
    MessageUtils.setCurrent(currentUser.value.id,myFriends.value[0].id)
  }

  //获取朋友信息之后获得聊天信息
  initChat()
}



//初始化聊天信息
const initChat = async () => {
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

  //获取聊天信息之后再连接websocket
  MessageUtils.initConnectAndGetUnRead(currentUser.value.id)
  refreshScroll()
}

//获得当前聊天对象id 并且清空 所有未读消息
const currentAccptUserId = async (id:any,unReadSize:any,isDelete:boolean) => {

  // console.log('当前用户id',currentUser.value.id)
  if(!isDelete){
    currentOtherUserId.value = id
  }else {
    getFriends();
  }
  // console.log('对方用户id',currentOtherUserId.value)
  // alert(unReadSize)
  if(unReadSize > 0){
    //设置消息已读
    //otherUserId: string,userId: string,
    const res = await ChatControllerService.readMessageUsingGet(currentOtherUserId.value,currentUser.value.id)
    // console.log('清除聊天记录---》',res)
  }
  //设置当前聊天对象 到 redis 实现 如果相互都在跟对方聊天就 不用设置离线
  if(!isDelete){
    initChat()
  }
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
  //现在要聊天的对象的id
  currentOtherUserId.value
  //在现在的朋友中查找
  let a = Friends.value.find((item) => item.otherUsers.id == currentOtherUserId.value)
  console.log(a)
  if (!a){
    message.success('对方已不是你的好友');
    return;
  }
  if(a.state == 1){
    message.success('对方已经将您删除');
    return;
  }
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
  // alert('gochat')
  const message = event.data;
  let rMsg = JSON.parse(message);
  console.log('接收到服务器消息:', rMsg);

  // console.log('标记消息为',rMsg.action)
  //如果是未读消息 直接设置唯独属性
  if(rMsg?.action == 6){
    //在线的情况下对方发送了好友请求
    if(rMsg?.extand?.startsWith('对方的好友请求')){
      let a = rMsg.extand.split(":");
      unreadStore.addRequestSize(Number(a[1]))
      unreadStore.setTotal();
      return;
    }

    if(rMsg?.chatMsgList?.length == 0){


      if(rMsg?.extand != null){

        let a = rMsg.extand.split(":");

        if(rMsg.extand.startsWith('messageRequest')){
          //离线
          //  2.未读的请求消息：action 6     chatMsgList为[]   extand "messageRequest"   开头
          unreadStore.addRequestSize(Number(a[1]))
          unreadStore.setTotal();
          return;
        }

        if(rMsg.extand.startsWith('nowMessageRequest')){
          //在线
          //  1.未读取的同意请求：action 6 chatMsgList 为 []   extand "nowMessageRequest"   开头
          // 2.未读取的拒绝请求：action 6 chatMsgList 为 []   extand "nowMessageRequest"   开头
             unreadStore.addRequestSize(Number(a[1]))
             unreadStore.setTotal();
             return;
        }

        unreadStore.addSize(Number(a[1]))
        unreadStore.setTotal();
      }
      unRead.value = [];
    }else {
      //未读消息设置
      unRead.value = rMsg.chatMsgList
    }
    console.log('未读的信息',unRead.value.length)
    return;
  }
  //代表未签收的数据
  if(rMsg.chatMsg.signFlag == 0){
    unreadStore.addSize(1)
    unreadStore.setTotal();
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
.wlFont{
  position: relative;
  left: 35%;
  top: 10%;
  color: #8896b8;;
}
.wlClass{
  height: 300px;
  position: absolute;
  top: 25%;
  left: 35%;
}
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
  background: white;
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