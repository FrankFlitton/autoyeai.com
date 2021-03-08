const $ = require('cheerio')
const he = require('he');

const removeAds = function (element) {
  $('div[class^="RightSidebar"]', element).each(function (i, elem) {
    $(elem).remove()
  })
  $('div[class^="InreadAd"]', element).each(function (i, elem) {
    $(elem).remove()
  })
}
const whitespace = function (element) {
  return element
    .replace(/\n/g, '<br>\n')
    .replace(/<br>/g, '\n')
    .replace(/<(?!\s*(i|a|b)\s*\/?)>/gi, '\n') // HTML catch all, leave content
    .replace(/<(?!\s*(br)\s*\/?)[^>]+>/gi, '') // highlights
    .replace(/<(?!\s*(iframe)\s*\/?)[^>]+>/gi, ''); // iframe
}
const whitespaceAlt = function (element) {
  return element
    .replace(/<br>/g, '\n')
    .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '') // highlights
    .replace(/<(.|\n)*?>/g, ''); // HTML catch all, leave content
}

function hasNewLine(lyrics, failedList, scrapeObj) {
  if (!lyrics.includes('\n')) {
    failedList.push(scrapeObj)
    throw 'Error: ' + scrapeObj.name + ' has no new lines, try again';
  }
}

function hasAdText(lyrics, failedList, scrapeObj) {
  if (!lyrics.includes('Official Lyrics & Meaning')) {
    failedList.push(scrapeObj)
    throw 'Error: ' + scrapeObj.name + ' has Genius Ad text, try again';
  }
}

const getLyrics = async function (page, failedList, scrapeObj) {
  removeAds(page);
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
          if (!snippet.includes('Official Lyrics & Meaning')) {
            snippet = whitespace(snippet)
            lyrics += he.decode(snippet) + ''
          }
          // lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
        }
      })
    }

    hasNewLine(lyrics, failedList, scrapeObj)

    if (!lyrics) return null;
    return lyrics.trim();
  } catch (e) {
    throw e;
  }
};

const scrapingAction = async function (page, list, failedList, url, name, elem) {
  await elem.addStyleTag({
    content: '*{whitespace: pre-wrap}'
  })
  page = await elem.content()
  const lyrics = await getLyrics(page, failedList, {
    name,
    url
  })
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