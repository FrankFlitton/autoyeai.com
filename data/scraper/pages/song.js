const $ = require('cheerio')

const getLyrics = async function (page) {
  try {
    let lyrics = $('div[class="lyrics"]', page).text().trim();
    if (!lyrics) {
      lyrics = ''
      $('div[class^="Lyrics__Container"]', page).each((i, elem) => {
        if ($(elem).text().length !== 0) {
          let snippet = $(elem).html()
            .replace(/<br>/g, '\n')
            .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
          lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
        }
      })
    }
    if (!lyrics) return null;
    return lyrics.trim();
  } catch (e) {
    throw e;
  }
};

const scrapingAction = async function (page, list, url) {
  const lyrics = await getLyrics(page)
  let song = {}

  if (lyrics.length > 0) {
    const isSimpleLayout = $('div[class^="Lyrics__Container"]', page).text().trim().length > 0


    if (isSimpleLayout) {

      const isSong = $('.HeaderTracklist__Album-sc-1qmk74v-3', page).text().trim().length > 0

      if (isSong) {
        song.title = $('h1.SongHeader__Title-sc-1b7aqpg-7.eJWiuG', page).text().trim()
        song.album = $('a.PrimaryAlbum__Title-cuci8p-4.NcWGs', page).text().trim()
        song.artist = $('a.Link-h3isu4-0.cGlaEJ', page).text().trim()
        song.number = $('.AlbumTracklist__TrackName-sc-123giuo-2.guEaas > div', page).text().split('.')[0].trim()

        song.lyrics = lyrics
        song.url = url
      }
    }
    if (!isSimpleLayout) {
      song.title = $('.header_with_cover_art-primary_info-title', page).text().trim()
      song.album = $('.song_album-info-title', page).text().trim()
      song.artist = $('.song_album-info-artist', page).text().trim()
      song.number = $('.track_listing-track--current', page).text().split('.')[0].trim()

      song.lyrics = lyrics
      song.url = url
    }
  }

  list.push(song)
}

module.exports = scrapingAction