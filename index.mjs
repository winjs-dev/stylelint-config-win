/**
 * @winner-fed/stylelint-config-win
 * ESM 入口文件
 *
 * 支持现代 ES 模块导入语法
 */

import createConfig from './lib/config.mjs';

// 创建并导出配置对象
const config = createConfig();

export default config;
