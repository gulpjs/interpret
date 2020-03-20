import data from "./data"

const React = {
  createElement(Component: () => any) {
    return Component()
  }
}

// Test harmony arrow functions.
const Component = () => {
  var trueKey = true
  var falseKey = false
  var subKey = { subProp: 1 }

  // Test harmony object short notation.
  return { data: { trueKey, falseKey, subKey } }
}

// Test TSX syntax.
export default <Component {...data} />
