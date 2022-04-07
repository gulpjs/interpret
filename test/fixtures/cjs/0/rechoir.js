import assert from 'assert';
import path from 'path';
import url from 'url';

import rechoir from 'rechoir';
import { extensions } from '../../../../index.js';

var fixture = path.resolve('test.cjs');

rechoir.prepare(extensions, fixture);

const { default: result } = await import(url.pathToFileURL(fixture).href);

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
