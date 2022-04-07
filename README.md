<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# interpret

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coveralls Status][coveralls-image]][coveralls-url]

A dictionary of file extensions and associated module loaders.

## What is it

This is used by [Liftoff] to automatically require dependencies for configuration files, and by [rechoir] for registering module loaders.

## API

### extensions

Map file types to modules which provide a [require.extensions] loader.

```js
{
  '.babel.js': {
    module: '@babel/register',
    register: function(hook) {
      hook({
        extensions: '.js',
        rootMode: 'upward-optional',
        ignore: [ignoreNonBabelAndNodeModules],
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
          ignore: [ignoreNonBabelAndNodeModules],
        });
      },
    },
  ],
  '.coffee': 'coffeescript/register',
  '.coffee.md': 'coffeescript/register',
  '.esm.js': {
    module: 'esm',
    register: function(hook) {
      // register on .js extension due to https://github.com/joyent/node/blob/v0.12.0/lib/module.js#L353
      // which only captures the final extension (.babel.js -> .js)
      var esmLoader = hook(module);
      require.extensions['.js'] = esmLoader('module')._extensions['.js'];
    },
  },
  '.js': null,
  '.json': null,
  '.json5': 'json5/lib/register',
  '.jsx': {
    module: '@babel/register',
    register: function(hook) {
      hook({
        extensions: '.jsx',
        rootMode: 'upward-optional',
        ignore: [ignoreNonBabelAndNodeModules],
      });
    },
  },
  '.litcoffee': 'coffeescript/register',
  '.mjs': '/absolute/path/to/interpret/mjs-stub.js',
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
          ignore: [ignoreNonBabelAndNodeModules],
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
          ignore: [ignoreNonBabelAndNodeModules],
        });
      },
    },
  ],
  '.yaml': 'yaml-hook/register',
  '.yml': 'yaml-hook/register',
}
```

### jsVariants

Same as above, but only include the extensions which are javascript variants.

## How to use it

Consumers should use the exported `extensions` or `jsVariants` object to determine which module should be loaded for a given extension. If a matching extension is found, consumers should do the following:

1. If the value is null, do nothing.

2. If the value is a string, try to require it.

3. If the value is an object, try to require the `module` property. If successful, the `register` property (a function) should be called with the module passed as the first argument.

4. If the value is an array, iterate over it, attempting step #2 or #3 until one of the attempts does not throw.

## License

MIT

<!-- prettier-ignore-start -->
[downloads-image]: https://img.shields.io/npm/dm/interpret.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/interpret
[npm-image]: https://img.shields.io/npm/v/interpret.svg?style=flat-square

[ci-url]: https://github.com/gulpjs/interpret/actions?query=workflow:dev
[ci-image]: https://img.shields.io/github/workflow/status/gulpjs/interpret/dev?style=flat-square

[coveralls-url]: https://coveralls.io/r/gulpjs/interpret
[coveralls-image]: https://img.shields.io/coveralls/gulpjs/interpret/master.svg?style=flat-square
<!-- prettier-ignore-end -->

<!-- prettier-ignore-start -->
[Liftoff]: http://github.com/gulpjs/liftoff
[rechoir]: http://github.com/gulpjs/rechoir
[require.extensions]: https://nodejs.org/api/modules.html#requireextensions
<!-- prettier-ignore-end -->
