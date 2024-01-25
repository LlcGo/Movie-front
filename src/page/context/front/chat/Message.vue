<template>
  <a-list
      class="demo-loadmore-list friendScroll"
      :loading="initLoading"
      item-layout="horizontal"
      :data-source="myMessage"
  >
    <template #renderItem="{ item }">
<!--如果是发送方-->
      <div v-if="item.sendUserId == currentUser.id">
        <a-list-item v-if="item.state == 0">
          <a-skeleton avatar :title="false" :loading="false" active>
            <!--          签名内容-->
            <a-list-item-meta :description="item?.signature ? item?.signature : '此人暂无个性签名'">
              <template #title>
                <!--              名字-->
                <a href="https://www.antdv.com/">{{ item.otherUsers.nickname }}</a>
              </template>
              <template #avatar>
                <a-avatar>
                  <template #icon>
                    <img :src="item?.otherUsers?.faceImage">
                  </template>
                </a-avatar>
              </template>
            </a-list-item-meta>
            <div>请求已发送</div>
          </a-skeleton>
        </a-list-item>

        <a-list-item v-if="item.state == 2 || item.state == 4 || item.state == 6">
          <a-skeleton avatar :title="false" :loading="false" active>
            <!--          签名内容-->
            <a-list-item-meta :description="item?.signature ? item?.signature : '此人暂无个性签名'">
              <template #title>
                <!--              名字-->
                <a href="https://www.antdv.com/">{{ item.otherUsers.nickname }}</a>
              </template>
              <template #avatar>
                <a-avatar>
                  <template #icon>
                    <img :src="item?.otherUsers?.faceImage">
                  </template>
                </a-avatar>
              </template>
            </a-list-item-meta>
            <div>对方已接受</div>
          </a-skeleton>
        </a-list-item>

        <a-list-item v-if="item.state == 1 || item.state == 3 || item.state == 5">
          <template #actions>
          </template>
          <a-skeleton avatar :title="false" :loading="false" active>
            <!--          签名内容-->
            <a-list-item-meta :description="item?.signature ? item?.signature : '此人暂无个性签名'">
              <template #title>
                <!--              名字-->
                <a href="https://www.antdv.com/">{{ item.otherUsers.nickname }}</a>
              </template>
              <template #avatar>
                <a-avatar>
                  <template #icon>
                    <img :src="item?.otherUsers?.faceImage">
                  </template>
                </a-avatar>
              </template>
            </a-list-item-meta>
            <div>对方已拒绝</div>
          </a-skeleton>
        </a-list-item>
      </div>


<!--如果是接收方-->
      <div v-if="item.acceptUserId == currentUser.id">
        <a-list-item v-if="item.state == 0">
          <template #actions>
            <a key="list-loadmore-edit" @click="toAgree(item.sendUserId,item.id)">接受</a>
            <a key="list-loadmore-more" @click="toReject(item.id)">拒绝</a>
          </template>
          <a-skeleton avatar :title="false" :loading="false" active>
            <!--          签名内容-->
            <a-list-item-meta :description="item?.signature ? item?.signature : '此人暂无个性签名'">
              <template #title>
                <!--              名字-->
                <a href="https://www.antdv.com/">{{ item.otherUsers.nickname }}</a>
              </template>
              <template #avatar>
                <a-avatar>
                  <template #icon>
                    <img :src="item?.otherUsers?.faceImage">
                  </template>
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-skeleton>
        </a-list-item>



        <a-list-item v-if="item.state == 2 || item.state == 4 || item.state == 6">
          <a-skeleton avatar :title="false" :loading="false" active>
            <!--          签名内容-->
            <a-list-item-meta :description="item?.signature ? item?.signature : '此人暂无个性签名'">
              <template #title>
                <!--              名字-->
                <a href="https://www.antdv.com/">{{ item.otherUsers.nickname }}</a>
              </template>
              <template #avatar>
                <a-avatar>
                  <template #icon>
                    <img :src="item?.otherUsers?.faceImage">
                  </template>
                </a-avatar>
              </template>
            </a-list-item-meta>
            <div>已接受对方消息</div>
          </a-skeleton>
        </a-list-item>

        <a-list-item v-if="item.state == 1 || item.state == 3 || item.state == 5">
          <template #actions>
          </template>
          <a-skeleton avatar :title="false" :loading="false" active>
            <!--          签名内容-->
            <a-list-item-meta :description="item?.signature ? item?.signature : '此人暂无个性签名'">
              <template #title>
                <!--              名字-->
                <a href="https://www.antdv.com/">{{ item.otherUsers.nickname }}</a>
              </template>
              <template #avatar>
                <a-avatar>
                  <template #icon>
                    <img :src="item?.otherUsers?.faceImage">
                  </template>
                </a-avatar>
              </template>
            </a-list-item-meta>
            <div>已拒绝对方请求</div>
          </a-skeleton>
        </a-list-item>
      </div>


    </template>
  </a-list>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {
  FriendsControllerService,
  FriendsRequestControllerService,
  RecentChatControllerService,
  UserControllerService
} from "../../../../../generated";
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";
import {unReadStore} from "../../../../store/unRead.ts";
const unread = unReadStore();
const count = 3;
const currentUser = ref();
const initLoading = ref(true);
const loading = ref(false);
const myMessage = ref();
const router = useRouter();
onMounted(() => {
  setReadMessage()
  getMessage()
});

const setReadMessage = async () => {
   const res = await FriendsRequestControllerService.setReadMessageUsingGet();
   unread.redRequestSize(res.data);
   unread.setTotal();
}

const toAgree = async (sendUserId: any, requestId: any) => {
  const res = await FriendsRequestControllerService.agreeFriendUsingPost(requestId, sendUserId)
  if (res.data) {
    message.success('你们成为了好友')
    getMessage();
    unread.redRequestSize(1)
    unread.setTotal();
  }
}

const getMessage = async () => {
  const res0 = await UserControllerService.getLoginUserUsingGet();
  currentUser.value = res0.data
  console.log('当前用户id',currentUser.value.id)
  loading.value = true;
  const res = await FriendsRequestControllerService.getMyRequestUsingGet()
  myMessage.value = res.data
  console.log('我的信息',myMessage.value)
  loading.value = false;
  initLoading.value = false
}

//去聊天
const toReject = async (requestId: any) => {
  const res = await FriendsRequestControllerService.rejectFriendUsingPost(requestId);
  if (res.data) {
    message.success('您已拒绝此次请求');
    getMessage();
    unread.redRequestSize(1)
    unread.setTotal()
  }
}

</script>

<style scoped>
.friendScroll {
  overflow-y: scroll;
  position: relative;
  height: 100%;
}
</style>