import * as tf from '@tensorflow/tfjs';
import { TextData } from './data';

const loadData = async (modelName) => {
  const sampleStep = 3

  const modelJsonUrl = `/models/${modelName}/model.json`
  const textDataUrl = `/models/${modelName}/data.txt`

  const model = await tf.loadLayersModel(modelJsonUrl)
  const sampleLen = model.inputs[0].shape[1]

  // Create the text data object.
  const textRequest = await fetch(textDataUrl)
  const text = await textRequest.text()
  const textData = new TextData(`text-${modelName}`, text, sampleLen, sampleStep)

  return [textData, model]
}

export { loadData }