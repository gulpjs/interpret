var extensions = {
  '.cjsx': 'node-cjsx/register',
  '.co': 'coco',
  '.coffee': 'coffee-script/register',
  '.coffee.md': 'coffee-script/register',
  '.csv': 'require-csv',
  '.iced': 'iced-coffee-script/register',
  '.iced.md': 'iced-coffee-script/register',
  '.ini': 'require-ini',
  '.js': null,
  '.json': null,
  '.json5': 'json5/lib/require',
  '.jsx': 'node-jsx',
  '.litcoffee': 'coffee-script/register',
  '.liticed': 'iced-coffee-script/register',
  '.ls': 'LiveScript',
  '.toml': 'toml-require',
  '.ts': 'typescript-require',
  '.xml': 'require-xml',
  '.yaml': 'require-yaml',
  '.yml': 'require-yaml'
};

var register = {
  'node-jsx': function (module, options) {
    module.install(options);
  },
  'toml-require': function (module) {
    module.install();
  }
};

var legacyModules = {
  '.coffee': 'coffee-script',
  '.coffee.md': 'coffee-script',
  '.iced': 'iced-coffee-script',
  // .iced.md and .liticed weren't available before the register module
  '.litcoffee': 'coffee-script'
};

var configurations = {
  'node-jsx': {
    extension: '.jsx',
    harmony: true
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
  '.ts'
];

module.exports = {
  extensions: extensions,
  legacy: legacyModules,
  configurations: configurations,
  register: register,
  jsVariants: jsVariantExtensions.reduce(function (result, ext) {
    result[ext] = extensions[ext];
    return result;
  }, {})
};
