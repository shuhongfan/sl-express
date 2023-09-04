var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
      throw reason;
    }));
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$1f = {
    name: "StarPage",
    setup: (props) => {
      vue.onMounted(() => {
        const times = setTimeout(() => {
          uni.redirectTo({
            url: "/pages/login/user"
          });
          clearTimeout(times);
        }, 3e3);
      });
      return {};
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "starPage" }, [
      vue.createElementVNode("view", { class: "page" })
    ]);
  }
  var PagesStartIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["render", _sfc_render$c], ["__scopeId", "data-v-31cb3308"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/start/index.vue"]]);
  var icons = {
    "id": "2852637",
    "name": "uniui\u56FE\u6807\u5E93",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal$1 = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$1e = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return unescape(`%u${code.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal$1(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("text", {
      style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
      class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
      onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
    }, null, 6);
  }
  var __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["render", _sfc_render$b], ["__scopeId", "data-v-a2e81f6e"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const ON_SHOW = "onShow";
  const ON_REACH_BOTTOM = "onReachBottom";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
  const _sfc_main$1d = {
    name: "uni-easyinput",
    emits: ["click", "iconClick", "update:modelValue", "input", "focus", "blur", "confirm"],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: String,
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 15
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: true
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        errMsg: "",
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false
      };
    },
    computed: {
      msg() {
        return this.errorMessage || this.errMsg;
      },
      inputMaxlength() {
        return Number(this.maxlength);
      }
    },
    watch: {
      value(newVal) {
        if (this.errMsg)
          this.errMsg = "";
        this.val = newVal;
        if (this.form && this.formItem && !this.is_reset) {
          this.is_reset = false;
          this.formItem.setValue(newVal);
        }
      },
      modelValue(newVal) {
        if (this.errMsg)
          this.errMsg = "";
        this.val = newVal;
        if (this.form && this.formItem && !this.is_reset) {
          this.is_reset = false;
          this.formItem.setValue(newVal);
        }
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
        });
      }
    },
    created() {
      if (!this.value && this.value !== 0) {
        this.val = this.modelValue;
      }
      if (!this.modelValue && this.modelValue !== 0) {
        this.val = this.value;
      }
      this.form = this.getForm("uniForms");
      this.formItem = this.getForm("uniFormsItem");
      if (this.form && this.formItem) {
        if (this.formItem.name) {
          if (!this.is_reset) {
            this.is_reset = false;
            this.formItem.setValue(this.val);
          }
          this.rename = this.formItem.name;
          this.form.inputChildrens.push(this);
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
      });
    },
    methods: {
      init() {
      },
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onEyes() {
        this.showPassword = !this.showPassword;
      },
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      onFocus(event) {
        this.$emit("focus", event);
      },
      onBlur(event) {
        event.detail.value;
        this.$emit("blur", event);
      },
      onConfirm(e) {
        this.$emit("confirm", e.detail.value);
      },
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
      },
      fieldClick() {
        this.$emit("click");
      },
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
      style: vue.normalizeStyle({ color: $props.inputBorder && $options.msg ? "#e43d33" : $props.styles.color })
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass(["uni-easyinput__content", { "is-input-border": $props.inputBorder, "is-input-error-border": $props.inputBorder && $options.msg, "is-textarea": $props.type === "textarea", "is-disabled": $props.disabled }]),
        style: vue.normalizeStyle({ "border-color": $props.inputBorder && $options.msg ? "#dd524d" : $props.styles.borderColor, "background-color": $props.disabled ? $props.styles.disableColor : "" })
      }, [
        $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
          key: 0,
          class: "content-clear-icon",
          type: $props.prefixIcon,
          color: "#c0c4cc",
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix"))
        }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true),
        $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 1,
          class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
          name: $props.name,
          value: $data.val,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled,
          "placeholder-class": "uni-easyinput__placeholder-class",
          maxlength: $options.inputMaxlength,
          focus: $data.focused,
          autoHeight: $props.autoHeight,
          onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
          onBlur: _cache[2] || (_cache[2] = (...args) => $options.onBlur && $options.onBlur(...args)),
          onFocus: _cache[3] || (_cache[3] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight"])) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 2,
          type: $props.type === "password" ? "text" : $props.type,
          class: "uni-easyinput__content-input",
          style: vue.normalizeStyle({
            "padding-right": $props.type === "password" || $props.clearable || $props.prefixIcon ? "" : "10px",
            "padding-left": $props.prefixIcon ? "" : "10px"
          }),
          name: $props.name,
          value: $data.val,
          password: !$data.showPassword && $props.type === "password",
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          "placeholder-class": "uni-easyinput__placeholder-class",
          disabled: $props.disabled,
          maxlength: $options.inputMaxlength,
          focus: $data.focused,
          confirmType: $props.confirmType,
          onFocus: _cache[5] || (_cache[5] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[6] || (_cache[6] = (...args) => $options.onBlur && $options.onBlur(...args)),
          onInput: _cache[7] || (_cache[7] = (...args) => $options.onInput && $options.onInput(...args)),
          onConfirm: _cache[8] || (_cache[8] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType"])),
        $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
          $data.val ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
            type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
            size: 18,
            color: "#c0c4cc",
            onClick: $options.onEyes
          }, null, 8, ["class", "type", "onClick"])) : vue.createCommentVNode("v-if", true)
        ], 64)) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
          $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: "content-clear-icon",
            type: $props.suffixIcon,
            color: "#c0c4cc",
            onClick: _cache[9] || (_cache[9] = ($event) => $options.onClickIcon("suffix"))
          }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
          $props.clearable && $data.val && !$props.disabled ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
            key: 0,
            class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
            type: "clear",
            size: $props.clearSize,
            color: "#c0c4cc",
            onClick: $options.onClear
          }, null, 8, ["class", "size", "onClick"])) : vue.createCommentVNode("v-if", true)
        ], 64)),
        vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
      ], 6)
    ], 6);
  }
  var __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["render", _sfc_render$a], ["__scopeId", "data-v-abe12412"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$1c = {
    name: "uniFormsItem",
    props: {
      custom: {
        type: Boolean,
        default: false
      },
      showMessage: {
        type: Boolean,
        default: true
      },
      name: String,
      required: Boolean,
      validateTrigger: {
        type: String,
        default: ""
      },
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      },
      label: String,
      labelWidth: {
        type: [Number, String],
        default: ""
      },
      labelAlign: {
        type: String,
        default: ""
      },
      labelPosition: {
        type: String,
        default: ""
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      rules: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        errorTop: false,
        errorBottom: false,
        labelMarginBottom: "",
        errorWidth: "",
        errMsg: "",
        val: "",
        labelPos: "",
        labelWid: "",
        labelAli: "",
        showMsg: "undertext",
        border: false,
        isFirstBorder: false,
        isArray: false,
        arrayField: ""
      };
    },
    computed: {
      msg() {
        return this.errorMessage || this.errMsg;
      },
      fieldStyle() {
        let style = {};
        if (this.labelPos == "top") {
          style.padding = "0 0";
          this.labelMarginBottom = "6px";
        }
        if (this.labelPos == "left" && this.msg !== false && this.msg != "") {
          style.paddingBottom = "0px";
          this.errorBottom = true;
          this.errorTop = false;
        } else if (this.labelPos == "top" && this.msg !== false && this.msg != "") {
          this.errorBottom = false;
          this.errorTop = true;
        } else {
          this.errorTop = false;
          this.errorBottom = false;
        }
        return style;
      },
      justifyContent() {
        if (this.labelAli === "left")
          return "flex-start";
        if (this.labelAli === "center")
          return "center";
        if (this.labelAli === "right")
          return "flex-end";
      },
      labelLeft() {
        return (this.labelPos === "left" ? parseInt(this.labelWid) : 0) + "px";
      }
    },
    watch: {
      validateTrigger(trigger) {
        this.formTrigger = trigger;
      }
    },
    created() {
      this.form = this.getForm();
      this.group = this.getForm("uniGroup");
      this.formRules = [];
      this.formTrigger = this.validateTrigger;
      if (this.name && this.name.indexOf("[") !== -1 && this.name.indexOf("]") !== -1) {
        this.isArray = true;
        this.arrayField = this.name;
        this.form.formData[this.name] = this.form._getValue(this.name, "");
      }
    },
    mounted() {
      if (this.form) {
        this.form.childrens.push(this);
      }
      this.init();
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      init() {
        if (this.form) {
          let { formRules, validator, formData, value, labelPosition, labelWidth, labelAlign, errShowType } = this.form;
          this.labelPos = this.labelPosition ? this.labelPosition : labelPosition;
          if (this.label) {
            this.labelWid = this.labelWidth ? this.labelWidth : labelWidth || 70;
          } else {
            this.labelWid = this.labelWidth ? this.labelWidth : labelWidth || "auto";
          }
          if (this.labelWid && this.labelWid !== "auto") {
            this.labelWid += "px";
          }
          this.labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (!this.form.isFirstBorder) {
            this.form.isFirstBorder = true;
            this.isFirstBorder = true;
          }
          if (this.group) {
            if (!this.group.isFirstBorder) {
              this.group.isFirstBorder = true;
              this.isFirstBorder = true;
            }
          }
          this.border = this.form.border;
          this.showMsg = errShowType;
          let name = this.isArray ? this.arrayField : this.name;
          if (!name)
            return;
          if (formRules && this.rules.length > 0) {
            if (!formRules[name]) {
              formRules[name] = {
                rules: this.rules
              };
            }
            validator.updateSchema(formRules);
          }
          this.formRules = formRules[name] || {};
          this.validator = validator;
        } else {
          this.labelPos = this.labelPosition || "left";
          this.labelWid = this.labelWidth || 65;
          this.labelAli = this.labelAlign || "left";
        }
      },
      unInit() {
        if (this.form) {
          this.form.childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete this.form.formData[item.name];
            }
          });
        }
      },
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      clearValidate() {
        this.errMsg = "";
      },
      setValue(value) {
        let name = this.isArray ? this.arrayField : this.name;
        if (name) {
          if (this.errMsg)
            this.errMsg = "";
          this.form.formData[name] = this.form._getValue(name, value);
          if (!this.formRules || typeof this.formRules && JSON.stringify(this.formRules) === "{}")
            return;
          this.triggerCheck(this.form._getValue(this.name, value));
        }
      },
      async triggerCheck(value, formTrigger) {
        this.errMsg = "";
        if (!this.validator || Object.keys(this.formRules).length === 0)
          return;
        const isNoField = this.isRequired(this.formRules.rules || []);
        let isTrigger = this.isTrigger(this.formRules.validateTrigger, this.validateTrigger, this.form.validateTrigger);
        let result = null;
        if (!!isTrigger || formTrigger) {
          let name = this.isArray ? this.arrayField : this.name;
          result = await this.validator.validateUpdate({
            [name]: value
          }, this.form.formData);
        }
        if (!isNoField && (value === void 0 || value === "")) {
          result = null;
        }
        const inputComp = this.form.inputChildrens.find((child) => child.rename === this.name);
        if ((isTrigger || formTrigger) && result && result.errorMessage) {
          if (inputComp) {
            inputComp.errMsg = result.errorMessage;
          }
          if (this.form.errShowType === "toast") {
            uni.showToast({
              title: result.errorMessage || "\u6821\u9A8C\u9519\u8BEF",
              icon: "none"
            });
          }
          if (this.form.errShowType === "modal") {
            uni.showModal({
              title: "\u63D0\u793A",
              content: result.errorMessage || "\u6821\u9A8C\u9519\u8BEF"
            });
          }
        } else {
          if (inputComp) {
            inputComp.errMsg = "";
          }
        }
        this.errMsg = !result ? "" : result.errorMessage;
        this.form.validateCheck(result ? result : null);
        return result ? result : null;
      },
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "bind" ? true : false;
              }
              return false;
            }
            return true;
          }
          return false;
        }
        return true;
      },
      isRequired(rules) {
        let isNoField = false;
        for (let i = 0; i < rules.length; i++) {
          const ruleData = rules[i];
          if (ruleData.required) {
            isNoField = true;
            break;
          }
        }
        return isNoField;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-forms-item", { "uni-forms-item--border": $data.border, "is-first-border": $data.border && $data.isFirstBorder, "uni-forms-item-error": $options.msg }])
    }, [
      vue.createElementVNode("view", { class: "uni-forms-item__box" }, [
        vue.createElementVNode("view", {
          class: vue.normalizeClass(["uni-forms-item__inner", ["is-direction-" + $data.labelPos]])
        }, [
          vue.createElementVNode("view", {
            class: "uni-forms-item__label",
            style: vue.normalizeStyle({ width: $data.labelWid, justifyContent: $options.justifyContent })
          }, [
            vue.renderSlot(_ctx.$slots, "label", {}, () => [
              $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              $props.leftIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                key: 1,
                class: "label-icon",
                size: "16",
                type: $props.leftIcon,
                color: $props.iconColor
              }, null, 8, ["type", "color"])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("text", { class: "label-text" }, vue.toDisplayString($props.label), 1),
              $props.label ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "label-seat"
              })) : vue.createCommentVNode("v-if", true)
            ], true)
          ], 4),
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["uni-forms-item__content", { "is-input-error-border": $options.msg }])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 2)
        ], 2),
        $options.msg ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: vue.normalizeClass(["uni-error-message", { "uni-error-msg--boeder": $data.border }]),
          style: vue.normalizeStyle({
            paddingLeft: $options.labelLeft
          })
        }, [
          vue.createElementVNode("text", { class: "uni-error-message-text" }, vue.toDisplayString($data.showMsg === "undertext" ? $options.msg : ""), 1)
        ], 6)) : vue.createCommentVNode("v-if", true)
      ])
    ], 2);
  }
  var __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["render", _sfc_render$9], ["__scopeId", "data-v-61dfc0d0"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", "i")
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value, data, allData) {
      var result = null;
      let rules = fieldValue.rules;
      let hasRequired = rules.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules === void 0) {
        return message["default"];
      }
      for (var i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let vt = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt]) {
          result = RuleValidatorHelper[vt](rule, value, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data, allData, vt);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data, allData, vt) {
      let result = null;
      try {
        let callbackMessage = null;
        const res2 = await rule.validateFunction(rule, value, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res2 === "string" && res2 || res2 === false) {
          result = this._getMessage(rule, callbackMessage || res2, vt);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt);
      }
      return result;
    }
    _getMessage(rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value, message) {
      const {
        range,
        errorMessage
      } = rule;
      let list = new Array(range.length);
      for (let i = 0; i < range.length; i++) {
        const item = range[i];
        if (types.object(item) && item.value !== void 0) {
          list[i] = item.value;
        } else {
          list[i] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max !== void 0 && val > max) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value, message) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i = 0; i < value.length; i++) {
        const element = value[i];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "\u9A8C\u8BC1\u9519\u8BEF",
      defaultInvalid: "\u63D0\u4EA4\u7684\u5B57\u6BB5{field}\u5728\u6570\u636E\u5E93\u4E2D\u5E76\u4E0D\u5B58\u5728",
      validateFunction: "\u9A8C\u8BC1\u65E0\u6548",
      required: "{label}\u5FC5\u586B",
      "enum": "{label}\u8D85\u51FA\u8303\u56F4",
      timestamp: "{label}\u683C\u5F0F\u65E0\u6548",
      whitespace: "{label}\u4E0D\u80FD\u4E3A\u7A7A",
      typeError: "{label}\u7C7B\u578B\u65E0\u6548",
      date: {
        format: "{label}\u65E5\u671F{value}\u683C\u5F0F\u65E0\u6548",
        parse: "{label}\u65E5\u671F\u65E0\u6CD5\u89E3\u6790,{value}\u65E0\u6548",
        invalid: "{label}\u65E5\u671F{value}\u65E0\u6548"
      },
      length: {
        minLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E{minLength}",
        maxLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7{maxLength}",
        range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minLength}\u548C{maxLength}\u4E4B\u95F4"
      },
      number: {
        minimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E{minimum}",
        maximum: "{label}\u4E0D\u80FD\u5927\u4E8E{maximum}",
        exclusiveMinimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E\u7B49\u4E8E{minimum}",
        exclusiveMaximum: "{label}\u4E0D\u80FD\u5927\u4E8E\u7B49\u4E8E{maximum}",
        range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minimum}and{maximum}\u4E4B\u95F4"
      },
      pattern: {
        mismatch: "{label}\u683C\u5F0F\u4E0D\u5339\u914D"
      }
    };
  }
  SchemaValidator.message = new Message();
  const _sfc_main$1b = {
    name: "uniForms",
    components: {},
    emits: ["input", "reset", "validate", "submit"],
    props: {
      value: {
        type: Object,
        default() {
          return {};
        }
      },
      modelValue: {
        type: Object,
        default() {
          return {};
        }
      },
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      validateTrigger: {
        type: String,
        default: ""
      },
      labelPosition: {
        type: String,
        default: "left"
      },
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      labelAlign: {
        type: String,
        default: "left"
      },
      errShowType: {
        type: String,
        default: "undertext"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        formData: {}
      };
    },
    computed: {
      dataValue() {
        if (JSON.stringify(this.modelValue) === "{}") {
          return this.value;
        } else {
          return this.modelValue;
        }
      }
    },
    watch: {
      rules(newVal) {
        this.init(newVal);
      },
      labelPosition() {
        this.childrens.forEach((vm) => {
          vm.init();
        });
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i in this.$refs) {
              const vm = this.$refs[i];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:152", "\u5F53\u524D uni-froms \u7EC4\u4EF6\u7F3A\u5C11 ref \u5C5E\u6027");
            formVm.setValue(name, value);
          }
        };
      }
      this.unwatchs = [];
      this.childrens = [];
      this.inputChildrens = [];
      this.checkboxChildrens = [];
      this.formRules = [];
      this.init(this.rules);
    },
    methods: {
      init(formRules) {
        if (Object.keys(formRules).length === 0) {
          try {
            this.formData = JSON.parse(JSON.stringify(this.dataValue));
          } catch (e) {
            this.formData = {};
          }
          return;
        }
        this.formRules = formRules;
        this.validator = new SchemaValidator(formRules);
        this.registerWatch();
      },
      registerWatch() {
        this.unwatchs.forEach((v) => v());
        this.childrens.forEach((v) => {
          v.init();
        });
        Object.keys(this.dataValue).forEach((key) => {
          let watch = this.$watch("dataValue." + key, (value) => {
            if (!value)
              return;
            if (value.toString() === "[object Object]") {
              for (let i in value) {
                let name = `${key}[${i}]`;
                this.formData[name] = this._getValue(name, value[i]);
              }
            } else {
              this.formData[key] = this._getValue(key, value);
            }
          }, {
            deep: true,
            immediate: true
          });
          this.unwatchs.push(watch);
        });
      },
      setRules(formRules) {
        this.init(formRules);
      },
      setValue(name, value, callback) {
        let example = this.childrens.find((child) => child.name === name);
        if (!example)
          return null;
        value = this._getValue(example.name, value);
        this.formData[name] = value;
        example.val = value;
        return example.triggerCheck(value, callback);
      },
      resetForm(event) {
        this.childrens.forEach((item) => {
          item.errMsg = "";
          const inputComp = this.inputChildrens.find((child) => child.rename === item.name);
          if (inputComp) {
            inputComp.errMsg = "";
            inputComp.is_reset = true;
            inputComp.$emit("input", inputComp.multiple ? [] : "");
            inputComp.$emit("update:modelValue", inputComp.multiple ? [] : "");
          }
        });
        this.childrens.forEach((item) => {
          if (item.name) {
            this.formData[item.name] = this._getValue(item.name, "");
          }
        });
        this.$emit("reset", event);
      },
      validateCheck(validate) {
        if (validate === null)
          validate = null;
        this.$emit("validate", validate);
      },
      async validateAll(invalidFields, type, keepitem, callback) {
        let childrens = [];
        for (let i in invalidFields) {
          const item = this.childrens.find((v) => v.name === i);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let newFormData = {};
        if (this.validator) {
          for (let key in childrens) {
            const child = childrens[key];
            let name = child.isArray ? child.arrayField : child.name;
            if (child.isArray) {
              if (child.name.indexOf("[") !== -1 && child.name.indexOf("]") !== -1) {
                const fieldData = child.name.split("[");
                const fieldName = fieldData[0];
                const fieldValue = fieldData[1].replace("]", "");
                if (!newFormData[fieldName]) {
                  newFormData[fieldName] = {};
                }
                newFormData[fieldName][fieldValue] = this._getValue(name, invalidFields[name]);
              }
            } else {
              newFormData[name] = this._getValue(name, invalidFields[name]);
            }
            const result = await child.triggerCheck(invalidFields[name], true);
            if (result) {
              results.push(result);
              if (this.errShowType === "toast" || this.errShowType === "modal")
                break;
            }
          }
        } else {
          newFormData = invalidFields;
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v) => {
            newFormData[v] = this.dataValue[v];
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: newFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        callback && typeof callback === "function" && callback(results, newFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      submitForm() {
      },
      submit(keepitem, callback, type) {
        for (let i in this.dataValue) {
          const itemData2 = this.childrens.find((v) => v.name === i);
          if (itemData2) {
            if (this.formData[i] === void 0) {
              this.formData[i] = this._getValue(i, this.dataValue[i]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:377", "submit \u65B9\u6CD5\u5373\u5C06\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528validate\u65B9\u6CD5\u4EE3\u66FF\uFF01");
        }
        return this.validateAll(this.formData, "submit", keepitem, callback);
      },
      validate(keepitem, callback) {
        return this.submit(keepitem, callback, true);
      },
      validateField(props, callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          if (props.indexOf(item.name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [item.name]: this.formData[item.name]
            });
          }
        });
        return this.validateAll(invalidFields, "submit", [], callback);
      },
      resetFields() {
        this.resetForm();
      },
      clearValidate(props) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          const inputComp = this.inputChildrens.find((child) => child.rename === item.name);
          if (props.length === 0) {
            item.errMsg = "";
            if (inputComp) {
              inputComp.errMsg = "";
            }
          } else {
            if (props.indexOf(item.name) !== -1) {
              item.errMsg = "";
              if (inputComp) {
                inputComp.errMsg = "";
              }
            }
          }
        });
      },
      _getValue(key, value) {
        const rules = this.formRules[key] && this.formRules[key].rules || [];
        const isRuleNum = rules.find((val) => val.format && this.type_filter(val.format));
        const isRuleBool = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
        if (isRuleNum) {
          value = isNaN(value) ? value : value === "" || value === null ? null : Number(value);
        }
        if (isRuleBool) {
          value = !value ? false : true;
        }
        return value;
      },
      type_filter(format) {
        return format === "int" || format === "double" || format === "number" || format === "timestamp";
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-forms", { "uni-forms--top": !$props.border }])
    }, [
      vue.createElementVNode("form", {
        onSubmit: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.submitForm && $options.submitForm(...args), ["stop"])),
        onReset: _cache[1] || (_cache[1] = (...args) => $options.resetForm && $options.resetForm(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 32)
    ], 2);
  }
  var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["render", _sfc_render$8], ["__scopeId", "data-v-7ae0e404"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  var popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      getParent(name = "uniPopup") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  const isObject$1 = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject$1(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  var en$1 = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  var zhHans$1 = {
    "uni-popup.cancel": "\u53D6\u6D88",
    "uni-popup.ok": "\u786E\u5B9A",
    "uni-popup.placeholder": "\u8BF7\u8F93\u5165",
    "uni-popup.title": "\u63D0\u793A",
    "uni-popup.shareTitle": "\u5206\u4EAB\u5230"
  };
  var zhHant$1 = {
    "uni-popup.cancel": "\u53D6\u6D88",
    "uni-popup.ok": "\u78BA\u5B9A",
    "uni-popup.placeholder": "\u8ACB\u8F38\u5165",
    "uni-popup.title": "\u63D0\u793A",
    "uni-popup.shareTitle": "\u5206\u4EAB\u5230"
  };
  var messages$1 = {
    en: en$1,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  const { t: t$1 } = initVueI18n(messages$1);
  const _sfc_main$1a = {
    name: "uniPopupDialog",
    mixins: [popup],
    emits: ["confirm", "close"],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      placeholder: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "error"
      },
      mode: {
        type: String,
        default: "base"
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      beforeClose: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: ""
      },
      confirmText: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        dialogType: "error",
        focus: false,
        val: ""
      };
    },
    computed: {
      okText() {
        return this.confirmText || t$1("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t$1("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t$1("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t$1("uni-popup.title");
      }
    },
    watch: {
      type(val) {
        this.dialogType = val;
      },
      mode(val) {
        if (val === "input") {
          this.dialogType = "info";
        }
      },
      value(val) {
        this.val = val;
      }
    },
    created() {
      this.popup.disableMask();
      if (this.mode === "input") {
        this.dialogType = "info";
        this.val = this.value;
      } else {
        this.dialogType = this.type;
      }
    },
    mounted() {
      this.focus = true;
    },
    methods: {
      onOk() {
        if (this.mode === "input") {
          this.$emit("confirm", this.val);
        } else {
          this.$emit("confirm");
        }
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      closeDialog() {
        this.$emit("close");
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      close() {
        this.popup.close();
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-dialog" }, [
      vue.createElementVNode("view", { class: "uni-dialog-title" }, [
        vue.createElementVNode("text", {
          class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
        }, vue.toDisplayString($options.titleText), 3)
      ]),
      $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode("text", { class: "uni-dialog-content-text" }, vue.toDisplayString($props.content), 1)
        ], true)
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.withDirectives(vue.createElementVNode("input", {
            class: "uni-dialog-input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.val = $event),
            type: "text",
            placeholder: $options.placeholderText,
            focus: $data.focus
          }, null, 8, ["placeholder", "focus"]), [
            [vue.vModelText, $data.val]
          ])
        ], true)
      ])),
      vue.createElementVNode("view", { class: "uni-dialog-button-group" }, [
        vue.createElementVNode("view", {
          class: "uni-dialog-button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDialog && $options.closeDialog(...args))
        }, [
          vue.createElementVNode("text", { class: "uni-dialog-button-text" }, vue.toDisplayString($options.closeText), 1)
        ]),
        vue.createElementVNode("view", {
          class: "uni-dialog-button uni-border-left",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
        }, [
          vue.createElementVNode("text", { class: "uni-dialog-button-text uni-button-color" }, vue.toDisplayString($options.okText), 1)
        ])
      ])
    ]);
  }
  var __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["render", _sfc_render$7], ["__scopeId", "data-v-6f54520a"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation(options);
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, __spreadValues({
          styles
        }, config), (res2) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$19 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      stylesObject() {
        let styles = __spreadProps(__spreadValues({}, this.styles), {
          "transition-duration": this.duration / 1e3 + "s"
        });
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:139", `\u65B9\u6CD5 ${i} \u4E0D\u5B58\u5728`);
          }
        }
        this.animation.step(config);
        return this;
      },
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["render", _sfc_render$6], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$18 = {
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
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
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
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:280", "\u7F3A\u5C11\u7C7B\u578B\uFF1A", direction);
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$4);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
    }, [
      vue.createElementVNode("view", {
        onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
      }, [
        $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
          key: "1",
          name: "mask",
          "mode-class": "fade",
          styles: $data.maskClass,
          duration: $data.duration,
          show: $data.showTrans,
          onClick: $options.onTap
        }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
        vue.createVNode(_component_uni_transition, {
          key: "2",
          "mode-class": $data.ani,
          name: "content",
          styles: $data.transClass,
          duration: $data.duration,
          show: $data.showTrans,
          onClick: $options.onTap
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
              style: vue.normalizeStyle({ backgroundColor: $options.bg }),
              onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ], 6)
          ]),
          _: 3
        }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
      ], 32)
    ], 2)) : vue.createCommentVNode("v-if", true);
  }
  var __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["render", _sfc_render$5], ["__scopeId", "data-v-7c43d41b"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = __spreadValues({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        }
      };
      hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
        if (pluginId === this.plugin.id) {
          this.fallbacks.setSettings(value);
        }
      });
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && pluginDescriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(pluginDescriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
   * vuex v4.0.2
   * (c) 2021 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function useStore(key) {
    if (key === void 0)
      key = null;
    return vue.inject(key !== null ? key : storeKey);
  }
  function forEachValue(obj, fn) {
    Object.keys(obj).forEach(function(key) {
      return fn(obj[key], key);
    });
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn, arg) {
    return function() {
      return fn(arg);
    };
  }
  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn);
    }
    return function() {
      var i = subs.indexOf(fn);
      if (i > -1) {
        subs.splice(i, 1);
      }
    };
  }
  function resetStore(store2, hot) {
    store2._actions = /* @__PURE__ */ Object.create(null);
    store2._mutations = /* @__PURE__ */ Object.create(null);
    store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
    store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    var state = store2.state;
    installModule(store2, state, [], store2._modules.root, true);
    resetStoreState(store2, state, hot);
  }
  function resetStoreState(store2, state, hot) {
    var oldState = store2._state;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    forEachValue(wrappedGetters, function(fn, key) {
      computedObj[key] = partial(fn, store2);
      Object.defineProperty(store2.getters, key, {
        get: function() {
          return computedObj[key]();
        },
        enumerable: true
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    if (store2.strict) {
      enableStrictMode(store2);
    }
    if (oldState) {
      if (hot) {
        store2._withCommit(function() {
          oldState.data = null;
        });
      }
    }
  }
  function installModule(store2, rootState, path, module, hot) {
    var isRoot = !path.length;
    var namespace = store2._modules.getNamespace(path);
    if (module.namespaced) {
      if (store2._modulesNamespaceMap[namespace] && true) {
        console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
      }
      store2._modulesNamespaceMap[namespace] = module;
    }
    if (!isRoot && !hot) {
      var parentState = getNestedState(rootState, path.slice(0, -1));
      var moduleName = path[path.length - 1];
      store2._withCommit(function() {
        {
          if (moduleName in parentState) {
            console.warn('[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"');
          }
        }
        parentState[moduleName] = module.state;
      });
    }
    var local = module.context = makeLocalContext(store2, namespace, path);
    module.forEachMutation(function(mutation, key) {
      var namespacedType = namespace + key;
      registerMutation(store2, namespacedType, mutation, local);
    });
    module.forEachAction(function(action, key) {
      var type = action.root ? key : namespace + key;
      var handler = action.handler || action;
      registerAction(store2, type, handler, local);
    });
    module.forEachGetter(function(getter, key) {
      var namespacedType = namespace + key;
      registerGetter(store2, namespacedType, getter, local);
    });
    module.forEachChild(function(child, key) {
      installModule(store2, rootState, path.concat(key), child, hot);
    });
  }
  function makeLocalContext(store2, namespace, path) {
    var noNamespace = namespace === "";
    var local = {
      dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._actions[type]) {
            console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
            return;
          }
        }
        return store2.dispatch(type, payload);
      },
      commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
        var args = unifyObjectStyle(_type, _payload, _options);
        var payload = args.payload;
        var options = args.options;
        var type = args.type;
        if (!options || !options.root) {
          type = namespace + type;
          if (!store2._mutations[type]) {
            console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
            return;
          }
        }
        store2.commit(type, payload, options);
      }
    };
    Object.defineProperties(local, {
      getters: {
        get: noNamespace ? function() {
          return store2.getters;
        } : function() {
          return makeLocalGetters(store2, namespace);
        }
      },
      state: {
        get: function() {
          return getNestedState(store2.state, path);
        }
      }
    });
    return local;
  }
  function makeLocalGetters(store2, namespace) {
    if (!store2._makeLocalGettersCache[namespace]) {
      var gettersProxy = {};
      var splitPos = namespace.length;
      Object.keys(store2.getters).forEach(function(type) {
        if (type.slice(0, splitPos) !== namespace) {
          return;
        }
        var localType = type.slice(splitPos);
        Object.defineProperty(gettersProxy, localType, {
          get: function() {
            return store2.getters[type];
          },
          enumerable: true
        });
      });
      store2._makeLocalGettersCache[namespace] = gettersProxy;
    }
    return store2._makeLocalGettersCache[namespace];
  }
  function registerMutation(store2, type, handler, local) {
    var entry = store2._mutations[type] || (store2._mutations[type] = []);
    entry.push(function wrappedMutationHandler(payload) {
      handler.call(store2, local.state, payload);
    });
  }
  function registerAction(store2, type, handler, local) {
    var entry = store2._actions[type] || (store2._actions[type] = []);
    entry.push(function wrappedActionHandler(payload) {
      var res2 = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res2)) {
        res2 = Promise.resolve(res2);
      }
      if (store2._devtoolHook) {
        return res2.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res2;
      }
    });
  }
  function registerGetter(store2, type, rawGetter, local) {
    if (store2._wrappedGetters[type]) {
      {
        console.error("[vuex] duplicate getter key: " + type);
      }
      return;
    }
    store2._wrappedGetters[type] = function wrappedGetter(store3) {
      return rawGetter(local.state, local.getters, store3.state, store3.getters);
    };
  }
  function enableStrictMode(store2) {
    vue.watch(function() {
      return store2._state.data;
    }, function() {
      {
        assert(store2._committing, "do not mutate vuex store state outside mutation handlers.");
      }
    }, { deep: true, flush: "sync" });
  }
  function getNestedState(state, path) {
    return path.reduce(function(state2, key) {
      return state2[key];
    }, state);
  }
  function unifyObjectStyle(type, payload, options) {
    if (isObject(type) && type.type) {
      options = payload;
      payload = type;
      type = type.type;
    }
    {
      assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
    }
    return { type, payload, options };
  }
  var LABEL_VUEX_BINDINGS = "vuex bindings";
  var MUTATIONS_LAYER_ID = "vuex:mutations";
  var ACTIONS_LAYER_ID = "vuex:actions";
  var INSPECTOR_ID = "vuex";
  var actionId = 0;
  function addDevtools(app2, store2) {
    setupDevtoolsPlugin({
      id: "org.vuejs.vuex",
      app: app2,
      label: "Vuex",
      homepage: "https://next.vuex.vuejs.org/",
      logo: "https://vuejs.org/images/icons/favicon-96x96.png",
      packageName: "vuex",
      componentStateTypes: [LABEL_VUEX_BINDINGS]
    }, function(api) {
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: "Vuex Mutations",
        color: COLOR_LIME_500
      });
      api.addTimelineLayer({
        id: ACTIONS_LAYER_ID,
        label: "Vuex Actions",
        color: COLOR_LIME_500
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Vuex",
        icon: "storage",
        treeFilterPlaceholder: "Filter stores..."
      });
      api.on.getInspectorTree(function(payload) {
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
          if (payload.filter) {
            var nodes = [];
            flattenStoreForInspectorTree(nodes, store2._modules.root, payload.filter, "");
            payload.rootNodes = nodes;
          } else {
            payload.rootNodes = [
              formatStoreForInspectorTree(store2._modules.root, "")
            ];
          }
        }
      });
      api.on.getInspectorState(function(payload) {
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          makeLocalGetters(store2, modulePath);
          payload.state = formatStoreForInspectorState(getStoreModule(store2._modules, modulePath), modulePath === "root" ? store2.getters : store2._makeLocalGettersCache, modulePath);
        }
      });
      api.on.editInspectorState(function(payload) {
        if (payload.app === app2 && payload.inspectorId === INSPECTOR_ID) {
          var modulePath = payload.nodeId;
          var path = payload.path;
          if (modulePath !== "root") {
            path = modulePath.split("/").filter(Boolean).concat(path);
          }
          store2._withCommit(function() {
            payload.set(store2._state.data, path, payload.state.value);
          });
        }
      });
      store2.subscribe(function(mutation, state) {
        var data = {};
        if (mutation.payload) {
          data.payload = mutation.payload;
        }
        data.state = state;
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: Date.now(),
            title: mutation.type,
            data
          }
        });
      });
      store2.subscribeAction({
        before: function(action, state) {
          var data = {};
          if (action.payload) {
            data.payload = action.payload;
          }
          action._id = actionId++;
          action._time = Date.now();
          data.state = state;
          api.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: action._time,
              title: action.type,
              groupId: action._id,
              subtitle: "start",
              data
            }
          });
        },
        after: function(action, state) {
          var data = {};
          var duration = Date.now() - action._time;
          data.duration = {
            _custom: {
              type: "duration",
              display: duration + "ms",
              tooltip: "Action duration",
              value: duration
            }
          };
          if (action.payload) {
            data.payload = action.payload;
          }
          data.state = state;
          api.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: action.type,
              groupId: action._id,
              subtitle: "end",
              data
            }
          });
        }
      });
    });
  }
  var COLOR_LIME_500 = 8702998;
  var COLOR_DARK = 6710886;
  var COLOR_WHITE = 16777215;
  var TAG_NAMESPACED = {
    label: "namespaced",
    textColor: COLOR_WHITE,
    backgroundColor: COLOR_DARK
  };
  function extractNameFromPath(path) {
    return path && path !== "root" ? path.split("/").slice(-2, -1)[0] : "Root";
  }
  function formatStoreForInspectorTree(module, path) {
    return {
      id: path || "root",
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(function(moduleName) {
        return formatStoreForInspectorTree(module._children[moduleName], path + moduleName + "/");
      })
    };
  }
  function flattenStoreForInspectorTree(result, module, filter, path) {
    if (path.includes(filter)) {
      result.push({
        id: path || "root",
        label: path.endsWith("/") ? path.slice(0, path.length - 1) : path || "Root",
        tags: module.namespaced ? [TAG_NAMESPACED] : []
      });
    }
    Object.keys(module._children).forEach(function(moduleName) {
      flattenStoreForInspectorTree(result, module._children[moduleName], filter, path + moduleName + "/");
    });
  }
  function formatStoreForInspectorState(module, getters, path) {
    getters = path === "root" ? getters : getters[path];
    var gettersKeys = Object.keys(getters);
    var storeState = {
      state: Object.keys(module.state).map(function(key) {
        return {
          key,
          editable: true,
          value: module.state[key]
        };
      })
    };
    if (gettersKeys.length) {
      var tree = transformPathsToObjectTree(getters);
      storeState.getters = Object.keys(tree).map(function(key) {
        return {
          key: key.endsWith("/") ? extractNameFromPath(key) : key,
          editable: false,
          value: canThrow(function() {
            return tree[key];
          })
        };
      });
    }
    return storeState;
  }
  function transformPathsToObjectTree(getters) {
    var result = {};
    Object.keys(getters).forEach(function(key) {
      var path = key.split("/");
      if (path.length > 1) {
        var target = result;
        var leafKey = path.pop();
        path.forEach(function(p) {
          if (!target[p]) {
            target[p] = {
              _custom: {
                value: {},
                display: p,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p]._custom.value;
        });
        target[leafKey] = canThrow(function() {
          return getters[key];
        });
      } else {
        result[key] = canThrow(function() {
          return getters[key];
        });
      }
    });
    return result;
  }
  function getStoreModule(moduleMap, path) {
    var names = path.split("/").filter(function(n) {
      return n;
    });
    return names.reduce(function(module, moduleName, i) {
      var child = module[moduleName];
      if (!child) {
        throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
      }
      return i === names.length - 1 ? child : child._children;
    }, path === "root" ? moduleMap : moduleMap.root._children);
  }
  function canThrow(cb) {
    try {
      return cb();
    } catch (e) {
      return e;
    }
  }
  var Module = function Module2(rawModule, runtime) {
    this.runtime = runtime;
    this._children = /* @__PURE__ */ Object.create(null);
    this._rawModule = rawModule;
    var rawState = rawModule.state;
    this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
  };
  var prototypeAccessors$1 = { namespaced: { configurable: true } };
  prototypeAccessors$1.namespaced.get = function() {
    return !!this._rawModule.namespaced;
  };
  Module.prototype.addChild = function addChild(key, module) {
    this._children[key] = module;
  };
  Module.prototype.removeChild = function removeChild(key) {
    delete this._children[key];
  };
  Module.prototype.getChild = function getChild(key) {
    return this._children[key];
  };
  Module.prototype.hasChild = function hasChild(key) {
    return key in this._children;
  };
  Module.prototype.update = function update2(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  };
  Module.prototype.forEachChild = function forEachChild(fn) {
    forEachValue(this._children, fn);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  };
  Object.defineProperties(Module.prototype, prototypeAccessors$1);
  var ModuleCollection = function ModuleCollection2(rawRootModule) {
    this.register([], rawRootModule, false);
  };
  ModuleCollection.prototype.get = function get(path) {
    return path.reduce(function(module, key) {
      return module.getChild(key);
    }, this.root);
  };
  ModuleCollection.prototype.getNamespace = function getNamespace(path) {
    var module = this.root;
    return path.reduce(function(namespace, key) {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + "/" : "");
    }, "");
  };
  ModuleCollection.prototype.update = function update$1(rawRootModule) {
    update([], this.root, rawRootModule);
  };
  ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
    var this$1$1 = this;
    if (runtime === void 0)
      runtime = true;
    {
      assertRawModule(path, rawModule);
    }
    var newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      var parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }
    if (rawModule.modules) {
      forEachValue(rawModule.modules, function(rawChildModule, key) {
        this$1$1.register(path.concat(key), rawChildModule, runtime);
      });
    }
  };
  ModuleCollection.prototype.unregister = function unregister(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    var child = parent.getChild(key);
    if (!child) {
      {
        console.warn("[vuex] trying to unregister module '" + key + "', which is not registered");
      }
      return;
    }
    if (!child.runtime) {
      return;
    }
    parent.removeChild(key);
  };
  ModuleCollection.prototype.isRegistered = function isRegistered(path) {
    var parent = this.get(path.slice(0, -1));
    var key = path[path.length - 1];
    if (parent) {
      return parent.hasChild(key);
    }
    return false;
  };
  function update(path, targetModule, newModule) {
    {
      assertRawModule(path, newModule);
    }
    targetModule.update(newModule);
    if (newModule.modules) {
      for (var key in newModule.modules) {
        if (!targetModule.getChild(key)) {
          {
            console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed");
          }
          return;
        }
        update(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
      }
    }
  }
  var functionAssert = {
    assert: function(value) {
      return typeof value === "function";
    },
    expected: "function"
  };
  var objectAssert = {
    assert: function(value) {
      return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
    },
    expected: 'function or object with "handler" function'
  };
  var assertTypes = {
    getters: functionAssert,
    mutations: functionAssert,
    actions: objectAssert
  };
  function assertRawModule(path, rawModule) {
    Object.keys(assertTypes).forEach(function(key) {
      if (!rawModule[key]) {
        return;
      }
      var assertOptions = assertTypes[key];
      forEachValue(rawModule[key], function(value, type) {
        assert(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
      });
    });
  }
  function makeAssertionMessage(path, key, type, value, expected) {
    var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
    if (path.length > 0) {
      buf += ' in module "' + path.join(".") + '"';
    }
    buf += " is " + JSON.stringify(value) + ".";
    return buf;
  }
  function createStore(options) {
    return new Store(options);
  }
  var Store = function Store2(options) {
    var this$1$1 = this;
    if (options === void 0)
      options = {};
    {
      assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
      assert(this instanceof Store2, "store must be called with the new operator.");
    }
    var plugins = options.plugins;
    if (plugins === void 0)
      plugins = [];
    var strict = options.strict;
    if (strict === void 0)
      strict = false;
    var devtools = options.devtools;
    this._committing = false;
    this._actions = /* @__PURE__ */ Object.create(null);
    this._actionSubscribers = [];
    this._mutations = /* @__PURE__ */ Object.create(null);
    this._wrappedGetters = /* @__PURE__ */ Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    this._devtools = devtools;
    var store2 = this;
    var ref = this;
    var dispatch = ref.dispatch;
    var commit = ref.commit;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store2, type, payload);
    };
    this.commit = function boundCommit(type, payload, options2) {
      return commit.call(store2, type, payload, options2);
    };
    this.strict = strict;
    var state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
    plugins.forEach(function(plugin) {
      return plugin(this$1$1);
    });
  };
  var prototypeAccessors = { state: { configurable: true } };
  Store.prototype.install = function install(app2, injectKey) {
    app2.provide(injectKey || storeKey, this);
    app2.config.globalProperties.$store = this;
    var useDevtools = this._devtools !== void 0 ? this._devtools : true;
    if (useDevtools) {
      addDevtools(app2, this);
    }
  };
  prototypeAccessors.state.get = function() {
    return this._state.data;
  };
  prototypeAccessors.state.set = function(v) {
    {
      assert(false, "use store.replaceState() to explicit replace store state.");
    }
  };
  Store.prototype.commit = function commit(_type, _payload, _options) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;
    var mutation = { type, payload };
    var entry = this._mutations[type];
    if (!entry) {
      {
        console.error("[vuex] unknown mutation type: " + type);
      }
      return;
    }
    this._withCommit(function() {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });
    this._subscribers.slice().forEach(function(sub) {
      return sub(mutation, this$1$1.state);
    });
    if (options && options.silent) {
      console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools");
    }
  };
  Store.prototype.dispatch = function dispatch(_type, _payload) {
    var this$1$1 = this;
    var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;
    var action = { type, payload };
    var entry = this._actions[type];
    if (!entry) {
      {
        console.error("[vuex] unknown action type: " + type);
      }
      return;
    }
    try {
      this._actionSubscribers.slice().filter(function(sub) {
        return sub.before;
      }).forEach(function(sub) {
        return sub.before(action, this$1$1.state);
      });
    } catch (e) {
      {
        console.warn("[vuex] error in before action subscribers: ");
        console.error(e);
      }
    }
    var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
      return handler(payload);
    })) : entry[0](payload);
    return new Promise(function(resolve, reject) {
      result.then(function(res2) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.after;
          }).forEach(function(sub) {
            return sub.after(action, this$1$1.state);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in after action subscribers: ");
            console.error(e);
          }
        }
        resolve(res2);
      }, function(error) {
        try {
          this$1$1._actionSubscribers.filter(function(sub) {
            return sub.error;
          }).forEach(function(sub) {
            return sub.error(action, this$1$1.state, error);
          });
        } catch (e) {
          {
            console.warn("[vuex] error in error action subscribers: ");
            console.error(e);
          }
        }
        reject(error);
      });
    });
  };
  Store.prototype.subscribe = function subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn, options) {
    var subs = typeof fn === "function" ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  };
  Store.prototype.watch = function watch$1(getter, cb, options) {
    var this$1$1 = this;
    {
      assert(typeof getter === "function", "store.watch only accepts a function.");
    }
    return vue.watch(function() {
      return getter(this$1$1.state, this$1$1.getters);
    }, cb, Object.assign({}, options));
  };
  Store.prototype.replaceState = function replaceState(state) {
    var this$1$1 = this;
    this._withCommit(function() {
      this$1$1._state.data = state;
    });
  };
  Store.prototype.registerModule = function registerModule(path, rawModule, options) {
    if (options === void 0)
      options = {};
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
      assert(path.length > 0, "cannot register the root module by using registerModule.");
    }
    this._modules.register(path, rawModule);
    installModule(this, this.state, path, this._modules.get(path), options.preserveState);
    resetStoreState(this, this.state);
  };
  Store.prototype.unregisterModule = function unregisterModule(path) {
    var this$1$1 = this;
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    this._modules.unregister(path);
    this._withCommit(function() {
      var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  };
  Store.prototype.hasModule = function hasModule(path) {
    if (typeof path === "string") {
      path = [path];
    }
    {
      assert(Array.isArray(path), "module path must be a string or an Array.");
    }
    return this._modules.isRegistered(path);
  };
  Store.prototype.hotUpdate = function hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  };
  Store.prototype._withCommit = function _withCommit(fn) {
    var committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  function request({ url = "", params = {}, method = "GET" }) {
    if (!uni.getStorageSync("baseUrl")) {
      uni.setStorageSync("baseUrl", "http://slwl-geteway.itheima.net/courier");
    }
    let baseUrl = uni.getStorageSync("baseUrl");
    const token = uni.getStorageSync("token");
    let header = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: token
    };
    if (url == "/track/upload") {
      header["Content-Type"] = "application/x-www-form-urlencoded";
    }
    const requestRes = new Promise((resolve, reject) => {
      uni.request({
        url: baseUrl + url,
        data: params,
        header,
        method
      }).then((res2) => {
        const { data } = res2;
        if (res2.statusCode == 401) {
          uni.showToast({
            title: "\u60A8\u7684\u767B\u5F55\u5DF2\u8FC7\u671F\uFF01\u8BF7\u91CD\u65B0\u767B\u5F55\u540E\u64CD\u4F5C\uFF01",
            duration: 2e3,
            icon: "none"
          });
          uni.redirectTo({
            url: "/pages/login/user"
          });
          return false;
        }
        if (res2.statusCode == 400) {
          uni.showToast({
            title: "\u6743\u9650\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u767B\u5F55\uFF01",
            duration: 2e3,
            icon: "none"
          });
          uni.redirectTo({
            url: "/pages/login/user"
          });
          return false;
        }
        if (data.code == 1) {
          uni.showToast({
            title: data.msg,
            duration: 2e3,
            icon: "none"
          });
          return false;
        }
        if (data.code == 0 || data.code == 200) {
          resolve(res2.data);
        } else {
          reject(res2.data);
        }
      }).catch((err) => {
        const error = { data: { msg: err.data } };
        reject(error);
      });
    });
    return requestRes;
  }
  const phoneLogins = (params) => request({
    url: `/logins/phone`,
    method: "post",
    params
  });
  const userLogins = (params) => request({
    url: `/login/account`,
    method: "post",
    params
  });
  const getUserInfo = (params) => request({
    url: `/users/get`,
    method: "get",
    params
  });
  const getHomeInfo = (params) => request({
    url: "/messages/home/get",
    method: "get",
    params
  });
  const getHomeData = () => request({
    url: "/tasks/taskStatistics",
    method: "get"
  });
  const getDeliveryList = (params) => request({
    url: "/tasks/page",
    method: "get",
    params
  });
  const transferBatch = (params) => request({
    url: "/tasks/transfer/batch",
    method: "post",
    params
  });
  const taskDelete = (id) => request({
    url: `/tasks/${id}`,
    method: "delete"
  });
  const taskBatchDelete = (params) => request({
    url: `/tasks/batch`,
    method: "delete",
    params
  });
  const taskCancel = (params) => request({
    url: `/tasks/cancel`,
    method: "post",
    params
  });
  const getDetail = (id) => request({
    url: `/tasks/get/${id}`,
    method: "get"
  });
  const idCardCheck = (params) => request({
    url: `/tasks/idCard/check`,
    method: "post",
    params
  });
  const getPickup = (params) => request({
    url: `/tasks/pickup`,
    method: "put",
    params
  });
  const getSameAgency = (params) => request({
    url: `/users/sameAgency`,
    method: "get",
    params
  });
  const rejection = (id) => request({
    url: `/tasks/reject/${id}`,
    method: "put"
  });
  const tasksSign = (params) => request({
    url: `/tasks/sign`,
    method: "put",
    params
  });
  const getQrCode = (params) => request({
    url: `/pays/qrCode/get`,
    method: "post",
    params
  });
  const paySucceed = (id) => request({
    url: `/pays/status/${id}`,
    method: "get"
  });
  const getTracks = (id) => request({
    url: `/tasks/tracks/${id}`,
    method: "get"
  });
  const getSearch = (params) => request({
    url: `/tasks/search`,
    method: "post",
    params
  });
  const getRecentSearch = () => request({
    url: `/tasks/recentSearch`,
    method: "get"
  });
  const setMarkRecent = (transportOrderId) => request({
    url: `/tasks/markRecent/${transportOrderId}`,
    method: "get"
  });
  const clearRecentSearch = () => request({
    url: `/tasks/recentSearch`,
    method: "delete"
  });
  const PositionUpload = (params) => request({
    url: `/track/upload`,
    method: "put",
    data: params,
    params
  });
  const _sfc_main$17 = {
    __name: "user",
    setup(__props) {
      const store2 = useStore();
      vue.ref(false);
      const customForm = vue.ref();
      let fromInfo = vue.reactive({
        account: "blkdy001",
        password: "123456"
      });
      const customRules = vue.reactive({
        account: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
            }
          ]
        }
      });
      vue.onMounted(() => {
        uni.setStorageSync("baseUrl", "http://slwl-geteway.itheima.net/courier");
        clearInterval(uni.getStorageSync("positions").timer);
        uni.setStorageSync("positions", null);
      });
      const handleSubmit = async () => {
        const valid = await customForm.value.validate();
        if (valid) {
          await userLogins(fromInfo).then(async (res2) => {
            if (res2.code === 200) {
              uni.setStorageSync("token", res2.data.token);
              store2.commit("user/setToken", res2.data.token);
              store2.dispatch("user/GetUsersInfo");
              await getHomeInfo().then((res3) => {
                if (res3.code === 200) {
                  uni.redirectTo({
                    url: "/pages/index/index"
                  });
                }
              });
            } else {
              uni.showToast({
                title: res2.msg,
                duration: 1e3,
                icon: "none"
              });
            }
          }).catch((err) => {
            uni.showToast({
              title: err.msg,
              duration: 15e3,
              icon: "none"
            });
          });
        }
      };
      const handlePwd = () => {
        fromInfo.password = "";
      };
      const baseURL = vue.ref(uni.getStorageSync("baseUrl"));
      const inputDialog = vue.ref(null);
      const inputDialogToggle = () => {
        inputDialog.value.open();
      };
      const dialogInputConfirm = (val) => {
        baseURL.value = val;
        uni.setStorageSync("baseUrl", val);
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_0$5);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "logo" }, "\u795E\u9886\u5FEB\u9012\u5458"),
          vue.createElementVNode("view", { class: "loginBox" }, [
            vue.createElementVNode("view", { class: "tit" }, [
              vue.createElementVNode("text", null, "\u8D26\u53F7\u767B\u5F55"),
              vue.createCommentVNode(" \u4E00\u671F\u4E0D\u505A,\u6682\u65F6\u9690\u85CF "),
              vue.createCommentVNode(' <text class="text" @click="goLogin">\n				\u624B\u673A\u53F7\u767B\u5F55\n				<icon></icon>\n			</text> ')
            ]),
            vue.createCommentVNode(" \u767B\u5F55\u8868\u5355 "),
            vue.createElementVNode("view", { class: "loginMain" }, [
              vue.createVNode(_component_uni_forms, {
                ref_key: "customForm",
                ref: customForm,
                rules: customRules,
                modelValue: vue.unref(fromInfo)
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_forms_item, { name: "account" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item",
                        modelValue: vue.unref(fromInfo).account,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(fromInfo).account = $event),
                        placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_uni_forms_item, {
                    name: "password",
                    class: "pwdBox"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item",
                        type: "password",
                        modelValue: vue.unref(fromInfo).password,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(fromInfo).password = $event),
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
                      }, null, 8, ["modelValue"]),
                      vue.unref(fromInfo).password.length > 0 ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "clearIcon",
                        onClick: handlePwd
                      })) : vue.createCommentVNode("v-if", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["rules", "modelValue"]),
              vue.createCommentVNode(" \u6309\u94AE "),
              vue.createElementVNode("view", { class: "btnBox" }, [
                vue.createElementVNode("button", {
                  class: vue.normalizeClass(["btn-default", vue.unref(fromInfo).account.length === 0 || vue.unref(fromInfo).password.length === 0 ? "disabled" : ""]),
                  disabled: vue.unref(fromInfo).account.length === 0 || vue.unref(fromInfo).password.length === 0,
                  type: "primary",
                  onClick: handleSubmit
                }, " \u767B\u5F55 ", 10, ["disabled"])
              ]),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u66F4\u65B0\u8BF7\u6C42Url - \u6559\u5B66\u9700\u6C42 "),
              vue.createElementVNode("view", {
                class: "setUrl",
                onClick: inputDialogToggle
              }, "\u914D\u7F6E\u8BF7\u6C42url"),
              vue.createVNode(_component_uni_popup, {
                ref_key: "inputDialog",
                ref: inputDialog,
                type: "dialog"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_popup_dialog, {
                    ref: "inputClose",
                    mode: "input",
                    title: "\u914D\u7F6EURL",
                    value: baseURL.value,
                    placeholder: "\u8BF7\u8F93\u5165baseURL",
                    onConfirm: dialogInputConfirm
                  }, null, 8, ["value"])
                ]),
                _: 1
              }, 512),
              vue.createCommentVNode(" \u66F4\u65B0\u8BF7\u6C42Url - \u6559\u5B66\u9700\u6C42 ")
            ]),
            vue.createCommentVNode(" end ")
          ])
        ], 64);
      };
    }
  };
  var PagesLoginUser = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/login/user.vue"]]);
  function validatePhone(rule, value, data, callback) {
    const reg = /^[1][3-9][0-9]{9}$/;
    if (value === "" || value === void 0 || value === null) {
      if (rule.required) {
        callback("\u8BF7\u8F93\u5165\u7535\u8BDD\u53F7\u7801");
      } else {
        callback();
      }
    } else if (!Number.isInteger(value)) {
      callback("\u7535\u8BDD\u53F7\u7801\u5FC5\u987B\u5168\u4E3A\u6570\u5B57");
    } else if (value.trim().length < 11) {
      callback("\u7535\u8BDD\u53F7\u7801\u957F\u5EA6\u5FC5\u987B\u662F11\u4F4D");
    } else {
      if (!reg.test(value) && value !== "") {
        callback("\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u7535\u8BDD\u53F7\u7801");
      } else {
        callback();
      }
    }
  }
  const isPhone = (value) => {
    const reg = /^[1][3-9][0-9]{9}$/;
    if (!reg.test(value) || value === "") {
      return false;
    } else {
      return true;
    }
  };
  const timeCountdown = (obj) => {
    const TIME_COUNT = 60;
    if (!obj.timer) {
      obj.times = TIME_COUNT;
      obj.show = false;
      obj.timer = setInterval(() => {
        if (obj.times > 0 && obj.times <= TIME_COUNT) {
          obj.times--;
        } else {
          obj.show = true;
          clearInterval(obj.timer);
          obj.timer = null;
        }
      }, 1e3);
    }
    return {
      timer: obj.timer,
      show: obj.show,
      times: obj.times
    };
  };
  const validateIdentityCard = (value) => {
    const accountreg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/g;
    if (value === void 0 || value === "") {
      return "\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1\u53F7";
    } else if (!accountreg.test(value)) {
      return "\u8EAB\u4EFD\u8BC1\u957F\u5EA6\u6216\u683C\u5F0F\u9519\u8BEF";
    } else {
      return true;
    }
  };
  const _sfc_main$16 = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const customForm = vue.ref();
      let isVerifySuccess = vue.ref(false);
      let fromInfo = vue.reactive({
        phone: "",
        verifyCode: ""
      });
      let codeInfo = vue.reactive({
        show: true,
        timer: null,
        times: 60
      });
      const customRules = vue.reactive({
        phone: {
          rules: [
            {
              required: true,
              validateFunction: validatePhone,
              errorMessage: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
            }
          ]
        },
        verifyCode: {
          rules: [
            {
              required: true,
              errorMessage: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
            }
          ]
        }
      });
      vue.onMounted(() => {
      });
      const getCode = async () => {
        let p = fromInfo.phone;
        isVerifySuccess.value = isPhone(p);
        if (isVerifySuccess.value) {
          timeCountdown(codeInfo);
          ({
            phone: phone.value
          });
        } else {
          return uni.showToast({
            title: "\u624B\u673A\u53F7\u8F93\u5165\u9519\u8BEF\uFF01\u8BF7\u91CD\u65B0\u8F93\u5165",
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleSubmit = async () => {
        const valid = await customForm.value.validate();
        if (valid) {
          await phoneLogins(fromInfo).then((res2) => {
            if (res2.code === 0) {
              store2.commit("user/setToken", res2.token);
              store2.dispatch("user/GetUsersInfo");
              uni.redirectTo({
                url: "/pages/index/index"
              });
            } else {
              return uni.showToast({
                title: res2.msg,
                duration: 1e3,
                icon: "none"
              });
            }
          });
        }
      };
      const goLogin = () => {
        uni.redirectTo({
          url: "/pages/login/user"
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "loginBox" }, [
          vue.createElementVNode("view", { class: "tit" }, [
            vue.createElementVNode("text", null, "\u624B\u673A\u53F7\u767B\u5F55"),
            vue.createElementVNode("text", {
              class: "text",
              onClick: goLogin
            }, [
              vue.createTextVNode(" \u8D26\u53F7\u767B\u5F55 "),
              vue.createElementVNode("icon")
            ])
          ]),
          vue.createCommentVNode(" \u767B\u5F55\u8868\u5355 \u624B\u673A\u53F7\u3001\u9A8C\u8BC1\u7801 "),
          vue.createElementVNode("view", { class: "loginMain" }, [
            vue.createVNode(_component_uni_forms, {
              ref_key: "customForm",
              ref: customForm,
              rules: customRules,
              modelValue: vue.unref(fromInfo)
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_forms_item, { name: "phone" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      class: "item",
                      modelValue: vue.unref(fromInfo).phone,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(fromInfo).phone = $event),
                      placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7"
                    }, null, 8, ["modelValue"])
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_uni_forms_item, { name: "verifyCode" }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_easyinput, {
                      class: "item inputW",
                      modelValue: vue.unref(fromInfo).verifyCode,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(fromInfo).verifyCode = $event),
                      placeholder: "\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
                    }, null, 8, ["modelValue"]),
                    vue.createElementVNode("view", { class: "codeBox" }, [
                      vue.withDirectives(vue.createElementVNode("text", {
                        class: "code",
                        onClick: getCode
                      }, "\u83B7\u53D6\u9A8C\u8BC1\u7801", 512), [
                        [vue.vShow, vue.unref(codeInfo).show]
                      ]),
                      vue.withDirectives(vue.createElementVNode("text", { class: "code fontCol" }, vue.toDisplayString(vue.unref(codeInfo).times) + "s\u540E\u91CD\u65B0\u83B7\u53D6", 513), [
                        [vue.vShow, !vue.unref(codeInfo).show]
                      ])
                    ])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["rules", "modelValue"]),
            vue.createCommentVNode(" \u6309\u94AE "),
            vue.createElementVNode("view", { class: "btnBox" }, [
              vue.createElementVNode("button", {
                class: vue.normalizeClass([
                  "btn-default",
                  vue.unref(fromInfo).phone.length === 0 || vue.unref(fromInfo).verifyCode.length === 0 ? "disabled" : ""
                ]),
                disabled: vue.unref(fromInfo).phone.length === 0 || vue.unref(fromInfo).verifyCode.length === 0,
                type: "primary",
                onClick: handleSubmit
              }, " \u767B\u5F55 ", 10, ["disabled"])
            ]),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" end ")
        ]);
      };
    }
  };
  var PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-4586967a"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/login/index.vue"]]);
  const taskTimeFormat = (val) => {
    const times = getTimeDate(val);
    return times.date;
  };
  const overTimeFormat = (val) => {
    const times = getTimeDate(val);
    return times.times;
  };
  const getTimeDate = (val) => {
    const date = new Date(val);
    date.setTime(date.getTime());
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    date.getSeconds();
    const time = {
      date: addZero(month) + "-" + addZero(day) + " " + addZero(hour) + ":" + addZero(minute),
      times: addZero(hour) + ":" + addZero(minute),
      veryDayDate: addZero(year) + "-" + addZero(month) + "-" + addZero(day) + " 00:00:00"
    };
    return time;
  };
  function addZero(s) {
    return s < 10 ? "0" + s : s;
  }
  const getTate = (val) => {
    let date = new Date(val);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const m = addZero(year) + "-" + addZero(month) + "-" + addZero(day) + " 00:00:00";
    return m;
  };
  const getNow = (val) => {
    let date = new Date(val);
    date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    return m + "\u6708" + d + "\u65E5";
  };
  const tomorrowDay = (date) => {
    let odata = new Date(new Date().getTime() + 24 * 60 * 60 * 1e3);
    return getTate(odata);
  };
  const afterTomorrowDay = (date) => {
    let odata = new Date(new Date().getTime() + 48 * 60 * 60 * 1e3);
    return getTate(odata);
  };
  const getDay = () => {
    const times = timeList();
    let arr = [];
    times.forEach((val) => {
      const obj = getTate(val);
      arr.push(obj);
    });
    return arr;
  };
  const getMonthDay = (val) => {
    const now = timeList();
    const timeNow = Date.parse(val);
    const timeStar = Date.parse(now[0]);
    const timeEnd = Date.parse(now[now.length - 1]);
    const times = {
      timeNow,
      timeStar,
      timeEnd
    };
    return times;
  };
  const validateTextLength = (value) => {
    if (value != void 0) {
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
      let mat = value.match(cnReg);
      let length;
      if (mat) {
        length = mat.length + (value.length - mat.length) * 0.5;
        return length;
      } else {
        return value.length * 0.5;
      }
    }
  };
  const timeList = () => {
    var thrityMonth = [];
    for (var i = 0; i < 30; i++) {
      thrityMonth.unshift(new Date(new Date().setDate(new Date().getDate() - i)).toLocaleDateString());
    }
    return thrityMonth;
  };
  const call = (val) => {
    uni.makePhoneCall({
      phoneNumber: val,
      success(e) {
      },
      fail(e) {
      }
    });
  };
  let getAuth = null;
  const positionsUploadInit = () => {
    let appAuthorizeSetting = uni.getAppAuthorizeSetting().locationAuthorized;
    getAuth != null ? clearInterval(getAuth) : null;
    if (appAuthorizeSetting == "denied") {
      uni.showToast({
        title: "\u60A8\u62D2\u7EDD\u63D0\u4F9B\u5B9A\u4F4D\u670D\u52A1\uFF0C\u7CFB\u7EDF\u5C06\u65E0\u6CD5\u4F7F\u7528\u4F4D\u7F6E\u4E0A\u62A5\u529F\u80FD",
        duration: 3e3,
        icon: "none"
      });
      return false;
    }
    if (appAuthorizeSetting != "authorized" && appAuthorizeSetting != "denied") {
      getAuth = setInterval(() => {
        positionsUploadInit();
      }, 3e4);
      return false;
    }
    const posit = uni.getStorageSync("positions");
    if (!posit) {
      positionUploadHandle();
    }
  };
  const positionUploadHandle = (item) => {
    uni.getLocation({
      type: "gcj02",
      isHighAccuracy: true,
      success: function(positions) {
        if (positions) {
          const posit = uni.getStorageSync("positions");
          if (item) {
            positionUploadAdmin(positions);
            uni.setStorageSync("positions", { timer: posit.timer, lastPoint: positions, countTime: 0, countDist: 0 });
            return;
          }
          if (!posit) {
            const timer = setInterval(() => {
              positionUploadHandle();
            }, 1e3 * 60);
            uni.setStorageSync("positions", { timer, lastPoint: positions, countTime: 0, countDist: 0 });
            positionUploadAdmin(positions);
          } else {
            const dist = getDistance(posit.lastPoint.latitude, posit.lastPoint.longitude, positions.latitude, positions.longitude);
            uni.setStorageSync("positions", { timer: posit.timer, lastPoint: positions, countTime: posit.countTime + 6e4, countDist: posit.countDist + dist });
            if (posit.countTime + 6e4 >= 3e5 || posit.countDist + dist >= 100) {
              positionUploadAdmin(positions);
              uni.setStorageSync("positions", { timer: posit.timer, lastPoint: positions, countTime: 0, countDist: 0 });
            }
          }
        } else {
          uni.showToast({
            title: "\u4F4D\u7F6E\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5B9A\u4F4D\u529F\u80FD\u662F\u5426\u5F00\u542F\uFF0C\u6216\u5207\u7F51\u7EDC\u4E86\u91CD\u65B0\u4E0A\u4F20",
            duration: 3e3,
            icon: "none"
          });
        }
      },
      fail: function(err) {
        uni.showToast({
          title: "\u4F4D\u7F6E\u83B7\u53D6\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5B9A\u4F4D\u529F\u80FD\u662F\u5426\u5F00\u542F\uFF0C\u6216\u5207\u7F51\u7EDC\u4E86\u91CD\u65B0\u4E0A\u4F20",
          duration: 3e3,
          icon: "none"
        });
      }
    });
  };
  const getDistance = (lat1, lng1, lat2, lng2, lenType = 1, decimal = 2) => {
    const EARTH_RADIUS = 6378.137;
    const PI = 3.1415926;
    const radLat1 = lat1 * PI / 180;
    const radLat2 = lat2 * PI / 180;
    let a = radLat1 - radLat2;
    let b = lng1 * PI / 180 - lng2 * PI / 180;
    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = lenType == 1 ? Math.round(s * 1e3) / 1 : Math.round(s * 1e4) / 1e4;
    return s;
  };
  const positionUploadAdmin = (positions) => {
    PositionUpload({ lat: positions.latitude.toString(), lng: positions.longitude.toString() }).then((res2) => {
      if (res2.code == 200)
        ;
      else {
        uni.showToast({
          title: "\u4F4D\u7F6E\u4E0A\u62A5\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5B9A\u4F4D\u529F\u80FD\u662F\u5426\u5F00\u542F\uFF0C\u6216\u5207\u7F51\u7EDC\u4E86\u91CD\u65B0\u4E0A\u4F20",
          duration: 3e3,
          icon: "none"
        });
      }
    });
  };
  const cancelData = [
    {
      value: 1,
      label: "\u7528\u6237\u6076\u610F\u4E0B\u5355"
    },
    {
      value: 2,
      label: "\u7528\u6237\u53D6\u6D88\u6295\u9012"
    },
    {
      value: 3,
      label: "\u8FDD\u7981\u54C1"
    },
    {
      value: 4,
      label: "\u91CD\u590D\u4E0B\u5355"
    },
    {
      value: 5,
      label: "\u65E0\u6CD5\u8054\u7CFB\u4E0A\u5BA2\u6237\uFF08\u7A7A\u53F7\u3001\u505C\u673A\u7B49\uFF09"
    },
    {
      value: 6,
      label: "\u865A\u5047\u5730\u5740"
    },
    {
      value: 7,
      label: "\u5B9E\u9645\u53D1\u8D27\u5730\u5740\u4E0E\u4E0B\u5355\u5730\u5740\u4E0D\u7B26"
    },
    {
      value: 8,
      label: "\u56E0\u4E2A\u4EBA\u65E0\u6CD5\u53D6\u4EF6\uFF0C\u9000\u56DE\u5230\u7F51\u70B9"
    }
  ];
  const SignData = [
    {
      value: 1,
      label: "\u672C\u4EBA"
    },
    {
      value: 2,
      label: "\u4EE3\u6536"
    }
  ];
  const PayMethodData = [
    {
      value: 1,
      label: "\u5BC4\u4ED8"
    },
    {
      value: 2,
      label: "\u5230\u4ED8"
    }
  ];
  const GoodsData = [
    {
      value: 1,
      label: "\u751F\u6D3B\u7528\u54C1"
    },
    {
      value: 2,
      label: "\u6587\u4EF6"
    },
    {
      value: 3,
      label: "\u6570\u7801\u4EA7\u54C1"
    },
    {
      value: 4,
      label: "\u98DF\u54C1"
    },
    {
      value: 5,
      label: "\u670D\u9970"
    },
    {
      value: 6,
      label: "\u5176\u4ED6"
    }
  ];
  const PayWayData = [
    {
      value: 1,
      label: "\u5FAE\u4FE1\u652F\u4ED8"
    },
    {
      value: 2,
      label: "\u652F\u4ED8\u5B9D\u652F\u4ED8"
    }
  ];
  const DeliveryData = [
    {
      value: 1,
      label: "\u5F85\u53D6\u4EF6"
    },
    {
      value: 2,
      label: "\u5DF2\u53D6\u4EF6"
    },
    {
      value: 3,
      label: "\u5DF2\u53D6\u6D88"
    }
  ];
  const PickUpData = [
    {
      value: 1,
      label: "\u5F85\u6D3E\u4EF6"
    },
    {
      value: 2,
      label: "\u5DF2\u7B7E\u6536"
    }
  ];
  const HistoryTabData = [
    {
      value: 1,
      label: "\u53D6\u4EF6"
    },
    {
      value: 2,
      label: "\u6D3E\u4EF6"
    }
  ];
  const tabBars = [
    {
      name: "\u5F85\u53D6\u4EF6"
    },
    {
      name: "\u5F85\u6D3E\u4EF6"
    }
  ];
  const newItemData = [
    {
      id: 1,
      title: "\u7269\u6D41\u4FDD\u901A\u4FDD\u7545\uFF1A\u6C11\u822A\u4FDD\u969C\u8D27\u8FD0\u822A\u73ED\u73AF\u6BD4\u589E\u957F9.7%",
      created: "2022-09-15 06:16",
      isRead: 0,
      firstContent: "\u6700\u65B0\u6570\u636E\u663E\u793A\uFF0C9\u670814\u65E5\uFF0C\u5168\u56FD\u8D27\u8FD0\u7269\u6D41\u6709\u5E8F\u8FD0\u884C\uFF0C\u6C11\u822A\u4FDD\u969C\u8D27\u8FD0\u822A\u73ED\u73AF\u6BD4\u589E\u957F9.7%\u3002",
      content: "\u56FD\u52A1\u9662\u7269\u6D41\u4FDD\u901A\u4FDD\u7545\u5DE5\u4F5C\u9886\u5BFC\u5C0F\u7EC4\u529E\u516C\u5BA4\u76D1\u6D4B\u6C47\u603B\u6570\u636E\u663E\u793A\uFF0C9\u670814\u65E5\uFF0C\u56FD\u5BB6\u94C1\u8DEF\u8D27\u8FD0\u7EE7\u7EED\u4FDD\u6301\u9AD8\u4F4D\u8FD0\u884C\uFF0C\u8FD0\u8F93\u8D27\u72691094.7\u4E07\u5428\uFF0C\u73AF\u6BD4\u4E0B\u964D0.23%\uFF1B\u5168\u56FD\u9AD8\u901F\u516C\u8DEF\u8D27\u8F66\u901A\u884C739.05\u4E07\u8F86\uFF0C\u73AF\u6BD4\u589E\u957F1.64%\uFF1B\u76D1\u6D4B\u6E2F\u53E3\u5B8C\u6210\u8D27\u7269\u541E\u5410\u91CF2374.5\u4E07\u5428\uFF0C\u73AF\u6BD4\u4E0B\u964D27.9%\uFF0C\u5B8C\u6210\u96C6\u88C5\u7BB1\u541E\u5410\u91CF53.1\u4E07\u6807\u7BB1\uFF0C\u73AF\u6BD4\u4E0B\u964D33.9%\uFF1B\u6C11\u822A\u4FDD\u969C\u8D27\u8FD0\u822A\u73ED653\u73ED\uFF08\u5176\u4E2D\u56FD\u9645\u8D27\u8FD0\u822A\u73ED452\u73ED\uFF0C\u56FD\u5185\u8D27\u8FD0\u822A\u73ED201\u73ED\uFF09\uFF0C\u73AF\u6BD4\u589E\u957F9.7%\uFF1B\u90AE\u653F\u5FEB\u9012\u63FD\u6536\u91CF\u7EA63.27\u4EBF\u4EF6\uFF0C\u73AF\u6BD4\u589E\u957F0.6%\uFF1B\u6295\u9012\u91CF\u7EA62.97\u4EBF\u4EF6\uFF0C\u73AF\u6BD4\u589E\u957F2.4%\u3002"
    },
    {
      id: 2,
      title: "\u795E\u9886\u7269\u6D41\u5168\u65B02.0\u7248\u672C\u4E0A\u7EBF\uFF0C\u57FA\u4E8E1.0\u7248\u672C\u5728\u4E1A\u52A1\u53CA\u529F\u80FD\u5C42\u9762\u8FDB\u884C\u4E86\u5347\u7EA7\u8FED\u4EE3",
      created: "2022-04-02 20:23",
      isRead: 1,
      firstContent: null,
      content: "\u795E\u9886\u7269\u6D412.0\u7248\u672C-\u5FEB\u9012\u5458\u7AEF\u7EC8\u4E8E\u57282022\u5E74\u4E0A\u534A\u5E74\u5B8C\u7F8E\u4E0A\u7EBF\u7EBF\uFF0C\u5176\u4E2D\u53D6\u4EF6/\u6D3E\u4EF6\u6D41\u7A0B\u6A21\u5757\u4F5C\u51FA\u4E86\u5F88\u591A\u65B0\u9896\u7684\u8C03\u6574\uFF0C\u8BF7\u5927\u5BB6\u591A\u591A\u5173\u6CE8\u652F\u6301\uFF01"
    }
  ];
  const _sfc_main$15 = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w = this.width / 2, h = 10;
        if (this.isDot) {
          w = 5;
          h = 5;
        }
        const x = `${-w + this.offset[0]}px`;
        const y = `${-h + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x,
            top: y
          },
          rightBottom: {
            right: x,
            bottom: y
          },
          leftBottom: {
            left: x,
            bottom: y
          },
          leftTop: {
            left: x,
            top: y
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      badgeWidth() {
        return {
          width: `${this.width}px`
        };
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          height: "10px",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 0,
        class: vue.normalizeClass([$options.classNames, "uni-badge"]),
        style: vue.normalizeStyle([$options.badgeWidth, $options.positionStyle, $props.customStyle, $options.dotStyle]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
      }, vue.toDisplayString($options.displayValue), 7)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["render", _sfc_render$4], ["__scopeId", "data-v-7c66581c"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$14 = {
    name: "UniStatusBar",
    data() {
      return {
        statusBarHeight: 20
      };
    },
    mounted() {
      this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + "px";
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      style: vue.normalizeStyle({ height: $data.statusBarHeight }),
      class: "uni-status-bar"
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 4);
  }
  var statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["render", _sfc_render$3], ["__scopeId", "data-v-f9a87a8e"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue"]]);
  const getVal = (val) => typeof val === "number" ? val + "px" : val;
  const _sfc_main$13 = {
    name: "UniNavBar",
    components: {
      statusBar
    },
    emits: ["clickLeft", "clickRight", "clickTitle"],
    props: {
      dark: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      leftText: {
        type: String,
        default: ""
      },
      rightText: {
        type: String,
        default: ""
      },
      leftIcon: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: ""
      },
      fixed: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: ""
      },
      backgroundColor: {
        type: String,
        default: ""
      },
      statusBar: {
        type: [Boolean, String],
        default: false
      },
      shadow: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      height: {
        type: [Number, String],
        default: 44
      },
      leftWidth: {
        type: [Number, String],
        default: 60
      },
      rightWidth: {
        type: [Number, String],
        default: 60
      },
      stat: {
        type: [Boolean, String],
        default: ""
      }
    },
    computed: {
      themeBgColor() {
        if (this.dark) {
          if (this.backgroundColor) {
            return this.backgroundColor;
          } else {
            return this.dark ? "#333" : "#FFF";
          }
        }
        return this.backgroundColor || "#FFF";
      },
      themeColor() {
        if (this.dark) {
          if (this.color) {
            return this.color;
          } else {
            return this.dark ? "#fff" : "#333";
          }
        }
        return this.color || "#333";
      },
      navbarHeight() {
        return getVal(this.height);
      },
      leftIconWidth() {
        return getVal(this.leftWidth);
      },
      rightIconWidth() {
        return getVal(this.rightWidth);
      }
    },
    mounted() {
      if (uni.report && this.stat && this.title !== "") {
        uni.report("title", this.title);
      }
    },
    methods: {
      onClickLeft() {
        this.$emit("clickLeft");
      },
      onClickRight() {
        this.$emit("clickRight");
      },
      onClickTitle() {
        this.$emit("clickTitle");
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_status_bar = vue.resolveComponent("status-bar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass(["uni-navbar", { "uni-dark": $props.dark }])
    }, [
      vue.createElementVNode("view", {
        class: vue.normalizeClass([{ "uni-navbar--fixed": $props.fixed, "uni-navbar--shadow": $props.shadow, "uni-navbar--border": $props.border }, "uni-navbar__content"]),
        style: vue.normalizeStyle({ "background-color": $options.themeBgColor })
      }, [
        $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          style: vue.normalizeStyle({ color: $options.themeColor, backgroundColor: $options.themeBgColor, height: $options.navbarHeight }),
          class: "uni-navbar__header"
        }, [
          vue.createElementVNode("view", {
            onClick: _cache[0] || (_cache[0] = (...args) => $options.onClickLeft && $options.onClickLeft(...args)),
            class: "uni-navbar__header-btns uni-navbar__header-btns-left",
            style: vue.normalizeStyle({ width: $options.leftIconWidth })
          }, [
            vue.renderSlot(_ctx.$slots, "left", {}, () => [
              $props.leftIcon.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-navbar__content_view"
              }, [
                vue.createVNode(_component_uni_icons, {
                  color: $options.themeColor,
                  type: $props.leftIcon,
                  size: "20"
                }, null, 8, ["color", "type"])
              ])) : vue.createCommentVNode("v-if", true),
              $props.leftText.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: vue.normalizeClass([{ "uni-navbar-btn-icon-left": !$props.leftIcon.length > 0 }, "uni-navbar-btn-text"])
              }, [
                vue.createElementVNode("text", {
                  style: vue.normalizeStyle({ color: $options.themeColor, fontSize: "12px" })
                }, vue.toDisplayString($props.leftText), 5)
              ], 2)) : vue.createCommentVNode("v-if", true)
            ], true)
          ], 4),
          vue.createElementVNode("view", {
            class: "uni-navbar__header-container",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickTitle && $options.onClickTitle(...args))
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              $props.title.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-navbar__header-container-inner"
              }, [
                vue.createElementVNode("text", {
                  class: "uni-nav-bar-text uni-ellipsis-1",
                  style: vue.normalizeStyle({ color: $options.themeColor })
                }, vue.toDisplayString($props.title), 5)
              ])) : vue.createCommentVNode("v-if", true)
            ], true)
          ]),
          vue.createElementVNode("view", {
            onClick: _cache[2] || (_cache[2] = (...args) => $options.onClickRight && $options.onClickRight(...args)),
            class: "uni-navbar__header-btns uni-navbar__header-btns-right",
            style: vue.normalizeStyle({ width: $options.rightIconWidth })
          }, [
            vue.renderSlot(_ctx.$slots, "right", {}, () => [
              $props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                vue.createVNode(_component_uni_icons, {
                  color: $options.themeColor,
                  type: $props.rightIcon,
                  size: "22"
                }, null, 8, ["color", "type"])
              ])) : vue.createCommentVNode("v-if", true),
              $props.rightText.length && !$props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-navbar-btn-text"
              }, [
                vue.createElementVNode("text", {
                  class: "uni-nav-bar-right-text",
                  style: vue.normalizeStyle({ color: $options.themeColor })
                }, vue.toDisplayString($props.rightText), 5)
              ])) : vue.createCommentVNode("v-if", true)
            ], true)
          ], 4)
        ], 4)
      ], 6),
      $props.fixed ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-navbar__placeholder"
      }, [
        $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("view", {
          class: "uni-navbar__placeholder-view",
          style: vue.normalizeStyle({ height: $options.navbarHeight })
        }, null, 4)
      ])) : vue.createCommentVNode("v-if", true)
    ], 2);
  }
  var __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["render", _sfc_render$2], ["__scopeId", "data-v-6bda1a90"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"]]);
  const _sfc_main$12 = {
    __name: "index",
    props: {
      newVal: {
        type: Number,
        default: ""
      }
    },
    setup(__props) {
      const store2 = useStore();
      store2.state.user;
      const searchVal = vue.ref("");
      const handleSearch = (e) => {
        uni.redirectTo({
          url: "/pages/search/index"
        });
      };
      const handleNew = (e) => {
        store2.commit("user/setTaskStatus", null);
        store2.commit("user/setDetailType", 0);
        uni.redirectTo({
          url: "/pages/news/index"
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1);
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u516C\u7528nav "),
          vue.createElementVNode("view", { class: "navBox" }, [
            vue.createElementVNode("view", { class: "nav-bg" }, [
              vue.createCommentVNode(" \u5934\u90E8\u81EA\u5B9A\u4E49\u5BFC\u822A "),
              vue.createElementVNode("view", { class: "headBg" }),
              vue.createVNode(_component_uni_nav_bar, null, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { class: "input-view" }, [
                    vue.createVNode(_component_uni_icons, {
                      class: "input-uni-icon",
                      type: "search",
                      size: "18",
                      color: "#999"
                    }),
                    vue.withDirectives(vue.createElementVNode("input", {
                      "confirm-type": "search",
                      class: "nav-bar-input",
                      type: "text",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchVal.value = $event),
                      placeholder: "\u8F93\u5165\u8FD0\u5355\u53F7/\u624B\u673A\u53F7/\u59D3\u540D\u67E5\u8BE2/\u5730\u5740\u67E5\u8BE2",
                      onConfirm: handleSearch,
                      onClick: handleSearch
                    }, null, 544), [
                      [vue.vModelText, searchVal.value]
                    ])
                  ]),
                  vue.createElementVNode("view", { slot: "right" }, [
                    vue.createElementVNode("view", { class: "rightText" }, [
                      vue.createElementVNode("view", { onClick: handleNew }, [
                        vue.createVNode(_component_uni_badge, {
                          class: vue.normalizeClass(["uni-badge-left-margin", __props.newVal > 9 ? "big" : ""]),
                          text: __props.newVal,
                          absolute: "rightTop",
                          size: "small"
                        }, {
                          default: vue.withCtx(() => [
                            vue.createElementVNode("view", { class: "box" }, [
                              vue.createElementVNode("text", { class: "box-text" })
                            ])
                          ]),
                          _: 1
                        }, 8, ["class", "text"]),
                        vue.createElementVNode("view", { class: "newInfo" }, "\u6D88\u606F")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              vue.createCommentVNode(" end ")
            ])
          ]),
          vue.createCommentVNode(" end ")
        ], 2112);
      };
    }
  };
  var UniNav$1 = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-02b269f0"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-home-nav/index.vue"]]);
  const _sfc_main$11 = {
    __name: "index",
    props: {
      pagePath: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      const store2 = useStore();
      const currentPage = vue.ref(store2.state.footStatus);
      let tabbar = vue.ref([
        {
          pagePath: "/pages/index/index",
          iconPath: "static/home.png",
          selectedIconPath: "static/homeActive.png",
          text: "\u9996\u9875"
        },
        {
          pagePath: "/pages/pickup/index",
          iconPath: "static/collect.png",
          selectedIconPath: "static/collectActive.png",
          text: "\u53D6\u4EF6"
        },
        {
          pagePath: "",
          iconPath: "static/qrcode.png",
          selectedIconPath: "static/qrcode.png",
          text: ""
        },
        {
          pagePath: "/pages/delivery/index",
          iconPath: "static/delivery.png",
          selectedIconPath: "static/deliveryActive.png",
          text: "\u6D3E\u4EF6"
        },
        {
          pagePath: "/pages/my/index",
          iconPath: "static/user.png",
          selectedIconPath: "static/userActive.png",
          text: "\u6211\u7684"
        }
      ]);
      const changeTab = (item, index) => {
        store2.commit("user/setFilterOverTime", null);
        if (item.text !== "") {
          currentPage.value = index;
          store2.commit("setFootStatus", index);
          store2.commit("user/setDeliveryData", []);
          store2.commit("user/setTabIndex", 0);
          store2.commit("user/setTaskStatus", 0);
          store2.commit("user/setDetailType", 0);
          store2.commit("user/setNewType", null);
          uni.redirectTo({
            url: item.pagePath,
            success: (e) => {
            },
            fail: () => {
            }
          });
        } else {
          uni.showToast({
            title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
            duration: 1e3,
            icon: "none"
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u516C\u7528\u5E95\u90E8 "),
          vue.createElementVNode("view", { class: "footBox" }, [
            vue.createElementVNode("view", { class: "uni-tabbar" }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(tabbar), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["tabbar-item", currentPage.value === index ? "active" : ""]),
                  key: index,
                  onClick: ($event) => changeTab(item, index)
                }, [
                  (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "uni-tabbar__bd"
                  }, [
                    item.pagePath !== "" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "uni-tabbar__icon"
                    }, [
                      currentPage.value === index ? (vue.openBlock(), vue.createElementBlock("img", {
                        key: 0,
                        class: "item-img",
                        src: item.selectedIconPath
                      }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("img", {
                        key: 1,
                        class: "item-img",
                        src: item.iconPath
                      }, null, 8, ["src"]))
                    ])) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "qrCode"
                    }, [
                      vue.createElementVNode("img", {
                        src: item.iconPath
                      }, null, 8, ["src"])
                    ]))
                  ])),
                  item.text !== "" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "uni-tabbar__label"
                  }, vue.toDisplayString(item.text), 1)) : vue.createCommentVNode("v-if", true)
                ], 10, ["onClick"]);
              }), 128))
            ])
          ]),
          vue.createCommentVNode(" end ")
        ], 2112);
      };
    }
  };
  var UniFooter = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-footer/index.vue"]]);
  const _sfc_main$10 = {
    __name: "orderInfo",
    props: {
      baseData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      const store2 = useStore();
      const handlePicup = () => {
        store2.commit("user/setTabIndex", 0);
        store2.commit("setFootStatus", 1);
        uni.redirectTo({
          url: "/pages/pickup/index"
        });
      };
      const handleDelivery = () => {
        store2.commit("user/setTabIndex", 0);
        store2.commit("setFootStatus", 3);
        store2.commit("user/setDetailType", 0);
        uni.redirectTo({
          url: "/pages/delivery/index"
        });
      };
      const handleOvertime = () => {
        store2.commit("user/setTabIndex", 0);
        store2.commit("setFootStatus", 1);
        store2.commit("user/setFilterOverTime", true);
        uni.redirectTo({
          url: "/pages/pickup/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "infoBox" }, [
          vue.createElementVNode("view", { class: "boxBg" }, [
            vue.createElementVNode("view", { onClick: handlePicup }, [
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.newPickUpNum), 1),
              vue.createElementVNode("view", null, "\u53D6\u4EF6\u4EFB\u52A1")
            ]),
            vue.createElementVNode("view", { onClick: handleDelivery }, [
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.newDispatchNum), 1),
              vue.createElementVNode("view", null, "\u6D3E\u4EF6\u4EFB\u52A1")
            ]),
            vue.createElementVNode("view", { onClick: handleOvertime }, [
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.overTimeNum), 1),
              vue.createElementVNode("view", null, "\u8D85\u65F6\u4EFB\u52A1")
            ])
          ])
        ]);
      };
    }
  };
  var OrderInfo = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-43bf85b9"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/orderInfo.vue"]]);
  const _sfc_main$$ = {
    __name: "orderTip",
    props: {
      orderData: Object,
      default: () => ({})
    },
    setup(__props) {
      const props = __props;
      const store2 = useStore();
      const handleLink = () => {
        const type = props.orderData.contentType;
        store2.commit("user/setTaskStatus", -1);
        if (type === 300) {
          uni.redirectTo({
            url: "/pages/news/index"
          });
        } else if (type === 301) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u53D6\u4EF6\u76F8\u5173&type=301"
          });
        } else if (type === 302) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u7B7E\u6536\u63D0\u9192&type=302"
          });
        } else if (type === 303) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u5FEB\u4EF6\u53D6\u6D88&type=303"
          });
        } else {
          uni.redirectTo({
            url: "/pages/news/system?title=\u6D3E\u4EF6\u76F8\u5173&type=304"
          });
        }
      };
      return (_ctx, _cache) => {
        return __props.orderData ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "orderTip",
          onClick: handleLink
        }, [
          vue.createElementVNode("view", { class: "btn" }, "\u6D88\u606F\u901A\u77E5"),
          vue.createElementVNode("view", null, vue.toDisplayString(__props.orderData.recentMsg), 1),
          vue.createElementVNode("view", null, [
            vue.createTextVNode(vue.toDisplayString(__props.orderData.minutes === 0 ? 1 : __props.orderData.minutes) + "\u5206\u949F\u524D ", 1),
            vue.createElementVNode("icon", { class: "iconNext" })
          ])
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var OrderTip = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-77c58440"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/orderTip.vue"]]);
  const _sfc_main$_ = {
    __name: "commonUse",
    props: {},
    setup(__props) {
      const store2 = useStore();
      const handleChild = () => {
        uni.showToast({
          title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
          duration: 1e3,
          icon: "none"
        });
      };
      const handleHistory = () => {
        store2.commit("user/setTabIndex", 0);
        store2.commit("user/setNewType", null);
        uni.navigateTo({
          url: "/pages/history/index"
        });
      };
      const handleTip = () => {
        store2.commit("user/setTaskStatus", -1);
        uni.navigateTo({
          url: "/pages/news/system?title=\u7B7E\u6536\u63D0\u9192&type=302"
        });
      };
      const handleNew = () => {
        store2.commit("user/setTabIndex", 1);
        uni.navigateTo({
          url: "/pages/news/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "commonUse" }, [
          vue.createElementVNode("view", { class: "hometit" }, "\u5E38\u7528\u529F\u80FD"),
          vue.createElementVNode("view", { class: "commonList" }, [
            vue.createElementVNode("view", { onClick: handleChild }, [
              vue.createElementVNode("icon", { class: "icon delivery" }),
              vue.createElementVNode("text", null, "\u6D3E\u4EF6\u626B\u63CF")
            ]),
            vue.createElementVNode("view", { onClick: handleChild }, [
              vue.createElementVNode("icon", { class: "icon sign" }),
              vue.createElementVNode("text", null, "\u7B7E\u6536\u626B\u63CF")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { onClick: handleHistory }, [
                vue.createElementVNode("icon", { class: "icon history" }),
                vue.createElementVNode("text", null, "\u5168\u90E8\u53D6\u6D3E")
              ])
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { onClick: handleNew }, [
                vue.createElementVNode("icon", { class: "icon new" }),
                vue.createElementVNode("text", null, "\u6D88\u606F\u901A\u77E5")
              ])
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("navigator", {
                url: "/pages/freight/index",
                "open-type": "redirect"
              }, [
                vue.createElementVNode("icon", { class: "icon freight" }),
                vue.createElementVNode("text", null, "\u8FD0\u8D39\u67E5\u8BE2")
              ])
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { onClick: handleTip }, [
                vue.createElementVNode("icon", { class: "icon tip" }),
                vue.createElementVNode("text", null, "\u7B7E\u6536\u63D0\u9192")
              ])
            ]),
            vue.createElementVNode("view", { onClick: handleChild }, [
              vue.createElementVNode("icon", { class: "icon exclusive" }),
              vue.createElementVNode("text", null, "\u4E13\u5C5E\u53D6\u5BC4")
            ])
          ])
        ]);
      };
    }
  };
  var CommonUse = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-0ec09439"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/commonUse.vue"]]);
  const _sfc_main$Z = {
    __name: "dataPresent",
    props: {
      baseData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      const store2 = useStore();
      const handlTodayAcquired = () => {
        store2.commit("user/setTabIndex", 1);
        store2.commit("setFootStatus", 1);
        uni.redirectTo({
          url: "/pages/pickup/index"
        });
      };
      const handlTodaySign = () => {
        store2.commit("user/setTabIndex", 1);
        store2.commit("setFootStatus", 3);
        uni.redirectTo({
          url: "/pages/delivery/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "commonData" }, [
          vue.createElementVNode("view", { class: "hometit" }, "\u6570\u636E\u5C55\u793A"),
          vue.createElementVNode("view", { class: "dataList" }, [
            vue.createElementVNode("view", {
              class: "todayGet",
              onClick: handlTodayAcquired
            }, [
              vue.createElementVNode("view", null, "\u4ECA\u65E5\u5DF2\u53D6"),
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.completePickUpNum), 1),
              vue.createElementVNode("view", { class: "rightIcon" })
            ]),
            vue.createElementVNode("view", {
              class: "todaySign",
              onClick: handlTodaySign
            }, [
              vue.createElementVNode("view", null, "\u4ECA\u65E5\u5DF2\u7B7E"),
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.signedNum), 1),
              vue.createElementVNode("view", { class: "rightIcon" })
            ])
          ])
        ]);
      };
    }
  };
  var DataPresentation = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-049d4a8e"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/dataPresent.vue"]]);
  const _sfc_main$Y = {
    __name: "index",
    props: {
      emptyInfo: {
        type: String,
        default: ""
      },
      emptyData: {
        type: String,
        default: ""
      },
      emptyImage: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return __props.emptyInfo !== "" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "emptyBox"
        }, vue.toDisplayString(__props.emptyInfo), 1)) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "empty"
        }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["image", __props.emptyImage])
          }, null, 2),
          vue.createTextVNode(vue.toDisplayString(__props.emptyData), 1)
        ]));
      };
    }
  };
  var EmptyPage = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-a750b56c"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-empty-page/index.vue"]]);
  const _sfc_main$X = {
    __name: "index",
    props: {
      phoneData: {
        type: String,
        default: ""
      }
    },
    setup(__props, { expose }) {
      const popup2 = vue.ref();
      const dialogOpen = () => {
        popup2.value.open();
      };
      const closePopup = () => {
        popup2.value.close();
      };
      expose({ dialogOpen });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container phoneCon" }, [
          vue.createVNode(_component_uni_popup, {
            ref_key: "popup",
            ref: popup2,
            type: "bottom",
            class: "popupBox"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup-content" }, [
                vue.createElementVNode("view", null, vue.toDisplayString(__props.phoneData), 1),
                vue.createElementVNode("view", {
                  onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(call) && vue.unref(call)(...args))
                }, "\u547C\u53EB")
              ]),
              vue.createElementVNode("view", {
                onClick: closePopup,
                class: "closePopup"
              }, "\u53D6\u6D88")
            ]),
            _: 1
          }, 512)
        ]);
      };
    }
  };
  var Phone = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-phone/index.vue"]]);
  const _sfc_main$W = {
    __name: "expressageInfo",
    props: {
      itemData: {
        type: Array,
        default: () => []
      },
      tabBars: {
        type: Array,
        default: () => []
      }
    },
    emits: "getTabIndex",
    setup(__props, { emit }) {
      const store2 = useStore();
      let scrollinto = vue.ref("tab0");
      let tabIndex = vue.ref(0);
      const phone2 = vue.ref();
      const emptyInfo = vue.ref("- \u7A7A\u7A7A\u5982\u4E5F\uFF0C\u65E0\u8FD0\u5355\u8BB0\u5F55 -");
      const phoneData = vue.ref("");
      const changeTab = (index) => {
        if (tabIndex.value == index) {
          return;
        }
        tabIndex.value = index;
        emit("getTabIndex", index);
        scrollinto.value = "tab" + index;
      };
      const handleDetail = (id) => {
        store2.commit("user/setTaskId", id);
        store2.commit("user/setNewType", null);
        if (tabIndex.value === 0) {
          store2.commit("user/setTaskType", 1);
          store2.commit("user/setDetailType", 0);
          store2.commit("setFootStatus", 1);
          uni.redirectTo({
            url: "/pages/details/index"
          });
        } else {
          store2.commit("user/setTaskType", 2);
          store2.commit("user/setDetailType", 0);
          store2.commit("setFootStatus", 3);
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        }
      };
      const handleMore = () => {
        if (tabIndex.value === 0) {
          uni.redirectTo({
            url: "/pages/pickup/index"
          });
        } else {
          uni.redirectTo({
            url: "/pages/delivery/index"
          });
        }
      };
      const handlePhone = (e, val) => {
        e.stopPropagation();
        phoneData.value = val;
        phone2.value.dialogOpen();
      };
      const handleNote = () => {
        uni.showToast({
          title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
          duration: 1e3,
          icon: "none"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("scroll-view", {
            "scroll-x": "true",
            class: "tabScroll",
            "scroll-into-view": vue.unref(scrollinto),
            "scroll-with-animation": true
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.tabBars, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: index,
                id: "tab" + index,
                class: "scroll-row-item",
                onClick: ($event) => changeTab(index)
              }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(vue.unref(tabIndex) == index ? "scroll-row-item-act" : "")
                }, [
                  vue.createElementVNode("text", { class: "line" }),
                  vue.createTextVNode(" " + vue.toDisplayString(item.name) + " ", 1),
                  vue.createElementVNode("text", { class: "num" }, vue.toDisplayString(item.num), 1)
                ], 2)
              ], 8, ["id", "onClick"]);
            }), 128))
          ], 8, ["scroll-into-view"]),
          vue.createElementVNode("view", { class: "homeSwiper" }, [
            vue.unref(tabIndex) === 0 || vue.unref(tabIndex) === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
              __props.itemData.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                vue.unref(tabIndex) === 0 ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList(__props.itemData.slice(0, 3), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "boxBg",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      vue.createElementVNode("view", {
                        class: "item",
                        onClick: vue.withModifiers(($event) => handleDetail(item.id), ["stop"])
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, [
                          vue.createTextVNode(vue.toDisplayString(item.name) + " ", 1),
                          vue.createElementVNode("text", null, vue.toDisplayString(item.phone), 1),
                          vue.createElementVNode("icon", {
                            class: "phone",
                            onClick: vue.withModifiers(($event) => handlePhone($event, item.phone), ["stop"])
                          }, null, 8, ["onClick"]),
                          vue.createElementVNode("icon", {
                            class: "note",
                            onClick: vue.withModifiers(handleNote, ["stop"])
                          }, null, 8, ["onClick"])
                        ]),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "distance" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                        vue.createElementVNode("view", { class: "time" }, "\u9884\u7EA6\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(vue.unref(taskTimeFormat)(item.estimatedStartTime)) + " \u81F3 " + vue.toDisplayString(vue.unref(overTimeFormat)(item.estimatedEndTime)), 1)
                      ], 8, ["onClick"])
                    ])
                  ]);
                }), 128)) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" \u5F85\u6D3E\u4EF6 "),
                vue.unref(tabIndex) === 1 ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(__props.itemData.slice(0, 3), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "boxBg",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      vue.createElementVNode("view", {
                        class: "item",
                        onClick: vue.withModifiers(($event) => handleDetail(item.id), ["stop"])
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, [
                          vue.createTextVNode(vue.toDisplayString(item.name) + " ", 1),
                          vue.createElementVNode("text", null, vue.toDisplayString(item.phone), 1),
                          vue.createElementVNode("icon", {
                            class: "phone",
                            onClick: vue.withModifiers(($event) => handlePhone($event, item.phone), ["stop"])
                          }, null, 8, ["onClick"]),
                          vue.createElementVNode("icon", {
                            class: "note",
                            onClick: vue.withModifiers(handleNote, ["stop"])
                          }, null, 8, ["onClick"])
                        ]),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                        vue.createElementVNode("view", { class: "time" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1)
                      ], 8, ["onClick"])
                    ])
                  ]);
                }), 128)) : vue.createCommentVNode("v-if", true)
              ])) : vue.createCommentVNode("v-if", true),
              __props.itemData.length > 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "moreInfo",
                onClick: handleMore
              }, [
                vue.createTextVNode(" \u67E5\u770B\u66F4\u591A "),
                vue.createElementVNode("icon")
              ])) : vue.createCommentVNode("v-if", true)
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" \u65E0\u6570\u636E\u663E\u793A "),
            __props.itemData.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createVNode(EmptyPage, { emptyInfo: emptyInfo.value }, null, 8, ["emptyInfo"])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" \u62E8\u6253\u624B\u673A\u5F39\u5C42 "),
          vue.createVNode(Phone, {
            ref_key: "phone",
            ref: phone2,
            phoneData: phoneData.value
          }, null, 8, ["phoneData"]),
          vue.createCommentVNode(" end ")
        ]);
      };
    }
  };
  var ExpressageInfo = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-37cb6c10"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/expressageInfo.vue"]]);
  const _sfc_main$V = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const newVal = vue.ref(Number(null));
      const orderData = vue.reactive({});
      const itemData2 = vue.reactive([]);
      vue.reactive([]);
      vue.reactive([]);
      vue.ref({});
      let baseData = vue.ref({});
      let page = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 1
      });
      vue.onMounted(() => {
        positionsUploadInit();
        init();
      });
      const init = () => {
        getNewData();
        getHomeBase();
        getList();
      };
      const getNewData = async () => {
        await getHomeInfo().then((res2) => {
          if (res2.code === 200) {
            orderData.value = res2.data;
            newVal.value = res2.data.newsNum;
          }
        });
      };
      const getList = async () => {
        await getDeliveryList(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              itemData2.value = res2.data.items;
            }
          }
        });
      };
      const getHomeBase = async () => {
        await getHomeData().then((res2) => {
          if (res2.code === 200) {
            baseData.value = res2.data;
          }
        });
      };
      const getTabIndex = (val) => {
        itemData2.value = [];
        if (val === 0) {
          page.taskStatus = 1;
        } else {
          page.taskStatus = 4;
        }
        getList();
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/index/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "navFrame" }, [
            vue.createCommentVNode(" nav "),
            vue.createVNode(UniNav$1, {
              newVal: newVal.value,
              onGoBack: goBack
            }, null, 8, ["newVal"]),
            vue.createCommentVNode(" \u8BA2\u5355\u4FE1\u606F "),
            vue.createVNode(OrderInfo, { baseData: vue.unref(baseData) }, null, 8, ["baseData"]),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["homePageBox", !orderData.value ? "noOrder" : ""])
          }, [
            vue.createElementVNode("view", { class: "boxPad" }, [
              vue.createCommentVNode(" \u8BA2\u5355\u63D0\u793A "),
              vue.createVNode(OrderTip, {
                orderData: orderData.value
              }, null, 8, ["orderData"]),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u5E38\u7528\u529F\u80FD "),
              vue.createVNode(CommonUse),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u6570\u636E\u5C55\u793A "),
              vue.createVNode(DataPresentation, { baseData: vue.unref(baseData) }, null, 8, ["baseData"]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" \u53D6\u4EF6\u72B6\u6001\u5217\u8868 "),
            vue.createVNode(ExpressageInfo, {
              itemData: itemData2.value,
              tabBars: vue.unref(tabBars),
              onGetTabIndex: getTabIndex
            }, null, 8, ["itemData", "tabBars"]),
            vue.createCommentVNode(" end ")
          ], 2),
          vue.createCommentVNode(" footer "),
          vue.createVNode(UniFooter, { pagePath: "pages/index/index" }),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-57280228"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/index.vue"]]);
  const _sfc_main$U = {
    __name: "index",
    props: {
      isShowCancel: {
        type: Boolean,
        default: false
      }
    },
    emits: "handleSearch",
    setup(__props, { expose, emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const searchVal = vue.ref("");
      const handleCancel = () => {
        searchVal.value = "";
        store2.commit("user/setSearchText", "");
        if (users.taskStatus === -1) {
          uni.redirectTo({
            url: "/pages/my/index"
          });
        } else {
          emit("goBack");
        }
      };
      const handleSearch = () => {
        emit("handleSearch", searchVal);
      };
      const handleBlur = () => {
        emit("handleBlur");
      };
      const handleClear = () => {
        searchVal.value = "";
        emit("clearSearchData");
      };
      expose({
        searchVal
      });
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u516C\u7528nav "),
          vue.createElementVNode("view", { class: "navBox" }, [
            vue.createElementVNode("view", { class: "search" }, [
              vue.createCommentVNode(" \u5934\u90E8\u81EA\u5B9A\u4E49\u5BFC\u822A "),
              vue.createCommentVNode(' <uni-nav-bar right-text="\u53D6\u6D88" @clickRight="handleCancel"> '),
              vue.createElementVNode("view", { class: "uni-navbar" }, [
                vue.createElementVNode("view", { class: "input-view" }, [
                  vue.createVNode(_component_uni_icons, {
                    class: "input-uni-icon",
                    type: "search",
                    size: "18",
                    color: "#999"
                  }),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "confirm-type": "search",
                    class: "nav-bar-input",
                    type: "text",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchVal.value = $event),
                    clearable: "",
                    placeholder: "\u8F93\u5165\u8FD0\u5355\u53F7/\u624B\u673A\u53F7/\u59D3\u540D\u67E5\u8BE2/\u5730\u5740\u67E5\u8BE2",
                    onConfirm: handleBlur,
                    onInput: handleSearch
                  }, null, 544), [
                    [vue.vModelText, searchVal.value]
                  ]),
                  searchVal.value ? (vue.openBlock(), vue.createElementBlock("text", {
                    key: 0,
                    class: "icon_close",
                    onClick: handleClear
                  })) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(' <view class="scanIcon" @click="handleQr"></view> ')
                ]),
                __props.isShowCancel ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "concelBox",
                  onClick: handleCancel
                }, "\u53D6\u6D88")) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createCommentVNode(" </uni-nav-bar> "),
              vue.createCommentVNode(" end ")
            ])
          ]),
          vue.createCommentVNode(" end ")
        ], 2112);
      };
    }
  };
  var SearchPage = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-search/index.vue"]]);
  const _sfc_main$T = {
    __name: "index",
    props: {
      tipInfo: {
        type: String,
        default: ""
      }
    },
    setup(__props, { expose, emit }) {
      const message = vue.ref();
      const dialogConfirm = () => {
        emit("handleClick", true);
      };
      const dialogOpen = () => {
        message.value.open();
      };
      const dialogClose = () => {
        message.value.close();
      };
      expose({
        dialogOpen
      });
      return (_ctx, _cache) => {
        const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_0$5);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createBlock(_component_uni_popup, {
          ref_key: "message",
          ref: message,
          type: "dialog",
          class: "commDialog"
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_popup_dialog, {
              type: _ctx.msgType,
              cancelText: "\u53D6\u6D88",
              confirmText: "\u786E\u8BA4",
              title: " ",
              content: __props.tipInfo,
              onConfirm: dialogConfirm,
              onClose: dialogClose
            }, null, 8, ["type", "content"])
          ]),
          _: 1
        }, 512);
      };
    }
  };
  var UniPopup = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-popup/index.vue"]]);
  var en = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  var zhHans = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F7D...",
    "uni-load-more.contentnomore": "\u6CA1\u6709\u66F4\u591A\u4E86"
  };
  var zhHant = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u986F\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F09...",
    "uni-load-more.contentnomore": "\u6C92\u6709\u66F4\u591A\u6578\u64DA\u4E86"
  };
  var messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  let platform;
  setTimeout(() => {
    platform = uni.getSystemInfoSync().platform;
  }, 16);
  const {
    t
  } = initVueI18n(messages);
  const _sfc_main$S = {
    name: "UniLoadMore",
    emits: ["clickLoadMore"],
    props: {
      status: {
        type: String,
        default: "more"
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      iconType: {
        type: String,
        default: "auto"
      },
      iconSize: {
        type: Number,
        default: 24
      },
      color: {
        type: String,
        default: "#777777"
      },
      contentText: {
        type: Object,
        default() {
          return {
            contentdown: "",
            contentrefresh: "",
            contentnomore: ""
          };
        }
      },
      showText: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        webviewHide: false,
        platform,
        imgBase64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzlBMzU3OTlEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzlBMzU3OUFEOUM0MTFFOUI0NTZDNERBQURBQzI4RkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDOUEzNTc5N0Q5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDOUEzNTc5OEQ5QzQxMUU5QjQ1NkM0REFBREFDMjhGRSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt+ALSwAAA6CSURBVHja1FsLkFZVHb98LM+F5bHL8khA1iSeiyQBCRM+YGqKUnnJTDLGI0BGZlKDIU2MMglUiDApEZvSsZnQtBRJtKwQNKQMFYeRDR10WOLd8ljYXdh+v8v5fR3Od+797t1dnOnO/Ofce77z+J//+b/P+ZqtXbs2sJ9MJhNUV1cHJ06cCJo3bx7EPc2aNcvpy7pWrVoF+/fvDyoqKoI2bdoE9fX1F7TjN8a+EXBn/fkfvw942Tf+wYMHg9mzZwfjxo0LDhw4EPa1x2MbFw/fOGfPng1qa2tzcCkILsLDydq2bRsunpOTMM7TD/W/tZDZhPdeKD+yGxHhdu3aBV27dg3OnDlzMVANMheLAO3btw8KCwuDmpoaX5OxbgUIMEq7K8IcPnw4KCsrC/r37x8cP378/4cAXAB3vqSkJMuiDhTkw+XcuXNhOWbMmKBly5YhUT8xArhyFvP0BfwRsAuwxJZJsm/nzp2DTp06he/OU+cZ64K6o0ePBkOHDg2GDx8e6gEbJ5Q/NHNuAJQ1hgBeHUDlR7nVTkY8rQAvAi4z34vR/mPs1FoRsaCgIJThI0eOBC1atEiFGGV+5MiRoS45efJkqFjJFXV1dQuA012m2WcwTw98fy6CqBdsaiIO4CScrGPHjvk4odhavPquRtFWXEC25VgkREKOCh/qDSq+vn37htzD/mZTOmOc5U7zKzBPEedygWshcDyWvs30igAbU+6oyMgJBCFhwQE0fccxN60Ay9iebbjoDh06hMowjQxT4fXq1SskArmHZpkArvixp/kWzHdMeArExSJEaiXIjjRjRJ4DaAGWpibLzXN3Fm1vA5teBgh3j1Rv3bp1YgKwPdmf2p9zcyNYYgPKMfY0T5f5nNYdw158nJ8QawW4CLKwiOBSEgO/hok2eBydR+3dYH+PLxA5J8Vv0KBBwenTp0P2JWAx6+yFEBfs8lMY+y0SWMBNI9E4ThKi58VKTg3FQZS1RQF1cz27eC0QHMu+3E0SkUowjhVt5VdaWhp07949ZHv2Qd1EjDXM2cla1M0nl3GxAs3J9yREzyTdFVKVFOaE9qRA8GM0WebRuo9JGZKA7Mv2SeS/Z8+eoQ9BArMfFrLGo6jvxbhHbJZnKX2Rzz1O7QhJJ9Cs2ZMaWIyq/zhdeqPNfIoHd58clIQD+JSXl4dKlyIAuBdVXZwFVWKspSSoxE++h8x4k3uCnEhE4I5KwRiFWGOU0QWKiCYLbdoRMRKAu2kQ9vkfLU6dOhX06NEjlH+yMRZSinnuyWnYosVcji8CEA/6Cg2JF+IIUBqnGKUTCNwtwBN4f89RiK1R96DEgO2o0NDmtEdvVFdVVYV+P3UAPUEs6GFwV3PHmXkD4vh74iDFJysVI/MlaQhwKeBNTLYX5VuA8T4/gZxA4MRGFxDB6R7OmYPfyykGRJbyie+XnGYnQIC/coH9+vULiYrxrkL9ZA9+0ykaHIfEpM7ge8TiJ2CsHYwyMfafAF1yCGBHYIbCVDjDjKt7BeB51D+LgQa6OkG7IDYEEtvQ7lnXLKLtLdLuJBpE4gPUXcW2+PkZwOex+4cGDhwYDBkyRL7/HFcEwUGPo/8uWRUpYnfxGHco8HkewLHLyYmAawAPuIFZxhOpDfJQ8gbUv41yORAptMWBNr6oqMhWird5+u+iHmBb2nhjDV7HWBNQTgK8y11l5NetWzc5ULscAtSj7nbNI0skhWeUZCc0W4nyH/jO4Vz0u1IeYhbk4AiwM6tjxIWByHsoZ9qcIBPJd/y+DwPfBESOmCa/QF3WiZHucLlEDpNxcNhmheEOPgdQNx6/VZFQzFZ5TN08AHXQt2Ii3EdyFuUsPtTcGPhW5iMiCNELvz+Gdn9huG4HUJaW/w3g0wxV0XaG7arG2WeKiUWYM4Y7GO5ezshTARbbWGw/DvXkpp/ivVvE0JVoMxN4rpGzJMhE5Pl+xlATsDIqikP9F9D2z3h9nOksEUFhK+qO4rcPkoalMQ/HqJLIyb3F3JdjrCcw1yZ8joyJLR5gCo54etlag7qIoeNh1N1BRYj3DTFJ0elotxPlVzkGuYAmL0VSJVGAJA41c4Z6A3BzTLfn0HYwYKEI6CUAMzZEWvLsIcQOo1AmmyyM72nHJCfYsogflGV6jEk9vyQZXSuq6w4c16NsGcGZbwOPr+H1RkOk2LEzjNepxQkihHSCQ4ynAYNRx2zMKV92CQMWqj8J0BRE8EShxRFN6YrfCRhC0x3r/Zm4IbQCcmJoV0kMamllccR6FjHqUC5F2R/wS2dcymOlfAKOS4KmzQb5cpNC2MC7JhVn5wjXoJ44rYhLh8n0eXOCorJxa7POjbSlCGVczr34/RsAmrcvo9s+wGp3tzVhntxiXiJ4nvEYb4FJkf0O8HocAePmLvCxnL0AORraVekJk6TYjDabRVXfRE2lCN1h6ZQRN1+InUbsCpKwoBZHh0dODN9JBCUffItXxEavTQkUtnfTVAplCWL3JISz29h4NjotnuSsQKJCk8dF+kJR6RARjrqFVmfPnj3ZbK8cIJ0msd6jgHPGtfVTQ8VLmlvh4mct9sobRmPic0DyDQQnx/NlfYUgyz59+oScsH379pAwXABD32nTpoUHIToESeI5mnbE/UqDdyLcafEBf2MCqgC7NwxIbMREJQ0g4D4sfJwnD+AmRrII05cfMWJE+L1169bQr+fip06dGp4oJ83lmYd5wj/EmMa4TaHivo4EeCguYZBnkB5g2aWA69OIEnUHOaGysjIYMGBAMGnSpODYsWPZwCpFmm4lNq+4gSLQA7jcX8DwtjEyRC8wjabnXEx9kfWnTJkSJkAo90xpJVV+FmcVNeYAF5zWngS4C4O91MBxmAv8blLEpbjI5sz9MTdAhcgkCT1RO8mZkAjfiYpTEvStAS53Uw1vAiUGgZ3GpuQEYvoiBqlIan7kSDHnTwJQFNiPu0+5VxCVYhcZIjNrdXUDdp+Eq5AZ3Gkg8QAyVZRZIk4Tl4QAbF9cXJxNYZMAtAokgs4BrNxEpCtteXg7DDTMDKYNSuQdKsnJBek7HxewvxaosWxLYXtw+cJp18217wql4aKCfBNoEu0O5VU+PhctJ0YeXD4C6JQpyrlpSLTojpGGGN5YwNziChdIZLk4lvLcFJ9jMX3QdiImY9bmGQU+TRUL5CHITTRlgF8D9ouD1MfmLoEPl5xokIumZ2cfgMpHt47IW9N64Hsh7wQYYjyIugWuF5fCqYncXRd5vPMWyizzvhi/32+nvG0dZc9vR6fZOu0md5e+uC408FvKSIOZwXlGvxPv95izA2Vtvg1xKFWARI+vMX66HUhpQQb643uW1bSjuTWyw2SBvDrBvjFic1eGGlz5esq3ko9uSIlBRqPuFcCv8F4WIcN12nVaBd0SaYwI6PDDImR11JkqgHcPmQssjxIn6bUshygDFJUTxPMpHk+jfjPgupgdnYV2R/g7xSjtpah8RJBewhwf0gGK6XI92u4wXFEU40afJ4DN4h5LcAd+40HI3JgJecuT0c062W0i2hQJUTcxan3/CMW1PF2K6bbA+Daz4xRs1D3Br1Cm0OihKCqizW78/nXAF/G5TXrEcVzaNMH6CyMswqsAHqDyDLEyou8lwOXnKF8DjI6KjV3KzMBiXkDH8ij/H214J5A596ekrZ3F0zXlWeL7+P5eUrNo3/QwC15uxthuzidy7DzKRwEDaAViiDgKbTbz7CJnzo0bN7pIfIiid8SuPwn25o3QCmpnyjlZkyxPP8EomCJzrGb7GJMx7tNsq4MT2xMUYaiErZOluTzKsnz3gwCeCZyVRZJfYplNEokEjwrPtxlxjeYAk+F1F74VAzPxQRNYYdtpOUvWs8J1sGhBJMNsb7igN8plJs1eSmLIhLKE4rvaCX27gOhLpLOsIzJ7qn/i+wZzcvSOZ23/du8TZjwV8zHIXoP4R3ifBxiFz1dcVpa3aPntPE+c6TmIWE9EtcMmAcPdWAhYhAXxcLOQi9L1WhD1Sc8p1d2oL7XGiRKp8F4A2i8K/nfI+y/gsTDJ/YC/8+AD5Uh04KHiGl+cIFPnBDDrPMjwRGkLXyxO4VGbfQWnDH2v0bVWE3C9QOXlepbgjEfIJQI6XDG3z5ahD9cw2pS78ipB85wyScNTvsVzlzzhL8/jRrnmVjfFJK/m3m4nj9vbgQTguT8XZTjsm672R5uJKEaQmBI/c58gyus8ZDagLpEVSJBIyHp4jn++xqPV71OgQgJYEWOtZ/haxRtKmWOBu8xdBLftWltsY84zE6WIEy/eIOWL+BaayMx+KHtL7EAkqdNDLiEXmEMUHniedtJqg9HmZtfvt26vNi0BdG3Ft3g8ZOf7PAu59TxtzivLNIekyi+wD1i8CuUiD9FXAa8C+/xS3JPmZnomyc7H+fb4/Se0bk41Fel621r4cgVxbq91V4jVqwB7HTe2M7jgB+QWHavZkDRPmZcASoZEmBx6i75bGjPcMdL4/VKGFAGWZkGzPG0XAbdL9A81G5LOmUnC9hHKJeO7dcUMjblSl12867ElFTtaGl20xvvLGPdVz/8TVuU7y0x1PG7vtNg24oz9Uo/Z412++VFWI7Fcog9tu9Lm6gvRmIPv9x1xmQAu6RDkXtbOtlGEmpgD5Nvnyc0dcv0EE6cfdi1HmhMf9wDF3k3gtRvEedhxjpgfqPb9PU9iEJHnyOUA7bQUXh6kq/D7l2iTjWv7XOD530BDr8jIrus+srXjt4MzumJMHuTsBa63YKE1+RR5lBjEikCCnWKWiHdzOgKO+nRIBAF88za/IFmJ3eMZov4CYxGBabcpGL8EYx+SeMXJeRwHNsV/h+vdxeuhEpN3ZyNY78Gm2fknJxVGhyjixPiQvVkNzT1elD9Py/aTAL64Hb9vcYmC9zfdXdT/C1LeGbg4rnBaAihDFJH12W5ulfNCNe/xTsP3bp8ikzJs5BF+5PNfAQYAPaseTdsEcaYAAAAASUVORK5CYII="
      };
    },
    computed: {
      iconSnowWidth() {
        return (Math.floor(this.iconSize / 24) || 1) * 2;
      },
      contentdownText() {
        return this.contentText.contentdown || t("uni-load-more.contentdown");
      },
      contentrefreshText() {
        return this.contentText.contentrefresh || t("uni-load-more.contentrefresh");
      },
      contentnomoreText() {
        return this.contentText.contentnomore || t("uni-load-more.contentnomore");
      }
    },
    mounted() {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      var currentWebview = page.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
    },
    methods: {
      onClick() {
        this.$emit("clickLoadMore", {
          detail: {
            status: this.status
          }
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.webviewHide && ($props.iconType === "circle" || $props.iconType === "auto" && $data.platform === "android") && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
        class: "uni-load-more__img uni-load-more__img--android-MP"
      }, [
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4),
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4),
        vue.createElementVNode("view", {
          class: "uni-load-more__img-icon",
          style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
        }, null, 4)
      ], 4)) : !$data.webviewHide && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
        class: "uni-load-more__img uni-load-more__img--ios-H5"
      }, [
        vue.createElementVNode("image", {
          src: $data.imgBase64,
          mode: "widthFix"
        }, null, 8, ["src"])
      ], 4)) : vue.createCommentVNode("v-if", true),
      $props.showText ? (vue.openBlock(), vue.createElementBlock("text", {
        key: 2,
        class: "uni-load-more__text",
        style: vue.normalizeStyle({ color: $props.color })
      }, vue.toDisplayString($props.status === "more" ? $options.contentdownText : $props.status === "loading" ? $options.contentrefreshText : $options.contentnomoreText), 5)) : vue.createCommentVNode("v-if", true)
    ]);
  }
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$1], ["__scopeId", "data-v-90d4256a"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue"]]);
  const _sfc_main$R = {
    __name: "index",
    setup(__props, { expose }) {
      let status = vue.ref("noMore");
      const contentText = vue.ref({
        contentdown: "\u4E0A\u62C9\u52A0\u8F7D\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D...",
        contentnomore: "- \u6CA1\u6709\u66F4\u591A\u4E86 -"
      });
      expose({
        status,
        contentText
      });
      return (_ctx, _cache) => {
        const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0$1);
        return vue.openBlock(), vue.createBlock(_component_uni_load_more, {
          status: vue.unref(status),
          "content-text": contentText.value
        }, null, 8, ["status", "content-text"]);
      };
    }
  };
  var ReachBottom = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/reach-bottom/index.vue"]]);
  const _sfc_main$Q = {
    __name: "AlreadyPicUp",
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    emits: "",
    setup(__props, { emit }) {
      const handleDetails = (e, item) => {
        emit("handleDetails", e, item);
      };
      return (_ctx, _cache) => {
        return __props.item.taskType === 1 && __props.item.status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "item"
        }, [
          vue.createElementVNode("view", { class: "titInfo" }, "\u8BA2\u5355\u53F7\uFF1ASD" + vue.toDisplayString(__props.item.orderId), 1),
          vue.createElementVNode("view", { class: "address" }, "\u5BC4\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(__props.item.name), 1),
          vue.createElementVNode("view", { class: "address" }, "\u53D6\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(__props.item.address), 1),
          vue.createElementVNode("view", { class: "time" }, "\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(__props.item.taskTime), 1),
          __props.item.amount > 0 && __props.item.status === 2 && __props.item.paymentMethod === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "time"
          }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(__props.item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true),
          __props.item.status === 2 && __props.item.paymentStatus === 1 && __props.item.paymentMethod === 1 ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 1,
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => handleDetails($event, __props.item), ["stop"])),
            class: "delete"
          }, [
            vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u6536\u6B3E")
          ])) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var AlreadyPicUp = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/search/components/AlreadyPicUp.vue"]]);
  const _sfc_main$P = {
    __name: "Canceled",
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return __props.item.taskType === 1 && __props.item.status === 3 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "expressage"
        }, [
          vue.createElementVNode("view", { class: "cancelList" }, [
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("view", null, "\u5BC4\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(__props.item.name), 1),
              vue.createElementVNode("view", null, "\u53D6\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(__props.item.address), 1),
              vue.createElementVNode("view", null, "\u53D6\u6D88\u539F\u56E0\uFF1A" + vue.toDisplayString(__props.item.cancelReason), 1),
              vue.createElementVNode("view", null, "\u539F\u56E0\u63CF\u8FF0\uFF1A" + vue.toDisplayString(__props.item.cancelReasonDescription), 1)
            ])
          ])
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var Canceled = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/search/components/Canceled.vue"]]);
  const _sfc_main$O = {
    __name: "SignFor",
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    emits: "",
    setup(__props, { emit }) {
      const handleDetails = (e, item) => {
        emit("handleDetails", e, item);
      };
      return (_ctx, _cache) => {
        return __props.item.taskType === 2 && __props.item.status === 5 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "item"
        }, [
          vue.createElementVNode("view", { class: "titInfo" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(__props.item.transportOrderId), 1),
          vue.createElementVNode("view", { class: "address" }, "\u6536\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(__props.item.name), 1),
          vue.createElementVNode("view", { class: "address" }, "\u6D3E\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(__props.item.address), 1),
          vue.createElementVNode("view", { class: "address" }, "\u7B7E\u6536\u65F6\u95F4\uFF1A" + vue.toDisplayString(__props.item.taskTime), 1),
          __props.item.amount > 0 && __props.item.status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "time"
          }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(__props.item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true),
          __props.item.status === 2 && __props.item.paymentStatus === 1 && __props.item.paymentMethod === 2 ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 1,
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => handleDetails($event, __props.item), ["stop"])),
            class: "delete"
          }, [
            vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u6536\u6B3E")
          ])) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var SignFor = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/search/components/SignFor.vue"]]);
  const _sfc_main$N = {
    __name: "Accomplish",
    props: {
      item: {
        type: Object,
        default: () => ({})
      }
    },
    emits: "",
    setup(__props, { emit }) {
      const handleDetails = (e, item) => {
        emit("handleDetails", e, item);
      };
      return (_ctx, _cache) => {
        return __props.item.taskType === 2 && __props.item.status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "item"
        }, [
          vue.createElementVNode("view", { class: "titInfo" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(__props.item.transportOrderId), 1),
          vue.createElementVNode("view", { class: "address" }, "\u6536\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(__props.item.name), 1),
          vue.createElementVNode("view", { class: "address" }, "\u6D3E\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(__props.item.address), 1),
          vue.createElementVNode("view", { class: "address" }, "\u7B7E\u6536\u65F6\u95F4\uFF1A" + vue.toDisplayString(__props.item.taskTime), 1),
          __props.item.amount > 0 && __props.item.status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "time"
          }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(__props.item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true),
          __props.item.status === 2 && __props.item.paymentStatus === 1 && __props.item.paymentMethod === 2 ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 1,
            onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => handleDetails($event, __props.item), ["stop"])),
            class: "delete"
          }, [
            vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u6536\u6B3E")
          ])) : vue.createCommentVNode("v-if", true)
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var Accomplish = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/search/components/Accomplish.vue"]]);
  const _sfc_main$M = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const search = vue.ref();
      let showDisplay = vue.ref(false);
      let isClear2 = vue.ref(false);
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u5168\u90E8\u6E05\u7A7A\u5417\uFF1F");
      let popups = vue.ref();
      let isShowCancel = vue.ref(true);
      const loadMore = vue.ref();
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      const itemData2 = vue.ref([]);
      const itemDataRecent = vue.reactive([]);
      const emptyData = vue.ref("\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5185\u5BB9");
      let keyword = vue.ref("");
      let isInput = vue.ref(false);
      let page = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10
      });
      const listDataes = vue.computed(() => {
        let testList = [];
        if (showDisplay.value === false) {
          if (itemDataRecent.length > 10) {
            for (var i = 0; i < 10; i++) {
              testList.push(itemDataRecent[i]);
            }
          } else {
            testList = itemDataRecent;
          }
          return testList;
        } else {
          return itemDataRecent;
        }
      });
      onReachBottom(() => {
        isInput.value = true;
        if (pageNum.value >= Number(pages.value)) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            getList();
          }, 1e3);
        }
      });
      vue.onUnmounted(() => {
        itemData2.value = [];
        isInput.value = false;
      });
      vue.onMounted(() => {
        init();
        if (users.searchText !== "") {
          keyword.value = users.searchText;
          search.value.searchVal = users.searchText;
          getList();
        }
      });
      const init = () => {
        getRecent();
      };
      const getList = async () => {
        reload.value = true;
        page = __spreadProps(__spreadValues({}, page), {
          page: pageNum.value,
          keyword: keyword.value
        });
        await getSearch(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (!isInput.value) {
                itemData2.value = res2.data.items;
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
            if (itemData2.value.length > 0) {
              isClear2.value = true;
            }
          }
        });
      };
      const getRecent = async () => {
        await getRecentSearch().then((res2) => {
          if (res2.code === 200) {
            itemDataRecent.value = res2.data;
            if (itemDataRecent.value.length === 0) {
              isClear2.value = true;
            }
          }
        });
      };
      const handleSearch = (val) => {
        if (val.value.trim().length > 0) {
          isInput.value = false;
          keyword = val;
          getList();
        }
      };
      const handleBlur = () => {
        isInput.value = true;
      };
      const handleClear = () => {
        popups.value.dialogOpen();
      };
      const clearSearchData = () => {
        itemData2.value = [];
        isClear2.value = false;
        store2.commit("user/setSearchText", "");
        getRecent();
      };
      const clearData = async (val) => {
        isClear2.value = val;
        await clearRecentSearch().then(() => {
          if (res.code === 200) {
            uni.showToast({
              title: "\u6E05\u9664\u6210\u529F",
              icon: "none"
            });
          }
        });
      };
      const setRecent = async (id) => {
        await setMarkRecent(id);
        itemData2.value = [];
      };
      const handleDetails = (e, item) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", item.id);
        store2.commit("user/setIsSearch", true);
        store2.commit("user/setSearchText", search.value.searchVal);
        if (item.transportOrderId) {
          setRecent(item.transportOrderId);
        }
        if (item.taskType === 1) {
          if (item.status === 1) {
            uni.redirectTo({
              url: "/pages/details/index"
            });
            return false;
          } else if (item.status === 2) {
            if (item.paymentStatus === 1 && item.paymentMethod === 1) {
              store2.commit("user/setDetailType", 2);
              store2.commit("user/setTaskStatus", 3);
              store2.commit("user/setPayData", {});
              uni.redirectTo({
                url: "/pages/pay/scanPay"
              });
              return false;
            } else {
              store2.commit("user/setTaskStatus", 2);
            }
          } else {
            store2.commit("user/setTaskStatus", 3);
          }
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        } else {
          if (item.status === 1) {
            store2.commit("user/setTaskStatus", 4);
          } else if (item.status === 2) {
            if (item.paymentStatus === 1 && item.paymentMethod === 2) {
              store2.commit("user/setPayData", {});
              uni.redirectTo({
                url: "/pages/pay/scanPay"
              });
              return false;
            } else {
              store2.commit("user/setTaskStatus", 5);
              uni.redirectTo({
                url: "/pages/details/waybill"
              });
            }
          }
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        }
      };
      const handleTransportOrderId = (val) => {
        keyword.value = val;
        search.value.searchVal = val;
        getList();
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/index/index"
        });
      };
      return (_ctx, _cache) => {
        const _component_StayPicup = vue.resolveComponent("StayPicup");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createVNode(SearchPage, {
            ref_key: "search",
            ref: search,
            onHandleSearch: handleSearch,
            onHandleBlur: handleBlur,
            onClearSearchData: clearSearchData,
            onGoBack: goBack,
            isShowCancel: vue.unref(isShowCancel)
          }, null, 8, ["isShowCancel"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "searchTop" }, [
            vue.createElementVNode("view", { class: "pageBox" }, [
              vue.createCommentVNode(" \u6700\u8FD1\u67E5\u627E "),
              !vue.unref(isClear2) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "recentBox"
              }, [
                vue.createElementVNode("view", { class: "tit" }, [
                  vue.createElementVNode("text", null, "\u6700\u8FD1\u67E5\u627E"),
                  vue.createElementVNode("icon", { onClick: handleClear })
                ]),
                vue.createElementVNode("view", { class: "recentList" }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(listDataes).value, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "item",
                      key: index,
                      onClick: ($event) => handleTransportOrderId(item)
                    }, vue.toDisplayString(item), 9, ["onClick"]);
                  }), 128)),
                  !vue.unref(showDisplay) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "iconUp"
                  }, [
                    itemDataRecent.length > 10 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      onClick: _cache[0] || (_cache[0] = ($event) => vue.isRef(showDisplay) ? showDisplay.value = !vue.unref(showDisplay) : showDisplay = !vue.unref(showDisplay))
                    }, [
                      vue.createElementVNode("image", {
                        class: "icon_img",
                        src: "/static/open.png",
                        mode: ""
                      })
                    ])) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u641C\u7D22\u5217\u8868 "),
              itemData2.value.length > 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
                key: 1,
                "scroll-y": "true",
                class: "swiperH"
              }, [
                vue.createElementVNode("view", { class: "serachList" }, [
                  vue.createElementVNode("view", { class: "" }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(itemData2.value, (item, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "boxBg",
                          key: index,
                          onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"])
                        }, [
                          vue.createCommentVNode(" \u5F85\u53D6\u4EF6 "),
                          vue.createVNode(_component_StayPicup, {
                            item,
                            onHandleDetails: handleDetails
                          }, null, 8, ["item"]),
                          vue.createCommentVNode(" end "),
                          vue.createCommentVNode(" \u5DF2\u53D6\u4EF6 "),
                          vue.createVNode(AlreadyPicUp, {
                            item,
                            onHandleDetails: handleDetails
                          }, null, 8, ["item"]),
                          vue.createCommentVNode(" end "),
                          vue.createCommentVNode(" \u53D6\u4EF6\u53D6\u6D88 "),
                          vue.createVNode(Canceled, { item }, null, 8, ["item"]),
                          vue.createCommentVNode(" end "),
                          vue.createCommentVNode(" \u5DF2\u7B7E\u6536 "),
                          vue.createVNode(SignFor, {
                            item,
                            onHandleDetails: handleDetails
                          }, null, 8, ["item"]),
                          vue.createCommentVNode(" end "),
                          vue.createCommentVNode(" \u5DF2\u7ECF\u5B8C\u6210\u5230\u4ED8\u672A\u4ED8\u6B3E "),
                          vue.createVNode(Accomplish, {
                            item,
                            onHandleDetails: handleDetails
                          }, null, 8, ["item"]),
                          vue.createCommentVNode(" end ")
                        ], 8, ["onClick"]);
                      }), 128))
                    ])
                  ])
                ]),
                vue.createVNode(ReachBottom, {
                  ref_key: "loadMore",
                  ref: loadMore
                }, null, 512)
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u65E0\u6570\u636E "),
              itemData2.value.length === 0 && vue.unref(isClear2) ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
                vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" \u63D0\u793A\u7A97\u793A\u4F8B "),
            vue.createVNode(UniPopup, {
              ref_key: "popups",
              ref: popups,
              tipInfo: tipInfo.value,
              onHandleClick: clearData
            }, null, 8, ["tipInfo"]),
            vue.createCommentVNode(" end ")
          ])
        ], 64);
      };
    }
  };
  var PagesSearchIndex = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-482e85b8"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/search/index.vue"]]);
  const _sfc_main$L = {
    __name: "index",
    props: {
      title: {
        type: String,
        default: ""
      },
      rithtText: {
        type: String,
        default: ""
      },
      isLeftText: {
        type: Boolean
      }
    },
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      users.taskStatus;
      const goBack = () => {
        emit("goBack");
      };
      const handleAll = () => {
        emit("handleAll");
      };
      return (_ctx, _cache) => {
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$2);
        return __props.isLeftText ? (vue.openBlock(), vue.createBlock(_component_uni_nav_bar, {
          key: 0,
          title: __props.title,
          statusBar: "true",
          fixed: "true"
        }, null, 8, ["title"])) : (vue.openBlock(), vue.createBlock(_component_uni_nav_bar, {
          key: 1,
          onClickLeft: goBack,
          "left-icon": "back",
          leftIcon: "arrowleft",
          title: __props.title,
          statusBar: "true",
          fixed: "true",
          "right-text": __props.rithtText,
          onClickRight: handleAll
        }, null, 8, ["title", "right-text"]));
      };
    }
  };
  var UniNav = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-nav/index.vue"]]);
  const _sfc_main$K = {
    __name: "date",
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const popup2 = vue.ref();
      let dates = vue.ref();
      let isPreExceed = vue.ref(false);
      let isNextExceed = vue.ref(false);
      const monthData = vue.reactive([]);
      const indicatorStyle = vue.ref(`height: 100rpx;`);
      let defaultValue = vue.ref([0]);
      let times = vue.ref(null);
      vue.ref(null);
      let isTomorrow = vue.ref(false);
      let isToday = vue.ref(true);
      let dayArr = vue.reactive(["\u660E\u5929", "\u540E\u5929"]);
      let isActive = vue.ref(null);
      vue.watch(dates, (newValue, oldValue) => {
        isToday.value = getNow(newValue) === getNow(new Date());
        const obj = getMonthDay(newValue);
        if (obj.timeNow === obj.timeStar) {
          isPreExceed.value = true;
        }
        if (obj.timeNow === obj.timeEnd) {
          isNextExceed.value = true;
        }
        monthData.value.map((val, index) => {
          if (getTate(obj.timeNow) === val) {
            defaultValue.value = [index];
          }
        });
        if (users.timeData) {
          emit("getDateTime", getTate(users.timeData));
          dates.value = users.timeData;
        } else {
          emit("getDateTime", getTate(obj.timeNow));
        }
      });
      vue.onMounted(() => {
        dates.value = getTate(new Date());
        monthData.value = getDay();
      });
      const hanleDay = (index) => {
        if (index === 0) {
          if (isToday.value) {
            isActive.value = index;
            store2.commit("user/setTimeData", tomorrowDay());
            emit("getDateTime", getTate(tomorrowDay()));
            isTomorrow.value = true;
          }
        } else {
          if (isToday.value) {
            isActive.value = index;
            store2.commit("user/setTimeData", afterTomorrowDay());
            emit("getDateTime", getTate(afterTomorrowDay()));
            isTomorrow.value = true;
          }
        }
      };
      const handleDate = (type) => {
        if (isTomorrow.value) {
          monthData.value.map((val, index) => {
            if (getTate(new Date()) === val) {
              defaultValue.value = [index];
            }
          });
        }
        isTomorrow.value = false;
        popup2.value.open(type);
      };
      const bindChange = (e) => {
        times.value = monthData.value[e.detail.value[0]];
      };
      const handleComplete = () => {
        isActive.value = null;
        if (times.value === dates.value) {
          isToday.value = true;
        } else {
          isToday.value = false;
        }
        if (times.value !== null) {
          dates.value = times.value;
          store2.commit("user/setTimeData", times.value);
          handleCancel();
        } else {
          uni.showToast({
            title: "\u8BF7\u9009\u62E9\u65E5\u671F",
            icon: "none"
          });
        }
      };
      const handleGetNow = (num) => {
        times.value = monthData.value[num];
      };
      const handleCancel = () => {
        popup2.value.close();
      };
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "dateBox uniPopup" }, [
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode("view", {
              class: "date",
              onClick: _cache[0] || (_cache[0] = ($event) => handleDate("bottom"))
            }, [
              vue.createElementVNode("icon", { class: "dateIcon" }),
              vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(getNow)(vue.unref(dates))), 1),
              vue.createElementVNode("icon", { class: "next" })
            ])
          ]),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(dayArr), (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["item", vue.unref(isActive) === index ? "red" : ""]),
              key: index,
              onClick: ($event) => hanleDay(index)
            }, [
              vue.createElementVNode("text", {
                class: vue.normalizeClass(!vue.unref(isToday) ? "gray" : "")
              }, vue.toDisplayString(item), 3)
            ], 10, ["onClick"]);
          }), 128)),
          vue.createElementVNode("view", { class: "datePopupBox" }, [
            vue.createCommentVNode(" \u666E\u901A\u5F39\u7A97 "),
            vue.createVNode(_component_uni_popup, {
              ref_key: "popup",
              ref: popup2,
              type: "bottom",
              "background-color": "#fff"
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "popup-content" }, [
                  vue.createElementVNode("view", { class: "tit" }, [
                    vue.createElementVNode("view", {
                      onClick: _cache[1] || (_cache[1] = ($event) => handleCancel())
                    }, "\u53D6\u6D88"),
                    vue.createElementVNode("view", null, "\u9009\u62E9\u5F00\u59CB\u65E5\u671F"),
                    vue.createElementVNode("view", { onClick: handleComplete }, "\u5B8C\u6210")
                  ]),
                  vue.createElementVNode("view", { class: "date-select" }, [
                    vue.createElementVNode("picker-view", {
                      class: "picker-view",
                      value: vue.unref(defaultValue),
                      "indicator-style": indicatorStyle.value,
                      onChange: bindChange
                    }, [
                      vue.createElementVNode("picker-view-column", null, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(monthData.value, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "item",
                            key: index
                          }, [
                            vue.createElementVNode("text", {
                              onClick: ($event) => handleGetNow(index)
                            }, vue.toDisplayString(vue.unref(getNow)(item)), 9, ["onClick"])
                          ]);
                        }), 128))
                      ])
                    ], 40, ["value", "indicator-style"])
                  ])
                ])
              ]),
              _: 1
            }, 512)
          ])
        ]);
      };
    }
  };
  var TateSelete = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/commponents/date.vue"]]);
  const _sfc_main$J = {
    __name: "index",
    props: {
      tabBars: {
        type: Array,
        default: () => []
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const scrollinto = vue.ref("tab0");
      let tabIndex = vue.ref(users.tabIndex ? users.tabIndex : 0);
      const changeTab = (index) => {
        if (tabIndex.value == index) {
          return;
        }
        tabIndex.value = index;
        emit("getTabIndex", index);
        scrollinto.value = "tab" + index;
      };
      expose({
        changeTab
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("scroll-view", {
          "scroll-x": "true",
          class: "tabScroll",
          "scroll-into-view": scrollinto.value,
          "scroll-with-animation": true
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.tabBars, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              id: "tab" + index,
              class: "scroll-row-item",
              onClick: ($event) => changeTab(index)
            }, [
              vue.createElementVNode("view", {
                class: vue.normalizeClass(vue.unref(tabIndex) == index ? "scroll-row-item-act" : "")
              }, [
                vue.createElementVNode("text", { class: "line" }),
                vue.createTextVNode(" " + vue.toDisplayString(item.label), 1)
              ], 2)
            ], 8, ["id", "onClick"]);
          }), 128))
        ], 8, ["scroll-into-view"]);
      };
    }
  };
  var UniTab = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-tab/index.vue"]]);
  const _sfc_main$I = {
    __name: "pickup",
    props: {
      itemData: {
        type: Array,
        default: () => []
      },
      tabIndex: {
        type: Number,
        default: 0
      }
    },
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      store2.state.user;
      vue.onMounted(() => {
      });
      const handleOpen = (e, id) => {
        e.stopPropagation();
        emit("handleOpen", id);
      };
      const handleDetails = (e, item) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", item.id);
        store2.commit("user/setTaskType", 1);
        store2.commit("user/setTaskStatus", 6);
        store2.commit("user/setDetailType", 1);
        if (item.status === 1) {
          uni.redirectTo({
            url: "/pages/details/index"
          });
        } else if (item.status === 2 && item.paymentStatus === 1 && item.paymentMethod === 1) {
          store2.commit("user/setPayData", {});
          uni.redirectTo({
            url: "/pages/pay/scanPay"
          });
        } else {
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.itemData, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "expressage"
            }, [
              vue.createElementVNode("view", { class: "boxBg" }, [
                vue.createElementVNode("view", { class: "tabList" }, [
                  vue.createElementVNode("view", {
                    class: "item",
                    onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"])
                  }, [
                    item.status !== 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "history"
                    }, [
                      vue.createElementVNode("view", { class: "titInfo" }, "\u8BA2\u5355\u53F7\uFF1ASD" + vue.toDisplayString(item.orderId), 1),
                      vue.createElementVNode("view", { class: "address" }, "\u5BC4\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                      vue.createElementVNode("view", { class: "address" }, "\u53D6\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                      vue.createElementVNode("view", { class: "address" }, "\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.actualEndTime), 1),
                      item.status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "time"
                      }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true)
                    ])) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "history"
                    }, [
                      vue.createElementVNode("view", { class: "titInfo" }, [
                        vue.createElementVNode("view", null, [
                          vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(item.name), 1),
                          vue.createTextVNode(" " + vue.toDisplayString(item.phone), 1),
                          vue.createCommentVNode(" TODO\u62E8\u6253\u7535\u8BDD\u548C\u53D1\u4FE1\u606F\u5C0F\u56FE\u6807\uFF0C\u6682\u65F6\u4FDD\u7559 "),
                          vue.createCommentVNode(' <icon class="phone" @click.stop="handlePhone($event, item.phone)"></icon>\r\n								<icon class="note" @click.stop="handleNote"></icon> ')
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                      vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                      vue.createElementVNode("view", { class: "time" }, "\u9884\u7EA6\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(vue.unref(taskTimeFormat)(item.estimatedStartTime)) + " \u81F3 " + vue.toDisplayString(vue.unref(overTimeFormat)(item.estimatedEndTime)), 1)
                    ])),
                    item.status === 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 2,
                      onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"]),
                      class: "delete"
                    }, [
                      vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u53D6\u4EF6")
                    ], 8, ["onClick"])) : item.status === 2 && item.paymentStatus === 1 && item.paymentMethod === 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 3,
                      onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"]),
                      class: "delete"
                    }, [
                      vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u6536\u6B3E")
                    ], 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 4,
                      onClick: vue.withModifiers(($event) => handleOpen($event, item.id), ["stop"]),
                      class: "delete"
                    }, [
                      vue.createElementVNode("button", { class: "uni-btn concelBtn" }, "\u5220\u9664")
                    ], 8, ["onClick"]))
                  ], 8, ["onClick"])
                ])
              ])
            ]);
          }), 128)),
          vue.createCommentVNode(" end ")
        ], 2112);
      };
    }
  };
  var Pickup = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/commponents/pickup.vue"]]);
  const _sfc_main$H = {
    __name: "delivery",
    props: {
      itemData: {
        type: Array,
        default: () => []
      },
      tabIndex: {
        type: Number,
        default: 0
      }
    },
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      store2.state.user;
      const handleOpen = (e, id) => {
        e.stopPropagation();
        emit("handleOpen", id);
      };
      const handleDetails = (e, item) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", item.id);
        store2.commit("user/setTaskType", 2);
        store2.commit("user/setDetailType", 2);
        if (item.status === 1) {
          store2.commit("user/setTaskStatus", 6);
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        } else if (item.status === 2 && item.paymentStatus === 1 && item.paymentMethod === 2 && item.signStatus !== 2) {
          store2.commit("user/setIsDelivery", true);
          store2.commit("user/setTaskStatus", 6);
          store2.commit("user/setPayData", {});
          uni.redirectTo({
            url: "/pages/pay/scanPay"
          });
        } else {
          store2.commit("user/setTaskStatus", 6);
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.itemData, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "expressage"
            }, [
              vue.createElementVNode("view", { class: "boxBg" }, [
                vue.createElementVNode("view", { class: "tabList" }, [
                  vue.createElementVNode("view", {
                    class: "item",
                    onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"])
                  }, [
                    item.status !== 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "history"
                    }, [
                      item.transportOrderId !== null ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "titInfo"
                      }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1)) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("view", { class: "address" }, "\u6536\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                      vue.createElementVNode("view", { class: "address" }, "\u6D3E\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                      vue.createElementVNode("view", { class: "address" }, "\u7B7E\u6536\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.actualEndTime), 1),
                      item.status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "time"
                      }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true)
                    ])) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "history"
                    }, [
                      vue.createElementVNode("view", { class: "titInfo" }, [
                        vue.createElementVNode("view", null, [
                          vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(item.name), 1),
                          vue.createTextVNode(" " + vue.toDisplayString(item.phone), 1),
                          vue.createCommentVNode(" TODO\u62E8\u6253\u7535\u8BDD\u548C\u53D1\u4FE1\u606F\u5C0F\u56FE\u6807\uFF0C\u6682\u65F6\u4FDD\u7559 "),
                          vue.createCommentVNode(' <icon class="phone" @click.stop="handlePhone($event, item.phone)"></icon>\r\n										<icon class="note" @click.stop="handleNote"></icon> ')
                        ])
                      ]),
                      vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                      vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                      item.transportOrderId !== null ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "time"
                      }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1)) : vue.createCommentVNode("v-if", true)
                    ])),
                    item.status === 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 2,
                      onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"]),
                      class: "delete"
                    }, [
                      vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u6D3E\u4EF6")
                    ], 8, ["onClick"])) : item.status === 2 && item.paymentStatus === 1 && item.paymentMethod === 2 && item.signStatus !== 2 ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 3,
                      onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"]),
                      class: "delete"
                    }, [
                      vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u6536\u6B3E")
                    ], 8, ["onClick"])) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 4,
                      onClick: vue.withModifiers(($event) => handleOpen($event, item.id), ["stop"]),
                      class: "delete"
                    }, [
                      vue.createElementVNode("button", { class: "uni-btn concelBtn" }, "\u5220\u9664")
                    ], 8, ["onClick"]))
                  ], 8, ["onClick"])
                ])
              ])
            ]);
          }), 128)),
          vue.createCommentVNode(" end ")
        ], 2112);
      };
    }
  };
  var Delivery = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/commponents/delivery.vue"]]);
  const _sfc_main$G = {
    __name: "index",
    props: {
      dateTime: {
        type: String,
        default: ""
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const props = __props;
      const store2 = useStore();
      const users = store2.state.user;
      let popup2 = vue.ref();
      const tipInfo = vue.ref("\u786E\u8BA4\u5220\u9664\u8BE5\u8BA2\u5355\u5417\uFF1F");
      const tabBars2 = HistoryTabData;
      let taskId = vue.ref("");
      let tabIndex = vue.ref(0);
      const loadMore = vue.ref();
      let itemData2 = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = users.isFiltrate ? 1 : vue.ref(1);
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      let isPullDown = vue.ref(false);
      let page = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10,
        taskType: 1
      });
      vue.watch(props, (newValue, oldValue) => {
        store2.commit("user/setDeliveryData", []);
        getList(newValue.dateTime);
      });
      vue.watch(tabIndex, (newValue, oldValue) => {
        if (newValue === 0) {
          page.taskType = 1;
        } else {
          page.taskType = 2;
        }
        store2.commit("user/setDeliveryData", []);
        getList(page.dateTime);
      });
      vue.onMounted(() => {
        if (users.tabIndex) {
          tabIndex.value = users.tabIndex;
        }
      });
      onReachBottom(() => {
        if (pageNum.value >= Number(pages.value)) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            getList(page.dateTime);
          }, 1e3);
        }
      });
      const getList = async (time) => {
        reload.value = true;
        page = __spreadProps(__spreadValues({}, page), {
          dateTime: time,
          page: pageNum.value
        });
        await getDeliveryList(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
          }
        });
      };
      const getTabIndex = (index) => {
        store2.commit("user/setTabIndex", 0);
        store2.commit("user/setIstabChange", true);
        pageNum.value = 1;
        pages.value = 1;
        tabIndex.value = index;
        itemData2.value = [];
        store2.commit("user/setDeliveryData", []);
      };
      const handleClick = async () => {
        await taskDelete(taskId.value).then((res2) => {
          if (res2.code === 200) {
            store2.commit("user/setDeliveryData", []);
            getList(page.dateTime);
            isPullDown.value = true;
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        });
      };
      const handleOpen = (id) => {
        popup2.value.dialogOpen();
        taskId.value = id;
      };
      expose({
        getList
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "pageBox" }, [
            vue.createCommentVNode(" tab\u5207\u6362 "),
            vue.createVNode(UniTab, {
              tabBars: vue.unref(tabBars2),
              ref: "tab",
              onGetTabIndex: getTabIndex,
              class: "historyTab"
            }, null, 8, ["tabBars"]),
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "homeSwiper historyboxTop" }, [
              vue.unref(itemData2).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
                  vue.createCommentVNode(" \u53D6\u4EF6 "),
                  vue.unref(tabIndex) === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                    vue.createVNode(Pickup, {
                      itemData: vue.unref(itemData2),
                      onHandleOpen: handleOpen
                    }, null, 8, ["itemData"])
                  ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                    vue.createCommentVNode(" end "),
                    vue.createCommentVNode(" \u6D3E\u4EF6 "),
                    vue.createElementVNode("view", null, [
                      vue.createVNode(Delivery, {
                        itemData: vue.unref(itemData2),
                        onHandleOpen: handleOpen
                      }, null, 8, ["itemData"])
                    ])
                  ], 2112)),
                  vue.createCommentVNode(" end "),
                  vue.createCommentVNode(" \u4E0A\u62C9 "),
                  vue.createVNode(ReachBottom, {
                    ref_key: "loadMore",
                    ref: loadMore
                  }, null, 512),
                  vue.createCommentVNode(" end ")
                ]),
                vue.createCommentVNode(" \u7A7A\u9875\u9762 ")
              ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
              ])),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" \u63D0\u793A\u7A97 "),
          vue.createVNode(UniPopup, {
            ref_key: "popup",
            ref: popup2,
            tipInfo: tipInfo.value,
            onHandleClick: handleClick
          }, null, 8, ["tipInfo"]),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var TabList$2 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/commponents/index.vue"]]);
  const _sfc_main$F = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      let list = vue.ref();
      vue.reactive([]);
      const title = vue.ref("\u5168\u90E8\u53D6\u6D3E");
      let dateTime = vue.ref("");
      const searchVal = vue.ref("");
      const getDateTime = (val) => {
        dateTime.value = val;
      };
      const handleSearch = (e) => {
        uni.redirectTo({
          url: "/pages/search/index"
        });
      };
      const goBack = () => {
        if (users.taskStatus === -1) {
          uni.redirectTo({
            url: "/pages/my/index"
          });
        } else {
          uni.redirectTo({
            url: "/pages/index/index"
          });
        }
        store2.commit("user/setTabIndex", 0);
        store2.commit("user/setTaskStatus", 0);
        store2.commit("user/setTimeData", null);
      };
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createElementVNode("view", { class: "history" }, [
            vue.createElementVNode("view", { class: "navBox" }, [
              vue.createElementVNode("view", { class: "search" }, [
                vue.createElementVNode("view", { class: "uni-navbar" }, [
                  vue.createElementVNode("view", { class: "input-view" }, [
                    vue.createElementVNode("view", { class: "input-view" }, [
                      vue.createVNode(_component_uni_icons, {
                        class: "input-uni-icon",
                        type: "search",
                        size: "18",
                        color: "#999"
                      }),
                      vue.withDirectives(vue.createElementVNode("input", {
                        "confirm-type": "search",
                        class: "nav-bar-input",
                        type: "text",
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchVal.value = $event),
                        placeholder: "\u8F93\u5165\u8FD0\u5355\u53F7/\u624B\u673A\u53F7/\u59D3\u540D\u67E5\u8BE2/\u5730\u5740\u67E5\u8BE2",
                        onConfirm: handleSearch,
                        onClick: handleSearch
                      }, null, 544), [
                        [vue.vModelText, searchVal.value]
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", null, [
            vue.createCommentVNode(" \u65E5\u671F\u9009\u62E9 "),
            vue.createVNode(TateSelete, { onGetDateTime: getDateTime }),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u53D6\u4EF6\u6D3E\u4EF6\u5217\u8868 "),
            vue.createVNode(TabList$2, {
              dateTime: vue.unref(dateTime),
              ref_key: "list",
              ref: list
            }, null, 8, ["dateTime"]),
            vue.createCommentVNode(" end ")
          ])
        ], 64);
      };
    }
  };
  var PagesHistoryIndex = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-6c15e724"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/index.vue"]]);
  const getNewList = (type) => request({
    url: `/messages/list?bussinessType=3&contentType=${type}`,
    method: "get"
  });
  const getMessagesList = (params) => request({
    url: `/messages/page`,
    method: "get",
    params
  });
  const getNotice = (params) => request({
    url: "/messages/notice/new/get",
    method: "get",
    params
  });
  const msgRead = (id) => request({
    url: `/messages/${id}`,
    method: "put"
  });
  const msgAllRead = (params) => request({
    url: `/messages/readAll/${params}`,
    method: "put",
    params
  });
  const _sfc_main$E = {
    __name: "announcement",
    props: {
      tabIndex: {
        type: Number,
        default: 0
      }
    },
    emits: "handleSearch",
    setup(__props, { expose, emit }) {
      vue.ref("");
      vue.ref(false);
      vue.onMounted(() => {
      });
      const getList = async () => {
        await getNewList("300").then((res2) => {
          if (res2.code === 200) {
            itemData.value = res2.data;
          }
        }).catch((err) => {
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
      const handleClick = async (item) => {
        uni.navigateTo({
          url: "/pages/news/detail?obj=" + JSON.stringify(item)
        });
      };
      expose({
        getList
      });
      return (_ctx, _cache) => {
        return __props.tabIndex === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createCommentVNode(" \u5782\u76F4\u6EDA\u52A8\u533A\u57DF  scroll\u548Cswiper\u7684\u9AD8\u5EA6\u90FD\u8981\u7ED9\u4E14\u662F\u4E00\u6837\u7684\u9AD8\u5EA6"),
          vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
            vue.unref(newItemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
              vue.createElementVNode("view", { class: "boxCon" }, [
                vue.createElementVNode("view", { class: "tabConList" }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(newItemData), (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "item",
                      key: index
                    }, [
                      vue.createElementVNode("view", {
                        onClick: ($event) => handleClick(item)
                      }, [
                        vue.createElementVNode("text", { class: "text active" }, vue.toDisplayString(item.title), 1),
                        vue.createElementVNode("text", { class: "time" }, vue.toDisplayString(vue.unref(taskTimeFormat)(item.created)), 1)
                      ], 8, ["onClick"])
                    ]);
                  }), 128))
                ])
              ]),
              vue.createCommentVNode(" \u6682\u65F6\u5148\u4E0D\u505A\uFF0C\u540E\u671F\u505A "),
              vue.createCommentVNode(' <ReachBottom v-if="loading" :loadingText="loadingText"></ReachBottom> ')
            ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              vue.createCommentVNode(" \u65E0\u6570\u636E\u663E\u793A "),
              vue.createElementVNode("view", null, [
                vue.createVNode(EmptyPage, { emptyData: _ctx.emptyData }, null, 8, ["emptyData"])
              ])
            ], 2112)),
            vue.createCommentVNode(" end ")
          ])
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var Announcement = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/components/announcement.vue"]]);
  const _sfc_main$D = {
    __name: "notification",
    props: {
      tabIndex: {
        type: Number,
        default: 1
      }
    },
    emits: "getTabIndex",
    setup(__props, { expose, emit }) {
      let objData = vue.ref({});
      vue.onMounted(() => {
        getOjb();
      });
      const getOjb = async () => {
        await getNotice().then((res2) => {
          if (res2.code === 200) {
            objData.value = res2.data;
          }
        }).catch((err) => {
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
      expose({
        getOjb
      });
      return (_ctx, _cache) => {
        return __props.tabIndex === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { class: "boxCon" }, [
                vue.createElementVNode("view", { class: "newConBox" }, [
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("navigator", {
                      url: "/pages/news/system?title=\u53D6\u4EF6\u76F8\u5173&type=" + 301,
                      "open-type": "redirect"
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(["icon send", vue.unref(objData).haveNewSendNotice ? "active" : ""])
                      }, [
                        vue.createElementVNode("icon")
                      ], 2),
                      vue.createElementVNode("view", { class: "text" }, [
                        vue.createElementVNode("view", null, "\u53D6\u4EF6\u76F8\u5173"),
                        vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).newSendNoticeTime ? "\u60A8\u6709\u4E00\u4E2A\u65B0\u7684\u53D6\u4EF6\u8BA2\u5355" : "\u6682\u65E0\u6D88\u606F"), 1)
                      ]),
                      vue.unref(objData).newSendNoticeTime ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "time"
                      }, vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).newSendNoticeTime)), 1)) : vue.createCommentVNode("v-if", true)
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("navigator", {
                      url: "/pages/news/system?title=\u6D3E\u4EF6\u76F8\u5173&type=" + 304,
                      "open-type": "redirect"
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(["icon delivery", vue.unref(objData).haveNewDispatchNotice ? "active" : ""])
                      }, [
                        vue.createElementVNode("icon")
                      ], 2),
                      vue.createElementVNode("view", { class: "text" }, [
                        vue.createElementVNode("view", null, "\u6D3E\u4EF6\u76F8\u5173"),
                        vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).newDispatchNoticeTime ? "\u60A8\u6709\u4E00\u4E2A\u65B0\u7684\u6D3E\u4EF6\u8BA2\u5355" : "\u6682\u65E0\u6D88\u606F"), 1)
                      ]),
                      vue.unref(objData).newDispatchNoticeTime ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "time"
                      }, vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).newDispatchNoticeTime)), 1)) : vue.createCommentVNode("v-if", true)
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("navigator", {
                      url: "/pages/news/system?title=\u7B7E\u6536\u63D0\u9192&type=" + 302,
                      "open-type": "redirect"
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(["icon income", vue.unref(objData).haveNewReceiveNotice ? "active" : ""])
                      }, [
                        vue.createElementVNode("icon")
                      ], 2),
                      vue.createElementVNode("view", { class: "text" }, [
                        vue.createElementVNode("view", null, "\u7B7E\u6536\u63D0\u9192"),
                        vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).newReceiveNoticeTime ? "\u60A8\u6709\u4E00\u4E2A\u6D3E\u4EF6\u5DF2\u7B7E\u6536" : "\u6682\u65E0\u6D88\u606F"), 1)
                      ]),
                      vue.unref(objData).newReceiveNoticeTime ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "time"
                      }, vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).newReceiveNoticeTime)), 1)) : vue.createCommentVNode("v-if", true)
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("navigator", {
                      url: "/pages/news/system?title=\u5FEB\u4EF6\u53D6\u6D88&type=" + 303,
                      "open-type": "redirect"
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(["icon cancel", vue.unref(objData).haveNewCancelNotice ? "active" : ""])
                      }, [
                        vue.createElementVNode("icon")
                      ], 2),
                      vue.createElementVNode("view", { class: "text" }, [
                        vue.createElementVNode("view", null, "\u5FEB\u4EF6\u53D6\u6D88"),
                        vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).newCancelNoticeTime ? "\u60A8\u6709\u4E00\u4E2A\u5FEB\u4EF6\u5DF2\u53D6\u6D88" : "\u6682\u65E0\u6D88\u606F"), 1)
                      ]),
                      vue.unref(objData).newCancelNoticeTime ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "time"
                      }, vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).newCancelNoticeTime)), 1)) : vue.createCommentVNode("v-if", true)
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var Notification = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/components/notification.vue"]]);
  const _sfc_main$C = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const announcement = vue.ref();
      const notificat = vue.ref();
      const title = vue.ref("\u6D88\u606F");
      const tabBars2 = vue.reactive(["\u516C\u544A", "\u7CFB\u7EDF\u901A\u77E5"]);
      let scrollinto = vue.ref("tab0");
      let tabIndex = users.tabIndex === 1 ? vue.ref(1) : vue.ref(0);
      const changeTab = (index) => {
        if (tabIndex.value == index) {
          return;
        }
        if (index === 0)
          ;
        else {
          notificat.value.getOjb();
        }
        tabIndex.value = index;
        store2.commit("user/setTabIndex", index);
        scrollinto.value = "tab" + index;
      };
      const getTabIndex = (val) => {
        tabIndex.value = val;
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/index/index"
        });
        store2.commit("user/setNewType", null);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createElementVNode("view", { class: "navHead" }, [
            vue.createVNode(UniNav, {
              title: title.value,
              onGoBack: goBack
            }, null, 8, ["title"])
          ]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5217\u8868 "),
          vue.createElementVNode("view", { class: "pageBox newBox" }, [
            vue.createCommentVNode(" \u641C\u7D22\u5217\u8868 "),
            vue.createElementVNode("scroll-view", {
              "scroll-x": "true",
              class: "tabScroll",
              "scroll-into-view": vue.unref(scrollinto),
              "scroll-with-animation": true
            }, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tabBars2, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  id: "tab" + index,
                  class: "scroll-row-item",
                  onClick: ($event) => changeTab(index)
                }, [
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass(vue.unref(tabIndex) == index ? "scroll-row-item-act" : "")
                  }, [
                    vue.createElementVNode("text", { class: "line" }),
                    vue.createTextVNode(" " + vue.toDisplayString(item), 1)
                  ], 2)
                ], 8, ["id", "onClick"]);
              }), 128))
            ], 8, ["scroll-into-view"]),
            vue.createElementVNode("view", { class: "homeSwiper" }, [
              vue.createCommentVNode(" \u516C\u544A "),
              vue.createVNode(Announcement, {
                ref_key: "announcement",
                ref: announcement,
                tabIndex: vue.unref(tabIndex)
              }, null, 8, ["tabIndex"]),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u7CFB\u7EDF\u901A\u77E5 "),
              vue.createVNode(Notification, {
                ref_key: "notificat",
                ref: notificat,
                onGetTabIndex: getTabIndex,
                tabIndex: vue.unref(tabIndex)
              }, null, 8, ["tabIndex"]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesNewsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-452e6662"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/index.vue"]]);
  const _sfc_main$B = {
    __name: "detail",
    setup(__props) {
      const title = vue.ref("\u8BE6\u60C5");
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      let objData = vue.ref(JSON.parse(currentPage.$page.options.obj));
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/news/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createElementVNode("view", { class: "navHead" }, [
            vue.createVNode(UniNav, {
              title: title.value,
              onGoBack: goBack
            }, null, 8, ["title"])
          ]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5217\u8868 "),
          vue.createElementVNode("view", { class: "pageBox newDetail" }, [
            vue.createElementVNode("view", { class: "tit" }, vue.toDisplayString(vue.unref(objData).title), 1),
            vue.createElementVNode("view", { class: "time" }, vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).created)), 1),
            vue.unref(objData).firstContent ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "first"
            }, vue.toDisplayString(vue.unref(objData).firstContent), 1)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).content), 1)
          ]),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesNewsDetail = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-6803dca4"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/detail.vue"]]);
  const _sfc_main$A = {
    __name: "system",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1].$page.options;
      const title = currentPage.title;
      const type = currentPage.type;
      const loadMore = vue.ref();
      const emptyData = vue.ref("\u6682\u65E0\u6D88\u606F");
      const rithtText = vue.ref("\u5168\u90E8\u5DF2\u8BFB");
      vue.ref(1);
      let totals = vue.ref(0);
      let pageNum = vue.ref(1);
      let page = vue.reactive({
        contentType: type,
        page: 1,
        pageSize: 10
      });
      let reload = vue.ref(false);
      let scrollH = vue.ref(null);
      let isReadAll = vue.ref(false);
      let itemData2 = vue.ref([]);
      let ids = vue.ref([]);
      onReachBottom(() => {
        if (pageNum.value >= Number(totals.value)) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            getList();
          }, 1e3);
        }
      });
      vue.onMounted(() => {
        getList();
        uni.getSystemInfo({
          success: (res2) => {
            scrollH.value = res2.windowHeight - uni.upx2px();
          }
        });
      });
      const getList = async () => {
        reload.value = true;
        page = __spreadProps(__spreadValues({}, page), {
          page: pageNum.value
        });
        await getMessagesList(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              itemData2.value = itemData2.value.concat(res2.data.items);
              itemData2.value.map((val) => {
                if (val.isRead === 0) {
                  ids.value.push(val.id);
                }
              });
              totals.value = res2.data.pages;
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
          }
        });
      };
      const handleDetail = async (item) => {
        store2.commit("user/setTaskId", item.relevantId);
        store2.commit("user/setTabIndex", 0);
        ids.value = [];
        ids.value.push(item.id);
        await msgRead(item.id).then((res2) => {
        });
        if (title === "\u53D6\u4EF6\u76F8\u5173") {
          store2.commit("user/setNewType", 301);
          if (item.status === 1) {
            uni.navigateTo({
              url: "/pages/details/index"
            });
          } else {
            uni.navigateTo({
              url: "/pages/details/waybill"
            });
            store2.commit("user/setIsNew", true);
          }
        } else if (title === "\u6D3E\u4EF6\u76F8\u5173") {
          if (item.status === 2) {
            store2.commit("user/setTaskStatus", 5);
            store2.commit("user/setIsNew", true);
          } else {
            store2.commit("user/setTaskStatus", 4);
          }
          store2.commit("user/setNewType", 304);
          uni.navigateTo({
            url: "/pages/details/waybill"
          });
        } else if (title === "\u7B7E\u6536\u63D0\u9192") {
          store2.commit("user/setTaskStatus", 5);
          store2.commit("user/setNewType", 302);
          uni.navigateTo({
            url: "/pages/details/waybill"
          });
          store2.commit("user/setIsNew", true);
        } else {
          store2.commit("user/setTaskStatus", null);
          store2.commit("user/setNewType", 303);
          uni.navigateTo({
            url: "/pages/details/waybill"
          });
        }
      };
      const handleAll = async () => {
        let contentType = null;
        if (title === "\u53D6\u4EF6\u76F8\u5173") {
          contentType = 301;
        } else if (title === "\u6D3E\u4EF6\u76F8\u5173") {
          contentType = 304;
        } else if (title === "\u7B7E\u6536\u63D0\u9192") {
          contentType = 302;
        } else {
          contentType = 303;
        }
        await msgAllRead(contentType).then((res2) => {
          itemData2.value = [];
          pageNum.value = 1;
          getList();
        }).catch((err) => {
          isReadAll.value = true;
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
      const goBack = () => {
        store2.commit("user/setTabIndex", 1);
        if (users.taskStatus === -1) {
          uni.redirectTo({
            url: "/pages/index/index"
          });
        } else {
          uni.redirectTo({
            url: "/pages/news/index"
          });
        }
        store2.commit("user/setTaskStatus", 0);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createElementVNode("view", { class: "navHead" }, [
            vue.createVNode(UniNav, {
              title: vue.unref(title),
              onGoBack: goBack,
              onHandleAll: handleAll,
              rithtText: rithtText.value
            }, null, 8, ["title", "rithtText"])
          ]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5217\u8868 "),
          vue.createElementVNode("view", { class: "pageBox newBox" }, [
            vue.unref(itemData2).length > 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
              key: 0,
              "scroll-y": "true",
              style: vue.normalizeStyle({ height: vue.unref(scrollH) + "px" })
            }, [
              vue.createElementVNode("view", { class: "systemList" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData2), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "boxBg item",
                    key: index
                  }, [
                    vue.createElementVNode("view", {
                      class: vue.normalizeClass(["tit", item.isRead === 0 ? "active" : ""])
                    }, [
                      vue.createElementVNode("icon"),
                      vue.unref(title) === "\u53D6\u4EF6\u76F8\u5173" ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "\u60A8\u6709\u4E00\u4E2A\u65B0\u7684\u53D6\u4EF6\u8BA2\u5355")) : vue.unref(title) === "\u6D3E\u4EF6\u76F8\u5173" ? (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "\u60A8\u6709\u4E00\u4E2A\u65B0\u7684\u6D3E\u4EF6\u8BA2\u5355")) : vue.unref(title) === "\u7B7E\u6536\u63D0\u9192" ? (vue.openBlock(), vue.createElementBlock("text", { key: 2 }, "\u60A8\u6709\u4E00\u4E2A\u6D3E\u4EF6\u5DF2\u7B7E\u6536")) : (vue.openBlock(), vue.createElementBlock("text", { key: 3 }, "\u60A8\u6709\u4E00\u4E2A\u5FEB\u4EF6\u5DF2\u53D6\u6D88"))
                    ], 2),
                    vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.content), 1),
                    vue.createElementVNode("view", { class: "time" }, [
                      vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(taskTimeFormat)(item.created)), 1),
                      vue.createElementVNode("button", {
                        class: "uni-btn redBtn",
                        onClick: ($event) => handleDetail(item)
                      }, " \u67E5\u770B\u8BE6\u60C5 ", 8, ["onClick"])
                    ])
                  ]);
                }), 128))
              ]),
              vue.createVNode(ReachBottom, {
                ref_key: "loadMore",
                ref: loadMore
              }, null, 512)
            ], 4)) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
            ]))
          ]),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesNewsSystem = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-67cbd0fc"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/system.vue"]]);
  const calculateFreight = (params) => request({
    url: "/tasks/calculate",
    method: "post",
    params
  });
  const getProvinces = (params) => request({
    url: "/areas/children",
    method: "get",
    params
  });
  const _sfc_main$z = {
    __name: "index",
    props: {
      type: {
        type: Number,
        default: null
      }
    },
    emits: "getCity",
    setup(__props, { expose, emit }) {
      const popup2 = vue.ref();
      const indicatorStyle = vue.ref(`height: 100rpx;`);
      let defaultValue = vue.ref([0, 0, 0]);
      const provinceData = vue.reactive([]);
      const cityData = vue.reactive([]);
      const areaData = vue.reactive([]);
      let cityBase = vue.ref({});
      vue.onMounted(() => {
        getProvincesData();
      });
      const getProvincesData = async (e) => {
        let res2 = await getProvinces();
        if (res2.code === 200) {
          provinceData.value = res2.data;
          let provincesId = null;
          if (!e) {
            provincesId = provinceData.value[0].id;
          } else {
            defaultValue.value = e.detail.value;
            provincesId = provinceData.value[e.detail.value[0]].id;
          }
          getCity(provincesId);
        } else {
          return uni.showToast({
            title: res2.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const getCity = async (id) => {
        let res2 = await getProvinces({ parentId: id });
        if (res2.code === 200) {
          cityData.value = res2.data;
          const cityId = cityData.value[defaultValue.value[1]].id;
          getArea(cityId);
        } else {
          return uni.showToast({
            title: res2.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const getArea = async (id) => {
        let res2 = await getProvinces({ parentId: id });
        if (res2.code === 200) {
          areaData.value = res2.data;
          cityBase.value = {
            province: provinceData.value[defaultValue.value[0]].name,
            city: cityData.value[defaultValue.value[1]].name,
            area: areaData.value[defaultValue.value[2]].name,
            areaId: areaData.value[defaultValue.value[2]].id
          };
        } else {
          return uni.showToast({
            title: res2.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleOpen = () => {
        popup2.value.open("bottom");
      };
      const handleCancel = () => {
        popup2.value.close("bottom");
      };
      const handleComplete = () => {
        handleCancel();
        emit("getCity", cityBase.value);
      };
      expose({
        handleOpen
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "uniPopup" }, [
          vue.createVNode(_component_uni_popup, {
            ref_key: "popup",
            ref: popup2,
            type: "bottom",
            "background-color": "#fff"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup-content" }, [
                vue.createElementVNode("view", { class: "tit" }, [
                  vue.createElementVNode("view", {
                    onClick: _cache[0] || (_cache[0] = ($event) => handleCancel())
                  }, "\u53D6\u6D88"),
                  vue.createElementVNode("view", null, "\u9009\u62E9\u57CE\u5E02"),
                  vue.createElementVNode("view", { onClick: handleComplete }, "\u5B8C\u6210")
                ]),
                vue.createElementVNode("view", { class: "date-select address" }, [
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("picker-view", {
                      class: "picker-view",
                      value: vue.unref(defaultValue),
                      "indicator-style": indicatorStyle.value,
                      onChange: getProvincesData
                    }, [
                      vue.createCommentVNode(" \u7701 "),
                      vue.createElementVNode("picker-view-column", null, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(provinceData.value, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "item",
                            key: index
                          }, [
                            vue.createElementVNode("text", null, vue.toDisplayString(item.name), 1)
                          ]);
                        }), 128))
                      ]),
                      vue.createCommentVNode(" end "),
                      vue.createCommentVNode(" \u5E02 "),
                      vue.createElementVNode("picker-view-column", null, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(cityData.value, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "item",
                            key: index
                          }, [
                            vue.createElementVNode("text", null, vue.toDisplayString(item.name), 1)
                          ]);
                        }), 128))
                      ]),
                      vue.createCommentVNode(" end "),
                      vue.createCommentVNode(" \u533A "),
                      vue.createElementVNode("picker-view-column", null, [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(areaData.value, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "item",
                            key: index
                          }, [
                            vue.createElementVNode("text", null, vue.toDisplayString(item.name), 1)
                          ]);
                        }), 128))
                      ]),
                      vue.createCommentVNode(" end ")
                    ], 40, ["value", "indicator-style"])
                  ])
                ])
              ])
            ]),
            _: 1
          }, 512)
        ]);
      };
    }
  };
  var CityPopup = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-address/index.vue"]]);
  const _sfc_main$y = {
    __name: "address",
    setup(__props, { expose, emit }) {
      const city = vue.ref();
      let type = vue.ref(null);
      let mailCity = vue.ref({});
      let consigneeCity = vue.ref({});
      const handleDate = (val) => {
        type.value = val;
        city.value.handleOpen();
      };
      const getCity = (obj) => {
        if (type.value === 1) {
          mailCity.value = obj;
        } else {
          consigneeCity.value = obj;
        }
        if (mailCity.value.areaId && consigneeCity.value.areaId) {
          emit("handleCity", true);
        }
      };
      expose({
        mailCity,
        consigneeCity
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "boxBg" }, [
          vue.createElementVNode("view", { class: "addressCon" }, [
            vue.createElementVNode("view", {
              class: "item",
              onClick: _cache[0] || (_cache[0] = ($event) => handleDate(1))
            }, [
              vue.createElementVNode("view", { class: "sendIcon" }, "\u5BC4"),
              vue.createElementVNode("view", { class: "address" }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(vue.unref(mailCity).province ? "active" : "")
                }, [
                  !vue.unref(mailCity).province ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "\u8BF7\u9009\u62E9\u5BC4\u4EF6\u57CE\u5E02")) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(mailCity).province), 1),
                    vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(mailCity).city), 1),
                    vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(mailCity).area), 1)
                  ]))
                ], 2),
                vue.createElementVNode("icon", { class: "nextIcon" })
              ]),
              vue.createElementVNode("view", { class: "line" })
            ]),
            vue.createElementVNode("view", {
              class: "item",
              onClick: _cache[1] || (_cache[1] = ($event) => handleDate(2))
            }, [
              vue.createElementVNode("view", { class: "receiveIcon" }, "\u6536"),
              vue.createElementVNode("view", { class: "address" }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(vue.unref(consigneeCity).province ? "active" : "")
                }, [
                  !vue.unref(consigneeCity).province ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, "\u8BF7\u9009\u62E9\u6536\u4EF6\u57CE\u5E02")) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(consigneeCity).province), 1),
                    vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(consigneeCity).city), 1),
                    vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(consigneeCity).area), 1)
                  ]))
                ], 2),
                vue.createElementVNode("icon", { class: "nextIcon" })
              ])
            ])
          ]),
          vue.createVNode(CityPopup, {
            ref_key: "city",
            ref: city,
            type: vue.unref(type),
            onGetCity: getCity
          }, null, 8, ["type"])
        ]);
      };
    }
  };
  var UniAddress = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/freight/components/address.vue"]]);
  const _sfc_main$x = {
    __name: "index",
    props: {
      detailsData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props, { expose, emit }) {
      const props = __props;
      let weight = vue.ref(1);
      let volume = vue.ref(0);
      let measureLong = vue.ref(null);
      let measureWidth = vue.ref(null);
      let measureHigh = vue.ref(null);
      let isLessThan = vue.ref(true);
      let isExceed = vue.ref(false);
      let isLessThanVolume = vue.ref(true);
      let isExceedVolume = vue.ref(false);
      let freightData = vue.ref(null);
      expose({
        weight,
        volume,
        measureLong,
        measureWidth,
        measureHigh,
        freightData
      });
      vue.watch(weight, (newValue, oldValue) => {
        const val = Number(newValue);
        vue.nextTick(() => {
          if (val < 0.1 && (val > 0 && val < 1)) {
            weight.value = 1;
          }
          if (val > 0.1) {
            weight.value = parseInt(val * 10) / 10;
          }
          if (val <= 1) {
            isLessThan.value = true;
          } else {
            isLessThan.value = false;
            if (val >= 9999) {
              weight.value = 9999;
              isExceed.value = true;
            } else {
              isExceed.value = false;
            }
          }
        });
      });
      vue.watch(measureLong, (newValue, oldValue) => {
        const val = Number(newValue);
        vue.nextTick(() => {
          measureLong.value = Math.floor(val);
          if (newValue <= 0) {
            measureLong.value = null;
          }
        });
      });
      vue.watch(measureWidth, (newValue, oldValue) => {
        const val = Number(newValue);
        vue.nextTick(() => {
          measureWidth.value = Math.floor(val);
          if (newValue <= 0) {
            measureWidth.value = null;
          }
        });
      });
      vue.watch(measureHigh, (newValue, oldValue) => {
        const val = Number(newValue);
        vue.nextTick(() => {
          measureHigh.value = Math.floor(val);
          if (newValue <= 0) {
            measureHigh.value = null;
          }
        });
      });
      const getfreight = async () => {
        const details = props.detailsData;
        let data = {
          senderCountyId: details.senderCountyId,
          receiverCountyId: details.receiverCountyId,
          volume: volume.value === 0 ? 1 : volume.value * 1e6,
          weight: weight.value
        };
        await calculateFreight(data).then((res2) => {
          emit("getFreight", res2.data.freight);
        });
      };
      const handleSymbol = (e) => {
        const value = e.detail.value;
        if (value < 0.1) {
          weight.value = 1;
          isLessThan.value = true;
        } else {
          if (value > 0.1 && value <= 1) {
            isLessThan.value = true;
          } else {
            isLessThan.value = false;
          }
          isDetails();
          if (value >= 9999) {
            isExceed.value = true;
            weight.value = 9999;
          } else {
            isExceed.value = false;
            isDetails();
          }
        }
      };
      const isDetails = () => {
        if (props.detailsData.id !== void 0) {
          getfreight();
        }
      };
      const handleMinus = () => {
        if (weight.value > 1) {
          weight.value--;
          isExceed.value = false;
          weight.value = weight.value.toFixed(1);
        }
        if (weight.value <= 0) {
          weight.value = 1;
          isLessThan.value = true;
        }
        isDetails();
      };
      const handleAdd = () => {
        if (weight.value < 9999) {
          ++weight.value;
          isLessThan.value = false;
        }
        if (weight.value === 9999) {
          isExceed.value = true;
        }
        isDetails();
      };
      const handleVolume = (e) => {
        const value = Number(e.detail.value);
        if (value < 1e-4) {
          volume.value = 0;
        } else {
          if (value > 99) {
            volume.value = 99;
            return uni.showToast({
              title: "\u4F53\u79EF\u6700\u5927\u53EF\u4E0D\u80FD\u8D85\u8FC799m\xB3",
              duration: 1e3,
              icon: "none"
            });
          } else {
            volume.value = Number(e.detail.value);
          }
        }
        isDetails();
      };
      const handleVolumeMinus = () => {
        if (volume.value > 1) {
          volume.value--;
          volume.value = parseInt(volume.value * 1e4) / 1e4;
        }
        if (volume.value <= 0 || volume.value === 1) {
          volume.value = 0;
        }
        isDetails();
      };
      const handleVolumeAdd = () => {
        if (volume.value < 99) {
          ++volume.value;
          isLessThanVolume.value = false;
        }
        if (volume.value === 99) {
          isExceedVolume.value = true;
        }
        isDetails();
      };
      const handleCalculate = () => {
        const long = measureLong.value;
        const wide = measureWidth.value;
        const height = measureHigh.value;
        if (long >= 1 && wide >= 1 && height >= 1) {
          vue.nextTick(() => {
            let val = long / 100 * (wide / 100) * (height / 100);
            if (val < 1e-4) {
              volume.value = 0;
            } else if (val > 99) {
              isExceedVolume.value = true;
              volume.value = 99;
              return uni.showToast({
                title: "\u4F53\u79EF\u6700\u5927\u53EF\u4E0D\u80FD\u8D85\u8FC799m\xB3",
                duration: 1e3,
                icon: "none"
              });
            } else {
              volume.value = parseInt(val * 1e4) / 1e4;
              if (val > 1) {
                isLessThanVolume.value = false;
              } else {
                isLessThanVolume.value = true;
              }
              isExceedVolume.value = false;
            }
            isDetails();
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "goodsCon" }, [
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode("text", null, "\u9884\u4F30\u91CD\u91CF"),
            vue.createElementVNode("view", { class: "bg goodInfo" }, [
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["symbol", vue.unref(isLessThan) ? "active" : ""]),
                onClick: handleMinus
              }, "-", 2),
              vue.createElementVNode("view", { class: "num" }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-input",
                  type: "number",
                  maxlength: "6",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(weight) ? weight.value = $event : weight = $event),
                  onBlur: handleSymbol
                }, null, 544), [
                  [vue.vModelText, vue.unref(weight)]
                ]),
                vue.createElementVNode("text", null, "kg")
              ]),
              vue.createElementVNode("view", {
                class: vue.normalizeClass(["symbol", vue.unref(isExceed) ? "active" : ""]),
                onClick: handleAdd
              }, "+", 2)
            ])
          ]),
          vue.createElementVNode("view", { class: "item" }, [
            vue.createElementVNode("text", null, "\u603B\u4F53\u79EF"),
            vue.createElementVNode("view", { class: "bg goodInfo" }, [
              vue.createCommentVNode(` \u6682\u65F6\u53BB\u9664 :class="isLessThanVolume ? 'active' : ''" `),
              vue.createElementVNode("view", {
                class: "symbol",
                onClick: handleVolumeMinus
              }, "-"),
              vue.createElementVNode("view", { class: "num" }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-input",
                  type: "number",
                  maxlength: "6",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(volume) ? volume.value = $event : volume = $event),
                  onBlur: handleVolume
                }, null, 544), [
                  [vue.vModelText, vue.unref(volume)]
                ]),
                vue.createElementVNode("text", null, "m\xB3")
              ]),
              vue.createCommentVNode(` \u6682\u65F6\u53BB\u9664 :class="isExceedVolume ? 'active' : ''" `),
              vue.createElementVNode("view", {
                class: "symbol",
                onClick: handleVolumeAdd
              }, "+")
            ])
          ]),
          vue.createElementVNode("view", { class: "item calculate" }, [
            vue.createElementVNode("view", { class: "bg" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: "uni-input",
                type: "number",
                maxlength: "3",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.isRef(measureLong) ? measureLong.value = $event : measureLong = $event),
                placeholder: "\u957F",
                onInput: handleCalculate
              }, null, 544), [
                [vue.vModelText, vue.unref(measureLong)]
              ]),
              vue.createElementVNode("text", {
                class: vue.normalizeClass(vue.unref(measureLong) ? "active" : "")
              }, "cm", 2)
            ]),
            vue.createElementVNode("text", null, "*"),
            vue.createElementVNode("view", { class: "bg" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: "uni-input",
                type: "number",
                maxlength: "3",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => vue.isRef(measureWidth) ? measureWidth.value = $event : measureWidth = $event),
                placeholder: "\u5BBD",
                onInput: handleCalculate
              }, null, 544), [
                [vue.vModelText, vue.unref(measureWidth)]
              ]),
              vue.createElementVNode("text", {
                class: vue.normalizeClass(vue.unref(measureWidth) ? "active" : "")
              }, "cm", 2)
            ]),
            vue.createElementVNode("text", null, "*"),
            vue.createElementVNode("view", { class: "bg" }, [
              vue.withDirectives(vue.createElementVNode("input", {
                class: "uni-input",
                type: "number",
                maxlength: "3",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => vue.isRef(measureHigh) ? measureHigh.value = $event : measureHigh = $event),
                placeholder: "\u9AD8",
                onInput: handleCalculate
              }, null, 544), [
                [vue.vModelText, vue.unref(measureHigh)]
              ]),
              vue.createElementVNode("text", {
                class: vue.normalizeClass(vue.unref(measureHigh) ? "active" : "")
              }, "cm", 2)
            ])
          ])
        ]);
      };
    }
  };
  var GoodsInfo = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-goods/index.vue"]]);
  const _sfc_main$w = {
    __name: "result",
    props: {
      baseData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "boxBg result" }, [
          vue.createElementVNode("view", null, "\u8BA1\u8D39\u91CD\u91CF\uFF1A" + vue.toDisplayString(__props.baseData.weight) + " kg", 1),
          vue.createElementVNode("view", null, "\u8BA1\u8D39\u4F53\u79EF\uFF1A" + vue.toDisplayString(__props.baseData.volumeValue) + " m\xB3", 1),
          vue.createElementVNode("view", null, "\u9996\u91CD\uFF081.0kg\uFF09" + vue.toDisplayString(__props.baseData.firstWeight) + "\u5143\uFF0C\u7EED\u91CD" + vue.toDisplayString(__props.baseData.continuousWeight) + "\u5143/kg", 1),
          vue.createElementVNode("view", { class: "price" }, [
            vue.createElementVNode("text", null, "\uFFE5"),
            vue.createTextVNode(vue.toDisplayString(__props.baseData.freight), 1)
          ])
        ]);
      };
    }
  };
  var Result = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/freight/components/result.vue"]]);
  const _sfc_main$v = {
    __name: "index",
    setup(__props) {
      const title = vue.ref("\u8FD0\u8D39\u67E5\u8BE2");
      const isShow = vue.ref(false);
      let baseData = vue.reactive({});
      const goods = vue.ref();
      const address = vue.ref();
      const isCityId = vue.ref(false);
      const handleSubmit = async () => {
        const senderCountyId = address.value.mailCity.areaId;
        const receiverCountyId = address.value.consigneeCity.areaId;
        const goodData = goods.value;
        if (!senderCountyId) {
          return uni.showToast({
            title: "\u8BF7\u9009\u62E9\u5BC4\u4EF6\u57CE\u5E02",
            duration: 1e3,
            icon: "none"
          });
        }
        if (!receiverCountyId) {
          return uni.showToast({
            title: "\u8BF7\u9009\u62E9\u6536\u4EF6\u57CE\u5E02",
            duration: 1e3,
            icon: "none"
          });
        }
        isShow.value = true;
        let data = {
          senderCountyId,
          receiverCountyId,
          volume: goodData.volume === 0 ? 1 : goodData.volume * 1e6,
          weight: goodData.weight,
          measureLong: goodData.measureLong,
          measureWidth: goodData.measureWidth,
          measureHigh: goodData.measureHigh
        };
        const res2 = await calculateFreight(data);
        if (res2.code === 200) {
          baseData.value = __spreadValues({
            volumeValue: goodData.volume
          }, res2.data);
        } else {
          return uni.showToast({
            title: res2.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleCity = (val) => {
        isCityId.value = val;
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/index/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createElementVNode("view", { class: "navHead" }, [
            vue.createVNode(UniNav, {
              title: title.value,
              onGoBack: goBack
            }, null, 8, ["title"])
          ]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5217\u8868 "),
          vue.createElementVNode("view", { class: "pageBox freightBox" }, [
            vue.createCommentVNode(" \u5730\u5740 "),
            vue.createVNode(UniAddress, {
              ref_key: "address",
              ref: address,
              onHandleCity: handleCity
            }, null, 512),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u91CD\u91CF\u3001\u4F53\u79EF\u8BA1\u7B97 "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createVNode(GoodsInfo, {
                ref_key: "goods",
                ref: goods
              }, null, 512)
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u67E5\u8BE2\u6309\u94AE "),
            vue.createElementVNode("view", { class: "btnBox" }, [
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["btn-default", isCityId.value ? "" : "btn-forbid"]),
                onClick: handleSubmit
              }, " \u7ACB\u5373\u67E5\u8BE2 ", 2)
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u67E5\u8BE2\u7ED3\u679C "),
            isShow.value ? (vue.openBlock(), vue.createBlock(Result, {
              key: 0,
              baseData: vue.unref(baseData).value
            }, null, 8, ["baseData"])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesFreightIndex = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-628b0746"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/freight/index.vue"]]);
  const _sfc_main$u = {
    __name: "index",
    props: {
      tabBars: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const itemData2 = vue.ref(["\u8DDD\u79BB", "\u65F6\u95F4", "\u8D85\u65F6\u4EFB\u52A1"]);
      let isActive = vue.ref(-1);
      let isSelect = vue.ref();
      const handleTab = (index) => {
        isActive.value = index;
        isSelect.value = !isSelect.value;
        store2.commit("user/setIsFiltrate", true);
        store2.commit("user/setIstabChange", true);
        store2.commit("user/setFilterOverTime", false);
        if (index === 0) {
          let val = null;
          if (isSelect.value) {
            val = 1;
          } else {
            val = 2;
          }
          store2.commit("user/setOrderDistance", val);
          store2.commit("user/setFilterOverTime", null);
          store2.commit("user/setOrderTime", null);
        } else if (index === 1) {
          let val = null;
          if (isSelect.value) {
            val = 1;
          } else {
            val = 2;
          }
          store2.commit("user/setOrderTime", val);
          store2.commit("user/setOrderDistance", null);
          store2.commit("user/setFilterOverTime", null);
        } else {
          store2.commit("user/setFilterOverTime", true);
          store2.commit("user/setOrderTime", null);
          store2.commit("user/setOrderDistance", null);
        }
        emit("getList");
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "filtrateBox" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(itemData2.value, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["item", vue.unref(isActive) === index || item === "\u8D85\u65F6\u4EFB\u52A1" && vue.unref(users).filterOverTime ? "onHover" : ""]),
              key: index
            }, [
              vue.createElementVNode("text", {
                onClick: ($event) => handleTab(index)
              }, vue.toDisplayString(item), 9, ["onClick"]),
              index !== 2 ? (vue.openBlock(), vue.createElementBlock("icon", {
                key: 0,
                class: vue.normalizeClass(["up", vue.unref(isActive) === index && vue.unref(isSelect) ? "hover" : ""])
              }, null, 2)) : vue.createCommentVNode("v-if", true),
              index !== 2 ? (vue.openBlock(), vue.createElementBlock("icon", {
                key: 1,
                class: vue.normalizeClass(["down", vue.unref(isActive) === index && !vue.unref(isSelect) ? "hover" : ""])
              }, null, 2)) : vue.createCommentVNode("v-if", true)
            ], 2);
          }), 128))
        ]);
      };
    }
  };
  var ListFiltrate = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-list-filtrate/index.vue"]]);
  const _sfc_main$t = {
    __name: "index",
    props: {
      selected: {
        type: Map,
        default: () => []
      },
      tabIndex: {
        type: Number,
        default: null
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      isDelivery: {
        type: Boolean,
        default: false
      }
    },
    setup(__props, { emit }) {
      const props = __props;
      const store2 = useStore();
      const users = store2.state.user;
      let popup2 = vue.ref();
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u6279\u91CF\u5220\u9664\u5417\uFF1F");
      store2.state.user.deliveryData;
      const handleAdmin = () => {
        emit("getAdmin", true);
      };
      const allSelect = () => {
        emit("allSelect");
      };
      const handleOrder = () => {
        if (props.selected.size > 0) {
          for (let [key, value] of props.selected) {
          }
          if (props.isDelivery) {
            store2.commit("user/setIsDelivery", true);
          } else {
            store2.commit("user/setIsDelivery", false);
          }
          uni.navigateTo({
            url: "/pages/turnorder/index"
          });
        } else {
          return uni.showToast({
            title: "\u8BF7\u9009\u62E9\u4EFB\u52A1\uFF01",
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleBatchDelete = () => {
        if (props.selected.size > 0) {
          popup2.value.dialogOpen();
        } else {
          return uni.showToast({
            title: "\u8BF7\u9009\u62E9\u8981\u5220\u9664\u7684\u4EFB\u52A1\uFF01",
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handlePrint = () => {
        uni.showToast({
          title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
          duration: 1e3,
          icon: "none"
        });
      };
      const handleAccomplish = () => {
        let itemData2 = users.deliveryData;
        props.selected.clear();
        itemData2.forEach((element) => {
          element.selected = false;
        });
        store2.commit("user/setDeliveryData", itemData2);
        emit("getAdmin", false);
      };
      const handleClick = () => {
        emit("handleClick");
      };
      return (_ctx, _cache) => {
        return vue.unref(store2).state.user.deliveryData.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "boxCon dataAdmin"
        }, [
          !__props.isAdmin ? (vue.openBlock(), vue.createElementBlock("button", {
            key: 0,
            class: "uni-btn concelBtn",
            onClick: handleAdmin
          }, " \u7BA1\u7406 ")) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "adminInfo"
          }, [
            vue.createElementVNode("view", { class: "selectInfo" }, [
              vue.createElementVNode("label", { class: "checkRadio" }, [
                vue.createElementVNode("radio", {
                  value: "1",
                  checked: __props.selected.size === vue.unref(store2).state.user.deliveryData.length,
                  class: vue.normalizeClass(__props.selected.size === vue.unref(store2).state.user.deliveryData.length ? "active" : ""),
                  onClick: allSelect
                }, null, 10, ["checked"]),
                vue.createTextVNode(" \u5168\u9009 ")
              ]),
              vue.createTextVNode(" \u603B\u8BA1 "),
              vue.createElementVNode("text", { class: "num" }, vue.toDisplayString(__props.selected.size), 1),
              vue.createTextVNode(" \u6761 ")
            ]),
            vue.createElementVNode("view", null, [
              __props.isAdmin ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                class: "uni-btn concelBtn",
                onClick: handleAccomplish
              }, " \u5B8C\u6210 ")) : vue.createCommentVNode("v-if", true),
              __props.tabIndex === 0 && !__props.isDelivery ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 1,
                class: "uni-btn btn-default",
                onClick: handleOrder
              }, " \u8F6C\u5355 ")) : __props.tabIndex === 1 && !__props.isDelivery ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 2,
                class: "uni-btn btn-default",
                onClick: handlePrint
              }, " \u6253\u5370 ")) : vue.createCommentVNode("v-if", true),
              !__props.isDelivery && __props.tabIndex === 2 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 3,
                class: "uni-btn btn-default",
                onClick: handleBatchDelete
              }, " \u6279\u91CF\u5220\u9664 ")) : vue.createCommentVNode("v-if", true)
            ])
          ])),
          vue.createCommentVNode(" \u63D0\u793A\u7A97\u793A\u4F8B "),
          vue.createVNode(UniPopup, {
            ref_key: "popup",
            ref: popup2,
            tipInfo: tipInfo.value,
            onHandleClick: handleClick
          }, null, 8, ["tipInfo"]),
          vue.createCommentVNode(" end ")
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var ExpressageFoot = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-74ae7a27"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-expressage-foot/index.vue"]]);
  const _sfc_main$s = {
    __name: "dealParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      searchInfo: {
        type: Object,
        default: () => ({})
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const props = __props;
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      const phone2 = vue.ref();
      let itemData2 = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = users.isFiltrate ? 1 : vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      const phoneData = vue.ref("");
      let page = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 4
      });
      let searchPage = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10
      });
      onReachBottom(() => {
        store2.commit("user/setIsInput", true);
        if (pageNum.value >= Number(pages.value)) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            if (props.searchInfo.keyword) {
              getSearchList();
            } else {
              getList();
            }
          }, 1e3);
        }
      });
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData2.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData2.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      const getList = async () => {
        reload.value = true;
        let valNum = 0;
        if (users.isFiltrate || users.isSearchClear) {
          valNum = 1;
          pageNum.value = 1;
          if (users.isFiltrate) {
            store2.commit("user/setIsFiltrate", false);
          }
          if (users.isSearchClear) {
            store2.commit("user/setSearchClear", false);
          }
        }
        page = __spreadProps(__spreadValues({}, page), {
          page: valNum ? 1 : pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0 || users.isFiltrate) {
                itemData2.value = [];
              }
              if (users.istabChange || users.isSearchClear) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
          }
        });
      };
      const getSearchList = async () => {
        reload.value = true;
        let valNum = 0;
        if (!users.isInput) {
          valNum = 1;
          pageNum.value = 1;
          store2.commit("user/setIsFiltrate", false);
        }
        searchPage = __spreadProps(__spreadValues({}, searchPage), {
          keyword: props.searchInfo.keyword,
          status: props.searchInfo.status,
          taskType: props.searchInfo.taskType,
          page: valNum ? 1 : pageNum.value
        });
        await getSearch(searchPage).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || !users.isInput) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
            if (itemData2.value.length > 0) {
              isClear.value = true;
            }
          }
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleDetails = (e, id) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", id);
        store2.commit("user/setTaskType", 2);
        store2.commit("user/setTaskStatus", 4);
        store2.commit("user/setNewType", null);
        uni.redirectTo({
          url: "/pages/details/waybill"
        });
      };
      const handlePhone = (e, val) => {
        e.stopPropagation();
        phoneData.value = val;
        phone2.value.dialogOpen();
      };
      const handleNote = () => {
        uni.showToast({
          title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
          duration: 1e3,
          icon: "none"
        });
      };
      expose({ getList, getSearchList });
      return (_ctx, _cache) => {
        return __props.tabIndex === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData2).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData2), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "expressage"
                }, [
                  __props.isAdmin ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "checkbox"
                  }, [
                    vue.createElementVNode("view", { class: "checkRadio" }, [
                      vue.createElementVNode("radio", {
                        value: String(index),
                        class: vue.normalizeClass(item.selected === true ? "active" : ""),
                        checked: item.selected,
                        onClick: ($event) => checkbox(index)
                      }, null, 10, ["value", "checked", "onClick"])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass(["boxBg", __props.isAdmin ? "adminActive" : ""])
                  }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      vue.createElementVNode("view", {
                        class: "item",
                        onClick: vue.withModifiers(($event) => handleDetails($event, item.id), ["stop"])
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, [
                          vue.createElementVNode("view", null, [
                            vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(item.name), 1),
                            vue.createTextVNode(" " + vue.toDisplayString(item.phone) + " ", 1),
                            vue.createElementVNode("icon", {
                              class: "phone",
                              onClick: vue.withModifiers(($event) => handlePhone($event, item.phone), ["stop"])
                            }, null, 8, ["onClick"]),
                            vue.createElementVNode("icon", {
                              class: "note",
                              onClick: vue.withModifiers(handleNote, ["stop"])
                            }, null, 8, ["onClick"])
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                        vue.createElementVNode("view", { class: "time" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1)
                      ], 8, ["onClick"])
                    ])
                  ], 2)
                ]);
              }), 128)),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u4E0A\u62C9 "),
              vue.createVNode(ReachBottom, {
                ref_key: "loadMore",
                ref: loadMore
              }, null, 512),
              vue.createCommentVNode(" end ")
            ])
          ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" \u7A7A\u9875\u9762 "),
            vue.createElementVNode("view", null, [
              vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
            ])
          ], 2112)),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u62E8\u6253\u7535\u8BDD\u5F39\u5C42 "),
          vue.createVNode(Phone, {
            ref_key: "phone",
            ref: phone2,
            phoneData: phoneData.value
          }, null, 8, ["phoneData"]),
          vue.createCommentVNode(" end ")
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var DealParcel$1 = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/delivery/components/components/dealParcel.vue"]]);
  const _sfc_main$r = {
    __name: "alreadyParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 1
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      searchInfo: {
        type: Object,
        default: () => ({})
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const props = __props;
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      let itemData2 = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      let page = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 5
      });
      let searchPage = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10
      });
      onReachBottom(() => {
        if (pageNum.value >= pages.value) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            if (props.searchInfo.keyword) {
              getSearchList();
            } else {
              getList();
            }
          }, 1e3);
        }
      });
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData2.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData2.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      const getList = async () => {
        reload.value = true;
        if (users.isSearchClear) {
          pageNum.value = 1;
          store2.commit("user/setSearchClear", false);
        }
        page = __spreadProps(__spreadValues({}, page), {
          page: pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || users.isSearchClear) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
          }
        });
      };
      const getSearchList = async () => {
        reload.value = true;
        let valNum = 0;
        if (!users.isInput) {
          valNum = 1;
          pageNum.value = 1;
          store2.commit("user/setIsFiltrate", false);
        }
        searchPage = __spreadProps(__spreadValues({}, searchPage), {
          keyword: props.searchInfo.keyword,
          status: props.searchInfo.status,
          taskType: props.searchInfo.taskType,
          page: valNum ? 1 : pageNum.value
        });
        await getSearch(searchPage).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || !users.isInput) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
            if (itemData2.value.length > 0) {
              isClear.value = true;
            }
          }
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleDetails = (e, item) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", item.id);
        store2.commit("user/setTaskType", 2);
        store2.commit("user/setTaskStatus", 5);
        store2.commit("user/setNewType", null);
        if (item.status === 2 && item.paymentStatus === 1 && item.paymentMethod === 2 && item.signStatus !== 2) {
          store2.commit("user/setIsDelivery", true);
          store2.commit("user/setPayData", {});
          uni.redirectTo({
            url: "/pages/pay/scanPay"
          });
        } else {
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        }
      };
      expose({
        getList,
        getSearchList
      });
      return (_ctx, _cache) => {
        return __props.tabIndex === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData2).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData2), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "expressage"
                }, [
                  __props.isAdmin ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "checkbox"
                  }, [
                    vue.createElementVNode("view", { class: "checkRadio" }, [
                      vue.createElementVNode("radio", {
                        value: String(index),
                        class: vue.normalizeClass(item.selected === true ? "active" : ""),
                        checked: item.selected,
                        onClick: ($event) => checkbox(index)
                      }, null, 10, ["value", "checked", "onClick"])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass(["boxBg", __props.isAdmin ? "adminActive" : ""])
                  }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      vue.createElementVNode("view", {
                        class: "item",
                        onClick: ($event) => handleDetails($event, item)
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1),
                        vue.createElementVNode("view", { class: "address" }, "\u6536\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                        vue.createElementVNode("view", { class: "address" }, "\u6D3E\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "address" }, "\u7B7E\u6536\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.taskTime), 1),
                        item.amount > 0 && item.status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "time"
                        }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true),
                        item.status === 2 && item.paymentStatus === 1 && item.paymentMethod === 2 && item.signStatus !== 2 ? (vue.openBlock(), vue.createElementBlock("text", {
                          key: 1,
                          onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"]),
                          class: "delete"
                        }, [
                          vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u6536\u6B3E")
                        ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                      ], 8, ["onClick"])
                    ])
                  ], 2)
                ]);
              }), 128)),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u4E0A\u62C9 "),
              vue.createVNode(ReachBottom, {
                ref_key: "loadMore",
                ref: loadMore
              }, null, 512),
              vue.createCommentVNode(" end ")
            ])
          ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" \u7A7A\u9875\u9762 "),
            vue.createElementVNode("view", null, [
              vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
            ])
          ], 2112)),
          vue.createCommentVNode(" end ")
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var AlreadyParcel$1 = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/delivery/components/components/alreadyParcel.vue"]]);
  const _sfc_main$q = {
    __name: "list",
    props: {
      tabBars: {
        type: Object,
        default: () => ({})
      },
      tabIndex: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      orderDistance: {
        type: Number,
        default: 0
      },
      orderTime: {
        type: Number,
        default: 0
      },
      filterOverTime: {
        type: Number,
        default: 0
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const store2 = useStore();
      store2.state.user;
      let popup2 = vue.ref();
      let dealparcel = vue.ref();
      let already = vue.ref();
      vue.ref();
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F");
      let taskId = vue.ref("");
      let scrollH = vue.ref(0);
      let searchInfo = vue.reactive({
        keyword: null,
        status: null,
        taskType: null
      });
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: (res2) => {
            scrollH.value = res2.windowHeight;
          }
        });
      });
      const getSelected = (array) => {
        emit("getSelected", array);
      };
      const dealPList = () => {
        dealparcel.value.getList();
      };
      const dealSearchList = () => {
        dealparcel.value.getSearchList();
      };
      const alreadList = () => {
        already.value.getList();
      };
      const alreadSearchList = () => {
        already.value.getSearchList();
      };
      const handleClick = async () => {
        await taskDelete(taskId.value).then((res2) => {
          if (res2.code === 200) {
            dealparcel.value.getList();
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      expose({
        dealPList,
        dealSearchList,
        alreadList,
        alreadSearchList,
        searchInfo
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u5F85\u6D3E\u4EF6 "),
          vue.createVNode(DealParcel$1, {
            ref_key: "dealparcel",
            ref: dealparcel,
            tabIndex: __props.tabIndex,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox,
            onGetSelected: getSelected,
            searchInfo: vue.unref(searchInfo)
          }, null, 8, ["tabIndex", "isAdmin", "searchInfo"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5DF2\u7B7E\u6536 "),
          vue.createVNode(AlreadyParcel$1, {
            ref_key: "already",
            ref: already,
            tabIndex: __props.tabIndex,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox,
            searchInfo: vue.unref(searchInfo)
          }, null, 8, ["tabIndex", "isAdmin", "searchInfo"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u63D0\u793A\u7A97\u793A\u4F8B "),
          vue.createVNode(UniPopup, {
            ref_key: "popup",
            ref: popup2,
            tipInfo: tipInfo.value,
            onHandleClick: handleClick
          }, null, 8, ["tipInfo"]),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var TabList$1 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/delivery/components/list.vue"]]);
  const _sfc_main$p = {
    __name: "index",
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const tab = vue.ref();
      const list = vue.ref();
      const search = vue.ref();
      const expressageFoot = vue.ref();
      const tabBars2 = PickUpData;
      let tabIndex = vue.ref(0);
      let isDelivery = vue.ref(true);
      let isAdmin = vue.ref(false);
      let selected = vue.reactive(/* @__PURE__ */ new Map());
      vue.onMounted(() => {
        if (users.tabIndex) {
          tabIndex.value = users.tabIndex;
        }
        if (users.tabIndex === 0) {
          list.value.dealPList();
        } else {
          list.value.alreadList();
        }
      });
      const handleSearch = () => {
        list.value.searchInfo.taskType = 2;
        list.value.searchInfo.keyword = search.value.searchVal;
        store2.commit("user/setIsInput", false);
        store2.commit("user/setDeliveryData", []);
        if (tabIndex.value === 0) {
          list.value.searchInfo.status = 1;
          list.value.dealSearchList();
        } else {
          list.value.searchInfo.status = 2;
          list.value.alreadSearchList();
        }
      };
      const handleClick = async () => {
        const ids = [];
        for (const [key, value] of selected) {
          ids.push(value);
        }
        await taskBatchDelete({ idList: ids }).then((res2) => {
          if (res2.code === 200) {
            list.value.alreadList();
            store2.commit("user/setDeliveryData", []);
            store2.commit("user/setPages", 0);
            store2.commit("user/setSelectTaskData", /* @__PURE__ */ new Map());
            selected.clear();
            isAdmin.value = false;
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        });
      };
      const clearSearchData = () => {
        store2.commit("user/setIsInput", true);
        store2.commit("user/setDeliveryData", []);
        store2.commit("user/setSearchText", "");
        store2.commit("user/setSearchClear", true);
        list.value.searchInfo.keyword = "";
        store2.commit("user/setPages", 0);
        if (tabIndex.value === 0) {
          list.value.dealPList();
        } else {
          list.value.alreadList();
        }
      };
      const getTabIndex = (index) => {
        tabIndex.value = index;
        store2.commit("user/setDeliveryData", []);
        store2.commit("user/setPages", 0);
        store2.commit("user/setSelectTaskData", /* @__PURE__ */ new Map());
        store2.commit("user/setFilterOverTime", null);
        store2.commit("user/setIsFiltrate", false);
        search.value.searchVal = "";
        store2.commit("user/setSearchText", "");
        store2.commit("user/setSearchClear", true);
        selected.clear();
        isAdmin.value = false;
        if (index === 0) {
          list.value.dealPList();
        } else {
          list.value.alreadList();
        }
      };
      const onChangeSwiperTab = (e) => {
        tab.value.changeTab(e.detail.current);
      };
      const getAdmin = (val) => {
        isAdmin.value = val;
      };
      const getList = () => {
        list.value.dealPList();
      };
      const allSelect = () => {
        let itemData2 = users.deliveryData;
        if (selected.size === itemData2.length) {
          selected.clear();
          itemData2.forEach((element) => {
            element.selected = false;
          });
        } else {
          itemData2.forEach((element, index) => {
            if (!selected.has(index)) {
              selected.set(index, element.id);
              element.selected = true;
            }
          });
        }
        emit("getSelected", selected);
        store2.commit("user/setSelectTaskData", selected);
      };
      const checkbox = (index) => {
        let itemData2 = users.deliveryData;
        if (itemData2[index].selected) {
          itemData2[index].selected = false;
          selected.delete(index);
        } else {
          itemData2[index].selected = true;
          selected.set(index, itemData2[index].id);
        }
        store2.commit("user/setSelectTaskData", selected);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createVNode(SearchPage, {
            onHandleSearch: handleSearch,
            ref_key: "search",
            ref: search,
            onClearSearchData: clearSearchData
          }, null, 512),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", null, [
            vue.createCommentVNode(" tab\u5207\u6362 "),
            vue.createVNode(UniTab, {
              tabBars: vue.unref(tabBars2),
              ref_key: "tab",
              ref: tab,
              onGetTabIndex: getTabIndex,
              class: "pickupTab"
            }, null, 8, ["tabBars"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u7B5B\u9009 "),
            vue.unref(tabIndex) === 0 ? (vue.openBlock(), vue.createBlock(ListFiltrate, {
              key: 0,
              onGetList: getList,
              class: "pickupFilrate"
            })) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u53D6\u4EF6\u72B6\u6001\u5217\u8868 "),
            vue.createElementVNode("view", {
              class: vue.normalizeClass(vue.unref(tabIndex) === 0 ? "pickupBoxTop" : "pickupTop"),
              style: { "padding": "0 0 200rpx 0" }
            }, [
              vue.createVNode(TabList$1, {
                tabBars: vue.unref(tabBars2),
                tabIndex: vue.unref(tabIndex),
                isAdmin: vue.unref(isAdmin),
                onOnChangeSwiperTab: onChangeSwiperTab,
                onCheckbox: checkbox,
                ref_key: "list",
                ref: list
              }, null, 8, ["tabBars", "tabIndex", "isAdmin"])
            ], 2),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" \u5E95\u90E8\u7BA1\u7406 \u5355\u9009\\\u8F6C\u5355\\\u6253\u5370\\\u5220\u9664 "),
          vue.createCommentVNode(" \u6D3E\u4EF6\u540E\u671F\u4F1A\u52A0\u529F\u80FD,\u6240\u4EE5\u8FD9\u5757\u4EE3\u7801\u5148\u4E0D\u5220\u9664 "),
          vue.createVNode(ExpressageFoot, {
            ref_key: "expressageFoot",
            ref: expressageFoot,
            onGetAdmin: getAdmin,
            isAdmin: vue.unref(isAdmin),
            isDelivery: vue.unref(isDelivery),
            selected: vue.unref(selected),
            tabIndex: vue.unref(tabIndex),
            onAllSelect: allSelect,
            onHandleClick: handleClick
          }, null, 8, ["isAdmin", "isDelivery", "selected", "tabIndex"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" footer "),
          vue.createVNode(UniFooter, { pagePath: "pages/delivery/index" }),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesDeliveryIndex = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-7c6df030"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/delivery/index.vue"]]);
  const _sfc_main$o = {
    __name: "dealParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      searchInfo: {
        type: Object,
        default: () => ({})
      },
      isInput: {
        type: Boolean,
        default: false
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const props = __props;
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      const phone2 = vue.ref();
      let itemData2 = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = users.isFiltrate ? 1 : vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      const phoneData = vue.ref("");
      let page = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 1
      });
      let searchPage = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10
      });
      vue.onMounted(() => {
      });
      onReachBottom(() => {
        store2.commit("user/setIsInput", true);
        if (pageNum.value >= Number(pages.value)) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            if (props.searchInfo.keyword) {
              getSearchList();
            } else {
              getList();
            }
          }, 1e3);
        }
      });
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData2.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData2.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      const getList = async () => {
        reload.value = true;
        let valNum = 0;
        if (users.isFiltrate || users.isSearchClear) {
          valNum = 1;
          pageNum.value = 1;
          if (users.isFiltrate) {
            store2.commit("user/setIsFiltrate", false);
          }
          if (users.isSearchClear) {
            store2.commit("user/setSearchClear", false);
          }
        }
        page = __spreadProps(__spreadValues({}, page), {
          page: valNum ? 1 : pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || users.isSearchClear) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
          }
        });
      };
      const getSearchList = async () => {
        reload.value = true;
        let valNum = 0;
        if (!users.isInput) {
          valNum = 1;
          pageNum.value = 1;
          store2.commit("user/setIsFiltrate", false);
        }
        searchPage = __spreadProps(__spreadValues({}, searchPage), {
          keyword: props.searchInfo.keyword,
          status: props.searchInfo.status,
          taskType: props.searchInfo.taskType,
          page: valNum ? 1 : pageNum.value
        });
        await getSearch(searchPage).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || !users.isInput) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
            if (itemData2.value.length > 0) {
              isClear.value = true;
            }
          }
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleDetails = (e, id) => {
        store2.commit("user/setTaskId", id);
        store2.commit("user/setTaskType", 1);
        store2.commit("user/setIsBack", "");
        store2.commit("user/setDetailType", 2);
        e.stopPropagation();
        uni.redirectTo({
          url: "/pages/details/index"
        });
      };
      const handleCancel = (e, id) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", id);
        uni.redirectTo({
          url: "/pages/cancel/index"
        });
      };
      const handlePhone = (e, val) => {
        e.stopPropagation();
        phoneData.value = val;
        phone2.value.dialogOpen();
      };
      const handleNote = () => {
        uni.showToast({
          title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
          duration: 1e3,
          icon: "none"
        });
      };
      expose({ getList, getSearchList });
      return (_ctx, _cache) => {
        return __props.tabIndex === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData2).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData2), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "expressage"
                }, [
                  vue.createCommentVNode(" \u7236\u7EC4\u4EF6\u4F20\u9012\u8FC7\u6765\u7684isAdmi\u6765\u63A7\u5236\u662F\u5426\u663E\u793A\u591A\u9009\u6846 "),
                  __props.isAdmin ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "checkbox"
                  }, [
                    vue.createElementVNode("view", { class: "checkRadio" }, [
                      vue.createElementVNode("radio", {
                        value: String(index),
                        class: vue.normalizeClass(item.selected === true ? "active" : ""),
                        checked: item.selected,
                        onClick: ($event) => checkbox(index)
                      }, null, 10, ["value", "checked", "onClick"])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" end "),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass(["boxBg", __props.isAdmin ? "adminActive" : ""])
                  }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      vue.createElementVNode("view", {
                        class: "item",
                        onClick: vue.withModifiers(($event) => handleDetails($event, item.id), ["stop"])
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, [
                          vue.createElementVNode("view", null, [
                            vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(item.name), 1),
                            vue.createTextVNode(" " + vue.toDisplayString(item.phone) + " ", 1),
                            vue.createElementVNode("icon", {
                              class: "phone",
                              onClick: vue.withModifiers(($event) => handlePhone($event, item.phone), ["stop"])
                            }, null, 8, ["onClick"]),
                            vue.createElementVNode("icon", {
                              class: "note",
                              onClick: vue.withModifiers(handleNote, ["stop"])
                            }, null, 8, ["onClick"])
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                        vue.createElementVNode("view", { class: "time" }, "\u9884\u7EA6\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(vue.unref(taskTimeFormat)(item.estimatedStartTime)) + " \u81F3 " + vue.toDisplayString(vue.unref(overTimeFormat)(item.estimatedEndTime)), 1),
                        vue.createElementVNode("text", {
                          onClick: vue.withModifiers(($event) => handleCancel($event, item.id), ["stop"]),
                          class: "delete"
                        }, [
                          vue.createElementVNode("button", { class: "uni-btn concelBtn" }, "\u53D6\u6D88")
                        ], 8, ["onClick"])
                      ], 8, ["onClick"])
                    ])
                  ], 2)
                ]);
              }), 128)),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u4E0A\u62C9 "),
              vue.createVNode(ReachBottom, {
                ref_key: "loadMore",
                ref: loadMore
              }, null, 512),
              vue.createCommentVNode(" end ")
            ])
          ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" \u7A7A\u9875\u9762 "),
            vue.createElementVNode("view", null, [
              vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
            ])
          ], 2112)),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u62E8\u6253\u624B\u673A\u5F39\u5C42 "),
          vue.createVNode(Phone, {
            ref_key: "phone",
            ref: phone2,
            phoneData: phoneData.value
          }, null, 8, ["phoneData"]),
          vue.createCommentVNode(" end ")
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var DealParcel = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/components/components/dealParcel.vue"]]);
  const _sfc_main$n = {
    __name: "alreadyParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 1
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      searchInfo: {
        type: Object,
        default: () => ({})
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const props = __props;
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      let itemData2 = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      let page = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 2
      });
      let searchPage = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10
      });
      onReachBottom(() => {
        store2.commit("user/setIsInput", true);
        if (pageNum.value >= pages.value) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            if (props.searchInfo.keyword) {
              getSearchList();
            } else {
              getList();
            }
          }, 1e3);
        }
      });
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData2.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData2.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      const getList = async () => {
        reload.value = true;
        if (users.isSearchClear) {
          pageNum.value = 1;
          store2.commit("user/setSearchClear", false);
        }
        page = __spreadProps(__spreadValues({}, page), {
          page: pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || users.isSearchClear) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
          }
        });
      };
      const getSearchList = async () => {
        reload.value = true;
        let valNum = 0;
        if (!users.isInput) {
          valNum = 1;
          pageNum.value = 1;
          store2.commit("user/setIsFiltrate", false);
        }
        searchPage = __spreadProps(__spreadValues({}, searchPage), {
          keyword: props.searchInfo.keyword,
          status: props.searchInfo.status,
          taskType: props.searchInfo.taskType,
          page: valNum ? 1 : pageNum.value
        });
        await getSearch(searchPage).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || !users.isInput) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
            if (itemData2.value.length > 0) {
              isClear.value = true;
            }
          }
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleDetails = (e, item) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", item.id);
        store2.commit("user/setTaskType", 1);
        store2.commit("user/setDetailType", 2);
        if (item.status === 2 && item.paymentStatus === 1 && item.paymentMethod === 1) {
          store2.commit("user/setTaskStatus", 3);
          store2.commit("user/setPayData", {});
          uni.redirectTo({
            url: "/pages/pay/scanPay"
          });
        } else {
          store2.commit("user/setTaskStatus", 2);
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        }
      };
      expose({
        getList,
        getSearchList
      });
      return (_ctx, _cache) => {
        return __props.tabIndex === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData2).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9"),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData2), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "expressage"
                }, [
                  vue.createCommentVNode(" \u7236\u7EC4\u4EF6\u4F20\u9012\u8FC7\u6765\u7684isAdmi\u6765\u63A7\u5236\u662F\u5426\u663E\u793A\u591A\u9009\u6846 "),
                  __props.isAdmin ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "checkbox"
                  }, [
                    vue.createElementVNode("view", { class: "checkRadio" }, [
                      vue.createElementVNode("radio", {
                        value: String(index),
                        class: vue.normalizeClass(item.selected === true ? "active" : ""),
                        checked: item.selected,
                        onClick: ($event) => checkbox(index)
                      }, null, 10, ["value", "checked", "onClick"])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" end "),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass(["boxBg", __props.isAdmin ? "adminActive" : ""])
                  }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      vue.createElementVNode("view", {
                        class: "item",
                        onClick: ($event) => handleDetails($event, item)
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, "\u8BA2\u5355\u53F7\uFF1ASD" + vue.toDisplayString(item.orderId), 1),
                        vue.createElementVNode("view", { class: "address" }, "\u5BC4\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                        vue.createElementVNode("view", { class: "address" }, "\u53D6\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "time" }, "\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.taskTime), 1),
                        item.amount > 0 && item.status === 2 && item.paymentMethod === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "time"
                        }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true),
                        item.status === 2 && item.paymentStatus === 1 && item.paymentMethod === 1 ? (vue.openBlock(), vue.createElementBlock("text", {
                          key: 1,
                          onClick: vue.withModifiers(($event) => handleDetails($event, item), ["stop"]),
                          class: "delete"
                        }, [
                          vue.createElementVNode("button", { class: "uni-btn btn-default" }, "\u53BB\u6536\u6B3E")
                        ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                      ], 8, ["onClick"])
                    ])
                  ], 2)
                ]);
              }), 128)),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u4E0A\u62C9 "),
              vue.createVNode(ReachBottom, {
                ref_key: "loadMore",
                ref: loadMore
              }, null, 512),
              vue.createCommentVNode(" end ")
            ])
          ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" \u7A7A\u9875\u9762 "),
            vue.createElementVNode("view", null, [
              vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
            ])
          ], 2112)),
          vue.createCommentVNode(" end ")
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var AlreadyParcel = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/components/components/alreadyParcel.vue"]]);
  const _sfc_main$m = {
    __name: "cancelParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      searchInfo: {
        type: Object,
        default: () => ({})
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const props = __props;
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      let itemData2 = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      let page = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 3
      });
      let searchPage = vue.reactive({
        latitude: users.loacation.latitude !== void 0 ? users.loacation.latitude : 40.062595,
        longitude: users.loacation.longitude !== void 0 ? users.loacation.longitude : 116.372809,
        page: 1,
        pageSize: 10
      });
      onReachBottom(() => {
        store2.commit("user/setIsInput", true);
        if (pageNum.value >= pages.value) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            if (props.searchInfo.keyword) {
              getSearchList();
            } else {
              getList();
            }
          }, 1e3);
        }
      });
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData2.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData2.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      const getList = async () => {
        reload.value = true;
        if (users.isSearchClear) {
          pageNum.value = 1;
          store2.commit("user/setSearchClear", false);
        }
        page = __spreadProps(__spreadValues({}, page), {
          page: pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || users.isSearchClear) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
          }
        });
      };
      const getSearchList = async () => {
        reload.value = true;
        let valNum = 0;
        if (!users.isInput) {
          valNum = 1;
          pageNum.value = 1;
          store2.commit("user/setIsFiltrate", false);
        }
        searchPage = __spreadProps(__spreadValues({}, searchPage), {
          keyword: props.searchInfo.keyword,
          status: props.searchInfo.status,
          taskType: props.searchInfo.taskType,
          page: valNum ? 1 : pageNum.value
        });
        await getSearch(searchPage).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData2.value = [];
              }
              if (users.istabChange || !users.isInput) {
                itemData2.value = res2.data.items;
                store2.commit("user/setIstabChange", false);
              } else {
                itemData2.value = itemData2.value.concat(res2.data.items);
              }
              pages.value = res2.data.pages;
              store2.commit("user/setDeliveryData", itemData2.value);
              if (Number(res2.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData2.value = [];
            }
            if (itemData2.value.length > 0) {
              isClear.value = true;
            }
          }
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleOpen = (e, id) => {
        e.stopPropagation();
        emit("handleOpen", id);
      };
      const handleDetails = (e, id) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", id);
        store2.commit("user/setTaskType", 1);
        store2.commit("user/setTaskStatus", 3);
        uni.redirectTo({
          url: "/pages/details/waybill"
        });
      };
      expose({
        getList,
        getSearchList
      });
      return (_ctx, _cache) => {
        return __props.tabIndex === 2 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData2).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9"),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData2), (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  class: "expressage"
                }, [
                  __props.isAdmin ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "checkbox"
                  }, [
                    vue.createElementVNode("view", { class: "checkRadio" }, [
                      vue.createElementVNode("radio", {
                        value: String(index),
                        class: vue.normalizeClass(item.selected === true ? "active" : ""),
                        checked: item.selected,
                        onClick: ($event) => checkbox(index)
                      }, null, 10, ["value", "checked", "onClick"])
                    ])
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("view", {
                    class: vue.normalizeClass(["boxBg", __props.isAdmin ? "adminActive" : ""])
                  }, [
                    vue.createElementVNode("view", { class: "tabList cancelList" }, [
                      vue.createElementVNode("view", {
                        class: "item",
                        onClick: vue.withModifiers(($event) => handleDetails($event, item.id), ["stop"])
                      }, [
                        vue.createElementVNode("view", null, "\u5BC4\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                        vue.createElementVNode("view", null, "\u53D6\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", null, "\u53D6\u6D88\u539F\u56E0\uFF1A" + vue.toDisplayString(item.cancelReason), 1),
                        vue.createElementVNode("view", null, "\u539F\u56E0\u63CF\u8FF0\uFF1A" + vue.toDisplayString(item.cancelReasonDescription), 1),
                        vue.createElementVNode("text", {
                          onClick: vue.withModifiers(($event) => handleOpen($event, item.id), ["stop"]),
                          class: "delete"
                        }, [
                          vue.createElementVNode("button", { class: "uni-btn concelBtn" }, "\u5220\u9664")
                        ], 8, ["onClick"])
                      ], 8, ["onClick"])
                    ])
                  ], 2)
                ]);
              }), 128)),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u4E0A\u62C9 "),
              vue.createVNode(ReachBottom, {
                ref_key: "loadMore",
                ref: loadMore
              }, null, 512),
              vue.createCommentVNode(" end ")
            ])
          ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.createCommentVNode(" \u7A7A\u9875\u9762 "),
            vue.createElementVNode("view", null, [
              vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
            ])
          ], 2112)),
          vue.createCommentVNode(" end ")
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var CancelParcel = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/components/components/cancelParcel.vue"]]);
  const _sfc_main$l = {
    __name: "list",
    props: {
      tabBars: {
        type: Array,
        default: () => []
      },
      tabIndex: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      },
      orderDistance: {
        type: Number,
        default: 0
      },
      orderTime: {
        type: Number,
        default: 0
      },
      filterOverTime: {
        type: Number,
        default: 0
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const store2 = useStore();
      store2.state.user;
      let popup2 = vue.ref();
      let dealparcel = vue.ref();
      let already = vue.ref();
      let cancel = vue.ref();
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F");
      let taskId = vue.ref("");
      let searchInfo = vue.reactive({
        keyword: null,
        status: null,
        taskType: null
      });
      const getSelected = (array) => {
        emit("getSelected", array);
      };
      const dealPList = () => {
        dealparcel.value.getList();
      };
      const dealSearchList = () => {
        dealparcel.value.getSearchList();
      };
      const alreadList = () => {
        already.value.getList();
      };
      const alreadSearchList = () => {
        already.value.getSearchList();
      };
      const cancelList = () => {
        cancel.value.getList();
      };
      const cancelSearchList = () => {
        cancel.value.getSearchList();
      };
      const handleClick = async () => {
        await taskDelete(taskId.value).then((res2) => {
          if (res2.code === 200) {
            store2.commit("user/setDeliveryData", []);
            cancel.value.getList();
            store2.commit("user/setIsDelete", true);
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleOpen = (id) => {
        popup2.value.dialogOpen();
        taskId.value = id;
      };
      expose({
        dealPList,
        dealSearchList,
        alreadList,
        alreadSearchList,
        cancelList,
        cancelSearchList,
        searchInfo
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u5F85\u53D6\u4EF6 "),
          vue.createVNode(DealParcel, {
            ref_key: "dealparcel",
            ref: dealparcel,
            tabIndex: __props.tabIndex,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox,
            onGetSelected: getSelected,
            searchInfo: vue.unref(searchInfo)
          }, null, 8, ["tabIndex", "isAdmin", "searchInfo"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5DF2\u53D6\u4EF6 "),
          vue.createVNode(AlreadyParcel, {
            ref_key: "already",
            ref: already,
            tabIndex: __props.tabIndex,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox,
            searchInfo: vue.unref(searchInfo)
          }, null, 8, ["tabIndex", "isAdmin", "searchInfo"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5DF2\u53D6\u6D88 "),
          vue.createVNode(CancelParcel, {
            tabIndex: __props.tabIndex,
            ref_key: "cancel",
            ref: cancel,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox,
            onHandleOpen: handleOpen,
            searchInfo: vue.unref(searchInfo)
          }, null, 8, ["tabIndex", "isAdmin", "searchInfo"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u63D0\u793A\u7A97 "),
          vue.createVNode(UniPopup, {
            ref_key: "popup",
            ref: popup2,
            tipInfo: tipInfo.value,
            onHandleClick: handleClick
          }, null, 8, ["tipInfo"]),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var TabList = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/components/list.vue"]]);
  const _sfc_main$k = {
    __name: "index",
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const tab = vue.ref();
      const list = vue.ref();
      const search = vue.ref();
      const tabBars2 = DeliveryData;
      let tabIndex = vue.ref(0);
      let isInput = vue.ref(false);
      let isAdmin = vue.ref(false);
      let selected = vue.reactive(/* @__PURE__ */ new Map());
      vue.onMounted(() => {
        if (users.tabIndex) {
          tabIndex.value = users.tabIndex;
        }
        if (users.tabIndex === 0) {
          list.value.dealPList();
        } else if (users.tabIndex === 1) {
          list.value.alreadList();
        } else {
          list.value.cancelList();
        }
      });
      const handleSearch = () => {
        list.value.searchInfo.taskType = 1;
        list.value.searchInfo.keyword = search.value.searchVal;
        store2.commit("user/setIsInput", false);
        store2.commit("user/setDeliveryData", []);
        if (tabIndex.value === 0) {
          list.value.searchInfo.status = 1;
          list.value.dealSearchList();
        } else if (tabIndex.value === 1) {
          list.value.searchInfo.status = 2;
          list.value.alreadSearchList();
        } else {
          list.value.searchInfo.status = 3;
          list.value.cancelSearchList();
        }
      };
      const handleClick = async () => {
        const ids = [];
        for (const [key, value] of selected) {
          ids.push(value);
        }
        await taskBatchDelete({ idList: ids }).then((res2) => {
          if (res2.code === 200) {
            list.value.cancelList();
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        });
      };
      const clearSearchData = () => {
        store2.commit("user/setIsInput", true);
        store2.commit("user/setDeliveryData", []);
        store2.commit("user/setSearchText", "");
        store2.commit("user/setSearchClear", true);
        list.value.searchInfo.keyword = "";
        store2.commit("user/setPages", 0);
        if (tabIndex.value === 0) {
          list.value.dealPList();
        } else if (tabIndex.value === 1) {
          list.value.alreadList();
        } else {
          list.value.cancelList();
        }
      };
      const getTabIndex = (index) => {
        store2.commit("user/setFilterOverTime", null);
        search.value.searchVal = "";
        store2.commit("user/setSearchText", "");
        store2.commit("user/setSearchClear", true);
        tabIndex.value = index;
        if (index === 0) {
          list.value.dealPList();
        } else if (index === 1) {
          list.value.alreadList();
        } else {
          list.value.cancelList();
        }
        selected.clear();
        isAdmin.value = false;
        store2.commit("user/setDeliveryData", []);
        store2.commit("user/setPages", 0);
        store2.commit("user/setSelectTaskData", /* @__PURE__ */ new Map());
      };
      const onChangeSwiperTab = (e) => {
        tab.value.changeTab(e.detail.current);
      };
      const getAdmin = (val) => {
        isAdmin.value = val;
      };
      const getList = () => {
        list.value.dealPList();
      };
      const allSelect = () => {
        let itemData2 = users.deliveryData;
        if (selected.size === itemData2.length) {
          selected.clear();
          itemData2.forEach((element) => {
            element.selected = false;
          });
        } else {
          itemData2.forEach((element, index) => {
            if (!selected.has(index)) {
              selected.set(index, element.id);
              element.selected = true;
            }
          });
        }
        emit("getSelected", selected);
        store2.commit("user/setSelectTaskData", selected);
      };
      const checkbox = (index) => {
        let itemData2 = users.deliveryData;
        if (itemData2[index].selected) {
          itemData2[index].selected = false;
          selected.delete(index);
        } else {
          itemData2[index].selected = true;
          selected.set(index, itemData2[index].id);
        }
        store2.commit("user/setSelectTaskData", selected);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createVNode(SearchPage, {
            onHandleSearch: handleSearch,
            ref_key: "search",
            ref: search,
            onClearSearchData: clearSearchData
          }, null, 512),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", null, [
            vue.createCommentVNode(" tab\u5207\u6362 "),
            vue.createVNode(UniTab, {
              tabBars: vue.unref(tabBars2),
              ref_key: "tab",
              ref: tab,
              onGetTabIndex: getTabIndex,
              class: "pickupTab"
            }, null, 8, ["tabBars"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u8DDD\u79BB\\\u65F6\u95F4\\\u8D85\u65F6\u7B5B\u9009 "),
            vue.unref(tabIndex) === 0 ? (vue.openBlock(), vue.createBlock(ListFiltrate, {
              key: 0,
              onGetList: getList,
              class: "pickupFilrate"
            })) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u53D6\u4EF6\u72B6\u6001\u5217\u8868 "),
            vue.createElementVNode("view", {
              class: vue.normalizeClass(vue.unref(tabIndex) === 0 ? "pickupBoxTop" : "pickupTop"),
              style: { "padding": "0 0 200rpx 0" }
            }, [
              vue.createVNode(TabList, {
                tabBars: vue.unref(tabBars2),
                tabIndex: vue.unref(tabIndex),
                isAdmin: vue.unref(isAdmin),
                onOnChangeSwiperTab: onChangeSwiperTab,
                onCheckbox: checkbox,
                isInput: vue.unref(isInput),
                ref_key: "list",
                ref: list
              }, null, 8, ["tabBars", "tabIndex", "isAdmin", "isInput"])
            ], 2),
            vue.createCommentVNode(" end ")
          ]),
          vue.createVNode(ExpressageFoot, {
            ref: "expressageFoot",
            onGetAdmin: getAdmin,
            isAdmin: vue.unref(isAdmin),
            selected: vue.unref(selected),
            tabIndex: vue.unref(tabIndex),
            onAllSelect: allSelect,
            onHandleClick: handleClick
          }, null, 8, ["isAdmin", "selected", "tabIndex"]),
          vue.createCommentVNode(" footer "),
          vue.createVNode(UniFooter, { pagePath: "pages/delivery/index" }),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesPickupIndex = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-0e6a68f8"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/index.vue"]]);
  const _sfc_main$j = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      let popup2 = vue.ref();
      let isShowCancel = vue.ref(true);
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u8F6C\u5355\u5417\uFF1F");
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      const emptyData = vue.ref("\u6682\u65E0\u6392\u73ED\u5185\u5FEB\u9012\u5458");
      const anotherCourierId = vue.ref("");
      const searchVal = vue.ref("");
      let page = vue.reactive({
        keyword: "",
        page: 1,
        pageSize: 10
      });
      let itemData2 = vue.ref([]);
      onReachBottom(() => {
        if (pageNum.value >= pages.value) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNum.value++;
            getList();
          }, 1e3);
        }
      });
      const getList = async () => {
        reload.value = true;
        await getSameAgency(page).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              reload.value = false;
              if (res2.data.items) {
                itemData2.value = itemData2.value.concat(res2.data.items);
                pages.value = res2.data.pages;
                if (Number(pages.value) === pageNum.value) {
                  loadMore.value.status = "noMore";
                }
              }
            } else {
              itemData2.value = null;
            }
          }
        });
      };
      const handleOpen = (id) => {
        anotherCourierId.value = id;
        popup2.value.dialogOpen();
      };
      const handleClick = async () => {
        let ids = [];
        for (const [key, value] of users.selectTaskData) {
          ids.push(value);
        }
        let params = {
          anotherCourierId: anotherCourierId.value,
          idList: ids
        };
        await transferBatch(params).then((res2) => {
          if (res2.code === 200) {
            uni.navigateTo({
              url: "/pages/pickup/index"
            });
            return uni.showToast({
              title: "\u8F6C\u5355\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        });
      };
      const handleSearch = () => {
        page.keyword = searchVal.value;
        itemData2.value = [];
        getList();
      };
      const handleCancel = () => {
        searchVal.value = "";
        store2.commit("user/setIsDelivery", false);
        store2.commit("user/setTabIndex", 0);
        clearData();
        if (users.isDelivery) {
          uni.redirectTo({
            url: "/pages/delivery/index"
          });
        } else {
          uni.redirectTo({
            url: "/pages/pickup/index"
          });
        }
      };
      const clearData = () => {
        store2.commit("user/setDeliveryData", []);
        store2.commit("user/setPages", 0);
        store2.commit("user/setSelectTaskData", /* @__PURE__ */ new Map());
      };
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createElementVNode("view", { class: "navBox" }, [
            vue.createElementVNode("view", { class: "search" }, [
              vue.createCommentVNode(" \u5934\u90E8\u81EA\u5B9A\u4E49\u5BFC\u822A "),
              vue.createElementVNode("view", { class: "uni-navbar" }, [
                vue.createElementVNode("view", { class: "input-view" }, [
                  vue.createVNode(_component_uni_icons, {
                    class: "input-uni-icon",
                    type: "search",
                    size: "18",
                    color: "#999"
                  }),
                  vue.withDirectives(vue.createElementVNode("input", {
                    "confirm-type": "search",
                    class: "nav-bar-input",
                    type: "text",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchVal.value = $event),
                    placeholder: "\u8BF7\u8F93\u5165\u5FEB\u9012\u5458\u8D26\u53F7\u67E5\u8BE2",
                    onInput: handleSearch
                  }, null, 544), [
                    [vue.vModelText, searchVal.value]
                  ]),
                  vue.createCommentVNode(" \u5148\u4FDD\u7559\uFF0C\u540E\u671F\u53EF\u80FD\u8981\u52A0\u6B21\u529F\u80FD "),
                  vue.createCommentVNode(' <view class="scanIcon" @click="handleQr"></view> ')
                ]),
                vue.unref(isShowCancel) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "concelBox",
                  onClick: handleCancel
                }, "\u53D6\u6D88")) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createCommentVNode(" end ")
            ])
          ]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "boxTop" }, [
            vue.unref(itemData2).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "btnBox turnBox"
            }, [
              vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData2), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "boxBg",
                    key: index,
                    onClick: ($event) => handleOpen(item.userId)
                  }, [
                    vue.createElementVNode("view", { class: "turnItem" }, [
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("view", null, vue.toDisplayString(item.employeeNumber), 1),
                        vue.createElementVNode("view", null, vue.toDisplayString(item.name), 1)
                      ])
                    ])
                  ], 8, ["onClick"]);
                }), 128)),
                vue.createVNode(ReachBottom, {
                  ref_key: "loadMore",
                  ref: loadMore
                }, null, 512)
              ])
            ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createVNode(EmptyPage, {
                emptyData: emptyData.value,
                emptyImage: "emptyImage"
              }, null, 8, ["emptyData"])
            ])),
            vue.createCommentVNode(" \u63D0\u793A\u7A97\u793A\u4F8B "),
            vue.createVNode(UniPopup, {
              ref_key: "popup",
              ref: popup2,
              tipInfo: tipInfo.value,
              onHandleClick: handleClick
            }, null, 8, ["tipInfo"]),
            vue.createCommentVNode(" end ")
          ])
        ], 64);
      };
    }
  };
  var PagesTurnorderIndex = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-566d70cb"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/turnorder/index.vue"]]);
  const _sfc_main$i = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const taskId = users.taskId;
      const title = vue.ref("\u8BA2\u5355\u53D6\u6D88\u539F\u56E0\u7533\u8BF7");
      let reasonDesc = vue.ref("");
      let reason = users.reasonVal.label !== "" ? users.reasonVal.label : "";
      const detailsData = vue.ref({});
      vue.onMounted(() => {
        if (users.reasonDesc !== "") {
          reasonDesc.value = users.reasonDesc;
        }
        getDetails(taskId);
      });
      const getDetails = async (id) => {
        await getDetail(id).then((res2) => {
          detailsData.value = res2.data;
        });
      };
      const monitorInput = () => {
        vue.nextTick(() => {
          let leng = validateTextLength(reasonDesc.value);
          if (leng > 100) {
            reasonDesc.value = reasonDesc.value.substring(0, 100);
          }
        });
      };
      const handleSubmit = async () => {
        if (reason !== "") {
          const params = {
            id: taskId,
            reason: users.reasonVal.value,
            reasonDesc: reasonDesc.value
          };
          await taskCancel(params).then((res2) => {
            store2.commit("user/setTabIndex", 0);
            uni.redirectTo({
              url: "/pages/pickup/index"
            });
            if (res2.code === 200) {
              goBack();
              return uni.showToast({
                title: "\u7533\u8BF7\u6210\u529F!",
                duration: 1e3,
                icon: "none"
              });
            }
          });
        } else {
          return uni.showToast({
            title: "\u8BF7\u9009\u62E9\u53D6\u6D88\u539F\u56E0!",
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleCause = () => {
        store2.commit("user/setReasonDesc", reasonDesc.value);
        uni.navigateTo({
          url: "/pages/cancel/cause"
        });
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/pickup/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "pageBox" }, [
            vue.createElementVNode("view", { class: "boxCon concelBox" }, [
              vue.createElementVNode("view", { class: "tabConList" }, [
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("text", null, "\u5BC4\u4EF6\u4EBA\uFF1A"),
                  vue.createElementVNode("view", null, vue.toDisplayString(detailsData.value.senderName), 1)
                ]),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("text", null, "\u8BA2\u5355\u53F7\uFF1A"),
                  vue.createElementVNode("view", null, vue.toDisplayString(detailsData.value.orderId), 1)
                ]),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("text", null, "\u5BC4\u4EF6\u4EBA\u5730\u5740\uFF1A"),
                  vue.createElementVNode("view", null, vue.toDisplayString(detailsData.value.senderAddress), 1)
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "boxCon concelBox" }, [
              vue.createElementVNode("view", { class: "tabConList" }, [
                vue.createElementVNode("view", {
                  class: "item",
                  onClick: handleCause
                }, [
                  vue.createElementVNode("text", null, "\u8BA2\u5355\u53D6\u6D88\u539F\u56E0"),
                  vue.createElementVNode("view", { class: "cause" }, [
                    vue.createTextVNode(vue.toDisplayString(vue.unref(reason)) + " ", 1),
                    vue.createElementVNode("icon", { class: "nextIcon" })
                  ])
                ]),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("view", null, [
                    vue.withDirectives(vue.createElementVNode("textarea", {
                      placeholder: "\u8BA2\u5355\u53D6\u6D88\u539F\u56E0\u63CF\u8FF0\uFF1A",
                      "placeholder-class": _ctx.placeholderClass,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(reasonDesc) ? reasonDesc.value = $event : reasonDesc = $event),
                      onInput: monitorInput
                    }, null, 40, ["placeholder-class"]), [
                      [vue.vModelText, vue.unref(reasonDesc)]
                    ])
                  ])
                ])
              ])
            ]),
            vue.createElementVNode("view", { class: "btnBox" }, [
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["btn-default uni-mini", vue.unref(reason) === "" || !vue.unref(reason) ? "disabled" : ""]),
                onClick: handleSubmit,
                disabled: vue.unref(reason) === "" || !vue.unref(reason)
              }, " \u786E\u5B9A ", 10, ["disabled"])
            ])
          ])
        ], 64);
      };
    }
  };
  var PagesCancelIndex = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-3ce92776"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/cancel/index.vue"]]);
  const _sfc_main$h = {
    __name: "cause",
    setup(__props) {
      const store2 = useStore();
      const title = vue.ref("\u8BA2\u5355\u53D6\u6D88\u539F\u56E0");
      const baseData = vue.reactive(cancelData);
      const handleClick = (item) => {
        let isRedistribute = false;
        if (item.value === 8) {
          isRedistribute = true;
        }
        store2.commit("user/setReasonVal", item);
        store2.commit("user/setRedistribute", isRedistribute);
        uni.redirectTo({
          url: "/pages/cancel/index"
        });
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/cancel/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "pageBox" }, [
            vue.createElementVNode("view", { class: "boxCon concelBox" }, [
              vue.createElementVNode("view", { class: "tabConList conCenter" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(baseData, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "item",
                    key: index,
                    onClick: ($event) => handleClick(item)
                  }, [
                    vue.createElementVNode("view", null, vue.toDisplayString(item.label), 1)
                  ], 8, ["onClick"]);
                }), 128))
              ])
            ])
          ])
        ], 64);
      };
    }
  };
  var PagesCancelCause = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-17014f8d"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/cancel/cause.vue"]]);
  const _sfc_main$g = {
    __name: "address",
    props: {
      detailsData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      let taskType = users.taskType;
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "boxBg" }, [
          vue.createElementVNode("view", { class: "addressCon" }, [
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("view", { class: "sendIcon" }, vue.toDisplayString(vue.unref(taskType) === 1 ? "\u53D6" : "\u6D3E"), 1),
              vue.createElementVNode("view", { class: "addressInfo" }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(__props.detailsData.senderName), 1),
                  vue.createTextVNode(vue.toDisplayString(__props.detailsData.senderPhone), 1)
                ]),
                vue.createElementVNode("view", null, vue.toDisplayString(__props.detailsData.senderAddress), 1)
              ])
            ]),
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("view", { class: "receiveIcon" }, vue.toDisplayString(vue.unref(taskType) === 1 ? "\u6D3E" : "\u6536"), 1),
              vue.createElementVNode("view", { class: "addressInfo" }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(__props.detailsData.receiverName), 1),
                  vue.createTextVNode(vue.toDisplayString(__props.detailsData.receiverPhone), 1)
                ]),
                vue.createElementVNode("view", null, vue.toDisplayString(__props.detailsData.receiverAddress), 1)
              ])
            ]),
            vue.createElementVNode("view", { class: "line" })
          ])
        ]);
      };
    }
  };
  var Address = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/components/address.vue"]]);
  const _sfc_main$f = {
    __name: "authentication",
    props: {
      detailsData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props, { expose }) {
      const customForm = vue.ref();
      const store2 = useStore();
      const users = store2.state.user;
      let idCard = vue.ref("");
      let name = vue.ref("");
      let isValidate = vue.ref(false);
      let flag = vue.ref(null);
      vue.onMounted(() => {
        if (users.cardData) {
          name.value = users.cardData.name;
          name.idCard = users.cardData.idCard;
          flag.value = true;
        }
      });
      const handleIdcard = () => {
        const validate = validateIdentityCard(idCard.value);
        if (validate) {
          isValidate.value = true;
        } else {
          return uni.showToast({
            title: validate,
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleCheck = async () => {
        const params = {
          name: name.value,
          idCard: idCard.value
        };
        store2.commit("user/setCardData", params);
        await idCardCheck(params).then((res2) => {
          if (res2.code === 200) {
            flag.value = res2.data.flag;
            return uni.showToast({
              title: "\u9A8C\u8BC1\u6210\u529F",
              duration: 1e3,
              icon: "none"
            });
          }
        });
      };
      expose({
        customForm,
        idCard,
        name,
        isValidate
      });
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "boxBg" }, [
          vue.createElementVNode("view", { class: "tit" }, [
            __props.detailsData.idCardNoVerify === 0 && !vue.unref(flag) ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, [
              vue.createTextVNode(" \u8EAB\u4EFD\u9A8C\u8BC1\uFF08\u672A\u9A8C\u8BC1\uFF09 "),
              vue.createElementVNode("icon", { class: "iconTip" })
            ])) : __props.detailsData.idCardNoVerify === 1 || vue.unref(flag) ? (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, [
              vue.createTextVNode(" \u8EAB\u4EFD\u9A8C\u8BC1\uFF08\u9A8C\u8BC1\u901A\u8FC7\uFF09 "),
              vue.createCommentVNode(" TODO \u5148\u4FDD\u7559"),
              vue.createCommentVNode(' <icon class="iconTip"></icon> ')
            ])) : (vue.openBlock(), vue.createElementBlock("text", { key: 2 }, [
              vue.createTextVNode(" \u8EAB\u4EFD\u9A8C\u8BC1\uFF08\u9A8C\u8BC1\u672A\u901A\u8FC7\uFF09 "),
              vue.createElementVNode("icon", { class: "iconTip" })
            ]))
          ]),
          __props.detailsData.idCardNoVerify !== 1 && !vue.unref(flag) ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "identityBox"
          }, [
            vue.createElementVNode("view", null, [
              vue.createVNode(_component_uni_forms, {
                ref_key: "customForm",
                ref: customForm
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_forms_item, { name: "name" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item",
                        modelValue: vue.unref(name),
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(name) ? name.value = $event : name = $event),
                        placeholder: "\u8BF7\u8F93\u5165\u771F\u5B9E\u59D3\u540D"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_uni_forms_item, { name: "idCard" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item",
                        modelValue: vue.unref(idCard),
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(idCard) ? idCard.value = $event : idCard = $event),
                        placeholder: "\u8BF7\u8F93\u5165\u8EAB\u4EFD\u8BC1\u53F7\u7801",
                        onBlur: handleIdcard
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 512),
              vue.createElementVNode("button", {
                class: "uni-btn concelBtn",
                onClick: handleCheck
              }, "\u9A8C\u8BC1")
            ])
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "identitySuccee"
          }, [
            vue.unref(name) !== "" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "text"
            }, vue.toDisplayString(vue.unref(name)), 1)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "text" }, vue.toDisplayString(vue.unref(idCard) !== "" ? vue.unref(idCard) : __props.detailsData.idCardNo), 1)
          ]))
        ]);
      };
    }
  };
  var Authentication = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/components/authentication.vue"]]);
  const _sfc_main$e = {
    __name: "uppop",
    props: {
      detailsData: {
        type: Object,
        default: () => ({})
      },
      type: {
        type: Number,
        default: 0
      }
    },
    setup(__props, { expose, emit }) {
      const props = __props;
      vue.watch(props, (newValue, olcValue) => {
        if (newValue !== void 0) {
          remark.value = newValue.detailsData.remark;
          if (newValue.type === 2) {
            if (newValue.detailsData.paymentMethod === 1) {
              current.value = 0;
            } else {
              current.value = 1;
            }
          }
        }
      });
      const popup2 = vue.ref();
      let current = vue.ref(0);
      let isActive = vue.ref(0);
      let otherData = vue.ref("");
      let goodNumVal = vue.ref(0);
      let remarkNumVal = vue.ref(0);
      let remark = vue.ref("");
      let goodMaxLength = vue.ref(10);
      let remarkMaxLength = vue.ref(30);
      let isShowGoodInfo = vue.ref(false);
      const handleSubmit = () => {
        if (props.type === 1) {
          let val = null;
          if (isShowGoodInfo.value) {
            if (otherData.value === "") {
              return uni.showToast({
                title: "\u8BF7\u8F93\u5165\u7269\u54C1\u4FE1\u606F",
                duration: 1e3,
                icon: "none"
              });
            }
            val = otherData.value;
          } else {
            val = GoodsData[isActive.value].label;
          }
          emit("getGoodType", val);
        } else if (props.type === 2) {
          emit("getPayMethod", PayMethodData[current.value].label);
        } else if (props.type === 3) {
          emit("getRemark", remark.value);
        } else {
          emit("getSignType", SignData[current.value].value);
        }
        dialogClose();
      };
      const checkbox = (index) => {
        current.value = index;
      };
      const handleActive = (index, item) => {
        if (item.label === "\u5176\u4ED6") {
          isShowGoodInfo.value = true;
        } else {
          isShowGoodInfo.value = false;
        }
        isActive.value = index;
      };
      const dialogOpen = () => {
        popup2.value.open();
      };
      const dialogClose = () => {
        popup2.value.close();
      };
      const monitorInput = () => {
        vue.nextTick(() => {
          let leng = validateTextLength(otherData.value);
          if (leng >= 10) {
            goodMaxLength.value = leng;
          } else {
            goodMaxLength.value = 20;
          }
          goodNumVal.value = Math.floor(leng);
        });
      };
      const textInput = () => {
        vue.nextTick(() => {
          let leng = validateTextLength(remark.value);
          if (leng >= 30) {
            remarkMaxLength.value = leng;
          } else {
            remarkMaxLength.value = 60;
          }
          remarkNumVal.value = Math.floor(leng);
        });
      };
      expose({
        dialogOpen,
        current
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "uniPopup detailPopup" }, [
          vue.createVNode(_component_uni_popup, {
            ref_key: "popup",
            ref: popup2,
            type: "bottom"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, vue.toDisplayString(__props.type === 1 ? "\u7269\u54C1\u540D\u79F0" : __props.type === 2 ? "\u4ED8\u6B3E\u65B9\u5F0F" : __props.type === 3 ? "\u5907\u6CE8" : "\u7B7E\u6536\u4EBA"), 1),
                vue.createElementVNode("icon", { onClick: dialogClose }, "\u5173\u95ED")
              ]),
              vue.createElementVNode("view", { class: "popupContent" }, [
                vue.createCommentVNode(" \u7269\u54C1\u540D\u79F0 "),
                __props.type === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                  vue.createElementVNode("view", { class: "goodBox" }, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(GoodsData), (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        key: index,
                        class: vue.normalizeClass(["item", index === vue.unref(isActive) ? "active" : ""]),
                        onClick: ($event) => handleActive(index, item)
                      }, [
                        vue.createElementVNode("text", null, vue.toDisplayString(item.label), 1)
                      ], 10, ["onClick"]);
                    }), 128))
                  ]),
                  vue.unref(isShowGoodInfo) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "other"
                  }, [
                    vue.withDirectives(vue.createElementVNode("textarea", {
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(otherData) ? otherData.value = $event : otherData = $event),
                      placeholder: "\u8BF7\u8F93\u5165\u7269\u54C1\u4FE1\u606F",
                      onInput: monitorInput,
                      maxlength: vue.unref(goodMaxLength)
                    }, null, 40, ["maxlength"]), [
                      [vue.vModelText, vue.unref(otherData)]
                    ]),
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["numText", vue.unref(goodNumVal) === 0 ? "tip" : ""])
                    }, vue.toDisplayString(vue.unref(goodNumVal)) + "/10", 3)
                  ])) : vue.createCommentVNode("v-if", true)
                ])) : __props.type === 2 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createCommentVNode(" end "),
                  vue.createCommentVNode(" \u4ED8\u6B3E\u65B9\u5F0F "),
                  vue.createElementVNode("view", null, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(PayMethodData), (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "typeItem",
                        key: index,
                        onClick: ($event) => checkbox(index)
                      }, [
                        vue.createElementVNode("text", null, vue.toDisplayString(item.label), 1),
                        vue.createElementVNode("view", { class: "checkRadio" }, [
                          vue.createElementVNode("radio", {
                            value: String(index),
                            class: vue.normalizeClass(index === vue.unref(current) ? "active" : ""),
                            checked: index === vue.unref(current)
                          }, null, 10, ["value", "checked"])
                        ])
                      ], 8, ["onClick"]);
                    }), 128))
                  ])
                ], 2112)) : __props.type === 3 ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                  vue.createCommentVNode(" end "),
                  vue.createCommentVNode(" \u5907\u6CE8 "),
                  vue.createElementVNode("view", { class: "remark" }, [
                    vue.withDirectives(vue.createElementVNode("textarea", {
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(remark) ? remark.value = $event : remark = $event),
                      placeholder: "\u8865\u5145\u8BF4\u660E",
                      onInput: textInput,
                      maxlength: vue.unref(remarkMaxLength)
                    }, null, 40, ["maxlength"]), [
                      [vue.vModelText, vue.unref(remark)]
                    ]),
                    vue.createElementVNode("text", {
                      class: vue.normalizeClass(["numText", vue.unref(remarkNumVal) === 0 ? "tip" : ""])
                    }, vue.toDisplayString(vue.unref(remarkNumVal)) + "/30", 3)
                  ])
                ], 2112)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
                  vue.createCommentVNode(" end "),
                  vue.createCommentVNode(" \u7B7E\u6536\u4EBA "),
                  vue.createElementVNode("view", null, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(SignData), (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "typeItem",
                        key: index,
                        onClick: ($event) => checkbox(index)
                      }, [
                        vue.createElementVNode("text", null, vue.toDisplayString(item.label), 1),
                        vue.createElementVNode("view", { class: "checkRadio" }, [
                          vue.createElementVNode("radio", {
                            value: String(index),
                            class: vue.normalizeClass(index === vue.unref(current) ? "active" : ""),
                            checked: index === vue.unref(current)
                          }, null, 10, ["value", "checked"])
                        ])
                      ], 8, ["onClick"]);
                    }), 128))
                  ])
                ], 2112)),
                vue.createCommentVNode(" end ")
              ]),
              vue.createElementVNode("view", { class: "btnBox" }, [
                vue.createElementVNode("button", {
                  class: "btn-default uni-mini",
                  onClick: handleSubmit
                }, " \u786E\u5B9A ")
              ])
            ]),
            _: 1
          }, 512)
        ]);
      };
    }
  };
  var Uppop$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/components/uppop.vue"]]);
  const _sfc_main$d = {
    __name: "index",
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const goods = vue.ref();
      const card = vue.ref();
      const method = vue.ref();
      const taskId = store2.state.user.taskId;
      const title = vue.ref("\u53BB\u53D6\u4EF6");
      let type = vue.ref(1);
      const detailsData = vue.ref({});
      let isFreigthEdit = vue.ref(false);
      let freight = vue.ref(0);
      let isPickUp = vue.ref(false);
      let isCollect = vue.ref(false);
      const stopClick = vue.ref(false);
      vue.watch(freight, (newValue, oldValue) => {
        const val = Number(newValue);
        vue.nextTick(() => {
          if (val < 99999 && val > 1) {
            freight.value = parseInt(val * 100) / 100;
          }
          if (val > 99999) {
            freight.value = 99999;
          }
        });
      });
      vue.onMounted(() => {
        getDetails(taskId);
        if (users.isPickUp) {
          isPickUp.value = true;
        } else {
          isPickUp.value = false;
        }
        if (users.isCollect) {
          isCollect.value = true;
        } else {
          isCollect.value = false;
        }
      });
      const getDetails = async (id) => {
        await getDetail(id).then((res2) => {
          detailsData.value = res2.data;
          freight.value = detailsData.value.freight;
          if (users.paymentMethod) {
            if (users.paymentMethod === 1) {
              detailsData.value.paymentMethod = 1;
            } else {
              detailsData.value.paymentMethod = 2;
            }
          }
          goods.value.weight = Number(detailsData.value.weight);
          goods.value.volume = Number(detailsData.value.volume);
          store2.commit("user/setPaymentMethod", detailsData.value.paymentMethod);
          store2.commit("user/setDetailsData", res2.data);
        });
      };
      const handleSubmit = async () => {
        if (stopClick.value) {
          return;
        }
        stopClick.value = true;
        const cards = card.value;
        const good = goods.value;
        if (!cards.isValidate && detailsData.value.idCardNoVerify !== 1) {
          return uni.showToast({
            title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u8EAB\u4EFD\u8BC1",
            duration: 1e3,
            icon: "none"
          });
        } else {
          const details = detailsData.value;
          if (freight.value !== 0) {
            details.freight = freight.value;
          }
          const params = {
            amount: good.freightData ? good.freightData : Number(details.freight),
            id: taskId,
            goodName: details.goodsType,
            idCard: details.idCardNoVerify === 1 ? null : cards.idCard,
            name: details.idCardNoVerify === 1 ? null : cards.name,
            payMethod: details.paymentMethod,
            remark: details.remark,
            volume: Number(good.volume),
            weight: good.weight
          };
          const payData = {
            memo: details.remark,
            productOrderNo: details.orderId,
            tradingAmount: params.amount
          };
          store2.commit("user/setPayData", payData);
          await getPickup(params).then((res2) => {
            if (res2.code === 200)
              ;
            stopClick.value = false;
          }).catch((err) => {
            return uni.showToast({
              title: err.msg,
              duration: 1e3,
              icon: "none"
            });
          });
          const type2 = details.paymentMethod;
          uni.redirectTo({
            url: "/pages/pay/index?type=" + type2
          });
          store2.commit("user/setIsPickUp", true);
        }
      };
      const handleCopy = () => {
        uni.setClipboardData({
          data: detailsData.value.orderId,
          success: function() {
            uni.showToast({
              title: "\u590D\u5236\u6210\u529F",
              icon: "none"
            });
          }
        });
      };
      const handleFreight = () => {
        isFreigthEdit.value = true;
      };
      const getFreight = (val) => {
        detailsData.value.freight = val;
        freight.value = detailsData.value.freight;
      };
      const handleAmount = () => {
        vue.nextTick(() => {
          if (freight.value < 1) {
            freight.value = 1;
          }
        });
      };
      const getGoodType = (val) => {
        detailsData.value.goodsType = val;
      };
      const handleGoods = () => {
        type.value = 1;
        handleOpen();
      };
      const getPayMethod = (val) => {
        if (val === "\u5BC4\u4ED8") {
          detailsData.value.paymentMethod = 1;
        } else {
          detailsData.value.paymentMethod = 2;
        }
        store2.commit("user/setPaymentMethod", detailsData.value.paymentMethod);
      };
      const handlePayMethod = () => {
        type.value = 2;
        handleOpen();
      };
      const getRemark = (val) => {
        detailsData.value.remark = val;
      };
      const handleRemark = () => {
        if (users.isBack !== "collect") {
          type.value = 3;
          handleOpen();
        }
      };
      const handleOpen = () => {
        method.value.dialogOpen();
      };
      const goBack = () => {
        store2.commit("user/setPaymentMethod", null);
        store2.commit("user/setCardData", null);
        store2.commit("user/setIsPickUp", false);
        store2.commit("user/setIsCollect", false);
        if (users.newType === 301) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u53D6\u4EF6\u76F8\u5173&type=301"
          });
        } else if (users.detailType === 1) {
          store2.commit("user/setTabIndex", 0);
          uni.redirectTo({
            url: "/pages/history/index"
          });
        } else if (users.isSearch) {
          store2.commit("user/setIsSearch", false);
          uni.redirectTo({
            url: "/pages/search/index"
          });
        } else {
          store2.commit("user/setTabIndex", 0);
          uni.redirectTo({
            url: "/pages/pickup/index"
          });
        }
      };
      const handleReceipt = () => {
        store2.commit("user/setPayData", {});
        uni.redirectTo({
          url: "/pages/pay/scanPay"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "detailBox" }, [
            vue.createCommentVNode(" \u8BA2\u5355\u53F7 "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, [
                  vue.createElementVNode("text", null, "\u8BA2\u5355\u53F7\uFF1ASD" + vue.toDisplayString(detailsData.value.orderId), 1),
                  vue.createElementVNode("icon", {
                    onClick: handleCopy,
                    class: "copy"
                  })
                ])
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u53D6\u4EF6\u4FE1\u606F "),
            vue.createVNode(Address, {
              detailsData: detailsData.value,
              class: "pickupBox"
            }, null, 8, ["detailsData"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u7269\u54C1\u4FE1\u606F "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "\u7269\u54C1\u540D\u79F0"),
                !vue.unref(isPickUp) || vue.unref(users).paymentMethod === 2 && !vue.unref(isCollect) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "goodsSelect",
                  onClick: handleGoods
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.goodsType), 1),
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "goodsSelect"
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.goodsType), 1)
                ]))
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u8BA1\u7B97\u7269\u54C1\u5FEB\u9012\u8D39 "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createVNode(GoodsInfo, {
                ref_key: "goods",
                ref: goods,
                detailsData: detailsData.value,
                onGetFreight: getFreight
              }, null, 8, ["detailsData"]),
              vue.createElementVNode("view", { class: "freight" }, [
                vue.createElementVNode("view", null, [
                  vue.createTextVNode(" \u603B\u8BA1\u91D1\u989D "),
                  vue.createElementVNode("text", null, [
                    vue.createElementVNode("text", null, "*"),
                    vue.createTextVNode(" \u57FA\u7840\u8FD0\u8D39+\u589E\u503C\u670D\u52A1\u8D39 ")
                  ])
                ]),
                vue.createElementVNode("view", null, [
                  !vue.unref(isPickUp) || vue.unref(users).paymentMethod === 2 && !vue.unref(isCollect) ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                    vue.unref(isFreigthEdit) ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
                      key: 0,
                      type: "number",
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(freight) ? freight.value = $event : freight = $event),
                      onBlur: handleAmount
                    }, null, 544)), [
                      [vue.vModelText, vue.unref(freight)]
                    ]) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      onClick: handleFreight
                    }, vue.toDisplayString(detailsData.value.freight), 1)),
                    vue.createElementVNode("text", null, "\u5143")
                  ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(users).payData.tradingAmount), 1),
                    vue.createElementVNode("text", null, "\u5143")
                  ]))
                ])
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u4ED8\u6B3E\u65B9\u5F0F "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "\u4ED8\u6B3E\u65B9\u5F0F"),
                !vue.unref(isPickUp) || vue.unref(users).paymentMethod === 2 && !vue.unref(isCollect) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "goodsSelect",
                  onClick: handlePayMethod
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.paymentMethod === 1 ? "\u5BC4\u4ED8" : "\u5230\u4ED8"), 1),
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "goodsSelect"
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.paymentMethod === 1 ? "\u5BC4\u4ED8" : "\u5230\u4ED8"), 1)
                ]))
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u5907\u6CE8 "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "\u5907\u6CE8"),
                !vue.unref(isPickUp) || vue.unref(users).paymentMethod === 2 && !vue.unref(isCollect) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "goodsSelect",
                  onClick: handleRemark
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.remark), 1),
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "goodsSelect"
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.remark), 1)
                ]))
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u8EAB\u4EFD\u9A8C\u8BC1\uFF08\u672A\u9A8C\u8BC1\uFF09 "),
            vue.createVNode(Authentication, {
              ref_key: "card",
              ref: card,
              detailsData: detailsData.value
            }, null, 8, ["detailsData"]),
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "btnBox" }, [
              vue.unref(isPickUp) && vue.unref(users).paymentMethod === 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                class: "btn-default uni-mini",
                onClick: handleReceipt
              }, "\u53BB\u6536\u6B3E")) : vue.createCommentVNode("v-if", true),
              vue.unref(isCollect) && vue.unref(isPickUp) && vue.unref(users).paymentMethod === 2 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 1,
                class: "btn-default uni-mini btn-forbid"
              }, "\u5DF2\u53D6\u4EF6")) : vue.createCommentVNode("v-if", true),
              !vue.unref(isPickUp) || vue.unref(users).paymentMethod === 2 && !vue.unref(isCollect) ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 2,
                class: "btn-default uni-mini",
                onClick: handleSubmit
              }, "\u53BB\u53D6\u4EF6")) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createCommentVNode(" \u7269\u54C1\u540D\u79F0\u3001\u4ED8\u6B3E\u9009\u62E9\u3001\u5907\u6CE8\u5F39\u5C42 "),
            vue.createVNode(Uppop$1, {
              ref_key: "method",
              ref: method,
              onGetGoodType: getGoodType,
              onGetPayMethod: getPayMethod,
              onGetRemark: getRemark,
              detailsData: detailsData.value,
              type: vue.unref(type)
            }, null, 8, ["detailsData", "type"]),
            vue.createCommentVNode(" end ")
          ])
        ], 64);
      };
    }
  };
  var PagesDetailsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-54d3589c"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/index.vue"]]);
  const _sfc_main$c = {
    __name: "waybill",
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const taskStatus = users.taskStatus;
      const sign = vue.ref();
      const taskId = users.taskId;
      const title = users.taskStatus === 4 || taskStatus === 0 && users.taskType === 2 ? "\u53BB\u6D3E\u4EF6" : "\u8FD0\u5355\u8BE6\u60C5";
      let detailsData = vue.ref({});
      let type = vue.ref(0);
      let isPickUp = vue.ref(false);
      vue.ref(false);
      let isSign = vue.ref(false);
      const stopClick = vue.ref(false);
      vue.onMounted(() => {
        getDetails(taskId);
        if (users.isPickUp) {
          isPickUp.value = true;
        } else {
          isPickUp.value = false;
        }
        if (users.isSign) {
          isSign.value = true;
        } else {
          isSign.value = false;
        }
      });
      const getDetails = async (id) => {
        await getDetail(id).then((res2) => {
          detailsData.value = res2.data;
          store2.commit("user/setPaymentMethod", detailsData.value.paymentMethod);
          store2.commit("user/setDetailsData", res2.data);
        });
      };
      const handleRejection = async (id) => {
        if (stopClick.value) {
          return;
        }
        stopClick.value = true;
        await rejection(id).then((res2) => {
          if (res2.code === 200) {
            positionUploadHandle(true);
            setTimeout(() => {
              if (taskStatus === 6 && users.detailType === 2) {
                store2.commit("user/setTabIndex", 1);
                uni.redirectTo({
                  url: "/pages/history/index"
                });
              } else {
                store2.commit("user/setTabIndex", 0);
                uni.redirectTo({
                  url: "/pages/delivery/index"
                });
              }
            }, 1e3);
            uni.showToast({
              title: "\u7528\u6237\u62D2\u6536",
              icon: "none",
              duration: "1000"
            });
          }
          stopClick.value = false;
        }).catch((err) => {
          uni.showToast({
            title: err.msg,
            icon: "none",
            duration: "1000"
          });
        });
      };
      const handleSign = async (id) => {
        if (stopClick.value) {
          return;
        }
        stopClick.value = true;
        const params = {
          id,
          signRecipient: detailsData.value.signRecipient
        };
        await tasksSign(params).then((res2) => {
          if (res2.code === 200) {
            positionUploadHandle(true);
            const type2 = detailsData.value.paymentMethod;
            uni.redirectTo({
              url: "/pages/pay/index?type=" + type2
            });
            store2.commit("user/setIsPickUp", true);
            store2.commit("user/setIsDelivery", true);
          }
          stopClick.value = false;
        });
      };
      const handleCopy = () => {
        uni.setClipboardData({
          data: detailsData.value.orderId,
          success: function() {
            uni.showToast({
              title: "\u590D\u5236\u6210\u529F",
              icon: "none"
            });
          }
        });
      };
      const getSignType = (val) => {
        detailsData.value.signRecipient = val;
      };
      const handleSignOpen = () => {
        type.value = 4;
        sign.value.dialogOpen();
      };
      const handleOrder = () => {
        uni.redirectTo({
          url: "/pages/details/orderMap"
        });
      };
      const goBack = () => {
        store2.commit("user/setIsPickUp", false);
        store2.commit("user/setIsSign", false);
        store2.commit("user/setIsDelivery", false);
        if (taskStatus === 1 || taskStatus === 2 || taskStatus === 3) {
          if (taskStatus === 1) {
            store2.commit("user/setTabIndex", 0);
          } else if (taskStatus === 2) {
            store2.commit("user/setTabIndex", 1);
          } else {
            store2.commit("user/setTabIndex", 2);
          }
          if (users.isSearch) {
            store2.commit("user/setIsSearch", false);
            uni.redirectTo({
              url: "/pages/search/index"
            });
          } else {
            uni.redirectTo({
              url: "/pages/pickup/index"
            });
          }
        } else if (taskStatus === 5 && users.newType !== 302 && !users.isNew || taskStatus === 4 && users.detailType !== 2 && users.newType !== 304) {
          if (taskStatus === 4) {
            store2.commit("user/setTabIndex", 0);
          } else {
            store2.commit("user/setTabIndex", 1);
          }
          if (users.isSearch) {
            store2.commit("user/setIsSearch", false);
            uni.redirectTo({
              url: "/pages/search/index"
            });
          } else {
            uni.redirectTo({
              url: "/pages/delivery/index"
            });
          }
        } else if ((taskStatus === 6 || taskStatus === 4) && users.detailType === 2 || users.detailType === 1 && users.newType !== 302 || taskStatus === 6 && users.detailType === 1) {
          if (taskStatus === 6 && users.detailType === 1) {
            store2.commit("user/setTabIndex", 0);
          }
          if (taskStatus === 6 && users.detailType === 2) {
            store2.commit("user/setTabIndex", 1);
          }
          uni.redirectTo({
            url: "/pages/history/index"
          });
          if (taskStatus === 4 && users.detailType === 2) {
            store2.commit("user/setTabIndex", 1);
            if (users.isSearch) {
              store2.commit("user/setIsSearch", false);
              uni.redirectTo({
                url: "/pages/search/index"
              });
            } else {
              uni.redirectTo({
                url: "/pages/history/index"
              });
            }
          }
          if (taskStatus === 4 && users.detailType === 1) {
            store2.commit("user/setTabIndex", 0);
            uni.redirectTo({
              url: "/pages/delivery/index"
            });
          }
        } else if (users.newType === 301) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u53D6\u4EF6\u76F8\u5173&type=301"
          });
        } else if (users.newType === 302) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u7B7E\u6536\u63D0\u9192&type=302"
          });
        } else if (users.newType === 303) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u5FEB\u4EF6\u53D6\u6D88&type=303"
          });
        } else if (users.newType === 304) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u6D3E\u4EF6\u76F8\u5173&type=304"
          });
        } else {
          store2.commit("user/setTabIndex", 0);
          uni.redirectTo({
            url: "/pages/delivery/index"
          });
        }
        store2.commit("user/setIsNew", false);
      };
      const handleReceipt = () => {
        store2.commit("user/setPayData", {});
        uni.redirectTo({
          url: "/pages/pay/scanPay"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: vue.unref(title),
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "detailBox" }, [
            vue.createCommentVNode(" \u8FD0\u5355\u53F7 "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, [
                  vue.createCommentVNode(" \u5F53\u72B6\u6001\u662F\u53BB\u6D3E\u90014\\\u7B7E\u65365\u7684\u65F6\u5019\u663E\u793A\u8FD0\u5355\u53F7 "),
                  vue.unref(taskStatus) === 4 || vue.unref(taskStatus) === 5 ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(vue.unref(detailsData).transportOrderId), 1)) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "\u8BA2\u5355\u53F7\uFF1ASD" + vue.toDisplayString(vue.unref(detailsData).orderId), 1)),
                  vue.createCommentVNode(" end "),
                  vue.createElementVNode("icon", {
                    onClick: handleCopy,
                    class: "copy"
                  })
                ])
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u53D6\u4EF6\u4FE1\u606F "),
            vue.createVNode(Address, {
              detailsData: vue.unref(detailsData),
              class: "pickupBox"
            }, null, 8, ["detailsData"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u7269\u54C1\u4FE1\u606F "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "wayCon" }, [
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createTextVNode(" \u7269\u54C1\u540D\u79F0 "),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(detailsData).goodsType), 1)
                ]),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createTextVNode(" \u7269\u54C1\u91CD\u91CF "),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(detailsData).weight) + "kg", 1)
                ]),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createTextVNode(" \u7269\u54C1\u4F53\u79EF "),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(detailsData).volume) + "m\xB3", 1)
                ]),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createTextVNode(" \u603B\u8BA1\u91D1\u989D "),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(detailsData).freight) + "\u5143", 1)
                ])
              ]),
              vue.createElementVNode("view", { class: "wayCon remark" }, [
                vue.createElementVNode("view", { class: "item" }, "\u5907\u6CE8"),
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(detailsData).remark ? vue.unref(detailsData).remark : "\u6682\u65E0"), 1)
                ])
              ]),
              vue.createElementVNode("view", { class: "wayCon" }, [
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createTextVNode(" \u4ED8\u6B3E\u65B9\u5F0F "),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(detailsData).paymentMethod === 1 ? "\u5BC4\u4ED8" : "\u5230\u4ED8"), 1)
                ]),
                vue.createCommentVNode(" \u5F53\u72B6\u6001\u662F\u5DF2\u7B7E\u65365,\u663E\u793A\u7B7E\u6536\u4EBA "),
                vue.unref(taskStatus) === 5 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "item"
                }, [
                  vue.createTextVNode(" \u7B7E\u6536\u4EBA "),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(detailsData).paymentMethod === 1 ? "\u672C\u4EBA" : "\u4EE3\u6536"), 1)
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" end ")
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u5F53\u72B6\u6001\u662F\u53BB\u6D3E\u4EF64\u7684\u65F6\u5019\u663E\u793A\u7B7E\u6536\u4EBA\u9009\u62E9\u3001\u62D2\u6536\u3001\u7B7E\u6536\u6309\u94AE "),
            vue.unref(detailsData).taskType === 2 && vue.unref(detailsData).status === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "boxBg"
            }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "\u7B7E\u6536\u4EBA"),
                vue.unref(isSign) && vue.unref(detailsData).paymentMethod == 1 || vue.unref(isPickUp) && vue.unref(detailsData).paymentMethod === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "goodsSelect"
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(vue.unref(detailsData).signRecipient === 1 ? "\u672C\u4EBA" : "\u4EE3\u6536"), 1)
                ])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "goodsSelect",
                  onClick: handleSignOpen
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(vue.unref(detailsData).signRecipient === 1 ? "\u672C\u4EBA" : "\u4EE3\u6536"), 1),
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ]))
              ])
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" 		{{detailsData.status}}--{{users.isNew}}--{{taskStatus}} "),
            vue.createCommentVNode(' <view\r\n			class="btnBox subBtnBox"\r\n			v-if="(detailsData.status===1&&!users.isNew)||(taskStatus === 4&&!users.isNew) || (taskStatus === 0 && users.taskType === 2) || (users.detailType === 2 && taskStatus === 4) || (detailsData.status===1&&users.detailType === 2 && taskStatus === 6)"\r\n		>\r\n			<button v-if="(!isSign && !isPickUp) || (isSign && !isPickUp && detailsData.paymentMethod === 2)" class="btn-default uni-sub-btn" @click="handleRejection(detailsData.id)">\r\n				\u62D2\u6536\r\n			</button>\r\n			<button v-if="!isPickUp" class="btn-default" @click="handleSign(detailsData.id)">\u7B7E\u6536</button>\r\n			<button v-if="isPickUp && detailsData.paymentMethod === 2" class="btn-default uni-mini" @click="handleReceipt">\u53BB\u6536\u6B3E</button>\r\n			<button v-if="isSign && detailsData.paymentMethod == 1" class="btn-default uni-mini btn-forbid">\u5DF2\u7B7E\u6536</button>\r\n		</view> '),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u5F53\u72B6\u6001\u662F\u5DF2\u53D6\u4EF62\u6216\u8005\u5DF2\u7B7E\u65365\u663E\u793A\u8DDF\u8E2A\u6309\u94AE ||(taskStatus === 6&&users.taskType===2)"),
            vue.createCommentVNode(' <view class="btnBox" v-if="(detailsData.status===2&&users.isNew)||(taskStatus === 2&&users.isNew) || taskStatus === 5 || (users.detailType === 2 && taskStatus === 6 &&users.isNew) || (users.detailType === 1 && taskStatus === 6)">\r\n			<button class="btn-default uni-mini" @click="handleOrder">\u8BA2\u5355\u8DDF\u8E2A</button>\r\n		</view> '),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u4ED8\u6B3E\u65B9\u5F0FpaymentMethod\uFF1A1\u5BC4\u4ED8\uFF0C2\u5230\u4ED8 "),
            vue.createCommentVNode(" \u4ED8\u6B3E\u72B6\u6001paymentStatus\uFF1A1\u672A\u4ED8\uFF0C2\u5DF2\u4ED8 "),
            vue.createCommentVNode(" \u7B7E\u6536\u72B6\u6001signStatus\uFF1A1\u4E3A\u5DF2\u7B7E\u6536\uFF0C2\u4E3A\u62D2\u6536 "),
            vue.createCommentVNode(" \u4EFB\u52A1\u7C7B\u578BtaskType\uFF1A1\u4E3A\u53D6\u4EF6\u4EFB\u52A1\uFF0C2\u4E3A\u6D3E\u4EF6\u4EFB\u52A1 "),
            vue.createCommentVNode(" \u4EFB\u52A1\u72B6\u6001status\uFF1A1\u672A\u53D6\u6D3E\uFF0C2\u5B8C\u6210\uFF0C3\u53D6\u6D88 \u672A\u6D3E\u4EF6\u7684\u60C5\u51B5\u4E0B\u663E\u793A\u7684\u6309\u94AE "),
            vue.createCommentVNode(" \u6D3E\u4EF6 "),
            vue.unref(detailsData).taskType === 2 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
              vue.createCommentVNode(" \u672A\u6D3E\u4EF6\u672A\u7B7E\u6536"),
              vue.unref(detailsData).status === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "btnBox subBtnBox"
              }, [
                vue.unref(detailsData).signStatus !== 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 0,
                  class: "btn-default uni-sub-btn",
                  onClick: _cache[0] || (_cache[0] = ($event) => handleRejection(vue.unref(detailsData).id))
                }, "\u62D2\u6536")) : vue.createCommentVNode("v-if", true),
                vue.unref(detailsData).signStatus !== 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                  key: 1,
                  class: "btn-default",
                  onClick: _cache[1] || (_cache[1] = ($event) => handleSign(vue.unref(detailsData).id))
                }, "\u7B7E\u6536")) : vue.createCommentVNode("v-if", true)
              ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                vue.createCommentVNode(" end "),
                vue.createCommentVNode(" \u5DF2\u7ECF\u6D3E\u4EF6\u672A\u4ED8\u6B3E\u6216\u8005\u5DF2\u7ECF\u7B7E\u6536 "),
                vue.createElementVNode("view", { class: "btnBox subBtnBox" }, [
                  vue.createCommentVNode(" \u7B7E\u6536\u540E\u672A\u4ED8\u6B3E\uFF0CisPickUp\u4EE3\u8868\u672A\u6536\u6B3E\u8FDB\u5165\u6536\u6B3E\u9875\uFF0C\u8FD4\u56DE\u65F6\u5019\u7684\u663E\u793A\u53BB\u6536\u6B3E\u6309\u94AE "),
                  vue.createCommentVNode(" \u5DF2\u7B7E\u6536\u5230\u7684\u8BA2\u5355\u4ED8\u4F46\u662F\u672A\u4ED8\u6B3E \u5E94\u8BE5\u663E\u793A\u53BB\u6536\u6B3E"),
                  vue.unref(isPickUp) && vue.unref(detailsData).paymentStatus === 1 && vue.unref(detailsData).paymentMethod === 2 && vue.unref(detailsData).signStatus === 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                    key: 0,
                    class: "btn-default uni-mini",
                    onClick: handleReceipt
                  }, " \u53BB\u6536\u6B3E ")) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" \u7B7E\u6536\u72B6\u6001\u662F\u5DF2\u7B7E\u6536\uFF0C\u663E\u793A\u5DF2\u7B7E\u6536\u6309\u94AE "),
                  vue.createCommentVNode(" isSign\u4EE3\u8868\u5DF2\u7ECF\u70B9\u51FB\u4E86\u7B7E\u6536\uFF0C\u8FDB\u5165\u5230\u4E86\u6D3E\u4EF6\u6210\u529F\u9875\uFF0C\u8FD4\u56DE\u7684\u65F6\u5019\u8981\u663E\u793A\u5DF2\u7ECF\u7B7E\u6536 "),
                  vue.unref(isSign) && vue.unref(detailsData).signStatus === 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                    key: 1,
                    class: "btn-default uni-mini btn-forbid"
                  }, "\u5DF2\u7B7E\u6536")) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" \u5F53\u72B6\u6001\u662F\u5DF2\u7B7E\u6536\u663E\u793A\u8DDF\u8E2A\u6309\u94AE"),
                  vue.createCommentVNode(" \u5DF2\u6D3E\u4EF6 "),
                  vue.unref(detailsData).status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "btnBox"
                  }, [
                    vue.createCommentVNode(" \u672A\u4ED8\u6B3E\u3001\u4ECE\u6D88\u606F\u7B7E\u6536\u63D0\u9192 "),
                    !vue.unref(isPickUp) && !vue.unref(isSign) && vue.unref(detailsData).paymentMethod === 1 || vue.unref(users).isNew || !vue.unref(isPickUp) && !vue.unref(isSign) && vue.unref(detailsData).paymentMethod === 2 && vue.unref(detailsData).paymentStatus === 1 || !vue.unref(isPickUp) && !vue.unref(isSign) && vue.unref(detailsData).paymentMethod === 2 && vue.unref(detailsData).paymentStatus === 2 && vue.unref(detailsData).signStatus == 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 0,
                      class: "btn-default uni-mini",
                      onClick: handleOrder
                    }, " \u8BA2\u5355\u8DDF\u8E2A ")) : vue.createCommentVNode("v-if", true)
                  ])) : vue.createCommentVNode("v-if", true)
                ])
              ], 2112)),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" end ")
            ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
              vue.createCommentVNode(" \u53D6\u4EF6 "),
              vue.createElementVNode("view", null, [
                vue.createCommentVNode(" \u5F53\u72B6\u6001\u662F\u5DF2\u53D6\u4EF6\u663E\u793A\u8DDF\u8E2A\u6309\u94AE"),
                vue.unref(detailsData).status === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "btnBox"
                }, [
                  vue.createElementVNode("button", {
                    class: "btn-default uni-mini",
                    onClick: handleOrder
                  }, "\u8BA2\u5355\u8DDF\u8E2A")
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" end ")
              ])
            ], 2112)),
            vue.createCommentVNode(" \u7269\u54C1\u540D\u79F0\u3001\u4ED8\u6B3E\u9009\u62E9\u3001\u5907\u6CE8\u5F39\u5C42 "),
            vue.createVNode(Uppop$1, {
              ref_key: "sign",
              ref: sign,
              onGetSignType: getSignType,
              type: vue.unref(type)
            }, null, 8, ["type"]),
            vue.createCommentVNode(" end ")
          ])
        ], 64);
      };
    }
  };
  var PagesDetailsWaybill = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-6bc258c0"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/waybill.vue"]]);
  const _sfc_main$b = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1].$page.options;
      const type = currentPage.type;
      const handleBack = () => {
        if (users.isDelivery) {
          if (users.taskStatus === 6 && users.detailType === 2) {
            store2.commit("user/setTabIndex", 1);
            uni.redirectTo({
              url: "/pages/history/index"
            });
          } else {
            uni.redirectTo({
              url: "/pages/delivery/index"
            });
          }
        } else {
          if (users.taskStatus === 6) {
            uni.redirectTo({
              url: "/pages/history/index"
            });
          } else {
            uni.redirectTo({
              url: "/pages/pickup/index"
            });
          }
        }
        store2.commit("user/setIsPickUp", false);
        store2.commit("user/setIsSign", false);
      };
      const goBack = () => {
        if (users.isDelivery) {
          if (users.paymentMethod === 2) {
            store2.commit("user/setIsCollect", true);
          } else {
            store2.commit("user/setIsSign", true);
          }
          uni.redirectTo({
            url: "/pages/details/waybill"
          });
        } else {
          if (users.paymentMethod === 2) {
            store2.commit("user/setIsCollect", true);
          }
          uni.redirectTo({
            url: "/pages/details/index"
          });
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: vue.unref(users).isDelivery ? "\u7B7E\u6536\u6210\u529F" : "\u53D6\u4EF6\u6210\u529F",
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "pickUp" }, [
            vue.createElementVNode("icon"),
            vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(users).isDelivery ? "\u7B7E\u6536\u6210\u529F" : "\u53D6\u4EF6\u6210\u529F"), 1),
            vue.unref(users).isDelivery ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "btnBox"
            }, [
              vue.unref(type) === "2" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                key: 0,
                url: "/pages/pay/scanPay?pay=true",
                "open-type": "redirect"
              }, "\u53BB\u6536\u6B3E")) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "navigator-wrap",
                onClick: handleBack
              }, "\u8FD4\u56DE\u4E3B\u9875"))
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "btnBox"
            }, [
              vue.unref(type) === "1" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                key: 0,
                url: "/pages/pay/scanPay?pay=true",
                "open-type": "redirect"
              }, "\u53BB\u6536\u6B3E")) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "navigator-wrap",
                onClick: handleBack
              }, "\u8FD4\u56DE\u4E3B\u9875"))
            ]))
          ])
        ], 64);
      };
    }
  };
  var PagesPayIndex = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-32f2f1fc"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pay/index.vue"]]);
  let uQRCode = {};
  (function() {
    function QR8bitByte(data) {
      this.mode = QRMode.MODE_8BIT_BYTE;
      this.data = data;
    }
    QR8bitByte.prototype = {
      getLength: function(buffer) {
        return this.data.length;
      },
      write: function(buffer) {
        for (var i2 = 0; i2 < this.data.length; i2++) {
          buffer.put(this.data.charCodeAt(i2), 8);
        }
      }
    };
    function QRCode(typeNumber, errorCorrectLevel) {
      this.typeNumber = typeNumber;
      this.errorCorrectLevel = errorCorrectLevel;
      this.modules = null;
      this.moduleCount = 0;
      this.dataCache = null;
      this.dataList = new Array();
    }
    QRCode.prototype = {
      addData: function(data) {
        var newData = new QR8bitByte(data);
        this.dataList.push(newData);
        this.dataCache = null;
      },
      isDark: function(row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
          throw new Error(row + "," + col);
        }
        return this.modules[row][col];
      },
      getModuleCount: function() {
        return this.moduleCount;
      },
      make: function() {
        if (this.typeNumber < 1) {
          var typeNumber = 1;
          for (typeNumber = 1; typeNumber < 40; typeNumber++) {
            var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
            var buffer = new QRBitBuffer();
            var totalDataCount = 0;
            for (var i2 = 0; i2 < rsBlocks.length; i2++) {
              totalDataCount += rsBlocks[i2].dataCount;
            }
            for (var i2 = 0; i2 < this.dataList.length; i2++) {
              var data = this.dataList[i2];
              buffer.put(data.mode, 4);
              buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
              data.write(buffer);
            }
            if (buffer.getLengthInBits() <= totalDataCount * 8)
              break;
          }
          this.typeNumber = typeNumber;
        }
        this.makeImpl(false, this.getBestMaskPattern());
      },
      makeImpl: function(test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new Array(this.moduleCount);
        for (var row = 0; row < this.moduleCount; row++) {
          this.modules[row] = new Array(this.moduleCount);
          for (var col = 0; col < this.moduleCount; col++) {
            this.modules[row][col] = null;
          }
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);
        if (this.typeNumber >= 7) {
          this.setupTypeNumber(test);
        }
        if (this.dataCache == null) {
          this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        }
        this.mapData(this.dataCache, maskPattern);
      },
      setupPositionProbePattern: function(row, col) {
        for (var r = -1; r <= 7; r++) {
          if (row + r <= -1 || this.moduleCount <= row + r)
            continue;
          for (var c = -1; c <= 7; c++) {
            if (col + c <= -1 || this.moduleCount <= col + c)
              continue;
            if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      },
      getBestMaskPattern: function() {
        var minLostPoint = 0;
        var pattern2 = 0;
        for (var i2 = 0; i2 < 8; i2++) {
          this.makeImpl(true, i2);
          var lostPoint = QRUtil.getLostPoint(this);
          if (i2 == 0 || minLostPoint > lostPoint) {
            minLostPoint = lostPoint;
            pattern2 = i2;
          }
        }
        return pattern2;
      },
      createMovieClip: function(target_mc, instance_name, depth) {
        var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
        var cs = 1;
        this.make();
        for (var row = 0; row < this.modules.length; row++) {
          var y = row * cs;
          for (var col = 0; col < this.modules[row].length; col++) {
            var x = col * cs;
            var dark = this.modules[row][col];
            if (dark) {
              qr_mc.beginFill(0, 100);
              qr_mc.moveTo(x, y);
              qr_mc.lineTo(x + cs, y);
              qr_mc.lineTo(x + cs, y + cs);
              qr_mc.lineTo(x, y + cs);
              qr_mc.endFill();
            }
          }
        }
        return qr_mc;
      },
      setupTimingPattern: function() {
        for (var r = 8; r < this.moduleCount - 8; r++) {
          if (this.modules[r][6] != null) {
            continue;
          }
          this.modules[r][6] = r % 2 == 0;
        }
        for (var c = 8; c < this.moduleCount - 8; c++) {
          if (this.modules[6][c] != null) {
            continue;
          }
          this.modules[6][c] = c % 2 == 0;
        }
      },
      setupPositionAdjustPattern: function() {
        var pos = QRUtil.getPatternPosition(this.typeNumber);
        for (var i2 = 0; i2 < pos.length; i2++) {
          for (var j = 0; j < pos.length; j++) {
            var row = pos[i2];
            var col = pos[j];
            if (this.modules[row][col] != null) {
              continue;
            }
            for (var r = -2; r <= 2; r++) {
              for (var c = -2; c <= 2; c++) {
                if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                  this.modules[row + r][col + c] = true;
                } else {
                  this.modules[row + r][col + c] = false;
                }
              }
            }
          }
        }
      },
      setupTypeNumber: function(test) {
        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        for (var i2 = 0; i2 < 18; i2++) {
          var mod = !test && (bits >> i2 & 1) == 1;
          this.modules[Math.floor(i2 / 3)][i2 % 3 + this.moduleCount - 8 - 3] = mod;
        }
        for (var i2 = 0; i2 < 18; i2++) {
          var mod = !test && (bits >> i2 & 1) == 1;
          this.modules[i2 % 3 + this.moduleCount - 8 - 3][Math.floor(i2 / 3)] = mod;
        }
      },
      setupTypeInfo: function(test, maskPattern) {
        var data = this.errorCorrectLevel << 3 | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);
        for (var i2 = 0; i2 < 15; i2++) {
          var mod = !test && (bits >> i2 & 1) == 1;
          if (i2 < 6) {
            this.modules[i2][8] = mod;
          } else if (i2 < 8) {
            this.modules[i2 + 1][8] = mod;
          } else {
            this.modules[this.moduleCount - 15 + i2][8] = mod;
          }
        }
        for (var i2 = 0; i2 < 15; i2++) {
          var mod = !test && (bits >> i2 & 1) == 1;
          if (i2 < 8) {
            this.modules[8][this.moduleCount - i2 - 1] = mod;
          } else if (i2 < 9) {
            this.modules[8][15 - i2 - 1 + 1] = mod;
          } else {
            this.modules[8][15 - i2 - 1] = mod;
          }
        }
        this.modules[this.moduleCount - 8][8] = !test;
      },
      mapData: function(data, maskPattern) {
        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
          if (col == 6)
            col--;
          while (true) {
            for (var c = 0; c < 2; c++) {
              if (this.modules[row][col - c] == null) {
                var dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                }
                var mask = QRUtil.getMask(maskPattern, row, col - c);
                if (mask) {
                  dark = !dark;
                }
                this.modules[row][col - c] = dark;
                bitIndex--;
                if (bitIndex == -1) {
                  byteIndex++;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || this.moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
    };
    QRCode.PAD0 = 236;
    QRCode.PAD1 = 17;
    QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
      var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
      var buffer = new QRBitBuffer();
      for (var i2 = 0; i2 < dataList.length; i2++) {
        var data = dataList[i2];
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
        data.write(buffer);
      }
      var totalDataCount = 0;
      for (var i2 = 0; i2 < rsBlocks.length; i2++) {
        totalDataCount += rsBlocks[i2].dataCount;
      }
      if (buffer.getLengthInBits() > totalDataCount * 8) {
        throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
      }
      if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCode.PAD0, 8);
        if (buffer.getLengthInBits() >= totalDataCount * 8) {
          break;
        }
        buffer.put(QRCode.PAD1, 8);
      }
      return QRCode.createBytes(buffer, rsBlocks);
    };
    QRCode.createBytes = function(buffer, rsBlocks) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);
      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i2 = 0; i2 < dcdata[r].length; i2++) {
          dcdata[r][i2] = 255 & buffer.buffer[i2 + offset];
        }
        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i2 = 0; i2 < ecdata[r].length; i2++) {
          var modIndex = i2 + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i2] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }
      var totalCodeCount = 0;
      for (var i2 = 0; i2 < rsBlocks.length; i2++) {
        totalCodeCount += rsBlocks[i2].totalCount;
      }
      var data = new Array(totalCodeCount);
      var index = 0;
      for (var i2 = 0; i2 < maxDcCount; i2++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i2 < dcdata[r].length) {
            data[index++] = dcdata[r][i2];
          }
        }
      }
      for (var i2 = 0; i2 < maxEcCount; i2++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i2 < ecdata[r].length) {
            data[index++] = ecdata[r][i2];
          }
        }
      }
      return data;
    };
    var QRMode = {
      MODE_NUMBER: 1 << 0,
      MODE_ALPHA_NUM: 1 << 1,
      MODE_8BIT_BYTE: 1 << 2,
      MODE_KANJI: 1 << 3
    };
    var QRErrorCorrectLevel = {
      L: 1,
      M: 0,
      Q: 3,
      H: 2
    };
    var QRMaskPattern = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var QRUtil = {
      PATTERN_POSITION_TABLE: [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ],
      G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
      G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
      G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
      getBCHTypeInfo: function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
          d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
        }
        return (data << 10 | d) ^ QRUtil.G15_MASK;
      },
      getBCHTypeNumber: function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
          d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
        }
        return data << 12 | d;
      },
      getBCHDigit: function(data) {
        var digit = 0;
        while (data != 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      },
      getPatternPosition: function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
      },
      getMask: function(maskPattern, i2, j) {
        switch (maskPattern) {
          case QRMaskPattern.PATTERN000:
            return (i2 + j) % 2 == 0;
          case QRMaskPattern.PATTERN001:
            return i2 % 2 == 0;
          case QRMaskPattern.PATTERN010:
            return j % 3 == 0;
          case QRMaskPattern.PATTERN011:
            return (i2 + j) % 3 == 0;
          case QRMaskPattern.PATTERN100:
            return (Math.floor(i2 / 2) + Math.floor(j / 3)) % 2 == 0;
          case QRMaskPattern.PATTERN101:
            return i2 * j % 2 + i2 * j % 3 == 0;
          case QRMaskPattern.PATTERN110:
            return (i2 * j % 2 + i2 * j % 3) % 2 == 0;
          case QRMaskPattern.PATTERN111:
            return (i2 * j % 3 + (i2 + j) % 2) % 2 == 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      },
      getErrorCorrectPolynomial: function(errorCorrectLength) {
        var a = new QRPolynomial([1], 0);
        for (var i2 = 0; i2 < errorCorrectLength; i2++) {
          a = a.multiply(new QRPolynomial([1, QRMath.gexp(i2)], 0));
        }
        return a;
      },
      getLengthInBits: function(mode, type) {
        if (1 <= type && type < 10) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 10;
            case QRMode.MODE_ALPHA_NUM:
              return 9;
            case QRMode.MODE_8BIT_BYTE:
              return 8;
            case QRMode.MODE_KANJI:
              return 8;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 27) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 12;
            case QRMode.MODE_ALPHA_NUM:
              return 11;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 10;
            default:
              throw new Error("mode:" + mode);
          }
        } else if (type < 41) {
          switch (mode) {
            case QRMode.MODE_NUMBER:
              return 14;
            case QRMode.MODE_ALPHA_NUM:
              return 13;
            case QRMode.MODE_8BIT_BYTE:
              return 16;
            case QRMode.MODE_KANJI:
              return 12;
            default:
              throw new Error("mode:" + mode);
          }
        } else {
          throw new Error("type:" + type);
        }
      },
      getLostPoint: function(qrCode) {
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        for (var row = 0; row < moduleCount; row++) {
          for (var col = 0; col < moduleCount; col++) {
            var sameCount = 0;
            var dark = qrCode.isDark(row, col);
            for (var r = -1; r <= 1; r++) {
              if (row + r < 0 || moduleCount <= row + r) {
                continue;
              }
              for (var c = -1; c <= 1; c++) {
                if (col + c < 0 || moduleCount <= col + c) {
                  continue;
                }
                if (r == 0 && c == 0) {
                  continue;
                }
                if (dark == qrCode.isDark(row + r, col + c)) {
                  sameCount++;
                }
              }
            }
            if (sameCount > 5) {
              lostPoint += 3 + sameCount - 5;
            }
          }
        }
        for (var row = 0; row < moduleCount - 1; row++) {
          for (var col = 0; col < moduleCount - 1; col++) {
            var count = 0;
            if (qrCode.isDark(row, col))
              count++;
            if (qrCode.isDark(row + 1, col))
              count++;
            if (qrCode.isDark(row, col + 1))
              count++;
            if (qrCode.isDark(row + 1, col + 1))
              count++;
            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          }
        }
        for (var row = 0; row < moduleCount; row++) {
          for (var col = 0; col < moduleCount - 6; col++) {
            if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
              lostPoint += 40;
            }
          }
        }
        for (var col = 0; col < moduleCount; col++) {
          for (var row = 0; row < moduleCount - 6; row++) {
            if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
              lostPoint += 40;
            }
          }
        }
        var darkCount = 0;
        for (var col = 0; col < moduleCount; col++) {
          for (var row = 0; row < moduleCount; row++) {
            if (qrCode.isDark(row, col)) {
              darkCount++;
            }
          }
        }
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
      }
    };
    var QRMath = {
      glog: function(n) {
        if (n < 1) {
          throw new Error("glog(" + n + ")");
        }
        return QRMath.LOG_TABLE[n];
      },
      gexp: function(n) {
        while (n < 0) {
          n += 255;
        }
        while (n >= 256) {
          n -= 255;
        }
        return QRMath.EXP_TABLE[n];
      },
      EXP_TABLE: new Array(256),
      LOG_TABLE: new Array(256)
    };
    for (var i = 0; i < 8; i++) {
      QRMath.EXP_TABLE[i] = 1 << i;
    }
    for (var i = 8; i < 256; i++) {
      QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
    }
    for (var i = 0; i < 255; i++) {
      QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
    }
    function QRPolynomial(num, shift) {
      if (num.length == void 0) {
        throw new Error(num.length + "/" + shift);
      }
      var offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset++;
      }
      this.num = new Array(num.length - offset + shift);
      for (var i2 = 0; i2 < num.length - offset; i2++) {
        this.num[i2] = num[i2 + offset];
      }
    }
    QRPolynomial.prototype = {
      get: function(index) {
        return this.num[index];
      },
      getLength: function() {
        return this.num.length;
      },
      multiply: function(e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i2 = 0; i2 < this.getLength(); i2++) {
          for (var j = 0; j < e.getLength(); j++) {
            num[i2 + j] ^= QRMath.gexp(QRMath.glog(this.get(i2)) + QRMath.glog(e.get(j)));
          }
        }
        return new QRPolynomial(num, 0);
      },
      mod: function(e) {
        if (this.getLength() - e.getLength() < 0) {
          return this;
        }
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        var num = new Array(this.getLength());
        for (var i2 = 0; i2 < this.getLength(); i2++) {
          num[i2] = this.get(i2);
        }
        for (var i2 = 0; i2 < e.getLength(); i2++) {
          num[i2] ^= QRMath.gexp(QRMath.glog(e.get(i2)) + ratio);
        }
        return new QRPolynomial(num, 0).mod(e);
      }
    };
    function QRRSBlock(totalCount, dataCount) {
      this.totalCount = totalCount;
      this.dataCount = dataCount;
    }
    QRRSBlock.RS_BLOCK_TABLE = [
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12],
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];
    QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
      var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
      if (rsBlock == void 0) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
      }
      var length = rsBlock.length / 3;
      var list = new Array();
      for (var i2 = 0; i2 < length; i2++) {
        var count = rsBlock[i2 * 3 + 0];
        var totalCount = rsBlock[i2 * 3 + 1];
        var dataCount = rsBlock[i2 * 3 + 2];
        for (var j = 0; j < count; j++) {
          list.push(new QRRSBlock(totalCount, dataCount));
        }
      }
      return list;
    };
    QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
      switch (errorCorrectLevel) {
        case QRErrorCorrectLevel.L:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
        case QRErrorCorrectLevel.M:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
        case QRErrorCorrectLevel.Q:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
        case QRErrorCorrectLevel.H:
          return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    function QRBitBuffer() {
      this.buffer = new Array();
      this.length = 0;
    }
    QRBitBuffer.prototype = {
      get: function(index) {
        var bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
      },
      put: function(num, length) {
        for (var i2 = 0; i2 < length; i2++) {
          this.putBit((num >>> length - i2 - 1 & 1) == 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    function utf16To8(text) {
      var result = "";
      var c;
      for (var i2 = 0; i2 < text.length; i2++) {
        c = text.charCodeAt(i2);
        if (c >= 1 && c <= 127) {
          result += text.charAt(i2);
        } else if (c > 2047) {
          result += String.fromCharCode(224 | c >> 12 & 15);
          result += String.fromCharCode(128 | c >> 6 & 63);
          result += String.fromCharCode(128 | c >> 0 & 63);
        } else {
          result += String.fromCharCode(192 | c >> 6 & 31);
          result += String.fromCharCode(128 | c >> 0 & 63);
        }
      }
      return result;
    }
    uQRCode = {
      errorCorrectLevel: QRErrorCorrectLevel,
      defaults: {
        size: 354,
        margin: 0,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "png",
        errorCorrectLevel: QRErrorCorrectLevel.H,
        typeNumber: -1
      },
      make: function(options) {
        return new Promise((reslove, reject) => {
          var defaultOptions = {
            canvasId: options.canvasId,
            componentInstance: options.componentInstance,
            text: options.text,
            size: this.defaults.size,
            margin: this.defaults.margin,
            backgroundColor: this.defaults.backgroundColor,
            foregroundColor: this.defaults.foregroundColor,
            fileType: this.defaults.fileType,
            errorCorrectLevel: this.defaults.errorCorrectLevel,
            typeNumber: this.defaults.typeNumber
          };
          if (options) {
            for (var i2 in options) {
              defaultOptions[i2] = options[i2];
            }
          }
          options = defaultOptions;
          if (!options.canvasId) {
            formatAppLog("error", "at utils/uqrcode.js:1296", "uQRCode: Please set canvasId!");
            return;
          }
          function createCanvas() {
            var qrcode = new QRCode(options.typeNumber, options.errorCorrectLevel);
            qrcode.addData(utf16To8(options.text));
            qrcode.make();
            var ctx = uni.createCanvasContext(options.canvasId, options.componentInstance);
            ctx.setFillStyle(options.backgroundColor);
            ctx.fillRect(0, 0, options.size, options.size);
            var tileW = (options.size - options.margin * 2) / qrcode.getModuleCount();
            var tileH = tileW;
            for (var row = 0; row < qrcode.getModuleCount(); row++) {
              for (var col = 0; col < qrcode.getModuleCount(); col++) {
                var style = qrcode.isDark(row, col) ? options.foregroundColor : options.backgroundColor;
                ctx.setFillStyle(style);
                var x = Math.round(col * tileW) + options.margin;
                var y = Math.round(row * tileH) + options.margin;
                var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
                var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                ctx.fillRect(x, y, w, h);
              }
            }
            setTimeout(function() {
              ctx.draw(false, function() {
                setTimeout(function() {
                  uni.canvasToTempFilePath({
                    canvasId: options.canvasId,
                    fileType: options.fileType,
                    width: options.size,
                    height: options.size,
                    destWidth: options.size,
                    destHeight: options.size,
                    success: function(res2) {
                      let resData;
                      let tempFilePath = res2.tempFilePath;
                      const path = plus.io.convertLocalFileSystemURL(tempFilePath);
                      let fileReader = new plus.io.FileReader();
                      fileReader.readAsDataURL(path);
                      fileReader.onloadend = (res3) => {
                        resData = res3.target.result;
                        options.success && options.success(resData);
                        reslove(resData);
                      };
                    },
                    fail: function(error) {
                      options.fail && options.fail(error);
                      reject(error);
                    },
                    complete: function(res2) {
                      options.complete && options.complete(res2);
                    }
                  }, options.componentInstance);
                }, options.text.length + 100);
              }());
            }, 150);
          }
          createCanvas();
        });
      }
    };
  })();
  var uQRCode$1 = uQRCode;
  const _sfc_main$a = {
    __name: "uppop",
    props: {
      tipInfo: {
        type: String,
        default: ""
      }
    },
    setup(__props, { expose, emit }) {
      const uppop = vue.ref();
      const dialogOpen = () => {
        uppop.value.open();
      };
      const goList = () => {
        uni.navigateTo({
          url: "/pages/pickup/index"
        });
      };
      expose({
        dialogOpen
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createBlock(_component_uni_popup, {
          ref_key: "uppop",
          ref: uppop,
          type: "center",
          animation: false,
          class: "comPop",
          "mask-click": false
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "con" }, "\u7528\u6237\u5DF2\u652F\u4ED8\uFF01"),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("button", { onClick: goList }, "\u8FD4\u56DE\u4E3B\u9875")
            ])
          ]),
          _: 1
        }, 512);
      };
    }
  };
  var Uppop = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pay/components/uppop.vue"]]);
  const _sfc_main$9 = {
    __name: "scanPay",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const uppop = vue.ref();
      const title = vue.ref("\u626B\u7801\u652F\u4ED8");
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      currentPage.$page.options.type;
      const pay = currentPage.$page.options.pay;
      let current = vue.ref(0);
      let qrCodeImg = vue.ref("");
      let times = vue.ref(null);
      let detailsData = vue.ref({});
      let qrShow = vue.ref(false);
      vue.onMounted(() => {
        getDetails();
        times.value = setInterval(() => {
          getPaySucceed();
        }, 1e4);
      });
      const getPaySucceed = async () => {
        await paySucceed(users.detailsData.orderId).then((res2) => {
          if (res2.code === 200) {
            if (res2.data) {
              clearInterval(times.value);
              uppop.value.dialogOpen();
            }
          }
        });
      };
      const getDetails = async () => {
        await getDetail(users.taskId).then((res2) => {
          detailsData.value = res2.data;
          store2.commit("user/setDetailsData", detailsData.value);
          getCode(res2.data);
        });
      };
      const getCode = async (obj) => {
        let data = users.payData;
        let params = {};
        if (data.tradingAmount) {
          params = {
            memo: data.memo ? data.memo : "\u5907\u6CE8",
            payMethod: current.value === 0 ? 2 : 1,
            productOrderNo: data.productOrderNo,
            tradingAmount: data.tradingAmount
          };
        } else {
          params = {
            memo: obj.remark ? obj.remark : "\u5907\u6CE8",
            payMethod: current.value === 0 ? 2 : 1,
            productOrderNo: obj.orderId,
            tradingAmount: obj.freight
          };
        }
        await getQrCode(params).then((res2) => {
          const data2 = res2.data;
          const str = data2.qrCode.slice(0, 10);
          if (str === "data:image") {
            qrCodeImg.value = data2.qrCode.replace(/[\r\n]/g, "");
          } else {
            qrCodeFun(data2.qrCode);
          }
        });
      };
      const qrCodeFun = (valUrl) => {
        qrShow.value = true;
        uQRCode$1.make({
          canvasId: "qrcode",
          componentInstance: this,
          text: valUrl,
          size: 200,
          margin: 0,
          backgroundColor: "#ffffff",
          foregroundColor: "#000000",
          fileType: "jpg",
          errorCorrectLevel: uQRCode$1.errorCorrectLevel.H,
          success: (res2) => {
          }
        });
      };
      const checkbox = (index) => {
        current.value = index;
        getCode(detailsData.value);
      };
      const goBack = () => {
        clearInterval(times.value);
        if (users.isDelivery) {
          if (users.detailType === 2 && users.taskStatus === 6) {
            store2.commit("user/setTabIndex", 1);
            uni.redirectTo({
              url: "/pages/history/index"
            });
          } else if (users.detailType === 0 && users.taskStatus === 5) {
            store2.commit("user/setTabIndex", 1);
            uni.redirectTo({
              url: "/pages/delivery/index"
            });
          } else if (users.isPickUp && users.paymentMethod === 2 && !pay) {
            uni.redirectTo({
              url: "/pages/details/waybill"
            });
          } else {
            uni.redirectTo({
              url: "/pages/pay/index?type=" + users.paymentMethod
            });
            pay = false;
          }
        } else {
          if (users.detailType === 1 && users.taskStatus === 6) {
            store2.commit("user/setTabIndex", 0);
            uni.redirectTo({
              url: "/pages/history/index"
            });
          } else if (users.detailType === 2 && users.taskStatus === 3 && !users.isSearch) {
            store2.commit("user/setTabIndex", 1);
            uni.redirectTo({
              url: "/pages/pickup/index"
            });
          } else if (users.isPickUp && users.paymentMethod === 1 && !pay) {
            uni.redirectTo({
              url: "/pages/details/index"
            });
          } else if (users.isSearch) {
            store2.commit("user/setIsSearch", false);
            uni.redirectTo({
              url: "/pages/search/index"
            });
          } else {
            uni.redirectTo({
              url: "/pages/pay/index?type=" + users.paymentMethod
            });
            pay = false;
          }
        }
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "pageBox scanPay" }, [
            vue.createElementVNode("view", { class: "boxBg srCan" }, [
              vue.unref(qrShow) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "qr-box"
              }, [
                vue.createElementVNode("canvas", { "canvas-id": "qrcode" })
              ])) : (vue.openBlock(), vue.createElementBlock("image", {
                key: 1,
                src: vue.unref(qrCodeImg)
              }, null, 8, ["src"])),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createElementVNode("text", null, "\xA5"),
                vue.createTextVNode(" " + vue.toDisplayString(vue.unref(detailsData).freight), 1)
              ]),
              vue.createElementVNode("view", null, "\u652F\u4ED8\u8FD0\u8D39")
            ]),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(PayWayData), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "boxBg payBox",
                key: index
              }, [
                vue.createElementVNode("view", { class: "item" }, [
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("icon"),
                    vue.createTextVNode(" " + vue.toDisplayString(item.label), 1)
                  ]),
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("view", { class: "checkRadio" }, [
                      vue.createElementVNode("radio", {
                        value: String(index),
                        class: vue.normalizeClass(index === vue.unref(current) ? "active" : ""),
                        checked: index === vue.unref(current),
                        onClick: ($event) => checkbox(index)
                      }, null, 10, ["value", "checked", "onClick"])
                    ])
                  ])
                ])
              ]);
            }), 128))
          ]),
          vue.createCommentVNode(" \u652F\u4ED8\u6210\u529F\u5F39\u5C42 "),
          vue.createVNode(Uppop, {
            ref_key: "uppop",
            ref: uppop
          }, null, 512),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesPayScanPay = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-a4052eca"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pay/scanPay.vue"]]);
  const _sfc_main$8 = {
    __name: "BaseInfo",
    props: {
      baseData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      const handleQr = () => {
        uni.showToast({
          title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
          duration: 1e3,
          icon: "none"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "nav-bg mnav-bg" }, [
          vue.createElementVNode("view", { class: "headBg" }),
          vue.createElementVNode("view", { class: "header" }, [
            vue.createElementVNode("view", { class: "headBox" }, [
              vue.createElementVNode("view", { class: "head" }, [
                __props.baseData.avatar === "" ? (vue.openBlock(), vue.createElementBlock("icon", { key: 0 })) : (vue.openBlock(), vue.createElementBlock("image", {
                  key: 1,
                  src: __props.baseData.avatar
                }, null, 8, ["src"]))
              ]),
              vue.createElementVNode("view", { class: "info" }, [
                vue.createElementVNode("view", { class: "tit" }, vue.toDisplayString(__props.baseData.name), 1),
                vue.createElementVNode("view", null, vue.toDisplayString(__props.baseData.account), 1),
                vue.createElementVNode("view", { class: "address" }, [
                  vue.createElementVNode("icon"),
                  vue.createTextVNode(" " + vue.toDisplayString(__props.baseData.agencyName ? __props.baseData.agencyName : "\u6682\u65E0"), 1)
                ])
              ])
            ]),
            vue.createElementVNode("view", {
              class: "QR",
              onClick: handleQr
            }, [
              vue.createElementVNode("image", { src: "/static/qr.png" })
            ])
          ])
        ]);
      };
    }
  };
  var BaseInfo = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-1c1ce0bd"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/my/commponents/BaseInfo.vue"]]);
  const _sfc_main$7 = {
    name: "UniRate",
    props: {
      isFill: {
        type: [Boolean, String],
        default: true
      },
      color: {
        type: String,
        default: "#ececec"
      },
      activeColor: {
        type: String,
        default: "#ffca3e"
      },
      disabledColor: {
        type: String,
        default: "#c0c0c0"
      },
      size: {
        type: [Number, String],
        default: 24
      },
      value: {
        type: [Number, String],
        default: 0
      },
      modelValue: {
        type: [Number, String],
        default: 0
      },
      max: {
        type: [Number, String],
        default: 5
      },
      margin: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      readonly: {
        type: [Boolean, String],
        default: false
      },
      allowHalf: {
        type: [Boolean, String],
        default: false
      },
      touchable: {
        type: [Boolean, String],
        default: true
      }
    },
    data() {
      return {
        valueSync: "",
        userMouseFristMove: true,
        userRated: false,
        userLastRate: 1
      };
    },
    watch: {
      value(newVal) {
        this.valueSync = Number(newVal);
      },
      modelValue(newVal) {
        this.valueSync = Number(newVal);
      }
    },
    computed: {
      stars() {
        const value = this.valueSync ? this.valueSync : 0;
        const starList = [];
        const floorValue = Math.floor(value);
        const ceilValue = Math.ceil(value);
        for (let i = 0; i < this.max; i++) {
          if (floorValue > i) {
            starList.push({
              activeWitch: "100%"
            });
          } else if (ceilValue - 1 === i) {
            starList.push({
              activeWitch: (value - floorValue) * 100 + "%"
            });
          } else {
            starList.push({
              activeWitch: "0"
            });
          }
        }
        return starList;
      },
      marginNumber() {
        return Number(this.margin);
      }
    },
    created() {
      this.valueSync = Number(this.value || this.modelValue);
      this._rateBoxLeft = 0;
      this._oldValue = null;
    },
    mounted() {
      setTimeout(() => {
        this._getSize();
      }, 100);
    },
    methods: {
      touchstart(e) {
        if (this.readonly || this.disabled)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      touchmove(e) {
        if (this.readonly || this.disabled || !this.touchable)
          return;
        const {
          clientX,
          screenX
        } = e.changedTouches[0];
        this._getRateCount(clientX || screenX);
      },
      mousedown(e) {
      },
      mousemove(e) {
      },
      mouseleave(e) {
      },
      _getRateCount(clientX) {
        this._getSize();
        const size = Number(this.size);
        if (isNaN(size)) {
          return new Error("size \u5C5E\u6027\u53EA\u80FD\u8BBE\u7F6E\u4E3A\u6570\u5B57");
        }
        const rateMoveRange = clientX - this._rateBoxLeft;
        let index = parseInt(rateMoveRange / (size + this.marginNumber));
        index = index < 0 ? 0 : index;
        index = index > this.max ? this.max : index;
        const range = parseInt(rateMoveRange - (size + this.marginNumber) * index);
        let value = 0;
        if (this._oldValue === index && !this.PC)
          return;
        this._oldValue = index;
        if (this.allowHalf) {
          if (range > size / 2) {
            value = index + 1;
          } else {
            value = index + 0.5;
          }
        } else {
          value = index + 1;
        }
        value = Math.max(0.5, Math.min(value, this.max));
        this.valueSync = value;
        this._onChange();
      },
      _onChange() {
        this.$emit("input", this.valueSync);
        this.$emit("update:modelValue", this.valueSync);
        this.$emit("change", {
          value: this.valueSync
        });
      },
      _getSize() {
        uni.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((ret) => {
          if (ret) {
            this._rateBoxLeft = ret[0].left;
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", {
        ref: "uni-rate",
        class: "uni-rate"
      }, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.stars, (star, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: vue.normalizeClass(["uni-rate__icon", { "uni-cursor-not-allowed": $props.disabled }]),
            style: vue.normalizeStyle({ "margin-right": $options.marginNumber + "px" }),
            key: index,
            onTouchstart: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.touchstart && $options.touchstart(...args), ["stop"])),
            onTouchmove: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.touchmove && $options.touchmove(...args), ["stop"])),
            onMousedown: _cache[2] || (_cache[2] = vue.withModifiers((...args) => $options.mousedown && $options.mousedown(...args), ["stop"])),
            onMousemove: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.mousemove && $options.mousemove(...args), ["stop"])),
            onMouseleave: _cache[4] || (_cache[4] = (...args) => $options.mouseleave && $options.mouseleave(...args))
          }, [
            vue.createVNode(_component_uni_icons, {
              color: $props.color,
              size: $props.size,
              type: $props.isFill ? "star-filled" : "star"
            }, null, 8, ["color", "size", "type"]),
            vue.createElementVNode("view", {
              style: vue.normalizeStyle({ width: star.activeWitch }),
              class: "uni-rate__icon-on"
            }, [
              vue.createVNode(_component_uni_icons, {
                color: $props.disabled ? $props.disabledColor : $props.activeColor,
                size: $props.size,
                type: "star-filled"
              }, null, 8, ["color", "size"])
            ], 4)
          ], 38);
        }), 128))
      ], 512)
    ]);
  }
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render], ["__scopeId", "data-v-978a5ada"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-rate/components/uni-rate/uni-rate.vue"]]);
  const _sfc_main$6 = {
    __name: "Evaluate",
    props: {
      baseData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_uni_rate = resolveEasycom(vue.resolveDynamicComponent("uni-rate"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "boxBg headTop" }, [
          vue.createElementVNode("view", { class: "headItem" }, [
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("text", null, "\u6211\u7684\u8BC4\u4EF7"),
              vue.createElementVNode("view", { class: "star" }, [
                vue.createVNode(_component_uni_rate, {
                  readonly: true,
                  "allow-half": "",
                  value: 4.5,
                  "active-color": "#EF4F3F",
                  color: "#F4F4F4"
                }, null, 8, ["value"]),
                vue.createElementVNode("text", null, vue.toDisplayString(4.5), 1)
              ])
            ]),
            vue.createElementVNode("view", { class: "item" }, [
              vue.createElementVNode("text", null, "\u6392\u73ED\u65F6\u95F4"),
              (!__props.baseData.startTime || __props.baseData.startTime === "") && (!__props.baseData.endTime || __props.baseData.endTime === "") ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "\u65E0")) : (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, vue.toDisplayString(vue.unref(overTimeFormat)(__props.baseData.startTime)) + "-" + vue.toDisplayString(vue.unref(overTimeFormat)(__props.baseData.endTime)), 1))
            ])
          ])
        ]);
      };
    }
  };
  var Evaluate = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-e5f99d92"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/my/commponents/Evaluate.vue"]]);
  const _sfc_main$5 = {
    __name: "HistoryScope",
    setup(__props) {
      const store2 = useStore();
      const handleHistory = () => {
        store2.commit("user/setTabIndex", 0);
        store2.commit("user/setTaskStatus", -1);
        uni.navigateTo({
          url: "/pages/history/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "boxBg" }, [
          vue.createElementVNode("view", { class: "headItem" }, [
            vue.createElementVNode("view", {
              class: "item",
              onClick: handleHistory
            }, [
              vue.createElementVNode("text", null, "\u5168\u90E8\u53D6\u6D3E"),
              vue.createElementVNode("text", null, [
                vue.createElementVNode("icon", { class: "nextIcon" })
              ])
            ]),
            vue.createElementVNode("navigator", {
              url: "/pages/my/map",
              "open-type": "redirect"
            }, [
              vue.createElementVNode("view", { class: "item" }, [
                vue.createElementVNode("text", null, "\u4F5C\u4E1A\u8303\u56F4"),
                vue.createElementVNode("text", null, [
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ])
              ])
            ])
          ])
        ]);
      };
    }
  };
  var HistoryScope = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-f05c4784"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/my/commponents/HistoryScope.vue"]]);
  const _sfc_main$4 = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      let baseData = uni.getStorageSync("userInfo");
      const handleOut = () => {
        uni.removeStorageSync("token");
        uni.clearStorage();
        store2.commit("setFootStatus", 0);
        uni.redirectTo({
          url: "/pages/login/user"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "navFrame" }, [
            vue.createCommentVNode(" \u6211\u7684\u57FA\u672C\u4FE1\u606F "),
            vue.createVNode(BaseInfo, { baseData: vue.unref(baseData) }, null, 8, ["baseData"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u6211\u7684\u8BC4\u4EF7\u3001\u6392\u73ED\u65F6\u95F4 "),
            vue.createVNode(Evaluate, { baseData: vue.unref(baseData) }, null, 8, ["baseData"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u5386\u53F2\u53D6\u6D3E\u3001\u4F5C\u4E1A\u8303\u56F4 "),
            vue.createVNode(HistoryScope),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" \u9000\u51FA\u6309\u94AE "),
          vue.createElementVNode("view", { class: "footBtn" }, [
            vue.createElementVNode("view", { class: "btnBox" }, [
              vue.createElementVNode("button", {
                class: "btn-default",
                onClick: handleOut
              }, "\u9000\u51FA\u767B\u5F55")
            ])
          ]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" footer "),
          vue.createVNode(UniFooter, { pagePath: "pages/my/index" }),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesMyIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-4dcceeb0"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/my/index.vue"]]);
  const getUserScope = (params) => request({
    url: `/users/scope`,
    method: "get",
    params
  });
  const _sfc_main$3 = {
    __name: "map",
    setup(__props) {
      const title = vue.ref("\u4F5C\u4E1A\u8303\u56F4");
      const latitude = vue.ref(39.997534);
      const longitude = vue.ref(116.475334);
      const polygons = vue.reactive([
        {
          points: [
            {
              longitude: 116.475334,
              latitude: 39.997534
            },
            {
              longitude: 116.476627,
              latitude: 39.998315
            },
            {
              longitude: 116.478603,
              latitude: 39.99879
            },
            {
              longitude: 116.478529,
              latitude: 40.000296
            },
            {
              longitude: 116.475082,
              latitude: 40.000151
            },
            {
              longitude: 116.473421,
              latitude: 39.998717
            }
          ],
          fillColor: "#EF4F3F20",
          strokeColor: "#EF4F3F",
          strokeWidth: 2,
          zIndex: 1,
          dottedLine: true
        }
      ]);
      vue.onMounted(() => {
        getUserPolygon();
      });
      const getUserPolygon = async () => {
        await getUserScope().then((res2) => {
          if (res2.code === 200)
            ;
        });
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/my/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("map", {
              class: "mapBox",
              latitude: latitude.value,
              longitude: longitude.value,
              polygons,
              scale: "16"
            }, null, 8, ["latitude", "longitude", "polygons"])
          ])
        ], 64);
      };
    }
  };
  var PagesMyMap = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-4adb27b2"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/my/map.vue"]]);
  const _sfc_main$2 = {
    __name: "qrCode",
    setup(__props) {
      const title = vue.ref("\u4E13\u5C5E\u4E8C\u7EF4\u7801");
      vue.onMounted(() => {
      });
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/my/index"
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_rate = resolveEasycom(vue.resolveDynamicComponent("uni-rate"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "pageBox qrCode" }, [
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "qrHead" }, [
                vue.createElementVNode("view", { class: "head" }),
                vue.createElementVNode("view", { class: "info" }, [
                  vue.createElementVNode("view", { class: "tit" }, "\u795E\u9886\u5FEB\u9012\u5458-\u5F20\u5168\u86CB"),
                  vue.createElementVNode("view", { class: "star" }, [
                    vue.createVNode(_component_uni_rate, {
                      readonly: true,
                      "allow-half": "",
                      value: 4.5,
                      "active-color": "#EF4F3F",
                      color: "#F4F4F4"
                    }, null, 8, ["value"]),
                    vue.createElementVNode("text", null, "4.7")
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "img" }, [
                vue.createElementVNode("image", { src: "/static/scanPay.png" })
              ]),
              vue.createElementVNode("view", null, "\u626B\u7801\u5FEB\u901F\u4E0B\u5355")
            ])
          ])
        ], 64);
      };
    }
  };
  var PagesMyQrCode = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-699c7670"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/my/qrCode.vue"]]);
  const _sfc_main$1 = {
    __name: "orderMap",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const title = vue.ref("\u8BA2\u5355\u8DDF\u8E2A");
      vue.ref(39.91667);
      vue.ref(116.41667);
      const markers = vue.reactive([]);
      const polyline = vue.reactive([
        {
          points: [
            { longitude: 116.41667, latitude: 39.91667 },
            { longitude: 118.78333, latitude: 32.05 }
          ],
          color: "#EF4F3F",
          width: 12
        }
      ]);
      vue.onMounted(() => {
        getTrack();
      });
      const strInit = (value) => {
        let strText = value;
        let replaceText = [];
        for (let i = 0; i <= 10; i++) {
          replaceText.push("" + i);
        }
        value.split("\u3010")[1];
        for (let i = 0; i < replaceText.length; i++) {
          var replaceString = `<span class='red'>` + replaceText[i] + `</span>`;
          strText = strText.replace(RegExp(replaceText[i], "g"), replaceString);
        }
        strText = strText.replace(RegExp("red", "g"), "red");
        return strText;
      };
      const getTrack = async () => {
        await getTracks(users.detailsData.transportOrderId).then((res2) => {
          if (res2.code === 200) {
            markers.value = res2.data.reverse();
            polyline[0].points = res2.data.data;
          }
        });
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/details/waybill"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: goBack
          }, null, 8, ["title"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "bottmBox" }, [
              vue.createElementVNode("view", { class: "orderList" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(markers.value, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: vue.normalizeClass(["logistics-orderInfo logistics-orderInfo-item", [index === 0 ? "active" : ""]]),
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "logistics-orderInfo-left" }, [
                      ["\u5DF2\u62D2\u6536", "\u5DF2\u7B7E\u6536", "\u5DF2\u53D6\u4EF6"].includes(item.status) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "circle gray"
                      }, vue.toDisplayString(item.status === "\u5DF2\u62D2\u6536" ? "\u62D2" : item.status === "\u5DF2\u7B7E\u6536" ? "\u7B7E" : "\u53D6"), 1)) : index === 0 && ["\u8FD0\u9001\u4E2D", "\u6D3E\u9001\u4E2D"].includes(item.status) || index > 0 && markers.value[index - 1].status !== "\u8FD0\u9001\u4E2D" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "circle gray"
                      }, [
                        vue.createElementVNode("image", {
                          class: vue.normalizeClass(item.status === "\u6D3E\u9001\u4E2D" ? "ys" : "ps")
                        }, null, 2)
                      ])) : index > 0 && markers.value[index - 1].status === "\u8FD0\u9001\u4E2D" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 2,
                        class: "point"
                      })) : vue.createCommentVNode("v-if", true),
                      !(index === markers.value.length - 1) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 3,
                        class: vue.normalizeClass(["line", item.status === "\u8FD0\u9001\u4E2D" ? "short" : ""])
                      }, null, 2)) : vue.createCommentVNode("v-if", true)
                    ]),
                    vue.createElementVNode("view", { class: "logistics-orderInfo-right" }, [
                      !(index > 0 && markers.value[index - 1].status === "\u8FD0\u9001\u4E2D" && item.status === "\u8FD0\u9001\u4E2D") ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "status"
                      }, vue.toDisplayString(item.status), 1)) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("view", { class: "time" }, vue.toDisplayString(item.created), 1),
                      vue.createElementVNode("view", {
                        class: "desc",
                        innerHTML: strInit(item.info)
                      }, null, 8, ["innerHTML"])
                    ])
                  ], 2);
                }), 128))
              ])
            ]),
            vue.createCommentVNode(" TODO\u6B64\u5904\u4EE3\u7801\u4FDD\u7559 "),
            vue.createCommentVNode(` <map class="mapBox" :latitude="latitude" :longitude="longitude" scale="6">\r
			<cover-view class="bottmBox" v-if="markers.value">\r
				<cover-view class="orderList" scroll-top='0'>\r
					<cover-view class="logistics-orderInfo logistics-orderInfo-item" :class="[index===0?'active':'']" :key="index"\r
										v-for='(item,index) in markers.value'>\r
										<cover-view class="logistics-orderInfo-left">\r
											<cover-view class="circle" v-if="['\u5DF2\u62D2\u6536','\u5DF2\u7B7E\u6536','\u5DF2\u53D6\u4EF6'].includes(item.status)">\r
												<cover-view class="iconBg" ><cover-view class="fontPostion">{{item.status==='\u5DF2\u62D2\u6536'?'\u62D2':item.status==='\u5DF2\u7B7E\u6536'?'\u7B7E':'\u53D6'}}</cover-view></cover-view>\r
											</cover-view>\r
					\r
											<cover-view class="circle"\r
												v-else-if="index ===0 &&['\u8FD0\u9001\u4E2D','\u6D3E\u9001\u4E2D'].includes(item.status) || index>0 && markers.value[index-1].status !=='\u8FD0\u9001\u4E2D'">\r
												<cover-view class="iconBg" ><cover-image :src="item.status==='\u6D3E\u9001\u4E2D'?'../../static/yunshuzhong.png':'../../static/paisong.png'"></cover-image></cover-view>\r
											</cover-view>\r
					\r
											<cover-view class="point" v-else-if="index>0 && markers.value[index-1].status==='\u8FD0\u9001\u4E2D'"></cover-view>\r
					\r
											<cover-view class="line" v-if='!(index === markers.value.length - 1)'\r
												:class="item.status==='\u8FD0\u9001\u4E2D'?'short':''"></cover-view>\r
										</cover-view>\r
										<cover-view class="logistics-orderInfo-right">\r
											<cover-view class="status"\r
												v-if='!(index>0 && markers.value[index-1].status==="\u8FD0\u9001\u4E2D" &&item.status==="\u8FD0\u9001\u4E2D")'>\r
												{{item.status}}\r
											</cover-view>\r
											<cover-view class="time">{{item.created}}</cover-view>\r
											<cover-view class="desc"\r
												:class="index === 0|| item.status === 23010?'active':''"\r
												>{{item.info}}\r
											</cover-view>\r
										</cover-view>\r
									</cover-view>\r
				</cover-view>\r
			</cover-view>\r
		</map> `)
          ])
        ], 64);
      };
    }
  };
  var PagesDetailsOrderMap = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d6902958"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/orderMap.vue"]]);
  __definePage("pages/start/index", PagesStartIndex);
  __definePage("pages/login/user", PagesLoginUser);
  __definePage("pages/login/index", PagesLoginIndex);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/search/index", PagesSearchIndex);
  __definePage("pages/history/index", PagesHistoryIndex);
  __definePage("pages/news/index", PagesNewsIndex);
  __definePage("pages/news/detail", PagesNewsDetail);
  __definePage("pages/news/system", PagesNewsSystem);
  __definePage("pages/freight/index", PagesFreightIndex);
  __definePage("pages/delivery/index", PagesDeliveryIndex);
  __definePage("pages/pickup/index", PagesPickupIndex);
  __definePage("pages/turnorder/index", PagesTurnorderIndex);
  __definePage("pages/cancel/index", PagesCancelIndex);
  __definePage("pages/cancel/cause", PagesCancelCause);
  __definePage("pages/details/index", PagesDetailsIndex);
  __definePage("pages/details/waybill", PagesDetailsWaybill);
  __definePage("pages/pay/index", PagesPayIndex);
  __definePage("pages/pay/scanPay", PagesPayScanPay);
  __definePage("pages/my/index", PagesMyIndex);
  __definePage("pages/my/map", PagesMyMap);
  __definePage("pages/my/qrCode", PagesMyQrCode);
  __definePage("pages/details/orderMap", PagesDetailsOrderMap);
  const _sfc_main = {
    __name: "App",
    setup(__props) {
      const store2 = useStore();
      const locationData = vue.ref({});
      onShow(() => {
        uni.getLocation({
          type: "gcj02",
          success: (res2) => {
            locationData.value = {
              longitude: res2.longitude,
              latitude: res2.latitude
            };
            store2.commit("user/setlLacation", locationData.value);
          },
          fail: (err) => {
          }
        });
        uni.getNetworkType({
          success: function(res2) {
          }
        });
      });
      vue.onMounted(() => {
      });
      return () => {
      };
    }
  };
  var App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/App.vue"]]);
  var global$1 = {
    state: {
      footStatus: 0
    },
    mutations: {
      setFootStatus(state, provider) {
        state.footStatus = provider;
      }
    },
    actions: {},
    getters: {}
  };
  var user = {
    namespaced: true,
    state() {
      return {
        userBase: {},
        loacation: {},
        pages: 0,
        page: 1,
        token: "",
        taskId: "",
        detailsData: {},
        taskType: 1,
        taskStatus: 0,
        detailType: 0,
        tabIndex: 0,
        reasonVal: "",
        reasonDesc: "",
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        deliveryData: [],
        cancelData: [],
        alreadyData: [],
        isRedistribute: false,
        isFiltrate: false,
        taskDetailData: {},
        selectTaskData: [],
        payData: {},
        isBack: null,
        istabChange: null,
        isDelete: null,
        paymentMethod: null,
        isPickUp: false,
        isCollect: false,
        isSign: false,
        isDelivery: false,
        newType: null,
        cardData: null,
        timeData: null,
        isInput: false,
        isSearch: false,
        searchText: "",
        isSearchClear: false,
        isNew: false
      };
    },
    mutations: {
      setToken(state, provider) {
        state.token = provider;
      },
      setUserInfo(state, provider) {
        state.userBase = provider;
      },
      setlLacation(state, provider) {
        state.loacation = provider;
      },
      setPage(state, provider) {
        state.page = provider;
      },
      setPages(state, provider) {
        state.pages = provider;
      },
      setOrderDistance(state, provider) {
        state.orderDistance = provider;
      },
      setOrderTime(state, provider) {
        state.orderTime = provider;
      },
      setFilterOverTime(state, provider) {
        state.filterOverTime = provider;
      },
      setDeliveryData(state, provider) {
        state.deliveryData = provider;
      },
      setAlreadyData(state, provider) {
        state.alreadyData = provider;
      },
      setCancelData(state, provider) {
        state.cancelData = provider;
      },
      setTaskId(state, provider) {
        state.taskId = provider;
      },
      setTaskType(state, provider) {
        state.taskType = provider;
      },
      setTaskDetailData(state, provider) {
        state.taskDetailData = provider;
      },
      setReasonVal(state, provider) {
        state.reasonVal = provider;
      },
      setReasonDesc(state, provider) {
        state.reasonDesc = provider;
      },
      setRedistribute(state, provider) {
        state.isRedistribute = provider;
      },
      setSelectTaskData(state, provider) {
        state.selectTaskData = provider;
      },
      setIsFiltrate(state, provider) {
        state.isFiltrate = provider;
      },
      setTabIndex(state, provider) {
        state.tabIndex = provider;
      },
      setTaskStatus(state, provider) {
        state.taskStatus = provider;
      },
      setPayData(state, provider) {
        state.payData = provider;
      },
      setDetailsData(state, provider) {
        state.detailsData = provider;
      },
      setNewType(state, provider) {
        state.newType = provider;
      },
      setIstabChange(state, provider) {
        state.istabChange = provider;
      },
      setIsDelete(state, provider) {
        state.isDelete = provider;
      },
      setPaymentMethod(state, provider) {
        state.paymentMethod = provider;
      },
      setDetailType(state, provider) {
        state.detailType = provider;
      },
      setIsPickUp(state, provider) {
        state.isPickUp = provider;
      },
      setIsCollect(state, provider) {
        state.isCollect = provider;
      },
      setIsSign(state, provider) {
        state.isSign = provider;
      },
      setIsDelivery(state, provider) {
        state.isDelivery = provider;
      },
      setCardData(state, provider) {
        state.cardData = provider;
      },
      setTimeData(state, provider) {
        state.timeData = provider;
      },
      setIsInput(state, provider) {
        state.isInput = provider;
      },
      setIsSearch(state, provider) {
        state.isSearch = provider;
      },
      setSearchText(state, provider) {
        state.searchText = provider;
      },
      setSearchClear(state, provider) {
        state.isSearchClear = provider;
      },
      setIsNew(state, provider) {
        state.isNew = provider;
      }
    },
    actions: {
      async GetUsersInfo({ state, commit }, payload) {
        if (state.token !== "") {
          await getUserInfo().then((res2) => {
            uni.setStorageSync("userInfo", res2.data);
            commit("setUserInfo", res2.data);
          });
        }
      }
    },
    getters: {}
  };
  var store = createStore(__spreadProps(__spreadValues({}, global$1), {
    modules: {
      user
    }
  }));
  function createApp(rootComponent, rootProps) {
    rootComponent.mpTye = "app";
    rootComponent.render = () => {
    };
    const app2 = vue.createVueApp(rootComponent, rootProps);
    app2.provide("__globalStyles", __uniConfig.styles);
    const oldMount = app2.mount;
    app2.mount = (container) => {
      const appVm = oldMount.call(app2, container);
      return appVm;
    };
    return app2;
  }
  const app = createApp(App);
  app.use(store);
  app.mount("#app");
})(Vue, uni.VueShared);
