const makeAlbums = require('./makeAlbums')
const csv = require('./csv')
const text = require('./text')

const cleanAds = (lyrics) => {
  const rawLyrics = '' + lyrics
  const stringSong = rawLyrics.split('\n').map(s => s.trim()).join('\n')
  let cleanedSong = ''

  // PreRenderedAdRegex = /(^[0-9]\,\s\')[^]+(^\[)/mgi
  // JS implementation of above is too greedy,
  // skipped to last instance of [
  // 1/2 of song was missing.

  PreRenderedAdRegex = /(^[0-9]\,\s\')(?:\r|\n|.)*(?=\n\n\n)/mgi
  // take advantage of lines w/ stripped html tags

  const isAdsMatch = stringSong.match(PreRenderedAdRegex)

  if (isAdsMatch !== null) {
    cleanedSong = stringSong.replace(PreRenderedAdRegex, '')
      .replace(/\n\n\n/gmi, '\n')
      .replace(/\n\n\n/gmi, '\n'); // Cleans up nice
  } else {
    cleanedSong = stringSong
  }
  return cleanedSong
}

const tokenizeLyrics = (lyrics, song) => {
  try {
    let lyricsA = lyrics.split('\n')
    let tokens = []
    let currentSection = 'Intro'
    let currentLineNumber = 1
    let currentSpeaker = 'Kanye West'

    for (let i = 0; i < lyricsA.length; i++) {
      let data = lyricsA[i].trim()

      // New Section [Section: Artist] or [Section]
      if (data.includes('[') && data.includes(']')) {
        // Save Current Section
        const label = data.replace(/[\[|\]]/g, '').trim()
        if (label.includes(':')) {
          currentSection = label.split(':')[0].trim()
          currentSpeaker = label.split(':')[1].trim()
        } else {

        }

      } else {
        if (data !== '') {
          data = data
          type = currentSection
          speaker = currentSpeaker
          lineNumber = currentLineNumber
          songTitle = song.title
          songNumber = song.number
          album = song.album

          tokens.push({
            data,
            type,
            speaker,
            lineNumber,
            songTitle,
            songNumber,
            album
          })
          currentLineNumber++
        }
      }
    }

    return tokens
  } catch (e) {
    console.log(song.title, song.album)
    console.error(e)
  }
}

const processAlbums = (albumMap) => {
  const albumNames = Object.keys(albumMap)
  let masterRecords = []
  for (let a = 0; a < albumNames.length; a++) {
    // for (let a = 0; a < 5; a++) {
    let albumRecords = []
    const albumName = albumNames[a]
    const album = albumMap[albumName]


    for (let s = 0; s < album.length; s++) {

      let song = album[s]
      const lyricsRaw = song['lyrics']
      const lyrics = cleanAds(lyricsRaw)
      const tokens = tokenizeLyrics(lyrics, song)
      albumRecords = [].concat(albumRecords, tokens)
    }
    console.log(albumRecords.length)

    const csvData = csv.fromArray(albumRecords)
    masterRecords = [].concat(masterRecords, albumRecords)
    csv.saveCSV('./cleanData/' + albumName, csvData)
  }
  csv.saveCSV('./cleanData/master', csv.fromArray(masterRecords))

  // Save text Files
  const masterTextPile = masterRecords.map(df => df.data).join("\n")
  text.saveText('./cleanData/masterPile', masterTextPile)

  let currentType = 'Intro'
  let TaggedText = [`\[${currentType}\]`]
  for (let i = 0; i < masterRecords.length; i++) {
    const df = masterRecords[i]
    if (currentType !== df.type) {
      currentType = df.type
      TaggedText.push([`\n\[${currentType.replace(/[0-9]/g, '').trim()}\]`])
    }

    TaggedText.push(df.data)
  }
  const TaggedTextPile = TaggedText.join('\n')
  text.saveText('./cleanData/masterTagged', TaggedTextPile)
}


const albumMap = makeAlbums()
processAlbums(albumMap)

// console.log(albumMap['808s & Heartbreak'][0])

// const testSong = albumMap['Yeezus'][2].lyrics
// const cleanLyrics = cleanAds(testSong)
// const tokens = tokenizeLyrics(cleanLyrics)
// const test = csv.saveCSV('./cleanData/test/test', csv.fromArray(tokens))
// console.log(test)