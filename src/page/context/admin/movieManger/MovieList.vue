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
        <el-table-column prop="movieType" width="88" label="电影类型"></el-table-column>
        <el-table-column prop="movieYear" width="88" label="电影年代"></el-table-column>
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
            <div v-if="row.state === 2">
              <el-tag type="danger">会员影视</el-tag>
            </div>
            <div v-if="row.state === 3">
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

            <el-button
                v-if="row.state ===3 "
                type="danger"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="noPrice(row)">免费
            </el-button>


            <el-button
                v-if="row.state === 1 && row.state !== 3"
                type="danger"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="toPrice(row)">收费
            </el-button>

            <el-button
                v-if="row.state === 2"
                type="danger"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="noPrice(row)">免费
            </el-button>

            <el-button
                v-if="row.state === 1 && row.state !== 2"
                type="danger"
                size="small"
                v-auth="'/adminAuth/del'"
                @click="ontoVip(row)">会员
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
        title="收费价格"
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
        <el-form-item label="价格">
          <el-input v-model="formLabelAlign.price"/>
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

    <el-dialog
        v-model="addDialogVisible"
        title="新增影视"
        width="50%"
        :before-close="handleAddClose"
    >
      <!--    <span>This is a message</span>-->
      <div style="margin: 20px"/>
      <el-form
          label-position="top"
          label-width="100px"
          :model="formAddLabelAlign"
          style="max-width: 800px"
      >

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="影片名">
              <el-input v-model="formAddLabelAlign.movieName"/>
            </el-form-item>
            <el-form-item label="地区">
              <el-select
                  v-model="formAddLabelAlign.nation"
                  class="m-2"
                  placeholder="地区"
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
            <el-form-item label="导演名">
              <el-input v-model="formAddLabelAlign.directorName"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="年份">
              <el-select
                  v-model="formAddLabelAlign.year"
                  class="m-2"
                  placeholder="影视年代"
                  clearable
              >
                <el-option
                    v-for="item in movieYears"
                    :key="item.id"
                    :label="item.yearName"
                    :value="item.id"
                />
              </el-select>
<!--              <el-input v-model="formAddLabelAlign.year"/>-->
            </el-form-item>


            <el-form-item label="类型">
              <el-select
                  v-model="formAddLabelAlign.type"
                  class="m-2"
                  placeholder="影视类型"
                  clearable
              >
                <el-option
                    v-for="item in movieTypes"
                    :key="item.id"
                    :label="item.typeName"
                    :value="item.id"
                />
              </el-select>
<!--              <el-input v-model=""/>-->
            </el-form-item>

            <el-form-item label="演员名">
              <el-input v-model="formAddLabelAlign.actorsName" placeholder="多个演员请使用,分隔"/>
            </el-form-item>
<!--            <el-form-item label="影视图片 下载完获取">-->
<!--              <el-input v-model="formAddLabelAlign.img"/>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="视频id 下载完后去">-->
<!--              <el-input v-model="formAddLabelAlign.videoId"/>-->
<!--            </el-form-item>-->
          </el-col>
        </el-row>
        <el-form-item label="影视描述">
          <el-input v-model="formAddLabelAlign.movieProfile"
                    :rows="5"
                    type="textarea"
                    placeholder="请输入影视描述"/>
        </el-form-item>

        <el-form-item label="影视图片">
          <a-upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :custom-request="uploadUserImg"
              :before-upload="beforeUpload"
          >
            <img v-if="formAddLabelAlign.img" class="uploadImgClass" :src="formAddLabelAlign.img" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </el-form-item>

        <el-form-item label="选择影视ID">
          <el-select
              v-model="formAddLabelAlign.videoId"
              class="m-2"
              placeholder="影片ID"
              style="width: 240px"
              clearable
          >
            <el-option
                v-for="item in videoIds"
                :key="item.id"
                :label="item.id"
                :value="item.id"
            />
          </el-select>
<!--          <a-upload-dragger-->
<!--              name="file"-->
<!--              :multiple="false"-->
<!--              :disabled="isOk"-->
<!--              :showUploadList="false"-->
<!--              :customRequest="AddMovieBeforeUpload"-->
<!--          >-->
<!--            <template v-if="!isOk">-->
<!--              <p class="ant-upload-drag-icon">-->
<!--                <a-icon type="inbox" />-->
<!--              </p>-->
<!--              <p class="ant-upload-text">-->
<!--                点击上传影视资源-->
<!--              </p>-->
<!--              <p class="ant-upload-hint">-->
<!--                影视资源解析过程会很长,请耐心等待，解析视频完成后会有所提示，在此之前请先不要上架影视-->
<!--              </p>-->
<!--            </template>-->
<!--            <template v-if="isOk">-->
<!--              <p class="ant-upload-drag-icon">-->
<!--                <a-icon type="inbox" />-->
<!--              </p>-->
<!--              <p class="ant-upload-text">-->
<!--                视频上传完成-->
<!--              </p>-->
<!--              <p class="ant-upload-hint">-->
<!--                影视资源解析过程会很长,请耐心等待，解析视频完成后会有所提示，在此之前请先不要上架影视-->
<!--              </p>-->
<!--            </template>-->

