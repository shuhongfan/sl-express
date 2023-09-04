<template>
  <div>
    <div id="destination-traffic-chart" />
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.destinationTraffic()
  },
  methods: {
    destinationTraffic() {
      const myChart = echarts.init(
        document.getElementById('destination-traffic-chart')
      )
      const option = {
        color: new echarts.graphic.LinearGradient(
          1, 0, 0, 1,
          [
            { offset: 0, color: '#FEAEA1' },
            { offset: 0.5, color: '#FEA198' },
            { offset: 0.8, color: '#FD7B78' },
            { offset: 1, color: '#FD7371' }
          ]
        ),
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#283b56'
            }
          }
        },
        legend: {
          bottom: 10,
          itemWidth: 2,
          itemHeight: 8,
          data: ['订单数量(万件)', '同比增长']
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            // data: (function() {
            //   var now = new Date()
            //   var res = []
            //   var len = 10
            //   while (len--) {
            //     res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
            //     now = new Date(now - 2000)
            //   }
            //   return res
            // })()
            data: ['北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东']
          },
          {
            type: 'category',
            boundaryGap: true,
            data: (function() {
              var res = []
              var len = 10
              while (len--) {
                res.push(10 - len - 1)
              }
              return res
            })()
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: 'value',
            scale: true,
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '订单数量(万件)',
            type: 'bar',
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              emphasis: {
                barBorderRadius: 30
              },
              normal: {
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 10, 10]
              }
            },
            barWidth: '30%',
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function() {
              var res = []
              var len = 10
              while (len--) {
                res.push(Math.round(Math.random() * 1000))
              }
              return res
            })()
          },
          {
            name: '同比增长',
            type: 'line',
            itemStyle: {
              color: '#699AFC'
            },
            data: (function() {
              var res = []
              var len = 0
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0)
                len++
              }
              return res
            })()
          }
        ]
      }

      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#destination-traffic-chart {
  height: 300px;
	width: 400px;
  margin: 0 auto;
}
</style>
