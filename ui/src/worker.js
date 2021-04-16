import { generate } from './data/generate'
import { makeSeed } from './data/makeSeed'
import { loadData } from './data/loadData'

addEventListener("message", async e => { // eslint-disable-line no-restricted-globals
  var textData;
  var model;
  var seed = [];

  function getSeed (s, t) {
    return makeSeed(s, t)
  }

  async function getData (n) {
    const modelName = n ? n : 'default'
    const [t, m] = await loadData(modelName)
    textData = t
    model = m
    return;
  }

  if (!e) return;
  if (e.data === "Load Data") {
    await getData()
  }
  if (e.data === "Generate Seed") {
    if (textData) {
      seed = getSeed('', textData)
      postMessage('Generate Seed|' + seed[0])
    } else {
      await getData()
      seed = getSeed('', textData)
    }
  }
  if (e.data === "Generate Data") {
    if (!textData) {
      await getData('', textData)
    }
    if (seed.length === 0) {
      seed = getSeed('', textData)
      postMessage('Generate Seed|' + seed[0])
    }
    generate(seed, textData, model, (c) => postMessage( c ))
      .then(text => {
        postMessage('Text Generation Finished|' + text);
      })
  }
});
