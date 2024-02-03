<template>
  <div class="home-box">

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
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="yearName" label="类型名" width="180"></el-table-column>
        <el-table-column prop="createTiem" label="创建时间" align="center"></el-table-column>
        <el-table-column label="状态" width="200" align="center">
          <template #default="{ row }">
            <div v-if="row.state === 0">
              <el-tag type="success">正常</el-tag>
            </div>
            <div v-if="row.state === 1">
              <el-tag type="danger">已删除</el-tag>
            </div>
            <!--            <span>{{ row.state == "1" ? "冻结" : "正常" }}</span>-->
          </template>
        </el-table-column>
        <!--        <el-table-column prop="date" label="操作时间" width="280">-->
        <!--        </el-table-column>-->
        <el-table-column prop="address" label="操作" width="300" align="center">
          <template #default="{ row }">
            <el-button
                type="primary"
                size="small"
                v-auth="'/adminAuth/look'"
                @click="onShowClick(row)">修改
            </el-button>
            <!--            <el-button-->
            <!--                type="info"-->
            <!--                size="small"-->
            <!--                v-auth="'/adminAuth/role'"-->

            <!--                @click="onShowRoleClick(row)">角色-->
            <!--            </el-button>-->
            <el-button
                v-if="row.state == 0"
                type="danger"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="remove(row)">删除
            </el-button>
            <el-button
                v-if="row.state == 1"
                type="success"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="remove(row)">恢复
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

    <!--    &lt;!&ndash;角色组件&ndash;&gt;-->
    <!--    <roles-dialog-->
    <!--        v-model="roleDialogVisible"-->
    <!--        :userId="selectUserId"-->
    <!--        @updateRole="getListData">-->
    <!--    </roles-dialog>-->

    <!--    &lt;!&ndash; 用户导入对话框 &ndash;&gt;-->
    <!--    <UploadExcel-->
    <!--        v-model="upload.open"-->
    <!--        :title="upload.upLoadTitle"-->
    <!--        :url="switchServerUrl()+ '/public/uploadFile'"-->
    <!--        @onSuccess="onSuccess"-->
    <!--        @onDownTemplate="onDownTemplate">-->
    <!--    </UploadExcel>-->

    <el-dialog
        v-model="dialogVisible"
        title="修改类型名"
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
        <el-form-item label="类型名">
          <el-input v-model="formLabelAlign.yearName"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
        <el-button type="primary" @click="toEdit">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>


<!--    新增-->
    <el-dialog
        v-model="dialogAddVisible"
        title="新增类型"
        width="30%"
        :before-close="handleAddClose"
    >
      <!--    <span>This is a message</span>-->
      <div style="margin: 20px"/>
      <el-form
          label-position="top"
          label-width="100px"
          :model="formAddLabelAlign"
          style="max-width: 460px"
      >
        <el-form-item label="类型名">
          <el-input v-model="formAddLabelAlign.yearName"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAddClose">关闭</el-button>
        <el-button type="primary" @click="toAdd">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>


import {ref, onMounted, watch, reactive} from "vue";
import {useRoute, useRouter} from "vue-router";
import {ElMessageBox, ElMessage} from 'element-plus'
import {
  MovieYearControllerService,
} from "../../../../../generated/index.ts";
import {message} from "ant-design-vue";

const isOk = ref(false);
const route = useRoute();
const router = useRouter();
const showSearch = ref(true);
const addDialogVisible = ref(false);
const tableData = ref([]);
const total = ref(0);
const loading = ref(false)
const dialogAddVisible = ref(false);
const formAddLabelAlign = ref({yearName:''});
onMounted(() => {
  // alert(1)
  getListData();
});

const toAdd = async () => {
  const res =await MovieYearControllerService.addMovieYearUsingPost(formAddLabelAlign.value.yearName);
  if(res.data){
    ElMessage({message:'新增类型成功',type:'success'})
    getListData();
    handleAddClose();
  }else {
    ElMessage({message:res.message,type:'warning'})
  }
}
/**
 * 获取账号列表
 */
