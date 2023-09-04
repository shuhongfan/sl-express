// 定义工作台中需要的常量
// 执行中任务数据
export const taskingListData = [
  {
    value: 0,
    label: '运输中',
    url: '/business/order-manage?status=',
    status: 23005
  },
  {
    value: 0,
    label: '派送中',
    url: '/business/order-manage?status=',
    status: 23008
  }
]
// 待办任务数据
export const backlogListdata = [
  {
    value: 0,
    label: '待取件',
    url: '/business/order-manage?status=',
    status: 23000
  },
  {
    value: 0,
    label: '待派件',
    url: '/business/order-manage?status=',
    status: 23007
  },
  {
    value: 0,
    label: '未分配运输',
    url: '/transport/transport-task?status=',
    status: 1
  },
  {
    value: 0,
    label: '超时运输',
    url: '/transport/transport-task?status=',
    status: 5
  }
]
// 常用功能数据
export const useFeatureList = [
  // 常用功能部分数据
  {
    url: require('../../assets/useFeature1.png'), // 图片地址
    label: '快递作业', // 名称
    link: '/branches/operational'// 点击跳转去往地址
  },
  {
    url: require('../../assets/useFeature2.png'),
    label: '运输任务',
    link: '/transport/transport-task'
  },
  {
    url: require('../../assets/useFeature3.png'),
    label: '线路管理',
    link: '/transport/line-manage'
  },
  {
    url: require('../../assets/useFeature4.png'),
    label: '车辆管理',
    link: '/transit/vehicle'
  },
  {
    url: require('../../assets/useFeature5.png'),
    label: '司机管理',
    link: '/transit/driver'
  },
  {
    url: require('../../assets/useFeature6.png'),
    label: '运费查询',
    link: '/transit/freight-manage'
  }
]
// 订单分布数据
export const orderDistributeStatic = [
  { name: '广东', value: 2500 },
  { name: '山东', value: 2400 },
  { name: '江苏', value: 2200 },
  { name: '浙江', value: 2100 },
  { name: '河南', value: 1900 },
  { name: '四川', value: 1700 },
  { name: '湖北', value: 1600 },
  { name: '台湾', value: 1400 },
  { name: '福建', value: 1300 },
  { name: '湖南', value: 1200 },
  { name: '上海', value: 1050 },
  { name: '安徽', value: 950 },
  { name: '河北', value: 800 },
  { name: '北京', value: 700 },
  { name: '陕西', value: 600 },
  { name: '江西', value: 550 },
  { name: '重庆', value: 450 },
  { name: '辽宁', value: 400 },
  { name: '云南', value: 390 },
  { name: '广西', value: 380 },
  { name: '香港', value: 370 },
  { name: '山西', value: 350 },
  { name: '内蒙古', value: 320 },
  { name: '贵州', value: 300 },
  { name: '新疆', value: 280 },
  { name: '天津', value: 260 },
  { name: '黑龙江', value: 240 },
  { name: '吉林', value: 220 },
  { name: '甘肃', value: 200 },
  { name: '海南', value: 180 },
  { name: '宁夏', value: 160 },
  { name: '青海', value: 140 },
  { name: '西藏', value: 120 },
  { name: '澳门', value: 100 }
]

// 线路管理地图数据
export const lineManageStatic = [
  {
    toName: '西安',
    fromName: '乌鲁木齐',
    value: 100,
    name: {
      lineNumber: 'XL877654',
      lineName: '乌鲁木齐直达西安',
      lineType: '接驳路线',
      fromAgency: '乌鲁木齐分拣中心',
      toAgency: '西安分拣中心',
      distance: '2561千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '成都',
    fromName: '拉萨',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '拉萨直达成都',
      lineType: '接驳路线',
      fromAgency: '拉萨分拣中心',
      toAgency: '成都分拣中心',
      distance: '1991千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '北京',
    fromName: '西安',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '西安直达北京',
      lineType: '接驳路线',
      fromAgency: '西安分拣中心',
      toAgency: '北京分拣中心',
      distance: '1075千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '哈尔滨',
    fromName: '北京',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '北京直达哈尔滨',
      lineType: '接驳路线',
      fromAgency: '北京分拣中心',
      toAgency: '哈尔滨分拣中心',
      distance: '1233千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '西安',
    fromName: '成都',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '成都直达西安',
      lineType: '接驳路线',
      fromAgency: '成都分拣中心',
      toAgency: '西安分拣中心',
      distance: '797千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '西安',
    fromName: '海口',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '海口直达西安',
      lineType: '接驳路线',
      fromAgency: '海口分拣中心',
      toAgency: '西安分拣中心',
      distance: '2069千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '北京',
    fromName: '海口',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '海口直达北京',
      lineType: '接驳路线',
      fromAgency: '海口分拣中心',
      toAgency: '北京分拣中心',
      distance: '2598千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '上海',
    fromName: '海口',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '海口直达上海',
      lineType: '接驳路线',
      fromAgency: '海口分拣中心',
      toAgency: '上海分拣中心',
      distance: '1987千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '上海',
    fromName: '北京',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '北京直达上海',
      lineType: '接驳路线',
      fromAgency: '北京分拣中心',
      toAgency: '上海分拣中心',
      distance: '1210千米',
      cost: '8368元',
      time: '1678分钟'
    }
  },
  {
    toName: '台北',
    fromName: '上海',
    value: 100,
    name: {
      lineNumber: 'XL877655',
      lineName: '上海直达台北',
      lineType: '接驳路线',
      fromAgency: '上海分拣中心',
      toAgency: '台北分拣中心',
      distance: '1210千米',
      cost: '8368元',
      time: '1678分钟'
    }
  }
]

