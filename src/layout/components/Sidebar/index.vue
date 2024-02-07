<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="logoHeight"
        :src="logo"
      />
      <h1 class="logo-title" v-if="app.sidebarOpened">
        罗罗影视后台
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from "./SidebarMenu.vue";
import {} from "vue";
import {useApp} from "@/store/modules/app.ts";
const app = useApp();
const logoHeight = 50;
import logo from '../../../assets/logo.png'
</script>

<style lang="scss" scoped>
:deep(.el-avatar){
  --el-avatar-bg-color:none
}
.logo-container {
  height: v-bind(logoHeight) + "px";
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
