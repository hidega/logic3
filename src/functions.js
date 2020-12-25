'use strict'
 
function Functions(funs) {
  var functions = Object.assign({}, funs)

  this.get = key => functions[key]

  this.invalidate = () => Object.keys(functions)
    .forEach(key => functions[key] = () => { throw new Error('Illegal fluent method invocation (' + key + ')') })
}

Functions.invokeFunction = (functions, f, name) => {
  var result = functions.get(name)(f)
  functions.invalidate()
  return result
}

module.exports = Functions

