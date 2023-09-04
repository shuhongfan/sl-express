"use strict";
const validateIdentityCard = (value) => {
  const accountreg = /(^\d{15}$)|(^\d{17}(\d|X|x)$)/g;
  if (value === void 0 || value === "") {
    return false;
  } else if (!accountreg.test(value)) {
    return false;
  } else {
    return true;
  }
};
exports.validateIdentityCard = validateIdentityCard;
