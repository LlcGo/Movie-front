<template>
  <div class="home-box">
    <el-form :inline="true" :model="searchForm" v-show="showSearch">
      <el-form-item label="影片ID" prop="id">
        <el-input v-model="searchForm.id" placeholder="影片ID" clearable/>
      </el-form-item>

      <el-form-item label="影片名字">
        <el-input v-model="searchForm.movieName" placeholder="影片名字" clearable></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-select
            v-model="searchForm.type"
            class="m-2"
            placeholder="状态"
            style="width: 240px"
            clearable
        >
          <el-option
              v-for="item in movieTypes"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="年代">
        <el-select
            v-model="searchForm.year"
            class="m-2"
            placeholder="年代"
            style="width: 240px"
            clearable
        >
          <el-option
              v-for="item in movieYears"
              :key="item.id"
              :label="item.yearName"
              :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="地区">
        <el-select
            v-model="searchForm.nation"
            class="m-2"
            placeholder="地区"
            style="width: 240px"
            clearable
        >
          <el-option
              v-for="item in movieNations"
              :key="item.id"
              :label="item.nationName"
              :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="影片状态">
        <el-select
            v-model="searchForm.state"
            class="m-2"
            placeholder="影片状态"
            style="width: 240px"
            clearable
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <!--      <el-form-item label="操作时间" style="width: 308px;">-->
      <!--        <el-date-picker-->
      <!--            v-model="searchForm.date"-->
      <!--            value-format="YYYY-MM-DD"-->
      <!--            type="daterange"-->
      <!--            range-separator="-"-->
      <!--            start-placeholder="开始日期"-->
      <!--            end-placeholder="结束日期"-->
      <!--        ></el-date-picker>-->
      <!--      </el-form-item>-->

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
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="movieName" label="电影名" width="180"></el-table-column>
        <el-table-column prop="movieNation" label="电影地区" width="180"></el-table-column>
        <el-table-column prop="movieType" width="88"  label="电影类型"></el-table-column>
        <el-table-column prop="movieYear" width="88"  label="电影年代"></el-table-column>
        <el-table-column label="影视图片" align="center" width="180">
          <template #default="{ row }">
            <el-image
                class="avatar"
                :src="row.img"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180" align="center">
          <template #default="{ row }">
            <div v-if="row.state === 3">
              <el-tag type="danger">会员影视</el-tag>
            </div>
            <div v-if="row.state === 2">
              <el-tag type="danger">付费影视</el-tag>
            </div>
            <div v-if="row.state === 1">
              <el-tag type="danger">已上架</el-tag>
            </div>
            <div v-if="row.state === 0">
              <el-tag type="success">未上架</el-tag>
            </div>
            <!--            <span>{{ row.state == "1" ? "冻结" : "正常" }}</span>-->
          </template>
        </el-table-column>
        <!--        <el-table-column prop="date" label="操作时间" width="280">-->
        <!--        </el-table-column>-->
        <el-table-column prop="address" label="操作" min-width="100" align="center">
          <template #default="{ row }">
            <el-button
                type="primary"
                size="small"
                v-auth="'/adminAuth/look'"
                @click="onShowClick(row)">查看
            </el-button>
            <!--            <el-button-->
            <!--                type="info"-->
            <!--                size="small"-->
            <!--                v-auth="'/adminAuth/role'"-->

            <!--                @click="onShowRoleClick(row)">角色-->
            <!--            </el-button>-->
            <el-button
                v-if="row.state === 0"
                type="danger"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="onRemoveClick(row)">上架
            </el-button>
            <el-button
                v-if="row.state === 1 || row.state ===2 || row.state === 3"
                type="danger"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="onReClick(row)">下架
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
        title="新增用户"
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
        <el-form-item label="账户">
          <el-input v-model="formLabelAlign.username"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.nickname"/>
        </el-form-item>
        <el-form-item label="角色">
          <el-select
              v-model="formLabelAlign.userRole"
              class="m-2"
              placeholder="角色"
              style="width: 240px"
              clearable
          >
            <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
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
import {
  MovieControllerService, MovieNationControllerService,
  MovieTyepControllerService, MovieYearControllerService,
  UserControllerService
} from "../../../../../generated/index.ts";
import {message} from "ant-design-vue";

const route = useRoute();
const router = useRouter()
const showSearch = ref(true);


// import type { FormProps } from 'element-plus'
// const labelPosition = ref<FormProps['labelPosition']>('right')

const formLabelAlign = reactive({
  username: '',
  nickname: '',
  userRole: '',
})

const toAdd = async () => {
  console.log('上传的信息',formLabelAlign)
  const res = await UserControllerService.addUserUsingPost(formLabelAlign);
  if(res.code === 40000){
    message.warn(res.message)
  }
  if(res.data != null){
    message.success('新增成功，默认密码为 12345678 ')
    handleClose();
  }
}

const onReClick = (row) => {
  ElMessageBox.confirm(
      "确定要解冻" + row.nickname + "吗",
      {type: 'warning'}
  ).then(async () => {
    let data = {
      id: Number(row.id)
    }
    const res = await UserControllerService.reUserUsingPost(data)
    // await deleteUser(row._id)
    ElMessage.success("解冻成功")

    // 重新渲染数据
    await getListData()
  })
}

