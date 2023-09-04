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
  const _sfc_main$18 = {
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
      vue.createElementVNode("view", { class: "page" }, [
        vue.createElementVNode("view", { class: "tit" }, [
          vue.createTextVNode(" \u5FEB\u9012\u5343\u4E07\u91CC "),
          vue.createElementVNode("text", null, "."),
          vue.createTextVNode(" \u795E\u9886\u96F6\u8DDD\u79BB ")
        ]),
        vue.createElementVNode("view", { class: "map" })
      ]),
      vue.createElementVNode("view", { class: "logo" })
    ]);
  }
  var PagesStartIndex = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["render", _sfc_render$c], ["__scopeId", "data-v-31cb3308"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/start/index.vue"]]);
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
  const _sfc_main$17 = {
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
  var __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["render", _sfc_render$b], ["__scopeId", "data-v-a2e81f6e"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const ON_SHOW = "onShow";
  const ON_REACH_BOTTOM = "onReachBottom";
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (shared.toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = shared.toTypeString(v).toLowerCase();
      if (["[object object]", "[object array]", "[object module]"].indexOf(type2) !== -1) {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = shared.toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
  const _sfc_main$16 = {
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
  var __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["render", _sfc_render$a], ["__scopeId", "data-v-abe12412"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$15 = {
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
  var __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["render", _sfc_render$9], ["__scopeId", "data-v-61dfc0d0"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
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
        const res = await rule.validateFunction(rule, value, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt);
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
  const _sfc_main$14 = {
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
          const itemData = this.childrens.find((v) => v.name === i);
          if (itemData) {
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
  var __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["render", _sfc_render$8], ["__scopeId", "data-v-7ae0e404"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
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
  function isObject$1(obj) {
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
      var res = handler.call(store2, {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store2.getters,
        rootState: store2.state
      }, payload);
      if (!isPromise(res)) {
        res = Promise.resolve(res);
      }
      if (store2._devtoolHook) {
        return res.catch(function(err) {
          store2._devtoolHook.emit("vuex:error", err);
          throw err;
        });
      } else {
        return res;
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
    if (isObject$1(type) && type.type) {
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
      result.then(function(res) {
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
        resolve(res);
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
  const baseUrl = "http://172.16.43.24:9527/courier";
  function request({
    url = "",
    params = {},
    method = "GET"
  }) {
    const token = uni.getStorageSync("token");
    let header = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
      "Authorization": token
    };
    const requestRes = new Promise((resolve, reject) => {
      uni.request({
        url: baseUrl + url,
        data: params,
        header,
        method,
        success: (res) => {
          const { data } = res;
          if (data.code == 0 || data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        },
        fail: (err) => {
          const error = { data: { msg: err.data } };
          reject(error);
        }
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
  const _sfc_main$13 = {
    __name: "user",
    setup(__props) {
      const store2 = useStore();
      let showPassword = vue.ref(false);
      const customForm = vue.ref();
      let fromInfo = vue.reactive({
        account: "courier",
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
      });
      const handleSubmit = async () => {
        const valid = await customForm.value.validate();
        if (valid) {
          await userLogins(fromInfo).then((res) => {
            if (res.code === 200) {
              uni.setStorageSync("token", res.data.token);
              store2.commit("user/setToken", res.data.token);
              store2.dispatch("user/GetUsersInfo");
              uni.redirectTo({
                url: "/pages/index/index"
              });
            } else {
              uni.showToast({
                title: res.msg,
                duration: 1e3,
                icon: "none"
              });
            }
          }).catch((err) => {
          });
        }
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$6);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1$1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "logo" }, "\u795E\u9886\u7269\u6D41"),
          vue.createElementVNode("view", { class: "loginBox" }, [
            vue.createElementVNode("view", { class: "tit" }, [
              vue.createElementVNode("text", null, "\u8D26\u53F7\u767B\u5F55"),
              vue.createCommentVNode(" \u4E00\u671F\u4E0D\u505A,\u6682\u65F6\u9690\u85CF "),
              vue.createCommentVNode(' <text class="text" @click="goLogin">\r\n				\u624B\u673A\u53F7\u767B\u5F55\r\n				<icon></icon>\r\n			</text> ')
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
                  vue.createVNode(_component_uni_forms_item, { name: "password" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item",
                        type: vue.unref(showPassword) ? "text" : "password",
                        modelValue: vue.unref(fromInfo).password,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.unref(fromInfo).password = $event),
                        placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801"
                      }, null, 8, ["type", "modelValue"]),
                      vue.createCommentVNode(` <icon class="pwdIcon" v-if="fromInfo.password.length > 0" :class="showPassword ? 'showPwdIcon' : ''" @click="handlePwd"></icon> `)
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
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" end ")
          ])
        ], 64);
      };
    }
  };
  var PagesLoginUser = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__scopeId", "data-v-d4b6012c"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/login/user.vue"]]);
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
  const _sfc_main$12 = {
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
          await phoneLogins(fromInfo).then((res) => {
            if (res.code === 0) {
              store2.commit("user/setToken", res.token);
              store2.dispatch("user/GetUsersInfo");
              uni.redirectTo({
                url: "/pages/index/index"
              });
            } else {
              return uni.showToast({
                title: res.msg,
                duration: 1e3,
                icon: "none"
              });
            }
          }).catch((err) => {
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
                class: vue.normalizeClass(["btn-default", vue.unref(fromInfo).phone.length === 0 || vue.unref(fromInfo).verifyCode.length === 0 ? "disabled" : ""]),
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
  var PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-4586967a"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/login/index.vue"]]);
  const getHomeInfo = (params) => request({
    url: "/messages/home/get",
    method: "get",
    params
  });
  const getHomeData = (params) => request({
    url: "/tasks/home/get",
    method: "get",
    params
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
  const taskDelete$1 = (id) => request({
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
  const _sfc_main$11 = {
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
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["render", _sfc_render$7], ["__scopeId", "data-v-7c66581c"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$10 = {
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
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      style: vue.normalizeStyle({ height: $data.statusBarHeight }),
      class: "uni-status-bar"
    }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ], 4);
  }
  var statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["render", _sfc_render$6], ["__scopeId", "data-v-f9a87a8e"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue"]]);
  const getVal = (val) => typeof val === "number" ? val + "px" : val;
  const _sfc_main$$ = {
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$5], ["__scopeId", "data-v-6bda1a90"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"]]);
  const _sfc_main$_ = {
    __name: "index",
    props: {
      newVal: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      const searchVal = vue.ref("");
      const handleSearch = (e) => {
        uni.redirectTo({
          url: "/pages/search/index"
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1);
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$5);
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
                      placeholder: "\u8F93\u5165\u8FD0\u5355\u53F7/\u624B\u673A\u53F7/\u59D3\u540D\u67E5\u8BE2",
                      onConfirm: handleSearch
                    }, null, 544), [
                      [vue.vModelText, searchVal.value]
                    ])
                  ]),
                  vue.createElementVNode("view", { slot: "right" }, [
                    vue.createElementVNode("view", { class: "rightText" }, [
                      vue.createElementVNode("navigator", {
                        url: "/pages/news/index",
                        "open-type": "redirect"
                      }, [
                        vue.createElementVNode("view", null, [
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
  var UniNav$1 = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-02b269f0"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-home-nav/index.vue"]]);
  const _sfc_main$Z = {
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
        if (item.text !== "") {
          currentPage.value = index;
          store2.commit("setFootStatus", index);
          store2.commit("user/setDeliveryData", []);
          uni.redirectTo({
            url: item.pagePath,
            success: (e) => {
            },
            fail: () => {
            }
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
  var UniFooter = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-footer/index.vue"]]);
  const _sfc_main$Y = {
    __name: "orderInfo",
    props: {
      baseData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "infoBox" }, [
          vue.createElementVNode("view", { class: "boxBg" }, [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.pickupNum), 1),
              vue.createElementVNode("view", null, "\u53D6\u4EF6\u4EFB\u52A1")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.dispatchNum), 1),
              vue.createElementVNode("view", null, "\u6D3E\u4EF6\u4EFB\u52A1")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.rightTimeoutNum), 1),
              vue.createElementVNode("view", null, "\u8D85\u65F6\u4EFB\u52A1")
            ])
          ])
        ]);
      };
    }
  };
  var OrderInfo = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-43bf85b9"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/orderInfo.vue"]]);
  const _sfc_main$X = {
    __name: "orderTip",
    props: {
      orderData: Object,
      default: () => ({})
    },
    setup(__props) {
      const props = __props;
      const handleLink = () => {
        const type = props.orderData.contentType;
        if (type === 300) {
          uni.redirectTo({
            url: "/pages/news/index"
          });
        } else if (type === 301) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u5BC4\u4EF6\u76F8\u5173&type=301"
          });
        } else if (type === 302) {
          uni.redirectTo({
            url: "/pages/news/system?title=\u7B7E\u6536\u63D0\u9192&type=302"
          });
        } else {
          uni.redirectTo({
            url: "/pages/news/system?title=\u5FEB\u4EF6\u53D6\u6D88&type=303"
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
            vue.createTextVNode(vue.toDisplayString(__props.orderData.minutes) + "\u5206\u949F\u524D ", 1),
            vue.createElementVNode("icon", { class: "iconNext" })
          ])
        ])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  var OrderTip = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-77c58440"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/orderTip.vue"]]);
  const _sfc_main$W = {
    __name: "commonUse",
    props: {},
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "commonUse" }, [
          vue.createElementVNode("view", { class: "hometit" }, "\u5E38\u7528\u529F\u80FD"),
          vue.createElementVNode("view", { class: "commonList" }, [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("icon", { class: "icon delivery" }),
              vue.createElementVNode("text", null, "\u6D3E\u4EF6\u626B\u63CF")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("icon", { class: "icon sign" }),
              vue.createElementVNode("text", null, "\u7B7E\u6536\u626B\u63CF")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("navigator", {
                url: "/pages/history/index",
                "open-type": "redirect"
              }, [
                vue.createElementVNode("icon", { class: "icon history" }),
                vue.createElementVNode("text", null, "\u5386\u53F2\u53D6\u6D3E")
              ])
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("icon", { class: "icon new" }),
              vue.createElementVNode("text", null, "\u6D88\u606F\u901A\u77E5")
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
              vue.createElementVNode("icon", { class: "icon tip" }),
              vue.createElementVNode("text", null, "\u7B7E\u6536\u63D0\u9192")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("icon", { class: "icon exclusive" }),
              vue.createElementVNode("text", null, "\u4E13\u5C5E\u53D6\u5BC4")
            ])
          ])
        ]);
      };
    }
  };
  var CommonUse = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-0ec09439"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/commonUse.vue"]]);
  const _sfc_main$V = {
    __name: "dataPresent",
    props: {
      baseData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "commonData" }, [
          vue.createElementVNode("view", { class: "hometit" }, "\u6570\u636E\u5C55\u793A"),
          vue.createElementVNode("view", { class: "dataList" }, [
            vue.createElementVNode("view", { class: "todayGet" }, [
              vue.createElementVNode("view", null, "\u4ECA\u65E5\u5DF2\u53D6"),
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.pickupedNum), 1),
              vue.createElementVNode("view", { class: "rightIcon" })
            ]),
            vue.createElementVNode("view", { class: "todaySign" }, [
              vue.createElementVNode("view", null, "\u4ECA\u65E5\u5DF2\u7B7E"),
              vue.createElementVNode("view", { class: "num" }, vue.toDisplayString(__props.baseData.signedNum), 1),
              vue.createElementVNode("view", { class: "rightIcon" })
            ])
          ])
        ]);
      };
    }
  };
  var DataPresentation = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-049d4a8e"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/dataPresent.vue"]]);
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
    date.setTime(date.getTime() + 36e5);
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
    formatAppLog("log", "at utils/index.js:33", time);
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
  const preDay = (date) => {
    let odata = new Date(new Date(date).getTime() - 24 * 60 * 60 * 1e3);
    return getTate(odata);
  };
  const nextDay = (date) => {
    let odata = new Date(new Date(date).getTime() + 24 * 60 * 60 * 1e3);
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
  const _sfc_main$U = {
    __name: "index",
    props: {
      emptyInfo: {
        type: String,
        default: ""
      },
      emptyData: {
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
          vue.createElementVNode("view", { class: "image" }),
          vue.createTextVNode(vue.toDisplayString(__props.emptyData), 1)
        ]));
      };
    }
  };
  var EmptyPage = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-a750b56c"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-empty-page/index.vue"]]);
  const _sfc_main$T = {
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
      vue.ref(0);
      const emptyInfo = vue.ref("- \u7A7A\u7A7A\u5982\u4E5F\uFF0C\u65E0\u8FD0\u5355\u8BB0\u5F55 -");
      vue.onMounted(() => {
      });
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
        if (tabIndex.value === 0) {
          store2.commit("user/setTaskType", 1);
          uni.redirectTo({
            url: "/pages/details/index"
          });
        } else {
          store2.commit("user/setTaskType", 2);
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
          vue.createCommentVNode('  \u6ED1\u5757\u5185\u5BB9 \u5BF9\u5E94\u7684\u662F\u9876\u90E8\u9009\u9879\u5361\u7684\u5207\u6362 :current="tabIndex"  \u8BBE\u7F6E\u7684\u662Fy\u65B9\u5411\u4E0A\u53EF\u4EE5\u6EDA\u52A8'),
          vue.createElementVNode("view", { class: "homeSwiper" }, [
            vue.createCommentVNode(' <swiper :current="tabIndex" @change="onChangeSwiperTab"> '),
            vue.createCommentVNode(' <swiper-item v-for="(item, index) in tabBars" :key="index"> '),
            vue.createCommentVNode(" \u5782\u76F4\u6EDA\u52A8\u533A\u57DF  scroll\u548Cswiper\u7684\u9AD8\u5EA6\u90FD\u8981\u7ED9\u4E14\u662F\u4E00\u6837\u7684\u9AD8\u5EA6"),
            vue.createCommentVNode(' <scroll-view scroll-y="true" class="swiperH"> '),
            vue.unref(tabIndex) === 0 || vue.unref(tabIndex) === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
              __props.itemData.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.itemData.slice(0, 3), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "boxBg",
                    key: index
                  }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      vue.createElementVNode("view", {
                        class: "item",
                        onClick: ($event) => handleDetail(item.id)
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, [
                          vue.createTextVNode(vue.toDisplayString(item.senderName) + " ", 1),
                          vue.createElementVNode("text", null, vue.toDisplayString(item.phone), 1),
                          vue.createCommentVNode(' <icon class="phone"></icon>\r\n									<icon class="note"></icon> ')
                        ]),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.addressDetail), 1),
                        vue.createElementVNode("view", { class: "distance" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                        vue.createElementVNode("view", { class: "time" }, "\u9884\u7EA6\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(vue.unref(taskTimeFormat)(item.taskTime)) + " \u81F3 " + vue.toDisplayString(vue.unref(overTimeFormat)(item.overTime)), 1)
                      ], 8, ["onClick"])
                    ])
                  ]);
                }), 128))
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
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" </scroll-view> "),
            vue.createCommentVNode(" </swiper-item> "),
            vue.createCommentVNode(" </swiper> ")
          ])
        ]);
      };
    }
  };
  var ExpressageInfo = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-37cb6c10"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/components/expressageInfo.vue"]]);
  const _sfc_main$S = {
    __name: "index",
    setup(__props) {
      useStore();
      const newVal = vue.ref(null);
      const orderData = vue.reactive({});
      const itemData = vue.reactive([]);
      const noPickupTaskList = vue.reactive([]);
      const noDispatchTaskList = vue.reactive([]);
      vue.ref({});
      const tabBars = vue.reactive([]);
      let baseData = vue.ref({});
      vue.onMounted(() => {
        init();
      });
      const init = () => {
        getNewData();
        getHomeBase();
      };
      const getNewData = async () => {
        await getHomeInfo().then((res) => {
          if (res.code === 200) {
            orderData.value = res.data;
            newVal.value = res.data.newsNum;
          }
        }).catch((err) => {
        });
      };
      const getHomeBase = async () => {
        const locition = {
          longitude: 116.344015,
          latitude: 40.060607
        };
        await getHomeData(locition).then((res) => {
          if (res.code === 200) {
            baseData.value = res.data;
            itemData.value = res.data.noPickupTaskList;
            formatAppLog("log", "at pages/index/index.vue:104", itemData.value);
            noPickupTaskList.value = res.data.noPickupTaskList;
            noDispatchTaskList.value = res.data.noDispatchTaskList;
            tabBars.value = [
              {
                num: noPickupTaskList.value.length,
                name: "\u5F85\u53D6\u4EF6"
              },
              {
                numm: noDispatchTaskList.value.length,
                name: "\u5F85\u6D3E\u4EF6"
              }
            ];
          }
        }).catch((err) => {
        });
      };
      const getTabIndex = (val) => {
        if (val === 0) {
          itemData.value = noPickupTaskList.value;
        } else {
          itemData.value = noDispatchTaskList.value;
        }
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
          vue.createElementVNode("view", { class: "homePageBox" }, [
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
              itemData: itemData.value,
              tabBars: tabBars.value,
              onGetTabIndex: getTabIndex
            }, null, 8, ["itemData", "tabBars"]),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" footer "),
          vue.createVNode(UniFooter, { pagePath: "pages/index/index" }),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-57280228"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/index/index.vue"]]);
  const _sfc_main$R = {
    __name: "index",
    props: {
      isShowCancel: {
        type: Boolean,
        default: false
      }
    },
    emits: "handleSearch",
    setup(__props, { emit }) {
      const searchVal = vue.ref("");
      const handleCancel = () => {
        searchVal.value = "";
        emit("goBack");
      };
      const handleSearch = () => {
        emit("handleSearch", searchVal);
      };
      const handleQr = () => {
      };
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
                    placeholder: "\u8F93\u5165\u8FD0\u5355\u53F7/\u624B\u673A\u53F7/\u59D3\u540D\u67E5\u8BE2",
                    onConfirm: handleSearch,
                    onInput: handleSearch
                  }, null, 544), [
                    [vue.vModelText, searchVal.value]
                  ]),
                  vue.createElementVNode("view", {
                    class: "scanIcon",
                    onClick: handleQr
                  })
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
  var SearchPage = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-search/index.vue"]]);
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
  const isObject = (val) => val !== null && typeof val === "object";
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
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
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
  const _sfc_main$Q = {
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$4], ["__scopeId", "data-v-6f54520a"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
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
        }, config), (res) => {
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
  const _sfc_main$P = {
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
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
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
  var __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$3], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$O = {
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
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$3);
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
  var __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$2], ["__scopeId", "data-v-7c43d41b"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$N = {
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
        const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_0$4);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$2);
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
  var UniPopup = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-popup/index.vue"]]);
  const _sfc_main$M = {
    __name: "index",
    setup(__props) {
      const emptyInfo = vue.ref("- \u6CA1\u6709\u627E\u5230\u76F8\u5173\u5185\u5BB9 -");
      let showDisplay = vue.ref(false);
      let isClear = vue.ref(false);
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u5168\u90E8\u6E05\u7A7A\u5417\uFF1F");
      let popups = vue.ref();
      let datas = vue.reactive(["SL1355602562877"]);
      let isShowCancel = vue.ref(true);
      const listDataes = vue.computed(() => {
        let testList = [];
        if (showDisplay.value === false) {
          if (datas.length > 10) {
            for (var i = 0; i < 10; i++) {
              testList.push(datas[i]);
            }
          } else {
            testList = datas;
          }
          return testList;
        } else {
          return datas;
        }
      });
      vue.onMounted(() => {
        init();
      });
      const init = () => {
      };
      const handleSearch = () => {
      };
      const handleClear = () => {
        popups.value.dialogOpen();
      };
      const handleCancel = () => {
      };
      const clearData = (val) => {
        isClear.value = val;
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/index/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createVNode(SearchPage, {
            onHandleSearch: handleSearch,
            onGoBack: goBack,
            isShowCancel: vue.unref(isShowCancel)
          }, null, 8, ["isShowCancel"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "searchTop" }, [
            vue.createElementVNode("view", { class: "pageBox" }, [
              vue.createCommentVNode(" \u6700\u8FD1\u67E5\u627E "),
              !vue.unref(isClear) ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "recentBox"
              }, [
                vue.createElementVNode("view", { class: "tit" }, [
                  vue.createElementVNode("text", null, "\u6700\u8FD1\u67E5\u627E"),
                  vue.createElementVNode("icon", { onClick: handleClear })
                ]),
                vue.unref(datas).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "recentList"
                }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(listDataes), (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "item",
                      key: index
                    }, vue.toDisplayString(item), 1);
                  }), 128)),
                  !vue.unref(showDisplay) ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "iconUp"
                  }, [
                    vue.unref(datas).length > 10 ? (vue.openBlock(), vue.createElementBlock("view", {
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
                ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createCommentVNode(" \u641C\u7D22\u65E0\u6570\u636E "),
                  vue.createVNode(EmptyPage, { emptyInfo: emptyInfo.value }, null, 8, ["emptyInfo"])
                ], 2112)),
                vue.createCommentVNode(" end ")
              ])) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" end "),
              vue.createCommentVNode(" \u641C\u7D22\u5217\u8868 "),
              vue.createElementVNode("scroll-view", {
                "scroll-y": "true",
                class: "swiperH"
              }, [
                vue.createElementVNode("view", { class: "serachList" }, [
                  vue.createElementVNode("view", { class: "" }, [
                    vue.createElementVNode("view", { class: "tabList" }, [
                      vue.createElementVNode("view", { class: "boxBg item" }, [
                        vue.createElementVNode("view", { class: "iconTip" }, [
                          vue.createElementVNode("icon", { class: "send" })
                        ]),
                        vue.createElementVNode("view", { class: "titInfo" }, [
                          vue.createTextVNode(" \u5468** "),
                          vue.createElementVNode("text", null, "185****7663"),
                          vue.createElementVNode("icon", { class: "phone" }),
                          vue.createElementVNode("icon", { class: "note" })
                        ]),
                        vue.createElementVNode("view", { class: "address" }, "\u5317\u4EAC\u5E02\u660C\u5E73\u533A\u56DE\u9F99\u89C2\u8857\u9053\u897F\u4E09\u65D7\u6865\u4E1C\u91D1\u71D5\u9F99\u5199\u5B57\u697C"),
                        vue.createElementVNode("view", { class: "distance" }, "0.3\u516C\u91CC"),
                        vue.createElementVNode("view", { class: "time" }, "\u9884\u7EA6\u53D6\u4EF6\u65F6\u95F4\uFF1A05-03 13:00 \u81F3 14:00"),
                        vue.createElementVNode("text", {
                          onClick: handleCancel,
                          class: "concel"
                        }, [
                          vue.createElementVNode("button", { class: "uni-btn concelBtn" }, "\u53D6\u6D88")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" \u63D0\u793A\u7A97\u793A\u4F8B "),
            vue.createVNode(UniPopup, {
              ref_key: "popups",
              ref: popups,
              tipInfo: tipInfo.value,
              onClearData: clearData
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
      const goBack = () => {
        emit("goBack");
      };
      const handleAll = () => {
        emit("handleAll");
      };
      return (_ctx, _cache) => {
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$5);
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
      const popup2 = vue.ref();
      let dates = vue.ref();
      let isPreExceed = vue.ref(false);
      let isNextExceed = vue.ref(false);
      vue.ref(1);
      vue.ref(1);
      const monthData = vue.reactive([]);
      const indicatorStyle = vue.ref(`height: 50px;`);
      let defaultValue = vue.ref([0]);
      let times = vue.ref(null);
      vue.ref(null);
      vue.watch(dates, (newValue, oldValue) => {
        const obj = getMonthDay(newValue);
        if (obj.timeNow === obj.timeStar) {
          isPreExceed.value = true;
        }
        if (obj.timeNow === obj.timeEnd) {
          isNextExceed.value = true;
        }
        emit("getDateTime", getTate(obj.timeNow));
      });
      vue.onMounted(() => {
        dates.value = getTate(new Date());
        monthData.value = getDay();
      });
      const hanlePre = () => {
        const times2 = getMonthDay(dates.value);
        if (times2.timeNow !== times2.timeStar) {
          dates.value = preDay(dates.value);
          isNextExceed.value = false;
        }
      };
      const hanleNext = () => {
        const times2 = getMonthDay(dates.value);
        if (times2.timeNow !== times2.timeEnd) {
          dates.value = nextDay(dates.value);
          isPreExceed.value = false;
        }
      };
      const handleDate = (type) => {
        popup2.value.open(type);
      };
      const bindChange = (e) => {
        times.value = monthData.value[e.detail.value[0]];
      };
      const handleComplete = () => {
        if (times.value !== null) {
          dates.value = times.value;
          handleCancel();
        } else {
          uni.showToast({
            title: "\u8BF7\u9009\u62E9\u65E5\u671F",
            icon: "none"
          });
        }
      };
      const handleCancel = () => {
        popup2.value.close();
      };
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", { class: "dateBox uniPopup" }, [
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["item", vue.unref(isPreExceed) ? "fontCol" : ""]),
            onClick: hanlePre
          }, "\u524D\u4E00\u5929", 2),
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
          vue.createElementVNode("view", {
            class: vue.normalizeClass(["item", vue.unref(isNextExceed) ? "fontCol" : ""]),
            onClick: hanleNext
          }, "\u540E\u4E00\u5929", 2),
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
                            vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(getNow)(item)), 1)
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
  const _sfc_main$J = {
    __name: "index",
    props: {
      tabBars: {
        type: Object,
        default: () => ({})
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const scrollinto = vue.ref("tab0");
      let tabIndex = vue.ref(0);
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
  var en = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  var zhHans = {
    "uni-load-more.contentdown": "\u4E0A\u62C9\u663E\u793A\u66F4\u591A",
    "uni-load-more.contentrefresh": "\u6B63\u5728\u52A0\u8F7D...",
    "uni-load-more.contentnomore": "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86"
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
  const _sfc_main$I = {
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
  var __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$1], ["__scopeId", "data-v-90d4256a"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue"]]);
  const _sfc_main$H = {
    __name: "index",
    setup(__props, { expose }) {
      let status = vue.ref("noMore");
      const contentText = vue.ref({
        contentdown: "\u4E0A\u62C9\u52A0\u8F7D\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D...",
        contentnomore: "\u6CA1\u6709\u66F4\u591A"
      });
      expose({
        status,
        contentText
      });
      return (_ctx, _cache) => {
        const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(' <view class="bottom-box">\r\n	  <view class="bottom-item">\r\n	    <text class="title">{{loadingText}}</text>\r\n	  </view>\r\n	</view> '),
          vue.createVNode(_component_uni_load_more, {
            status: vue.unref(status),
            "content-text": contentText.value
          }, null, 8, ["status", "content-text"])
        ], 2112);
      };
    }
  };
  var ReachBottom = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/reach-bottom/index.vue"]]);
  const _sfc_main$G = {
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
      const handleDetails = (e, id) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", id);
        store2.commit("user/setTaskType", 2);
        store2.commit("user/setTaskStatus", 4);
        uni.redirectTo({
          url: "/pages/details/waybill"
        });
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
                    onClick: ($event) => handleDetails($event, item.id)
                  }, [
                    vue.createElementVNode("view", { class: "titInfo" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1),
                    vue.createElementVNode("view", { class: "address" }, "\u5BC4\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                    vue.createElementVNode("view", { class: "address" }, "\u53D6\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                    vue.createElementVNode("view", { class: "address" }, "\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.estimatedStartTime), 1),
                    vue.createElementVNode("text", {
                      onClick: ($event) => handleOpen($event, item.id),
                      class: "delete"
                    }, [
                      vue.createElementVNode("button", { class: "uni-btn concelBtn" }, "\u5220\u9664")
                    ], 8, ["onClick"])
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
  var Pickup = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/commponents/pickup.vue"]]);
  const _sfc_main$F = {
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
      vue.onMounted(() => {
      });
      const handleOpen = (e, id) => {
        e.stopPropagation();
        emit("handleOpen", id);
      };
      const handleDetails = (e, id) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", id);
        store2.commit("user/setTaskType", 2);
        store2.commit("user/setTaskStatus", 4);
        uni.redirectTo({
          url: "/pages/details/waybill"
        });
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
                    onClick: ($event) => handleDetails($event, item.id)
                  }, [
                    vue.createElementVNode("view", { class: "titInfo" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1),
                    vue.createElementVNode("view", { class: "address" }, "\u6536\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                    vue.createElementVNode("view", { class: "address" }, "\u6D3E\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                    vue.createElementVNode("view", { class: "address" }, "\u7B7E\u6536\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.estimatedStartTime), 1),
                    item.amount > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "time"
                    }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode("text", {
                      onClick: ($event) => handleOpen($event, item.id),
                      class: "delete"
                    }, [
                      vue.createElementVNode("button", { class: "uni-btn concelBtn" }, "\u5220\u9664")
                    ], 8, ["onClick"])
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
  var Delivery = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/commponents/delivery.vue"]]);
  const _sfc_main$E = {
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
      vue.ref("- \u6CA1\u6709\u627E\u5230\u76F8\u5173\u5185\u5BB9 -");
      const tipInfo = vue.ref("\u786E\u8BA4\u5220\u9664\u8BE5\u8BA2\u5355\u5417\uFF1F");
      const tabBars = HistoryTabData;
      let taskId = vue.ref("");
      vue.ref("tab0");
      let tabIndex = vue.ref(0);
      const loadMore = vue.ref();
      let itemData = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = users.isFiltrate ? 1 : vue.ref(1);
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      let page = vue.reactive({
        latitude: 40.062595,
        longitude: 116.372809,
        page: 1,
        pageSize: 10,
        taskStatus: 2
      });
      vue.watch(props, (newValue, oldValue) => {
        store2.commit("user/setDeliveryData", []);
        getList(newValue.dateTime);
      });
      vue.watch(tabIndex, (newValue, oldValue) => {
        if (newValue === 0) {
          page.taskStatus = 2;
        } else {
          page.taskStatus = 5;
        }
        store2.commit("user/setDeliveryData", []);
        getList(page.dateTime);
      });
      vue.onMounted(() => {
      });
      onReachBottom(() => {
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
      const getList = async (time) => {
        reload.value = true;
        page = __spreadProps(__spreadValues({}, page), {
          dateTime: time,
          page: pageNum.value
        });
        await getDeliveryList(page).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData.value = [];
              }
              itemData.value = itemData.value.concat(res.data.items);
              pages.value = res.data.pages;
              store2.commit("user/setDeliveryData", itemData.value);
              if (Number(res.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData.value = [];
            }
          }
        }).catch((err) => {
        });
      };
      const getTabIndex = (index) => {
        tabIndex.value = index;
      };
      const handleClick = async () => {
        await taskDelete(taskId.value).then((res) => {
          if (res.code === 200) {
            dealparcel.value.getList();
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
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
              tabBars: vue.unref(tabBars),
              ref: "tab",
              onGetTabIndex: getTabIndex
            }, null, 8, ["tabBars"]),
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "homeSwiper" }, [
              vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
                  vue.createCommentVNode(" \u53D6\u4EF6 "),
                  vue.unref(tabIndex) === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                    vue.createVNode(Pickup, {
                      itemData: vue.unref(itemData),
                      onHandleOpen: handleOpen
                    }, null, 8, ["itemData"])
                  ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                    vue.createCommentVNode(" end "),
                    vue.createCommentVNode(" \u6D3E\u4EF6 "),
                    vue.createElementVNode("view", null, [
                      vue.createVNode(Delivery, {
                        itemData: vue.unref(itemData),
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
  var TabList$2 = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/commponents/index.vue"]]);
  const _sfc_main$D = {
    __name: "index",
    setup(__props) {
      let list = vue.ref();
      vue.reactive([]);
      const title = vue.ref("\u5386\u53F2\u53D6\u6D3E");
      let dateTime = vue.ref("");
      vue.onMounted(() => {
      });
      const getDateTime = (val) => {
        dateTime.value = val;
      };
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/index/index"
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
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createElementVNode("view", { class: "history" }, [
            vue.createVNode(SearchPage, { onHandleSearch: _ctx.handleSearch }, null, 8, ["onHandleSearch"])
          ]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "historyboxTop" }, [
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
  var PagesHistoryIndex = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-6c15e724"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/history/index.vue"]]);
  const getNewList = (type) => request({
    url: `/messages/list?bussinessType=3&contentType=${type}`,
    method: "get"
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
    url: `/messages/readAll?ids=${params}`,
    method: "put",
    params
  });
  const _sfc_main$C = {
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
      let itemData = vue.ref([]);
      vue.onMounted(() => {
        init();
      });
      const init = () => {
        getList();
      };
      const getList = async () => {
        await getNewList("").then((res) => {
          if (res.code === 200) {
            itemData.value = res.data;
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
        await msgRead(item.id).then((res) => {
        }).catch((err) => {
        });
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
            vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
              vue.createElementVNode("view", { class: "boxCon" }, [
                vue.createElementVNode("view", { class: "tabConList" }, [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData), (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "item",
                      key: index
                    }, [
                      vue.createElementVNode("view", {
                        onClick: ($event) => handleClick(item)
                      }, [
                        vue.createCommentVNode(` <navigator :url="'/pages/news/detail?obj=' +  JSON.stringify(item)" open-type="redirect"> `),
                        vue.createElementVNode("text", {
                          class: vue.normalizeClass(["text", item.isRead === 0 ? "active" : ""])
                        }, [
                          vue.createElementVNode("icon"),
                          vue.createTextVNode(" " + vue.toDisplayString(item.title), 1)
                        ], 2),
                        vue.createElementVNode("text", { class: "time" }, vue.toDisplayString(vue.unref(taskTimeFormat)(item.created)), 1),
                        vue.createCommentVNode(" </navigator> ")
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
  var Announcement = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/components/announcement.vue"]]);
  const _sfc_main$B = {
    __name: "notification",
    props: {
      tabIndex: {
        type: Number,
        default: 1
      }
    },
    emits: "getTabIndex",
    setup(__props, { expose, emit }) {
      const pages = getCurrentPages();
      pages[pages.length - 1];
      let objData = vue.ref({});
      vue.onMounted(() => {
        getOjb();
      });
      const getOjb = async () => {
        await getNotice().then((res) => {
          if (res.code === 200) {
            objData.value = res.data;
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
                      url: "/pages/news/system?title=\u5BC4\u4EF6\u76F8\u5173&type=" + 301,
                      "open-type": "redirect"
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(["icon send", vue.unref(objData).haveNewSendNotice ? "active" : ""])
                      }, [
                        vue.createElementVNode("icon")
                      ], 2),
                      vue.createElementVNode("view", { class: "text" }, [
                        vue.createElementVNode("view", null, "\u5BC4\u4EF6\u76F8\u5173"),
                        vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).haveNewSendNotice ? "\u60A8\u6709\u4E00\u4E2A\u65B0\u7684\u53D6\u4EF6\u8BA2\u5355" : "\u6682\u65E0\u6D88\u606F"), 1)
                      ]),
                      vue.createElementVNode("text", { class: "time" }, vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).newSendNoticeTime)), 1)
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
                        vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).haveNewReceiveNotice ? "\u60A8\u6709\u4E00\u4E2A\u65B0\u7684\u53D6\u4EF6\u8BA2\u5355" : "\u6682\u65E0\u6D88\u606F"), 1)
                      ]),
                      vue.createElementVNode("text", { class: "time" }, vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).newReceiveNoticeTime)), 1)
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
                        vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).haveNewCancelNotice ? "\u60A8\u6709\u4E00\u4E2A\u65B0\u7684\u53D6\u4EF6\u8BA2\u5355" : "\u6682\u65E0\u6D88\u606F"), 1)
                      ]),
                      vue.createElementVNode("text", { class: "time" }, vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).newCancelNoticeTime)), 1)
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
  var Notification = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/components/notification.vue"]]);
  const _sfc_main$A = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const announcement = vue.ref();
      const notificat = vue.ref();
      const title = vue.ref("\u6D88\u606F");
      vue.ref("- \u6CA1\u6709\u627E\u5230\u76F8\u5173\u5185\u5BB9 -");
      const tabBars = vue.reactive(["\u516C\u544A", "\u7CFB\u7EDF\u901A\u77E5"]);
      let scrollinto = vue.ref("tab0");
      let tabIndex = users.tabIndex === 1 ? vue.ref(1) : vue.ref(0);
      vue.onMounted(() => {
      });
      const changeTab = (index) => {
        if (tabIndex.value == index) {
          return;
        }
        if (index === 0) {
          announcement.value.getList();
        } else {
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
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tabBars, (item, index) => {
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
  var PagesNewsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-452e6662"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/index.vue"]]);
  const _sfc_main$z = {
    __name: "detail",
    setup(__props) {
      const title = vue.ref("\u8BE6\u60C5");
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      let objData = vue.ref(JSON.parse(currentPage.$page.options.obj));
      vue.onMounted((e) => {
      });
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
            vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(objData).content), 1)
          ]),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesNewsDetail = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-6803dca4"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/detail.vue"]]);
  const _sfc_main$y = {
    __name: "system",
    setup(__props) {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1].$page.options;
      const title = currentPage.title;
      const type = currentPage.type;
      const loadMore = vue.ref();
      const emptyData = vue.ref("\u6682\u65E0\u6D88\u606F");
      const rithtText = vue.ref("\u5168\u90E8\u5DF2\u8BFB");
      let pageNumber = vue.ref(1);
      let pageSize = vue.ref(10);
      let totalPage = vue.ref(0);
      let reload = vue.ref(false);
      let scrollH = vue.ref(null);
      let currentPageData = vue.ref([]);
      let itemData = vue.ref([]);
      let ids = vue.ref([]);
      onReachBottom(() => {
        totalPage.value = Math.ceil(itemData.value.length / pageSize.value);
        totalPage.value = totalPage.value == 0 ? 1 : totalPage.value;
        if (pageNumber.value >= totalPage.value) {
          loadMore.value.status = "noMore";
          return false;
        } else {
          loadMore.value.status = "loading";
          setTimeout(() => {
            pageNumber.value++;
            let begin = (pageNumber.value - 1) * pageSize.value;
            let end = pageNumber.value * pageSize.value;
            currentPageData.value = [...currentPageData.value, ...itemData.value.slice(begin, end)];
          }, 1e3);
        }
      });
      vue.onMounted(() => {
        getList(type);
        uni.getSystemInfo({
          success: (res) => {
            scrollH.value = res.windowHeight - uni.upx2px();
          }
        });
      });
      const getList = async (type2) => {
        await getNewList(type2).then((res) => {
          if (res.code === 200) {
            itemData.value = res.data;
            currentPageData.value = itemData.value.slice(0, 10);
            reload.value = false;
          }
        }).catch((err) => {
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
      const handleDetail = async (id) => {
        uni.navigateTo({
          url: "/pages/details/waybill?id=" + id
        });
        await msgRead(id).then((res) => {
        }).catch((err) => {
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
      const handleAll = async () => {
        itemData.value.map((val) => {
          if (val.isRead === 0) {
            ids.value.push(val.id);
          }
        });
        await msgAllRead(ids.value).then((res) => {
          getList(type);
        }).catch((err) => {
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
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
              title: vue.unref(title),
              onGoBack: goBack,
              onHandleAll: handleAll,
              rithtText: vue.unref(itemData).length > 0 && vue.unref(ids).length > 0 ? rithtText.value : ""
            }, null, 8, ["title", "rithtText"])
          ]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5217\u8868 "),
          vue.createElementVNode("view", { class: "pageBox newBox" }, [
            vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("scroll-view", {
              key: 0,
              "scroll-y": "true",
              style: vue.normalizeStyle({ height: vue.unref(scrollH) + "px" })
            }, [
              vue.createElementVNode("view", { class: "systemList" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(currentPageData), (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "boxBg item",
                    key: index
                  }, [
                    vue.createElementVNode("view", {
                      class: vue.normalizeClass(["tit", item.isRead === 0 ? "active" : ""])
                    }, [
                      vue.createElementVNode("icon"),
                      vue.createTextVNode(" \u60A8\u6709\u4E00\u4E2A\u65B0\u7684\u53D6\u4EF6\u8BA2\u5355 ")
                    ], 2),
                    vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.content), 1),
                    vue.createElementVNode("view", { class: "time" }, [
                      vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(taskTimeFormat)(item.created)), 1),
                      vue.createElementVNode("button", {
                        class: "uni-btn redBtn",
                        onClick: ($event) => handleDetail(item.id)
                      }, "\u67E5\u770B\u8BE6\u60C5", 8, ["onClick"])
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
  var PagesNewsSystem = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-67cbd0fc"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/news/system.vue"]]);
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
  const _sfc_main$x = {
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
      const indicatorStyle = vue.ref(`height: 50px;`);
      let defaultValue = vue.ref([0, 0, 0]);
      const provinceData = vue.reactive([]);
      const cityData = vue.reactive([]);
      const areaData = vue.reactive([]);
      let cityBase = vue.ref({});
      vue.onMounted(() => {
        getProvincesData();
      });
      const getProvincesData = async (e) => {
        let res = await getProvinces();
        if (res.code === 200) {
          provinceData.value = res.data;
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
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const getCity = async (id) => {
        let res = await getProvinces({ parentId: id });
        if (res.code === 200) {
          cityData.value = res.data;
          const cityId = cityData.value[defaultValue.value[1]].id;
          getArea(cityId);
        } else {
          return uni.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const getArea = async (id) => {
        let res = await getProvinces({ parentId: id });
        if (res.code === 200) {
          areaData.value = res.data;
          cityBase.value = {
            province: provinceData.value[defaultValue.value[0]].name,
            city: cityData.value[defaultValue.value[1]].name,
            area: areaData.value[defaultValue.value[2]].name,
            areaId: areaData.value[defaultValue.value[2]].id
          };
        } else {
          return uni.showToast({
            title: res.msg,
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
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$2);
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
  var CityPopup = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-address/index.vue"]]);
  const _sfc_main$w = {
    __name: "address",
    setup(__props, { expose }) {
      const city = vue.ref();
      let type = vue.ref(null);
      let mailCity = vue.ref({});
      let consigneeCity = vue.ref({});
      vue.onMounted(() => {
      });
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
              ])
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
  var UniAddress = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/freight/components/address.vue"]]);
  const _sfc_main$v = {
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
      vue.onMounted(() => {
      });
      vue.watch(props, (newValue, oldValue) => {
        weight.value = Number(newValue.detailsData.weight);
        volume.value = Number(newValue.detailsData.volume) ? Number(newValue.detailsData.volume) : 0;
      });
      vue.watch(weight, (newValue, oldValue) => {
        const val = Number(newValue);
        vue.nextTick(() => {
          if (val < 0.1 && val > 0) {
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
          volume: volume.value === 0 ? 1 : volume.value,
          weight: weight.value
        };
        await calculateFreight(data).then((res) => {
          formatAppLog("log", "at components/uni-goods/index.vue:151", res.data.freight);
          emit("getFreight", res.data.freight);
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
          getfreight();
          if (value >= 9999) {
            isExceed.value = true;
            weight.value = 9999;
          } else {
            isExceed.value = false;
            getfreight();
          }
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
        getfreight();
      };
      const handleAdd = () => {
        if (weight.value < 9999) {
          ++weight.value;
          isLessThan.value = false;
        }
        if (weight.value === 9999) {
          isExceed.value = true;
        }
        getfreight();
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
          }
        }
        getfreight();
      };
      const handleVolumeMinus = () => {
        if (volume.value > 1) {
          volume.value--;
          volume.value = parseInt(volume.value * 1e4) / 1e4;
        }
        if (volume.value <= 0 || volume.value === 1) {
          volume.value = 0;
        }
        getfreight();
      };
      const handleVolumeAdd = () => {
        if (volume.value < 99) {
          ++volume.value;
          isLessThanVolume.value = false;
        }
        if (volume.value === 99) {
          isExceedVolume.value = true;
        }
        getfreight();
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
            getfreight();
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
  var GoodsInfo = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-goods/index.vue"]]);
  const _sfc_main$u = {
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
  var Result = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/freight/components/result.vue"]]);
  const _sfc_main$t = {
    __name: "index",
    setup(__props) {
      const title = vue.ref("\u8FD0\u8D39\u67E5\u8BE2");
      const isShow = vue.ref(false);
      let baseData = vue.reactive({});
      const goods = vue.ref();
      const address = vue.ref();
      vue.onMounted(() => {
      });
      const handleSubmit = async () => {
        const senderCountyId = address.value.mailCity.areaId;
        const receiverCountyId = address.value.consigneeCity.areaId;
        const goodData = goods.value;
        formatAppLog("log", "at pages/freight/index.vue:57", goodData);
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
        formatAppLog("log", "at pages/freight/index.vue:86", data);
        const res = await calculateFreight(data);
        if (res.code === 200) {
          baseData.value = __spreadValues({
            volumeValue: goodData.volume
          }, res.data);
        } else {
          return uni.showToast({
            title: res.msg,
            duration: 1e3,
            icon: "none"
          });
        }
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
              ref: address
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
                class: "btn-default",
                onClick: handleSubmit
              }, "\u7ACB\u5373\u67E5\u8BE2")
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
  var PagesFreightIndex = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-628b0746"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/freight/index.vue"]]);
  const _sfc_main$s = {
    __name: "index",
    props: {
      tabBars: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props, { expose, emit }) {
      const store2 = useStore();
      const itemData = vue.ref(["\u8DDD\u79BB", "\u65F6\u95F4", "\u8D85\u65F6\u4EFB\u52A1"]);
      let isActive = vue.ref(-1);
      let isSelect = vue.ref();
      const handleTab = (index) => {
        isActive.value = index;
        isSelect.value = !isSelect.value;
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
        store2.commit("user/setIsFiltrate", true);
        store2.commit("user/setDeliveryData", []);
        emit("getList");
      };
      expose({});
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "filtrateBox" }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(itemData.value, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass(["item", vue.unref(isActive) === index ? "onHover" : ""]),
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
  var ListFiltrate = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-list-filtrate/index.vue"]]);
  const _sfc_main$r = {
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
      }
    },
    setup(__props, { emit }) {
      const props = __props;
      const store2 = useStore();
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
          }, "\u7BA1\u7406")) : (vue.openBlock(), vue.createElementBlock("view", {
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
              __props.tabIndex === 0 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 0,
                class: "uni-btn btn-default",
                onClick: handleOrder
              }, "\u8F6C\u5355")) : __props.tabIndex === 1 ? (vue.openBlock(), vue.createElementBlock("button", {
                key: 1,
                class: "uni-btn btn-default",
                onClick: handlePrint
              }, "\u6253\u5370")) : (vue.openBlock(), vue.createElementBlock("button", {
                key: 2,
                class: "uni-btn btn-default",
                onClick: handleBatchDelete
              }, "\u6279\u91CF\u5220\u9664"))
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
  var ExpressageFoot = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-74ae7a27"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-expressage-foot/index.vue"]]);
  const _sfc_main$q = {
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
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$2);
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
  var Phone = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/components/uni-phone/index.vue"]]);
  const _sfc_main$p = {
    __name: "dealParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      const phone2 = vue.ref();
      let itemData = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = users.isFiltrate ? 1 : vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      const phoneData = vue.ref("");
      let page = vue.reactive({
        latitude: users.loacation.latitude,
        longitude: users.loacation.longitude,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 4
      });
      onReachBottom(() => {
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
      vue.onMounted(() => {
        getList();
      });
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      const getList = async () => {
        reload.value = true;
        let valNum = 0;
        if (users.isFiltrate) {
          valNum = 1;
          pageNum.value = 1;
          store2.commit("user/setIsFiltrate", false);
        }
        page = __spreadProps(__spreadValues({}, page), {
          page: valNum ? 1 : pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData.value = [];
              }
              itemData.value = itemData.value.concat(res.data.items);
              pages.value = res.data.pages;
              store2.commit("user/setDeliveryData", itemData.value);
              if (Number(res.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData.value = [];
            }
          }
        }).catch((err) => {
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
        uni.redirectTo({
          url: "/pages/details/waybill"
        });
      };
      const handlePhone = (e, val) => {
        e.stopPropagation();
        phoneData.value = val;
        phone2.value.dialogOpen();
      };
      expose({ getList });
      return (_ctx, _cache) => {
        return __props.tabIndex === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData), (item, index) => {
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
                      vue.createElementVNode("view", { class: "item" }, [
                        vue.createElementVNode("view", {
                          class: "titInfo",
                          onClick: ($event) => handleDetails($event, item.id)
                        }, [
                          vue.createElementVNode("view", null, [
                            vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(item.name), 1),
                            vue.createTextVNode(" " + vue.toDisplayString(item.phone) + " ", 1),
                            vue.createElementVNode("icon", {
                              class: "phone",
                              onClick: ($event) => handlePhone($event, item.phone)
                            }, null, 8, ["onClick"]),
                            vue.createElementVNode("icon", { class: "note" })
                          ])
                        ], 8, ["onClick"]),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                        vue.createElementVNode("view", { class: "time" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1)
                      ])
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
  var DealParcel$1 = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/delivery/components/components/dealParcel.vue"]]);
  const _sfc_main$o = {
    __name: "alreadyParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 1
      },
      isAdmin: {
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
      let itemData = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      let page = vue.reactive({
        latitude: users.loacation.latitude,
        longitude: users.loacation.longitude,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 5
      });
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
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      vue.watch(props, (newValue, oldValue) => {
      });
      vue.onMounted(() => {
      });
      const getList = async () => {
        reload.value = true;
        page = __spreadProps(__spreadValues({}, page), {
          page: pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData.value = [];
              }
              itemData.value = itemData.value.concat(res.data.items);
              pages.value = res.data.pages;
              store2.commit("user/setDeliveryData", itemData.value);
              if (Number(res.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData.value = [];
            }
          }
        }).catch((err) => {
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleDetails = (e, id) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", id);
        store2.commit("user/setTaskType", 2);
        store2.commit("user/setTaskStatus", 5);
        uni.redirectTo({
          url: "/pages/details/waybill"
        });
      };
      expose({
        getList
      });
      return (_ctx, _cache) => {
        return __props.tabIndex === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData), (item, index) => {
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
                        onClick: ($event) => handleDetails($event, item.id)
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, "\u8FD0\u5355\u53F7\uFF1A" + vue.toDisplayString(item.transportOrderId), 1),
                        vue.createElementVNode("view", { class: "address" }, "\u5BC4\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                        vue.createElementVNode("view", { class: "address" }, "\u6D3E\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "address" }, "\u6D3E\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.estimatedStartTime), 1),
                        item.amount > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "time"
                        }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true)
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
  var AlreadyParcel$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/delivery/components/components/alreadyParcel.vue"]]);
  const _sfc_main$n = {
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
      let dealparcel2 = vue.ref();
      let already = vue.ref();
      let cancel = vue.ref();
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F");
      let taskId = vue.ref("");
      let scrollH = vue.ref(0);
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: (res) => {
            scrollH.value = res.windowHeight;
          }
        });
      });
      const getSelected = (array) => {
        emit("getSelected", array);
      };
      const dealPList = () => {
        dealparcel2.value.getList();
      };
      const alreadList = () => {
        already.value.getList();
      };
      const cancelList = () => {
        cancel.value.getList();
      };
      const handleClick = async () => {
        await taskDelete$1(taskId.value).then((res) => {
          if (res.code === 200) {
            dealparcel2.value.getList();
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      expose({
        dealPList,
        alreadList,
        cancelList
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u5F85\u6D3E\u4EF6 "),
          vue.createVNode(DealParcel$1, {
            ref_key: "dealparcel",
            ref: dealparcel2,
            tabIndex: __props.tabIndex,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox,
            onGetSelected: getSelected
          }, null, 8, ["tabIndex", "isAdmin"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5DF2\u7B7E\u6536 "),
          vue.createVNode(AlreadyParcel$1, {
            ref_key: "already",
            ref: already,
            tabIndex: __props.tabIndex,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox
          }, null, 8, ["tabIndex", "isAdmin"]),
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
  var TabList$1 = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/delivery/components/list.vue"]]);
  const _sfc_main$m = {
    __name: "index",
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const tab = vue.ref();
      const list = vue.ref();
      const expressageFoot = vue.ref();
      const tabBars = PickUpData;
      let tabIndex = vue.ref(0);
      let isAdmin = vue.ref(false);
      let selected = vue.reactive(/* @__PURE__ */ new Map());
      vue.onMounted(() => {
      });
      const handleSearch = () => {
      };
      const handleClick = async () => {
        const ids = [];
        for (const [key, value] of selected) {
          ids.push(value);
        }
        await taskBatchDelete({ idList: ids }).then((res) => {
          if (res.code === 200) {
            list.value.cancelList();
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const getTabIndex = (index) => {
        tabIndex.value = index;
        if (index === 0) {
          list.value.dealPList();
        } else {
          list.value.alreadList();
        }
        selected.clear();
        expressageFoot.value.isAdmin = false;
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
        let itemData = users.deliveryData;
        if (selected.size === itemData.length) {
          selected.clear();
          itemData.forEach((element) => {
            element.selected = false;
          });
        } else {
          itemData.forEach((element, index) => {
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
        let itemData = users.deliveryData;
        if (itemData[index].selected) {
          itemData[index].selected = false;
          selected.delete(index);
        } else {
          itemData[index].selected = true;
          selected.set(index, itemData[index].id);
        }
        store2.commit("user/setSelectTaskData", selected);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createVNode(SearchPage, { onHandleSearch: handleSearch }),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "boxTop" }, [
            vue.createCommentVNode(" tab\u5207\u6362 "),
            vue.createVNode(UniTab, {
              tabBars: vue.unref(tabBars),
              ref_key: "tab",
              ref: tab,
              onGetTabIndex: getTabIndex
            }, null, 8, ["tabBars"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u7B5B\u9009 "),
            vue.unref(tabIndex) === 0 && vue.unref(users).deliveryData.length > 0 ? (vue.openBlock(), vue.createBlock(ListFiltrate, {
              key: 0,
              onGetList: getList
            })) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u53D6\u4EF6\u72B6\u6001\u5217\u8868 "),
            vue.createElementVNode("view", { style: { "padding": "0 0 200rpx 0" } }, [
              vue.createVNode(TabList$1, {
                tabBars: vue.unref(tabBars),
                tabIndex: vue.unref(tabIndex),
                isAdmin: vue.unref(isAdmin),
                onOnChangeSwiperTab: onChangeSwiperTab,
                onCheckbox: checkbox,
                ref_key: "list",
                ref: list
              }, null, 8, ["tabBars", "tabIndex", "isAdmin"])
            ]),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" \u5E95\u90E8\u7BA1\u7406 \u5355\u9009\\\u8F6C\u5355\\\u6253\u5370\\\u5220\u9664 "),
          vue.createCommentVNode(" \u6D3E\u4EF6\u540E\u671F\u4F1A\u52A0\u529F\u80FD,\u6240\u4EE5\u8FD9\u5757\u4EE3\u7801\u5148\u4E0D\u5220\u9664 "),
          vue.createVNode(ExpressageFoot, {
            ref_key: "expressageFoot",
            ref: expressageFoot,
            onGetAdmin: getAdmin,
            selected: vue.unref(selected),
            tabIndex: vue.unref(tabIndex),
            onAllSelect: allSelect,
            onHandleClick: handleClick
          }, null, 8, ["selected", "tabIndex"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" footer "),
          vue.createVNode(UniFooter, { pagePath: "pages/delivery/index" }),
          vue.createCommentVNode(" end ")
        ], 64);
      };
    }
  };
  var PagesDeliveryIndex = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-7c6df030"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/delivery/index.vue"]]);
  const _sfc_main$l = {
    __name: "dealParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      const phone2 = vue.ref();
      let itemData = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = users.isFiltrate ? 1 : vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      const phoneData = vue.ref("");
      let page = vue.reactive({
        latitude: users.loacation.latitude,
        longitude: users.loacation.longitude,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        dateTime: "2022-07-08 00:00:00",
        filterOverTime: null,
        taskStatus: 1
      });
      onReachBottom(() => {
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
      vue.onMounted(() => {
        getList();
      });
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      const getList = async () => {
        reload.value = true;
        let valNum = 0;
        if (users.isFiltrate) {
          valNum = 1;
          pageNum.value = 1;
          store2.commit("user/setIsFiltrate", false);
        }
        page = __spreadProps(__spreadValues({}, page), {
          page: valNum ? 1 : pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData.value = [];
              }
              itemData.value = itemData.value.concat(res.data.items);
              pages.value = res.data.pages;
              store2.commit("user/setDeliveryData", itemData.value);
              if (Number(res.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData.value = [];
            }
          }
        }).catch((err) => {
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleDetails = (e, id) => {
        store2.commit("user/setTaskId", id);
        store2.commit("user/setTaskType", 1);
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
      expose({ getList });
      return (_ctx, _cache) => {
        return __props.tabIndex === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9 "),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData), (item, index) => {
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
                        onClick: ($event) => handleDetails($event, item.id)
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, [
                          vue.createElementVNode("view", null, [
                            vue.createElementVNode("text", { class: "name" }, vue.toDisplayString(item.name), 1),
                            vue.createTextVNode(" " + vue.toDisplayString(item.phone) + " ", 1),
                            vue.createElementVNode("icon", {
                              class: "phone",
                              onClick: ($event) => handlePhone($event, item.phone)
                            }, null, 8, ["onClick"]),
                            vue.createElementVNode("icon", { class: "note" })
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                        vue.createElementVNode("view", { class: "time" }, "\u9884\u7EA6\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.estimatedStartTime), 1),
                        vue.createElementVNode("text", {
                          onClick: ($event) => handleCancel($event, item.id),
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
  var DealParcel = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/components/components/dealParcel.vue"]]);
  const _sfc_main$k = {
    __name: "alreadyParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 1
      },
      isAdmin: {
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
      let itemData = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      let page = vue.reactive({
        latitude: users.loacation.latitude,
        longitude: users.loacation.longitude,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 2
      });
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
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      vue.watch(props, (newValue, oldValue) => {
      });
      vue.onMounted(() => {
      });
      const getList = async () => {
        reload.value = true;
        page = __spreadProps(__spreadValues({}, page), {
          page: pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData.value = [];
              }
              itemData.value = itemData.value.concat(res.data.items);
              pages.value = res.data.pages;
              store2.commit("user/setDeliveryData", itemData.value);
              if (Number(res.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData.value = [];
            }
          }
        }).catch((err) => {
        });
      };
      const checkbox = (index) => {
        emit("checkbox", index);
      };
      const handleDetails = (e, id) => {
        e.stopPropagation();
        store2.commit("user/setTaskId", id);
        store2.commit("user/setTaskType", 1);
        store2.commit("user/setTaskStatus", 2);
        uni.redirectTo({
          url: "/pages/details/waybill"
        });
      };
      expose({
        getList
      });
      return (_ctx, _cache) => {
        return __props.tabIndex === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9"),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData), (item, index) => {
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
                        onClick: ($event) => handleDetails($event, item.id)
                      }, [
                        vue.createElementVNode("view", { class: "titInfo" }, "\u8BA2\u5355\u53F7\uFF1ASD" + vue.toDisplayString(item.orderId), 1),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.name), 1),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", { class: "address" }, vue.toDisplayString(item.distance) + "\u516C\u91CC", 1),
                        vue.createElementVNode("view", { class: "time" }, "\u53D6\u4EF6\u65F6\u95F4\uFF1A" + vue.toDisplayString(item.estimatedStartTime), 1),
                        item.amount > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          class: "time"
                        }, "\u8FD0\u8D39\uFF1A" + vue.toDisplayString(item.amount) + "\u5143", 1)) : vue.createCommentVNode("v-if", true)
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
  var AlreadyParcel = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/components/components/alreadyParcel.vue"]]);
  const _sfc_main$j = {
    __name: "cancelParcel",
    props: {
      tabIndex: {
        type: Number,
        default: 0
      },
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    emits: "",
    setup(__props, { expose, emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      let itemData = vue.ref([]);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      vue.reactive(/* @__PURE__ */ new Map());
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      let page = vue.reactive({
        latitude: users.loacation.latitude,
        longitude: users.loacation.longitude,
        page: 1,
        pageSize: 10,
        orderDistance: null,
        orderTime: null,
        filterOverTime: null,
        dateTime: getTimeDate(new Date()).veryDayDate,
        taskStatus: 3
      });
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
      vue.watch(users, (newValue, oldValue) => {
        if (users.selectTaskData.size > 0) {
          for (let [key, value] of users.selectTaskData) {
            itemData.value.forEach((element) => {
              if (value === element.id) {
                element.selected = true;
              }
            });
          }
        } else {
          itemData.value.forEach((element) => {
            element.selected = false;
          });
        }
      });
      const getList = async () => {
        reload.value = true;
        page = __spreadProps(__spreadValues({}, page), {
          page: pageNum.value,
          orderDistance: users.orderDistance,
          orderTime: users.orderTime,
          filterOverTime: users.filterOverTime
        });
        await getDeliveryList(page).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              reload.value = false;
              if (users.deliveryData.length === 0) {
                itemData.value = [];
              }
              itemData.value = itemData.value.concat(res.data.items);
              pages.value = res.data.pages;
              store2.commit("user/setDeliveryData", itemData.value);
              if (Number(res.data.pages) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData.value = [];
            }
          }
        }).catch((err) => {
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
        getList
      });
      return (_ctx, _cache) => {
        return __props.tabIndex === 2 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
            vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
              vue.createCommentVNode(" \u5217\u8868\u5185\u5BB9"),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData), (item, index) => {
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
                        onClick: ($event) => handleDetails($event, item.id)
                      }, [
                        vue.createElementVNode("view", null, "\u5BC4\u4EF6\u4EBA\uFF1A" + vue.toDisplayString(item.name), 1),
                        vue.createElementVNode("view", null, "\u53D6\u4EF6\u5730\u5740\uFF1A" + vue.toDisplayString(item.address), 1),
                        vue.createElementVNode("view", null, "\u53D6\u4EF6\u539F\u56E0\uFF1A" + vue.toDisplayString(item.cancelReason), 1),
                        vue.createElementVNode("view", null, "\u539F\u56E0\u63CF\u8FF0\uFF1A" + vue.toDisplayString(item.cancelReason), 1),
                        vue.createElementVNode("text", {
                          onClick: ($event) => handleOpen($event, item.id),
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
  var CancelParcel = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/components/components/cancelParcel.vue"]]);
  const _sfc_main$i = {
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
      scrollH: {
        type: String,
        default: ""
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
      let dealparcel2 = vue.ref();
      let already = vue.ref();
      let cancel = vue.ref();
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F");
      let taskId = vue.ref("");
      let scrollH = vue.ref(0);
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: (res) => {
            scrollH.value = res.windowHeight;
          }
        });
      });
      const getSelected = (array) => {
        emit("getSelected", array);
      };
      const dealPList = () => {
        dealparcel2.value.getList();
      };
      const alreadList = () => {
        already.value.getList();
      };
      const cancelList = () => {
        cancel.value.getList();
      };
      const handleClick = async () => {
        await taskDelete$1(taskId.value).then((res) => {
          if (res.code === 200) {
            dealparcel2.value.getList();
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
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
        alreadList,
        cancelList
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u5F85\u53D6\u4EF6 "),
          vue.createVNode(DealParcel, {
            ref_key: "dealparcel",
            ref: dealparcel2,
            tabIndex: __props.tabIndex,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox,
            onGetSelected: getSelected
          }, null, 8, ["tabIndex", "isAdmin"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5DF2\u53D6\u4EF6 "),
          vue.createVNode(AlreadyParcel, {
            ref_key: "already",
            ref: already,
            tabIndex: __props.tabIndex,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox
          }, null, 8, ["tabIndex", "isAdmin"]),
          vue.createCommentVNode(" end "),
          vue.createCommentVNode(" \u5DF2\u53D6\u4EF6 "),
          vue.createVNode(CancelParcel, {
            tabIndex: __props.tabIndex,
            ref_key: "cancel",
            ref: cancel,
            isAdmin: __props.isAdmin,
            onCheckbox: checkbox,
            onHandleOpen: handleOpen
          }, null, 8, ["tabIndex", "isAdmin"]),
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
  var TabList = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/components/list.vue"]]);
  const _sfc_main$h = {
    __name: "index",
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const tab = vue.ref();
      const list = vue.ref();
      const tabBars = DeliveryData;
      let tabIndex = vue.ref(0);
      let isAdmin = vue.ref(false);
      let selected = vue.reactive(/* @__PURE__ */ new Map());
      vue.onMounted(() => {
      });
      const handleSearch = () => {
      };
      const handleClick = async () => {
        const ids = [];
        for (const [key, value] of selected) {
          ids.push(value);
        }
        await taskBatchDelete({ idList: ids }).then((res) => {
          if (res.code === 200) {
            list.value.cancelList();
            return uni.showToast({
              title: "\u5220\u9664\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const getTabIndex = (index) => {
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
        let itemData = users.deliveryData;
        if (selected.size === itemData.length) {
          selected.clear();
          itemData.forEach((element) => {
            element.selected = false;
          });
        } else {
          itemData.forEach((element, index) => {
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
        let itemData = users.deliveryData;
        if (itemData[index].selected) {
          itemData[index].selected = false;
          selected.delete(index);
        } else {
          itemData[index].selected = true;
          selected.set(index, itemData[index].id);
        }
        store2.commit("user/setSelectTaskData", selected);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createVNode(SearchPage, { onHandleSearch: handleSearch }),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "boxTop" }, [
            vue.createCommentVNode(" tab\u5207\u6362 "),
            vue.createVNode(UniTab, {
              tabBars: vue.unref(tabBars),
              ref_key: "tab",
              ref: tab,
              onGetTabIndex: getTabIndex
            }, null, 8, ["tabBars"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u8DDD\u79BB\\\u65F6\u95F4\\\u8D85\u65F6\u7B5B\u9009 "),
            vue.unref(tabIndex) === 0 && vue.unref(users).deliveryData.length > 0 ? (vue.openBlock(), vue.createBlock(ListFiltrate, {
              key: 0,
              onGetList: getList
            })) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u53D6\u4EF6\u72B6\u6001\u5217\u8868 "),
            vue.createElementVNode("view", { style: { "padding": "0 0 200rpx 0" } }, [
              vue.createVNode(TabList, {
                tabBars: vue.unref(tabBars),
                tabIndex: vue.unref(tabIndex),
                isAdmin: vue.unref(isAdmin),
                onOnChangeSwiperTab: onChangeSwiperTab,
                onCheckbox: checkbox,
                ref_key: "list",
                ref: list
              }, null, 8, ["tabBars", "tabIndex", "isAdmin"])
            ]),
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
  var PagesPickupIndex = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-0e6a68f8"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pickup/index.vue"]]);
  const _sfc_main$g = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const loadMore = vue.ref();
      let popup2 = vue.ref();
      let isShowCancel = vue.ref(true);
      const tipInfo = vue.ref("\u786E\u5B9A\u8981\u8F6C\u5355\u5417\uFF1F");
      vue.ref("\u5386\u53F2\u53D6\u6D3E");
      let scrollH = vue.ref(0);
      let reload = vue.ref(false);
      let pages = vue.ref(0);
      let pageNum = vue.ref(1);
      const emptyData = vue.ref("\u6682\u65E0\u6570\u636E");
      const anotherCourierId = vue.ref("");
      const searchVal = vue.ref("");
      let page = vue.reactive({
        keyword: "",
        page: 1,
        pageSize: 10
      });
      let itemData = vue.ref([]);
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
      vue.onMounted(() => {
        init();
        uni.getSystemInfo({
          success: (res) => {
            scrollH.value = res.windowHeight - uni.upx2px(200);
          }
        });
      });
      const init = () => {
        getList();
      };
      const getList = async () => {
        reload.value = true;
        await getSameAgency(page).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              reload.value = false;
              itemData.value = itemData.value.concat(res.data.items);
              pages.value = res.data.pages;
              formatAppLog("log", "at pages/turnorder/index.vue:127", pages.value, res.data.pages);
              formatAppLog("log", "at pages/turnorder/index.vue:128", loadMore);
              if (Number(pages.value) === pageNum.value) {
                loadMore.value.status = "noMore";
              }
            } else {
              itemData.value = null;
            }
          }
        }).catch((err) => {
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
        await transferBatch(params).then((res) => {
          if (res.code === 200) {
            uni.navigateTo({
              url: "/pages/pickup/index"
            });
            return uni.showToast({
              title: "\u8F6C\u5355\u6210\u529F!",
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const handleSearch = () => {
        page.keyword = searchVal.value;
        itemData.value = [];
        getList();
      };
      const handleCancel = () => {
        searchVal.value = "";
        uni.redirectTo({
          url: "/pages/delivery/index"
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u641C\u7D22nav "),
          vue.createCommentVNode(' <SearchPage @handleSearch="handleSearch" @goBack="goBack" :isShowCancel="isShowCancel"></SearchPage> '),
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
                    placeholder: "\u8F93\u5165\u6D3E\u4EF6\u5458\u59D3\u540D\u6216\u8D26\u53F7",
                    onInput: handleSearch
                  }, null, 544), [
                    [vue.vModelText, searchVal.value]
                  ]),
                  vue.createCommentVNode(' <view class="scanIcon" @click="handleQr"></view> ')
                ]),
                vue.unref(isShowCancel) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "concelBox",
                  onClick: handleCancel
                }, "\u53D6\u6D88")) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createCommentVNode(" </uni-nav-bar> "),
              vue.createCommentVNode(" end ")
            ])
          ]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "boxTop" }, [
            vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "btnBox turnBox"
            }, [
              vue.createElementVNode("scroll-view", { "scroll-y": "true" }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(itemData), (item, index) => {
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
              vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
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
  var PagesTurnorderIndex = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-566d70cb"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/turnorder/index.vue"]]);
  const _sfc_main$f = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const taskId = users.taskId;
      const title = vue.ref("\u8BA2\u5355\u53D6\u6D88\u539F\u56E0\u7533\u8BF7");
      let reasonDesc = vue.ref("");
      let reason = users.reasonVal !== "" ? users.reasonVal : "";
      const detailsData = vue.ref({});
      vue.onMounted(() => {
        if (users.reasonDesc !== "") {
          reasonDesc.value = users.reasonDesc;
        }
        getDetails(taskId);
      });
      const getDetails = async (id) => {
        await getDetail(id).then((res) => {
          detailsData.value = res.data;
        }).catch((err) => {
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
          detailsData.value;
          const params = {
            id: taskId,
            isRedistribute: users.isRedistribute,
            reason: users.reasonVal,
            reasonDesc: reasonDesc.value
          };
          await taskCancel(params).then((res) => {
            uni.redirectTo({
              url: "/pages/pickup/index"
            });
            if (res.code === 200) {
              return uni.showToast({
                title: "\u7533\u8BF7\u6210\u529F!",
                duration: 1e3,
                icon: "none"
              });
            }
          }).catch((err) => {
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
                  vue.createElementVNode("text", null, "\u8FD0\u5355\u53F7\uFF1A"),
                  vue.createElementVNode("view", null, vue.toDisplayString(detailsData.value.transportOrderId), 1)
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
                class: "btn-default uni-mini",
                onClick: handleSubmit
              }, "\u786E\u5B9A")
            ])
          ])
        ], 64);
      };
    }
  };
  var PagesCancelIndex = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-3ce92776"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/cancel/index.vue"]]);
  const _sfc_main$e = {
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
        store2.commit("user/setReasonVal", item.label);
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
  var PagesCancelCause = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-17014f8d"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/cancel/cause.vue"]]);
  const _sfc_main$d = {
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
      vue.onMounted(() => {
        formatAppLog("log", "at pages/details/components/address.vue:37", taskType);
      });
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
            ])
          ])
        ]);
      };
    }
  };
  var Address = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/components/address.vue"]]);
  const _sfc_main$c = {
    __name: "authentication",
    props: {
      detailsData: {
        type: Object,
        default: () => ({})
      }
    },
    setup(__props, { expose }) {
      const customForm = vue.ref();
      let idCard = vue.ref("");
      let name = vue.ref("");
      let isValidate = vue.ref(false);
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
        await idCardCheck(params).then((res) => {
          if (res.code === 200) {
            return uni.showToast({
              title: "\u9A8C\u8BC1\u6210\u529F",
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
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
            __props.detailsData.idCardNoVerify === 0 ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, [
              vue.createTextVNode(" \u8EAB\u4EFD\u9A8C\u8BC1\uFF08\u672A\u9A8C\u8BC1\uFF09 "),
              vue.createElementVNode("icon", { class: "iconTip" })
            ])) : __props.detailsData.idCardNoVerify === 1 ? (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, [
              vue.createTextVNode(" \u8EAB\u4EFD\u9A8C\u8BC1\uFF08\u9A8C\u8BC1\u901A\u8FC7\uFF09 "),
              vue.createCommentVNode(' <icon class="iconTip"></icon> ')
            ])) : (vue.openBlock(), vue.createElementBlock("text", { key: 2 }, [
              vue.createTextVNode(" \u8EAB\u4EFD\u9A8C\u8BC1\uFF08\u9A8C\u8BC1\u672A\u901A\u8FC7\uFF09 "),
              vue.createElementVNode("icon", { class: "iconTip" })
            ]))
          ]),
          vue.createElementVNode("view", { class: "identityBox" }, [
            __props.detailsData.idCardNoVerify !== 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
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
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "text"
            }, vue.toDisplayString(__props.detailsData.idCardNo), 1))
          ])
        ]);
      };
    }
  };
  var Authentication = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/components/authentication.vue"]]);
  const _sfc_main$b = {
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
        dialogOpen
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$2);
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
                }, "\u786E\u5B9A")
              ])
            ]),
            _: 1
          }, 512)
        ]);
      };
    }
  };
  var Uppop$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/components/uppop.vue"]]);
  const _sfc_main$a = {
    __name: "index",
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      const goods = vue.ref();
      const card = vue.ref();
      const method = vue.ref();
      const taskId = store2.state.user.taskId;
      const title = vue.ref("\u53BB\u53D6\u4EF6");
      let type = vue.ref(0);
      const detailsData = vue.ref({});
      let isFreigthEdit = vue.ref(false);
      let freight = vue.ref(0);
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
      });
      const getDetails = async (id) => {
        await getDetail(id).then((res) => {
          detailsData.value = res.data;
          freight.value = detailsData.value.freight;
          store2.commit("user/setDetailsData", res.data);
        }).catch((err) => {
        });
      };
      const handleSubmit = async () => {
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
          const params = {
            amount: good.freightData ? good.freightData : Number(details.freight),
            id: taskId,
            goodName: details.GoodTypeName,
            idCard: details.idCardNoVerify === 1 ? null : cards.idCard,
            name: details.idCardNoVerify === 1 ? null : details.name,
            paymentMethod: details.paymentMethod,
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
          details.paymentMethod;
          await getPickup(params).then((res) => {
            if (res.code === 200) {
              const type2 = details.paymentMethod;
              uni.redirectTo({
                url: "/pages/pay/index?type=" + type2
              });
            }
          }).catch((err) => {
            return uni.showToast({
              title: err.msg,
              duration: 1e3,
              icon: "none"
            });
          });
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
        formatAppLog("log", "at pages/details/index.vue:223", detailsData);
      };
      const handleAmount = () => {
        vue.nextTick(() => {
          if (freight.value < 1) {
            freight.value = 1;
          }
        });
      };
      const getGoodType = (val) => {
        detailsData.value.GoodTypeName = val;
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
      };
      const handlePayMethod = () => {
        type.value = 2;
        handleOpen();
      };
      const getRemark = (val) => {
        detailsData.value.remark = val;
      };
      const handleRemark = () => {
        type.value = 3;
        handleOpen();
      };
      const handleOpen = () => {
        method.value.dialogOpen();
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
            vue.createVNode(Address, { detailsData: detailsData.value }, null, 8, ["detailsData"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u7269\u54C1\u4FE1\u606F "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "\u7269\u54C1\u540D\u79F0"),
                vue.createElementVNode("view", {
                  class: "goodsSelect",
                  onClick: handleGoods
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.GoodTypeName), 1),
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ])
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
                ])
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u4ED8\u6B3E\u65B9\u5F0F "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "\u4ED8\u6B3E\u65B9\u5F0F"),
                vue.createElementVNode("view", {
                  class: "goodsSelect",
                  onClick: handlePayMethod
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.paymentMethod === 1 ? "\u5BC4\u4ED8" : "\u5230\u4ED8"), 1),
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ])
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u5907\u6CE8 "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "\u5907\u6CE8"),
                vue.createElementVNode("view", {
                  class: "goodsSelect",
                  onClick: handleRemark
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(detailsData.value.remark), 1),
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ])
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
              vue.createElementVNode("button", {
                class: "btn-default uni-mini",
                onClick: handleSubmit
              }, "\u53BB\u53D6\u4EF6")
            ]),
            vue.createCommentVNode(" \u7269\u54C1\u540D\u79F0\u3001\u4ED8\u6B3E\u9009\u62E9\u3001\u5907\u6CE8\u5F39\u5C42 "),
            vue.createVNode(Uppop$1, {
              ref_key: "method",
              ref: method,
              onGetGoodType: getGoodType,
              onGetPayMethod: getPayMethod,
              onGetRemark: getRemark,
              type: vue.unref(type)
            }, null, 8, ["type"]),
            vue.createCommentVNode(" end ")
          ])
        ], 64);
      };
    }
  };
  var PagesDetailsIndex = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-54d3589c"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/index.vue"]]);
  const _sfc_main$9 = {
    __name: "waybill",
    emits: "",
    setup(__props, { emit }) {
      const store2 = useStore();
      const users = store2.state.user;
      const taskStatus = users.taskStatus;
      const sign = vue.ref();
      const taskId = users.taskId;
      const title = vue.ref("\u8FD0\u5355\u8BE6\u60C5");
      let detailsData = vue.ref({});
      let type = vue.ref(0);
      vue.onMounted(() => {
        getDetails(taskId);
      });
      const getDetails = async (id) => {
        await getDetail(id).then((res) => {
          detailsData.value = res.data;
          store2.commit("user/setDetailsData", res.data);
        }).catch((err) => {
        });
      };
      const handleRejection = async (id) => {
        await rejection(id).then((res) => {
          if (res.code === 200) {
            uni.showToast({
              title: "\u7528\u6237\u62D2\u6536",
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const handleSign = async (id) => {
        ({
          id,
          signRecipient: detailsData.value.signRecipient
        });
        await tasksSign(id).then((res) => {
          if (res.code === 200) {
            const type2 = detailsData.value.paymentMethod;
            uni.redirectTo({
              url: "/pages/pay/index?isDelivery=true&type=" + type2
            });
          }
        }).catch((err) => {
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
        formatAppLog("log", "at pages/details/waybill.vue:182", taskStatus);
        if (taskStatus === 1 || taskStatus === 2 || taskStatus === 3) {
          uni.redirectTo({
            url: "/pages/pickup/index"
          });
        } else {
          uni.redirectTo({
            url: "/pages/delivery/index"
          });
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
            vue.createVNode(Address, { detailsData: vue.unref(detailsData) }, null, 8, ["detailsData"]),
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
                  vue.createTextVNode("\u7B7E\u6536\u4EBA"),
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(detailsData).paymentMethod === 1 ? "\u672C\u4EBA" : "\u4EE3\u6536"), 1)
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" end ")
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u5F53\u72B6\u6001\u662F\u53BB\u6D3E\u4EF64\u7684\u65F6\u5019\u663E\u793A\u7B7E\u6536\u4EBA\u9009\u62E9\u3001\u62D2\u6536\u3001\u7B7E\u6536\u6309\u94AE "),
            vue.unref(taskStatus) === 4 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "boxBg"
            }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "\u7B7E\u6536\u4EBA"),
                vue.createElementVNode("view", {
                  class: "goodsSelect",
                  onClick: handleSignOpen
                }, [
                  vue.createElementVNode("text", { class: "textInfo" }, vue.toDisplayString(vue.unref(detailsData).signRecipient === 1 ? "\u672C\u4EBA" : "\u4EE3\u6536"), 1),
                  vue.createElementVNode("icon", { class: "nextIcon" })
                ])
              ])
            ])) : vue.createCommentVNode("v-if", true),
            vue.unref(taskStatus) === 4 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "btnBox subBtnBox"
            }, [
              vue.createElementVNode("button", {
                class: "btn-default uni-sub-btn",
                onClick: _cache[0] || (_cache[0] = ($event) => handleRejection(vue.unref(detailsData).id))
              }, "\u62D2\u6536"),
              vue.createElementVNode("button", {
                class: "btn-default",
                onClick: _cache[1] || (_cache[1] = ($event) => handleSign(vue.unref(detailsData).id))
              }, "\u7B7E\u6536")
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u5F53\u72B6\u6001\u662F\u5DF2\u53D6\u4EF62\u6216\u8005\u5DF2\u7B7E\u65365\u663E\u793A\u8DDF\u8E2A\u6309\u94AE "),
            vue.unref(taskStatus) === 2 || vue.unref(taskStatus) === 5 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "btnBox"
            }, [
              vue.createElementVNode("button", {
                class: "btn-default uni-mini",
                onClick: handleOrder
              }, "\u8BA2\u5355\u8DDF\u8E2A")
            ])) : vue.createCommentVNode("v-if", true),
            vue.createCommentVNode(" end "),
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
  var PagesDetailsWaybill = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-6bc258c0"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/details/waybill.vue"]]);
  const _sfc_main$8 = {
    __name: "index",
    setup(__props) {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1].$page.options;
      const type = currentPage.type;
      const isDelivery = currentPage.isDelivery;
      const title = isDelivery ? "\u7B7E\u6536\u6210\u529F" : "\u53D6\u4EF6\u6210\u529F";
      let isLeftText = vue.ref(true);
      vue.onMounted(() => {
      });
      const goBack = () => {
        uni.redirectTo({
          url: "/pages/details/index"
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: vue.unref(title),
            onGoBack: goBack,
            isLeftText: vue.unref(isLeftText)
          }, null, 8, ["title", "isLeftText"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "pickUp" }, [
            vue.createElementVNode("icon"),
            vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(isDelivery) ? "\u7B7E\u6536\u6210\u529F" : "\u53D6\u4EF6\u6210\u529F"), 1),
            vue.createElementVNode("view", { class: "btnBox" }, [
              vue.unref(type) === "1" ? (vue.openBlock(), vue.createElementBlock("navigator", {
                key: 0,
                url: "/pages/pay/scanPay",
                "open-type": "redirect"
              }, "\u53BB\u6536\u6B3E")) : (vue.openBlock(), vue.createElementBlock("navigator", {
                key: 1,
                url: "/pages/index/index",
                "open-type": "redirect"
              }, "\u8FD4\u56DE\u9996\u9875"))
            ])
          ])
        ], 64);
      };
    }
  };
  var PagesPayIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-32f2f1fc"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pay/index.vue"]]);
  const _sfc_main$7 = {
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
          url: "/pages/delivery/index"
        });
      };
      expose({
        dialogOpen
      });
      return (_ctx, _cache) => {
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$2);
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
  var Uppop = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pay/components/uppop.vue"]]);
  const _sfc_main$6 = {
    __name: "scanPay",
    setup(__props) {
      const store2 = useStore();
      const users = store2.state.user;
      const uppop = vue.ref();
      const title = vue.ref("\u626B\u7801\u652F\u4ED8");
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      currentPage.$page.options.type;
      let isLeftText = true;
      let current = vue.ref(0);
      let qrCodeImg = vue.ref("");
      let times = vue.ref(null);
      vue.onMounted(() => {
        getCode();
        times.value = setInterval(() => {
          getPaySucceed();
        }, 1e4);
      });
      const getPaySucceed = async () => {
        await paySucceed(users.detailsData.orderId).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              uppop.value.dialogOpen();
              clearInterval(times.value);
            }
          }
        }).catch((err) => {
        });
      };
      const getCode = async () => {
        const data = users.payData;
        const params = {
          enterpriseId: "1001",
          memo: data.memo ? data.memo : "\u5907\u6CE8",
          payMethod: current.value === 0 ? 2 : 1,
          productOrderNo: data.productOrderNo,
          tradingAmount: data.tradingAmount
        };
        await getQrCode(params).then((res) => {
          qrCodeImg.value = res.data.qrCode.replace(/[\r\n]/g, "");
        }).catch((err) => {
        });
      };
      const checkbox = (index) => {
        current.value = index;
        formatAppLog("log", "at pages/pay/scanPay.vue:92", current.value);
        getCode();
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createCommentVNode(" \u81EA\u5B9A\u4E49\u5934\u90E8 "),
          vue.createVNode(UniNav, {
            title: title.value,
            onGoBack: _ctx.goBack,
            isLeftText: vue.unref(isLeftText)
          }, null, 8, ["title", "onGoBack", "isLeftText"]),
          vue.createCommentVNode(" end "),
          vue.createElementVNode("view", { class: "pageBox scanPay" }, [
            vue.createElementVNode("view", { class: "boxBg srCan" }, [
              vue.createElementVNode("image", { src: vue.unref(qrCodeImg) }, null, 8, ["src"]),
              vue.createCommentVNode(' <image src="../../static/scanPay.png"></image> '),
              vue.createElementVNode("view", { class: "text" }, [
                vue.createElementVNode("text", null, "\xA5"),
                vue.createTextVNode(" " + vue.toDisplayString(vue.unref(users).payData.tradingAmount), 1)
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
                    vue.createTextVNode(vue.toDisplayString(item.label), 1)
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
  var PagesPayScanPay = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-a4052eca"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/pages/pay/scanPay.vue"]]);
  const _sfc_main$5 = {
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
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render], ["__scopeId", "data-v-978a5ada"], ["__file", "D:/project/project-wl-kuaidiyuan-uniapp-vue3/uni_modules/uni-rate/components/uni-rate/uni-rate.vue"]]);
  const _sfc_main$4 = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      let baseData = store2.state.user.userBase;
      vue.onMounted(() => {
        formatAppLog("log", "at pages/my/index.vue:85", baseData);
      });
      const handleOut = () => {
        uni.removeStorageSync("token");
        uni.clearStorage();
        store2.commit("setFootStatus", 0);
        uni.redirectTo({
          url: "/pages/login/user"
        });
      };
      const handleQr = () => {
        uni.navigateTo({
          url: "/pages/my/qrCode"
        });
        uni.showToast({
          title: "\u7A0B\u5E8F\u5458\u54E5\u54E5\u6B63\u5728\u5B9E\u73B0\u4E2D",
          duration: 1e3,
          icon: "none"
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_rate = resolveEasycom(vue.resolveDynamicComponent("uni-rate"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createElementVNode("view", { class: "navFrame" }, [
            vue.createCommentVNode(" \u6211\u7684\u8BC4\u4EF7 "),
            vue.createElementVNode("view", { class: "nav-bg mnav-bg" }, [
              vue.createElementVNode("view", { class: "headBg" }),
              vue.createElementVNode("view", { class: "header" }, [
                vue.createElementVNode("view", { class: "headBox" }, [
                  vue.createElementVNode("view", { class: "head" }, [
                    vue.unref(baseData).avatar === "" ? (vue.openBlock(), vue.createElementBlock("icon", { key: 0 })) : (vue.openBlock(), vue.createElementBlock("image", {
                      key: 1,
                      src: vue.unref(baseData).avatar
                    }, null, 8, ["src"]))
                  ]),
                  vue.createElementVNode("view", { class: "info" }, [
                    vue.createElementVNode("view", { class: "tit" }, vue.toDisplayString(vue.unref(baseData).name), 1),
                    vue.createElementVNode("view", null, vue.toDisplayString(vue.unref(baseData).account), 1),
                    vue.createElementVNode("view", { class: "address" }, [
                      vue.createElementVNode("icon"),
                      vue.createTextVNode(" " + vue.toDisplayString(vue.unref(baseData).agencyName ? vue.unref(baseData).agencyName : "\u6682\u65E0"), 1)
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
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u6211\u7684\u8BC4\u4EF7\u3001\u6392\u73ED\u65F6\u95F4 "),
            vue.createElementVNode("view", { class: "boxBg headTop" }, [
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
                  vue.createElementVNode("text", null, vue.toDisplayString(vue.unref(overTimeFormat)(vue.unref(baseData).startTime)) + "-" + vue.toDisplayString(vue.unref(overTimeFormat)(vue.unref(baseData).endTime)), 1)
                ])
              ])
            ]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" \u5386\u53F2\u53D6\u6D3E\u3001\u4F5C\u4E1A\u8303\u56F4 "),
            vue.createElementVNode("view", { class: "boxBg" }, [
              vue.createElementVNode("view", { class: "headItem" }, [
                vue.createElementVNode("navigator", {
                  url: "/pages/history/index",
                  "open-type": "redirect"
                }, [
                  vue.createElementVNode("view", { class: "item" }, [
                    vue.createElementVNode("text", null, "\u5386\u53F2\u53D6\u6D3E"),
                    vue.createElementVNode("text", null, [
                      vue.createElementVNode("icon", { class: "nextIcon" })
                    ])
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
            ]),
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
              "longitude": 116.475334,
              "latitude": 39.997534
            },
            {
              "longitude": 116.476627,
              "latitude": 39.998315
            },
            {
              "longitude": 116.478603,
              "latitude": 39.99879
            },
            {
              "longitude": 116.478529,
              "latitude": 40.000296
            },
            {
              "longitude": 116.475082,
              "latitude": 40.000151
            },
            {
              "longitude": 116.473421,
              "latitude": 39.998717
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
        await getUserScope().then((res) => {
          if (res.code === 200)
            ;
        }).catch(() => {
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
      const title = vue.ref("\u8BA2\u5355\u8FFD\u8E2A");
      const latitude = vue.ref(39.91667);
      const longitude = vue.ref(116.41667);
      const markers = vue.reactive([
        {
          id: 1,
          latitude: 39.91667,
          longitude: 116.41667,
          iconPath: "../../static/icon26.png",
          width: 90,
          height: 90,
          joinCluster: true,
          title: "\u5DF2\u7B7E\u6536",
          callout: {
            content: "\u5DF2\u7B7E\u6536",
            color: "#2A2929",
            fontSize: 17,
            borderRadius: 15,
            padding: 10,
            bgColor: "#fff",
            display: "ALWAYS"
          }
        },
        {
          id: 2,
          latitude: 32.05,
          longitude: 118.78333,
          iconPath: "../../static/icon26.png",
          width: 90,
          height: 90,
          joinCluster: true,
          title: "\u5DF2\u53D1\u8D27",
          callout: {
            content: "\u5DF2\u53D1\u8D27",
            color: "#2A2929",
            fontSize: 17,
            borderRadius: 15,
            padding: 10,
            bgColor: "#fff",
            display: "ALWAYS"
          }
        }
      ]);
      const polyline = vue.reactive([
        {
          points: [{ longitude: 116.41667, latitude: 39.91667 }, { longitude: 118.78333, latitude: 32.05 }],
          color: "#EF4F3F",
          width: 12
        }
      ]);
      vue.onMounted(() => {
        getTrack();
      });
      const getTrack = async () => {
        await getTracks(users.detailsData.transportOrderId).then((res) => {
          if (res.code === 200) {
            formatAppLog("log", "at pages/details/orderMap.vue:115", res.data);
            polyline[0].points = res.data.data;
            formatAppLog("log", "at pages/details/orderMap.vue:117", polyline.points);
          }
        }).catch((err) => {
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
              markers,
              polyline,
              scale: "4"
            }, null, 8, ["latitude", "longitude", "markers", "polyline"])
          ]),
          vue.createElementVNode("view", { class: "bottmBox" }, [
            vue.createElementVNode("view", { class: "orderList" }, [
              vue.createElementVNode("view", { class: "item" }, [
                vue.createElementVNode("view", { class: "iconBg harvest" }, "\u6536"),
                vue.createElementVNode("view", { class: "rtext" }, [
                  vue.createElementVNode("view", { class: "tit" }, "\u5DF2\u7B7E\u6536"),
                  vue.createElementVNode("view", { class: "time" }, "2022-06-23 19:32:08"),
                  vue.createElementVNode("view", { class: "info" }, "\u5FEB\u4EF6\u5DF2\u7B7E\u6536\uFF0C\u5982\u6709\u7591\u95EE\u8BF7\u7535\u8054\u5FEB\u9012\u5458\u3010\u5218\u5370\u5F3A\uFF0C\u7535\u8BDD 13333090067\u3011\u611F\u8C22\u4F7F\u7528\u795E\u9886\u3002")
                ])
              ]),
              vue.createElementVNode("view", { class: "item" }, [
                vue.createElementVNode("view", { class: "iconBg" }, [
                  vue.createElementVNode("icon", { class: "transport" })
                ]),
                vue.createElementVNode("view", { class: "rtext" }, [
                  vue.createElementVNode("view", { class: "tit" }, "\u8FD0\u8F93\u4E2D"),
                  vue.createElementVNode("view", { class: "time" }, "2022-06-19 19:32:23"),
                  vue.createElementVNode("view", { class: "info" }, "\u3010\u4E0A\u6D77\u6D66\u4E1C\u533A\u516C\u53F8\u3011\u5DF2\u53D6\u4EF6\uFF0C \u53D6\u4EF6\u4EBA\u3010\u5218\u5370\u5F3A\uFF0C\u7535\u8BDD 13333090067\u3011")
                ])
              ]),
              vue.createElementVNode("view", { class: "item" }, [
                vue.createElementVNode("view", { class: "iconBg" }, [
                  vue.createElementVNode("icon", { class: "pickUp" })
                ]),
                vue.createElementVNode("view", { class: "rtext" }, [
                  vue.createElementVNode("view", { class: "tit" }, "\u5DF2\u53D6\u4EF6"),
                  vue.createElementVNode("view", { class: "time" }, "2022-06-19 19:32:23"),
                  vue.createElementVNode("view", { class: "info" }, "\u3010\u4E0A\u6D77\u6D66\u4E1C\u533A\u516C\u53F8\u3011\u5DF2\u53D6\u4EF6\uFF0C \u53D6\u4EF6\u4EBA\u3010\u5218\u5370\u5F3A\uFF0C\u7535\u8BDD 13333090067\u3011")
                ])
              ])
            ])
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
          success: (res) => {
            locationData.value = {
              longitude: res.longitude,
              latitude: res.latitude
            };
            formatAppLog("log", "at App.vue:18", res, 22222);
            store2.commit("user/setlLacation", locationData.value);
          },
          fail: (err) => {
            formatAppLog("log", "at App.vue:22", err);
          }
        });
        uni.getNetworkType({
          success: function(res) {
            formatAppLog("log", "at App.vue:27", res.networkType);
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
        payData: {}
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
      }
    },
    actions: {
      async GetUsersInfo({ state, commit }, payload) {
        if (state.token !== "") {
          await getUserInfo().then((res) => {
            commit("setUserInfo", res.data);
          }).catch((err) => {
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
