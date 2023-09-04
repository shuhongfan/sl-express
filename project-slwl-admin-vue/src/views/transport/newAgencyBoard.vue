<!-- 机构详情，原品达，已废弃 -->
<template>
  <div class="new-agency">
    <div class="new-content">
      <!-- 左侧部分 -->
      <div class="left">
        <div class="left-header">
          <div class="title"><span>司机</span></div>
          <div class="content">
            <!-- 上部 -->
            <div class="content-top">
              <div class="top-left">
                <h2>300</h2>
                <p>司机总数</p>
              </div>
              <div class="top-center">
                <h2>190</h2>
                <p>待发车司机</p>
              </div>
              <div class="top-bottom">
                <h2>67</h2>
                <p>在途司机</p>
              </div>
            </div>
            <!-- 下部 -->
            <div class="content-bottom">
              <div class="bottom-left">
                <h2>108</h2>
                <p>待返回司机</p>
              </div>
              <div class="bottom-center">
                <h2>10h</h2>
                <p>人均运输时长</p>
              </div>
              <div class="bottom-bottom">
              </div>
            </div>
          </div>
        </div>
        <div class="left-center">
          <div class="title"><span>车辆装载</span></div>
          <PieChart />
        </div>
        <div class="left-bottom">
          <div class="title"><span>车辆装载</span></div>
          <BarChart />
        </div>
      </div>
      <!-- 中间部分 -->
      <div class="center">
        <div class="center-header">
          <div class="center-title">
            <img
              src="../../assets/1.png"
              alt=""
            />
            <div>
              <h3>2035622</h3>
              <p>运单总数</p>
            </div>
          </div>
          <div class="center-title">
            <img
              src="../../assets/2.png"
              alt=""
            />
            <div>
              <h3>2035622</h3>
              <p>代发运单总数</p>
            </div>
          </div>
          <div class="center-title">
            <img
              src="../../assets/3.png"
              alt=""
            />
            <div>
              <h3>2035622</h3>
              <p>运输中运单总数</p>
            </div>
          </div>
          <div class="center-title">
            <img
              src="../../assets/4.png"
              alt=""
            />
            <div>
              <h3>2035622</h3>
              <p>已到达运单总数</p>
            </div>
          </div>
        </div>
        <div class="center-content">
          <MapChart />
        </div>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <div class="right-header">
          <div class="title"><span>运输准时率</span></div>
          <div class="header-flex">
            <div class="flex-name1">
              <el-progress
                type="dashboard"
                :percentage="percentage"
                :color="colors"
              ></el-progress>
              <h3>发出准时率</h3>
            </div>
            <div class="flex-name2">
              <el-progress
                type="dashboard"
                :percentage="percentage"
                :color="colors1"
              ></el-progress>
              <h3>到达准时率</h3>
            </div>
          </div>
        </div>
        <div class="right-center">
          <div class="title"><span>异常运输</span></div>
          <div class="right-center-header">
            <div class="right-center-word">
              <h3>23784</h3>
              <p>异常运输任务总数</p>
              <h3>90%</h3>
              <p>异常运输任务百分比</p>
            </div>
            <ProgressList />
          </div>
          <div class="table-show">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="运输任务编号"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="目的地"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="延长时间"
              ></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right-bottom">
          <div class="title"><span>实时到达</span></div>
          <div class="table-show">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                label="运输任务编号"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="目的地"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="延长时间"
              ></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import MapChart from './components/MapChart'
