import { useContext } from 'react'
import styled from 'styled-components'
import { GeneratorContext } from '../state/generator'

const HeavyButton = styled.button`
  border-radius: 0;
  border: 3px var(--primaryTextColor, black) solid;
  width: 100%;
  font-size: 2em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.25em;
  background: transparent;
  color: var(--primaryTextColor, black);
  &:after, &:before {
    content: '   ';
    width: 1em;
    display: inline-block;
    text-align: left;
  }
  &:disabled {
    &:after {
      content: '...';
      animation: ellipsis 2s linear infinite;
    }
  }
  @keyframes ellipsis {
    0% {
      content: '   '
    }
    33% {
      content: '.  '
    }
    66% {
      content: '.. '
    }
    100% {
      content: '...'
    }
  }
`

const GenerateButton = () => {
  const { isGenerating, setIsGenerating } = useContext(GeneratorContext)

  const handleClick = () => {
    setIsGenerating(true)
  }

  return (
    <HeavyButton
      onClick={() => handleClick()}
      disabled={isGenerating}
      className={isGenerating ? 'disabled' : ''}
    >
      { isGenerating ? 'Generating' : 'Generate' }
    </HeavyButton>
  )
}

export default GenerateButton
