'use strict'

function Functions(funs) {
  var functions = Object.assign({}, funs)

  this.get = key => functions[key]

  this.invalidate = () => Object.keys(functions)
    .forEach(key => functions[key] = () => { throw new Error('Illegal fluent method invocation (' + key + ').') })
}

Functions.invokeFunction = (functions, f, name) => {
  var result = functions.get(name)(f)
  functions.invalidate()
  return result
}

Functions.isFunction = f => typeof f === 'function'

Functions.resolveResult3 = (f, l3, other) => Functions.isFunction(f) ? f(l3, other) : f

Functions.resolveResult2 = f => Functions.isFunction(f) ? f() : f

Functions.ValOtw = function(result, mappedResult, l3, other, typename) {
  var functions = new Functions({
    value: () => mappedResult,
    otherwise: f => result ? mappedResult : Functions.resolveResult3(f, l3, other)
  })

  this.value = f => Functions.invokeFunction(functions, f, 'value')

  this.otherwise = f => Functions.invokeFunction(functions, f, 'otherwise')

  this.typename = typename
}

Functions.ValOtw.newInstance = (...params) => Object.freeze(new Functions.ValOtw(...params))

module.exports = Functions

