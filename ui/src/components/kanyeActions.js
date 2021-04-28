import { useCallback, useContext, useEffect, useState } from 'react'
import { GeneratorContext } from '../state/generator'
import speller from '../utils/spellcheck'
import { Row, Col } from './grid'
import LyricsViewer from './lyricsViewer'

const KanyeActions = () => {
  const {seed, setSeed, dataSet} = useContext(GeneratorContext)
  const spellcheck = speller

  const [localPayload, setLocalPayload] = useState([''])
  const [correctedText, setCorrectedText] = useState([''])
  const [isSpellerTrained, setIsSpellerTrained] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [webWorker] = useState(new Worker('../worker.js', { type: 'module' }))

  function updatePayload (char) {
    let prevWord = ''
    console.log('prevState', 'triggered')

    // Local Payload
    setLocalPayload((prevState) => {
      let oldState = [...prevState]
      if (char.match(/[ \n]/g)) prevWord = oldState[oldState.length - 1]
      if (char === '\n') {
        return [...prevState, ...[char, '']]
      } else if (
        oldState[oldState.length - 1] === '' &&
        oldState[oldState.length - 2] === ''
      ) {
        oldState.pop()
        oldState.pop()
        oldState.push('\n')
      } else if (char.match(/[ ,?!]/g)) {
        let next = char.match(/[ ,?!]/g)[0] === ' ' ? '' : char.match(/[ ,?!-–—]/g)[0]

        const isSentenceEnd = char.match(/[?!.]/)
        if (isSentenceEnd) {
          // New line if punctuation
          oldState = [...oldState, ...[isSentenceEnd[0], '\n', '']]
        } else if (oldState[oldState.length - 1] === '') {
          // New line if two empty chars
          oldState = [...oldState, ...['\n', next, '']]
        } else {
          oldState = [...oldState, ...[next]]
        }
      } else {
        const newState = [...oldState]
        const lastToken = newState.pop()
        oldState = [...newState, ...[lastToken + char]]
      }
      // setPayload(oldState)
      return oldState
    })

    // Check to correct
    if (isFinished) prevWord = localPayload[localPayload.length - 1]
    if (isFinished || (char.match(/[ \n]/g) && prevWord !== '')) {
      setCorrectedText(prevState => {
        return char === '\n'
          ? [...prevState, ...[fixWord(prevWord), '\n']]
          : [...prevState, ...[fixWord(prevWord)]]
      })
    }
  }

  const abort = () => {
    webWorker.terminate()
    webWorker.postMessage("Abort")
    console.log('Sent Abort')
  }

  const runGenerate = () => {
    if (dataSet.id === undefined) return;
    console.log('dataSet.id', dataSet.id)

    setTimeout(() => {
      webWorker.postMessage(`Generate Data|${dataSet.id}`)
    }, 200);

    // webWorker.postMessage(`Load Data|${dataSet.id}`)


    setIsFinished(false)
    setIsLoaded(true)

    // window.addEventListener("beforeunload", () => {
    //   webWorker.terminate()
    // })
    return;
  }

  const setupWebWorker = useCallback(() => {
    webWorker.addEventListener("message", event => {
      // console.log(event.data)
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
          console.log('returned seed', data)

          if (!!data.length) {
            setSeed(data)
            let seedTokens = data.split(/[\n ]/g)
            const lastToken = seedTokens.pop()
            const correctedSeed = seedTokens.map(word => fixWord(word))

            setLocalPayload(seedTokens)
            updatePayload(' ')
            setCorrectedText(correctedSeed)

            for (let index = 0; index < lastToken.length; index++) {
              updatePayload(lastToken[index])
            }
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
    // Trigger data load + speller train
    // as a side effect
    webWorker.postMessage("Load Data|allYe")

  // eslint-disable-next-line
  }, [])

  const fixWord = (word) => {
    if (word.match(/[,()!?.]/) && word.length === 1) return ''
    if (word === '\n') return word
    if (word.match(/[0-9]/)) return word
    if (word.length <= 1 && word === 'i') {
      return word.toUpperCase()
    }

    const isTitleCase = word[0] === '' ? false : word.charAt(0).match(/[A-Z]/g)
    const hasPunctuation = word.length === 0 ? false : word.charAt(word.length - 1).match(/[,?!]/g)

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
    if (seed === '') setupWebWorker()
  // eslint-disable-next-line
  }, [seed])

  return (
    <Row>
      <Col xs={12}><button onClick={() => abort()}>abort</button></Col>
      <Col xs={12}><button onClick={() => runGenerate()}>gen</button></Col>
      <Col cols={12}>
        Is loaded: { isLoaded.toString() } <br />
        seed: { seed }
      </Col>
      <Col cols={12}>
        global payload: <br />
      </Col>
      <Col cols={12}> {
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