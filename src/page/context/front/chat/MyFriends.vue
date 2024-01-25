
<template>
  <a-list
      class="demo-loadmore-list friendScroll"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="myFriends"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a key="list-loadmore-edit" @click="toDelete(item)">删除好友</a>
          <a key="list-loadmore-more" @click="toChat(item)">聊天</a>
        </template>
        <a-skeleton avatar :title="false" :loading="false" active>
<!--          签名内容-->
          <a-list-item-meta :description="item?.signature ? item?.signature : '此人暂无个性签名'">
            <template #title>
<!--              名字-->
              <a href="https://www.antdv.com/">{{ item.nickname }}</a>
            </template>
            <template #avatar>
              <a-avatar >
                <template #icon>
                  <img :src="item?.faceImage">
                </template>
              </a-avatar>
            </template>
          </a-list-item-meta>
<!--          <div>content</div>-->
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {FriendsControllerService, RecentChatControllerService, UserControllerService} from "../../../../../generated";
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";
import socket from "../../../../utils/websocket.ts";
import {MessageUtils} from "../../../../utils/websocketUtils.ts";
const count = 3;
const currentUser = ref();
const initLoading = ref(true);
const loading = ref(false);
const myFriends = ref([]);
const router = useRouter();
onMounted(() => {
  getFriends()
});

const toDelete = async (item : any) => {
      const res = await FriendsControllerService.deleteMyFriendUsingPost(item.id);
      if(res.data){
        message.success('删除好友成功')
        getFriends()
      }

}

const getFriends = async () =>{
  loading.value = true;
  const res1 = await UserControllerService.getLoginUserUsingGet()
  currentUser.value = res1.data;
  const res = await FriendsControllerService.getMyFriendsUsingGet(currentUser.value.id);
  if(res.code === 0){
    res.data?.forEach(item => {
      myFriends.value.push(item.otherUsers)
    })
  }
  console.log(myFriends.value)
  loading.value = false;
  initLoading.value = false
}

//去聊天
const toChat = async (item:any) => {
   await RecentChatControllerService.addRecentChatUsingPost(item.id)
   MessageUtils.setCurrent(currentUser.value.id,item.id)
   router.push({
     path:'/layout/chat',
     query : {
       currentFriend:item
     }
   })
}

</script>

<style scoped>
.friendScroll{
  overflow-y: scroll;
  position: relative;
  height: 100%;
}
</style>