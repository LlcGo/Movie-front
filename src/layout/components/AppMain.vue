<template>
<!--  主要内容路由-->
  <div class="app-main" >
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
<!--        <keep-alive :include="cachedViews">-->
          <component :is="Component" :key="route.name" />
<!--        </keep-alive>-->
      </transition>
    </router-view>
  </div>
</template>


<script setup>

import {watch, computed, ref, onMounted} from 'vue'
import { isTags } from '@/utils/tags'
import { useRoute } from 'vue-router'
import {useApp} from "@/store/modules/app.ts";
const store = useApp();
const route = useRoute()
const cachedViews = computed(() => {
  console.log('666666-->',store.tagsViewList.map((x) => x.name))
  return  store.tagsViewList.map((x) => x.name)
})
const flag = ref(true);
/**
 * 生成 title
 */
const getTitle = route => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = route.meta.title
  }
  return title
}


/**
 * 监听路由变化
 */
watch(
    route,
    (to, from) => {
      // const cachedViews = store.getters.tagsViewList
      // console.log("store.getters.tagsViewList",cachedViews)
      // if (!isTags(to.path)) return
      flag.value = false;
      const { fullPath, meta, name, params, path, query } = to
      console.log('fullPath->',fullPath, 'meta->',meta,'name->', name, params, path, query )
      store.addTagsViewList( {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: getTitle(to)
      })
      flag.value = true;
    },
    {
      immediate: true
    }
)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>