<!--          </a-upload-dragger>-->
        </el-form-item>

      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleAddClose">关闭</el-button>
        <el-button type="primary" @click="toAddMovie">
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
  FileControllerService,
  MovieControllerService, MovieNationControllerService,
  MovieTyepControllerService, MovieYearControllerService, ParsingControllerService,
} from "../../../../../generated/index.ts";
import {message} from "ant-design-vue";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";

const isOk = ref(false);
const route = useRoute();
const router = useRouter();
const showSearch = ref(true);
const addDialogVisible = ref(false);

const videoIds = ref([]);

const fileList = ref([]);
// const currentImgURI = ref();
const AddMovieBeforeUpload = async (files,info) => {
  console.log('AddMovieBeforeUpload',files.file)
  const formData = new FormData();
  formData.append("file",files.file)
  const res = await FileControllerService.uploadVideoToM3U8UsingPost(formData);
  formAddLabelAlign.videoId = res.data;
  ElMessage({
    message:'上传成功,视频正在解析请稍后上架,系统解析完毕会发送提醒信息',
    type:"success",
  })
  isOk.value = true;
}

// const handleChange = async (info) => {
//
//   // const status = info.file.status;
//   // info.file.status = 'uploading'
//   console.log('info',info.file)
//   const formData = new FormData();
//   formData.append("file",info.file.originFileObj)
//   const res = await FileControllerService.uploadVideoToM3U8UsingPost(formData);
//   formAddLabelAlign.videoId = res.data;
//   console.log('info 之后',info.file)
//   ElMessage({
//     message:'上传成功',
//     type: "success"
//   })
// };


function beforeUpload(file) {
  if (file.type.indexOf("image/") == -1) {
    ElMessage.error("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。")

  } else {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      options.img = reader.result;
    };
  }
}

const uploadUserImg = async (data) => {
  const formdata = new FormData();
  formdata.append("file",data.file)
  const res = await FileControllerService.uploadUserImgUsingPost(formdata);
  formAddLabelAlign.img = res.data;
  data.file.status = 'done';
}

const formAddLabelAlign = reactive({
  type: null,
  nation: null,
  year: null,
  movieName: '',
  img: '',
  directorName: '',
  movieProfile: '',
  videoId: '',
  actorsName: '',
})



const formLabelAlign = reactive({
  price: '',
})

const toAdd = async () => {
  // console.log('上传的信息',formLabelAlign)
  if (formLabelAlign.price == '') {
    message.warn('请输入价格');
    return;
  }
  const res = await MovieControllerService.setPriceUsingPost(currentPriceMovie.value.id, formLabelAlign.price)
  if (res.data) {
    message.success('修改成功')
    getListData();
    handleClose();
  }
}

const toAddMovie = async () => {
  if(formAddLabelAlign.type == null){
    ElMessage({
      message: '请选择影视类型',
      type: 'warning',
    })
     return;
  }

  if(formAddLabelAlign.nation == null){
    ElMessage({
      message: '请选择影视地区',
      type: 'warning',
    })
    // message.warn('请选择影视地区')
    return;
  }
  if(formAddLabelAlign.year == null){
    ElMessage({
      message: '请选择影视年份',
      type: 'warning',
    })
    // message.warn('请选择影视年份')
    return;
  }
  if(formAddLabelAlign.movieName === ''){
    ElMessage({
      message: '请输入影视名',
      type: 'warning',
    })
    // message.warn('请输入影视名')
    return;
  }

  if(formAddLabelAlign.img === ''){
    ElMessage({
      message: '上传影视图片',
      type: 'warning',
    })
    // message.warn('上传影视图片')
    return;
  }
  if(formAddLabelAlign.directorName === ''){
    ElMessage({
      message: '请输入导演姓名',
      type: 'warning',
    })
    // message.warn('请输入导演姓名')
    return;
  }
  if(formAddLabelAlign.movieProfile === ''){
    ElMessage({
      message: '请写入影视描述',
      type: 'warning',
    })
    // message.warn('请写入影视描述')
    return;
  }
  if(formAddLabelAlign.videoId === ''){
    ElMessage({
      message: '请上传视频资源',
      type: 'warning',
    })
    // message.warn('请上传视频资源')
    return;
  }
  if(formAddLabelAlign.actorsName === ''){
    ElMessage({
      message: '请输入演员名',
      type: 'warning',
    })
    // message.warn()
    return;
  }
  // console.log('发送的信息',formAddLabelAlign);
  // return;
  const res = await MovieControllerService.addMovieUsingPost(formAddLabelAlign);
  if(res.code === 0){
    ElMessage({
      message:'添加成功',
      type: "success"
    })

    getListData();
    handleAddClose();
  }else {
    ElMessage({
      message:res.message,
      type: "warning"
    })
  }
}
//下架
const onReClick = (row) => {
  ElMessageBox.confirm(
      "确定要下架" + row.movieName + "吗",
      {type: 'warning'}
  ).then(async () => {
    const res = await MovieControllerService.setStateUsingPost(false, row.id, row.state)
    // await deleteUser(row._id)
    ElMessage.success("修改成功")

    // 重新渲染数据
    await getListData()
  })
}

