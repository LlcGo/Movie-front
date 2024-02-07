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
import {MovieControllerService, MovieTyepControllerService} from "../../../../../generated";

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
const movieTypeTotal = ref();
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
const allScoreAndHot = ref();

const getScoreAndHot = async () => {
  let chartDom = document.getElementById('main');
  const res = await MovieControllerService.getScoreECharsUsingGet();
  topScore.value = new Map(Object.entries(res.data))
  const resHot = await MovieControllerService.getHotECharsUsingGet();
  topHot.value = new Map(Object.entries(resHot.data))

  let keyScore = [];
  let dataScore = [];
  let dataHOt = []
  if (topHot.value != null) {
    topHot.value.forEach((value, key1, map) => {
      // console.log('遍历---》',map.get(key1), key1,)
      // console.log('value--------->',map.get(key1).length)
      dataHOt.push(map.get(key1).length)
    })
  }

  // console.log('类型', movieTypes.value)
  console.log('电影分数的数量', topScore.value)
  let option;
  if (topScore.value != null) {
    topScore.value.forEach((value, key1, map) => {
      // console.log('遍历---》',map.get(key1), key1,)
      // console.log('value--------->',map.get(key1).length)
      dataScore.push(map.get(key1).length)
      movieTypes.value.forEach(item => {
        if (item.id == key1) {
          keyScore.push(item.typeName)
        }
      })

    })
  }
  option = {
    xAxis: {
      data: keyScore
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: dataScore
      },
      {
        type: 'bar',
        data: dataHOt
      }
    ]
  };
  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
}

const getAll2 = async () => {
  let chartDom = document.getElementById('main1');
  const res = await MovieControllerService.getAllByTypeECharsUsingGet();
  movieTypeTotal.value = new Map(Object.entries(res.data))
  let data = [];
  // console.log('类型', movieTypes.value)
  // console.log('电影类型的数量', movieTypeTotal.value)
  let option;
  if (movieTypeTotal.value != null) {
    movieTypeTotal.value.forEach((value, key1, map) => {
      let data1 = {
        value:map.get(key1).length,
        name:''
      }

      // console.log('遍历---》',map.get(key1), key1,)
      // console.log('value--------->',map.get(key1).length)
      // data.push(map.get(key1).length)
      movieTypes.value.forEach(item => {
        if (item.id == key1) {
          data1.name =item.typeName
        }
      })
     data.push(data1);
    })
  }
  option = {
    title: {
      text: '所有类型电影占比',
      left: 'center'
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },

    series: [
      {
        type: 'pie',
        name: '数量占比',
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: data,
      }
    ]
  };
  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);
}

const getAll3 = async () => {
  let chartDom = document.getElementById('main');
 const res = await MovieControllerService.getScoreAndScoreECharsUsingGet();

  allScoreAndHot.value = new Map(Object.entries(res.data))

  let data = [['product', '分数', '热度',]];
  if (allScoreAndHot.value != null) {
    allScoreAndHot.value.forEach((value, key1, map) => {
      // console.log('遍历---》',map.get(key1), key1,)
      // console.log('value--------->',map.get(key1).length)
      movieTypes.value.forEach(item => {
        if (item.id == key1) {
          map.get(key1).unshift(item.typeName)
          data.push(Object.values(map.get(key1)));
        }
      })
    })
  }

  console.log('数据',data)


  let option;
  option = {
    title: {
      text: '电影分数与热度'
    },
    legend: {},
    tooltip: {},
    dataset: {
      source: data
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [{ type: 'bar' }, { type: 'bar' },]
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