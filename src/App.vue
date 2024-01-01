
<template>
  <router-view />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {UserControllerService} from "../generated";
import {useUserStore} from "./store/user.ts";
import {useRoute} from "vue-router";
const userStore = useUserStore();


onMounted(async ()=>{
 const res = await UserControllerService.getLoginUserUsingGet()
  console.log('App onMounted----->',res)
  await userStore.setUser(res.data)
})
</script>

<style scoped>

</style>
