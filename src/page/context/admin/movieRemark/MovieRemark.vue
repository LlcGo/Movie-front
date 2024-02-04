<template>
  <div class="home-box">
    <el-form :inline="true" :model="searchForm" v-show="showSearch">
      <el-form-item label="电影名" prop="id">
        <el-input v-model="searchForm.movieName" placeholder="请输入电影名" clearable/>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="searchForm.nickName" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>

      <el-form-item label="内容">
        <el-input v-model="searchForm.content" placeholder="请输入内容" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="searchEvent"
            v-auth="'/adminAuth/list'"
            style="margin-left: -16px"
        >查询
        </el-button>
      </el-form-item>
    </el-form>

    <right-toolbar
        v-model:showSearch="showSearch"
        @queryTable="searchAll"
        @onImportClick="handleImport"
        @onOutClick="onDownTemplate"
        @onAddClick="onDownTemplate">
    </right-toolbar>

    <el-card>
      <el-table :data="tableData"
                v-loading="loading"
                element-loading-text="加载中..."
                border>
        <el-table-column label="电影" align="center" width="180">
          <template #default="{ row }">
            {{ row.movie.movieName }}
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center" width="180">
          <template #default="{ row }">
            {{ row.user.nickname }}
          </template>
        </el-table-column>
        <el-table-column label="评论内容" align="center" width="600">
          <template #default="{ row }">
            {{ row.content }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180" align="center">
          <template #default="{ row }">
            <div v-if="row.state === 1">
              <el-tag type="danger">已删除</el-tag>
            </div>
            <div v-if="row.state === 0">
              <el-tag type="success">正常</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="100" align="center">
          <template #default="{ row }">
            <el-button
                v-if="row.state == 0"
                type="primary"
                size="small"
                v-auth="'/adminAuth/look'"
                @click="onRemoveClick(row)">删除
            </el-button>
            <el-button
                v-if="row.state === 1"
                type="danger"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="onHuiFu(row)">恢复
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->

      <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="searchForm.current"
          v-model:limit="searchForm.pageSize"
          @pagination="getListData"
      />

    </el-card>


    <el-dialog
        v-model="dialogVisible"
        title="新增评论"
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
        <el-form-item label="电影名">
          <el-input v-model="formLabelAlign.movieName"/>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="formLabelAlign.content"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="toAdd">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
// import RolesDialog from './components/roles.vue'
// import UploadExcel from '@/components/UploadExcel'

import {ref, onMounted, watch, reactive} from "vue";
// import {getAdmintorList, getRoleList} from "@/api/api";
import {useRoute, useRouter} from "vue-router";
import {ElMessageBox, ElMessage} from 'element-plus'
import {switchServerUrl} from "@/utils/index";
import {RemarkControllerService, UserControllerService} from "../../../../../generated/index.ts";
import {message} from "ant-design-vue";
import {useUserStore} from "@/store/user.ts";
const dialogVisible = ref(false)
const route = useRoute();
const router = useRouter()
const showSearch = ref(true);

const formLabelAlign = reactive({
  movieName: '',
  userId: '',
  content: '',
})
// import type { FormProps } from 'element-plus'
// const labelPosition = ref<FormProps['labelPosition']>('right')


const currentUser = useUserStore();
const toAdd = async () => {
  formLabelAlign.userId = currentUser.currentUser.id
  // console.log('上传的信息',formLabelAlign)
  // return;
  const res = await RemarkControllerService.adminAddUsingPost(formLabelAlign.content,formLabelAlign.movieName,formLabelAlign.userId)
  if(res.code === 40000){
    ElMessage.warning(res.message)
  }
  if(res.data != null){
    ElMessage.success('新增成功')
    getListData();
    handleClose();
  }
}



//数据源
const searchForm = ref({
  current: 1,
  pageSize: 10,
  nickName: null,
  movieName: null,
  content: '',
});

const tableData = ref([]);
const total = ref(0);
const loading = ref(false)
const options = [
  {value: 'user', label: '用户'},
  {value: 'vip', label: 'vip'},
  {value: 'admin', label: '管理员'}
]
const options2 = [
  {value: 'user', label: '用户'},
  {value: 'admin', label: '管理员'}
]
onMounted(() => {
  // alert(1)
  getListData();
  // getRoleData()
});



const handleClose = () => {
  dialogVisible.value = false
  formLabelAlign.movieName = '';
  formLabelAlign.userId = '';
  formLabelAlign.content = '';
}
/**
 * 获取账号列表
 */
const getListData = async () => {
  loading.value = true
  console.log('发送的数据', searchForm.value)
  // return;
  const res = await RemarkControllerService
      .listRemarkUsingGet(searchForm.value.content,searchForm.value.current,
          null,
          searchForm.value.movieName,
          searchForm.value.nickName,
          searchForm.value.pageSize,
          null,null,null)
  console.log('获得的数据', res)
  if (res.data.length > 0) {
    total.value = Number(res.data[0].total);
    tableData.value = res.data
  }else {
    total.value = 0
    tableData.value = []
  }
  loading.value = false
};


/**
 * 删除按钮点击事件
 */
const onRemoveClick = row => {
  ElMessageBox.confirm(
      "确定要删除" + row.movie.movieName + "的这一条评论吗",
      {type: 'warning'}
  ).then(async () => {
    const res = await RemarkControllerService.adminDeleteUsingPost1(row.id)
    // await deleteUser(row._id)
    if(res.data){
      ElMessage.success("删除成功")
      // 重新渲染数据
      getListData()
      return;
    }
    ElMessage.warning(res.message)
  })
}

const onHuiFu = (row) => {
  ElMessageBox.confirm(
      "确定要恢复" + row.movie.movieName + "的这一条评论吗",
      {type: 'warning'}
  ).then(async () => {
    const res = await RemarkControllerService.adminHfUsingPost(row.id)
    // await deleteUser(row._id)
    if(res.data){
      ElMessage.success("恢复成功")
      // 重新渲染数据
      getListData()
      return;
    }
    ElMessage.warning(res.message)
  })
}


const searchEvent = () => {
  console.log(searchForm.value)
  searchForm.value.current = 1;
  getListData();
};


/*** 用户导入参数 */
// const upload = ref({
//   // 是否显示弹出层（用户导入）
//   open: false,
//   // 弹出层标题（用户导入）
//   upLoadTitle: "账号导入",
// });
//
// /** 导入按钮操作 */
// function handleImport() {
//   upload.value.open = true;
// };
// /** 文件上传成功处理 */
// const onSuccess = (response, file, fileList) => {
//   upload.value.open = false;
//   getListData();
//
// };
const onDownTemplate = () => {
  dialogVisible.value = true
}

</script>

<style lang="scss" scoped>
.home-box {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

}
</style>
