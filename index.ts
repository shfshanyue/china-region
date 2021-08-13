import data from './data/region.json'
import province from './data/province.json'

interface Region {
  code: string;
  name: string;
}

interface Dictionary<T> {
  [index: string]: T;
}

const region = Object.entries(data)

const provinceByName = keyBy(province, (x: any) => x[1].slice(0, 2))
const provinceByAlias = keyBy(province, (x: any) => x[2])

function keyBy<T> (collection: T[], f: any): Dictionary<T> {
  return collection.reduce((acc, x) => {
    acc[f(x)] = x
    return acc
  }, {} as any)
}

export function getAllRegions (): Region[] {
  return region.map(([code, name]) => ({ code, name }))
}

export function getProvinces (): (Region & { alias: string })[] {
  return province.map(p => {
    return {
      code: p[0],
      name: p[1],
      alias: p[2]
    }
  })
}

export function getCodeByProvinceName (name: string): string | null {
  const alias = name.slice(0, 2)
  return provinceByAlias[alias]?.[0] || provinceByName[alias]?.[0] || null
}

export function getPrefectures (provinceCode?: string): Region[] {
  return region
    // 最后两位是 00，而中间两位不是 00 的是为地级行政区
    .filter(([code]) => code.endsWith('00') && code.slice(2, 4) !== '00')
    .filter(([code]) => provinceCode ? code.slice(0, 2) === provinceCode.slice(0, 2) : true)
    .map(([code, name]) => ({ code, name }))
}

export function getCounties (regionCode?: string): Region[] {
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

// 省管市
export function getSpecialCounties (regionCode?: string): Region[] {
  return region
    // 省管市中间区号为 00
    .filter(([code]) => !code.endsWith('00') && code.slice(2, 4) === '90')
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

export function info (code: string): {
  name: string;
  code: string;
  prefecture: string;
  province: string;
} | null {
  const provinceCode = code.slice(0, 2) + '0000'
  const prefectureCode = code.slice(0, 4) + '00'
  const name = (data as any)[code]
  if (!name) { return null }
  return {
    name,
    code,
    prefecture: (data as any)[prefectureCode] || null,
    province: (data as any)[provinceCode] || null
  } 
}
