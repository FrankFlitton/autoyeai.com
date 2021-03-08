const _ = require('lodash')
const json = require('./json')
const constants = require('./constants.js')

const lyricsDataRaw = json.readFile('rawData/lyrics')

function cleanAlbumName(name) {
  stringName = typeof name === 'string' ? name : ''
  return stringName.replace(/ *\([^)]*\) */g, "")
    .trim()
}

// Setup data
const lyricsData = lyricsDataRaw.map((song) => {
  song.album = cleanAlbumName(song.album)
  song.number = parseInt((song.number || '-1').replace(/[^0-9.]/g, ''))
  return song
}).filter((song) => {
  let isCanon = constants.nonCanonical.indexOf(song.album) === -1
  let notAltVersion = !(song.title || '').includes('(HW Version)')
  return isCanon && notAltVersion
})


// Generate hashmap by album name
albumMap = {}
for (let i = 0; i < lyricsData.length; i++) {
  let song = lyricsData[i]
  if (!Object.hasOwnProperty.call(albumMap, song.album)) {
    albumMap[song.album] = []
  } else {
    albumMap[song.album].push(song)
  }
}

// Sort by track number
for (const album of Object.keys(albumMap)) {
  if (Object.hasOwnProperty.call(albumMap, album)) {
    albumMap[album] = _.sortBy(albumMap[album], ['number'])
  }
}

console.log(albumMap)