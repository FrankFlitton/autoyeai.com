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
  min-height: 300px;
`

const LyricsViewer = ({value}) => {
  const {censor, payload} = useContext(GeneratorContext)

  function censorText (word) {
    return censorWord(word)
  }
  if (!payload) {
    return (<LyricSheet>No Data!</LyricSheet>)
  }
  return (
    <LyricSheet>
      { payload.length > 1
        ? payload.map((word, i) => (
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