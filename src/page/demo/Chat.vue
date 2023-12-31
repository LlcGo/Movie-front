<template>
  <div class="box">

    <div class="lt">
      <a-textarea
          :auto-size="{ minRows: 5, maxRows: 10 }"
          v-model:value="chat"/>
    </div>

    <div class="scroll">
      <div class="myContain">
        <div class="myChat">
          <a-avatar class="my" size="large">
            <template #icon>
              <UserOutlined/>
            </template>
          </a-avatar>
          <div class="ll">
            6666666666
          </div>
        </div>
      </div>


      <div class="otherChat">
        <a-avatar class="other" size="large">
          <template #icon>
            <UserOutlined/>
          </template>
        </a-avatar>
        <div class="otherLl">
          6666666666
        </div>
      </div>


      <div class="otherChat">
        <a-avatar class="other" size="large">
          <template #icon>
            <UserOutlined/>
          </template>
        </a-avatar>
        <div class="otherLl">
          {{ context }}
        </div>
      </div>

    </div>


    <a-button class="chatButton" type="primary" @click="sendMessage()">发送</a-button>

  </div>
{{currentUser}}
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useUserStore} from "../../store/user.ts";
import {storeToRefs} from "pinia";

const useStore = useUserStore()
const { currentUser } = storeToRefs(useStore)
const chat = ref()
const socket = new WebSocket('ws://localhost:7530/chat');
const context = ref();
// 创建WebSocket连接

// 建立连接事件
socket.onopen = function() {
  console.log('WebSocket连接已建立');
};

const sendMessage = () => {
  // 向服务器发送消息
  socket.send(chat.value);
}


// 监听接收到服务器消息的事件
socket.onmessage = function(event) {
  const message = event.data;
  console.log('接收到服务器消息:', message);
  context.value = message
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


.myContain {
  position: relative;
  height: 10%;
}

.my {
  position: absolute;
  right: 10px;
  top: 50px
}

.myChat {
  right: 0;
  background: red;
  width: 50%;
  position: absolute;
}

.ll {
  padding: 12px;
  top: 56px;
  position: absolute;
  max-width: 50%;
  right: 58px;
  background: #80b9f2;
  border-radius: 16px 0 16px 16px;
}


.otherChat {
  margin-top: 5%;
  position: relative;
}

.other {
  left: 10px;
}

.otherLl {
  position: absolute;
  top: 3px;
  max-width: 50%;
  left: 57px;
  padding: 12px;
  background: white;
  border-radius: 0 16px 16px 16px;
  word-wrap: break-word;
  word-break: break-word;
}

.scroll{
  overflow-y:scroll;
  position: relative;
  height: 75%;
  width: 80vw;
}
</style>
