
<template>
  <div id="nPlayer" ref="nPlayer">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Player from 'nplayer'
const play = new Player({src: 'https://v-cdn.zjol.com.cn/280443.mp4',});
play.mount('#nPlayer')

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
