import { useContext, useState } from 'react'
import { DataSets } from '../state/data'
import { GeneratorContext } from '../state/generator'

const SeedSelector = () => {

  const { dataSet, setDataSet } = useContext(GeneratorContext)
  const [formData, setFromData] = useState({})

  function handleUpdate (e) {
    const value = e.target?.value
    const key = e.target.name
    setFromData({
      ...formData,
      [key]: value
    })
    console.log(key, value, formData)
  }

  function handleCheckUpdate (e) {
    const key = e.target.name
    const value = formData[key] === undefined ? true : !formData[key]
    setFromData({
      ...formData,
      [key]: value
    })
    console.log(key, value, formData)
  }

  function handleSubmit (e) {
    e.preventDefault()

    // Save fields
    setDataSet(formData.dataSet)
  }

  return (
    <div className="seed-container">
      <h2>Setup Input</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group">
          <label htmlFor="seed">seed</label>: &nbsp;
          <input name="seed" id="seed" type="text" onChange={(e) => handleUpdate(e)} /> {formData.seed}
        </div>
        <div className="input-group">

          {/* {formData?.dataSet?.title} <br /> */}
          { DataSets.map((dataSet, i) => (
              <div className="radio-button" key={dataSet.id}>
                <label htmlFor={`dataSet-${i}`}> {dataSet.title} </label>: &nbsp;
                <input name="dataSet" id={`dataSet-${i}`} type="radio" value={i} onChange={(e) => handleUpdate(e)} />
              </div>
            ))}



        </div>
        <div className="input-group">
          <label htmlFor="censor">censor</label>: &nbsp;
          <input name="censor" id="censor" type="checkbox" onChange={(e) => handleCheckUpdate(e)} /> {formData.censor}
        </div>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>

      { dataSet }
    </div>
  )
}

export default SeedSelector