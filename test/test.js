'use strict'

var assert = require('assert')
var values = require('../src/values')
var valuesOther = require('../src/values')
var evaluate = require('../src/evaluate')
var Operations = require('../src/operations')

var T = 1
var F = -1
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
  assert(!v.isntTrue())
  assert(!v.isFalse())
  assert(v.isntFalse())
  assert(!v.isNil())
  assert(v.isntNil())
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
  assert(v.isntTrue())
  assert(v.isFalse())
  assert(!v.isntFalse())
  assert(!v.isNil())
  assert(v.isntNil())
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
  assert(v.isntTrue())
  assert(!v.isFalse())
  assert(v.isntFalse())
  assert(v.isNil())
  assert(!v.isntNil())
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
  try {
    operations.div(T, N)
    assert.fail()
  } catch(e) {}
  try {
    operations.div(F, N)
    assert.fail()
  } catch(e) {}
  try {
    operations.div(N, N)
    assert.fail()
  } catch(e) {}
}

var caseSimpleFluent = () => {}

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
caseSimpleFluent()
caseEvaluate()
caseComplexFluent()
caseApiSmoketest()
caseMultiApiInstance()

console.log('Tests are OK :)')

