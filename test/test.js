'use strict'

var assert = require('assert')
var values = require('../src/values')
var valuesOther = require('../src/values')
var evaluate = require('../src/evaluate')
var Operations = require('../src/operations')

var T = 1
var F = 2
var N = 0

var operations = new Operations(T, F, N)

var someObject = { foo: 99 }

var smokeTests = () => {}

var caseValuesTrue = () => {
  var v = values.True

  assert(values.check(v))

  assert(v.equals(v))
  assert(!v.equals(values.Nil))
  assert(!v.equals(values.False))
  assert(!v.equals(someObject))
  assert(!v.equals(null))
  assert(!v.equals(1))
  assert(!v.equals('a'))
  assert(!v.equals(true))
  assert(!v.equals(undefined))

  assert(!v.notEquals(v))
  assert(v.notEquals(values.Nil))
  assert(v.notEquals(values.False))
  assert(v.notEquals(someObject))
  assert(v.notEquals(null))
  assert(v.notEquals(1))
  assert(v.notEquals('a'))
  assert(v.notEquals(true))
  assert(v.notEquals(undefined))

  assert.equal(v.toString(), 'True')
  assert.equal(v.toNumber(), T)
  assert.equal(v.toBoolean(), true)

  assert(v.negate().equals(values.False))

  assert(v.isTrue())
  assert(!v.isNotTrue())
  assert(!v.isFalse())
  assert(v.isNotFalse())
  assert(!v.isNil())
  assert(v.isNotNil())
}

var caseValuesFalse = () => {
  var v = values.False

  assert(values.check(v))

  assert(v.equals(v))
  assert(!v.equals(values.Nil))
  assert(!v.equals(values.True))
  assert(!v.equals(someObject))
  assert(!v.equals(null))
  assert(!v.equals(1))
  assert(!v.equals('a'))
  assert(!v.equals(true))
  assert(!v.equals(undefined))

  assert(!v.notEquals(v))
  assert(v.notEquals(values.Nil))
  assert(v.notEquals(values.True))
  assert(v.notEquals(someObject))
  assert(v.notEquals(null))
  assert(v.notEquals(1))
  assert(v.notEquals('a'))
  assert(v.notEquals(true))
  assert(v.notEquals(undefined))

  assert.equal(v.toString(), 'False')
  assert.equal(v.toNumber(), F)
  assert.equal(v.toBoolean(), false)

  assert(v.negate().equals(values.True))

  assert(!v.isTrue())
  assert(v.isNotTrue())
  assert(v.isFalse())
  assert(!v.isNotFalse())
  assert(!v.isNil())
  assert(v.isNotNil())
}

var caseValuesNil = () => {
  var v = values.Nil

  assert(values.check(v))

  assert(v.equals(v))
  assert(!v.equals(values.False))
  assert(!v.equals(values.True))
  assert(!v.equals(someObject))
  assert(!v.equals(null))
  assert(!v.equals(1))
  assert(!v.equals('a'))
  assert(!v.equals(true))
  assert(!v.equals(undefined))

  assert(!v.notEquals(v))
  assert(v.notEquals(values.False))
  assert(v.notEquals(values.True))
  assert(v.notEquals(someObject))
  assert(v.notEquals(null))
  assert(v.notEquals(1))
  assert(v.notEquals('a'))
  assert(v.notEquals(true))
  assert(v.notEquals(undefined))

  assert.equal(v.toString(), 'Nil')
  assert.equal(v.toNumber(), N)
  assert.equal(v.toBoolean(), undefined)

  assert(v.negate().equals(values.Nil))

  assert(!v.isTrue())
  assert(v.isNotTrue())
  assert(!v.isFalse())
  assert(v.isNotFalse())
  assert(v.isNil())
  assert(!v.isNotNil())
}

var caseValuesCheck = () => {
  assert(values.check(values.True))
  assert(values.check(values.False))
  assert(values.check(values.Nil))
  assert(!values.check(null))
  assert(!values.check(undefined))
  assert(!values.check(true))
  assert(!values.check(1))
  assert(!values.check([1]))
  assert(!values.check(someObject))
}

