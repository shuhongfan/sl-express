"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_api_order = require("../../api/order.js");
var utils_index = require("../../../utils/index.js");
require("../../../utils/request.js");
require("../../../utils/env.js");
require("../../api/login.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_load_more2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "orderList",
  props: {
    serchValue: {
      type: String
    }
  },
  emits: ["@stopRefresh"],
  setup(__props, { expose, emit: emits }) {
    const store = common_vendor.useStore();
    const users = store.state.user;
    let pageInfo = common_vendor.reactive({
      page: 1,
      pageSize: 10,
      mailType: 1
    });
    let status = common_vendor.ref("more");
    let isShowMore = common_vendor.ref(false);
    let allOrderList = common_vendor.reactive({
      data: []
    });
    let orderId = common_vendor.ref();
    let isLogin = common_vendor.ref("");
    let popup = common_vendor.ref(null);
    let capsuleBottom = common_vendor.ref();
    const close = () => {
      popup.value.close();
      orderId.value = "";
    };
    common_vendor.onLoad(() => {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          capsuleBottom.value = common_vendor.index.getMenuButtonBoundingClientRect().bottom + 52;
        }
      });
    });
    common_vendor.onShow(() => {
      isLogin.value = common_vendor.index.getStorageSync("token");
      allOrderList.data = users.indexList;
    });
    common_vendor.onMounted(() => {
      getOrderListFunc();
    });
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
    const confirm = () => {
      popup.value.close();
      pages_api_order.deleteOrder(orderId.value).then((res) => {
        pageInfo.page = 1;
        pageInfo.pageSize = 10;
        getOrderListFunc();
        common_vendor.index.showToast({
          title: "\u5220\u9664\u6210\u529F",
          icon: "success",
          duration: 1e3
        });
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
    };
    const handleOrderDelete = (id) => {
      orderId.value = id;
      popup.value.open();
    };
    const handleOrderCancel = (id) => {
      common_vendor.index.navigateTo({
        url: "/subPages/order-cancel/index?orderId=" + id
      });
    };
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/index"
      });
    };
    const getOrderListFunc = (flag) => {
      status.value = "loading";
      pages_api_order.getOrderList(pageInfo).then((res) => {
        console.log(res, "\u63A5\u53D7\u5230\u4E86resovle");
        if (res.data) {
          console.log(res.data.items && res.data.items.length, "res.data.items && res.data.items.length");
          status.value = (res.data.items && res.data.items.length) < 10 ? "no-more" : "more";
          if (flag === "topPull") {
            allOrderList.data = allOrderList.data.concat(res.data.items ? res.data.items : []);
          } else {
            allOrderList.data = res.data.items ? res.data.items : [];
          }
        }
        store.commit("user/setIndexList", allOrderList.data);
        emits("stopRefresh");
      });
    };
    const showOrderStatus = (status2) => {
      switch (status2) {
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
    const handleToOrderInfo = (event, id, transportOrderId) => {
      common_vendor.index.navigateTo({
        url: "/subPages/order-info/index?orderId=" + id + "&transportOrderId=" + transportOrderId
      });
      store.commit("user/setIsToOrderInfo", true);
    };
    const LoadMoreCustomers = () => {
      if (status.value === "no-more") {
        return;
      }
      pageInfo.page = pageInfo.page + 1;
      getOrderListFunc("topPull");
    };
    const indexGetOrderListFunc = (params) => {
      pageInfo.page = 1;
      pageInfo = Object.assign({}, pageInfo, params);
      getOrderListFunc();
    };
    expose({
      indexGetOrderListFunc,
      LoadMoreCustomers
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(isLogin)
      }, !common_vendor.unref(isLogin) ? {
        b: common_vendor.o(toLogin)
      } : common_vendor.e({
        c: !common_vendor.unref(allOrderList).data.length && common_vendor.unref(isLogin)
      }, !common_vendor.unref(allOrderList).data.length && common_vendor.unref(isLogin) ? {
        d: common_vendor.t(__props.serchValue ? "\u6CA1\u6709\u641C\u7D22\u5230\u76F8\u5173\u6761\u4EF6\u7684\u8FD0\u5355" : "\u6682\u65E0\u6570\u636E")
      } : common_vendor.e({
        e: common_vendor.f(common_vendor.unref(allOrderList).data, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t([23e3, 22e3, 230011].includes(item.status) ? "\u8BA2" : "\u8FD0"),
            b: common_vendor.t([23e3, 22e3, 230011].includes(item.status) ? item.id : item.transportOrderId),
            c: common_vendor.o(($event) => handleCopy([23e3, 22e3, 230011].includes(item.status) ? item.id : item.transportOrderId)),
            d: common_vendor.t(item.senderCity.name),
            e: common_vendor.t(item.senderName),
            f: common_vendor.t(showOrderStatus(item.status)),
            g: common_vendor.n([21e3, 23e3, 23001, 23005, 23008].includes(item.status) ? "green-arrow" : ""),
            h: common_vendor.n([23009, 23010].includes(item.status) ? "red-arrow" : ""),
            i: common_vendor.n([230011, 22e3].includes(item.status) ? "gray-arrow" : ""),
            j: common_vendor.t(item.receiverCity.name),
            k: common_vendor.t(item.receiverName),
            l: item.status === 23001 && item.transportOrderPointVOS
          }, item.status === 23001 && item.transportOrderPointVOS ? {
            m: common_vendor.t(item.transportOrderPointVOS.length > 0 ? item.transportOrderPointVOS[item.transportOrderPointVOS.length - 1].info : "")
          } : {}, {
            n: [23005, 23008].includes(item.status) && item.transportOrderPointVOS
          }, [23005, 23008].includes(item.status) && item.transportOrderPointVOS ? {
            o: common_vendor.t(item.transportOrderPointVOS.length > 0 ? item.transportOrderPointVOS[item.transportOrderPointVOS.length - 1].info : "")
          } : {}, {
            p: item.status === 23009 && item.transportOrderPointVOS
          }, item.status === 23009 && item.transportOrderPointVOS ? {
            q: common_vendor.t(item.transportOrderPointVOS.length > 0 ? item.transportOrderPointVOS[item.transportOrderPointVOS.length - 1].info : "")
          } : {}, {
            r: item.status === 23010 && item.transportOrderPointVOS
          }, item.status === 23010 && item.transportOrderPointVOS ? {
            s: common_vendor.t(item.transportOrderPointVOS.length > 0 ? item.transportOrderPointVOS[item.transportOrderPointVOS.length - 1].info : "")
          } : {}, {
            t: item.status === 23e3
          }, item.status === 23e3 ? {
            v: common_vendor.t(item.estimatedStartTime)
          } : {}, {
            w: item.status === 230011
          }, item.status === 230011 ? {
            x: common_vendor.t(item.updated)
          } : {}, {
            y: [23001, 23005, 23008, 23010].includes(item.status)
          }, [23001, 23005, 23008, 23010].includes(item.status) ? {
            z: common_vendor.t(item.estimatedArrivalTime)
          } : {}, {
            A: item.status === 22e3
          }, item.status === 22e3 ? {
            B: common_vendor.t(item.updated)
          } : {}, {
            C: item.status === 23009
          }, item.status === 23009 ? {
            D: common_vendor.t(item.updated)
          } : {}, {
            E: [23e3, 23001, 23005, 23008, 23010].includes(item.status)
          }, [23e3, 23001, 23005, 23008, 23010].includes(item.status) ? {} : {}, {
            F: item.status === 23e3
          }, item.status === 23e3 ? {
            G: common_vendor.o(($event) => handleOrderCancel(item.id))
          } : {}, {
            H: [22e3, 230011, 23009].includes(item.status)
          }, [22e3, 230011, 23009].includes(item.status) ? {
            I: common_vendor.o(($event) => handleOrderDelete(item.id))
          } : {}, {
            J: item.paymentStatus && [23001, 23005, 23008, 23009, 23010].includes(item.status)
          }, item.paymentStatus && [23001, 23005, 23008, 23009, 23010].includes(item.status) ? {
            K: item.paymentStatus === 1 ? "../../../static/daizhifu.png" : "../../../static/yizhifu.png"
          } : {}, {
            L: index,
            M: common_vendor.o(($event) => handleToOrderInfo(_ctx.event, item.id, item.transportOrderId), index)
          });
        }),
        f: common_vendor.o((...args) => common_vendor.unref(utils_index.handleSecondQi) && common_vendor.unref(utils_index.handleSecondQi)(...args)),
        g: !common_vendor.unref(isShowMore) && common_vendor.unref(isLogin) && common_vendor.unref(allOrderList).data.length
      }, !common_vendor.unref(isShowMore) && common_vendor.unref(isLogin) && common_vendor.unref(allOrderList).data.length ? {
        h: common_vendor.p({
          status: common_vendor.unref(status)
        })
      } : {}, {
        i: common_vendor.o(LoadMoreCustomers)
      })), {
        j: common_vendor.o(close),
        k: common_vendor.o(confirm),
        l: common_vendor.p({
          mode: "base",
          content: "\u786E\u5B9A\u662F\u5426\u5220\u9664\u6B64\u6761\u8BA2\u5355\uFF1F",
          animation: false,
          ["before-close"]: true
        }),
        m: common_vendor.sr(popup, "4c50161d-1", {
          "k": "popup"
        }),
        n: common_vendor.p({
          type: "dialog"
        }),
        o: common_vendor.unref(capsuleBottom) + "px"
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4c50161d"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/pages/pickup/components/orderList.vue"]]);
wx.createComponent(Component);
