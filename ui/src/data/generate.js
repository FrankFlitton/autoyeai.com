import * as tf from '@tensorflow/tfjs';
import { TextData } from './data';
import { generateText } from './model';

export async function generate(modelName, inputSeed, callback) {
  let seed = inputSeed ? inputSeed : ''
  let onCharGen = callback ? (c) => callback(c) : (char) => console.log(char)

  const sampleStep = 3
  const temperature = 0.5
  const genLength = 10

  const modelJsonUrl = `/models/${modelName}/model.json`
  const textDataUrl = `/models/${modelName}/data.txt`

  // Load the model.
  const model = await tf.loadLayersModel(modelJsonUrl)
  const sampleLen = model.inputs[0].shape[1]

  // Create the text data object.
  const textRequest = await fetch(textDataUrl)
  const text = await textRequest.text()
  const textData = new TextData('text-default', text, sampleLen, sampleStep)

  // Get a seed text from the text data object.
  let seedSentence;
  let seedSentenceIndices;
  if (seed.length === 0) {
    // Seed sentence is not specified yet. Get it from the data.
    [seedSentence, seedSentenceIndices] = textData.getRandomSlice()
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

  console.log(`Seed text:\n"${seed}"\n`)

  return await generateText(
    model, textData, seedSentenceIndices, genLength, temperature, onCharGen)
}
