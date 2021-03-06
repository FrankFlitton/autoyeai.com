import { useCallback, useContext, useEffect, useState } from 'react'
import { GeneratorContext } from '../state/generator'
import speller from '../utils/spellcheck'
import { Row, Col } from './grid'
import LyricsViewer from './lyricsViewer'
import { H3 } from './typography'

const KanyeActions = () => {
  const {seed, setSeed, dataSet, isGenerating, setIsGenerating, isDev} = useContext(GeneratorContext)
  const spellcheck = speller

  const [localPayload, setLocalPayload] = useState([])
  const [correctedText, setCorrectedText] = useState([''])
  const [isSpellerTrained, setIsSpellerTrained] = useState(false)
  const [webWorker, setWebWorker] = useState(makeWorker())
  const [isFinished, setIsFinished] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  function makeWorker () {
    const worker = new Worker('../worker.js', { type: 'module' })
    return worker
  }

  function updatePayload (char) {
    let prevWord = ''

    // Local Payload
    setLocalPayload((prevState) => {
      let oldState = [...prevState]
      if (char.match(/[ \n]/g)) prevWord = oldState[oldState.length - 1]

      // routines for special characters
      if (char === '\n') {
        return [...prevState, ...[char, '']]
      } else if (char === ' ') {
        return [...prevState, '']
      } else if (char.match(/[^a-z^A-Z^0-9]/)) {
        // New line at sentence end
        if (char.match(/[?!.]/)) {
          oldState = [...oldState, ...[char, '\n', '']]
        } else if (char.match(/['']/)) {
          // ignore single quotes
          return [...oldState]
        } else {
          oldState = [...oldState, ...[char, '']]
        }
      } else {
        const newState = [...oldState]
        const lastToken = newState.pop()
        const isNewLine = newState.length - 1 === '\n'
        const newChar = isNewLine ? char.toUpperCase() : char
        oldState = [...newState, ...[lastToken + newChar]]
      }

      if (
        oldState[oldState.length - 1] === '' &&
        oldState[oldState.length - 2] === ''
      ) {
        oldState.pop()
        oldState.pop()
        oldState.push('\n')
        oldState.push('')
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
    webWorker.removeEventListener("message", () => {})
    webWorker.terminate()

    setWebWorker(() => {return makeWorker()})

    setTimeout(() => {
      setupWebWorker()
      setIsFinished(true)
      setIsGenerating(false)
    }, 100);
  }

  const runGenerate = () => {
    if (dataSet.id === undefined) return;
    console.log('dataSet.id', dataSet.id)
    webWorker.postMessage("Load Data|allYe")

    setTimeout(() => {
      webWorker.postMessage(`Generate Data|${dataSet.id}`)
    }, 200);

    setIsFinished(false)
    setIsLoaded(true)
    return; // required for mobile safari
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
          setIsGenerating(false)
          updatePayload(data)
          // webWorker.terminate()
          // correctText(data)
        } else if (event.data.includes('Generate Seed|')) {
          const data = event.data.split('Generate Seed|')[1]

          if (!!data.length) {
            setSeed(data)

            let spacedSeedTokens = data.replace(/\n/g, ' \n ')
            let seedTokens = spacedSeedTokens.split(' ')
            const lastToken = seedTokens.pop()
            const correctedSeed = seedTokens.map(word => fixWord(word))

            setLocalPayload(seedTokens)

            setTimeout(() => {
              console.log('setlocal', localPayload)
              updatePayload(' ')
              setCorrectedText(correctedSeed)

              for (let index = 0; index < lastToken.length; index++) {
                updatePayload(lastToken[index])
              }
            }, 0);
          }

        } else if (event.data.includes('TextData|')) {
          setIsLoaded(true)
        }
      } else {
        updatePayload(event.data)
      }
    })

    // Trigger data load
    webWorker.postMessage("Load Data|allYe")

    // Train speller
    if (!isSpellerTrained) {
      fetch('/models/allYe/data.txt')
        .then(response => response.text())
        .then((text) => {
          spellcheck.train(text)
          setIsSpellerTrained(true)
        })
        .catch(e => console.error(e))
    }

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

  useEffect(() => {
    if (isGenerating) runGenerate()
  // eslint-disable-next-line
  }, [isGenerating])

  return (
    <Row>
      <Col cols={12}>
      <H3>{ dataSet.title } ?? ai</H3>
      </Col>
      <Col cols={12}>
        {
          correctedText === null
            ? 'Broken'
            : <LyricsViewer value={ typedText(correctedText, localPayload) } />
        }
      </Col>
      { isDev ?
        <><Col xs={12}><button onClick={() => abort()}>abort</button></Col>
        <Col cols={12}>
          Is loaded: { isLoaded.toString() } <br />
          seed: { seed }
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
        </Col> </>
        : <></>
      }
    </Row>
  )
}

export default KanyeActions