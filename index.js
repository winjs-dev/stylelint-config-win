'use strict';

/**
 * @winner-fed/stylelint-config-win
 * 主入口文件 (向前兼容)
 *
 * 支持 CommonJS 和 ESM 双模块系统
 */

const createConfig = require('./lib/config.js');

// 导出配置对象 (保持向前兼容)
module.exports = createConfig();
