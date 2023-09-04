"use strict";
var common_vendor = require("../../common/vendor.js");
var pages_api_address = require("../api/address.js");
require("../../utils/request.js");
require("../../utils/env.js");
require("../api/login.js");
if (!Array) {
  const _component_nav_bar = common_vendor.resolveComponent("nav-bar");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _component_net_fail = common_vendor.resolveComponent("net-fail");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_nav_bar + _easycom_uni_search_bar2 + _easycom_uni_load_more2 + _component_net_fail + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_load_more + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let scrollHeight = common_vendor.ref("");
    let searchValue = common_vendor.ref("");
    let popup = common_vendor.ref(null);
    let isAllSelect = common_vendor.ref(false);
    let isManage = common_vendor.ref(false);
    let deleteIds = common_vendor.reactive({
      data: []
    });
    let list = common_vendor.reactive({
      data: []
    });
    let pageInfo = common_vendor.reactive({
      page: 1,
      pageSize: 10
    });
    let status = common_vendor.ref("more");
    let type = common_vendor.ref("");
    let isFromAddress = common_vendor.ref("");
    let netStatus = common_vendor.ref(true);
    common_vendor.onLoad((options) => {
      type.value = options.type;
      isFromAddress.value = options.isFromAddress;
      common_vendor.index.getSystemInfo({
        success: (res) => {
          scrollHeight.value = "height:" + (res.screenHeight - 190) + "px";
        }
      });
    });
    common_vendor.onMounted(() => {
      getList();
    });
    common_vendor.onPullDownRefresh(() => {
      pageInfo.page = 1;
      getList();
    });
    const handleToRefresh = () => {
      pageInfo.page = 1;
      getList();
    };
    const input = (e) => {
      searchValue.value = e;
      pageInfo.page = 1;
      getList();
    };
    const clear = () => {
    };
    const handleSaveToDefaultAddress = (id, isDefault) => {
      if (isManage.value) {
        return;
      }
      pages_api_address.editAddress({
        id,
        isDefault: isDefault === 1 ? 0 : 1
      }).then((res) => {
        pageInfo.page = 1;
        getList();
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: "\u4FEE\u6539\u6210\u529F",
            icon: "none",
            duration: 1e3,
            type: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "\u4FEE\u6539\u6210\u529F",
            icon: "none",
            duration: 1e3,
            type: "error"
          });
        }
      }).catch(() => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
    };
    const handleToLink = () => {
      if (type.value !== "address") {
        common_vendor.index.navigateBack();
      } else {
        common_vendor.index.switchTab({
          url: "/pages/my/index"
        });
      }
    };
    const handleToAddressInfo = (id) => {
      if (type.value === "address") {
        return;
      } else if (type.value === "get") {
        if (common_vendor.index.getStorageSync("sendId") === id)
          return common_vendor.index.showToast({
            title: "\u5BC4\u4EF6\u5730\u5740\u548C\u6536\u4EF6\u5730\u5740\u4E0D\u80FD\u9009\u62E9\u540C\u4E00\u4E2A",
            icon: "none",
            duration: 1e3
          });
      } else {
        if (common_vendor.index.getStorageSync("getId") === id)
          return common_vendor.index.showToast({
            title: "\u5BC4\u4EF6\u5730\u5740\u548C\u6536\u4EF6\u5730\u5740\u4E0D\u80FD\u9009\u62E9\u540C\u4E00\u4E2A",
            icon: "none",
            duration: 1e3
          });
      }
      common_vendor.index.redirectTo({
        url: "/pages/express-delivery/index?type=" + type.value + "&editOrAdd=edit&id=" + id + "&isFromAddress=true"
      });
    };
    const handleDeleteOrAdd = () => {
      if (isManage.value) {
        if (deleteIds.data.length)
          popup.value.open();
      } else {
        common_vendor.index.redirectTo({
          url: "/subPages/address-info/index?isFromAddress=" + isFromAddress.value + "&editOrAdd=add&type=" + type.value
        });
      }
    };
    const handleEditAddress = (item) => {
      if (isManage.value) {
        return;
      }
      common_vendor.index.redirectTo({
        url: "/subPages/address-info/index?id=" + item.id + "&isFromAddress=" + isFromAddress.value + "&editOrAdd=edit&type=" + type.value + "&isDefault=" + item.isDefault
      });
    };
    const getList = (flag) => {
      status.value = "loading";
      pages_api_address.getAddressList({
        page: pageInfo.page,
        pageSize: pageInfo.pageSize,
        keyword: searchValue.value
      }).then((res) => {
        let arr = res.data.items ? res.data.items : [];
        status.value = arr.length < 10 ? "no-more" : "more";
        if (flag === "topPull") {
          list.data = list.data.concat(arr);
        } else {
          list.data = arr;
        }
        if (list.data.every((item) => item.selected)) {
          isAllSelect.value = true;
        } else {
          isAllSelect.value = false;
        }
        common_vendor.index.stopPullDownRefresh();
        netStatus.value = true;
        console.log(456);
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
        netStatus.value = false;
        console.log(123);
      });
    };
    const LoadMoreCustomers = () => {
      pageInfo.page = pageInfo.page + 1;
      if (status.value === "no-more") {
        return;
      }
      getList("topPull");
    };
    const handleEdit = () => {
      isManage.value = !isManage.value;
    };
    const handledDelete = (id) => {
      if (isManage.value) {
        return;
      }
      popup.value.open();
      deleteIds.data.push(id);
    };
    const close = () => {
      popup.value.close();
      deleteIds.data = [];
    };
    const confirm = () => {
      popup.value.close();
      pages_api_address.deleteAddress(deleteIds.data).then((res) => {
        pageInfo.page = 1;
        pageInfo.pageSize = 10;
        getList();
        common_vendor.index.showToast({
          title: "\u5220\u9664\u6210\u529F",
          icon: "success",
          duration: 1e3
        });
        isManage.value = false;
      }).catch(() => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
    };
    const checkbox = (index, item) => {
      list.data[index].selected = !list.data[index].selected;
      if (list.data.every((item2) => item2.selected)) {
        isAllSelect.value = true;
      } else {
        isAllSelect.value = false;
      }
      deleteIds.data = list.data.filter((item2) => item2.selected).map((item2) => item2.id);
    };
    const selectAll = () => {
      isAllSelect.value = !isAllSelect.value;
      list.data = list.data.map((item) => {
        return Object.assign({}, item, {
          selected: isAllSelect.value
        });
      });
      deleteIds.data = list.data.filter((item) => item.selected).map((item) => item.id);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          title: "\u5730\u5740\u7C3F",
          handleToLink
        }),
        b: common_vendor.unref(netStatus)
      }, common_vendor.unref(netStatus) ? common_vendor.e({
        c: common_vendor.o(input),
        d: common_vendor.o(_ctx.cancel),
        e: common_vendor.o(clear),
        f: common_vendor.o(($event) => common_vendor.isRef(searchValue) ? searchValue.value = $event : searchValue = $event),
        g: common_vendor.p({
          cancelButton: "none",
          placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D/\u624B\u673A\u53F7",
          modelValue: common_vendor.unref(searchValue)
        }),
        h: common_vendor.unref(list).data.length > 0
      }, common_vendor.unref(list).data.length > 0 ? {
        i: common_vendor.f(common_vendor.unref(list).data, (item, index, i0) => {
          return common_vendor.e(common_vendor.unref(isManage) ? {
            a: String(index),
            b: item.selected
          } : {}, {
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.phoneNumber),
            e: common_vendor.t(item.province ? item.province.name + item.city.name + item.county.name + item.address : "")
          }, common_vendor.unref(type) !== "get" ? {
            f: Boolean(item.isDefault) ? 1 : "",
            g: common_vendor.o(($event) => handleSaveToDefaultAddress(item.id, item.isDefault))
          } : {}, {
            h: common_vendor.o(($event) => handleEditAddress(item)),
            i: common_vendor.o(($event) => handledDelete(item.id)),
            j: common_vendor.o(($event) => common_vendor.unref(isManage) ? checkbox(index) : handleToAddressInfo(item.id), index),
            k: index
          });
        }),
        j: common_vendor.unref(isManage),
        k: common_vendor.unref(type) !== "get",
        l: common_vendor.n(!common_vendor.unref(isManage) ? "" : "active"),
        m: common_vendor.n(common_vendor.unref(type) === "get" ? "active" : ""),
        n: common_vendor.n(common_vendor.unref(isManage) ? "isChecked" : ""),
        o: common_vendor.n(common_vendor.unref(isManage) ? "isChecked" : ""),
        p: common_vendor.p({
          status: common_vendor.unref(status)
        }),
        q: common_vendor.s(common_vendor.unref(scrollHeight)),
        r: common_vendor.o(LoadMoreCustomers)
      } : {
        s: common_vendor.t(common_vendor.unref(searchValue) ? "\u6CA1\u6709\u641C\u7D22\u5230\u76F8\u5173\u6761\u4EF6\u7684\u5730\u5740" : "\u6682\u65E0\u6570\u636E")
      }, {
        t: common_vendor.unref(isManage)
      }, common_vendor.unref(isManage) ? {
        v: common_vendor.unref(isAllSelect),
        w: common_vendor.o(selectAll)
      } : {}, {
        x: common_vendor.unref(list).data.length > 0
      }, common_vendor.unref(list).data.length > 0 ? {
        y: common_vendor.t(common_vendor.unref(isManage) ? "\u5B8C\u6210" : "\u7BA1\u7406"),
        z: common_vendor.o(handleEdit)
      } : {}, {
        A: common_vendor.t(common_vendor.unref(isManage) ? "\u5220\u9664" : "\u65B0\u589E\u5730\u5740"),
        B: common_vendor.n(common_vendor.unref(isManage) && common_vendor.unref(deleteIds).data.length || !common_vendor.unref(isManage) ? "active" : ""),
        C: common_vendor.o(handleDeleteOrAdd)
      }) : {
        D: common_vendor.p({
          handleToRefresh
        })
      }, {
        E: common_vendor.o(close),
        F: common_vendor.o(confirm),
        G: common_vendor.p({
          mode: "base",
          content: common_vendor.unref(isManage) ? "\u786E\u5B9A\u662F\u5426\u5220\u9664\u6240\u9009\u5730\u5740\uFF1F" : "\u786E\u5B9A\u662F\u5426\u5220\u9664\u6B64\u6761\u5730\u5740\uFF1F",
          animation: false,
          ["before-close"]: true
        }),
        H: common_vendor.sr(popup, "5f170bce-4", {
          "k": "popup"
        }),
        I: common_vendor.p({
          type: "dialog"
        })
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5f170bce"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/pages/address/index.vue"]]);
wx.createPage(MiniProgramPage);
