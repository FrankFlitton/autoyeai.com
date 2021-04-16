import { useContext, useEffect, useState } from 'react'
import { GeneratorContext } from '../state/generator'
import { Row, Col } from './grid'

const KanyeActions = () => {
  const {dataSet, seed, setSeed, payload, setPayload} = useContext(GeneratorContext)
  const [oldDataSet, setOldDataSet] = useState('')
  const [localPayload, setLocalPayload] = useState('')

  const webWorker = new Worker('../worker.js', { type: 'module' })

  function updatePayload (char) {
    setLocalPayload(prevState => prevState + char)
  }
  const runGenerate = () => {
    webWorker.postMessage("Generate Seed")
    webWorker.postMessage("Generate Data")
    webWorker.addEventListener("message", event => {
      if (!event.data) {
        return;
      } else if (event.data.includes('Text Generation Finished|')) {
        setPayload(event.data.split('Text Generation Finished|')[1])

      } else if (event.data.includes('Generate Seed|')) {
        setSeed(event.data.split('Generate Seed|')[1])

      } else {
        updatePayload(event.data)
      }
    });
  }

  useEffect(() => {
    if (oldDataSet !== dataSet.id) {
      runGenerate()
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
        seed: { seed }
      </Col>
      <Col cols={12} sm={6}>
        localPayload: { localPayload }
      </Col>
      <Col cols={12} sm={6}>
        payload: { payload }
      </Col>
    </Row>
  )
}

export default KanyeActions