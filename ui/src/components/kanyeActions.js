import { useContext, useEffect, useState } from 'react'
import { GeneratorContext } from '../state/generator'
import speller from '../utils/spellcheck'
import censorWord from '../utils/censorWord'
import { Row, Col } from './grid'
import LyricsViewer from './lyricsViewer'

const KanyeActions = () => {
  const {dataSet, seed, setSeed, payload, setPayload, censor} = useContext(GeneratorContext)
  const [oldDataSet, setOldDataSet] = useState('')
  const [localPayload, setLocalPayload] = useState('')
  const [correctedText, setCorrectedText] = useState('')
  const [isSpellerTrained, setIsSpellerTrained] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const webWorker = new Worker('../worker.js', { type: 'module' })

  function updatePayload (char) {
    setLocalPayload(prevState => prevState + char)
  }

  const spellcheck = speller

  const runGenerate = () => {
    webWorker.postMessage("Generate Seed")
    setTimeout(() => {
      webWorker.postMessage("Generate Data")
    }, 100)
    webWorker.addEventListener("message", event => {
      if (!event.data) {
        return;
      } else if (event.data.includes('Text Generation Finished|')) {
        const data = event.data.split('Text Generation Finished|')[1]
        setIsFinished(true)
        setPayload(data)
        updatePayload(data)
        correctText(seed + data)

      } else if (event.data.includes('Generate Seed|')) {
        setSeed(event.data.split('Generate Seed|')[1])

      } else if (event.data.includes('TextData|')) {
        if (!isSpellerTrained) {
          const data = event.data.split('TextData|')[1]
          if (data.length) {
            spellcheck.train(data)
            setIsSpellerTrained(true)
          }
        }

      } else {
        updatePayload(event.data)
      }
    });
  }

  const correctText = (sentence) => {
    sentence = sentence ? sentence + '' : ''
    const lines = sentence.split('\n') // preserve lines
    const words = lines.map(s => s.split(' '))
    const correctedWords = words.map((line) => {
      return line.map((word) => {
        const isTitleCase = word.charAt(0).match(/[A-Z]/g)
        const hasPunctuation = word.charAt(word.length - 1).match(/[,?!]/g)

        let correctedWord = word

        if (spellcheck.nWords.hasOwnProperty(word.toLowerCase())) {
          correctedWord = word
        } else {
          correctedWord = spellcheck.correct(word)
          if (hasPunctuation) correctedWord += hasPunctuation[0]
        }

        if (!censor) {
          correctedWord = censorWord(correctedWord)
        }
        if (!!isTitleCase) {
          correctedWord = correctedWord.charAt(0).toUpperCase() + correctedWord.slice(1)
        }
        return correctedWord
      }).join(' ')
    }).join('\n')
      .replace('\ni\n', '\n')
      .replace(/i /g, 'I ')

    setCorrectedText(correctedWords)
  }

  useEffect(() => {
    if (oldDataSet !== dataSet.id) {
      runGenerate()
    }
    setOldDataSet(dataSet.id)

    if (correctedText.length < (seed + localPayload).length + 2 && !isFinished) {
      correctText(seed + localPayload)
    }

  // eslint-disable-next-line
  }, [dataSet, seed, oldDataSet, localPayload, correctedText, isFinished])

  return (
    <Row>
      <Col
        xs="12"
        md="4"
        offset-xs="0"
        offset-md="4"
        justify="space-around"
      >
        Loading Feedback and Action
      </Col>
      <Col cols={12}>
        seed: { seed }
      </Col>
      <Col cols={12} sm={6}>
        localPayload: <br />
      </Col>
      <Col cols={12} sm={6}>
        <LyricsViewer value={correctedText} />
      </Col>
      <Col cols={12} sm={6}>
        payload: { payload }
      </Col>
    </Row>
  )
}

export default KanyeActions