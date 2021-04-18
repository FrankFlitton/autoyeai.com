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
  if (censorList.hasOwnProperty(word)) {
    return censorList[word]
  }

  const censor = word
  const curses = Object.keys(censorList)
  for (let curse of curses) {
    if (word.includes(curse)) {
      return word.replace(curse, censorList[curse]);
    }
  }

  return censor
}

export default censorWord
