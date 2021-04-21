import styled from 'styled-components'
import { Container, Row, Col, sizes } from './grid'

const SplashFullscreen = styled.div`
  min-height: 100vh;
  display: flex;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 60px;
  cursor: pointer;

  h2 {
    font-family: Helvetica-Bold;
    font-size: 18px;
    text-transform: uppercase;
  }
  .sub-text {
    font-family: Helvetica-Oblique;
    font-size: 21px;
    text-align: center;
  }

  .layers {
    position: relative;
  }
  .animated-text-container {
    z-index: 2;
    position: absolute;
    height: 100%;
    top: 0;
    margin-top: 3px;
    .animated-text {
      font-weight: 700;
      text-align: center;
      font-size: 23px;
      line-height: 23px;
      @media (min-width: ${sizes.sm}) {
        font-size: 5vw;
        line-height: 5vw;
      }
      @media (min-width: ${sizes.md}) {
        font-size: 65px;
        line-height: 65px;
      }
      &>div>div>div {
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    > div > div {
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3)  {
        /* .animated-text-container > div > div:nth-child(1) */
        color: var(--secondaryTextColor, white);
        -webkit-text-stroke-color: 1px;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke: 1px var(--primaryTextColor, black);
        text-shadow:
          -1px -1px 0 var(--primaryTextColor, black),
          1px -1px 0 var(--primaryTextColor, black),
          -1px 1px 0 var(--primaryTextColor, black),
          1px 1px 0 var(--primaryTextColor, black);
      }
      &:nth-child(2)  {
        color: var(--primaryTextColor, black) !important;
      }
    }
  }
  .bars-container {
    z-index: 1;
    align-items: stretch;
    /* flex-direction: column; */
    flex-grow: 1;
    min-height: 60vh;
    &>div:first-of-type > div {
      padding-top: 0
    }
    &>div:last-of-type > div {
      padding-bottom: 0
    }

    .letter {
      display: inline-block;
      width: 100%;
      font-weight: 700;
      font-size: 34px;
      letter-spacing: -0.54px;
      &.start {
        text-align: right;
      }
      &.end {
        text-align: left;
      }
    }
    hr {
      display: block;
      width: 100% !important;
      border: 0;
      outline: 0;
      height: 3px;
      background: var(--primaryTextColor, black);
    }
    .subtitle {
      font-weight: 700;
      font-size: 10px;
      letter-spacing: 0.91px;
      line-height: 24px;
      word-break: normal;
      text-transform: uppercase;
      height: 3em;
    }
  }
`

const SplashScreen = () => {
  const scrollToContent = () => {
    const element = document.getElementById('generate')
    window.scrollTo({
        top: element.offsetTop - 60,
        left: 0,
        behavior: 'smooth'
      })
  }
  return (
    <SplashFullscreen onClick={() => scrollToContent()}>
      <Container>
        <Row justify={'center'}>
          <Col className="pb-0">
            <h2 className="mb-0">kanye west × ai</h2>
          </Col>
        </Row>
        <Row className="layers">
          <Col
            className="bars-container"
            xs={12}
          >
            <Row>
              <Col xs={2}>
                <div className="letter start">A</div>
              </Col>
              <Col xs={6}>
                <hr />
              </Col>
              <Col xs={2}>
                <div className="letter end">U</div>
              </Col>
            </Row>
            <Row>
              <Col offset={6} cols={3}>
                <p className="subtitle hidden ma-0">
                  Yeezy taught me all I know, check it out...
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <div className="letter start">T</div>
              </Col>
              <Col xs={6}>
                <hr />
              </Col>
              <Col xs={2}>
                <div className="letter end">O</div>
              </Col>
            </Row>
            <Row align={'flex-end'}>
              <Col offset={6} cols={3} align={'end'}>
                <p className="subtitle ma-0">
                  A fluid stream of artificial consciousness.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <div className="letter start">Y</div>
              </Col>
              <Col xs={6}>
                <hr />
              </Col>
              <Col xs={2}>
                <div className="letter end">E</div>
              </Col>
            </Row>
          </Col>
          <Col
            className="animated-text-container"
            xs={12}
            justify={'center'}
          >
            <div>
              <Row justify="center">
                <Col cols={12}>
                  <div className="animated-text">
                    <span>WHICH / ONE</span>
                  </div>
                </Col>
              </Row>
              <Row justify="center">
                <Col cols={12}>
                  <div className="animated-text">
                    <span>WHICH / ONE</span>
                  </div>
                </Col>
              </Row>
              <Row justify="center">
                <Col cols={12}>
                  <div className="animated-text">
                    <span>WHICH / ONE</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row justify={'center'}>
          <Col className="pt-0">
            <span className="sub-text mt-0">Click anywhere to generate lyrics.</span>
          </Col>
        </Row>
      </Container>
    </SplashFullscreen>
  )
}

export default SplashScreen
