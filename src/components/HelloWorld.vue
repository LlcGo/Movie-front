
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
import {postFormProgress} from "../service/test.ts";
import {FileChunk} from "../../generated";


const beforeUpload = async (files:any) => {
      const chunkSize = 20 * 1024 * 1024;
      const file : Blob = files.file
      // console.log('完整的-->',file)
      //能被分成几次上传
      const totalChunks = Math.ceil(file.size / chunkSize);
      for (let i = 0; i < totalChunks; i++) {
        //每次的起始下标
         const start = i * chunkSize;
         //每次结束的下标,每次都只取最小的，最后一次就取最终的大小file.size,
        // 防止最后一次start + chunkSize，导致超出流的范围
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
     await postFormProgress(flie.chunkNumber ,flie.chunkSize,flie.file,flie.filename)
  }

  const handleChange = (info : any) => {
          console.log(info.file, info.fileList);
  }




</script>

<style scoped>

</style>
