"use strict";
var common_vendor = require("../common/vendor.js");
var utils_env = require("./env.js");
var pages_api_login = require("../pages/api/login.js");
function request({
  url = "",
  params = {},
  method = "GET"
}) {
  const token = common_vendor.index.getStorageSync("token");
  const refreshToken = common_vendor.index.getStorageSync("refreshToken");
  const header = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
    "access_token": token
  };
  let refreshHeader = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
    "refresh_token": refreshToken
  };
  console.log(url, "url");
  const requestRes = new Promise((resolve, reject2) => {
    common_vendor.index.request({
      timeout: 2e4,
      url: utils_env.baseUrl + url,
      data: params,
      header: url === "/user/refresh" ? refreshHeader : header,
      method,
      success: (res) => {
        const {
          data
        } = res;
        if (data.code == 0 || data.code == 200) {
          resolve(res.data);
        } else {
          console.log(res, "112233");
          handleError(res, resolve, url, params, method);
        }
      },
      fail: (err) => {
        const error = {
          data: {
            msg: err.data
          }
        };
        reject2(error);
      }
    });
  });
  const handleError = (error, resolve, url2, params2, method2) => {
    var errorCode = error.statusCode;
    if (errorCode == 401) {
      if (token && refreshToken) {
        pages_api_login.resetToken().then((res) => {
          console.log(res, "resetToken");
          if (res.code === 200) {
            common_vendor.index.setStorageSync("token", res.data.accessToken);
            common_vendor.index.setStorageSync("refreshToken", res.data.refreshToken);
            let newHeader = {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json;charset=UTF-8",
              "access_token": common_vendor.index.getStorageSync("token")
            };
            common_vendor.index.request({
              url: utils_env.baseUrl + url2,
              data: params2,
              header: newHeader,
              method: method2,
              success: (res2) => {
                const {
                  data
                } = res2;
                if (data.code == 0 || data.code == 200) {
                  resolve(res2.data);
                } else {
                  resolve();
                  common_vendor.index.showToast({
                    title: res2.msg || "\u7F51\u7EDC\u5F02\u5E38",
                    duration: 2e3,
                    icon: "none"
                  });
                }
              },
              fail: (err) => {
                const error2 = {
                  data: {
                    msg: err.data
                  }
                };
                reject(error2);
              }
            });
          } else if (res.data.code === 1) {
            console.log(1, res);
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.removeStorageSync("refreshToken");
            common_vendor.index.showToast({
              title: res.data.msg || "\u5237\u65B0token\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u767B\u5F55.",
              icon: "none",
              duration: 1e3,
              success: () => {
                setTimeout(() => {
                  common_vendor.index.navigateTo({
                    url: "/pages/login/index"
                  });
                }, 2e3);
              },
              fail: () => {
              }
            });
          }
        }).catch((err) => {
          common_vendor.index.showToast({
            title: "\u7F51\u7EDC\u5F02\u5E38",
            duration: 2e3,
            icon: "none"
          });
        });
      }
    } else if (errorCode == 500) {
      if (common_vendor.index.getStorageSync("token") == "") {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          icon: "none",
          duration: 2e3,
          success: () => {
          },
          fail: () => {
          }
        });
      } else {
        common_vendor.index.showToast({
          title: error.data.error.message + "",
          icon: "none",
          duration: 3e3
        });
      }
    } else {
      resolve(error);
    }
  };
  return requestRes;
}
exports.request = request;