var caseCalculateMultiply = () => {
  assert.equal(operations.mul(T, T), T)
  assert.equal(operations.mul(T, F), F)
  assert.equal(operations.mul(T, N), N)
  assert.equal(operations.mul(F, T), F)
  assert.equal(operations.mul(F, F), T)
  assert.equal(operations.mul(F, N), N)
  assert.equal(operations.mul(N, T), N)
  assert.equal(operations.mul(N, F), N)
  assert.equal(operations.mul(N, N), N)

  assert(values.True.multiply(values.True).equals(values.True))
  assert(values.True.multiply(values.False).equals(values.False))
  assert(values.True.multiply(values.Nil).equals(values.Nil))
  assert(values.False.multiply(values.True).equals(values.False))
  assert(values.False.multiply(values.False).equals(values.True))
  assert(values.False.multiply(values.Nil).equals(values.Nil))
  assert(values.Nil.multiply(values.True).equals(values.Nil))
  assert(values.Nil.multiply(values.False).equals(values.Nil))
  assert(values.Nil.multiply(values.Nil).equals(values.Nil))
}

var caseCalculateAdd = () => {
  assert.equal(operations.add(T, T), F)
  assert.equal(operations.add(T, F), N)
  assert.equal(operations.add(T, N), T)
  assert.equal(operations.add(F, T), N)
  assert.equal(operations.add(F, F), T)
  assert.equal(operations.add(F, N), F)
  assert.equal(operations.add(N, T), T)
  assert.equal(operations.add(N, F), F)
  assert.equal(operations.add(N, N), N)

  assert(values.True.add(values.True).equals(values.False))
  assert(values.True.add(values.False).equals(values.Nil))
  assert(values.True.add(values.Nil).equals(values.True))
  assert(values.False.add(values.True).equals(values.Nil))
  assert(values.False.add(values.False).equals(values.True))
  assert(values.False.add(values.Nil).equals(values.False))
  assert(values.Nil.add(values.True).equals(values.True))
  assert(values.Nil.add(values.False).equals(values.False))
  assert(values.Nil.add(values.Nil).equals(values.Nil))
}

var caseCalculateSubtract = () => {
  assert.equal(operations.sub(T, T), N)
  assert.equal(operations.sub(T, F), F)
  assert.equal(operations.sub(T, N), T)
  assert.equal(operations.sub(F, T), F)
  assert.equal(operations.sub(F, F), N)
  assert.equal(operations.sub(F, N), F)
  assert.equal(operations.sub(N, T), T)
  assert.equal(operations.sub(N, F), F)
  assert.equal(operations.sub(N, N), N)

  assert.throws(() => values.True.subtract(null))
  assert.throws(() => values.True.subtract(undefined))
  assert.throws(() => values.True.subtract(someObject))

  assert(values.True.subtract(values.True).equals(values.Nil))
  assert(values.True.subtract(values.False).equals(values.False))
  assert(values.True.subtract(values.Nil).equals(values.True))
  assert(values.False.subtract(values.True).equals(values.False))
  assert(values.False.subtract(values.False).equals(values.Nil))
  assert(values.False.subtract(values.Nil).equals(values.False))
  assert(values.Nil.subtract(values.True).equals(values.True))
  assert(values.Nil.subtract(values.False).equals(values.False))
  assert(values.Nil.subtract(values.Nil).equals(values.Nil))
}

var caseCalculateDivide = () => {
  assert.equal(operations.div(T, T), T)
  assert.equal(operations.div(T, F), F)
  assert.equal(operations.div(F, T), F)
  assert.equal(operations.div(F, F), T)
  assert.equal(operations.div(N, F), N)
  assert.equal(operations.div(N, T), N)

  assert.throws(() => operations.div(T, N))
  assert.throws(() => operations.div(F, N))
  assert.throws(() => operations.div(N, N))

  assert(values.True.divide(values.True).equals(values.True))
  assert(values.True.divide(values.False).equals(values.False))
  assert(values.False.divide(values.True).equals(values.False))
  assert(values.False.divide(values.False).equals(values.True))
  assert(values.Nil.divide(values.False).equals(values.Nil))
  assert(values.Nil.divide(values.True).equals(values.Nil))

  assert.throws(() => values.True.divide(values.Nil))
  assert.throws(() => values.False.divide(values.Nil))
  assert.throws(() => values.Nil.divide(values.Nil))
}

