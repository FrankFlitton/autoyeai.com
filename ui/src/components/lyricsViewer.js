import { useEffect } from 'react'
import style from 'styled-components'

const Note = style.textarea`
  width: 100%;
`

const LyricsViewer = ({value}) => {
  useEffect(() => {
    autoGrow()
  }, [value])

  function autoGrow () {
    const element = document.getElementById('note')

    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }

  return (
    <Note id="note" value={value} />
  )
}

export default LyricsViewer