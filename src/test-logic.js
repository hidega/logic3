var Functions = require('./functions')

var checkFunction = f => {
  if(!Functions.isFunction(f)) {
    throw new Error('Function was expected.')
  }
  return true
}

var checkAndSetIllegal = (illegal, m) => {
  if(illegal) {
    throw new Error('Illegal fluent method invocation (ok).')
  }
  return true
}

function TestLogic(result, obj) {
  var functions = new Functions({
    fail: f => {
      checkFunction(f) && (result || f(obj))
      var illegal = false
      return Object.freeze({
        typename: 'Logic3TestFail',
        ok: f => {
          illegal = checkAndSetIllegal(illegal, 'ok')
          checkFunction(f) && result && f(obj)
          return result
        }
      })
    },
    ok: f => {
      checkFunction(f) && result && f(obj)
      var illegal = false
      return Object.freeze({
        typename: 'Logic3TestOk',
        fail: f => {
          illegal = checkAndSetIllegal(illegal, 'fail')
          checkFunction(f) && (result || f(obj))
          return result
        }
      })
    }
  })

  this.typename = 'Logic3Test'

  this.fail = f => Functions.invokeFunction(functions, f, 'fail')

  this.ok = f => Functions.invokeFunction(functions, f, 'ok')
}

module.exports = (result, obj) => Object.freeze(new TestLogic(result, obj))

