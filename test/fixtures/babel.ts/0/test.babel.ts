// Test ES6 arrow functions
var fn = () => {
  var trueKey = true;
  var falseKey = false;
  var subKey = { subProp: 1 };
  // Test harmony object short notation
  return { data: { trueKey, falseKey, subKey}};
};

module.exports = fn();
