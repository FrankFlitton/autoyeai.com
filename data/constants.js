// Focusing of full releases
// Collaborations, alternate versions, leaks, live sets...
// maybe revisit for Yhandi, JIKII, DONDA...
// Need to add Kids See Ghosts, Watch the Throne, etc.
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

// User for searching, found manually
// Let's this portion run faster, no need to wait
const maxPages = 42

// Genius ID for Kanye West.
// Found from their API explorer.
const artistId = 72

constants = Object.freeze({
  nonCanonical,
  maxPages,
  artistId,
})

module.exports = constants