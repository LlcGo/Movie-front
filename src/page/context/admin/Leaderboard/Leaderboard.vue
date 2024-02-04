
<template>
  <div>
  <el-card>
    <el-row :gutter="24">
      <el-col :span="12">
        <div class="center">
          各个类型推荐
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group @change="setRem" v-model="radio" class="ml-4">
              <el-radio label="1" size="large">根据热度</el-radio>
              <el-radio label="2" size="large">根据评分</el-radio>
            </el-radio-group>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="center">
          搜索后右侧推荐
          <div class="mb-2 flex items-center text-sm">
            <el-radio-group @change="setRemSearch" v-model="radio1" class="ml-4">
              <el-radio label="1" size="large">根据热度</el-radio>
              <el-radio label="2" size="large">根据评分</el-radio>
            </el-radio-group>
          </div>
        </div>

      </el-col>
    </el-row>
  </el-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {MovieControllerService} from "../../../../../generated";
import {ElMessage} from "element-plus";
 onMounted(()=>{
   getSearchRe()
   getTypeRe()
 })

const getSearchRe = async () => {
  const res = await MovieControllerService.getSearchReUsingPost();
   radio1.value = res.data;
 }

const getTypeRe = async () => {
  const res = await MovieControllerService.getTypeReUsingPost();
  radio.value = res.data;
}
 const radio = ref('1')
 const radio1 = ref('1')
 const setRem = async () => {
   const res = await MovieControllerService.setTypeReUsingPost(radio.value);
   if(res.data){
     ElMessage({message:'设置成功',type:'success'})
     getTypeRe();
   }
 }

 const setRemSearch = async () => {
   const res = await MovieControllerService.setSearchReUsingPost(radio1.value)
   if(res.data){
     ElMessage({message:'设置成功',type:'success'})
     getSearchRe()
   }
 }
</script>

<style scoped>
.center{
  position: relative;
  left: 30%;
}
</style>