import { useContext } from 'react'
// import styled from 'styled-components'
import { GeneratorContext } from '../state/generator'
import { Container, Row, Col } from './grid'
import KanyeActions from './kanyeActions'
import KanyeSelector from './kanyeSelector'

const KanyeSelectorWrapper = () => {
  const { dataSet } = useContext(GeneratorContext)

  return (
    <Container id="generate">
      <KanyeSelector />
      <KanyeActions />
    </Container>
  )
}

export default KanyeSelectorWrapper