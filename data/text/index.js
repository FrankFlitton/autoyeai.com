const fs = require('fs')
const dirname = require('path').dirname


const saveText = (fileName, data) => {
  try {
    const dir = dirname(fileName)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
      saveText(fileName, data)
    } else {
      fs.writeFileSync(fileName + ".text", data)
    }
    //file written successfully
  } catch (err) {
    console.error(err)
  }
}

const readText = (fileName) => {
  let data = {}
  try {
    data = fs.readFileSync(fileName + ".text", "utf8")
  } catch (err) {
    console.error(err)
  }
  return data
}

const text = {
  saveText,
  readText
}

module.exports = text