import { useContext } from 'react'
import styled from 'styled-components'
import { GeneratorContext } from '../state/generator'
import { Row, Col } from './grid'
import { H3 } from './typography'
import { DataSets } from '../state/data'

const SelectorContainer = styled.div`
  background-repeat: no-repeat;
  background-position: right 3em top 1em;
  transition: background-image 0.125s ease;
  &.allYe {
    background-image: url('/img/allYeText.svg');
  }
  &.graduation {
    background-image: url('/img/graduationText.svg');
  }
  &.darkFantasy {
    background-image: url('/img/darkFantasyText.svg');
  }
  &.yeezus {
    background-image: url('/img/yeezusText.svg');
  }
  &.saintYe {
    background-image: url('/img/saintYeText.svg');
  }
`

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
  overflow: visible;
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
      background-image: url('/img/selected.svg');
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
  span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: black;
    color: white;
  }
`;

const OptionButton = styled.button`
  padding: 1rem;
  color: black;
  border: 0;
  outline: 0;
  background: transparent;
  font-weight: 700;
  font-size: 21px;
  color: var(--primaryTextColor, black);
  text-align: center;
  position: relative;
  &.active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 7px;
    width: 100%;
    background-image: url('/img/selectedLine.svg');
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    filter: var(--darkFilter, none);
  }
`

const KanyeSelector = () => {
  const { dataSet, setDataSet, censor, setCensor, isGenerating } = useContext(GeneratorContext)

  const handleClick = (e) => {
    const index = parseInt(e.target.id.split('-')[1])
    if (index > -1) setDataSet(DataSets[index])
  }

  return (
    <SelectorContainer
      className={`
        ${isGenerating ? 'disabled' : ''}
        ${dataSet.id}
        p-relative w-100
      `}
    >
      <Row>
        <Col>
          <H3 className="pb-1">GENERATE LYRICS:</H3>
        </Col>
      </Row>
      <Row>
        <Col>
          <H3 className="pb-1">WHICH / ONE</H3>
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
              className={data.id === dataSet.id ? 'selected' : ' '}
              disabled={isGenerating}
              onClick={e => handleClick(e)}
            >
              <img
                id={`icon-${i}`}
                className="darkFilter w-100"
                src={`/img/${data.id}.jpg`}
                alt={`${data.title} themed lyric generation`}
              />
            </AlbumButton>
          </Col>
        ))}
      </Row>
      <Row justify="flex-start" className="pt-1">
        <Col cols={4}>
          <H3 className="pb-1">CALM YE MODE</H3>
          <Row>
            <Col>
              <OptionButton
                onClick={() => setCensor(true)}
                className={censor ? 'active' : ''}
              >On</OptionButton>
            </Col>
            <Col>
              <OptionButton
                onClick={() => setCensor(false)}
                className={!censor ? 'active' : ''}
              >Off</OptionButton>
            </Col>
          </Row>
        </Col>
        {/*
        <Col cols={4} offset={1}>
          <H3 className="pb-1">LYRICS LENGTH</H3><br/>
          <CensorButton onClick={() => setCensor(!censor)}>CalmYe Mode {censor ? 'Engaged' : 'Disengaged'}</CensorButton>
        </Col>
        */}
      </Row>
    </SelectorContainer>
  )
}

export default KanyeSelector
