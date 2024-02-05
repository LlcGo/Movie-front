<template>
  <div class="home-box">
    <el-form :inline="true" :model="searchForm" v-show="showSearch">
      <el-form-item label="订单ID" >
        <el-input v-model="searchForm.id" placeholder="请输入电影名" clearable/>
      </el-form-item>

      <el-form-item label="电影名" >
        <el-input v-model="searchForm.movieName" placeholder="请输入电影名" clearable/>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="searchForm.nickName" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>

      <el-form-item label="时间范围" style="width: 308px;">
        <el-date-picker
            v-model="searchForm.date"
            value-format="YYYY-MM-DD"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="会员类型">
        <el-select
            v-model="searchForm.vipType"
            class="m-2"
            placeholder="影片状态"
            style="width: 240px"
            clearable
        >
          <el-option
              v-for="item in VipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="订单状态">
        <el-select
            v-model="searchForm.orderState"
            class="m-2"
            placeholder="影片状态"
            style="width: 240px"
            clearable
        >
          <el-option
              v-for="item in OrderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="付费类型">
        <el-select
            v-model="searchForm.state"
            class="m-2"
            placeholder="影片状态"
            style="width: 240px"
            clearable
        >
          <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="searchEvent"
            v-auth="'/adminAuth/list'"
            style="margin-left: -16px"
        >查询
        </el-button>
      </el-form-item>
    </el-form>


    <el-card>
      <el-table :data="tableData"
                v-loading="loading"
                element-loading-text="加载中..."
                border>
        <el-table-column prop="id" label="订单ID" align="center" width="180">
        </el-table-column>
        <el-table-column label="电影名" align="center" width="180">
          <template #default="{ row }">
            <div v-if="row.movie.movieName">
              {{ row.movie.movieName }}
            </div>
            <div v-else>
              无
            </div>
          </template>
        </el-table-column>
        <el-table-column label="用户名" align="center" width="180">
          <template #default="{ row }">
            {{ row.user.nickname }}
          </template>
        </el-table-column>
        <el-table-column label="订单类型" align="center" width="200">
          <template #default="{ row }">
            <div v-if="row.state === 0">
              <el-tag type="success">会员订单</el-tag>
            </div>
            <div v-if="row.state === 1">
              <el-tag type="warning">影视订单</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="支付状态" width="200" align="center">
          <template #default="{ row }">
            <div v-if="row.orderState === 0">
              <el-tag type="warning">未支付</el-tag>
            </div>
            <div v-if="row.orderState === 1">
              <el-tag type="success">已下单</el-tag>
            </div>
            <div v-if="row.orderState === 2">
              <el-tag type="danger">已取消</el-tag>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="创建时间"  align="center">
          <template #default="{ row }">
            <div>
              {{row.createTime}}
            </div>
          </template>

        </el-table-column>
        <el-table-column label="会员类型"  align="center">
          <template #default="{ row }">
            <div v-if="row.vipType === 0">
              <el-tag type="success">月卡</el-tag>
            </div>
            <div v-else-if="row.vipType === 1">
              <el-tag type="success">季卡</el-tag>
            </div>
            <div v-else-if="row.vipType === 2">
              <el-tag type="success">年卡</el-tag>
            </div>
            <div v-else>
              <el-tag type="warning">影视订单</el-tag>
            </div>
          </template>

        </el-table-column>
<!--        <el-table-column prop="address" label="操作" min-width="100" align="center">-->
<!--          <template #default="{ row }">-->
<!--            <el-button-->
<!--                v-if="row.state == 0"-->
<!--                type="primary"-->
<!--                size="small"-->
<!--                v-auth="'/adminAuth/look'"-->
<!--                @click="onRemoveClick(row)">删除-->
<!--            </el-button>-->
<!--            <el-button-->
<!--                v-if="row.state === 1"-->
<!--                type="danger"-->
<!--                size="small"-->
<!--                v-auth="'/adminAuth/del'"-->
<!--                @click="onHuiFu(row)">恢复-->
<!--            </el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
      <!--分页组件-->

      <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="searchForm.current"
          v-model:limit="searchForm.pageSize"
          @pagination="getListData"
      />

    </el-card>



  </div>
</template>

<script setup>

import {ref, onMounted, watch, reactive} from "vue";

import {useRoute, useRouter} from "vue-router";
import {ElMessageBox, ElMessage} from 'element-plus'
import {switchServerUrl} from "@/utils/index";
import {
  BarrageControllerService, OrderControllerService,
  RemarkControllerService,
  UserControllerService
} from "../../../../../generated/index.ts";
import {message} from "ant-design-vue";
import {useUserStore} from "@/store/user.ts";
const dialogVisible = ref(false)
const route = useRoute();
const router = useRouter()
const showSearch = ref(true);





const currentUser = useUserStore();
const VipOptions = [
  {value: 0, label: '月卡'},
  {value: 1, label: '季卡'},
  {value: 2, label: '年卡'},
]

const OrderOptions = [
  {value: 0, label: '未支付'},
  {value: 1, label: '已下单'},
  {value: 2, label: '已取消'},
]

const stateOptions = [
  {value: 0, label: '会员'},
  {value: 1, label: '影视'},
]


//数据源
const searchForm = ref({
  data: null,
  id: null,
  current: 1,
  pageSize: 10,
  nickName: null,
  movieName: null,
  vipType: null,
  orderState: null,
  state: null
});

const tableData = ref([]);
const total = ref(0);
const loading = ref(false)

onMounted(() => {
  // alert(1)
  getListData();
  // getRoleData()
});




/**
 * 获取账号列表
 */
const getListData = async () => {
  console.log('发送的数据', searchForm.value)
  // return
  // loading.value = true

  // return;
  const res = await OrderControllerService.listOrderUsingPost(searchForm.value)
  console.log('获得的数据', res)
  if (res.data?.length > 0) {
    total.value = Number(res.data[0].total);
    tableData.value = res.data
  }else {
    total.value = 0
    tableData.value = []
  }
  loading.value = false
};


/**
 * 删除按钮点击事件
 */
const onRemoveClick = row => {
  ElMessageBox.confirm(
      "确定要删除" + row.movie.movieName + "的这一条评论吗",
      {type: 'warning'}
  ).then(async () => {
    const res = await BarrageControllerService.adminDeleteUsingPost(row.id)
    // await deleteUser(row._id)
    if(res.data){
      ElMessage.success("删除成功")
      // 重新渲染数据
      getListData()
      return;
    }
    ElMessage.warning(res.message)
  })
}

const onHuiFu = (row) => {
  ElMessageBox.confirm(
      "确定要恢复" + row.movie.movieName + "的这一条评论吗",
      {type: 'warning'}
  ).then(async () => {
    const res = await BarrageControllerService.adminHuiFuUsingPost(row.id)
    // await deleteUser(row._id)
    if(res.data){
      ElMessage.success("恢复成功")
      // 重新渲染数据
      getListData()
      return;
    }
    ElMessage.warning(res.message)
  })
}


const searchEvent = () => {
  console.log(searchForm.value)
  searchForm.value.current = 1;
  getListData();
};




</script>

<style lang="scss" scoped>
.home-box {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

}
</style>
