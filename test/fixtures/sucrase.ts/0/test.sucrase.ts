class Foo {
  #x: number = 1;
  #y: number = 2;
}

export default {
  data: {
    trueKey: true as boolean,
    falseKey: false as boolean,
    subKey: {
      subProp: 1,
    },
  },
} as const;
