import { useContext } from 'react'
import styled from 'styled-components'
import { GeneratorContext } from '../state/generator'
import censorWord from '../utils/censorWord'

const LyricSheet = styled.div`
  width: 100%;
  display: block;
  border: 0;
  /* font-family: 'BiPolar'; */
  font-weight: bold;
  outline: 0;
  font-size: 1.68em;
  line-height: 1.3em;
`

const LyricsViewer = ({value}) => {
  const {censor} = useContext(GeneratorContext)

  function censorText (word) {
    return censorWord(word)
  }
  if (!value) {
    return (<LyricSheet>No Data!</LyricSheet>)
  }
  return (
    <LyricSheet>
      { value.length > 1
        ? value.map((word, i) => (
          <span key={word + i}>{
            word === '\n'
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