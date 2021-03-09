const fs = require('fs')
const dirname = require('path').dirname


const saveTxt = (fileName, data) => {
  try {
    const dir = dirname(fileName)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
      saveTxt(fileName, data)
    } else {
      fs.writeFileSync(fileName + ".txt", data)
    }
    //file written successfully
  } catch (err) {
    console.error(err)
  }
}

const readTxt = (fileName) => {
  let data = {}
  try {
    data = fs.readFileSync(fileName + ".txt", "utf8")
  } catch (err) {
    console.error(err)
  }
  return data
}

const txt = {
  saveTxt,
  readTxt
}

module.exports = txt