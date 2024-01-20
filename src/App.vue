
<template>
  <router-view />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useUserStore} from "./store/user.ts";
import {useRoute} from "vue-router";
const userStore = useUserStore();
const user = ref();
const route = useRoute();
onMounted(async ()=>{
  console.log(route.path)
  const res = await userStore.setUser()
  console.log('App onMounted----->',res)
  user.value = res
})

</script>

<style scoped>

</style>