var caseEqualityFluent = () => {
  var whenEquals = values.True.whenEquals(values.False)
  assert(typeof whenEquals === 'object')
  assert(Object.keys(whenEquals).length === 2)
  assert(typeof whenEquals.then === 'function')
  assert(typeof whenEquals.thenValueOf === 'function')

  whenEquals.then(() => {})
  assert.throws(() => whenEquals.then(() => {}))
  assert.throws(() => whenEquals.thenValueOf(() => {}))
  whenEquals = values.True.whenEquals(values.False)
  whenEquals.thenValueOf(() => {})
  assert.throws(() => whenEquals.thenValueOf(() => {}))
  assert.throws(() => whenEquals.then(() => {}))

  var invocationCount = 0

  var l3ToInt = l3 => {
    invocationCount++
    return l3.toNumber()
  }

  var intResult = values.True.whenEquals(values.True).thenValueOf(l3ToInt)
  assert.equal(1, intResult)
  assert.equal(1, invocationCount)
  intResult = values.True.whenEquals(values.True).thenValueOf(5)
  assert.equal(5, intResult)
  intResult = values.False.whenEquals(values.False).thenValueOf(l3ToInt)
  assert.equal(2, intResult)
  assert.equal(2, invocationCount)
  intResult = values.Nil.whenEquals(values.Nil).thenValueOf(l3ToInt)
  assert.equal(0, intResult)
  assert.equal(3, invocationCount)
  intResult = values.True.whenEquals(values.Nil).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)
  intResult = values.True.whenEquals(values.False).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)
  intResult = values.False.whenEquals(values.True).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)
  intResult = values.False.whenEquals(values.Nil).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)
  intResult = values.Nil.whenEquals(values.False).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)
  intResult = values.Nil.whenEquals(values.True).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)

  var then = values.True.whenEquals(values.False).then(() => {})
  assert(typeof then === 'object')
  assert(Object.keys(then).length === 2)
  assert(typeof then.value === 'function')
  assert(typeof then.otherwise === 'function')

  then.value(() => {})
  assert.throws(() => then.value(() => {}))
  assert.throws(() => then.otherwise(() => {}))
  then = values.True.whenEquals(values.False).then(() => {})
  then.otherwise(() => {})
  assert.throws(() => then.value(() => {}))
  assert.throws(() => then.otherwise(() => {}))

  intResult = values.True.whenEquals(values.True).then(l3ToInt).value()
  assert.equal(1, intResult)
  assert.equal(4, invocationCount)
  intResult = values.True.whenEquals(values.True).then(5).value()
  assert.equal(5, intResult)
  intResult = values.True.whenEquals(values.False).then(assert.fail).value()
  assert.equal(undefined, intResult)
  intResult = values.True.whenEquals(values.Nil).then(assert.fail).value()
  assert.equal(undefined, intResult)
  intResult = values.False.whenEquals(values.True).then(assert.fail).value()
  assert.equal(undefined, intResult)
  intResult = values.False.whenEquals(values.False).then(l3ToInt).value()
  assert.equal(2, intResult)
  assert.equal(5, invocationCount)
  intResult = values.False.whenEquals(values.Nil).then(assert.fail).value()
  assert.equal(undefined, intResult)
  intResult = values.Nil.whenEquals(values.True).then(assert.fail).value()
  assert.equal(undefined, intResult)
  intResult = values.Nil.whenEquals(values.False).then(assert.fail).value()
  assert.equal(undefined, intResult)
  intResult = values.Nil.whenEquals(values.Nil).then(l3ToInt).value()
  assert.equal(0, intResult)
  assert.equal(6, invocationCount)

  intResult = values.True.whenEquals(values.False).then(assert.fail).otherwise((l3, k3) => {
    assert(values.True.equals(l3))
    assert(values.False.equals(k3))
    invocationCount++
    return l3.toNumber()
  })
  assert.equal(1, intResult)
  assert.equal(7, invocationCount)

  intResult = values.Nil.whenEquals(values.False).then(assert.fail).otherwise((l3, k3) => {
    assert(values.Nil.equals(l3))
    assert(values.False.equals(k3))
    invocationCount++
    return l3.toNumber()
  })
  assert.equal(0, intResult)
  assert.equal(8, invocationCount)

  intResult = values.Nil.whenEquals(values.True).then(assert.fail).otherwise((l3, k3) => {
    assert(values.Nil.equals(l3))
    assert(values.True.equals(k3))
    invocationCount++
    return l3.toNumber()
  })
  assert.equal(0, intResult)
  assert.equal(9, invocationCount)

  intResult = values.True.whenEquals(values.Nil).then(assert.fail).otherwise((l3, k3) => {
    assert(values.True.equals(l3))
    assert(values.Nil.equals(k3))
    invocationCount++
    return l3.toNumber()
  })
  assert.equal(1, intResult)
  assert.equal(10, invocationCount)

  intResult = values.False.whenEquals(values.Nil).then(assert.fail).otherwise((l3, k3) => {
    assert(values.False.equals(l3))
    assert(values.Nil.equals(k3))
    invocationCount++
    return l3.toNumber()
  })
  assert.equal(2, intResult)
  assert.equal(11, invocationCount)

  intResult = values.False.whenEquals(values.True).then(assert.fail).otherwise((l3, k3) => {
    assert(values.False.equals(l3))
    assert(values.True.equals(k3))
    invocationCount++
    return l3.toNumber()
  })
  assert.equal(2, intResult)
  assert.equal(12, invocationCount)

  intResult = values.False.whenEquals(values.True).then(assert.fail).otherwise(5)
  assert.equal(5, intResult)

  intResult = values.Nil.whenEquals(values.Nil).then(l3ToInt).otherwise(assert.fail)
  assert.equal(0, intResult)
  assert.equal(12 + 1, invocationCount)
  intResult = values.False.whenEquals(values.False).then(l3ToInt).otherwise(assert.fail)
  assert.equal(2, intResult)
  assert.equal(14, invocationCount)
  intResult = values.True.whenEquals(values.True).then(l3ToInt).otherwise(assert.fail)
  assert.equal(1, intResult)
  assert.equal(15, invocationCount)
}

