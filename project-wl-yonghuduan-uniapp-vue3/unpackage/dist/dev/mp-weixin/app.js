"use strict";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
require("./store/modules/global.js");
require("./store/modules/user.js");
require("./pages/api/user.js");
require("./utils/request.js");
require("./utils/env.js");
require("./pages/api/login.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/express-delivery/index.js";
  "./pages/goodsInfo/index.js";
  "./pages/address/index.js";
  "./pages/login/index.js";
  "./pages/pickup/index.js";
  "./pages/my/index.js";
  "./subPages/electronic-stub/index.js";
  "./subPages/authentication-success/index.js";
  "./subPages/realName-authentication/index.js";
  "./subPages/order-success/index.js";
  "./subPages/account-rules/index.js";
  "./subPages/order-info/index.js";
  "./subPages/order-cancel/index.js";
  "./subPages/address-info/index.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    return () => {
    };
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/project/project-wl-yonghuduan-uniapp-vue3/App.vue"]]);
const NavBar = () => "./components/Navbar/index.js";
const NetFail = () => "./components/NetFail/index.js";
const app = common_vendor.createApp(App);
app.use(store_index.store);
app.mount("#app");
app.component("nav-bar", NavBar);
app.component("net-fail", NetFail);
