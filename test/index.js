'use strict';

var expect = require('expect');

var path = require('path');
var Module = require('module');
var shell = require('shelljs');
var rechoir = require('rechoir');

var nodeVersion = require('parse-node-version')(process.version);
var extensions = require('../').extensions;

// Save the original Module._extensions
var originalExtensions = Object.keys(Module._extensions);
var original = originalExtensions.reduce(function(result, key) {
  result[key] = require.extensions[key];
  return result;
}, {});
// Save the original cache keys
var originalCacheKeys = Object.keys(require.cache);
// Save the original Module.prototype.load because coffee-script overwrites it
var originalModuleLoad = Module.prototype.load;

function cleanup() {
  function cleanupCache(key) {
    if (originalCacheKeys.indexOf(key) === -1) {
      delete require.cache[key];
    }
  }

  function cleanupExtensions(ext) {
    if (originalExtensions.indexOf(ext) === -1) {
      delete Module._extensions[ext];
    } else {
      Module._extensions[ext] = original[ext];
    }
  }

  // Restore the require.cache to startup state
  Object.keys(require.cache).forEach(cleanupCache);
  // Restore the original Module.prototype.load
  Module.prototype.load = originalModuleLoad;
  // Restore the original Module._extensions
  Object.keys(Module._extensions).forEach(cleanupExtensions);

  // Cleanup babel global
  delete global._babelPolyfill;
}

// These modules need newer node features
var minVersions = {
  '@babel/register': { major: 6, minor: 0 },
  buble: { major: 4, minor: 0 },
  coffeescript: { major: 6, minor: 0 },
  earlgrey: { major: 0, minor: 12 },
  esm: { major: 6, minor: 0 },
  json5: { major: 6, minor: 0 },
  sucrase: { major: 8, minor: 0 },
  'ts-node': { major: 4, minor: 0 },
  wisp: { major: 0, minor: 12 },
  'require-xml': { major: 6, minor: 0 },
  'toml-require': { major: 6, minor: 0 },
};

var maxVersions = {
  'typescript-require': { major: 10, minor: 0 },
};

describe('interpret.extensions', function() {

  beforeEach(cleanup);

  var exts = Object.keys(extensions);

  var attempts = exts.reduce(function(attempts, ext) {
    var modules = extensions[ext];
    if (!Array.isArray(modules)) {
      modules = [modules];
    }

    // Skip .node because those are binaries
    // TODO: maybe we could add a binary to the fixtures?
    if (ext === '.node') {
      return attempts;
    }

    // We will handle the .mjs tests separately
    if (ext === '.mjs') {
      return attempts;
    }

    modules.forEach(function(mod, idx) {
      if (mod && typeof mod !== 'string') {
        mod = mod.module;
      }

      var name = mod || 'no loader';
      var fixture = './fixtures/' + ext.slice(1) + '/' + idx + '/test' + ext;

      if (mod && mod[0] !== '@') {
        mod = mod.split('/')[0];
      }

      attempts.push({
        extension: ext,
        module: mod,
        name: name,
        index: idx,
        fixture: fixture,
      });
    });

    return attempts;
  }, []);

  attempts.forEach(function(attempt) {
    var extension = attempt.extension;
    var module = attempt.module;
    var name = attempt.name;
    var fixture = attempt.fixture;
    var fixtureDir = path.dirname(fixture);
    var idx = attempt.index;

    it('can require ' + extension + ' using ' + name + ' (' + idx + ')', function(done) {
      var minVersion = minVersions[module];

      if (minVersion) {
        if (nodeVersion.major === 0 && nodeVersion.minor < minVersion.minor) {
          this.skip();
        } else if (nodeVersion.major < minVersion.major) {
          this.skip();
        }
      }

      var maxVersion = maxVersions[module];

      if (maxVersion) {
        if (nodeVersion.major > maxVersion.major) {
          this.skip();
        }
      }

      this.timeout(0);

      var expected;

      process.chdir(path.join(__dirname, fixtureDir));

      shell.exec('trash node_modules', { silent: true });
      shell.exec('npm install', { silent: true });

      // TODO: log failures
      rechoir.prepare(extensions, fixture);

      switch (extension) {
        case '.ts':
        case '.tsx':
        case '.esm.js':
          expected = {
            default: {
              data: {
                trueKey: true,
                falseKey: false,
                subKey: {
                  subProp: 1,
                },
              },
            },
          };
          if (module === 'typescript-require') {
            // This seems to cause an issue because they vm.runInNewContext so use .toMatch to compare
            expect(require(fixture)).toMatch(expected);
          } else {
            expect(require(fixture)).toEqual(expected);
          }
          break;
        case '.csv':
          expected = [['r1c1','r1c2'], ['r2c1','r2c2']];
          expect(require(fixture)).toEqual(expected);
          break;
        case '.ini':
          expected = {
            data: {
              trueKey: 'true',
              falseKey: 'false',
              subKey: {
                subProp: '1',
              },
            },
          };
          expect(require(fixture)).toEqual(expected);
          break;
        case '.xml':
          expected = {
            data: {
              trueKey: 'true',
              falseKey: 'false',
              subKey: {
                subProp: '1',
              },
            },
          };
          expect(require(fixture)).toEqual(JSON.stringify(expected));
          break;

        case '.toml':
          expected = Object.create(null);
          expected.data = Object.create(null);
          expected.data.trueKey = true;
          expected.data.falseKey = false;
          expected.data.subKey = Object.create(null);
          expected.data.subKey.subProp = 1;
          expect(require(fixture)).toEqual(expected);
          break;

        default:
          expected = {
            data: {
              trueKey: true,
              falseKey: false,
              subKey: {
                subProp: 1,
              },
            },
          };
          expect(require(fixture)).toEqual(expected);
      }
      done();
    });
  });

  it('does not error with the .mjs extension', function(done) {
    var ext = '.mjs';
    var fixture = './fixtures/' + ext.slice(1) + '/0/test' + ext;

    var result = rechoir.prepare(extensions, fixture);

    expect(Array.isArray(result)).toEqual(true);
    expect(result[0].moduleName).toEqual(path.join(__dirname, '../mjs-stub'));
    done();
  });

  it('the module can be loaded with import(), ignoring the loader', function() {
    if (nodeVersion.major < 12) {
      this.skip();
    }

    var ext = '.mjs';
    var fixture = './fixtures/' + ext.slice(1) + '/0/test' + ext;

    rechoir.prepare(extensions, fixture);

    var expected = {
      data: {
        trueKey: true,
        falseKey: false,
        subKey: {
          subProp: 1,
        },
      },
    };

    // This avoid SyntaxError when parsing on old node versions
    var imprt = new Function('a', 'return import(a)');

    return imprt(fixture)
      .then(function(result) {
        expect(result.default).toEqual(expected);
      });
  });

  it('stubs .mjs extension with null on old node that do not care about it', function(done) {
    if (nodeVersion.major > 10) {
      this.skip();
    }

    var ext = '.mjs';
    var fixture = './fixtures/' + ext.slice(1) + '/1/test' + ext;

    rechoir.prepare(extensions, fixture);

    var expected = {
      data: {
        trueKey: true,
        falseKey: false,
        subKey: {
          subProp: 1,
        },
      },
    };
    expect(require(fixture)).toEqual(expected);
    done();
  });

});
