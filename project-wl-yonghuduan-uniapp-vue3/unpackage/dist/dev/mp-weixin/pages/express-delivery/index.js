"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_api_address = require("../api/address.js");
var pages_api_order = require("../api/order.js");
var utils_index = require("../../utils/index.js");
require("../../utils/request.js");
require("../../utils/env.js");
require("../api/login.js");
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_net_fail = common_vendor.resolveComponent("net-fail");
  (_component_nav_bar + _easycom_uni_popup2 + _component_net_fail)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (GetTimePicker + PayTypeDialog + _easycom_uni_popup)();
}
const GetTimePicker = () => "./components/getTimePicker.js";
const PayTypeDialog = () => "./components/payType.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const twoLine = common_vendor.ref();
    const store = common_vendor.useStore();
    const users = store.state.user;
    const isCanSubmit = common_vendor.computed$1(() => {
      return geterInfo.name && senderInfo.name && goods.goodsName && payMethod.value && toDoorTimeLabel.value;
    });
    const timePicker = common_vendor.ref();
    const payType = common_vendor.ref();
    const priceDetail = common_vendor.ref();
    const isSeachPriceDetail = common_vendor.ref(false);
    const toDoorTime = common_vendor.ref("");
    const toDoorTimeLabel = common_vendor.ref("\u4ECA\u5929 \u4E00\u5C0F\u65F6\u5185");
    const payMethod = common_vendor.ref(1);
    const type = common_vendor.ref("");
    const feightPrice = common_vendor.reactive({
      expense: "",
      weight: "",
      firstWeight: "",
      continuousWeight: ""
    });
    const isFromGoods = common_vendor.ref(false);
    const stopClick = common_vendor.ref(false);
    const goods = common_vendor.reactive({
      weight: 1,
      volume: 1,
      goodsName: "",
      goodsType: ""
    });
    const sendAddress = common_vendor.ref("");
    const senderInfo = common_vendor.reactive({
      name: "",
      phone: "",
      address: "",
      areaLabel: ""
    });
    const geterInfo = common_vendor.reactive({
      name: "",
      phone: "",
      address: "",
      areaLabel: ""
    });
    let netStatus = common_vendor.ref(true);
    const tabList = common_vendor.reactive([
      "\u4E0A\u95E8\u53D6\u4EF6",
      "\u7F51\u70B9\u81EA\u5BC4"
    ]);
    let activeIndex = common_vendor.ref(0);
    const openAccountRulesDialog = () => {
      common_vendor.index.navigateTo({
        url: "/subPages/account-rules/index"
      });
    };
    common_vendor.onMounted(() => {
      feightPrice.expense = users.expense;
      feightPrice.weight = users.computeWeight;
      feightPrice.firstWeight = users.firstWeight;
      feightPrice.continuousWeight = users.continuousWeight;
    });
    common_vendor.onLoad((options) => {
      console.log(options, "options");
      if (options.type === "send") {
        sendAddress.value = options.id;
        common_vendor.index.setStorageSync("sendId", options.id);
      } else if (options.type === "get") {
        common_vendor.index.setStorageSync("getId", options.id);
      }
      if (!options.id) {
        getDefaultAddress();
      }
      if (common_vendor.index.getStorageSync("sendId")) {
        searchAddressDetail(common_vendor.index.getStorageSync("sendId"), "send");
      }
      if (common_vendor.index.getStorageSync("getId")) {
        searchAddressDetail(common_vendor.index.getStorageSync("getId"), "get");
      }
      type.value = options.type;
      goods.volume = users.volume;
      goods.weight = users.weight;
      goods.goodsName = users.goodsInfo.name;
      goods.goodsType = users.goodsInfo.goodsType ? users.goodsInfo.goodsType.id : "";
      toDoorTimeLabel.value = users.toDoorTimeLabel || "\u4ECA\u5929 \u4E00\u5C0F\u65F6\u5185";
      toDoorTime.value = users.toDoorTime;
      payMethod.value = users.payMethod;
      isFromGoods.value = options.isFromGoods;
      if (common_vendor.index.getStorageSync("getId") && (common_vendor.index.getStorageSync("sendId") || sendAddress.value) && users.goodsInfo.name) {
        console.log(666);
        calcFreight();
      }
    });
    const handleToRefresh = () => {
      common_vendor.index.redirectTo({
        url: "/pages/express-delivery/index"
      });
    };
    const dealWithVolume = (value) => {
      let dot = String(value).indexOf(".");
      if (dot != -1) {
        let dotCnt = String(value).substring(dot + 1, value.length);
        if (dotCnt.length > 4) {
          value = value.toFixed(4);
          return value;
        } else {
          return value;
        }
      } else {
        return value;
      }
    };
    const getDefaultAddress = () => {
      if (!type.value && !isFromGoods.value) {
        pages_api_address.defaultAddress().then((res) => {
          if (res.data) {
            sendAddress.value = res.data.id;
            senderInfo.name = res.data.name;
            senderInfo.phone = res.data.phoneNumber;
            senderInfo.address = res.data.address;
            senderInfo.areaLabel = res.data.province.name + " " + res.data.city.name + " " + res.data.county.name;
            common_vendor.index.setStorageSync("sendId", res.data.id);
            netStatus.value = true;
            common_vendor.nextTick(() => {
              common_vendor.index.createSelectorQuery().select(".send-desc").boundingClientRect((res2) => {
                let height = res2.height;
                let line = height / 15;
                twoLine.value = line;
              }).exec();
            });
          }
        }).catch((err) => {
          common_vendor.index.showToast({
            title: "\u7F51\u7EDC\u5F02\u5E38",
            duration: 2e3,
            icon: "none"
          });
          netStatus.value = false;
        });
      }
    };
    const searchAddressDetail = (id, type2) => {
      pages_api_address.getAddressInfoDetail(id).then((res) => {
        const {
          name,
          phoneNumber,
          address,
          city,
          county,
          province
        } = res.data;
        if (type2 === "send") {
          senderInfo.name = name;
          senderInfo.phone = phoneNumber;
          senderInfo.address = address;
          senderInfo.areaLabel = province.name + " " + city.name + " " + county.name;
        } else {
          geterInfo.name = name;
          geterInfo.phone = phoneNumber;
          geterInfo.address = address;
          geterInfo.areaLabel = province.name + " " + city.name + " " + county.name;
        }
        common_vendor.nextTick(() => {
          common_vendor.index.createSelectorQuery().select(".send-desc").boundingClientRect((res2) => {
            let height = res2.height;
            let line = height / 15;
            twoLine.value = line;
          }).exec();
        });
      });
    };
    const changeTab = (index) => {
      if (index === 1) {
        return utils_index.handleSecondQi();
      }
      activeIndex.value = index;
    };
    const handleGetTime = () => {
      timePicker.value.handleOpen();
    };
    const handleToPayType = () => {
      payType.value.handleOpen();
    };
    const clearCurrentPageData = () => {
      store.commit("user/setGoodsInfo", {});
      store.commit("user/setVolume", "");
      store.commit("user/setExpense", 0);
      store.commit("user/setComputeWeight", 0);
      store.commit("user/setFirstWeight", 0);
      store.commit("user/setContinuousWeight", 0);
      store.commit("user/setToDoorTimeLabel", "");
      store.commit("user/setToDoorTime", String(new Date().getFullYear()) + "-" + String(new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + String(new Date().getHours() + 1) + ":" + String(Number(new Date().getMinutes()) < 10 ? "0" + Number(new Date().getMinutes()) : Number(new Date().getMinutes())) + ":00");
      store.commit("user/setWeight", 1);
      store.commit("user/setPayMethod", 1);
    };
    const handleToLink = () => {
      clearCurrentPageData();
      common_vendor.index.removeStorageSync("getId");
      common_vendor.index.removeStorageSync("sendId");
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const handleToGoodsInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/goodsInfo/index"
      });
    };
    const handleToAddress = (type2) => {
      common_vendor.index.navigateTo({
        url: "/pages/address/index?type=" + type2 + "&isFromAddress=false"
      });
    };
    const searchPriceDetail = () => {
      priceDetail.value.open("bottom");
      isSeachPriceDetail.value = true;
    };
    const handleCancel = () => {
      priceDetail.value.close();
      isSeachPriceDetail.value = false;
    };
    const order = () => {
      if (!isCanSubmit.value) {
        return;
      }
      if (stopClick.value) {
        return;
      }
      stopClick.value = true;
      console.log(goods, "\u4E0B\u5355");
      pages_api_order.doOrder({
        goodNum: 1,
        goodsName: goods.goodsName,
        goodsType: goods.goodsType,
        payMethod: payMethod.value,
        pickUpTime: toDoorTimeLabel.value === "\u4ECA\u5929 \u4E00\u5C0F\u65F6\u5185" ? String(new Date().getFullYear()) + "-" + String(new Date().getMonth() + 1) + "-" + new Date().getDate() + " " + String(new Date().getHours() + 1) + ":" + String(Number(new Date().getMinutes()) < 10 ? "0" + Number(new Date().getMinutes()) : Number(new Date().getMinutes())) + ":00" : users.toDoorTime,
        totalVolume: goods.volume,
        totalWeight: goods.weight,
        receiptAddress: common_vendor.index.getStorageSync("getId"),
        sendAddress: sendAddress.value || common_vendor.index.getStorageSync("sendId"),
        pickupType: 0
      }).then((res) => {
        console.log(res, "resss");
        if (res.code !== 200) {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 1e3
          });
        } else {
          common_vendor.index.redirectTo({
            url: "/subPages/order-success/index?orderId=" + res.data.id
          });
          common_vendor.index.removeStorageSync("getId");
          common_vendor.index.removeStorageSync("sendId");
          clearCurrentPageData();
        }
        stopClick.value = false;
      }).catch((err) => {
        stopClick.value = false;
        console.log(err, "err");
      });
    };
    const toSendAddressInfo = () => {
      if (sendAddress.value || common_vendor.index.getStorageSync("sendId")) {
        common_vendor.index.navigateTo({
          url: "/subPages/address-info/index?type=send&editOrAdd=edit&id=" + common_vendor.index.getStorageSync("sendId")
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/subPages/address-info/index?type=send&editOrAdd=add"
        });
      }
    };
    const toGetAddressInfo = () => {
      if (common_vendor.index.getStorageSync("getId")) {
        common_vendor.index.navigateTo({
          url: "/subPages/address-info/index?type=get&editOrAdd=edit&id=" + common_vendor.index.getStorageSync("getId")
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/subPages/address-info/index?type=get&editOrAdd=add"
        });
      }
    };
    const getTime = (value) => {
      toDoorTimeLabel.value = value.selectedDayLabel + " " + value.selectedTimeLabel;
      toDoorTime.value = String(new Date().getFullYear()) + "-" + String(new Date().getMonth() + 1) + "-" + (new Date().getDate() + value.selectedDay + " " + String((value.selectedTime === 1 ? new Date().getHours() + 1 : value.selectedTime) + ":00:00"));
      store.commit("user/setToDoorTimeLabel", toDoorTimeLabel.value);
      store.commit("user/setToDoorTime", toDoorTime.value);
    };
    const getPayType = (value) => {
      payMethod.value = value;
      store.commit("user/setPayMethod", value);
    };
    const calcFreight = () => {
      console.log(goods, "\u8BA1\u7B97\u8FD0\u8D39");
      pages_api_order.getEstimatePrice({
        goodNum: 1,
        goodsName: goods.goodsName,
        goodsType: goods.goodsType,
        payMethod: payMethod.value,
        pickUpTime: toDoorTime.value,
        totalVolume: goods.volume,
        totalWeight: goods.weight,
        receiptAddress: common_vendor.index.getStorageSync("getId"),
        sendAddress: common_vendor.index.getStorageSync("sendId"),
        pickupType: 0
      }).then((res) => {
        if (res.code == 200) {
          store.commit("user/setExpense", res.data.expense);
          store.commit("user/setComputeWeight", res.data.computeWeight);
          store.commit("user/setFirstWeight", res.data.firstWeight);
          store.commit("user/setContinuousWeight", res.data.continuousWeight);
          feightPrice.expense = res.data.expense;
          feightPrice.weight = res.data.computeWeight;
          feightPrice.firstWeight = res.data.firstWeight;
          feightPrice.continuousWeight = res.data.continuousWeight;
        } else {
          common_vendor.index.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "\u5BC4\u5FEB\u9012",
          handleToLink
        }),
        b: common_vendor.unref(netStatus)
      }, common_vendor.unref(netStatus) ? common_vendor.e({
        c: twoLine.value >= 2 ? 1 : "",
        d: common_vendor.t(senderInfo.name ? senderInfo.name : "\u5BC4\u4EF6\u4EBA\u4FE1\u606F"),
        e: senderInfo.phone
      }, senderInfo.phone ? {
        f: common_vendor.t(senderInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"))
      } : {}, {
        g: common_vendor.t(senderInfo.address ? senderInfo.areaLabel + senderInfo.address : "\u53BB\u586B\u5199"),
        h: common_vendor.o(toSendAddressInfo),
        i: common_vendor.o(($event) => handleToAddress("send")),
        j: common_vendor.t(geterInfo.name ? geterInfo.name : "\u6536\u4EF6\u4EBA\u4FE1\u606F"),
        k: geterInfo.phone
      }, geterInfo.phone ? {
        l: common_vendor.t(geterInfo.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"))
      } : {}, {
        m: common_vendor.t(geterInfo.address ? geterInfo.areaLabel + geterInfo.address : "\u53BB\u586B\u5199"),
        n: common_vendor.o(toGetAddressInfo),
        o: common_vendor.o(($event) => handleToAddress("get")),
        p: common_vendor.f(tabList, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(common_vendor.unref(activeIndex) === index ? "active" : "isNotActive"),
            c: common_vendor.o(($event) => changeTab(index), index),
            d: index
          };
        }),
        q: common_vendor.n(common_vendor.unref(activeIndex) === 1 ? "active" : ""),
        r: common_vendor.unref(activeIndex) === 0
      }, common_vendor.unref(activeIndex) === 0 ? {
        s: common_vendor.t(toDoorTimeLabel.value ? toDoorTimeLabel.value : "\u8BF7\u9009\u62E9"),
        t: common_vendor.n(toDoorTimeLabel.value ? "active" : ""),
        v: common_vendor.o(handleGetTime),
        w: common_vendor.t(goods.goodsName ? goods.goodsName + ", " + (goods.weight + "\u516C\u65A4") + (goods.volume ? ", " + (dealWithVolume(goods.volume / 1e6) + "m\xB3") : "") : "\u8BF7\u9009\u62E9"),
        x: common_vendor.n(goods.goodsName ? "active" : ""),
        y: common_vendor.o(handleToGoodsInfo),
        z: common_vendor.t(payMethod.value === 1 ? "\u5BC4\u4ED8" : payMethod.value === 2 ? "\u5230\u4ED8" : "\u8BF7\u9009\u62E9"),
        A: common_vendor.n(payMethod.value ? "active" : ""),
        B: common_vendor.o(handleToPayType)
      } : {}, {
        C: common_vendor.sr(timePicker, "69a7bdc6-1", {
          "k": "timePicker"
        }),
        D: common_vendor.o(getTime),
        E: common_vendor.sr(payType, "69a7bdc6-2", {
          "k": "payType"
        }),
        F: common_vendor.o(getPayType),
        G: common_vendor.t(feightPrice.expense),
        H: common_vendor.o(searchPriceDetail),
        I: common_vendor.n(common_vendor.unref(isCanSubmit) ? "active" : ""),
        J: common_vendor.o(order),
        K: isSeachPriceDetail.value ? 1 : "",
        L: common_vendor.o(handleCancel),
        M: common_vendor.o(openAccountRulesDialog),
        N: common_vendor.t(feightPrice.expense),
        O: common_vendor.t(feightPrice.firstWeight),
        P: common_vendor.t(feightPrice.continuousWeight),
        Q: common_vendor.t(feightPrice.weight),
        R: common_vendor.sr(priceDetail, "69a7bdc6-3", {
          "k": "priceDetail"
        }),
        S: common_vendor.p({
          type: "bottom"
        })
      }) : {
        T: common_vendor.p({
          handleToRefresh
        })
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/pages/express-delivery/index.vue"]]);
wx.createPage(MiniProgramPage);
