'use strict'
 
var checkFunction = f => {
  if(typeof f !== 'function') {
    throw new Error('function was expected')
  }
  return true
}

module.exports = (result, obj) => Object.freeze({
  typename: 'Logic3Test',
  fail: f => {
    checkFunction(f) && (result || f(obj))
    return Object.freeze({
      typename: 'Logic3TestFail',
      ok: f => checkFunction(f) && result && f(obj)
    })
  },
  ok: f => {
    checkFunction(f) && result && f(obj)
    return Object.freeze({
      typename: 'Logic3TestOk',
      fail: f => checkFunction(f) && (result || f(obj))
    })
  }
})

