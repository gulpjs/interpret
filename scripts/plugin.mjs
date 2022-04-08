import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { codeImport } from 'remark-code-import';

import interpret from '../index.js';

// Exporting this so it can be used by remark-cli
export default codeImport;

// Also preparing the files we need for the README
var config = {
  sortKeys: true,
  skipInvalid: true,
  replacer: function (key, value) {
    // Top-level object
    if (key === '') {
      return value;
    }

    if (key.startsWith('.')) {
      return Array.isArray(value) ? value : [value];
    }

    if (value === null) {
      return 'built-in node.js loader';
    }

    if (typeof value !== 'string') {
      return value.module;
    }

    if (value.includes('mjs-stub')) {
      return 'interpret/mjs-stub';
    }

    if (value.includes('cjs-stub')) {
      return 'interpret/cjs-stub';
    }

    return value;
  },
};

var extensions = yaml.dump(interpret.extensions, config);
var jsVariants = yaml.dump(interpret.jsVariants, config);

fs.writeFileSync(
  new URL('./extensions.yaml', import.meta.url),
  extensions,
  'utf8'
);
fs.writeFileSync(
  new URL('./jsVariants.yaml', import.meta.url),
  jsVariants,
  'utf8'
);
