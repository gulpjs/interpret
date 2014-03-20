# interpret [![Build Status](https://secure.travis-ci.org/tkellen/node-interpret.png)](http://travis-ci.org/tkellen/node-interpret)
> Require anything.

[![NPM](https://nodei.co/npm/interpret.png)](https://nodei.co/npm/interpret/)

## What is it?
This module will find, require and register any file type the npm ecosystem has a module loader for.  Once this is done, you can require the provided file type natively.

**Currently supported extensions:**
.co, .coco, .coffee, .iced, .ini, .js, .json, .litcoffee, .ls, .toml, .xml, .yaml, .yml

## API

### learn(extension)
This method will look for a module loader associated with the provided extension and attempt to require it.  If necessary, it will also run any setup required to register it with [http://nodejs.org/api/globals.html#globals_require_extensions].  If calling is successful (aka: it doesn't throw), you can now require files with the provided extension natively.

## Usage
```js
var interpret = require('interpret');
interpret('.coffee');
require('file.coffee');
```
