import { Container, Row, Col } from './grid'
import KanyeActions from './kanyeActions'
import KanyeSelector from './kanyeSelector'

const KanyeSelectorWrapper = () => {

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