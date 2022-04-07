const React = {
  createElement(Component) {
    return Component();
  },
};

function Bar() {
  const foo = {};

  const bar = foo?.bar?.baz;

  return bar;
}

const a = <Bar />;

export default {
  data: {
    trueKey: true,
    falseKey: false,
    subKey: {
      subProp: 1,
    },
  },
};
