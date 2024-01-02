<template>
  <div class="box">

    <div class="lt">
      <a-textarea
          :auto-size="{ minRows: 5, maxRows: 10 }"
          v-model:value="currentChatMsg"/>
    </div>

<!--    <div class="scroll">-->
<!--      <div class="myContain">-->
<!--        <div class="myChat">-->
<!--          <a-avatar class="my" size="large">-->
<!--            <template #icon>-->
<!--              <UserOutlined/>-->
<!--            </template>-->
<!--          </a-avatar>-->
<!--          <div class="ll">-->
<!--            6666666666-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

    <div class="scroll">
      <div style="top: 0px;
    position: relative;
    height: 51px;"></div>
<!--      <div v-if="flag">-->
        <div v-for="item in chats">
          <!--      如果当前的id是自己的id就再右边-->
          <div v-if="item.sendUserId == '1741461358159978498'">
            <MyChat :msg="item.msg"/>
          </div>
          <!--      如果当前的id是不是自己的id就再右边-->
          <div v-if="item.sendUserId !== '1741461358159978498'">
            <OtherChat :msg="item.msg"/>
          </div>
        </div>
      </div>
<!--    </div>-->

    <a-button class="chatButton" type="primary" @click="sendMessage()">发送</a-button>
  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useUserStore} from "../../store/user.ts";
import {storeToRefs} from "pinia";

import {ChatMsg} from "../../../generated/models/ChatMsg.ts";
import MyChat from "../../components/chat/MyChat.vue";
import OtherChat from "../../components/chat/OtherChat.vue";
import {ChatControllerService} from "../../../generated";
import {DataContent} from "../../service/DataContent.ts";

const useStore = useUserStore()
const { currentUser } = storeToRefs(useStore)
const currentChatMsg = ref();
const chats = ref<Array<ChatMsg>>([]);
//CONNECT(1, "第一次(或重连)初始化连接"),
//CHAT(2, "聊天消息"),
//SIGNED(3, "消息签收"),
//KEEPALIVE(4, "客户端保持心跳"),
//PULL_FRIEND(5, "拉取好友");
const chat = reactive<DataContent>({
  action: 2,
  chatMsg: undefined,
  extand: '',
})

//unsign(0, "未签收"),
//signed(1, "已签收");
const chatMsg = reactive<ChatMsg>({
  sendUserId: '',
  acceptUserId: '1741461358159978498',
  msg: '',
  signFlag : 0,
})
// 创建WebSocket连接
const socket = new WebSocket('ws://localhost:7530/chat');
const context = ref();
onMounted( async () => {
  console.log('Chat---->',currentUser.value);
  await init();
  initConnect();
})

const initConnect = () => {
  let sendMsg = {
    sendUserId: '1741461358159978498',
    acceptUserId: '',
    msg: '',
    signFlag : 0,
  }
  let sendChat = {
    action: 1,
    chatMsg: sendMsg,
    extand: '',
  }
  socket.send(JSON.stringify(sendChat))
}
const init = async () => {
  const res = await ChatControllerService.getChatUsingGet('1741446004448710657','1741461358159978498');
  // chats.value = res.data.
  if(res.data){
    chats.value = [];
    let msg : Array<ChatMsg> = res.data;
    console.log('现在的数据--->',msg.length)
    msg.forEach((item)=> {
      chats.value.push(item)
    })
    console.log('存入的数据----->',chats.value)
  }
  console.log('返回的数据----->',res.data)
}

// 建立连接事件
socket.onopen = function() {
  console.log('WebSocket连接已建立');
};

const write =(sendMsg:any)=>{
  chats.value.unshift(sendMsg);
  console.log('push--->',chats.value)
}

const sendMessage =() => {
  console.log('输入的消息---->',currentChatMsg.value)
  chatMsg.msg = currentChatMsg.value;
  chat.chatMsg = chatMsg;
  let sendMsg = {
    sendUserId: '1741461358159978498',
    acceptUserId: '1741446004448710657',
    msg: currentChatMsg.value,
    signFlag : 0,
  }
  let sendChat = {
    action: 2,
    chatMsg: sendMsg,
    extand: '',
  }
  // 向服务器发送消息
  console.log('发送的消息---》',sendChat)
  socket.send(JSON.stringify(sendChat));
  let send = {
    acceptUserId:"1741755987040161794",
    createTime: new Date(),
    id:"1741461358159978498",
    msg:currentChatMsg.value,
    sendUserId:"1741461358159978498",
    signFlag:0
  }
  currentChatMsg.value = '';
  write(send)
}


// 监听接收到服务器消息的事件
socket.onmessage = function(event) {
  const message = event.data;

  let rMsg = JSON.parse(message);
  console.log('接收到服务器消息:', rMsg);
  if(rMsg.chatMsg.sendUserId != '1741461358159978498'){
    let send = {
      acceptUserId:rMsg.chatMsg.acceptUserId,
      createTime: new Date(),
      id:"1741755987040161794",
      msg:rMsg.chatMsg.msg,
      sendUserId: rMsg.chatMsg.sendUserId,
      signFlag:0
    }
    write(send)
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
  background: aliceblue;
  margin: 50px auto;
}

.lt {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.chatButton {
  position: absolute;
  bottom: 6px;
  right: 7px;
}


.scroll{
  overflow-y: auto;
  position: relative;
  height: 80%;
  width: 80vw;
  display: flex;
  flex-direction: column-reverse;
}
</style>
