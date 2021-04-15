import styled from "styled-components"
import { Container, Row, Col } from "./grid"

const StyledHeader = styled.header`
  background: red;
  padding: 0 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* position: fixed;
  top: 0;
  left: 0; */
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container fluid>
        <Row>
          <Col>
            <h1>Auto Ye</h1>
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