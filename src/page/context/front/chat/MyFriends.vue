
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
          <a key="list-loadmore-edit">删除好友</a>
          <a key="list-loadmore-more">聊天</a>
        </template>
        <a-skeleton avatar :title="false" :loading="false" active>
<!--          签名内容-->
          <a-list-item-meta :description="item.signature ? item.signature : '此人暂无个性签名'">
            <template #title>
<!--              名字-->
              <a href="https://www.antdv.com/">{{ item.nickname }}</a>
            </template>
            <template #avatar>
              <a-avatar  />
            </template>
          </a-list-item-meta>
<!--          <div>content</div>-->
        </a-skeleton>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import {FriendsControllerService, UserControllerService} from "../../../../../generated";
import {message} from "ant-design-vue";
const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
const currentUser = ref();
const initLoading = ref(true);
const loading = ref(false);
const myFriends = ref();

onMounted(() => {
  getFriends()
});

const getFriends = async () =>{
  loading.value = true;
  const res1 = await UserControllerService.getLoginUserUsingGet()
  currentUser.value = res1.data;
  const res = await FriendsControllerService.getMyFriendsUsingGet(currentUser.value.id);
  if(res.code === 0){
    myFriends.value =  res.data
  }
  console.log(myFriends.value)
  loading.value = false;
  initLoading.value = false
}

// const onLoadMore = () => {
//   loading.value = true;
//   list.value = data.value.concat(
//       [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
//   );
//   fetch(fakeDataUrl)
//       .then(res => res.json())
//       .then(res => {
//         const newData = data.value.concat(res.results);
//         loading.value = false;
//         data.value = newData;
//         list.value = newData;
//         nextTick(() => {
//           // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
//           // In real scene, you can using public method of react-virtualized:
//           // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
//           window.dispatchEvent(new Event('resize'));
//         });
//       });
// };
</script>

<style scoped>
.friendScroll{
  overflow-y: scroll;
  position: relative;
  height: 100%;
}
</style>