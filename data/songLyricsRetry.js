const $ = require('cheerio')
const json = require('./json')
const scraper = require('./scraper')
const scrapingAction = require('./scraper/pages/song.js')

const lyricsList = json.readFile('./rawdata/lyrics')
const failedList = json.readFile('./jsonFailed')

const scrapeSongPages = async (songs) => {
  newLyrics = await scraper(
    songs,
    scrapingAction,
    'body',
    true,
  )

  let filteredLyrics = []
  for (let i = 0; i < newLyrics.length; i++) {
    if (newLyrics[i].lyrics !== undefined) {
      filteredLyrics.push(newLyrics[i])
    }
  }

  // Append
  for (let i = 0; i < filteredLyrics.length; i++) {
    lyricsList.push(filteredLyrics[i])
  }
  json.saveFile('./rawdata/lyrics', lyricsList)
}

scrapeSongPages(failedList)