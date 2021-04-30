import { useContext } from 'react'
import styled from 'styled-components'
import { GeneratorContext } from '../state/generator'
import censorWord from '../utils/censorWord'
import Typewriter from 'typewriter-effect'
import arrayShuffle from 'array-shuffle'

const LyricSheet = styled.div`
  width: 100%;
  display: block;
  border: 0;
  /* font-family: 'BiPolar'; */
  font-weight: bold;
  outline: 0;
  font-size: 1.68em;
  line-height: 1.3em;
  min-height: 60vh;
  .Typewriter {
    color: grey;
  }
  small {
    font-size: 12px;
  }
`

const LyricsViewer = ({value}) => {
  const {censor} = useContext(GeneratorContext)

  const placeholderStrings = () => {
    const strings = [
      'So Many Kanyes!',
      'What would Ye do?',
      'Yeezy taught me.',
      'Scoopity whoop!',
      'No one man should have all that power',
      'Hurry up with my damn croissants.',
      "I'm living in that 21st century.",
      "I hate being bipolar, its awesome.",
      "Which one?",
    ]
    return arrayShuffle(strings)
  }

  function censorText (word) {
    return censorWord(word)
  }

  if (value.length < 3) return (
    <LyricSheet>
      <small>Click "Generate" to begin.</small>
      <Typewriter
        options={{
          strings: placeholderStrings(),
          autoStart: true,
          loop: true,
          cursor: ''
        }}
      />
    </LyricSheet>
  )

  return (
    <LyricSheet>
      { value.length > 1
        ? value.map((word, i) => (
          <span key={word + i}>{
            word === '\n' || word.length === 0
              ? <><br /><br /></>
              : censor
                ? censorText(word)
                : word
            } </span>
        ))
        : <span>'Err'</span>
      }
    </LyricSheet>
  )
}

export default LyricsViewer