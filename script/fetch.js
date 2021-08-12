const axios = require('axios')
const cheerio = require('cheerio').default
const fs = require('fs')
const _ = require('lodash')

const { deprecatedRegion, newRegion } = require('./special')
const URL = 'http://www.mca.gov.cn/article/sj/xzqh/2020/20201201.html'

async function getCities() {
  const { data } = await axios.get(URL, {
    responseType: 'text'
  })

  const rows = cheerio('tr', data)
  const cities = Array.from(rows).map(row => {
    const tds = cheerio('td', row)
    const code = cheerio(tds[1]).text().trim()
    const name = cheerio(tds[2]).text().trim()
    return { code, name }
  }).filter(({ code }) => /\d{6}/.test(code))

  return cities
}

async function main() {
  const cities = await getCities()
  const cityDict = cities.reduce((dict, city) => {
    dict[city.code] = city.name
    return dict
  }, {})

  const newCities = _.omit({ ...cityDict, ...newRegion }, Object.keys(deprecatedRegion))

  fs.writeFileSync('./data/region.json', JSON.stringify(newCities, null, 2))
}

main()
  .then(() => console.log('DONE'))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
