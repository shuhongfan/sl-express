"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_api_order = require("../../pages/api/order.js");
var utils_index = require("../../utils/index.js");
require("../../utils/request.js");
require("../../utils/env.js");
require("../../pages/api/login.js");
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_net_fail = common_vendor.resolveComponent("net-fail");
  (_component_nav_bar + _easycom_uni_icons2 + _component_net_fail)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const twoLine = common_vendor.ref();
    let scrollHeight = common_vendor.ref("");
    common_vendor.useStore();
    const orderStatus = common_vendor.ref();
    const orderId = common_vendor.ref();
    const orderInfo = common_vendor.reactive({
      estimatedStartTime: "",
      estimatedArrivalTime: "",
      receiverName: "",
      receiverAddress: "",
      receiverProvince: "",
      receiverPhone: "",
      senderName: "",
      senderAddress: "",
      senderProvince: "",
      senderPhone: "",
      goods: "",
      goodsWeight: "",
      paymentMethod: "",
      amount: "",
      transportOrderId: "",
      id: ""
    });
    const netStatus = common_vendor.ref(true);
    let transportOrderId = common_vendor.ref("");
    let haveDriveredLine = common_vendor.reactive([]);
    let notHaveDriveredLine = common_vendor.reactive([]);
    let points = common_vendor.reactive([]);
    let carLocation = common_vendor.reactive({
      data: {
        lng: "",
        lat: ""
      }
    });
    let polyline = common_vendor.reactive({
      data: []
    });
    let covers = common_vendor.reactive({
      data: []
    });
    common_vendor.onLoad((options) => {
      orderId.value = options.orderId;
      transportOrderId.value = options.transportOrderId;
      getOrderDetailFunc(options.transportOrderId);
      common_vendor.index.getSystemInfo({
        success: (res) => {
          scrollHeight.value = "height:" + (res.screenHeight - 290) + "px";
        }
      });
    });
    const getOrderLineFunc = () => {
      pages_api_order.getOrderLine(transportOrderId.value).then((res) => {
        if (res.data.lastPoint) {
          carLocation.data = {
            longitude: res.data.lastPoint.lng,
            latitude: res.data.lastPoint.lat
          };
        }
        points = res.data.pointList.map((item) => {
          return {
            longitude: item.lng,
            latitude: item.lat
          };
        });
        if (res.data.status === 1) {
          notHaveDriveredLine = points;
          polyline.data = [{
            points,
            color: "#000000",
            width: 5,
            dottedLine: true
          }];
          covers.data = [
            {
              id: 2,
              latitude: points[0].latitude,
              longitude: points[0].longitude,
              iconPath: "../../static/startPoint.png",
              height: 18,
              width: 18,
              customCallout: {
                anchorY: 0,
                anchorX: 0,
                display: "ALWAYS"
              },
              title: "\u59CB\u53D1\u5730",
              areaName: orderInfo.senderProvince
            },
            {
              id: 1,
              latitude: points[points.length - 1].latitude,
              longitude: points[points.length - 1].longitude,
              iconPath: "../../static/endPoint.png",
              height: 18,
              width: 18,
              customCallout: {
                anchorY: 0,
                anchorX: 0,
                display: "ALWAYS"
              },
              title: "\u76EE\u7684\u5730",
              areaName: orderInfo.receiverProvince
            }
          ];
        } else if (res.data.status === 2) {
          findPoint();
          covers.data = [
            {
              id: 2,
              latitude: points[0].latitude,
              longitude: points[0].longitude,
              iconPath: "../../static/startPoint.png",
              height: 18,
              width: 18,
              customCallout: {
                anchorY: 0,
                anchorX: 0,
                display: "ALWAYS"
              },
              title: "\u59CB\u53D1\u5730",
              areaName: orderInfo.senderProvince
            },
            {
              id: 1,
              latitude: points[points.length - 1].latitude,
              longitude: points[points.length - 1].longitude,
              iconPath: "../../static/endPoint.png",
              height: 18,
              width: 18,
              customCallout: {
                anchorY: 0,
                anchorX: 0,
                display: "ALWAYS"
              },
              title: "\u76EE\u7684\u5730",
              areaName: orderInfo.receiverProvince
            },
            {
              id: 4,
              latitude: res.data.lastPoint ? res.data.lastPoint.lat : "",
              longitude: res.data.lastPoint ? res.data.lastPoint.lng : "",
              iconPath: "../../static/carPoint.png",
              height: 40,
              width: 40
            }
          ];
        } else if (res.data.status === 3) {
          findPoint();
          covers.data = [
            {
              id: 1,
              latitude: points[points.length - 1].latitude,
              longitude: points[points.length - 1].longitude,
              iconPath: "../../static/endPoint.png",
              height: 18,
              width: 18,
              customCallout: {
                anchorY: 0,
                anchorX: 0,
                display: "ALWAYS"
              },
              title: "\u76EE\u7684\u5730",
              areaName: orderInfo.receiverProvince
            },
            {
              id: 3,
              latitude: res.data.lastPoint ? res.data.lastPoint.lat : "",
              longitude: res.data.lastPoint ? res.data.lastPoint.lng : "",
              iconPath: "../../static/courierPoint.png",
              height: 40,
              width: 40,
              customCallout: {
                anchorY: 0,
                anchorX: 0,
                display: "ALWAYS"
              }
            }
          ];
        } else {
          haveDriveredLine = points;
          polyline.data = [{
            points,
            color: "#E25433",
            width: 5
          }];
          covers.data = [
            {
              id: 2,
              latitude: points[0].latitude,
              longitude: points[0].longitude,
              iconPath: "../../static/startPoint.png",
              height: 18,
              width: 18,
              customCallout: {
                anchorY: 0,
                anchorX: 0,
                display: "ALWAYS"
              },
              title: "\u59CB\u53D1\u5730",
              areaName: orderInfo.senderProvince
            },
            {
              id: 1,
              latitude: points[points.length - 1].latitude,
              longitude: points[points.length - 1].longitude,
              iconPath: "../../static/endPoint.png",
              height: 18,
              width: 18,
              customCallout: {
                anchorY: 0,
                anchorX: 0,
                display: "ALWAYS"
              },
              title: "\u76EE\u7684\u5730",
              areaName: orderInfo.receiverProvince
            }
          ];
        }
      });
    };
    const findPoint = () => {
      const distanceList = [];
      let pointIndex = null;
      points.map((item) => {
        distanceList.push(GetDistance(item.latitude, item.longitude, carLocation.data.latitude, carLocation.data.longitude));
      });
      const minNum = Math.min(...distanceList);
      pointIndex = distanceList.indexOf(minNum);
      haveDriveredLine = [{
        points: points.slice(0, pointIndex),
        color: "#E25433",
        width: 5
      }];
      notHaveDriveredLine = [{
        points: points.slice(pointIndex, points.length - 1),
        color: "#000",
        width: 5,
        dottedLine: true
      }];
      polyline.data = [haveDriveredLine[0], notHaveDriveredLine[0]];
    };
    const GetDistance = (lat1, lng1, lat2, lng2) => {
      var radLat1 = lat1 * Math.PI / 180;
      var radLat2 = lat2 * Math.PI / 180;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180 - lng2 * Math.PI / 180;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 1e4) / 1e4;
      return s;
    };
    const handleCopy = (value) => {
      common_vendor.index.setClipboardData({
        data: value,
        showToast: false,
        success: () => {
          common_vendor.index.hideToast();
          common_vendor.index.hideKeyboard();
          common_vendor.index.showToast({
            title: "\u590D\u5236\u6210\u529F",
            icon: "success",
            duration: 1e3
          });
        }
      });
    };
    const handleToRefresh = () => {
      getOrderDetailFunc();
    };
    const handleOrderCancel = () => {
      common_vendor.index.navigateTo({
        url: "/subPages/order-cancel/index?orderId=" + orderId.value
      });
    };
    const strInit = (value) => {
      let strText = value;
      let replaceText = [];
      for (let i = 0; i <= 10; i++) {
        replaceText.push("" + i);
      }
      for (let i = 0; i < replaceText.length; i++) {
        var replaceString = '<span style="color: red;">' + replaceText[i] + "</span>";
        strText = strText.replace(RegExp(replaceText[i], "g"), replaceString);
      }
      strText = strText.replace(RegExp("red", "g"), "#E63E32");
      return strText;
    };
    const showOrderStatus = (status) => {
      switch (status) {
        case 21e3:
          return "\u5F85\u652F\u4ED8";
        case 23e3:
          return "\u5F85\u53D6\u4EF6";
        case 230011:
          return "\u5DF2\u53D6\u6D88";
        case 23001:
          return "\u5DF2\u53D6\u4EF6";
        case 23005:
          return "\u8FD0\u9001\u4E2D";
        case 22e3:
          return "\u5DF2\u5173\u95ED";
        case 23008:
          return "\u6D3E\u9001\u4E2D";
        case 23009:
          return "\u5DF2\u7B7E\u6536";
        case 23010:
          return "\u5DF2\u62D2\u6536";
      }
    };
    const logisticsInfo = common_vendor.reactive({
      data: []
    });
    const handleToElectronicStub = () => {
      common_vendor.index.navigateTo({
        url: "/subPages/electronic-stub/index?orderId=" + orderId.value
      });
    };
    const getOrderDetailFunc = (params) => {
      pages_api_order.getOrderDetail(orderId.value).then((res) => {
        orderStatus.value = res.data.status;
        const {
          estimatedArrivalTime,
          estimatedStartTime,
          receiverName,
          senderName,
          receiverProvince,
          receiverCity,
          receiverCounty,
          receiverAddress,
          senderProvince,
          senderCity,
          senderCounty,
          senderAddress,
          orderCargoVOS,
          paymentMethod,
          amount,
          senderPhone,
          receiverPhone,
          transportOrderId: transportOrderId2,
          updated,
          transportOrderPointVOS,
          id
        } = res.data;
        orderInfo.estimatedStartTime = estimatedStartTime;
        orderInfo.estimatedArrivalTime = estimatedArrivalTime;
        orderInfo.receiverName = receiverName;
        orderInfo.senderName = senderName;
        orderInfo.receiverAddress = receiverProvince.name + receiverCity.name + receiverCounty.name + receiverAddress;
        orderInfo.senderAddress = senderProvince.name + senderCity.name + senderCounty.name + senderAddress;
        orderInfo.goods = orderCargoVOS[0].name + (orderCargoVOS[0].goodsType ? "(" + orderCargoVOS[0].goodsType.name + ")" : "");
        orderInfo.goodsWeight = orderCargoVOS[0].totalWeight;
        orderInfo.paymentMethod = paymentMethod === 1 ? "\u5BC4\u4ED8" : "\u5230\u4ED8";
        orderInfo.amount = amount;
        orderInfo.receiverPhone = receiverPhone;
        orderInfo.senderPhone = senderPhone;
        orderInfo.receiverProvince = receiverCity.name;
        orderInfo.senderProvince = senderCity.name;
        orderInfo.transportOrderId = transportOrderId2;
        orderInfo.updated = updated;
        orderInfo.id = id;
        logisticsInfo.data = transportOrderPointVOS.reverse();
        if ([23e3, 230011, 22e3].includes(orderStatus.value)) {
          common_vendor.nextTick(() => {
            common_vendor.index.createSelectorQuery().select(".send-desc").boundingClientRect((res2) => {
              let height = res2.height;
              let line = height / 15;
              twoLine.value = line;
            }).exec();
          });
        }
        if (params && params !== "null")
          getOrderLineFunc();
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
        netStatus.value = false;
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "\u8BA2\u5355\u8BE6\u60C5"
        }),
        b: [23001, 23005, 23008, 23009, 23010].includes(orderStatus.value)
      }, [23001, 23005, 23008, 23009, 23010].includes(orderStatus.value) ? {
        c: common_vendor.f(common_vendor.unref(covers).data, (item, index, i0) => {
          return common_vendor.e({
            a: [1, 2].includes(item.id)
          }, [1, 2].includes(item.id) ? {
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.areaName),
            d: item.id
          } : [3].includes(item.id) ? {
            f: item.id
          } : {}, {
            e: [3].includes(item.id),
            g: index
          });
        }),
        d: common_vendor.unref(covers).data.filter((item) => item.latitude),
        e: common_vendor.unref(polyline).data,
        f: common_vendor.unref(covers).data
      } : {}, {
        g: netStatus.value
      }, netStatus.value ? common_vendor.e({
        h: common_vendor.t([23e3, 22e3, 230011].includes(orderStatus.value) ? "\u8BA2" : "\u8FD0"),
        i: common_vendor.t([23e3, 22e3, 230011].includes(orderStatus.value) ? orderInfo.id : orderInfo.transportOrderId),
        j: common_vendor.o(($event) => handleCopy([23e3, 22e3, 230011].includes(orderStatus.value) ? orderInfo.id : orderInfo.transportOrderId)),
        k: [23001, 23005, 23008, 23009, 23010].includes(orderStatus.value)
      }, [23001, 23005, 23008, 23009, 23010].includes(orderStatus.value) ? {
        l: common_vendor.p({
          type: "right",
          size: "15",
          color: "white"
        }),
        m: common_vendor.o(handleToElectronicStub)
      } : {}, {
        n: common_vendor.t(showOrderStatus(orderStatus.value)),
        o: [230011, 22e3, 23009, 23010].includes(orderStatus.value)
      }, [230011, 22e3, 23009, 23010].includes(orderStatus.value) ? {
        p: common_vendor.t(orderStatus.value === 230011 ? "\u53D6\u6D88" : orderStatus.value === 22e3 ? "\u5173\u95ED" : orderStatus.value === 23009 ? "\u7B7E\u6536" : "\u62D2\u7B7E"),
        q: common_vendor.t(common_vendor.unref(utils_index.handleTimeToStrTime)(orderInfo.updated))
      } : {
        r: common_vendor.t(orderInfo.estimatedStartTime ? orderStatus.value === 23e3 ? "\u9884\u8BA1" + common_vendor.unref(utils_index.handleTimeToStrTime)(orderInfo.estimatedStartTime) + "\u524D\u4E0A\u95E8" : "\u9884\u8BA1" + common_vendor.unref(utils_index.handleTimeToStrTime)(orderInfo.estimatedArrivalTime) + "\u524D\u9001\u8FBE" : "")
      }, {
        s: common_vendor.t(orderInfo.senderProvince),
        t: common_vendor.n([21e3, 23e3, 23001, 23005, 23008].includes(orderStatus.value) ? "green-arrow" : ""),
        v: common_vendor.n([23009, 23010].includes(orderStatus.value) ? "red-arrow" : ""),
        w: common_vendor.n([230011, 22e3].includes(orderStatus.value) ? "gray-arrow" : ""),
        x: common_vendor.t(orderInfo.receiverProvince),
        y: [23e3, 230011, 22e3].includes(orderStatus.value)
      }, [23e3, 230011, 22e3].includes(orderStatus.value) ? {
        z: twoLine.value >= 2 ? 1 : "",
        A: common_vendor.t(orderInfo.senderName),
        B: common_vendor.t(orderInfo.senderPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")),
        C: common_vendor.t(orderInfo.senderAddress),
        D: common_vendor.t(orderInfo.receiverName),
        E: common_vendor.t(orderInfo.receiverPhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")),
        F: common_vendor.t(orderInfo.receiverAddress),
        G: common_vendor.t(orderInfo.goods),
        H: common_vendor.t(orderInfo.goodsWeight),
        I: common_vendor.t(orderInfo.paymentMethod),
        J: common_vendor.t(orderInfo.amount),
        K: common_vendor.s(common_vendor.unref(scrollHeight))
      } : {
        L: common_vendor.f(logisticsInfo.data, (item, index, i0) => {
          return common_vendor.e({
            a: ["\u5DF2\u62D2\u6536", "\u5DF2\u7B7E\u6536", "\u5DF2\u53D6\u4EF6"].includes(item.status)
          }, ["\u5DF2\u62D2\u6536", "\u5DF2\u7B7E\u6536", "\u5DF2\u53D6\u4EF6"].includes(item.status) ? {
            b: common_vendor.t(item.status === "\u5DF2\u62D2\u6536" ? "\u62D2" : item.status === "\u5DF2\u7B7E\u6536" ? "\u7B7E" : "\u53D6")
          } : index === 0 && ["\u8FD0\u9001\u4E2D", "\u6D3E\u9001\u4E2D"].includes(item.status) || index > 0 && logisticsInfo.data[index - 1].status !== "\u8FD0\u9001\u4E2D" ? {
            d: item.status === "\u6D3E\u9001\u4E2D" ? "../../static/paisong.png" : "../../static/yunshuzhong.png"
          } : index > 0 && logisticsInfo.data[index - 1].status === "\u8FD0\u9001\u4E2D" ? {} : {}, {
            c: index === 0 && ["\u8FD0\u9001\u4E2D", "\u6D3E\u9001\u4E2D"].includes(item.status) || index > 0 && logisticsInfo.data[index - 1].status !== "\u8FD0\u9001\u4E2D",
            e: index > 0 && logisticsInfo.data[index - 1].status === "\u8FD0\u9001\u4E2D",
            f: !(index === logisticsInfo.data.length - 1)
          }, !(index === logisticsInfo.data.length - 1) ? {
            g: common_vendor.n(item.status === "\u8FD0\u9001\u4E2D" ? "short" : "")
          } : {}, {
            h: !(index > 0 && logisticsInfo.data[index - 1].status === "\u8FD0\u9001\u4E2D" && item.status === "\u8FD0\u9001\u4E2D")
          }, !(index > 0 && logisticsInfo.data[index - 1].status === "\u8FD0\u9001\u4E2D" && item.status === "\u8FD0\u9001\u4E2D") ? {
            i: common_vendor.t(item.status)
          } : {}, {
            j: common_vendor.t(item.created),
            k: strInit(item.info),
            l: common_vendor.n(index === 0 || item.status === 23010 ? "active" : ""),
            m: common_vendor.n(index === 0 ? "active" : ""),
            n: index
          });
        }),
        M: common_vendor.s(common_vendor.unref(scrollHeight))
      }, {
        N: [23e3].includes(orderStatus.value)
      }, [23e3].includes(orderStatus.value) ? common_vendor.e({
        O: orderStatus.value === 23e3
      }, orderStatus.value === 23e3 ? {
        P: common_vendor.o(handleOrderCancel),
        Q: common_vendor.o((...args) => common_vendor.unref(utils_index.handleSecondQi) && common_vendor.unref(utils_index.handleSecondQi)(...args))
      } : {}) : {}) : {
        R: common_vendor.p({
          handleToRefresh
        })
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7f654b86"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/subPages/order-info/index.vue"]]);
wx.createPage(MiniProgramPage);
