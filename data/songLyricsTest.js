const $ = require('cheerio')
const scraper = require('./scraper')
const scrapingAction = require('./scraper/pages/song.js')

const songList = [
  // For testing
  {
    name: 'Big Brother', // Concatenation
    url: 'https://genius.com/Kanye-west-big-brother-lyrics'
  },
  {
    name: 'Good Night', // Good
    url: 'https://genius.com/Kanye-west-good-night-lyrics'
  },
  {
    name: 'Yikes', // Picky layout
    url: 'https://genius.com/Kanye-west-looking-for-trouble-lyrics'
  }, {
    name: 'Looking For Trouble', // Concatenation, bold and italics? All have annotation
    url: 'https://genius.com/Kanye-west-looking-for-trouble-lyrics'
  },
]

const scrapeSongPages = async (songs) => {
  const scrapedLyrics = await scraper(
    songs,
    scrapingAction,
    'body',
    true,
    './rawData/lyrics.json'
  )

  console.log(scrapedLyrics)
}

scrapeSongPages(songList)