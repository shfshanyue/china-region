import { describe, it } from 'mocha'
import { expect } from 'chai'

import { getCodeByProvinceName, getCounties, getPrefectures, getProvinces, getSpecialCounties, info } from './index'

describe('China Region', function () {
  it('getCodeByProvinceName', async () => {
    const code1 = getCodeByProvinceName('晋')
    const code2 = getCodeByProvinceName('山西')
    const code3 = getCodeByProvinceName('山西省')

    expect(code1).to.eq(code2).eq(code3).eq('140000')

    const code4 = getCodeByProvinceName('新')
    const code5 = getCodeByProvinceName('新疆')
    const code6 = getCodeByProvinceName('新疆维吾尔自治区')

    expect(code4).to.eq(code5).eq(code6).eq('650000')

    const code7 = getCodeByProvinceName('旧')
    expect(code7).to.eq(null)
  })

  it('getProvinces', async () => {
    const provinces = getProvinces()

    expect(provinces).to.length(34)
    expect(provinces).to.deep.include({
      code: '140000',
      name: '山西省',
      alias: '晋'
    })
  })

  it('getPrefectures', async () => {
    const prefectures = getPrefectures()

    // 民政部统计下全国 333 个地级行政区
    expect(prefectures).to.length(333)
    expect(prefectures).to.deep.include({
      code: '141000',
      name: '临汾市'
    })
    expect(prefectures).to.deep.include({
      code: '610100',
      name: '西安市'
    })

    const shanxiPrefectures = getPrefectures('140000')

    // 山西省下辖 11 个地级市
    expect(shanxiPrefectures).to.length(11)
    expect(shanxiPrefectures).to.deep.include({
      code: '141000',
      name: '临汾市'
    })
  })

  it('getCounties', async () => {
    const counties = getCounties()

    expect(counties).to.length(2842)
    expect(counties).to.deep.include({
      code: '110108',
      name: '海淀区'
    })
    expect(counties).to.deep.include({
      code: '141024',
      name: '洪洞县'
    })

    const shanxiCounties = getCounties('140000')

    expect(shanxiCounties).to.length(117)
    expect(shanxiCounties).to.deep.include({
      code: '141024',
      name: '洪洞县'
    })
  })

  it('getSpecialCounties', async () => {
    const counties = getSpecialCounties()

    expect(counties).to.deep.include({
      code: '429006',
      name: '天门市'
    })

    const shanxiCounties = getSpecialCounties('140000')

    expect(shanxiCounties).to.length(0)

    const hubeiCounties = getSpecialCounties('420000')

    expect(hubeiCounties).to.length(4)
  })

  it('info', async () => {
    const hongtong = info('141024')
    expect(hongtong).to.deep.eq({
      name: '洪洞县',
      code: '141024',
      prefecture: '临汾市',
      province: '山西省'
    })

    const wu = info('xx1024')
    expect(wu).to.eq(null)
  })
})