var caseInequalityFluent = () => {
  var whenNotEquals = values.True.whenNotEquals(values.False)
  assert(typeof whenNotEquals === 'object')
  assert(Object.keys(whenNotEquals).length === 2)
  assert(typeof whenNotEquals.then === 'function')
  assert(typeof whenNotEquals.thenValueOf === 'function')

  whenNotEquals.then(() => {})
  assert.throws(() => whenNotEquals.then(() => {}))
  assert.throws(() => whenNotEquals.thenValueOf(() => {}))
  whenNotEquals = values.True.whenNotEquals(values.False)
  whenNotEquals.thenValueOf(() => {})
  assert.throws(() => whenNotEquals.thenValueOf(() => {}))
  assert.throws(() => whenNotEquals.then(() => {}))

  var invocationCount = 0

  var l3ToInt = (k3, other) => (l3, o) => {
    assert(k3.equals(l3))
    assert(other.equals(o))
    invocationCount++
    return l3.toNumber()
  }

  var intResult = values.True.whenNotEquals(values.True).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)
  intResult = values.Nil.whenNotEquals(values.Nil).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)
  intResult = values.False.whenNotEquals(values.False).thenValueOf(assert.fail)
  assert.equal(undefined, intResult)
  intResult = values.True.whenNotEquals(values.False).thenValueOf(5)
  assert.equal(5, intResult)
  intResult = values.True.whenNotEquals(values.False).thenValueOf(l3ToInt(values.True, values.False))
  assert.equal(1, intResult)
  assert.equal(1, invocationCount)
  intResult = values.Nil.whenNotEquals(values.False).thenValueOf(l3ToInt(values.Nil, values.False))
  assert.equal(0, intResult)
  assert.equal(2, invocationCount)
  intResult = values.Nil.whenNotEquals(values.True).thenValueOf(l3ToInt(values.Nil, values.True))
  assert.equal(0, intResult)
  assert.equal(3, invocationCount)
  intResult = values.True.whenNotEquals(values.Nil).thenValueOf(l3ToInt(values.True, values.Nil))
  assert.equal(1, intResult)
  assert.equal(4, invocationCount)
  intResult = values.False.whenNotEquals(values.Nil).thenValueOf(l3ToInt(values.False, values.Nil))
  assert.equal(2, intResult)
  assert.equal(5, invocationCount)
  intResult = values.False.whenNotEquals(values.True).thenValueOf(l3ToInt(values.False, values.True))
  assert.equal(2, intResult)
  assert.equal(6, invocationCount)

  var then = values.True.whenNotEquals(values.False).then(() => {})
  assert(typeof then === 'object')
  assert(Object.keys(then).length === 2)
  assert(typeof then.value === 'function')
  assert(typeof then.otherwise === 'function')

  then.value(() => {})
  assert.throws(() => then.value(() => {}))
  assert.throws(() => then.otherwise(() => {}))
  then = values.True.whenNotEquals(values.False).then(() => {})
  then.otherwise(() => {})
  assert.throws(() => then.value(() => {}))
  assert.throws(() => then.otherwise(() => {}))

  intResult = values.True.whenNotEquals(values.False).then(5).value()
  assert.equal(5, intResult)
  intResult = values.True.whenNotEquals(values.False).then(l3ToInt(values.True, values.False)).value()
  assert.equal(1, intResult)
  assert.equal(7, invocationCount)
  intResult = values.True.whenNotEquals(values.Nil).then(l3ToInt(values.True, values.Nil)).value()
  assert.equal(1, intResult)
  assert.equal(8, invocationCount)
  intResult = values.False.whenNotEquals(values.True).then(l3ToInt(values.False, values.True)).value()
  assert.equal(2, intResult)
  assert.equal(9, invocationCount)
  intResult = values.False.whenNotEquals(values.Nil).then(l3ToInt(values.False, values.Nil)).value()
  assert.equal(2, intResult)
  assert.equal(10, invocationCount)
  intResult = values.Nil.whenNotEquals(values.False).then(l3ToInt(values.Nil, values.False)).value()
  assert.equal(0, intResult)
  assert.equal(11, invocationCount)
  intResult = values.Nil.whenNotEquals(values.True).then(l3ToInt(values.Nil, values.True)).value()
  assert.equal(0, intResult)
  assert.equal(12, invocationCount)
  intResult = values.True.whenNotEquals(values.True).then(assert.fail).value()
  assert.equal(undefined, intResult)
  intResult = values.Nil.whenNotEquals(values.Nil).then(assert.fail).value()
  assert.equal(undefined, intResult)
  intResult = values.False.whenNotEquals(values.False).then(assert.fail).value()
  assert.equal(undefined, intResult)

  intResult = values.True.whenNotEquals(values.True).then(assert.fail).otherwise(l3ToInt(values.True, values.True))
  assert.equal(1, intResult)
  assert.equal(12 + 1, invocationCount)
  intResult = values.False.whenNotEquals(values.False).then(assert.fail).otherwise(l3ToInt(values.False, values.False))
  assert.equal(2, intResult)
  assert.equal(14, invocationCount)
  intResult = values.Nil.whenNotEquals(values.Nil).then(assert.fail).otherwise(l3ToInt(values.Nil, values.Nil))
  assert.equal(0, intResult)
  assert.equal(15, invocationCount)
  intResult = values.Nil.whenNotEquals(values.Nil).then(assert.fail).otherwise(5)
  assert.equal(5, intResult)

  intResult = values.True.whenNotEquals(values.False).then(l3ToInt(values.True, values.False)).otherwise(assert.fail)
  assert.equal(1, intResult)
  assert.equal(16, invocationCount)
  intResult = values.True.whenNotEquals(values.Nil).then(l3ToInt(values.True, values.Nil)).otherwise(assert.fail)
  assert.equal(1, intResult)
  assert.equal(17, invocationCount)
  intResult = values.False.whenNotEquals(values.True).then(l3ToInt(values.False, values.True)).otherwise(assert.fail)
  assert.equal(2, intResult)
  assert.equal(18, invocationCount)
  intResult = values.False.whenNotEquals(values.Nil).then(l3ToInt(values.False, values.Nil)).otherwise(assert.fail)
  assert.equal(2, intResult)
  assert.equal(19, invocationCount)
  intResult = values.Nil.whenNotEquals(values.False).then(l3ToInt(values.Nil, values.False)).otherwise(assert.fail)
  assert.equal(0, intResult)
  assert.equal(20, invocationCount)
  intResult = values.Nil.whenNotEquals(values.True).then(l3ToInt(values.Nil, values.True)).otherwise(assert.fail)
  assert.equal(0, intResult)
  assert.equal(21, invocationCount)
}

