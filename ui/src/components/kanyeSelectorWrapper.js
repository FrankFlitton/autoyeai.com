import { Container, Row, Col } from './grid'
import KanyeActions from './kanyeActions'
import KanyeSelector from './kanyeSelector'
import GenerateButton from './generateButton'

const KanyeSelectorWrapper = () => {

  return (
    <Container id="generate" className="clip">
      <Row align={'flex-start'}>
        <Col xs={12} md={6}>
          <KanyeSelector />
          <Row>
            <Col
              className="pt-3"
              xs={12}
              xs-offset={0}
              sm={7}
              sm-offset={3}
              md-offset={0}
            >
              <GenerateButton />
            </Col>
          </Row>
        </Col>

        <Col xs={12} md={6}>
          <KanyeActions />
        </Col>
      </Row>
    </Container>
  )
}

export default KanyeSelectorWrapper