import styled from 'styled-components'

// Homebrew flex box auto layout

// viewport min widths
export const sizes = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1264px',
  xl: '1904px'
}

const getColNum = (col) => {
  const colNum = (parseInt(col) / 12 * 100).toFixed(2)
  const isCol = col === 'NaN' ? 'auto' : colNum;
  return isCol
}

const columns = (col, vw) => {
  if (col) {
    const cols = getColNum(col)
    return `@media (min-width: ${vw}) {
        width: ${cols}%;
        min-width: ${cols}%;
      }`
  } else {
    return ''
  }
}

const offset = (col, vw) => {
  if (col) {
    const cols = getColNum(col)
    return `@media (min-width: ${vw}) {
        margin-left: ${cols}%;
      }`
  } else {
    return ''
  }
}

const AppContainer = styled.div`
  width: 100%;
`

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.fluid ? '100%' : sizes.md};
  padding: 0 1rem !important;
  margin: 0 auto;
  ${props => props.color ? `background-color: ${props.color};` : ''};
`;

const Row = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  flex-direction: ${props => props.direction ? props.direction : 'row'};
  align-items: ${props => props.align ? props.align : 'center'};
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
  width: 100%;
  margin: -1rem 0;
  ${props => props.color ? `background-color: ${props.color};` : ''};
`;

const Col = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => props.align ? props.align : 'center'};
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
  max-width: 100%;
  padding: 1rem 0rem;
  width: ${props => props.width ? props.width : 'auto'};

  // Col size shorthand
  ${props => props.cols ? columns(props.cols, '0px') : ''}
  ${props => props.offset ? offset(props.offset, '0px') : ''}

  // Breakpoint compute
  ${
    props => {
      let breakpoints = Object.keys(sizes).map(size => {
        let css = '';
        // N col width of 12
        css += columns(props[size], sizes[size])

        // N col offset of 12
        const offsetSize = 'offset-' + size
        css += offset(props[offsetSize], sizes[size])
        return css
      })
      return breakpoints
    }
  }

  ${props => props.color ? `background-color: ${props.color};` : ''};

  * {
    word-break: break-word;
  }
`;

export { AppContainer, Container, Row, Col }
