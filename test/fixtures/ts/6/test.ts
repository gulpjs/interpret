function add(x: number, y: number): number {
  return x + y;
}

export default {
  data: {
    trueKey: true,
    falseKey: false,
    subKey: {
      subProp: add(0.5, 0.5),
    },
  },
};
