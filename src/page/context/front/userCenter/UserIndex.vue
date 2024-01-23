
<template>
<div class="content">
  <div class="left">
   <div class="top">
     <div class="grFont">
       个人中心
     </div>
   </div>

    <a-menu
        class="menu"
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 256px"
        mode="inline"
        :items="items"
        @click="handleClick"
    ></a-menu>

  </div>
  <div class="right">
    <div class="top">
         <div class="l">
         </div>
      <div class="rightTitle">
         {{route.name}}
      </div>
    </div>
    <div class="rightContent">
       <RouterView/>
    </div>
  </div>

</div>
  <div style="height: 100px"></div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, VueElement, h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import type { MenuProps, ItemType } from 'ant-design-vue';
import {useRoute, useRouter} from "vue-router";
const router = useRouter();
const selectedKeys = ref<string[]>(['0']);
const openKeys = ref<string[]>(['sub1']);
const route = useRoute();
function getItem(
    label: VueElement | string,
    key: string,
    icon?: any,
    children?: ItemType[],
    type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem('我的信息', '0', h(AppstoreOutlined)),
  getItem('我的收藏', '1', h(AppstoreOutlined)),
  getItem('修改密码', '2', h(AppstoreOutlined)),
  getItem('我的订单', '3', h(AppstoreOutlined)),
  getItem('我的影视', '4', h(AppstoreOutlined)),
]);

const handleClick: MenuProps['onClick'] = e => {
  console.log(route.name)
  switch (Number(e.key)){
    case 0 :
      router.push({
        path:'/layout/account'
      })
          return;
    case 1:
      router.push({
        path:'/layout/account/favour'
      })
      return;
    case 2:
      router.push({
        path:'/layout/account/upPass'
      })
      return;
    case 3:
      router.push({
        path:'/layout/account/myOrder'
      })
      return;
    case 4:
      router.push({
        path:'/layout/account/movie'
      })
      return;
  }
  console.log('click', e.key);
};

watch(openKeys, val => {
  console.log('openKeys', val);
});


</script>


<style scoped>
.rightContent{
  padding: 20px 20px 0;
  position: relative;
}


.menu{
  position: absolute;
  background: transparent;
}
.l{
  float: left;
  width: 4px;
  height: 16px;
  margin-top: 18px;
  background-color: #00a1d6;
  border-radius: 4px;
}

.left{
  position: relative;
  background: transparent;
  float: left;
  width: 15%;
  height: 100%;
  border-radius: 4px;
}
.grFont{
  margin-left: 10%;
  font-size: 18px;
  line-height: 50px;
}


.top{
  border-radius: 4px;
  height: 50px;
  padding-left: 30px;
  border-bottom: 1px solid #ddd;
}
.right{
  position: relative;
  background-color: white;
  float: left;
  width: 85%;
  height: 100%;
  border-radius: 4px;
}
.rightTitle{
  position: absolute;
  left: 5%;
  line-height: 50px;
  font-size: 18px;
}


.content {
  margin-top: 8%;
  height: 80vh;
  margin-left: 15%;
  width: 68vw;
  border: 1px solid #e1e2e5;
  box-shadow: 0 2px 4px rgba(0,0,0,.14);
  background: #fafafa;
  border-radius: 4px;
  font: 12px/1.5 Microsoft YaHei,tahoma,"\5B8B\4F53",sans-serif;
  color: #717171;
  font-size: 12px;
  font-family: MicrosoftYaHei;
}
</style>