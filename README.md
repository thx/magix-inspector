# Magix Inspector [![Version Number](https://img.shields.io/npm/v/magix-inspector.svg)](https://github.com/thx/magix-inspector/ "Version Number") [![THX Team](https://img.shields.io/badge/team-THX-green.svg)](https://thx.github.io/ "THX Team") [![License](https://img.shields.io/badge/license-MIT-orange.svg)](https://opensource.org/licenses/MIT "License") [![download](https://img.shields.io/npm/dm/magix-inspector.svg)](https://www.npmjs.com/package/magix-inspector)

Magix项目的调试分析工具，直观的展示区块间的层级关系、事件绑定、数据共享等。实时以不同颜色显示渲染情况，正确渲染的区块以绿色表示，其它颜色则表示需要改进，鼠标移到相应的区块上会有关联提示

![snapshot](snapshot.png)

# 使用

`npm install magix-inspector`

然后在html页面中通过script引入，如

```html
<script type="text/javascript" src="node_modules/magix-inspector/src/index.js"></script>
```

或通过书签的方式添加一段js代码：

```js
javascript:void((function(d,s){s=d.createElement('script');s.src='https://thx.github.io/magix-inspector/index.js';s.charset='utf-8';d.body.appendChild(s)}(document)))
```

在运行Magix项目的页面上点击添加的书签，既可使用线上的Magix Inspector来查看区块间关系

## 安装chrome扩展

感谢邱德清同学提供的代码，详情请访问这里：https://github.com/qiu-deqing/magix-helper
