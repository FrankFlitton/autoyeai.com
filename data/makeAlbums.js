const json = require('./json')
const _ = require('lodash')

const lyricsData = json.readFile('rawdata/lyrics')

const uniqueAlbums = _.uniq(
  lyricsData.map(song => song.album)
)

console.log(uniqueAlbums)