// ESM 版本的配置模块
import { createRequire } from 'module';

// 创建 require 函数以导入 CommonJS 模块
const require = createRequire(import.meta.url);

// 导入 CommonJS 配置
const createConfig = require('./config.js');

// ESM 导出
export default createConfig;
export { createConfig };
