const React = {
  createElement(Component) {
    return Component()
  }
}

class Foo {
  #x: number = 1
  #y: number = 2
}

function Bar() {
  const foo = new Foo();

  return foo;
}

const a = <Bar />

export default {
  data: {
    trueKey: true as boolean,
    falseKey: false as boolean,
    subKey: {
      subProp: 1,
    },
  },
} as const;
