import styled from 'styled-components'

// Homebrew flex box auto layout

export const size = { // min width
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1264px',
  xl: '1904px'
}

const breakpoint = (col, vw) => {
  if (col) {
    const colNum = (parseInt(col) / 12 * 100).toFixed(2)
    const cols = col === 'NaN' ? 'auto' : colNum;

    return `@media (min-width: ${size[vw]}) {
        width: ${cols}%;
        min-width: ${cols}%;
      }`
  } else {
    return ''
  }
}

const Container = styled.div`
  width: 100%;
  max-width: ${props => props.fluid ? '100%' : size.md};
  padding: 0 1rem !important;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-items: ${props => props.align ? props.align : 'center'};
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
  width: 100%;
  margin: -1rem 0;
`;

const Col = styled.div`
  display: flex;
  align-items: ${props => props.align ? props.align : 'center'};
  justify-content: ${props => props.justify ? props.justify : 'space-between'};
  max-width: 100%;
  padding: 1rem 0rem;
  width: ${props => props.width ? props.width : 'auto'};
  ${props => breakpoint(props.xs, 'xs')}
  ${props => breakpoint(props.sm, 'sm')}
  ${props => breakpoint(props.md, 'md')}
  ${props => breakpoint(props.lg, 'lg')}
  ${props => breakpoint(props.xl, 'xl')}
`;

export { Container, Row, Col }
