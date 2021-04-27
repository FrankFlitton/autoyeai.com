import { generate } from './data/generate'
import { makeSeed } from './data/makeSeed'
import { loadData } from './data/loadData'

// eslint-disable-next-line no-restricted-globals
addEventListener("message", async e => {
  var textData;
  var model;
  var seed = [];

  // console.log('worker state', textData,
  // model,
  // seed,)

  async function getSeed (s, t) {
    const NewSeed = await makeSeed(s, t)
    seed = NewSeed;
    return seed
  }

  async function getData (n) {
    const modelName = n ? n : 'allYe'
    const [t, m] = await loadData(modelName)
    textData = t
    model = m
    postMessage(`TextData|${t.textString_}`)
    return t;
  }

  if (!e) return;
  if (e.data === "Load Data") {
    await getData()
  }

  if (e.data.startsWith("Generate Seed")) {
    if (!!textData) {
      const newSeed = await getSeed('', textData)
      postMessage('Generate Seed|' + newSeed[0])
    } else {
      const newTextData = await getData()
      await getSeed('', newTextData)
    }
  }

  if (e.data.startsWith("Generate Data")) {
    const data = e.data.split('|')
    const dataSet = data[1] ? data[1] : ''
    let newSeed = []

    console.log(dataSet)

    if (!textData) {
      console.log('loading data...')
      const loadingData = await getData(dataSet, textData)
      console.log('data', !!loadingData)
    }
    console.log('loaded. check seed', seed)
    console.log('loaded. check textData', textData)
    if (seed.length === 0 && !!textData) {
      console.log('returned seed, generate', seed[0])
      const loadingNewSeed = await getSeed('', textData)
      // loadingNewSeed
      postMessage('Generate Seed|' + loadingNewSeed[0])
    }
    console.log('seeded.', seed.length, newSeed.length)
    if (model && !!seed.length && textData) {
      generate(seed, textData, model, (c) => postMessage( c ))
        .then(text => {
          postMessage('Text Generation Finished|' + text)
        })
    }
  }
});

// eslint-disable-next-line no-restricted-globals
addEventListener("beforeunload", () => {
  window.close();
});
