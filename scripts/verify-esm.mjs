#!/usr/bin/env node

/**
 * ESM 验证脚本 - 测试 ES 模块导入
 */

console.log('🔍 验证 ESM 导入...\n');

try {
  // 测试 ESM 入口
  const config1 = await import('../index.mjs');
  console.log(`✅ index.mjs - 插件: ${config1.default?.plugins?.length || 0}, 规则: ${Object.keys(config1.default?.rules || {}).length}`);

  // 测试共享配置模块 ESM 版本
  const { default: createConfig } = await import('../lib/config.mjs');
  const config2 = createConfig();
  console.log(`✅ lib/config.mjs - 插件: ${config2.plugins?.length || 0}, 规则: ${Object.keys(config2.rules || {}).length}`);

  // 验证配置内容一致性
  if (JSON.stringify(config1.default) === JSON.stringify(config2)) {
    console.log('✅ ESM 配置内容一致');
  } else {
    console.log('❌ ESM 配置内容不一致');
    process.exit(1);
  }

  console.log('\n🎉 ESM 验证通过！');

} catch (error) {
  console.log(`❌ ESM 导入失败: ${error.message}`);
  process.exit(1);
}
