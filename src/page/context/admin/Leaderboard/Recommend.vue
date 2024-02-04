

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
              :custom-request="uploadIndex1Img"
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
            <div>
              请选择影片
            </div>

            <div>
              <el-button type="primary">添加首页影片</el-button>
              <el-button type="primary">确定</el-button>
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
              :custom-request="uploadIndex1Img"
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
            <div>
              请选择影片
            </div>

            <div>
              <el-button type="primary">添加首页影片</el-button>
              <el-button type="primary">确定</el-button>
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
              :custom-request="uploadIndex1Img"
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
           <div>
             请选择影片
           </div>

           <div>
             <el-button type="primary">添加首页影片</el-button>
             <el-button type="primary">确定</el-button>
           </div>
         </div>
        </el-col>
      </el-row>
    </div>


  </el-card>
  </div>
</template>
<script setup lang="ts">
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";
import {ref} from "vue";
const index1Img =ref()
const index2Img =ref()
const index3Img =ref()
const  uploadIndex1Img = () => {

}
const  uploadIndex2Img = () => {

}
const  uploadIndex3Img = () => {

}

const before1Upload = () => {

}
const before2Upload = () => {

}
const before3Upload = () => {

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
</style>