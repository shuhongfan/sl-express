"use strict";
var common_vendor = require("../common/vendor.js");
const handleSecondQi = () => {
  common_vendor.index.showToast({
    title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
    icon: "none",
    duration: 1e3
  });
};
const handleTimeToStrTime = (time) => {
  const newTime = time.replace(/-/g, "/");
  return new Date(newTime).getMonth() + 1 + "\u6708" + (new Date(newTime).getDate() + "\u65E5") + " " + String(Number(new Date(newTime).getHours()) < 10 ? "0" + Number(new Date(newTime).getHours()) : Number(new Date(newTime).getHours())) + ":" + String(Number(new Date(newTime).getMinutes()) < 10 ? "0" + Number(new Date(newTime).getMinutes()) : Number(new Date(newTime).getMinutes()));
};
exports.handleSecondQi = handleSecondQi;
exports.handleTimeToStrTime = handleTimeToStrTime;
