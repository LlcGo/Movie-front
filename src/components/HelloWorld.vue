
<template>
  <a-upload-dragger
      name="file"
      :multiple="true"
      @change="handleChange"
      :customRequest="beforeUpload"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">
      Click or drag file to this area to upload
    </p>
    <p class="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </a-upload-dragger>
</template>

<script setup lang="ts">
import {postFormProgress, uploadFile} from "../service/test.ts";
import {FileChunk, FileControllerService} from "../../generated";


const beforeUpload = async (files:any) => {
      const chunkSize = 20 * 1024 * 1024;
      const file : Blob = files.file
      // console.log('完整的-->',file)
      //能被分成几次上传
      const totalChunks = Math.ceil(file.size / chunkSize);
      for (let i = 0; i < totalChunks; i++) {
         const start = i * chunkSize;
         const end = Math.min(start + chunkSize,file.size);
         const chunk = file.slice(start,end);
        console.log('chunk-->',chunk)
        let fileChunk : FileChunk  = {
          chunkNumber: i,
          file : chunk,
          chunkSize: chunkSize,
          filename: file.name
        }
         await upload(fileChunk);
      }

}

/**
 * 每一个分片
 * @param flie
 */
const upload = async (flie:any) => {
     await postFormProgress(flie.chunkNumber + 1,flie.chunkSize,flie.file,flie.filename)
  }

  const handleChange = (info : any) => {
          console.log(info.file, info.fileList);
  }




</script>

<style scoped>

</style>
