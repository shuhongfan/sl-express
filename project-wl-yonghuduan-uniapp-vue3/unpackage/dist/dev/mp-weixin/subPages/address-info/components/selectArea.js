"use strict";
var common_vendor = require("../../../common/vendor.js");
var pages_api_order = require("../../../pages/api/order.js");
require("../../../utils/request.js");
require("../../../utils/env.js");
require("../../../pages/api/login.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "selectArea",
  props: {
    provinceId: {
      type: String,
      default: ""
    },
    cityId: {
      type: String,
      default: ""
    },
    countyId: {
      type: String,
      default: ""
    }
  },
  emits: ["@getAreaData"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const popup = common_vendor.ref();
    let province = common_vendor.reactive({
      data: []
    });
    let selectedProvince = common_vendor.reactive({
      data: {
        name: "\u5317\u4EAC\u5E02",
        id: "1"
      }
    });
    const city = common_vendor.reactive({
      data: []
    });
    let selectedCity = common_vendor.reactive({
      data: {
        name: "\u76F4\u8F96\u5E02",
        id: "2"
      }
    });
    const area = common_vendor.reactive({
      data: []
    });
    let selectedArea = common_vendor.reactive({
      data: {
        name: "\u4E1C\u57CE\u533A",
        id: "3"
      }
    });
    let areaIndex = common_vendor.reactive({
      data: [0, 0, 0]
    });
    let hotCityIndex = common_vendor.ref("");
    const cityList = common_vendor.reactive([
      {
        label: "\u5317\u4EAC",
        provinceId: "1",
        cityId: "2",
        countyId: "3"
      },
      {
        label: "\u4E0A\u6D77",
        provinceId: "161792",
        cityId: "161793",
        countyId: "161794"
      },
      {
        label: "\u5E7F\u5DDE",
        provinceId: "483250",
        cityId: "483251",
        countyId: "483252"
      },
      {
        label: "\u6DF1\u5733",
        provinceId: "483250",
        cityId: "487721",
        countyId: "487722"
      }
    ]);
    let placeIdItem = common_vendor.reactive({
      provinceId: "",
      cityId: "",
      countyId: ""
    });
    let chooseType = common_vendor.ref("select");
    common_vendor.watch(props, (newValue, oldValue) => {
      placeIdItem.provinceId = newValue.provinceId;
      placeIdItem.cityId = newValue.cityId;
      placeIdItem.countyId = newValue.countyId;
    });
    const handleHotCityClick = (item, index) => {
      placeIdItem.provinceId = item.provinceId;
      placeIdItem.cityId = item.cityId;
      placeIdItem.countyId = item.countyId;
      getAreaInfo("", province);
      getAreaInfo(placeIdItem.provinceId, city);
      getAreaInfo(placeIdItem.cityId, area);
      chooseType.value = "click";
      hotCityIndex.value = index;
    };
    const getList = () => {
      getAreaInfo("", province);
      getAreaInfo(placeIdItem.provinceId || 1, city);
      getAreaInfo(placeIdItem.cityId || 2, area);
    };
    const getAreaInfo = (parentId, type) => {
      pages_api_order.getArea({
        parentId
      }).then((res) => {
        type.data = res.data;
        if (type === province) {
          common_vendor.nextTick(() => {
            selectedProvince.data = res.data.filter((item) => item.id == placeIdItem.provinceId)[0] || res.data[0];
            areaIndex.data[0] = res.data.findIndex((item) => item.id == placeIdItem.provinceId);
          });
        } else if (type === city) {
          common_vendor.nextTick(() => {
            selectedCity.data = res.data.filter((item) => item.id == placeIdItem.cityId)[0] || res.data[0];
            areaIndex.data[1] = res.data.findIndex((item) => item.id == placeIdItem.cityId);
          });
        } else if (type === area) {
          common_vendor.nextTick(() => {
            selectedArea.data = res.data.filter((item) => item.id == placeIdItem.countyId)[0] || res.data[0];
            areaIndex.data[2] = res.data.findIndex((item) => item.id == placeIdItem.countyId);
          });
        }
      });
    };
    const handlePickStart = () => {
      chooseType.value = "select";
    };
    const bindChange = (event) => {
      if (chooseType.value === "click")
        return;
      if (areaIndex.data[0] !== event.detail.value[0]) {
        getAreaInfo(province.data[event.detail.value[0]].id, city);
        getAreaInfo(Number(province.data[event.detail.value[0]].id) + 1, area);
        selectedProvince.data = province.data[event.detail.value[0]];
      } else if (areaIndex.data[1] !== event.detail.value[1]) {
        getAreaInfo(city.data[event.detail.value[1]].id, area);
        selectedCity.data = city.data[event.detail.value[1]];
      } else {
        selectedArea.data = area.data[event.detail.value[2]];
      }
      areaIndex.data = event.detail.value;
      hotCityIndex.value = "";
    };
    const handleOpen = () => {
      popup.value.open("bottom");
    };
    const handleCancel = () => {
      popup.value.close("bottom");
    };
    const confirm = () => {
      handleCancel();
      emits("getAreaData", {
        province: selectedProvince.data,
        city: selectedCity.data,
        area: selectedArea.data
      });
    };
    expose({
      handleOpen,
      getList
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleCancel),
        b: common_vendor.f(cityList, (item, index, i0) => {
          return {
            a: common_vendor.t(item.label),
            b: common_vendor.n(index === common_vendor.unref(hotCityIndex) ? "active" : ""),
            c: index,
            d: common_vendor.o(($event) => handleHotCityClick(item, index), index)
          };
        }),
        c: common_vendor.f(common_vendor.unref(province).data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index
          };
        }),
        d: common_vendor.f(city.data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index
          };
        }),
        e: common_vendor.f(area.data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index
          };
        }),
        f: common_vendor.unref(areaIndex).data,
        g: `height: 50px;`,
        h: common_vendor.o(bindChange),
        i: common_vendor.o(handlePickStart),
        j: common_vendor.o(confirm),
        k: common_vendor.sr(popup, "7dfaf907-0", {
          "k": "popup"
        }),
        l: common_vendor.p({
          type: "bottom"
        })
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7dfaf907"], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/subPages/address-info/components/selectArea.vue"]]);
wx.createComponent(Component);