var caseComplexFluent = () => {}

var caseApiSmoketest = () => {}

var caseMultiApiInstance = () => {
  assert(values.True.equals(valuesOther.True))
  assert(values.True.notEquals(valuesOther.False))
}

var caseEvaluate = () => {
  assert(values.Nil.equals(evaluate(null)))
  assert(values.Nil.equals(evaluate(undefined)))
  assert(values.Nil.equals(evaluate(Math.sqrt(-1))))
  assert(values.Nil.equals(evaluate(new Date('dfghj4567'))))

  assert(values.False.equals(evaluate(0)))
  assert(values.False.equals(evaluate('')))
  assert(values.False.equals(evaluate([])))
  assert(values.False.equals(evaluate({})))
  assert(values.False.equals(evaluate(false)))

  assert(values.True.equals(evaluate(1)))
  assert(values.True.equals(evaluate(-1)))
  assert(values.True.equals(evaluate('a')))
  assert(values.True.equals(evaluate([1])))
  assert(values.True.equals(evaluate(someObject)))
  assert(values.True.equals(evaluate(true)))
  assert(values.True.equals(evaluate(Symbol())))
  assert(values.True.equals(evaluate(() => 1 )))
  assert(values.True.equals(evaluate(function() { return 1 })))
}

var caseCalculateAnd = () => {
  assert.equal(operations.and(T, T), T)
  assert.equal(operations.and(T, F), F)
  assert.equal(operations.and(T, N), N)
  assert.equal(operations.and(F, T), F)
  assert.equal(operations.and(F, F), F)
  assert.equal(operations.and(F, N), N)
  assert.equal(operations.and(N, T), N)
  assert.equal(operations.and(N, F), N)
  assert.equal(operations.and(N, N), N)

  assert(values.True.and(values.True).equals(values.True))
  assert(values.True.and(values.False).equals(values.False))
  assert(values.True.and(values.Nil).equals(values.Nil))
  assert(values.False.and(values.True).equals(values.False))
  assert(values.False.and(values.False).equals(values.False))
  assert(values.False.and(values.Nil).equals(values.Nil))
  assert(values.Nil.and(values.True).equals(values.Nil))
  assert(values.Nil.and(values.False).equals(values.Nil))
  assert(values.Nil.and(values.Nil).equals(values.Nil))
}

