
<template>
<div>
  <el-card>
    <div class="content">
      设置订单超时时间：
      <el-select
          v-model="time"
          class="m-2"
          placeholder="状态"
          style="width: 240px"
          clearable
      >
        <el-option
            v-for="item in TimeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-button
          class="bt"
          type="primary"
          @click="toSet"
          v-auth="'/adminAuth/list'"
          style="margin-left: -16px"
      >确定
      </el-button>
    </div>

  </el-card>
</div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {OrderControllerService} from "../../../../../generated";
import {ElMessage} from "element-plus";

const time = ref('');

const TimeOptions = [
  {value: 60000, label: '1分钟'},
  {value: 300000, label: '5分钟'},
  {value: 600000, label: '10分钟'},
  {value: 900000, label: '15分钟'},
  {value: 1200000, label: '20分钟'},
]
const toSet = async () => {
  console.log(time.value)
  if(time.value == ''){
    ElMessage.warning('时间不能为空')
    return;
  }
  // return;
  const res = await OrderControllerService.setDdlTimeUsingPost(time.value.toString())
  if(res.data){
    ElMessage.success('修改成功')
    getTime();
  }
}

onMounted(() => {
  getTime()
})
const getTime = async () => {
 const res = await OrderControllerService.getDdlTimeUsingPost()
 time.value = Number(res.data)
 console.log('获得的时间',time.value)
}
</script>

<style scoped>
.bt{
  position: relative;
  left: 50px;
}
.content{
  margin-left: 30%;
}
.m-2{
  margin-left: 2%;
}
</style>