// 地图信息城市坐标
export const geoCoordMapStatic = {
  上海: [121.4648, 31.2891],
  东莞: [113.8953, 22.901],
  东营: [118.7073, 37.5513],
  中山: [113.4229, 22.478],
  临汾: [111.4783, 36.1615],
  临沂: [118.3118, 35.2936],
  丹东: [124.541, 40.4242],
  丽水: [119.5642, 28.1854],
  乌鲁木齐: [87.9236, 43.5883],
  佛山: [112.8955, 23.1097],
  保定: [115.0488, 39.0948],
  兰州: [103.5901, 36.3043],
  包头: [110.3467, 41.4899],
  北京: [116.4551, 40.2539],
  北海: [109.314, 21.6211],
  南京: [118.8062, 31.9208],
  南宁: [108.479, 23.1152],
  南昌: [116.0046, 28.6633],
  南通: [121.1023, 32.1625],
  厦门: [118.1689, 24.6478],
  台州: [121.1353, 28.6688],
  合肥: [117.29, 32.0581],
  呼和浩特: [111.4124, 40.4901],
  咸阳: [108.4131, 34.8706],
  哈尔滨: [127.9688, 45.368],
  唐山: [118.4766, 39.6826],
  嘉兴: [120.9155, 30.6354],
  大同: [113.7854, 39.8035],
  大连: [122.2229, 39.4409],
  天津: [117.4219, 39.4189],
  太原: [112.3352, 37.9413],
  威海: [121.9482, 37.1393],
  宁波: [121.5967, 29.6466],
  宝鸡: [107.1826, 34.3433],
  宿迁: [118.5535, 33.7775],
  常州: [119.4543, 31.5582],
  广州: [113.5107, 23.2196],
  廊坊: [116.521, 39.0509],
  延安: [109.1052, 36.4252],
  张家口: [115.1477, 40.8527],
  徐州: [117.5208, 34.3268],
  德州: [116.6858, 37.2107],
  惠州: [114.6204, 23.1647],
  成都: [103.9526, 30.7617],
  扬州: [119.4653, 32.8162],
  承德: [117.5757, 41.4075],
  拉萨: [91.1865, 30.1465],
  无锡: [120.3442, 31.5527],
  日照: [119.2786, 35.5023],
  昆明: [102.9199, 25.4663],
  杭州: [119.5313, 29.8773],
  枣庄: [117.323, 34.8926],
  柳州: [109.3799, 24.9774],
  株洲: [113.5327, 27.0319],
  武汉: [114.3896, 30.6628],
  汕头: [117.1692, 23.3405],
  江门: [112.6318, 22.1484],
  沈阳: [123.1238, 42.1216],
  沧州: [116.8286, 38.2104],
  河源: [114.917, 23.9722],
  泉州: [118.3228, 25.1147],
  泰安: [117.0264, 36.0516],
  泰州: [120.0586, 32.5525],
  济南: [117.1582, 36.8701],
  济宁: [116.8286, 35.3375],
  海口: [110.3893, 19.8516],
  淄博: [118.0371, 36.6064],
  淮安: [118.927, 33.4039],
  深圳: [114.5435, 22.5439],
  清远: [112.9175, 24.3292],
  温州: [120.498, 27.8119],
  渭南: [109.7864, 35.0299],
  湖州: [119.8608, 30.7782],
  湘潭: [112.5439, 27.7075],
  滨州: [117.8174, 37.4963],
  潍坊: [119.0918, 36.524],
  烟台: [120.7397, 37.5128],
  玉溪: [101.9312, 23.8898],
  珠海: [113.7305, 22.1155],
  盐城: [120.2234, 33.5577],
  盘锦: [121.9482, 41.0449],
  石家庄: [114.4995, 38.1006],
  福州: [119.4543, 25.9222],
  秦皇岛: [119.2126, 40.0232],
  绍兴: [120.564, 29.7565],
  聊城: [115.9167, 36.4032],
  肇庆: [112.1265, 23.5822],
  舟山: [122.2559, 30.2234],
  苏州: [120.6519, 31.3989],
  莱芜: [117.6526, 36.2714],
  菏泽: [115.6201, 35.2057],
  营口: [122.4316, 40.4297],
  葫芦岛: [120.1575, 40.578],
  衡水: [115.8838, 37.7161],
  衢州: [118.6853, 28.8666],
  西宁: [101.4038, 36.8207],
  西安: [109.1162, 34.2004],
  贵阳: [106.6992, 26.7682],
  连云港: [119.1248, 34.552],
  邢台: [114.8071, 37.2821],
  邯郸: [114.4775, 36.535],
  郑州: [113.4668, 34.6234],
  鄂尔多斯: [108.9734, 39.2487],
  重庆: [107.7539, 30.1904],
  金华: [120.0037, 29.1028],
  铜川: [109.0393, 35.1947],
  银川: [106.3586, 38.1775],
  镇江: [119.4763, 31.9702],
  长春: [125.8154, 44.2584],
  长沙: [113.0823, 28.2568],
  长治: [112.8625, 36.4746],
  阳泉: [113.4778, 38.0951],
  青岛: [120.4651, 36.3373],
  韶关: [113.7964, 24.7028],
  台北: [121.5, 25.05]
}

