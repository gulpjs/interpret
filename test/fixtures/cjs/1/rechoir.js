var assert = require('assert');
var path = require('path');

var rechoir = require('rechoir');
var { extensions } = require('../../../../index.js');

var fixture = path.resolve('test.cjs');

rechoir.prepare(extensions, fixture);

const result = require(fixture);

const expected = {
  data: {
    trueKey: true,
    falseKey: false,
    subKey: {
      subProp: 1,
    },
  },
};

assert.deepEqual(result, expected);
