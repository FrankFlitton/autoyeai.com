const censorList = {
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
  const normalizedWord = word.toLowerCase().trim()
  if (censorList.hasOwnProperty(normalizedWord)) {
    return censorList[normalizedWord]
  }

  const censor = normalizedWord
  const curses = Object.keys(censorList)
  for (let curse of curses) {
    if (normalizedWord.includes(curse)) {
      return normalizedWord.replace(curse, censorList[curse]);
    }
  }

  return censor
}

export default censorWord
