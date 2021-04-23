import { useContext } from 'react'
import styled from 'styled-components'
import { GeneratorContext } from '../state/generator'
import { Row, Col } from './grid'
import { DataSets } from '../state/data'

const AlbumButton = styled.button`
  min-width: 32px;
  width: 100%;
  padding: 0;
  margin: 0;
  outline: 0;
  border: 0;
  border-radius: 0;
  position: relative;
  background: var(--primaryBackgroundColor, white);
  &.selected {
    background: var(--primaryBackgroundColor, white);
    &:after {
      content: ' ';
      position: absolute;
      z-index: 2;
      width: 160%;
      height: 160%;
      top: -40%;
      left: -30%;
      background: url('/img/selected.svg');
      background-size: contain;
      background-position: center center;
      background-repeat: no-repeat;
      filter: var(--darkFilter, none);
    }
  }
  &:hover {
    background: var(--secondaryBackgroundColor, black);
  }
  &:focus {
    outline: 0;
  }
  img {
    width: 100%;
    filter: var(--darkFilter, none);
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

const CensorButton = styled.button`
  padding: 1em;
  background: black;
  color: white;
  border: 0;
  outline: 0;
`

const Header = styled.span`
  font-weight: 700;
  font-size: 18px;
  color: var(--primaryTextColor, black);
  margin-bottom: 1em;
`;

const KanyeSelector = () => {
  const { dataSet, setDataSet, censor, setCensor } = useContext(GeneratorContext)

  const handleClick = (e) => {
    const index = parseInt(e.target.id.split('-')[1])
    if (index > -1) setDataSet(DataSets[index])
  }

  return (
    <>
      <Row>
        <Col>
          <Header>GENERATE LYRICS:</Header>
        </Col>
      </Row>
      <Row>
        <Col>
          <Header>WHICH / ONE</Header>
        </Col>
      </Row>
      <Row justify="flex-start">
        { DataSets.map((data, i) => (
          <Col
            key={data.id}
            xs="4"
            sm="2"
            md="2"
          >
            <AlbumButton
              id={`album-${i}`}
              title={data.title}
              className={data.id === dataSet.id ? 'selected' : ''}
              onClick={e => handleClick(e)}
            >
              <img id={`icon-${i}`} src={`/img/${data.id}.jpg`} />
              <span title={data.title} className="sr-only">{data.title}</span>
            </AlbumButton>
          </Col>
        ))}
      </Row>
      <Row justify="flex-start">
        <Col cols={4}>
          <Header>&nbsp;</Header>
          <Row>
            <Col>
              <Header>CALM YE MODE</Header>
              <CensorButton onClick={() => setCensor(!censor)}>CalmYe Mode {censor ? 'Engaged' : 'Disengaged'}</CensorButton>
            </Col>
          </Row>
        </Col>
        <Col cols={4} offset={1}>
          <Header>&nbsp;</Header>
          <Row>
            <Col>
              <Header>LYRICS LENGTH</Header><br/>
              <CensorButton onClick={() => setCensor(!censor)}>CalmYe Mode {censor ? 'Engaged' : 'Disengaged'}</CensorButton>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default KanyeSelector