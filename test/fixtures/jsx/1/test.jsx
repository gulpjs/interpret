const React = {
  createElement: function(Component){
    return Component();
  }
};

// Test harmony arrow functions
const Component = () => {
  var trueKey = true;
  var falseKey = false;
  var subKey = { subProp: 1 };
  // Test harmony object short notation
  return { data: { trueKey, falseKey, subKey}};
};

// Test JSX syntax
module.exports = <Component />;
