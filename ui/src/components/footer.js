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

  // function getYear () {
  //   const d = new Date();
  //   return d.getFullYear();
  // }

  return (
    <StyledFooter>
      <Container>
        <Row>
          <Col cols={12}>
            <p>
              Fan art and web app code made with love by&nbsp;
              <a
                href="https://frankflitton.com/"
                target="_blank"
                rel="noreferrer"
              >
                Frank Flitton
              </a>
            .</p>
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  )
}

export default Footer
