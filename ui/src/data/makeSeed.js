const makeSeed = (seed, textData) => {
// Get a seed text from the text data object.
  let seedSentence;
  let seedSentenceIndices;
  if (seed.length === 0) {
    let lineIndex = null
    try {
      lineIndex = textData.getRandomLineIndex()
    } catch (e) {
      console.error(e)
    }
    // Seed sentence is not specified yet. Get it from the data.
    [seedSentence, seedSentenceIndices] = textData.getRandomSlice(lineIndex)
    seed = seedSentence
  } else {
    seedSentence = seed
    if (seedSentence.length < textData.sampleLen()) {
      console.error(
        `ERROR: Seed text must have a length of at least ` +
        `${textData.sampleLen()}, but has a length of ` +
        `${seedSentence.length}.`)
      return;
    }
    seedSentence = seedSentence.slice(
      seedSentence.length - textData.sampleLen(), seedSentence.length)
    seedSentenceIndices = textData.textToIndices(seedSentence)
  }
  return [seedSentence, seedSentenceIndices];
}

export { makeSeed };