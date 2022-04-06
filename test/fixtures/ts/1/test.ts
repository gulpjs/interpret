var test: {
  data: {
    trueKey: boolean,
    falseKey: boolean,
    subKey: {
      subProp: number
    }
  }
} = {
  data: {
    trueKey: true,
    falseKey: false,
    subKey: {
      subProp: 1
    }
  }
};

var main: {
  default: typeof test
} = {
  default: test
};

export = main;
