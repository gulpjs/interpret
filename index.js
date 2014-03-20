exports.extensions = {
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

exports.register = {
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
