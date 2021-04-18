// import { useEffect } from 'react'
import styled from 'styled-components'

// const Note = styled.textarea`
//   width: 100%;
//   /* appearance: none; */
//   display: block;
//   border: 0;
//   /* font-family: 'BiPolar'; */
//   font-weight: bold;
//   outline: 0;
//   font-size: 1.68em;
//   line-height: 1.3em;
// `

const LyricSheet = styled.div`
  width: 100%;
  /* appearance: none; */
  display: block;
  border: 0;
  /* font-family: 'BiPolar'; */
  font-weight: bold;
  outline: 0;
  font-size: 1.68em;
  line-height: 1.3em;
`
const LyricLine = styled.p``

const LyricsViewer = ({value}) => {
  // useEffect(() => {
  //   autoGrow()
  // }, [value])

  // function autoGrow () {
  //   const element = document.getElementById('note')

  //   element.style.height = "5px";
  //   element.style.height = (element.scrollHeight)+"px";
  // }

  return (
    // <Note id="note" defaultValue={value} />
    <LyricSheet>
      { value && value.split('\n').map((line, i) => (
        <LyricLine key={i + line}>{ line }</LyricLine>
      )) }
    </LyricSheet>
  )
}

export default LyricsViewer