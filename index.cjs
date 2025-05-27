/*
 * @FilePath: /stylelint-config-win/index.cjs
 */
/*
 * @FilePath: /stylelint-config-win/index.cjs
 */
'use strict';

/**
 * @winner-fed/stylelint-config-win
 * CommonJS 入口文件
 *
 * 这是明确的 CommonJS 入口，确保在所有环境中都能正确加载
 */

const createConfig = require('./lib/config.js');

// 导出配置对象
module.exports = createConfig();
