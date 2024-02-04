
<template>
<div>
  <el-card>

      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content ep-bg-purple" />
          <a-upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="before1Upload"
          >
            <img v-if="index1Img" class="uploadImgClass" :src="index1Img" alt="avatar" />
            <div v-else>
              <plus-outlined class="plus"></plus-outlined>
              <div class="ant-upload-text">添加首页轮播图</div>
            </div>
          </a-upload>
        </el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" />
          <div class="warp">
            <div v-if="!movie1">
              请选择影片
            </div>
            <div v-else>
              {{movie1.movieName}}
            </div>

            <div>
              <el-button type="primary" @click="addMovie('添加第一个轮播图影视')">添加首页影片</el-button>
              <el-button type="primary" @click="toAdd1">确定</el-button>
            </div>
          </div>
        </el-col>
      </el-row>


    <div style="margin-top: 100px">
      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content ep-bg-purple" />
          <a-upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="before2Upload"
          >
            <img v-if="index2Img" class="uploadImgClass" :src="index2Img" alt="avatar" />
            <div v-else>
              <plus-outlined class="plus"></plus-outlined>
              <div class="ant-upload-text">添加首页轮播图</div>
            </div>
          </a-upload>
        </el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" />
          <div class="warp">
            <div v-if="!movie2">
              请选择影片
            </div>
            <div v-else>
              {{movie2.movieName}}
            </div>

            <div>
              <el-button type="primary" @click="addMovie('添加第二个轮播图影视')">添加首页影片</el-button>
              <el-button type="primary" @click="toAdd2">确定</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>


    <div style="margin-top: 100px">
      <el-row :gutter="20" >
        <el-col :span="16">
          <div class="grid-content ep-bg-purple" />
          <a-upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="before3Upload"
          >
            <img v-if="index3Img" class="uploadImgClass" :src="index3Img" alt="avatar" />
            <div v-else>
              <plus-outlined class="plus"></plus-outlined>
              <div class="ant-upload-text">添加首页轮播图</div>
            </div>
          </a-upload>
        </el-col>
        <el-col :span="8"><div class="grid-content ep-bg-purple" />
         <div class="warp">
           <div v-if="!movie3">
             请选择影片
           </div>
           <div v-else>
             {{movie3.movieName}}
           </div>

           <div>
             <el-button type="primary" @click="addMovie('添加第三个轮播图影视')">添加首页影片</el-button>
             <el-button type="primary" @click="toAdd3">确定</el-button>
           </div>
         </div>
        </el-col>
      </el-row>
    </div>


    <el-dialog v-model="dialogFormVisible" :title="title" width="1000">
      <el-form :inline="true" :model="searchForm" v-show="showSearch">
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

      <el-table :data="tableData"
                v-loading="loading"
                element-loading-text="加载中..."
                highlight-current-row
                @current-change="handleCurrentChange"
                border>
        <el-table-column prop="movieName" label="电影名" width="188"></el-table-column>
        <el-table-column prop="movieNation" label="电影地区" width="199" align="center"></el-table-column>
        <el-table-column prop="movieType" width="199" label="电影类型" align="center"></el-table-column>
        <el-table-column prop="movieYear" width="199" label="电影年代" align="center"></el-table-column>
        <el-table-column label="影视图片" align="center" width="88">
          <template #default="{ row }">
            <el-image
                class="avatar"
                :src="row.img"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
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

      </el-table>
      <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="searchForm.current"
          v-model:limit="searchForm.pageSize"
          @pagination="getListData"
      />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handAddClose">取消</el-button>
          <el-button type="primary" @click="chooseMovie">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>

  </el-card>
  </div>
</template>
<script setup lang="ts">
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {onMounted, reactive, ref} from "vue";
import {
  FileControllerService,
  MovieControllerService,
  MovieNationControllerService,
  MovieTyepControllerService, MovieYearControllerService
} from "../../../../../generated";
import {message} from "ant-design-vue";
import {ElMessage} from "element-plus";
const title = ref()
const index1Img =ref('')
const index2Img =ref('')
const index3Img =ref('')
const movie1 =ref(null)
const movie2 =ref(null)
const movie3 =ref(null)
const dialogFormVisible = ref(false)
const showSearch = ref(true);
const formLabelWidth = '140px'
const loading = ref(false);
const total = ref();
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const options = [
  {value: 1, label: '已上架'},
  {value: 3, label: '会员影视'},
  {value: 2, label: '付费影视'}
]
const currentRow = ref({});
const handleCurrentChange = (val) => {
  currentRow.value = val
  console.log(currentRow.value)
}
const tableData = ref();
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
const reMovie = ref();
onMounted(()=>{
 getRe()
})

const getRe = async () => {
  const res = await MovieControllerService.getSyReUsingPost();
  reMovie.value = new Map(Object.entries(res.data))
  console.log(reMovie.value.get('1'))
  index1Img.value = reMovie.value.get('1').bigImg;
  index2Img.value = reMovie.value.get('2').bigImg;
  index3Img.value = reMovie.value.get('3').bigImg;
  const res1 = await MovieControllerService.getSyReMovieByIdUsingPost(reMovie.value.get('3').id,reMovie.value.get('2').id,reMovie.value.get('1').id)
  res1.data.forEach(item=>{
    if(item.bigImg == index1Img.value){
      movie1.value = item
    }
    if(item.bigImg == index2Img.value){
      movie2.value = item
    }
    if(item.bigImg == index3Img.value){
      movie3.value = item
    }
  })
}

