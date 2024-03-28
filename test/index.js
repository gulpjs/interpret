'use strict';

var expect = require('expect');

var path = require('path');
var Module = require('module');
var child = require('child_process');
var shell = require('shelljs');
var rechoir = require('rechoir');

var nodeVersion = require('parse-node-version')(process.version);
var extensions = require('../').extensions;

// Save the original Module._extensions
var originalExtensions = Object.keys(Module._extensions);
var original = originalExtensions.reduce(function (result, key) {
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
  '@mdx-js/register': { major: 12 },
};

var maxVersions = {};

describe('interpret.extensions', function () {
  beforeEach(cleanup);

  var exts = Object.keys(extensions);

  var attempts = exts.reduce(function (attempts, ext) {
    var modules = extensions[ext];
    if (!Array.isArray(modules)) {
      modules = [modules];
    }

    // Skip .node because those are binaries
    // TODO: maybe we could add a binary to the fixtures?
    if (ext === '.node') {
      return attempts;
    }

    // We will handle the .mjs & .cjs tests separately
    if (ext === '.mjs' || ext === '.cjs') {
      return attempts;
    }

    modules.forEach(function (mod, idx) {
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

  attempts.forEach(function (attempt) {
    var extension = attempt.extension;
    var module = attempt.module;
    var name = attempt.name;
    var fixture = attempt.fixture;
    var fixtureDir = path.dirname(fixture);
    var idx = attempt.index;

    it(
      'can require ' + extension + ' using ' + name + ' (' + idx + ')',
      function (done) {
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

        // Skip any swc test on linux due to https://github.com/swc-project/swc/issues/4107
        if ((name === '@swc/register' || '@swc-node/register') && process.platform === 'linux') {
          this.skip();
        }

        this.timeout(0);

        var expected;

        process.chdir(path.join(__dirname, fixtureDir));

        shell.exec('rm -r node_modules', { silent: true });
        shell.exec('rm package-lock.json', { silent: true });
        shell.exec('npm install', { silent: true });

        try {
          rechoir.prepare(extensions, fixture);
        } catch (err) {
          console.error(err.failures);
          throw err;
        }

        switch (extension) {
          case '.ts':
          case '.cts':
          case '.tsx':
          case '.esm.js':
          case '.babel.tsx':
          case '.esbuild.js':
          case '.esbuild.jsx':
          case '.esbuild.ts':
          case '.esbuild.tsx':
          case '.sucrase.js':
          case '.sucrase.jsx':
          case '.sucrase.ts':
          case '.sucrase.tsx':
          case '.swc.js':
          case '.swc.jsx':
          case '.swc.ts':
          case '.swc.tsx':
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
            expect(require(fixture)).toEqual(expected);
            break;

          case '.mdx':
            expected = {
              data: {
                trueKey: true,
                falseKey: false,
                subKey: {
                  subProp: 1,
                },
              },
            };
            var component = require(fixture);
            // React internals :shrug:
            expect(component().type()).toEqual(expected);
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
      }
    );
  });

  it('does not error with the .mjs extension', function (done) {
    this.timeout(0);

    var ext = '.mjs';
    var fixture = './fixtures/' + ext.slice(1) + '/0/test' + ext;

    var result = rechoir.prepare(extensions, fixture);

    expect(Array.isArray(result)).toEqual(true);
    expect(result[0].moduleName).toEqual(path.join(__dirname, '../mjs-stub'));
    done();
  });

  it('the module can be loaded with import(), ignoring the loader', function () {
    if (nodeVersion.major < 12) {
      this.skip();
    }

    this.timeout(0);

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

    return imprt(fixture).then(function (result) {
      expect(result.default).toEqual(expected);
    });
  });

  it('stubs .mjs extension with null on old node that do not care about it', function (done) {
    if (nodeVersion.major > 10) {
      this.skip();
    }

    this.timeout(0);

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

  it('does not error with the .cjs extension when inside a type: module package', function (done) {
    if (nodeVersion.major < 14) {
      this.skip();
    }

    this.timeout(0);

    process.chdir(path.join(__dirname, 'fixtures/cjs/0'));

    child.exec('node rechoir.js', done);
  });

  it('does not error with the .cjs extension when inside a type: commonjs package', function (done) {
    this.timeout(0);

    process.chdir(path.join(__dirname, 'fixtures/cjs/1'));

    child.exec('node rechoir.js', done);
  });
});
