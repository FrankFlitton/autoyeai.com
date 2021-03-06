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

  // Append
  for (let i = 0; i < newLyrics.length; i++) {
    lyricsList.push(newLyrics[i])
  }
  json.saveFile('./rawdata/lyricsNew', lyricsList)
}

scrapeSongPages(failedList)