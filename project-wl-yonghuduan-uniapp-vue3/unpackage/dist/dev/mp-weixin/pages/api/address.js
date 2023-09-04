"use strict";
var utils_request = require("../../utils/request.js");
const getAddressList = (params) => utils_request.request({
  url: `/address/page`,
  method: "get",
  params
});
const getAddressInfoDetail = (params) => utils_request.request({
  url: `/address/detail/` + params,
  method: "get",
  params
});
const addAddress = (params) => utils_request.request({
  url: `/address`,
  method: "post",
  params
});
const editAddress = (params) => utils_request.request({
  url: `/address`,
  method: "put",
  params
});
const deleteAddress = (params) => utils_request.request({
  url: `/address`,
  method: "delete",
  params
});
const defaultAddress = (params) => utils_request.request({
  url: `/address/defaultAddress`,
  method: "post",
  params
});
exports.addAddress = addAddress;
exports.defaultAddress = defaultAddress;
exports.deleteAddress = deleteAddress;
exports.editAddress = editAddress;
exports.getAddressInfoDetail = getAddressInfoDetail;
exports.getAddressList = getAddressList;
