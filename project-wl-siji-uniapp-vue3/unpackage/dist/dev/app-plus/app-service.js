if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
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
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$W = {
    name: "StarPage",
    setup: (props) => {
      vue.onMounted(() => {
        const times = setTimeout(() => {
          uni.redirectTo({
            url: "/pages/login/user"
          });
          clearTimeout(times);
        }, 1e3);
      });
      return {};
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "starPage" });
  }
  const PagesStartIndex = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$p], ["__scopeId", "data-v-255b53b3"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/start/index.vue"]]);
  const icons = {
    "id": "2852637",
    "name": "uniui图标库",
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
  const _sfc_main$V = {
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
        let code = this.icons.find((v2) => v2.font_class === this.type);
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
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["render", _sfc_render$o], ["__scopeId", "data-v-d31e1c47"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
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
  const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
  const _sfc_main$U = {
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
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ height: $data.statusBarHeight }),
        class: "uni-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$n], ["__scopeId", "data-v-7920e3e0"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue"]]);
  const getVal = (val) => typeof val === "number" ? val + "px" : val;
  const _sfc_main$T = {
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
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_status_bar = vue.resolveComponent("status-bar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-navbar", { "uni-dark": $props.dark }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass([{ "uni-navbar--fixed": $props.fixed, "uni-navbar--shadow": $props.shadow, "uni-navbar--border": $props.border }, "uni-navbar__content"]),
            style: vue.normalizeStyle({ "background-color": $options.themeBgColor })
          },
          [
            $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle({ color: $options.themeColor, backgroundColor: $options.themeBgColor, height: $options.navbarHeight }),
                class: "uni-navbar__header"
              },
              [
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClickLeft && $options.onClickLeft(...args)),
                    class: "uni-navbar__header-btns uni-navbar__header-btns-left",
                    style: vue.normalizeStyle({ width: $options.leftIconWidth })
                  },
                  [
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
                      $props.leftText.length ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 1,
                          class: vue.normalizeClass([{ "uni-navbar-btn-icon-left": !$props.leftIcon.length > 0 }, "uni-navbar-btn-text"])
                        },
                        [
                          vue.createElementVNode(
                            "text",
                            {
                              style: vue.normalizeStyle({ color: $options.themeColor, fontSize: "12px" })
                            },
                            vue.toDisplayString($props.leftText),
                            5
                            /* TEXT, STYLE */
                          )
                        ],
                        2
                        /* CLASS */
                      )) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", {
                  class: "uni-navbar__header-container",
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickTitle && $options.onClickTitle(...args))
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, () => [
                    $props.title.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "uni-navbar__header-container-inner"
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uni-nav-bar-text uni-ellipsis-1",
                          style: vue.normalizeStyle({ color: $options.themeColor })
                        },
                        vue.toDisplayString($props.title),
                        5
                        /* TEXT, STYLE */
                      )
                    ])) : vue.createCommentVNode("v-if", true)
                  ], true)
                ]),
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[2] || (_cache[2] = (...args) => $options.onClickRight && $options.onClickRight(...args)),
                    class: "uni-navbar__header-btns uni-navbar__header-btns-right",
                    style: vue.normalizeStyle({ width: $options.rightIconWidth })
                  },
                  [
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
                        vue.createElementVNode(
                          "text",
                          {
                            class: "uni-nav-bar-right-text",
                            style: vue.normalizeStyle({ color: $options.themeColor })
                          },
                          vue.toDisplayString($props.rightText),
                          5
                          /* TEXT, STYLE */
                        )
                      ])) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  4
                  /* STYLE */
                )
              ],
              4
              /* STYLE */
            )
          ],
          6
          /* CLASS, STYLE */
        ),
        $props.fixed ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-navbar__placeholder"
        }, [
          $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: "uni-navbar__placeholder-view",
              style: vue.normalizeStyle({ height: $options.navbarHeight })
            },
            null,
            4
            /* STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$m], ["__scopeId", "data-v-26544265"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"]]);
  const _sfc_main$S = {
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
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
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
      /**
       * 初始化变量值
       */
      init() {
      },
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 获取父元素实例
       */
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
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle({ color: $props.inputBorder && $options.msg ? "#e43d33" : $props.styles.color })
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", { "is-input-border": $props.inputBorder, "is-input-error-border": $props.inputBorder && $options.msg, "is-textarea": $props.type === "textarea", "is-disabled": $props.disabled }]),
            style: vue.normalizeStyle({ "border-color": $props.inputBorder && $options.msg ? "#dd524d" : $props.styles.borderColor, "background-color": $props.disabled ? $props.styles.disableColor : "" })
          },
          [
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
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 3 },
              [
                $data.val ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 18,
                  color: "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : $props.suffixIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: "content-clear-icon",
                  type: $props.suffixIcon,
                  color: "#c0c4cc",
                  onClick: _cache[9] || (_cache[9] = ($event) => $options.onClickIcon("suffix"))
                }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 5 },
              [
                $props.clearable && $data.val && !$props.disabled ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$l], ["__scopeId", "data-v-09fd5285"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$R = {
    name: "uniFormsItem",
    props: {
      // 自定义内容
      custom: {
        type: Boolean,
        default: false
      },
      // 是否显示报错信息
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
      // 左边标题的宽度单位px
      labelWidth: {
        type: [Number, String],
        default: ""
      },
      // 对齐方式，left|center|right
      labelAlign: {
        type: String,
        default: ""
      },
      // lable的位置，可选为 left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 表单校验规则
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
      // uni不支持在computed中写style.justifyContent = 'center'的形式，故用此方法
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
      /**
       * 获取父元素实例
       */
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
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      /**
       * 子组件调用，如 easyinput
       * @param {Object} value
       */
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
      /**
       * 校验规则
       * @param {Object} value
       */
      async triggerCheck(value, formTrigger) {
        this.errMsg = "";
        if (!this.validator || Object.keys(this.formRules).length === 0)
          return;
        const isNoField = this.isRequired(this.formRules.rules || []);
        let isTrigger = this.isTrigger(this.formRules.validateTrigger, this.validateTrigger, this.form.validateTrigger);
        let result = null;
        if (!!isTrigger || formTrigger) {
          let name = this.isArray ? this.arrayField : this.name;
          result = await this.validator.validateUpdate(
            {
              [name]: value
            },
            this.form.formData
          );
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
              title: result.errorMessage || "校验错误",
              icon: "none"
            });
          }
          if (this.form.errShowType === "modal") {
            uni.showModal({
              title: "提示",
              content: result.errorMessage || "校验错误"
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
      /**
       * 触发时机
       * @param {Object} event
       */
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
      // 是否有必填字段
      isRequired(rules) {
        let isNoField = false;
        for (let i2 = 0; i2 < rules.length; i2++) {
          const ruleData = rules[i2];
          if (ruleData.required) {
            isNoField = true;
            break;
          }
        }
        return isNoField;
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", { "uni-forms-item--border": $data.border, "is-first-border": $data.border && $data.isFirstBorder, "uni-forms-item-error": $options.msg }])
      },
      [
        vue.createElementVNode("view", { class: "uni-forms-item__box" }, [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__inner", ["is-direction-" + $data.labelPos]])
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: "uni-forms-item__label",
                  style: vue.normalizeStyle({ width: $data.labelWid, justifyContent: $options.justifyContent })
                },
                [
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
                    vue.createElementVNode(
                      "text",
                      { class: "label-text" },
                      vue.toDisplayString($props.label),
                      1
                      /* TEXT */
                    ),
                    $props.label ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 2,
                      class: "label-seat"
                    })) : vue.createCommentVNode("v-if", true)
                  ], true)
                ],
                4
                /* STYLE */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-forms-item__content", { "is-input-error-border": $options.msg }])
                },
                [
                  vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          $options.msg ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass(["uni-error-message", { "uni-error-msg--boeder": $data.border }]),
              style: vue.normalizeStyle({
                paddingLeft: $options.labelLeft
              })
            },
            [
              vue.createElementVNode(
                "text",
                { class: "uni-error-message-text" },
                vue.toDisplayString($data.showMsg === "undertext" ? $options.msg : ""),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$k], ["__scopeId", "data-v-462874dd"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
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
    async validateRule(fieldKey, fieldValue, value, data2, allData) {
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
      for (var i2 = 0; i2 < rules.length; i2++) {
        let rule = rules[i2];
        let vt2 = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt2]) {
          result = RuleValidatorHelper[vt2](rule, value, message);
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
          result = await this.validateFunction(rule, value, data2, allData, vt2);
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
    async validateFunction(rule, value, data2, allData, vt2) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data2, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt2);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt2);
      }
      return result;
    }
    _getMessage(rule, message, vt2) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt2] || message["default"]);
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
      for (let i2 = 0; i2 < range.length; i2++) {
        const item = range[i2];
        if (types.object(item) && item.value !== void 0) {
          list[i2] = item.value;
        } else {
          list[i2] = item;
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
      for (let i2 = 0; i2 < value.length; i2++) {
        const element = value[i2];
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
    async validate(data2, allData) {
      let result = this._checkFieldInSchema(data2);
      if (!result) {
        result = await this.invokeValidate(data2, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data2, allData) {
      let result = this._checkFieldInSchema(data2);
      if (!result) {
        result = await this.invokeValidate(data2, true, allData);
      }
      return result;
    }
    async validateUpdate(data2, allData) {
      let result = this._checkFieldInSchema(data2);
      if (!result) {
        result = await this.invokeValidateUpdate(data2, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data2, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data2[key], data2, allData);
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
    async invokeValidateUpdate(data2, all, allData) {
      let result = [];
      for (let key in data2) {
        let errorMessage = await this.validateRule(key, this._schema[key], data2[key], data2, allData);
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
    _checkFieldInSchema(data2) {
      var keys = Object.keys(data2);
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
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const _sfc_main$Q = {
    name: "uniForms",
    components: {},
    emits: ["input", "reset", "validate", "submit"],
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return {};
        }
      },
      // 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return {};
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      // 校验触发器方式，默认 关闭
      validateTrigger: {
        type: String,
        default: ""
      },
      // label 位置，可选值 top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度，单位 px
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，可选值 left/center/right
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
            for (let i2 in this.$refs) {
              const vm = this.$refs[i2];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:152", "当前 uni-froms 组件缺少 ref 属性");
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
    // mounted() {
    // 	this.init(this.rules)
    // },
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
      // 监听 watch
      registerWatch() {
        this.unwatchs.forEach((v2) => v2());
        this.childrens.forEach((v2) => {
          v2.init();
        });
        Object.keys(this.dataValue).forEach((key) => {
          let watch = this.$watch(
            "dataValue." + key,
            (value) => {
              if (!value)
                return;
              if (value.toString() === "[object Object]") {
                for (let i2 in value) {
                  let name = `${key}[${i2}]`;
                  this.formData[name] = this._getValue(name, value[i2]);
                }
              } else {
                this.formData[key] = this._getValue(key, value);
              }
            },
            {
              deep: true,
              immediate: true
            }
          );
          this.unwatchs.push(watch);
        });
      },
      /**
       * 公开给用户使用
       * 设置校验规则
       * @param {Object} formRules
       */
      setRules(formRules) {
        this.init(formRules);
      },
      /**
       * 公开给用户使用
       * 设置自定义表单组件 value 值
       *  @param {String} name 字段名称
       *  @param {String} value 字段值
       */
      setValue(name, value, callback) {
        let example = this.childrens.find((child) => child.name === name);
        if (!example)
          return null;
        value = this._getValue(example.name, value);
        this.formData[name] = value;
        example.val = value;
        return example.triggerCheck(value, callback);
      },
      /**
       * 表单重置
       * @param {Object} event
       */
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
      /**
       * 触发表单校验，通过 @validate 获取
       * @param {Object} validate
       */
      validateCheck(validate) {
        if (validate === null)
          validate = null;
        this.$emit("validate", validate);
      },
      /**
       * 校验所有或者部分表单
       */
      async validateAll(invalidFields, type, keepitem, callback) {
        let childrens = [];
        for (let i2 in invalidFields) {
          const item = this.childrens.find((v2) => v2.name === i2);
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
          keepitem.forEach((v2) => {
            newFormData[v2] = this.dataValue[v2];
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
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       */
      submit(keepitem, callback, type) {
        for (let i2 in this.dataValue) {
          const itemData = this.childrens.find((v2) => v2.name === i2);
          if (itemData) {
            if (this.formData[i2] === void 0) {
              this.formData[i2] = this._getValue(i2, this.dataValue[i2]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:377", "submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.validateAll(this.formData, "submit", keepitem, callback);
      },
      /**
       * 外部调用方法
       * 校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       */
      validate(keepitem, callback) {
        return this.submit(keepitem, callback, true);
      },
      /**
       * 部分表单校验
       * @param {Object} props
       * @param {Object} cb
       */
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
      /**
       * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
       */
      resetFields() {
        this.resetForm();
      },
      /**
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       */
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
      /**
       * 把 value 转换成指定的类型
       * @param {Object} key
       * @param {Object} value
       */
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
      /**
       * 过滤数字类型
       * @param {Object} format
       */
      type_filter(format) {
        return format === "int" || format === "double" || format === "number" || format === "timestamp";
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms", { "uni-forms--top": !$props.border }])
      },
      [
        vue.createElementVNode(
          "form",
          {
            onSubmit: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.submitForm && $options.submitForm(...args), ["stop"])),
            onReset: _cache[1] || (_cache[1] = (...args) => $options.resetForm && $options.resetForm(...args))
          },
          [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$j], ["__scopeId", "data-v-9a1e3c32"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  const popup$1 = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      /**
       * 获取父元素实例
       */
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
    watchLocale(fn2) {
      const index = this.watchers.push(fn2) - 1;
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
      watch(fn2) {
        return i18n.watchLocale(fn2);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en$4 = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  const zhHans$4 = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "确定",
    "uni-popup.placeholder": "请输入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const zhHant$4 = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "確定",
    "uni-popup.placeholder": "請輸入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const messages$4 = {
    en: en$4,
    "zh-Hans": zhHans$4,
    "zh-Hant": zhHant$4
  };
  const { t: t$8 } = initVueI18n(messages$4);
  const _sfc_main$P = {
    name: "uniPopupDialog",
    mixins: [popup$1],
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
        return this.confirmText || t$8("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t$8("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t$8("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t$8("uni-popup.title");
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
      /**
       * 点击确认按钮
       */
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
      /**
       * 点击取消按钮
       */
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
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-dialog" }, [
      vue.createElementVNode("view", { class: "uni-dialog-title" }, [
        $props.title ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
          },
          vue.toDisplayString($options.titleText),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-content-text" },
            vue.toDisplayString($props.content),
            1
            /* TEXT */
          )
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
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-button-text" },
            vue.toDisplayString($options.closeText),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", {
          class: "uni-dialog-button uni-border-left",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
        }, [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-button-text uni-button-color" },
            vue.toDisplayString($options.okText),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$i], ["__scopeId", "data-v-d78c88b7"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
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
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn2) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn2);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn2 === "function" && fn2();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn2) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn2 === "function" && fn2();
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
  const _sfc_main$O = {
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
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
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
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:139", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn2) {
        if (!this.animation)
          return;
        this.animation.run(fn2);
      },
      // 开始过度动画
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
      // 关闭过度动画
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
      // 处理动画开始前的默认样式
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
      // 处理内置组合动画
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
      // 内置动画类型与实际动画对应字典
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
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$h], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$N = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
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
      /**
       * 监听type类型
       */
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
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
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
      // H5 下禁止底部滚动
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
    // TODO vue3
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
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
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
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:280", "缺少类型：", direction);
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
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
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
      /**
       * 顶部弹出样式处理
       */
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
      /**
       * 底部弹出样式处理
       */
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
      /**
       * 中间弹出样式处理
       */
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
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$4);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
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
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$g], ["__scopeId", "data-v-4dd3c44b"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
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
      let currentSettings = { ...defaultSettings };
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data2 = JSON.parse(raw);
        Object.assign(currentSettings, data2);
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
   * vuex v4.1.0
   * (c) 2022 Evan You
   * @license MIT
   */
  var storeKey = "store";
  function useStore(key) {
    if (key === void 0)
      key = null;
    return vue.inject(key !== null ? key : storeKey);
  }
  function forEachValue(obj, fn2) {
    Object.keys(obj).forEach(function(key) {
      return fn2(obj[key], key);
    });
  }
  function isObject(obj) {
    return obj !== null && typeof obj === "object";
  }
  function isPromise(val) {
    return val && typeof val.then === "function";
  }
  function assert(condition2, msg) {
    if (!condition2) {
      throw new Error("[vuex] " + msg);
    }
  }
  function partial(fn2, arg) {
    return function() {
      return fn2(arg);
    };
  }
  function genericSubscribe(fn2, subs, options) {
    if (subs.indexOf(fn2) < 0) {
      options && options.prepend ? subs.unshift(fn2) : subs.push(fn2);
    }
    return function() {
      var i2 = subs.indexOf(fn2);
      if (i2 > -1) {
        subs.splice(i2, 1);
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
    var oldScope = store2._scope;
    store2.getters = {};
    store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
    var wrappedGetters = store2._wrappedGetters;
    var computedObj = {};
    var computedCache = {};
    var scope = vue.effectScope(true);
    scope.run(function() {
      forEachValue(wrappedGetters, function(fn2, key) {
        computedObj[key] = partial(fn2, store2);
        computedCache[key] = vue.computed(function() {
          return computedObj[key]();
        });
        Object.defineProperty(store2.getters, key, {
          get: function() {
            return computedCache[key].value;
          },
          enumerable: true
          // for local getters
        });
      });
    });
    store2._state = vue.reactive({
      data: state
    });
    store2._scope = scope;
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
    if (oldScope) {
      oldScope.stop();
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
            console.warn(
              '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
            );
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
      return rawGetter(
        local.state,
        // local state
        local.getters,
        // local getters
        store3.state,
        // root state
        store3.getters
        // root getters
      );
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
    setupDevtoolsPlugin(
      {
        id: "org.vuejs.vuex",
        app: app2,
        label: "Vuex",
        homepage: "https://next.vuex.vuejs.org/",
        logo: "https://vuejs.org/images/icons/favicon-96x96.png",
        packageName: "vuex",
        componentStateTypes: [LABEL_VUEX_BINDINGS]
      },
      function(api) {
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
            payload.state = formatStoreForInspectorState(
              getStoreModule(store2._modules, modulePath),
              modulePath === "root" ? store2.getters : store2._makeLocalGettersCache,
              modulePath
            );
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
          var data2 = {};
          if (mutation.payload) {
            data2.payload = mutation.payload;
          }
          data2.state = state;
          api.notifyComponentUpdate();
          api.sendInspectorTree(INSPECTOR_ID);
          api.sendInspectorState(INSPECTOR_ID);
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: mutation.type,
              data: data2
            }
          });
        });
        store2.subscribeAction({
          before: function(action, state) {
            var data2 = {};
            if (action.payload) {
              data2.payload = action.payload;
            }
            action._id = actionId++;
            action._time = Date.now();
            data2.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: action._time,
                title: action.type,
                groupId: action._id,
                subtitle: "start",
                data: data2
              }
            });
          },
          after: function(action, state) {
            var data2 = {};
            var duration = Date.now() - action._time;
            data2.duration = {
              _custom: {
                type: "duration",
                display: duration + "ms",
                tooltip: "Action duration",
                value: duration
              }
            };
            if (action.payload) {
              data2.payload = action.payload;
            }
            data2.state = state;
            api.addTimelineEvent({
              layerId: ACTIONS_LAYER_ID,
              event: {
                time: Date.now(),
                title: action.type,
                groupId: action._id,
                subtitle: "end",
                data: data2
              }
            });
          }
        });
      }
    );
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
      // all modules end with a `/`, we want the last segment only
      // cart/ -> cart
      // nested/cart/ -> cart
      label: extractNameFromPath(path),
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
      children: Object.keys(module._children).map(
        function(moduleName) {
          return formatStoreForInspectorTree(
            module._children[moduleName],
            path + moduleName + "/"
          );
        }
      )
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
        path.forEach(function(p2) {
          if (!target[p2]) {
            target[p2] = {
              _custom: {
                value: {},
                display: p2,
                tooltip: "Module",
                abstract: true
              }
            };
          }
          target = target[p2]._custom.value;
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
    var names = path.split("/").filter(function(n2) {
      return n2;
    });
    return names.reduce(
      function(module, moduleName, i2) {
        var child = module[moduleName];
        if (!child) {
          throw new Error('Missing module "' + moduleName + '" for path "' + path + '".');
        }
        return i2 === names.length - 1 ? child : child._children;
      },
      path === "root" ? moduleMap : moduleMap.root._children
    );
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
  Module.prototype.forEachChild = function forEachChild(fn2) {
    forEachValue(this._children, fn2);
  };
  Module.prototype.forEachGetter = function forEachGetter(fn2) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn2);
    }
  };
  Module.prototype.forEachAction = function forEachAction(fn2) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn2);
    }
  };
  Module.prototype.forEachMutation = function forEachMutation(fn2) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn2);
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
        console.warn(
          "[vuex] trying to unregister module '" + key + "', which is not registered"
        );
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
            console.warn(
              "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
            );
          }
          return;
        }
        update(
          path.concat(key),
          targetModule.getChild(key),
          newModule.modules[key]
        );
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
        assert(
          assertOptions.assert(value),
          makeAssertionMessage(path, key, type, value, assertOptions.expected)
        );
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
    this._scope = null;
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
  prototypeAccessors.state.set = function(v2) {
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
      console.warn(
        "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
      );
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
  Store.prototype.subscribe = function subscribe(fn2, options) {
    return genericSubscribe(fn2, this._subscribers, options);
  };
  Store.prototype.subscribeAction = function subscribeAction(fn2, options) {
    var subs = typeof fn2 === "function" ? { before: fn2 } : fn2;
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
  Store.prototype._withCommit = function _withCommit(fn2) {
    var committing = this._committing;
    this._committing = true;
    fn2();
    this._committing = committing;
  };
  Object.defineProperties(Store.prototype, prototypeAccessors);
  const global$1 = {
    // 注意：全局模块中不需要开启命名空间
    state: {
      footStatus: 0,
      // 公用footer的激活状态码
      taskStatus: 0,
      // 任务的Table切换状态记录
      msgStatus: 0,
      // 消息的Table切换状态记录
      isMessage: true
      // 是否开启消息推送
    },
    mutations: {
      // 公用footer的激活码
      setFootStatus(state, provider) {
        state.footStatus = provider;
      },
      // 任务的Table切换状态记录
      setTaskStatus(state, provider) {
        state.taskStatus = provider;
      },
      // 消息的Table切换状态记录
      setMsgStatus(state, provider) {
        state.msgStatus = provider;
      },
      // 是否开启消息推送
      setIsMessage(state, provider) {
        state.isMessage = provider;
      }
    }
  };
  const user = {
    namespaced: true,
    // 开启命名空间
    state() {
      return {
        userBase: {},
        // 用户信息
        loacation: {},
        token: ""
        //token
      };
    },
    mutations: {
      // 定义mutations，用于同步修改状态
      // 设置token
      setToken(state, provider) {
        state.token = provider;
        uni.setStorageSync("token", provider);
      },
      // 设置用户信息
      setUserInfo(state, provider) {
        state.userBase = provider;
      },
      // 设置经纬度
      setlLacation(state, provider) {
        state.loacation = provider;
      }
    },
    actions: {
      // 获取用户信息
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
  const store = createStore({
    // 全局模块
    ...global$1,
    // 局部模块
    modules: {
      user
    }
  });
  function showTot(msg) {
    {
      uni.showToast({
        title: msg,
        duration: 3e3,
        icon: "error"
      });
      return;
    }
  }
  function request({
    url = "",
    params = {},
    method = "GET"
  }) {
    if (!uni.getStorageSync("baseUrl")) {
      uni.showToast({
        title: "请先配置，请求Url！",
        duration: 3e3,
        icon: "none"
      });
      uni.setStorageSync(
        "baseUrl",
        ""
      );
    }
    let baseUrl = uni.getStorageSync("baseUrl");
    store.state;
    const token = uni.getStorageSync("token");
    let header = {};
    if (url == "/track/upload") {
      header["Authorization"] = token;
      header["Content-Type"] = "application/x-www-form-urlencoded";
    } else if (url == "/files/imageUpload") {
      header["Content-Type"] = "multipart/form-data";
      header["Authorization"] = token;
    } else {
      header["Content-Type"] = "application/json;", header["Authorization"] = token;
    }
    const requestRes = new Promise((resolve, reject) => {
      formatAppLog("log", "at utils/request.js:49", baseUrl + url);
      uni.request({
        url: baseUrl + url,
        data: params,
        header,
        method
      }).then((res) => {
        const {
          data: data2
        } = res;
        formatAppLog("log", "at utils/request.js:59", res);
        if (res.statusCode == 400) {
          uni.showToast({
            title: "权限不足，无法登录！",
            duration: 3e3,
            icon: "none"
          });
          uni.redirectTo({
            url: "/pages/login/index"
          });
          return false;
        }
        if (res.statusCode == 401) {
          uni.showToast({
            title: "登录超时，请重新登录！",
            duration: 3e3,
            icon: "none"
          });
          uni.redirectTo({
            url: "/pages/login/index"
          });
          return false;
        }
        if (data2.code == 1) {
          showTot(data2.msg);
          uni.showToast({
            title: data2.msg,
            duration: 2e3,
            icon: "error"
          });
          return false;
        }
        if (data2.code == 0 || data2.code == 200) {
          resolve(res.data);
        } else {
          formatAppLog("log", "at utils/request.js:96", 5e3);
          showTot(data2.msg);
          uni.showToast({
            title: "请求出错了",
            duration: 1e3,
            icon: "error"
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
    return requestRes;
  }
  function requestUpload({
    url = "",
    params = {},
    method = "post"
  }) {
    if (!uni.getStorageSync("baseUrl")) {
      uni.setStorageSync("baseUrl", "http://slwl-geteway.itheima.net/driver");
    }
    let baseUrl = uni.getStorageSync("baseUrl");
    uni.getStorageSync("token");
    const requestRes = new Promise((resolve, reject) => {
      uni.uploadFile({
        url: baseUrl + url,
        // files: file.tempFiles,  // 使用files 会将传参的数据改为 name: 文件名  ： 二进制文件 - {xxx.png: {二进制文件}} 我们需要的是{file: {二进制文件}}
        filePath: params.tempFilePaths[0],
        name: "file",
        header: {
          // Content-Type: multipart/form-data; boundary=----WebKitFormBoundarybf5YhYJ8fOBadphN  加上这个 会失败
          "Authorization": uni.getStorageSync("token")
        }
      }).then((res) => {
        const data2 = JSON.parse(res.data);
        if (data2.code == 0 || data2.code == 200) {
          resolve(data2);
        } else {
          showTot(data2.msg);
          uni.showToast({
            title: "请求出错了！",
            duration: 1e3,
            icon: "error"
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
    return requestRes;
  }
  const phoneLogins = (params) => request({
    url: `/login/phone`,
    method: "post",
    params
  });
  const userLogins = (params) => request({
    url: `/login/account`,
    method: "post",
    params
  });
  const getsmsCode = (params) => request({
    url: `/users/sendCode`,
    method: "post",
    params
  });
  const checksmsCode = (params) => request({
    url: `/users/verifyCode`,
    method: "post",
    params
  });
  const bindPhone = (params) => request({
    url: `/users/editPhone`,
    method: "put",
    params
  });
  const changePass = (params) => request({
    url: `/users/editPassword`,
    method: "put",
    params
  });
  const getUserInfo = (params) => request({
    url: `/users`,
    method: "get",
    params
  });
  const getCarInfo = (params) => request({
    url: `/users/truck`,
    method: "get",
    params
  });
  const getTaskData = (params) => request({
    url: `/users/taskReport`,
    method: "get",
    params
  });
  const _sfc_main$M = {
    __name: "user",
    setup(__props) {
      const store2 = useStore();
      const showPassword = vue.ref(false);
      const customForm = vue.ref();
      const fromInfo = vue.reactive({
        account: "hzsj",
        //账号
        password: "123456"
        // 密码
      });
      const customRules = vue.reactive({
        account: {
          rules: [
            {
              required: true,
              errorMessage: "请输入手机号"
            }
          ]
        },
        password: {
          rules: [
            {
              required: true,
              errorMessage: "请输入验证码"
            }
          ]
        }
      });
      vue.onMounted(() => {
        clearInterval(uni.getStorageSync("positions").timer);
        uni.setStorageSync("positions", null);
      });
      const handleSubmit = async () => {
        const valid = await customForm.value.validate();
        if (valid) {
          await userLogins(fromInfo).then((res) => {
            if (res.code === 200) {
              store2.commit("user/setToken", res.data);
              store2.dispatch("user/GetUsersInfo");
              uni.navigateTo({
                url: "/pages/index/index"
              });
            } else {
              return uni.showToast({
                title: res.data.msg || "请求失败！",
                duration: 1e3,
                icon: "none"
              });
            }
          }).catch((err) => {
          });
        }
      };
      const goLogin = () => {
        uni.navigateTo({
          url: "/pages/login/index"
        });
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
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$6);
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$5);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_4);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 公用nav "),
            vue.createElementVNode("view", { class: "navBox" }, [
              vue.createVNode(_component_uni_nav_bar, {
                title: "神领物流",
                border: false
              })
            ]),
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "loginBox" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "账号登录"),
                vue.createElementVNode("text", {
                  class: "text",
                  onClick: goLogin
                }, [
                  vue.createTextVNode(" 手机号登录 "),
                  vue.createElementVNode("icon")
                ])
              ]),
              vue.createCommentVNode(" 登录表单 "),
              vue.createElementVNode("view", { class: "loginMain" }, [
                vue.createVNode(_component_uni_forms, {
                  ref_key: "customForm",
                  ref: customForm,
                  rules: customRules,
                  modelValue: fromInfo
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { name: "account" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          class: "item",
                          modelValue: fromInfo.account,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fromInfo.account = $event),
                          placeholder: "请输入账号"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, { name: "password" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          class: "item",
                          type: showPassword.value ? "text" : "password",
                          modelValue: fromInfo.password,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => fromInfo.password = $event),
                          placeholder: "请输入密码"
                        }, null, 8, ["type", "modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["rules", "modelValue"]),
                vue.createCommentVNode(" 按钮 "),
                vue.createElementVNode("view", {
                  class: "btnBox",
                  style: { "padding-top": "100rpx" }
                }, [
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["button", fromInfo.account.length === 0 || fromInfo.password.length === 0 ? "buttonDis1" : "button"]),
                      onClick: handleSubmit
                    },
                    "登 录",
                    2
                    /* CLASS */
                  )
                ]),
                vue.createCommentVNode(" 更新请求Url - 教学需求 "),
                vue.createElementVNode("view", {
                  class: "setUrl",
                  onClick: inputDialogToggle
                }, " 配置请求url "),
                vue.createVNode(
                  _component_uni_popup,
                  {
                    ref_key: "inputDialog",
                    ref: inputDialog,
                    type: "dialog"
                  },
                  {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_popup_dialog, {
                        ref: "inputClose",
                        mode: "input",
                        title: "配置URL",
                        value: baseURL.value,
                        placeholder: "请输入baseURL",
                        onConfirm: dialogInputConfirm
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  },
                  512
                  /* NEED_PATCH */
                ),
                vue.createCommentVNode(" 更新请求Url - 教学需求 "),
                vue.createCommentVNode(" end ")
              ]),
              vue.createCommentVNode(" end ")
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesLoginUser = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-ed08f7ea"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/login/user.vue"]]);
  function validatePhone(rule, value, data2, callback) {
    const reg = /^[1][3-9][0-9]{9}$/;
    if (value === "" || value === void 0 || value === null) {
      if (rule.required) {
        callback("请输入手机号码");
      } else {
        callback();
      }
    } else if (!value) {
      callback("手机号码必须全为数字");
    } else if (value.trim().length < 11) {
      callback("手机号码长度必须是11位");
    } else {
      if (!reg.test(value) && value !== "") {
        callback("请输入正确的手机号码");
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
  const _sfc_main$L = {
    __name: "index",
    setup(__props) {
      const store2 = useStore();
      const customForm = vue.ref();
      const isVerifySuccess = vue.ref(false);
      const fromInfo = vue.reactive({
        phone: "",
        //手机号
        verifyCode: ""
        // 验证码
      });
      const codeInfo = vue.reactive({
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
              errorMessage: "请输入手机号"
            }
          ]
        },
        verifyCode: {
          rules: [
            {
              required: true,
              errorMessage: "请输入验证码"
            }
          ]
        }
      });
      vue.onMounted(() => {
      });
      const getCode = async () => {
        let p2 = fromInfo.phone;
        isVerifySuccess.value = isPhone(p2);
        if (isVerifySuccess.value) {
          timeCountdown(codeInfo);
          ({
            phone: phone.value
          });
        } else {
          return uni.showToast({
            title: "手机号输入错误！请重新输入",
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleSubmit = async () => {
        const valid = await customForm.value.validate();
        if (valid) {
          await phoneLogins(fromInfo).then((res) => {
            if (res.code === 200) {
              store2.commit("user/setToken", res.token);
              store2.dispatch("user/GetUsersInfo");
              uni.redirectTo({
                url: "/pages/index/index"
              });
            } else {
              return uni.showToast({
                title: res.data.msg,
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
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_0$6);
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$5);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 公用nav "),
            vue.createElementVNode("view", { class: "navBox" }, [
              vue.createVNode(_component_uni_nav_bar, {
                title: "神领物流",
                border: false
              })
            ]),
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "loginBox" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode("text", null, "手机号登录"),
                vue.createElementVNode("text", {
                  class: "text",
                  onClick: goLogin
                }, [
                  vue.createTextVNode(" 账号登录 "),
                  vue.createElementVNode("icon")
                ])
              ]),
              vue.createCommentVNode(" 登录表单 手机号、验证码 "),
              vue.createElementVNode("view", { class: "loginMain" }, [
                vue.createVNode(_component_uni_forms, {
                  ref_key: "customForm",
                  ref: customForm,
                  rules: customRules,
                  modelValue: fromInfo
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { name: "phone" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          class: "item",
                          modelValue: fromInfo.phone,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fromInfo.phone = $event),
                          placeholder: "请输入手机号"
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(_component_uni_forms_item, { name: "verifyCode" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          class: "item inputW",
                          modelValue: fromInfo.verifyCode,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => fromInfo.verifyCode = $event),
                          placeholder: "请输入验证码"
                        }, null, 8, ["modelValue"]),
                        vue.createElementVNode("view", { class: "codeBox" }, [
                          vue.withDirectives(vue.createElementVNode(
                            "text",
                            {
                              class: "code",
                              onClick: getCode
                            },
                            "获取验证码",
                            512
                            /* NEED_PATCH */
                          ), [
                            [vue.vShow, codeInfo.show]
                          ]),
                          vue.withDirectives(vue.createElementVNode(
                            "text",
                            { class: "code fontCol" },
                            vue.toDisplayString(codeInfo.times) + "s后重新获取",
                            513
                            /* TEXT, NEED_PATCH */
                          ), [
                            [vue.vShow, !codeInfo.show]
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["rules", "modelValue"]),
                vue.createCommentVNode(" 按钮 "),
                vue.createElementVNode("view", {
                  class: "btnBox",
                  style: { "padding-top": "100rpx" }
                }, [
                  vue.createElementVNode(
                    "text",
                    {
                      class: vue.normalizeClass(["button", fromInfo.phone.length === 0 || fromInfo.verifyCode.length === 0 ? "buttonDis1" : "button"]),
                      onClick: handleSubmit
                    },
                    "登 录",
                    2
                    /* CLASS */
                  )
                ]),
                vue.createCommentVNode(" end ")
              ]),
              vue.createCommentVNode(" end ")
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesLoginIndex = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-d08ef7d4"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/login/index.vue"]]);
  const GetTasksList = (params) => request({
    url: "/tasks/list",
    method: "get",
    params
  });
  const GetTaskDetails = (jobId) => request({
    url: `/tasks/details/${jobId}`,
    method: "get"
  });
  const GetTaskDetailsOrders = (params) => request({
    url: `/tasks/orders`,
    method: "get",
    params
  });
  const PutDelay = (params) => request({
    url: `/tasks/delay`,
    method: "put",
    params
  });
  const TakeDelivery = (params) => request({
    url: `/tasks/takeDelivery`,
    method: "post",
    params
  });
  const Exception = (params) => request({
    url: `/tasks/exception`,
    method: "post",
    params
  });
  const ExceptionDetails = (id) => request({
    url: `/tasks/exception/${id}`,
    method: "get"
  });
  const TruckRegistration = (params) => request({
    url: `/tasks/truckRegistration`,
    method: "post",
    params
  });
  const Deliver = (params) => request({
    url: `/tasks/deliver`,
    method: "post",
    params
  });
  const upload = (params) => requestUpload({
    url: `/files/imageUpload`,
    method: "post",
    data: params,
    params
  });
  const PositionUpload = (params) => request({
    url: `/track/upload`,
    method: "put",
    data: params,
    params
  });
  const taskTimeFormat = (val) => {
    const times = getTime(val);
    return times.date;
  };
  function getTime(val) {
    const date = new Date(val);
    date.setTime(date.getTime() + 36e5);
    date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    date.getSeconds();
    const time = {
      date: addZero(month) + "-" + addZero(day) + " " + addZero(hour) + ":" + addZero(minute),
      times: addZero(hour) + ":" + addZero(minute)
    };
    return time;
  }
  function addZero(s2) {
    return s2 < 10 ? "0" + s2 : s2;
  }
  function openMap(orgName, endName, latitude, longitude, name) {
    if (plus.os.name == "Android") {
      let hasBaiduMap = plus.runtime.isApplicationExist({
        pname: "com.baidu.BaiduMap",
        action: "baidumap://"
      });
      let hasAmap = plus.runtime.isApplicationExist({
        pname: "com.autonavi.minimap",
        action: "androidamap://"
      });
      let urlBaiduMap = `baidumap://map/direction?origin=${orgName}&destination=${endName}&mode=driving&coord_type=gcj02&src=andr.baidu.openAPIdemo`;
      urlBaiduMap = encodeURI(urlBaiduMap);
      let urlAmap = `androidamap://keywordNavi?sourceApplication=softname&keyword=${endName}&style=2`;
      if (hasAmap && hasBaiduMap) {
        plus.nativeUI.actionSheet({
          title: "选择地图应用",
          cancel: "取消",
          buttons: [{
            title: "百度地图"
          }, {
            title: "高德地图"
          }]
        }, function(e) {
          switch (e.index) {
            case 1:
              plus.runtime.openURL(urlBaiduMap);
              break;
            case 2:
              plus.runtime.openURL(urlAmap);
              break;
          }
        });
      } else if (hasAmap) {
        plus.runtime.openURL(urlAmap);
      } else if (hasBaiduMap) {
        plus.runtime.openURL(urlBaiduMap);
      } else {
        plus.nativeUI.alert("本机未安装指定的地图应用");
      }
    }
  }
  let getAuth = null;
  const positionsUploadInit = () => {
    let appAuthorizeSetting = uni.getAppAuthorizeSetting().locationAuthorized;
    getAuth != null ? clearInterval(getAuth) : null;
    if (appAuthorizeSetting == "denied") {
      uni.showToast({
        title: "您拒绝提供定位服务，系统将无法使用位置上报功能",
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
            if (posit.countTime + 6e4 >= 3e5 || posit.countDist + dist >= 500) {
              positionUploadAdmin(positions);
              uni.setStorageSync("positions", { timer: posit.timer, lastPoint: positions, countTime: 0, countDist: 0 });
            }
          }
        } else {
          uni.showToast({
            title: "位置更新失败，请检查定位功能是否开启，或切网络了重新上传",
            duration: 3e3,
            icon: "none"
          });
        }
      },
      fail: function(err) {
        uni.showToast({
          title: "位置获取失败，请检查定位功能是否开启，或切网络了重新上传",
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
    let a2 = radLat1 - radLat2;
    let b = lng1 * PI / 180 - lng2 * PI / 180;
    let s2 = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a2 / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s2 = s2 * EARTH_RADIUS;
    s2 = lenType == 1 ? Math.round(s2 * 1e3) / 1 : Math.round(s2 * 1e4) / 1e4;
    return s2;
  };
  const positionUploadAdmin = (positions) => {
    PositionUpload({ lat: positions.latitude.toString(), lng: positions.longitude.toString() }).then((res) => {
      if (res.code == 200) {
        formatAppLog("log", "at utils/index.js:264", "位置上报成功了");
      } else {
        uni.showToast({
          title: "位置上报失败，请检查定位功能是否开启，或切网络了重新上传",
          duration: 3e3,
          icon: "none"
        });
      }
    });
  };
  const _sfc_main$K = {
    name: "Footer",
    components: {},
    // 接收父组件的值
    props: {
      pagePath: {
        type: String,
        required: true
      }
    },
    setup: (props) => {
      const store2 = useStore();
      const page = vue.ref("contact");
      const showPage = vue.ref(false);
      const containerHeight = vue.ref(400);
      const currentPage = vue.ref(store2.state.footStatus);
      const tabbar = vue.ref([
        {
          pagePath: "/pages/index/index",
          iconPath: "static/sj_test_nor.png",
          selectedIconPath: "static/sj_test_sel.png",
          text: "任务"
        },
        {
          pagePath: "/pages/message/index",
          iconPath: "static/sj_mess_nor.png",
          selectedIconPath: "static/sj_mess_sel.png",
          text: "消息"
        },
        {
          pagePath: "/pages/user/index",
          iconPath: "static//sj_mine_nor.png",
          selectedIconPath: "static//sj_mine_sel.png",
          text: "我的"
        }
      ]);
      const changeTab = (item, index) => {
        if (item.text !== "") {
          currentPage.value = index;
          store2.commit("setFootStatus", index);
          uni.redirectTo({
            url: item.pagePath,
            success: (e) => {
            },
            fail: () => {
            }
          });
        }
      };
      return {
        // ------变量------
        page,
        showPage,
        containerHeight,
        currentPage,
        tabbar,
        // ------方法------
        changeTab
      };
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 公用底部 "),
        vue.createElementVNode("view", { class: "footBox" }, [
          vue.createElementVNode("view", { class: "uni-tabbar" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(_ctx.tabbar, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["tabbar-item", _ctx.currentPage === index ? "active" : ""]),
                  key: index,
                  onClick: ($event) => _ctx.changeTab(item, index)
                }, [
                  (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "uni-tabbar__bd"
                  }, [
                    item.pagePath !== "" ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "uni-tabbar__icon"
                    }, [
                      _ctx.currentPage === index ? (vue.openBlock(), vue.createElementBlock("img", {
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
                  item.text !== "" ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 1,
                      class: "uni-tabbar__label"
                    },
                    vue.toDisplayString(item.text),
                    1
                    /* TEXT */
                  )) : vue.createCommentVNode("v-if", true)
                ], 10, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        vue.createCommentVNode(" end ")
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const UniFooter = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$f], ["__scopeId", "data-v-cc71f53d"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/Footer/index.vue"]]);
  let Calendar$2 = class Calendar {
    constructor({
      date,
      selected,
      startDate,
      endDate,
      range
      // multipleStatus
    } = {}) {
      this.date = this.getDate(new Date());
      this.selected = selected || [];
      this.startDate = startDate;
      this.endDate = endDate;
      this.range = range;
      this.cleanMultipleStatus();
      this.weeks = {};
      this.lastHover = false;
    }
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      this.selectDate = this.getDate(date);
      this._getWeek(this.selectDate.fullDate);
    }
    /**
     * 清理多选状态
     */
    cleanMultipleStatus() {
      this.multipleStatus = {
        before: "",
        after: "",
        data: []
      };
    }
    /**
     * 重置开始日期
     */
    resetSatrtDate(startDate) {
      this.startDate = startDate;
    }
    /**
     * 重置结束日期
     */
    resetEndDate(endDate) {
      this.endDate = endDate;
    }
    /**
     * 获取任意时间
     */
    getDate(date, AddDayCount = 0, str = "day") {
      if (!date) {
        date = new Date();
      }
      if (typeof date !== "object") {
        date = date.replace(/-/g, "/");
      }
      const dd = new Date(date);
      switch (str) {
        case "day":
          dd.setDate(dd.getDate() + AddDayCount);
          break;
        case "month":
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount);
          }
          break;
        case "year":
          dd.setFullYear(dd.getFullYear() + AddDayCount);
          break;
      }
      const y2 = dd.getFullYear();
      const m2 = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      const d2 = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return {
        fullDate: y2 + "-" + m2 + "-" + d2,
        year: y2,
        month: m2,
        date: d2,
        day: dd.getDay()
      };
    }
    /**
     * 获取上月剩余天数
     */
    _getLastMonthDays(firstDay, full) {
      let dateArr = [];
      for (let i2 = firstDay; i2 > 0; i2--) {
        const beforeDate = new Date(full.year, full.month - 1, -i2 + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          disable: true
        });
      }
      return dateArr;
    }
    /**
     * 获取本月天数
     */
    _currentMonthDys(dateData, full) {
      let dateArr = [];
      let fullDate = this.date.fullDate;
      for (let i2 = 1; i2 <= dateData; i2++) {
        let nowDate = full.year + "-" + (full.month < 10 ? full.month : full.month) + "-" + (i2 < 10 ? "0" + i2 : i2);
        let isDay = fullDate === nowDate;
        let info = this.selected && this.selected.find((item) => {
          if (this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });
        let disableBefore = true;
        let disableAfter = true;
        if (this.startDate) {
          disableBefore = this.dateCompare(this.startDate, nowDate);
        }
        if (this.endDate) {
          disableAfter = this.dateCompare(nowDate, this.endDate);
        }
        let multiples = this.multipleStatus.data;
        let checked = false;
        let multiplesStatus = -1;
        if (this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex((item) => {
              return this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked = true;
          }
        }
        let data2 = {
          fullDate: nowDate,
          year: full.year,
          date: i2,
          multiple: this.range ? checked : false,
          beforeMultiple: this.isLogicBefore(nowDate, this.multipleStatus.before, this.multipleStatus.after),
          afterMultiple: this.isLogicAfter(nowDate, this.multipleStatus.before, this.multipleStatus.after),
          month: full.month,
          disable: !(disableBefore && disableAfter),
          isDay,
          userChecked: false
        };
        if (info) {
          data2.extraInfo = info;
        }
        dateArr.push(data2);
      }
      return dateArr;
    }
    /**
     * 获取下月天数
     */
    _getNextMonthDays(surplus, full) {
      let dateArr = [];
      for (let i2 = 1; i2 < surplus + 1; i2++) {
        dateArr.push({
          date: i2,
          month: Number(full.month) + 1,
          disable: true
        });
      }
      return dateArr;
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */
    getInfo(date) {
      if (!date) {
        date = new Date();
      }
      const dateInfo = this.canlender.find((item) => item.fullDate === this.getDate(date).fullDate);
      return dateInfo;
    }
    /**
     * 比较时间大小
     */
    dateCompare(startDate, endDate) {
      startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
      endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 比较时间是否相等
     */
    dateEqual(before, after) {
      before = new Date(before.replace("-", "/").replace("-", "/"));
      after = new Date(after.replace("-", "/").replace("-", "/"));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }
    /**
     *  比较真实起始日期
     */
    isLogicBefore(currentDay, before, after) {
      let logicBefore = before;
      if (before && after) {
        logicBefore = this.dateCompare(before, after) ? before : after;
      }
      return this.dateEqual(logicBefore, currentDay);
    }
    isLogicAfter(currentDay, before, after) {
      let logicAfter = after;
      if (before && after) {
        logicAfter = this.dateCompare(before, after) ? after : before;
      }
      return this.dateEqual(logicAfter, currentDay);
    }
    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
    geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split("-");
      var ae2 = end.split("-");
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de2 = new Date();
      de2.setFullYear(ae2[0], ae2[1] - 1, ae2[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1e3;
      var unixDe = de2.getTime() - 24 * 60 * 60 * 1e3;
      for (var k2 = unixDb; k2 <= unixDe; ) {
        k2 = k2 + 24 * 60 * 60 * 1e3;
        arr.push(this.getDate(new Date(parseInt(k2))).fullDate);
      }
      return arr;
    }
    /**
     *  获取多选状态
     */
    setMultiple(fullDate) {
      let {
        before,
        after
      } = this.multipleStatus;
      if (!this.range)
        return;
      if (before && after) {
        if (!this.lastHover) {
          this.lastHover = true;
          return;
        }
        this.multipleStatus.before = fullDate;
        this.multipleStatus.after = "";
        this.multipleStatus.data = [];
        this.multipleStatus.fulldate = "";
        this.lastHover = false;
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
          this.lastHover = false;
        } else {
          this.multipleStatus.after = fullDate;
          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
          this.lastHover = true;
        }
      }
      this._getWeek(fullDate);
    }
    /**
     *  鼠标 hover 更新多选状态
     */
    setHoverMultiple(fullDate) {
      let {
        before,
        after
      } = this.multipleStatus;
      if (!this.range)
        return;
      if (this.lastHover)
        return;
      if (!before) {
        this.multipleStatus.before = fullDate;
      } else {
        this.multipleStatus.after = fullDate;
        if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
      }
      this._getWeek(fullDate);
    }
    /**
     * 更新默认值多选状态
     */
    setDefaultMultiple(before, after) {
      this.multipleStatus.before = before;
      this.multipleStatus.after = after;
      if (before && after) {
        if (this.dateCompare(before, after)) {
          this.multipleStatus.data = this.geDateAll(before, after);
          this._getWeek(after);
        } else {
          this.multipleStatus.data = this.geDateAll(after, before);
          this._getWeek(before);
        }
      }
    }
    /**
     * 获取每周数据
     * @param {Object} dateData
     */
    _getWeek(dateData) {
      const {
        fullDate,
        year,
        month,
        date,
        day
      } = this.getDate(dateData);
      let firstDay = new Date(year, month - 1, 1).getDay();
      let currentDay = new Date(year, month, 0).getDate();
      let dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)),
        // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)),
        // 本月天数
        nextMonthDays: [],
        // 下个月开始几天
        weeks: []
      };
      let canlender = [];
      const surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      let weeks = {};
      for (let i2 = 0; i2 < canlender.length; i2++) {
        if (i2 % 7 === 0) {
          weeks[parseInt(i2 / 7)] = new Array(7);
        }
        weeks[parseInt(i2 / 7)][i2 % 7] = canlender[i2];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }
    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  };
  const _sfc_main$J = {
    props: {
      weeks: {
        type: Object,
        default() {
          return {};
        }
      },
      calendar: {
        type: Object,
        default: () => {
          return {};
        }
      },
      selected: {
        type: Array,
        default: () => {
          return [];
        }
      },
      lunar: {
        type: Boolean,
        default: false
      },
      checkHover: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      choiceDate(weeks) {
        this.$emit("change", weeks);
      },
      handleMousemove(weeks) {
        this.$emit("handleMouse", weeks);
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-calendar-item__weeks-box", {
          "uni-calendar-item--disable": $props.weeks.disable,
          "uni-calendar-item--before-checked-x": $props.weeks.beforeMultiple,
          "uni-calendar-item--multiple": $props.weeks.multiple,
          "uni-calendar-item--after-checked-x": $props.weeks.afterMultiple
        }]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.choiceDate($props.weeks)),
        onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.handleMousemove($props.weeks))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-calendar-item__weeks-box-item", {
              "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && ($props.calendar.userChecked || !$props.checkHover),
              "uni-calendar-item--checked-range-text": $props.checkHover,
              "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
              "uni-calendar-item--multiple": $props.weeks.multiple,
              "uni-calendar-item--after-checked": $props.weeks.afterMultiple,
              "uni-calendar-item--disable": $props.weeks.disable
            }])
          },
          [
            $props.selected && $props.weeks.extraInfo ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-calendar-item__weeks-box-circle"
            })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "text",
              { class: "uni-calendar-item__weeks-box-text uni-calendar-item__weeks-box-text-disable uni-calendar-item--checked-text" },
              vue.toDisplayString($props.weeks.date),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass({ "uni-calendar-item--isDay": $props.weeks.isDay })
          },
          null,
          2
          /* CLASS */
        )
      ],
      34
      /* CLASS, HYDRATE_EVENTS */
    );
  }
  const calendarItem$1 = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$e], ["__scopeId", "data-v-3c762a01"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar-item.vue"]]);
  const en$3 = {
    "uni-datetime-picker.selectDate": "select date",
    "uni-datetime-picker.selectTime": "select time",
    "uni-datetime-picker.selectDateTime": "select datetime",
    "uni-datetime-picker.startDate": "start date",
    "uni-datetime-picker.endDate": "end date",
    "uni-datetime-picker.startTime": "start time",
    "uni-datetime-picker.endTime": "end time",
    "uni-datetime-picker.ok": "ok",
    "uni-datetime-picker.clear": "clear",
    "uni-datetime-picker.cancel": "cancel",
    "uni-calender.MON": "MON",
    "uni-calender.TUE": "TUE",
    "uni-calender.WED": "WED",
    "uni-calender.THU": "THU",
    "uni-calender.FRI": "FRI",
    "uni-calender.SAT": "SAT",
    "uni-calender.SUN": "SUN"
  };
  const zhHans$3 = {
    "uni-datetime-picker.selectDate": "选择日期",
    "uni-datetime-picker.selectTime": "选择时间",
    "uni-datetime-picker.selectDateTime": "选择日期时间",
    "uni-datetime-picker.startDate": "开始日期",
    "uni-datetime-picker.endDate": "结束日期",
    "uni-datetime-picker.startTime": "开始时间",
    "uni-datetime-picker.endTime": "结束时间",
    "uni-datetime-picker.ok": "确定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六"
  };
  const zhHant$3 = {
    "uni-datetime-picker.selectDate": "選擇日期",
    "uni-datetime-picker.selectTime": "選擇時間",
    "uni-datetime-picker.selectDateTime": "選擇日期時間",
    "uni-datetime-picker.startDate": "開始日期",
    "uni-datetime-picker.endDate": "結束日期",
    "uni-datetime-picker.startTime": "開始时间",
    "uni-datetime-picker.endTime": "結束时间",
    "uni-datetime-picker.ok": "確定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六"
  };
  const messages$3 = {
    en: en$3,
    "zh-Hans": zhHans$3,
    "zh-Hant": zhHant$3
  };
  const { t: t$7 } = initVueI18n(messages$3);
  const _sfc_main$I = {
    name: "UniDatetimePicker",
    components: {},
    data() {
      return {
        indicatorStyle: `height: 50px;`,
        visible: false,
        fixNvueBug: {},
        dateShow: true,
        timeShow: true,
        title: "日期和时间",
        // 输入框当前时间
        time: "",
        // 当前的年月日时分秒
        year: 1920,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        // 起始时间
        startYear: 1920,
        startMonth: 1,
        startDay: 1,
        startHour: 0,
        startMinute: 0,
        startSecond: 0,
        // 结束时间
        endYear: 2120,
        endMonth: 12,
        endDay: 31,
        endHour: 23,
        endMinute: 59,
        endSecond: 59
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      hideSecond: {
        type: [Boolean, String],
        default: false
      }
    },
    watch: {
      value: {
        handler(newVal, oldVal) {
          if (newVal) {
            this.parseValue(this.fixIosDateFormat(newVal));
            this.initTime(false);
          } else {
            this.time = "";
            this.parseValue(Date.now());
          }
        },
        immediate: true
      },
      type: {
        handler(newValue) {
          if (newValue === "date") {
            this.dateShow = true;
            this.timeShow = false;
            this.title = "日期";
          } else if (newValue === "time") {
            this.dateShow = false;
            this.timeShow = true;
            this.title = "时间";
          } else {
            this.dateShow = true;
            this.timeShow = true;
            this.title = "日期和时间";
          }
        },
        immediate: true
      },
      start: {
        handler(newVal) {
          this.parseDatetimeRange(this.fixIosDateFormat(newVal), "start");
        },
        immediate: true
      },
      end: {
        handler(newVal) {
          this.parseDatetimeRange(this.fixIosDateFormat(newVal), "end");
        },
        immediate: true
      },
      // 月、日、时、分、秒可选范围变化后，检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      months(newVal) {
        this.checkValue("month", this.month, newVal);
      },
      days(newVal) {
        this.checkValue("day", this.day, newVal);
      },
      hours(newVal) {
        this.checkValue("hour", this.hour, newVal);
      },
      minutes(newVal) {
        this.checkValue("minute", this.minute, newVal);
      },
      seconds(newVal) {
        this.checkValue("second", this.second, newVal);
      }
    },
    computed: {
      // 当前年、月、日、时、分、秒选择范围
      years() {
        return this.getCurrentRange("year");
      },
      months() {
        return this.getCurrentRange("month");
      },
      days() {
        return this.getCurrentRange("day");
      },
      hours() {
        return this.getCurrentRange("hour");
      },
      minutes() {
        return this.getCurrentRange("minute");
      },
      seconds() {
        return this.getCurrentRange("second");
      },
      // picker 当前值数组
      ymd() {
        return [this.year - this.minYear, this.month - this.minMonth, this.day - this.minDay];
      },
      hms() {
        return [this.hour - this.minHour, this.minute - this.minMinute, this.second - this.minSecond];
      },
      // 当前 date 是 start
      currentDateIsStart() {
        return this.year === this.startYear && this.month === this.startMonth && this.day === this.startDay;
      },
      // 当前 date 是 end
      currentDateIsEnd() {
        return this.year === this.endYear && this.month === this.endMonth && this.day === this.endDay;
      },
      // 当前年、月、日、时、分、秒的最小值和最大值
      minYear() {
        return this.startYear;
      },
      maxYear() {
        return this.endYear;
      },
      minMonth() {
        if (this.year === this.startYear) {
          return this.startMonth;
        } else {
          return 1;
        }
      },
      maxMonth() {
        if (this.year === this.endYear) {
          return this.endMonth;
        } else {
          return 12;
        }
      },
      minDay() {
        if (this.year === this.startYear && this.month === this.startMonth) {
          return this.startDay;
        } else {
          return 1;
        }
      },
      maxDay() {
        if (this.year === this.endYear && this.month === this.endMonth) {
          return this.endDay;
        } else {
          return this.daysInMonth(this.year, this.month);
        }
      },
      minHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart) {
            return this.startHour;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          return this.startHour;
        }
      },
      maxHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd) {
            return this.endHour;
          } else {
            return 23;
          }
        }
        if (this.type === "time") {
          return this.endHour;
        }
      },
      minMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
      },
      maxMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
      },
      minSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
      },
      maxSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
      },
      /**
       * for i18n
       */
      selectTimeText() {
        return t$7("uni-datetime-picker.selectTime");
      },
      okText() {
        return t$7("uni-datetime-picker.ok");
      },
      clearText() {
        return t$7("uni-datetime-picker.clear");
      },
      cancelText() {
        return t$7("uni-datetime-picker.cancel");
      }
    },
    mounted() {
    },
    methods: {
      /**
       * @param {Object} item
       * 小于 10 在前面加个 0
       */
      lessThanTen(item) {
        return item < 10 ? "0" + item : item;
      },
      /**
       * 解析时分秒字符串，例如：00:00:00
       * @param {String} timeString
       */
      parseTimeType(timeString) {
        if (timeString) {
          let timeArr = timeString.split(":");
          this.hour = Number(timeArr[0]);
          this.minute = Number(timeArr[1]);
          this.second = Number(timeArr[2]);
        }
      },
      /**
       * 解析选择器初始值，类型可以是字符串、时间戳，例如：2000-10-02、'08:30:00'、 1610695109000
       * @param {String | Number} datetime
       */
      initPickerValue(datetime) {
        let defaultValue = null;
        if (datetime) {
          defaultValue = this.compareValueWithStartAndEnd(datetime, this.start, this.end);
        } else {
          defaultValue = Date.now();
          defaultValue = this.compareValueWithStartAndEnd(defaultValue, this.start, this.end);
        }
        this.parseValue(defaultValue);
      },
      /**
       * 初始值规则：
       * - 用户设置初始值 value
       * 	- 设置了起始时间 start、终止时间 end，并 start < value < end，初始值为 value， 否则初始值为 start
       * 	- 只设置了起始时间 start，并 start < value，初始值为 value，否则初始值为 start
       * 	- 只设置了终止时间 end，并 value < end，初始值为 value，否则初始值为 end
       * 	- 无起始终止时间，则初始值为 value
       * - 无初始值 value，则初始值为当前本地时间 Date.now()
       * @param {Object} value
       * @param {Object} dateBase
       */
      compareValueWithStartAndEnd(value, start, end) {
        let winner = null;
        value = this.superTimeStamp(value);
        start = this.superTimeStamp(start);
        end = this.superTimeStamp(end);
        if (start && end) {
          if (value < start) {
            winner = new Date(start);
          } else if (value > end) {
            winner = new Date(end);
          } else {
            winner = new Date(value);
          }
        } else if (start && !end) {
          winner = start <= value ? new Date(value) : new Date(start);
        } else if (!start && end) {
          winner = value <= end ? new Date(value) : new Date(end);
        } else {
          winner = new Date(value);
        }
        return winner;
      },
      /**
       * 转换为可比较的时间戳，接受日期、时分秒、时间戳
       * @param {Object} value
       */
      superTimeStamp(value) {
        let dateBase = "";
        if (this.type === "time" && value && typeof value === "string") {
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;
          const day = now.getDate();
          dateBase = year + "/" + month + "/" + day + " ";
        }
        if (Number(value) && typeof value !== NaN) {
          value = parseInt(value);
          dateBase = 0;
        }
        return this.createTimeStamp(dateBase + value);
      },
      /**
       * 解析默认值 value，字符串、时间戳
       * @param {Object} defaultTime
       */
      parseValue(value) {
        if (!value) {
          return;
        }
        if (this.type === "time" && typeof value === "string") {
          this.parseTimeType(value);
        } else {
          let defaultDate = null;
          defaultDate = new Date(value);
          if (this.type !== "time") {
            this.year = defaultDate.getFullYear();
            this.month = defaultDate.getMonth() + 1;
            this.day = defaultDate.getDate();
          }
          if (this.type !== "date") {
            this.hour = defaultDate.getHours();
            this.minute = defaultDate.getMinutes();
            this.second = defaultDate.getSeconds();
          }
        }
        if (this.hideSecond) {
          this.second = 0;
        }
      },
      /**
       * 解析可选择时间范围 start、end，年月日字符串、时间戳
       * @param {Object} defaultTime
       */
      parseDatetimeRange(point, pointType) {
        if (!point) {
          if (pointType === "start") {
            this.startYear = 1920;
            this.startMonth = 1;
            this.startDay = 1;
            this.startHour = 0;
            this.startMinute = 0;
            this.startSecond = 0;
          }
          if (pointType === "end") {
            this.endYear = 2120;
            this.endMonth = 12;
            this.endDay = 31;
            this.endHour = 23;
            this.endMinute = 59;
            this.endSecond = 59;
          }
          return;
        }
        if (this.type === "time") {
          const pointArr = point.split(":");
          this[pointType + "Hour"] = Number(pointArr[0]);
          this[pointType + "Minute"] = Number(pointArr[1]);
          this[pointType + "Second"] = Number(pointArr[2]);
        } else {
          if (!point) {
            pointType === "start" ? this.startYear = this.year - 60 : this.endYear = this.year + 60;
            return;
          }
          if (Number(point) && Number(point) !== NaN) {
            point = parseInt(point);
          }
          const hasTime = /[0-9]:[0-9]/;
          if (this.type === "datetime" && pointType === "end" && typeof point === "string" && !hasTime.test(
            point
          )) {
            point = point + " 23:59:59";
          }
          const pointDate = new Date(point);
          this[pointType + "Year"] = pointDate.getFullYear();
          this[pointType + "Month"] = pointDate.getMonth() + 1;
          this[pointType + "Day"] = pointDate.getDate();
          if (this.type === "datetime") {
            this[pointType + "Hour"] = pointDate.getHours();
            this[pointType + "Minute"] = pointDate.getMinutes();
            this[pointType + "Second"] = pointDate.getSeconds();
          }
        }
      },
      // 获取 年、月、日、时、分、秒 当前可选范围
      getCurrentRange(value) {
        const range = [];
        for (let i2 = this["min" + this.capitalize(value)]; i2 <= this["max" + this.capitalize(value)]; i2++) {
          range.push(i2);
        }
        return range;
      },
      // 字符串首字母大写
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      // 检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      checkValue(name, value, values) {
        if (values.indexOf(value) === -1) {
          this[name] = values[0];
        }
      },
      // 每个月的实际天数
      daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
      },
      //兼容 iOS、safari 日期格式
      fixIosDateFormat(value) {
        if (typeof value === "string") {
          value = value.replace(/-/g, "/");
        }
        return value;
      },
      /**
       * 生成时间戳
       * @param {Object} time
       */
      createTimeStamp(time) {
        if (!time)
          return;
        if (typeof time === "number") {
          return time;
        } else {
          time = time.replace(/-/g, "/");
          if (this.type === "date") {
            time = time + " 00:00:00";
          }
          return Date.parse(time);
        }
      },
      /**
       * 生成日期或时间的字符串
       */
      createDomSting() {
        const yymmdd = this.year + "-" + this.lessThanTen(this.month) + "-" + this.lessThanTen(this.day);
        let hhmmss = this.lessThanTen(this.hour) + ":" + this.lessThanTen(this.minute);
        if (!this.hideSecond) {
          hhmmss = hhmmss + ":" + this.lessThanTen(this.second);
        }
        if (this.type === "date") {
          return yymmdd;
        } else if (this.type === "time") {
          return hhmmss;
        } else {
          return yymmdd + " " + hhmmss;
        }
      },
      /**
       * 初始化返回值，并抛出 change 事件
       */
      initTime(emit = true) {
        this.time = this.createDomSting();
        if (!emit)
          return;
        if (this.returnType === "timestamp" && this.type !== "time") {
          this.$emit("change", this.createTimeStamp(this.time));
          this.$emit("input", this.createTimeStamp(this.time));
          this.$emit("update:modelValue", this.createTimeStamp(this.time));
        } else {
          this.$emit("change", this.time);
          this.$emit("input", this.time);
          this.$emit("update:modelValue", this.time);
        }
      },
      /**
       * 用户选择日期或时间更新 data
       * @param {Object} e
       */
      bindDateChange(e) {
        const val = e.detail.value;
        this.year = this.years[val[0]];
        this.month = this.months[val[1]];
        this.day = this.days[val[2]];
      },
      bindTimeChange(e) {
        const val = e.detail.value;
        this.hour = this.hours[val[0]];
        this.minute = this.minutes[val[1]];
        this.second = this.seconds[val[2]];
      },
      /**
       * 初始化弹出层
       */
      initTimePicker() {
        if (this.disabled)
          return;
        const value = this.fixIosDateFormat(this.value);
        this.initPickerValue(value);
        this.visible = !this.visible;
      },
      /**
       * 触发或关闭弹框
       */
      tiggerTimePicker(e) {
        this.visible = !this.visible;
      },
      /**
       * 用户点击“清空”按钮，清空当前值
       */
      clearTime() {
        this.time = "";
        this.$emit("change", this.time);
        this.$emit("input", this.time);
        this.$emit("update:modelValue", this.time);
        this.tiggerTimePicker();
      },
      /**
       * 用户点击“确定”按钮
       */
      setTime() {
        this.initTime();
        this.tiggerTimePicker();
      }
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-datetime-picker" }, [
      vue.createElementVNode("view", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.initTimePicker && $options.initTimePicker(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-datetime-picker-timebox-pointer", { "uni-datetime-picker-disabled": $props.disabled, "uni-datetime-picker-timebox": $props.border }])
            },
            [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-text" },
                vue.toDisplayString($data.time),
                1
                /* TEXT */
              ),
              !$data.time ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-datetime-picker-time"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-text" },
                  vue.toDisplayString($options.selectTimeText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      $data.visible ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        id: "mask",
        class: "uni-datetime-picker-mask",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
      })) : vue.createCommentVNode("v-if", true),
      $data.visible ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: vue.normalizeClass(["uni-datetime-picker-popup", [$data.dateShow && $data.timeShow ? "" : "fix-nvue-height"]]),
          style: vue.normalizeStyle($data.fixNvueBug)
        },
        [
          vue.createElementVNode("view", { class: "uni-title" }, [
            vue.createElementVNode(
              "text",
              { class: "uni-datetime-picker-text" },
              vue.toDisplayString($options.selectTimeText),
              1
              /* TEXT */
            )
          ]),
          $data.dateShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: "uni-datetime-picker-view",
              "indicator-style": $data.indicatorStyle,
              value: $options.ymd,
              onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.years, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.months, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.days, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 40, ["indicator-style", "value"]),
            vue.createCommentVNode(" 兼容 nvue 不支持伪类 "),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-left" }, "-"),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-right" }, "-")
          ])) : vue.createCommentVNode("v-if", true),
          $data.timeShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: vue.normalizeClass(["uni-datetime-picker-view", [$props.hideSecond ? "time-hide-second" : ""]]),
              "indicator-style": $data.indicatorStyle,
              value: $options.hms,
              onChange: _cache[3] || (_cache[3] = (...args) => $options.bindTimeChange && $options.bindTimeChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.hours, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.minutes, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.seconds, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 42, ["indicator-style", "value"]),
            vue.createCommentVNode(" 兼容 nvue 不支持伪类 "),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["uni-datetime-picker-sign", [$props.hideSecond ? "sign-center" : "sign-left"]])
              },
              ":",
              2
              /* CLASS */
            ),
            !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-datetime-picker-sign sign-right"
            }, ":")) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uni-datetime-picker-btn" }, [
            vue.createElementVNode("view", {
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clearTime && $options.clearTime(...args))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-btn-text" },
                vue.toDisplayString($options.clearText),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "uni-datetime-picker-btn-group" }, [
              vue.createElementVNode("view", {
                class: "uni-datetime-picker-cancel",
                onClick: _cache[5] || (_cache[5] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.cancelText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[6] || (_cache[6] = (...args) => $options.setTime && $options.setTime(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const timePicker = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$d], ["__scopeId", "data-v-1d532b70"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-datetime-picker/components/uni-datetime-picker/time-picker.vue"]]);
  const {
    t: t$6
  } = initVueI18n(messages$3);
  const _sfc_main$H = {
    components: {
      calendarItem: calendarItem$1,
      timePicker
    },
    props: {
      date: {
        type: String,
        default: ""
      },
      defTime: {
        type: [String, Object],
        default: ""
      },
      selectableTimes: {
        type: [Object],
        default() {
          return {};
        }
      },
      selected: {
        type: Array,
        default() {
          return [];
        }
      },
      lunar: {
        type: Boolean,
        default: false
      },
      startDate: {
        type: String,
        default: ""
      },
      endDate: {
        type: String,
        default: ""
      },
      range: {
        type: Boolean,
        default: false
      },
      typeHasTime: {
        type: Boolean,
        default: false
      },
      insert: {
        type: Boolean,
        default: true
      },
      showMonth: {
        type: Boolean,
        default: true
      },
      clearDate: {
        type: Boolean,
        default: true
      },
      left: {
        type: Boolean,
        default: true
      },
      right: {
        type: Boolean,
        default: true
      },
      checkHover: {
        type: Boolean,
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      pleStatus: {
        type: Object,
        default() {
          return {
            before: "",
            after: "",
            data: [],
            fulldate: ""
          };
        }
      }
    },
    data() {
      return {
        show: false,
        weeks: [],
        calendar: {},
        nowDate: "",
        aniMaskShow: false,
        firstEnter: true,
        time: "",
        timeRange: {
          startTime: "",
          endTime: ""
        },
        tempSingleDate: "",
        tempRange: {
          before: "",
          after: ""
        }
      };
    },
    watch: {
      date: {
        immediate: true,
        handler(newVal, oldVal) {
          if (!this.range) {
            this.tempSingleDate = newVal;
            setTimeout(() => {
              this.init(newVal);
            }, 100);
          }
        }
      },
      defTime: {
        immediate: true,
        handler(newVal, oldVal) {
          if (!this.range) {
            this.time = newVal;
          } else {
            this.timeRange.startTime = newVal.start;
            this.timeRange.endTime = newVal.end;
          }
        }
      },
      startDate(val) {
        this.cale.resetSatrtDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      endDate(val) {
        this.cale.resetEndDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      selected(newVal) {
        this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
        this.weeks = this.cale.weeks;
      },
      pleStatus: {
        immediate: true,
        handler(newVal, oldVal) {
          const {
            before,
            after,
            fulldate,
            which
          } = newVal;
          this.tempRange.before = before;
          this.tempRange.after = after;
          setTimeout(() => {
            if (fulldate) {
              this.cale.setHoverMultiple(fulldate);
              if (before && after) {
                this.cale.lastHover = true;
                if (this.rangeWithinMonth(after, before))
                  return;
                this.setDate(before);
              } else {
                this.cale.setMultiple(fulldate);
                this.setDate(this.nowDate.fullDate);
                this.calendar.fullDate = "";
                this.cale.lastHover = false;
              }
            } else {
              this.cale.setDefaultMultiple(before, after);
              if (which === "left") {
                this.setDate(before);
                this.weeks = this.cale.weeks;
              } else {
                this.setDate(after);
                this.weeks = this.cale.weeks;
              }
              this.cale.lastHover = true;
            }
          }, 16);
        }
      }
    },
    computed: {
      reactStartTime() {
        const activeDate = this.range ? this.tempRange.before : this.calendar.fullDate;
        const res = activeDate === this.startDate ? this.selectableTimes.start : "";
        return res;
      },
      reactEndTime() {
        const activeDate = this.range ? this.tempRange.after : this.calendar.fullDate;
        const res = activeDate === this.endDate ? this.selectableTimes.end : "";
        return res;
      },
      /**
       * for i18n
       */
      selectDateText() {
        return t$6("uni-datetime-picker.selectDate");
      },
      startDateText() {
        return this.startPlaceholder || t$6("uni-datetime-picker.startDate");
      },
      endDateText() {
        return this.endPlaceholder || t$6("uni-datetime-picker.endDate");
      },
      okText() {
        return t$6("uni-datetime-picker.ok");
      },
      monText() {
        return t$6("uni-calender.MON");
      },
      TUEText() {
        return t$6("uni-calender.TUE");
      },
      WEDText() {
        return t$6("uni-calender.WED");
      },
      THUText() {
        return t$6("uni-calender.THU");
      },
      FRIText() {
        return t$6("uni-calender.FRI");
      },
      SATText() {
        return t$6("uni-calender.SAT");
      },
      SUNText() {
        return t$6("uni-calender.SUN");
      }
    },
    created() {
      this.cale = new Calendar$2({
        // date: new Date(),
        selected: this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
        range: this.range
        // multipleStatus: this.pleStatus
      });
      this.init(this.date);
    },
    methods: {
      leaveCale() {
        this.firstEnter = true;
      },
      handleMouse(weeks) {
        if (weeks.disable)
          return;
        if (this.cale.lastHover)
          return;
        let {
          before,
          after
        } = this.cale.multipleStatus;
        if (!before)
          return;
        this.calendar = weeks;
        this.cale.setHoverMultiple(this.calendar.fullDate);
        this.weeks = this.cale.weeks;
        if (this.firstEnter) {
          this.$emit("firstEnterCale", this.cale.multipleStatus);
          this.firstEnter = false;
        }
      },
      rangeWithinMonth(A2, B2) {
        const [yearA, monthA] = A2.split("-");
        const [yearB, monthB] = B2.split("-");
        return yearA === yearB && monthA === monthB;
      },
      // 取消穿透
      clean() {
        this.close();
      },
      clearCalender() {
        if (this.range) {
          this.timeRange.startTime = "";
          this.timeRange.endTime = "";
          this.tempRange.before = "";
          this.tempRange.after = "";
          this.cale.multipleStatus.before = "";
          this.cale.multipleStatus.after = "";
          this.cale.multipleStatus.data = [];
          this.cale.lastHover = false;
        } else {
          this.time = "";
          this.tempSingleDate = "";
        }
        this.calendar.fullDate = "";
        this.setDate();
      },
      bindDateChange(e) {
        const value = e.detail.value + "-1";
        this.init(value);
      },
      /**
       * 初始化日期显示
       * @param {Object} date
       */
      init(date) {
        this.cale.setDate(date);
        this.weeks = this.cale.weeks;
        this.nowDate = this.calendar = this.cale.getInfo(date);
      },
      // choiceDate(weeks) {
      // 	if (weeks.disable) return
      // 	this.calendar = weeks
      // 	// 设置多选
      // 	this.cale.setMultiple(this.calendar.fullDate, true)
      // 	this.weeks = this.cale.weeks
      // 	this.tempSingleDate = this.calendar.fullDate
      // 	this.tempRange.before = this.cale.multipleStatus.before
      // 	this.tempRange.after = this.cale.multipleStatus.after
      // 	this.change()
      // },
      /**
       * 打开日历弹窗
       */
      open() {
        if (this.clearDate && !this.insert) {
          this.cale.cleanMultipleStatus();
          this.init(this.date);
        }
        this.show = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.aniMaskShow = true;
          }, 50);
        });
      },
      /**
       * 关闭日历弹窗
       */
      close() {
        this.aniMaskShow = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.show = false;
            this.$emit("close");
          }, 300);
        });
      },
      /**
       * 确认按钮
       */
      confirm() {
        this.setEmit("confirm");
        this.close();
      },
      /**
       * 变化触发
       */
      change() {
        if (!this.insert)
          return;
        this.setEmit("change");
      },
      /**
       * 选择月份触发
       */
      monthSwitch() {
        let {
          year,
          month
        } = this.nowDate;
        this.$emit("monthSwitch", {
          year,
          month: Number(month)
        });
      },
      /**
       * 派发事件
       * @param {Object} name
       */
      setEmit(name) {
        let {
          year,
          month,
          date,
          fullDate,
          lunar,
          extraInfo
        } = this.calendar;
        this.$emit(name, {
          range: this.cale.multipleStatus,
          year,
          month,
          date,
          time: this.time,
          timeRange: this.timeRange,
          fulldate: fullDate,
          lunar,
          extraInfo: extraInfo || {}
        });
      },
      /**
       * 选择天触发
       * @param {Object} weeks
       */
      choiceDate(weeks) {
        if (weeks.disable)
          return;
        this.calendar = weeks;
        this.calendar.userChecked = true;
        this.cale.setMultiple(this.calendar.fullDate, true);
        this.weeks = this.cale.weeks;
        this.tempSingleDate = this.calendar.fullDate;
        this.tempRange.before = this.cale.multipleStatus.before;
        this.tempRange.after = this.cale.multipleStatus.after;
        this.change();
      },
      /**
       * 回到今天
       */
      backtoday() {
        let date = this.cale.getDate(new Date()).fullDate;
        this.init(date);
        this.change();
      },
      /**
       * 比较时间大小
       */
      dateCompare(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        if (startDate <= endDate) {
          return true;
        } else {
          return false;
        }
      },
      /**
       * 上个月
       */
      pre() {
        const preDate = this.cale.getDate(this.nowDate.fullDate, -1, "month").fullDate;
        this.setDate(preDate);
        this.monthSwitch();
      },
      /**
       * 下个月
       */
      next() {
        const nextDate = this.cale.getDate(this.nowDate.fullDate, 1, "month").fullDate;
        this.setDate(nextDate);
        this.monthSwitch();
      },
      /**
       * 设置日期
       * @param {Object} date
       */
      setDate(date) {
        this.cale.setDate(date);
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date);
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_calendar_item = vue.resolveComponent("calendar-item");
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-calendar",
        onMouseleave: _cache[9] || (_cache[9] = (...args) => $options.leaveCale && $options.leaveCale(...args))
      },
      [
        !$props.insert && $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uni-calendar__mask", { "uni-calendar--mask-show": $data.aniMaskShow }]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.clean && $options.clean(...args))
          },
          null,
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true),
        $props.insert || $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["uni-calendar__content", { "uni-calendar--fixed": !$props.insert, "uni-calendar--ani-show": $data.aniMaskShow, "uni-calendar__content-mobile": $data.aniMaskShow }])
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-calendar__header", { "uni-calendar__header-mobile": !$props.insert }])
              },
              [
                $props.left ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.pre && $options.pre(...args), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--left" })
                ])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("picker", {
                  mode: "date",
                  value: $props.date,
                  fields: "month",
                  onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__header-text" },
                    vue.toDisplayString(($data.nowDate.year || "") + " 年 " + ($data.nowDate.month || "") + " 月"),
                    1
                    /* TEXT */
                  )
                ], 40, ["value"]),
                $props.right ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.next && $options.next(...args), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--right" })
                ])) : vue.createCommentVNode("v-if", true),
                !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 2,
                  class: "dialog-close",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.clean && $options.clean(...args))
                }, [
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus",
                    "data-id": "close"
                  }),
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus dialog-close-rotate",
                    "data-id": "close"
                  })
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(' <text class="uni-calendar__backtoday" @click="backtoday">回到今天</text> ')
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", { class: "uni-calendar__box" }, [
              $props.showMonth ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-calendar__box-bg"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__box-bg-text" },
                  vue.toDisplayString($data.nowDate.month),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: "uni-calendar__weeks",
                style: { "padding-bottom": "7px" }
              }, [
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SUNText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.monText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.TUEText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.WEDText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.THUText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.FRIText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SATText),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.weeks, (item, weekIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "uni-calendar__weeks",
                    key: weekIndex
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(item, (weeks, weeksIndex) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "uni-calendar__weeks-item",
                          key: weeksIndex
                        }, [
                          vue.createVNode(_component_calendar_item, {
                            class: "uni-calendar-item--hook",
                            weeks,
                            calendar: $data.calendar,
                            selected: $props.selected,
                            lunar: $props.lunar,
                            checkHover: $props.range,
                            onChange: $options.choiceDate,
                            onHandleMouse: $options.handleMouse
                          }, null, 8, ["weeks", "calendar", "selected", "lunar", "checkHover", "onChange", "onHandleMouse"])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            !$props.insert && !$props.range && $props.typeHasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-date-changed uni-calendar--fixed-top",
              style: { "padding": "0 80px" }
            }, [
              vue.createElementVNode(
                "view",
                { class: "uni-date-changed--time-date" },
                vue.toDisplayString($data.tempSingleDate ? $data.tempSingleDate : $options.selectDateText),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_time_picker, {
                type: "time",
                start: $options.reactStartTime,
                end: $options.reactEndTime,
                modelValue: $data.time,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.time = $event),
                disabled: !$data.tempSingleDate,
                border: false,
                "hide-second": $props.hideSecond,
                class: "time-picker-style"
              }, null, 8, ["start", "end", "modelValue", "disabled", "hide-second"])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert && $props.range && $props.typeHasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "uni-date-changed uni-calendar--fixed-top"
            }, [
              vue.createElementVNode("view", { class: "uni-date-changed--time-start" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.before ? $data.tempRange.before : $options.startDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  start: $options.reactStartTime,
                  modelValue: $data.timeRange.startTime,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.timeRange.startTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.before,
                  class: "time-picker-style"
                }, null, 8, ["start", "modelValue", "hide-second", "disabled"])
              ]),
              vue.createVNode(_component_uni_icons, {
                type: "arrowthinright",
                color: "#999",
                style: { "line-height": "50px" }
              }),
              vue.createElementVNode("view", { class: "uni-date-changed--time-end" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.after ? $data.tempRange.after : $options.endDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  end: $options.reactEndTime,
                  modelValue: $data.timeRange.endTime,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.timeRange.endTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.after,
                  class: "time-picker-style"
                }, null, 8, ["end", "modelValue", "hide-second", "disabled"])
              ])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "uni-date-changed uni-date-btn--ok"
            }, [
              vue.createCommentVNode(' <view class="uni-calendar__header-btn-box">\n					<text class="uni-calendar__button-text uni-calendar--fixed-width">{{okText}}</text>\n				</view> '),
              vue.createElementVNode("view", {
                class: "uni-datetime-picker--btn",
                onClick: _cache[8] || (_cache[8] = (...args) => $options.confirm && $options.confirm(...args))
              }, "确认")
            ])) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      32
      /* HYDRATE_EVENTS */
    );
  }
  const calendar$1 = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$c], ["__scopeId", "data-v-1d379219"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar.vue"]]);
  const {
    t: t$5
  } = initVueI18n(messages$3);
  const _sfc_main$G = {
    name: "UniDatetimePicker",
    components: {
      calendar: calendar$1,
      timePicker
    },
    data() {
      return {
        isRange: false,
        hasTime: false,
        mobileRange: false,
        // 单选
        singleVal: "",
        tempSingleDate: "",
        defSingleDate: "",
        time: "",
        // 范围选
        caleRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        range: {
          startDate: "",
          // startTime: '',
          endDate: ""
          // endTime: ''
        },
        tempRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        // 左右日历同步数据
        startMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        endMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        visible: false,
        popup: false,
        popover: null,
        isEmitValue: false,
        isPhone: false,
        isFirstShow: true
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number, Array, Date],
        default: ""
      },
      modelValue: {
        type: [String, Number, Array, Date],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      placeholder: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      rangeSeparator: {
        type: String,
        default: "-"
      },
      border: {
        type: [Boolean],
        default: true
      },
      disabled: {
        type: [Boolean],
        default: false
      },
      clearIcon: {
        type: [Boolean],
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      }
    },
    watch: {
      type: {
        immediate: true,
        handler(newVal, oldVal) {
          if (newVal.indexOf("time") !== -1) {
            this.hasTime = true;
          } else {
            this.hasTime = false;
          }
          if (newVal.indexOf("range") !== -1) {
            this.isRange = true;
          } else {
            this.isRange = false;
          }
        }
      },
      modelValue: {
        immediate: true,
        handler(newVal, oldVal) {
          if (this.isEmitValue) {
            this.isEmitValue = false;
            return;
          }
          this.initPicker(newVal);
        }
      },
      start: {
        immediate: true,
        handler(newVal, oldVal) {
          if (!newVal)
            return;
          const {
            defDate,
            defTime
          } = this.parseDate(newVal);
          this.caleRange.startDate = defDate;
          if (this.hasTime) {
            this.caleRange.startTime = defTime;
          }
        }
      },
      end: {
        immediate: true,
        handler(newVal, oldVal) {
          if (!newVal)
            return;
          const {
            defDate,
            defTime
          } = this.parseDate(newVal);
          this.caleRange.endDate = defDate;
          if (this.hasTime) {
            this.caleRange.endTime = defTime;
          }
        }
      }
    },
    computed: {
      reactStartTime() {
        const activeDate = this.isRange ? this.tempRange.startDate : this.tempSingleDate;
        const res = activeDate === this.caleRange.startDate ? this.caleRange.startTime : "";
        return res;
      },
      reactEndTime() {
        const activeDate = this.isRange ? this.tempRange.endDate : this.tempSingleDate;
        const res = activeDate === this.caleRange.endDate ? this.caleRange.endTime : "";
        return res;
      },
      reactMobDefTime() {
        const times = {
          start: this.tempRange.startTime,
          end: this.tempRange.endTime
        };
        return this.isRange ? times : this.time;
      },
      mobSelectableTime() {
        return {
          start: this.caleRange.startTime,
          end: this.caleRange.endTime
        };
      },
      datePopupWidth() {
        return this.isRange ? 653 : 301;
      },
      /**
       * for i18n
       */
      singlePlaceholderText() {
        return this.placeholder || (this.type === "date" ? this.selectDateText : t$5(
          "uni-datetime-picker.selectDateTime"
        ));
      },
      startPlaceholderText() {
        return this.startPlaceholder || this.startDateText;
      },
      endPlaceholderText() {
        return this.endPlaceholder || this.endDateText;
      },
      selectDateText() {
        return t$5("uni-datetime-picker.selectDate");
      },
      selectTimeText() {
        return t$5("uni-datetime-picker.selectTime");
      },
      startDateText() {
        return this.startPlaceholder || t$5("uni-datetime-picker.startDate");
      },
      startTimeText() {
        return t$5("uni-datetime-picker.startTime");
      },
      endDateText() {
        return this.endPlaceholder || t$5("uni-datetime-picker.endDate");
      },
      endTimeText() {
        return t$5("uni-datetime-picker.endTime");
      },
      okText() {
        return t$5("uni-datetime-picker.ok");
      },
      clearText() {
        return t$5("uni-datetime-picker.clear");
      },
      showClearIcon() {
        const {
          clearIcon,
          disabled,
          singleVal,
          range
        } = this;
        const bool = clearIcon && !disabled && (singleVal || range.startDate && range.endDate);
        return bool;
      }
    },
    created() {
      this.form = this.getForm("uniForms");
      this.formItem = this.getForm("uniFormsItem");
    },
    mounted() {
      this.platform();
    },
    methods: {
      /**
       * 获取父元素实例
       */
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
      initPicker(newVal) {
        if (!newVal || Array.isArray(newVal) && !newVal.length) {
          this.$nextTick(() => {
            this.clear(false);
          });
          return;
        }
        if (!Array.isArray(newVal) && !this.isRange) {
          const {
            defDate,
            defTime
          } = this.parseDate(newVal);
          this.singleVal = defDate;
          this.tempSingleDate = defDate;
          this.defSingleDate = defDate;
          if (this.hasTime) {
            this.singleVal = defDate + " " + defTime;
            this.time = defTime;
          }
        } else {
          const [before, after] = newVal;
          if (!before && !after)
            return;
          const defBefore = this.parseDate(before);
          const defAfter = this.parseDate(after);
          const startDate = defBefore.defDate;
          const endDate = defAfter.defDate;
          this.range.startDate = this.tempRange.startDate = startDate;
          this.range.endDate = this.tempRange.endDate = endDate;
          if (this.hasTime) {
            this.range.startDate = defBefore.defDate + " " + defBefore.defTime;
            this.range.endDate = defAfter.defDate + " " + defAfter.defTime;
            this.tempRange.startTime = defBefore.defTime;
            this.tempRange.endTime = defAfter.defTime;
          }
          const defaultRange = {
            before: defBefore.defDate,
            after: defAfter.defDate
          };
          this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, defaultRange, {
            which: "right"
          });
          this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, defaultRange, {
            which: "left"
          });
        }
      },
      updateLeftCale(e) {
        const left = this.$refs.left;
        left.cale.setHoverMultiple(e.after);
        left.setDate(this.$refs.left.nowDate.fullDate);
      },
      updateRightCale(e) {
        const right = this.$refs.right;
        right.cale.setHoverMultiple(e.after);
        right.setDate(this.$refs.right.nowDate.fullDate);
      },
      platform() {
        const systemInfo = uni.getSystemInfoSync();
        this.isPhone = systemInfo.windowWidth <= 500;
        this.windowWidth = systemInfo.windowWidth;
      },
      show(event) {
        if (this.disabled) {
          return;
        }
        this.platform();
        if (this.isPhone) {
          this.$refs.mobile.open();
          return;
        }
        this.popover = {
          top: "10px"
        };
        const dateEditor = uni.createSelectorQuery().in(this).select(".uni-date-editor");
        dateEditor.boundingClientRect((rect) => {
          if (this.windowWidth - rect.left < this.datePopupWidth) {
            this.popover.right = 0;
          }
        }).exec();
        setTimeout(() => {
          this.popup = !this.popup;
          if (!this.isPhone && this.isRange && this.isFirstShow) {
            this.isFirstShow = false;
            const {
              startDate,
              endDate
            } = this.range;
            if (startDate && endDate) {
              if (this.diffDate(startDate, endDate) < 30) {
                this.$refs.right.next();
              }
            } else {
              this.$refs.right.next();
              this.$refs.right.cale.lastHover = false;
            }
          }
        }, 50);
      },
      close() {
        setTimeout(() => {
          this.popup = false;
          this.$emit("maskClick", this.value);
        }, 20);
      },
      setEmit(value) {
        if (this.returnType === "timestamp" || this.returnType === "date") {
          if (!Array.isArray(value)) {
            if (!this.hasTime) {
              value = value + " 00:00:00";
            }
            value = this.createTimestamp(value);
            if (this.returnType === "date") {
              value = new Date(value);
            }
          } else {
            if (!this.hasTime) {
              value[0] = value[0] + " 00:00:00";
              value[1] = value[1] + " 00:00:00";
            }
            value[0] = this.createTimestamp(value[0]);
            value[1] = this.createTimestamp(value[1]);
            if (this.returnType === "date") {
              value[0] = new Date(value[0]);
              value[1] = new Date(value[1]);
            }
          }
        }
        this.formItem && this.formItem.setValue(value);
        this.$emit("change", value);
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
        this.isEmitValue = true;
      },
      createTimestamp(date) {
        date = this.fixIosDateFormat(date);
        return Date.parse(new Date(date));
      },
      singleChange(e) {
        this.tempSingleDate = e.fulldate;
        if (this.hasTime)
          return;
        this.confirmSingleChange();
      },
      confirmSingleChange() {
        if (!this.tempSingleDate) {
          this.popup = false;
          return;
        }
        if (this.hasTime) {
          this.singleVal = this.tempSingleDate + " " + (this.time ? this.time : "00:00:00");
        } else {
          this.singleVal = this.tempSingleDate;
        }
        this.setEmit(this.singleVal);
        this.popup = false;
      },
      leftChange(e) {
        const {
          before,
          after
        } = e.range;
        this.rangeChange(before, after);
        const obj = {
          before: e.range.before,
          after: e.range.after,
          data: e.range.data,
          fulldate: e.fulldate
        };
        this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, obj);
      },
      rightChange(e) {
        const {
          before,
          after
        } = e.range;
        this.rangeChange(before, after);
        const obj = {
          before: e.range.before,
          after: e.range.after,
          data: e.range.data,
          fulldate: e.fulldate
        };
        this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, obj);
      },
      mobileChange(e) {
        if (this.isRange) {
          const {
            before,
            after
          } = e.range;
          this.handleStartAndEnd(before, after, true);
          if (this.hasTime) {
            const {
              startTime,
              endTime
            } = e.timeRange;
            this.tempRange.startTime = startTime;
            this.tempRange.endTime = endTime;
          }
          this.confirmRangeChange();
        } else {
          if (this.hasTime) {
            this.singleVal = e.fulldate + " " + e.time;
          } else {
            this.singleVal = e.fulldate;
          }
          this.setEmit(this.singleVal);
        }
        this.$refs.mobile.close();
      },
      rangeChange(before, after) {
        if (!(before && after))
          return;
        this.handleStartAndEnd(before, after, true);
        if (this.hasTime)
          return;
        this.confirmRangeChange();
      },
      confirmRangeChange() {
        if (!this.tempRange.startDate && !this.tempRange.endDate) {
          this.popup = false;
          return;
        }
        let start, end;
        if (!this.hasTime) {
          start = this.range.startDate = this.tempRange.startDate;
          end = this.range.endDate = this.tempRange.endDate;
        } else {
          start = this.range.startDate = this.tempRange.startDate + " " + (this.tempRange.startTime ? this.tempRange.startTime : "00:00:00");
          end = this.range.endDate = this.tempRange.endDate + " " + (this.tempRange.endTime ? this.tempRange.endTime : "00:00:00");
        }
        const displayRange = [start, end];
        this.setEmit(displayRange);
        this.popup = false;
      },
      handleStartAndEnd(before, after, temp = false) {
        if (!(before && after))
          return;
        const type = temp ? "tempRange" : "range";
        if (this.dateCompare(before, after)) {
          this[type].startDate = before;
          this[type].endDate = after;
        } else {
          this[type].startDate = after;
          this[type].endDate = before;
        }
      },
      /**
       * 比较时间大小
       */
      dateCompare(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        if (startDate <= endDate) {
          return true;
        } else {
          return false;
        }
      },
      /**
       * 比较时间差
       */
      diffDate(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        const diff = (endDate - startDate) / (24 * 60 * 60 * 1e3);
        return Math.abs(diff);
      },
      clear(needEmit = true) {
        if (!this.isRange) {
          this.singleVal = "";
          this.tempSingleDate = "";
          this.time = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.pcSingle && this.$refs.pcSingle.clearCalender();
          }
          if (needEmit) {
            this.formItem && this.formItem.setValue("");
            this.$emit("change", "");
            this.$emit("input", "");
            this.$emit("update:modelValue", "");
          }
        } else {
          this.range.startDate = "";
          this.range.endDate = "";
          this.tempRange.startDate = "";
          this.tempRange.startTime = "";
          this.tempRange.endDate = "";
          this.tempRange.endTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.left && this.$refs.left.clearCalender();
            this.$refs.right && this.$refs.right.clearCalender();
            this.$refs.right && this.$refs.right.next();
          }
          if (needEmit) {
            this.formItem && this.formItem.setValue([]);
            this.$emit("change", []);
            this.$emit("input", []);
            this.$emit("update:modelValue", []);
          }
        }
      },
      parseDate(date) {
        date = this.fixIosDateFormat(date);
        const defVal = new Date(date);
        const year = defVal.getFullYear();
        const month = defVal.getMonth() + 1;
        const day = defVal.getDate();
        const hour = defVal.getHours();
        const minute = defVal.getMinutes();
        const second = defVal.getSeconds();
        const defDate = year + "-" + this.lessTen(month) + "-" + this.lessTen(day);
        const defTime = this.lessTen(hour) + ":" + this.lessTen(minute) + (this.hideSecond ? "" : ":" + this.lessTen(second));
        return {
          defDate,
          defTime
        };
      },
      lessTen(item) {
        return item < 10 ? "0" + item : item;
      },
      //兼容 iOS、safari 日期格式
      fixIosDateFormat(value) {
        if (typeof value === "string") {
          value = value.replace(/-/g, "/");
        }
        return value;
      },
      leftMonthSwitch(e) {
      },
      rightMonthSwitch(e) {
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_calendar = vue.resolveComponent("calendar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-date" }, [
      vue.createElementVNode("view", {
        class: "uni-date-editor",
        onClick: _cache[4] || (_cache[4] = (...args) => $options.show && $options.show(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-date-editor--x", {
                "uni-date-editor--x__disabled": $props.disabled,
                "uni-date-x--border": $props.border
              }])
            },
            [
              !$data.isRange ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-x uni-date-single"
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "calendar",
                  color: "#e1e1e1",
                  size: "22"
                }),
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-date__x-input",
                  type: "text",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.singleVal = $event),
                  placeholder: $options.singlePlaceholderText,
                  disabled: true
                }, null, 8, ["placeholder"]), [
                  [vue.vModelText, $data.singleVal]
                ])
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-date-x uni-date-range"
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "calendar",
                  color: "#e1e1e1",
                  size: "22"
                }),
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-date__x-input t-c",
                  type: "text",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.range.startDate = $event),
                  placeholder: $options.startPlaceholderText,
                  disabled: true
                }, null, 8, ["placeholder"]), [
                  [vue.vModelText, $data.range.startDate]
                ]),
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  vue.createElementVNode(
                    "view",
                    { class: "uni-tag" },
                    vue.toDisplayString($props.rangeSeparator),
                    1
                    /* TEXT */
                  )
                ], true),
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-date__x-input t-c",
                  type: "text",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.range.endDate = $event),
                  placeholder: $options.endPlaceholderText,
                  disabled: true
                }, null, 8, ["placeholder"]), [
                  [vue.vModelText, $data.range.endDate]
                ])
              ])),
              $options.showClearIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "uni-date__icon-clear",
                onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.clear && $options.clear(...args), ["stop"]))
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "clear",
                  color: "#e1e1e1",
                  size: "18"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        {
          class: "uni-date-mask",
          onClick: _cache[5] || (_cache[5] = (...args) => $options.close && $options.close(...args))
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.popup]
      ]),
      !$data.isPhone ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          ref: "datePicker",
          class: "uni-date-picker__container"
        },
        [
          !$data.isRange ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "uni-date-single--x",
              style: vue.normalizeStyle($data.popover)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-changed popup-x-header"
              }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-date__input t-c",
                  type: "text",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.tempSingleDate = $event),
                  placeholder: $options.selectDateText
                }, null, 8, ["placeholder"]), [
                  [vue.vModelText, $data.tempSingleDate]
                ]),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  modelValue: $data.time,
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.time = $event),
                  border: false,
                  disabled: !$data.tempSingleDate,
                  start: $options.reactStartTime,
                  end: $options.reactEndTime,
                  hideSecond: $props.hideSecond,
                  style: { "width": "100%" }
                }, {
                  default: vue.withCtx(() => [
                    vue.withDirectives(vue.createElementVNode("input", {
                      class: "uni-date__input t-c",
                      type: "text",
                      "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.time = $event),
                      placeholder: $options.selectTimeText,
                      disabled: !$data.tempSingleDate
                    }, null, 8, ["placeholder", "disabled"]), [
                      [vue.vModelText, $data.time]
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "disabled", "start", "end", "hideSecond"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_calendar, {
                ref: "pcSingle",
                showMonth: false,
                "start-date": $data.caleRange.startDate,
                "end-date": $data.caleRange.endDate,
                date: $data.defSingleDate,
                onChange: $options.singleChange,
                style: { "padding": "0 8px" }
              }, null, 8, ["start-date", "end-date", "date", "onChange"]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createCommentVNode(' <text class="">此刻</text> '),
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm",
                    onClick: _cache[9] || (_cache[9] = (...args) => $options.confirmSingleChange && $options.confirmSingleChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "uni-date-popper__arrow" })
            ],
            4
            /* STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "uni-date-range--x",
              style: vue.normalizeStyle($data.popover)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "popup-x-header uni-date-changed"
              }, [
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.tempRange.startDate = $event),
                    placeholder: $options.startDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.startDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.startTime,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.tempRange.startTime = $event),
                    start: $options.reactStartTime,
                    border: false,
                    disabled: !$data.tempRange.startDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.tempRange.startTime = $event),
                        placeholder: $options.startTimeText,
                        disabled: !$data.tempRange.startDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.startTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "start", "disabled", "hideSecond"])
                ]),
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999",
                  style: { "line-height": "40px" }
                }),
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.tempRange.endDate = $event),
                    placeholder: $options.endDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.endDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.endTime,
                    "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => $data.tempRange.endTime = $event),
                    end: $options.reactEndTime,
                    border: false,
                    disabled: !$data.tempRange.endDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => $data.tempRange.endTime = $event),
                        placeholder: $options.endTimeText,
                        disabled: !$data.tempRange.endDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.endTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "end", "disabled", "hideSecond"])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "popup-x-body" }, [
                vue.createVNode(_component_calendar, {
                  ref: "left",
                  showMonth: false,
                  "start-date": $data.caleRange.startDate,
                  "end-date": $data.caleRange.endDate,
                  range: true,
                  onChange: $options.leftChange,
                  pleStatus: $data.endMultipleStatus,
                  onFirstEnterCale: $options.updateRightCale,
                  onMonthSwitch: $options.leftMonthSwitch,
                  style: { "padding": "0 8px" }
                }, null, 8, ["start-date", "end-date", "onChange", "pleStatus", "onFirstEnterCale", "onMonthSwitch"]),
                vue.createVNode(_component_calendar, {
                  ref: "right",
                  showMonth: false,
                  "start-date": $data.caleRange.startDate,
                  "end-date": $data.caleRange.endDate,
                  range: true,
                  onChange: $options.rightChange,
                  pleStatus: $data.startMultipleStatus,
                  onFirstEnterCale: $options.updateLeftCale,
                  onMonthSwitch: $options.rightMonthSwitch,
                  style: { "padding": "0 8px", "border-left": "1px solid #F1F1F1" }
                }, null, 8, ["start-date", "end-date", "onChange", "pleStatus", "onFirstEnterCale", "onMonthSwitch"])
              ]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: "",
                    onClick: _cache[16] || (_cache[16] = (...args) => $options.clear && $options.clear(...args))
                  },
                  vue.toDisplayString($options.clearText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm",
                    onClick: _cache[17] || (_cache[17] = (...args) => $options.confirmRangeChange && $options.confirmRangeChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          ))
        ],
        512
        /* NEED_PATCH */
      )), [
        [vue.vShow, $data.popup]
      ]) : vue.createCommentVNode("v-if", true),
      vue.withDirectives(vue.createVNode(_component_calendar, {
        ref: "mobile",
        clearDate: false,
        date: $data.defSingleDate,
        defTime: $options.reactMobDefTime,
        "start-date": $data.caleRange.startDate,
        "end-date": $data.caleRange.endDate,
        selectableTimes: $options.mobSelectableTime,
        pleStatus: $data.endMultipleStatus,
        showMonth: false,
        range: $data.isRange,
        typeHasTime: $data.hasTime,
        insert: false,
        hideSecond: $props.hideSecond,
        onConfirm: $options.mobileChange
      }, null, 8, ["date", "defTime", "start-date", "end-date", "selectableTimes", "pleStatus", "range", "typeHasTime", "hideSecond", "onConfirm"]), [
        [vue.vShow, $data.isPhone]
      ])
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$b], ["__scopeId", "data-v-9802168a"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"]]);
  const en$2 = {
    "uni-load-more.contentdown": "Pull up to show more",
    "uni-load-more.contentrefresh": "loading...",
    "uni-load-more.contentnomore": "No more data"
  };
  const zhHans$2 = {
    "uni-load-more.contentdown": "上拉显示更多",
    "uni-load-more.contentrefresh": "正在加载...",
    "uni-load-more.contentnomore": "没有更多数据了"
  };
  const zhHant$2 = {
    "uni-load-more.contentdown": "上拉顯示更多",
    "uni-load-more.contentrefresh": "正在加載...",
    "uni-load-more.contentnomore": "沒有更多數據了"
  };
  const messages$2 = {
    en: en$2,
    "zh-Hans": zhHans$2,
    "zh-Hant": zhHant$2
  };
  let platform;
  setTimeout(() => {
    platform = uni.getSystemInfoSync().platform;
  }, 16);
  const {
    t: t$4
  } = initVueI18n(messages$2);
  const _sfc_main$F = {
    name: "UniLoadMore",
    emits: ["clickLoadMore"],
    props: {
      status: {
        // 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
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
        return this.contentText.contentdown || t$4("uni-load-more.contentdown");
      },
      contentrefreshText() {
        return this.contentText.contentrefresh || t$4("uni-load-more.contentrefresh");
      },
      contentnomoreText() {
        return this.contentText.contentnomore || t$4("uni-load-more.contentnomore");
      }
    },
    mounted() {
      var pages2 = getCurrentPages();
      var page = pages2[pages2.length - 1];
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
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "uni-load-more",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.webviewHide && ($props.iconType === "circle" || $props.iconType === "auto" && $data.platform === "android") && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
          class: "uni-load-more__img uni-load-more__img--android-MP"
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          ),
          vue.createElementVNode(
            "view",
            {
              class: "uni-load-more__img-icon",
              style: vue.normalizeStyle({ borderTopColor: $props.color, borderTopWidth: $props.iconSize / 12 })
            },
            null,
            4
            /* STYLE */
          )
        ],
        4
        /* STYLE */
      )) : !$data.webviewHide && $props.status === "loading" && $props.showIcon ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          style: vue.normalizeStyle({ width: $props.iconSize + "px", height: $props.iconSize + "px" }),
          class: "uni-load-more__img uni-load-more__img--ios-H5"
        },
        [
          vue.createElementVNode("image", {
            src: $data.imgBase64,
            mode: "widthFix"
          }, null, 8, ["src"])
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.showText ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 2,
          class: "uni-load-more__text",
          style: vue.normalizeStyle({ color: $props.color })
        },
        vue.toDisplayString($props.status === "more" ? $options.contentdownText : $props.status === "loading" ? $options.contentrefreshText : $options.contentnomoreText),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$a], ["__scopeId", "data-v-9245e42c"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue"]]);
  const _sfc_main$E = {
    __name: "index",
    props: {
      data: {
        type: Object,
        default: () => {
        }
      },
      type: {
        type: Number,
        default: 0
      },
      src: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      const props = __props;
      const item = vue.ref({ ...props.data });
      function goDetails(item2) {
        if (props.src) {
          uni.navigateTo({
            url: props.src,
            success: function(res) {
              res.eventChannel.emit("acceptDataFromOpenerPage", { data: item2 });
            }
          });
        }
      }
      function goDetailsSucc() {
        if (props.src && props.type == 2) {
          uni.navigateTo({
            url: props.src
            // success: function(res) {
            //     // 通过eventChannel向被打开页面传送数据
            // 	res.eventChannel.emit('acceptDataFromOpenerPage', { data: item })
            // }
          });
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 公用卡片 "),
            vue.createElementVNode("view", {
              class: "card",
              onClick: _cache[3] || (_cache[3] = ($event) => goDetailsSucc())
            }, [
              vue.createElementVNode("view", { class: "topCont" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  "任务编号：" + vue.toDisplayString(item.value.transportTaskId),
                  1
                  /* TEXT */
                ),
                vue.createTextVNode(),
                item.value.isDelay == 1 && __props.type == 0 ? (vue.openBlock(), vue.createElementBlock("text", {
                  key: 0,
                  class: "label"
                }, "已延期")) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "addrCont" }, [
                vue.createElementVNode(
                  "view",
                  { class: "startAddr" },
                  vue.toDisplayString(item.value.startAddress),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "endAddr" },
                  vue.toDisplayString(item.value.endAddress),
                  1
                  /* TEXT */
                )
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "botCont" },
                [
                  vue.createElementVNode("view", { class: "timeCont" }, [
                    vue.createElementVNode("view", { class: "tit" }, [
                      vue.createElementVNode("text", null, "提货时间")
                    ]),
                    vue.createElementVNode("view", { class: "time" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.value.planDepartureTime),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "ButCont" }, [
                    item.value.enablePickUp ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "butRed",
                      onClick: _cache[0] || (_cache[0] = ($event) => goDetails(item.value))
                    }, "提货")) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "butRed butDis"
                    }, "提货"))
                  ])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, __props.type == 0]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "botCont" },
                [
                  vue.createElementVNode("view", { class: "timeCont" }, [
                    vue.createElementVNode("view", { class: "tit" }, [
                      vue.createElementVNode("text", null, "预计到达时间 ")
                    ]),
                    vue.createElementVNode("view", { class: "time" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.value.planArrivalTime),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  item.value.status <= 3 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "ButCont"
                  }, [
                    vue.createElementVNode("text", {
                      class: "butRed",
                      onClick: _cache[1] || (_cache[1] = ($event) => goDetails(item.value))
                    }, "交付")
                  ])) : vue.createCommentVNode("v-if", true),
                  item.value.status == 4 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "ButCont"
                  }, [
                    vue.createElementVNode("text", {
                      class: "butRed",
                      onClick: _cache[2] || (_cache[2] = ($event) => goDetails(item.value))
                    }, "回车登记")
                  ])) : vue.createCommentVNode("v-if", true)
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, __props.type == 1]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "botCont" },
                [
                  vue.createElementVNode("view", { class: "timeCont finish" }, [
                    vue.createElementVNode("view", { class: "tit" }, [
                      vue.createElementVNode("text", null, "交货时间")
                    ]),
                    vue.createElementVNode("view", { class: "time" }, [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.value.actualArrivalTime),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, __props.type == 2]
              ])
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const Card = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-7ced8403"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/Card/index.vue"]]);
  const _sfc_main$D = {
    __name: "index",
    props: {
      emptyInfo: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "emptyBox" }, [
          vue.createElementVNode("image", {
            src: "/static/sj_nodata.png",
            class: "emptyImage",
            mode: ""
          }),
          vue.createElementVNode("view", null, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(__props.emptyInfo),
              1
              /* TEXT */
            )
          ])
        ]);
      };
    }
  };
  const EmptyPage = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-e3eb26b5"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/EmptyPage/index.vue"]]);
  const _sfc_main$C = {
    __name: "index",
    props: {
      itemData: {
        inputKey: String,
        default: "value"
      }
    },
    emits: ["searchHandle"],
    setup(__props, { emit }) {
      const searchKey = vue.ref("");
      const searchHandle = () => {
        emit("searchHandle", searchKey.value);
      };
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 公用搜索框 "),
            vue.createElementVNode("view", { class: "search" }, [
              vue.createVNode(_component_uni_icons, {
                class: "searchIcon",
                onClick: _cache[0] || (_cache[0] = ($event) => searchHandle()),
                type: "search"
              }),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => searchKey.value = $event),
                  class: "searchInput",
                  onConfirm: _cache[2] || (_cache[2] = ($event) => searchHandle()),
                  focus: "",
                  placeholder: "请输入运单号"
                },
                null,
                544
                /* HYDRATE_EVENTS, NEED_PATCH */
              ), [
                [vue.vModelText, searchKey.value]
              ])
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const SearchInput = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-02ae90b9"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/SearchInput/index.vue"]]);
  const _sfc_main$B = {
    __name: "ItemList",
    props: {
      itemData: {
        type: Array,
        default: () => []
      },
      moreStatus: {
        type: String,
        default: "loading"
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    emits: ["setTabIndex", "searchSubmit"],
    setup(__props, { emit }) {
      const scrollinto = vue.ref("tab0");
      const store2 = useStore();
      const tabIndex = vue.ref(store2.state.taskStatus);
      const scrollH = vue.ref(0);
      const emptyInfo = vue.ref("未找到相关任务");
      const tabBars = vue.reactive(["待提货", "在途", "已完成"]);
      vue.ref();
      vue.ref();
      const taskId = vue.ref("");
      const isSearch = vue.ref(true);
      const range = vue.ref();
      vue.ref("");
      vue.provide("taskId", taskId);
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: function(res) {
            let info = uni.createSelectorQuery().select(".swiperH");
            info.boundingClientRect(function(data2) {
              scrollH.value = data2.height + 140;
            }).exec();
          }
        });
      });
      vue.watchEffect(() => {
        if (range.value) {
          isSearch.value = false;
        }
      });
      const filterUrl = (item) => {
        let src = "";
        if (tabIndex.value == 0) {
          src = `/pages/index/details?id=${item.id}`;
        } else {
          switch (Number(item.status)) {
            case 1:
              src = `/pages/index/details?id=${item.id}`;
              break;
            case 2:
              src = `/pages/index/detailsRoad?id=${item.id}`;
              break;
            case 4:
              src = `/pages/index/refister?id=${item.transportTaskId}&time=${item.actualDepartureTime}`;
              break;
            case 6:
              src = `/pages/index/detailsSuccess?id=${item.id}`;
              break;
            default:
              src = ``;
              break;
          }
        }
        return src;
      };
      function searchHandle(type) {
        const params = type == "time" ? range : type;
        emit("searchSubmit", params);
      }
      function scrolltoupperHandle() {
        emit("setTabIndex", tabIndex.value);
      }
      const changeTab = (index) => {
        if (tabIndex.value == index) {
          return;
        }
        tabIndex.value = index;
        emit("setTabIndex", index);
      };
      function maskClick(time) {
        formatAppLog("log", "at pages/index/components/ItemList.vue:166", time);
      }
      return (_ctx, _cache) => {
        const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_0$2);
        const _component_uni_load_more = resolveEasycom(vue.resolveDynamicComponent("uni-load-more"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
          vue.createElementVNode("scroll-view", {
            "scroll-x": "true",
            class: "tabScroll",
            "scroll-into-view": scrollinto.value,
            "scroll-with-animation": true
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(tabBars, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: index,
                  id: "tab" + index,
                  class: "scroll-row-item",
                  onClick: ($event) => changeTab(index)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(tabIndex.value == index ? "scroll-row-item-act" : "")
                    },
                    [
                      vue.createElementVNode("text", { class: "line" }),
                      vue.createTextVNode(
                        " " + vue.toDisplayString(item),
                        1
                        /* TEXT */
                      )
                    ],
                    2
                    /* CLASS */
                  )
                ], 8, ["id", "onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ], 8, ["scroll-into-view"]),
          vue.createCommentVNode(" 已完成页面 搜索框 - start "),
          tabIndex.value == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "searchCont"
          }, [
            vue.createVNode(SearchInput, {
              inputKey: "orderId",
              onSearchHandle: searchHandle
            }),
            vue.createElementVNode("view", { class: "timeSearch" }, [
              vue.createVNode(_component_uni_datetime_picker, {
                modelValue: range.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => range.value = $event),
                type: "daterange",
                onMaskClick: maskClick,
                rangeSeparator: "至"
              }, null, 8, ["modelValue"]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                {
                  class: "searchBut",
                  onClick: _cache[1] || (_cache[1] = ($event) => searchHandle("time"))
                },
                [
                  vue.createElementVNode("text", { class: "button min" }, "筛选")
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, !isSearch.value]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "view",
                { class: "searchBut" },
                [
                  vue.createElementVNode("text", { class: "button buttonDis1 min" }, "筛选")
                ],
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, isSearch.value]
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode(" 已完成页面 搜索框 - end "),
          vue.createCommentVNode(' 滑块内容 对应的是顶部选项卡的切换 :current="tabIndex" 设置的是y方向上可以滚动'),
          vue.createElementVNode("view", { class: "container" }, [
            vue.createCommentVNode(" 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度"),
            vue.createElementVNode(
              "scroll-view",
              {
                "scroll-y": "true",
                class: vue.normalizeClass(["swiperH", { finshSwiperH: tabIndex.value == 2 }]),
                onScrolltolower: scrolltoupperHandle,
                "lower-threshold": 10
              },
              [
                __props.itemData.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "marg"
                }, [
                  vue.createCommentVNode(" 通用卡片组件 - 待提货、在途 "),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(__props.itemData, (item, index) => {
                      return vue.openBlock(), vue.createBlock(Card, {
                        data: item,
                        src: filterUrl(item),
                        key: item.id,
                        type: tabIndex.value
                      }, null, 8, ["data", "src", "type"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" 无数据显示 "),
                __props.itemData.length === 0 && !__props.loading ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                  vue.createVNode(EmptyPage, { emptyInfo: emptyInfo.value }, null, 8, ["emptyInfo"])
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" end "),
                vue.createCommentVNode(" 下拉加载更多Lodding "),
                __props.loading ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
                  vue.createVNode(_component_uni_load_more, { status: __props.moreStatus }, null, 8, ["status"])
                ])) : vue.createCommentVNode("v-if", true),
                vue.createCommentVNode(" end ")
              ],
              34
              /* CLASS, HYDRATE_EVENTS */
            )
          ])
        ]);
      };
    }
  };
  const ItemList = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-b6621d9e"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/components/ItemList.vue"]]);
  const __default__$1 = {
    name: "list",
    // 上拉刷新
    onPullDownRefresh() {
      uni.stopPullDownRefresh();
    }
  };
  const _sfc_main$A = /* @__PURE__ */ Object.assign(__default__$1, {
    setup(__props) {
      const store2 = useStore();
      const itemData = vue.reactive([]);
      const tabIndex = vue.ref(store2.state.taskStatus);
      const moreStatus = vue.ref("loading");
      const loading = vue.ref(false);
      const date = new Date();
      const year = date.getFullYear();
      const month = vue.computed(() => {
        const mt2 = date.getMonth();
        if (mt2 > 0 && mt2 < 10) {
          return "0" + mt2;
        } else if (mt2 == 0) {
          return 12;
        } else {
          return mt2;
        }
      });
      const month1 = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const params = vue.reactive({
        status: tabIndex != 2 ? tabIndex.value + 1 : 4,
        transportTaskId: "",
        // 运单号 非必传
        startTime: month.value == 12 ? `${year - 1}-${month.value}-${day}` : `${year}-${month.value}-${day}`,
        endTime: `${year}-${month1}-${day}`,
        page: 1,
        pageSize: 10
      });
      vue.ref(0);
      vue.onMounted(() => {
        positionsUploadInit();
        getNewData();
      });
      const isSendRequest = vue.ref(false);
      const getNewData = async (type) => {
        if (isSendRequest.value) {
          return;
        }
        loading.value = true;
        await GetTasksList(params).then((res) => {
          if (res.code == 200) {
            const { data: data2 } = res;
            if (type && type == "search") {
              params.page = 1;
              params.pageSize = 10;
              itemData.value = data2.items ? data2.items : [];
            } else {
              const items = data2.items == null ? [] : data2.items;
              params.page == 1 ? itemData.value = void 0 : null;
              itemData.value = itemData.value ? [...itemData.value, ...items] : items;
              if (data2.counts == 0) {
                isSendRequest.value = true;
              }
            }
            loading.value = false;
            counts.value = data2.pages;
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const setTabIndex = (index) => {
        const tab = store2.state.taskStatus;
        store2.commit("setTaskStatus", index);
        params.page = tab == index ? params.page + 1 : 1;
        params.status = index != 2 ? index + 1 : 6;
        isSendRequest.value = false;
        getNewData();
      };
      const searchHandle = (val) => {
        if (typeof val == "string") {
          params.transportTaskId = val;
        } else {
          params.startTime = val.value[0];
          params.endTime = val.value[1];
        }
        getNewData("search");
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "pageBox" }, [
              vue.createCommentVNode(" 取件状态列表 "),
              vue.createVNode(ItemList, {
                itemData: itemData.value,
                onSetTabIndex: setTabIndex,
                onSearchSubmit: searchHandle,
                loadding: loading.value,
                moreStatus: moreStatus.value
              }, null, 8, ["itemData", "loadding", "moreStatus"]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" footer "),
            vue.createVNode(UniFooter, { pagePath: "pages/index/index" }),
            vue.createCommentVNode(" end ")
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/index.vue"]]);
  const _imports_0$6 = "/static/sj_back.png";
  const _sfc_main$z = {
    __name: "index",
    props: {
      title: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      vue.ref("");
      const backHandle = () => {
        uni.navigateBack({
          delta: 1
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 公用 详情Nav "),
            vue.createElementVNode("view", { class: "detailsHead" }, [
              vue.createElementVNode("view", { class: "head" }, [
                vue.createCommentVNode(" 详情页-返回头部 "),
                vue.createElementVNode("image", {
                  style: { "width": "88rpx", "height": "88rpx" },
                  src: _imports_0$6,
                  onClick: _cache[0] || (_cache[0] = ($event) => backHandle()),
                  mode: ""
                }),
                vue.createElementVNode(
                  "view",
                  { class: "title" },
                  vue.toDisplayString(__props.title),
                  1
                  /* TEXT */
                ),
                vue.createCommentVNode(" end ")
              ])
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const DetailsNav = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-c92109db"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/DetailsNav/index.vue"]]);
  const _sfc_main$y = {
    __name: "delayed",
    setup(__props) {
      const orgTime = vue.ref();
      const time = vue.ref("不可超过两小时");
      const formData = vue.ref({
        id: "",
        delayTime: "",
        delayReason: ""
      });
      vue.onMounted(() => {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1].$page.options;
        orgTime.value = currentPage.time;
        formData.value.id = currentPage.id;
      });
      const bindTimeChange = (e) => {
        time.value = e.detail.value;
      };
      const formActioin = async () => {
        const data2 = formData.value;
        if (time.value == "不可超过两小时") {
          uni.showToast({
            title: "请选择延迟时间！",
            duration: 1e3,
            icon: "none"
          });
          return;
        }
        if (data2.delayReason.trim() == "") {
          uni.showToast({
            title: "请填写延迟提货原因！",
            duration: 1e3,
            icon: "none"
          });
          return;
        }
        const lastTime = orgTime.value;
        data2.delayTime = lastTime.replace(/(\d+){2}(:\d+){1}/, time.value);
        await PutDelay(formData.value).then((res) => {
          if (res.code === 200) {
            uni.showToast({
              title: "延迟提货提交成功",
              duration: 1e3,
              icon: "none"
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/index/index"
              });
            }, 500);
          } else {
            uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "pageBox" }, [
              vue.createCommentVNode(" title "),
              vue.createVNode(DetailsNav, { title: "延迟提货" }),
              vue.createCommentVNode(" 取件状态列表 "),
              vue.createElementVNode("view", { class: "container" }, [
                vue.createElementVNode("view", { class: "delayedCont" }, [
                  vue.createElementVNode("view", { class: "lineBoder" }, [
                    vue.createElementVNode("text", null, "原定时间"),
                    vue.createElementVNode(
                      "text",
                      { class: "label" },
                      vue.toDisplayString(orgTime.value),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "lineBoder" }, [
                    vue.createElementVNode("text", null, "延迟时间"),
                    vue.createElementVNode("picker", {
                      mode: "time",
                      value: time.value,
                      start: "09:01",
                      end: "21:01",
                      onChange: bindTimeChange
                    }, [
                      vue.createElementVNode("view", { class: "uni-input timeInfo" }, [
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(time.value),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("image", {
                          class: "iconImg",
                          src: "/static/sj_open_rit.png",
                          mode: ""
                        })
                      ])
                    ], 40, ["value"])
                  ]),
                  vue.createElementVNode("view", { class: "" }, [
                    vue.withDirectives(vue.createElementVNode(
                      "textarea",
                      {
                        class: "textInput",
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => formData.value.delayReason = $event),
                        "placeholder-style": "color:#818181",
                        placeholder: "请输入延迟提货原因"
                      },
                      null,
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vModelText, formData.value.delayReason]
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "butCont" }, [
                    vue.withDirectives(vue.createElementVNode(
                      "text",
                      { class: "button buttonDis1" },
                      "提交",
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vShow, formData.value.delayReason == "" || time.value == "不可超过两小时"]
                    ]),
                    vue.withDirectives(vue.createElementVNode(
                      "text",
                      {
                        class: "button",
                        onClick: _cache[1] || (_cache[1] = ($event) => formActioin())
                      },
                      "提交",
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vShow, formData.value.delayReason != "" && time.value != "不可超过两小时"]
                    ])
                  ])
                ])
              ]),
              vue.createCommentVNode(" end ")
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexDelayed = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/delayed.vue"]]);
  const pages = [
    {
      path: "pages/start/index",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/login/user",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/login/index",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/index/index",
      style: {
        navigationStyle: "custom",
        pullToRefresh: {
          support: true,
          color: "#ff3333",
          style: "default",
          contentdown: {
            caption: "下拉可刷新自定义文本"
          },
          contentover: {
            caption: "释放可刷新自定义文本"
          },
          contentrefresh: {
            caption: "正在刷新自定义文本"
          }
        }
      }
    },
    {
      path: "pages/index/delayed",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/index/details",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/index/detailsRoad",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/index/detailsSuccess",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/index/exception",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/index/refister",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/message/index",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/message/details",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/user/index",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/user/carrier",
      style: {
        navigationStyle: "custom"
      }
    },
    {
      path: "pages/user/setCarrier",
      style: {
        navigationStyle: "custom"
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "神领快递",
    navigationBarBackgroundColor: "#F4F4F4",
    backgroundColor: "#F4F4F4",
    "app-plus": {
      background: "#F4F4F4"
    }
  };
  const condition = {
    current: 0,
    list: [
      {
        name: "",
        path: "",
        query: ""
      }
    ]
  };
  const t$3 = {
    pages,
    globalStyle,
    condition
  };
  function n(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function s(e, t2, n2) {
    return e(n2 = { path: t2, exports: {}, require: function(e2, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var r = s(function(e, t2) {
    var n2;
    e.exports = (n2 = n2 || function(e2, t3) {
      var n3 = Object.create || function() {
        function e3() {
        }
        return function(t4) {
          var n4;
          return e3.prototype = t4, n4 = new e3(), e3.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e3) {
        var t4 = n3(this);
        return e3 && t4.mixIn(e3), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e3 = this.extend();
        return e3.init.apply(e3, arguments), e3;
      }, init: function() {
      }, mixIn: function(e3) {
        for (var t4 in e3)
          e3.hasOwnProperty(t4) && (this[t4] = e3[t4]);
        e3.hasOwnProperty("toString") && (this.toString = e3.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e3, n4) {
        e3 = this.words = e3 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e3.length;
      }, toString: function(e3) {
        return (e3 || c2).stringify(this);
      }, concat: function(e3) {
        var t4 = this.words, n4 = e3.words, s3 = this.sigBytes, r3 = e3.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e2.ceil(n4 / 4);
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3.words = this.words.slice(0), e3;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e2.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e2.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e3.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e3.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, l2 = a2.Utf8 = { stringify: function(e3) {
        try {
          return decodeURIComponent(escape(u2.stringify(e3)));
        } catch (e4) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e3) {
        return u2.parse(unescape(encodeURIComponent(e3)));
      } }, h2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e3) {
        "string" == typeof e3 && (e3 = l2.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e2.ceil(a3) : e2.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e2.min(4 * c3, r3);
        if (c3) {
          for (var l3 = 0; l3 < c3; l3 += i3)
            this._doProcessBlock(s3, l3);
          var h3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(h3, u3);
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3._data = this._data.clone(), e3;
      }, _minBufferSize: 0 });
      r2.Hasher = h2.extend({ cfg: i2.extend(), init: function(e3) {
        this.cfg = this.cfg.extend(e3), this.reset();
      }, reset: function() {
        h2.reset.call(this), this._doReset();
      }, update: function(e3) {
        return this._append(e3), this._process(), this;
      }, finalize: function(e3) {
        return e3 && this._append(e3), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e3) {
        return function(t4, n4) {
          return new e3.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e3) {
        return function(t4, n4) {
          return new d2.HMAC.init(e3, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), i = r, o = (s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, function(e2) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e2.abs(e2.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e3, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e3[s3];
          e3[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e3[t4 + 0], c3 = e3[t4 + 1], f2 = e3[t4 + 2], p2 = e3[t4 + 3], g2 = e3[t4 + 4], m2 = e3[t4 + 5], y2 = e3[t4 + 6], _2 = e3[t4 + 7], w = e3[t4 + 8], v2 = e3[t4 + 9], S2 = e3[t4 + 10], k2 = e3[t4 + 11], I2 = e3[t4 + 12], b = e3[t4 + 13], T2 = e3[t4 + 14], A2 = e3[t4 + 15], C2 = i3[0], P2 = i3[1], E2 = i3[2], O2 = i3[3];
        C2 = u2(C2, P2, E2, O2, o3, 7, a2[0]), O2 = u2(O2, C2, P2, E2, c3, 12, a2[1]), E2 = u2(E2, O2, C2, P2, f2, 17, a2[2]), P2 = u2(P2, E2, O2, C2, p2, 22, a2[3]), C2 = u2(C2, P2, E2, O2, g2, 7, a2[4]), O2 = u2(O2, C2, P2, E2, m2, 12, a2[5]), E2 = u2(E2, O2, C2, P2, y2, 17, a2[6]), P2 = u2(P2, E2, O2, C2, _2, 22, a2[7]), C2 = u2(C2, P2, E2, O2, w, 7, a2[8]), O2 = u2(O2, C2, P2, E2, v2, 12, a2[9]), E2 = u2(E2, O2, C2, P2, S2, 17, a2[10]), P2 = u2(P2, E2, O2, C2, k2, 22, a2[11]), C2 = u2(C2, P2, E2, O2, I2, 7, a2[12]), O2 = u2(O2, C2, P2, E2, b, 12, a2[13]), E2 = u2(E2, O2, C2, P2, T2, 17, a2[14]), C2 = l2(C2, P2 = u2(P2, E2, O2, C2, A2, 22, a2[15]), E2, O2, c3, 5, a2[16]), O2 = l2(O2, C2, P2, E2, y2, 9, a2[17]), E2 = l2(E2, O2, C2, P2, k2, 14, a2[18]), P2 = l2(P2, E2, O2, C2, o3, 20, a2[19]), C2 = l2(C2, P2, E2, O2, m2, 5, a2[20]), O2 = l2(O2, C2, P2, E2, S2, 9, a2[21]), E2 = l2(E2, O2, C2, P2, A2, 14, a2[22]), P2 = l2(P2, E2, O2, C2, g2, 20, a2[23]), C2 = l2(C2, P2, E2, O2, v2, 5, a2[24]), O2 = l2(O2, C2, P2, E2, T2, 9, a2[25]), E2 = l2(E2, O2, C2, P2, p2, 14, a2[26]), P2 = l2(P2, E2, O2, C2, w, 20, a2[27]), C2 = l2(C2, P2, E2, O2, b, 5, a2[28]), O2 = l2(O2, C2, P2, E2, f2, 9, a2[29]), E2 = l2(E2, O2, C2, P2, _2, 14, a2[30]), C2 = h2(C2, P2 = l2(P2, E2, O2, C2, I2, 20, a2[31]), E2, O2, m2, 4, a2[32]), O2 = h2(O2, C2, P2, E2, w, 11, a2[33]), E2 = h2(E2, O2, C2, P2, k2, 16, a2[34]), P2 = h2(P2, E2, O2, C2, T2, 23, a2[35]), C2 = h2(C2, P2, E2, O2, c3, 4, a2[36]), O2 = h2(O2, C2, P2, E2, g2, 11, a2[37]), E2 = h2(E2, O2, C2, P2, _2, 16, a2[38]), P2 = h2(P2, E2, O2, C2, S2, 23, a2[39]), C2 = h2(C2, P2, E2, O2, b, 4, a2[40]), O2 = h2(O2, C2, P2, E2, o3, 11, a2[41]), E2 = h2(E2, O2, C2, P2, p2, 16, a2[42]), P2 = h2(P2, E2, O2, C2, y2, 23, a2[43]), C2 = h2(C2, P2, E2, O2, v2, 4, a2[44]), O2 = h2(O2, C2, P2, E2, I2, 11, a2[45]), E2 = h2(E2, O2, C2, P2, A2, 16, a2[46]), C2 = d2(C2, P2 = h2(P2, E2, O2, C2, f2, 23, a2[47]), E2, O2, o3, 6, a2[48]), O2 = d2(O2, C2, P2, E2, _2, 10, a2[49]), E2 = d2(E2, O2, C2, P2, T2, 15, a2[50]), P2 = d2(P2, E2, O2, C2, m2, 21, a2[51]), C2 = d2(C2, P2, E2, O2, I2, 6, a2[52]), O2 = d2(O2, C2, P2, E2, p2, 10, a2[53]), E2 = d2(E2, O2, C2, P2, S2, 15, a2[54]), P2 = d2(P2, E2, O2, C2, c3, 21, a2[55]), C2 = d2(C2, P2, E2, O2, w, 6, a2[56]), O2 = d2(O2, C2, P2, E2, A2, 10, a2[57]), E2 = d2(E2, O2, C2, P2, y2, 15, a2[58]), P2 = d2(P2, E2, O2, C2, b, 21, a2[59]), C2 = d2(C2, P2, E2, O2, g2, 6, a2[60]), O2 = d2(O2, C2, P2, E2, k2, 10, a2[61]), E2 = d2(E2, O2, C2, P2, f2, 15, a2[62]), P2 = d2(P2, E2, O2, C2, v2, 21, a2[63]), i3[0] = i3[0] + C2 | 0, i3[1] = i3[1] + P2 | 0, i3[2] = i3[2] + E2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e2.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var l3 = c3[u3];
          c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3._hash = this._hash.clone(), e3;
      } });
      function u2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, void function() {
      var e2 = n2, t3 = e2.lib.Base, s2 = e2.enc.Utf8;
      e2.algo.HMAC = t3.extend({ init: function(e3, t4) {
        e3 = this._hasher = new e3.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e3.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e3.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e3 = this._hasher;
        e3.reset(), e3.update(this._iKey);
      }, update: function(e3) {
        return this._hasher.update(e3), this;
      }, finalize: function(e3) {
        var t4 = this._hasher, n3 = t4.finalize(e3);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), s(function(e, t2) {
    e.exports = i.HmacMD5;
  })), a = s(function(e, t2) {
    e.exports = i.enc.Utf8;
  }), c = s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, function() {
      var e2 = n2, t3 = e2.lib.WordArray;
      function s2(e3, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e3.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e3.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e2.enc.Base64 = { stringify: function(e3) {
        var t4 = e3.words, n3 = e3.sigBytes, s3 = this._map;
        e3.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e3) {
        var t4 = e3.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e3.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e3, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const u = "FUNCTION", l = "OBJECT", h = "CLIENT_DB";
  function d(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  }
  function f(e) {
    return "object" === d(e);
  }
  function p(e) {
    return "function" == typeof e;
  }
  function g(e) {
    return function() {
      try {
        return e.apply(e, arguments);
      } catch (e2) {
        console.error(e2);
      }
    };
  }
  function m(e) {
    return e && "string" == typeof e ? JSON.parse(e) : e;
  }
  const y = true, _ = "app", v = m([]), S = _, k = m(""), I = m("[]") || [];
  let T = "";
  try {
    T = "__UNI__C91E013";
  } catch (e) {
  }
  let A = {};
  function C(e, t2 = {}) {
    var n2, s2;
    return n2 = A, s2 = e, Object.prototype.hasOwnProperty.call(n2, s2) || (A[e] = t2), A[e];
  }
  A = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const P = ["invoke", "success", "fail", "complete"], E = C("_globalUniCloudInterceptor");
  function O(e, t2) {
    E[e] || (E[e] = {}), f(t2) && Object.keys(t2).forEach((n2) => {
      P.indexOf(n2) > -1 && function(e2, t3, n3) {
        let s2 = E[e2][t3];
        s2 || (s2 = E[e2][t3] = []), -1 === s2.indexOf(n3) && p(n3) && s2.push(n3);
      }(e, n2, t2[n2]);
    });
  }
  function x(e, t2) {
    E[e] || (E[e] = {}), f(t2) ? Object.keys(t2).forEach((n2) => {
      P.indexOf(n2) > -1 && function(e2, t3, n3) {
        const s2 = E[e2][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e, n2, t2[n2]);
    }) : delete E[e];
  }
  function U(e, t2) {
    return e && 0 !== e.length ? e.reduce((e2, n2) => e2.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function R(e, t2) {
    return E[e] && E[e][t2] || [];
  }
  function L(e) {
    O("callObject", e);
  }
  const N = C("_globalUniCloudListener"), D = "response", F = "needLogin", q = "refreshToken", K = "clientdb", j = "cloudfunction", M = "cloudobject";
  function B(e) {
    return N[e] || (N[e] = []), N[e];
  }
  function $(e, t2) {
    const n2 = B(e);
    n2.includes(t2) || n2.push(t2);
  }
  function W(e, t2) {
    const n2 = B(e), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function z(e, t2) {
    const n2 = B(e);
    for (let e2 = 0; e2 < n2.length; e2++) {
      (0, n2[e2])(t2);
    }
  }
  let J, H = false;
  function G() {
    return J || (J = new Promise((e) => {
      H && e(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (H = true, e());
        }
        H || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), J);
  }
  function V(e) {
    const t2 = {};
    for (const n2 in e) {
      const s2 = e[n2];
      p(s2) && (t2[n2] = g(s2));
    }
    return t2;
  }
  function Y(e, t2) {
    return t2 ? function(n2) {
      let s2 = false;
      if ("callFunction" === t2) {
        const e2 = n2 && n2.type || u;
        s2 = e2 !== u;
      }
      const r2 = "callFunction" === t2 && !s2;
      let i2;
      i2 = this.isReady ? Promise.resolve() : this.initUniCloud, n2 = n2 || {};
      const { success: o2, fail: a2, complete: c2 } = V(n2), l2 = i2.then(() => s2 ? Promise.resolve() : U(R(t2, "invoke"), n2)).then(() => e.call(this, n2)).then((e2) => s2 ? Promise.resolve(e2) : U(R(t2, "success"), e2).then(() => U(R(t2, "complete"), e2)).then(() => (r2 && z(D, { type: j, content: e2 }), Promise.resolve(e2))), (e2) => s2 ? Promise.reject(e2) : U(R(t2, "fail"), e2).then(() => U(R(t2, "complete"), e2)).then(() => (z(D, { type: j, content: e2 }), Promise.reject(e2))));
      if (!(o2 || a2 || c2))
        return l2;
      l2.then((e2) => {
        o2 && o2(e2), c2 && c2(e2), r2 && z(D, { type: j, content: e2 });
      }, (e2) => {
        a2 && a2(e2), c2 && c2(e2), r2 && z(D, { type: j, content: e2 });
      });
    } : function(t3) {
      t3 = t3 || {};
      const { success: n2, fail: s2, complete: r2 } = V(t3);
      if (!(n2 || s2 || r2))
        return e.call(this, t3);
      e.call(this, t3).then((e2) => {
        n2 && n2(e2), r2 && r2(e2);
      }, (e2) => {
        s2 && s2(e2), r2 && r2(e2);
      });
    };
  }
  class Q extends Error {
    constructor(e) {
      super(e.message), this.errMsg = e.message || e.errMsg || "unknown system error", this.code = this.errCode = e.code || e.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e.subject || e.errSubject, this.cause = e.cause, this.requestId = e.requestId;
    }
    toJson(e = 0) {
      if (!(e >= 10))
        return e++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e) : this.cause };
    }
  }
  var X = { request: (e) => uni.request(e), uploadFile: (e) => uni.uploadFile(e), setStorageSync: (e, t2) => uni.setStorageSync(e, t2), getStorageSync: (e) => uni.getStorageSync(e), removeStorageSync: (e) => uni.removeStorageSync(e), clearStorageSync: () => uni.clearStorageSync() };
  function Z(e) {
    return e && Z(e.__v_raw) || e;
  }
  function ee() {
    return { token: X.getStorageSync("uni_id_token") || X.getStorageSync("uniIdToken"), tokenExpired: X.getStorageSync("uni_id_token_expired") };
  }
  function te({ token: e, tokenExpired: t2 } = {}) {
    e && X.setStorageSync("uni_id_token", e), t2 && X.setStorageSync("uni_id_token_expired", t2);
  }
  let se, re;
  function ie() {
    return se || (se = uni.getSystemInfoSync()), se;
  }
  function oe() {
    let e, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e = s2, t2 = n2;
      }
    } catch (e2) {
    }
    return { channel: e, scene: t2 };
  }
  function ae() {
    const e = uni.getLocale && uni.getLocale() || "en";
    if (re)
      return { ...re, locale: e, LOCALE: e };
    const t2 = ie(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
    for (let e2 = 0; e2 < o2.length; e2++) {
      delete t2[o2[e2]];
    }
    return re = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...oe(), ...t2 }, { ...re, locale: e, LOCALE: e };
  }
  var ce = { sign: function(e, t2) {
    let n2 = "";
    return Object.keys(e).sort().forEach(function(t3) {
      e[t3] && (n2 = n2 + "&" + t3 + "=" + e[t3]);
    }), n2 = n2.slice(1), o(n2, t2).toString();
  }, wrappedRequest: function(e, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e, { complete(e2) {
        e2 || (e2 = {});
        const t3 = e2.data && e2.data.header && e2.data.header["x-serverless-request-id"] || e2.header && e2.header["request-id"];
        if (!e2.statusCode || e2.statusCode >= 400)
          return s2(new Q({ code: "SYS_ERR", message: e2.errMsg || "request:fail", requestId: t3 }));
        const r2 = e2.data;
        if (r2.error)
          return s2(new Q({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e) {
    return c.stringify(a.parse(e));
  } }, ue = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
  const { t: le } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: ue, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: ue }, "zh-Hans");
  var he = class {
    constructor(e) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e, t2))
          throw new Error(le("uniCloud.init.paramRequired", { param: t2 }));
      }), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = X, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e) {
      this.accessToken = e;
    }
    requestWrapped(e) {
      return ce.wrappedRequest(e, this.adapter.request);
    }
    requestAuth(e) {
      return this.requestWrapped(e);
    }
    request(e, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e) : this.requestWrapped(e).catch((t3) => new Promise((e2, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e2();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e) {
      const t2 = Object.assign({}, e);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = ce.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = ce.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      if ("pending" === this._getAccessTokenPromiseStatus)
        return this._getAccessTokenPromise;
      this._getAccessTokenPromiseStatus = "pending";
      return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e) => new Promise((t2, n2) => {
        e.result && e.result.accessToken ? (this.setAccessToken(e.result.accessToken), this._getAccessTokenPromiseStatus = "fulfilled", t2(this.accessToken)) : (this._getAccessTokenPromiseStatus = "rejected", n2(new Q({ code: "AUTH_FAILED", message: "获取accessToken失败" })));
      }), (e) => (this._getAccessTokenPromiseStatus = "rejected", Promise.reject(e))), this._getAccessTokenPromise;
    }
    authorize() {
      this.getAccessToken();
    }
    callFunction(e) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };
      return this.request(this.setupRequest(t2));
    }
    getOSSUploadOptionsFromPath(e) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e2) {
          e2 && e2.statusCode < 400 ? o2(e2) : a2(new Q({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e2) {
          a2(new Q({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
          i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: r2 }) {
      if ("string" !== d(t2))
        throw new Q({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new Q({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new Q({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const i2 = r2 && r2.envType || this.config.envType, o2 = (await this.getOSSUploadOptionsFromPath({ env: i2, filename: t2 })).result, a2 = "https://" + o2.cdnDomain + "/" + o2.ossPath, { securityToken: c2, accessKeyId: u2, signature: l2, host: h2, ossPath: f2, id: p2, policy: g2, ossCallbackUrl: m2 } = o2, y2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: u2, Signature: l2, host: h2, id: p2, key: f2, policy: g2, success_action_status: 200 };
      if (c2 && (y2["x-oss-security-token"] = c2), m2) {
        const e2 = JSON.stringify({ callbackUrl: m2, callbackBody: JSON.stringify({ fileId: p2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        y2.callback = ce.toBase64(e2);
      }
      const _2 = { url: "https://" + o2.host, formData: y2, fileName: "file", name: "file", filePath: e, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, _2, { onUploadProgress: s2 })), m2)
        return { success: true, filePath: e, fileID: a2 };
      if ((await this.reportOSSUpload({ id: p2 })).success)
        return { success: true, filePath: e, fileID: a2 };
      throw new Q({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e) && 0 !== e.length || n2(new Q({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e.map((e2) => ({ fileID: e2, tempFileURL: e2 })) });
      });
    }
    async getFileInfo({ fileList: e } = {}) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new Q({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e.map((e2) => e2.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var de = { init(e) {
    const t2 = new he(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const fe = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var pe;
  !function(e) {
    e.local = "local", e.none = "none", e.session = "session";
  }(pe || (pe = {}));
  var ge = function() {
  };
  const me = () => {
    let e;
    if (!Promise) {
      e = () => {
      }, e.promise = {};
      const t3 = () => {
        throw new Q({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e.promise, "then", { get: t3 }), Object.defineProperty(e.promise, "catch", { get: t3 }), e;
    }
    const t2 = new Promise((t3, n2) => {
      e = (e2, s2) => e2 ? n2(e2) : t3(s2);
    });
    return e.promise = t2, e;
  };
  function ye(e) {
    return void 0 === e;
  }
  function _e(e) {
    return "[object Null]" === Object.prototype.toString.call(e);
  }
  var we;
  function ve(e) {
    const t2 = (n2 = e, "[object Array]" === Object.prototype.toString.call(n2) ? e : [e]);
    var n2;
    for (const e2 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e2;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e) {
    e.WEB = "web", e.WX_MP = "wx_mp";
  }(we || (we = {}));
  const Se = { adapter: null, runtime: void 0 }, ke = ["anonymousUuidKey"];
  class Ie extends ge {
    constructor() {
      super(), Se.adapter.root.tcbObject || (Se.adapter.root.tcbObject = {});
    }
    setItem(e, t2) {
      Se.adapter.root.tcbObject[e] = t2;
    }
    getItem(e) {
      return Se.adapter.root.tcbObject[e];
    }
    removeItem(e) {
      delete Se.adapter.root.tcbObject[e];
    }
    clear() {
      delete Se.adapter.root.tcbObject;
    }
  }
  function be(e, t2) {
    switch (e) {
      case "local":
        return t2.localStorage || new Ie();
      case "none":
        return new Ie();
      default:
        return t2.sessionStorage || new Ie();
    }
  }
  class Te {
    constructor(e) {
      if (!this._storage) {
        this._persistence = Se.adapter.primaryStorage || e.persistence, this._storage = be(this._persistence, Se.adapter);
        const t2 = `access_token_${e.env}`, n2 = `access_token_expire_${e.env}`, s2 = `refresh_token_${e.env}`, r2 = `anonymous_uuid_${e.env}`, i2 = `login_type_${e.env}`, o2 = `user_info_${e.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e) {
      if (e === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e;
      const n2 = be(e, Se.adapter);
      for (const e2 in this.keys) {
        const s2 = this.keys[e2];
        if (t2 && ke.includes(e2))
          continue;
        const r2 = this._storage.getItem(s2);
        ye(r2) || _e(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e, r2);
      } catch (e2) {
        throw e2;
      }
    }
    getStore(e, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e2) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e) {
      this._storage.removeItem(e);
    }
  }
  const Ae = {}, Ce = {};
  function Pe(e) {
    return Ae[e];
  }
  class Ee {
    constructor(e, t2) {
      this.data = t2 || null, this.name = e;
    }
  }
  class Oe extends Ee {
    constructor(e, t2) {
      super("error", { error: e, data: t2 }), this.error = e;
    }
  }
  const xe = new class {
    constructor() {
      this._listeners = {};
    }
    on(e, t2) {
      return function(e2, t3, n2) {
        n2[e2] = n2[e2] || [], n2[e2].push(t3);
      }(e, t2, this._listeners), this;
    }
    off(e, t2) {
      return function(e2, t3, n2) {
        if (n2 && n2[e2]) {
          const s2 = n2[e2].indexOf(t3);
          -1 !== s2 && n2[e2].splice(s2, 1);
        }
      }(e, t2, this._listeners), this;
    }
    fire(e, t2) {
      if (e instanceof Oe)
        return console.error(e.error), this;
      const n2 = "string" == typeof e ? new Ee(e, t2 || {}) : e;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e2 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e2)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e) {
      return this._listeners[e] && this._listeners[e].length > 0;
    }
  }();
  function Ue(e, t2) {
    xe.on(e, t2);
  }
  function Re(e, t2 = {}) {
    xe.fire(e, t2);
  }
  function Le(e, t2) {
    xe.off(e, t2);
  }
  const Ne = "loginStateChanged", De = "loginStateExpire", Fe = "loginTypeChanged", qe = "anonymousConverted", Ke = "refreshAccessToken";
  var je;
  !function(e) {
    e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
  }(je || (je = {}));
  const Me = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Be = { "X-SDK-Version": "1.3.5" };
  function $e(e, t2, n2) {
    const s2 = e[t2];
    e[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e2;
        if (e2 = o2, "[object FormData]" !== Object.prototype.toString.call(e2))
          t3.data = { ...o2, ...r2 };
        else
          for (const e3 in r2)
            o2.append(e3, r2[e3]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e, t3);
    };
  }
  function We() {
    const e = Math.random().toString(16).slice(2);
    return { data: { seqId: e }, headers: { ...Be, "x-seqid": e } };
  }
  class ze {
    constructor(e = {}) {
      var t2;
      this.config = e, this._reqClass = new Se.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Pe(this.config.env), this._localCache = (t2 = this.config.env, Ce[t2]), $e(this._reqClass, "post", [We]), $e(this._reqClass, "upload", [We]), $e(this._reqClass, "download", [We]);
    }
    async post(e) {
      return await this._reqClass.post(e);
    }
    async upload(e) {
      return await this._reqClass.upload(e);
    }
    async download(e) {
      return await this._reqClass.download(e);
    }
    async refreshAccessToken() {
      let e, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e = await this._refreshAccessTokenPromise;
      } catch (e2) {
        t2 = e2;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new Q({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e2 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e2 || "REFRESH_TOKEN_EXPIRED" === e2 || "INVALID_REFRESH_TOKEN" === e2) {
          if (this._cache.getStore(s2) === je.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e2) {
            const e3 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e3, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          Re(De), this._cache.removeStore(n2);
        }
        throw new Q({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return Re(Ke), this._cache.setStore(e, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new Q({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === Me.indexOf(e)) {
        const { refreshTokenKey: e2 } = this._cache.keys;
        this._cache.getStore(e2) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e) {
        o2 = new FormData();
        for (let e2 in o2)
          o2.hasOwnProperty(e2) && void 0 !== o2[e2] && o2.append(e2, i2[e2]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e2 in i2)
          void 0 !== i2[e2] && (o2[e2] = i2[e2]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: l2, search: h2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), l2 && (d2 = { ...l2, ...d2 });
      let f2 = function(e2, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e3 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e3}=${encodeURIComponent(n3[e3])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e2}${t3}`;
      }(fe, "//tcb-api.tencentcloudapi.com/web", d2);
      h2 && (f2 += h2);
      const p2 = await this.post({ url: f2, data: o2, ...a2 }), g2 = p2.header && p2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(p2.status) && 200 !== Number(p2.statusCode) || !p2.data)
        throw new Q({ code: "NETWORK_ERROR", message: "network request error" });
      return p2;
    }
    async send(e, t2 = {}) {
      const n2 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === Me.indexOf(e)) {
        await this.refreshAccessToken();
        const n3 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
        if (n3.data.code)
          throw new Q({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new Q({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
  }
  const Je = {};
  function He(e) {
    return Je[e];
  }
  class Ge {
    constructor(e) {
      this.config = e, this._cache = Pe(e.env), this._request = He(e.env);
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
    setAccessToken(e, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e);
    }
  }
  class Ve {
    constructor(e) {
      if (!e)
        throw new Q({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e, this._cache = Pe(this._envId), this._request = He(this._envId), this.setUserInfo();
    }
    linkWithTicket(e) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e });
    }
    linkWithRedirect(e) {
      e.signInWithRedirect();
    }
    updatePassword(e, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e });
    }
    updateEmail(e) {
      return this._request.send("auth.updateEmail", { newEmail: e });
    }
    updateUsername(e) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e });
    }
    async getLinkedUidList() {
      const { data: e } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e;
      return n2.forEach((e2) => {
        e2.wxOpenId && e2.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e) {
      return this._request.send("auth.setPrimaryUid", { uid: e });
    }
    unlink(e) {
      return this._request.send("auth.unlink", { platform: e });
    }
    async update(e) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setUserInfo() {
      const { userInfoKey: e } = this._cache.keys, t2 = this._cache.getStore(e);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e2) => {
        this[e2] = t2[e2];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e), this.setUserInfo();
    }
  }
  class Ye {
    constructor(e) {
      if (!e)
        throw new Q({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Pe(e);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ve(e);
    }
    get isAnonymousAuth() {
      return this.loginType === je.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === je.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === je.WECHAT || this.loginType === je.WECHAT_OPEN || this.loginType === je.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class Qe extends Ge {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.ANONYMOUS, persistence: "local" });
        const e2 = new Ye(this.config.env);
        return await e2.user.refresh(), e2;
      }
      throw new Q({ message: "匿名登录失败" });
    }
    async linkAndRetrieveDataWithTicket(e) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Re(qe, { env: this.config.env }), Re(Fe, { loginType: je.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new Q({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e), this._cache.setStore(n2, je.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class Xe extends Ge {
    async signIn(e) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new Ye(this.config.env);
      throw new Q({ message: "自定义登录失败" });
    }
  }
  class Ze extends Ge {
    async signIn(e, t2) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.EMAIL, persistence: this.config.persistence }), new Ye(this.config.env);
      throw s2.code ? new Q({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new Q({ message: "邮箱登录失败" });
    }
    async activate(e) {
      return this._request.send("auth.activateEndUserMail", { token: e });
    }
    async resetPasswordWithToken(e, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t2 });
    }
  }
  class et extends Ge {
    async signIn(e, t2) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: je.USERNAME, username: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.USERNAME, persistence: this.config.persistence }), new Ye(this.config.env);
      throw s2.code ? new Q({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new Q({ message: "用户名密码登录失败" });
    }
  }
  class tt {
    constructor(e) {
      this.config = e, this._cache = Pe(e.env), this._request = He(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Ue(Fe, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e = this.hasLoginState();
      return e && e.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new Qe(this.config);
    }
    customAuthProvider() {
      return new Xe(this.config);
    }
    emailAuthProvider() {
      return new Ze(this.config);
    }
    usernameAuthProvider() {
      return new et(this.config);
    }
    async signInAnonymously() {
      return new Qe(this.config).signIn();
    }
    async signInWithEmailAndPassword(e, t2) {
      return new Ze(this.config).signIn(e, t2);
    }
    signInWithUsernameAndPassword(e, t2) {
      return new et(this.config).signIn(e, t2);
    }
    async linkAndRetrieveDataWithTicket(e) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new Qe(this.config)), Ue(qe, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
    }
    async signOut() {
      if (this.loginType === je.ANONYMOUS)
        throw new Q({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e), this._cache.removeStore(t2), this._cache.removeStore(n2), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t2 });
    }
    async sendPasswordResetEmail(e) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e });
    }
    onLoginStateChanged(e) {
      Ue(Ne, () => {
        const t3 = this.hasLoginState();
        e.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e.call(this, t2);
    }
    onLoginStateExpired(e) {
      Ue(De, e.bind(this));
    }
    onAccessTokenRefreshed(e) {
      Ue(Ke, e.bind(this));
    }
    onAnonymousConverted(e) {
      Ue(qe, e.bind(this));
    }
    onLoginTypeChanged(e) {
      Ue(Fe, () => {
        const t2 = this.hasLoginState();
        e.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e } = this._cache.keys;
      return this._cache.getStore(e) ? new Ye(this.config.env) : null;
    }
    async isUsernameRegistered(e) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e) {
      return new Xe(this.config).signIn(e);
    }
    shouldRefreshAccessToken(e) {
      this._request._shouldRefreshAccessTokenHook = e.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e) => e.code ? e : { ...e.data, requestId: e.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e) {
      const { env: t2 } = e.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e) {
      const { loginType: t2, persistence: n2, env: s2 } = e.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const nt = function(e, t2) {
    t2 = t2 || me();
    const n2 = He(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e2, f2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: f2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e3) => {
        201 === e3.statusCode ? t2(null, { fileID: l2, requestId: d2 }) : t2(new Q({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e3.data}` }));
      }).catch((e3) => {
        t2(e3);
      });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, st = function(e, t2) {
    t2 = t2 || me();
    const n2 = He(this.config.env), { cloudPath: s2 } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      t2(null, e2);
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, rt = function({ fileList: e }, t2) {
    if (t2 = t2 || me(), !e || !Array.isArray(e))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e };
    return He(this.config.env).send("storage.batchDeleteFile", n2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.delete_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, it = function({ fileList: e }, t2) {
    t2 = t2 || me(), e && Array.isArray(e) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return He(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.download_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, ot = async function({ fileID: e }, t2) {
    const n2 = (await it.call(this, { fileList: [{ fileID: e, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e2) => {
        e2(n2);
      });
    const s2 = He(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, at = function({ name: e, data: t2, query: n2, parse: s2, search: r2 }, i2) {
    const o2 = i2 || me();
    let a2;
    try {
      a2 = t2 ? JSON.stringify(t2) : "";
    } catch (e2) {
      return Promise.reject(e2);
    }
    if (!e)
      return Promise.reject(new Q({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e, request_data: a2 };
    return He(this.config.env).send("functions.invokeFunction", c2).then((e2) => {
      if (e2.code)
        o2(null, e2);
      else {
        let t3 = e2.data.response_data;
        if (s2)
          o2(null, { result: t3, requestId: e2.requestId });
        else
          try {
            t3 = JSON.parse(e2.data.response_data), o2(null, { result: t3, requestId: e2.requestId });
          } catch (e3) {
            o2(new Q({ message: "response data must be json" }));
          }
      }
      return o2.promise;
    }).catch((e2) => {
      o2(e2);
    }), o2.promise;
  }, ct = { timeout: 15e3, persistence: "session" }, ut = {};
  class lt {
    constructor(e) {
      this.config = e || this.config, this.authObj = void 0;
    }
    init(e) {
      switch (Se.adapter || (this.requestClient = new Se.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: `请求在${(e.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...ct, ...e }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new lt(this.config);
    }
    auth({ persistence: e } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e || Se.adapter.primaryStorage || ct.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e2) {
        const { env: t3 } = e2;
        Ae[t3] = new Te(e2), Ce[t3] = new Te({ ...e2, persistence: "local" });
      }(this.config), n2 = this.config, Je[n2.env] = new ze(n2), this.authObj = new tt(this.config), this.authObj;
    }
    on(e, t2) {
      return Ue.apply(this, [e, t2]);
    }
    off(e, t2) {
      return Le.apply(this, [e, t2]);
    }
    callFunction(e, t2) {
      return at.apply(this, [e, t2]);
    }
    deleteFile(e, t2) {
      return rt.apply(this, [e, t2]);
    }
    getTempFileURL(e, t2) {
      return it.apply(this, [e, t2]);
    }
    downloadFile(e, t2) {
      return ot.apply(this, [e, t2]);
    }
    uploadFile(e, t2) {
      return nt.apply(this, [e, t2]);
    }
    getUploadMetadata(e, t2) {
      return st.apply(this, [e, t2]);
    }
    registerExtension(e) {
      ut[e.name] = e;
    }
    async invokeExtension(e, t2) {
      const n2 = ut[e];
      if (!n2)
        throw new Q({ message: `扩展${e} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e) {
      const { adapter: t2, runtime: n2 } = ve(e) || {};
      t2 && (Se.adapter = t2), n2 && (Se.runtime = n2);
    }
  }
  var ht = new lt();
  function dt(e, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e + t2;
  }
  class ft {
    post(e) {
      const { url: t2, data: n2, headers: s2 } = e;
      return new Promise((e2, r2) => {
        X.request({ url: dt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
          e2(t3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    }
    upload(e) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e, c2 = X.uploadFile({ url: dt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e2) {
          const n3 = { statusCode: e2.statusCode, data: e2.data || {} };
          200 === e2.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e2) {
          n2(new Error(e2.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const pt = { setItem(e, t2) {
    X.setStorageSync(e, t2);
  }, getItem: (e) => X.getStorageSync(e), removeItem(e) {
    X.removeStorageSync(e);
  }, clear() {
    X.clearStorageSync();
  } };
  var gt = { genAdapter: function() {
    return { root: {}, reqClass: ft, localStorage: pt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  ht.useAdapters(gt);
  const mt = ht, yt = mt.init;
  mt.init = function(e) {
    e.env = e.spaceId;
    const t2 = yt.call(this, e);
    t2.config.provider = "tencent", t2.config.spaceId = e.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e2) {
      const t3 = n2.call(this, e2);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e3) => {
        t3[e3] = Y(t3[e3]).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var _t = mt;
  var wt = class extends he {
    getAccessToken() {
      return new Promise((e, t2) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e(n2);
      });
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = ce.sign(n2, this.config.clientSecret);
      const r2 = ae();
      s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
      const { token: i2 } = ee();
      return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, success(e2) {
          e2 && e2.statusCode < 400 ? o2(e2) : a2(new Q({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e2) {
          a2(new Q({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
          i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new Q({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        r2 = t3.result.fileUrl;
        const c2 = { url: i2, formData: o2, name: a2, filePath: e, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e, fileID: r2 }) : s3(new Q({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2)).then((e2) => {
        if (e2.success)
          return e2.result;
        throw new Q({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e } = {}) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new Q({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2)).then((e2) => {
        if (e2.success)
          return { fileList: e2.result.fileList.map((e3) => ({ fileID: e3.fileID, tempFileURL: e3.tempFileURL })) };
        throw new Q({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var vt = { init(e) {
    const t2 = new wt(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  function St({ data: e }) {
    let t2;
    t2 = ae();
    const n2 = JSON.parse(JSON.stringify(e || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e2 } = ee();
      e2 && (n2.uniIdToken = e2);
    }
    return n2;
  }
  function kt({ name: e, data: t2 } = {}) {
    const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e}`;
    return new Promise((t3, n3) => {
      X.request({ method: "POST", url: o2, data: { name: e, platform: S, provider: r2, spaceId: i2 }, timeout: 3e3, success(e2) {
        t3(e2);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e2 } = {}) => {
      const { code: t3, message: n3 } = e2 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (0 !== n3) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR": {
            const e2 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
            throw console.error(e2), new Error(e2);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e2 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
            throw console.error(e2), new Error(e2);
          }
        }
        return this._callCloudFunction({ name: e, data: t2 });
      }
      return new Promise((e2, n4) => {
        const s4 = St.call(this, { data: t2 });
        X.request({ method: "POST", url: a2, data: { provider: r2, platform: S, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new Q({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e2({ result: s5 }), fail(e3) {
          n4(new Q({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const It = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var bt = /[\\^$.*+?()[\]{}|]/g, Tt = RegExp(bt.source);
  function At(e, t2, n2) {
    return e.replace(new RegExp((s2 = t2) && Tt.test(s2) ? s2.replace(bt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Pt = "request", Et = "response", Ot = "both";
  const fn = { code: 2e4, message: "System error" }, pn = { code: 20101, message: "Invalid client" };
  function yn(e) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e || {};
    return new Q({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || fn.code, message: r2 || o2, cause: a2 });
  }
  let wn;
  function bn({ secretType: e } = {}) {
    return e === Pt || e === Et || e === Ot;
  }
  function Tn({ name: e, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function An({ provider: e, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ie();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e2, spaceId: t3 } = {}) {
      const n3 = v;
      if (!n3)
        return {};
      e2 = function(e3) {
        return "tencent" === e3 ? "tcb" : e3;
      }(e2);
      const s3 = n3.find((n4) => n4.provider === e2 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const l2 = function(e2, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e2.length; i3++) {
        const o3 = e2[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e3) => e3.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!l2)
      return false;
    if ((c2[l2] || []).find((e2 = {}) => e2.appId === s2 && (e2.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), yn(pn);
  }
  function Cn({ functionName: e, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Pn(e) {
    const t2 = e.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = St.call(e, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider], i2 = bn(n3), o2 = Tn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e2) => (e2.errCode = 0, !a2 && Cn.call(this, { functionName: s2, result: e2, logPvd: r2 }), Promise.resolve(e2)), (e2) => (!a2 && Cn.call(this, { functionName: s2, result: e2, logPvd: r2 }), e2 && e2.message && (e2.message = function({ message: e3 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e3.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e4 = 1; e4 < a3.length; e4++)
            c2 = At(c2, `{$${e4}}`, a3[e4]);
          for (const e4 in t3)
            c2 = At(c2, `{${e4}}`, t3[e4]);
          return "replace" === o3 ? c2 : e3 + c2;
        }
        return e3;
      }({ message: `[${n3.name}]: ${e2.message}`, formatter: It, extraInfo: { functionName: s2 } })), Promise.reject(e2)));
    };
    e.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && I ? (e._callCloudFunction || (e._callCloudFunction = n2, e._callLocalFunction = kt), o2 = kt) : o2 = n2, o2 = o2.bind(e), Tn(t3))
        a2 = n2.call(e, t3);
      else if (bn(t3)) {
        a2 = new wn({ secretType: t3.secretType, uniCloudIns: e }).wrapEncryptDataCallFunction(n2.bind(e))(t3);
      } else if (An({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new wn({ secretType: t3.secretType, uniCloudIns: e }).wrapVerifyClientCallFunction(n2.bind(e))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2;
    };
  }
  wn = class {
    constructor() {
      throw yn({ message: `Platform ${S} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const En = Symbol("CLIENT_DB_INTERNAL");
  function On(e, t2) {
    return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = En, e.inspect = null, e.__v_raw = void 0, new Proxy(e, { get(e2, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e2[n2];
      if (n2 in e2 || "string" != typeof n2) {
        const t3 = e2[n2];
        return "function" == typeof t3 ? t3.bind(e2) : t3;
      }
      return t2.get(e2, n2, s2);
    } });
  }
  function xn(e) {
    return { on: (t2, n2) => {
      e[t2] = e[t2] || [], e[t2].indexOf(n2) > -1 || e[t2].push(n2);
    }, off: (t2, n2) => {
      e[t2] = e[t2] || [];
      const s2 = e[t2].indexOf(n2);
      -1 !== s2 && e[t2].splice(s2, 1);
    } };
  }
  const Un = ["db.Geo", "db.command", "command.aggregate"];
  function Rn(e, t2) {
    return Un.indexOf(`${e}.${t2}`) > -1;
  }
  function Ln(e) {
    switch (d(e = Z(e))) {
      case "array":
        return e.map((e2) => Ln(e2));
      case "object":
        return e._internalType === En || Object.keys(e).forEach((t2) => {
          e[t2] = Ln(e[t2]);
        }), e;
      case "regexp":
        return { $regexp: { source: e.source, flags: e.flags } };
      case "date":
        return { $date: e.toISOString() };
      default:
        return e;
    }
  }
  function Nn(e) {
    return e && e.content && e.content.$method;
  }
  class Dn {
    constructor(e, t2, n2) {
      this.content = e, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e = this;
      const t2 = [e.content];
      for (; e.prevStage; )
        e = e.prevStage, t2.push(e.content);
      return { $db: t2.reverse().map((e2) => ({ $method: e2.$method, $param: Ln(e2.$param) })) };
    }
    getAction() {
      const e = this.toJSON().$db.find((e2) => "action" === e2.$method);
      return e && e.$param && e.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e) => "action" !== e.$method) };
    }
    get isAggregate() {
      let e = this;
      for (; e; ) {
        const t2 = Nn(e), n2 = Nn(e.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e = this;
      for (; e; ) {
        if ("command" === Nn(e))
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e = this;
      for (; e; ) {
        const t2 = Nn(e), n2 = Nn(e.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e = e.prevStage;
      }
      return false;
    }
    getNextStageFn(e) {
      const t2 = this;
      return function() {
        return Fn({ $method: e, $param: Ln(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e, $param: Ln(t2) }), y) {
        const e2 = s2.$db.find((e3) => "collection" === e3.$method), t3 = e2 && e2.$param;
        t3 && 1 === t3.length && "string" == typeof e2.$param[0] && e2.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function Fn(e, t2, n2) {
    return On(new Dn(e, t2, n2), { get(e2, t3) {
      let s2 = "db";
      return e2 && e2.content && (s2 = e2.content.$method), Rn(s2, t3) ? Fn({ $method: t3 }, e2, n2) : function() {
        return Fn({ $method: t3, $param: Ln(Array.from(arguments)) }, e2, n2);
      };
    } });
  }
  function qn({ path: e, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e.map((e2) => ({ $method: e2 })), { $method: t2, $param: this.param }] };
      }
    };
  }
  function Kn(e, t2 = {}) {
    return On(new e(t2), { get: (e2, t3) => Rn("db", t3) ? Fn({ $method: t3 }, null, e2) : function() {
      return Fn({ $method: t3, $param: Ln(Array.from(arguments)) }, null, e2);
    } });
  }
  class jn extends class {
    constructor({ uniClient: e = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = C("_globalUniCloudDatabaseCallback")), t2 || (this.auth = xn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, xn(this._dbCallBacks)), this.env = On({}, { get: (e2, t3) => ({ $env: t3 }) }), this.Geo = On({}, { get: (e2, t3) => qn({ path: ["Geo"], method: t3 }) }), this.serverDate = qn({ path: [], method: "serverDate" }), this.RegExp = qn({ path: [], method: "RegExp" });
    }
    getCloudEnv(e) {
      if ("string" != typeof e || !e.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e.replace("$cloudEnv_", "") };
    }
    _callback(e, t2) {
      const n2 = this._dbCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    _callbackAuth(e, t2) {
      const n2 = this._authCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    multiSend() {
      const e = Array.from(arguments), t2 = e.map((e2) => {
        const t3 = e2.getAction(), n2 = e2.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e });
    }
  } {
    _parseResult(e) {
      return this._isJQL ? e.result : e;
    }
    _callCloudFunction({ action: e, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e2, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e2.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e2) {
        return i2._callback("error", [e2]), U(R(o2, "fail"), e2).then(() => U(R(o2, "complete"), e2)).then(() => (r2(null, e2), z(D, { type: K, content: e2 }), Promise.reject(e2)));
      }
      const c2 = U(R(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e, command: t2, multiCommand: n2 } })).then((e2) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e2.result;
        if (u3)
          for (let e3 = 0; e3 < u3.length; e3++) {
            const { level: t4, message: n4, detail: s4 } = u3[e3], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new Q({ code: t3, message: n3, requestId: e2.requestId }));
        }
        e2.result.errCode = e2.result.errCode || e2.result.code, e2.result.errMsg = e2.result.errMsg || e2.result.message, s3 && c3 && (te({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), z(q, { token: s3, tokenExpired: c3 }));
        const l2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < l2.length; t4++) {
          const { prop: n4, tips: s4 } = l2[t4];
          if (n4 in e2.result) {
            const t5 = e2.result[n4];
            Object.defineProperty(e2.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e3) {
          return U(R(o2, "success"), e3).then(() => U(R(o2, "complete"), e3)).then(() => {
            r2(e3, null);
            const t4 = i2._parseResult(e3);
            return z(D, { type: K, content: t4 }), Promise.resolve(t4);
          });
        }(e2);
      }, (e2) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e2.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new Q({ code: e2.code || "SYSTEM_ERROR", message: e2.message, requestId: e2.requestId }));
      });
    }
  }
  const Mn = "token无效，跳转登录页面", Bn = "token过期，跳转登录页面", $n = { TOKEN_INVALID_TOKEN_EXPIRED: Bn, TOKEN_INVALID_INVALID_CLIENTID: Mn, TOKEN_INVALID: Mn, TOKEN_INVALID_WRONG_TOKEN: Mn, TOKEN_INVALID_ANONYMOUS_USER: Mn }, Wn = { "uni-id-token-expired": Bn, "uni-id-check-token-failed": Mn, "uni-id-token-not-exist": Mn, "uni-id-check-device-feature-failed": Mn };
  function zn(e, t2) {
    let n2 = "";
    return n2 = e ? `${e}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function Jn(e = [], t2 = "") {
    const n2 = [], s2 = [];
    return e.forEach((e2) => {
      true === e2.needLogin ? n2.push(zn(t2, e2.path)) : false === e2.needLogin && s2.push(zn(t2, e2.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function Hn(e) {
    return e.split("?")[0].replace(/^\//, "");
  }
  function Gn() {
    return function(e) {
      let t2 = e && e.$page && e.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e = getCurrentPages();
      return e[e.length - 1];
    }());
  }
  function Vn() {
    return Hn(Gn());
  }
  function Yn(e = "", t2 = {}) {
    if (!e)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = Hn(e);
    return n2.some((e2) => e2.pagePath === s2);
  }
  const Qn = !!t$3.uniIdRouter;
  const { loginPage: Xn, routerNeedLogin: Zn, resToLogin: es, needLoginPage: ts, notNeedLoginPage: ns, loginPageInTabBar: ss } = function({ pages: e = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = t$3) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = Jn(e), { needLoginPage: l2, notNeedLoginPage: h2 } = function(e2 = []) {
      const t2 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = Jn(r3, s3);
        t2.push(...i3), n3.push(...o3);
      }), { needLoginPage: t2, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...l2], notNeedLoginPage: [...u2, ...h2], loginPageInTabBar: Yn(i2, r2) };
  }();
  if (ts.indexOf(Xn) > -1)
    throw new Error(`Login page [${Xn}] should not be "needLogin", please check your pages.json`);
  function rs(e) {
    const t2 = Vn();
    if ("/" === e.charAt(0))
      return e;
    const [n2, s2] = e.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e2 = 0; e2 < r2.length; e2++) {
      const t3 = r2[e2];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function is(e) {
    const t2 = Hn(rs(e));
    return !(ns.indexOf(t2) > -1) && (ts.indexOf(t2) > -1 || Zn.some((t3) => function(e2, t4) {
      return new RegExp(t4).test(e2);
    }(e, t3)));
  }
  function os({ redirect: e }) {
    const t2 = Hn(e), n2 = Hn(Xn);
    return Vn() !== n2 && t2 !== n2;
  }
  function as({ api: e, redirect: t2 } = {}) {
    if (!t2 || !os({ redirect: t2 }))
      return;
    const n2 = function(e2, t3) {
      return "/" !== e2.charAt(0) && (e2 = "/" + e2), t3 ? e2.indexOf("?") > -1 ? e2 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2;
    }(Xn, t2);
    ss ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e]({ url: n2 });
    });
  }
  function cs({ url: e } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e2, tokenExpired: t3 } = ee();
      let n3;
      if (e2) {
        if (t3 < Date.now()) {
          const e3 = "uni-id-token-expired";
          n3 = { errCode: e3, errMsg: Wn[e3] };
        }
      } else {
        const e3 = "uni-id-check-token-failed";
        n3 = { errCode: e3, errMsg: Wn[e3] };
      }
      return n3;
    }();
    if (is(e) && n2) {
      n2.uniIdRedirectUrl = e;
      if (B(F).length > 0)
        return setTimeout(() => {
          z(F, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function us() {
    !function() {
      const e2 = Gn(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = cs({ url: e2 });
      t2 || n2 && as({ api: "redirectTo", redirect: e2 });
    }();
    const e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e.length; t2++) {
      const n2 = e[t2];
      uni.addInterceptor(n2, { invoke(e2) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = cs({ url: e2.url });
        return t3 ? e2 : s2 ? (as({ api: n2, redirect: rs(e2.url) }), false) : e2;
      } });
    }
  }
  function ls() {
    this.onResponse((e) => {
      const { type: t2, content: n2 } = e;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e2) {
            if ("object" != typeof e2)
              return false;
            const { errCode: t3 } = e2 || {};
            return t3 in Wn;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e2) {
            if ("object" != typeof e2)
              return false;
            const { errCode: t3 } = e2 || {};
            return t3 in $n;
          }(n2);
      }
      s2 && function(e2 = {}) {
        const t3 = B(F);
        G().then(() => {
          const n3 = Gn();
          if (n3 && os({ redirect: n3 }))
            return t3.length > 0 ? z(F, Object.assign({ uniIdRedirectUrl: n3 }, e2)) : void (Xn && as({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function hs(e) {
    !function(e2) {
      e2.onResponse = function(e3) {
        $(D, e3);
      }, e2.offResponse = function(e3) {
        W(D, e3);
      };
    }(e), function(e2) {
      e2.onNeedLogin = function(e3) {
        $(F, e3);
      }, e2.offNeedLogin = function(e3) {
        W(F, e3);
      }, Qn && (C("_globalUniCloudStatus").needLoginInit || (C("_globalUniCloudStatus").needLoginInit = true, G().then(() => {
        us.call(e2);
      }), es && ls.call(e2)));
    }(e), function(e2) {
      e2.onRefreshToken = function(e3) {
        $(q, e3);
      }, e2.offRefreshToken = function(e3) {
        W(q, e3);
      };
    }(e);
  }
  let ds;
  const fs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", ps = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function gs() {
    const e = ee().token || "", t2 = e.split(".");
    if (!e || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ds(s2).split("").map(function(e2) {
        return "%" + ("00" + e2.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e2) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e2.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  ds = "function" != typeof atob ? function(e) {
    if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !ps.test(e))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e += "==".slice(2 - (3 & e.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e.length; )
      t2 = fs.indexOf(e.charAt(i2++)) << 18 | fs.indexOf(e.charAt(i2++)) << 12 | (n2 = fs.indexOf(e.charAt(i2++))) << 6 | (s2 = fs.indexOf(e.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var ms = s(function(e, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e2, t3) {
      return e2.tempFiles.forEach((e3, n3) => {
        e3.name || (e3.name = e3.path.substring(e3.path.lastIndexOf("/") + 1)), t3 && (e3.fileType = t3), e3.cloudPath = Date.now() + "_" + n3 + e3.name.substring(e3.name.lastIndexOf("."));
      }), e2.tempFilePaths || (e2.tempFilePaths = e2.tempFiles.map((e3) => e3.path)), e2;
    }
    function i2(e2, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e3) => {
        if (s3) {
          const t4 = s3(e3);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e3 : t5);
        }
        return e3;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e3, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e4) => !e4.url && !e4.errMsg) && n3(t5));
            const u2 = i3[s5];
            e3.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e4) {
              e4.index = s5, e4.tempFile = u2, e4.tempFilePath = u2.path, r4 && r4(e4);
            } }).then((e4) => {
              u2.url = e4.fileID, s5 < o2 && c2();
            }).catch((e4) => {
              u2.errMsg = e4.errMsg || e4.message, s5 < o2 && c2();
            });
          }
        });
      }(e2, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e2) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e2, function(e3) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e3;
          return new Promise((e4, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e4(r2(t5, "image"));
            }, fail(e5) {
              a2({ errMsg: e5.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e2, function(e3) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e3;
          return new Promise((e4, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e4(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e5) {
              c2({ errMsg: e5.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e2, function(e3) {
          const { count: t4, extension: n3 } = e3;
          return new Promise((e4, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e4(r2(t5));
            }, fail(e5) {
              i3({ errMsg: e5.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), ys = n(ms);
  const _s = "manual";
  function ws(e) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e2 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e2.push(this[t2]);
        }), e2;
      }, (e2, t2) => {
        if (this.loadtime === _s)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e2.length; r2++)
          e2[r2] !== t2[r2] && (s2.push(e2[r2]), n2 = true);
        e2[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e2, t2) {
    }, mixinDatacomEasyGet({ getone: e2 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e2 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e3) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e3, n2 && n2(e3);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2 = e.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const l2 = t2.orderby || this.orderby;
      l2 && (n2 = n2.orderBy(l2));
      const h2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, f2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, p2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: f2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return p2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function vs(e) {
    return function(t2, n2 = {}) {
      n2 = function(e2, t3 = {}) {
        return e2.customUI = t3.customUI || e2.customUI, e2.parseSystemError = t3.parseSystemError || e2.parseSystemError, Object.assign(e2.loadingOptions, t3.loadingOptions), Object.assign(e2.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e2.secretMethods = t3.secretMethods), e2;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get: (s3, c2) => function({ fn: e2, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await U(R(t3, "invoke"), { ...r3 }), i3 = await e2(...s4), await U(R(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e3) {
            throw o3 = e3, await U(R(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await U(R(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...u2) {
        let h2;
        a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: l, data: { method: c2, params: u2 } };
        "object" == typeof n2.secretMethods && function(e2, t3) {
          const n3 = t3.data.method, s5 = e2.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let f2 = false;
        try {
          h2 = await e.callFunction(d2);
        } catch (e2) {
          f2 = true, h2 = { result: new Q(e2) };
        }
        const { errSubject: p2, errCode: g2, errMsg: m2, newToken: y2 } = h2.result || {};
        if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (te(y2), z(q, { ...y2 })), g2) {
          let e2 = m2;
          if (f2 && o2) {
            e2 = (await o2({ objectName: t2, methodName: c2, params: u2, errSubject: p2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              uni.showToast({ title: e2, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    uni.showModal({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e4) {
                      i3(e4);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e2, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...u2);
              }
            }
          const n3 = new Q({ subject: p2, code: g2, message: m2, requestId: h2.requestId });
          throw n3.detail = h2.result, z(D, { type: M, content: n3 }), n3;
        }
        return z(D, { type: M, content: h2.result }), h2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e2 } = {}) {
        return { objectName: t2, methodName: c2, params: e2 };
      } }) });
    };
  }
  function Ss(e) {
    return C("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e.config.spaceId));
  }
  async function ks({ callLoginByWeixin: e = false } = {}) {
    Ss(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${S}\``);
  }
  async function Is(e) {
    const t2 = Ss(this);
    return t2.initPromise || (t2.initPromise = ks.call(this, e)), t2.initPromise;
  }
  function bs(e) {
    return function({ callLoginByWeixin: t2 = false } = {}) {
      return Is.call(e, { callLoginByWeixin: t2 });
    };
  }
  async function Ts(e, t2) {
    const n2 = `http://${e}:${t2}/system/ping`;
    try {
      const e2 = await (s2 = { url: n2, timeout: 500 }, new Promise((e3, t3) => {
        X.request({ ...s2, success(t4) {
          e3(t4);
        }, fail(e4) {
          t3(e4);
        } });
      }));
      return !(!e2.data || 0 !== e2.data.code);
    } catch (e2) {
      return false;
    }
    var s2;
  }
  function As(e) {
    if (e.initUniCloudStatus && "rejected" !== e.initUniCloudStatus)
      return;
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e2) => {
      setTimeout(() => {
        e2();
      }, n2);
    }), e.isReady = false, e.isDefault = false;
    const s2 = e.auth();
    e.initUniCloudStatus = "pending", e.initUniCloud = t2.then(() => s2.getLoginState()).then((e2) => e2 ? Promise.resolve() : s2.signInAnonymously()).then(() => {
      {
        const { osName: e2, osVersion: t3 } = ie();
        "ios" === e2 && function(e3) {
          if (!e3 || "string" != typeof e3)
            return 0;
          const t4 = e3.match(/^(\d+)./);
          return t4 && t4[1] ? parseInt(t4[1]) : 0;
        }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");
      }
      if (e.__dev__.debugInfo) {
        const { address: t3, servePort: n3 } = e.__dev__.debugInfo;
        return async function(e2, t4) {
          let n4;
          for (let s3 = 0; s3 < e2.length; s3++) {
            const r2 = e2[s3];
            if (await Ts(r2, t4)) {
              n4 = r2;
              break;
            }
          }
          return { address: n4, port: t4 };
        }(t3, n3);
      }
    }).then(({ address: t3, port: n3 } = {}) => {
      const s3 = console["error"];
      if (t3)
        e.__dev__.localAddress = t3, e.__dev__.localPort = n3;
      else if (e.__dev__.debugInfo) {
        let t4 = "";
        "remote" === e.__dev__.debugInfo.initialLaunchType ? (e.__dev__.debugInfo.forceRemote = true, t4 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : t4 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", t4 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === S.indexOf("mp-") && (t4 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), s3(t4);
      }
    }).then(() => {
      e.isReady = true, e.initUniCloudStatus = "fulfilled";
    }).catch((t3) => {
      console.error(t3), e.initUniCloudStatus = "rejected";
    });
  }
  const Cs = { tcb: _t, tencent: _t, aliyun: de, private: vt };
  let Ps = new class {
    init(e) {
      let t2 = {};
      const n2 = Cs[e.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e), t2.__dev__ = {}, t2.__dev__.debugLog = "app" === S;
      const s2 = k;
      s2 && !s2.code && (t2.__dev__.debugInfo = s2), As(t2), t2.reInit = function() {
        As(this);
      }, Pn(t2), function(e2) {
        const t3 = e2.uploadFile;
        e2.uploadFile = function(e3) {
          return t3.call(this, e3);
        };
      }(t2), function(e2) {
        e2.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e2.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = Kn(jn, { uniClient: e2 });
          return this._database = n3, n3;
        }, e2.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e2.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = Kn(jn, { uniClient: e2, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e2) {
        e2.getCurrentUserInfo = gs, e2.chooseAndUploadFile = ys.initChooseAndUploadFile(e2), Object.assign(e2, { get mixinDatacom() {
          return ws(e2);
        } }), e2.importObject = vs(e2), e2.initSecureNetworkByWeixin = bs(e2);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e2) => {
        if (!t2[e2])
          return;
        const n3 = t2[e2];
        t2[e2] = function() {
          return t2.reInit(), n3.apply(t2, Array.from(arguments));
        }, t2[e2] = Y(t2[e2], e2).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e = I;
    let t2 = {};
    if (e && 1 === e.length)
      t2 = e[0], Ps = Ps.init(t2), Ps.isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e2) => {
        Ps[e2] = function() {
          return console.error(n2), Promise.reject(new Q({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Ps, { get mixinDatacom() {
      return ws(Ps);
    } }), hs(Ps), Ps.addInterceptor = O, Ps.removeInterceptor = x, Ps.interceptObject = L;
  })();
  var Es = Ps;
  const ERR_MSG_OK = "chooseAndUploadFile:ok";
  const ERR_MSG_FAIL = "chooseAndUploadFile:fail";
  function chooseImage(opts) {
    const {
      count,
      sizeType = ["original", "compressed"],
      sourceType = ["album", "camera"],
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      uni.chooseImage({
        count,
        sizeType,
        sourceType,
        extension,
        success(res) {
          resolve(normalizeChooseAndUploadFileRes(res, "image"));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseImage:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function chooseVideo(opts) {
    const {
      camera,
      compressed,
      maxDuration,
      sourceType = ["album", "camera"],
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      uni.chooseVideo({
        camera,
        compressed,
        maxDuration,
        sourceType,
        extension,
        success(res) {
          const {
            tempFilePath,
            duration,
            size,
            height,
            width
          } = res;
          resolve(normalizeChooseAndUploadFileRes({
            errMsg: "chooseVideo:ok",
            tempFilePaths: [tempFilePath],
            tempFiles: [
              {
                name: res.tempFile && res.tempFile.name || "",
                path: tempFilePath,
                size,
                type: res.tempFile && res.tempFile.type || "",
                width,
                height,
                duration,
                fileType: "video",
                cloudPath: ""
              }
            ]
          }, "video"));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseVideo:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function chooseAll(opts) {
    const {
      count,
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      let chooseFile = uni.chooseFile;
      if (typeof wx !== "undefined" && typeof wx.chooseMessageFile === "function") {
        chooseFile = wx.chooseMessageFile;
      }
      if (typeof chooseFile !== "function") {
        return reject({
          errMsg: ERR_MSG_FAIL + " 请指定 type 类型，该平台仅支持选择 image 或 video。"
        });
      }
      chooseFile({
        type: "all",
        count,
        extension,
        success(res) {
          resolve(normalizeChooseAndUploadFileRes(res));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseFile:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function normalizeChooseAndUploadFileRes(res, fileType) {
    res.tempFiles.forEach((item, index) => {
      if (!item.name) {
        item.name = item.path.substring(item.path.lastIndexOf("/") + 1);
      }
      if (fileType) {
        item.fileType = fileType;
      }
      item.cloudPath = Date.now() + "_" + index + item.name.substring(item.name.lastIndexOf("."));
    });
    if (!res.tempFilePaths) {
      res.tempFilePaths = res.tempFiles.map((file) => file.path);
    }
    return res;
  }
  function uploadCloudFiles(files, max = 5, onUploadProgress) {
    files = JSON.parse(JSON.stringify(files));
    const len = files.length;
    let count = 0;
    let self = this;
    return new Promise((resolve) => {
      while (count < max) {
        next();
      }
      function next() {
        let cur = count++;
        if (cur >= len) {
          !files.find((item) => !item.url && !item.errMsg) && resolve(files);
          return;
        }
        const fileItem = files[cur];
        const index = self.files.findIndex((v2) => v2.uuid === fileItem.uuid);
        fileItem.url = "";
        delete fileItem.errMsg;
        Es.uploadFile({
          filePath: fileItem.path,
          cloudPath: fileItem.cloudPath,
          fileType: fileItem.fileType,
          onUploadProgress: (res) => {
            res.index = index;
            onUploadProgress && onUploadProgress(res);
          }
        }).then((res) => {
          fileItem.url = res.fileID;
          fileItem.index = index;
          if (cur < len) {
            next();
          }
        }).catch((res) => {
          fileItem.errMsg = res.errMsg || res.message;
          fileItem.index = index;
          if (cur < len) {
            next();
          }
        });
      }
    });
  }
  function uploadFiles(choosePromise, {
    onChooseFile,
    onUploadProgress
  }) {
    return choosePromise.then((res) => {
      if (onChooseFile) {
        const customChooseRes = onChooseFile(res);
        if (typeof customChooseRes !== "undefined") {
          return Promise.resolve(customChooseRes).then((chooseRes) => typeof chooseRes === "undefined" ? res : chooseRes);
        }
      }
      return res;
    }).then((res) => {
      if (res === false) {
        return {
          errMsg: ERR_MSG_OK,
          tempFilePaths: [],
          tempFiles: []
        };
      }
      return res;
    });
  }
  function chooseAndUploadFile(opts = {
    type: "all"
  }) {
    if (opts.type === "image") {
      return uploadFiles(chooseImage(opts), opts);
    } else if (opts.type === "video") {
      return uploadFiles(chooseVideo(opts), opts);
    }
    return uploadFiles(chooseAll(opts), opts);
  }
  const get_file_ext = (name) => {
    const last_len = name.lastIndexOf(".");
    const len = name.length;
    return {
      name: name.substring(0, last_len),
      ext: name.substring(last_len + 1, len)
    };
  };
  const get_extname = (fileExtname) => {
    if (!Array.isArray(fileExtname)) {
      let extname = fileExtname.replace(/(\[|\])/g, "");
      return extname.split(",");
    } else {
      return fileExtname;
    }
  };
  const get_files_and_is_max = (res, _extname) => {
    let filePaths = [];
    let files = [];
    if (!_extname || _extname.length === 0) {
      return {
        filePaths,
        files
      };
    }
    res.tempFiles.forEach((v2) => {
      let fileFullName = get_file_ext(v2.name);
      const extname = fileFullName.ext.toLowerCase();
      if (_extname.indexOf(extname) !== -1) {
        files.push(v2);
        filePaths.push(v2.path);
      }
    });
    if (files.length !== res.tempFiles.length) {
      uni.showToast({
        title: `当前选择了${res.tempFiles.length}个文件 ，${res.tempFiles.length - files.length} 个文件格式不正确`,
        icon: "none",
        duration: 5e3
      });
    }
    return {
      filePaths,
      files
    };
  };
  const get_file_info = (filepath) => {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: filepath,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        }
      });
    });
  };
  const get_file_data = async (files, type = "image") => {
    let fileFullName = get_file_ext(files.name);
    const extname = fileFullName.ext.toLowerCase();
    let filedata = {
      name: files.name,
      uuid: files.uuid,
      extname: extname || "",
      cloudPath: files.cloudPath,
      fileType: files.fileType,
      url: files.path || files.path,
      size: files.size,
      //单位是字节
      image: {},
      path: files.path,
      video: {}
    };
    if (type === "image") {
      const imageinfo = await get_file_info(files.path);
      delete filedata.video;
      filedata.image.width = imageinfo.width;
      filedata.image.height = imageinfo.height;
      filedata.image.location = imageinfo.path;
    } else {
      delete filedata.image;
    }
    return filedata;
  };
  const _sfc_main$x = {
    name: "uploadImage",
    emits: ["uploadFiles", "choose", "delFile"],
    props: {
      filesList: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disablePreview: {
        type: Boolean,
        default: false
      },
      limit: {
        type: [Number, String],
        default: 9
      },
      imageStyles: {
        type: Object,
        default() {
          return {
            width: "auto",
            height: "auto",
            border: {}
          };
        }
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      styles() {
        let styles = {
          width: "auto",
          height: "auto",
          border: {}
        };
        return Object.assign(styles, this.imageStyles);
      },
      boxStyle() {
        const {
          width = "auto",
          height = "auto"
        } = this.styles;
        let obj = {};
        if (height === "auto") {
          if (width !== "auto") {
            obj.height = this.value2px(width);
            obj["padding-top"] = 0;
          } else {
            obj.height = 0;
          }
        } else {
          obj.height = this.value2px(height);
          obj["padding-top"] = 0;
        }
        if (width === "auto") {
          if (height !== "auto") {
            obj.width = this.value2px(height);
          } else {
            obj.width = "33.3%";
          }
        } else {
          obj.width = this.value2px(width);
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      },
      borderStyle() {
        let {
          border
        } = this.styles;
        let obj = {};
        const widthDefaultValue = 1;
        const radiusDefaultValue = 3;
        if (typeof border === "boolean") {
          obj.border = border ? "1px #eee solid" : "none";
        } else {
          let width = border && border.width || widthDefaultValue;
          width = this.value2px(width);
          let radius = border && border.radius || radiusDefaultValue;
          radius = this.value2px(radius);
          obj = {
            "border-width": width,
            "border-style": border && border.style || "solid",
            "border-color": border && border.color || "#eee",
            "border-radius": radius
          };
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      }
    },
    methods: {
      uploadFiles(item, index) {
        this.$emit("uploadFiles", item);
      },
      choose() {
        this.$emit("choose");
      },
      delFile(index) {
        this.$emit("delFile", index);
      },
      prviewImage(img, index) {
        let urls = [];
        if (Number(this.limit) === 1 && this.disablePreview && !this.disabled) {
          this.$emit("choose");
        }
        if (this.disablePreview)
          return;
        this.filesList.forEach((i2) => {
          urls.push(i2.url);
        });
        uni.previewImage({
          urls,
          current: index
        });
      },
      value2px(value) {
        if (typeof value === "number") {
          value += "px";
        } else {
          if (value.indexOf("%") === -1) {
            value = value.indexOf("px") !== -1 ? value : value + "px";
          }
        }
        return value;
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker__container" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.filesList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock(
            "view",
            {
              class: "file-picker__box",
              key: index,
              style: vue.normalizeStyle($options.boxStyle)
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: "file-picker__box-content",
                  style: vue.normalizeStyle($options.borderStyle)
                },
                [
                  vue.createElementVNode("image", {
                    class: "file-image",
                    src: item.url,
                    mode: "aspectFill",
                    onClick: vue.withModifiers(($event) => $options.prviewImage(item, index), ["stop"])
                  }, null, 8, ["src", "onClick"]),
                  $props.delIcon && !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "icon-del-box",
                    onClick: vue.withModifiers(($event) => $options.delFile(index), ["stop"])
                  }, [
                    vue.createElementVNode("view", { class: "icon-del" }),
                    vue.createElementVNode("view", { class: "icon-del rotate" })
                  ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                  item.progress && item.progress !== 100 || item.progress === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "file-picker__progress"
                  }, [
                    vue.createElementVNode("progress", {
                      class: "file-picker__progress-item",
                      percent: item.progress === -1 ? 0 : item.progress,
                      "stroke-width": "4",
                      backgroundColor: item.errMsg ? "#ff5a5f" : "#EBEBEB"
                    }, null, 8, ["percent", "backgroundColor"])
                  ])) : vue.createCommentVNode("v-if", true),
                  item.errMsg ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "file-picker__mask",
                    onClick: vue.withModifiers(($event) => $options.uploadFiles(item, index), ["stop"])
                  }, " 点击重试 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              )
            ],
            4
            /* STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      $props.filesList.length < $props.limit && !$props.readonly ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "file-picker__box",
          style: vue.normalizeStyle($options.boxStyle)
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "file-picker__box-content is-add",
              style: vue.normalizeStyle($options.borderStyle),
              onClick: _cache[0] || (_cache[0] = (...args) => $options.choose && $options.choose(...args))
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createElementVNode("view", { class: "icon-add" }),
                vue.createElementVNode("view", { class: "icon-add rotate" })
              ], true)
            ],
            4
            /* STYLE */
          )
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const uploadImage = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$9], ["__scopeId", "data-v-bdfc07e0"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-file-picker/components/uni-file-picker/upload-image.vue"]]);
  const _sfc_main$w = {
    name: "uploadFile",
    emits: ["uploadFiles", "choose", "delFile"],
    props: {
      filesList: {
        type: Array,
        default() {
          return [];
        }
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      limit: {
        type: [Number, String],
        default: 9
      },
      showType: {
        type: String,
        default: ""
      },
      listStyles: {
        type: Object,
        default() {
          return {
            // 是否显示边框
            border: true,
            // 是否显示分隔线
            dividline: true,
            // 线条样式
            borderStyle: {}
          };
        }
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      list() {
        let files = [];
        this.filesList.forEach((v2) => {
          files.push(v2);
        });
        return files;
      },
      styles() {
        let styles = {
          border: true,
          dividline: true,
          "border-style": {}
        };
        return Object.assign(styles, this.listStyles);
      },
      borderStyle() {
        let {
          borderStyle,
          border
        } = this.styles;
        let obj = {};
        if (!border) {
          obj.border = "none";
        } else {
          let width = borderStyle && borderStyle.width || 1;
          width = this.value2px(width);
          let radius = borderStyle && borderStyle.radius || 5;
          radius = this.value2px(radius);
          obj = {
            "border-width": width,
            "border-style": borderStyle && borderStyle.style || "solid",
            "border-color": borderStyle && borderStyle.color || "#eee",
            "border-radius": radius
          };
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      },
      borderLineStyle() {
        let obj = {};
        let {
          borderStyle
        } = this.styles;
        if (borderStyle && borderStyle.color) {
          obj["border-color"] = borderStyle.color;
        }
        if (borderStyle && borderStyle.width) {
          let width = borderStyle && borderStyle.width || 1;
          let style = borderStyle && borderStyle.style || 0;
          if (typeof width === "number") {
            width += "px";
          } else {
            width = width.indexOf("px") ? width : width + "px";
          }
          obj["border-width"] = width;
          if (typeof style === "number") {
            style += "px";
          } else {
            style = style.indexOf("px") ? style : style + "px";
          }
          obj["border-top-style"] = style;
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      }
    },
    methods: {
      uploadFiles(item, index) {
        this.$emit("uploadFiles", {
          item,
          index
        });
      },
      choose() {
        this.$emit("choose");
      },
      delFile(index) {
        this.$emit("delFile", index);
      },
      value2px(value) {
        if (typeof value === "number") {
          value += "px";
        } else {
          value = value.indexOf("px") !== -1 ? value : value + "px";
        }
        return value;
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker__files" }, [
      !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "files-button",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.choose && $options.choose(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(` :class="{'is-text-box':showType === 'list'}" `),
      $options.list.length > 0 ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: "uni-file-picker__lists is-text-box",
          style: vue.normalizeStyle($options.borderStyle)
        },
        [
          vue.createCommentVNode(" ,'is-list-card':showType === 'list-card' "),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($options.list, (item, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["uni-file-picker__lists-box", {
                    "files-border": index !== 0 && $options.styles.dividline
                  }]),
                  key: index,
                  style: vue.normalizeStyle(index !== 0 && $options.styles.dividline && $options.borderLineStyle)
                },
                [
                  vue.createElementVNode("view", { class: "uni-file-picker__item" }, [
                    vue.createCommentVNode(` :class="{'is-text-image':showType === 'list'}" `),
                    vue.createCommentVNode(' 	<view class="files__image is-text-image">\n						<image class="header-image" :src="item.logo" mode="aspectFit"></image>\n					</view> '),
                    vue.createElementVNode(
                      "view",
                      { class: "files__name" },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    ),
                    $props.delIcon && !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "icon-del-box icon-files",
                      onClick: ($event) => $options.delFile(index)
                    }, [
                      vue.createElementVNode("view", { class: "icon-del icon-files" }),
                      vue.createElementVNode("view", { class: "icon-del rotate" })
                    ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                  ]),
                  item.progress && item.progress !== 100 || item.progress === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "file-picker__progress"
                  }, [
                    vue.createElementVNode("progress", {
                      class: "file-picker__progress-item",
                      percent: item.progress === -1 ? 0 : item.progress,
                      "stroke-width": "4",
                      backgroundColor: item.errMsg ? "#ff5a5f" : "#EBEBEB"
                    }, null, 8, ["percent", "backgroundColor"])
                  ])) : vue.createCommentVNode("v-if", true),
                  item.status === "error" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "file-picker__mask",
                    onClick: vue.withModifiers(($event) => $options.uploadFiles(item, index), ["stop"])
                  }, " 点击重试 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const uploadFile = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$8], ["__scopeId", "data-v-a54939c6"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-file-picker/components/uni-file-picker/upload-file.vue"]]);
  const _sfc_main$v = {
    name: "uniFilePicker",
    components: {
      uploadImage,
      uploadFile
    },
    emits: ["select", "success", "fail", "progress", "delete", "update:modelValue", "input"],
    props: {
      modelValue: {
        type: [Array, Object],
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disablePreview: {
        type: Boolean,
        default: false
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      // 自动上传
      autoUpload: {
        type: Boolean,
        default: true
      },
      // 最大选择个数 ，h5只能限制单选或是多选
      limit: {
        type: [Number, String],
        default: 9
      },
      // 列表样式 grid | list | list-card
      mode: {
        type: String,
        default: "grid"
      },
      // 选择文件类型  image/video/all
      fileMediatype: {
        type: String,
        default: "image"
      },
      // 文件类型筛选
      fileExtname: {
        type: [Array, String],
        default() {
          return [];
        }
      },
      title: {
        type: String,
        default: ""
      },
      listStyles: {
        type: Object,
        default() {
          return {
            // 是否显示边框
            border: true,
            // 是否显示分隔线
            dividline: true,
            // 线条样式
            borderStyle: {}
          };
        }
      },
      imageStyles: {
        type: Object,
        default() {
          return {
            width: "auto",
            height: "auto"
          };
        }
      },
      readonly: {
        type: Boolean,
        default: false
      },
      returnType: {
        type: String,
        default: "array"
      },
      sizeType: {
        type: Array,
        default() {
          return ["original", "compressed"];
        }
      }
    },
    data() {
      return {
        files: [],
        localValue: []
      };
    },
    watch: {
      modelValue: {
        handler(newVal, oldVal) {
          this.setValue(newVal, oldVal);
        },
        immediate: true
      }
    },
    computed: {
      filesList() {
        let files = [];
        this.files.forEach((v2) => {
          files.push(v2);
        });
        return files;
      },
      showType() {
        if (this.fileMediatype === "image") {
          return this.mode;
        }
        return "list";
      },
      limitLength() {
        if (this.returnType === "object") {
          return 1;
        }
        if (!this.limit) {
          return 1;
        }
        if (this.limit >= 9) {
          return 9;
        }
        return this.limit;
      }
    },
    created() {
      if (!(Es.config && Es.config.provider)) {
        this.noSpace = true;
        Es.chooseAndUploadFile = chooseAndUploadFile;
      }
      this.form = this.getForm("uniForms");
      this.formItem = this.getForm("uniFormsItem");
      if (this.form && this.formItem) {
        if (this.formItem.name) {
          this.rename = this.formItem.name;
          this.form.inputChildrens.push(this);
        }
      }
    },
    methods: {
      /**
       * 公开用户使用，清空文件
       * @param {Object} index
       */
      clearFiles(index) {
        if (index !== 0 && !index) {
          this.files = [];
          this.$nextTick(() => {
            this.setEmit();
          });
        } else {
          this.files.splice(index, 1);
        }
        this.$nextTick(() => {
          this.setEmit();
        });
      },
      /**
       * 公开用户使用，继续上传
       */
      upload() {
        let files = [];
        this.files.forEach((v2, index) => {
          if (v2.status === "ready" || v2.status === "error") {
            files.push(Object.assign({}, v2));
          }
        });
        return this.uploadFiles(files);
      },
      async setValue(newVal, oldVal) {
        const newData = async (v2) => {
          const reg = /cloud:\/\/([\w.]+\/?)\S*/;
          let url = "";
          if (v2.fileID) {
            url = v2.fileID;
          } else {
            url = v2.url;
          }
          if (reg.test(url)) {
            v2.fileID = url;
            v2.url = await this.getTempFileURL(url);
          }
          if (v2.url)
            v2.path = v2.url;
          return v2;
        };
        if (this.returnType === "object") {
          if (newVal) {
            await newData(newVal);
          } else {
            newVal = {};
          }
        } else {
          if (!newVal)
            newVal = [];
          for (let i2 = 0; i2 < newVal.length; i2++) {
            let v2 = newVal[i2];
            await newData(v2);
          }
        }
        this.localValue = newVal;
        if (this.form && this.formItem && !this.is_reset) {
          this.is_reset = false;
          this.formItem.setValue(this.localValue);
        }
        let filesData = Object.keys(newVal).length > 0 ? newVal : [];
        this.files = [].concat(filesData);
      },
      /**
       * 选择文件
       */
      choose() {
        if (this.disabled)
          return;
        if (this.files.length >= Number(this.limitLength) && this.showType !== "grid" && this.returnType === "array") {
          uni.showToast({
            title: `您最多选择 ${this.limitLength} 个文件`,
            icon: "none"
          });
          return;
        }
        this.chooseFiles();
      },
      /**
       * 选择文件并上传
       */
      chooseFiles() {
        const _extname = get_extname(this.fileExtname);
        Es.chooseAndUploadFile({
          type: this.fileMediatype,
          compressed: false,
          sizeType: this.sizeType,
          // TODO 如果为空，video 有问题
          extension: _extname.length > 0 ? _extname : void 0,
          count: this.limitLength - this.files.length,
          //默认9
          onChooseFile: this.chooseFileCallback,
          onUploadProgress: (progressEvent) => {
            this.setProgress(progressEvent, progressEvent.index);
          }
        }).then((result) => {
          this.setSuccessAndError(result.tempFiles);
        }).catch((err) => {
          formatAppLog("log", "at uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue:361", "选择失败", err);
        });
      },
      /**
       * 选择文件回调
       * @param {Object} res
       */
      async chooseFileCallback(res) {
        const _extname = get_extname(this.fileExtname);
        const is_one = Number(this.limitLength) === 1 && this.disablePreview && !this.disabled || this.returnType === "object";
        if (is_one) {
          this.files = [];
        }
        let {
          filePaths,
          files
        } = get_files_and_is_max(res, _extname);
        if (!(_extname && _extname.length > 0)) {
          filePaths = res.tempFilePaths;
          files = res.tempFiles;
        }
        let currentData = [];
        for (let i2 = 0; i2 < files.length; i2++) {
          if (this.limitLength - this.files.length <= 0)
            break;
          files[i2].uuid = Date.now();
          let filedata = await get_file_data(files[i2], this.fileMediatype);
          filedata.progress = 0;
          filedata.status = "ready";
          this.files.push(filedata);
          currentData.push({
            ...filedata,
            file: files[i2]
          });
        }
        this.$emit("select", {
          tempFiles: currentData,
          tempFilePaths: filePaths
        });
        res.tempFiles = files;
        if (!this.autoUpload || this.noSpace) {
          res.tempFiles = [];
        }
      },
      /**
       * 批传
       * @param {Object} e
       */
      uploadFiles(files) {
        files = [].concat(files);
        return uploadCloudFiles.call(this, files, 5, (res) => {
          this.setProgress(res, res.index, true);
        }).then((result) => {
          this.setSuccessAndError(result);
          return result;
        }).catch((err) => {
          formatAppLog("log", "at uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue:427", err);
        });
      },
      /**
       * 成功或失败
       */
      async setSuccessAndError(res, fn2) {
        let successData = [];
        let errorData = [];
        let tempFilePath = [];
        let errorTempFilePath = [];
        for (let i2 = 0; i2 < res.length; i2++) {
          const item = res[i2];
          const index = item.uuid ? this.files.findIndex((p2) => p2.uuid === item.uuid) : item.index;
          if (index === -1 || !this.files)
            break;
          if (item.errMsg === "request:fail") {
            this.files[index].url = item.path;
            this.files[index].status = "error";
            this.files[index].errMsg = item.errMsg;
            errorData.push(this.files[index]);
            errorTempFilePath.push(this.files[index].url);
          } else {
            this.files[index].errMsg = "";
            this.files[index].fileID = item.url;
            const reg = /cloud:\/\/([\w.]+\/?)\S*/;
            if (reg.test(item.url)) {
              this.files[index].url = await this.getTempFileURL(item.url);
            } else {
              this.files[index].url = item.url;
            }
            this.files[index].status = "success";
            this.files[index].progress += 1;
            successData.push(this.files[index]);
            tempFilePath.push(this.files[index].fileID);
          }
        }
        if (successData.length > 0) {
          this.setEmit();
          this.$emit("success", {
            tempFiles: this.backObject(successData),
            tempFilePaths: tempFilePath
          });
        }
        if (errorData.length > 0) {
          this.$emit("fail", {
            tempFiles: this.backObject(errorData),
            tempFilePaths: errorTempFilePath
          });
        }
      },
      /**
       * 获取进度
       * @param {Object} progressEvent
       * @param {Object} index
       * @param {Object} type
       */
      setProgress(progressEvent, index, type) {
        this.files.length;
        const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        let idx = index;
        if (!type) {
          idx = this.files.findIndex((p2) => p2.uuid === progressEvent.tempFile.uuid);
        }
        if (idx === -1 || !this.files[idx])
          return;
        this.files[idx].progress = percentCompleted - 1;
        this.$emit("progress", {
          index: idx,
          progress: parseInt(percentCompleted),
          tempFile: this.files[idx]
        });
      },
      /**
       * 删除文件
       * @param {Object} index
       */
      delFile(index) {
        this.$emit("delete", {
          tempFile: this.files[index],
          tempFilePath: this.files[index].url
        });
        this.files.splice(index, 1);
        this.$nextTick(() => {
          this.setEmit();
        });
      },
      /**
       * 获取文件名和后缀
       * @param {Object} name
       */
      getFileExt(name) {
        const last_len = name.lastIndexOf(".");
        const len = name.length;
        return {
          name: name.substring(0, last_len),
          ext: name.substring(last_len + 1, len)
        };
      },
      /**
       * 处理返回事件
       */
      setEmit() {
        let data2 = [];
        if (this.returnType === "object") {
          data2 = this.backObject(this.files)[0];
          this.localValue = data2 ? data2 : null;
        } else {
          data2 = this.backObject(this.files);
          if (!this.localValue) {
            this.localValue = [];
          }
          this.localValue = [...data2];
        }
        this.$emit("update:modelValue", this.localValue);
      },
      /**
       * 处理返回参数
       * @param {Object} files
       */
      backObject(files) {
        let newFilesData = [];
        files.forEach((v2) => {
          newFilesData.push({
            extname: v2.extname,
            fileType: v2.fileType,
            image: v2.image,
            name: v2.name,
            path: v2.path,
            size: v2.size,
            fileID: v2.fileID,
            url: v2.url
          });
        });
        return newFilesData;
      },
      async getTempFileURL(fileList) {
        fileList = {
          fileList: [].concat(fileList)
        };
        const urls = await Es.getTempFileURL(fileList);
        return urls.fileList[0].tempFileURL || "";
      },
      /**
       * 获取父元素实例
       */
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
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_upload_image = vue.resolveComponent("upload-image");
    const _component_upload_file = vue.resolveComponent("upload-file");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker" }, [
      $props.title ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-file-picker__header"
      }, [
        vue.createElementVNode(
          "text",
          { class: "file-title" },
          vue.toDisplayString($props.title),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "file-count" },
          vue.toDisplayString($options.filesList.length) + "/" + vue.toDisplayString($options.limitLength),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true),
      $props.fileMediatype === "image" && $options.showType === "grid" ? (vue.openBlock(), vue.createBlock(_component_upload_image, {
        key: 1,
        readonly: $props.readonly,
        "image-styles": $props.imageStyles,
        "files-list": $options.filesList,
        limit: $options.limitLength,
        disablePreview: $props.disablePreview,
        delIcon: $props.delIcon,
        onUploadFiles: $options.uploadFiles,
        onChoose: $options.choose,
        onDelFile: $options.delFile
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode("view", { class: "is-add" }, [
              vue.createElementVNode("view", { class: "icon-add" }),
              vue.createElementVNode("view", { class: "icon-add rotate" })
            ])
          ], true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["readonly", "image-styles", "files-list", "limit", "disablePreview", "delIcon", "onUploadFiles", "onChoose", "onDelFile"])) : vue.createCommentVNode("v-if", true),
      $props.fileMediatype !== "image" || $options.showType !== "grid" ? (vue.openBlock(), vue.createBlock(_component_upload_file, {
        key: 2,
        readonly: $props.readonly,
        "list-styles": $props.listStyles,
        "files-list": $options.filesList,
        showType: $options.showType,
        delIcon: $props.delIcon,
        onUploadFiles: $options.uploadFiles,
        onChoose: $options.choose,
        onDelFile: $options.delFile
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode("button", {
              type: "primary",
              size: "mini"
            }, "选择文件")
          ], true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["readonly", "list-styles", "files-list", "showType", "delIcon", "onUploadFiles", "onChoose", "onDelFile"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$7], ["__scopeId", "data-v-6223573f"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue"]]);
  const _sfc_main$u = {
    __name: "DetailsBaseInfo",
    props: {
      itemData: {
        type: Object,
        default: () => {
        }
      }
    },
    setup(__props) {
      const callPhone = (phone2) => {
        uni.makePhoneCall({
          phoneNumber: phone2
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "" }, [
          vue.createElementVNode("view", { class: "baseInfo" }, [
            vue.createElementVNode("view", { class: "addrCont" }, [
              vue.createElementVNode(
                "view",
                { class: "startAddr" },
                vue.toDisplayString(__props.itemData.startAddress),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "endAddr" },
                vue.toDisplayString(__props.itemData.endAddress),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "carInfo" }, [
              vue.createElementVNode("view", { class: "line" }, [
                vue.createElementVNode("text", null, "任务编号"),
                vue.createTextVNode(),
                vue.createElementVNode(
                  "text",
                  { class: "ritEl" },
                  vue.toDisplayString(__props.itemData.transportTaskId),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "line" }, [
                vue.createElementVNode("text", null, "联系人"),
                vue.createTextVNode(),
                vue.createElementVNode(
                  "text",
                  { class: "ritEl" },
                  vue.toDisplayString(__props.itemData.startHandover),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "line" }, [
                vue.createElementVNode("text", null, "联系电话"),
                vue.createElementVNode("view", { class: "phoneCont" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "ritEl" },
                    vue.toDisplayString(__props.itemData.startHandoverPhone),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("image", {
                    onClick: _cache[0] || (_cache[0] = ($event) => callPhone(__props.itemData.startHandoverPhone)),
                    class: "phone",
                    src: "/static/sj_phone.png",
                    mode: ""
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "line" }, [
                vue.createElementVNode("text", null, "提货时间"),
                vue.createTextVNode(),
                vue.createElementVNode(
                  "text",
                  { class: "ritEl" },
                  vue.toDisplayString(__props.itemData.planDepartureTime),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "line" }, [
                vue.createElementVNode("text", null, "预计送达时间"),
                vue.createTextVNode(),
                vue.createElementVNode(
                  "text",
                  { class: "ritEl" },
                  vue.toDisplayString(__props.itemData.planArrivalTime),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ]);
      };
    }
  };
  const DetailsBaseInfo = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-0edf1d69"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/components/DetailsBaseInfo.vue"]]);
  const _sfc_main$t = {
    __name: "OrderCont",
    props: {
      itemData: {
        type: Object,
        default: () => {
        }
      },
      searchHandle: {
        type: Function(),
        default: () => {
        }
      }
    },
    emits: ["searchHandle"],
    setup(__props, { emit }) {
      const orderId = vue.ref("");
      const search = () => {
        if (orderId.value == "") {
          uni.showToast({
            title: "请输入运单号",
            duration: 1e3,
            icon: "none"
          });
          return;
        }
        emit("searchHandle", orderId.value);
      };
      const onKeyInput = (event) => {
        orderId.value = event.detail.value;
      };
      return (_ctx, _cache) => {
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$7);
        return vue.openBlock(), vue.createElementBlock("view", { class: "orderCont" }, [
          vue.createElementVNode("view", { class: "search" }, [
            vue.createVNode(_component_uni_icons, {
              class: "searchIcon",
              onClick: _cache[0] || (_cache[0] = ($event) => search()),
              type: "search"
            }),
            vue.createElementVNode(
              "input",
              {
                type: "text",
                class: "searchInput",
                onInput: onKeyInput,
                onConfirm: search,
                "confirm-type": "search",
                placeholder: "请输入运单号"
              },
              null,
              32
              /* HYDRATE_EVENTS */
            )
          ]),
          vue.createElementVNode("view", { class: "items" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.itemData, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", { class: "item" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "odd" },
                    vue.toDisplayString(item.id),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "piece" },
                    vue.toDisplayString(item.count) + " 件",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "weight" },
                    vue.toDisplayString(item.totalWeight) + " kg",
                    1
                    /* TEXT */
                  )
                ]);
              }),
              256
              /* UNKEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const OrderCont = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-b9ed7120"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/components/OrderCont.vue"]]);
  const _sfc_main$s = {
    __name: "RouteCont",
    props: {
      type: {
        type: String,
        default: "navigation"
      },
      itemData: {
        type: Object,
        default: () => {
        }
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "routeItem" }, [
          vue.createElementVNode("view", { class: "routeLine" }, [
            vue.createElementVNode("view", { class: "routePoint" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(__props.itemData.startProvince),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(__props.itemData.startCity),
                  1
                  /* TEXT */
                )
              ])
            ]),
            vue.createElementVNode("view", { class: "route" }, [
              vue.createElementVNode("view", {
                class: "line",
                style: {}
              }, [
                vue.createElementVNode("image", {
                  class: "LineImg",
                  src: "/static/sj_route_line.png",
                  mode: ""
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "routePoint" }, [
              vue.createElementVNode("view", { class: "tit" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(__props.itemData.endProvince),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(__props.itemData.endCity),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          __props.type == "navigation" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "navigat"
          }, [
            vue.createElementVNode("image", {
              class: "naviIcon",
              src: "/static/sj_navigation.png",
              mode: ""
            }),
            vue.createElementVNode("view", {
              class: "",
              onClick: _cache[0] || (_cache[0] = () => vue.unref(openMap)(__props.itemData.startAddress, __props.itemData.endAddress, "开始导航"))
            }, [
              vue.createElementVNode("text", null, "开始导航")
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const RouteCont = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-41aee64f"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/components/RouteCont.vue"]]);
  const _imports_0$5 = "/static/sj_add.png";
  const _imports_1$1 = "/static/sj_red.png";
  const _sfc_main$r = {
    data() {
      const elId = `wl_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        redioIconTrue: "./../../static/sj_redio_true.png",
        redioIconFalse: "./../../static/sj_redio_false.png",
        isOpen: this.open,
        contHt: "auto",
        height: "",
        elId
      };
    },
    props: {
      // 列表标题
      title: {
        type: String,
        default: ""
      },
      // 分类  默认加减号 的样式  redio 为单选形式
      type: {
        type: String,
        default: ""
      },
      // 分类为redio的时候 可以设置 对应参数
      redioKey: {
        type: String,
        default: "redioKey"
      },
      //标题后面的说明文字
      label: {
        type: String,
        default: ""
      },
      // 是否展开
      open: {
        type: Boolean,
        default: false
      }
    },
    updated(e) {
      this.$nextTick(() => {
        this.getCollapseHeight();
      });
    },
    methods: {
      // 展开关闭操作
      openHandle() {
        this.isOpen = this.isOpen ? false : true;
        if (this.type == "redio") {
          let param = { key: this.redioKey, value: Number(this.isOpen) + 1 };
          this.$emit("redioChange", param);
        }
      },
      // 获取内部容器的高度
      getCollapseHeight(type, index = 0) {
        const views = uni.createSelectorQuery().in(this);
        views.select(`#${this.elId}`).fields({
          size: true
        }, (data2) => {
          if (index >= 10)
            return;
          if (!data2) {
            index++;
            this.getCollapseHeight(false, index);
            return;
          }
          this.height = data2.height;
          this.isheight = true;
        }).exec();
      }
    },
    mounted() {
      this.getCollapseHeight();
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 公用卡片 - 框架 "),
        vue.createElementVNode("view", { class: "cardCont" }, [
          vue.createElementVNode("view", {
            class: "topCont",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.openHandle())
          }, [
            vue.createElementVNode("view", { class: "" }, [
              vue.createElementVNode(
                "text",
                { class: "title" },
                vue.toDisplayString($props.title),
                1
                /* TEXT */
              ),
              vue.withDirectives(vue.createElementVNode(
                "text",
                { class: "label" },
                vue.toDisplayString($props.label),
                513
                /* TEXT, NEED_PATCH */
              ), [
                [vue.vShow, $props.label]
              ])
            ]),
            $props.type == "redio" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "redioActionCont"
            }, [
              vue.createElementVNode("image", {
                class: "videoIcon",
                mode: "aspectFit",
                src: $data.isOpen ? $data.redioIconTrue : $data.redioIconFalse
              }, null, 8, ["src"]),
              vue.createTextVNode(),
              vue.createElementVNode("text", null, "是"),
              vue.createElementVNode("image", {
                class: "videoIcon",
                mode: "aspectFit",
                src: !$data.isOpen ? $data.redioIconTrue : $data.redioIconFalse
              }, null, 8, ["src"]),
              vue.createTextVNode(),
              vue.createElementVNode("text", null, "否")
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "openHandle"
            }, [
              vue.withDirectives(vue.createElementVNode(
                "image",
                {
                  class: "cardsIcon",
                  mode: "aspectFit",
                  src: _imports_0$5
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, !$data.isOpen]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "image",
                {
                  class: "cardsIcon",
                  mode: "aspectFit",
                  src: _imports_1$1
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, $data.isOpen]
              ])
            ]))
          ]),
          vue.createElementVNode(
            "view",
            {
              class: "content",
              style: vue.normalizeStyle({ height: ($data.isOpen ? $data.height : 0) + "px" }),
              ref: "contEl"
            },
            [
              vue.createElementVNode("view", {
                id: $data.elId,
                style: { "padding-top": "20rpx" }
              }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ], 8, ["id"])
            ],
            4
            /* STYLE */
          )
        ]),
        vue.createCommentVNode(" end ")
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const CardCont = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$6], ["__scopeId", "data-v-f9e10bee"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/CardCont/index.vue"]]);
  const _sfc_main$q = {
    __name: "details",
    setup(__props) {
      useStore();
      const itemData = vue.ref([]);
      const orders = vue.ref([]);
      const amount = vue.ref(0);
      const id = vue.ref("");
      const cargoPickUpPicture = vue.ref([]);
      const cargoPicture = vue.ref([]);
      const isTake = vue.ref(true);
      vue.ref("");
      vue.onMounted(() => {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1].$page.options;
        id.value = currentPage.id;
        getDetailsInfo();
      });
      vue.watchEffect(
        [cargoPickUpPicture, () => {
          isTake.value = cargoPickUpPicture.length > 0 && cargoPicture.length > 0;
        }],
        [cargoPicture, () => {
          isTake.value = cargoPickUpPicture.length > 0 && cargoPicture.length > 0;
        }]
      );
      const getDetailsInfo = async () => {
        await GetTaskDetails(id.value).then((res) => {
          const {
            data: data2
          } = res;
          if (res.code === 200) {
            itemData.value = data2;
            getOrders(data2.transportTaskId);
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const getOrders = async (orderId, transportOrderId = "") => {
        const params = {
          transportOrderId,
          taskId: orderId,
          page: 1,
          pageSize: 100
        };
        await GetTaskDetailsOrders(params).then((res) => {
          if (res.code === 200) {
            amount.value = res.data.counts ? res.data.counts : 0;
            orders.value = res.data.items;
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      function searchHandle(transportOrderId) {
        getOrders(itemData.value.transportTaskId, transportOrderId);
      }
      function delayedHandle() {
        const data2 = itemData.value;
        uni.navigateTo({
          url: `/pages/index/delayed?id=${data2.id}&time=${data2.planDepartureTime}`
        });
      }
      async function takeGoods() {
        const cargoPickUpPictureStr = cargoPickUpPicture.value.map((n2) => n2.path).join();
        const cargoPictureStr = cargoPicture.value.map((n2) => n2.path).join();
        const params = {
          id: id.value,
          cargoPickUpPicture: cargoPickUpPictureStr,
          cargoPicture: cargoPictureStr
        };
        await TakeDelivery(params).then((res) => {
          if (res.code === 200) {
            positionUploadHandle(true);
            uni.showToast({
              title: "提货完成",
              duration: 1e3,
              icon: "none"
            });
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
      async function uploadHande(e, type) {
        await upload(e).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              isTake.value = true;
              const name = res.data.split("/")[res.data.split("/").length - 1];
              let data2 = {
                url: res.data,
                name,
                extName: name.split(".")[name.split(".").length - 1]
              };
              if (type == "cargoPickUpPicture") {
                cargoPickUpPicture.value = [...cargoPickUpPicture.value, data2];
              } else {
                cargoPicture.value = [...cargoPicture.value, data2];
              }
            }
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
          uni.showToast({
            title: "图片上传失败！请联系管理员",
            duration: 1e3,
            icon: "none"
          });
        });
      }
      async function selectA(e) {
        cargoPickUpPicture.value = [];
        const tempFiles = e.tempFiles[0];
        if (tempFiles.size < 1024 * 5 * 1024 && (tempFiles.extname == "png" || tempFiles.extname == "jpg" || tempFiles.extname == "jpeg" || tempFiles.extname == "gif")) {
          uploadHande(e, "cargoPickUpPicture");
        } else {
          uni.showToast({
            title: "上传图片大小不能超过5M，格式需为jpg、png、gif",
            duration: 2e3,
            icon: "none"
          });
        }
      }
      async function selectB(e) {
        cargoPicture.value = [];
        const tempFiles = e.tempFiles[0];
        if (tempFiles.size < 1024 * 5 * 1024 && (tempFiles.extname == "png" || tempFiles.extname == "jpg" || tempFiles.extname == "jpeg" || tempFiles.extname == "gif")) {
          uploadHande(e, "cargoPicture");
        } else {
          uni.showToast({
            title: "上传图片大小不能超过5M，格式需为jpg、png、gif",
            duration: 2e3,
            icon: "none"
          });
        }
      }
      return (_ctx, _cache) => {
        const _component_uni_file_picker = resolveEasycom(vue.resolveDynamicComponent("uni-file-picker"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 详情 "),
            vue.createElementVNode("view", { class: "details" }, [
              vue.createVNode(DetailsNav, { title: "任务详情" }),
              vue.createCommentVNode(" 取件状态列表 "),
              vue.createElementVNode("view", { class: "container" }, [
                vue.createCommentVNode(" 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度"),
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "true",
                  class: "swiperH"
                }, [
                  Object.keys(itemData.value).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "cont"
                  }, [
                    vue.createCommentVNode(" 通用卡片组件 - 待提货 - 带开关 "),
                    vue.createVNode(CardCont, {
                      title: "基本信息",
                      open: true
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(DetailsBaseInfo, { itemData: itemData.value }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, { title: "车辆司机信息" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "carInfo" }, [
                          vue.createElementVNode("view", { class: "line" }, [
                            vue.createElementVNode("text", { class: "tit" }, "车牌号"),
                            vue.createTextVNode(),
                            vue.createElementVNode(
                              "text",
                              { class: "ritEl" },
                              vue.toDisplayString(itemData.value.licensePlate),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "line" }, [
                            vue.createElementVNode("text", { class: "tit" }, "司机姓名"),
                            vue.createTextVNode(),
                            vue.createElementVNode(
                              "text",
                              { class: "ritEl" },
                              vue.toDisplayString(itemData.value.driverName),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, { title: "运输路线" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(RouteCont, {
                          itemData: itemData.value,
                          type: "route"
                        }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, {
                      title: "物品信息",
                      label: `共计: ${amount.value}单`
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(OrderCont, {
                          itemData: orders.value,
                          onSearchHandle: searchHandle
                        }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["label"]),
                    vue.createVNode(CardCont, { title: "提货信息" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "upPicCont" }, [
                          vue.createElementVNode("view", { class: "title" }, "请拍照上传回单凭证"),
                          vue.createVNode(_component_uni_file_picker, {
                            modelValue: cargoPickUpPicture.value,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => cargoPickUpPicture.value = $event),
                            fileMediatype: "image",
                            mode: "grid",
                            limit: "3",
                            onSelect: selectA
                          }, null, 8, ["modelValue"])
                        ]),
                        vue.createElementVNode("view", { class: "upPicCont" }, [
                          vue.createElementVNode("view", { class: "title" }, "请拍照上传货品照片"),
                          vue.createVNode(_component_uni_file_picker, {
                            modelValue: cargoPicture.value,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => cargoPicture.value = $event),
                            fileMediatype: "image",
                            mode: "grid",
                            limit: "3",
                            onSelect: selectB
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 无数据显示 "),
                  Object.keys(itemData.value).length === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    vue.createVNode(EmptyPage, { emptyInfo: "暂无数据!" })
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" end ")
                ])
              ]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" footer "),
            vue.createElementVNode("view", { class: "footCont" }, [
              vue.createElementVNode("view", { class: "footButCan" }, [
                vue.createElementVNode("text", {
                  class: "buttonCancel",
                  onClick: _cache[2] || (_cache[2] = ($event) => delayedHandle())
                }, "延迟提货")
              ]),
              vue.createElementVNode("view", { class: "footBut" }, [
                vue.withDirectives(vue.createElementVNode(
                  "text",
                  {
                    class: "button",
                    onClick: _cache[3] || (_cache[3] = ($event) => takeGoods())
                  },
                  "提货",
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, isTake.value]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "text",
                  { class: "buttonDis1" },
                  "提货",
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, !isTake.value]
                ])
              ])
            ]),
            vue.createCommentVNode(" end ")
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexDetails = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-1cb17dce"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/details.vue"]]);
  const __default__ = {
    mounted() {
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit("acceptDataFromOpenedPage", { data: "data from test page" });
      eventChannel.emit("someEvent", { data: "data from test page for someEvent" });
      eventChannel.on("acceptDataFromOpenerPage");
    }
  };
  const _sfc_main$p = /* @__PURE__ */ Object.assign(__default__, {
    __name: "detailsRoad",
    setup(__props) {
      useStore();
      const itemData = vue.ref([]);
      const orders = vue.ref([]);
      const amount = vue.ref(0);
      const id = vue.ref("");
      const cargoPickUpPicture = vue.ref([]);
      const cargoPicture = vue.ref([]);
      const isTake = vue.ref(false);
      vue.onMounted(() => {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1].$page.options;
        id.value = currentPage.id;
        getDetailsInfo();
        getOrders();
      });
      vue.watchEffect(
        [cargoPickUpPicture, () => {
          isTake.value = cargoPickUpPicture.length > 0 && cargoPicture.length > 0;
        }],
        [cargoPicture, () => {
          isTake.value = cargoPickUpPicture.length > 0 && cargoPicture.length > 0;
        }]
      );
      const getDetailsInfo = async () => {
        await GetTaskDetails(id.value).then((res) => {
          const { data: data2 } = res;
          if (res.code === 200) {
            itemData.value = data2;
            getOrders(data2.transportTaskId);
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const getOrders = async (orderId, transportOrderId = "") => {
        const params = {
          transportOrderId,
          taskId: orderId,
          page: 1,
          pageSize: 100
        };
        await GetTaskDetailsOrders(params).then((res) => {
          if (res.code === 200) {
            amount.value = res.data.counts ? res.data.counts : 0;
            orders.value = res.data.items;
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      function searchHandle(transportOrderId) {
        getOrders(itemData.value.transportTaskId, transportOrderId);
      }
      function ExceptionHandle(src) {
        uni.showToast({
          title: "上报异常暂时接口还在实现中！",
          duration: 1e3,
          icon: "none"
        });
        return false;
      }
      async function takeGoods() {
        const cargoPickUpPictureStr = cargoPickUpPicture.value.map((n2) => n2.path).join();
        const cargoPictureStr = cargoPicture.value.map((n2) => n2.path).join();
        const params = {
          id: id.value,
          transportCertificate: cargoPickUpPictureStr,
          deliverPicture: cargoPictureStr
        };
        await Deliver(params).then((res) => {
          if (res.code === 200) {
            positionUploadHandle(true);
            uni.showToast({
              title: "提货完成",
              duration: 1e3,
              icon: "none"
            });
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
      vue.ref([]);
      vue.ref(null);
      async function uploadHande(e, type) {
        await upload(e).then((res) => {
          if (res.code === 200) {
            if (res.data) {
              isTake.value = true;
              const name = res.data.split("/")[res.data.split("/").length - 1];
              let data2 = {
                url: res.data,
                name,
                extName: name.split(".")[name.split(".").length - 1]
              };
              if (type == "cargoPickUpPicture") {
                cargoPickUpPicture.value = [...cargoPickUpPicture.value, data2];
              } else {
                cargoPicture.value = [...cargoPicture.value, data2];
              }
            }
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
          uni.showToast({
            title: "图片上传失败！请联系管理员",
            duration: 1e3,
            icon: "none"
          });
        });
      }
      async function selectA(e) {
        cargoPickUpPicture.value = [];
        const tempFiles = e.tempFiles[0];
        if (tempFiles.size < 1024 * 5 * 1024 && (tempFiles.extname == "png" || tempFiles.extname == "jpg" || tempFiles.extname == "jpeg" || tempFiles.extname == "gif")) {
          uploadHande(e, "cargoPickUpPicture");
        } else {
          uni.showToast({
            title: "上传图片大小不能超过5M，格式需为jpg、png、gif",
            duration: 2e3,
            icon: "none"
          });
        }
      }
      async function selectB(e) {
        cargoPicture.value = [];
        const tempFiles = e.tempFiles[0];
        if (tempFiles.size < 1024 * 5 * 1024 && (tempFiles.extname == "png" || tempFiles.extname == "jpg" || tempFiles.extname == "jpeg" || tempFiles.extname == "gif")) {
          uploadHande(e, "cargoPicture");
        } else {
          uni.showToast({
            title: "上传图片大小不能超过5M，格式需为jpg、png、gif",
            duration: 2e3,
            icon: "none"
          });
        }
      }
      return (_ctx, _cache) => {
        const _component_uni_file_picker = resolveEasycom(vue.resolveDynamicComponent("uni-file-picker"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 详情 "),
            vue.createElementVNode("view", { class: "details" }, [
              vue.createVNode(DetailsNav, { title: "任务详情" }),
              vue.createCommentVNode(" 取件状态列表 "),
              vue.createElementVNode("view", { class: "container" }, [
                vue.createCommentVNode(" 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度"),
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "true",
                  class: "swiperH"
                }, [
                  Object.keys(itemData.value).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "cont"
                  }, [
                    vue.createCommentVNode(" 通用卡片组件 - 在途 - 带开关 "),
                    vue.createVNode(CardCont, {
                      title: "基本信息",
                      open: true
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(DetailsBaseInfo, { itemData: itemData.value }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createCommentVNode(" 司机信息 "),
                    vue.createVNode(CardCont, { title: "车辆司机信息" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "carInfo" }, [
                          vue.createElementVNode("view", { class: "line" }, [
                            vue.createElementVNode("text", { class: "tit" }, "车牌号"),
                            vue.createTextVNode(),
                            vue.createElementVNode(
                              "text",
                              { class: "ritEl" },
                              vue.toDisplayString(itemData.value.licensePlate),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "line" }, [
                            vue.createElementVNode("text", { class: "tit" }, "司机姓名"),
                            vue.createTextVNode(),
                            vue.createElementVNode(
                              "text",
                              { class: "ritEl" },
                              vue.toDisplayString(itemData.value.driverName),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, { title: "运输路线" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(RouteCont, { itemData: itemData.value }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createCommentVNode(" 物品信息 "),
                    vue.createVNode(CardCont, {
                      title: "物品信息",
                      label: `共计: ${amount.value}单`
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(OrderCont, {
                          itemData: orders.value,
                          onSearchHandle: searchHandle
                        }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["label"]),
                    vue.createCommentVNode(" 异常信息 "),
                    vue.createVNode(CardCont, { title: "异常信息" }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(itemData.value.exception, (item, index) => {
                            return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                              vue.createElementVNode("view", { class: "delay" }, [
                                vue.createElementVNode("view", { class: "info" }, [
                                  vue.createElementVNode("view", { class: "line" }, [
                                    vue.createElementVNode("text", null, "上报时间 "),
                                    vue.createElementVNode(
                                      "text",
                                      { class: "desc" },
                                      vue.toDisplayString(item.exceptionTime),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  vue.createElementVNode("view", { class: "line" }, [
                                    vue.createElementVNode("text", null, "异常类型 "),
                                    vue.createElementVNode(
                                      "text",
                                      { class: "desc" },
                                      vue.toDisplayString(item.exceptionType),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  vue.createElementVNode("view", { class: "line" }, [
                                    vue.createElementVNode("text", null, "继续运输 "),
                                    vue.createElementVNode(
                                      "text",
                                      { class: "desc" },
                                      vue.toDisplayString(item.processResults),
                                      1
                                      /* TEXT */
                                    )
                                  ])
                                ]),
                                vue.createElementVNode("image", {
                                  onClick: ($event) => ExceptionHandle("?id=" + item.exceptionId),
                                  class: "goInfoIcon",
                                  src: "/static/sj_open_rit.png",
                                  mode: ""
                                }, null, 8, ["onClick"])
                              ])
                            ]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createCommentVNode(" 交货信息 "),
                    vue.createVNode(CardCont, { title: "交货信息" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "upPicCont" }, [
                          vue.createElementVNode("view", { class: "title" }, "请拍照上传回单凭证"),
                          vue.createVNode(_component_uni_file_picker, {
                            modelValue: cargoPickUpPicture.value,
                            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => cargoPickUpPicture.value = $event),
                            fileMediatype: "image",
                            mode: "grid",
                            limit: "3",
                            onSelect: selectA
                          }, null, 8, ["modelValue"])
                        ]),
                        vue.createElementVNode("view", { class: "upPicCont" }, [
                          vue.createElementVNode("view", { class: "title" }, "请拍照上传货品照片"),
                          vue.createVNode(_component_uni_file_picker, {
                            modelValue: cargoPicture.value,
                            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => cargoPicture.value = $event),
                            fileMediatype: "image",
                            mode: "grid",
                            limit: "3",
                            onSelect: selectB
                          }, null, 8, ["modelValue"])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 无数据显示 "),
                  Object.keys(itemData.value).length === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    vue.createVNode(EmptyPage, { emptyInfo: "暂无数据!" })
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" end ")
                ])
              ]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" footer "),
            vue.createElementVNode("view", { class: "footCont" }, [
              vue.createElementVNode("view", { class: "footButCan" }, [
                vue.createElementVNode("text", {
                  class: "buttonCancel",
                  onClick: _cache[2] || (_cache[2] = ($event) => ExceptionHandle())
                }, "上报异常")
              ]),
              vue.createElementVNode("view", { class: "footBut" }, [
                vue.withDirectives(vue.createElementVNode(
                  "text",
                  {
                    class: "button",
                    onClick: _cache[3] || (_cache[3] = ($event) => takeGoods())
                  },
                  "交付",
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, isTake.value]
                ]),
                vue.withDirectives(vue.createElementVNode(
                  "text",
                  { class: "buttonDis1" },
                  "交付",
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, !isTake.value]
                ])
              ])
            ]),
            vue.createCommentVNode(" end ")
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  });
  const PagesIndexDetailsRoad = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-38eaa0df"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/detailsRoad.vue"]]);
  const _sfc_main$o = {
    __name: "detailsSuccess",
    setup(__props) {
      useStore();
      const itemData = vue.ref({});
      const orders = vue.ref([]);
      const amount = vue.ref(0);
      const id = vue.ref("");
      vue.ref([]);
      vue.ref([]);
      vue.ref(true);
      vue.ref("");
      vue.onMounted(() => {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1].$page.options;
        id.value = currentPage.id;
        getDetailsInfo();
      });
      const getDetailsInfo = async () => {
        await GetTaskDetails(id.value).then((res) => {
          const {
            data: data2
          } = res;
          if (res.code === 200) {
            itemData.value = data2;
            getOrders(data2.transportTaskId);
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      const getOrders = async (orderId, transportOrderId = "") => {
        const params = {
          transportOrderId,
          taskId: orderId,
          page: 1,
          pageSize: 100
        };
        await GetTaskDetailsOrders(params).then((res) => {
          if (res.code === 200) {
            amount.value = res.data.counts ? res.data.counts : 0;
            orders.value = res.data.items;
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      function searchHandle(transportOrderId) {
        getOrders(itemData.value.transportTaskId, transportOrderId);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 详情 "),
            vue.createElementVNode("view", { class: "details" }, [
              vue.createVNode(DetailsNav, { title: "任务详情" }),
              vue.createCommentVNode(" 取件状态列表 "),
              vue.createElementVNode("view", { class: "container" }, [
                vue.createCommentVNode(" 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度"),
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "true",
                  class: "successSwiperH"
                }, [
                  Object.keys(itemData.value).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "cont"
                  }, [
                    vue.createCommentVNode(" 通用卡片组件 - 待提货 - 带开关 "),
                    vue.createVNode(CardCont, {
                      title: "基本信息",
                      open: true
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(DetailsBaseInfo, { itemData: itemData.value }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, { title: "车辆司机信息" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "carInfo" }, [
                          vue.createElementVNode("view", { class: "line" }, [
                            vue.createElementVNode("text", { class: "tit" }, "车牌号"),
                            vue.createTextVNode(),
                            vue.createElementVNode(
                              "text",
                              { class: "ritEl" },
                              vue.toDisplayString(itemData.value.licensePlate),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "line" }, [
                            vue.createElementVNode("text", { class: "tit" }, "司机姓名"),
                            vue.createTextVNode(),
                            vue.createElementVNode(
                              "text",
                              { class: "ritEl" },
                              vue.toDisplayString(itemData.value.driverName),
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, { title: "运输路线" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(RouteCont, {
                          itemData: itemData.value,
                          type: "route"
                        }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, {
                      title: "物品信息",
                      label: `共计: ${amount.value}单`
                    }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(OrderCont, {
                          itemData: orders.value,
                          onSearchHandle: searchHandle
                        }, null, 8, ["itemData"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["label"]),
                    vue.createVNode(CardCont, { title: "提货凭证" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "upPicCont" }, [
                          vue.createElementVNode("div", { class: "tit" }, "回单凭证"),
                          vue.createElementVNode("view", { class: "upPicContImg" }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(itemData.value.cargoPickUpPicture, (item) => {
                                return vue.openBlock(), vue.createElementBlock("img", {
                                  class: "image",
                                  src: item,
                                  alt: "",
                                  srcset: ""
                                }, null, 8, ["src"]);
                              }),
                              256
                              /* UNKEYED_FRAGMENT */
                            ))
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "upPicCont" }, [
                          vue.createElementVNode("div", { class: "tit" }, "提货照片"),
                          vue.createElementVNode("view", { class: "upPicContImg" }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(itemData.value.cargoPicture, (item) => {
                                return vue.openBlock(), vue.createElementBlock("img", {
                                  class: "image",
                                  src: item,
                                  alt: "",
                                  srcset: ""
                                }, null, 8, ["src"]);
                              }),
                              256
                              /* UNKEYED_FRAGMENT */
                            ))
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, { title: "交货信息" }, {
                      default: vue.withCtx(() => [
                        vue.createElementVNode("view", { class: "upPicCont" }, [
                          vue.createElementVNode("div", { class: "tit" }, "回单凭证"),
                          vue.createElementVNode("view", { class: "upPicContImg" }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(itemData.value.deliverPicture, (item) => {
                                return vue.openBlock(), vue.createElementBlock("img", {
                                  class: "image",
                                  src: item,
                                  alt: "",
                                  srcset: ""
                                }, null, 8, ["src"]);
                              }),
                              256
                              /* UNKEYED_FRAGMENT */
                            ))
                          ])
                        ]),
                        vue.createElementVNode("view", { class: "upPicCont" }, [
                          vue.createElementVNode("div", { class: "tit" }, "货品照片"),
                          vue.createElementVNode("view", { class: "upPicContImg" }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(itemData.value.transportCertificate, (item) => {
                                return vue.openBlock(), vue.createElementBlock("img", {
                                  class: "image",
                                  src: item,
                                  alt: "",
                                  srcset: ""
                                }, null, 8, ["src"]);
                              }),
                              256
                              /* UNKEYED_FRAGMENT */
                            ))
                          ])
                        ])
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    vue.createVNode(CardCont, { title: "异常信息" })
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" 无数据显示 "),
                  Object.keys(itemData.value).length === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                    vue.createVNode(EmptyPage, { emptyInfo: "暂无数据!" })
                  ])) : vue.createCommentVNode("v-if", true),
                  vue.createCommentVNode(" end ")
                ])
              ]),
              vue.createCommentVNode(" end ")
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexDetailsSuccess = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-adfb72f6"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/detailsSuccess.vue"]]);
  const _imports_0$4 = "/static/sj_clone.png";
  const _sfc_main$n = {
    data() {
      return {
        redioIconTrue: "./../../static/sj_redio_true.png",
        redioIconFalse: "./../../static/sj_redio_false.png"
        // value: 0
      };
    },
    props: {
      options: {
        type: Array,
        default: []
      },
      value: {
        type: String || Number,
        default: "1"
      }
    },
    methods: {
      toggle(type) {
        this.type = type;
        this.$refs.popup.open(type);
      },
      selectHandle(value) {
        formatAppLog("log", "at components/Select/index.vue:55", value);
      },
      selectSubmit() {
      },
      change() {
      },
      // 关闭弹层
      close() {
        this.$refs.popup.close();
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 下拉组件 "),
        vue.createElementVNode("view", { class: "select" }, [
          vue.createElementVNode("view", {
            class: "selHead",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.toggle("bottom"))
          }, " 请选择 "),
          vue.createVNode(_component_uni_popup, {
            ref: "popup",
            "background-color": "#fff",
            onChange: $options.change
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["popup-content", { "popup-height": _ctx.type === "left" || _ctx.type === "right" }])
                },
                [
                  vue.createElementVNode("view", { class: "title" }, [
                    vue.createElementVNode("span", null, "选择类型"),
                    vue.createElementVNode("image", {
                      onClick: _cache[1] || (_cache[1] = ($event) => $options.close()),
                      class: "colse",
                      src: _imports_0$4,
                      mode: ""
                    })
                  ]),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList($props.options, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "options",
                        onClick: ($event) => $options.selectHandle(item.value)
                      }, [
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(item.title),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("view", { class: "redioActionCont" }, [
                          vue.createElementVNode("image", {
                            class: "videoIcon",
                            mode: "aspectFit",
                            src: $props.value == item.value ? $data.redioIconTrue : $data.redioIconFalse
                          }, null, 8, ["src"])
                        ])
                      ], 8, ["onClick"]);
                    }),
                    256
                    /* UNKEYED_FRAGMENT */
                  )),
                  vue.createElementVNode("view", { class: "butCont" }, [
                    vue.createElementVNode("text", {
                      onClick: _cache[2] || (_cache[2] = (...args) => $options.selectSubmit && $options.selectSubmit(...args)),
                      class: "button",
                      style: { "width": "59%" }
                    }, "确定")
                  ])
                ],
                2
                /* CLASS */
              )
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onChange"])
        ]),
        vue.createCommentVNode(" end ")
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const Select = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$5], ["__scopeId", "data-v-303e020b"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/Select/index.vue"]]);
  const _sfc_main$m = {
    __name: "exception",
    setup(__props) {
      const imageValue = vue.ref([]);
      const type = vue.ref("add");
      const title = vue.ref("上报异常");
      const exceptionId = vue.ref("");
      const exceptionsDeta = vue.ref({});
      const typeOptions = [
        { "title": "发动机启动困难", "value": "1" },
        { "title": "不着车，漏油", "value": "2" },
        { "title": "照明失灵", "value": "3" },
        { "title": "有异常响动", "value": "4" },
        { "title": "排烟异常、温度异常", "value": "5" },
        { "title": "其他问题", "value": "6" }
      ];
      const formData = vue.ref({
        id: "",
        delayTime: "",
        delayReason: ""
      });
      vue.onMounted(() => {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1].$page.options;
        if (Object.keys(currentPage).length > 0) {
          type.value = "details";
          title.value = "异常详情";
          exceptionId.value = currentPage.exceptionId;
          getDetails();
        } else {
          type.value = "add";
          title.value = "上报异常";
        }
      });
      const exceptionHandle = async () => {
        await Exception(formData).then((res) => {
          if (res.code === 200) {
            uni.showToast({
              title: "提交成功",
              duration: 1e3,
              icon: "none"
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/index/index"
              });
            }, 500);
          } else {
            uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      };
      async function getDetails() {
        await ExceptionDetails({ exceptionId }).then((res) => {
          if (res.code === 200) {
            const data2 = res.data;
            data2.images = [
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F04%2F2411191727687.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=8fed835d7336cac9b3fedb170766a678",
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F03%2F26%2FB1371.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645178&t=07a6e8bcc05b75d3dd86c369c70f7274",
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F03%2F26%2FB2154.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=54afc59b141abad9f7799f005e20c944",
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2019%2F05%2F08211345608033.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=c8a2aa7a7bd874381fbb98bc4223e6fe",
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2017%2F03%2F26%2FB1365.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=55b411cc1ad4aea58cef44fe11438f72",
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.duoziwang.com%2F2019%2F04%2F07090912704156.jpg&refer=http%3A%2F%2Fimg.duoziwang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658645143&t=fa6d42ffb721c66f1e42548895a64e89"
            ];
            exceptionsDeta.value = res.data;
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
      function select(e) {
        formatAppLog("log", "at pages/index/exception.vue:175", "选择文件：", e);
      }
      function progress(e) {
        formatAppLog("log", "at pages/index/exception.vue:179", "上传进度：", e);
      }
      function success(e) {
        formatAppLog("log", "at pages/index/exception.vue:184", "上传成功");
      }
      function fail(e) {
        formatAppLog("log", "at pages/index/exception.vue:189", "上传失败：", e);
      }
      return (_ctx, _cache) => {
        const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_0$2);
        const _component_uni_file_picker = resolveEasycom(vue.resolveDynamicComponent("uni-file-picker"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "pageBox" }, [
              vue.createCommentVNode(" title "),
              vue.createVNode(DetailsNav, { title: title.value }, null, 8, ["title"]),
              vue.createCommentVNode(" 取件状态列表 "),
              vue.createElementVNode("view", { class: "container" }, [
                vue.createElementVNode("view", { class: "delayedCont" }, [
                  vue.createElementVNode("view", { class: "lineBoder" }, [
                    vue.createElementVNode("text", null, "异常时间"),
                    type.value == "details" ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      { key: 0 },
                      vue.toDisplayString(exceptionsDeta.value.time),
                      1
                      /* TEXT */
                    )) : (vue.openBlock(), vue.createElementBlock(
                      vue.Fragment,
                      { key: 1 },
                      [
                        vue.createCommentVNode(' <text v-else class="label">请选择</text> '),
                        vue.createVNode(_component_uni_datetime_picker, {
                          type: "datetime",
                          modelValue: exceptionsDeta.value.time,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => exceptionsDeta.value.time = $event),
                          "clear-icon": false
                        }, null, 8, ["modelValue"])
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    ))
                  ]),
                  vue.createElementVNode("view", { class: "lineBoder" }, [
                    vue.createElementVNode("text", null, "上报位置"),
                    type.value == "details" ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      { key: 0 },
                      vue.toDisplayString(exceptionsDeta.value.province),
                      1
                      /* TEXT */
                    )) : (vue.openBlock(), vue.createElementBlock("text", {
                      key: 1,
                      class: "label"
                    }, "请选择"))
                  ]),
                  vue.createElementVNode("view", { class: "lineBoder" }, [
                    vue.createElementVNode("text", null, "异常类型"),
                    type.value == "details" ? (vue.openBlock(), vue.createElementBlock(
                      "text",
                      { key: 0 },
                      vue.toDisplayString(exceptionsDeta.value.type),
                      1
                      /* TEXT */
                    )) : (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "label"
                    }, [
                      vue.createVNode(Select, { options: typeOptions })
                    ]))
                  ]),
                  type.value == "details" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "lineBoder noborder"
                  }, [
                    vue.createElementVNode("view", {
                      class: "",
                      style: { "width": "100%" }
                    }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("text", null, "异常描述")
                      ]),
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode(
                          "text",
                          { class: "desc" },
                          vue.toDisplayString(exceptionsDeta.value.description),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])) : (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "lineBoder"
                  }, [
                    vue.createElementVNode("view", {
                      class: "",
                      style: { "width": "100%" }
                    }, [
                      vue.createElementVNode("text", null, "异常描述"),
                      vue.withDirectives(vue.createElementVNode(
                        "textarea",
                        {
                          class: "textInput",
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => formData.value.delayReason = $event),
                          "placeholder-style": "color:#818181",
                          placeholder: "请输入异常描述"
                        },
                        null,
                        512
                        /* NEED_PATCH */
                      ), [
                        [vue.vModelText, formData.value.delayReason]
                      ])
                    ])
                  ]))
                ]),
                vue.createElementVNode("view", { class: "delayedCont" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass({ upPicCont: true, setBottom: type.value == "details" })
                    },
                    [
                      vue.createElementVNode("view", { class: "title" }, "上传图片（最多6张）"),
                      type.value == "details" ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "exceptionImages"
                      }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(exceptionsDeta.value.images, (item, index) => {
                            return vue.openBlock(), vue.createElementBlock("image", {
                              class: "exceptionImage",
                              src: item,
                              key: "index",
                              mode: ""
                            }, null, 8, ["src"]);
                          }),
                          128
                          /* KEYED_FRAGMENT */
                        ))
                      ])) : (vue.openBlock(), vue.createBlock(_component_uni_file_picker, {
                        key: 1,
                        modelValue: imageValue.value,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => imageValue.value = $event),
                        fileMediatype: "image",
                        mode: "grid",
                        onSelect: select,
                        onProgress: progress,
                        onSuccess: success,
                        onFail: fail
                      }, null, 8, ["modelValue"]))
                    ],
                    2
                    /* CLASS */
                  )
                ])
              ]),
              vue.createCommentVNode(" end "),
              vue.createElementVNode("view", {
                class: "footCont positionBot",
                style: { "justify-content": "center" }
              }, [
                vue.createElementVNode("view", {
                  class: "footBut",
                  style: { "width": "400rpx", "flex": "initial" }
                }, [
                  vue.createElementVNode("text", {
                    class: "button",
                    onClick: _cache[3] || (_cache[3] = ($event) => exceptionHandle())
                  }, "提交")
                ])
              ])
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexException = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/exception.vue"]]);
  const _sfc_main$l = {
    __name: "refisterCards",
    props: {
      // 展示源数据
      data: {
        type: Object,
        default: () => {
        }
      },
      // 设置默认值
      value: {
        type: String,
        default: ""
      },
      // 选择数据的key
      choiceKey: {
        type: String,
        default: ""
      }
    },
    emits: ["choiceHandel"],
    setup(__props, { emit }) {
      const props = __props;
      let actVal = vue.ref(props.value);
      function activeHandel(val, index) {
        actVal.value = val;
        const param = { key: props.choiceKey, value: index + 1, keyInt: val };
        emit("choiceHandel", param);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "refisterCards" }, [
          vue.createElementVNode(
            "view",
            { class: "title" },
            vue.toDisplayString(__props.data.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "items" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(__props.data.data, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "item",
                  key: index,
                  onClick: ($event) => activeHandel(item, index)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass({ buttonDel: true, buttonAct: vue.unref(actVal) == item })
                    },
                    [
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item),
                        1
                        /* TEXT */
                      )
                    ],
                    2
                    /* CLASS */
                  )
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createCommentVNode(" 布局填充用 "),
            __props.data.data.length % 3 == 1 || __props.data.data.length % 3 == 2 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "item"
            })) : vue.createCommentVNode("v-if", true),
            __props.data.data.length % 3 == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "item"
            })) : vue.createCommentVNode("v-if", true)
          ])
        ]);
      };
    }
  };
  const refisterCards = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-7f9de016"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/components/refisterCards.vue"]]);
  const _sfc_main$k = {
    __name: "index",
    props: {
      title: {
        type: String,
        default: "请拍照上传货品照片"
      },
      tit: {
        type: String,
        default: ""
      }
    },
    emits: ["uploadImage"],
    setup(__props, { emit }) {
      const props = __props;
      const cargoPicture = vue.ref([]);
      async function uploadHande(e) {
        await upload(e).then((res) => {
          if (res.code === 200 && res.data) {
            emit("uploadImage", { key: props.tit, value: res.data });
          } else {
            return uni.showToast({
              title: res.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
          uni.showToast({
            title: "图片上传失败！请联系管理员",
            duration: 1e3,
            icon: "none"
          });
        });
      }
      async function select(e) {
        cargoPicture.value = [];
        const tempFiles = e.tempFiles[0];
        if (tempFiles.size < 1024 * 5 && (tempFiles.extname == "png" || tempFiles.extname == "jpg" || tempFiles.extname == "jpeg" || tempFiles.extname == "gif")) {
          uploadHande(e);
        } else {
          uni.showToast({
            title: "上传图片大小不能超过5M，格式需为jpg、png、gif",
            duration: 2e3,
            icon: "none"
          });
        }
      }
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        const _component_uni_file_picker = resolveEasycom(vue.resolveDynamicComponent("uni-file-picker"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 公用卡片 "),
            vue.createElementVNode("view", { class: "upPicCont" }, [
              vue.createElementVNode(
                "view",
                { class: "title" },
                vue.toDisplayString(__props.title),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_uni_file_picker, {
                modelValue: cargoPicture.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => cargoPicture.value = $event),
                fileMediatype: "image",
                mode: "grid",
                limit: "3",
                onSelect: select
              }, null, 8, ["modelValue"])
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const ImageUpload = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-54e4a0f9"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/ImageUpload/index.vue"]]);
  const _sfc_main$j = {
    __name: "index",
    props: {
      placeholder: {
        type: String,
        default: ""
      }
    },
    setup(__props) {
      vue.onMounted(() => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 公用卡片 "),
            vue.createElementVNode("textarea", {
              class: "textInput",
              "placeholder-style": "color:#818181",
              placeholder: __props.placeholder
            }, null, 8, ["placeholder"]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const TextArea = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-9132a1a9"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/TextArea/index.vue"]]);
  const _sfc_main$i = {
    __name: "refister",
    setup(__props) {
      const startTime = vue.ref("");
      const breakRulesType = {
        title: "违章类型",
        data: ["闯红灯", "无证驾驶", "超载", "酒后驾驶", "超速驾驶"]
      };
      const penaltyAmount = {
        title: "罚款金额",
        data: ["0元", "100元", "200元", "300元", "500元", "1000元", "2000元"]
      };
      const deductPoints = {
        title: "扣分",
        data: ["0分", "1分", "2分", "3分", "6分", "12分"]
      };
      const isAvailable = {
        title: "车辆是否可用",
        data: ["是", "否"]
      };
      const faultType = {
        title: "故障类型",
        data: ["启动困难", "不着车", "漏油", "漏水", "照明失灵", "有异响", "排烟异常", "温度异常", "其他"]
      };
      const accidentType = {
        title: "事故类型",
        data: ["直行事故", "追尾事故", "超车事故", "左转弯事故", "右转弯事故", "弯道事故", "坡道事故", "会车事故", "其他"]
      };
      let params = vue.reactive({
        id: "",
        startTime: "",
        //出车时间
        endTime: "",
        //回车时间	
        isBreakRules: false,
        //违章
        breakRulesType: 1,
        //违章类型	
        penaltyAmount: 1,
        //罚款金额	
        deductPoints: 1,
        //扣分	
        isFault: false,
        //是否有故障
        isAvailable: true,
        //车辆是否可用
        faultType: 1,
        //故障类型	
        faultImages: "",
        //故障图片	
        isAccident: false,
        // 是否有事故
        accidentType: 1,
        accidentImages: ""
        // 事故图片
      });
      vue.onMounted(() => {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1].$page.options;
        startTime.value = currentPage.time;
        params.startTime = currentPage.time;
        params.id = currentPage.id;
      });
      async function submit() {
        await TruckRegistration(params).then((res) => {
          if (res.code === 200) {
            uni.showToast({
              title: "回车登记数据提交成功！",
              duration: 1e3,
              icon: "none"
            });
            uni.navigateTo({
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
      function redioChange(item) {
        params[item.key] = item.value == 2 ? true : false;
      }
      const uploadImage2 = (item) => {
        if (item.key == "accidentImages") {
          params.accidentImages = params.accidentImages == "" ? item.value : params.accidentImages + "," + item.value;
        } else {
          params.faultImages = params.faultImages == "" ? item.value : params.faultImages + "," + item.value;
        }
      };
      function changeLog(e) {
        if (e.length < 19) {
          uni.showToast({
            title: "请选择回车时间(包含日期及时间)",
            duration: 3e3,
            icon: "none"
          });
        }
      }
      function choiceHandel(item) {
        if (item.key == "isAvailable") {
          params[item.key] = item.value == 1 ? true : false;
        } else {
          params[item.key] = item.value;
        }
      }
      return (_ctx, _cache) => {
        const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_0$2);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createCommentVNode(" 详情 "),
          vue.createElementVNode("view", { class: "refister" }, [
            vue.createVNode(DetailsNav, { title: "回车登记" }),
            vue.createElementVNode("view", { class: "container" }, [
              vue.createCommentVNode(" 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度"),
              vue.createElementVNode("scroll-view", {
                "scroll-y": "true",
                class: "swiperH"
              }, [
                vue.createElementVNode("view", { class: "boxBg" }, [
                  vue.createElementVNode("view", { class: "infoCard" }, [
                    vue.createElementVNode("view", { class: "line" }, [
                      vue.createElementVNode("text", null, "出车时间"),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(startTime.value),
                        1
                        /* TEXT */
                      )
                    ]),
                    vue.createElementVNode("view", { class: "line" }, [
                      vue.createElementVNode("text", null, "回车时间"),
                      vue.createVNode(_component_uni_datetime_picker, {
                        type: "datetime",
                        modelValue: vue.unref(params).endTime,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(params).endTime = $event),
                        "clear-icon": false,
                        onChange: changeLog
                      }, null, 8, ["modelValue"])
                    ])
                  ]),
                  vue.createCommentVNode(" 通用卡片组件 - 待提货 - 带开关 "),
                  vue.createVNode(CardCont, {
                    title: "车辆违章",
                    type: "redio",
                    redioKey: "isBreakRules",
                    onRedioChange: redioChange
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(refisterCards, {
                        data: breakRulesType,
                        value: breakRulesType.data[0],
                        choiceKey: "breakRulesType",
                        onChoiceHandel: choiceHandel
                      }, null, 8, ["value"]),
                      vue.createVNode(refisterCards, {
                        data: penaltyAmount,
                        value: penaltyAmount.data[0],
                        choiceKey: "penaltyAmount",
                        onChoiceHandel: choiceHandel
                      }, null, 8, ["value"]),
                      vue.createVNode(refisterCards, {
                        data: deductPoints,
                        value: deductPoints.data[0],
                        choiceKey: "deductPoints",
                        onChoiceHandel: choiceHandel
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(CardCont, {
                    title: "车辆故障",
                    type: "redio",
                    redioKey: "isFault",
                    onRedioChange: redioChange
                  }, {
                    default: vue.withCtx(() => [
                      vue.createCommentVNode(" 车辆是否可用 "),
                      vue.createVNode(refisterCards, {
                        data: isAvailable,
                        value: isAvailable.data[0],
                        choiceKey: "isAvailable",
                        onChoiceHandel: choiceHandel
                      }, null, 8, ["value"]),
                      vue.createCommentVNode(" 故障类型 "),
                      vue.createVNode(refisterCards, {
                        data: faultType,
                        value: faultType.data[0],
                        choiceKey: "faultType",
                        onChoiceHandel: choiceHandel
                      }, null, 8, ["value"]),
                      vue.createVNode(TextArea, { placeholder: "请简单描述故障" }),
                      vue.createVNode(ImageUpload, {
                        title: "请拍照",
                        onUploadImage: uploadImage2,
                        tit: "faultImages"
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(CardCont, {
                    title: "车辆事故",
                    type: "redio",
                    redioKey: "isAccident",
                    onRedioChange: redioChange
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(refisterCards, {
                        data: accidentType,
                        value: accidentType.data[0],
                        choiceKey: "accidentType",
                        onChoiceHandel: choiceHandel
                      }, null, 8, ["value"]),
                      vue.createVNode(TextArea, { placeholder: "请简单描述故障" }),
                      vue.createVNode(ImageUpload, {
                        title: "请拍照",
                        onUploadImage: uploadImage2,
                        tit: "accidentImages"
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])
              ])
            ]),
            vue.createCommentVNode(" end ")
          ]),
          vue.createCommentVNode(" footer "),
          vue.createElementVNode("view", { class: "footCont" }, [
            vue.createElementVNode("view", { class: "footBut" }, [
              vue.withDirectives(vue.createElementVNode(
                "text",
                {
                  class: "button",
                  onClick: _cache[1] || (_cache[1] = ($event) => submit())
                },
                "交车",
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, vue.unref(params).endTime != "" && vue.unref(params).endTime.length == 19]
              ]),
              vue.withDirectives(vue.createElementVNode(
                "text",
                { class: "button buttonDis1" },
                "交车",
                512
                /* NEED_PATCH */
              ), [
                [vue.vShow, vue.unref(params).endTime == "" || vue.unref(params).endTime.length < 19]
              ])
            ])
          ]),
          vue.createCommentVNode(" end ")
        ]);
      };
    }
  };
  const PagesIndexRefister = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/index/refister.vue"]]);
  const getNewList = (params) => request({
    url: `/messages/page`,
    //3代表快递员端接口
    method: "get",
    params
  });
  const msgRead = (id) => request({
    url: `/messages/${id}`,
    method: "put"
  });
  const _sfc_main$h = {
    __name: "announcement",
    props: {
      scrollH: {
        type: Number,
        default: 0
      }
    },
    emits: ["handleSearch"],
    setup(__props, { expose, emit }) {
      let loadingText = vue.ref("");
      let loading = vue.ref(false);
      let itemData = vue.ref([]);
      const emptyData = "暂无数据";
      vue.onMounted(() => {
        init();
      });
      const init = () => {
        getList();
      };
      const params = vue.ref({
        contentType: "200",
        page: 1,
        pageSize: 10
      });
      const getList = async () => {
        await getNewList(params.value).then((res) => {
          if (res.code === 200) {
            itemData.value = res.data.items;
          }
        }).catch((err) => {
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
      const dataAdd = () => {
        this.loadingText = "没有更多了";
        this.loading = true;
      };
      const lower = () => {
        loadingText.value = "数据加载中...";
        loading.value = true;
        dataAdd();
      };
      const handleClick = async (item) => {
        await msgRead(item.id);
      };
      expose({
        getList
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度"),
            vue.createElementVNode(
              "scroll-view",
              {
                "scroll-y": "true",
                onScrolltolower: lower
              },
              [
                vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                  vue.createElementVNode("view", { class: "boxCon" }, [
                    vue.createElementVNode("view", { class: "tabConList" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(vue.unref(itemData), (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "item",
                            key: index
                          }, [
                            vue.createElementVNode("view", {
                              onClick: ($event) => handleClick(item)
                            }, [
                              vue.createElementVNode(
                                "view",
                                {
                                  class: vue.normalizeClass(["text", item.isRead === 0 ? "active" : ""])
                                },
                                [
                                  vue.createElementVNode("icon"),
                                  vue.createTextVNode(
                                    " " + vue.toDisplayString(item.title),
                                    1
                                    /* TEXT */
                                  )
                                ],
                                2
                                /* CLASS */
                              ),
                              vue.createElementVNode(
                                "text",
                                { class: "time" },
                                vue.toDisplayString(item.created),
                                1
                                /* TEXT */
                              )
                            ], 8, ["onClick"])
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]),
                  vue.createCommentVNode(" 暂时先不做，后期做 "),
                  vue.createCommentVNode(' <ReachBottom v-if="loading" :loadingText="loadingText"></ReachBottom> ')
                ])) : (vue.openBlock(), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  [
                    vue.createCommentVNode(" 无数据显示 "),
                    vue.createElementVNode("view", null, [
                      vue.createVNode(EmptyPage, { emptyInfo: emptyData })
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )),
                vue.createCommentVNode(" end ")
              ],
              32
              /* HYDRATE_EVENTS */
            )
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const Announcement = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/message/components/announcement.vue"]]);
  const _sfc_main$g = {
    __name: "notification",
    setup(__props) {
      const pages2 = getCurrentPages();
      const currentPage = pages2[pages2.length - 1].$page.options;
      currentPage.title;
      currentPage.type;
      const loadMore = vue.ref();
      const emptyData = vue.ref("暂无消息");
      vue.ref("全部已读");
      let pageNumber = vue.ref(1);
      let pageSize = vue.ref(10);
      let totalPage = vue.ref(0);
      vue.ref(false);
      let scrollH = vue.ref(null);
      let currentPageData = vue.ref([]);
      let itemData = vue.ref([]);
      vue.ref([]);
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
        getList();
      });
      const params = vue.ref({
        contentType: "201",
        page: 1,
        pageSize: 10
      });
      const getList = async () => {
        await getNewList(params.value).then((res) => {
          if (res.code === 200) {
            itemData.value = res.data.items;
          }
        }).catch((err) => {
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
      const handleDetail = async (item) => {
        await msgRead(item.id).then((res) => {
          uni.navigateTo({
            url: "/pages/message/details?obj=" + JSON.stringify(item)
          });
        }).catch((err) => {
          return uni.showToast({
            title: err.msg,
            duration: 1e3,
            icon: "none"
          });
        });
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 垂直滚动区域  scroll和swiper的高度都要给且是一样的高度"),
            vue.createElementVNode("scroll-view", {
              "scroll-y": "true",
              class: "scrollSet"
            }, [
              vue.createCommentVNode(" 列表 "),
              vue.createElementVNode("view", { class: "newBox" }, [
                vue.unref(itemData).length > 0 ? (vue.openBlock(), vue.createElementBlock(
                  "scroll-view",
                  {
                    key: 0,
                    "scroll-y": "true",
                    style: vue.normalizeStyle({ height: vue.unref(scrollH) + "px" })
                  },
                  [
                    vue.createElementVNode("view", { class: "systemList" }, [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(vue.unref(itemData), (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "boxBg item",
                            key: index
                          }, [
                            vue.createElementVNode(
                              "view",
                              {
                                class: vue.normalizeClass(["tit", item.isRead === 0 ? "active" : ""])
                              },
                              [
                                vue.createTextVNode(" 您有一个新的运输任务 "),
                                vue.createElementVNode("icon")
                              ],
                              2
                              /* CLASS */
                            ),
                            vue.createElementVNode("view", {
                              class: "address",
                              innerHTML: item.content
                            }, null, 8, ["innerHTML"]),
                            vue.createElementVNode("view", { class: "time" }, [
                              vue.createElementVNode(
                                "text",
                                null,
                                vue.toDisplayString(item.created),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("button", {
                                class: "uni-btn redBtn",
                                onClick: ($event) => handleDetail(item)
                              }, "查看详情", 8, ["onClick"])
                            ])
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    vue.createElementVNode("view", { style: { "height": "50rpx" } }, [
                      vue.createCommentVNode(" 下面的加载更多有问题 先占位 ")
                    ])
                  ],
                  4
                  /* STYLE */
                )) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                  vue.createVNode(EmptyPage, { emptyData: emptyData.value }, null, 8, ["emptyData"])
                ]))
              ])
            ])
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const Notification = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-227c4a34"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/message/components/notification.vue"]]);
  const _sfc_main$f = {
    __name: "index",
    setup(__props) {
      const announcement = vue.ref();
      const notificat = vue.ref();
      vue.ref("消息");
      vue.ref("- 没有找到相关内容 -");
      const tabBars = vue.reactive(["公告", "系统通知"]);
      let scrollinto = vue.ref("tab0");
      let tabIndex = vue.ref(1);
      let scrollH = vue.ref(0);
      vue.onMounted(() => {
        uni.getSystemInfo({
          success: (res) => {
            scrollH.value = res.windowHeight - uni.upx2px(630);
          }
        });
      });
      const changeTab = (index) => {
        if (tabIndex.value == index) {
          return;
        }
        if (index === 0) {
          announcement.value.getList();
        }
        tabIndex.value = index;
        scrollinto.value = "tab" + index;
      };
      const getTabIndex = (val) => {
        tabIndex.value = val;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 自定义头部 "),
            vue.createElementVNode("view", { class: "navHead" }),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" 列表 "),
            vue.createElementVNode("view", { class: "pageBox newBox" }, [
              vue.createCommentVNode(" 搜索列表 "),
              vue.createElementVNode("scroll-view", {
                "scroll-x": "true",
                class: "tabScroll",
                "scroll-into-view": vue.unref(scrollinto),
                "scroll-with-animation": true
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(tabBars, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      id: "tab" + index,
                      class: "scroll-row-item"
                    }, [
                      vue.createElementVNode("view", {
                        class: vue.normalizeClass(vue.unref(tabIndex) == index ? "scroll-row-item-act" : ""),
                        onClick: ($event) => changeTab(index)
                      }, [
                        vue.createElementVNode("text", { class: "line" }),
                        vue.createTextVNode(
                          " " + vue.toDisplayString(item),
                          1
                          /* TEXT */
                        )
                      ], 10, ["onClick"])
                    ], 8, ["id"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 8, ["scroll-into-view"]),
              vue.createCommentVNode('  滑块内容 对应的是顶部选项卡的切换 :current="tabIndex"  设置的是y方向上可以滚动'),
              vue.createElementVNode("view", { class: "homeSwiper" }, [
                vue.createCommentVNode(" 公告 "),
                vue.withDirectives(vue.createVNode(
                  Announcement,
                  {
                    ref_key: "announcement",
                    ref: announcement
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, vue.unref(tabIndex) == 0]
                ]),
                vue.createCommentVNode(" end "),
                vue.createCommentVNode(" 系统通知 "),
                vue.withDirectives(vue.createVNode(
                  Notification,
                  {
                    ref_key: "notificat",
                    ref: notificat,
                    onGetTabIndex: getTabIndex
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vShow, vue.unref(tabIndex) == 1]
                ]),
                vue.createCommentVNode(" end "),
                vue.createCommentVNode(" </swiper> ")
              ]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" footer "),
            vue.createVNode(UniFooter, { pagePath: "pages/index/index" }),
            vue.createCommentVNode(" end ")
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesMessageIndex = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/message/index.vue"]]);
  const _sfc_main$e = {
    __name: "details",
    setup(__props) {
      const title = vue.ref("详情");
      const pages2 = getCurrentPages();
      const currentPage = pages2[pages2.length - 1];
      let objData = vue.ref(JSON.parse(currentPage.$page.options.obj));
      vue.onMounted((e) => {
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 自定义头部 "),
            vue.createVNode(DetailsNav, { title: title.value }, null, 8, ["title"]),
            vue.createCommentVNode(" end "),
            vue.createCommentVNode(" 正文 "),
            vue.createElementVNode("view", { class: "newDetail" }, [
              vue.createElementVNode(
                "view",
                { class: "tit" },
                vue.toDisplayString(vue.unref(objData).title),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "time" },
                vue.toDisplayString(vue.unref(taskTimeFormat)(vue.unref(objData).created)),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                null,
                vue.toDisplayString(vue.unref(objData).content),
                1
                /* TEXT */
              )
            ]),
            vue.createCommentVNode(" end ")
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesMessageDetails = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-df571e12"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/message/details.vue"]]);
  const _imports_0$3 = "/static/sj_userIcon.png";
  const _sfc_main$d = {
    __name: "TaskInfo",
    props: {
      title: {
        // 是否展示标题  两个地方用一个有一个没用
        type: Boolean,
        default: true
      },
      data: {
        // 任务数据
        type: Object,
        default: {}
      }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "teskInfo" }, [
          __props.title ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "title"
          }, [
            vue.createElementVNode("text", null, " - 本月任务 - ")
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "info" }, [
            vue.createElementVNode("view", { class: "cl" }, [
              vue.createElementVNode(
                "view",
                { class: "num" },
                vue.toDisplayString(__props.data.taskAmounts),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "title" }, "任务总量")
            ]),
            vue.createElementVNode("view", { class: "cl" }, [
              vue.createElementVNode(
                "view",
                { class: "num" },
                vue.toDisplayString(__props.data.completedAmounts),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "title" }, "完成任务量")
            ]),
            vue.createElementVNode("view", { class: "cl" }, [
              vue.createElementVNode(
                "view",
                { class: "num" },
                vue.toDisplayString(__props.data.transportMileage),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "title" }, "运输里程(km)")
            ])
          ])
        ]);
      };
    }
  };
  const TaskInfo = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-c24f0a09"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/components/TaskInfo.vue"]]);
  const _sfc_main$c = {
    __name: "index",
    setup(__props) {
      const taskData = vue.ref({});
      const userInfo = vue.ref({});
      vue.onMounted(() => {
        getUser();
        getTask();
      });
      async function getUser() {
        await getUserInfo().then((res) => {
          if (res.code == 200) {
            userInfo.value = res.data;
          } else {
            return uni.showToast({
              title: data.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      }
      async function getTask() {
        const date = new Date();
        const params = {
          year: date.getFullYear(),
          month: date.getMonth() + 1 < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        };
        await getTaskData(params).then((res) => {
          if (res.code == 200) {
            taskData.value = res.data;
          } else {
            return uni.showToast({
              title: data.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      }
      function goDetails(url) {
        uni.navigateTo({
          url
        });
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" start "),
            vue.createElementVNode("view", { class: "userContainer" }, [
              vue.createCommentVNode(" 我的信息 "),
              vue.createElementVNode("view", { class: "topbackground" }, [
                vue.createElementVNode("view", { class: "myInfo" }, [
                  vue.createElementVNode("image", {
                    src: _imports_0$3,
                    class: "userIcon",
                    mode: ""
                  }),
                  vue.createElementVNode(
                    "text",
                    { class: "title" },
                    vue.toDisplayString(userInfo.value.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    "司机编号：" + vue.toDisplayString(userInfo.value.number),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    "手机号：" + vue.toDisplayString(userInfo.value.phone),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              vue.createElementVNode("view", { class: "container" }, [
                vue.createCommentVNode(" 本月任务信息 "),
                vue.createVNode(TaskInfo, { data: taskData.value }, null, 8, ["data"]),
                vue.createCommentVNode(" end "),
                vue.createCommentVNode(" 取件状态列表 "),
                vue.createElementVNode("view", { class: "navList" }, [
                  vue.createElementVNode("view", {
                    class: "line",
                    onClick: _cache[0] || (_cache[0] = ($event) => goDetails(`/pages/user/carrier?type=carInfo&title=车辆信息`))
                  }, [
                    vue.createElementVNode("text", null, "车辆信息"),
                    vue.createElementVNode("image", {
                      class: "icon",
                      src: "/static/sj_open_rit.png",
                      mode: ""
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "line",
                    onClick: _cache[1] || (_cache[1] = ($event) => goDetails(`/pages/user/carrier?type=taskData&title=任务数据`))
                  }, [
                    vue.createElementVNode("text", null, "任务数据"),
                    vue.createElementVNode("image", {
                      class: "icon",
                      src: "/static/sj_open_rit.png",
                      mode: ""
                    })
                  ]),
                  vue.createElementVNode("view", {
                    class: "line",
                    onClick: _cache[2] || (_cache[2] = ($event) => goDetails(`/pages/user/carrier?type=systmSet&title=系统设置`))
                  }, [
                    vue.createElementVNode("text", null, "系统设置"),
                    vue.createElementVNode("image", {
                      class: "icon",
                      src: "/static/sj_open_rit.png",
                      mode: ""
                    })
                  ])
                ])
              ])
            ]),
            vue.createCommentVNode(" footer "),
            vue.createVNode(UniFooter, { pagePath: "pages/index/index" }),
            vue.createCommentVNode(" end ")
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesUserIndex = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-79e6a490"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/index.vue"]]);
  const _imports_0$2 = "/static/sj_demo_carImg.jpg";
  const _sfc_main$b = {
    __name: "CarInfo",
    setup(__props) {
      const data2 = vue.ref({});
      vue.onMounted(async () => {
        await getCarInfo().then((res) => {
          if (res.code == 200) {
            if (res.data == null) {
              return false;
            }
            data2.value = res.data;
          } else {
            return uni.showToast({
              title: data2.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "carInfo" }, [
              vue.createElementVNode("image", {
                class: "carImage",
                src: _imports_0$2,
                mode: ""
              }),
              vue.createElementVNode("view", { class: "info" }, [
                vue.createElementVNode("view", { class: "line" }, [
                  vue.createElementVNode("text", { class: "tit" }, "车辆编号"),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(data2.value.id),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "line" }, [
                  vue.createElementVNode("text", { class: "tit" }, "车辆号牌"),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(data2.value.licensePlate),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "line" }, [
                  vue.createElementVNode("text", { class: "tit" }, "车型"),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(data2.value.truckType),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "line" }, [
                  vue.createElementVNode("text", { class: "tit" }, "载重"),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(data2.value.allowableLoad) + "吨",
                    1
                    /* TEXT */
                  )
                ])
              ])
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const CarInfo = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-4022c293"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/components/CarInfo.vue"]]);
  var calendar = {
    /**
        * 农历1900-2100的润大小信息表
        * @Array Of Property
        * @return Hex
        */
    lunarInfo: [
      19416,
      19168,
      42352,
      21717,
      53856,
      55632,
      91476,
      22176,
      39632,
      21970,
      // 1900-1909
      19168,
      42422,
      42192,
      53840,
      119381,
      46400,
      54944,
      44450,
      38320,
      84343,
      // 1910-1919
      18800,
      42160,
      46261,
      27216,
      27968,
      109396,
      11104,
      38256,
      21234,
      18800,
      // 1920-1929
      25958,
      54432,
      59984,
      28309,
      23248,
      11104,
      100067,
      37600,
      116951,
      51536,
      // 1930-1939
      54432,
      120998,
      46416,
      22176,
      107956,
      9680,
      37584,
      53938,
      43344,
      46423,
      // 1940-1949
      27808,
      46416,
      86869,
      19872,
      42416,
      83315,
      21168,
      43432,
      59728,
      27296,
      // 1950-1959
      44710,
      43856,
      19296,
      43748,
      42352,
      21088,
      62051,
      55632,
      23383,
      22176,
      // 1960-1969
      38608,
      19925,
      19152,
      42192,
      54484,
      53840,
      54616,
      46400,
      46752,
      103846,
      // 1970-1979
      38320,
      18864,
      43380,
      42160,
      45690,
      27216,
      27968,
      44870,
      43872,
      38256,
      // 1980-1989
      19189,
      18800,
      25776,
      29859,
      59984,
      27480,
      23232,
      43872,
      38613,
      37600,
      // 1990-1999
      51552,
      55636,
      54432,
      55888,
      30034,
      22176,
      43959,
      9680,
      37584,
      51893,
      // 2000-2009
      43344,
      46240,
      47780,
      44368,
      21977,
      19360,
      42416,
      86390,
      21168,
      43312,
      // 2010-2019
      31060,
      27296,
      44368,
      23378,
      19296,
      42726,
      42208,
      53856,
      60005,
      54576,
      // 2020-2029
      23200,
      30371,
      38608,
      19195,
      19152,
      42192,
      118966,
      53840,
      54560,
      56645,
      // 2030-2039
      46496,
      22224,
      21938,
      18864,
      42359,
      42160,
      43600,
      111189,
      27936,
      44448,
      // 2040-2049
      /** Add By JJonline@JJonline.Cn**/
      84835,
      37744,
      18936,
      18800,
      25776,
      92326,
      59984,
      27424,
      108228,
      43744,
      // 2050-2059
      41696,
      53987,
      51552,
      54615,
      54432,
      55888,
      23893,
      22176,
      42704,
      21972,
      // 2060-2069
      21200,
      43448,
      43344,
      46240,
      46758,
      44368,
      21920,
      43940,
      42416,
      21168,
      // 2070-2079
      45683,
      26928,
      29495,
      27296,
      44368,
      84821,
      19296,
      42352,
      21732,
      53600,
      // 2080-2089
      59752,
      54560,
      55968,
      92838,
      22224,
      19168,
      43476,
      41680,
      53584,
      62034,
      // 2090-2099
      54560
    ],
    // 2100
    /**
        * 公历每个月份的天数普通表
        * @Array Of Property
        * @return Number
        */
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /**
        * 天干地支之天干速查表
        * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
        * @return Cn string
        */
    Gan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    /**
        * 天干地支之地支速查表
        * @Array Of Property
        * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
        * @return Cn string
        */
    Zhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    /**
        * 天干地支之地支速查表<=>生肖
        * @Array Of Property
        * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
        * @return Cn string
        */
    Animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
    /**
        * 24节气速查表
        * @Array Of Property
        * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
        * @return Cn string
        */
    solarTerm: ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"],
    /**
        * 1900-2100各年的24节气日期速查表
        * @Array Of Property
        * @return 0x string For splice
        */
    sTermInfo: [
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd0b06bdb0722c965ce1cfcc920f",
      "b027097bd097c36b0b6fc9274c91aa",
      "9778397bd19801ec9210c965cc920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd09801d98082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd197c36c9210c9274c91aa",
      "97b6b97bd19801ec95f8c965cc920e",
      "97bd09801d98082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec95f8c965cc920e",
      "97bcf97c3598082c95f8e1cfcc920f",
      "97bd097bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c3598082c95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf97c359801ec95f8c965cc920f",
      "97bd097bd07f595b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "9778397bd19801ec9210c9274c920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd07f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c920e",
      "97b6b97bd19801ec95f8c965cc920f",
      "97bd07f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bd07f1487f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c965cc920e",
      "97bcf7f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b97bd19801ec9210c9274c920e",
      "97bcf7f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c91aa",
      "97b6b97bd197c36c9210c9274c920e",
      "97bcf7f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36c9210c9274c920e",
      "97b6b7f0e47f531b0723b0b6fb0722",
      "7f0e37f5307f595b0b0bc920fb0722",
      "7f0e397bd097c36b0b6fc9210c8dc2",
      "9778397bd097c36b0b70c9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9274c91aa",
      "97b6b7f0e47f531b0723b0787b0721",
      "7f0e27f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c91aa",
      "97b6b7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "9778397bd097c36b0b6fc9210c8dc2",
      "977837f0e37f149b0723b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f5307f595b0b0bc920fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "977837f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc9210c8dc2",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd097c35b0b6fc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0787b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0b0bb0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14998082b0723b06bd",
      "7f07e7f0e37f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e397bd07f595b0b0bc920fb0722",
      "977837f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f1487f595b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e37f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e37f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f1487f531b0b0bb0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0723b06bd",
      "7f07e7f0e47f149b0723b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14998082b0723b06bd",
      "7f07e7f0e37f14998083b0787b0721",
      "7f0e27f0e47f531b0723b0b6fb0722",
      "7f0e37f0e366aa89801eb072297c35",
      "7ec967f0e37f14898082b0723b02d5",
      "7f07e7f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e36665b66aa89801e9808297c35",
      "665f67f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b0721",
      "7f07e7f0e47f531b0723b0b6fb0722",
      "7f0e36665b66a449801e9808297c35",
      "665f67f0e37f14898082b0723b02d5",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e36665b66a449801e9808297c35",
      "665f67f0e37f14898082b072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e26665b66a449801e9808297c35",
      "665f67f0e37f1489801eb072297c35",
      "7ec967f0e37f14998082b0787b06bd",
      "7f07e7f0e47f531b0723b0b6fb0721",
      "7f0e27f1487f531b0b0bb0b6fb0722"
    ],
    /**
        * 数字转中文速查表
        * @Array Of Property
        * @trans ['日','一','二','三','四','五','六','七','八','九','十']
        * @return Cn string
        */
    nStr1: ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
    /**
        * 日期转农历称呼速查表
        * @Array Of Property
        * @trans ['初','十','廿','卅']
        * @return Cn string
        */
    nStr2: ["初", "十", "廿", "卅"],
    /**
        * 月份转农历称呼速查表
        * @Array Of Property
        * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
        * @return Cn string
        */
    nStr3: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
    /**
        * 返回农历y年一整年的总天数
        * @param lunar Year
        * @return Number
        * @eg:var count = calendar.lYearDays(1987) ;//count=387
        */
    lYearDays: function(y2) {
      var i2;
      var sum = 348;
      for (i2 = 32768; i2 > 8; i2 >>= 1) {
        sum += this.lunarInfo[y2 - 1900] & i2 ? 1 : 0;
      }
      return sum + this.leapDays(y2);
    },
    /**
        * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
        * @param lunar Year
        * @return Number (0-12)
        * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
        */
    leapMonth: function(y2) {
      return this.lunarInfo[y2 - 1900] & 15;
    },
    /**
        * 返回农历y年闰月的天数 若该年没有闰月则返回0
        * @param lunar Year
        * @return Number (0、29、30)
        * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
        */
    leapDays: function(y2) {
      if (this.leapMonth(y2)) {
        return this.lunarInfo[y2 - 1900] & 65536 ? 30 : 29;
      }
      return 0;
    },
    /**
        * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
        * @param lunar Year
        * @return Number (-1、29、30)
        * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
        */
    monthDays: function(y2, m2) {
      if (m2 > 12 || m2 < 1) {
        return -1;
      }
      return this.lunarInfo[y2 - 1900] & 65536 >> m2 ? 30 : 29;
    },
    /**
        * 返回公历(!)y年m月的天数
        * @param solar Year
        * @return Number (-1、28、29、30、31)
        * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
        */
    solarDays: function(y2, m2) {
      if (m2 > 12 || m2 < 1) {
        return -1;
      }
      var ms2 = m2 - 1;
      if (ms2 == 1) {
        return y2 % 4 == 0 && y2 % 100 != 0 || y2 % 400 == 0 ? 29 : 28;
      } else {
        return this.solarMonth[ms2];
      }
    },
    /**
       * 农历年份转换为干支纪年
       * @param  lYear 农历年的年份数
       * @return Cn string
       */
    toGanZhiYear: function(lYear) {
      var ganKey = (lYear - 3) % 10;
      var zhiKey = (lYear - 3) % 12;
      if (ganKey == 0)
        ganKey = 10;
      if (zhiKey == 0)
        zhiKey = 12;
      return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
    },
    /**
       * 公历月、日判断所属星座
       * @param  cMonth [description]
       * @param  cDay [description]
       * @return Cn string
       */
    toAstro: function(cMonth, cDay) {
      var s2 = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return s2.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "座";
    },
    /**
        * 传入offset偏移量返回干支
        * @param offset 相对甲子的偏移量
        * @return Cn string
        */
    toGanZhi: function(offset) {
      return this.Gan[offset % 10] + this.Zhi[offset % 12];
    },
    /**
        * 传入公历(!)y年获得该年第n个节气的公历日期
        * @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
        * @return day Number
        * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
        */
    getTerm: function(y2, n2) {
      if (y2 < 1900 || y2 > 2100) {
        return -1;
      }
      if (n2 < 1 || n2 > 24) {
        return -1;
      }
      var _table = this.sTermInfo[y2 - 1900];
      var _info = [
        parseInt("0x" + _table.substr(0, 5)).toString(),
        parseInt("0x" + _table.substr(5, 5)).toString(),
        parseInt("0x" + _table.substr(10, 5)).toString(),
        parseInt("0x" + _table.substr(15, 5)).toString(),
        parseInt("0x" + _table.substr(20, 5)).toString(),
        parseInt("0x" + _table.substr(25, 5)).toString()
      ];
      var _calday = [
        _info[0].substr(0, 1),
        _info[0].substr(1, 2),
        _info[0].substr(3, 1),
        _info[0].substr(4, 2),
        _info[1].substr(0, 1),
        _info[1].substr(1, 2),
        _info[1].substr(3, 1),
        _info[1].substr(4, 2),
        _info[2].substr(0, 1),
        _info[2].substr(1, 2),
        _info[2].substr(3, 1),
        _info[2].substr(4, 2),
        _info[3].substr(0, 1),
        _info[3].substr(1, 2),
        _info[3].substr(3, 1),
        _info[3].substr(4, 2),
        _info[4].substr(0, 1),
        _info[4].substr(1, 2),
        _info[4].substr(3, 1),
        _info[4].substr(4, 2),
        _info[5].substr(0, 1),
        _info[5].substr(1, 2),
        _info[5].substr(3, 1),
        _info[5].substr(4, 2)
      ];
      return parseInt(_calday[n2 - 1]);
    },
    /**
        * 传入农历数字月份返回汉语通俗表示法
        * @param lunar month
        * @return Cn string
        * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
        */
    toChinaMonth: function(m2) {
      if (m2 > 12 || m2 < 1) {
        return -1;
      }
      var s2 = this.nStr3[m2 - 1];
      s2 += "月";
      return s2;
    },
    /**
        * 传入农历日期数字返回汉字表示法
        * @param lunar day
        * @return Cn string
        * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
        */
    toChinaDay: function(d2) {
      var s2;
      switch (d2) {
        case 10:
          s2 = "初十";
          break;
        case 20:
          s2 = "二十";
          break;
        case 30:
          s2 = "三十";
          break;
        default:
          s2 = this.nStr2[Math.floor(d2 / 10)];
          s2 += this.nStr1[d2 % 10];
      }
      return s2;
    },
    /**
        * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
        * @param y year
        * @return Cn string
        * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
        */
    getAnimal: function(y2) {
      return this.Animals[(y2 - 4) % 12];
    },
    /**
        * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
        * @param y  solar year
        * @param m  solar month
        * @param d  solar day
        * @return JSON object
        * @eg:__f__('log','at pages/user/components/Calendar/components/uni-calendar/calendar.js:381',calendar.solar2lunar(1987,11,01));
        */
    solar2lunar: function(y2, m2, d2) {
      if (y2 < 1900 || y2 > 2100) {
        return -1;
      }
      if (y2 == 1900 && m2 == 1 && d2 < 31) {
        return -1;
      }
      if (!y2) {
        var objDate = new Date();
      } else {
        var objDate = new Date(y2, parseInt(m2) - 1, d2);
      }
      var i2;
      var leap = 0;
      var temp = 0;
      var y2 = objDate.getFullYear();
      var m2 = objDate.getMonth() + 1;
      var d2 = objDate.getDate();
      var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 864e5;
      for (i2 = 1900; i2 < 2101 && offset > 0; i2++) {
        temp = this.lYearDays(i2);
        offset -= temp;
      }
      if (offset < 0) {
        offset += temp;
        i2--;
      }
      var isTodayObj = new Date();
      var isToday = false;
      if (isTodayObj.getFullYear() == y2 && isTodayObj.getMonth() + 1 == m2 && isTodayObj.getDate() == d2) {
        isToday = true;
      }
      var nWeek = objDate.getDay();
      var cWeek = this.nStr1[nWeek];
      if (nWeek == 0) {
        nWeek = 7;
      }
      var year = i2;
      var leap = this.leapMonth(i2);
      var isLeap = false;
      for (i2 = 1; i2 < 13 && offset > 0; i2++) {
        if (leap > 0 && i2 == leap + 1 && isLeap == false) {
          --i2;
          isLeap = true;
          temp = this.leapDays(year);
        } else {
          temp = this.monthDays(year, i2);
        }
        if (isLeap == true && i2 == leap + 1) {
          isLeap = false;
        }
        offset -= temp;
      }
      if (offset == 0 && leap > 0 && i2 == leap + 1) {
        if (isLeap) {
          isLeap = false;
        } else {
          isLeap = true;
          --i2;
        }
      }
      if (offset < 0) {
        offset += temp;
        --i2;
      }
      var month = i2;
      var day = offset + 1;
      var sm = m2 - 1;
      var gzY = this.toGanZhiYear(year);
      var firstNode = this.getTerm(y2, m2 * 2 - 1);
      var secondNode = this.getTerm(y2, m2 * 2);
      var gzM = this.toGanZhi((y2 - 1900) * 12 + m2 + 11);
      if (d2 >= firstNode) {
        gzM = this.toGanZhi((y2 - 1900) * 12 + m2 + 12);
      }
      var isTerm = false;
      var Term = null;
      if (firstNode == d2) {
        isTerm = true;
        Term = this.solarTerm[m2 * 2 - 2];
      }
      if (secondNode == d2) {
        isTerm = true;
        Term = this.solarTerm[m2 * 2 - 1];
      }
      var dayCyclical = Date.UTC(y2, sm, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10;
      var gzD = this.toGanZhi(dayCyclical + d2 - 1);
      var astro = this.toAstro(m2, d2);
      return { "lYear": year, "lMonth": month, "lDay": day, "Animal": this.getAnimal(year), "IMonthCn": (isLeap ? "闰" : "") + this.toChinaMonth(month), "IDayCn": this.toChinaDay(day), "cYear": y2, "cMonth": m2, "cDay": d2, "gzYear": gzY, "gzMonth": gzM, "gzDay": gzD, "isToday": isToday, "isLeap": isLeap, "nWeek": nWeek, "ncWeek": "星期" + cWeek, "isTerm": isTerm, "Term": Term, "astro": astro };
    },
    /**
        * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
        * @param y  lunar year
        * @param m  lunar month
        * @param d  lunar day
        * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
        * @return JSON object
        * @eg:__f__('log','at pages/user/components/Calendar/components/uni-calendar/calendar.js:500',calendar.lunar2solar(1987,9,10));
        */
    lunar2solar: function(y2, m2, d2, isLeapMonth) {
      var isLeapMonth = !!isLeapMonth;
      var leapMonth = this.leapMonth(y2);
      this.leapDays(y2);
      if (isLeapMonth && leapMonth != m2) {
        return -1;
      }
      if (y2 == 2100 && m2 == 12 && d2 > 1 || y2 == 1900 && m2 == 1 && d2 < 31) {
        return -1;
      }
      var day = this.monthDays(y2, m2);
      var _day = day;
      if (isLeapMonth) {
        _day = this.leapDays(y2, m2);
      }
      if (y2 < 1900 || y2 > 2100 || d2 > _day) {
        return -1;
      }
      var offset = 0;
      for (var i2 = 1900; i2 < y2; i2++) {
        offset += this.lYearDays(i2);
      }
      var leap = 0;
      var isAdd = false;
      for (var i2 = 1; i2 < m2; i2++) {
        leap = this.leapMonth(y2);
        if (!isAdd) {
          if (leap <= i2 && leap > 0) {
            offset += this.leapDays(y2);
            isAdd = true;
          }
        }
        offset += this.monthDays(y2, i2);
      }
      if (isLeapMonth) {
        offset += day;
      }
      var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
      var calObj = new Date((offset + d2 - 31) * 864e5 + stmap);
      var cY = calObj.getUTCFullYear();
      var cM = calObj.getUTCMonth() + 1;
      var cD = calObj.getUTCDate();
      return this.solar2lunar(cY, cM, cD);
    }
  };
  let Calendar$1 = class Calendar {
    constructor({
      date,
      selected,
      startDate,
      endDate,
      range
    } = {}) {
      this.date = this.getDate(new Date());
      this.selected = selected || [];
      this.startDate = startDate;
      this.endDate = endDate;
      this.range = range;
      this.cleanMultipleStatus();
      this.weeks = {};
    }
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      this.selectDate = this.getDate(date);
      this._getWeek(this.selectDate.fullDate);
    }
    /**
     * 清理多选状态
     */
    cleanMultipleStatus() {
      this.multipleStatus = {
        before: "",
        after: "",
        data: []
      };
    }
    /**
     * 重置开始日期
     */
    resetSatrtDate(startDate) {
      this.startDate = startDate;
    }
    /**
     * 重置结束日期
     */
    resetEndDate(endDate) {
      this.endDate = endDate;
    }
    /**
     * 获取任意时间
     */
    getDate(date, AddDayCount = 0, str = "day") {
      if (!date) {
        date = new Date();
      }
      if (typeof date !== "object") {
        date = date.replace(/-/g, "/");
      }
      const dd = new Date(date);
      switch (str) {
        case "day":
          dd.setDate(dd.getDate() + AddDayCount);
          break;
        case "month":
          if (dd.getDate() === 31) {
            dd.setDate(dd.getDate() + AddDayCount);
          } else {
            dd.setMonth(dd.getMonth() + AddDayCount);
          }
          break;
        case "year":
          dd.setFullYear(dd.getFullYear() + AddDayCount);
          break;
      }
      const y2 = dd.getFullYear();
      const m2 = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      const d2 = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      return {
        fullDate: y2 + "-" + m2 + "-" + d2,
        year: y2,
        month: m2,
        date: d2,
        day: dd.getDay()
      };
    }
    /**
     * 获取上月剩余天数
     */
    _getLastMonthDays(firstDay, full) {
      let dateArr = [];
      for (let i2 = firstDay; i2 > 0; i2--) {
        const beforeDate = new Date(full.year, full.month - 1, -i2 + 1).getDate();
        dateArr.push({
          date: beforeDate,
          month: full.month - 1,
          lunar: this.getlunar(full.year, full.month - 1, beforeDate),
          disable: true
        });
      }
      return dateArr;
    }
    /**
     * 获取本月天数
     */
    _currentMonthDys(dateData, full) {
      let dateArr = [];
      let fullDate = this.date.fullDate;
      for (let i2 = 1; i2 <= dateData; i2++) {
        let nowDate = full.year + "-" + (full.month < 10 ? full.month : full.month) + "-" + (i2 < 10 ? "0" + i2 : i2);
        let isDay = fullDate === nowDate;
        let info = this.selected && this.selected.find((item) => {
          if (this.dateEqual(nowDate, item.date)) {
            return item;
          }
        });
        let disableBefore = true;
        let disableAfter = true;
        if (this.startDate) {
          disableBefore = this.dateCompare(this.startDate, nowDate);
        }
        if (this.endDate) {
          disableAfter = this.dateCompare(nowDate, this.endDate);
        }
        let multiples = this.multipleStatus.data;
        let checked = false;
        let multiplesStatus = -1;
        if (this.range) {
          if (multiples) {
            multiplesStatus = multiples.findIndex((item) => {
              return this.dateEqual(item, nowDate);
            });
          }
          if (multiplesStatus !== -1) {
            checked = true;
          }
        }
        let data2 = {
          fullDate: nowDate,
          year: full.year,
          date: i2,
          multiple: this.range ? checked : false,
          beforeMultiple: this.dateEqual(this.multipleStatus.before, nowDate),
          afterMultiple: this.dateEqual(this.multipleStatus.after, nowDate),
          month: full.month,
          lunar: this.getlunar(full.year, full.month, i2),
          disable: !(disableBefore && disableAfter),
          isDay
        };
        if (info) {
          data2.extraInfo = info;
        }
        dateArr.push(data2);
      }
      return dateArr;
    }
    /**
     * 获取下月天数
     */
    _getNextMonthDays(surplus, full) {
      let dateArr = [];
      for (let i2 = 1; i2 < surplus + 1; i2++) {
        dateArr.push({
          date: i2,
          month: Number(full.month) + 1,
          lunar: this.getlunar(full.year, Number(full.month) + 1, i2),
          disable: true
        });
      }
      return dateArr;
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */
    getInfo(date) {
      if (!date) {
        date = new Date();
      }
      const dateInfo = this.canlender.find((item) => item.fullDate === this.getDate(date).fullDate);
      return dateInfo;
    }
    /**
     * 比较时间大小
     */
    dateCompare(startDate, endDate) {
      startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
      endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
      if (startDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 比较时间是否相等
     */
    dateEqual(before, after) {
      before = new Date(before.replace("-", "/").replace("-", "/"));
      after = new Date(after.replace("-", "/").replace("-", "/"));
      if (before.getTime() - after.getTime() === 0) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
    geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split("-");
      var ae2 = end.split("-");
      var db = new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de2 = new Date();
      de2.setFullYear(ae2[0], ae2[1] - 1, ae2[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1e3;
      var unixDe = de2.getTime() - 24 * 60 * 60 * 1e3;
      for (var k2 = unixDb; k2 <= unixDe; ) {
        k2 = k2 + 24 * 60 * 60 * 1e3;
        arr.push(this.getDate(new Date(parseInt(k2))).fullDate);
      }
      return arr;
    }
    /**
     * 计算阴历日期显示
     */
    getlunar(year, month, date) {
      return calendar.solar2lunar(year, month, date);
    }
    /**
     * 设置打点
     */
    setSelectInfo(data2, value) {
      this.selected = value;
      this._getWeek(data2);
    }
    /**
     *  获取多选状态
     */
    setMultiple(fullDate) {
      let {
        before,
        after
      } = this.multipleStatus;
      if (!this.range)
        return;
      if (before && after) {
        this.multipleStatus.before = "";
        this.multipleStatus.after = "";
        this.multipleStatus.data = [];
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
        } else {
          this.multipleStatus.after = fullDate;
          if (this.dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
        }
      }
      this._getWeek(fullDate);
    }
    /**
     * 获取每周数据
     * @param {Object} dateData
     */
    _getWeek(dateData) {
      const {
        year,
        month
      } = this.getDate(dateData);
      let firstDay = new Date(year, month - 1, 1).getDay();
      let currentDay = new Date(year, month, 0).getDate();
      let dates = {
        lastMonthDays: this._getLastMonthDays(firstDay, this.getDate(dateData)),
        // 上个月末尾几天
        currentMonthDys: this._currentMonthDys(currentDay, this.getDate(dateData)),
        // 本月天数
        nextMonthDays: [],
        // 下个月开始几天
        weeks: []
      };
      let canlender = [];
      const surplus = 42 - (dates.lastMonthDays.length + dates.currentMonthDys.length);
      dates.nextMonthDays = this._getNextMonthDays(surplus, this.getDate(dateData));
      canlender = canlender.concat(dates.lastMonthDays, dates.currentMonthDys, dates.nextMonthDays);
      let weeks = {};
      for (let i2 = 0; i2 < canlender.length; i2++) {
        if (i2 % 7 === 0) {
          weeks[parseInt(i2 / 7)] = new Array(7);
        }
        weeks[parseInt(i2 / 7)][i2 % 7] = canlender[i2];
      }
      this.canlender = canlender;
      this.weeks = weeks;
    }
    //静态方法
    // static init(date) {
    // 	if (!this.instance) {
    // 		this.instance = new Calendar(date);
    // 	}
    // 	return this.instance;
    // }
  };
  const en$1 = {
    "uni-calender.ok": "ok",
    "uni-calender.cancel": "cancel",
    "uni-calender.today": "today",
    "uni-calender.MON": "MON",
    "uni-calender.TUE": "TUE",
    "uni-calender.WED": "WED",
    "uni-calender.THU": "THU",
    "uni-calender.FRI": "FRI",
    "uni-calender.SAT": "SAT",
    "uni-calender.SUN": "SUN"
  };
  const zhHans$1 = {
    "uni-calender.ok": "确定",
    "uni-calender.cancel": "取消",
    "uni-calender.today": "今日",
    "uni-calender.SUN": "周日",
    "uni-calender.MON": "周一",
    "uni-calender.TUE": "周二",
    "uni-calender.WED": "周三",
    "uni-calender.THU": "周四",
    "uni-calender.FRI": "周五",
    "uni-calender.SAT": "周六"
  };
  const zhHant$1 = {
    "uni-calender.ok": "確定",
    "uni-calender.cancel": "取消",
    "uni-calender.today": "今日",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六"
  };
  const messages$1 = {
    en: en$1,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  const { t: t$2 } = initVueI18n(messages$1);
  const _sfc_main$a = {
    emits: ["change"],
    props: {
      weeks: {
        type: Object,
        default() {
          return {};
        }
      },
      calendar: {
        type: Object,
        default: () => {
          return {};
        }
      },
      selected: {
        type: Array,
        default: () => {
          return [];
        }
      },
      lunar: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      todayText() {
        return t$2("uni-calender.today");
      }
    },
    methods: {
      choiceDate(weeks) {
        this.$emit("change", weeks);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-calendar-item__weeks-box", {
          "uni-calendar-item--disable": $props.weeks.disable,
          "uni-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay,
          "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay,
          "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
          "uni-calendar-item--multiple": $props.weeks.multiple,
          "uni-calendar-item--after-checked": $props.weeks.afterMultiple
        }]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.choiceDate($props.weeks))
      },
      [
        vue.createElementVNode("view", { class: "uni-calendar-item__weeks-box-item" }, [
          vue.createCommentVNode(' <text v-if="selected&&weeks.extraInfo" class="uni-calendar-item__weeks-box-circle"></text> '),
          vue.createElementVNode(
            "text",
            {
              class: vue.normalizeClass(["uni-calendar-item__weeks-box-text", {
                "uni-calendar-item--isDay-text": $props.weeks.isDay,
                "uni-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay,
                "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay,
                "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
                "uni-calendar-item--multiple": $props.weeks.multiple,
                "uni-calendar-item--after-checked": $props.weeks.afterMultiple,
                "uni-calendar-item--disable": $props.weeks.disable
              }])
            },
            vue.toDisplayString($props.weeks.date),
            3
            /* TEXT, CLASS */
          ),
          !$props.lunar && !$props.weeks.extraInfo && $props.weeks.isDay ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              class: vue.normalizeClass(["uni-calendar-item__weeks-lunar-text", {
                "uni-calendar-item--isDay-text": $props.weeks.isDay,
                "uni-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay,
                "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay,
                "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
                "uni-calendar-item--multiple": $props.weeks.multiple,
                "uni-calendar-item--after-checked": $props.weeks.afterMultiple
              }])
            },
            vue.toDisplayString($options.todayText),
            3
            /* TEXT, CLASS */
          )) : vue.createCommentVNode("v-if", true),
          $props.lunar && !$props.weeks.extraInfo ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 1,
              class: vue.normalizeClass(["uni-calendar-item__weeks-lunar-text", {
                "uni-calendar-item--isDay-text": $props.weeks.isDay,
                "uni-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay,
                "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay,
                "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
                "uni-calendar-item--multiple": $props.weeks.multiple,
                "uni-calendar-item--after-checked": $props.weeks.afterMultiple,
                "uni-calendar-item--disable": $props.weeks.disable
              }])
            },
            vue.toDisplayString($props.weeks.isDay ? $options.todayText : $props.weeks.lunar.IDayCn === "初一" ? $props.weeks.lunar.IMonthCn : $props.weeks.lunar.IDayCn),
            3
            /* TEXT, CLASS */
          )) : vue.createCommentVNode("v-if", true),
          $props.weeks.extraInfo && $props.weeks.extraInfo.info ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 2,
              class: vue.normalizeClass(["uni-calendar-item__weeks-lunar-text", {
                "uni-calendar-item--extra": $props.weeks.extraInfo.info,
                "uni-calendar-item--isDay-text": $props.weeks.isDay,
                "uni-calendar-item--isDay": $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay,
                "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay,
                "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
                "uni-calendar-item--multiple": $props.weeks.multiple,
                "uni-calendar-item--after-checked": $props.weeks.afterMultiple,
                "uni-calendar-item--disable": $props.weeks.disable
              }])
            },
            vue.toDisplayString($props.weeks.extraInfo.info),
            3
            /* TEXT, CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      2
      /* CLASS */
    );
  }
  const calendarItem = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$4], ["__scopeId", "data-v-a78138e1"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/components/Calendar/components/uni-calendar/uni-calendar-item.vue"]]);
  const _imports_0$1 = "/static/sj_btn_data_lt.png";
  const _imports_1 = "/static/sj_btn_date_rt.png";
  const { t: t$1 } = initVueI18n(messages$1);
  const _sfc_main$9 = {
    components: {
      calendarItem
    },
    emits: ["close", "confirm", "change", "monthSwitch"],
    props: {
      date: {
        type: String,
        default: ""
      },
      selected: {
        type: Array,
        default() {
          return [];
        }
      },
      lunar: {
        type: Boolean,
        default: false
      },
      startDate: {
        type: String,
        default: ""
      },
      endDate: {
        type: String,
        default: ""
      },
      range: {
        type: Boolean,
        default: false
      },
      insert: {
        type: Boolean,
        default: true
      },
      showMonth: {
        type: Boolean,
        default: true
      },
      clearDate: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        show: false,
        weeks: [],
        calendar: {},
        nowDate: "",
        aniMaskShow: false
      };
    },
    computed: {
      /**
       * for i18n
       */
      okText() {
        return t$1("uni-calender.ok");
      },
      cancelText() {
        return t$1("uni-calender.cancel");
      },
      todayText() {
        return t$1("uni-calender.today");
      },
      monText() {
        return t$1("uni-calender.MON");
      },
      TUEText() {
        return t$1("uni-calender.TUE");
      },
      WEDText() {
        return t$1("uni-calender.WED");
      },
      THUText() {
        return t$1("uni-calender.THU");
      },
      FRIText() {
        return t$1("uni-calender.FRI");
      },
      SATText() {
        return t$1("uni-calender.SAT");
      },
      SUNText() {
        return t$1("uni-calender.SUN");
      }
    },
    watch: {
      date(newVal) {
        this.init(newVal);
      },
      startDate(val) {
        this.cale.resetSatrtDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      endDate(val) {
        this.cale.resetEndDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      selected(newVal) {
        this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
        this.weeks = this.cale.weeks;
      }
    },
    created() {
      this.cale = new Calendar$1({
        // date: new Date(),
        selected: this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
        range: this.range
      });
      this.init(this.date);
    },
    methods: {
      // 取消穿透
      clean() {
      },
      bindDateChange(e) {
        const value = e.detail.value + "-1";
        const date = this.cale.getDate(value);
        this.init(value);
        this.$emit("monthSwitch", {
          year: date.year,
          month: Number(date.month)
        });
      },
      /**
       * 初始化日期显示
       * @param {Object} date
       */
      init(date) {
        this.cale.setDate(date);
        this.weeks = this.cale.weeks;
        this.nowDate = this.calendar = this.cale.getInfo(date);
      },
      /**
       * 打开日历弹窗
       */
      open() {
        if (this.clearDate && !this.insert) {
          this.cale.cleanMultipleStatus();
          this.init(this.date);
        }
        this.show = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.aniMaskShow = true;
          }, 50);
        });
      },
      /**
       * 关闭日历弹窗
       */
      close() {
        this.aniMaskShow = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.show = false;
            this.$emit("close");
          }, 300);
        });
      },
      /**
       * 确认按钮
       */
      confirm() {
        this.setEmit("confirm");
        this.close();
      },
      /**
       * 变化触发
       */
      change() {
        if (!this.insert)
          return;
        this.setEmit("change");
      },
      /**
       * 选择月份触发
       */
      monthSwitch() {
        let {
          year,
          month
        } = this.nowDate;
        this.$emit("monthSwitch", {
          year,
          month: Number(month)
        });
      },
      /**
       * 派发事件
       * @param {Object} name
       */
      setEmit(name) {
        let {
          year,
          month,
          date,
          fullDate,
          lunar,
          extraInfo
        } = this.calendar;
        this.$emit(name, {
          range: this.cale.multipleStatus,
          year,
          month,
          date,
          fulldate: fullDate,
          lunar,
          extraInfo: extraInfo || {}
        });
      },
      /**
       * 选择天触发
       * @param {Object} weeks
       */
      choiceDate(weeks) {
        if (weeks.disable)
          return;
        this.calendar = weeks;
        this.cale.setMultiple(this.calendar.fullDate);
        this.weeks = this.cale.weeks;
        this.change();
      },
      /**
       * 回到今天
       */
      backtoday() {
        formatAppLog("log", "at pages/user/components/Calendar/components/uni-calendar/uni-calendar.vue:334", this.cale.getDate(new Date()).fullDate);
        let date = this.cale.getDate(new Date()).fullDate;
        this.init(date);
        this.change();
      },
      /**
       * 上个月
       */
      pre() {
        const preDate = this.cale.getDate(this.nowDate.fullDate, -1, "month").fullDate;
        this.setDate(preDate);
        this.monthSwitch();
      },
      /**
       * 下个月
       */
      next() {
        const nextDate = this.cale.getDate(this.nowDate.fullDate, 1, "month").fullDate;
        this.setDate(nextDate);
        this.monthSwitch();
      },
      /**
       * 设置日期
       * @param {Object} date
       */
      setDate(date) {
        this.cale.setDate(date);
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date);
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_calendar_item = vue.resolveComponent("calendar-item");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-calendar" }, [
      !$props.insert && $data.show ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["uni-calendar__mask", { "uni-calendar--mask-show": $data.aniMaskShow }]),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.clean && $options.clean(...args))
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      $props.insert || $data.show ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: vue.normalizeClass(["uni-calendar__content", { "uni-calendar--fixed": !$props.insert, "uni-calendar--ani-show": $data.aniMaskShow }])
        },
        [
          !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-calendar__header uni-calendar--fixed-top"
          }, [
            vue.createElementVNode("view", {
              class: "uni-calendar__header-btn-box",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.close && $options.close(...args))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-calendar__header-text uni-calendar--fixed-width" },
                vue.toDisplayString($options.cancelText),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", {
              class: "uni-calendar__header-btn-box",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.confirm && $options.confirm(...args))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-calendar__header-text uni-calendar--fixed-width" },
                vue.toDisplayString($options.okText),
                1
                /* TEXT */
              )
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uni-calendar__header" }, [
            vue.createElementVNode("view", {
              class: "uni-calendar__header-btn-box",
              onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.pre && $options.pre(...args), ["stop"]))
            }, [
              vue.createElementVNode("image", {
                src: _imports_0$1,
                style: { "width": "30px", "height": "30px" },
                mode: ""
              }),
              vue.createCommentVNode(' <view class="uni-calendar__header-btn uni-calendar--left"></view> ')
            ]),
            vue.createElementVNode("picker", {
              mode: "date",
              value: $props.date,
              fields: "month",
              onChange: _cache[4] || (_cache[4] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-calendar__header-text" },
                vue.toDisplayString(($data.nowDate.year || "") + " 年 " + ($data.nowDate.month || "") + "月"),
                1
                /* TEXT */
              )
            ], 40, ["value"]),
            vue.createElementVNode("view", {
              class: "uni-calendar__header-btn-box",
              onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.next && $options.next(...args), ["stop"]))
            }, [
              vue.createElementVNode("image", {
                src: _imports_1,
                style: { "width": "30px", "height": "30px" },
                mode: ""
              }),
              vue.createCommentVNode(' <view class="uni-calendar__header-btn uni-calendar--right"></view> ')
            ]),
            vue.createCommentVNode(' <text class="uni-calendar__backtoday" @click="backtoday">{{todayText}}</text> ')
          ]),
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode("view", { class: "uni-calendar__box" }, [
            $props.showMonth ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-calendar__box-bg"
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-calendar__box-bg-text" },
                vue.toDisplayString($data.nowDate.month),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "uni-calendar__weeks" }, [
              vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__weeks-day-text" },
                  vue.toDisplayString($options.SUNText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__weeks-day-text" },
                  vue.toDisplayString($options.monText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__weeks-day-text" },
                  vue.toDisplayString($options.TUEText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__weeks-day-text" },
                  vue.toDisplayString($options.WEDText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__weeks-day-text" },
                  vue.toDisplayString($options.THUText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__weeks-day-text" },
                  vue.toDisplayString($options.FRIText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__weeks-day-text" },
                  vue.toDisplayString($options.SATText),
                  1
                  /* TEXT */
                )
              ])
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.weeks, (item, weekIndex) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "uni-calendar__weeks",
                  key: weekIndex
                }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(item, (weeks, weeksIndex) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "uni-calendar__weeks-item",
                        key: weeksIndex
                      }, [
                        vue.createVNode(_component_calendar_item, {
                          class: "uni-calendar-item--hook",
                          weeks,
                          calendar: $data.calendar,
                          selected: $props.selected,
                          lunar: $props.lunar,
                          onChange: $options.choiceDate
                        }, null, 8, ["weeks", "calendar", "selected", "lunar", "onChange"])
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$3], ["__scopeId", "data-v-77fdc78f"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/components/Calendar/components/uni-calendar/uni-calendar.vue"]]);
  const _sfc_main$8 = {
    __name: "TaskData",
    setup(__props) {
      const info = vue.reactive({
        lunar: true,
        range: true,
        insert: false,
        selected: []
      });
      const taskData = vue.ref({});
      vue.onMounted(() => {
        const date = getDate(new Date());
        getTask({ year: date.year, month: date.month });
        setTimeout(() => {
          info.date = getDate(new Date(), -30).fullDate;
          info.startDate = getDate(new Date(), -60).fullDate;
          info.endDate = getDate(new Date(), 30).fullDate;
          info.selected = info.selected;
        }, 1e3);
      });
      async function getTask(params) {
        await getTaskData(params).then((res) => {
          if (res.code == 200) {
            const { data: data2 } = res;
            taskData.value = data2;
            info.selected = data2.dailyMileage.map((n2) => {
              if (getDate(n2.dateTime).fullDate != getDate(new Date()).fullDate) {
                return { date: getDate(n2.dateTime).fullDate, info: n2.mileage };
              }
            }).filter((n2) => n2 != void 0);
          } else {
            return uni.showToast({
              title: data.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      }
      function monthSwitch(e) {
        getTask(e);
      }
      function getDate(date, AddDayCount = 0) {
        if (!date) {
          date = new Date();
        }
        if (typeof date !== "object") {
          date = date.replace(/-/g, "/");
        }
        const dd = new Date(date);
        dd.setDate(dd.getDate() + AddDayCount);
        const y2 = dd.getFullYear();
        const m2 = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
        const d2 = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return {
          fullDate: y2 + "-" + m2 + "-" + d2,
          year: y2,
          month: m2,
          date: d2,
          day: dd.getDay()
        };
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "taskData" }, [
          vue.createCommentVNode(" 日历模块 - 使用uni的日历重写 - start "),
          vue.createVNode(Calendar, {
            class: "uni-calendar--hook",
            selected: info.selected,
            showMonth: false,
            onMonthSwitch: monthSwitch
          }, {
            default: vue.withCtx(() => [
              vue.createCommentVNode(" 任务栏数据展示 "),
              vue.createElementVNode("view", { class: "taskCont" }, [
                vue.createVNode(TaskInfo, {
                  title: false,
                  data: taskData.value,
                  class: "task"
                }, null, 8, ["data"])
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["selected"]),
          vue.createCommentVNode(" 日历模块 - start ")
        ]);
      };
    }
  };
  const TaskData = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-58aa4eec"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/components/TaskData.vue"]]);
  const _sfc_main$7 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
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
      /**
       * 监听type类型
       */
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
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
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
      // H5 下禁止底部滚动
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
    // TODO vue3
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
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
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
          formatAppLog("error", "at components/Popup/components/uni-popup/uni-popup.vue:280", "缺少类型：", direction);
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
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
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
      /**
       * 顶部弹出样式处理
       */
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
      /**
       * 底部弹出样式处理
       */
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
      /**
       * 中间弹出样式处理
       */
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
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$4);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
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
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const Popup = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$2], ["__scopeId", "data-v-46207deb"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/Popup/components/uni-popup/uni-popup.vue"]]);
  const popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      /**
       * 获取父元素实例
       */
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
  const en = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  const zhHans = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "确定",
    "uni-popup.placeholder": "请输入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const zhHant = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "確定",
    "uni-popup.placeholder": "請輸入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const { t } = initVueI18n(messages);
  const _sfc_main$6 = {
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
        return this.confirmText || t("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t("uni-popup.title");
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
      /**
       * 点击确认按钮
       */
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
      /**
       * 点击取消按钮
       */
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
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-dialog" }, [
      vue.createElementVNode("view", { class: "uni-dialog-title" }, [
        $props.title ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 0,
            class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
          },
          vue.toDisplayString($options.titleText),
          3
          /* TEXT, CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ]),
      $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-content-text" },
            vue.toDisplayString($props.content),
            1
            /* TEXT */
          )
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
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-button-text" },
            vue.toDisplayString($options.closeText),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", {
          class: "uni-dialog-button uni-border-left",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
        }, [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-button-text uni-button-color" },
            vue.toDisplayString($options.okText),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const PopupDialog = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$1], ["__scopeId", "data-v-e6482e09"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/components/Popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
  const _imports_0 = "/static/sj_open_rit.png";
  const _sfc_main$5 = {
    data() {
      return {
        type: "clear",
        msgType: "success",
        content: "",
        butText: "清理"
      };
    },
    components: {
      Popup,
      PopupDialog
    },
    created() {
      this.formatSize();
    },
    methods: {
      // 计算缓存大小
      formatSize() {
        let that = this;
        plus.cache.calculate(function(size) {
          let sizeCache = parseInt(size);
          if (sizeCache == 0) {
            that.fileSizeString = "0B";
          } else if (sizeCache < 1024) {
            that.fileSizeString = sizeCache + "B";
          } else if (sizeCache < 1048576) {
            that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";
          } else if (sizeCache < 1073741824) {
            that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";
          } else {
            that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";
          }
        });
      },
      // 清楚缓存
      clearCache() {
        let that = this;
        let os2 = plus.os.name;
        that.formatSize();
        if (parseInt(that.fileSizeString) <= 100) {
          uni.showToast({
            icon: "none",
            title: "没有缓存了",
            duration: 2e3
          });
        } else if (os2 == "Android") {
          let main = plus.android.runtimeMainActivity();
          let sdRoot = main.getCacheDir();
          let files = plus.android.invoke(sdRoot, "listFiles");
          let len = files.length;
          for (let i2 = 0; i2 < len; i2++) {
            let filePath = "" + files[i2];
            plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
              if (entry.isDirectory) {
                entry.removeRecursively(function(entry2) {
                  uni.showToast({
                    title: "缓存清理完成",
                    duration: 2e3
                  });
                  that.formatSize();
                }, function(e) {
                  formatAppLog("log", "at pages/user/components/SystmSet.vue:108", e.message);
                });
              } else {
                entry.remove();
              }
            }, function(e) {
              formatAppLog("log", "at pages/user/components/SystmSet.vue:114", "文件路径读取失败");
            });
          }
        } else {
          plus.cache.clear(function() {
            uni.showToast({
              title: "缓存清理完成",
              duration: 2e3
            });
            that.formatSize();
          });
        }
      },
      // 弹窗的点击事件设置对应的展示信息
      dialogToggle(type, content, butText) {
        this.type = type;
        this.content = content;
        this.butText = butText;
        this.$refs.alertDialog.open();
      },
      // 点击清理按钮清理缓存 点击退出直接退出
      confirmHandle() {
        this.type == "clear" ? this.clearCache() : this.backlogin();
      },
      // 关闭弹窗
      dialogClose() {
      },
      // 去详情页面
      goDetails(url) {
        if (url == "") {
          uni.showToast({
            title: "抱歉 该功能暂未实现！",
            duration: 2e3,
            icon: "none"
          });
          return;
        }
        uni.navigateTo({
          url
        });
      },
      // 退出登录
      backlogin() {
        this.goDetails("/pages/login/user");
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PopupDialog = vue.resolveComponent("PopupDialog");
    const _component_Popup = vue.resolveComponent("Popup");
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createElementVNode("view", { class: "systmSet" }, [
          vue.createElementVNode("view", { class: "navList" }, [
            vue.createCommentVNode(' <view class="line" @click="goDetails(`/pages/user/setCarrier?type=phone&title=换绑手机`)"> '),
            vue.createElementVNode("view", {
              class: "line",
              onClick: _cache[0] || (_cache[0] = ($event) => $options.goDetails(``))
            }, [
              vue.createElementVNode("text", null, "换绑手机"),
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_0,
                mode: ""
              })
            ]),
            vue.createElementVNode("view", {
              class: "line",
              onClick: _cache[1] || (_cache[1] = ($event) => $options.goDetails(``))
            }, [
              vue.createCommentVNode(' <view class="line" @click="goDetails(`/pages/user/setCarrier?type=pass&title=修改密码`)"> '),
              vue.createElementVNode("text", null, "修改密码"),
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_0,
                mode: ""
              })
            ]),
            vue.createElementVNode("view", {
              class: "line",
              onClick: _cache[2] || (_cache[2] = ($event) => $options.goDetails(`/pages/user/setCarrier?type=setMessage&title=消息通知设置`))
            }, [
              vue.createElementVNode("text", null, "消息通知设置"),
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_0,
                mode: ""
              })
            ]),
            vue.createElementVNode("view", {
              class: "line",
              onClick: _cache[3] || (_cache[3] = ($event) => $options.dialogToggle("clear", `清理缓存后会清空所有数据`, "清理"))
            }, [
              vue.createElementVNode("text", null, "清理缓存"),
              vue.createElementVNode("image", {
                class: "icon",
                src: _imports_0,
                mode: ""
              })
            ])
          ]),
          vue.createElementVNode("view", { class: "navList" }, [
            vue.createElementVNode("view", {
              class: "back",
              onClick: _cache[4] || (_cache[4] = ($event) => $options.dialogToggle("back", "确定要退出登录？", "退出"))
            }, [
              vue.createElementVNode("text", null, "退出")
            ])
          ])
        ]),
        vue.createCommentVNode(" 提示窗示例 清理缓存、退出的提示 - start"),
        vue.createVNode(
          _component_Popup,
          {
            ref: "alertDialog",
            type: "dialog"
          },
          {
            default: vue.withCtx(() => [
              vue.createVNode(_component_PopupDialog, {
                type: $data.msgType,
                cancelText: "关闭",
                confirmText: $data.butText,
                content: $data.content,
                onConfirm: $options.confirmHandle,
                onClose: $options.dialogClose
              }, null, 8, ["type", "confirmText", "content", "onConfirm", "onClose"])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        ),
        vue.createCommentVNode(" 提示窗示例 清理缓存、退出的提示 - end")
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const SystmSet = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render], ["__scopeId", "data-v-91656a5a"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/components/SystmSet.vue"]]);
  const _sfc_main$4 = {
    __name: "carrier",
    setup(__props) {
      const title = vue.ref("车辆信息");
      const type = vue.ref("");
      vue.onMounted(() => {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1].$page.options;
        type.value = currentPage.type;
        title.value = currentPage.title;
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "userContainer" }, [
              vue.createVNode(DetailsNav, { title: title.value }, null, 8, ["title"]),
              vue.createCommentVNode(" 车辆信息 "),
              type.value == "carInfo" ? (vue.openBlock(), vue.createBlock(CarInfo, { key: 0 })) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 任务数据 "),
              type.value == "taskData" ? (vue.openBlock(), vue.createBlock(TaskData, { key: 1 })) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 系统设置"),
              type.value == "systmSet" ? (vue.openBlock(), vue.createBlock(SystmSet, { key: 2 })) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const PagesUserCarrier = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6be8c21c"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/carrier.vue"]]);
  const _sfc_main$3 = {
    __name: "ChangePhon",
    setup(__props) {
      useStore();
      const customForm = vue.ref();
      const isVerifySuccess = vue.ref(false);
      const step = vue.ref(1);
      const time = vue.ref(null);
      const fromInfo = vue.reactive({
        phone: "",
        //手机号
        verifyCode: ""
        // 验证码
      });
      const codeInfo = vue.reactive({
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
              errorMessage: "请输入手机号"
            }
          ]
        },
        verifyCode: {
          rules: [
            {
              required: true,
              errorMessage: "请输入验证码"
            }
          ]
        }
      });
      const getCode = async () => {
        let phone2 = fromInfo.phone;
        isVerifySuccess.value = isPhone(phone2);
        if (isVerifySuccess.value) {
          time.value = timeCountdown(codeInfo);
          const parent = {
            phone: phone2
          };
          const { data: data2 } = await getsmsCode(parent);
          if (data2.code == 0 || data2.code == 200) {
            uni.showToast({
              title: "验证码已发送成功",
              duration: 1e3,
              icon: "none"
            });
          } else {
            return uni.showToast({
              title: data2.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        } else {
          return uni.showToast({
            title: "手机号输入错误！请重新输入",
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleSubmit = async () => {
        const valid = await customForm.value.validate();
        if (valid && step.value == 1) {
          checkCode();
        } else {
          bindPhoneHandle();
        }
      };
      async function checkCode() {
        await checksmsCode(fromInfo).then((res) => {
          if (res.code === 200) {
            step.value = 2;
            fromInfo.phone = "";
            fromInfo.verifyCode = "";
            codeInfo.show = true;
            codeInfo.times = 60;
          } else {
            return uni.showToast({
              title: data.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      }
      async function bindPhoneHandle() {
        await bindPhone(fromInfo).then((res) => {
          if (res.code === 200) {
            uni.showToast({
              title: "绑定成功请重新登录！",
              duration: 1e3,
              icon: "none"
            });
            setTimeout(() => {
              goLogin();
            }, 500);
            goLogin();
          } else {
            return uni.showToast({
              title: data.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        }).catch((err) => {
        });
      }
      const goLogin = () => {
        uni.redirectTo({
          url: "/pages/login/user"
        });
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$5);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 登录表单 手机号、验证码 "),
            vue.createElementVNode("view", { class: "loginMain" }, [
              vue.createVNode(_component_uni_forms, {
                ref_key: "customForm",
                ref: customForm,
                rules: customRules,
                modelValue: fromInfo
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_forms_item, { name: "phone" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item",
                        modelValue: fromInfo.phone,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fromInfo.phone = $event),
                        clearable: false,
                        placeholder: step.value == 1 ? "请输入已绑定手机号" : "请输入新手机号"
                      }, null, 8, ["modelValue", "placeholder"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_forms_item, { name: "verifyCode" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item inputW",
                        modelValue: fromInfo.verifyCode,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => fromInfo.verifyCode = $event),
                        clearable: false,
                        placeholder: "请输入验证码"
                      }, null, 8, ["modelValue"]),
                      vue.createElementVNode("view", { class: "codeBox" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "text",
                          {
                            class: "code",
                            onClick: getCode
                          },
                          "获取验证码",
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, codeInfo.show]
                        ]),
                        vue.withDirectives(vue.createElementVNode(
                          "text",
                          { class: "code fontCol" },
                          vue.toDisplayString(codeInfo.times) + "s后重新获取",
                          513
                          /* TEXT, NEED_PATCH */
                        ), [
                          [vue.vShow, !codeInfo.show]
                        ])
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["rules", "modelValue"]),
              vue.createCommentVNode(" 按钮 "),
              vue.createElementVNode("view", {
                class: "btnBox",
                style: { "padding-top": "100rpx" }
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["button", fromInfo.phone.length === 0 || fromInfo.verifyCode.length === 0 ? "buttonDis1" : "button"]),
                    onClick: handleSubmit
                  },
                  vue.toDisplayString(step.value == 1 ? "下一步" : "确定绑定"),
                  3
                  /* TEXT, CLASS */
                )
              ]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const ChangePhon = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-33e92ca1"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/components/ChangePhon.vue"]]);
  const _sfc_main$2 = {
    __name: "ChangePass",
    setup(__props) {
      useStore();
      const customForm = vue.ref();
      const isVerifySuccess = vue.ref(false);
      const fromInfo = vue.reactive({
        phone: "",
        //手机号
        verifyCode: "",
        // 验证码
        pass: ""
        // 新密码
      });
      const codeInfo = vue.reactive({
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
              errorMessage: "请输入手机号"
            }
          ]
        },
        verifyCode: {
          rules: [
            {
              required: true,
              errorMessage: "请输入验证码"
            }
          ]
        },
        pass: {
          rules: [
            {
              required: true,
              validateFunction: validatePhone,
              errorMessage: "请输入新密码"
            }
          ]
        }
      });
      const getCode = async () => {
        let p2 = fromInfo.phone;
        isVerifySuccess.value = isPhone(p2);
        if (isVerifySuccess.value) {
          timeCountdown(codeInfo);
          const parent = {
            phone: phone.value
          };
          const { data: data2 } = await getsmsCode(parent);
          if (ddata.code == 0 || data2.code == 200) {
            uni.showToast({
              title: "验证码已发送成功",
              duration: 1e3,
              icon: "none"
            });
          } else {
            return uni.showToast({
              title: data2.msg,
              duration: 1e3,
              icon: "none"
            });
          }
        } else {
          return uni.showToast({
            title: "手机号输入错误！请重新输入",
            duration: 1e3,
            icon: "none"
          });
        }
      };
      const handleSubmit = async () => {
        const valid = await customForm.value.validate();
        if (valid) {
          await changePass(fromInfo).then((res) => {
            if (res.code === 200) {
              uni.showToast({
                title: "密码修改成功！",
                duration: 1e3,
                icon: "none"
              });
              setTimeout(() => {
                goLogin();
              }, 500);
            } else {
              return uni.showToast({
                title: data.msg,
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
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$5);
        const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_1);
        const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_2);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" 登录表单 手机号、验证码 "),
            vue.createElementVNode("view", { class: "loginMain" }, [
              vue.createVNode(_component_uni_forms, {
                ref_key: "customForm",
                ref: customForm,
                rules: customRules,
                modelValue: fromInfo
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_forms_item, { name: "phone" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item",
                        modelValue: fromInfo.phone,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fromInfo.phone = $event),
                        clearable: false,
                        placeholder: "请输入已绑定手机号"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_forms_item, { name: "verifyCode" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item inputW",
                        modelValue: fromInfo.verifyCode,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => fromInfo.verifyCode = $event),
                        clearable: false,
                        placeholder: "请输入验证码"
                      }, null, 8, ["modelValue"]),
                      vue.createElementVNode("view", { class: "codeBox" }, [
                        vue.withDirectives(vue.createElementVNode(
                          "text",
                          {
                            class: "code",
                            onClick: getCode
                          },
                          "获取验证码",
                          512
                          /* NEED_PATCH */
                        ), [
                          [vue.vShow, codeInfo.show]
                        ]),
                        vue.withDirectives(vue.createElementVNode(
                          "text",
                          { class: "code fontCol" },
                          vue.toDisplayString(codeInfo.times) + "s后重新获取",
                          513
                          /* TEXT, NEED_PATCH */
                        ), [
                          [vue.vShow, !codeInfo.show]
                        ])
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_forms_item, { name: "pass" }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_easyinput, {
                        class: "item",
                        modelValue: fromInfo.pass,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => fromInfo.pass = $event),
                        placeholder: "请输入新密码"
                      }, null, 8, ["modelValue"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["rules", "modelValue"]),
              vue.createCommentVNode(" 按钮 "),
              vue.createElementVNode("view", {
                class: "btnBox",
                style: { "padding-top": "100rpx" }
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: vue.normalizeClass(["button", fromInfo.phone.length === 0 || fromInfo.verifyCode.length === 0 ? "buttonDis1" : "button"]),
                    onClick: handleSubmit
                  },
                  "确认修改",
                  2
                  /* CLASS */
                )
              ]),
              vue.createCommentVNode(" end ")
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const ChangePass = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9210a4e5"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/components/ChangePass.vue"]]);
  const _sfc_main$1 = {
    __name: "setCarrier",
    setup(__props) {
      const store2 = useStore();
      const title = vue.ref("车辆信息");
      const type = vue.ref("");
      const isMessage = vue.ref(true);
      vue.onMounted(() => {
        const pages2 = getCurrentPages();
        const currentPage = pages2[pages2.length - 1].$page.options;
        type.value = currentPage.type;
        title.value = currentPage.title;
        isMessage.value = store2.state.isMessage;
      });
      const switchChange = function(e) {
        store2.commit("setIsMessage", e.detail.value);
        isMessage.value = e.detail.value;
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(" end "),
            vue.createElementVNode("view", { class: "userContainer" }, [
              vue.createVNode(DetailsNav, { title: title.value }, null, 8, ["title"]),
              vue.createCommentVNode(" 换绑手机 "),
              vue.createCommentVNode(` <CarInfo v-if="type == 'phone'" ></CarInfo> `),
              type.value == "phone" ? (vue.openBlock(), vue.createBlock(ChangePhon, {
                key: 0,
                class: ""
              })) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 修改密码 "),
              type.value == "pass" ? (vue.openBlock(), vue.createBlock(ChangePass, { key: 1 })) : vue.createCommentVNode("v-if", true),
              vue.createCommentVNode(" 消息通知设置"),
              vue.createCommentVNode(` <SystmSet v-if="type == 'setMessage'" ></SystmSet> `),
              type.value == "setMessage" ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "setMessage"
              }, [
                vue.createElementVNode("view", { class: "desc" }, [
                  vue.createElementVNode("text", null, "开启后，有新的任务通知你")
                ]),
                vue.createElementVNode("view", { class: "set" }, [
                  vue.createElementVNode("text", null, "允许给我推送任务通知"),
                  vue.createElementVNode("switch", {
                    checked: isMessage.value,
                    color: "#EF4F3F",
                    onChange: switchChange
                  }, null, 40, ["checked"])
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createCommentVNode(" end ")
          ],
          2112
          /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
        );
      };
    }
  };
  const PagesUserSetCarrier = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-07d02b8a"], ["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/pages/user/setCarrier.vue"]]);
  __definePage("pages/start/index", PagesStartIndex);
  __definePage("pages/login/user", PagesLoginUser);
  __definePage("pages/login/index", PagesLoginIndex);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/index/delayed", PagesIndexDelayed);
  __definePage("pages/index/details", PagesIndexDetails);
  __definePage("pages/index/detailsRoad", PagesIndexDetailsRoad);
  __definePage("pages/index/detailsSuccess", PagesIndexDetailsSuccess);
  __definePage("pages/index/exception", PagesIndexException);
  __definePage("pages/index/refister", PagesIndexRefister);
  __definePage("pages/message/index", PagesMessageIndex);
  __definePage("pages/message/details", PagesMessageDetails);
  __definePage("pages/user/index", PagesUserIndex);
  __definePage("pages/user/carrier", PagesUserCarrier);
  __definePage("pages/user/setCarrier", PagesUserSetCarrier);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/Volumes/work/workFile/22年项目/物流/project-wl-siji-uniapp-vue3/App.vue"]]);
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
