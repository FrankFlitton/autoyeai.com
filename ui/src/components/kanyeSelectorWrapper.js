import { useContext } from 'react'
import styled from 'styled-components'
import { GeneratorContext } from '../state/generator'
import { Container, Row, Col } from './grid'
import KanyeActions from './kanyeActions'
import KanyeSelector from './kanyeSelector'

const KanyeGraphic = styled.div`
  min-width: 200px;
  width: 80%;
  max-width: 400px;
  margin: 3rem auto;
  position: relative;
  background: red;

  /* Border at bottom to make 3d Effect */

  &:after {
    content: ' ';
    width: 100%;
    height: 10px;
    background: yellow;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .ratio {
    padding: 0;
    padding-top: 100%;
    background: green;
    border: 10px solid yellow;
    box-sizing: border-box;
  }
  .graphic {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const KanyeSelectorWrapper = () => {
  const { dataSet } = useContext(GeneratorContext)

  return (
    <Container>
      <Row>
        <Col width="100%">
          <KanyeGraphic>
            <div className="ratio"></div>
            <div className="graphic"> ActiveKanye: {dataSet.title} </div>
          </KanyeGraphic>
        </Col>
      </Row>
      <KanyeSelector />
      <KanyeActions />
    </Container>
  )
}

export default KanyeSelectorWrapper