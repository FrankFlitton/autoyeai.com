import { useContext, useEffect, useState } from 'react'
import { GeneratorContext } from '../state/generator'
import { Row, Col } from './grid'
import { generate } from '../data/generate'

const KanyeActions = () => {
  const { dataSet, seed, payload, setPayload } = useContext(GeneratorContext)
  const [ oldDataSet, setOldDataSet ] = useState('')

  const updatePayload = (char) => {
    setPayload(payload + char)
  }
  const runGenerate = async () => {
    return await generate('default', null, updatePayload)
  }

  useEffect(() => {
    // Load New Model
    console.log('kick-off')


    // if (oldDataSet !== dataSet.id) generate(dataSet.id, seed, updatePayload)
    if (oldDataSet !== dataSet.id) {
      runGenerate().then((t) => {
        console.log('done!', t)
        setPayload(t)
      })
    }
    setOldDataSet(dataSet.id)

  // eslint-disable-next-line
  }, [dataSet, seed, oldDataSet])

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
      <Col cols={12}>
        payload: { payload }
      </Col>
    </Row>
  )
}

export default KanyeActions