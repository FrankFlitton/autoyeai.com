const $ = require('cheerio')
const he = require('he');


const whitespace = function (element) {
  return element
    .replace(/\n/g, '<br>\n')
    .replace(/<br>/g, '\n')
    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, ''); // highlights
}
const whitespaceAlt = function (element) {
  return element
    .replace(/<br>/g, '\n')
    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, ''); // highlights
}

const getLyrics = async function (page) {
  try {
    let lyrics = '';
    let lyricsHTML = $('div[class="lyrics"]', page).html()
    if (lyricsHTML) {
      lyricsHTML = whitespace(lyricsHTML)
      // lyricsHTML = lyricsHTML.replace(/<(?:.|\n)*?>/gm, '\n');
      lyrics = he.decode(lyricsHTML) + '';
    };
    // let lyrics = $('div[class="lyrics"]', page).html().replace(/<(?:.|\n)*?>/gm, '\n');
    // let lyrics = whitespace($('div[class="lyrics"]', page)) + 'zzz';
    if (!lyrics) {
      lyrics = ''
      $('div[class^="Lyrics__Container"]', page).each((i, elem) => {
        if ($(elem).text().length !== 0) {
          let snippet = $(elem).text()
          snippet = whitespace($(elem).text())
          lyrics += he.decode(snippet) + ''
          // lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
        }
      })
    }
    if (!lyrics) return null;
    return lyrics.trim();
  } catch (e) {
    throw e;
  }
};

const scrapingAction = async function (page, list, url, name, elem) {
  await elem.addStyleTag({
    content: '*{whitespace: pre-wrap}'
  })
  page = await elem.content()
  const lyrics = await getLyrics(page)
  let song = {}

  if (lyrics !== null) {
    if (lyrics.length > 0) {
      const isSimpleLayout = $('div[class^="Lyrics__Container"]', page).text().trim().length > 0
      if (isSimpleLayout) {

        const isSong = $('.HeaderTracklist__Album-sc-1qmk74v-3', page).text().trim().length > 0

        if (isSong) {
          song.title = $('h1[class^="SongHeader__Title"]', page).text().trim()
          song.album = $('a[class^="PrimaryAlbum__Title"]', page).text().trim()
          song.number = $('.AlbumTracklist__TrackName-sc-123giuo-2.guEaas > div', page).text().split('.')[0].trim()

          song.lyrics = lyrics
          song.url = url
        }
      }
      if (!isSimpleLayout) {
        song.title = $('.header_with_cover_art-primary_info-title', page).text().trim()
        song.album = $('.song_album-info-title', page).text().trim()
        song.number = $('.track_listing-track--current', page).text().split('.')[0].trim()

        song.lyrics = lyrics
        song.url = url
      }
    }
  }

  list.push(song)
}

module.exports = scrapingAction