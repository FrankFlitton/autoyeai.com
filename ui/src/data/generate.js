import { generateText } from './model';

export async function generate(inputSeed, textData, model, callback) {
  let seed = inputSeed ? inputSeed : ''
  let onCharGen = callback ? (c) => callback(c) : (char) => console.log(char)

  const temperature = 0.2
  const genLength = 200

  return await generateText(
    model, textData, seed[1], genLength, temperature, onCharGen)
}
