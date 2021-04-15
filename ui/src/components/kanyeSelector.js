import { useContext } from 'react'
import styled from 'styled-components'
import { GeneratorContext } from '../state/generator'
import { Row, Col } from './grid'
import { DataSets } from '../state/data'

const AlbumButton = styled.button`
  min-width: 32px;
  width: 100%;
  padding: 0;
  padding-top: 100%;
  margin: 0;
  border: 2px white solid;
  outline: 0;
  background: ${props => props.extra ? 'black' : 'red'};
  position: relative;
  border-radius: 0.5em;
  &.selected {
    background: green;
  }
  &:hover {
    background: blue;
  }
  &:focus {
    border: 2px blue solid;
    outline: 0;
  }
  span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: black;
    color: white;
  }
`;

const KanyeSelector = () => {
  const { dataSet, setDataSet } = useContext(GeneratorContext)

  const handleClick = (e) => {
    const index = parseInt(e.target.id.split('-')[1])
    console.log(index)
    if (index > -1) setDataSet(index)
  }

  return (
      <Row>
        { DataSets.map((data, i) => (
          <Col
            key={data.id}
            xs="2"
            md="1"
            justify="space-evenly"
          >
            <AlbumButton
              id={`album-${i}`}
              title={data.title}
              extra={data.extra}
              className={data.id === dataSet.id ? 'selected' : ''}
              onClick={e => handleClick(e)}
            >
              <span title="data.title" className="sr-only">{data.title}</span>
            </AlbumButton>
          </Col>
        ))}
      </Row>
  )
}

export default KanyeSelector