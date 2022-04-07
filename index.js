var path = require('path');

// We only register on the final extension (like `.js`) due to https://github.com/joyent/node/blob/v0.12.0/lib/module.js#L353
// However, we use these matchers to apply the transform only if the full extension matches
function endsInJsx(filename) {
  return filename.endsWith('.jsx');
}
function endsInTs(filename) {
  return filename.endsWith('.ts');
}
function endsInTsx(filename) {
  return filename.endsWith('.tsx');
}
function endsInBabelJs(filename) {
  return filename.endsWith('.babel.js');
}
function endsInBabelJsx(filename) {
  return filename.endsWith('.babel.jsx');
}
function endsInBabelTs(filename) {
  return filename.endsWith('.babel.ts');
}
function endsInBabelTsx(filename) {
  return filename.endsWith('.babel.tsx');
}
function endsInEsbuildJs(filename) {
  return filename.endsWith('.esbuild.js');
}
function endsInEsbuildJsx(filename) {
  return filename.endsWith('.esbuild.jsx');
}
function endsInEsbuildTs(filename) {
  return filename.endsWith('.esbuild.ts');
}
function endsInEsbuildTsx(filename) {
  return filename.endsWith('.esbuild.tsx');
}
function endsInSucraseJs(filename) {
  return filename.endsWith('.sucrase.js');
}
function endsInSucraseJsx(filename) {
  return filename.endsWith('.sucrase.jsx');
}
function endsInSucraseTs(filename) {
  return filename.endsWith('.sucrase.ts');
}
function endsInSucraseTsx(filename) {
  return filename.endsWith('.sucrase.tsx');
}
function endsInSwcJs(filename) {
  return filename.endsWith('.swc.js');
}
function endsInSwcJsx(filename) {
  return filename.endsWith('.swc.jsx');
}
function endsInSwcTs(filename) {
  return filename.endsWith('.swc.ts');
}
function endsInSwcTsx(filename) {
  return filename.endsWith('.swc.tsx');
}

var cjsStub = path.join(__dirname, 'cjs-stub');
var mjsStub = path.join(__dirname, 'mjs-stub');

function isNodeModules(file) {
  return path.relative(process.cwd(), file).includes('node_modules');
}

