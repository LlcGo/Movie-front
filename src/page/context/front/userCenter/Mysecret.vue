<template>
   <div style="height: 100px"></div>
    <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 8 }"
        autocomplete="off"
        @finish="onFinish"
    >
      <a-form-item
          label="第一个问题"
          name="oldPassword"
          :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input-password v-model:value="formState.oldPassword" />
      </a-form-item>

      <a-form-item
          label="问题答案"
          name="newPassword"
          :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.newPassword" />
      </a-form-item>

      <a-form-item
          label="第二个问题"
          name="oldPassword"
          :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input-password v-model:value="formState.oldPassword" />
      </a-form-item>

      <a-form-item
          label="问题答案"
          name="newPassword"
          :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.newPassword" />
      </a-form-item>


      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">确认修改</a-button>
      </a-form-item>
    </a-form>

</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {UserControllerService} from "../../../../../generated";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
const router = useRouter();
interface updatePassWord{
  newPassword: string,
  oldPassword: string,
}

const formState = reactive<updatePassWord>({
  newPassword:'',
  oldPassword:'',
});
const onFinish = async (values: updatePassWord) => {
  console.log('Success:', values);
  const res = await UserControllerService.updateUserUsingPost(values)
  console.log(res);
  if(!res.data){
    message.warn(res.message)
    return;
  }
  message.success('修改成功,请重新登录')
  router.push({
    path: '/',
  })
};


</script>

<style scoped>
:where(.css-dev-only-do-not-override-3m4nqy).ant-btn-primary {
  margin-left: 15%;
  color: #fff;
  background-color: #1677ff;
  box-shadow: 0 2px 0 rgb(5 145 255 / 10%);
}
</style>