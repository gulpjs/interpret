const React = {
  createElement(Component) {
    return Component();
  },
};

class Foo {
  #x = 1;
  #y = 2;
}

function Bar() {
  const foo = new Foo();

  return foo;
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
