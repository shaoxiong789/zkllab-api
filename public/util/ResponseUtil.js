"use strict";

module.exports = {
  failedJson: function failedJson(value) {
    return {
      code: -1,
      message: value ? value : "failed"
    };
  },

  su: su
};