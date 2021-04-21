import { generate } from './data/generate'
import { makeSeed } from './data/makeSeed'
import { loadData } from './data/loadData'

// eslint-disable-next-line no-restricted-globals
addEventListener("message", async e => {
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
    postMessage(`TextData|${t.textString_}`)
    return t;
  }

  if (!e) return;
  if (e.data === "Load Data") {
    await getData()
  }
  if (e.data.startsWith("Generate Seed")) {
    if (textData) {
      seed = getSeed('', textData)
      postMessage('Generate Seed|' + seed[0])
    } else {
      textData = await getData()
      seed = getSeed('', textData)
    }
  }
  if (e.data.startsWith("Generate Data")) {
    const data = e.data.split('|')
    const dataSet = data[1]

    console.log(dataSet)

    // Splice textData via DataSet when new data set is specified

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

// eslint-disable-next-line no-restricted-globals
addEventListener("beforeunload", () => {
  window.close();
});
