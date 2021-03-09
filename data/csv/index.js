const fs = require('fs')
const dirname = require('path').dirname


const saveCSV = (fileName, data) => {
  try {
    const dir = dirname(fileName)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
      saveCSV(fileName, data)
    } else {
      fs.writeFileSync(fileName + ".csv", data)
    }
    //file written successfully
  } catch (err) {
    console.error(err)
  }
}

const readCSV = (fileName) => {
  let data = {}
  try {
    data = fs.readFileSync(fileName + ".csv", "utf8")
    // data = JSON.parse(data)
  } catch (err) {
    console.error(err)
  }
  return data
}

const fromArray = (dataObj) => {
  console.log(dataObj[0])
  let csv = ''
  const separator = '||'
  let headers = []
  try {
    headers = Object.keys(dataObj[0])
  } catch (e) {
    console.error(e)
    console.log(dataObj[0])
  }

  csv += headers.join(separator) + separator

  for (let i = 0; i < dataObj.length; i++) {
    let newLine = ''
    let token = dataObj[i]
    for (let h = 0; h < headers.length; h++) {
      const header = headers[h]
      newLine += token[header] + separator
    }
    csv += '\n' + newLine
  }

  return csv
}


const csv = {
  saveCSV,
  readCSV,
  fromArray
}

module.exports = csv