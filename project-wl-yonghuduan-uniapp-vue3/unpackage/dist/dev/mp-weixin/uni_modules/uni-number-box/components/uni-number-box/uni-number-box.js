"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniNumberBox",
  emits: ["change", "input", "update:modelValue", "blur", "focus"],
  props: {
    value: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: [Number, String],
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    background: {
      type: String,
      default: "#f5f5f5"
    },
    color: {
      type: String,
      default: "#333"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputValue: 0
    };
  },
  watch: {
    value(val) {
      this.inputValue = +val;
    },
    modelValue(val) {
      this.inputValue = +val;
    }
  },
  created() {
    if (this.value === 1) {
      this.inputValue = +this.modelValue;
    }
    if (this.modelValue === 1) {
      this.inputValue = +this.value;
    }
  },
  methods: {
    _calcValue(type) {
      if (this.disabled) {
        return;
      }
      const scale = this._getDecimalScale();
      let value = this.inputValue * scale;
      let step = this.step * scale;
      if (type === "minus") {
        value -= step;
        if (value < this.min * scale) {
          return;
        }
        if (value > this.max * scale) {
          value = this.max * scale;
        }
      }
      if (type === "plus") {
        value += step;
        if (value > this.max * scale) {
          return;
        }
        if (value < this.min * scale) {
          value = this.min * scale;
        }
      }
      this.inputValue = (value / scale).toFixed(String(scale).length - 1);
      this.$emit("change", +this.inputValue);
      this.$emit("input", +this.inputValue);
      this.$emit("update:modelValue", +this.inputValue);
    },
    _getDecimalScale() {
      let scale = 1;
      if (~~this.step !== this.step) {
        scale = Math.pow(10, String(this.step).split(".")[1].length);
      }
      return scale;
    },
    _onBlur(event) {
      this.$emit("blur", event);
      let value = event.detail.value;
      if (isNaN(value)) {
        this.inputValue = this.min;
        return;
      }
      value = +value;
      if (value > this.max) {
        value = this.max;
      } else if (value < this.min) {
        value = this.min;
      }
      const scale = this._getDecimalScale();
      this.inputValue = value.toFixed(String(scale).length - 1);
      this.$emit("change", +this.inputValue);
      this.$emit("input", +this.inputValue);
      this.$emit("update:modelValue", +this.inputValue);
    },
    _onFocus(event) {
      this.$emit("focus", event);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.inputValue <= $props.min || $props.disabled ? 1 : "",
    b: $props.color,
    c: common_vendor.o(($event) => $options._calcValue("minus")),
    d: $props.background,
    e: $props.disabled,
    f: common_vendor.o((...args) => $options._onFocus && $options._onFocus(...args)),
    g: common_vendor.o((...args) => $options._onBlur && $options._onBlur(...args)),
    h: $props.background,
    i: $props.color,
    j: $data.inputValue,
    k: common_vendor.o(($event) => $data.inputValue = $event.detail.value),
    l: $data.inputValue >= $props.max || $props.disabled ? 1 : "",
    m: $props.color,
    n: common_vendor.o(($event) => $options._calcValue("plus")),
    o: $props.background
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/uni_modules/uni-number-box/components/uni-number-box/uni-number-box.vue"]]);
wx.createComponent(Component);
