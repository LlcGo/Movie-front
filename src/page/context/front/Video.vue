<template>
  <div>
    <div class="top">
      <div class="warp">
        <div class="videoLeft" >
          <div id="nPlayer" ref="nPlayer"/>
          <a-button v-if="currentMovie?.state == 3 && currentVedio?.videoSixUrl == currentVedio?.videoUrl" style="position: relative; color: skyblue; top: 3%;" type="ghost" @click="showModal" >购买影视即可观看全片</a-button>
          <a-button v-if="currentMovie?.state == 2 && currentUser?.userRole != 'vip'" style="position: relative; color: skyblue; top: 3%;" type="ghost">点击右上角开通会员即可观看全片</a-button>
        </div>
<!--        <div  v-if="!flag" >-->
          <div  v-if="!currentVedio" >
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
                <th style="width: 130px">弹幕内容</th>
                <th style="width: 80px;">发布时间</th>
                <th style="border-bottom-right-radius: 10%;border-top-right-radius: 10%;">操作</th>
              </tr>
                <tr v-for="barrage in showBarrage">
                  <td>{{ barrage.time }}</td>
                  <td>{{ barrage.text }}</td>
                  <td>{{ barrage.createTime }}</td>
                  <td v-if="currentUser?.id == barrage?.userId"  class="c" @click="toDelete(barrage)">删除</td>
                  <td v-else >无权限</td>
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

    <div>
      <a-modal v-model:open="open"
               @ok="nowBuy"
               width="400px"
               cancelText="取消"
               okText="购买">
        <div class="fontWarp">
          <div class="nameClass">
            {{currentMovie.movieName}}
          </div>
          <div class="priceClass">
            价格：${{currentMovie.price}}
          </div>
        </div>
        <div class="orderButton">
          <a-button @click="addOrder">提交订单稍后购买</a-button>
        </div>
        <div class="ewm">
          <img class="img2" :src="m"/>
        </div>
        <template #title>
          <div ref="modalTitleRef" style="width: 100%; cursor: move" >购买</div>
        </template>
      </a-modal>
    </div>

  </div>
</template>


<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../../../MyAxio.ts";
import {useRoute} from "vue-router";
import Player, {Popover} from 'nplayer'
import Danmaku from "@nplayer/danmaku";
import Hls from 'hls.js'
import {
  Barrage,
  BarrageAddRequest,
  BarrageControllerService, FileControllerService,
  Movie,
  MovieControllerService, OrderAddRequest, OrderByRequest, OrderControllerService,
  UserControllerService, Users, VideoUpload
} from "../../../../generated";
import dayjs from "dayjs";
import empty from '../../../assets/empty.png'
import loading from '../../../assets/loading.png'
import {message} from "ant-design-vue";
import './style.css';
import m from "../../../assets/erweima.png";
const videoUrl = ref();
const flag = ref(false)
const {query} = useRoute();
const currentMovie = ref<Movie>();
const currentBarrage = ref();
const currentVedio = ref<VideoUpload>();
const open = ref(false);
//右侧展示的barrage
const showBarrage = ref<any>([]);
const currentUser = ref<Users>()
onMounted(async () => {
  init()
  getUser()
})

const showModal = () => {
  open.value = true;
};

const nowBuy = async () => {
  if(currentUser.value == null){
    message.warn('请先登录');
    return
  }
  // alert(1)
  let data : OrderByRequest = {
    movieId: currentMovie.value.id,
    state : 1,
  }
  const res = await OrderControllerService.toBuyUsingPost(data);
  if(res.data){
    message.success('购买成功,可在我个人中心查看')
    open.value=false;
  }
}

const addOrder = async () => {
  if(currentUser.value == null){
    message.warn('请先登录');
    return
  }
  //电影下单 1
  let data:OrderAddRequest = {
    movieId:currentMovie.value.id,
    state: 1,
  }
  console.log(data);
  const res = await OrderControllerService.addOrderUsingPost(data)
  console.log(res);
  if(res.data){
    message.success('订单已提交成功,15分钟后未下单自动取消')
  }else {
    message.warn('订单已经存在,跳转至订单页面')
    router.push({
      path:'/layout/account/myOrder'
    })
  }
}

// const popover = ref();
// const btn = ref()


const getUser = async () => {
  const res = await UserControllerService.getLoginUserUsingGet();
  currentUser.value = res.data;
  console.log('用户',currentUser.value)
}

