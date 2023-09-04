<!-- 球形echarts -->
<template>
  <div
    id="order-distribute-chart"
  ></div>
</template>

<script>
import echarts from 'echarts'
import { orderDistributeStatic } from '../static'
export default {
  name: 'OrderAccountChart',
  data() {
    return {

    }
  },
  methods: {
    // 初始化列表
    initial() {
      const myChart = echarts.init(
        document.getElementById('order-distribute-chart')
      )
      const data = orderDistributeStatic
      data.sort(function (a, b) {
        return a.value - b.value
      })
      // 订单分布echarts图表数据
      const barOption = {
        tooltip: {
          borderColor: '#EBEEF5',
          borderWidth: 1,
          padding: [5, 16, 5, 14],
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.96)',
          formatter: (params) => {
            return (
              '<span style="color:#818693;font-size:12px;margin-right:25px;margin-bottom:4px;display:inline-block">省份：</span>' +
              '<span style="color:#20232A;font-size:12px;display:inline-block">' +
              params[0].name +
              '</span>' +
              '<br />' +
              ('<span style="color:#818693;font-size:12px;margin-bottom:4px;display:inline-block">订单总量：</span>' +
                '<span style="color:#20232A;font-size:12px;display:inline-block;float:right">' +
                params[0].data +
                '笔' +
                '</span>')
            )
          }
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 17
          },
          splitLine: {
            lineStyle: {
              color: '#EBEEF5'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          height: '100%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            // rotate: 30,
            interval: 0,
            fontSize: 11,
            color: '#20232A'
          },
          axisLine: {
            lineStyle: {
              color: '#EBEEF5'
            }
          },
          axisTick: {
            show: false
          },
          data: data.map(function (item) {
            return item.name
          })
        },
        animationDurationUpdate: 1000,
        series: {
          type: 'bar',
          id: 'population',
          data: data.map(function (item) {
            return item.value
          }),
          universalTransition: true,
          barWidth: 5,
          itemStyle: {
            color: '#E15536'
          }
        }
      }
      myChart.setOption(barOption)
      // 当窗口或者大小发生改变时执行resize，重新绘制图表
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
}
</script>
<style scoped>
  #line-manage-chart {
    height: 400px;
  }
</style>
