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
