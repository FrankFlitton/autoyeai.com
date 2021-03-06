const json = require('./json')
const _ = require('lodash')

const lyricsData = json.readFile('rawdata/lyrics')

const uniqueAlbums = _.uniq(
  lyricsData.map(song => song.album)
).sort()

function cleanAlbumName(name) {
  stringName = typeof name === 'string' ? name : ''
  return stringName.replace(/ *\([^)]*\) */g, "")
    .trim()
}

albumMap = {}

for (let i = 0; i < uniqueAlbums.length; i++) {
  album = cleanAlbumName(uniqueAlbums[i])
  albumMap[album] = []
}

for (let i = 0; i < lyricsData.length; i++) {
  let title = lyricsData[i].title
  album = cleanAlbumName(lyricsData[i].album)
  albumMap[album].push(title)
}

console.log(albumMap)