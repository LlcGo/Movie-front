<template>
  <a-form :layout="formState.layout" :model="formState" v-bind="formItemLayout">
    <a-form-item label="昵称">
      <a-input v-model:value="formState.nickname" style="max-width: 200px" placeholder="修改昵称"/>
    </a-form-item>
    <a-form-item label="用户名">
      <a-tag color="skyblue" >{{formState.username}}</a-tag>
    </a-form-item>
    <a-form-item label="用户头像">
     <a-avatar @click="showModal">
       <template #icon>
         <img :src="avaImg">
       </template>
     </a-avatar>
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

  <div>
    <a-modal v-model:open="open"
             title="修改头像"
             @ok="handleOk"
             width="260px"
             @cancel="closeModal"
             cancelText="取消"
             okText="确认修改"
    >
      <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :custom-request="uploadUserImg"
          :before-upload="beforeUpload"
      >
        <img v-if="currentImgURI" class="uploadImgClass" :src="currentImgURI" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </a-modal>
  </div>
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
import {FileControllerService, UserControllerService, Users, UserUpdateRequest} from "../../../../../generated";

const currentUser = ref()
import {computed, reactive} from 'vue';
import type {UnwrapRef} from 'vue';
import {message} from "ant-design-vue";
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
import {useUserStore} from "../../../../store/user.ts";
const userChange = useUserStore();
const value = ref<string>('0');
const like = ref([]);

const open = ref<boolean>(false);


const fileList = ref([]);
const loading = ref<boolean>(false);
const currentImgURI = ref();

const handleChangeFile = (info: UploadChangeParam) => {
  console.log('handleChangeFile',info)
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  console.log(file)
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('必须是jpeg 或者 png 类型图片!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片必须小于 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const uploadUserImg = async (data:any) => {
  // const blob =  new Blob(data.file);
  // console.log(data)
  // // console.log(blob)
  // return;
  const formdata = new FormData();
  formdata.append("file",data.file)
  const res = await FileControllerService.uploadUserImgUsingPost(formdata);
  currentImgURI.value = res.data;
  console.log(currentImgURI.value)
}

const showModal = () => {
  open.value = true;
};

const handleOk = async () => {
    if(currentImgURI.value == null){
      message.warn('请上传头像')
    }
   const res = await UserControllerService.updateUserImgUsingPost(currentImgURI.value);
   if(res.data){
     message.success('头像修改成功')
     open.value = false;
     currentImgURI.value = null;
     getCurrentUser()
     userChange.setChange();
   }
};

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
    value: '战争片',
    label: '战争片',
  },
  {
    value: '奇幻片',
    label: '奇幻片',
  },
  {
    value: '科幻片',
    label: '科幻片',
  },
  {
    value: '剧情片',
    label: '剧情片',
  },
  {
    value: '恐怖片',
    label: '恐怖片',
  },
  {
    value: '爱情片',
    label: '爱情片',
  },
  {
    value: '动作片',
    label: '动作片',
  },
  {
    value: '喜剧片',
    label: '喜剧片',
  },
  {
    value: '动画片',
    label: '动画片',
  },
  {
    value: '悬疑片',
    label: '悬疑片',
  },{
    value: '纪录片',
    label: '纪录片',
  },
])



interface FormState {
  layout: 'horizontal'
  username: string;
  nickname: string;
  signature:string;
}
//头像
const avaImg = ref();









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
  console.log('like',currentUser.value.likeType)
  console.log(currentUser.value);
  formState.nickname = currentUser.value.nickname
  formState.username = currentUser.value.username
  if(currentUser.value.likeType != null && currentUser.value.likeType != ''){
    let b = currentUser.value.likeType.replace('[',"");
    let a = b.replace(']',"")
    console.log('like2',a)
    let c =a.split(",")
    console.log('final',c)
    // console.log(a.length)
    // a[0] =
    like.value = c
  }
  avaImg.value = currentUser.value.faceImage
  value.value = currentUser.value.sex
  formState.signature = currentUser.value.signature
}

const toUpdate = async () => {
  let data : UserUpdateRequest = {
    faceImage: avaImg.value,
    nickname : formState.nickname,
    sex : value.value,
    likeType : '[' + like.value.toString() + ']',
    username: formState.username,
    signature: formState.signature,
    id: currentUser.value.id,
  }
  const res = await UserControllerService.updateUserUsingPost1(data)
  console.log(res)
  if(res.data){
    message.success('保存成功')
  }
}

const closeModal = () => {
  open.value = false;
  currentImgURI.value = null;
}
</script>

<style scoped>
.uploadImgClass{
  width: 100%;
  height: 100%;;
}
</style>