const getListData = async () => {
  loading.value = true
  console.log('searchForm.value', searchForm.value)
  // return
  const res = await MovieYearControllerService.listMovieYearByPageUsingPost(searchForm.value)
  console.log('获得的数据', res)
  if (res.data !== null) {
    total.value = Number(res.data.total);
    tableData.value = res.data.records;
  }
  loading.value = false
};


const formLabelAlign = ref({})


const handleAddClose = () => {
   formAddLabelAlign.value.yearName = '';
   dialogAddVisible.value = false;
  // currentImgURI.value = '';
}

/**
 * 修改
 */
const onShowClick = async (row) => {
  dialogVisible.value = true
  const res =  await MovieYearControllerService.updateMovieYearUsingPost(row.id);
  formLabelAlign.value = res.data
}

const toEdit = async () => {
  // console.log('上传的信息',formLabelAlign)
  // formLabelAlign.value = tempFormLabelAlign.value;
  if (formLabelAlign.value.yearName == '') {
    message.warn('请输入类型名');
    return;
  }
  console.log(formLabelAlign.value);
  // return
  const res = await MovieYearControllerService.updateMovieYearUsingPost1(formLabelAlign.value)
  if (res.data) {
    ElMessage({message:'修改成功' ,type: "success"})
    getListData();
    handleClose();
  } else {
    ElMessage({message:res.message ,type: "warning"})

  }
}

const handleClose = () => {
  formLabelAlign.value = ''
  dialogVisible.value = false;
}


const currentPriceMovie = ref();
//收费弹窗开启
const toPrice = row => {
  dialogVisible.value = true
  currentPriceMovie.value = row;
}


//上架


//设置为会员影视
const remove = row => {
  let mes = '';
  if (row.state === 1) {
    mes = '恢复吗';
  } else {
    mes = '删除吗';
  }
  ElMessageBox.confirm(
      "确定将" + row.yearName + mes,
      {type: 'warning'}
  ).then(async () => {
    const res = await MovieYearControllerService.deleteMovieYearUsingPost(row)
    // await deleteUser(row._id)
    if (res.data) {
      ElMessage.success("修改成功")
      // 重新渲染数据
      await getListData()
    } else {
      ElMessage.warning(res.message)
    }

  })
}




//数据源
const searchForm = ref({
  current: 1,
  pageSize: 10,
});


const options = [
  {value: 0, label: '未上架'},
  {value: 1, label: '已上架'},
  {value: 3, label: '会员影视'},
  {value: 2, label: '付费影视'}
]


const movieTypes = ref([])
// const movieNations = ref([])
// const movieYears = ref([])


const getMovieTypes = async () => {
  const res = await MovieYearControllerService.getMovieYearUsingGet();
  movieTypes.value = res.data
  console.log('getMovieTypes', movieTypes.value)
}

// const getMovieNations = async () => {
//   const res = await MovieNationControllerService.getMovieTypeUsingGet();
//   movieNations.value = res.data
//   console.log('getMovieNations', movieNations.value)
// }
//
// const getMovieYears = async () => {
//   const res = await MovieYearControllerService.getMovieTypeUsingGet1();
//   movieYears.value = res.data
//   console.log('getMovieYears', movieYears.value)
// }

const searchAll = async () => {
  loading.value = true
  // console.log('发送的数据',searchForm.value)
  let data = {
    current: 1,
    pageSize: 5,
  }
  // return;
  // return;
  const res = await MovieYearControllerService.listMovieYearByPageUsingPost(data)
  console.log('获得的数据', res)
  if (res.data !== null) {
    total.value = Number(res.data.total);
    tableData.value = res.data.records;
  }
  loading.value = false
}


/**
 * 获取角色列表
 */
// const getRoleData = async () => {
// await getRoleList()
//     .then(data => {
//       roleList.value = data.obj
//
//     })
//     .catch(err => {
//
//     })
// };

/**
 * 删除按钮点击事件
 */


/**
 * 查看角色的点击事件
 */
const selectUserId = ref('')
const roleDialogVisible = ref(false)
const dialogVisible = ref(false)

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, val => {
  if (!val) selectUserId.value = ''
})


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
  dialogAddVisible.value = true
}

</script>

<style lang="scss" scoped>
.uploadImgClass {
  width: 100%;
  height: 100%;
}

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
    //border-radius: 50%;
  }

}
</style>
