<template>
  <div>
    <div class="top">
      <div class="warp">
        <div class="videoLeft" >
          <div id="nPlayer" ref="nPlayer"/>
        </div>
        <div  v-if="!flag" >
          <div >
            <img class="loadingImg" :src="loading">
            <a-spin class="loading" size="large" />
          </div>
        </div>
        <div class="videoRight">
          <div class="show father" >
            <!--          暂无弹幕-->
            <a-empty v-if="showBarrage.length <= 0"
                class="emptyRight"
                :image="empty"
                :image-style="{height: '180px',}"
            >
              <template #description>
                  <span>
                    暂无弹幕
                  </span>
              </template>
            </a-empty>


            <table style="text-align: left" v-if="showBarrage.length > 0" >
              <tr>
                <th style="width: 50px; border-bottom-left-radius: 10%;border-top-left-radius: 10%;">时间</th>
                <th style="width: 160px">弹幕内容</th>
                <th style="border-bottom-right-radius: 10%;border-top-right-radius: 10%;">发布时间</th>
              </tr>
                <tr v-for="barrage in showBarrage">
                  <td>{{ barrage.time }}</td>
                  <td>{{ barrage.text }}</td>
                  <td>{{ barrage.createTime }}</td>
                </tr>
            </table>
          </div>
        </div>
      </div>

    </div>
    <!--    <video :src="videoUrl" controls="controls" width="100%" id="myvideo"></video>-->
    <!--    <NPlayer-->
    <!--        ref="player"-->
    <!--        :options="{ src: videoUrl }"-->
    <!--    />-->


  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../../MyAxio.ts";
import {useRoute} from "vue-router";
import Player from 'nplayer'
import Danmaku from "@nplayer/danmaku";
import {BarrageAddRequest, BarrageControllerService, Movie, MovieControllerService} from "../../../../generated";
import dayjs from "dayjs";
import empty from '../../../assets/empty.png'
import loading from '../../../assets/loading.png'

const videoUrl = ref();
const videoId = ref();
const flag = ref(false)
const {query} = useRoute();
const currentMovie = ref<Movie>();
const currentBarrage = ref();

//右侧展示的barrage
const showBarrage = ref<any>([]);

onMounted(async () => {
  init()

})

//要确认现在传过来什么
const init = async () => {
  const res  = await MovieControllerService.getMovieByIdUsingGet(query.currentMovieId) ;
  currentMovie.value = res.data;
  getBarrage();
  playVideo(currentMovie.value.videoId,currentMovie.value.videoId);
}

const getBarrage = async () => {
  const res = await BarrageControllerService.getBarrageByIdUsingGet(currentMovie.value.id)
  console.log('获得的弹幕------------->', res.data)
  if(res.data?.length > 0){
    let redata = res.data
    showBarrage.value = [];
    //显示的时间
    redata?.forEach(item => {
      let d = dayjs(item.createTime).format("MM-DD hh:mm")
      let spTime = item.time?.toString().split(".");
      var minute = Math.floor(spTime[0]/60);
      var rest_seconds = spTime[0]%60;
      // console.log(d)
      let data = {
        time: minute.toString().padStart(2, '0')+":"+rest_seconds.toString().padStart(2, '0'),
        text: item.text,
        createTime :  d
      }
      showBarrage.value.push(data);
    })
  }
  // console.log('要展示的弹幕----》',showBarrage.value)
  currentBarrage.value = {items: res.data}
  // console.log('获得的弹幕------------->', currentBarrage.value)

}


/**
 * 播放器初始化
 */
const nPlayer = () => {
  console.log('开始赋值----------------------->', currentBarrage.value)
  console.log(videoUrl.value)
  const player = new Player({
    src: videoUrl.value, // 视频地址
    contextMenus: ['loop', 'pip'], // 右键菜单设置项
    plugins: [new Danmaku(currentBarrage.value)],// 弹幕配置项
    // controls: [['play', 'progress', 'time', 'web-fullscreen', 'fullscreen'], [], ['spacer', 'settings']]
  })
  player.mount('#nPlayer')


  // 链接服务器
  // var ws = new WebSocket('ws://10.10.8.223:9283/lbh')
  // ws.onopen = function () {
  //   console.log('数据发送中...')
  // }
  // ws.onmessage = function (e) {
  //   this.isMeDanmu = e.data
  //   console.log('接受到消息:' + e.data)
  // }
  // ws.onclose = function () {
  //   console.log('连接已关闭...')
  // }
  // function sendMsg(msg) {
  //   ws.send(msg)
  // }
  player.on('DanmakuSend', opts => {
    console.log('发送前信息-----------》', opts)
    let data: BarrageAddRequest = {
      appTime: opts.time,
      color: opts.color,
      content: opts.text,
      movieId: currentMovie.value.id,
    }
    console.log("发送时候的信息----->", data)
    sendBarrage(data);
    // console.log('用户当前发送的弹幕信息', opts)
  })
}