const currentPriceMovie = ref();
//收费弹窗开启
const toPrice = row => {
  dialogVisible.value = true
  currentPriceMovie.value = row;
}


//上架
const onRemoveClick = row => {
  ElMessageBox.confirm(
      "确定要上架" + row.movieName + "吗",
      {type: 'warning'}
  ).then(async () => {
    const res = await MovieControllerService.setStateUsingPost(false, row.id, row.state)
    // await deleteUser(row._id)
    ElMessage.success("修改成功")
    // 重新渲染数据
    await getListData()
  })
}


//设置为会员影视
const ontoVip = row => {
  ElMessageBox.confirm(
      "确定将" + row.movieName + "设置为vip影视吗",
      {type: 'warning'}
  ).then(async () => {
    const res = await MovieControllerService.setStateUsingPost(true, row.id, row.state)
    // await deleteUser(row._id)
    ElMessage.success("修改成功")
    // 重新渲染数据
    await getListData()
  })
}

const noPrice = row => {
  ElMessageBox.confirm(
      "确定将" + row.movieName + "设置为免费影视吗",
      {type: 'warning'}
  ).then(async () => {
    const res = await MovieControllerService.setMfUsingPost(row.id, row.state);
    // await deleteUser(row._id)
    ElMessage.success("修改成功")
    // 重新渲染数据
    await getListData()
  })
}

const handleAddClose = () => {
  addDialogVisible.value = false;
  formAddLabelAlign.type = null;
  formAddLabelAlign.nation = null;
  formAddLabelAlign.year = null;
  formAddLabelAlign.movieName = '';
  formAddLabelAlign.img = '';
  formAddLabelAlign.directorName = '';
  formAddLabelAlign.movieProfile = '';
  formAddLabelAlign.videoId = '';
  formAddLabelAlign.actorsName = '';
  isOk.value = false
  // currentImgURI.value = '';
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
  console.log('getMovieTypes', movieTypes.value)
}

const getMovieNations = async () => {
  const res = await MovieNationControllerService.getMoveNationUsingGet();
  movieNations.value = res.data
  console.log('getMovieNations', movieNations.value)
}

const getMovieYears = async () => {
  const res = await MovieYearControllerService.getMovieYearUsingGet();
  movieYears.value = res.data
  console.log('getMovieYears', movieYears.value)
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
      if (item0.nation) {
        movieNations.value.forEach(item1 => {
          if (item1.id == item0.nation) {
            item0.movieNation = item1.nationName;
          }
        })
      }
      if (item0.type) {
        movieTypes.value.forEach(item1 => {
          if (item1.id == item0.type) {
            // console.log('电影类型id',item0.type,'类型id',item1.id)
            item0.movieType = item1.typeName;
            // console.log(item1.typeName)
          }
        })
      }
      if (item0.year) {
        movieYears.value.forEach(item1 => {
          if (item1.id == item0.year) {
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
  formLabelAlign.price = ''
  dialogVisible.value = false;
}
/**
 * 获取账号列表
 */
const getListData = async () => {
  loading.value = true
  console.log('searchForm.value', searchForm.value)
  // return
  const res = await MovieControllerService.listMovieByPageUsingPost(searchForm.value)
  console.log('获得的数据', res)
  if (res.data !== null) {
    res.data.records.forEach(item0 => {
      if (item0.nation) {
        movieNations.value.forEach(item1 => {
          if (item1.id == item0.nation) {
            item0.movieNation = item1.nationName;
          }
        })
      }
      if (item0.type) {
        movieTypes.value.forEach(item1 => {
          if (item1.id == item0.type) {
            // console.log('电影类型id',item0.type,'类型id',item1.id)
            item0.movieType = item1.typeName;
            // console.log(item1.typeName)
          }
        })
      }
      if (item0.year) {
        movieYears.value.forEach(item1 => {
          if (item1.id == item0.year) {
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
    path: '/adminMovie/movieDetail',
    query: row
  })

}
/**
 * 删除按钮点击事件
 */


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
const onDownTemplate = async () => {
  addDialogVisible.value = true
  videoIds.value = [];
  const res = await ParsingControllerService.getVideoListUsingPost();
  console.log('获得的数据',res.data)
  res.data.forEach(item => {
    let a = {
      id:item.id
    }
   videoIds.value.push(a);
  })
  console.log(videoIds.value)
}

</script>

<style lang="scss" scoped>
.uploadImgClass{
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
