const $ = require('cheerio')
const json = require('./json')
const scraper = require('./scraper')
const scrapingAction = require('./scraper/pages/song.js')

const songData = json.readFile('./rawData/songs')
const songList = songData.map(song => {
  return {
    url: song.url,
    name: song.full_title
  }
})

const failedSongs = json.readFile('./jsonFailed')

const scrapeSongPages = async (songs) => {
  await scraper(
    songs,
    scrapingAction,
    'body',
    false,
    './rawdata/lyrics.json'
  )
}

scrapeSongPages(songList)