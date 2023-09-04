<!-- 球形echarts -->
<template>
  <div
    :id="id"
    style="height: 208px; margin: 0 auto"
  ></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-liquidfill'
export default {
  name: 'BallChart',
  props: {
    // 数据
    data: {
      type: Array,
      required: true
    },
    // 选择器
    id: {
      type: String,
      required: true
    },
    // 球和球之间的横向间隔距离
    xDistance: {
      type: Number,
      required: true
    }
  },
  methods: {
    //   color: '', // 链群颜色值
    //   labelColor: '', // 文本字体颜色
    //   otherColer: ''// 波浪其他地方填充色
    // 初始化列表
    initial() {
      const { data, id, xDistance } = this._props
      const myChart = echarts.init(document.getElementById(id))
      const series = []
      data.forEach((item, index) => {
        series.push(
          {
            type: 'liquidFill',
            radius: '60%',
            center: [`${xDistance * (index + 0.5)}%`, '45%'],
            data: [
              {
                // NOTE 为了扩大鼠标悬浮热区 tooltip展示
                value: 1,
                itemStyle: {
                  color: 'transparent'
                }
              },
              item.value / 100
            ],
            backgroundStyle: {
              color: [item.otherColor]
            },
            color: [item.color],
            itemStyle: {
              shadowColor: 'transparent'
            },
            outline: {
              borderDistance: 5,
              itemStyle: {
                borderWidth: 1,
                borderColor: item.color
              }
            },
            label: {
              position: ['50%', '50%'],
              formatter: function () {
                return `${item.value}%`
              },
              fontSize: 16,
              color: [item.labelColor],
              insideColor: [item.labelColor],
              fontWeight: 'normal'
            }
          }
        )
      })

      const option = {
        series: series,
        backgroundColor: 'white'
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#ballChart{
  /deep/ div{
    cursor: default !important;
  }
}
#ballChartIng{
  /deep/ div{
    cursor: default !important;
  }
}
</style>
