const json = require('./json')
const _ = require('lodash')

const lyricsData = json.readFile('rawdata/lyrics')

// Focusing of full releases
// Collaborations, alternate versions, leaks, live sets...
// maybe revisit for Yhandi, JIKII, DONDA...
const nonCanonical = [
  '',
  '2016 G.O.O.D. Fridays',
  'Boys Don’t Cry',
  'Can’t Tell Me Nothing',
  'DONDA: WITH CHILD',
  'Def Poetry Jam',
  'Freshmen Adjustment Vol. 1',
  'Freshmen Adjustment Vol. 2',
  'Freshmen Adjustment Vol. 3',
  'Get Well Soon...',
  'I’m Good',
  'JESUS IS KING II',
  'Kanye West Presents Good Music Cruel Summer',
  'Kanye West’s Visionary Streams of Consciousness', // TODO: make a program with just this
  'Kon the Louis Vuitton Don',
  'Late Orchestration',
  'Live at the Paradiso in Amsterdam',
  'Mike Dean Versions',
  'Ray Fridays',
  'The College Dropout: Video Anthology',
  'The Graduate',
  'Unreleased Songs',
  'VH1 Storytellers',
  'Yandhi'
]

const uniqueAlbums = _.uniq(
  lyricsData.map(song => song.album)
).sort()

function cleanAlbumName(name) {
  stringName = typeof name === 'string' ? name : ''
  return stringName.replace(/ *\([^)]*\) */g, "")
    .trim()
}

// Generate hashmap by album name
albumMap = {}
for (let i = 0; i < uniqueAlbums.length; i++) {
  album = cleanAlbumName(uniqueAlbums[i])
  albumMap[album] = []
}
// Sort
for (let i = 0; i < lyricsData.length; i++) {
  let title = lyricsData[i].title
  album = cleanAlbumName(lyricsData[i].album)

  // alternate versions
  if (!(title || '').includes('(HW Version)')) {
    albumMap[album].push(`${lyricsData[i].number}. ${title}`)
    albumMap[album].sort()
  }
}
// Remove
for (const key of nonCanonical) {
  if (Object.hasOwnProperty.call(albumMap, key)) {
    delete albumMap[key];
  }
}

console.log(albumMap)