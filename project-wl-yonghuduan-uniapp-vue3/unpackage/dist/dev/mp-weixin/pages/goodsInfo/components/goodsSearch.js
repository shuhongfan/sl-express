"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_api_order = require("../../api/order.js");
require("../../../utils/request.js");
require("../../../utils/env.js");
require("../../api/login.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_search_bar2 + _easycom_uni_popup2)();
}
const _easycom_uni_search_bar = () => "../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "goodsSearch",
  props: {
    isShowOther: {
      type: Function,
      required: true
    }
  },
  emits: ["@getGoodsInfo"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = common_vendor.useStore();
    const users = store.state.user;
    const goods = common_vendor.reactive({
      info: {}
    });
    const isSelectedGoods = common_vendor.ref(false);
    const popup = common_vendor.ref();
    const searchValue = common_vendor.ref("");
    const isFocus = common_vendor.ref(false);
    const isInput = common_vendor.ref(false);
    const isUpload = common_vendor.ref(true);
    const dimSearchList = common_vendor.reactive({
      data: []
    });
    const hotSendList = common_vendor.reactive({
      data: []
    });
    const recentSendList = common_vendor.reactive({
      data: []
    });
    common_vendor.onMounted(() => {
      getData();
    });
    const getData = () => {
      pages_api_order.usualGoodsList({
        name: ""
      }).then((res) => {
        if (res.data) {
          hotSendList.data = res.data.slice(0, 6);
        }
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
      isSelectedGoods.value = users.goodsInfo.name;
      if (isSelectedGoods.value)
        goods.info = users.goodsInfo;
      pages_api_order.goodsList().then((res) => {
        if (res.data) {
          recentSendList.data = res.data.slice(0, 5);
        }
      }).catch((err) => {
        common_vendor.index.showToast({
          title: "\u7F51\u7EDC\u5F02\u5E38",
          duration: 2e3,
          icon: "none"
        });
      });
    };
    const handleSelectedGoods = () => {
      searchValue.value = goods.info.name;
      isFocus.value = true;
      isInput.value = true;
      isSelectedGoods.value = false;
      dimSearch(searchValue.value);
      props.isShowOther(true, "always");
    };
    const dimSearch = (key) => {
      if (!isUpload.value)
        return;
      isUpload.value = false;
      pages_api_order.usualGoodsList({
        name: key
      }).then((res) => {
        dimSearchList.data = res.data;
        isUpload.value = true;
      });
    };
    const input = (e) => {
      isFocus.value = e ? true : false;
      isInput.value = Boolean(e);
      if (!isUpload.value)
        return;
      searchValue.value = e;
      dimSearch(e);
      props.isShowOther(e ? true : false);
    };
    const cancel = () => {
      isInput.value = false;
      props.isShowOther(false);
    };
    const clear = () => {
      props.isShowOther(true);
    };
    const blur = () => {
      console.log("blur");
    };
    const focus = () => {
      isFocus.value = true;
      props.isShowOther(true);
    };
    const userDefined = () => {
      goods.info = {
        name: searchValue.value
      };
      isSelectedGoods.value = Boolean(searchValue.value);
      props.isShowOther(false);
      emits("getGoodsInfo", {
        name: searchValue.value
      });
      isFocus.value = false;
    };
    const handleCancelGood = () => {
      goods.info = {};
      store.commit("user/setGoodsInfo", {});
      emits("getGoodsInfo", {});
      isSelectedGoods.value = false;
      searchValue.value = "";
      isFocus.value = false;
      isInput.value = false;
    };
    const handleClick = (item) => {
      searchValue.value = item.value;
      isFocus.value = true;
      goods.info = item;
      isSelectedGoods.value = true;
      isInput.value = false;
      props.isShowOther(false);
      emits("getGoodsInfo", item);
    };
    const openForbidGoodsDialog = () => {
      popup.value.open("bottom");
    };
    const closeForbidGoodsDialog = () => {
      popup.value.close();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(openForbidGoodsDialog),
        b: !isSelectedGoods.value
      }, !isSelectedGoods.value ? common_vendor.e({
        c: common_vendor.o(blur),
        d: common_vendor.o(focus),
        e: common_vendor.o(input),
        f: common_vendor.o(cancel),
        g: common_vendor.o(clear),
        h: common_vendor.o(($event) => searchValue.value = $event),
        i: common_vendor.p({
          cancelButton: isFocus.value && searchValue.value ? "none" : "auto",
          focus: isFocus.value,
          placeholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
          modelValue: searchValue.value
        }),
        j: searchValue.value && isFocus.value
      }, searchValue.value && isFocus.value ? {
        k: common_vendor.o(userDefined)
      } : {}) : {}, {
        l: !isSelectedGoods.value && recentSendList.data.length && !isInput.value
      }, !isSelectedGoods.value && recentSendList.data.length && !isInput.value ? {
        m: common_vendor.f(recentSendList.data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.goodsType ? "(" + item.goodsType.name + ")" : ""),
            c: index,
            d: common_vendor.o(($event) => handleClick(item), index)
          };
        })
      } : {}, {
        n: isSelectedGoods.value
      }, isSelectedGoods.value ? {
        o: common_vendor.o(handleCancelGood),
        p: common_vendor.t(goods.info.name),
        q: common_vendor.t(goods.info.goodsType ? "(" + goods.info.goodsType.name + ")" : ""),
        r: common_vendor.o(handleSelectedGoods)
      } : {}, {
        s: !isSelectedGoods.value && !isInput.value && isFocus.value
      }, !isSelectedGoods.value && !isInput.value && isFocus.value ? {
        t: common_vendor.f(hotSendList.data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.goodsType ? "(" + item.goodsType.name + ")" : ""),
            c: index,
            d: common_vendor.o(($event) => handleClick(item), index)
          };
        })
      } : {}, {
        v: isInput.value
      }, isInput.value ? {
        w: common_vendor.f(dimSearchList.data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.goodsType ? "(" + item.goodsType.name + ")" : ""),
            d: common_vendor.o(($event) => handleClick(item), index),
            e: index
          };
        })
      } : {}, {
        x: common_vendor.o(closeForbidGoodsDialog),
        y: common_vendor.sr(popup, "62a3a6e9-1", {
          "k": "popup"
        }),
        z: common_vendor.p({
          type: "bottom",
          ["safe-area"]: false
        })
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-62a3a6e9"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/pages/goodsInfo/components/goodsSearch.vue"]]);
wx.createComponent(Component);
