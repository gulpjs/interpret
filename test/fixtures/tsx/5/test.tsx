/** @jsx jsx */

const Component = (props: object) => ({ data: props });

function jsx(element: typeof Component, props: object) {
  return element(props);
}

export default (
  <Component
    trueKey={true as boolean}
    falseKey={false as boolean}
    subKey={{ subProp: 1 }}
  />
);
