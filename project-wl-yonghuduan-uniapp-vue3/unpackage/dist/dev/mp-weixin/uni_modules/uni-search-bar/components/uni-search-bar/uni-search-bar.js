"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniSearchBar_components_uniSearchBar_i18n_index = require("./i18n/index.js");
const {
  t
} = common_vendor.initVueI18n(uni_modules_uniSearchBar_components_uniSearchBar_i18n_index.messages);
const _sfc_main = {
  name: "UniSearchBar",
  emits: ["input", "update:modelValue", "clear", "cancel", "confirm", "blur", "focus"],
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    radius: {
      type: [Number, String],
      default: 5
    },
    clearButton: {
      type: String,
      default: "auto"
    },
    cancelButton: {
      type: String,
      default: "auto"
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    bgColor: {
      type: String,
      default: "#F8F8F8"
    },
    maxlength: {
      type: [Number, String],
      default: 100
    },
    value: {
      type: [Number, String],
      default: ""
    },
    modelValue: {
      type: [Number, String],
      default: ""
    },
    focus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      showSync: false,
      searchVal: ""
    };
  },
  computed: {
    cancelTextI18n() {
      return this.cancelText || t("uni-search-bar.cancel");
    },
    placeholderText() {
      return this.placeholder || t("uni-search-bar.placeholder");
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.searchVal = newVal;
        if (newVal) {
          this.show = true;
        }
      }
    },
    focus: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          if (this.readonly)
            return;
          this.show = true;
          this.$nextTick(() => {
            this.showSync = true;
          });
        }
      }
    },
    searchVal(newVal, oldVal) {
      this.$emit("input", newVal);
      this.$emit("update:modelValue", newVal);
    }
  },
  methods: {
    searchClick() {
      if (this.readonly)
        return;
      if (this.show) {
        return;
      }
      this.show = true;
      this.$nextTick(() => {
        this.showSync = true;
      });
    },
    clear() {
      this.$emit("clear", {
        value: this.searchVal
      });
      this.searchVal = "";
    },
    cancel() {
      if (this.readonly)
        return;
      this.$emit("cancel", {
        value: this.searchVal
      });
      this.searchVal = "";
      this.show = false;
      this.showSync = false;
      common_vendor.index.hideKeyboard();
    },
    confirm() {
      common_vendor.index.hideKeyboard();
      this.$emit("confirm", {
        value: this.searchVal
      });
    },
    blur() {
      common_vendor.index.hideKeyboard();
      this.$emit("blur", {
        value: this.searchVal
      });
    },
    emitFocus(e) {
      this.$emit("focus", e.detail);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      color: "#c0c4cc",
      size: "18",
      type: "search"
    }),
    b: $data.show || $data.searchVal
  }, $data.show || $data.searchVal ? {
    c: $data.showSync,
    d: $props.readonly,
    e: $options.placeholderText,
    f: $props.maxlength,
    g: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    h: common_vendor.o((...args) => $options.blur && $options.blur(...args)),
    i: common_vendor.o((...args) => $options.emitFocus && $options.emitFocus(...args)),
    j: $data.searchVal,
    k: common_vendor.o(($event) => $data.searchVal = $event.detail.value)
  } : {
    l: common_vendor.t($props.placeholder)
  }, {
    m: $data.show && ($props.clearButton === "always" || $props.clearButton === "auto" && $data.searchVal !== "") && !$props.readonly
  }, $data.show && ($props.clearButton === "always" || $props.clearButton === "auto" && $data.searchVal !== "") && !$props.readonly ? {
    n: common_vendor.p({
      color: "#c0c4cc",
      size: "20",
      type: "clear"
    }),
    o: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    p: $props.radius + "px",
    q: $props.bgColor,
    r: common_vendor.o((...args) => $options.searchClick && $options.searchClick(...args)),
    s: $props.cancelButton === "always" || $data.show && $props.cancelButton === "auto"
  }, $props.cancelButton === "always" || $data.show && $props.cancelButton === "auto" ? {
    t: common_vendor.t($options.cancelTextI18n),
    v: common_vendor.o((...args) => $options.cancel && $options.cancel(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue"]]);
wx.createComponent(Component);
