# 中国省市县行政区代码

## API

### cn.get(code)

返回某个行政区号代表的行政区

``` js
// { name: '洪洞县', code: '141024', prefecture: '临汾市', province: '山西省' }
cn.get('141024')
```

### cn.provinces()

返回中国所有的省级行政区

``` js
cn.provinces()
```

### cn.prefectures(code)

code 指行政区代码，code 为空时返回中国所有的地级行政区，不为空时返回该省级行政区的所有地级行政区

``` js
// 列出中国所有的地级行政区
cn.prefectures()

// 以下均列出 10 所代表省下辖的所有地级行政区
cn.prefectures('100000')
cn.prefectures('101000')
cn.prefectures('101010')
```

### cn.counties(code)

code 指行政区代码，code 为空时返回中国所有的县级行政区，不为空时返回该省/市级行政区的所有地级行政区

``` js
// 列出中国所有的县级行政区
cn.counties()

// 列出 10 所代表省下辖的所有县级行政区
cn.prefectures('100000')

// 列出 1010 所代表地下辖的所有县级行政区
cn.prefectures('101000')
```
## 术语

> 关于行政区级别翻译参考知乎两篇关于地名翻译的文章
> 
> + [乡、镇、屯、自然村、组、生产队、自治区等名词有官方的英语翻译吗？](https://www.zhihu.com/question/30518257/answer/48380073)
> + [地名如何翻译](https://zhuanlan.zhihu.com/p/32434457)

+ `province`，省级行政区，包括直辖市、省、自治区、特别行政区。
+ `prefecture`，地级行政区，包括地级市、地区、自治州、盟。
+ `county`，县级行政区，包括市辖区、县级市、县、自治县、旗、自治旗、特区、林区。

## 数据获取

行政代码在国家标准《中华人民共和国行政区划代码》即 GB2260 的标准下制定，可以在民政部统计数据中查询。

+ [2020年中华人民共和国行政区划代码](http://www.mca.gov.cn/article/sj/xzqh/2020/)

## 相关仓库

+ [china-area-data](https://github.com/airyland/china-area-data)
+ [province-city-china](https://github.com/uiwjs/province-city-china)
+ [GB2260](https://github.com/cn/GB2260)