//要确认现在传过来什么
const init = async () => {
  const res  = await MovieControllerService.getMovieByIdUsingGet(query.currentMovieId) ;
  currentMovie.value = res.data;
  console.log('movie',currentMovie.value)
  getBarrage();
  playVideo(currentMovie.value.videoId,currentMovie.value.state,currentMovie.value.id);
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
        id:item.id,
        time: minute.toString().padStart(2, '0')+":"+rest_seconds.toString().padStart(2, '0'),
        text: item.text,
        createTime :  d,
        userId : item.userId
      }
      showBarrage.value.push(data);
    })
  }
  // console.log('要展示的弹幕----》',showBarrage.value)
  currentBarrage.value = {items: res.data}
  // console.log('获得的弹幕------------->', currentBarrage.value)

}


const toDelete = async (barrage:any) => {
  let data :Barrage = {
    id: barrage.id,
    userId: currentUser.value.id
  }
  console.log(data)
  // return
  const res = await BarrageControllerService.deleteUsingPost(data);
  if(res.data){
    message.success('删除成功');
    getBarrage();
  }
}




const nPlayer = () => {

  const Quantity = {
    el: document.createElement("div"),
    init() {
      this.btn = document.createElement("div");
      this.btn.textContent = "画质";
      this.el.appendChild(this.btn);
      this.popover = new Popover(this.el);
      this.btn.addEventListener("click", () => this.popover.show());
      // 点击按钮的时候展示 popover
      this.el.style.display = "none";
      // 默认隐藏
      this.el.classList.add('quantity');
    }
  }
  console.log('开始赋值----------------------->', currentBarrage.value)
  console.log(videoUrl.value)
  // console.log('1--->',Quantity.el,'2---->',Quantity.btn,'3---->',Quantity.value,'4----->',Quantity.popover)
  const player = new Player({

    /**
     * 播放器初始化
     */
    // src: 'http://localhost:7529/videoSystem/file/video/20240126/9711cac7bfc44add925d08a7095ebc80/meeting_01.m3u8', // 视频地址
    // contextMenus: ['loop', 'pip'], // 右键菜单设置项
    plugins: [new Danmaku(currentBarrage.value)],// 弹幕配置项
    controls: [
      [
        "play",
        "volume",
        "time",
        "spacer",
        Quantity,
        "airplay",
        "settings",
        "web-fullscreen",
        "fullscreen"
      ],
      ["progress"]
    ],
    bpControls: {}
  })

  const hls = new Hls()
  // flag.value = true;
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      console.log('levels',hls.levels)
      // 4. 给清晰度排序，清晰度越高的排在最前面
      hls.levels.sort((a, b) => b.height - a.height);
      const frag = document.createDocumentFragment();
      // 5. 给与清晰度对应的元素添加，点击切换清晰度功能
      const listener = (i) => (init) => {
        if(i == 0){
         if(currentUser.value == null){
           message.success("请登录才能切换至1080p")
           return;
         }
        }
        const last = Quantity.itemElements[Quantity.itemElements.length - 1];
        const prev = Quantity.itemElements[Quantity.value] || last;
        const el = Quantity.itemElements[i] || last;
        prev.classList.remove("quantity_item-active");
        el.classList.add("quantity_item-active");
        Quantity.btn.textContent = el.textContent;
        if (init !== true && player.paused)
          setTimeout(() => player.play());
        // 因为 HLS 切换清晰度会使正在播放的视频暂停，我们这里让它再自动恢复播放
        Quantity.value = hls.currentLevel = hls.loadLevel = i;
        Quantity.popover.hide();
      };
      // 6. 添加清晰度对应元素
      Quantity.itemElements = hls.levels.map((l, i) => {
        const el = document.createElement("div");
        el.textContent = l.height + "P";
        // alert(l.height)
        if (l.height === 1080) el.textContent += " 超清";
        if (l.height === 720) el.textContent += " 高清";
        if (l.height === 480) el.textContent += " 清晰";
        el.classList.add("quantity_item");
        el.addEventListener("click", listener(i));
        frag.appendChild(el);
        return el;
      });

      const el = document.createElement("div");
      el.textContent = "自动";
      el.addEventListener("click", listener(-1));
      el.classList.add("quantity_item");
      frag.appendChild(el);
      Quantity.itemElements.push(el);
      // 这里再添加一个 `自动` 选项，HLS 默认是根据网速自动切换清晰度

      Quantity.popover.panelEl.appendChild(frag);
      Quantity.el.style.display = "block";

      listener(hls.currentLevel)(true);
      console.log(Quantity)
      // 初始化当前清晰度
    });

    hls.loadSource(currentVedio.value.videoUrl)
  })
  // Quantity.el.classList.add('ll')
  hls.attachMedia(player.video)
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

