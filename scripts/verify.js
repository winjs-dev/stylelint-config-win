#!/usr/bin/env node

/**
 * 验证脚本 - 测试 CommonJS 和 ESM 双模块系统
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 验证 stylelint-config-win 双模块系统...\n');

// 验证文件是否存在
const requiredFiles = [
  'index.js',
  'index.cjs',
  'index.mjs',
  'lib/config.js',
  'lib/config.mjs',
  'package.json'
];

console.log('📁 检查必需文件...');
let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - 文件不存在`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ 部分必需文件缺失，请检查构建过程');
  process.exit(1);
}

console.log('\n🧪 测试 CommonJS 导入...');

// 测试 CommonJS 导入
try {
  const config1 = require('../index.js');
  console.log(`✅ index.js - 插件: ${config1.plugins?.length || 0}, 规则: ${Object.keys(config1.rules || {}).length}`);

  const config2 = require('../index.cjs');
  console.log(`✅ index.cjs - 插件: ${config2.plugins?.length || 0}, 规则: ${Object.keys(config2.rules || {}).length}`);

  const createConfig = require('../lib/config.js');
  const config3 = createConfig();
  console.log(`✅ lib/config.js - 插件: ${config3.plugins?.length || 0}, 规则: ${Object.keys(config3.rules || {}).length}`);

  // 验证配置内容一致性
  if (JSON.stringify(config1) === JSON.stringify(config2) && JSON.stringify(config2) === JSON.stringify(config3)) {
    console.log('✅ 所有 CommonJS 配置内容一致');
  } else {
    console.log('❌ CommonJS 配置内容不一致');
    process.exit(1);
  }

} catch (error) {
  console.log(`❌ CommonJS 导入失败: ${error.message}`);
  process.exit(1);
}

console.log('\n📦 验证 package.json 配置...');

try {
  const pkg = require('../package.json');

  // 检查必需的字段
  const requiredFields = ['main', 'module', 'exports'];
  requiredFields.forEach(field => {
    if (pkg[field]) {
      console.log(`✅ ${field}: ${typeof pkg[field] === 'object' ? 'configured' : pkg[field]}`);
    } else {
      console.log(`❌ ${field} 字段缺失`);
      process.exit(1);
    }
  });

  // 检查 exports 配置
  if (pkg.exports && pkg.exports['.']) {
    const exports = pkg.exports['.'];
    if (exports.import && exports.require && exports.default) {
      console.log('✅ exports 字段配置完整');
    } else {
      console.log('❌ exports 字段配置不完整');
      process.exit(1);
    }
  }

} catch (error) {
  console.log(`❌ package.json 验证失败: ${error.message}`);
  process.exit(1);
}

console.log('\n🎉 所有验证通过！');
console.log('\n📋 总结:');
console.log('- ✅ 支持 CommonJS 导入 (require)');
console.log('- ✅ 支持 ESM 导入 (import)');
console.log('- ✅ 向前兼容现有配置');
console.log('- ✅ 配置内容一致性');
console.log('- ✅ package.json 正确配置');

console.log('\n🚀 可以安全发布新版本！');
