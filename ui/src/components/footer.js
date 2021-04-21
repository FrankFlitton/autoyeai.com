import styled from 'styled-components'
import { Container, Row, Col } from './grid'

const StyledFooter = styled.footer`
  padding: 0 1em;
  background: var(--secondaryBackgroundColor, black);
  color: var(--secondaryTextColor, white);
`;

const Footer = () => {

  function getYear () {
    const d = new Date();
    return d.getFullYear();
  }

  return (
    <StyledFooter>
      <Container>
        <Row>
          <Col>
            © { getYear() }&ensp;<a href="https://frankflitton.com/">Frank Flitton</a>
          </Col>
        </Row>
      </Container>
    </StyledFooter>
  )
}

export default Footer