const getRole = (role) => {
  switch (role) {
    case 'vip' :
      return '会员'
    case 'user' :
      return '普通用户'
    case 'admin' :
      return '管理员'
  }
}
//数据源
const searchForm = ref({
  id: '',
  nation: '',
  year: '',
  type: '',
  current: 1,
  movieName: '',
  pageSize: 5,
  state: ''
});

const tableData = ref([]);
const total = ref(0);
const loading = ref(false)
const options = [
  {value: 0, label: '未上架'},
  {value: 1, label: '已上架'},
  {value: 3, label: '会员影视'},
  {value: 2, label: '付费影视'}
]
const options2 = [
  {value: 'user', label: '用户'},
  {value: 'admin', label: '管理员'}
]
onMounted(() => {
  // alert(1)
  getListData();
  // getRoleData()
  getMovieTypes()
  getMovieNations()
  getMovieYears()
});

const movieTypes = ref([])
const movieNations = ref([])
const movieYears = ref([])

const getMovieTypes = async () => {
  const res = await MovieTyepControllerService.getMovieNationUsingGet();
  movieTypes.value = res.data
  console.log('getMovieTypes',movieTypes.value)
}

const getMovieNations = async () => {
  const res = await MovieNationControllerService.getMovieTypeUsingGet();
  movieNations.value = res.data
  console.log('getMovieNations',movieNations.value)
}

const getMovieYears = async () => {
  const res = await MovieYearControllerService.getMovieTypeUsingGet1();
  movieYears.value = res.data
  console.log('getMovieYears',movieYears.value)
}

const searchAll = async () => {
  loading.value = true
  // console.log('发送的数据',searchForm.value)
  let data = {
    current: 1,
    pageSize: 5,
  }
  // return;

  // return;
  const res = await MovieControllerService.listMovieByPageUsingPost(data)
  console.log('获得的数据', res)
  if (res.data !== null) {
    res.data.records.forEach(item0 => {
      if(item0.nation){
        movieNations.value.forEach(item1=>{
          if(item1.id == item0.nation){
            item0.movieNation = item1.nationName;
          }
        })
      }
      if(item0.type){
        movieTypes.value.forEach(item1=>{
          if(item1.id == item0.type){
            // console.log('电影类型id',item0.type,'类型id',item1.id)
            item0.movieType = item1.typeName;
            // console.log(item1.typeName)
          }
        })
      }
      if(item0.year){
        movieYears.value.forEach(item1=>{
          if(item1.id == item0.year){
            // console.log('电影类型id',item0.type,'类型id',item1.id)
            item0.movieYear = item1.yearName;
            // console.log(item1.yearName)
          }
        })
      }

    })

    total.value = Number(res.data.total);
    tableData.value = res.data.records;
  }
  loading.value = false
}

const handleClose = () => {
  formLabelAlign.username = ''
  formLabelAlign.nickname = ''
  formLabelAlign.userRole = ''
  dialogVisible.value = false;
}
/**
 * 获取账号列表
 */
const getListData = async () => {
  loading.value = true
  console.log('searchForm.value',searchForm.value)
  // return
  const res = await MovieControllerService.listMovieByPageUsingPost(searchForm.value)
  console.log('获得的数据', res)
  if (res.data !== null) {
    res.data.records.forEach(item0 => {
      if(item0.nation){
        movieNations.value.forEach(item1=>{
         if(item1.id == item0.nation){
           item0.movieNation = item1.nationName;
         }
        })
      }
      if(item0.type){
        movieTypes.value.forEach(item1=>{
          if(item1.id == item0.type){
            // console.log('电影类型id',item0.type,'类型id',item1.id)
            item0.movieType = item1.typeName;
            // console.log(item1.typeName)
          }
        })
      }
      if(item0.year){
        movieYears.value.forEach(item1=>{
          if(item1.id == item0.year){
            // console.log('电影类型id',item0.type,'类型id',item1.id)
            item0.movieYear = item1.yearName;
            // console.log(item1.yearName)
          }
        })
      }

    })

    total.value = Number(res.data.total);
    tableData.value = res.data.records;
  }
  loading.value = false
};

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
 * 查看按钮点击事件
 */
const onShowClick = row => {
  router.push({
    path: '/adminAuth/detail',
    query: row
  })

}
/**
 * 删除按钮点击事件
 */
const onRemoveClick = row => {
  ElMessageBox.confirm(
      "确定要冻结" + row.nickname + "吗",
      {type: 'warning'}
  ).then(async () => {
    let data = {
      id: Number(row.id)
    }
    const res = await UserControllerService.deleteUserUsingPost(data)
    // await deleteUser(row._id)
    ElMessage.success("冻结成功")

    // 重新渲染数据
    await getListData()
  })
}

/**
 * 查看角色的点击事件
 */
const selectUserId = ref('')
const roleDialogVisible = ref(false)
const dialogVisible = ref(false)
const onShowRoleClick = row => {
  //真实环境应该获取用户id，但这里mock数据我们直接使用角色名字去匹配
  // selectUserId.value = row.role_name
  // roleDialogVisible.value = true
}

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, val => {
  if (!val) selectUserId.value = ''
})


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
    //border-radius: 50%;
  }

}
</style>
