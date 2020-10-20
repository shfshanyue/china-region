const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

async function getCities() {
  const url = 'http://www.mca.gov.cn//article/sj/xzqh/2020/2020/2020092500801.html'
  const { data } = await axios.get(url, {
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

  console.log(cityDict)

  fs.writeFileSync('./data/region.json', JSON.stringify(cityDict, null, 2))
}

main()
  .then(() => console.log('DONE'))
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
