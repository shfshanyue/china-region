// 用此文件校验民政部的不及时数据

const deprecatedRegion = {
  // 2020年6月5日，中华人民共和国国务院批复同意撤销烟台市蓬莱市、长岛县，合并设立烟台市蓬莱区。
  370634: '长岛县',
  370684: '蓬莱市'
}

const newRegion = {
  370614: '蓬莱区'
}

module.exports = {
  deprecatedRegion,
  newRegion
}
