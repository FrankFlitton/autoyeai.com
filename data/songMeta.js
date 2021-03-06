const http = require('./http')
const json = require('./json')

const artistId = 72

async function songsByArtist(page) {
  try {
    const response = await http.songsByArtist(artistId, page)
    return response
  } catch (e) {
    console.error(e)
  }
}

const getAllSongs = async () => {
  let songs = []
  maxPages = 42 // found manually

  for (let i = 1; i <= maxPages; i++) {
    const data = await songsByArtist(i)
    const songList = data.data.response.songs
    filteredSongs = songList.filter(song => {
        return song.primary_artist.id === artistId
      })
      .filter(song => {
        return !song.full_title.toLowerCase().includes('remix')
      })
      .filter(song => {
        return !song.full_title.toLowerCase().includes('demo')
      })
      .filter(song => {
        return !song.full_title.toLowerCase().includes('(original)')
      })
    filteredSongs.map(song => songs.push(song))
    console.log(i, songs.length)
  }

  return songs
}

getAllSongs()
  .then(songs => {
    json.saveFile('./rawdata/songs', songs)
  })