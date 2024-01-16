<template>
  <div id="nPlayer" ref="nPlayer" />
</template>


<script setup lang="ts">
import Player from 'nplayer'
import Danmaku from "@nplayer/danmaku";
import {onMounted} from "vue";

onMounted(()=>{
  nPlayer()
})
  const nPlayer = () => {
  const danmakuOptions = {
  items: [
      { time: 5, text: '弹幕1～', color: '#FE0302' },
      { time: 10, text: '是我是我', color: '#75ffcd' },
      { time: 17, text: '弹幕2～', color: '#A0EE00' },
      { time: 18, text: '弹幕3～', color: '#019899' },
      { time: 20, text: '弹幕4～', color: '#CC0273' }
  ]
}
  const player = new Player({
  src: 'https://mpv.videocc.net/e785b2c81c/5/e785b2c81c9e018296671a1287e99615_2.mp4', // 视频地址
  contextMenus: ['loop', 'pip'], // 右键菜单设置项
  plugins: [new Danmaku(danmakuOptions)] // 弹幕配置项
  // controls: [['play', 'progress', 'time', 'web-fullscreen', 'fullscreen'], [], ['spacer', 'settings']]
})
  player.mount('#nPlayer')
  // 链接服务器
  // var ws = new WebSocket('ws://10.10.8.223:9283/lbh')
  // ws.onopen = function () {
  //   console.log('数据发送中...')
  // }
  // ws.onmessage = function (e) {
  //   this.isMeDanmu = e.data
  //   console.log('接受到消息:' + e.data)
  // }
  // ws.onclose = function () {
  //   console.log('连接已关闭...')
  // }
  // function sendMsg(msg) {
  //   ws.send(msg)
  // }
  // player.on('DanmakuSend', opts => {
  // sendMsg(opts)
  // console.log('用户当前发送的弹幕信息', opts)
}

</script>

<style scoped>
</style>