//查询
const searchEvent = () => {
  console.log(searchForm.value)
  searchForm.value.current = 1;
  getListData();
};

const toAdd3 = async () => {
  if(movie3.value == null){
    ElMessage({message:'请选择影视' , type:'warning'})
    return
  }
  if(index3Img.value == ''){
    ElMessage({message:'请选择图片' , type:'warning'})
    return;
  }
  movie3.value.bigImg = index3Img.value;
  console.log(movie3.value)
  const res = await MovieControllerService.setSyReUsingPost(movie3.value,"3")
  if(res.data){
    ElMessage({message:'修改成功' , type:'success'})
    getRe();
  }
}

const toAdd1 = async () => {
  if(movie1.value == null){
    ElMessage({message:'请选择影视' , type:'warning'})
    return
  }
 if(index1Img.value == ''){
   ElMessage({message:'请选择图片' , type:'warning'})
   return;
 }
 movie1.value.bigImg = index1Img.value;
 console.log(movie1.value)
 const res = await MovieControllerService.setSyReUsingPost(movie1.value,"1")
 if(res.data){
   ElMessage({message:'修改成功' , type:'success'})
   getRe();
 }
}
const toAdd2 = async () => {
  if(movie2.value == null){
    ElMessage({message:'请选择影视' , type:'warning'})
    return
  }
  if(index2Img.value == ''){
    ElMessage({message:'请选择图片' , type:'warning'})
    return;
  }
  movie2.value.bigImg = index2Img.value;
  console.log(movie2.value)
  const res = await MovieControllerService.setSyReUsingPost(movie2.value,"2")
  if(res.data){
    ElMessage({message:'修改成功' , type:'success'})
    getRe();
  }
}

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
    tableData.value = res.data.records.filter(item=>{
         return  item.status !==0;
    });
  }
  loading.value = false
};


const addMovie = (value) => {
  title.value = value;
  dialogFormVisible.value = true
  getListData()
  getMovieTypes()
  getMovieNations()
  getMovieYears()
}

const handAddClose = () => {
  dialogFormVisible.value = false;
  currentRow.value = {};
}

const chooseMovie = () => {
  dialogFormVisible.value = false;
  console.log(title.value)
  switch (title.value){
    case '添加第一个轮播图影视':
      movie1.value = currentRow.value;
      if(currentRow.value.bigImg !== null){
        index1Img.value = currentRow.value.bigImg
      }
      break
    case '添加第二个轮播图影视':
      movie2.value = currentRow.value;
      if(currentRow.value.bigImg !== null){
        index2Img.value = currentRow.value.bigImg
      }
      break
    case '添加第三个轮播图影视' :
      movie3.value = currentRow.value;
      if(currentRow.value.bigImg !== null){
        index3Img.value = currentRow.value.bigImg
      }
      break
  }
}

const  uploadIndex1Img = async (data) => {
  console.log(data)
  const formdata = new FormData();
  formdata.append("file",data)
  const res = await FileControllerService.uploadUserImgUsingPost(formdata);
  index1Img.value = res.data;
}
const  uploadIndex2Img = async (data) => {
  const formdata = new FormData();
  formdata.append("file",data)
  const res = await FileControllerService.uploadUserImgUsingPost(formdata);
  index2Img.value = res.data;
}

const  uploadIndex3Img = async (data) => {

  const formdata = new FormData();
  formdata.append("file",data)
  const res = await FileControllerService.uploadUserImgUsingPost(formdata);
  index3Img.value = res.data;
}


const before1Upload = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      let w = img.width;
      let h = img.height;
      console.log(w,h)
      if (w >= 1000 || h >= 429){
        console.log(file)
        uploadIndex1Img(file);
        return;
      }
       ElMessage({message:'图片宽高必须大于1000与429',type:"warning"})
    }
  }

}
const before2Upload = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      let w = img.width;
      let h = img.height;
      console.log(w,h)
      if (w >= 1000 || h >= 429){
        console.log(file)
        uploadIndex2Img(file);
        return;
      }
      ElMessage({message:'图片宽高必须大于1000与429',type:"warning"})
    }
  }
}
const before3Upload = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.onload = () => {
      let w = img.width;
      let h = img.height;
      console.log(w,h)
      if (w >= 1000 || h >= 429){
        console.log(file)
        uploadIndex3Img(file);
        return;
      }
      ElMessage({message:'图片宽高必须大于1000与429',type:"warning"})
    }
  }
}
</script>

<style scoped>
:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select){
  width: 100%;
  height: 138px;
}
.warp{
  display: flex;
  width: 100%;
  height: 100%;
  //background: rebeccapurple;
  align-items: center;
  justify-content: space-around;
}
.uploadImgClass{
  width: 100%;
  height: 100%;
}
</style>