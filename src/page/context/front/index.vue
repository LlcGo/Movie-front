
<template>
  <div class="big">
    <div class="context">
      6666
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
.big{
  margin: 0 auto;
  position: absolute;
  top: 19%;
  left: 5%;
  height: 1600px;
  width: 90vw;
  background-color: red;
}
.context{
  background-color: blue;
  height: 40px;
}
</style>
