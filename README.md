<h1 align="center">
  @pansy/china-division
</h1>

> 提供中国省市区数据，基于[china-division](https://github.com/modood/Administrative-divisions-of-China)提供的数据

**提供两种数据格式**

- `{ v: string; n: string; c: {...}[] }`
- `{ label: string; value: string; children: {...}[] }` 适用于`Antd`级联选择组件

## ✨ 特性

- 🌈 基于`china-division`，提供了香港、澳门、台湾的数据
- 💻 使用 TypeScript 编写，提供完善的类型定义
- 🌴 提供`js`、`json`两种数据引用方式

## 🏗 安装

```sh
# yarn
yarn add @pansy/china-division

# npm
npm install @pansy/china-division --save 
```

## 🔨 使用

```ts
// Antd Cascader组件使用
import cascaderOptions from '@pansy/china-division';

// you code
```

## 🌟 社区互助

| Github Issue                                                 | 钉钉群                                                                                     | 微信群                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [issues](https://github.com/pansyjs/china-division/issues) | <img src="https://github.com/alitajs/alita/blob/master/public/dingding.png" width="100" /> | <img src="https://github.com/alitajs/alita/blob/master/public/wechat.png" width="100" /> |