var caseCalculateOr = () => {
  assert.equal(operations.or(T, T), T)
  assert.equal(operations.or(T, F), T)
  assert.equal(operations.or(T, N), T)
  assert.equal(operations.or(F, T), T)
  assert.equal(operations.or(F, F), F)
  assert.equal(operations.or(F, N), F)
  assert.equal(operations.or(N, T), T)
  assert.equal(operations.or(N, F), F)
  assert.equal(operations.or(N, N), N)

  assert(values.True.or(values.True).equals(values.True))
  assert(values.True.or(values.False).equals(values.True))
  assert(values.True.or(values.Nil).equals(values.True))
  assert(values.False.or(values.True).equals(values.True))
  assert(values.False.or(values.False).equals(values.False))
  assert(values.False.or(values.Nil).equals(values.False))
  assert(values.Nil.or(values.True).equals(values.True))
  assert(values.Nil.or(values.False).equals(values.False))
  assert(values.Nil.or(values.Nil).equals(values.Nil))
}

var caseCalculateXor = () => {
  assert.equal(operations.xor(T, T), F)
  assert.equal(operations.xor(T, F), T)
  assert.equal(operations.xor(T, N), N)
  assert.equal(operations.xor(F, T), T)
  assert.equal(operations.xor(F, F), F)
  assert.equal(operations.xor(F, N), N)
  assert.equal(operations.xor(N, T), N)
  assert.equal(operations.xor(N, F), N)
  assert.equal(operations.xor(N, N), N)

  assert(values.True.xor(values.True).equals(values.False))
  assert(values.True.xor(values.False).equals(values.True))
  assert(values.True.xor(values.Nil).equals(values.Nil))
  assert(values.False.xor(values.True).equals(values.True))
  assert(values.False.xor(values.False).equals(values.False))
  assert(values.False.xor(values.Nil).equals(values.Nil))
  assert(values.Nil.xor(values.True).equals(values.Nil))
  assert(values.Nil.xor(values.False).equals(values.Nil))
  assert(values.Nil.xor(values.Nil).equals(values.Nil))
}

