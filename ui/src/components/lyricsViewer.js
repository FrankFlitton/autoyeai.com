import { useEffect } from 'react'
import styled from 'styled-components'

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
// const LyricLine = styled.span`
//   &:hover {
//     background: black;
//     color: white;
//   }
// `

const LyricsViewer = ({value}) => {
  // useEffect(() => {
  //   console.log('LyricsViewer', value)
  // }, [value])

  if (!value) {
    return (<LyricSheet>No Data!</LyricSheet>)
  }
  return (
    <LyricSheet>
      { value.length > 1
        ? value.map((word, i) => (
          <span key={word + i}>{ word === '\n' ? <br /> : word } </span>
        ))
        : 'Errr'
      }
      {/* { JSON.stringify(value) } */}
    </LyricSheet>
  )
}

export default LyricsViewer