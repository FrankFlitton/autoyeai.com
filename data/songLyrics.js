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

// For testing
// const songList = [{
//     name: 'Big Brother',
//     url: 'https://genius.com/Kanye-west-big-brother-lyrics'
//   },
//   {
//     name: 'Good Night',
//     url: 'https://genius.com/Kanye-west-good-night-lyrics'
//   },
// ]

const scrapeSongPages = async (songs) => {
  const scrapedLyrics = await scraper(
    songs,
    scrapingAction,
    'body',
    true,
    './rawdata/lyrics.json'
  )

  // const scrapedLyrics = json.readFile('./rawdata/lyrics')

  let filteredLyrics = []
  for (let i = 0; i < scrapedLyrics.length; i++) {
    if (scrapedLyrics[i].lyrics !== undefined) {
      filteredLyrics.push(scrapedLyrics[i])
    }
  }

  json.saveFile('./rawdata/lyrics', filteredLyrics)
}

scrapeSongPages(songList)