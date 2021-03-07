const fs = require('fs')
const puppeteer = require('puppeteer')
const _ = require('lodash')

// Variables
const parallelScrapers = 4 // Max async processes, prevent mem leaks

const scraper = async (urlList = [], scrapingAction, waitFor = 'body', onlyScrape = false, fileName = 'cache.json', parallel = parallelScrapers, ) => {
  const parallelBatches = Math.ceil(urlList.length / parallel)

  var builtList = []
  var failedList = []

  console.log('\nI have gotten the task of gathering from ' + urlList.length + ' pages and will take ' + parallel + ' of them in parallel.')

  console.log(' This will result in ' + parallelBatches + ' batches.')

  // Split up the Array of urlList
  let k = 0
  for (let i = 0; i < urlList.length; i += parallel) {
    k++
    console.log('\nBatch ' + k + ' of ' + parallelBatches)
    // Launch and Setup Chromium
    const browser = await puppeteer.launch()
    // Fun with puppeteer
    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage()
    page.setJavaScriptEnabled(false)

    const promises = []
    for (let j = 0; j < parallel; j++) {
      let elem = i + j
      // only proceed if there is an element
      if (urlList[elem] !== undefined) {
        // Promise to take Screenshots
        // promises push
        console.log('🖖 I promise to scrape: ' + urlList[elem].name)
        promises.push(browser.newPage().then(async page => {
          await page.setViewport({
            width: 1280,
            height: 800
          })
          try {
            // Only if page.goto get's no error
            await page.goto(urlList[elem].url, {
              timeout: 10000
            })

            await page.waitForSelector(waitFor, {
              visible: true,
              timeout: 2000
            })

            // normal routine
            try {
              let html = await page.content()
              await scrapingAction(html, builtList, urlList[elem].url, urlList[elem].name, page)
              console.log('🤞 I have kept my promise to scrape ' + urlList[elem].name)
            } catch (e) {
              console.log(e)
            }

          } catch (err) {
            console.log('❌ Sorry! I couldn\'t keep my promise to scrape ' + urlList[elem].name)
            failedList.push(urlList[elem])
            console.log(err)
          }
        }))
      }
    }

    // await promise all and close browser
    await Promise.all(promises)
    await browser.close()

    console.log('\nI finished this batch.')
    console.log('I have now collected ' + builtList.length)
    console.log('\nI finished this batch. I\'m ready for the next batch')
  }

  _.uniqBy(builtList, builtList.url)

  if (!onlyScrape) {
    const json = JSON.stringify(builtList)
    fs.writeFile(fileName, json, 'utf8', () => {})
  }

  const jsonFailed = JSON.stringify(failedList)
  fs.writeFile('jsonFailed.json', jsonFailed, 'utf8', () => {})

  return builtList
}

module.exports = scraper