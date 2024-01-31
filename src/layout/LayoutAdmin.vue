<template>
  <div class="app-wrapper"
       :class="[app.sidebarOpened ? 'openSidebar' : 'hideSidebar' ]">
    <!-- 左侧 menu -->
    <sidebar
        id="guide-sidebar"
        class="sidebar-container"
        :style="{ backgroundColor: '#304156' }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar/>
        <!-- tags -->
        <tags-view></tags-view>
      </div>
      <!-- 内容区 -->
      <app-main/>
    </div>
  </div>
</template>

<script setup>
// import {} from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import TagsView from '../components/TagsView/index.vue'
import {useApp} from "@/store/modules/app.ts";
import {onMounted} from "vue";
import {UserControllerService} from "../../generated/index.ts";
import {useRouter} from "vue-router";
const app = useApp();
const router = useRouter();
onMounted(()=>{
  getLoginUser()
})
const getLoginUser =async () =>{
 const res = await UserControllerService.getLoginUserUsingGet();
 console.log('getLoginUser',res);
 if(res.data == null){
   router.push("/isAdmin/Login")
 }
 if(res.data.userRole !== 'admin'){
   router.push("/isAdmin/Login")
 }
}

</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';
@import '../styles/variables.module.scss';


.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