// 线路管理省区域颜色
export const lineManageRegions = [
  {
    name: '南海诸岛',
    value: 0,
    itemStyle: {
      normal: {
        opacity: 0,
        label: {
          show: false
        }
      }
    }
  },
  {
    name: '北京',
    itemStyle: {
      normal: {
        areaColor: '#FFE4B5'
      }
    }
  },
  {
    name: '天津',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '上海',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '重庆',
    itemStyle: {
      normal: {
        areaColor: '#FFE4B5'
      }
    }
  },
  {
    name: '河北',
    itemStyle: {
      normal: {
        areaColor: '#FF9739'
      }
    }
  },
  {
    name: '河南',
    itemStyle: {
      normal: {
        areaColor: '#FFE4B5'
      }
    }
  },
  {
    name: '云南',
    itemStyle: {
      normal: {
        areaColor: '#FFC257'
      }
    }
  },
  {
    name: '辽宁',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '黑龙江',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '湖南',
    itemStyle: {
      normal: {
        areaColor: '#FFC257'
      }
    }
  },
  {
    name: '安徽',
    itemStyle: {
      normal: {
        areaColor: '#FFC257'
      }
    }
  },
  {
    name: '山东',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '新疆',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '江苏',
    itemStyle: {
      normal: {
        areaColor: '#FF9739'
      }
    }
  },
  {
    name: '浙江',
    itemStyle: {
      normal: {
        areaColor: '#FFE4B5'
      }
    }
  },
  {
    name: '江西',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '湖北',
    itemStyle: {
      normal: {
        areaColor: '#FF9739'
      }
    }
  },
  {
    name: '广西',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '甘肃',
    itemStyle: {
      normal: {
        areaColor: '#FF9739'
      }
    }
  },
  {
    name: '山西',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '内蒙古',
    itemStyle: {
      normal: {
        areaColor: '#FFE4B5'
      }
    }
  },
  {
    name: '陕西',
    itemStyle: {
      normal: {
        areaColor: '#FFC257'
      }
    }
  },
  {
    name: '吉林',
    itemStyle: {
      normal: {
        areaColor: '#FF9739'
      }
    }
  },
  {
    name: '福建',
    itemStyle: {
      normal: {
        areaColor: '#FF9739'
      }
    }
  },
  {
    name: '贵州',
    itemStyle: {
      normal: {
        areaColor: '#FF9739'
      }
    }
  },
  {
    name: '广东',
    itemStyle: {
      normal: {
        areaColor: '#FFE4B5'
      }
    }
  },
  {
    name: '青海',
    itemStyle: {
      normal: {
        areaColor: '#FFC257'
      }
    }
  },
  {
    name: '西藏',
    itemStyle: {
      normal: {
        areaColor: '#FFE4B5'
      }
    }
  },
  {
    name: '四川',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '宁夏',
    itemStyle: {
      normal: {
        areaColor: '#ECDC7E'
      }
    }
  },
  {
    name: '海南',
    itemStyle: {
      normal: {
        areaColor: '#FFC257'
      }
    }
  },
  {
    name: '台湾',
    itemStyle: {
      normal: {
        areaColor: '#FFC257'
      }
    }
  },
  {
    name: '香港',
    itemStyle: {
      normal: {
        areaColor: '#dc9bbb'
      }
    }
  },
  {
    name: '澳门',
    itemStyle: {
      normal: {
        areaColor: '#e0f7cc'
      }
    }
  }
]
