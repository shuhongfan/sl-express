<!-- 球形echarts -->
<template>
  <div
    id="order-account-chart"
  ></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-liquidfill'
export default {
  name: 'OrderAccountChart',
  props: {
    // 订单总量折线图Y轴数据
    orderAccountChartY: {
      type: Array,
      required: true
    },
    // 订单总量折线图X轴数据
    orderAccountChartX: {
      type: Array,
      required: true
    }

  },
  data() {
    return {

    }
  },
  methods: {
    // 初始化列表
    initial() {
      const { orderAccountChartX, orderAccountChartY } = this._props
      const myChart = echarts.init(
        document.getElementById('order-account-chart')
      )
      const option = {
        tooltip: {
          borderColor: '#EBEEF5',
          borderWidth: 1,
          padding: [5, 16, 5, 14],
          trigger: 'axis',
          backgroundColor: 'rgba(255,255,255,0.96)',
          formatter: (params) => {
            return (
              '<span style="color:#818693;font-size:12px;margin-right:17px;margin-bottom:4px;display:inline-block">日期：</span>' +
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true, // 坐标轴两边留白
          data: orderAccountChartY,
          axisLabel: {
            show: true,
            // 坐标轴刻度标签的相关设置。
            interval: 0, // 设置为 1，表示『隔一个标签显示一个标签』
            textStyle: {
              color: '#20232A',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12
            },
            margin: 17
          },
          axisTick: {
            // 坐标轴刻度相关设置。
            show: false
          },
          axisLine: {
            // 坐标轴轴线相关设置
            lineStyle: {
              color: '#E5E9ED'
              // opacity:0.2
            }
          },
          splitLine: {
            // 坐标轴在 grid 区域中的分隔线。
            show: false,
            lineStyle: {
              color: '#E5E9ED'
              // 	opacity:0.1
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: '#a8aab0',
                fontStyle: 'normal',
                fontFamily: '微软雅黑',
                fontSize: 12
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E5E9ED'
                // 	opacity:0.1
              }
            }
          }
        ],
        series: [
          {
            symbol: 'circle',
            symbolSize: 6,
            name: '2019',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#E25433',
                lineStyle: {
                  color: '#E25433',
                  width: 1
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: 'rgba(225,85,54,0.21)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(225,85,54,0.00)'
                    }
                  ])
                }
              }
            },
            data: orderAccountChartX
          }
        ]
      }
      myChart.setOption(option)
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
