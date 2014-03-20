const expect = require('chai').expect;
const interpret = require('../');

var expected = {
  data: {
    trueKey: true,
    falseKey: false,
    subKey: {
      subProp: 1
    }
  }
};

describe('learn', function () {
  it('should know coco', function () {
    interpret('.co');
    expect(require('./fixtures/test.co')).to.deep.equal(expected);
  });

  it('should know coffee-script', function () {
    interpret('.coffee');
    expect(require('./fixtures/test.coffee')).to.deep.equal(expected);
  });
/*
  it('should know csv', function () {
    interpret('.csv');
    expect(require('./fixtures/test.csv')).to.deep.equal([['r1c1','r1c2'],['r2c1','r2c2']]);
  });
*/
  it('should know iced-coffee-script', function () {
    interpret('.iced');
    expect(require('./fixtures/test.iced')).to.deep.equal(expected);
  });
  it('should know ini', function () {
    interpret('.ini');
    expect(require('./fixtures/test.ini')).to.deep.equal({
      data: {
        trueKey: "true",
        falseKey: "false"
      }
    });
  });
  it('should know .js', function () {
    interpret('.js');
    expect(require('./fixtures/test.js')).to.deep.equal(expected);
  });
  it('should know .json', function () {
    interpret('.json');
    expect(require('./fixtures/test.json')).to.deep.equal(expected);
  });
  it('should know livescript', function () {
    interpret('.ls');
    expect(require('./fixtures/test.ls')).to.deep.equal(expected);
  });
  it('should know literate coffee-script', function () {
    interpret('.litcoffee');
    expect(require('./fixtures/test.litcoffee')).to.deep.equal(expected);
  });
  it('should know toml', function () {
    interpret('.toml');
    expect(require('./fixtures/test.toml')).to.deep.equal(expected);
  });
  it('should know xml', function () {
    interpret('.xml');
    expect(JSON.parse(require('./fixtures/test.xml'))).to.deep.equal(expected);
  });
  it('should know yaml', function () {
    interpret('.yaml');
    expect(require('./fixtures/test.yaml')).to.deep.equal(expected);
  });
});
