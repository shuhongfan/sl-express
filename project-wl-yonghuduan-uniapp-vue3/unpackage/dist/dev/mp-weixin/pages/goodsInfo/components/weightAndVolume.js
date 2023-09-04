"use strict";
var common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  _easycom_uni_number_box2();
}
const _easycom_uni_number_box = () => "../../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
if (!Math) {
  _easycom_uni_number_box();
}
const _sfc_main = {
  __name: "weightAndVolume",
  emits: ["@getWeight", "@getVolume"],
  setup(__props, { emit: emits }) {
    let isLessThan = common_vendor.ref(true);
    let isExceed = common_vendor.ref(false);
    let isLessThanVolume = common_vendor.ref(true);
    let isExceedVolume = common_vendor.ref(false);
    const weight = common_vendor.ref(1);
    const volume = common_vendor.ref(0);
    const long = common_vendor.ref();
    const width = common_vendor.ref();
    const height = common_vendor.ref();
    const isVolumeInfo = common_vendor.ref(false);
    const store = common_vendor.useStore();
    const users = store.state.user;
    common_vendor.onMounted(() => {
      weight.value = users.weight;
      width.value = users.width;
      height.value = users.height;
      long.value = users.long;
      volume.value = users.volume ? Number(users.volume) / 1e6 : 0;
      isVolumeInfo.value = users.width && users.long && users.height;
    });
    const handleMinus = () => {
      if (weight.value > 1) {
        weight.value--;
        isExceed.value = false;
        weight.value = weight.value.toFixed(1);
      }
      if (weight.value <= 1) {
        isLessThan.value = true;
        if (weight.value <= 0.1) {
          weight.value = 0.1;
        }
      }
      emits("getWeight", weight.value);
    };
    const handleAdd = () => {
      if (weight.value < 9999) {
        ++weight.value;
        isLessThan.value = false;
      }
      if (weight.value === 9999) {
        isExceed.value = true;
      }
      if (weight.value <= 1) {
        isLessThan.value = true;
      }
      emits("getWeight", weight.value);
    };
    const handleWeigthBlur = (e) => {
      let value = e.detail.value;
      if (value < 0.1) {
        value = 1;
        isLessThan.value = true;
      } else {
        if (value >= 0.1 && value <= 1) {
          isLessThan.value = true;
        } else {
          isLessThan.value = false;
        }
        if (value >= 9999) {
          isExceed.value = true;
          value = 9999;
          common_vendor.index.showToast({
            title: "\u91CD\u91CF\u6700\u5927\u53EF\u4E0D\u80FD\u8D85\u8FC79999kg",
            duration: 1e3,
            icon: "none"
          });
        } else {
          isExceed.value = false;
        }
      }
      weight.value = value;
      emits("getWeight", weight.value);
    };
    const handleVolume = (e) => {
      let value = Number(e.detail.value);
      if (value < 1e-4) {
        isLessThanVolume.value = true;
        value = 0;
      } else {
        isLessThanVolume.value = false;
        if (value >= 999) {
          isExceedVolume.value = true;
          value = 999;
          common_vendor.index.showToast({
            title: "\u4F53\u79EF\u6700\u5927\u53EF\u4E0D\u80FD\u8D85\u8FC7999m\xB3",
            duration: 1e3,
            icon: "none"
          });
        } else {
          value = Number(e.detail.value);
          isExceedVolume.value = false;
        }
      }
      volume.value = value;
      emits("getVolume", volume.value * 1e6, long.value, width.value, height.value);
    };
    const handleVolumeMinus = () => {
      if (volume.value > 1) {
        volume.value--;
        isExceedVolume.value = false;
        volume.value = volume.value.toFixed(1);
      }
      if (volume.value <= 1) {
        isLessThanVolume.value = true;
        if (weight.value <= 1e-4) {
          weight.value = 1e-4;
        }
      }
      emits("getVolume", volume.value * 1e6, long.value, width.value, height.value);
    };
    const handleVolumeAdd = () => {
      if (volume.value < 999) {
        ++volume.value;
        isLessThanVolume.value = false;
      }
      if (volume.value === 999) {
        isExceedVolume.value = true;
      }
      emits("getVolume", volume.value * 1e6, long.value, width.value, height.value);
    };
    const switchChange = (e) => {
      isVolumeInfo.value = e.detail.value;
    };
    const longFun = (e) => {
      long.value = e.detail.value;
      let valueFun = Number(long.value) * Number(width.value) * Number(height.value) / 1e6;
      volume.value = valueFun < 1e-4 ? 1e-4 : valueFun;
      emits("getVolume", volume.value * 1e6, e.detail.value, width.value, height.value);
    };
    const widthFun = (e) => {
      width.value = e.detail.value;
      let valueFun = Number(long.value) * Number(width.value) * Number(height.value) / 1e6;
      volume.value = valueFun < 1e-4 ? 1e-4 : valueFun;
      emits("getVolume", volume.value * 1e6, long.value, e.detail.value, height.value);
    };
    const heightFun = (e) => {
      height.value = e.detail.value;
      let valueFun = Number(long.value) * Number(width.value) * Number(height.value) / 1e6;
      volume.value = valueFun < 1e-4 ? 1e-4 : valueFun;
      emits("getVolume", volume.value * 1e6, long.value, width.value, e.detail.value);
    };
    const openAccountRulesDialog = () => {
      common_vendor.index.navigateTo({
        url: "/subPages/account-rules/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(common_vendor.unref(isLessThan) ? "active" : ""),
        b: common_vendor.o(handleMinus),
        c: common_vendor.o(handleWeigthBlur),
        d: weight.value,
        e: common_vendor.o(($event) => weight.value = $event.detail.value),
        f: common_vendor.n(common_vendor.unref(isExceed) ? "active" : ""),
        g: common_vendor.o(handleAdd),
        h: common_vendor.o(switchChange),
        i: isVolumeInfo.value,
        j: isVolumeInfo.value
      }, isVolumeInfo.value ? {
        k: common_vendor.n(common_vendor.unref(isLessThanVolume) ? "active" : ""),
        l: common_vendor.o(handleVolumeMinus),
        m: common_vendor.o(handleVolume),
        n: volume.value,
        o: common_vendor.o(($event) => volume.value = $event.detail.value),
        p: common_vendor.n(common_vendor.unref(isExceedVolume) ? "active" : ""),
        q: common_vendor.o(handleVolumeAdd)
      } : {}, {
        r: isVolumeInfo.value
      }, isVolumeInfo.value ? {
        s: long.value,
        t: common_vendor.o(longFun),
        v: width.value,
        w: common_vendor.o(widthFun),
        x: height.value,
        y: common_vendor.o(heightFun)
      } : {}, {
        z: common_vendor.o(openAccountRulesDialog)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0d4e98f8"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/pages/goodsInfo/components/weightAndVolume.vue"]]);
wx.createComponent(Component);
