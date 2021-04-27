import { useContext } from "react";
import styled from "styled-components"
import { GeneratorContext } from '../state/generator'
import { Container, Row, Col } from "./grid"

const StyledHeader = styled.header`
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: var(--primaryTextColor, black);
  background: var(--primaryBackgroundColor, white);
  border-bottom: 2px solid var(--primaryTextColor, black);
  position: fixed;
  z-index: 999;
  .actions {
    position: fixed;
    padding: 0 1em;
  }
`;

const H1 = styled.h1`
  font-size: 18px;
  font-weight: 500;
`

const Header = () => {
  const { dark, setDark } = useContext(GeneratorContext)

  const handleClick = (state) => {
    const val = [state]
    const newVal = [...val]
    setDark(!newVal[0])
  }

  return (
    <StyledHeader>
      <Container>
        <Row>
          <Col>
            <H1>AutoYe Ai</H1>
          </Col>
          <Col justify="flex-end">
            <span>What would Ye do?</span>
            <span>Menu</span>
          </Col>
        </Row>
      </Container>
      <div className="actions">
        <button onClick={() => handleClick(dark)}>dark: {dark ? 'true' : 'false'}</button>
      </div>
    </StyledHeader>
  );
}

export default Header