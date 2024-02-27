<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" @click="edit">修改影片信息</el-button>
    </el-card>
    <el-card>
      <div id="movieInfoBox" class="user-info-box">
        <!-- 标题 -->
        <h2 class="title">影片信息</h2>

        <div class="header">
          <!-- 头部渲染表格 -->
          <!-- 头像渲染 -->
          <div class="avatar">
            <img :src="movieInfo.img">
          </div>
<!--          <img class="avatar" :src="movieInfo.img">-->
          <el-descriptions :column="2" border>
            <el-descriptions-item label="影片ID">{{ movieInfo.id }}</el-descriptions-item>
            <el-descriptions-item label="影片名">
              {{ movieInfo.movieName }}
            </el-descriptions-item>
            <!--            -->
            <el-descriptions-item label="年份">
              {{ movieInfo.movieYear }}
            </el-descriptions-item>
            <el-descriptions-item label="地区">
              {{ movieInfo.movieNation }}
            </el-descriptions-item>
            <el-descriptions-item label="类型">
              {{ movieInfo.movieType }}
            </el-descriptions-item>
            <el-descriptions-item label="导演名" class="outText">
              {{ movieInfo.directorName }}
            </el-descriptions-item>
            <el-descriptions-item label="演员名">
              {{ movieInfo.actorsName }}
            </el-descriptions-item>
            <el-descriptions-item label="影视资源id">
              {{ movieInfo.videoId }}
            </el-descriptions-item>
          </el-descriptions>

        </div>
        <div class="body">
          <!-- 内容渲染表格 -->
          <el-descriptions v-if="movieInfo?.movieProfile?.length > 0" direction="vertical" :column="1" border>
            <el-descriptions-item label="影视描述" :span="2">
              {{ movieInfo?.movieProfile }}
            </el-descriptions-item>
          </el-descriptions>
          <el-descriptions v-else direction="vertical" :column="1" border>
            <el-descriptions-item label="影视描述" :span="2">
              <el-tag size="small">暂无</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </el-card>

    <el-dialog
        v-model="dialogVisible"
        title="修改影视"
        width="50%"
        :before-close="handleEditClose"
    >
      <!--    <span>This is a message</span>-->
      <div style="margin: 20px"/>
      <el-form
          label-position="top"
          label-width="100px"
          :model="formEditLabelAlign"
          style="max-width: 800px"
      >

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="影片名">
              <el-input v-model="formEditLabelAlign.movieName"/>
            </el-form-item>
            <el-form-item label="地区">
              <el-select
                  v-model="formEditLabelAlign.nation"
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
              <el-input v-model="formEditLabelAlign.directorName"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="年份">
              <el-select
                  v-model="formEditLabelAlign.year"
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
              <!--              <el-input v-model="formEditLabelAlign.year"/>-->
            </el-form-item>


            <el-form-item label="类型">
              <el-select
                  v-model="formEditLabelAlign.type"
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
              <el-input v-model="formEditLabelAlign.actorsName" placeholder="多个演员请使用,分隔"/>
            </el-form-item>
            <!--            <el-form-item label="影视图片 下载完获取">-->
            <!--              <el-input v-model="formEditLabelAlign.img"/>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="视频id 下载完后去">-->
            <!--              <el-input v-model="formEditLabelAlign.videoId"/>-->
            <!--            </el-form-item>-->
          </el-col>
        </el-row>
        <el-form-item label="影视描述">
          <el-input v-model="formEditLabelAlign.movieProfile"
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
                    <img v-if="formEditLabelAlign.img" class="uploadImgClass" :src="formEditLabelAlign.img" alt="avatar" />
                    <div v-else>
                      <loading-outlined v-if="loading"></loading-outlined>
                      <plus-outlined v-else></plus-outlined>
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                </el-form-item>

        <el-form-item label="选择影视ID">
          <el-select
              v-model="formEditLabelAlign.videoId"
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
        <el-button @click="handleEditClose">关闭</el-button>
        <el-button type="primary" @click="toEditMovie">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>


