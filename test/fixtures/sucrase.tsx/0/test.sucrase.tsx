const React = {
  createElement(Component) {
    return Component();
  },
};

function Bar() {
  const foo: {
    bar?: {
      baz?: boolean
    }
  } = {};

  const bar = foo?.bar?.baz;

  return bar;
}

const a = <Bar />;

export default {
  data: {
    trueKey: true as boolean,
    falseKey: false as boolean,
    subKey: {
      subProp: 1,
    },
  },
} as const;
