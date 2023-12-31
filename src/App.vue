
<template>
  <router-view />
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {UserControllerService} from "../generated";
import {useUserStore} from "./store/user.ts";
const userStore = useUserStore();
onMounted(async ()=>{
 const res = await UserControllerService.getLoginUserUsingGet()
  userStore.setUser(res.data)
})
</script>

<style scoped>

</style>
