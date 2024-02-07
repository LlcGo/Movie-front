<template>
  <div>
    <el-card>
      <div class="content">
        <div>
          设置月卡费用：<el-input-number v-model="yk" :min="0" :max="1000" /> 元
          <el-button class="bt" type="primary" @click="setYK">确定</el-button>
        </div>
        <div>
          设置季卡费用：<el-input-number v-model="jk" :min="0" :max="1000" /> 元
          <el-button class="bt" type="primary" @click="setJK">确定</el-button>
        </div>
        <div>
          设置年卡费用：<el-input-number v-model="nk" :min="0" :max="1000"  /> 元
          <el-button class="bt" type="primary" @click="setNK">确定</el-button>
        </div>
      </div>

    </el-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {OrderControllerService} from "../../../../../generated";
import {ElMessage} from "element-plus";

const yk = ref(1);
const jk = ref(1);
const nk = ref(1);

onMounted(() => {
  getJK();
  getNK();
  getYK();
})
const getYK = async () => {
  const res = await OrderControllerService.getYkUsingPost()
  yk.value = Number(res.data)
  console.log('获得的时间', yk.value)
}

const getJK = async () => {
  const res = await OrderControllerService.getJkUsingPost()
  jk.value = Number(res.data)
  console.log('获得的时间', jk.value)
}

const getNK = async () => {
  const res = await OrderControllerService.getNkUsingPost()
  nk.value = Number(res.data)
  console.log('获得的时间', nk.value)
}

const setJK = async () => {
  const res = await OrderControllerService.setJkUsingPost(jk.value.toString())
  console.log('res', res)
  if (res.data) {
    ElMessage.success('设置成功')
  }
}

const setYK = async () => {
  const res = await OrderControllerService.setYkUsingPost(yk.value.toString())
  console.log('res', res)
  if (res.data) {
    ElMessage.success('设置成功')
  }
}

const setNK = async () => {
  const res = await OrderControllerService.setNkUsingPost(nk.value.toString())
  console.log('res', res)
  if (res.data) {
    ElMessage.success('设置成功')
  }
}
</script>

<style scoped>
.bt{
  position: relative;
  left: 6%;
}
.content {
  position: relative;
  left: 30%;
  display: flex;
  width: 500px;
  height: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

</style>