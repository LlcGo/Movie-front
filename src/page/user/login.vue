<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="Username"
        name="userAccount"
        :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.userAccount" />
    </a-form-item>

    <a-form-item
        label="Password"
        name="userPassword"
        :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.userPassword" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
<!--  {{currentUser.username}} - {{currentUser.id}}-->
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import {useUserStore} from "../../store/user.ts";
import {User, UserLoginRequest} from "../../../generated";
import {storeToRefs} from "pinia";
import { useRouter} from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore)
const formState = reactive<UserLoginRequest>({
  userAccount: '',
  userPassword: ''
});
const onFinish = async (values: any) => {
  console.log('Success:', values);
  const res = await userStore.login(values);
  console.log('返回的信息',res)
  if(res){
    // alert(1)
     router.push('/chat')
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>