import { useContext, useEffect, useState } from 'react'
import { GeneratorContext } from '../state/generator'
import speller from '../utils/spellcheck'
import { Row, Col } from './grid'
import LyricsViewer from './lyricsViewer'

const KanyeActions = () => {
  const {seed, setSeed, dataSet} = useContext(GeneratorContext)
  const [localPayload, setLocalPayload] = useState([''])
  const [correctedText, setCorrectedText] = useState([''])
  const [isSpellerTrained, setIsSpellerTrained] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  function updatePayload (char) {
    let prevWord = ''
    setLocalPayload((prevState) => {
      if (char.match(/[ \n]/g)) prevWord = prevState[prevState.length - 1]
      if (char === '\n') {
        return [...prevState, ...[char, '']]
      } else if (char.match(/[ ,?!]/g)) {
        let next = char.match(/[ ,?!]/g)[0] === ' ' ? '' : [char.match(/[ ,?!-–—]/g)[0]]
        // New line if two empty chars
        if (prevState[prevState.length - 1] === '') {
          // prevState.pop()
          next = ['\n']
          const isSentenceEnd = char.match(/[?!.]/)
          if (isSentenceEnd) {
            next = [isSentenceEnd[0], ...next]
          }
        }
        return [...prevState, ...next]
      } else {
        const newState = [...prevState]
        const lastToken = newState.pop()
        return [...newState, ...[lastToken + char]]
      }
    })
    if (isFinished) prevWord = localPayload[localPayload.length - 1]
    if (isFinished || (char.match(/[ \n]/g) && prevWord !== '')) {
      setCorrectedText((prevState) => {
        return char === '\n'
          ? [...prevState, ...[fixWord(prevWord), '\n']]
          : [...prevState, ...[fixWord(prevWord)]]
      })
    }
  }

  const spellcheck = speller

  const runGenerate = () => {
    const webWorker = new Worker('../worker.js', { type: 'module' })

    webWorker.postMessage(`Generate Data|${dataSet}`)
    setIsFinished(false)
    setIsLoaded(true)

    webWorker.addEventListener("message", event => {
      if (!event.data) {
        return;
      } else if (event.data.includes('|')) {
        if (event.data.includes('Text Generation Finished|')) {
          const data = event.data.split('Text Generation Finished|')[1]
          setIsFinished(true)
          updatePayload(data)
          // webWorker.terminate()
          // correctText(data)
        } else if (event.data.includes('Generate Seed|')) {
          const data = event.data.split('Generate Seed|')[1]

          if (!!data.length) {
            setSeed(data)
            let seedTokens = data.split(/[\n ]/g)
            const startGen = seedTokens.pop()
            const correctedSeed = seedTokens.map(word => fixWord(word))

            setLocalPayload(seedTokens)
            setCorrectedText(correctedSeed)
            // setLocalPayload(startGen)
            updatePayload(' ')
            updatePayload(startGen)
          }

        } else if (event.data.includes('TextData|')) {
          setIsLoaded(true)
          if (!isSpellerTrained) {
            const data = event.data.split('TextData|')[1]
            if (data.length) {
              setIsSpellerTrained(true)
              spellcheck.train(data)
            }
          }
        }
      } else {
        updatePayload(event.data)
      }
    })
    return;
  }

  const fixWord = (word) => {
    if (word.match(/[,()!?.]/) && word.length === 1) return ''
    if (word === '\n') return word
    if (word.match(/[0-9]/)) return word
    if (word.length <= 1 && word === 'i') {
      return word.toUpperCase()
    }

    const isTitleCase = word.charAt(0).match(/[A-Z]/g)
    const hasPunctuation = word.charAt(word.length - 1).match(/[,?!]/g)

    let correctedWord = word.replace(/[()\\/]/gi, '')

    if (spellcheck.nWords.hasOwnProperty(word.toLowerCase())) {
      correctedWord = word
    } else {
      correctedWord = spellcheck.correct(word)
      if (hasPunctuation) correctedWord += hasPunctuation[0]
    }
    if (!!isTitleCase) {
      correctedWord = correctedWord.charAt(0).toUpperCase() + correctedWord.slice(1)
    }
    return correctedWord
  }

  function typedText (correctedText, localPayload) {
    const lastWord = localPayload[localPayload.length - 1]
    return [...correctedText, ...[lastWord]]
  }

  useEffect(() => {
    if (seed === '') runGenerate()

  // eslint-disable-next-line
  }, [seed])

  return (
    <Row>
      <Col cols={12}>
        Is loaded: { isLoaded.toString() } <br />
        seed: { seed }
      </Col>
      <Col cols={12} sm={6}>
        localPayload: <br />
      </Col>
      <Col cols={12} sm={6}> {
        correctedText === null
          ? 'Broken'
          : <LyricsViewer value={ typedText(correctedText, localPayload) } />
      }
      </Col>
      <Col cols={12} sm={6}>
        <div>
          <p>payload</p>
          <p>{ JSON.stringify(localPayload) }</p>
        </div>
        <div>
          <p>corrected</p>
          <p>{ JSON.stringify(correctedText) }</p>
        </div>
      </Col>
    </Row>
  )
}

export default KanyeActions