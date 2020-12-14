<h1 align="center">
  @pansy/china-division
</h1>

> 基于[china-division](https://github.com/modood/Administrative-divisions-of-China), 提供中国省市区数据并提供相应的工具方法

**提供两种数据格式**

- `{ v: string; n: string; c: {...}[] }`
- `{ label: string; value: string; children: {...}[] }` 适用于`Antd`级联选择组件

如有更新数据的需求，请修改`china-division`版本，执行`npm run export:data`即可。

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
import cascaderOptions, { DivisionUtil } from '@pansy/china-division';

const divisionUtil = new DivisionUtil(cascaderOptions);

// 返回源数据
divisionUtil.getSourceData(); 

// 返回省级别数据
divisionUtil.getProvinces(); 

// 返回指定Code的所有子节点
divisionUtil.getChildrenByCode('110000'); 

// 返回指定Code的名称
divisionUtil.getNameByCode('110000'); 

// 返回指定Code的节点
divisionUtil.getDivisionByCode('110000'); 
```

## ⌨️ 本地开发

```sh
$ git clone git@github.com:pansyjs/china-division.git
$ cd china-division
# 安装依赖
$ yarn
# 导出数据
$ npm run export:data
# 运行测试用例
$ npm run test
# 编译项目
$ npm run build
```

## 🌟 社区互助

| Github Issue                                                 | 钉钉群                                                                                     | 微信群                                                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [issues](https://github.com/pansyjs/china-division/issues) | <img src="https://github.com/alitajs/alita/blob/master/public/dingding.png" width="100" /> | <img src="https://github.com/alitajs/alita/blob/master/public/wechat.png" width="100" /> |
