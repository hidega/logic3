'use strict'
 
module.exports = (result, obj) => Object.freeze({
  fail: f => {
    result || f(obj)
    return Object.freeze({
      ok: f => result && f(obj)
    })
  },
  ok: f => {
    result && f(obj)
    return Object.freeze({
      fail: f => result || f(obj)
    })
  }
})

