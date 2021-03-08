const http = require('./http')
const json = require('./json')
const constants = require('./constants')

async function songsByArtist(page) {
  try {
    const response = await http.songsByArtist(constants.artistId, page)
    return response
  } catch (e) {
    console.error(e)
  }
}

const getAllSongs = async () => {
  let songs = []

  for (let i = 1; i <= constants.maxPages; i++) {
    const data = await songsByArtist(i)
    const songList = data.data.response.songs
    filteredSongs = songList.filter(song => {
        return song.primary_artist.id === constants.artistId
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
    json.saveFile('./rawData/songs', songs)
  })