const playVideo = async (videoId:any,state:any,movieId:any) => {
  const res = await FileControllerService.getVideoUsingGet(movieId,state,videoId)

  currentVedio.value = res.data;
  console.log('获得的video',currentVedio.value)
  nPlayer()
}

const sendBarrage = async (data: BarrageAddRequest) => {
  if(currentUser.value == null){
    message.warn('登陆后才能发送弹幕')
    return;
  }
  const res = await BarrageControllerService.addBarrageUsingPost(data)
  if (res.data){
    message.success('弹幕已成功发送,等待管理员审核通过即可展示')
    getBarrage();
  }
  console.log(res);
}



// const playVideo = async (i: any, val: any) => {
//   // 显示弹框
//   // this.dialogVisible = true;
//   // 保存视频名字
//   // this.videoName = val.videoName;
//   // 保存视频id
//   videoId.value = val;
//   myAxios.get(`/getVideoSizeById/${Number(videoId.value)}`).then(res => {
//     console.log('返回的结果--->', res);
//     const totalSize = res;
//     const chunkSize = Math.ceil(totalSize / 20); //已20为基准取除，看分成的份数
//
//     // 定义分片传输的函数
//     const loadVideoChunk = (startByte: number, endByte: number) => {
//       return new Promise((resolve, reject) => {
//         myAxios.get(`/watchVedio`, {
//           headers: {
//             Range: `bytes=${startByte}-${endByte}`
//           },
//           params: {
//             videoId: videoId.value
//           },
//           responseType: "blob"
//         }).then(response => {
//           console.log('返回的数据--->', response)
//           // 返回获取到的视频分片数据
//           resolve(response);
//         }).catch(error => {
//           reject(error);
//         });
//       });
//     };
//
//
//     // 创建一个数组来保存所有分片的Promise
//     const chunkPromises = [] as any;
//
//     // 获取所有分片的Promise
//     for (let i = 0; i < 20; i++) {
//       const startByte = i * chunkSize;
//       const endByte = Math.min(startByte + chunkSize - 1, totalSize - 1);
//       chunkPromises.push(loadVideoChunk(startByte, endByte));
//     }
//
//
//     // 执行所有分片请求，并在全部请求完成后开始播放视频
//     Promise.all(chunkPromises).then(chunks => {
//       // alert(1)
//       // 将分片数据合并成完整的视频Blob
//       const videoBlob = new Blob(chunks, {type: "video/mp4"});
//       console.log('合并---------->', chunks)
//       const combinVideoUrl = URL.createObjectURL(videoBlob);
//       videoUrl.value = combinVideoUrl;
//       console.log('合并---->', videoUrl.value)
//       flag.value = true;
//       nPlayer()
//     }).catch(error => {
//       console.error('Failed to load video:', error);
//     });
//   })
//
//
//   //   // 执行所有分片请求，并在全部请求完成后开始播放视频
//   //   Promise.all(chunkPromises).then(chunks => {
//   //     // 将分片数据合并成完整的视频Blob
//   //     const videoBlob = new Blob(chunks);
//   //     const combinVideoUrl = URL.createObjectURL(videoBlob);
//   //     videoUrl.value = combinVideoUrl;
//   //   }).catch(error => {
//   //     console.error('Failed to load video:', error);
//   //   });
//   //
//   // }).catch(error => {
//   //   console.error('Failed to get video size:', error);
//   // });
//
// }

</script>

<style scoped>
body {
  font-family: sans-serif;
}



.c:hover{
  cursor: pointer;
  color: skyblue;
}
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


.nameClass{
  margin-bottom: 5%;
  font-size: 20px;
}
.priceClass{
  font-size: 18px;
}
.fontWarp{
  position: absolute;
  width: 40%;
  left: 60%;
  top: 35%;
}
.ewm{
  margin-left: 2%;
  width: 200px;
}
.img2{
  width: 80%;
  height: 80%;
}
.orderButton{
  position: absolute;
  top: 81%;
  left: 23%;
}

</style>
