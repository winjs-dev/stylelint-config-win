// 共享的 stylelint 配置
// 支持 CommonJS 和 ESM 双模块系统

// Allows:
// foo-bar
// FooBar
// foo-bar--foo-bar
// foo-bar__foo-bar
// FooBar--FooBar
// FooBar__FooBar
// FooBar--foo-bar
// foo-bar--FooBar
// Foo-bar
// …
const reLowerCaseFirstUpper = /([A-Z][a-z\d]*(-[a-z\d]+)*)/;
const reLowerCase = /([a-z][a-z\d]*(-[a-z\d]+)*)/;
const rePascalCase = /(([A-Z][a-zA-Z\d]+)*)/;
const reName = new RegExp(`^(${reLowerCaseFirstUpper.source}|${reLowerCase.source}|${rePascalCase.source})((--|__)(${reLowerCase.source}|${rePascalCase.source}))*$`);

/**
 * 创建 stylelint 配置对象
 * @returns {Object} stylelint 配置
 */
function createConfig() {
  return {
    // 先写定位，再写盒模型，再写内容区样式，最后写 CSS3 相关属性
    plugins: [
      'stylelint-order',
      'stylelint-declaration-block-no-ignored-properties',
      'stylelint-z-index-value-constraint'
    ],
    rules: {
      // ************ At-rule ************
      // 指定一个禁止使用的 at 规则的黑名单
      'at-rule-blacklist': null,
      // 要求或禁止使用空行 always-有必须有空行 never-之前不加空行
      // except 辅助选项
      'at-rule-empty-line-before': ['always',
        {
          except: [
            'blockless-after-same-name-blockless', // 同名规则可不加空行
            'first-nested' // 第一个子节点不加空行
          ],
          ignore: ['after-comment'] // 忽略注释后的规则
        }
      ],
      // 指定大小写
      'at-rule-name-case': 'lower',
      // 要求在 at 规则之后有一个换行符 多行
      'at-rule-name-newline-after': 'always-multi-line',
      // 名称后需要空格 -单行声明块在规则的名称后一个空格
      'at-rule-name-space-after': 'always-single-line',
      // 不允许 at-rules 不明。为了兼容 scss 等预处理器，排除一些特殊字段
      'at-rule-no-unknown': [true,
        {
          ignoreAtRules: [
            'content',
            'each',
            'else',
            'extend',
            'for',
            'function',
            'if',
            'include',
            'import',
            'mixin',
            'rule',
            'while',
            'debug',
            'at-root',
            'warn',
            'error',
            'return'
          ]
        }
      ],
      // 禁止 at 规则使用浏览器引擎前缀
      'at-rule-no-vendor-prefix': null,
      // 指定属性的需求列表
      'at-rule-property-requirelist': null,
      // 分号后需要换行符
      'at-rule-semicolon-newline-after': 'always',
      // 分号前需要空格
      'at-rule-semicolon-space-before': 'never',
      // 指定一个允许使用的 at 规则的白名单
      'at-rule-whitelist': null,

      // ************ Block ************
      // 块关闭括号（右括号）禁止使用空行
      'block-closing-brace-empty-line-before': 'never',
      // 右括号之后换行
      'block-closing-brace-newline-after': 'always',
      // 多行块右括号之前换行
      'block-closing-brace-newline-before': 'always',
      // 不允许空块
      'block-no-empty': true,
      // 多行，块开放括号（左括号）之后换行
      'block-opening-brace-newline-after': 'always',
      // 开括号前一个空格
      'block-opening-brace-space-before': 'always',

      // ************ Color ************
      // 指定十六进制颜色为小写格式
      'color-hex-case': 'lower',
      // 指定十六进制颜色使用缩写
      'color-hex-length': 'short',
      // 禁止使用命名的颜色
      'color-named': 'never',
      // 禁止使用十六进制颜色
      'color-no-hex': null,
      // 禁止使用无效的十六进制颜色
      'color-no-invalid-hex': true,

      // ************ Comment ************
      // 不允许空的评论
      'comment-no-empty': true,
      // 注释标记的内部使用空格
      'comment-whitespace-inside': 'always',
      // 指定一个不允许出现在注释中的单词的黑名单
      'comment-word-disallowed-list': [
        [
          /^TODO:/,
          /^FIXME:/,
          'fuck',
          'shit',
          'damn',
          'twerk',
          'egg yolk'
        ],
        {
          severity: 'warning'
        }
      ],

      // ************ Declaration ************
      // 声明后禁止使用空格
      'declaration-bang-space-after': 'never',
      // 声明前使用空格
      'declaration-bang-space-before': 'always',

      // ************ Declaration Block ************
      // 在声明的块中中禁止出现重复的属性
      'declaration-block-no-duplicate-properties': [
        true,
        {
          ignore: ['consecutive-duplicates-with-different-values']
        }
      ],
      // 禁止使用可以缩写却不缩写的属性
      'declaration-block-no-redundant-longhand-properties': [
        true,
        {
          ignoreShorthands: [
            'grid-template'
          ]
        }
      ],
      // 不允许简写属性覆盖相关手写属性声明块
      'declaration-block-no-shorthand-property-overrides': true,
      // 在声明块的分号之前要求有一个换行符或禁止有空白
      'declaration-block-semicolon-newline-before': 'never-multi-line',
      // 单行声明块分号后一个空格
      'declaration-block-semicolon-space-after': 'always-single-line',
      // 分号之前不加空格
      'declaration-block-semicolon-space-before': 'never',
      // 限制单行声明块中的声明数量为1
      'declaration-block-single-line-max-declarations': 1,
      // 声明块内必须有尾随分号
      'declaration-block-trailing-semicolon': 'always',
      // 多行冒号后换行
      'declaration-colon-newline-after': 'always-multi-line',
      // 单行冒号声明后需要一个空格空格
      'declaration-colon-space-after': 'always-single-line',
      // 声明冒号之前禁止空格
      'declaration-colon-space-before': 'never',
      // 声明之前使用空行
      'declaration-empty-line-before': 'never',
      // 指定一个在声明中禁止使用的属性和值的黑名单
      'declaration-property-value-disallowed-list': null,

      // ************ Font family ************
      // 指定字体名称当推荐使用引号时再使用引号
      'font-family-name-quotes': 'always-where-recommended',
      // 禁止使用重复的字体名称
      'font-family-no-duplicate-names': true,
      // 推荐在字体系列名称列表中使用通用系列
      'font-family-no-missing-generic-family-keyword': [true, {
        severity: 'warning'
      }],

      // ************ Font weight ************
      // 指定 `font-weight` 的值必须是名字
      'font-weight-notation': ['named-where-possible', {
        severity: 'warning',
        message: 'This means that only 400 and 700 will be rejected, because those are the only numbers with keyword equivalents (normal and bold).'
      }],

      // ************ Function ************
      // 指定禁用函数的黑名单：暂无
      'function-blacklist': null,
      // 禁止在calc函数内使用无效的表达式
      'function-calc-no-invalid': true,
      // 禁止在 calc 函数内使用不加空格的操作符
      'function-calc-no-unspaced-operator': true,
      // 指定函数名的大小写
      'function-name-case': 'lower',
      // 函数内的逗号后需要一个空格
      'function-comma-space-after': 'always-single-line',
      // 函数内的逗号前不允许空格
      'function-comma-space-before': 'never',
      // 限制函数中相邻空行的数量
      'function-max-empty-lines': 0,
      // 函数的括号内不允许空格
      'function-parentheses-space-inside': 'never-single-line',
      // 函数的 url 使用引号
      'function-url-quotes': 'always',
      // 指定一个允许使用的函数的白名单
      'function-whitelist': null,

      // ************ General / Sheet ************
      // 缩进使用2个空格
      'indentation': 2,
      // 限制行的长度
      'max-line-length': null,
      // 限制空行数量
      'max-empty-lines': 2,
      // 禁止行尾空格
      'no-eol-whitespace': true,
      // 禁止缺少行尾换行符
      'no-missing-end-of-source-newline': true,

      // ************ Keyframe declaration ************
      // 禁止在关键帧声明中使用 !important
      'keyframe-declaration-no-important': true,

      // ************ Length ************
      // 禁止长度为零时使用单位
      'length-zero-no-unit': true,

      // ************ Media feature ************
      // 媒体功能的冒号后需要一个空格
      'media-feature-colon-space-after': 'always',
      // 媒体功能的冒号前不允许空格
      'media-feature-colon-space-before': 'never',
      // 指定媒体功能名称的大小写
      'media-feature-name-case': 'lower',
      // 禁止未知的媒体功能名称
      'media-feature-name-no-unknown': true,
      // 禁止媒体功能名称使用浏览器引擎前缀
      'media-feature-name-no-vendor-prefix': true,
      // 媒体功能的括号内不允许空格
      'media-feature-parentheses-space-inside': 'never',
      // 媒体功能中的范围运算符后需要一个空格
      'media-feature-range-operator-space-after': 'always',
      // 媒体功能中的范围运算符前需要一个空格
      'media-feature-range-operator-space-before': 'always',

      // ************ Media query list ************
      // 媒体查询列表的逗号后需要换行符
      'media-query-list-comma-newline-after': 'always-multi-line',
      // 媒体查询列表的逗号前不允许空格
      'media-query-list-comma-space-before': 'never',

      // ************ Number ************
      // 要求或禁止数字中的前导零
      'number-leading-zero': 'always',
      // 禁止数字中的尾随零
      'number-no-trailing-zeros': true,

      // ************ Property ************
      // 指定一个禁止使用的属性的黑名单
      'property-blacklist': null,
      // 指定属性的大小写
      'property-case': 'lower',
      // 禁止未知的属性
      'property-no-unknown': true,
      // 禁止属性使用浏览器引擎前缀
      'property-no-vendor-prefix': null,
      // 指定一个允许使用的属性的白名单
      'property-whitelist': null,

      // ************ Rule ************
      // 规则前需要空行
      'rule-empty-line-before': ['always-multi-line',
        {
          except: [
            'first-nested'
          ],
          ignore: [
            'after-comment'
          ]
        }
      ],

      // ************ Selector ************
      // 属性选择器内的括号内不允许空格
      'selector-attribute-brackets-space-inside': 'never',
      // 指定一个禁止使用的特性(attribute)操作符的黑名单
      'selector-attribute-operator-blacklist': null,
      // 属性选择器内的运算符后不允许空格
      'selector-attribute-operator-space-after': 'never',
      // 属性选择器内的运算符前不允许空格
      'selector-attribute-operator-space-before': 'never',
      // 指定一个禁止使用的特性(attribute)操作符的白名单
      'selector-attribute-operator-whitelist': null,
      // 要求特性值使用引号 [target="_blank"]
      'selector-attribute-quotes': 'always',
      // 伪类选择器指定一个匹配模式
      'selector-class-pattern': reName,
      // 选择器的组合黑名单
      'selector-combinator-blacklist': null,
      // 选择器的组合符后一个空格 a + b
      'selector-combinator-space-after': 'always',
      // 选择器的组合符前一个空格
      'selector-combinator-space-before': 'always',
      // 选择器的组合白名单
      'selector-combinator-whitelist': null,
      // 不允许选择器的后代组合器使用非空格字符
      'selector-descendant-combinator-no-non-space': true,
      // 指定一个 id 选择器的匹配模式
      'selector-id-pattern': reName,

      // ************ Selector List ************
      // 选择器列表的逗号后需要换行符
      'selector-list-comma-newline-after': 'always',
      // 选择器列表的逗号前需要换行符
      'selector-list-comma-newline-before': 'never-multi-line',
      // 选择器列表的逗号后允许空格
      'selector-list-comma-space-after': null,
      // 选择器列表的逗号前不允许空格
      'selector-list-comma-space-before': 'never',
      // 限制选择器中属性选择器的数量
      'selector-max-attribute': [8, {
        'severity': 'warning'
      }],
      // 限制选择器中的类数
      'selector-max-class': [8, {
        'severity': 'warning'
      }],
      // 限制复合选择器的数量
      'selector-max-compound-selectors': [8, {
        'severity': 'warning'
      }],
      // 限制选择器中相邻空行的数量
      'selector-max-empty-lines': 0,
      // 限制选择器的优先级
      'selector-max-specificity': null,
      // 限制选择器中通用选择器的数量
      'selector-max-universal': [1, {
        'severity': 'warning'
      }],
      // 指定一个嵌套选择器的匹配模式
      'selector-nested-pattern': null,
      // 禁止按类型限定选择器
      'selector-no-qualifying-type': null,
      // 禁止使用浏览器引擎前缀
      'selector-no-vendor-prefix': null,
      // 指定一个禁止使用的伪类选择器的黑名单
      'selector-pseudo-class-blacklist': null,
      // 伪类选择器指定小写
      'selector-pseudo-class-case': 'lower',
      // 不允许未知的伪类选择器
      'selector-pseudo-class-no-unknown': [
        true,
        {
          ignorePseudoClasses: [
            'export',
            'global',
            // chrome webkit scrollbar
            'horizontal',
            'vertical',
            // vue3
            'deep'
          ]
        }
      ],
      // 在伪类选择器内的括号内不允许空格
      'selector-pseudo-class-parentheses-space-inside': 'never',
      // 指定一个禁止使用的伪类选择器的白名单
      'selector-pseudo-class-whitelist': null,
      // 伪元素选择器黑名单
      'selector-pseudo-element-blacklist': null,
      // 伪元素选择器指定小写
      'selector-pseudo-element-case': 'lower',
      // 伪元素指定双冒号表示
      'selector-pseudo-element-colon-notation': 'double',
      // 不允许未知的伪元素选择器
      'selector-pseudo-element-no-unknown': [
        true,
        {
          ignorePseudoElements: [
            'v-deep'
          ]
        }
      ],
      // 伪元素选择器白名单
      'selector-pseudo-element-whitelist': null,
      // 类型选择器指定小写
      'selector-type-case': 'lower',
      // 不允许未知类型选择器
      'selector-type-no-unknown': null,

      // ************ Shorthand property ************
      // 禁止在简写属性中使用冗余值
      'shorthand-property-no-redundant-values': true,

      // ************ String ************
      // 禁止在字符串（转义）换行
      'string-no-newline': true,
      // 指定字符串使用双引号 a { content: "x"; }
      'string-quotes': 'double',

      // ************ Time ************
      // 指定时间值的最小毫秒数
      'time-min-milliseconds': [100, {
        severity: 'warning'
      }],

      // ************ Unit ************
      // 关闭 Unicode 字节顺序标志
      'unicode-bom': 'never',
      // 指定一个禁止使用的单位的黑名单
      'unit-blacklist': null,
      // 单位的小写
      'unit-case': null,
      // 禁止未知的单位
      'unit-no-unknown': true,
      // 指定一个所允许的单位的白名单
      'unit-whitelist': null,

      // ************ Value ************
      // 指定关键字的值的大小写
      'value-keyword-case': ['lower', {
        ignoreProperties: [/-webkit-*/, /-moz-*/, /-o-*/, /-ms-*/]
      }],
      // 允许给值添加浏览器引擎前缀
      'value-no-vendor-prefix': [
        true,
        {
          ignoreValues: [
            'grab',
            'grabbing'
          ]
        }
      ],
      // ************ Value List ************
      // 多行值列表的逗号后换行
      'value-list-comma-newline-after': 'always-multi-line',
      // 在值列表的逗号之前要求有一个换行符或禁止有空白
      'value-list-comma-newline-before': 'never-multi-line',
      // 单行值列表中的逗号后一个空格
      'value-list-comma-space-after': 'always-single-line',
      // 值列表的逗号前不允许空格
      'value-list-comma-space-before': 'never',
      // 限制值列表中相邻空行的数量0
      'value-list-max-empty-lines': 0,

      // `stylelint-declaration-block-no-ignored-properties`
      // https://github.com/kristerkari/stylelint-declaration-block-no-ignored-properties
      // 不允许在同一规则中由于另一个属性值而忽略的属性值
      // a { display: inline; width: 100px; } -> width: 100px 就是多余的属性
      'plugin/declaration-block-no-ignored-properties': true,

      // `stylelint-order`
      // https://github.com/hudochenkov/stylelint-order
      'order/order': [
        'dollar-variables',
        'custom-properties',
        'declarations',
        'rules'
      ],
      // 指定声明块内属性的字母顺序
      // 'order/properties-order': propertiesOrder,

      // `stylelint-z-index-value-constraint`
      // https://github.com/kristerkari/stylelint-z-index-value-constraint
      'plugin/z-index-value-constraint': {
        'min': 1,
        'max': 100
      }
    }
  };
}

// CommonJS 导出
module.exports = createConfig;
module.exports.createConfig = createConfig;
module.exports.default = createConfig;
