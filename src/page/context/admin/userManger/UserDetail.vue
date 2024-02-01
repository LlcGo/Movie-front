<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" @click="dialogVisible = true"   :loading="printLoading">修改密码</el-button>
    </el-card>
    <el-card>
      <div id="userInfoBox" class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">账号信息</h2>

        <div class="header">
          <!-- 头部渲染表格 -->
          <el-descriptions :column="2" border>
            <el-descriptions-item label="用户ID">{{userInfo.id}}</el-descriptions-item>
            <el-descriptions-item label="性别">
              {{userInfo.sex == '1' ? '女' : '男'}}
            </el-descriptions-item>
<!--            -->
            <el-descriptions-item label="用户名">
              {{userInfo.nickname}}
            </el-descriptions-item>
            <el-descriptions-item label="账户名">
              {{userInfo.username}}
            </el-descriptions-item>
            <el-descriptions-item label="角色">
              {{userInfo.userRole}}
            </el-descriptions-item>
            <el-descriptions-item label="兴趣爱好">
              {{userInfo.likeType}}
            </el-descriptions-item>

          </el-descriptions>
          <!-- 头像渲染 -->
          <el-image
              class="avatar"
              :src="userInfo.faceImage"
          ></el-image>
        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions v-if="userInfo?.signature?.length > 0" direction="vertical" :column="1" border>
            <el-descriptions-item label="个性签名" :span="2">
              <el-tag  size="small">{{userInfo.signature}}</el-tag>
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions v-else direction="vertical" :column="1" border>
            <el-descriptions-item label="个性签名" :span="2">
              <el-tag  size="small">暂无</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>

    <el-dialog
        v-model="dialogVisible"
        title="修改密码"
        width="30%"
        :before-close="handleClose"
    >
      <!--    <span>This is a message</span>-->
      <div style="margin: 20px"/>
      <el-form
          label-position="top"
          label-width="100px"
          :model="formLabelAlign"
          style="max-width: 460px"
      >
        <el-form-item label="新密码">
          <el-input v-model="formLabelAlign.password"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="toUpdate">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "accountDetail"
}
</script>
<script setup>
import { useRoute } from 'vue-router'
import {ref, onMounted, watch,defineProps} from "vue";
import {message} from "ant-design-vue";
import {UserControllerService} from "../../../../../generated/index.ts";
import {getItem} from "@/utils/storage.js";
import {useApp} from "@/store/modules/app.ts";
const store = useApp();
const flag = ref(true);
onMounted(()=>{
  // alert(1)/
  getInit();
})
const route = useRoute();
const userInfo = ref({})
const getInit = () =>{
  if(flag.value){
    for (let i = 0; i < store.tagsViewList.length; i++) {
      if(store.tagsViewList[i].name === route.name){
        console.log('store.tagsViewList[i]',store.tagsViewList[i].query)
        userInfo.value = store.tagsViewList[i].query
      }
    }
  }

}
const formLabelAlign = ref({
  password:''
})
const handleClose = () => {
  formLabelAlign.value.password = '';
  dialogVisible.value = false
}
const toUpdate = async () =>{
 console.log(formLabelAlign.value.password.length)
  if(formLabelAlign.value.password.length <= 0){
    message.warn('请输入新密码')
    return;
  }
  const res = await UserControllerService.adminUpdatePasswordUsingPost(userInfo.value.id,formLabelAlign.value.password);
  if(res.data){
    handleClose();
    message.success('修改密码成功')
  }
}




const dialogVisible = ref(false)

// 打印相关
const printLoading = ref(false)
const printObj = {
  // 打印区域
  id: 'userInfoBox',
  // 打印标题
  popTitle: 'admin-vue3-vite',
  // 打印前
  beforeOpenCallback(vue) {
    printLoading.value = true
  },
  // 执行打印
  openCallback(vue) {
    printLoading.value = false
  }
}


watch(
    () => route.query.id,
    val => {
      if (val) {
        userInfo.value =route.query
        console.log("watch= ",route.query)
        for (let i = 0; i < store.tagsViewList.length; i++) {
          if(store.tagsViewList[i].name === route.name){
            // console.log('store.tagsViewList[i]',store.tagsViewList[i].query)
            store.tagsViewList[i].query = route.query
          }
        }

        flag.value = false;
      }
    },  //第一次进来也触发
    {
      immediate: true
    }
)


</script>
<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}
.user-info-box {
  width: 1024px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 100px;
      height: 120px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 12px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
