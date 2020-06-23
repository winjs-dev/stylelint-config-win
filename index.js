'use strict';

const rules = require('./rules');

module.exports = {
  // 先写定位，再写盒模型，再写内容区样式，最后写 CSS3 相关属性
  plugins: [
    'stylelint-order',
    'stylelint-declaration-block-no-ignored-properties'
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-prettier/recommended',
  ],
  rules: rules
};