import ProgressList from '@/components/common/progress/progress.vue'
export default {
  components: {
    PieChart,
    BarChart,
    MapChart,
    ProgressList
  },
  data() {
    return {
      percentage: 75,
      colors: [
        { color: '#75A2FD', percentage: 75 }
      ],
      colors1: [
        { color: '#8DEDC6', percentage: 75 }
      ],
      tableData: [
        {
          date: '3116869653499904',
          name: '昌平转运中心',
          address: '11.04.34'
        }, {
          date: '3116869653499904',
          name: '昌平转运中心',
          address: '11.04.34'
        }, {
          date: '3116869653499904',
          name: '昌平转运中心',
          address: '11.04.34'
        }, {
          date: '3116869653499904',
          name: '昌平转运中心',
          address: '11.04.34'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
	.new-agency {
		width: 100%;
		height: 100%;
		// height: 800px;
		overflow: hidden;
		.new-content {
			width: 100%;
			height: 100%;
			display: flex;
			.left {
				flex: 1;
				// min-width: 420px;
				display: flex;
				flex-direction: column;
				.left-header {
					flex-grow: 2;
					background: linear-gradient(to Bottom Right, #FEBA94,#F6705A);
					border-radius: 8px;
					.title {
						color: #fff;
						margin-top: 15px;
						margin-left: 15px;
						span {
							font-weight: 700;
						}
					}
					.content {
						color: #fff;
						margin-left: 30px;
						margin-top: 15px;
						.content-top {
							display: flex;
							height: 80px;
							.top-left {
								flex: 1;
								h2 {
									margin: 0;
									font-weight: 500;
									font-size: 24px;
								}
								p {
									margin: 0;
									font-size: 14px;
								}
							}
							.top-center {
								flex: 1;
								h2 {
									margin: 0;
									font-weight: 500;
									font-size: 24px;
								}
								p {
									margin: 0;
									font-size: 14px;
								}
							}
							.top-bottom {
								flex: 1;
								h2 {
									margin: 0;
									font-weight: 500;
									font-size: 24px;
								}
								p {
									margin: 0;
									font-size: 14px;
								}
							}
						}
						.content-bottom {
							display: flex;
							height: 80px;
							.bottom-left {
								flex: 1;
								h2 {
									margin: 0;
									font-weight: 500;
									font-size: 24px;
								}
								p {
									margin: 0;
									font-size: 14px;
								}
							}
							.bottom-center {
								flex: 1;
								h2 {
									margin: 0;
									font-weight: 500;
									font-size: 24px;
								}
								p {
									margin: 0;
									font-size: 14px;
								}
							}
							.bottom-bottom {
								flex: 1;
								h2 {
									margin: 0;
									font-weight: 500;
									font-size: 24px;
								}
								p {
									margin: 0;
									font-size: 14px;
								}
							}
						}
					}
				}
				.left-center {
					flex-grow: 4;
					border: 1px solid #ccc;
					margin: 15px 0;
					border-radius: 8px;
					.title {
						font-size: 16px;
						font-weight: 700;
						margin-top: 15px;
						margin-left: 15px;
					}
				}
				.left-bottom {
					flex-grow: 4;
					border: 1px solid #ccc;
					// margin: 15px 0;
					border-radius: 8px;
					.title {
						font-size: 16px;
						font-weight: 700;
						margin-top: 15px;
						margin-left: 15px;
					}
				}
			}
			.center {
				flex-grow: 2;
				margin: 0 15px;
				// background-color: wheat;
				display: flex;
				flex-direction: column;
				.center-header {
					height: 100px;
					width: 100%;
					border: 1px solid #ccc;
					border-radius: 8px;
					display: flex;
					.center-title {
						flex: 1;
						text-align: center;
						margin-top: 28px;
						img {
							display: inline-block;
							width: 34px;
							height: 34px;
							vertical-align: top;
						}
						div {
							display: inline-block;
							margin-left: 15px;
							h3 {
								margin: 0;
								text-align: left;
								color: #F04B30;
							}
							p {
								margin: 0;
								margin-top: 6px;
								text-align: left;
								font-size: 14px;
							}
						}
					}
				}
				.center-content {
					flex: 1;
					margin-top: 15px;
					border: 1px solid #ccc;
					border-radius: 8px;
				}
			}
			.right {
				flex: 1;
				min-width: 420px;
				margin-right: 20px;
				// background-color: wheat;
				display: flex;
				flex-direction: column;
				.right-header {
					border: 1px solid #ccc;
					border-radius: 8px;
					.title {
						font-size: 16px;
						font-weight: 700;
						margin-top: 15px;
						margin-left: 15px;
					}
					.header-flex {
						display: flex;
						margin-top: 15px;
						.flex-name1 {
							flex: 1;
							text-align: center;
							h3 {
								margin: 0;
								margin-bottom: 15px;
								font-size: 16px;
								font-weight: 500;
							}
						}
						.flex-name2 {
							flex: 1;
							text-align: center;
							h3 {
								margin: 0;
								margin-bottom: 15px;
								font-size: 16px;
								font-weight: 500;
							}
						}
					}
				}
				.right-center {
					flex-grow: 4;
					border: 1px solid #ccc;
					border-radius: 8px;
					margin-top: 15px;
					// overflow: hidden;
					.title {
						font-size: 16px;
						font-weight: 700;
						margin-top: 15px;
						margin-left: 15px;
					}
					.right-center-header {
						height: 220px;
						.right-center-word {
							padding-top: 60px;
							padding-left: 20px;
							box-sizing: border-box;
							h3 {
								margin: 0;
								margin-top: 15px;
								text-align: left;
								color: #F04B30;
							}
							p {
								margin: 0;
								margin-top: 6px;
								text-align: left;
								font-size: 16px;
							}
						}
					}
					.table-show {
						/deep/ .el-table td, .el-table th.is-leaf {
							border-bottom: none;
						}
					}
				}
				.right-bottom {
					flex-grow: 4;
					border: 1px solid #ccc;
					border-radius: 8px;
					margin-top: 15px;
					.title {
						font-size: 16px;
						font-weight: 700;
						margin-top: 15px;
						margin-left: 15px;
					}
				}
			}
		}
	}
</style>
