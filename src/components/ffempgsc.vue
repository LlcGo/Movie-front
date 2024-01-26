
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
import {FileChunk, FileControllerService} from "../../generated";


const beforeUpload = async (files:any) => {
  const formData = new FormData();
  formData.append("file",files.file)
  upload(formData)
}

/**
 * 每一个分片
 * @param flie
 */
const upload = async (flie:any) => {
    // alert(1)
    const res = await FileControllerService.uploadVideoToM3U8UsingPost(flie);
    console.log(res);
}

  const handleChange = (info : any) => {
          console.log(info.file, info.fileList);
  }




</script>

<style scoped>

</style>
