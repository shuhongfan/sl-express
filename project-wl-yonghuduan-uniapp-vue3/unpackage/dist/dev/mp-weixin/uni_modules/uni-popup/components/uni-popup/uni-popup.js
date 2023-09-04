"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniPopup",
  components: {},
  emits: ["change", "maskClick"],
  props: {
    animation: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "center"
    },
    isMaskClick: {
      type: Boolean,
      default: null
    },
    maskClick: {
      type: Boolean,
      default: null
    },
    backgroundColor: {
      type: String,
      default: "none"
    },
    safeArea: {
      type: Boolean,
      default: true
    },
    maskBackgroundColor: {
      type: String,
      default: "rgba(0, 0, 0, 0.4)"
    }
  },
  watch: {
    type: {
      handler: function(type) {
        if (!this.config[type])
          return;
        this[this.config[type]](true);
      },
      immediate: true
    },
    isDesktop: {
      handler: function(newVal) {
        if (!this.config[newVal])
          return;
        this[this.config[this.type]](true);
      },
      immediate: true
    },
    maskClick: {
      handler: function(val) {
        this.mkclick = val;
      },
      immediate: true
    },
    isMaskClick: {
      handler: function(val) {
        this.mkclick = val;
      },
      immediate: true
    },
    showPopup(show) {
    }
  },
  data() {
    return {
      duration: 300,
      ani: [],
      showPopup: false,
      showTrans: false,
      popupWidth: 0,
      popupHeight: 0,
      config: {
        top: "top",
        bottom: "bottom",
        center: "center",
        left: "left",
        right: "right",
        message: "top",
        dialog: "center",
        share: "bottom"
      },
      maskClass: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)"
      },
      transClass: {
        position: "fixed",
        left: 0,
        right: 0
      },
      maskShow: true,
      mkclick: true,
      popupstyle: this.isDesktop ? "fixforpc-top" : "top"
    };
  },
  computed: {
    isDesktop() {
      return this.popupWidth >= 500 && this.popupHeight >= 500;
    },
    bg() {
      if (this.backgroundColor === "" || this.backgroundColor === "none") {
        return "transparent";
      }
      return this.backgroundColor;
    }
  },
  mounted() {
    const fixSize = () => {
      const {
        windowWidth,
        windowHeight,
        windowTop,
        safeArea,
        screenHeight,
        safeAreaInsets
      } = common_vendor.index.getSystemInfoSync();
      this.popupWidth = windowWidth;
      this.popupHeight = windowHeight + (windowTop || 0);
      if (safeArea && this.safeArea) {
        this.safeAreaInsets = screenHeight - safeArea.bottom;
      } else {
        this.safeAreaInsets = 0;
      }
    };
    fixSize();
  },
  unmounted() {
    this.setH5Visible();
  },
  created() {
    if (this.isMaskClick === null && this.maskClick === null) {
      this.mkclick = true;
    } else {
      this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
    }
    if (this.animation) {
      this.duration = 300;
    } else {
      this.duration = 0;
    }
    this.messageChild = null;
    this.clearPropagation = false;
    this.maskClass.backgroundColor = this.maskBackgroundColor;
  },
  methods: {
    setH5Visible() {
    },
    closeMask() {
      this.maskShow = false;
    },
    disableMask() {
      this.mkclick = false;
    },
    clear(e) {
      e.stopPropagation();
      this.clearPropagation = true;
    },
    open(direction) {
      if (this.showPopup) {
        clearTimeout(this.timer);
        this.showPopup = false;
      }
      let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
      if (!(direction && innerType.indexOf(direction) !== -1)) {
        direction = this.type;
      }
      if (!this.config[direction]) {
        console.error("\u7F3A\u5C11\u7C7B\u578B\uFF1A", direction);
        return;
      }
      this[this.config[direction]]();
      this.$emit("change", {
        show: true,
        type: direction
      });
    },
    close(type) {
      this.showTrans = false;
      this.$emit("change", {
        show: false,
        type: this.type
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.showPopup = false;
      }, 300);
    },
    touchstart() {
      this.clearPropagation = false;
    },
    onTap() {
      if (this.clearPropagation) {
        this.clearPropagation = false;
        return;
      }
      this.$emit("maskClick");
      if (!this.mkclick)
        return;
      this.close();
    },
    top(type) {
      this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
      this.ani = ["slide-top"];
      this.transClass = {
        position: "fixed",
        left: 0,
        right: 0,
        backgroundColor: this.bg
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
      this.$nextTick(() => {
        if (this.messageChild && this.type === "message") {
          this.messageChild.timerClose();
        }
      });
    },
    bottom(type) {
      this.popupstyle = "bottom";
      this.ani = ["slide-bottom"];
      this.transClass = {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: this.safeAreaInsets + "px",
        backgroundColor: this.bg
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
    },
    center(type) {
      this.popupstyle = "center";
      this.ani = ["zoom-out", "fade"];
      this.transClass = {
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center"
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
    },
    left(type) {
      this.popupstyle = "left";
      this.ani = ["slide-left"];
      this.transClass = {
        position: "fixed",
        left: 0,
        bottom: 0,
        top: 0,
        backgroundColor: this.bg,
        display: "flex",
        flexDirection: "column"
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
    },
    right(type) {
      this.popupstyle = "right";
      this.ani = ["slide-right"];
      this.transClass = {
        position: "fixed",
        bottom: 0,
        right: 0,
        top: 0,
        backgroundColor: this.bg,
        display: "flex",
        flexDirection: "column"
      };
      if (type)
        return;
      this.showPopup = true;
      this.showTrans = true;
    }
  }
};
if (!Array) {
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  _easycom_uni_transition2();
}
const _easycom_uni_transition = () => "../../../uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  _easycom_uni_transition();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showPopup
  }, $data.showPopup ? common_vendor.e({
    b: $data.maskShow
  }, $data.maskShow ? {
    c: common_vendor.o($options.onTap),
    d: common_vendor.p({
      name: "mask",
      ["mode-class"]: "fade",
      styles: $data.maskClass,
      duration: $data.duration,
      show: $data.showTrans
    })
  } : {}, {
    e: $options.bg,
    f: common_vendor.n($data.popupstyle),
    g: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    h: common_vendor.o($options.onTap),
    i: common_vendor.p({
      ["mode-class"]: $data.ani,
      name: "content",
      styles: $data.transClass,
      duration: $data.duration,
      show: $data.showTrans
    }),
    j: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args)),
    k: common_vendor.n($data.popupstyle),
    l: common_vendor.n($options.isDesktop ? "fixforpc-z-index" : "")
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
wx.createComponent(Component);
