<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
      :collapse="!app.sidebarOpened"
      :default-active="activeMenu"
      :uniqueOpened="true"
      :background-color=" '#304156' "
      :text-color="'#bfcbd9'"
      :active-text-color=" '#ffffff' "
      :unique-opened="false"
      router
  >
    <sidebar-item
        v-for="item in routes"
        :key="item.path"
        :route="item"
    ></sidebar-item>
  </el-menu>
</template>
<script setup>
import {computed} from "vue";
import {useRouter, useRoute} from "vue-router";
import {filterRouters, generateMenus} from "../../../utils/route.js";
import SidebarItem from "./SidebarItem.vue";
import {useApp} from "@/store/modules/app.ts";
const app = useApp();
const router = useRouter();
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  console.log('el-menu--->', generateMenus(filterRoutes))
  return generateMenus(filterRoutes);
});
console.log("routes111==", routes)
// 计算高亮 menu 的方法
const route = useRoute();
const activeMenu = computed(() => {
  const {path} = route;
  console.log('activeMenu-->',path)
  return path;
});
</script>
