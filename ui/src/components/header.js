import { useContext } from "react";
import styled from "styled-components"
import { GeneratorContext } from '../state/generator'
import * as Grid from "./grid"
import Icons from "./icons"
import { H1 } from "./typography"

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
    button, a {
      background: none;
      border: none;
      outline: none;
    }
  }
`;

const Header = () => {
  const { dark, setDark } = useContext(GeneratorContext)

  const handleClick = (state) => {
    const val = [state]
    const newVal = [...val]
    setDark(!newVal[0])
  }

  return (
    <StyledHeader>
      <Grid.Container>
        <Grid.Row>
          <Grid.Col>
            <H1>AutoYe Ai</H1>
          </Grid.Col>
          <Grid.Col justify="flex-end">
            <span
              className="d-none d-md-flex"
            >
              What would Ye do?
            </span>
            <div className="actions pl-1">
              <button
                href="_none"
                onClick={() => handleClick(dark)}
                title={`Toggle dark mode ${dark ? "off" : "on"}.`}
              >
                <img
                  width="24"
                  role="button"
                  alt={`Toggle dark mode ${dark ? "off" : "on"}.`}
                  src={Icons.darkButton(dark ? 'white' : 'black')}
                />
              </button>
              {/* <a
                href="#shop-url"
                target="_blank"
                className="ml-1"
              >
                <img
                  width="24"
                  role="link"
                  alt={`Visit the Auto Ye store!`}
                  src={Icons.shop(dark ? 'white' : 'black')}
                />
              </a> */}
            </div>
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </StyledHeader>
  );
}

export default Header