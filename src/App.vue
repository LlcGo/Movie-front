
<template>
  <router-view />
</template>

<script setup lang="ts">
import {onMounted, provide, ref} from "vue";
import {UserControllerService} from "../generated";
import {useUserStore} from "./store/user.ts";
import {useRoute} from "vue-router";
const userStore = useUserStore();
const user = ref();

onMounted(async ()=>{
  const res = await userStore.setUser()
  console.log('App onMounted----->',res)
  user.value = res
})

provide('currentUser', user.value)
</script>

<style scoped>

</style>