var extensions = {
  '.babel.js': {
    module: '@babel/register',
    register: function (hook) {
      hook({
        extensions: '.js',
        rootMode: 'upward-optional',
        overrides: [{ only: [endsInBabelJs], presets: ['@babel/preset-env'] }],
      });
    },
  },
  '.babel.jsx': {
    module: '@babel/register',
    register: function (hook) {
      hook({
        extensions: '.jsx',
        rootMode: 'upward-optional',
        overrides: [
          {
            only: [endsInBabelJsx],
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        ],
      });
    },
  },
  '.babel.ts': [
    {
      module: '@babel/register',
      register: function (hook) {
        hook({
          extensions: '.ts',
          rootMode: 'upward-optional',
          overrides: [
            {
              only: [endsInBabelTs],
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          ],
        });
      },
    },
  ],
  '.babel.tsx': {
    module: '@babel/register',
    register: function (hook) {
      hook({
        extensions: '.tsx',
        rootMode: 'upward-optional',
        overrides: [
          {
            only: [endsInBabelTsx],
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  allExtensions: true,
                },
              ],
            ],
          },
        ],
      });
    },
  },
  '.cjs': cjsStub,
  '.coffee': 'coffeescript/register',
  '.coffee.md': 'coffeescript/register',
  '.esbuild.js': {
    module: 'esbuild-register/dist/node',
    register: function (mod) {
      mod.register({
        extensions: ['.js'],
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildJs,
      });
    },
  },
  '.esbuild.jsx': {
    module: 'esbuild-register/dist/node',
    register: function (mod) {
      mod.register({
        extensions: ['.jsx'],
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildJsx,
      });
    },
  },
  '.esbuild.ts': {
    module: 'esbuild-register/dist/node',
    register: function (mod) {
      mod.register({
        extensions: ['.ts'],
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildTs,
      });
    },
  },
  '.esbuild.tsx': {
    module: 'esbuild-register/dist/node',
    register: function (mod) {
      mod.register({
        extensions: ['.tsx'],
        target: 'node' + process.version.slice(1),
        hookMatcher: endsInEsbuildTsx,
      });
    },
  },
  '.esm.js': {
    module: 'esm',
    register: function (hook) {
      // register on .js extension due to https://github.com/joyent/node/blob/v0.12.0/lib/module.js#L353
      // which only captures the final extension (.esm.js -> .js)
      var esmLoader = hook(module);
      require.extensions['.js'] = esmLoader('module')._extensions['.js'];
    },
  },
  '.js': null,
  '.json': null,
  '.json5': 'json5/lib/register',
  '.jsx': [
    {
      module: '@babel/register',
      register: function (hook) {
        hook({
          extensions: '.jsx',
          rootMode: 'upward-optional',
          overrides: [
            {
              only: [endsInJsx],
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          ],
        });
      },
    },
    'sucrase/register/jsx',
  ],
  '.litcoffee': 'coffeescript/register',
  // The mdx loader hooks both `.md` and `.mdx` when it is imported
  // but we only install the hook if `.mdx` is the first file
  '.mdx': '@mdx-js/register',
  '.mjs': mjsStub,
  '.node': null,
  '.sucrase.js': {
    module: 'sucrase/dist/register',
    register: function (hook) {
      hook.registerJS({
        matcher: endsInSucraseJs,
      });
    },
  },
  '.sucrase.jsx': {
    module: 'sucrase/dist/register',
    register: function (hook) {
      hook.registerJSX({
        matcher: endsInSucraseJsx,
      });
    },
  },
  '.sucrase.ts': {
    module: 'sucrase/dist/register',
    register: function (hook) {
      hook.registerTS({
        matcher: endsInSucraseTs,
      });
    },
  },
  '.sucrase.tsx': {
    module: 'sucrase/dist/register',
    register: function (hook) {
      hook.registerTSX({
        matcher: endsInSucraseTsx,
      });
    },
  },
  '.swc.js': {
    module: '@swc/register',
    register: function (hook) {
      hook({
        extensions: '.js',
        only: [endsInSwcJs],
        ignore: [isNodeModules],
        jsc: {
          parser: {
            syntax: 'ecmascript',
          },
        },
        module: {
          type: 'commonjs',
        },
      });
    },
  },
  '.swc.jsx': {
    module: '@swc/register',
    register: function (hook) {
      hook({
        extensions: '.jsx',
        only: [endsInSwcJsx],
        ignore: [isNodeModules],
        jsc: {
          parser: {
            syntax: 'ecmascript',
            jsx: true,
          },
        },
        module: {
          type: 'commonjs',
        },
      });
    },
  },
  '.swc.ts': {
    module: '@swc/register',
    register: function (hook) {
      hook({
        extensions: '.ts',
        only: [endsInSwcTs],
        ignore: [isNodeModules],
        jsc: {
          parser: {
            syntax: 'typescript',
          },
        },
        module: {
          type: 'commonjs',
        },
      });
    },
  },
  '.swc.tsx': {
    module: '@swc/register',
    register: function (hook) {
      hook({
        extensions: '.tsx',
        only: [endsInSwcTsx],
        ignore: [isNodeModules],
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
        },
        module: {
          type: 'commonjs',
        },
      });
    },
  },
  '.toml': {
    module: 'toml-require',
    register: function (hook) {
      hook.install();
    },
  },
  '.ts': [
    'ts-node/register',
    'sucrase/register/ts',
    {
      module: '@babel/register',
      register: function (hook) {
        hook({
          extensions: '.ts',
          rootMode: 'upward-optional',
          overrides: [
            {
              only: [endsInTs],
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          ],
        });
      },
    },
    {
      module: 'esbuild-register/dist/node',
      register: function (mod) {
        mod.register({
          extensions: ['.ts'],
          target: 'node' + process.version.slice(1),
          hookMatcher: endsInTs,
        });
      },
    },
    {
      module: '@swc/register',
      register: function (hook) {
        hook({
          extensions: '.ts',
          only: [endsInTs],
          ignore: [isNodeModules],
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
          module: {
            type: 'commonjs',
          },
        });
      },
    },
  ],
  '.tsx': [
    'ts-node/register',
    'sucrase/register/tsx',
    {
      module: '@babel/register',
      register: function (hook) {
        hook({
          extensions: '.tsx',
          rootMode: 'upward-optional',
          overrides: [
            {
              only: [endsInTsx],
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                [
                  '@babel/preset-typescript',
                  {
                    isTSX: true,
                    allExtensions: true,
                  },
                ],
              ],
            },
          ],
        });
      },
    },
    {
      module: 'esbuild-register/dist/node',
      register: function (mod) {
        mod.register({
          extensions: ['.tsx'],
          target: 'node' + process.version.slice(1),
          hookMatcher: endsInTsx,
        });
      },
    },
    {
      module: '@swc/register',
      register: function (hook) {
        hook({
          extensions: '.tsx',
          only: [endsInTsx],
          ignore: [isNodeModules],
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
          },
          module: {
            type: 'commonjs',
          },
        });
      },
    },
  ],
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
  '.cjs',
  '.coffee',
  '.coffee.md',
  '.esm.js',
  '.jsx',
  '.litcoffee',
  '.mdx',
  '.mjs',
  '.sucrase.js',
  '.sucrase.jsx',
  '.sucrase.ts',
  '.sucrase.tsx',
  '.swc.js',
  '.swc.jsx',
  '.swc.ts',
  '.swc.tsx',
  '.ts',
  '.tsx',
];

module.exports = {
  extensions: extensions,
  jsVariants: jsVariantExtensions.reduce(function (result, ext) {
    result[ext] = extensions[ext];
    return result;
  }, {}),
};
