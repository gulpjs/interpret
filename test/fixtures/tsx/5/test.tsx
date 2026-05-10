/** @jsx jsx */

import { data } from './data';

function Component(props: object) {
  return { data: props };
}

function jsx(element: typeof Component, props: object) {
  return element(props);
}

export default <Component {...data} />;
