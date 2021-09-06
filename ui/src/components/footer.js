import styled from 'styled-components'
import { Container, Row, Col } from './grid'

const StyledFooter = styled.footer`
  background: var(--secondaryBackgroundColor, black);
  color: var(--secondaryTextColor, white);
  padding: 4em 1em;
  align-items: center;
  display: flex;
  margin-top: 4em;
`;

const Footer = () => {

  return (
    <StyledFooter>
      <Container>
        <Row>
          <Col cols={12}>
            <p>
              Fan art and web app by&nbsp;
              <a
                href="https://frankflitton.com/"
                target="_blank"
                rel="noreferrer"
                >
                Frank Flitton
              </a>
            </p>
            <p>
              <a
                href="https://javascript.plainenglish.io/i-stuffed-tensorflow-js-into-a-react-app-3fd8678019f5"
                target="_blank"
                rel="noreferrer"
                >
                  How AutoYe works
              </a>
            </p>
            <p>
              Source code&nbsp;
              <a
                href="https://github.com/FrankFlitton/autoyeai.com"
                target="_blank"
                rel="noreferrer"
                >
                  on Github
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  )
}

export default Footer
