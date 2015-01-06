const path = require('path');

var extensions = {
  '.cjsx': 'node-cjsx/register',
  '.co': 'coco',
  '.coffee': 'coffee-script',
  '.coffee.md': 'coffee-script',
  '.csv': 'require-csv',
  '.iced': 'iced-coffee-script',
  '.iced.md': 'iced-coffee-script',
  '.ini': 'require-ini',
  '.js': null,
  '.json': null,
  '.json5': 'json5/lib/require',
  '.jsx': 'node-jsx',
  '.litcoffee': 'coffee-script',
  '.liticed': 'iced-coffee-script',
  '.ls': 'LiveScript',
  '.node' : null,
  '.toml': 'toml-require',
  '.ts': 'typescript-require',
  '.xml': 'require-xml',
  '.yaml': 'require-yaml',
  '.yml': 'require-yaml'
};

var register = {
  'node-jsx': function (module, options) {
    module.install({ extension: '.jsx', harmony: true });
  },
  'toml-require': function (module, options) {
    module.install();
  },
  'coffee-script': function (module, options) {
    // make sure that both pre 1.7.x and newer versions 
    // of coffee-script will work
    if (options && options.packagePath) {
      try {
        require(path.join(options.packagePath, 'register'));
      }
      catch (e) {
        ; // ignore, we are using an older version of coffee-script
      }
    }
  },
  'iced-coffee-script': function (module, options) {
    // make sure that both pre 1.7.x and newer versions 
    // of iced-coffee-script will work
    if (options && options.packagePath) {
      try {
        require(path.join(options.packagePath, 'register'));
      }
      catch (e) {
        ; // ignore, we are using an older version of iced-coffee-script
      }
    }
  }
};

var jsVariantExtensions = [
  '.js',
  '.cjsx',
  '.co',
  '.coffee',
  '.coffee.md',
  '.iced',
  '.iced.md',
  '.jsx',
  '.litcoffee',
  '.liticed',
  '.ls',
  '.node',
  '.ts'
];

module.exports = {
  extensions: extensions,
  register: register,
  jsVariants: jsVariantExtensions.reduce(function (result, ext) {
    result[ext] = extensions[ext];
    return result;
  }, {})
};
