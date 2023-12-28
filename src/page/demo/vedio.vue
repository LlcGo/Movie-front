
<template>
  <div>
    <NPlayer
        :options="{ src: 'http://localhost:7529/uploads/meeting_01.mp4' }"
    />
  </div>
</template>


<script setup lang="ts">
import {onMounted} from "vue";

let player = null;
onMounted(() => {
  console.log(player);
});

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