const sendBarrage = async (data: BarrageAddRequest) => {
  const res = await BarrageControllerService.addBarrageUsingPost(data)
  console.log(res);
}

const playVideo = async (i: any, val: any) => {
  // 显示弹框
  // this.dialogVisible = true;
  // 保存视频名字
  // this.videoName = val.videoName;
  // 保存视频id
  videoId.value = val;
  myAxios.get(`/getVideoSizeById/${Number(videoId.value)}`).then(res => {
    console.log('返回的结果--->', res);
    const totalSize = res;
    const chunkSize = Math.ceil(totalSize / 20); //已20为基准取除，看分成的份数

    // 定义分片传输的函数
    const loadVideoChunk = (startByte: number, endByte: number) => {
      return new Promise((resolve, reject) => {
        myAxios.get(`/watchVedio`, {
          headers: {
            Range: `bytes=${startByte}-${endByte}`
          },
          params: {
            videoId: videoId.value
          },
          responseType: "blob"
        }).then(response => {
          console.log('返回的数据--->', response)
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
      const videoBlob = new Blob(chunks, {type: "video/mp4"});
      console.log('合并---------->', chunks)
      const combinVideoUrl = URL.createObjectURL(videoBlob);
      videoUrl.value = combinVideoUrl;
      console.log('合并---->', videoUrl.value)
      flag.value = true;
      nPlayer()
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

.loadingWarp{
  position: relative;
  left: 20%;
  top: 25%;
}

.loadingImg{
  position: absolute;
  top: 25%;
  left: 25%;
}

.loading{
  position: absolute;
  top: 18%;
  left: 35%;
}


.emptyRight{
  position: absolute;
  top: 20%;
  color: #F1F2F3;
}



table {
  table-layout: fixed;
  width: 300px;
  color: #6d757a;
  font-size: 12px;

}

.father::-webkit-scrollbar{
  width:10px;
  height:10px;
  /**/
}
.father::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
.father::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
.father::-webkit-scrollbar-thumb:hover{
  background: #333;
}
.father::-webkit-scrollbar-corner{
  background: #179a16;
}

table tr th {
  background: #F1F2F3;
  position: sticky;
  top: 0;
  height: 30px;
}

td {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 首列固定/最后一列固定*/
th:first-child,
th:last-child,
td:first-child,
td:last-child {
  position: sticky;
  left: 0;
  right: 0;
}

/* 表头首列和最后一列强制最顶层 */
th:last-child,
th:first-child {
  z-index: 3;
  /*左上角单元格z-index，切记要设置，不然表格纵向横向滚动时会被该单元格右方或者下方的单元格遮挡*/
}


.show{
  width: 320px;
  height: 599px;
  margin-left: 5%;
  overflow:auto;
}

#nPlayer {
  height: 100%;
  border-radius: 10px;
}

.top {
  height: 100vh;
  width: 100%;
  background: #282832;
}

.videoLeft {
  float: left;
  height: 600px;
  width: 70%
}

.videoRight {
  float: right;
  width: 30%;
  height: 600px;
}

.warp {
  width: 80vw;
  height: 600px;
  position: relative;
  top: 15%;
  margin-left: 11%;
}



:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-table-wrapper .ant-table.ant-table-small .ant-table-tbody tr td){
  padding: 1px 1px;
  margin-left: 2%;
  background: transparent;
  overflow: hidden;
  pointer-events: auto;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
}
:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-table-wrapper .ant-table.ant-table-small .ant-table-thead tr th){
  padding: 5px 5px;
  color: #6d757a;

  background: transparent;
  border: none;
}

:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-table-wrapper .ant-table.ant-table-small ){
  background: transparent;
  border: none;
}

:deep(:where(.css-dev-only-do-not-override-3m4nqy).ant-table-wrapper .ant-table-thead  tr th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before){
  background-color:transparent;
}




</style>
