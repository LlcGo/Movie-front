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
      <a-form-item label="第一个问题" >
        <a-select
            v-model:value="question1"
            style="width: 100%"
            placeholder="请选择您的密保问题"
            :options="options1"
        ></a-select>
      </a-form-item>

      <a-form-item
          label="问题答案"
      >
        <a-input v-model:value="answer1" />
      </a-form-item>

      <a-form-item label="第二个问题" >
        <a-select
            v-model:value="question2"
            style="width: 100%"
            placeholder="请选择您的密保问题"
            :options="options2"
        ></a-select>
      </a-form-item>

      <a-form-item
          label="问题答案"
      >
        <a-input v-model:value="answer2" />
      </a-form-item>


      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue';
import {UserControllerService} from "../../../../../generated";
import {message} from "ant-design-vue";
import {useRouter} from "vue-router";
const router = useRouter();
const question2 = ref();
const question1 = ref();
const answer1 = ref();
const answer2 = ref();

onMounted(()=>{
  getSecret()
})

const getSecret = async () => {
  const res = await UserControllerService.getsecretNoUserNameUsingPost();
  console.log('获得的数据',res)
  if(res.code == 0){
    question1.value = res.data.question1
    question2.value = res.data.question2
  }
}

const options1 = ref([
  {
    value: '您母亲的姓名是?',
    label: '您母亲的姓名是?',
  },
  {
    value: '您的出生地是?',
    label: '您的出生地是?',
  },
  {
    value: '您的小学校名是?',
    label: '您的小学校名是?',
  },
  {
    value: '您的大学校名是?',
    label: '您的大学校名是?',
  },
  {
    value: '我最喜欢的小说?',
    label: '我最喜欢的小说?',
  },
  {
    value: '我最喜欢的食物?',
    label: '我最喜欢的食物?',
  },
])
const options2 = ref([
  {
    value: '您母亲的姓名是?',
    label: '您母亲的姓名是?',
  },
  {
    value: '您的出生地是?',
    label: '您的出生地是?',
  },
  {
    value: '您的小学校名是?',
    label: '您的小学校名是?',
  },
  {
    value: '您的大学校名是?',
    label: '您的大学校名是?',
  },
  {
    value: '我最喜欢的小说?',
    label: '我最喜欢的小说?',
  },
  {
    value: '我最喜欢的食物?',
    label: '我最喜欢的食物?',
  },
])

interface Secret{
  question1: string,
  question2: string,
  answer1:string,
  answer2:string
}

const formState = reactive<Secret>({
  question1: '',
  question2: '',
  answer1:'',
  answer2:''
});
const onFinish = async (value) => {
  console.log('问题1---》',question1.value,'答案',answer1.value,'问题2---》',question2.value,'答案',answer2.value)
  let data = {
    question1:question1.value,
    question2:question2.value,
    answer1:answer1.value,
    answer2:answer2.value
  }
  const res = await UserControllerService.userSecretUsingPost(data);
  if(res.data){
    message.success('设置成功')
  }
  // console.log('Success:', values);
  // const res = await UserControllerService.updateUserUsingPost(values)
  // console.log(res);
  // if(!res.data){
  //   message.warn(res.message)
  //   return;
  // }
  // message.success('修改成功,请重新登录')
  // router.push({
  //   path: '/',
  // })
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