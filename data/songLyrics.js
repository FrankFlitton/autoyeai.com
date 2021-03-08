const $ = require('cheerio')
const {
  filter
} = require('lodash')
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

const scrapeSongPages = async (songs) => {
  const scrapedLyrics = await scraper(
    songs,
    scrapingAction,
    'body',
    false,
    './rawData/lyrics.json'
  )

  let filteredLyrics = []
  for (let i = 0; i < scrapedLyrics.length; i++) {
    if (scrapedLyrics[i].lyrics !== undefined) {
      filteredLyrics.push(scrapedLyrics[i])
    }
  }

  json.saveFile('./rawData/lyrics', filteredLyrics)
}

scrapeSongPages(songList)