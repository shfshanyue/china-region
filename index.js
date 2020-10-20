const data = require('./data/region')
const province = require('./data/province')

const region = Object.entries(data)

const provinceByName = keyBy(province, x => x[1].slice(0, 2))
const provinceByAlias = keyBy(province, x => x[2])

function keyBy (collection, f) {
  return collection.reduce((acc, x) => {
    acc[f(x)] = x
    return acc
  }, {})
}

function getProvinces () {
  return region.filter(([code]) => code.endsWith('0000')).map(([code, name]) => ({ code, name }))
}

function getCodeByProvinceName (name) {
  return provinceByAlias[name] || provinceByName[name] || null
}

function getPrefectures (provinceCode) {
  return region
    .filter(([code]) => code.endsWith('00'))
    .filter(([code]) => provinceCode ? code.slice(0, 2) === provinceCode.slice(0, 2) : true)
    .map(([code, name]) => ({ code, name }))
}

function getConties (regionCode) {
  return region
    .filter(([code]) => !code.endsWith('00'))
    .filter(([code]) => {
      if (!regionCode) {
        return true
      }
      if (regionCode.slice(2, 4) === '00') {
        return code.slice(0, 2) ===regionCode.slice(0, 2)
      }
      return code.slice(0, 4) ===regionCode.slice(0, 4)
    })
    .map(([code, name]) => ({ code, name }))
}

function info (code) {
  const provinceCode = code.slice(0, 2) + '0000'
  const prefectureCode = code.slice(0, 4) + '00'
  const name = data[code]
  if (!name) { return null }
  return {
    name,
    code,
    prefecture: data[prefectureCode],
    province: data[provinceCode]
  } 
}

module.exports = {
  info,
  getCodeByProvinceName,
  getProvinces,
  getPrefectures,
  getConties
}
