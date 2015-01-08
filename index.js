var extensions = {
  '.cjsx': 'node-cjsx/register',
  '.co': 'coco',
  '.coffee': {
    module: 'coffee-script/register',
    legacyModules: ['coffee-script']
  },
  '.coffee.md': {
    module: 'coffee-script/register',
    legacyModules: ['coffee-script']
  },
  '.csv': 'require-csv',
  '.iced': {
    module: 'iced-coffee-script/register',
    legacyModules: ['iced-coffee-script']
  },
  '.iced.md': {
    module: 'iced-coffee-script/register',
    legacyModules: ['iced-coffee-script']
  },
  '.ini': 'require-ini',
  '.js': null,
  '.json': null,
  '.json5': 'json5/lib/require',
  '.jsx': {
    module: 'node-jsx',
    options: {
      extension: '.jsx',
      harmony: true
    }
  },
  '.litcoffee': 'coffee-script/register', // TODO: litcoffee wasn't available in old coffee-script, correct?
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
  register: register,
  jsVariants: jsVariantExtensions.reduce(function (result, ext) {
    result[ext] = extensions[ext];
    return result;
  }, {})
};
