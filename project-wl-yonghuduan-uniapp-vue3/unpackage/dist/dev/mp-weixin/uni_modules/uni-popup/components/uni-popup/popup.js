"use strict";
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
exports.popup = popup;
