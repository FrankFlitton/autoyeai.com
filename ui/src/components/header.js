import styled from "styled-components"
import { Container, Row, Col } from "./grid"

const StyledHeader = styled.header`
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: white;
  border-bottom: 2px solid black;
  position: fixed;
  z-index: 999;
`;

const H1 = styled.h1`
  font-size: 18px;
  font-weight: 500;
`

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Row>
          <Col>
            <H1>AutoYe.ai</H1>
          </Col>
          <Col>
            <span>What would Ye do?</span>
          </Col>
        </Row>
      </Container>
    </StyledHeader>
  );
}

export default Header