<script setup>
import {useRoute} from 'vue-router'
import {ref, onMounted, watch, reactive} from "vue";
import {message} from "ant-design-vue";
import {
  FileControllerService,
  MovieControllerService,
  MovieNationControllerService,
  MovieTyepControllerService, MovieYearControllerService, ParsingControllerService,
  UserControllerService
} from "../../../../../generated/index.ts";
import {useApp} from "@/store/modules/app.ts";

import {ElMessage} from "element-plus";
import {getItem, setItem} from "@/utils/storage.js";
const fileList = ref([])
const store = useApp();
const flag = ref(true);
const dialogVisible = ref(false);
const route = useRoute();
const movieInfo = ref({})
const tempVideoId = ref('');
const isOk = ref(false)
const videoIds = ref([]);
const handleEditClose = () => {
  dialogVisible.value = false;
  isOk.value = false
  tempVideoId.value = '';
}


const formEditLabelAlign = reactive({
  id: null,
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

const AddMovieBeforeUpload = async (files,info) => {
  console.log('AddMovieBeforeUpload',files.file)
  const formData = new FormData();
  formData.append("file",files.file)
  const res = await FileControllerService.uploadVideoToM3U8UsingPost(formData);
  tempVideoId.value = res.data;
  ElMessage({
    message:'修改成功,视频正在解析请稍后上架,系统解析完毕会发送提醒信息',
    type:"success",
  })
  isOk.value = true;
}


const movieTypes = ref([])
const movieNations = ref([])
const movieYears = ref([])
const getInit = () => {
  if (flag.value) {
    const current =  getItem('tagsView')
    for (let i = 0; i < current.length; i++) {
      if (current[i].name === route.name) {
        console.log('store.tagsViewList[i]', current[i].query)
        if(current[i].query.actorsName.length > 18){
          current[i].query.actorsName = current[i].query.actorsName.substring(0,18) + '...'
        }
        movieInfo.value = current[i].query
        getFormEditLabelAlign(current[i].query)
      }
    }
  }
}

onMounted(() => {
  // alert(1)/
  getInit();
  getMovieTypes()
  getMovieNations()
  getMovieYears()
})

const uploadUserImg = async (data) => {
  const formdata = new FormData();
  formdata.append("file",data.file)
  const res = await FileControllerService.uploadUserImgUsingPost(formdata);
  formEditLabelAlign.img = res.data;
}
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

const toEditMovie = async () => {
  if (formEditLabelAlign.type == null) {
    ElMessage({
      message: '请选择影视类型',
      type: 'warning',
    })
    return;
  }

  if (formEditLabelAlign.nation == null) {
    ElMessage({
      message: '请选择影视地区',
      type: 'warning',
    })
    // message.warn('请选择影视地区')
    return;
  }
  if (formEditLabelAlign.year == null) {
    ElMessage({
      message: '请选择影视年份',
      type: 'warning',
    })
    // message.warn('请选择影视年份')
    return;
  }
  if (formEditLabelAlign.movieName === '') {
    ElMessage({
      message: '请输入影视名',
      type: 'warning',
    })
    // message.warn('请输入影视名')
    return;
  }

  if (formEditLabelAlign.img === '') {
    ElMessage({
      message: '上传影视图片',
      type: 'warning',
    })
    // message.warn('上传影视图片')
    return;
  }
  if (formEditLabelAlign.directorName === '') {
    ElMessage({
      message: '请输入导演姓名',
      type: 'warning',
    })
    // message.warn('请输入导演姓名')
    return;
  }
  if (formEditLabelAlign.movieProfile === '') {
    ElMessage({
      message: '请写入影视描述',
      type: 'warning',
    })
    // message.warn('请写入影视描述')
    return;
  }
  if (formEditLabelAlign.videoId === '') {
    ElMessage({
      message: '请上传视频资源',
      type: 'warning',
    })
    // message.warn('请上传视频资源')
    return;
  }
  if (formEditLabelAlign.actorsName === '') {
    ElMessage({
      message: '请输入演员名',
      type: 'warning',
    })
    // message.warn()
    return;
  }
  movieTypes.value.forEach(item => {
    if(item.typeName === formEditLabelAlign.type){
      formEditLabelAlign.type = item.id
    }
  })
  movieYears.value.forEach(item => {
    // console.log(item)
    if(item.yearName === formEditLabelAlign.year){
      formEditLabelAlign.year = item.id
    }
  })
  movieNations.value.forEach(item => {
    // console.log(item)
    if(item.nationName === formEditLabelAlign.nation){
      formEditLabelAlign.nation = item.id
    }
  })
  console.log('tempVideoId.value',tempVideoId.value)
  if(tempVideoId.value !== ''){
    formEditLabelAlign.videoId = tempVideoId.value;
    // return
  }
  // return
  console.log('formEditLabelAlign',formEditLabelAlign);



  const res = await MovieControllerService.updateMovieUsingPost(formEditLabelAlign);
  if (res.code === 0) {
    movieInfo.value = formEditLabelAlign;
    movieYears.value.forEach(item => {
      if(item.id === formEditLabelAlign.year){
        movieInfo.value.movieYear = item.yearName
      }
    })
    movieNations.value.forEach(item => {
      if(item.id === formEditLabelAlign.nation){
        movieInfo.value.movieNation = item.nationName;
      }
    })
    movieTypes.value.forEach(item => {
      if(item.id === formEditLabelAlign.type){
        movieInfo.value.movieType = item.typeName;
      }
    })
    const currentTage =  getItem('tagsView')
    currentTage.forEach(item =>{
      if(item.name === route.name){
        console.log(item)
        item.query = movieInfo.value;
        console.log('修改后',item)
      }
    })
    console.log(currentTage)
    setItem("tagsView",currentTage)
    ElMessage({
      message: '修改成功',
      type: "success"
    })
    dialogVisible.value = false;
    getInit();
  }else {
    ElMessage({
      message:res.message,
      type: "warning"
    })
  }
}



const getFormEditLabelAlign = (movie) => {
  formEditLabelAlign.id = Number(movie.id)
  formEditLabelAlign.type = movie.movieType
  formEditLabelAlign.nation = movie.movieNation
  formEditLabelAlign.year = movie.movieYear
  formEditLabelAlign.movieName = movie.movieName
  formEditLabelAlign.img = movie.img
  formEditLabelAlign.directorName = movie.directorName
  formEditLabelAlign.movieProfile = movie.movieProfile
  formEditLabelAlign.videoId = Number(movie.videoId)
  formEditLabelAlign.actorsName = movie.actorsName
  console.log(formEditLabelAlign.actorsName.length)
  if(formEditLabelAlign.actorsName.length > 18){
    formEditLabelAlign.actorsName = formEditLabelAlign.actorsName.substring(0,18) + '...'
  }
}



watch(
    () => route.query.id,
    val => {
      if (val) {
          if(route.query.actorsName.length > 18){
            route.query.actorsName = route.query.actorsName.substring(0,18) + '...'
          }
        movieInfo.value = route.query
        getFormEditLabelAlign(route.query)
        console.log("watch= ", route.query)
        for (let i = 0; i < store.tagsViewList.length; i++) {
          if (store.tagsViewList[i].name === route.name) {
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

const edit = async () => {
  dialogVisible.value = true
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
.print-box {
  margin-bottom: 20px;
  text-align: right;
}

.outText{
  white-space: nowrap;
}

img{
  height: 100%;
  width: 100%;
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
      width: 10%;
      height: 158px;
      background: #1677ff;
      box-sizing: border-box;
      border: 1px solid #ebeef5;
      border-right: none;
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

:deep(.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell) {
  border: var(--el-descriptions-table-border);
  padding: 8px 11px;
  overflow: hidden;
  height: 39px;
  width: 35px;
  text-overflow: ellipsis;
}
</style>
