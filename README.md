# interpret
> A dictionary of file extensions and associated module loaders.

[![NPM](https://nodei.co/npm/interpret.png)](https://nodei.co/npm/interpret/)

## What is it
This is used by [rechoir](http://github.com/tkellen/node-rechoir) for registering module loaders.

## API

### extensions
Map file types to modules which provide a [require.extension] loader.
```js
{
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
}
```

### register
If a module does not automatically register itself with [require.extensions], use one of these methods.
```js
{
  'coffee-script': function (module) {
    module.register();
  },
  'iced-coffee-script': function (module) {
    module.register();
  },
  'toml-require': function (module) {
    module.install();
  }
}
```
