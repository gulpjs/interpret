const foo: {
  bar?: {
    baz?: boolean;
  };
} = {};

const bar = foo?.bar?.baz;

export default {
  data: {
    trueKey: true as boolean,
    falseKey: false as boolean,
    subKey: {
      subProp: 1,
    },
  },
} as const;
