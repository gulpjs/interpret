var path = require('path');

var endsInJsx = /\.jsx$/;
var endsInTs = /\.ts$/;
var endsInTsx = /\.tsx$/;
var endsInBabelJs = /\.babel\.js$/;
var endsInBabelJsx = /\.babel\.jsx$/;
var endsInBabelTs = /\.babel\.ts$/;
var endsInBabelTsx = /\.babel\.tsx$/;
var endsInEsbuildJs = /\.esbuild\.js$/;
var endsInEsbuildJsx = /\.esbuild\.jsx$/;
var endsInEsbuildTs = /\.esbuild\.ts$/;
var endsInEsbuildTsx = /\.esbuild\.tsx$/;

var mjsStub = path.join(__dirname, 'mjs-stub');

function ignoreNonBabelAndNodeModules(file) {
  return !endsInBabelJs.test(file) &&
    path.relative(process.cwd(), file).split(path.sep).indexOf('node_modules') >= 0;
}

// Not part of the above check because it seems broken
function isNodeModules(file) {
  return path.relative(process.cwd(), file).split(path.sep).indexOf('node_modules') >= 0;
}

var extensions = {
  '.babel.js': [
    {
      module: '@babel/register',
      register: function(hook) {
        hook({
          extensions: '.js',
          rootMode: 'upward-optional',
          overrides: [{ only: [endsInBabelJs] }],
        });
      },
    },
    {
      module: 'babel-register',
      register: function(hook) {
        hook({
          extensions: '.js',
          ignore: ignoreNonBabelAndNodeModules,
        });
      },
    },
    {
      module: 'babel-core/register',
      register: function(hook) {
        hook({
          extensions: '.js',
          ignore: ignoreNonBabelAndNodeModules,
        });
      },
    },
    {
      module: 'babel/register',
      register: function(hook) {
        hook({
          extensions: '.js',
          ignore: ignoreNonBabelAndNodeModules,
        });
      },
    },
  ],
  '.babel.jsx': {
    module: '@babel/register',
    register: function(hook) {
      hook({
        extensions: '.jsx',
        rootMode: 'upward-optional',
        overrides: [{ only: [endsInBabelJsx] }],
      });
    },
  },
  '.babel.ts': [
    {
      module: '@babel/register',
      register: function(hook) {
        hook({
          extensions: '.ts',
          rootMode: 'upward-optional',
          overrides: [{ only: [endsInBabelTs] }],
        });
      },
    },
  ],
  '.babel.tsx': {
    module: '@babel/register',
    register: function(hook) {
      hook({
        extensions: '.tsx',
        rootMode: 'upward-optional',
        overrides: [{ only: [endsInBabelTsx] }],
      });
    },
  },
  '.buble.js': 'buble/register',
  '.cirru': 'cirru-script/lib/register',
  '.cjsx': 'node-cjsx/register',
  '.co': 'coco',
  '.coffee': ['coffeescript/register', 'coffee-script/register', 'coffeescript', 'coffee-script'],
  '.coffee.md': ['coffeescript/register', 'coffee-script/register', 'coffeescript', 'coffee-script'],
  '.csv': 'require-csv',
  '.eg': 'earlgrey/register',
  '.esbuild.js': {
    module: 'esbuild-register/dist/node',
    register: function(mod) {
      mod.register({
        extensions: ['.js'],
        target: 'node' + process.version.slice(1),
        hookMatcher: function(file) {
          return endsInEsbuildJs.test(file);
        },
      });
    },
  },
  '.esbuild.jsx': {
    module: 'esbuild-register/dist/node',
    register: function(mod) {
      mod.register({
        extensions: ['.jsx'],
        target: 'node' + process.version.slice(1),
        hookMatcher: function(file) {
          return endsInEsbuildJsx.test(file);
        },
      });
    },
  },
  '.esbuild.ts': {
    module: 'esbuild-register/dist/node',
    register: function(mod) {
      mod.register({
        extensions: ['.ts'],
        target: 'node' + process.version.slice(1),
        hookMatcher: function(file) {
          return endsInEsbuildTs.test(file);
        },
      });
    },
  },
  '.esbuild.tsx': {
    module: 'esbuild-register/dist/node',
    register: function(mod) {
      mod.register({
        extensions: ['.tsx'],
        target: 'node' + process.version.slice(1),
        hookMatcher: function(file) {
          return endsInEsbuildTsx.test(file);
        },
      });
    },
  },
  '.esm.js': {
    module: 'esm',
    register: function(hook) {
      // register on .js extension due to https://github.com/joyent/node/blob/v0.12.0/lib/module.js#L353
      // which only captures the final extension (.esm.js -> .js)
      var esmLoader = hook(module);
      require.extensions['.js'] = esmLoader('module')._extensions['.js'];
    },
  },
  '.iced': ['iced-coffee-script/register', 'iced-coffee-script'],
  '.iced.md': 'iced-coffee-script/register',
  '.ini': 'require-ini',
  '.js': null,
  '.json': null,
  '.json5': ['json5/lib/register', 'json5/lib/require'],
  '.jsx': [
    {
      module: '@babel/register',
      register: function(hook) {
        hook({
          extensions: '.jsx',
          rootMode: 'upward-optional',
          overrides: [{ only: [endsInJsx] }],
        });
      },
    },
    {
      module: 'babel-register',
      register: function(hook) {
        hook({
          extensions: '.jsx',
          ignore: ignoreNonBabelAndNodeModules,
        });
      },
    },
    {
      module: 'babel-core/register',
      register: function(hook) {
        hook({
          extensions: '.jsx',
          ignore: ignoreNonBabelAndNodeModules,
        });
      },
    },
    {
      module: 'babel/register',
      register: function(hook) {
        hook({
          extensions: '.jsx',
          ignore: ignoreNonBabelAndNodeModules,
        });
      },
    },
  ],
  '.litcoffee': ['coffeescript/register', 'coffee-script/register', 'coffeescript', 'coffee-script'],
  '.liticed': 'iced-coffee-script/register',
  '.ls': ['livescript', 'LiveScript'],
  '.mjs': mjsStub,
  '.node': null,
  '.toml': {
    module: 'toml-require',
    register: function(hook) {
      hook.install();
    },
  },
  '.ts': [
    'ts-node/register',
    'sucrase/register/ts',
    {
      module: '@babel/register',
      register: function(hook) {
        hook({
          extensions: '.ts',
          rootMode: 'upward-optional',
          overrides: [{ only: [endsInTs] }],
        });
      },
    },
    {
      module: 'esbuild-register/dist/node',
      register: function(mod) {
        mod.register({
          extensions: ['.ts'],
          target: 'node' + process.version.slice(1),
          hookMatcher: function(file) {
            return endsInTs.test(file);
          },
        });
      },
    },
    {
      module: '@swc/register',
      register: function(hook) {
        hook({
          extensions: '.ts',
          only: [endsInTs],
          ignore: [isNodeModules],
        });
      },
    },
  ],
  '.tsx': [
    'ts-node/register',
    'sucrase/register',
    {
      module: '@babel/register',
      register: function(hook) {
        hook({
          extensions: '.tsx',
          rootMode: 'upward-optional',
          overrides: [{ only: [endsInTsx] }],
        });
      },
    },
    {
      module: 'esbuild-register/dist/node',
      register: function(mod) {
        mod.register({
          extensions: ['.tsx'],
          target: 'node' + process.version.slice(1),
          hookMatcher: function(file) {
            return endsInTsx.test(file);
          },
        });
      },
    },
    {
      module: '@swc/register',
      register: function(hook) {
        hook({
          extensions: '.tsx',
          only: [endsInTsx],
          ignore: [isNodeModules],
        });
      },
    },
  ],
  '.wisp': 'wisp/engine/node',
  '.xml': 'require-xml',
  '.yaml': 'yaml-hook/register',
  '.yml': 'yaml-hook/register',
};

var jsVariantExtensions = [
  '.js',
  '.babel.js',
  '.babel.jsx',
  '.babel.ts',
  '.babel.tsx',
  '.esbuild.js',
  '.esbuild.jsx',
  '.esbuild.ts',
  '.esbuild.tsx',
  '.buble.js',
  '.cirru',
  '.cjsx',
  '.co',
  '.coffee',
  '.coffee.md',
  '.eg',
  '.esm.js',
  '.iced',
  '.iced.md',
  '.jsx',
  '.litcoffee',
  '.liticed',
  '.ls',
  '.mjs',
  '.ts',
  '.tsx',
  '.wisp',
];

module.exports = {
  extensions: extensions,
  jsVariants: jsVariantExtensions.reduce(function(result, ext) {
    result[ext] = extensions[ext];
    return result;
  }, {}),
};
