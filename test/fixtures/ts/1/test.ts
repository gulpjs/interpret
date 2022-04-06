var trueKey: boolean = true;
var falseKey: boolean = false;
var subProp: number = 1;

var test = {
  data: {
    trueKey: trueKey,
    falseKey: falseKey,
    subKey: {
      subProp: subProp
    }
  }
};

var main = {
  default: test
};

export = main;
