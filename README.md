# stylelint-config-win

团队内部的 stylelint 配置，支持 CommonJS 和 ESM 双模块系统。

## 特性

- ✅ 支持 CommonJS 和 ESM 双模块系统
- ✅ 向前兼容，无需修改现有配置
- ✅ 完整的 CSS/SCSS/Less 规则集
- ✅ 支持 Vue 3 深度选择器
- ✅ 现代化的构建配置

## 安装

```shell
yarn add @winner-fed/stylelint-config-win -D
```

## 依赖版本

```bash
stylelint ^13.6.1
```

*Tips*：如果项目中没有安装此依赖包或者版本不一致，请安装或者升级。

## 使用

### CommonJS 方式 (传统方式，向前兼容)

在你的项目的根目录下创建一个 `stylelint.config.js` 文件：

```javascript
module.exports = {
  extends: "@winner-fed/stylelint-config-win"
}
```

### ESM 方式 (现代方式)

在你的项目的根目录下创建一个 `stylelint.config.mjs` 文件：

```javascript
export default {
  extends: "@winner-fed/stylelint-config-win"
}
```

### 在 package.json 中配置

```json
{
  "stylelint": {
    "extends": "@winner-fed/stylelint-config-win"
  }
}
```

### 项目脚本配置

在项目目录下的 `package.json` 添加检测指令：

```diff
{
 ...
 "scripts": {
+    "lint:style": "stylelint \"src/**/*.{vue,less,postcss,css,scss}\" --fix --cache --cache-location node_modules/.cache/stylelint/",
 }
 ...
}
```

## 模块导入方式

### CommonJS 导入

```javascript
// 主入口 (推荐，向前兼容)
const config = require('@winner-fed/stylelint-config-win');

// 明确的 CommonJS 入口
const config = require('@winner-fed/stylelint-config-win/index.cjs');
```

### ESM 导入

```javascript
// ESM 入口
import config from '@winner-fed/stylelint-config-win/index.mjs';

// 或者使用动态导入
const config = await import('@winner-fed/stylelint-config-win/index.mjs');
```

## 支持的文件类型

- `.css`
- `.scss`
- `.less`
- `.vue` (单文件组件中的 `<style>` 块)
- `.postcss`

## 引用

- [https://stylelint.io/](https://stylelint.io/)
- [http://stylelint.cn/user-guide/rules/](http://stylelint.cn/user-guide/rules/)
- [stylelint-config-moresec](https://github.com/MoresecFE/stylelint-config-moresec)
- [css-order](https://github.com/cklwblove/note-css-order)

## 环境要求

> Node.js >= 12

> stylelint >= 13.5.0
