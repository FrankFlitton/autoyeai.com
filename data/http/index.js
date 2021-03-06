require('dotenv').config()
const {
  default: axios
} = require('axios')

const token = "hZwYndpzkSjscP96KF7wzDlpvS699dbbzkDCpbiLyMODAxp-FLXcGEtu8hZ80Wp0"

const baseHttp = async (api, id, params) => {
  params = params || ''
  try {
    return await axios.get(`https://api.genius.com/${api}/${id}?access_token=${token}${params}`)
  } catch (e) {
    console.log(e)
  }
}

const getArtist = async (artistId) => {
  try {
    return await baseHttp('artists', artistId)
  } catch (e) {
    console.log(e)
  }
}

const songsByArtist = async (artistId, pageIndex) => {
  const urlParams = `&per_page=50&page=${pageIndex}`

  try {
    return await baseHttp('artists', artistId + '/songs', urlParams)
  } catch (e) {
    console.log(e)
  }
}

const http = {
  getArtist: getArtist,
  default: baseHttp,
  songsByArtist: songsByArtist
}

module.exports = http