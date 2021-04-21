const censorList = {
  fucked: 'loved',
  fucker: 'lover',
  fuck: 'love',
  drug: 'candy',
  ass: 'booty',
  dick: 'boss',
  boob: 'lady part',
  pussy: 'lady',
  bitch: 'girl',
  shit: 'poo poo',
  nigger: 'black friend',
  nigga: 'buddy',
}

const censorWord = (word) => {
  if (typeof word !== 'string' || word === '') return word

  const isTitleCase = word.charAt(0).match(/[A-Z]/g)
  const normalizedWord = word.toLowerCase().trim()
  if (censorList.hasOwnProperty(normalizedWord)) {
    return censorList[normalizedWord]
  }

  let censor = normalizedWord
  const curses = Object.keys(censorList)
  for (let curse of curses) {
    if (censor.includes(curse)) {
      if (censor.length + 3 > curse.length) { // less false positives
        censor = censor.replace(curse, censorList[curse]);
        break;
      }
    }
  }

  if (!!isTitleCase) {
    censor = censor.charAt(0).toUpperCase() + censor.slice(1)
  }

  return censor
}

export default censorWord
