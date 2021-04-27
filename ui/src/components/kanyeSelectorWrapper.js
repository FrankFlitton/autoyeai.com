// import { useContext } from 'react'
// import styled from 'styled-components'
// import { GeneratorContext } from '../state/generator'
import { Container, Row, Col } from './grid'
import KanyeActions from './kanyeActions'
import KanyeSelector from './kanyeSelector'

const KanyeSelectorWrapper = () => {
  // const { dataSet } = useContext(GeneratorContext)

  return (
    <Container id="generate" className="clip">
      <Row align={'flex-start'}>
        <Col xs={12} md={6}>
          <KanyeSelector />
        </Col>
        <Col xs={12} md={6}>
          <KanyeActions />
        </Col>
      </Row>
    </Container>
  )
}

export default KanyeSelectorWrapper