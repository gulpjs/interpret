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

## How to use it

Consumers should use the exported `extensions` or `jsVariants` object to determine which module should be loaded for a given extension. If a matching extension is found, consumers should do the following:

1.  If the value is null, do nothing.
2.  If the value is a string, try to require it.
3.  If the value is an object, try to require the `module` property. If successful, the `register` property (a function) should be called with the module passed as the first argument.
4.  If the value is an array, iterate over it, attempting step #2 or #3 until one of the attempts does not throw.

## API

This module provides two top-level properties: `extensions` and `jsVariants`.

**Note:** This module does not depend on any of the loaders it recommends; instead, end-users are expected to install the hooks they want to use for the file types they want to use. See supported extensions and their hooks in the sections below.

### `extensions`

A mapping of file extensions to modules which provide a [require.extensions] loader.

File extension keys are all in the format of `'.foo'` or `'.foo.bar'` and module loader values are either `null` if the loader should fallthrough to node's loader,
or a string representing the module to be required, an object of `{ module: 'foobar', register: function }`, or an array containing those strings and/or objects.

A sample of an entry containing multiple hooks would look like:

```js
{
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
}
```

**Supported extensions and their hooks**

```yaml file=scripts/extensions.yaml
```

### `jsVariants`

The `jsVariants` is the same mapping as above, but only include the extensions which are variants of JavaScript.

**Supported extensions and their hooks**

```yaml file=scripts/jsVariants.yaml
```

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
