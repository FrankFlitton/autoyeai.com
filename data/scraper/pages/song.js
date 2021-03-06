const $ = require('cheerio')

const scrapingAction = function (page, list, url) {
  const isSimpleLayout = $('.Lyrics__Container-sc-1ynbvzw-2', page).text().trim().length > 0
  let song = {}

  if (isSimpleLayout) {

    const isSong = $('.HeaderTracklist__Album-sc-1qmk74v-3', page).text().trim().length > 0

    if (isSong) {
      song.title = $('h1.SongHeader__Title-sc-1b7aqpg-7.eJWiuG', page).text().trim()
      song.album = $('a.PrimaryAlbum__Title-cuci8p-4.NcWGs', page).text().trim()
      song.artist = $('a.Link-h3isu4-0.cGlaEJ', page).text().trim()
      song.number = $('.AlbumTracklist__TrackName-sc-123giuo-2.guEaas > div', page).text().split('.')[0].trim()

      song.lyrics = $('.Lyrics__Container-sc-1ynbvzw-2.jgQsqn', page).html().replace(/<(?:.|\n)*?>/gm, '\n').trim()
    }
  }
  if (!isSimpleLayout) {
    song.title = $('.header_with_cover_art-primary_info-title', page).text().trim()
    song.album = $('.song_album-info-title', page).text().trim()
    song.artist = $('.song_album-info-artist', page).text().trim()
    song.number = $('.track_listing-track--current', page).text().split('.')[0].trim()

    song.lyrics = $('.lyrics', page).html().replace(/<(?:.|\n)*?>/gm, '\n').trim()
  }

  list.push(song)
}

module.exports = scrapingAction