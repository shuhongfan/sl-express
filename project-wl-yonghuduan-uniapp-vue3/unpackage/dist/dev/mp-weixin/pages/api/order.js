"use strict";
var utils_request = require("../../utils/request.js");
const getArea = (params) => utils_request.request({
  url: `/areas/children`,
  method: "get",
  params
});
const usualGoodsList = (params) => utils_request.request({
  url: `/order-manager/cargo/hot`,
  method: "get",
  params
});
const goodsList = (params) => utils_request.request({
  url: `/order-manager/cargo/last`,
  method: "get",
  params
});
const doOrder = (params) => utils_request.request({
  url: `/order-manager/order`,
  method: "post",
  params
});
const getOrderDetail = (params) => utils_request.request({
  url: `/order-manager/order/` + params,
  method: "get"
});
const getOrderList = (params) => utils_request.request({
  url: `/order-manager/order/page`,
  method: "post",
  params
});
const getEstimatePrice = (params) => utils_request.request({
  url: `/order-manager/order/totalPrice`,
  method: "post",
  params
});
const cancelOrder = (params) => utils_request.request({
  url: `/order-manager/order/cancel/` + params,
  method: "put",
  params
});
const deleteOrder = (params) => utils_request.request({
  url: `/order-manager/order/del/` + params,
  method: "put",
  params
});
const getGoodsNum = (params) => utils_request.request({
  url: `/order-manager/order/count`,
  method: "get"
});
const getOrderLine = (params) => utils_request.request({
  url: `/order-manager/order/track/` + params,
  method: "get"
});
exports.cancelOrder = cancelOrder;
exports.deleteOrder = deleteOrder;
exports.doOrder = doOrder;
exports.getArea = getArea;
exports.getEstimatePrice = getEstimatePrice;
exports.getGoodsNum = getGoodsNum;
exports.getOrderDetail = getOrderDetail;
exports.getOrderLine = getOrderLine;
exports.getOrderList = getOrderList;
exports.goodsList = goodsList;
exports.usualGoodsList = usualGoodsList;
