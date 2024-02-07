<template>
  <div class="body">
    <div id="main"></div>
    <div id="main1">
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import * as echarts from "echarts";
import {MovieControllerService, MovieTyepControllerService, OrderControllerService} from "../../../../../generated";

onMounted(() => {
  getTypes();
  // getAll2();
  // getAll3();
  // initChart()
});
//热度
const topHot = ref();
//分数
const topScore = ref();
//总数
const vipBuy = ref();
//类型
const movieTypes = ref();


const getTypes = async () => {
  const res = await MovieTyepControllerService.getMovieNationUsingGet();
  movieTypes.value = res.data;
  // getScoreAndHot();
  getAll3()
}

// const getHot = async () => {
//   let chartDom = document.getElementById('main');
//   const res = await MovieControllerService.getHotECharsUsingGet();
//   topHot.value = new Map(Object.entries(res.data))
//   let key = [];
//   let data = [];
//   // console.log('类型', movieTypes.value)
//   console.log('电影热度的数量', topHot.value)
//   let option;
//   if (topHot.value != null) {
//     topHot.value.forEach((value, key1, map) => {
//       // console.log('遍历---》',map.get(key1), key1,)
//       // console.log('value--------->',map.get(key1).length)
//       data.push(map.get(key1).length)
//       movieTypes.value.forEach(item => {
//         if (item.id == key1) {
//           key.push(item.typeName)
//         }
//       })
//
//     })
//   }
//   option = {
//     xAxis: {
//       data: key
//     },
//     yAxis: {},
//     series: [
//       {
//         type: 'bar',
//         data: data
//       }
//     ]
//   };
//   let myChart = echarts.init(chartDom);
//   option && myChart.setOption(option);
// }
const userBy = ref();



const getAll2 = async () => {
  let chartDom = document.getElementById('main1');
  const res = await OrderControllerService.getVipECharsUsingGet();
  vipBuy.value = new Map(Object.entries(res.data))
  let data = [];
  let sum = 0;
  // console.log('类型', movieTypes.value)
  // console.log('电影类型的数量', vipBuy.value)
  let option;
  if (vipBuy.value != null) {
    vipBuy.value.forEach((value, key1, map) => {
      let data1 = {
        value: map.get(key1).length,
        name: ''
      }
      sum += map.get(key1).length
      console.log('key1',key1)
      if(key1 == 0){
        data1.name = '月卡'
      }else if(key1 == 1){
        data1.name = '季卡'
      }else {
        data1.name = '年卡'
      }
      data.push(data1);
    })
  }

  data.push({
    // make an record to fill the bottom 50%
    value: sum,
    itemStyle: {
      // stop the chart from rendering this piece
      color: 'none',
      decal: {
        symbol: 'none'
      }
    },
    label: {
      show: false
    }
  })
  console.log('买卡',data)
  console.log(sum)
  option = {
    title: {
      text: '用户购买会员类型',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: 10,
      left: 'center',
      // doesn't perfectly work with our tricks, disable it
      selectedMode: false
    },
    series: [
      {
        name: '购买数量',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        // adjust the start angle
        startAngle: 180,
        label: {
          show: true,
          formatter(param) {
            // correct the percentage
            return param.name + ' (' + param.percent * 2 + '%)';
          }
        },
        data: data
      }
    ]
  };
  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
}


const getAll3 = async () => {
  let chartDom = document.getElementById('main');
  const res = await OrderControllerService.getECharsUsingGet();

  userBy.value = new Map(Object.entries(res.data))


  let data = [];
  // console.log('类型', movieTypes.value)
  // console.log('电影类型的数量', vipBuy.value)
  // let option;
  if (userBy.value != null) {
    userBy.value.forEach((value, key1, map) => {
      let data1 = {
        value: map.get(key1).length,
        name: ''
      }
      // console.log('遍历---》',map.get(key1), key1,)
      // console.log('value--------->',map.get(key1).length)
      // data.push(map.get(key1).length)
      movieTypes.value.forEach(item => {
        if (item.id == key1) {
          data1.name = item.typeName
        }
      })
      data.push(data1);
    })
  }

  console.log('数据', data)

  let option;
  option = {
    title: {
      text: '用户购买影视数据',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      bottom: 10,
      left: 'center',
    },
    series: [
      {
        type: 'pie',
        radius: '65%',
        selectedMode: 'single',
        data: data,
        name: '购买数量占比',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
  getAll2()
}


</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

$success: #67c23a;
$warning: #e6a23c;
$danger: #f56c6c;
$primary: #409eff;


#main {
  min-height: 40rem;
  width: 50%
}

#main1 {
  min-height: 40rem;
  width: 50%
}

#main2 {
  min-height: 40rem;
  width: 50%
}

#main3 {
  min-height: 40rem;
  width: 50%
}

.body {
  //background: #1677ff;
  display: flex;
  //flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}
</style>