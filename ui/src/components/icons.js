import { mdiBrightness4, mdiShopping } from '@mdi/js'

const none = ''

function makeSVG(path, color) {
  const defaultColor = 'grey'
  return `data:image/svg+xml;utf-8,<svg
        xmlns="http://www.w3.org/2000/svg"
        width="50" height="50"
        viewBox="0 0 24 24"
      >
      <path fill="${typeof color === 'string' ? color : defaultColor}" d="${path}"></path>
      <path fill="none" d="M0 0h24v24H0z"></path>
    </svg>`
}

const Icons = {
  none,
  darkButton: (c) => makeSVG(mdiBrightness4, c),
  shop: (c) => makeSVG(mdiShopping, c),
}

export default Icons