# 中国行政区划代码

[![npm version](https://img.shields.io/npm/v/china-region.svg?style=flat-square)](https://www.npmjs.org/package/china-region)
[![install size](https://packagephobia.now.sh/badge?p=china-region)](https://packagephobia.now.sh/result?p=china-region)
[![npm downloads](https://img.shields.io/npm/dw/china-region.svg?style=flat-square)](http://npm-stat.com/charts.html?package=china-region)

根据国家标准《中华人民共和国行政区划代码》即 GB2260 标准制定，用以查看各个省地县的行政区划代码，并支持多级联动查询

1. 丰富的 API，满足多种级联查询
1. 较小的 npm 包体积

## Install

``` bash
$ npm install china-region
```

## API

``` js
const cn = require('china-region')

const code = cn.getCodeByProvinceName('晋')

const cities = cn.getPrefectures(code)
// [
//   { code: '140100', name: '太原市' },
//   { code: '140200', name: '大同市' },
//   { code: '140300', name: '阳泉市' },
//   { code: '140400', name: '长治市' },
//   { code: '140500', name: '晋城市' },
//   { code: '140600', name: '朔州市' },
//   { code: '140700', name: '晋中市' },
//   { code: '140800', name: '运城市' },
//   { code: '140900', name: '忻州市' },
//   { code: '141000', name: '临汾市' },
//   { code: '141100', name: '吕梁市' }
// ]
```

### cn.getCodeByProvinceName(name)

根据升级行政区名称或简称获取行政区划代码

``` js
// '140000'
cn.getCodeByProvinceName('山西省')

// '140000'
cn.getCodeByProvinceName('山西')

// '140000'
cn.getCodeByProvinceName('晋')
```

### cn.info(code)

返回某个行政区号代表的行政区

``` js
// { name: '洪洞县', code: '141024', prefecture: '临汾市', province: '山西省' }
cn.get('141024')

// { name: '山西省', code: '140000', prefecture: null, province: null }
cn.get('140000')
```

### cn.getProvinces()

返回中国所有的省级行政区

``` js
cn.getProvinces()
```

### cn.getPrefectures(code)

返回中国/某省级行政区下所有的地级行政区

code 指行政区代码，code 为空时返回中国所有的地级行政区，不为空时返回该省级行政区的所有地级行政区

``` js
// 列出中国所有的地级行政区
cn.getPrefectures()

// 以下均列出 10 所代表省下辖的所有地级行政区
cn.getPrefectures('100000')
cn.getPrefectures('101000')
cn.getPrefectures('101010')
```

### cn.getCounties(code)

返回中国/某省级行政区/某地级行政区下所有的县级行政区

code 指行政区代码，code 为空时返回中国所有的县级行政区，不为空时返回该省/市级行政区的所有地级行政区

``` js
// 列出中国所有的县级行政区
cn.getCounties()

// 列出 10 所代表省下辖的所有县级行政区
cn.getCounties('100000')

// 列出 1010 所代表地下辖的所有县级行政区
cn.getCounties('101000')
```

### cn.getSpecialConties(code)

返回中国/某省级行政区下所有的省直管县。如海南省的各县和县级市、湖北省的仙桃市、潜江市、天门市、神农架林区、河南省的济源市、新疆的数个由自治区和新疆兵团双重领导的县级市等

code 指行政区代码，code 为空时返回中国所有的县级行政区，不为空时返回该省/市级行政区的所有地级行政区

``` js
// 列出中国所有的省直管县
cn.getSpecialCounties()

// 列出 10 所代表省下辖的所有省直管县
cn.getSpecialCounties('100000')
```

## 术语

> 关于行政区级别翻译参考知乎两篇关于地名翻译的文章
> 
> + [乡、镇、屯、自然村、组、生产队、自治区等名词有官方的英语翻译吗？](https://www.zhihu.com/question/30518257/answer/48380073)
> + [地名如何翻译](https://zhuanlan.zhihu.com/p/32434457)

+ `province`，省级行政区，包括直辖市、省、自治区、特别行政区。
+ `prefecture`，地级行政区，包括地级市、地区、自治州、盟。
+ `county`，县级行政区，包括市辖区、县级市、县、自治县、旗、自治旗、特区、林区。
+ `specialCounty`，省直管县级行政区，如湖北的仙桃、潜江与天门

## 数据获取

行政代码在国家标准《中华人民共和国行政区划代码》即 GB2260 的标准下制定，可以在民政部统计数据中查询。

+ [2020年中华人民共和国行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2020/)

## 相关仓库

+ [china-area-data](https://github.com/airyland/china-area-data)
+ [province-city-china](https://github.com/uiwjs/province-city-china)
+ [GB2260](https://github.com/cn/GB2260)

