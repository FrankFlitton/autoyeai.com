const fs = require('fs')

const readFile = (fileName) => {
  let data = {}
  try {
    data = fs.readFileSync(fileName + ".json", "utf8")
    data = JSON.parse(data)
  } catch (err) {
    console.error(err)
  }
  return data
}

const saveFile = (fileName, data) => {
  const jsonData = JSON.stringify(data)
  try {
    const data = fs.writeFileSync(fileName + ".json", jsonData)
    console.log(data)
    //file written successfully
  } catch (err) {
    console.error(err)
  }
};

const json = {
  readFile: readFile,
  saveFile: saveFile,
}

module.exports = json