var caseCalculateImpl = () => {
  assert.equal(operations.imp(T, T), T)
  assert.equal(operations.imp(T, F), F)
  assert.equal(operations.imp(T, N), F)
  assert.equal(operations.imp(F, T), T)
  assert.equal(operations.imp(F, F), T)
  assert.equal(operations.imp(F, N), T)
  assert.equal(operations.imp(N, T), T)
  assert.equal(operations.imp(N, F), F)
  assert.equal(operations.imp(N, N), N)

  assert(values.True.imply(values.True).equals(values.True))
  assert(values.True.imply(values.False).equals(values.False))
  assert(values.True.imply(values.Nil).equals(values.False))
  assert(values.False.imply(values.True).equals(values.True))
  assert(values.False.imply(values.False).equals(values.True))
  assert(values.False.imply(values.Nil).equals(values.True))
  assert(values.Nil.imply(values.True).equals(values.True))
  assert(values.Nil.imply(values.False).equals(values.False))
  assert(values.Nil.imply(values.Nil).equals(values.Nil))
}

var caseCalculateDel = () => {
  assert.equal(operations.del(T, T), N)
  assert.equal(operations.del(T, F), T)
  assert.equal(operations.del(T, N), T)
  assert.equal(operations.del(F, T), T)
  assert.equal(operations.del(F, F), N)
  assert.equal(operations.del(F, N), F)
  assert.equal(operations.del(N, T), T)
  assert.equal(operations.del(N, F), F)
  assert.equal(operations.del(N, N), N)

  assert(values.True.delta(values.True).equals(values.Nil))
  assert(values.True.delta(values.False).equals(values.True))
  assert(values.True.delta(values.Nil).equals(values.True))
  assert(values.False.delta(values.True).equals(values.True))
  assert(values.False.delta(values.False).equals(values.Nil))
  assert(values.False.delta(values.Nil).equals(values.False))
  assert(values.Nil.delta(values.True).equals(values.True))
  assert(values.Nil.delta(values.False).equals(values.False))
  assert(values.Nil.delta(values.Nil).equals(values.Nil))
}

var caseTamperProofness = () => {
  assert.throws(() => values.True.foo = 'Foo!')
  var nil = values.Nil.delta(values.Nil)
  assert.throws(() => delete nil.add)
  assert.throws(() => values.False.equals = () => false)

  var fluent = values.True.whenEquals(values.False)
  assert.throws(() => delete fluent.then)
  assert.throws(() => fluent.then = () => {})
  assert.throws(() => fluent.then1 = () => {})
}

smokeTests()
caseValuesTrue()
caseValuesFalse()
caseValuesNil()
caseValuesCheck()
caseCalculateMultiply()
caseCalculateAdd()
caseCalculateSubtract()
caseCalculateDivide()
caseCalculateAnd()
caseCalculateOr()
caseCalculateDel()
caseCalculateXor()
caseCalculateImpl()
caseEqualityFluent()
caseInequalityFluent()
caseEvaluate()
caseComplexFluent()
caseTamperProofness()
caseApiSmoketest()
caseMultiApiInstance()

console.log('Tests are OK :)')

