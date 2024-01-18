<template>
  <a-form :layout="formState.layout" :model="formState" v-bind="formItemLayout">
    <a-form-item label="昵称">
      <a-input v-model:value="formState.nickname" style="max-width: 200px" placeholder="修改昵称"/>
    </a-form-item>
    <a-form-item label="用户名">
      <a-tag color="skyblue" >{{formState.username}}</a-tag>
    </a-form-item>
    <a-form-item label="我的签名">
      <a-textarea
          v-model:value="formState.signature"
          placeholder="设置您的签名"
          :auto-size="{ minRows: 3, maxRows: 6 }"
      />
    </a-form-item>

    <a-form-item label="性别">
      <a-radio-group v-model:value="value" name="radioGroup">
        <a-radio value="0">男</a-radio>
        <a-radio value="1">女</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item label="爱看的电影类型">
      <a-select
          v-model:value="like"
          mode="multiple"
          style="width: 100%"
          placeholder="请选择您的喜好"
          :options="options"
          @change="handleChange"
      ></a-select>
    </a-form-item>

    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="toUpdate">保存</a-button>
    </a-form-item>
  </a-form>
</template>


<script setup lang="ts">
/**
 * faceImage
 * :
 * null
 * faceImageBig
 * :
 * null
 * id
 * :
 * "1741446004448710657"
 * nickname
 * :
 * null
 * qrcode
 * :
 * null
 * username
 * :
 * "lc666"
 */
import {onMounted, ref} from "vue";
import {UserControllerService, Users, UserUpdateRequest} from "../../../../../generated";

const currentUser = ref()
import {computed, reactive} from 'vue';
import type {UnwrapRef} from 'vue';

const value = ref<string>('0');
const like = ref([]);
/**
 * 0 战争片
 1 奇幻片
 2 科幻片
 3 剧情片
 4 恐怖片
 5 爱情片
 6 动作片
 7 喜剧片
 8 动画片
 9 悬疑片
 10 纪录片
 */
const options = ref([
  {
    value: '0',
    label: '战争片',
  },
  {
    value: '1',
    label: '奇幻片',
  },
  {
    value: '2',
    label: '科幻片',
  },
  {
    value: '3',
    label: '剧情片',
  },
  {
    value: '4',
    label: '恐怖片',
  },
  {
    value: '5',
    label: '爱情片',
  },
  {
    value: '6',
    label: '动作片',
  },
  {
    value: '7',
    label: '喜剧片',
  },
  {
    value: '8',
    label: '动画片',
  },
  {
    value: '9',
    label: '悬疑片',
  },{
    value: '10',
    label: '纪录片',
  },
])

interface FormState {
  layout: 'horizontal'
  username: string;
  nickname: string;
  signature:string;
}

const formState: UnwrapRef<FormState> = reactive({
  layout: 'horizontal',
  nickname: '',
  username: '',
  signature: '',
});
const formItemLayout = computed(() => {
  const {layout} = formState;
  return layout === 'horizontal'
      ? {
        labelCol: {span: 4},
        wrapperCol: {span: 14},
      }
      : {};
});
const buttonItemLayout = computed(() => {
  const {layout} = formState;
  return layout === 'horizontal'
      ? {
        wrapperCol: {span: 14, offset: 4},
      }
      : {};
});


onMounted(() => {
  getCurrentUser()
})


const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const getCurrentUser = async () => {
  const res = await UserControllerService.getLoginUserUsingGet()
  currentUser.value = res.data
  console.log(currentUser.value);
  formState.nickname = currentUser.value.nickname
  formState.username = currentUser.value.username
  like.value = currentUser.value.likeType.split(",")
  value.value = currentUser.value.sex
  formState.signature = currentUser.value.signature
}

const toUpdate = async () => {
  let data : UserUpdateRequest = {
    faceImage: null,
    nickname : formState.nickname,
    sex : value.value,
    likeType : like.value.toString(),
    username: formState.username,
    signature: formState.signature,
    id: currentUser.value.id,
  }
  console.log(data)
  const res = await UserControllerService.updateUserUsingPost1(data)
  console.log(res)
}
</script>

<style scoped>

</style>