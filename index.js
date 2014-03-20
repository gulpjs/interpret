const known = {
  '.co': 'coco',
  '.coffee': 'coffee-script',
  '.csv': 'require-csv',
  '.iced': 'iced-coffee-script',
  '.ini': 'require-ini',
  '.js': null,
  '.json': null,
  '.litcoffee': 'coffee-script',
  '.ls': 'livescript',
  '.toml': 'toml-require',
  '.xml': 'require-xml',
  '.yaml': 'require-yaml',
  '.yml': 'require-yaml'
};

const install = {
  'coffee-script': function (module) {
    module.register();
  },
  'iced-coffee-script': function (module) {
    module.register();
  },
  'toml-require': function (module) {
    module.install();
  }
};

module.exports = function (ext) {
  var moduleName = known[ext];
  if (moduleName) {
    var compiler = require(moduleName);
    var register = install[moduleName];
    if (register) {
      register(compiler);
    }
  }
};
