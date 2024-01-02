/** @jsx jsx */

import { data } from './data'

const Component = (props: object) => ({ data: props })

function jsx (element: typeof Component, props: object) {
  return element(props)
}

export default <Component {...data} />
