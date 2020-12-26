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

Functions.isFunction = f => typeof f === 'function'

Functions.resolveResult3 = (f, l3, extras) => Functions.isFunction(f) ? f(l3, extras) : f

Functions.resolveResult2 = (f, extras) => Functions.isFunction(f) ? f(extras) : f

Functions.ValOtw = function(result, mappedResult, l3, other) {
  var functions = new Functions({
    value: () => mappedResult,
    otherwise: f => result ? mappedResult : Functions.resolveResult3(f, l3, other)
  })

  this.value = f => Functions.invokeFunction(functions, f, 'value')

  this.otherwise = f => Functions.invokeFunction(functions, f, 'otherwise')
}

Functions.ValOtw.newInstance = (result, mappedResult, l3, other)  => Object.freeze(new Functions.ValOtw(result, mappedResult, l3, other))

module.exports = Functions

