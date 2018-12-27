React = createElement: (Component) ->
  Component()
# Test harmony arrow functions

Component = ->
  trueKey = true
  falseKey = false
  subKey = subProp: 1
  # Test harmony object short notation
  { data:
    trueKey: trueKey
    falseKey: falseKey
    subKey: subKey }

module.exports = <Component />
