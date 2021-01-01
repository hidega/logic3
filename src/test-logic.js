'use strict'
 
var checkFunction = f => {
  if(typeof f !== 'function') {
    throw new Error('function was expected')
  }
  return true
}

module.exports = (result, obj) => Object.freeze({
  fail: f => {
    checkFunction(f)
    result || f(obj)
    return Object.freeze({
      ok: f => checkFunction(f) && result && f(obj)
    })
  },
  ok: f => {
    checkFunction(f)
    result && f(obj)
    return Object.freeze({
      fail: f => checkFunction(f) && (result || f(obj))
    })
  }
})

