<template>
  <div id="vehicle-loading-chart" />
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.vehicleLoading()
  },
  methods: {
    vehicleLoading() {
      const myChart = echarts.init(
        document.getElementById('vehicle-loading-chart')
      )
      const option = {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          // formatter: (value) => {
          //   '{a} <br/>{b} : {c} ({d}%)'
          // }
          // <span style="color:red;">.</span>可添加样式
          formatter: '{b} : {c}<br/>({d}%)'
        },
        legend: {
          show: false,
          bottom: 0,
          itemWidth: 2,
          itemHeight: 8,
          data: ['空载车', '半载车', '满载车']
        },
        series: [
          {
            name: '半径模式',
            type: 'pie',
            radius: [30, 90],
            center: ['46%', '50%'],
            roseType: 'radius',
            label: {
              fontSize: 14,
              color: '#262335'
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: 335, name: '空载车' },
              { value: 310, name: '半载车' },
              { value: 234, name: '满载车' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function(params) {
                  var colorList = [
                    {
                      c1: ' #fce5ca', // 管理
                      c2: 'red'
                    },
                    {
                      c1: ' #508DFF', // 实践
                      c2: '#26C5FE'
                    },
                    {
                      c1: '#63E587', // 操作
                      c2: '#5FE2E4'
                    }]
                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [{ // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                    offset: 0,
                    color: colorList[params.dataIndex].c1
                  }, {
                    offset: 1,
                    color: colorList[params.dataIndex].c2
                  }])
                }
              }
            }
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
#vehicle-loading-chart {
  width: 100%;
  height: 100%;
  // height: 300px;
  // margin: 0 auto;
}
</style>
