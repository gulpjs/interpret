// The desync package no longer seems to work,
// but the versions of Node that we support all
// have `require(esm)` so we just ignore the `load`
// function that `@mdx/register` tries to provide
// and return the global `require` directly.

module.exports = function (_load) {
  return require;
};
