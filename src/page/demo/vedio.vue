
<template>
  <div>
<!--    <video :src="videoUrl" controls="controls" width="100%" id="myvideo"></video>-->
<!--    <NPlayer-->
<!--        ref="player"-->
<!--        :options="{ src: videoUrl }"-->
<!--    />-->

    <div v-if="flag">
          <NPlayer
              ref="player"
              :options="{ src: videoUrl }"
              width="100%"
          />
    </div>
  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../MyAxio.ts";
const videoUrl = ref();
const videoId = ref();
const flag = ref(false)
onMounted(()=>{
  playVideo(1,1);
})

const playVideo  = async (i:any, val:any)=> {
  // 显示弹框
  // this.dialogVisible = true;
  // 保存视频名字
  // this.videoName = val.videoName;
  // 保存视频id
  videoId.value = val;
  myAxios.get(`/getVideoSizeById/${Number(videoId.value)}`).then(res => {
    console.log('返回的结果--->',res);
    const totalSize = res;
    const chunkSize = Math.ceil(totalSize / 20); //分成五片 每篇是20%

    // 定义分片传输的函数
    const loadVideoChunk = (startByte:number, endByte:number) => {
      return new Promise((resolve, reject) => {
        myAxios.get(`/watchVedio`, {
          headers: {
            Range: `bytes=${startByte}-${endByte}`
          },
          params:{
            videoId: videoId.value
          },
          responseType: "blob"
        }).then(response => {
          console.log('返回的数据--->',response)
          // 返回获取到的视频分片数据
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    };


    // 创建一个数组来保存所有分片的Promise
    const chunkPromises = [] as any;

    // 获取所有分片的Promise
    for (let i = 0; i < 20; i++) {
      const startByte = i * chunkSize;
      const endByte = Math.min(startByte + chunkSize - 1, totalSize - 1);
      chunkPromises.push(loadVideoChunk(startByte, endByte));
    }


    // 执行所有分片请求，并在全部请求完成后开始播放视频
    Promise.all(chunkPromises).then(chunks => {
      // alert(1)
      // 将分片数据合并成完整的视频Blob
      const videoBlob = new Blob(chunks,{type:"video/mp4"});
      console.log('合并---------->',chunks)
      const combinVideoUrl = URL.createObjectURL(videoBlob);
      videoUrl.value = combinVideoUrl;
      console.log('合并---->',videoUrl.value)
      flag.value = true;
    }).catch(error => {
      console.error('Failed to load video:', error);
    });
  })





  //   // 执行所有分片请求，并在全部请求完成后开始播放视频
  //   Promise.all(chunkPromises).then(chunks => {
  //     // 将分片数据合并成完整的视频Blob
  //     const videoBlob = new Blob(chunks);
  //     const combinVideoUrl = URL.createObjectURL(videoBlob);
  //     videoUrl.value = combinVideoUrl;
  //   }).catch(error => {
  //     console.error('Failed to load video:', error);
  //   });
  //
  // }).catch(error => {
  //   console.error('Failed to get video size:', error);
  // });

}

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
