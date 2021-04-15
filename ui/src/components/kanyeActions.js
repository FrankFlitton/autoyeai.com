import { useContext, useEffect } from 'react'
import { GeneratorContext } from '../state/generator'
import { Row, Col } from './grid'

const KanyeActions = () => {
  const { dataSet } = useContext(GeneratorContext)

  useEffect(() => {
    // Load New Model
  }, [dataSet])

  return (
    <Row>
      <Col
        xs="12"
        md="4"
        offset-xs="0"
        offset-md="4"
        justify="space-around"
      >
        Loading Feedback and Action
      </Col>
    </Row>
  )
}

export default KanyeActions