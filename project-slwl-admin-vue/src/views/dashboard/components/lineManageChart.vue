<!-- 球形echarts -->
<template>
  <div
    id="line-manage-chart"
  ></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import { lineManageStatic, geoCoordMapStatic, lineManageRegions } from '../static'
export default {
  name: 'LineManageChart',
  data() {
    return {
      geoCoordMap: geoCoordMapStatic
    }
  },
  methods: {
    // 处理线路地图图表数据
    convertData (data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].toName]
        var geoCoords = this.geoCoordMap[data[i].fromName]

        if (geoCoord) {
          res.push({
            name: data[i].toName,
            value: geoCoord.concat(data[i].value)
          })
        }
        if (geoCoords) {
          res.push({
            name: data[i].fromName,
            value: geoCoords.concat(data[i].value)
          })
        }
      }

      return res
    },
    // 初始化列表
    initial() {
      // 初始化地图数据
      this.myChart3 = echarts.init(document.getElementById('line-manage-chart'))
      var data = lineManageStatic
      const series = [
        {
          name: data[0].fromName + ' Top3',
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            // arrow箭头的颜色
            color: '#E15536',
            symbolSize: 10,
            symbol: 'arrow'
          },
          lineStyle: {
            normal: {
              color: '#E15536',
              width: 3,
              curveness: 0.2,
              type: 'dashed'
            }
          },
          data: data.map((dataItem) => {
            return {
              fromName: dataItem.fromName,
              toName: dataItem.toName,
              coords: [
                this.geoCoordMap[dataItem.fromName],
                this.geoCoordMap[dataItem.toName]
              ],
              name: dataItem.name
            }
          })
        },
        {
          cursor: 'auto',
          name: data[0].fromName + ' Top3',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}',
              color: '#333333'
            }
          },
          // 图标上的点的大小
          symbolSize: (val) => {
            return val[2] / 10
          },
          itemStyle: {
            normal: {
              // color: 'rgba(227,74,64,0.6)'
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#E15536' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#E15536' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            emphasis: {
              itemStyle: {
                color: 'red'
              }
              // areaColor: '#5389f0'
            }
          },
          data: this.convertData(data)
        }
      ]

      const option = {
        tooltip: {
          position: (point) => {
            return ['0%', '35%']
          },
          borderColor: '#EBEEF5',
          borderWidth: 1,
          padding: [15, 18, 15, 18],
          trigger: 'item',
          backgroundColor: 'rgba(255,255,255,0.96)',
          formatter: (params, ticket, callback) => {
            const {
              name: {
                lineNumber,
                lineName,
                lineType,
                fromAgency,
                toAgency,
                distance,
                cost,
                time
              }
            } = params.data
            if (params.seriesType === 'effectScatter') {
              return
            } else if (params.seriesType === 'lines') {
              return (
                '<span style="color:#20232A;font-weight:bold;margin-bottom:18px;display:inline-block">线路信息</span>' +
                '<br />' +
                ('<span style="color:#818693;font-size:12px;margin-right:100px;margin-bottom:4px;display:inline-block">线路编号：</span>' +
                  '<span style="color:#20232A;font-size:12px;display:inline-block">' +
                  lineNumber +
                  '</span>') +
                '<br />' +
                ('<span style="color:#818693;font-size:12px;margin-right:100px;margin-bottom:4px;display:inline-block">线路名称：</span>' +
                  '<span style="color:#20232A;font-size:12px">' +
                  lineName +
                  '</span>') +
                '<br />' +
                ('<span style="color:#818693;font-size:12px;margin-right:100px;margin-bottom:4px;display:inline-block">线路类型：</span>' +
                  '<span style="color:#20232A;font-size:12px">' +
                  lineType +
                  '</span>') +
                '<br />' +
                ('<span style="color:#818693;font-size:12px;margin-right:88px;margin-bottom:4px;display:inline-block">起始地机构：</span>' +
                  '<span style="color:#20232A;font-size:12px">' +
                  fromAgency +
                  '</span>') +
                '<br />' +
                ('<span style="color:#818693;font-size:12px;margin-right:88px;margin-bottom:4px;display:inline-block">目的地机构：</span>' +
                  '<span style="color:#20232A;font-size:12px">' +
                  toAgency +
                  '</span>') +
                '<br />' +
                ('<span style="color:#818693;font-size:12px;margin-right:123px;margin-bottom:4px;display:inline-block">距离：</span>' +
                  '<span style="color:#20232A;font-size:12px">' +
                  distance +
                  '</span>') +
                '<br />' +
                ('<span style="color:#818693;font-size:12px;margin-right:100px;margin-bottom:4px;display:inline-block">平均成本：</span>' +
                  '<span style="color:#20232A;font-size:12px">' +
                  cost +
                  '</span>') +
                '<br />' +
                ('<span style="color:#818693;font-size:12px;margin-right:100px;margin-bottom:4px;display:inline-block">预计时间：</span>' +
                  '<span style="color:#20232A;font-size:12px">' +
                  time +
                  '</span>')
              )
            } else {
              return params.name
            }
          }
        },
        geo: {
          silent: true,
          map: 'china',
          label: {
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          roam: false,
          //   放大我们的地图
          zoom: 1.25,
          itemStyle: {
            normal: {
              // 地域边框颜色
              borderColor: '#FDB892',
              borderWidth: 0
            },
            emphasis: {
              areaColor: '#ba586f'
            }
          },
          regions: lineManageRegions
        },
        series: series
      }
      this.myChart3.clear()
      this.myChart3.setOption(option)
      // 当窗口或者大小发生改变时执行resize，重新绘制图表
      window.addEventListener('resize', () => {
        this.myChart3.resize()
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
